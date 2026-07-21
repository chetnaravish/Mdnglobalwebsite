import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { BookOpen, Users, Trophy, GraduationCap, ChevronRight, Star, Award } from 'lucide-react';
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

export default function Home() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setCurrent(p => (p + 1) % slides.length), SLIDE_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex flex-col">

      {/* ══════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════ */}
      <section className="relative min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden bg-[#0a1c46]">

        {/* ── Background images — crossfade only, no slide ── */}
        {slides.map((slide, i) => (
          <div
            key={slide.src}
            className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
            style={{ opacity: i === current ? 1 : 0, zIndex: i === current ? 1 : 0 }}
          >
            <img
              src={slide.src}
              alt=""
              className="w-full h-full object-cover"
              style={{ objectPosition: slide.pos }}
            />
          </div>
        ))}

        {/* ── Layered overlay: rich blue-to-transparent ── */}
        <div className="absolute inset-0 z-10"
          style={{
            background: 'linear-gradient(135deg, rgba(6,18,58,0.82) 0%, rgba(10,40,100,0.68) 50%, rgba(6,18,58,0.78) 100%)',
          }}
        />
        {/* Vignette */}
        <div className="absolute inset-0 z-10"
          style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(5,14,45,0.55) 100%)' }}
        />

        {/* ── Decorative blue + white shapes ── */}
        {/* Large soft blue arc top-right */}
        <div className="absolute top-0 right-0 z-10 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 65%)', transform: 'translate(30%, -30%)' }}
        />
        {/* White shimmer bottom-left */}
        <div className="absolute bottom-0 left-0 z-10 w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 65%)', transform: 'translate(-30%, 30%)' }}
        />
        {/* Thin white horizontal lines — blueprint feel */}
        <div className="absolute inset-x-0 top-[30%] z-10 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 top-[70%] z-10 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent pointer-events-none" />

        {/* ── Content ── */}
        <div className="relative z-20 w-full max-w-5xl mx-auto px-6 text-center flex flex-col items-center">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="inline-flex items-center gap-2.5 mb-10 px-5 py-2 rounded-full border border-white/25"
            style={{ background: 'rgba(255,255,255,0.10)', backdropFilter: 'blur(10px)' }}
          >
            <span className="w-2 h-2 rounded-full bg-[#f5a623] animate-pulse" />
            <span className="text-white/90 text-xs font-semibold tracking-[0.18em] uppercase">
              CBSE Affiliated · Est. 2000 · Kaithal, Haryana
            </span>
          </motion.div>

          {/* School name */}
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="mb-3 w-full"
          >
            <h1
              className="font-serif font-black leading-[0.9] tracking-tight text-white"
              style={{ fontSize: 'clamp(3.2rem, 11vw, 8rem)', textShadow: '0 6px 40px rgba(0,0,0,0.55)' }}
            >
              MDN{' '}
              <span style={{
                background: 'linear-gradient(135deg, #f5d06a 0%, #f5a623 50%, #e07b10 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(0 0 24px rgba(245,166,35,0.5))',
              }}>
                GLOBAL
              </span>
            </h1>
            <h1
              className="font-serif font-black leading-[0.9] tracking-tight text-white"
              style={{ fontSize: 'clamp(3.2rem, 11vw, 8rem)', textShadow: '0 6px 40px rgba(0,0,0,0.55)' }}
            >
              SCHOOL
            </h1>
          </motion.div>

          {/* KAITHAL sub-title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="h-px w-12 bg-white/35" />
            <span
              className="font-serif font-bold tracking-[0.35em] text-white/80 uppercase"
              style={{ fontSize: 'clamp(1rem, 3.5vw, 1.7rem)' }}
            >
              KAITHAL · HARYANA
            </span>
            <div className="h-px w-12 bg-white/35" />
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.7 }}
            className="text-white/80 text-lg md:text-xl font-light italic mb-12 max-w-xl"
          >
            Shaping Leaders · Nurturing Minds · Building Futures
          </motion.p>

          {/* Single CTA */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            className="flex items-center gap-4"
          >
            <Link
              href="/about"
              className="inline-flex items-center gap-2 bg-white text-[#0a1c46] px-9 py-3.5 rounded-full text-base font-bold hover:bg-blue-50 transition-all hover:scale-105 active:scale-95 shadow-[0_4px_24px_rgba(255,255,255,0.25)]"
            >
              Explore School <ChevronRight size={18} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 border border-white/50 text-white px-9 py-3.5 rounded-full text-base font-semibold hover:bg-white/10 transition-all backdrop-blur-sm"
            >
              Contact Us
            </Link>
          </motion.div>
        </div>

        {/* ── Dot indicators ── */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Slide ${i + 1}`}
              className={`rounded-full transition-all duration-500 ${
                i === current ? 'w-8 h-1.5 bg-[#f5a623]' : 'w-2 h-1.5 bg-white/35 hover:bg-white/60'
              }`}
            />
          ))}
        </div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.5, duration: 1 }}
          className="absolute bottom-8 right-8 z-20 hidden md:flex flex-col items-center gap-1"
        >
          <div className="w-px h-10 bg-gradient-to-b from-white/50 to-transparent" />
          <span className="text-[9px] uppercase tracking-[0.2em] text-white/40 font-semibold">Scroll</span>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════════════
          STATS — white background, blue + gold accents
      ══════════════════════════════════════════════════════ */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Subtle blue grid pattern background */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(#1a3a6b 1px, transparent 1px), linear-gradient(90deg, #1a3a6b 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        {/* Blue wave top */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#1a3a6b] via-[#2563eb] to-[#1a3a6b]" />

        <div className="container mx-auto px-6 relative z-10">
          {/* Section heading */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 text-[#f5a623] font-bold tracking-widest uppercase text-xs mb-4">
              <div className="w-8 h-px bg-[#f5a623]" />
              By The Numbers
              <div className="w-8 h-px bg-[#f5a623]" />
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#0a1c46] mb-3">
              MDN Global School
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              A legacy of academic excellence and holistic growth, measured in milestones.
            </p>
          </motion.div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
            {[
              {
                icon: Award,
                count: 25, suffix: '+',
                label: 'Years of Excellence',
                sub: 'Established 2000',
                iconBg: 'bg-blue-50',
                iconColor: 'text-[#1a3a6b]',
                numColor: 'text-[#1a3a6b]',
                border: 'border-blue-100',
                top: 'bg-[#1a3a6b]',
              },
              {
                icon: Users,
                count: 2000, suffix: '+',
                label: 'Students Enrolled',
                sub: 'Growing every year',
                iconBg: 'bg-amber-50',
                iconColor: 'text-[#f5a623]',
                numColor: 'text-[#f5a623]',
                border: 'border-amber-100',
                top: 'bg-[#f5a623]',
              },
              {
                icon: GraduationCap,
                count: 150, suffix: '+',
                label: 'Expert Faculty',
                sub: 'Dedicated educators',
                iconBg: 'bg-blue-50',
                iconColor: 'text-[#1a3a6b]',
                numColor: 'text-[#1a3a6b]',
                border: 'border-blue-100',
                top: 'bg-[#1a3a6b]',
              },
              {
                icon: Trophy,
                count: 100, suffix: '%',
                label: 'CBSE Pass Rate',
                sub: '5 consecutive years',
                iconBg: 'bg-amber-50',
                iconColor: 'text-[#f5a623]',
                numColor: 'text-[#f5a623]',
                border: 'border-amber-100',
                top: 'bg-[#f5a623]',
              },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.65, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6, boxShadow: '0 20px 50px rgba(26,58,107,0.14)' }}
                className={`relative bg-white rounded-2xl border ${stat.border} p-8 text-center flex flex-col items-center shadow-sm overflow-hidden cursor-default`}
              >
                {/* Coloured top bar */}
                <div className={`absolute top-0 inset-x-0 h-1 ${stat.top}`} />

                {/* Icon circle */}
                <div className={`w-16 h-16 rounded-2xl ${stat.iconBg} flex items-center justify-center mb-5 shadow-sm`}>
                  <stat.icon size={30} className={stat.iconColor} />
                </div>

                {/* Number */}
                <div className={`text-5xl md:text-6xl font-serif font-black leading-none mb-3 ${stat.numColor}`}>
                  <Counter end={stat.count} suffix={stat.suffix} />
                </div>

                {/* Divider */}
                <div className="w-10 h-0.5 bg-gray-200 rounded mb-3" />

                {/* Labels */}
                <p className="text-[#0a1c46] font-bold text-base leading-snug mb-1">{stat.label}</p>
                <p className="text-gray-400 text-xs uppercase tracking-widest">{stat.sub}</p>

                {/* Soft corner glow */}
                <div className="absolute bottom-0 right-0 w-24 h-24 rounded-tl-full opacity-[0.06]"
                  style={{ background: stat.numColor === 'text-[#f5a623]' ? '#f5a623' : '#1a3a6b' }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          ABOUT TEASER
      ══════════════════════════════════════════════════════ */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-[#f5a623] font-bold tracking-widest uppercase mb-4 text-sm flex items-center gap-3">
                <div className="w-10 h-px bg-[#f5a623]" /> Welcome to MDN
              </div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#1a3a6b] mb-6 leading-tight">
                Shaping the Leaders<br />of Tomorrow
              </h2>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                At MDN Global School, we believe that education is not just about academic excellence, but about character building and holistic development. Our campus in Kaithal provides the perfect ecosystem for children to discover their true potential.
              </p>
              <ul className="space-y-4 mb-8">
                {['Innovative teaching methodologies', 'World-class sports facilities', 'Focus on moral values and ethics'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-800 font-medium">
                    <div className="w-6 h-6 rounded-full bg-[#f5a623]/15 text-[#f5a623] flex items-center justify-center shrink-0">
                      <ChevronRight size={14} />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/about" className="inline-flex items-center gap-2 text-[#1a3a6b] font-bold hover:text-[#f5a623] transition-colors group">
                Read our full story
                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 1.04 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8 }}
            >
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl group relative">
                <img src="/images/about-school.jpg" alt="School Campus" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-8">
                  <div className="text-white">
                    <div className="text-4xl font-serif font-bold mb-1 text-[#f5a623]">100%</div>
                    <div className="text-sm font-medium opacity-90">Board Results for 5 consecutive years</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          FEATURE CARDS
      ══════════════════════════════════════════════════════ */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#1a3a6b] mb-4">Discover the MDN Edge</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">Everything your child needs to thrive academically, physically, and emotionally.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Academics',       desc: 'Rigorous CBSE curriculum designed to foster critical thinking and intellectual curiosity.', link: '/academics', color: 'bg-blue-50',   icon: BookOpen, accent: 'text-[#1a3a6b]' },
              { title: 'Facilities',      desc: 'Smart classrooms, advanced labs, and expansive sports grounds for holistic growth.',         link: '/facilities', color: 'bg-amber-50',  icon: Trophy,   accent: 'text-[#f5a623]' },
              { title: 'Events & Culture',desc: 'A vibrant calendar of cultural fests, sports meets, and intellectual competitions.',        link: '/events',     color: 'bg-blue-50',  icon: Star,     accent: 'text-[#1a3a6b]' },
            ].map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: i * 0.15 }}
                className={`group rounded-2xl p-8 ${f.color} border border-black/5 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col`}
              >
                <div className={`w-16 h-16 rounded-xl bg-white shadow-sm flex items-center justify-center mb-6 ${f.accent} group-hover:scale-110 transition-transform`}>
                  <f.icon size={32} />
                </div>
                <h3 className="text-2xl font-serif font-bold text-[#1a3a6b] mb-4">{f.title}</h3>
                <p className="text-gray-600 mb-8 flex-1 leading-relaxed">{f.desc}</p>
                <Link href={f.link} className="inline-flex items-center gap-2 text-[#1a3a6b] font-bold hover:text-[#f5a623] transition-colors">
                  Explore <ChevronRight size={16} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          CTA BANNER
      ══════════════════════════════════════════════════════ */}
      <section className="py-24 bg-[#1a3a6b] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle at 20% 50%, #2563eb 0%, transparent 50%), radial-gradient(circle at 80% 50%, #0a1c46 0%, transparent 50%)',
          }}
        />
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} className="order-2 md:order-1">
              <img src="/images/students-happy.jpg" alt="Happy Students" className="w-full rounded-3xl shadow-2xl" />
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} className="order-1 md:order-2 text-white">
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">A Community of Happy Learners</h2>
              <p className="text-white/80 text-lg mb-8 leading-relaxed">
                At MDN Global School, we foster an environment where learning is joyous and every student feels valued. Our campus resonates with the energy and enthusiasm of bright young minds ready to take on the world.
              </p>
              <Link href="/contact"
                className="inline-block bg-white text-[#1a3a6b] px-8 py-3 rounded-full text-lg font-bold hover:bg-blue-50 transition-colors shadow-lg"
              >
                Join Our Family
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
