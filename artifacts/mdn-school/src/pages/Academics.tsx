import { motion } from 'framer-motion';
import {
  BookOpen, FlaskConical, Calculator, Microscope, TrendingUp,
  GraduationCap, CheckCircle, ChevronRight, Palette, Cpu, HeartPulse, Atom
} from 'lucide-react';
import { Link } from 'wouter';

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } })
};

/* ── Stage card data ─────────────────────────────────────── */
const stages = [
  {
    label: 'Pre-Primary',
    classes: 'Nursery – KG 2',
    age: '3–5 yrs',
    image: '/images/students-happy.jpg',
    imagePos: 'center top',
    accent: 'bg-pink-500',
    badgeBg: 'bg-pink-100',
    badgeText: 'text-pink-700',
    borderTop: 'border-t-4 border-pink-400',
    desc: 'Our Pre-Primary programme sparks curiosity through play, song, stories, and hands-on exploration. Every activity builds confidence, language skills, and a lifelong love for learning in a safe and nurturing environment.',
    highlights: ['Activity-based & Montessori-inspired learning', 'Safe, nurturing & fully supervised environment', 'Rhymes, storytelling, art & music', 'Sand & water play, nature walks'],
  },
  {
    label: 'Primary',
    classes: 'Class I – V',
    age: '6–10 yrs',
    image: '/images/academics.jpg',
    imagePos: 'center center',
    accent: 'bg-blue-500',
    badgeBg: 'bg-blue-100',
    badgeText: 'text-blue-700',
    borderTop: 'border-t-4 border-blue-400',
    desc: 'The Primary stage builds a strong academic foundation in English, Hindi, Mathematics, EVS, and General Knowledge. Child-centred teaching ensures every student learns at their own pace through engaging, activity-based methods.',
    highlights: ['CBSE curriculum with child-centred pedagogy', 'Activity-based Maths & Science', 'Continuous & comprehensive assessment', 'Spell Bee, Math Olympiad & group projects'],
  },
  {
    label: 'Middle School',
    classes: 'Class VI – VIII',
    age: '11–13 yrs',
    image: '/images/facilities-lab.jpg',
    imagePos: 'center center',
    accent: 'bg-purple-500',
    badgeBg: 'bg-purple-100',
    badgeText: 'text-purple-700',
    borderTop: 'border-t-4 border-purple-400',
    desc: 'Middle School deepens subject exploration through labs, research projects, debate, and co-curricular activities that develop critical thinking, teamwork, and self-confidence in every student.',
    highlights: ['Subject specialisation & lab-based practicals', 'Project-based & collaborative learning', 'Debate club, quiz & science competitions', 'Leadership and Eco Club opportunities'],
  },
  {
    label: 'Secondary',
    classes: 'Class IX – X',
    age: '14–15 yrs',
    image: '/images/facilities-library.jpg',
    imagePos: 'center center',
    accent: 'bg-amber-500',
    badgeBg: 'bg-amber-100',
    badgeText: 'text-amber-700',
    borderTop: 'border-t-4 border-amber-400',
    desc: 'Classes IX and X prepare students for CBSE Board Examinations with focused academics, regular mock tests, individual counselling, and career awareness sessions to set a clear path ahead.',
    highlights: ['Rigorous CBSE Board preparation', 'Monthly mock test series', 'Personal academic & career counselling', 'NTSE & Olympiad coaching'],
  },
  {
    label: 'Senior Secondary',
    classes: 'Class XI – XII',
    age: '16–17 yrs',
    image: '/images/academics.jpg',
    imagePos: 'center top',
    accent: 'bg-green-600',
    badgeBg: 'bg-green-100',
    badgeText: 'text-green-700',
    borderTop: 'border-t-4 border-green-500',
    desc: 'Senior Secondary offers three specialised streams — Medical, Non-Medical, and Commerce — with college guidance, competitive exam coaching (JEE / NEET), and mentorship from highly experienced faculty.',
    highlights: ['Medical, Non-Medical & Commerce streams', 'JEE / NEET / CA Foundation coaching', 'College & career admission guidance', '100% Board pass rate for 5 consecutive years'],
  },
];

/* ── Stream data ─────────────────────────────────────────── */
const streams = [
  {
    name: 'Medical',
    tagline: 'For future doctors & life scientists',
    icon: HeartPulse,
    color: 'from-rose-600 to-rose-800',
    subjects: ['Physics', 'Chemistry', 'Biology', 'English', 'Physical Education / Computer Sc.'],
    careers: ['Medicine (MBBS)', 'Pharmacy', 'Biotechnology', 'Research & Life Sciences'],
  },
  {
    name: 'Non-Medical',
    tagline: 'For future engineers & technologists',
    icon: Atom,
    color: 'from-blue-600 to-blue-800',
    subjects: ['Physics', 'Chemistry', 'Mathematics', 'English', 'Physical Education / Computer Sc.'],
    careers: ['Engineering (JEE)', 'Architecture', 'Data Science', 'Technology & Research'],
  },
  {
    name: 'Commerce',
    tagline: 'For future business leaders & CAs',
    icon: TrendingUp,
    color: 'from-emerald-600 to-emerald-800',
    subjects: ['Accountancy', 'Business Studies', 'Economics', 'Mathematics / Informatics', 'English'],
    careers: ['CA / MBA', 'Banking & Finance', 'Entrepreneurship', 'Management'],
  },
];

/* ── Teaching methods ────────────────────────────────────── */
const methods = [
  { icon: BookOpen,     title: 'Smart Classrooms',      desc: 'Every classroom features interactive whiteboards, HD projectors, and Wi-Fi for immersive, tech-enabled lessons.' },
  { icon: FlaskConical, title: 'Lab-Based Learning',    desc: 'Hands-on experiments in Physics, Chemistry, Biology, and Computer labs bridge theory and real-world application.' },
  { icon: Calculator,   title: 'Conceptual Mathematics',desc: 'A structured Maths programme builds strong fundamentals through problem-solving and daily application exercises.' },
  { icon: GraduationCap,title: 'Board Excellence',      desc: 'Dedicated revision cycles, full-length mock exams, and one-on-one mentoring for Class X & XII board success.' },
  { icon: Cpu,          title: 'Digital Literacy',      desc: 'Coding, AI basics, and digital tools integrated from Class VI — preparing students for the future of work.' },
  { icon: Palette,      title: 'Arts Integration',      desc: 'Creative subjects woven into academics so every learner — not just STEM achievers — has space to shine.' },
];

export default function Academics() {
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

      {/* ── Academic Structure — Stage Cards ─────────────────── */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-5">
            <p className="text-[#f5a623] font-bold tracking-widest uppercase text-sm mb-3">From Nursery to Class XII</p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#1a3a6b] mb-4">Our Academic Structure</h2>
            <p className="text-gray-500 max-w-xl mx-auto text-lg">Every stage carefully crafted for a child's developmental needs</p>
          </motion.div>

          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-16">
            {[
              { num: 'CBSE',  label: 'Board Affiliation',  sub: 'National Curriculum' },
              { num: 'KG–XII',label: 'Classes Offered',    sub: 'Complete Journey' },
              { num: '100%',  label: 'Pass Rate',          sub: 'Consistent 5 Years' },
              { num: '150+',  label: 'Qualified Faculty',  sub: 'Experienced Educators' },
            ].map((s, i) => (
              <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i * 0.1}
                className="bg-white rounded-2xl p-5 text-center shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="text-2xl md:text-3xl font-serif font-black text-[#1a3a6b] mb-1">{s.num}</div>
                <div className="text-[#f5a623] text-xs font-black uppercase tracking-wider mb-0.5">{s.label}</div>
                <div className="text-gray-400 text-xs">{s.sub}</div>
              </motion.div>
            ))}
          </div>

          {/* Stage cards grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {stages.map((stage, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i * 0.1}
                className={`bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col ${stage.borderTop}`}
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={stage.image}
                    alt={stage.label}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    style={{ objectPosition: stage.imagePos }}
                  />
                  {/* Overlay badge */}
                  <div className="absolute top-4 left-4">
                    <span className={`${stage.badgeBg} ${stage.badgeText} text-xs font-bold px-3 py-1.5 rounded-full shadow-sm`}>
                      {stage.classes}
                    </span>
                  </div>
                  <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-black/40 to-transparent" />
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`${stage.accent} text-white rounded-xl p-2 shrink-0`}>
                      <GraduationCap size={20} />
                    </div>
                    <div>
                      <h3 className="text-xl font-serif font-black text-[#1a3a6b] leading-tight">{stage.label}</h3>
                      <p className="text-gray-400 text-xs font-semibold">Ages {stage.age}</p>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm leading-relaxed mb-5">{stage.desc}</p>

                  <ul className="space-y-2 mb-6 flex-1">
                    {stage.highlights.map((h, j) => (
                      <li key={j} className="flex items-start gap-2 text-gray-700 text-sm">
                        <CheckCircle size={14} className="text-green-500 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  <Link href="/contact"
                    className={`mt-auto inline-flex items-center gap-2 ${stage.accent} text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity self-start shadow-sm`}>
                    Enquire <ChevronRight size={14} />
                  </Link>
                </div>
              </motion.div>
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
                <div className="w-12 h-12 bg-[#1a3a6b]/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-[#1a3a6b] transition-all">
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

    </div>
  );
}
