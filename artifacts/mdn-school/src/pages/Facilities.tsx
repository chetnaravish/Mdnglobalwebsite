import { motion } from 'framer-motion';
import { Monitor, FlaskConical, BookOpen, Dumbbell, Bus, Utensils, HeartPulse, Palette, Wifi, Music, TreePine, Camera } from 'lucide-react';
import { Link } from 'wouter';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } })
};

const facilities = [
  {
    icon: Monitor,
    title: 'Smart Classrooms',
    desc: 'Every classroom features interactive digital boards, HD projectors, and Wi-Fi — creating an immersive learning environment.',
    image: '/images/academics.jpg',
    tag: 'Technology',
    tagColor: 'bg-blue-100 text-blue-700',
  },
  {
    icon: FlaskConical,
    title: 'Science Laboratories',
    desc: 'State-of-the-art Physics, Chemistry, and Biology labs equipped with modern instruments for practical learning.',
    image: '/images/facilities-lab.jpg',
    tag: 'Science',
    tagColor: 'bg-purple-100 text-purple-700',
  },
  {
    icon: BookOpen,
    title: 'Library & Resource Centre',
    desc: 'Over 15,000 books, digital e-library access, research journals, and comfortable reading spaces for curious minds.',
    image: '/images/facilities-library.jpg',
    tag: 'Knowledge',
    tagColor: 'bg-amber-100 text-amber-700',
  },
  {
    icon: Dumbbell,
    title: 'Sports Complex',
    desc: 'Olympic-standard sports grounds with cricket, football, basketball, badminton courts, and a multi-purpose indoor hall.',
    image: '/images/facilities-sports.jpg',
    tag: 'Sports',
    tagColor: 'bg-green-100 text-green-700',
  },
  {
    icon: Wifi,
    title: 'Computer & IT Lab',
    desc: 'High-speed fibre internet, 100+ modern workstations, and coding programmes aligned with NEP 2020 guidelines.',
    image: '/images/academics.jpg',
    tag: 'IT & Coding',
    tagColor: 'bg-cyan-100 text-cyan-700',
  },
  {
    icon: Palette,
    title: 'Arts & Craft Studio',
    desc: 'A dedicated creative space for visual arts, sculpture, pottery, and design — nurturing artistic expression in every student.',
    image: '/images/students-happy.jpg',
    tag: 'Creative Arts',
    tagColor: 'bg-pink-100 text-pink-700',
  },
  {
    icon: Music,
    title: 'Music & Dance Room',
    desc: 'Soundproofed music studios with professional instruments, and a dance studio for classical, folk, and contemporary styles.',
    image: '/images/events-annual.jpg',
    tag: 'Performing Arts',
    tagColor: 'bg-rose-100 text-rose-700',
  },
  {
    icon: Utensils,
    title: 'Hygienic Cafeteria',
    desc: 'Nutritious, freshly cooked meals in a clean, spacious dining hall — healthy food for healthy young minds.',
    image: '/images/about-school.jpg',
    tag: 'Nutrition',
    tagColor: 'bg-orange-100 text-orange-700',
  },
  {
    icon: HeartPulse,
    title: 'Medical & Wellness Centre',
    desc: 'Qualified medical staff on campus 24/7, first-aid facilities, and dedicated counsellors for student well-being.',
    image: '/images/students-happy.jpg',
    tag: 'Health',
    tagColor: 'bg-red-100 text-red-700',
  },
  {
    icon: Bus,
    title: 'Safe Transport',
    desc: 'GPS-enabled, air-conditioned school buses covering all major routes — student safety is our top priority.',
    image: '/images/hero-bg.jpg',
    tag: 'Transport',
    tagColor: 'bg-teal-100 text-teal-700',
  },
  {
    icon: TreePine,
    title: 'Eco-Friendly Campus',
    desc: '10-acre green campus with gardens, open-air amphitheatre, and eco-clubs promoting sustainable living.',
    image: '/images/about-school.jpg',
    tag: 'Environment',
    tagColor: 'bg-lime-100 text-lime-700',
  },
  {
    icon: Camera,
    title: 'CCTV Surveillance',
    desc: '360° CCTV monitoring across the campus ensures complete safety and security for all students and staff.',
    image: '/images/hero-bg.jpg',
    tag: 'Security',
    tagColor: 'bg-slate-100 text-slate-700',
  },
];

export default function Facilities() {
  return (
    <div className="flex flex-col">

      {/* ── Hero Banner ─────────────────────────────────────── */}
      <section className="relative min-h-[75vh] flex items-center overflow-hidden">
        <img
          src="/images/facilities-sports.jpg"
          alt="MDN Global School Facilities"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1c46]/85 via-[#0a1c46]/50 to-[#0a1c46]/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1c46]/65 via-transparent to-transparent" />

        <div className="container mx-auto px-6 py-24 relative z-10">
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}
            className="inline-flex items-center gap-2 bg-[#f5a623]/20 border border-[#f5a623]/40 rounded-full px-4 py-1.5 text-[#f5a623] text-xs font-bold tracking-widest uppercase mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#f5a623]" /> World-Class Infrastructure
          </motion.div>
          <motion.h1 variants={fadeUp} initial="hidden" animate="visible" custom={1}
            className="text-5xl md:text-7xl font-serif font-black text-white leading-tight mb-5"
            style={{ textShadow: '0 4px 24px rgba(0,0,0,0.5)' }}>
            Our <span className="text-[#f5a623]">Facilities</span>
          </motion.h1>
          <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={2}
            className="text-white/90 text-lg md:text-xl max-w-2xl leading-relaxed">
            Modern infrastructure that supports every dimension of a child's growth — academic, physical, creative, and emotional.
          </motion.p>
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={3} className="mt-8 flex gap-3">
            <div className="h-1 w-20 bg-[#f5a623] rounded-full" />
            <div className="h-1 w-8 bg-white/30 rounded-full" />
          </motion.div>
        </div>
      </section>

      {/* ── Quick Stats ──────────────────────────────────────── */}
      <section className="py-14 bg-[#f5a623]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { num: '10', unit: 'Acres', label: 'Green Campus' },
              { num: '30+', unit: '', label: 'Smart Classrooms' },
              { num: '5', unit: '', label: 'Science Labs' },
              { num: '15k+', unit: '', label: 'Library Books' },
            ].map((s, i) => (
              <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i * 0.4}>
                <div className="text-4xl font-serif font-black text-[#1a3a6b] mb-1">
                  {s.num}<span className="text-xl">{s.unit}</span>
                </div>
                <div className="text-[#1a3a6b]/70 text-sm font-bold uppercase tracking-wider">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Facilities Grid ──────────────────────────────────── */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
            <p className="text-[#f5a623] font-bold tracking-widest uppercase text-sm mb-3">Everything Under One Roof</p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#1a3a6b] mb-4">Complete Campus Facilities</h2>
            <p className="text-gray-500 max-w-xl mx-auto">12 world-class facilities designed to support holistic development</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {facilities.map((f, i) => (
              <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} custom={i % 3 * 0.2}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-400 hover:-translate-y-2 group border border-gray-100">
                <div className="relative h-48 overflow-hidden">
                  <img src={f.image} alt={f.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a3a6b]/70 to-transparent" />
                  <div className={`absolute top-4 left-4 text-xs font-bold px-3 py-1 rounded-full ${f.tagColor}`}>{f.tag}</div>
                  <div className="absolute bottom-4 left-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-white">
                    <f.icon size={20} />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-serif font-bold text-[#1a3a6b] mb-3">{f.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sports Highlight ────────────────────────────────── */}
      <section className="py-24 bg-[#1a3a6b] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              variants={{ hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0, transition: { duration: 0.7 } } }}
              initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <p className="text-[#f5a623] font-bold tracking-widest uppercase text-sm flex items-center gap-3 mb-4">
                <span className="w-10 h-px bg-[#f5a623]" /> Sports & Fitness
              </p>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">Champions Are<br />Made Here</h2>
              <p className="text-white/70 text-lg leading-relaxed mb-8">
                Our professional sports facilities train students to compete at district, state, and national levels. With dedicated coaches and structured training programmes, MDN Global School has produced champions across multiple sports.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {['Cricket Ground', 'Football Field', 'Basketball Courts', 'Badminton Hall', 'Athletics Track', 'Swimming Pool*'].map((sport, i) => (
                  <div key={i} className="flex items-center gap-2 text-white/80 text-sm font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#f5a623] shrink-0" /> {sport}
                  </div>
                ))}
              </div>
              <p className="text-white/40 text-xs mt-4">* Coming 2025</p>
            </motion.div>
            <motion.div
              variants={{ hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0, transition: { duration: 0.7 } } }}
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="rounded-3xl overflow-hidden shadow-2xl aspect-video">
              <img src="/images/facilities-sports.jpg" alt="Sports Facilities" className="w-full h-full object-cover" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────── */}
      <section className="py-20 bg-white text-center">
        <div className="container mx-auto px-6">
          <motion.h2 variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif font-bold text-[#1a3a6b] mb-4">
            Come, See It for Yourself
          </motion.h2>
          <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1}
            className="text-gray-500 text-lg mb-8 max-w-xl mx-auto">
            Book a campus visit and experience our world-class facilities in person.
          </motion.p>
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2}>
            <Link href="/contact" className="inline-block bg-[#1a3a6b] text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-[#0f2557] transition-all hover:scale-105 shadow-lg">
              Schedule a Campus Visit
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
