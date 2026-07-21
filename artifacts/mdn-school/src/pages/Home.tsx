import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { BookOpen, Users, Trophy, GraduationCap, ChevronRight } from 'lucide-react';
import { Link } from 'wouter';

function Counter({ end, suffix = "" }: { end: number, suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      let startTime: number | null = null;
      const duration = 2000;
      
      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        setCount(Math.floor(progress * end));
        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          setCount(end);
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [isInView, end]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function Home() {
  const wordVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }
    })
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section
        className="relative min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden bg-[#1a3a6b]"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(10,28,70,0.82) 0%, rgba(15,40,90,0.68) 50%, rgba(10,28,70,0.92) 100%), url('/images/hero-bg.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
        }}
      >
        {/* Floating glow blobs */}
        <motion.div animate={{ y: [0, -25, 0], scale: [1, 1.1, 1] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="absolute top-1/3 left-[8%] w-48 h-48 bg-[#f5a623]/15 rounded-full blur-[70px] pointer-events-none" />
        <motion.div animate={{ y: [0, 30, 0], scale: [1, 1.15, 1] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-1/3 right-[8%] w-72 h-72 bg-blue-300/15 rounded-full blur-[90px] pointer-events-none" />

        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 text-center pt-20">

          {/* CBSE Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 bg-white/10 border border-white/25 backdrop-blur-sm rounded-full px-5 py-2 text-white/90 text-xs font-semibold tracking-widest uppercase mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-[#f5a623] animate-pulse" />
            CBSE Affiliated · Est. 2000 · Kaithal, Haryana
          </motion.div>

          {/* School Name — word by word */}
          <div className="mb-3 overflow-hidden">
            <div className="flex flex-wrap justify-center gap-x-5 md:gap-x-8 gap-y-1">
              {["MDN", "GLOBAL", "SCHOOL"].map((word, i) => (
                <motion.span
                  key={word}
                  custom={i}
                  variants={wordVariants}
                  initial="hidden"
                  animate="visible"
                  className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-black text-white leading-tight tracking-tight drop-shadow-[0_6px_16px_rgba(0,0,0,0.6)]"
                >
                  {word}
                </motion.span>
              ))}
            </div>
          </div>

          {/* KAITHAL */}
          <div className="mb-8 overflow-hidden">
            <motion.span
              custom={3}
              variants={wordVariants}
              initial="hidden"
              animate="visible"
              className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-black text-[#f5a623] tracking-[0.18em] drop-shadow-[0_4px_12px_rgba(245,166,35,0.4)]"
            >
              KAITHAL
            </motion.span>
          </div>

          {/* Golden divider */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="h-[2px] w-48 md:w-72 mx-auto bg-gradient-to-r from-transparent via-[#f5a623] to-transparent mb-6"
          />

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.7 }}
            className="text-white/80 text-lg md:text-2xl font-light italic mb-12 drop-shadow-lg"
          >
            Shaping Leaders · Nurturing Minds · Building Futures
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-5"
          >
            <Link
              href="/contact"
              className="w-full sm:w-auto bg-[#f5a623] text-[#1a3a6b] px-10 py-4 rounded-full text-lg font-bold hover:bg-[#e09612] transition-all hover:scale-105 active:scale-95 shadow-[0_0_24px_rgba(245,166,35,0.45)]"
              data-testid="hero-apply-btn"
            >
              Apply Now
            </Link>
            <Link
              href="/about"
              className="w-full sm:w-auto bg-transparent border-2 border-white/70 text-white px-10 py-4 rounded-full text-lg font-bold hover:bg-white/10 transition-all backdrop-blur-sm"
              data-testid="hero-explore-btn"
            >
              Explore School
            </Link>
          </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50"
        >
          <span className="text-xs uppercase tracking-widest font-bold">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-white/50 to-transparent"></div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white relative z-20 -mt-10 rounded-t-[3rem] shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-gray-200">
            {[
              { icon: BookOpen, count: 25, suffix: "+", label: "Years of Excellence" },
              { icon: Users, count: 2000, suffix: "+", label: "Students Enrolled" },
              { icon: GraduationCap, count: 150, suffix: "+", label: "Expert Faculty" },
              { icon: Trophy, count: 100, suffix: "%", label: "CBSE Pass Rate" },
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center text-center p-4 pt-8 md:pt-4"
              >
                <div className="w-16 h-16 rounded-full bg-[#1a3a6b]/10 text-[#1a3a6b] flex items-center justify-center mb-4">
                  <stat.icon size={32} />
                </div>
                <h3 className="text-4xl md:text-5xl font-serif font-bold text-[#1a3a6b] mb-2">
                  <Counter end={stat.count} suffix={stat.suffix} />
                </h3>
                <p className="text-gray-500 font-bold uppercase tracking-wider text-xs md:text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Teaser */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-[#f5a623] font-bold tracking-widest uppercase mb-4 text-sm flex items-center gap-4">
                <div className="w-12 h-px bg-[#f5a623]"></div>
                Welcome to MDN
              </div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#1a3a6b] mb-6 leading-tight">
                Shaping the Leaders <br />of Tomorrow
              </h2>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                At MDN Global School, we believe that education is not just about academic excellence, but about character building and holistic development. Our state-of-the-art campus in Kaithal provides the perfect ecosystem for children to discover their true potential.
              </p>
              <ul className="space-y-4 mb-8">
                {['Innovative teaching methodologies', 'World-class sports facilities', 'Focus on moral values and ethics'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-800 font-medium">
                    <div className="w-6 h-6 rounded-full bg-[#1a3a6b]/10 text-[#1a3a6b] flex items-center justify-center shrink-0">
                      <ChevronRight size={14} />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-[#1a3a6b] font-bold hover:text-[#f5a623] transition-colors group"
                data-testid="link-read-more"
              >
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
              <div className="aspect-[4/3] rounded-2xl overflow-hidden relative shadow-2xl group">
                <img 
                  src="/images/about-school.jpg" 
                  alt="School Campus" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-8">
                  <div className="text-white">
                    <div className="text-4xl font-serif font-bold mb-2 text-[#f5a623]">100%</div>
                    <div className="text-sm font-medium opacity-90">Board Results for the last 5 consecutive years.</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Sections (Cards) */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#1a3a6b] mb-4">Discover the MDN Edge</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">Everything your child needs to thrive academically, physically, and emotionally.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Academics',
                desc: 'Rigorous CBSE curriculum designed to foster critical thinking and intellectual curiosity.',
                link: '/academics',
                color: 'bg-blue-50',
                icon: BookOpen
              },
              {
                title: 'Facilities',
                desc: 'Smart classrooms, advanced labs, and expansive sports grounds for holistic growth.',
                link: '/facilities',
                color: 'bg-amber-50',
                icon: Trophy
              },
              {
                title: 'Events & Culture',
                desc: 'A vibrant calendar of cultural fests, sports meets, and intellectual competitions.',
                link: '/events',
                color: 'bg-green-50',
                icon: Users
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: i * 0.2 }}
                className={`group rounded-2xl p-8 ${feature.color} border border-black/5 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col`}
              >
                <div className="w-16 h-16 rounded-xl bg-white shadow-sm flex items-center justify-center mb-6 text-[#1a3a6b] group-hover:scale-110 group-hover:text-[#f5a623] transition-all">
                  <feature.icon size={32} />
                </div>
                <h3 className="text-2xl font-serif font-bold text-[#1a3a6b] mb-4">{feature.title}</h3>
                <p className="text-gray-600 mb-8 flex-1 leading-relaxed">{feature.desc}</p>
                <Link
                  href={feature.link}
                  className="inline-flex items-center gap-2 text-[#1a3a6b] font-bold hover:text-[#f5a623] transition-colors"
                >
                  Explore <ChevronRight size={16} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Image Banner Section */}
      <section className="py-24 bg-[#1a3a6b] relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true, amount: 0.2 }}
              className="order-2 md:order-1"
            >
              <img src="/images/students-happy.jpg" alt="Happy Students" className="w-full rounded-3xl shadow-2xl" />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 30 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true, amount: 0.2 }}
              className="order-1 md:order-2 text-white"
            >
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">A Community of Happy Learners</h2>
              <p className="text-white/80 text-lg mb-8 leading-relaxed">
                At MDN Global School, we foster an environment where learning is joyous and every student feels valued. Our campus resonates with the energy and enthusiasm of bright young minds ready to take on the world.
              </p>
              <Link
                href="/contact"
                className="inline-block bg-white text-[#1a3a6b] px-8 py-3 rounded-full text-lg font-bold hover:bg-gray-100 transition-colors shadow-lg"
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
