import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { BookOpen, Users, Trophy, GraduationCap, ChevronRight, ChevronLeft } from 'lucide-react';
import { Link } from 'wouter';

/* ── Animated counter ─────────────────────────────────── */
function Counter({ end, suffix = "" }: { end: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let startTime: number | null = null;
    const duration = 2000;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(end);
    };
    requestAnimationFrame(step);
  }, [isInView, end]);

  return <span ref={ref}>{count}{suffix}</span>;
}

/* ── Slide data ──────────────────────────────────────── */
const slides = [
  { src: '/images/hero-bg.jpg',       pos: 'center top' },
  { src: '/images/about-school.jpg',  pos: 'center center' },
  { src: '/images/students-happy.jpg',pos: 'center center' },
  { src: '/images/academics.jpg',     pos: 'center center' },
];

const SLIDE_INTERVAL = 5000;

export default function Home() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward

  /* auto-advance */
  useEffect(() => {
    const id = setInterval(() => {
      setDirection(1);
      setCurrent(prev => (prev + 1) % slides.length);
    }, SLIDE_INTERVAL);
    return () => clearInterval(id);
  }, []);

  const goTo = (idx: number) => {
    setDirection(idx > current ? 1 : -1);
    setCurrent(idx);
  };
  const prev = () => {
    setDirection(-1);
    setCurrent(prev => (prev - 1 + slides.length) % slides.length);
  };
  const next = () => {
    setDirection(1);
    setCurrent(prev => (prev + 1) % slides.length);
  };

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit:  (dir: number) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0 }),
  };

  return (
    <div className="flex flex-col">

      {/* ── HERO ──────────────────────────────────────────────── */}
      <section className="relative min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden bg-[#0a1c46]">

        {/* Slideshow images */}
        <div className="absolute inset-0">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
              className="absolute inset-0"
            >
              <img
                src={slides[current].src}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
                style={{ objectPosition: slides[current].pos }}
              />
              {/* Overlay — lighter than before so image shines through */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#0a1c46]/70 via-[#0a1c46]/55 to-[#0a1c46]/80" />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Slide nav arrows */}
        <button
          onClick={prev}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/15 border border-white/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/25 transition"
          aria-label="Previous slide"
        >
          <ChevronLeft size={22} />
        </button>
        <button
          onClick={next}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/15 border border-white/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/25 transition"
          aria-label="Next slide"
        >
          <ChevronRight size={22} />
        </button>

        {/* Dot indicators */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`h-1.5 rounded-full transition-all duration-500 ${i === current ? 'w-8 bg-[#f5a623]' : 'w-2 bg-white/40 hover:bg-white/60'}`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Floating glow blobs */}
        <motion.div
          animate={{ y: [0, -20, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/3 left-[6%] w-56 h-56 bg-[#f5a623]/12 rounded-full blur-[80px] pointer-events-none z-10"
        />
        <motion.div
          animate={{ y: [0, 24, 0], scale: [1, 1.12, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-1/3 right-[6%] w-80 h-80 bg-blue-400/10 rounded-full blur-[100px] pointer-events-none z-10"
        />

        {/* Hero content */}
        <div className="relative z-20 w-full max-w-5xl mx-auto px-6 text-center">

          {/* CBSE badge */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-white/10 border border-white/25 backdrop-blur-sm rounded-full px-5 py-2 text-white/90 text-xs font-semibold tracking-widest uppercase mb-10"
          >
            <span className="w-2 h-2 rounded-full bg-[#f5a623] animate-pulse" />
            CBSE Affiliated · Est. 2000 · Kaithal, Haryana
          </motion.div>

          {/* School name */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mb-2"
          >
            <h1 className="font-serif font-black text-white leading-none tracking-tight"
              style={{ fontSize: 'clamp(3rem, 10vw, 7rem)', textShadow: '0 8px 32px rgba(0,0,0,0.6)' }}
            >
              MDN{' '}
              <span className="text-[#f5a623]" style={{ textShadow: '0 0 40px rgba(245,166,35,0.5)' }}>
                GLOBAL
              </span>{' '}
              SCHOOL
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6"
          >
            <h2 className="font-serif font-black text-[#f5a623] tracking-[0.22em] uppercase"
              style={{ fontSize: 'clamp(2rem, 6vw, 4.5rem)', textShadow: '0 4px 20px rgba(245,166,35,0.45)' }}
            >
              KAITHAL
            </h2>
          </motion.div>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="h-px w-64 mx-auto bg-gradient-to-r from-transparent via-[#f5a623]/80 to-transparent mb-7"
          />

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.7 }}
            className="text-white/85 text-lg md:text-2xl font-light italic mb-12 drop-shadow"
          >
            Shaping Leaders · Nurturing Minds · Building Futures
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/contact"
              className="w-full sm:w-auto bg-[#f5a623] text-[#0a1c46] px-10 py-4 rounded-full text-lg font-bold hover:bg-[#e09612] transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(245,166,35,0.5)]"
            >
              Apply Now
            </Link>
            <Link
              href="/about"
              className="w-full sm:w-auto border-2 border-white/70 text-white px-10 py-4 rounded-full text-lg font-bold hover:bg-white/10 transition-all backdrop-blur-sm"
            >
              Explore School
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 text-white/50"
        >
          <span className="text-[10px] uppercase tracking-widest font-semibold">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-white/50 to-transparent" />
        </motion.div>
      </section>

      {/* ── STATS CARDS ──────────────────────────────────────── */}
      <section className="py-20 bg-gradient-to-br from-[#0e2554] to-[#1a3a6b]">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            className="text-center mb-14"
          >
            <p className="text-[#f5a623] font-bold tracking-widest uppercase text-xs mb-3">By The Numbers</p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white">
              MDN Global School at a Glance
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: BookOpen,     count: 25,   suffix: '+', label: 'Years of Excellence',   sub: 'Established 2000',        accent: 'from-amber-400 to-amber-600' },
              { icon: Users,        count: 2000, suffix: '+', label: 'Students Enrolled',      sub: 'Growing every year',      accent: 'from-blue-400 to-blue-600'  },
              { icon: GraduationCap,count: 150,  suffix: '+', label: 'Expert Faculty',         sub: 'Dedicated educators',     accent: 'from-emerald-400 to-emerald-600' },
              { icon: Trophy,       count: 100,  suffix: '%', label: 'CBSE Pass Rate',         sub: '5 consecutive years',     accent: 'from-rose-400 to-rose-500'  },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="relative bg-white/8 backdrop-blur-sm border border-white/15 rounded-2xl p-8 text-center hover:bg-white/12 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl overflow-hidden group"
              >
                {/* Top accent bar */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.accent} rounded-t-2xl`} />

                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.accent} mx-auto mb-5 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                  <stat.icon size={30} className="text-white" />
                </div>

                {/* Number */}
                <div className="text-5xl md:text-6xl font-serif font-black text-white mb-2 leading-none">
                  <Counter end={stat.count} suffix={stat.suffix} />
                </div>

                {/* Label */}
                <p className="text-white font-bold text-base mb-1">{stat.label}</p>
                <p className="text-white/50 text-xs uppercase tracking-wider">{stat.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT TEASER ─────────────────────────────────────── */}
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
                At MDN Global School, we believe that education is not just about academic excellence, but about character building and holistic development. Our state-of-the-art campus in Kaithal provides the perfect ecosystem for children to discover their true potential.
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
              initial={{ opacity: 0, scale: 1.05 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl group">
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

      {/* ── FEATURE CARDS ─────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#1a3a6b] mb-4">Discover the MDN Edge</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">Everything your child needs to thrive academically, physically, and emotionally.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Academics',      desc: 'Rigorous CBSE curriculum designed to foster critical thinking and intellectual curiosity.', link: '/academics', color: 'bg-blue-50',   icon: BookOpen },
              { title: 'Facilities',     desc: 'Smart classrooms, advanced labs, and expansive sports grounds for holistic growth.',         link: '/facilities', color: 'bg-amber-50',  icon: Trophy   },
              { title: 'Events & Culture',desc: 'A vibrant calendar of cultural fests, sports meets, and intellectual competitions.',        link: '/events',     color: 'bg-green-50', icon: Users    },
            ].map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: i * 0.15 }}
                className={`group rounded-2xl p-8 ${f.color} border border-black/5 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col`}
              >
                <div className="w-16 h-16 rounded-xl bg-white shadow-sm flex items-center justify-center mb-6 text-[#1a3a6b] group-hover:scale-110 group-hover:text-[#f5a623] transition-all">
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

      {/* ── CTA BANNER ───────────────────────────────────────── */}
      <section className="py-24 bg-[#1a3a6b] relative overflow-hidden">
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
              <Link href="/contact" className="inline-block bg-[#f5a623] text-[#0a1c46] px-8 py-3 rounded-full text-lg font-bold hover:bg-[#e09612] transition-colors shadow-lg">
                Join Our Family
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
