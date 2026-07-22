import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen, FlaskConical, Calculator, Microscope, TrendingUp,
  GraduationCap, CheckCircle, ChevronRight, ChevronDown, Palette, Cpu, Globe, Music2
} from 'lucide-react';
import { Link } from 'wouter';

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } })
};

/* ── Stage data with expanded details ───────────────────── */
type Stage = {
  label: string; classes: string; age: string;
  color: string; accent: string; border: string; textAccent: string;
  desc: string;
  highlights: string[];
  activities: string[];
  images: { src: string; caption: string; pos?: string }[];
};

const stages: Stage[] = [
  {
    label: 'Pre-Primary',
    classes: 'Nursery – KG 2',
    age: '3–5 yrs',
    color: 'bg-pink-50',
    accent: 'bg-pink-500',
    border: 'border-pink-200',
    textAccent: 'text-pink-600',
    desc: 'Our Pre-Primary programme sparks curiosity through play, song, stories, and hands-on exploration. Every activity is designed to build confidence, language skills, and a love for learning.',
    highlights: ['Activity-based learning', 'Montessori-inspired approach', 'Safe & nurturing environment', 'All-day supervision'],
    activities: ['Rhymes & Storytelling', 'Art & Craft', 'Sand & Water Play', 'Nature Walks', 'Music & Movement', 'Show & Tell'],
    images: [
      { src: '/images/students-happy.jpg', caption: 'Pre-Primary Students — Activity Time', pos: 'center top' },
      { src: '/images/academics.jpg', caption: 'Play-Based Learning Classroom', pos: 'center center' },
      { src: '/images/facilities-library.jpg', caption: 'Story Corner — Reading Together', pos: 'center top' },
    ]
  },
  {
    label: 'Primary',
    classes: 'Class I – V',
    age: '6–10 yrs',
    color: 'bg-blue-50',
    accent: 'bg-blue-500',
    border: 'border-blue-200',
    textAccent: 'text-blue-600',
    desc: 'The Primary stage builds a strong academic foundation in English, Hindi, Mathematics, EVS, and General Knowledge. Child-centred teaching ensures every student learns at their own pace.',
    highlights: ['CBSE curriculum', 'Child-centred pedagogy', 'Activity-based maths & science', 'Continuous Assessment'],
    activities: ['Science Experiments', 'Group Projects', 'Spell Bee', 'Math Olympiad Prep', 'Art Integration', 'Morning Assembly'],
    images: [
      { src: '/images/academics.jpg', caption: 'Primary Classroom — Interactive Session', pos: 'center center' },
      { src: '/images/facilities-lab.jpg', caption: 'Fun with Science Experiments', pos: 'center center' },
      { src: '/images/students-happy.jpg', caption: 'Students Presenting Group Projects', pos: 'center center' },
    ]
  },
  {
    label: 'Middle School',
    classes: 'Class VI – VIII',
    age: '11–13 yrs',
    color: 'bg-purple-50',
    accent: 'bg-purple-500',
    border: 'border-purple-200',
    textAccent: 'text-purple-600',
    desc: 'Middle School introduces deeper subject exploration — labs, research projects, debate, and co-curricular activities that develop critical thinking, teamwork, and confidence.',
    highlights: ['Subject specialisation begins', 'Lab-based practical sessions', 'Project-based learning', 'Leadership opportunities'],
    activities: ['Science & Maths Labs', 'Debate Club', 'Quiz Competitions', 'Social Science Projects', 'Sports Training', 'Eco Club'],
    images: [
      { src: '/images/facilities-lab.jpg', caption: 'Middle School — Science Lab', pos: 'center center' },
      { src: '/images/academics.jpg', caption: 'Debate & Public Speaking Session', pos: 'center top' },
      { src: '/images/students-happy.jpg', caption: 'Group Discussion & Teamwork', pos: 'center center' },
    ]
  },
  {
    label: 'Secondary',
    classes: 'Class IX – X',
    age: '14–15 yrs',
    color: 'bg-amber-50',
    accent: 'bg-amber-500',
    border: 'border-amber-200',
    textAccent: 'text-amber-600',
    desc: 'Classes IX and X prepare students for CBSE Board Examinations with focused academics, regular mock tests, individual counselling, and career awareness sessions.',
    highlights: ['CBSE Board prep', 'Mock tests every month', 'Personal academic counselling', 'NTSE / Olympiad coaching'],
    activities: ['Board Exam Preparation', 'Mock Test Series', 'Career Counselling', 'Olympiad Training', 'Personality Development', 'Social Internship'],
    images: [
      { src: '/images/academics.jpg', caption: 'Class X Board Preparation', pos: 'center center' },
      { src: '/images/facilities-library.jpg', caption: 'Students Studying in the Library', pos: 'center center' },
      { src: '/images/facilities-lab.jpg', caption: 'Practical Exam Practice', pos: 'center center' },
    ]
  },
  {
    label: 'Senior Secondary',
    classes: 'Class XI – XII',
    age: '16–17 yrs',
    color: 'bg-green-50',
    accent: 'bg-green-500',
    border: 'border-green-200',
    textAccent: 'text-green-600',
    desc: 'Senior Secondary offers three specialised streams — Science, Commerce, and Humanities — with college guidance, competitive exam coaching, and mentorship from experienced faculty.',
    highlights: ['Science, Commerce, Humanities streams', 'JEE / NEET / CA Foundation coaching', 'College admission guidance', '100% Board pass rate (5 years)'],
    activities: ['JEE / NEET Mock Tests', 'College Application Workshops', 'Guest Lectures', 'Research Projects', 'Leadership Council', 'Industry Visits'],
    images: [
      { src: '/images/academics.jpg', caption: 'Senior Secondary — Smart Classroom', pos: 'center center' },
      { src: '/images/facilities-lab.jpg', caption: 'Advanced Science Lab — Class XII', pos: 'center center' },
      { src: '/images/students-happy.jpg', caption: 'Class XII Graduation Celebration', pos: 'center top' },
    ]
  },
];

const streams = [
  {
    name: 'Science', icon: Microscope, color: 'from-blue-600 to-blue-800',
    subjects: ['Physics', 'Chemistry', 'Biology / Mathematics', 'English', 'Physical Education / Computer Sc.'],
    careers: ['Engineering', 'Medicine', 'Research', 'Technology']
  },
  {
    name: 'Commerce', icon: TrendingUp, color: 'from-emerald-600 to-emerald-800',
    subjects: ['Accountancy', 'Business Studies', 'Economics', 'Mathematics / Informatics', 'English'],
    careers: ['CA / MBA', 'Banking', 'Entrepreneurship', 'Finance']
  },
  {
    name: 'Humanities', icon: Globe, color: 'from-amber-600 to-amber-700',
    subjects: ['History', 'Political Science', 'Geography / Psychology', 'Sociology', 'English / Hindi'],
    careers: ['Civil Services', 'Law', 'Journalism', 'Social Work']
  },
];

const methods = [
  { icon: BookOpen,  title: 'Smart Classrooms',          desc: 'Every classroom features interactive whiteboards, HD projectors, and Wi-Fi for immersive, tech-enabled lessons.' },
  { icon: FlaskConical, title: 'Lab-Based Learning',     desc: 'Hands-on experiments in Physics, Chemistry, Biology, and Computer labs bridge theory and real-world application.' },
  { icon: Calculator,   title: 'Conceptual Mathematics', desc: 'A structured Maths programme builds strong fundamentals through problem-solving and daily application exercises.' },
  { icon: GraduationCap, title: 'Board Excellence',      desc: 'Dedicated revision cycles, full-length mock exams, and one-on-one mentoring for Class X & XII board success.' },
  { icon: Cpu,          title: 'Digital Literacy',        desc: 'Coding, AI basics, and digital tools integrated from Class VI — preparing students for the future of work.' },
  { icon: Palette,      title: 'Arts Integration',        desc: 'Creative subjects woven into academics so every learner — not just STEM achievers — has space to shine.' },
];

/* ── Expandable Stage Card ───────────────────────────────── */
function StageCard({ stage, index, isOpen, onToggle }: {
  stage: Stage; index: number; isOpen: boolean; onToggle: () => void;
}) {
  return (
    <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={index * 0.12}
      className={`rounded-2xl border-2 overflow-hidden transition-all duration-300 ${
        isOpen ? `${stage.border} shadow-xl` : `${stage.border} hover:shadow-lg`
      } ${stage.color}`}
    >
      {/* Header — always visible, clickable */}
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-5 p-6 text-left group focus:outline-none"
        aria-expanded={isOpen}
      >
        <div className={`${stage.accent} text-white rounded-xl p-3 shrink-0 transition-transform duration-200 ${isOpen ? 'scale-110' : 'group-hover:scale-110'}`}>
          <GraduationCap size={24} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-3 mb-1">
            <h3 className="text-xl font-serif font-bold text-[#1a3a6b]">{stage.label}</h3>
            <span className="bg-white border border-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full font-semibold">{stage.classes}</span>
            <span className="text-gray-400 text-sm">· Ages {stage.age}</span>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed line-clamp-1">{stage.desc}</p>
        </div>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.25 }}
          className={`shrink-0 ${stage.textAccent}`}>
          <ChevronDown size={22} />
        </motion.div>
      </button>

      {/* Expanded content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-7 border-t border-white/80">
              <div className="grid lg:grid-cols-2 gap-8 mt-6">

                {/* Left — description + highlights + activities */}
                <div>
                  <p className="text-gray-700 leading-relaxed mb-6">{stage.desc}</p>

                  <div className="mb-5">
                    <p className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-3">Key Highlights</p>
                    <ul className="space-y-2">
                      {stage.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-gray-700 text-sm font-medium">
                          <CheckCircle size={15} className={`${stage.textAccent} shrink-0 mt-0.5`} /> {h}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-3">Activities & Programmes</p>
                    <div className="flex flex-wrap gap-2">
                      {stage.activities.map((a, i) => (
                        <span key={i} className="bg-white border border-gray-200 text-gray-700 text-xs px-3 py-1.5 rounded-full font-medium">{a}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right — photo grid */}
                <div className="grid grid-cols-3 gap-3">
                  {stage.images.map((img, i) => (
                    <div key={i} className={`rounded-xl overflow-hidden shadow-md bg-gray-100 ${i === 0 ? 'col-span-3 aspect-video' : 'aspect-square'}`}>
                      <img src={img.src} alt={img.caption}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-400"
                        style={{ objectPosition: img.pos || 'center' }} />
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <Link href="/contact"
                  className={`inline-flex items-center gap-2 ${stage.accent} text-white px-6 py-2.5 rounded-full font-semibold text-sm hover:opacity-90 transition-opacity shadow-md`}>
                  Enquire About Admission <ChevronRight size={15} />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Academics() {
  const [openStage, setOpenStage] = useState<number | null>(null);

  return (
    <div className="flex flex-col">

      {/* ── Hero Banner ─────────────────────────────────────── */}
      <section className="relative min-h-[75vh] flex items-center overflow-hidden">
        <img src="/images/academics.jpg" alt="Academics at MDN Global School"
          className="absolute inset-0 w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1c46]/60 via-[#0a1c46]/35 to-[#1e56a0]/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1c46]/40 via-transparent to-transparent" />

        <div className="container mx-auto px-6 py-24 relative z-10">
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}
            className="inline-flex items-center gap-2 bg-[#f5a623]/20 border border-[#f5a623]/40 rounded-full px-4 py-1.5 text-[#f5a623] text-xs font-bold tracking-widest uppercase mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#f5a623]" /> CBSE Curriculum
          </motion.div>
          <motion.h1 variants={fadeUp} initial="hidden" animate="visible" custom={1}
            className="text-5xl md:text-7xl font-serif font-black text-white leading-tight mb-5"
            style={{ textShadow: '0 4px 24px rgba(0,0,0,0.5)' }}>
            Academic <span className="text-[#f5a623]">Excellence</span>
          </motion.h1>
          <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={2}
            className="text-white/90 text-lg md:text-xl max-w-2xl leading-relaxed">
            A rigorous CBSE curriculum enriched with modern pedagogy, smart technology, and educators who inspire every learner from Nursery to Class XII.
          </motion.p>
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={3} className="mt-8 flex gap-3">
            <div className="h-1 w-20 bg-[#f5a623] rounded-full" />
            <div className="h-1 w-8 bg-white/30 rounded-full" />
          </motion.div>
        </div>
      </section>

      {/* ── Academic Structure — Expandable ──────────────────── */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-5">
            <p className="text-[#f5a623] font-bold tracking-widest uppercase text-sm mb-3">From Nursery to Class XII</p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#1a3a6b] mb-4">Our Academic Structure</h2>
            <p className="text-gray-500 max-w-xl mx-auto text-lg">Every stage carefully crafted for a child's developmental needs</p>
          </motion.div>
          {/* ── Key Stats ── */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-10">
            {[
              { num: 'CBSE', label: 'Board Affiliation', sub: 'National Curriculum' },
              { num: 'KG–XII', label: 'Classes Offered', sub: 'Complete Journey' },
              { num: '100%', label: 'Pass Rate', sub: 'Consistent 5 Years' },
              { num: '150+', label: 'Qualified Faculty', sub: 'Experienced Educators' },
            ].map((s, i) => (
              <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i * 0.1}
                className="bg-white rounded-2xl p-5 text-center shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="text-2xl md:text-3xl font-serif font-black text-[#1a3a6b] mb-1">{s.num}</div>
                <div className="text-[#f5a623] text-xs font-black uppercase tracking-wider mb-0.5">{s.label}</div>
                <div className="text-gray-400 text-xs">{s.sub}</div>
              </motion.div>
            ))}
          </div>

          <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="text-center text-sm text-gray-400 mb-10 flex items-center justify-center gap-2">
            <ChevronDown size={15} className="animate-bounce" /> Click any stage to explore photos, activities, and highlights
          </motion.p>

          <div className="flex flex-col gap-4 max-w-4xl mx-auto">
            {stages.map((stage, i) => (
              <StageCard key={i} stage={stage} index={i}
                isOpen={openStage === i}
                onToggle={() => setOpenStage(openStage === i ? null : i)} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Senior Secondary Streams ─────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
            <p className="text-[#f5a623] font-bold tracking-widest uppercase text-sm mb-3">Class XI & XII</p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#1a3a6b] mb-4">Choose Your Stream</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Three well-structured streams to align your education with your career aspirations</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {streams.map((stream, i) => (
              <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i * 0.15}
                className="rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group">
                <div className={`bg-gradient-to-br ${stream.color} p-10 text-white`}>
                  <stream.icon size={40} className="mb-4 opacity-90" />
                  <h3 className="text-3xl font-serif font-black mb-2">{stream.name}</h3>
                  <p className="text-white/70 text-sm">Class XI – XII · CBSE</p>
                </div>
                <div className="p-8 bg-white border border-gray-100">
                  <p className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-4">Subjects</p>
                  <ul className="space-y-2 mb-6">
                    {stream.subjects.map((sub, j) => (
                      <li key={j} className="flex items-center gap-2 text-gray-700 text-sm font-medium">
                        <CheckCircle size={15} className="text-green-500 shrink-0" /> {sub}
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-3">Career Paths</p>
                  <div className="flex flex-wrap gap-2">
                    {stream.careers.map((c, k) => (
                      <span key={k} className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full font-semibold">{c}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Teaching Methodology ─────────────────────────────── */}
      <section className="py-24 bg-gradient-to-br from-[#f8f9ff] to-[#eef2ff]">
        <div className="container mx-auto px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
            <p className="text-[#f5a623] font-bold tracking-widest uppercase text-sm mb-3">How We Teach</p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#1a3a6b] mb-4">Our Teaching Approach</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Modern methods meeting timeless wisdom — inside and outside the classroom</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {methods.map((m, i) => (
              <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i * 0.12}
                className="bg-white rounded-2xl p-7 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 flex gap-5 group">
                <div className="w-13 h-13 w-12 h-12 bg-[#1a3a6b]/08 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-[#1a3a6b] transition-all">
                  <m.icon size={26} className="text-[#1a3a6b] group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h3 className="text-lg font-serif font-bold text-[#1a3a6b] mb-2">{m.title}</h3>
                  <p className="text-gray-500 leading-relaxed text-sm">{m.desc}</p>
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

      {/* ── Co-Curricular ────────────────────────────────────── */}
      <section className="py-24 bg-[#1a3a6b] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '48px 48px' }} />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-14">
            <p className="text-[#f5a623] font-bold tracking-widest uppercase text-sm mb-3">Beyond the Classroom</p>
            <h2 className="text-4xl font-serif font-bold text-white mb-4">Co-Curricular Excellence</h2>
            <p className="text-white/60 max-w-xl mx-auto">We believe great education happens everywhere — on stage, on the field, and in the community</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: Music2, title: 'Performing Arts', desc: 'Classical music, dance, drama, and choir programmes taught by trained professionals.' },
              { icon: Palette, title: 'Visual Arts', desc: 'Drawing, painting, sculpture, and digital arts with a dedicated studio and annual exhibitions.' },
              { icon: Globe, title: 'MUN & Debate', desc: 'Model United Nations, elocution, and debate competitions that build global citizens.' },
              { icon: GraduationCap, title: 'Leadership Clubs', desc: 'Eco Club, Student Council, and community service programmes that develop responsible leaders.' },
            ].map((item, i) => (
              <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i * 0.12}
                className="bg-white/10 border border-white/15 rounded-2xl p-7 hover:bg-white/15 transition-all duration-300">
                <div className="w-12 h-12 bg-[#f5a623] rounded-xl flex items-center justify-center mb-5">
                  <item.icon size={24} className="text-[#1a3a6b]" />
                </div>
                <h3 className="text-lg font-serif font-bold text-white mb-3">{item.title}</h3>
                <p className="text-white/65 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
