import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Monitor, FlaskConical, BookOpen, Dumbbell, Bus, Palette, Wifi, Music, TreePine, Camera, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'wouter';

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
    tag: 'Technology',
    tagColor: 'bg-blue-100 text-blue-700',
    detail: [
      'All 30+ classrooms are equipped with large-format interactive digital whiteboards that allow teachers to teach with multimedia content, animations, and live quizzes.',
      'High-definition projectors and surround-quality speakers ensure that every student — regardless of where they sit — can see and hear clearly.',
      'Campus-wide high-speed Wi-Fi enables seamless access to digital textbooks, video lessons, and educational platforms during class.',
      'Each classroom has individual student tablets available for select subjects, supporting a blended learning model endorsed by NEP 2020.',
      'Smart attendance and performance tracking tools help teachers identify learning gaps early and provide timely, personalised support to every student.',
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
    tag: 'Science',
    tagColor: 'bg-purple-100 text-purple-700',
    detail: [
      'Separate, fully equipped labs for Physics, Chemistry, and Biology ensure students get dedicated, subject-specific practical experience from Class VI onwards.',
      'The Chemistry lab houses modern fume hoods, chemical storage with safety protocols, and individual workstations for every student pair.',
      'The Biology lab features high-power microscopes, anatomical models, preserved specimens, and a live plant section for botany experiments.',
      'The Physics lab includes precision instruments for optics, mechanics, electricity, and wave experiments — directly aligned with the CBSE practical syllabus.',
      'All labs are maintained by qualified lab assistants and follow strict safety procedures, with first-aid equipment and fire extinguishers at every exit.',
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
    tag: 'Knowledge',
    tagColor: 'bg-amber-100 text-amber-700',
    detail: [
      'The library houses over 15,000 titles spanning fiction, non-fiction, reference books, encyclopaedias, and subject-specific texts across all grade levels.',
      'A dedicated digital section provides students with access to e-books, research journals, and educational databases through individual reading tablets.',
      'Comfortable reading zones — including bean bag corners for junior students and quiet study desks for seniors — encourage voluntary reading habits.',
      'The library runs weekly story sessions for primary classes, book clubs for middle school students, and competitive exam resource shelves for senior students.',
      'A trained librarian curates fresh additions every term based on curriculum requirements and student reading preferences.',
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
    tag: 'Sports',
    tagColor: 'bg-green-100 text-green-700',
    detail: [
      'Our sprawling sports complex spans 4 acres and includes a full-size cricket ground, a regulation football field, and a 400-metre athletics track.',
      'Indoor facilities include two badminton courts, a basketball court, and a multi-purpose hall used for table tennis, carrom, chess, and gymnastics.',
      'Professional, BPED-qualified coaches are available for cricket, football, athletics, and badminton — training students for district and state competitions.',
      'Morning sports sessions are part of the daily school timetable, ensuring every student participates in physical activity regardless of academic stream.',
      'The sports complex has produced state-level champions in cricket, athletics, and kabaddi — with structured annual inter-school tournaments hosted on campus.',
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
    image: '/images/academics.jpg',
    tag: 'IT & Coding',
    tagColor: 'bg-cyan-100 text-cyan-700',
    detail: [
      'The IT lab features 100+ latest-generation computers with individual workstations, ensuring every student has personal access during lab sessions.',
      'The lab runs on a 1 Gbps dedicated fibre internet line, providing uninterrupted, high-speed connectivity for research, coding, and digital learning.',
      'A structured coding curriculum introduces students to Scratch (primary), Python and web development (middle school), and AI/ML basics (senior secondary).',
      'Students participate in national coding competitions such as Atal Tinkering Lab projects, where MDN Global School has won multiple district-level honours.',
      'The lab remains open during lunch and free periods for senior students working on projects, college applications, and self-directed digital learning.',
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
    tag: 'Creative Arts',
    tagColor: 'bg-pink-100 text-pink-700',
    detail: [
      'The Arts & Craft Studio is a bright, airy space with north-facing skylights, designed to give artists the best natural light for colour work and sketching.',
      'Students work with a wide variety of media — watercolours, acrylics, charcoal, clay, and digital design tools — across different levels of the curriculum.',
      'A pottery wheel and kiln are available for senior art students, and an annual exhibition showcases the best student work to parents and the wider community.',
      'Art is not an optional extra at MDN Global School — it is integrated into the main curriculum with formal assessment, encouraging even STEM students to develop creative confidence.',
      'Trained art teachers with professional practice backgrounds guide students and prepare select students for national-level art competitions and portfolio development.',
    ],
    images: [
      { src: '/images/students-happy.jpg', caption: 'Annual Art Exhibition' },
      { src: '/images/academics.jpg', caption: 'Craft Studio — Clay Workshop' },
      { src: '/images/about-school.jpg', caption: 'Student Artwork on Display' },
    ],
  },
  {
    icon: Music,
    title: 'Music & Dance Room',
    desc: 'Soundproofed music studios with professional instruments, and a dance studio for classical, folk, and contemporary styles.',
    image: '/images/events-annual.jpg',
    tag: 'Performing Arts',
    tagColor: 'bg-rose-100 text-rose-700',
    detail: [
      'The music room is fully soundproofed and houses a range of instruments including tabla, harmonium, sitar, keyboard, guitar, and a full percussion kit.',
      'Trained musicians teach Hindustani classical music, light music, and Western notation — catering to students with diverse musical interests and goals.',
      'An adjacent dance studio with sprung flooring and wall-length mirrors provides the ideal space for Bharatanatyam, folk dances, and contemporary choreography.',
      'Students regularly perform at school events, cultural festivals, and state-level youth competitions — building stage confidence and performance skills.',
      'The performing arts programme culminates in the Annual Cultural Gala, a fully staged production that parents and the community look forward to every year.',
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
    image: '/images/hero-bg.jpg',
    tag: 'Transport',
    tagColor: 'bg-teal-100 text-teal-700',
    detail: [
      'The school fleet comprises 15 GPS-enabled, air-conditioned buses covering all major residential areas of Kaithal and surrounding villages.',
      'Every bus is fitted with real-time GPS tracking, and parents receive live location updates through a dedicated mobile app — ensuring complete peace of mind.',
      'All drivers hold valid commercial licences and undergo periodic background verification, drug screening, and defensive-driving training.',
      'A trained, female attendant accompanies students on every bus — managing boarding, seating, and safety throughout the journey.',
      'Routes are reviewed annually based on student enrolment patterns, and new routes are added to ensure maximum coverage without excessive travel time for any child.',
    ],
    images: [
      { src: '/images/hero-bg.jpg', caption: 'MDN Global School Transport Fleet' },
      { src: '/images/students-happy.jpg', caption: 'Safe Boarding Procedure' },
      { src: '/images/about-school.jpg', caption: 'GPS-Tracked School Bus' },
    ],
  },
  {
    icon: TreePine,
    title: 'Eco-Friendly Campus',
    desc: '10-acre green campus with gardens, open-air amphitheatre, and eco-clubs promoting sustainable living.',
    image: '/images/about-school.jpg',
    tag: 'Environment',
    tagColor: 'bg-lime-100 text-lime-700',
    detail: [
      'Our 10-acre campus is a certified green zone, with over 500 trees, seasonal flower gardens, and a dedicated kitchen garden tended by students.',
      'The open-air amphitheatre — nestled among trees — hosts morning assemblies, poetry sessions, and outdoor drama performances through the year.',
      'Solar panels installed across the school roof supply 40% of the campus electricity requirement, reducing the school\'s carbon footprint significantly.',
      'Rainwater harvesting pits across the campus recharge groundwater, and a composting unit converts organic waste into fertiliser for the school garden.',
      'The Eco Club actively runs awareness campaigns, tree-plantation drives, and monthly clean-campus challenges — instilling environmental responsibility from an early age.',
    ],
    images: [
      { src: '/images/about-school.jpg', caption: 'MDN Global School Green Campus' },
      { src: '/images/students-happy.jpg', caption: 'Eco Club Tree Plantation Drive' },
      { src: '/images/academics.jpg', caption: 'Open-Air Amphitheatre' },
    ],
  },
  {
    icon: Camera,
    title: 'CCTV Surveillance',
    desc: '360° CCTV monitoring across the campus ensures complete safety and security for all students and staff.',
    image: '/images/hero-bg.jpg',
    tag: 'Security',
    tagColor: 'bg-slate-100 text-slate-700',
    detail: [
      'Over 120 high-definition CCTV cameras are strategically installed across every corridor, classroom entrance, sports area, parking lot, and campus gate.',
      'The security control room is monitored 24/7 by trained security personnel, with footage retained for 30 days on secure encrypted servers.',
      'Access to the school campus is strictly controlled through a biometric entry system for staff and an ID-card scan gate for students during school hours.',
      'A dedicated security team patrols the campus perimeter at regular intervals, and all visitors are registered with photo ID at the main gate before entry.',
      'Regular safety drills — including fire evacuation, earthquake preparedness, and anti-bullying protocols — are conducted each term to keep students and staff prepared.',
    ],
    images: [
      { src: '/images/hero-bg.jpg', caption: 'Campus Security Control Room' },
      { src: '/images/about-school.jpg', caption: 'CCTV Coverage — Main Gate' },
      { src: '/images/academics.jpg', caption: 'Secure Campus Entry System' },
    ],
  },
];

/* ── Modal component ─────────────────────────────────────── */
function FacilityModal({ facility, onClose }: { facility: Facility; onClose: () => void }) {
  const [imgIndex, setImgIndex] = useState(0);

  const prev = () => setImgIndex(i => (i - 1 + facility.images.length) % facility.images.length);
  const next = () => setImgIndex(i => (i + 1) % facility.images.length);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="bg-white rounded-3xl overflow-hidden shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Image carousel */}
        <div className="relative h-64 sm:h-80 shrink-0 bg-gray-900 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.img
              key={imgIndex}
              src={facility.images[imgIndex].src}
              alt={facility.images[imgIndex].caption}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full object-cover"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

          {/* Caption */}
          <p className="absolute bottom-4 left-5 text-white/90 text-sm font-medium">
            {facility.images[imgIndex].caption}
          </p>

          {/* Nav arrows */}
          {facility.images.length > 1 && (
            <>
              <button onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/40 hover:bg-black/60 rounded-full flex items-center justify-center text-white transition-colors">
                <ChevronLeft size={18} />
              </button>
              <button onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/40 hover:bg-black/60 rounded-full flex items-center justify-center text-white transition-colors">
                <ChevronRight size={18} />
              </button>
            </>
          )}

          {/* Dots */}
          <div className="absolute bottom-4 right-5 flex gap-1.5">
            {facility.images.map((_, i) => (
              <button key={i} onClick={() => setImgIndex(i)}
                className={`w-2 h-2 rounded-full transition-all ${i === imgIndex ? 'bg-white scale-125' : 'bg-white/50'}`} />
            ))}
          </div>

          {/* Tag + Close */}
          <div className="absolute top-4 left-5">
            <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${facility.tagColor}`}>{facility.tag}</span>
          </div>
          <button onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto flex-1 p-6 sm:p-8">
          <div className="flex items-center gap-4 mb-5">
            <div className="w-12 h-12 bg-[#1a3a6b] rounded-xl flex items-center justify-center shrink-0">
              <facility.icon size={22} className="text-white" />
            </div>
            <h2 className="text-2xl font-serif font-black text-[#1a3a6b]">{facility.title}</h2>
          </div>
          <ul className="space-y-4">
            {facility.detail.map((line, i) => (
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

export default function Facilities() {
  const [selected, setSelected] = useState<Facility | null>(null);

  return (
    <div className="flex flex-col">

      {/* ── Hero Banner ─────────────────────────────────────── */}
      <section className="relative min-h-[75vh] flex items-center overflow-hidden">
        <img
          src="/images/facilities-sports.jpg"
          alt="MDN Global School Facilities"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1c46]/62 via-[#0a1c46]/32 to-[#0a1c46]/8" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1c46]/42 via-transparent to-transparent" />

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
                  {/* Click hint */}
                  <div className="absolute bottom-4 right-4 text-white/70 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity bg-black/30 px-2 py-1 rounded-full">
                    Click to explore →
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-serif font-bold text-[#1a3a6b] mb-3 group-hover:text-[#f5a623] transition-colors">{f.title}</h3>
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

      {/* ── CTA ─────────────────────────────────────────────── */}
      <section className="py-20 bg-white text-center">
        <div className="container mx-auto px-6">
          <motion.h2 variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif font-bold text-[#1a3a6b] mb-8">
            Come, See It for Yourself
          </motion.h2>
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1}>
            <Link href="/contact" className="inline-block bg-[#1a3a6b] text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-[#0f2557] transition-all hover:scale-105 shadow-lg">
              Schedule a Campus Visit
            </Link>
          </motion.div>
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
