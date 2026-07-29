import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen, FlaskConical, Calculator,
  GraduationCap, CheckCircle, ChevronRight, Palette, Cpu, HeartPulse, Atom, TrendingUp, ArrowLeft
} from 'lucide-react';
import { Link } from 'wouter';

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } })
};

/* ── Stage data ──────────────────────────────────────────── */
type Stage = {
  label: string; classes: string; age: string;
  image: string; imagePos: string;
  accentBg: string; accentText: string; borderTop: string;
  badgeBg: string; badgeText: string;
  desc: string; highlights: string[];
  detailImage: string;
};

const stages: Stage[] = [
  {
    label: 'Pre-Primary',
    classes: 'Nursery – KG 2', age: '3–5 yrs',
    image: '/images/students-happy.jpg', imagePos: 'center top',
    accentBg: 'bg-pink-500', accentText: 'text-pink-600',
    borderTop: 'border-t-4 border-pink-400',
    badgeBg: 'bg-pink-500', badgeText: 'text-white',
    detailImage: '/images/students-happy.jpg',
    desc: 'Our Pre-Primary programme sparks curiosity through play, song, stories, and hands-on exploration. Every activity builds confidence, language skills, and a lifelong love for learning in a safe and nurturing environment.',
    highlights: [
      'Activity-based & Montessori-inspired learning',
      'Safe, nurturing & fully supervised environment',
      'Rhymes, storytelling, art & music every day',
      'Sand & water play, nature walks & movement',
      'Morning assembly, show & tell, and group activities',
    ],
  },
  {
    label: 'Primary',
    classes: 'Class I – V', age: '6–10 yrs',
    image: '/images/primary-kids.png', imagePos: 'center center',
    accentBg: 'bg-blue-500', accentText: 'text-blue-600',
    borderTop: 'border-t-4 border-blue-400',
    badgeBg: 'bg-blue-500', badgeText: 'text-white',
    detailImage: '/images/primary-kids.png',
    desc: 'The Primary stage builds a strong academic foundation in English, Hindi, Mathematics, EVS, and General Knowledge. Child-centred teaching ensures every student learns at their own pace through engaging, activity-based methods.',
    highlights: [
      'CBSE curriculum with child-centred pedagogy',
      'Activity-based Maths & Science experiments',
      'Continuous & comprehensive assessment',
      'Spell Bee, Math Olympiad & group projects',
      'Art integration and morning reading sessions',
    ],
  },
  {
    label: 'Middle School',
    classes: 'Class VI – VIII', age: '11–13 yrs',
    image: '/images/science-lab.png', imagePos: 'center center',
    accentBg: 'bg-purple-500', accentText: 'text-purple-600',
    borderTop: 'border-t-4 border-purple-400',
    badgeBg: 'bg-purple-500', badgeText: 'text-white',
    detailImage: '/images/science-lab.png',
    desc: 'Middle School deepens subject exploration through labs, research projects, debate, and co-curricular activities that develop critical thinking, teamwork, and self-confidence in every student.',
    highlights: [
      'Subject specialisation begins with lab-based practicals',
      'Project-based & collaborative learning approach',
      'Debate club, quiz & science competitions',
      'Leadership, Eco Club & student council opportunities',
      'Social Science projects & community internships',
    ],
  },
  {
    label: 'Secondary',
    classes: 'Class IX – X', age: '14–15 yrs',
    image: '/images/facilities-library.jpg', imagePos: 'center center',
    accentBg: 'bg-amber-500', accentText: 'text-amber-600',
    borderTop: 'border-t-4 border-amber-400',
    badgeBg: 'bg-amber-500', badgeText: 'text-white',
    detailImage: '/images/facilities-library.jpg',
    desc: 'Classes IX and X prepare students for CBSE Board Examinations with focused academics, regular mock tests, individual counselling, and career awareness sessions to set a clear path ahead.',
    highlights: [
      'Rigorous CBSE Board preparation programme',
      'Monthly full-length mock test series',
      'Personal academic & career counselling sessions',
      'NTSE & Olympiad coaching and training',
      'Personality development & social internship programmes',
    ],
  },
  {
    label: 'Senior Secondary',
    classes: 'Class XI – XII', age: '16–17 yrs',
    image: '/images/academics.jpg', imagePos: 'center top',
    accentBg: 'bg-green-600', accentText: 'text-green-700',
    borderTop: 'border-t-4 border-green-500',
    badgeBg: 'bg-green-600', badgeText: 'text-white',
    detailImage: '/images/academics.jpg',
    desc: 'Senior Secondary offers three specialised streams — Medical, Non-Medical, and Commerce — with college guidance, competitive exam coaching (JEE / NEET), and mentorship from highly experienced faculty.',
    highlights: [
      'Medical, Non-Medical & Commerce streams available',
      'JEE / NEET / CA Foundation coaching included',
      'College & university admission guidance support',
      '100% Board pass rate for 5 consecutive years',
      'Guest lectures, research projects & industry visits',
    ],
  },
];

/* ── Stream data ─────────────────────────────────────────── */
const streams = [
  {
    name: 'Medical', tagline: 'For future doctors & life scientists',
    icon: HeartPulse, color: 'from-rose-600 to-rose-800',
    subjects: ['Physics', 'Chemistry', 'Biology', 'English', 'Physical Education / Computer Sc.'],
  },
  {
    name: 'Non-Medical', tagline: 'For future engineers & technologists',
    icon: Atom, color: 'from-blue-600 to-blue-800',
    subjects: ['Physics', 'Chemistry', 'Mathematics', 'English', 'Physical Education / Computer Sc.'],
  },
  {
    name: 'Commerce', tagline: 'For future business leaders & CAs',
    icon: TrendingUp, color: 'from-emerald-600 to-emerald-800',
    subjects: ['Accountancy', 'Business Studies', 'Economics', 'Mathematics / Informatics', 'English'],
  },
];

/* ── Teaching methods ────────────────────────────────────── */
const methods = [
  { icon: BookOpen,     title: 'Smart Classrooms',       desc: 'Every classroom features interactive whiteboards, HD projectors, and Wi-Fi for immersive, tech-enabled lessons.', color: 'bg-blue-500' },
  { icon: FlaskConical, title: 'Lab-Based Learning',     desc: 'Hands-on experiments in Physics, Chemistry, Biology, and Computer labs bridge theory and real-world application.', color: 'bg-purple-500' },
  { icon: Calculator,   title: 'Conceptual Mathematics', desc: 'A structured Maths programme builds strong fundamentals through problem-solving and daily application exercises.', color: 'bg-amber-500' },
  { icon: GraduationCap,title: 'Board Excellence',       desc: 'Dedicated revision cycles, full-length mock exams, and one-on-one mentoring for Class X & XII board success.', color: 'bg-green-600' },
  { icon: Cpu,          title: 'Digital Literacy',       desc: 'Coding, AI basics, and digital tools integrated from Class VI — preparing students for the future of work.', color: 'bg-cyan-500' },
  { icon: Palette,      title: 'Arts Integration',       desc: 'Creative subjects woven into academics so every learner — not just STEM achievers — has space to shine.', color: 'bg-rose-500' },
];

export default function Academics() {
  const [selectedStage, setSelectedStage] = useState<Stage | null>(null);

  return (
    <div className="flex flex-col">

      {/* ── Hero Banner ─────────────────────────────────────── */}
      <section className="relative min-h-[75vh] flex items-center overflow-hidden">
        <img src="/images/classroom.png" alt="Academics at MDN Global School"
          className="absolute inset-0 w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1c46]/60 via-[#0a1c46]/35 to-[#1e56a0]/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1c46]/40 via-transparent to-transparent" />
        <div className="container mx-auto px-6 py-24 relative z-10">
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}
            className="inline-flex items-center gap-2 bg-[#f5a623]/20 border border-[#f5a623]/40 rounded-full px-4 py-1.5 text-[#f5a623] text-xs font-bold tracking-widest uppercase mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#f5a623]" /> CBSE Curriculum
          </motion.div>
          <motion.h1 variants={fadeUp} initial="hidden" animate="visible" custom={1}
            className="text-3xl sm:text-5xl md:text-7xl font-serif font-black text-white leading-tight mb-5"
            style={{ textShadow: '0 4px 24px rgba(0,0,0,0.5)' }}>
            Academic <span className="text-[#f5a623]">Excellence</span>
          </motion.h1>
          <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={2}
            className="text-white/90 text-lg md:text-xl max-w-2xl leading-relaxed">
            A rigorous CBSE curriculum enriched with modern pedagogy, smart technology, and educators who inspire every learner from Nursery to Class XII.
          </motion.p>
        </div>
      </section>

      {/* ── Academic Structure ───────────────────────────────── */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-5">
            <p className="text-[#f5a623] font-bold tracking-widest uppercase text-sm mb-3">From Nursery to Class XII</p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#1a3a6b] mb-4">Our Academic Structure</h2>
            <p className="text-gray-500 max-w-xl mx-auto text-lg">Every stage carefully crafted for a child's developmental needs</p>
          </motion.div>

          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12">
            {[
              { num: 'CBSE',  label: 'Board Affiliation', sub: 'National Curriculum' },
              { num: 'KG–XII',label: 'Classes Offered',   sub: 'Complete Journey' },
              { num: '100%',  label: 'Pass Rate',         sub: 'Consistent 5 Years' },
              { num: '150+',  label: 'Qualified Faculty', sub: 'Experienced Educators' },
            ].map((s, i) => (
              <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i * 0.1}
                className="bg-white rounded-2xl p-5 text-center shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="text-2xl md:text-3xl font-serif font-black text-[#1a3a6b] mb-1">{s.num}</div>
                <div className="text-[#f5a623] text-xs font-black uppercase tracking-wider mb-0.5">{s.label}</div>
                <div className="text-gray-400 text-xs">{s.sub}</div>
              </motion.div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {!selectedStage ? (
              /* ── Card grid ── */
              <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <p className="text-center text-sm text-gray-400 mb-10 flex items-center justify-center gap-2">
                  <span className="inline-block w-4 h-px bg-gray-300" />
                  Click a stage to explore details
                  <span className="inline-block w-4 h-px bg-gray-300" />
                </p>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                  {stages.map((stage, i) => (
                    <motion.button
                      key={i}
                      variants={fadeUp}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      custom={i * 0.1}
                      onClick={() => setSelectedStage(stage)}
                      className={`rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group cursor-pointer focus:outline-none ${stage.borderTop}`}
                    >
                      {/* Image only */}
                      <div className="relative h-56 overflow-hidden bg-gray-200">
                        <img
                          src={stage.image}
                          alt={stage.label}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          style={{ objectPosition: stage.imagePos }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                        {/* Stage name at bottom */}
                        <div className="absolute bottom-0 inset-x-0 p-4 text-left">
                          <span className={`text-xs font-bold px-2.5 py-1 rounded-full mb-2 inline-block ${stage.badgeBg} ${stage.badgeText}`}>
                            {stage.classes}
                          </span>
                          <h3 className="text-xl font-serif font-black text-white leading-tight">{stage.label}</h3>
                          <p className="text-white/70 text-xs mt-0.5">Ages {stage.age}</p>
                        </div>
                        {/* Hover hint */}
                        <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                          Tap to explore →
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            ) : (
              /* ── Detail view ── */
              <motion.div
                key="detail"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-5xl mx-auto"
              >
                {/* Back button */}
                <button
                  onClick={() => setSelectedStage(null)}
                  className="inline-flex items-center gap-2 text-[#1a3a6b] font-semibold hover:text-[#f5a623] transition-colors mb-8 group"
                >
                  <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                  Back to all stages
                </button>

                {/* Two-column layout */}
                <div className="grid lg:grid-cols-2 gap-10 items-start bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                  {/* Left — info */}
                  <div className="p-8 lg:p-10">
                    <div className="flex items-center gap-3 mb-5">
                      <div className={`${selectedStage.accentBg} text-white rounded-xl p-2.5 shrink-0`}>
                        <GraduationCap size={22} />
                      </div>
                      <div>
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${selectedStage.badgeBg} ${selectedStage.badgeText} mb-1 inline-block`}>
                          {selectedStage.classes}
                        </span>
                        <h3 className="text-3xl font-serif font-black text-[#1a3a6b] leading-tight">{selectedStage.label}</h3>
                        <p className="text-gray-400 text-sm">Ages {selectedStage.age}</p>
                      </div>
                    </div>

                    <p className="text-gray-600 leading-relaxed mb-7">{selectedStage.desc}</p>

                    <p className="text-xs font-black tracking-widest text-gray-400 uppercase mb-4">Key Highlights</p>
                    <ul className="space-y-3 mb-8">
                      {selectedStage.highlights.map((h, j) => (
                        <li key={j} className="flex items-start gap-3 text-gray-700 text-sm font-medium">
                          <CheckCircle size={16} className={`${selectedStage.accentText} shrink-0 mt-0.5`} />
                          {h}
                        </li>
                      ))}
                    </ul>

                    <Link href="/contact"
                      className={`inline-flex items-center gap-2 ${selectedStage.accentBg} text-white px-6 py-3 rounded-full font-semibold text-sm hover:opacity-90 transition-opacity shadow-md`}>
                      Enquire About Admissions <ChevronRight size={15} />
                    </Link>
                  </div>

                  {/* Right — image */}
                  <div className="relative h-72 lg:h-full min-h-[320px] overflow-hidden">
                    <img
                      src={selectedStage.detailImage}
                      alt={selectedStage.label}
                      className="w-full h-full object-cover"
                      style={{ objectPosition: selectedStage.imagePos }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent lg:bg-gradient-to-l" />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ── Senior Secondary Streams ─────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
            <p className="text-[#f5a623] font-bold tracking-widest uppercase text-sm mb-3">Class XI & XII</p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#1a3a6b] mb-4">Choose Your Stream</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Three well-structured streams to align your education with your future goals</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {streams.map((stream, i) => (
              <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i * 0.15}
                className="rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group">
                <div className={`bg-gradient-to-br ${stream.color} p-10 text-white`}>
                  <stream.icon size={40} className="mb-4 opacity-90" />
                  <h3 className="text-3xl font-serif font-black mb-1">{stream.name}</h3>
                  <p className="text-white/70 text-sm">{stream.tagline}</p>
                </div>
                <div className="p-8 bg-white border border-gray-100">
                  <p className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-4">Subjects</p>
                  <ul className="space-y-2.5">
                    {stream.subjects.map((sub, j) => (
                      <li key={j} className="flex items-center gap-2 text-gray-700 text-sm font-medium">
                        <CheckCircle size={15} className="text-green-500 shrink-0" /> {sub}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Teaching Methodology ─────────────────────────────── */}
      <section className="py-24 bg-[#1a3a6b]">
        <div className="container mx-auto px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
            <p className="text-[#f5a623] font-bold tracking-widest uppercase text-sm mb-3">How We Teach</p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">Our Teaching Approach</h2>
            <p className="text-white/50 max-w-xl mx-auto">Modern methods meeting timeless wisdom — inside and outside the classroom</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {methods.map((m, i) => (
              <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i * 0.1}
                className="bg-white/08 border border-white/10 rounded-2xl p-6 hover:bg-white/14 transition-all duration-300 group flex flex-col gap-4">
                <div className={`w-12 h-12 ${m.color} rounded-xl flex items-center justify-center shrink-0 shadow-lg`}>
                  <m.icon size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-serif font-bold text-white mb-2">{m.title}</h3>
                  <p className="text-white/60 leading-relaxed text-sm">{m.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Board Results + Image ────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div variants={{ hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0, transition: { duration: 0.7 } } }}
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="rounded-3xl overflow-hidden shadow-2xl aspect-video">
              <img src="/images/academics.jpg" alt="Smart Classroom" className="w-full h-full object-cover" />
            </motion.div>
            <motion.div variants={{ hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0, transition: { duration: 0.7 } } }}
              initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <p className="text-[#f5a623] font-bold tracking-widest uppercase text-sm flex items-center gap-3 mb-4">
                <span className="w-10 h-px bg-[#f5a623]" /> Results & Achievements
              </p>
              <h2 className="text-4xl font-serif font-bold text-[#1a3a6b] mb-6">Consistently Exceptional<br />Board Results</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                Our students have maintained 100% pass rates in CBSE Board Examinations year after year. Many Class XII graduates go on to secure top ranks in JEE, NEET, and prestigious universities across India.
              </p>
              <ul className="space-y-3 mb-10">
                {[
                  '100% pass rate in CBSE X & XII (last 5 years)',
                  '15+ students in Top 100 state merit list',
                  'JEE / NEET qualifiers every year',
                  'NTSE & Olympiad gold medallists',
                  'Students placed in IITs, NITs & top colleges'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-700 font-medium">
                    <CheckCircle size={18} className="text-green-500 shrink-0" /> {item}
                  </li>
                ))}
              </ul>
              <Link href="/contact"
                className="inline-block bg-[#1a3a6b] text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-[#0f2557] transition-all hover:scale-105 shadow-lg">
                Enquire About Admissions
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  );
}
