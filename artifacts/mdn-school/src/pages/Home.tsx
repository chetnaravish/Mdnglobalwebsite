import { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  BookOpen, Users, Trophy, GraduationCap, ChevronRight, Star, Award, CheckCircle,
  ArrowRight, MapPin, Phone, Mail, Send, Quote
} from 'lucide-react';
import { Link } from 'wouter';

/* ── Animated counter ─────────────────────────────────── */
function Counter({ end, suffix = '' }: { end: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!isInView) return;
    let startTime: number | null = null;
    const duration = 2000;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const p = Math.min((ts - startTime) / duration, 1);
      setCount(Math.floor(p * end));
      if (p < 1) requestAnimationFrame(step);
      else setCount(end);
    };
    requestAnimationFrame(step);
  }, [isInView, end]);
  return <span ref={ref}>{count}{suffix}</span>;
}

/* ── Slide data ──────────────────────────────────────── */
const slides = [
  { src: '/images/mdn-building-1.avif', pos: 'center 30%',    filter: '' },
  { src: '/images/mdn-building-3.jfif', pos: 'center center', filter: 'contrast(1.12) brightness(1.06) saturate(1.1)' },
  { src: '/images/mdn-building-2.jfif', pos: 'center 20%',    filter: 'contrast(1.15) brightness(1.08) saturate(1.12)' },
];
const SLIDE_MS = 3500;

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } })
};

/* ── Reviews data ────────────────────────────────────── */
const reviews = [
  { name: 'Sunita Sharma', role: 'Parent — Class VIII', rating: 5, text: 'MDN Global School has transformed my son. The teachers genuinely care about every child\'s growth, and the academics are exceptional.' },
  { name: 'Rajiv Mehta', role: 'Parent — Class XI', rating: 5, text: 'The smart classrooms and experienced faculty gave my daughter the competitive edge she needed. She cleared NEET on her first attempt!' },
  { name: 'Priya Arora', role: 'Alumni — Batch 2022', rating: 5, text: 'My five years at MDN were the best years of my life. The discipline, values, and friendships I gained here shaped who I am today.' },
  { name: 'Ankit Verma', role: 'Parent — Class V', rating: 5, text: 'From sports to academics, MDN covers everything. The campus is beautiful and the staff makes you feel like family.' },
  { name: 'Meera Gupta', role: 'Parent — Class XII', rating: 5, text: 'My daughter topped the district in CBSE XII from MDN. The board preparation programme here is truly outstanding.' },
  { name: 'Deepak Yadav', role: 'Alumni — Batch 2020', rating: 5, text: 'MDN taught me not just academics but also leadership, sportsmanship, and the confidence to face the world.' },
  { name: 'Kavita Joshi', role: 'Parent — Class II', rating: 5, text: 'The Pre-Primary section is so nurturing. My daughter loves coming to school every single day — that says everything.' },
  { name: 'Rohit Batra', role: 'Parent — Class IX', rating: 5, text: 'Safe transport, GPS tracking, CCTV — as a parent I feel completely at ease knowing my child is in safe hands.' },
];

function ReviewCard({ review }: { review: typeof reviews[0] }) {
  return (
    <div className="flex-shrink-0 w-72 mx-3 bg-white rounded-2xl p-6 shadow-md border border-gray-100 flex flex-col gap-4">
      <div className="flex gap-0.5">
        {Array(review.rating).fill(0).map((_, i) => (
          <Star key={i} size={14} className="text-[#f5a623] fill-[#f5a623]" />
        ))}
      </div>
      <p className="text-gray-600 text-sm leading-relaxed flex-1">"{review.text}"</p>
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#1a3a6b] to-[#2563eb] flex items-center justify-center text-white font-bold text-sm shrink-0">
          {review.name.charAt(0)}
        </div>
        <div>
          <p className="font-bold text-[#1a3a6b] text-sm leading-tight">{review.name}</p>
          <p className="text-gray-400 text-xs">{review.role}</p>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [current, setCurrent] = useState(0);
  const [formData, setFormData] = useState({ name: '', studentName: '', phone: '', classLevel: '', message: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'sent' | 'error'>('idle');
  const [formError, setFormError] = useState('');

  useEffect(() => {
    const id = setInterval(() => setCurrent(p => (p + 1) % slides.length), SLIDE_MS);
    return () => clearInterval(id);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    setFormError('');
    try {
      const res = await fetch(`${import.meta.env.BASE_URL}api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          studentName: formData.studentName,
          phone: formData.phone,
          classApplying: formData.classLevel,
          message: formData.message,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setFormStatus('sent');
        setFormData({ name: '', studentName: '', phone: '', classLevel: '', message: '' });
      } else {
        setFormError(json.message || 'Submission failed. Please try again.');
        setFormStatus('error');
      }
    } catch {
      setFormError('Network error. Please check your connection and try again.');
      setFormStatus('error');
    }
  };

  // Duplicate for seamless loop
  const row1 = [...reviews, ...reviews];
  const row2 = [...reviews.slice(4), ...reviews.slice(0, 4), ...reviews.slice(4), ...reviews.slice(0, 4)];

  return (
    <div className="flex flex-col">

      {/* ══════════════ HERO ══════════════ */}
      <section className="relative min-h-[100dvh] flex items-center overflow-hidden bg-[#0a1c46]">
        {/* Slides */}
        {slides.map((slide, i) => (
          <div key={slide.src} className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
            style={{ opacity: i === current ? 1 : 0, zIndex: i === current ? 1 : 0 }}>
            <img src={slide.src} alt="" className="w-full h-full object-cover"
              style={{ objectPosition: slide.pos, filter: slide.filter || 'none' }} />
          </div>
        ))}
        {/* Overlay — left-heavy like About page */}
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#0a1c46]/75 via-[#0a1c46]/45 to-[#0a1c46]/15" />
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#0a1c46]/55 via-transparent to-transparent" />

        {/* Content — left-aligned, same container as About */}
        <div className="container mx-auto px-6 py-32 relative z-20">

          {/* CBSE badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-[#f5a623]/20 border border-[#f5a623]/40 rounded-full px-4 py-1.5 text-[#f5a623] text-xs font-bold tracking-widest uppercase mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#f5a623]" /> CBSE Affiliated · Kaithal, Haryana
          </motion.div>

          {/* School Name */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif font-black text-white mb-6"
            style={{
              fontSize: 'clamp(1.75rem, 6vw, 5rem)',
              letterSpacing: '0.04em',
              textShadow: '0 4px 32px rgba(0,0,0,0.5)',
              lineHeight: 1.1,
            }}
          >
            MDN Global School
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-white/85 text-lg md:text-xl leading-relaxed max-w-xl"
            style={{ textShadow: '0 2px 12px rgba(0,0,0,0.4)' }}
          >
            Over two decades of nurturing young minds, building character, and creating future leaders in the heart of Haryana.
          </motion.p>

          {/* Decorative line */}
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1.0 }}
            className="mt-8 flex gap-3">
            <div className="h-1 w-20 bg-[#f5a623] rounded-full" />
            <div className="h-1 w-8 bg-white/30 rounded-full" />
            <div className="h-1 w-4 bg-white/20 rounded-full" />
          </motion.div>
        </div>

        {/* Slide dots */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {slides.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)} aria-label={`Slide ${i + 1}`}
              className={`rounded-full transition-all duration-500 ${i === current ? 'w-8 h-1.5 bg-[#f5a623]' : 'w-2 h-1.5 bg-white/35 hover:bg-white/60'}`} />
          ))}
        </div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.5, duration: 1 }}
          className="absolute bottom-8 right-8 z-20 hidden md:flex flex-col items-center gap-1">
          <div className="w-px h-10 bg-gradient-to-b from-white/50 to-transparent" />
          <span className="text-[9px] uppercase tracking-[0.2em] text-white/40 font-semibold">Scroll</span>
        </motion.div>
      </section>

      {/* ══════════════ STATS ══════════════ */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: 'linear-gradient(#1a3a6b 1px, transparent 1px), linear-gradient(90deg, #1a3a6b 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#1a3a6b] via-[#2563eb] to-[#1a3a6b]" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <div className="inline-flex items-center gap-2 text-[#f5a623] font-bold tracking-widest uppercase text-xs mb-4">
              <div className="w-8 h-px bg-[#f5a623]" /> By The Numbers <div className="w-8 h-px bg-[#f5a623]" />
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#0a1c46] mb-3">MDN Global School</h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">A legacy of excellence, measured in milestones that matter.</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
            {[
              { icon: Award, count: 25, suffix: '+', label: 'Years of Excellence', sub: 'Established 2000', iconBg: 'bg-blue-50', iconColor: 'text-[#1a3a6b]', numColor: 'text-[#1a3a6b]', border: 'border-blue-100', top: 'bg-[#1a3a6b]' },
              { icon: Users, count: 2000, suffix: '+', label: 'Students Enrolled', sub: 'Growing every year', iconBg: 'bg-amber-50', iconColor: 'text-[#f5a623]', numColor: 'text-[#f5a623]', border: 'border-amber-100', top: 'bg-[#f5a623]' },
              { icon: GraduationCap, count: 150, suffix: '+', label: 'Expert Faculty', sub: 'Dedicated educators', iconBg: 'bg-blue-50', iconColor: 'text-[#1a3a6b]', numColor: 'text-[#1a3a6b]', border: 'border-blue-100', top: 'bg-[#1a3a6b]' },
              { icon: Trophy, count: 100, suffix: '%', label: 'CBSE Pass Rate', sub: '5 consecutive years', iconBg: 'bg-amber-50', iconColor: 'text-[#f5a623]', numColor: 'text-[#f5a623]', border: 'border-amber-100', top: 'bg-[#f5a623]' },
            ].map((stat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.65, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6, boxShadow: '0 20px 50px rgba(26,58,107,0.14)' }}
                className={`relative bg-white rounded-2xl border ${stat.border} p-8 text-center flex flex-col items-center shadow-sm overflow-hidden cursor-default`}>
                <div className={`absolute top-0 inset-x-0 h-1 ${stat.top}`} />
                <div className={`w-16 h-16 rounded-2xl ${stat.iconBg} flex items-center justify-center mb-5 shadow-sm`}>
                  <stat.icon size={30} className={stat.iconColor} />
                </div>
                <div className={`text-5xl md:text-6xl font-serif font-black leading-none mb-3 ${stat.numColor}`}>
                  <Counter end={stat.count} suffix={stat.suffix} />
                </div>
                <div className="w-10 h-0.5 bg-gray-200 rounded mb-3" />
                <p className="text-[#0a1c46] font-bold text-base leading-snug mb-1">{stat.label}</p>
                <p className="text-gray-400 text-xs uppercase tracking-widest">{stat.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ ABOUT TEASER ══════════════ */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6 }}>
              <div className="text-[#f5a623] font-bold tracking-widest uppercase mb-4 text-sm flex items-center gap-3">
                <div className="w-10 h-px bg-[#f5a623]" /> Welcome to MDN
              </div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#1a3a6b] mb-6 leading-tight">
                Shaping the Leaders<br />of Tomorrow
              </h2>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                At MDN Global School, education goes beyond textbooks. Our campus in Kaithal is an ecosystem where children discover their potential, build character, and develop the skills to thrive in a changing world.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  'CBSE curriculum from Nursery to Class XII',
                  'Smart classrooms with digital learning tools',
                  'World-class sports & arts facilities',
                  'Focus on values, ethics, and leadership'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-800 font-medium">
                    <CheckCircle size={18} className="text-[#f5a623] shrink-0" /> {item}
                  </li>
                ))}
              </ul>
              <Link href="/about" className="inline-flex items-center gap-2 text-[#1a3a6b] font-bold hover:text-[#f5a623] transition-colors group">
                Read our full story <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 1.04 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.8 }}>
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl group relative">
                <img src="/images/mdn-building-4.avif" alt="MDN Global School Campus" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-8">
                  <div className="text-white">
                    <div className="text-4xl font-serif font-bold mb-1 text-[#f5a623]">100%</div>
                    <div className="text-sm font-medium opacity-90">Board Results — 5 consecutive years</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════ WHY CHOOSE MDN ══════════════ */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
            <p className="text-[#f5a623] font-bold tracking-widest uppercase text-sm mb-3">The MDN Difference</p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#1a3a6b] mb-4">Why Families Choose MDN</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">Everything your child needs to thrive — academically, physically, and as a person.</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Academics', icon: BookOpen, image: '/images/academics.jpg', desc: 'Rigorous CBSE curriculum from Nursery to Class XII, with smart classrooms, experienced faculty, and a 100% board pass record.', link: '/academics', accent: 'text-[#1a3a6b]', bg: 'bg-blue-50' },
              { title: 'Facilities', icon: Trophy, image: '/images/facilities-sports.jpg', desc: 'A 10-acre green campus with advanced science labs, a 15,000-book library, sports complex, and GPS-enabled transport.', link: '/facilities', accent: 'text-[#f5a623]', bg: 'bg-amber-50' },
              { title: 'Events & Culture', icon: Star, image: '/images/events-annual.jpg', desc: 'A vibrant calendar of cultural fests, sports meets, science exhibitions, and national celebrations that bring the campus alive.', link: '/events', accent: 'text-[#1a3a6b]', bg: 'bg-blue-50' },
            ].map((f, i) => (
              <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} custom={i * 0.15}
                className="group rounded-2xl overflow-hidden border border-gray-100 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <div className="relative h-52 overflow-hidden">
                  <img src={f.image} alt={f.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a3a6b]/80 to-transparent" />
                  <div className={`absolute top-4 left-4 w-11 h-11 ${f.bg} rounded-xl flex items-center justify-center ${f.accent}`}>
                    <f.icon size={22} />
                  </div>
                  <h3 className="absolute bottom-4 left-5 text-2xl font-serif font-black text-white">{f.title}</h3>
                </div>
                <div className="p-7 bg-white">
                  <p className="text-gray-600 leading-relaxed mb-5">{f.desc}</p>
                  <Link href={f.link} className="inline-flex items-center gap-2 text-[#1a3a6b] font-bold hover:text-[#f5a623] transition-colors">
                    Explore <ChevronRight size={16} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ GALLERY TEASER ══════════════ */}
      <section className="py-24 bg-gradient-to-br from-[#0f2557] to-[#1a3a6b] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '44px 44px' }} />
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <p className="text-[#f5a623] font-bold tracking-widest uppercase text-sm mb-3">Life at MDN</p>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-white">Moments That Define Us</h2>
            </motion.div>
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1}>
              <Link href="/gallery" className="inline-flex items-center gap-2 border border-white/30 text-white/80 hover:text-white px-6 py-3 rounded-full font-semibold text-sm hover:bg-white/10 transition-all">
                View Full Gallery <ArrowRight size={16} />
              </Link>
            </motion.div>
          </div>
          {/* Mobile: 2-col grid | Desktop: bento-style 4-col */}
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:grid-rows-2 md:h-[420px]">
            {[
              { src: '/images/events-annual.jpg',     mSpan: 'col-span-2 aspect-[16/9]', dSpan: 'md:col-span-2 md:row-span-2 md:aspect-auto', pos: 'center center' },
              { src: '/images/facilities-sports.jpg', mSpan: 'aspect-video',              dSpan: 'md:col-span-1 md:row-span-1 md:aspect-auto', pos: 'center center' },
              { src: '/images/facilities-lab.jpg',    mSpan: 'aspect-video',              dSpan: 'md:col-span-1 md:row-span-1 md:aspect-auto', pos: 'center center' },
              { src: '/images/events-sports.jpg',     mSpan: 'aspect-video',              dSpan: 'md:col-span-1 md:row-span-1 md:aspect-auto', pos: 'center center' },
              { src: '/images/students-happy.jpg',    mSpan: 'aspect-video',              dSpan: 'md:col-span-1 md:row-span-1 md:aspect-auto', pos: 'center top'   },
            ].map((img, i) => (
              <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} custom={i * 0.1}
                className={`${img.mSpan} ${img.dSpan} rounded-2xl overflow-hidden group cursor-pointer`}>
                <img src={img.src} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 brightness-90 hover:brightness-110"
                  style={{ objectPosition: img.pos }} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ STUDENT & PARENT REVIEWS ══════════════ */}
      <section className="py-24 bg-[#f8f9ff] overflow-hidden">
        <style>{`
          @keyframes marquee-left  { from { transform: translateX(0) } to { transform: translateX(-50%) } }
          @keyframes marquee-right { from { transform: translateX(-50%) } to { transform: translateX(0) } }
          .marquee-left  { animation: marquee-left  36s linear infinite; display: flex; width: max-content; }
          .marquee-right { animation: marquee-right 40s linear infinite; display: flex; width: max-content; }
          .marquee-left:hover, .marquee-right:hover { animation-play-state: paused; }
        `}</style>

        <div className="container mx-auto px-6 mb-12">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center">
            <p className="text-[#f5a623] font-bold tracking-widest uppercase text-sm mb-3 flex items-center justify-center gap-2">
              <Quote size={14} /> What People Say
            </p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#1a3a6b] mb-4">Voices of Our Community</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Real words from parents, students, and alumni who've experienced the MDN difference</p>
          </motion.div>
        </div>

        {/* Row 1 — scrolls left */}
        <div className="overflow-hidden mb-5">
          <div className="marquee-left">
            {row1.map((r, i) => <ReviewCard key={i} review={r} />)}
          </div>
        </div>

        {/* Row 2 — scrolls right */}
        <div className="overflow-hidden">
          <div className="marquee-right">
            {row2.map((r, i) => <ReviewCard key={i} review={r} />)}
          </div>
        </div>
      </section>

      {/* ══════════════ CONTACT FORM ══════════════ */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #1a3a6b 1px, transparent 0)', backgroundSize: '36px 36px' }} />
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-5xl mx-auto">

            {/* Left info */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6 }}>
              <p className="text-[#f5a623] font-bold tracking-widest uppercase text-sm flex items-center gap-3 mb-4">
                <span className="w-10 h-px bg-[#f5a623]" /> Get in Touch
              </p>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#1a3a6b] mb-6 leading-tight">
                Begin Your Child's<br />Journey with MDN
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                Have questions about admissions, facilities, or curriculum? Fill in the form and our team will get back to you within 24 hours.
              </p>
              <div className="space-y-5">
                {[
                  { icon: MapPin, label: 'Address', value: 'MDN Global School, Kaithal, Haryana — 136027' },
                  { icon: Phone, label: 'Phone', value: '+91 98765 43210' },
                  { icon: Mail, label: 'Email', value: 'admissions@mdnglobalschool.in' },
                ].map((c, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#1a3a6b]/08 flex items-center justify-center shrink-0 border border-[#1a3a6b]/10">
                      <c.icon size={18} className="text-[#1a3a6b]" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">{c.label}</p>
                      <p className="text-gray-700 font-medium text-sm">{c.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right form */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6 }}>
              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
                <AnimatePresence mode="wait">
                  {formStatus === 'sent' ? (
                    <motion.div key="sent" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                      className="flex flex-col items-center justify-center py-12 text-center">
                      <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                        <CheckCircle size={32} className="text-green-500" />
                      </div>
                      <h3 className="text-2xl font-serif font-bold text-[#1a3a6b] mb-2">Message Sent!</h3>
                      <p className="text-gray-500">Our admissions team will contact you within 24 hours.</p>
                      <button
                        type="button"
                        onClick={() => setFormStatus('idle')}
                        className="mt-6 px-6 py-2.5 rounded-xl border-2 border-[#1a3a6b] text-[#1a3a6b] font-bold text-sm hover:bg-[#1a3a6b] hover:text-white transition-all">
                        Send Another Enquiry
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form key="form" onSubmit={handleSubmit} className="space-y-5">
                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Parent / Guardian Name *</label>
                        <input required type="text" placeholder="Your full name"
                          value={formData.name} onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#1a3a6b] focus:ring-2 focus:ring-[#1a3a6b]/15 outline-none transition-all text-gray-800 text-sm" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Student Name *</label>
                        <input required type="text" placeholder="Student's full name"
                          value={formData.studentName} onChange={e => setFormData(p => ({ ...p, studentName: e.target.value }))}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#1a3a6b] focus:ring-2 focus:ring-[#1a3a6b]/15 outline-none transition-all text-gray-800 text-sm" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Phone Number *</label>
                        <input required type="tel" placeholder="+91 XXXXX XXXXX"
                          value={formData.phone} onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#1a3a6b] focus:ring-2 focus:ring-[#1a3a6b]/15 outline-none transition-all text-gray-800 text-sm" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Admission For Class</label>
                        <input type="text" placeholder="e.g. Class V, KG 1, Nursery"
                          value={formData.classLevel} onChange={e => setFormData(p => ({ ...p, classLevel: e.target.value }))}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#1a3a6b] focus:ring-2 focus:ring-[#1a3a6b]/15 outline-none transition-all text-gray-800 text-sm" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Message</label>
                        <textarea rows={3} placeholder="Any specific questions or information you'd like to share…"
                          value={formData.message} onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#1a3a6b] focus:ring-2 focus:ring-[#1a3a6b]/15 outline-none transition-all text-gray-800 text-sm resize-none" />
                      </div>
                      {formStatus === 'error' && (
                        <p className="text-red-500 text-xs text-center">{formError}</p>
                      )}
                      <button type="submit" disabled={formStatus === 'submitting'}
                        className="w-full flex items-center justify-center gap-2 bg-[#1a3a6b] text-white py-3.5 rounded-xl font-bold text-sm hover:bg-[#0f2557] transition-all hover:shadow-lg hover:shadow-[#1a3a6b]/30 active:scale-98 disabled:opacity-70 disabled:cursor-not-allowed">
                        <Send size={16} /> {formStatus === 'submitting' ? 'Sending…' : 'Send Enquiry'}
                      </button>
                      <p className="text-center text-xs text-gray-400">We respond within 24 hours · No spam, ever</p>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ══════════════ FIND US / MAP ══════════════ */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* subtle bg pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #1a3a6b 1px, transparent 0)', backgroundSize: '28px 28px' }} />

        <div className="container mx-auto px-6 relative z-10">

          {/* heading */}
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6 }}
            className="text-center mb-14">
            <span className="inline-block text-xs font-black tracking-[0.22em] uppercase text-[#f5a623] bg-[#f5a623]/10 border border-[#f5a623]/25 rounded-full px-4 py-1.5 mb-4">
              Our Location
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#1a3a6b] mb-4">
              Visit <span className="text-[#f5a623]">MDN Global School</span>
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              Come see our campus in person — we'd love to show you around.
            </p>
          </motion.div>

          {/* map + info grid */}
          <div className="grid lg:grid-cols-3 gap-8 items-stretch">

            {/* info cards — left column */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6 }}
              className="flex flex-col gap-5">

              {[
                {
                  icon: MapPin,
                  color: 'text-[#f5a623]',
                  bg: 'bg-[#f5a623]/10',
                  label: 'Address',
                  lines: ['MDN Global School', 'Kaithal, Haryana – 136027', 'India'],
                },
                {
                  icon: Phone,
                  color: 'text-emerald-600',
                  bg: 'bg-emerald-50',
                  label: 'Phone',
                  lines: ['+91 98765 43210', '+91 01746 XXXXXX'],
                },
                {
                  icon: Mail,
                  color: 'text-blue-600',
                  bg: 'bg-blue-50',
                  label: 'Email',
                  lines: ['info@mdnglobalschool.com', 'admissions@mdnglobalschool.com'],
                },
              ].map(({ icon: Icon, color, bg, label, lines }, i) => (
                <div key={i} className="flex items-start gap-4 bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
                  <div className={`w-11 h-11 rounded-xl ${bg} flex items-center justify-center shrink-0`}>
                    <Icon size={20} className={color} />
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-wider text-gray-400 mb-1">{label}</p>
                    {lines.map((l, j) => (
                      <p key={j} className="text-[#1a3a6b] font-semibold text-sm leading-snug">{l}</p>
                    ))}
                  </div>
                </div>
              ))}

              {/* CTA button */}
              <a href="https://maps.app.goo.gl/uyF7zkAFZSvnAiaS9" target="_blank" rel="noopener noreferrer"
                className="mt-auto flex items-center justify-center gap-2 bg-[#1a3a6b] text-white px-6 py-3.5 rounded-2xl font-bold text-sm hover:bg-[#0f2557] transition-all hover:shadow-lg hover:shadow-[#1a3a6b]/30">
                <MapPin size={16} /> Get Directions
              </a>
            </motion.div>

            {/* map — right 2 columns */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-2 relative rounded-3xl overflow-hidden shadow-2xl border border-gray-100 min-h-[420px]">
              <iframe
                title="MDN Global School – Kaithal Location"
                src="https://maps.google.com/maps?q=29.778579,76.4346884&z=17&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, display: 'block', minHeight: '420px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              {/* floating badge over map */}
              <div className="absolute top-4 left-4 flex items-center gap-2 bg-white rounded-xl px-4 py-2.5 shadow-lg border border-gray-100">
                <div className="w-2.5 h-2.5 rounded-full bg-[#f5a623] animate-pulse" />
                <span className="text-[#1a3a6b] font-bold text-xs">MDN Global School, Kaithal</span>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ══════════════ HAPPY LEARNERS ══════════════ */}
      <section className="py-24 bg-[#1a3a6b] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #2563eb 0%, transparent 50%), radial-gradient(circle at 80% 50%, #0a1c46 0%, transparent 50%)' }} />
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} className="order-2 md:order-1">
              <img src="/images/students-happy.jpg" alt="Happy Students" className="w-full rounded-3xl shadow-2xl" />
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} className="order-1 md:order-2 text-white">
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">A Community of<br />Happy Learners</h2>
              <p className="text-white/75 text-lg mb-6 leading-relaxed">
                At MDN Global School, learning is joyous and every student feels valued. Our campus resonates with the energy and enthusiasm of bright young minds ready to take on the world.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'Safe, nurturing environment for every child',
                  'Strong parent-school communication',
                  'Annual fests, sports days, and cultural events',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-white/80 font-medium">
                    <CheckCircle size={17} className="text-[#f5a623] shrink-0" /> {item}
                  </li>
                ))}
              </ul>
              <Link href="/contact" className="inline-block bg-white text-[#1a3a6b] px-8 py-3 rounded-full text-lg font-bold hover:bg-blue-50 transition-colors shadow-lg">
                Join Our Family
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  );
}
