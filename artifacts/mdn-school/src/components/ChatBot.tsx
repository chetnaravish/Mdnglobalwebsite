import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, Loader2, Mic, Square, Volume2, VolumeX } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  audioUrl?: string;
}

interface SpeechRecognitionResultEvent extends Event {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionInstance {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: ((event: SpeechRecognitionResultEvent) => void) | null;
  onend: (() => void) | null;
  onerror: (() => void) | null;
  start: () => void;
  stop: () => void;
}

type SpeechRecognitionConstructor = new () => SpeechRecognitionInstance;

declare global {
  interface Window {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  }
}

const WELCOME_MESSAGE: Message = {
  role: 'assistant',
  content: 'Namaste! \u{1F64F} I am the MDN Global School assistant. I can help you with information about admissions, academics, facilities, fee structure, and more.\n\nHow can I help you today?',
};

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [listening, setListening] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [speaking, setSpeaking] = useState(false);
  const [playingUrl, setPlayingUrl] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
  const voiceEnabledRef = useRef(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300);
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  useEffect(() => {
    return () => {
      recognitionRef.current?.stop();
      audioRef.current?.pause();
      window.speechSynthesis?.cancel();
      messages.forEach((m) => { if (m.audioUrl) URL.revokeObjectURL(m.audioUrl); });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function speakText(text: string) {
    if (!voiceEnabledRef.current || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const clean = text
      .replace(/[*_#`]/g, '')
      .replace(/[\u{1F64F}\u{1F44D}\u{2728}\u{1F31F}\u{1F3C6}\u{2714}\u{2B50}]/gu, '')
      .replace(/\s+/g, ' ')
      .trim();
    if (!clean) return;
    const utterance = new SpeechSynthesisUtterance(clean);
    utterance.lang = /[\u0900-\u097F]/u.test(clean) ? 'hi-IN' : 'en-IN';
    utterance.rate = 0.95;
    utterance.pitch = 1;
    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    window.speechSynthesis.speak(utterance);
  }

  function playAudio(url: string) {
    audioRef.current?.pause();
    const audio = new Audio(url);
    audioRef.current = audio;
    setPlayingUrl(url);
    setSpeaking(true);
    audio.onended = () => { setPlayingUrl(null); setSpeaking(false); };
    audio.onerror = () => { setPlayingUrl(null); setSpeaking(false); };
    void audio.play().catch(() => { setPlayingUrl(null); setSpeaking(false); });
  }

  function stopSpeaking() {
    audioRef.current?.pause();
    window.speechSynthesis?.cancel();
    setSpeaking(false);
    setPlayingUrl(null);
  }

  function toggleVoice() {
    const next = !voiceEnabledRef.current;
    voiceEnabledRef.current = next;
    setVoiceEnabled(next);
    if (!next) {
      audioRef.current?.pause();
      window.speechSynthesis?.cancel();
      setSpeaking(false);
      setPlayingUrl(null);
    }
  }

  function startListening() {
    if (loading || listening) return;
    const SR = window.SpeechRecognition ?? window.webkitSpeechRecognition;
    if (!SR) {
      setError('Voice input is not supported in this browser. Please type your question.');
      return;
    }
    setError('');
    const recognition = new SR();
    recognition.lang = 'hi-IN';
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.onresult = (event) => {
      let transcript = '';
      for (let i = 0; i < event.results.length; i += 1) {
        transcript += event.results[i][0]?.transcript ?? '';
      }
      setInput(transcript);
    };
    recognition.onerror = () => {
      setListening(false);
      setError('Could not hear that. Please try again or type your question.');
    };
    recognition.onend = () => {
      setListening(false);
      recognitionRef.current = null;
    };
    recognitionRef.current = recognition;
    setListening(true);
    recognition.start();
  }

  function stopListening() {
    recognitionRef.current?.stop();
    setListening(false);
  }

  const sendMessage = useCallback(async (e?: React.FormEvent) => {
    e?.preventDefault();
    const text = input.trim();
    if (!text || loading) return;
    if (listening) stopListening();

    const userMsg: Message = { role: 'user', content: text };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput('');
    setError('');
    setLoading(true);

    try {
      const res = await fetch(`${import.meta.env.BASE_URL}api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updated.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Something went wrong. Please try again.');
      }

      const reply = data.reply as string;
      const audioBase64 = data.audioBase64 as string | undefined;
      const audioMimeType = (data.audioMimeType as string) || 'audio/mpeg';

      let audioUrl: string | undefined;
      if (audioBase64) {
        const binary = window.atob(audioBase64);
        const bytes = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
        audioUrl = URL.createObjectURL(new Blob([bytes], { type: audioMimeType }));
      }

      setMessages((prev) => [...prev, { role: 'assistant', content: reply, audioUrl }]);
      if (voiceEnabledRef.current && audioUrl) {
        playAudio(audioUrl);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sorry, could not connect. Please try again.');
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input, loading, listening, messages]);

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#1a3a6b] text-white shadow-xl flex items-center justify-center hover:bg-[#0f2557] transition-colors"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open chat"
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <X size={24} />
            </motion.span>
          ) : (
            <motion.span key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <MessageCircle size={24} />
            </motion.span>
          )}
        </AnimatePresence>
        {!open && (
          <span className="absolute inset-0 rounded-full bg-[#1a3a6b] animate-ping opacity-25 pointer-events-none" />
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="fixed bottom-24 right-6 z-50 w-[350px] sm:w-[380px] max-h-[540px] flex flex-col rounded-2xl shadow-2xl overflow-hidden border border-gray-100"
            style={{ maxHeight: 'calc(100vh - 140px)' }}
          >
            {/* Header */}
            <div className="bg-[#1a3a6b] px-4 py-3 flex items-center gap-3 shrink-0">
              <div className="w-9 h-9 rounded-full bg-[#f5a623] flex items-center justify-center shrink-0">
                <Bot size={20} className="text-[#1a3a6b]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-bold text-sm leading-tight">MDN School Assistant</p>
                <p className="text-white/60 text-xs">{voiceEnabled ? 'Voice on' : 'Voice off'}</p>
              </div>
              <button type="button" onClick={toggleVoice}
                className={`p-1.5 rounded-lg transition-colors ${voiceEnabled ? 'text-[#f5a623] hover:bg-white/10' : 'text-white/60 hover:text-white hover:bg-white/10'}`}
                aria-label={voiceEnabled ? 'Turn voice off' : 'Turn voice on'}>
                {voiceEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
              </button>
              <button onClick={() => setOpen(false)}
                className="text-white/60 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10" aria-label="Close chat">
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto bg-gray-50 px-3 py-4 space-y-3">
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-2 items-end ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'assistant' ? 'bg-[#1a3a6b]' : 'bg-[#f5a623]'}`}>
                    {msg.role === 'assistant' ? <Bot size={14} className="text-white" /> : <User size={14} className="text-[#1a3a6b]" />}
                  </div>
                  <div className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                    msg.role === 'assistant' ? 'bg-white text-gray-800 rounded-bl-sm shadow-sm border border-gray-100' : 'bg-[#1a3a6b] text-white rounded-br-sm'
                  }`}>
                    {msg.content}
                    {msg.role === 'assistant' && i > 0 && voiceEnabled && (
                      <button type="button"
                        onClick={() => {
                          if (msg.audioUrl) {
                            playingUrl === msg.audioUrl ? stopSpeaking() : playAudio(msg.audioUrl);
                          } else {
                            speaking ? stopSpeaking() : speakText(msg.content);
                          }
                        }}
                        className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-[#1a3a6b] hover:text-[#f5a623] transition-colors" aria-label="Play voice">
                        {speaking && playingUrl === msg.audioUrl ? <Loader2 size={13} className="animate-spin" /> : <Volume2 size={13} />}
                        {speaking && playingUrl === msg.audioUrl ? 'Playing...' : msg.audioUrl ? 'Listen' : 'Listen'}
                      </button>
                    )}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex gap-2 items-end">
                  <div className="w-7 h-7 rounded-full bg-[#1a3a6b] flex items-center justify-center shrink-0">
                    <Bot size={14} className="text-white" />
                  </div>
                  <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
                    <div className="flex gap-1 items-center">
                      <span className="w-2 h-2 bg-[#1a3a6b]/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-[#1a3a6b]/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-[#1a3a6b]/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}

              {error && (
                <p className="text-center text-xs text-red-500 bg-red-50 rounded-lg px-3 py-2">{error}</p>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Quick suggestions */}
            {messages.length === 1 && (
              <div className="bg-gray-50 px-3 pb-2 flex flex-wrap gap-1.5">
                {['Admission process?', 'Fee structure?', 'School timings?', 'Facilities?'].map((q) => (
                  <button key={q}
                    onClick={() => { setInput(q); setTimeout(() => sendMessage(), 50); }}
                    className="text-xs bg-white border border-gray-200 text-[#1a3a6b] px-2.5 py-1.5 rounded-full hover:border-[#1a3a6b] hover:bg-[#1a3a6b]/5 transition-colors">
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <form onSubmit={sendMessage} className="bg-white border-t border-gray-100 px-3 py-3 flex gap-2 items-center shrink-0">
              <input ref={inputRef} type="text" value={input} onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown} placeholder="Type your question..." disabled={loading}
                className="flex-1 text-sm px-3 py-2 rounded-xl border border-gray-200 focus:border-[#1a3a6b] focus:ring-2 focus:ring-[#1a3a6b]/10 outline-none transition-all text-gray-800 disabled:opacity-60" />
              <button type="button" onClick={listening ? stopListening : startListening} disabled={loading}
                className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all shrink-0 ${
                  listening ? 'bg-red-500 text-white animate-pulse' : 'bg-[#f5a623] text-[#1a3a6b] hover:bg-[#e39a17]'
                } disabled:opacity-40 disabled:cursor-not-allowed`}
                aria-label={listening ? 'Stop voice input' : 'Use voice input'}>
                {listening ? <Square size={15} /> : <Mic size={16} />}
              </button>
              <button type="submit" disabled={!input.trim() || loading}
                className="w-9 h-9 rounded-xl bg-[#1a3a6b] text-white flex items-center justify-center hover:bg-[#0f2557] disabled:opacity-40 disabled:cursor-not-allowed transition-all shrink-0" aria-label="Send">
                {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
