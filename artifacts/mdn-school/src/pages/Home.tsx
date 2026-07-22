import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { BookOpen, Users, Trophy, GraduationCap, ChevronRight, Star, Award, Microscope, Music, Dumbbell, CheckCircle, ArrowRight } from 'lucide-react';
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
  { src: '/images/hero-bg.jpg',        pos: 'center top'    },
  { src: '/images/about-school.jpg',   pos: 'center center' },
  { src: '/images/students-happy.jpg', pos: 'center center' },
  { src: '/images/academics.jpg',      pos: 'center center' },
];
const SLIDE_MS = 3500;

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } })
};

export default function Home() {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setCurrent(p => (p + 1) % slides.length), SLIDE_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex flex-col">

      {/* ══════════════ HERO ══════════════ */}
      <section className="relative min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden bg-[#0a1c46]">
        {slides.map((slide, i) => (
          <div key={slide.src} className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
            style={{ opacity: i === current ? 1 : 0, zIndex: i === current ? 1 : 0 }}>
            <img src={slide.src} alt="" className="w-full h-full object-cover" style={{ objectPosition: slide.pos }} />
          </div>
        ))}
        <div className="absolute inset-0 z-10"
          style={{ background: 'linear-gradient(135deg, rgba(6,18,58,0.58) 0%, rgba(10,40,100,0.38) 50%, rgba(6,18,58,0.54) 100%)' }} />
        <div className="absolute inset-0 z-10"
          style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(5,14,45,0.28) 100%)' }} />
        <div className="absolute top-0 right-0 z-10 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 65%)', transform: 'translate(30%, -30%)' }} />

        <div className="relative z-20 w-full max-w-6xl mx-auto px-6 text-center flex flex-col items-center">

          {/* School Name — single line */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif font-black text-white text-center mb-10 whitespace-nowrap"
            style={{
              fontSize: 'clamp(1.8rem, 5.6vw, 5.4rem)',
              letterSpacing: '0.12em',
              textShadow: '0 4px 32px rgba(0,0,0,0.6)',
              lineHeight: 1,
            }}
          >
            MDN GLOBAL SCHOOL
          </motion.h1>

          {/* CBSE Affiliated */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="inline-flex items-center gap-3 px-7 py-2.5 rounded-full border border-white/30"
            style={{ background: 'rgba(255,255,255,0.10)', backdropFilter: 'blur(12px)' }}
          >
            <span className="w-2 h-2 rounded-full bg-[#f5a623] animate-pulse" />
            <span className="text-white font-bold tracking-[0.22em] uppercase text-sm">CBSE AFFILIATED</span>
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
                <img src="/images/about-school.jpg" alt="School Campus" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
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
              {
                title: 'Academics',
                icon: BookOpen,
                image: '/images/academics.jpg',
                desc: 'Rigorous CBSE curriculum from Nursery to Class XII, with smart classrooms, experienced faculty, and a 100% board pass record.',
                link: '/academics',
                accent: 'text-[#1a3a6b]',
                bg: 'bg-blue-50',
              },
              {
                title: 'Facilities',
                icon: Trophy,
                image: '/images/facilities-sports.jpg',
                desc: 'A 10-acre green campus with advanced science labs, a 15,000-book library, sports complex, and GPS-enabled transport.',
                link: '/facilities',
                accent: 'text-[#f5a623]',
                bg: 'bg-amber-50',
              },
              {
                title: 'Events & Culture',
                icon: Star,
                image: '/images/events-annual.jpg',
                desc: 'A vibrant calendar of cultural fests, sports meets, science exhibitions, and national celebrations that bring the campus alive.',
                link: '/events',
                accent: 'text-[#1a3a6b]',
                bg: 'bg-blue-50',
              },
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

      {/* ══════════════ CO-CURRICULAR STRIP ══════════════ */}
      <section className="py-16 bg-[#f5a623]">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <p className="text-[#1a3a6b]/70 font-bold tracking-widest uppercase text-xs mb-2">Beyond the Classroom</p>
              <h3 className="text-3xl font-serif font-bold text-[#1a3a6b]">Co-Curricular Programmes</h3>
            </div>
            <div className="flex flex-wrap gap-4">
              {[
                { icon: Dumbbell, label: 'Sports' },
                { icon: Music, label: 'Music & Dance' },
                { icon: Microscope, label: 'Science Club' },
                { icon: Star, label: 'Debate & MUN' },
              ].map((item, i) => (
                <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i * 0.1}
                  className="flex items-center gap-2.5 bg-[#1a3a6b]/15 border border-[#1a3a6b]/20 rounded-full px-5 py-2.5">
                  <item.icon size={16} className="text-[#1a3a6b]" />
                  <span className="text-[#1a3a6b] font-semibold text-sm">{item.label}</span>
                </motion.div>
              ))}
            </div>
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
          {/* 8-photo grid */}
          <div className="grid grid-cols-4 grid-rows-2 gap-3 h-[420px]">
            {[
              { src: '/images/events-annual.jpg', span: 'col-span-2 row-span-2', pos: 'center center' },
              { src: '/images/facilities-sports.jpg', span: 'col-span-1 row-span-1', pos: 'center center' },
              { src: '/images/facilities-lab.jpg', span: 'col-span-1 row-span-1', pos: 'center center' },
              { src: '/images/events-sports.jpg', span: 'col-span-1 row-span-1', pos: 'center center' },
              { src: '/images/students-happy.jpg', span: 'col-span-1 row-span-1', pos: 'center top' },
            ].map((img, i) => (
              <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} custom={i * 0.1}
                className={`${img.span} rounded-2xl overflow-hidden group cursor-pointer`}>
                <img src={img.src} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 brightness-90 hover:brightness-110"
                  style={{ objectPosition: img.pos }} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ HAPPY LEARNERS CTA ══════════════ */}
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
