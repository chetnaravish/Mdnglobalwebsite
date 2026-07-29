import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

/* ── Animated stat counter ──────────────────────────────── */
function StatCounter({ end, suffix = '', duration = 1800 }: { end: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let startTime: number | null = null;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const p = Math.min((ts - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(ease * end));
      if (p < 1) requestAnimationFrame(step);
      else setCount(end);
    };
    requestAnimationFrame(step);
  }, [inView, end, duration]);
  return <span ref={ref}>{count}{suffix}</span>;
}
import { Monitor, FlaskConical, BookOpen, Dumbbell, Bus, Palette, Wifi, Music, TreePine, Camera, X } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } })
};

type Facility = {
  icon: React.ElementType;
  title: string;
  desc: string;
  image: string;
  tag: string;
  tagColor: string;
  detail: string[];
  images: { src: string; caption: string }[];
};

const facilities: Facility[] = [
  {
    icon: Monitor,
    title: 'Smart Classrooms',
    desc: 'Every classroom features interactive digital boards, HD projectors, and Wi-Fi — creating an immersive learning environment.',
    image: '/images/academics.jpg',
    tag: 'Technology', tagColor: 'bg-blue-100 text-blue-700',
    detail: [
      'All 30+ classrooms equipped with large-format interactive digital whiteboards for multimedia, animations & live quizzes.',
      'HD projectors and surround-quality speakers ensure every student can see and hear clearly from any seat.',
      'Campus-wide high-speed Wi-Fi enables seamless access to digital textbooks, video lessons & educational platforms.',
      'Individual student tablets available for select subjects, supporting a blended learning model endorsed by NEP 2020.',
      'Smart attendance & performance tracking tools help teachers identify learning gaps and provide timely personalised support.',
    ],
    images: [
      { src: '/images/academics.jpg', caption: 'Interactive Digital Board in Action' },
      { src: '/images/students-happy.jpg', caption: 'Students Engaged in Smart Learning' },
      { src: '/images/facilities-lab.jpg', caption: 'Technology-Integrated Classroom' },
    ],
  },
  {
    icon: FlaskConical,
    title: 'Science Laboratories',
    desc: 'State-of-the-art Physics, Chemistry, and Biology labs equipped with modern instruments for practical learning.',
    image: '/images/facilities-lab.jpg',
    tag: 'Science', tagColor: 'bg-purple-100 text-purple-700',
    detail: [
      'Separate, fully equipped labs for Physics, Chemistry & Biology — dedicated practical experience from Class VI onwards.',
      'Chemistry lab has modern fume hoods, chemical storage with safety protocols & individual workstations per student pair.',
      'Biology lab features high-power microscopes, anatomical models, preserved specimens & a live plant section.',
      'Physics lab has precision instruments for optics, mechanics, electricity & wave experiments aligned to the CBSE syllabus.',
      'All labs are maintained by qualified assistants with strict safety procedures, first-aid equipment & fire extinguishers.',
    ],
    images: [
      { src: '/images/facilities-lab.jpg', caption: 'Students in the Chemistry Lab' },
      { src: '/images/academics.jpg', caption: 'Biology Lab — Microscope Session' },
      { src: '/images/students-happy.jpg', caption: 'Physics Practical Experiment' },
    ],
  },
  {
    icon: BookOpen,
    title: 'Library & Resource Centre',
    desc: 'Over 15,000 books, digital e-library access, research journals, and comfortable reading spaces for curious minds.',
    image: '/images/facilities-library.jpg',
    tag: 'Knowledge', tagColor: 'bg-amber-100 text-amber-700',
    detail: [
      'Over 15,000 titles spanning fiction, non-fiction, reference books, encyclopaedias & subject-specific texts for all grades.',
      'Dedicated digital section with e-books, research journals & educational databases accessible via individual reading tablets.',
      'Comfortable reading zones — bean bag corners for junior students & quiet study desks for senior students.',
      'Weekly story sessions for primary, book clubs for middle school & competitive exam resource shelves for senior students.',
      'Trained librarian curates fresh additions every term based on curriculum requirements & student reading preferences.',
    ],
    images: [
      { src: '/images/facilities-library.jpg', caption: 'Library — Main Reading Hall' },
      { src: '/images/students-happy.jpg', caption: 'Students Exploring Books' },
      { src: '/images/academics.jpg', caption: 'Digital Research Corner' },
    ],
  },
  {
    icon: Dumbbell,
    title: 'Sports Complex',
    desc: 'Olympic-standard sports grounds with cricket, football, basketball, badminton courts, and a multi-purpose indoor hall.',
    image: '/images/facilities-sports.jpg',
    tag: 'Sports', tagColor: 'bg-green-100 text-green-700',
    detail: [
      'Sprawling 4-acre sports complex with a full-size cricket ground, regulation football field & 400-metre athletics track.',
      'Indoor facilities: two badminton courts, basketball court & multi-purpose hall for table tennis, chess & gymnastics.',
      'BPED-qualified professional coaches for cricket, football, athletics & badminton — training for district & state competitions.',
      'Morning sports sessions are part of the daily timetable — every student participates in physical activity every day.',
      'Complex has produced state-level champions in cricket, athletics & kabaddi — annual inter-school tournaments hosted on campus.',
    ],
    images: [
      { src: '/images/facilities-sports.jpg', caption: 'School Sports Complex — Aerial View' },
      { src: '/images/students-happy.jpg', caption: 'Inter-School Athletics Meet' },
      { src: '/images/academics.jpg', caption: 'Indoor Multi-Purpose Sports Hall' },
    ],
  },
  {
    icon: Wifi,
    title: 'Computer & IT Lab',
    desc: 'High-speed fibre internet, 100+ modern workstations, and coding programmes aligned with NEP 2020 guidelines.',
    image: '/images/computer-lab.png',
    tag: 'IT & Coding', tagColor: 'bg-cyan-100 text-cyan-700',
    detail: [
      '100+ latest-generation computers with individual workstations — every student has personal access during lab sessions.',
      '1 Gbps dedicated fibre internet providing uninterrupted, high-speed connectivity for research, coding & digital learning.',
      'Structured coding curriculum: Scratch (primary), Python & web development (middle school), AI/ML basics (senior secondary).',
      'Students compete in national coding competitions & Atal Tinkering Lab projects — multiple district-level honours won.',
      'Lab open during lunch & free periods for senior students working on projects, college applications & self-directed learning.',
    ],
    images: [
      { src: '/images/academics.jpg', caption: 'Computer Lab — Coding Session' },
      { src: '/images/students-happy.jpg', caption: 'Students at Individual Workstations' },
      { src: '/images/facilities-lab.jpg', caption: 'IT Lab — Digital Learning' },
    ],
  },
  {
    icon: Palette,
    title: 'Arts & Craft Studio',
    desc: 'A dedicated creative space for visual arts, sculpture, pottery, and design — nurturing artistic expression in every student.',
    image: '/images/students-happy.jpg',
    tag: 'Creative Arts', tagColor: 'bg-pink-100 text-pink-700',
    detail: [
      'Bright, airy studio with north-facing skylights designed to give artists the best natural light for colour work & sketching.',
      'Students work with watercolours, acrylics, charcoal, clay & digital design tools across all levels of the curriculum.',
      'Pottery wheel & kiln available for senior art students; annual exhibition showcases best work to parents & the community.',
      'Art integrated into the main curriculum with formal assessment — encouraging even STEM students to develop creative confidence.',
      'Trained art teachers with professional practice guide students & prepare them for national-level art competitions.',
    ],
    images: [
      { src: '/images/students-happy.jpg', caption: 'Annual Art Exhibition' },
      { src: '/images/academics.jpg', caption: 'Craft Studio — Clay Workshop' },
      { src: '/images/mdn-building-3.png', caption: 'Student Artwork on Display' },
    ],
  },
  {
    icon: Music,
    title: 'Music & Dance Room',
    desc: 'Soundproofed music studios with professional instruments, and a dance studio for classical, folk, and contemporary styles.',
    image: '/images/events-annual.jpg',
    tag: 'Performing Arts', tagColor: 'bg-rose-100 text-rose-700',
    detail: [
      'Fully soundproofed music room with tabla, harmonium, sitar, keyboard, guitar & a full percussion kit for all students.',
      'Trained musicians teach Hindustani classical music, light music & Western notation for diverse musical interests.',
      'Adjacent dance studio with sprung flooring & wall-length mirrors — ideal for Bharatanatyam, folk & contemporary dance.',
      'Students perform at school events, cultural festivals & state-level youth competitions — building stage confidence.',
      'Performing arts programme culminates in the Annual Cultural Gala — a fully staged production anticipated every year.',
    ],
    images: [
      { src: '/images/events-annual.jpg', caption: 'Annual Cultural Gala Performance' },
      { src: '/images/students-happy.jpg', caption: 'Classical Dance Practice' },
      { src: '/images/academics.jpg', caption: 'Music Room — Instrument Session' },
    ],
  },
  {
    icon: Bus,
    title: 'Safe Transport',
    desc: 'GPS-enabled, air-conditioned school buses covering all major routes — student safety is our top priority.',
    image: '/images/mdn-building-2.png',
    tag: 'Transport', tagColor: 'bg-teal-100 text-teal-700',
    detail: [
      '15 GPS-enabled, air-conditioned buses covering all major residential areas of Kaithal & surrounding villages.',
      'Real-time GPS tracking on every bus — parents receive live location updates through a dedicated mobile app.',
      'All drivers hold valid commercial licences & undergo periodic background checks, drug screening & defensive-driving training.',
      'Trained female attendant on every bus — managing boarding, seating & student safety throughout the journey.',
      'Routes reviewed annually; new routes added to ensure maximum coverage without excessive travel time for any child.',
    ],
    images: [
      { src: '/images/mdn-building-2.png', caption: 'MDN Global School Transport Fleet' },
      { src: '/images/students-happy.jpg', caption: 'Safe Boarding Procedure' },
      { src: '/images/mdn-building-3.png', caption: 'GPS-Tracked School Bus' },
    ],
  },
  {
    icon: TreePine,
    title: 'Eco-Friendly Campus',
    desc: '10-acre green campus with gardens, open-air amphitheatre, and eco-clubs promoting sustainable living.',
    image: '/images/mdn-building-3.png',
    tag: 'Environment', tagColor: 'bg-lime-100 text-lime-700',
    detail: [
      '10-acre certified green zone with 500+ trees, seasonal flower gardens & a student-tended kitchen garden.',
      'Open-air amphitheatre nestled among trees — used for morning assemblies, poetry sessions & outdoor drama performances.',
      'Solar panels across the school roof supply 40% of campus electricity, significantly reducing our carbon footprint.',
      'Rainwater harvesting pits recharge groundwater; a composting unit converts organic waste into garden fertiliser.',
      'Eco Club runs tree-plantation drives, awareness campaigns & monthly clean-campus challenges throughout the year.',
    ],
    images: [
      { src: '/images/mdn-building-3.png', caption: 'MDN Global School Green Campus' },
      { src: '/images/students-happy.jpg', caption: 'Eco Club Tree Plantation Drive' },
      { src: '/images/academics.jpg', caption: 'Open-Air Amphitheatre' },
    ],
  },
  {
    icon: Camera,
    title: 'CCTV Surveillance',
    desc: '360° CCTV monitoring across the campus ensures complete safety and security for all students and staff.',
    image: '/images/mdn-building-2.png',
    tag: 'Security', tagColor: 'bg-slate-100 text-slate-700',
    detail: [
      '120+ HD cameras installed across every corridor, classroom entrance, sports area, parking lot & campus gate.',
      'Security control room monitored 24/7 by trained personnel — footage retained for 30 days on encrypted servers.',
      'Biometric entry system for staff & ID-card scan gate for students strictly controls campus access during school hours.',
      'Dedicated security team patrols the perimeter at regular intervals; all visitors register with photo ID at the main gate.',
      'Regular safety drills — fire evacuation, earthquake preparedness & anti-bullying protocols — conducted every term.',
    ],
    images: [
      { src: '/images/mdn-building-2.png', caption: 'Campus Security Control Room' },
      { src: '/images/mdn-building-3.png', caption: 'CCTV Coverage — Main Gate' },
      { src: '/images/academics.jpg', caption: 'Secure Campus Entry System' },
    ],
  },
];

/* ── Modal — single image ────────────────────────────────── */
function FacilityModal({ facility, onClose }: { facility: Facility; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="bg-white rounded-2xl overflow-hidden shadow-2xl w-full max-w-lg"
        onClick={e => e.stopPropagation()}
      >
        {/* Single image */}
        <div className="relative h-52 bg-gray-900 overflow-hidden">
          <img src={facility.image} alt={facility.title}
            className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
          <div className="absolute top-4 left-4 z-10">
            <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${facility.tagColor}`}>{facility.tag}</span>
          </div>
          <button onClick={onClose}
            className="absolute top-4 right-4 z-10 w-9 h-9 bg-black/50 hover:bg-black/75 rounded-full flex items-center justify-center text-white transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Info */}
        <div className="p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 bg-[#1a3a6b] rounded-xl flex items-center justify-center shrink-0">
              <facility.icon size={17} className="text-white" />
            </div>
            <h2 className="text-lg font-serif font-black text-[#1a3a6b]">{facility.title}</h2>
          </div>
          <ul className="space-y-2.5">
            {facility.detail.slice(0, 3).map((line, i) => (
              <li key={i} className="flex gap-2.5 text-gray-600 text-sm leading-snug">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#f5a623] shrink-0" />
                {line}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Facilities() {
  const [selected, setSelected] = useState<Facility | null>(null);

  return (
    <div className="flex flex-col">

      {/* ── Hero Banner ─────────────────────────────────────── */}
      <section className="relative min-h-[75vh] flex items-center overflow-hidden">
        <img src="/images/facilities-sports.jpg" alt="MDN Global School Facilities"
          className="absolute inset-0 w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1c46]/62 via-[#0a1c46]/32 to-[#0a1c46]/8" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1c46]/42 via-transparent to-transparent" />
        <div className="container mx-auto px-6 py-24 relative z-10">
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}
            className="inline-flex items-center gap-2 bg-[#f5a623]/20 border border-[#f5a623]/40 rounded-full px-4 py-1.5 text-[#f5a623] text-xs font-bold tracking-widest uppercase mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#f5a623]" /> World-Class Infrastructure
          </motion.div>
          <motion.h1 variants={fadeUp} initial="hidden" animate="visible" custom={1}
            className="text-3xl sm:text-5xl md:text-7xl font-serif font-black text-white leading-tight mb-5"
            style={{ textShadow: '0 4px 24px rgba(0,0,0,0.5)' }}>
            Our <span className="text-[#f5a623]">Facilities</span>
          </motion.h1>
          <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={2}
            className="text-white/90 text-lg md:text-xl max-w-2xl leading-relaxed">
            Modern infrastructure that supports every dimension of a child's growth — academic, physical, creative, and emotional.
          </motion.p>
        </div>
      </section>

      {/* ── Quick Stats ──────────────────────────────────────── */}
      <section className="py-14 bg-[#f5a623]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { end: 10, suffix: ' Acres', label: 'Green Campus' },
              { end: 30, suffix: '+',      label: 'Smart Classrooms' },
              { end: 5,  suffix: '',       label: 'Science Labs' },
              { end: 15, suffix: 'k+',    label: 'Library Books' },
            ].map((s, i) => (
              <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i * 0.4}>
                <div className="text-4xl font-serif font-black text-[#1a3a6b] mb-1">
                  <StatCounter end={s.end} suffix={s.suffix} />
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
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-4">
            <p className="text-[#f5a623] font-bold tracking-widest uppercase text-sm mb-3">Everything Under One Roof</p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#1a3a6b] mb-4">Complete Campus Facilities</h2>
            <p className="text-gray-500 max-w-xl mx-auto">World-class facilities designed to support holistic development</p>
          </motion.div>
          <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1}
            className="text-center text-sm text-gray-400 mb-12 flex items-center justify-center gap-2">
            <span className="inline-block w-4 h-px bg-gray-300" />
            Click any card to explore photos & details
            <span className="inline-block w-4 h-px bg-gray-300" />
          </motion.p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {facilities.map((f, i) => (
              <motion.button
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                custom={i % 3 * 0.2}
                onClick={() => setSelected(f)}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group border border-gray-100 text-left w-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#1a3a6b]/30"
              >
                <div className="relative h-48 overflow-hidden">
                  <img src={f.image} alt={f.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a3a6b]/70 to-transparent" />
                  <div className={`absolute top-4 left-4 text-xs font-bold px-3 py-1 rounded-full ${f.tagColor}`}>{f.tag}</div>
                  <div className="absolute bottom-4 left-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-white">
                    <f.icon size={20} />
                  </div>
                  <div className="absolute bottom-4 right-4 text-white/70 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity bg-black/30 px-2 py-1 rounded-full">
                    Click to explore →
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-serif font-bold text-[#1a3a6b] mb-2 group-hover:text-[#f5a623] transition-colors">{f.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
                </div>
              </motion.button>
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

      {/* ── Modal ───────────────────────────────────────────── */}
      <AnimatePresence>
        {selected && (
          <FacilityModal facility={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>

    </div>
  );
}
