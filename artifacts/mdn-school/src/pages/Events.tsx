import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Music, Globe, Microscope, Star, Calendar, X, ChevronLeft, ChevronRight } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } })
};

type Highlight = {
  icon: React.ElementType;
  title: string;
  desc: string;
  image: string;
  images: { src: string; caption: string }[];
  detail: string[];
};

const annualHighlights: Highlight[] = [
  {
    icon: Star,
    title: 'Annual Sports Meet',
    desc: 'A 3-day extravaganza of athletics, team sports, and fitness events with district-level competitions and medal ceremonies.',
    image: '/images/facilities-sports.jpg',
    images: [
      { src: '/images/facilities-sports.jpg', caption: 'Opening Ceremony — Annual Sports Meet' },
      { src: '/images/events-sports.jpg',     caption: 'Track & Field Events' },
      { src: '/images/students-happy.jpg',    caption: 'Medal Ceremony & Prize Distribution' },
    ],
    detail: [
      'A grand 3-day event held every January on our 4-acre sports complex with 1,000+ participants.',
      'Events include 100m, 200m & 400m sprints, relay races, long jump, shot put, and team sports.',
      'District-level coaches and referees preside over the competitions ensuring fair and competitive play.',
      'Culminates with a colourful closing ceremony, medal distribution, and a cultural performance.',
      'Inter-house championship trophy awarded to the house with the most gold medals overall.',
    ],
  },
  {
    icon: Music,
    title: 'Cultural Fest — Utsav',
    desc: 'Our flagship cultural festival featuring classical dance, music performances, drama, art exhibitions, and inter-school competitions.',
    image: '/images/events-annual.jpg',
    images: [
      { src: '/images/events-annual.jpg',  caption: 'Utsav — Grand Opening Night' },
      { src: '/images/students-happy.jpg', caption: 'Classical Dance Performances' },
      { src: '/images/about-school.jpg',   caption: 'Student Art Exhibition at Utsav' },
    ],
    detail: [
      'Utsav is our 2-day inter-school cultural festival attracting students from 20+ schools across the district.',
      'Events include classical & folk dance, solo vocals, drama, nukkad natak, rangoli, and art competitions.',
      'A dedicated art exhibition gallery showcases student work from Nursery to Class XII.',
      'Professional sound and lighting setup creates a stage-quality experience for performers and audience alike.',
      'Best performances are uploaded to the school YouTube channel, garnering thousands of views each year.',
    ],
  },
  {
    icon: Microscope,
    title: 'Science Exhibition',
    desc: 'Students showcase innovative projects, working models, and research across Physics, Chemistry, Biology, and Technology.',
    image: '/images/facilities-lab.jpg',
    images: [
      { src: '/images/facilities-lab.jpg', caption: 'Science Exhibition — Working Models' },
      { src: '/images/academics.jpg',      caption: 'Students Explaining Their Projects' },
      { src: '/images/students-happy.jpg', caption: 'Award-Winning Science Exhibit' },
    ],
    detail: [
      'Annual science exhibition open to Classes VI–XII with participation from every section of the school.',
      'Students build working models, conduct live experiments, and present research posters to judges.',
      'Categories include Physics, Chemistry, Biology, Environmental Science, and Applied Technology.',
      'Judges are external — scientists, engineers, and professors from nearby colleges and institutions.',
      'Top 3 projects from each category go on to represent the school at district and state science fairs.',
    ],
  },
  {
    icon: Globe,
    title: 'MDN Debate Championship',
    desc: 'An annual inter-school debate tournament that hones critical thinking, public speaking, and argumentation skills.',
    image: '/images/about-school.jpg',
    images: [
      { src: '/images/about-school.jpg',   caption: 'MDN Debate Championship — Main Stage' },
      { src: '/images/academics.jpg',      caption: 'Students Presenting Their Arguments' },
      { src: '/images/students-happy.jpg', caption: 'Winners Receive Their Trophies' },
    ],
    detail: [
      'Annual inter-school debate held in February, open to Classes VIII–XII in English and Hindi mediums.',
      'Format includes parliamentary debate, extempore speaking, declamation, and Model United Nations.',
      'Teams from 25+ schools across Kaithal and Kurukshetra districts participate every year.',
      'Expert panel of judges from journalism, law, and academia provides structured feedback to all participants.',
      'MDN students have won at state level — two consecutive years as National MUN Best Delegate.',
    ],
  },
  {
    icon: Trophy,
    title: 'Inter-School Sports',
    desc: 'We host and participate in district and state-level sports tournaments across cricket, football, badminton, and athletics.',
    image: '/images/events-sports.jpg',
    images: [
      { src: '/images/events-sports.jpg',     caption: 'Inter-School Cricket Tournament' },
      { src: '/images/facilities-sports.jpg', caption: 'Football Finals at MDN Sports Ground' },
      { src: '/images/students-happy.jpg',    caption: 'Championship Trophy Presentation' },
    ],
    detail: [
      'MDN Global School hosts and participates in 10+ inter-school sports tournaments every academic year.',
      'Cricket, football, kabaddi, basketball, badminton, athletics, and chess are the primary competition sports.',
      'Our cricket team has been district champions for 3 consecutive years; football team reached state semi-finals.',
      'Girls\' kabaddi team won gold at the Haryana State School Games — a historic achievement for the school.',
      'Transport, food, and accommodation arranged for outstation tournament visits for selected teams.',
    ],
  },
  {
    icon: Calendar,
    title: 'Annual Day & Prize Distribution',
    desc: 'A grand celebration of student achievements with cultural performances, chief guest felicitation, and award ceremonies.',
    image: '/images/students-happy.jpg',
    images: [
      { src: '/images/students-happy.jpg',  caption: 'Annual Prize Distribution Ceremony' },
      { src: '/images/events-annual.jpg',   caption: 'Cultural Performances — Annual Day' },
      { src: '/images/about-school.jpg',    caption: 'Chief Guest Address & Felicitation' },
    ],
    detail: [
      'Held every December, Annual Day is the most anticipated event in the MDN Global School calendar.',
      'Students receive awards for academics, sports, leadership, community service, and co-curricular excellence.',
      'A 90-minute cultural programme includes classical & folk dance, skit, vocal performances, and a grand finale.',
      'Chief guest — typically a distinguished educator, public figure, or alumni — addresses students and parents.',
      'Graduation ceremony for Class XII students, where outgoing students receive their leaving certificates on stage.',
    ],
  },
];

/* ── Highlight Detail Modal ─────────────────────────────── */
function HighlightModal({ event, onClose }: { event: Highlight; onClose: () => void }) {
  const [current, setCurrent] = useState(0);
  const total = event.images.length;
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = (idx: number) => setCurrent((idx + total) % total);

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setCurrent(c => (c + 1) % total), 3200);
  };

  useEffect(() => {
    timerRef.current = setInterval(() => setCurrent(c => (c + 1) % total), 3200);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [total]);

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="bg-white rounded-3xl overflow-hidden shadow-2xl w-full max-w-2xl"
        onClick={e => e.stopPropagation()}
      >
        {/* Auto-scrolling images */}
        <div className="relative h-72 sm:h-80 bg-gray-900 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.img
              key={current}
              src={event.images[current].src}
              alt={event.images[current].caption}
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            />
          </AnimatePresence>

          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

          {/* Close */}
          <button onClick={onClose}
            className="absolute top-4 right-4 z-10 w-9 h-9 bg-black/50 hover:bg-black/75 rounded-full flex items-center justify-center text-white transition-colors">
            <X size={18} />
          </button>

          {/* Arrows */}
          {total > 1 && (
            <>
              <button onClick={() => { goTo(current - 1); resetTimer(); }}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 bg-black/40 hover:bg-black/65 rounded-full flex items-center justify-center text-white transition-colors">
                <ChevronLeft size={18} />
              </button>
              <button onClick={() => { goTo(current + 1); resetTimer(); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 bg-black/40 hover:bg-black/65 rounded-full flex items-center justify-center text-white transition-colors">
                <ChevronRight size={18} />
              </button>
            </>
          )}

          {/* Caption + dots */}
          <div className="absolute bottom-0 inset-x-0 p-4 flex items-center justify-between z-10">
            <p className="text-white/90 text-xs font-semibold">{event.images[current].caption}</p>
            <div className="flex items-center gap-1.5">
              {event.images.map((_, i) => (
                <button key={i} onClick={() => { goTo(i); resetTimer(); }}
                  className={`h-1.5 rounded-full transition-all ${i === current ? 'bg-white w-5' : 'bg-white/40 w-1.5'}`} />
              ))}
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-[#1a3a6b] rounded-xl flex items-center justify-center shrink-0">
              <event.icon size={19} className="text-white" />
            </div>
            <h2 className="text-xl font-serif font-black text-[#1a3a6b]">{event.title}</h2>
          </div>
          <ul className="space-y-3">
            {event.detail.map((line, i) => (
              <li key={i} className="flex gap-3 text-gray-600 text-sm leading-relaxed">
                <span className="mt-1.5 w-2 h-2 rounded-full bg-[#f5a623] shrink-0" />
                {line}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Photo Lightbox ─────────────────────────────────────── */
const galleryImages = [
  '/images/events-annual.jpg',
  '/images/facilities-sports.jpg',
  '/images/facilities-lab.jpg',
  '/images/events-sports.jpg',
  '/images/students-happy.jpg',
  '/images/about-school.jpg',
  '/images/academics.jpg',
  '/images/facilities-library.jpg',
];

function Lightbox({ startIdx, onClose }: { startIdx: number; onClose: () => void }) {
  const [current, setCurrent] = useState(startIdx);
  const total = galleryImages.length;

  const prev = () => setCurrent(c => (c - 1 + total) % total);
  const next = () => setCurrent(c => (c + 1) % total);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Close */}
      <button onClick={onClose}
        className="absolute top-5 right-5 z-20 w-10 h-10 bg-white/15 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors">
        <X size={20} />
      </button>

      {/* Counter */}
      <div className="absolute top-5 left-5 z-20 text-white/60 text-sm font-semibold">
        {current + 1} / {total}
      </div>

      {/* Image */}
      <div className="relative w-full max-w-4xl max-h-[80vh] flex items-center justify-center" onClick={e => e.stopPropagation()}>
        <AnimatePresence mode="wait">
          <motion.img
            key={current}
            src={galleryImages[current]}
            alt={`Gallery ${current + 1}`}
            className="max-w-full max-h-[80vh] rounded-2xl object-contain shadow-2xl"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          />
        </AnimatePresence>

        {/* Prev */}
        <button onClick={prev}
          className="absolute left-0 -translate-x-14 w-11 h-11 bg-white/15 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors">
          <ChevronLeft size={22} />
        </button>
        {/* Next */}
        <button onClick={next}
          className="absolute right-0 translate-x-14 w-11 h-11 bg-white/15 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors">
          <ChevronRight size={22} />
        </button>
      </div>

      {/* Dot strip */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5">
        {galleryImages.map((_, i) => (
          <button key={i} onClick={e => { e.stopPropagation(); setCurrent(i); }}
            className={`h-1.5 rounded-full transition-all ${i === current ? 'bg-white w-6' : 'bg-white/35 w-1.5'}`} />
        ))}
      </div>
    </motion.div>
  );
}

export default function Events() {
  const [selectedEvent, setSelectedEvent] = useState<Highlight | null>(null);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  return (
    <div className="flex flex-col">

      {/* ── Hero Banner ─────────────────────────────────────── */}
      <section className="relative min-h-[75vh] flex items-center overflow-hidden">
        <img
          src="/images/events-annual.jpg"
          alt="Events at MDN Global School"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1c46]/60 via-[#0a1c46]/35 to-[#500050]/8" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1c46]/42 via-transparent to-transparent" />

        <div className="container mx-auto px-6 py-24 relative z-10">
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}
            className="inline-flex items-center gap-2 bg-[#f5a623]/20 border border-[#f5a623]/40 rounded-full px-4 py-1.5 text-[#f5a623] text-xs font-bold tracking-widest uppercase mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#f5a623]" /> School Calendar 2024–25
          </motion.div>
          <motion.h1 variants={fadeUp} initial="hidden" animate="visible" custom={1}
            className="text-3xl sm:text-5xl md:text-7xl font-serif font-black text-white leading-tight mb-5"
            style={{ textShadow: '0 4px 24px rgba(0,0,0,0.5)' }}>
            Events & <span className="text-[#f5a623]">Culture</span>
          </motion.h1>
          <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={2}
            className="text-white/90 text-lg md:text-xl max-w-2xl leading-relaxed">
            A vibrant calendar of cultural festivals, sports competitions, academic fairs, and national celebrations that make MDN Global School truly alive.
          </motion.p>
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={3} className="mt-8 flex gap-3">
            <div className="h-1 w-20 bg-[#f5a623] rounded-full" />
            <div className="h-1 w-8 bg-white/30 rounded-full" />
          </motion.div>
        </div>
      </section>

      {/* ── Annual Highlights Grid ───────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-5">
            <p className="text-[#f5a623] font-bold tracking-widest uppercase text-sm mb-3">Year-Round Activity</p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#1a3a6b] mb-4">Annual Highlights</h2>
            <p className="text-gray-500 max-w-xl mx-auto text-lg">The signature events that define the MDN Global School experience</p>
          </motion.div>
          <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1}
            className="text-center text-sm text-gray-400 mb-12 flex items-center justify-center gap-2">
            <span className="inline-block w-4 h-px bg-gray-300" />
            Click any event to explore photos & details
            <span className="inline-block w-4 h-px bg-gray-300" />
          </motion.p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {annualHighlights.map((event, i) => (
              <motion.button
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                custom={i % 3 * 0.2}
                onClick={() => setSelectedEvent(event)}
                className="rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group border border-gray-100 text-left w-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#1a3a6b]/30 bg-white"
              >
                {/* Card image — clear, no heavy colour tint */}
                <div className="relative h-52 overflow-hidden bg-gray-900">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* Only a subtle darkening at the very bottom for text legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 w-10 h-10 bg-white/25 backdrop-blur-sm rounded-xl flex items-center justify-center text-white">
                    <event.icon size={20} />
                  </div>
                  <div className="absolute bottom-4 right-4 text-white/80 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity bg-black/30 px-2 py-1 rounded-full">
                    Explore →
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-serif font-bold text-[#1a3a6b] mb-3 group-hover:text-[#f5a623] transition-colors">{event.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{event.desc}</p>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Photo Gallery — Moments at MDN ──────────────────── */}
      <section className="py-24 bg-gradient-to-br from-[#0f2557] to-[#1a3a6b]">
        <div className="container mx-auto px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-6">
            <p className="text-[#f5a623] font-bold tracking-widest uppercase text-sm mb-3">Memories</p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">Moments at MDN</h2>
            <p className="text-white/60 max-w-xl mx-auto">Glimpses of the vibrant life inside our campus</p>
          </motion.div>
          <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1}
            className="text-center text-white/40 text-sm mb-10 flex items-center justify-center gap-2">
            <span className="inline-block w-4 h-px bg-white/20" />
            Click any photo to view full size & scroll through all images
            <span className="inline-block w-4 h-px bg-white/20" />
          </motion.p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {galleryImages.map((img, i) => (
              <motion.button
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                custom={i * 0.08}
                onClick={() => setLightboxIdx(i)}
                className="group aspect-square rounded-2xl overflow-hidden shadow-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/40 relative"
              >
                <img
                  src={img}
                  alt={`Gallery ${i + 1}`}
                  className="w-full h-full object-cover brightness-90 group-hover:brightness-110 group-hover:scale-110 transition-all duration-500"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/20 backdrop-blur-sm rounded-full p-2">
                    <svg width="18" height="18" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
                      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/><path d="M11 8v6M8 11h6"/>
                    </svg>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Modals ──────────────────────────────────────────── */}
      <AnimatePresence>
        {selectedEvent && (
          <HighlightModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {lightboxIdx !== null && (
          <Lightbox startIdx={lightboxIdx} onClose={() => setLightboxIdx(null)} />
        )}
      </AnimatePresence>

    </div>
  );
}
