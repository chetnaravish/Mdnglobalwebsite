import { motion } from 'framer-motion';
import { BookOpen, FlaskConical, Calculator, Globe, Microscope, TrendingUp, GraduationCap, CheckCircle, ChevronRight } from 'lucide-react';
import { Link } from 'wouter';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } })
};

const stages = [
  { label: 'Pre-Primary', classes: 'Nursery – KG 2', age: '3–5 yrs', color: 'bg-pink-50 border-pink-200', accent: 'bg-pink-500', desc: 'Play-based learning through stories, music, art, and discovery activities.' },
  { label: 'Primary', classes: 'Class I – V', age: '6–10 yrs', color: 'bg-blue-50 border-blue-200', accent: 'bg-blue-500', desc: 'Strong foundation in core subjects with activity-based, child-centred pedagogy.' },
  { label: 'Middle School', classes: 'Class VI – VIII', age: '11–13 yrs', color: 'bg-purple-50 border-purple-200', accent: 'bg-purple-500', desc: 'Deeper subject exploration with introduction to labs, projects, and debates.' },
  { label: 'Secondary', classes: 'Class IX – X', age: '14–15 yrs', color: 'bg-amber-50 border-amber-200', accent: 'bg-amber-500', desc: 'CBSE Board preparation with focused academics, mock tests, and counselling.' },
  { label: 'Senior Secondary', classes: 'Class XI – XII', age: '16–17 yrs', color: 'bg-green-50 border-green-200', accent: 'bg-green-500', desc: 'Specialised streams with career guidance, college prep, and competitive exam coaching.' },
];

const streams = [
  {
    name: 'Science', icon: Microscope, color: 'from-blue-600 to-blue-800',
    subjects: ['Physics', 'Chemistry', 'Biology / Mathematics', 'English', 'Physical Education / Computer Science'],
    careers: ['Engineering', 'Medicine', 'Research', 'Technology']
  },
  {
    name: 'Commerce', icon: TrendingUp, color: 'from-emerald-600 to-emerald-800',
    subjects: ['Accountancy', 'Business Studies', 'Economics', 'Mathematics / Informatics', 'English'],
    careers: ['CA', 'MBA', 'Banking', 'Entrepreneurship']
  },
  {
    name: 'Humanities', icon: Globe, color: 'from-amber-600 to-amber-700',
    subjects: ['History', 'Political Science', 'Geography / Psychology', 'Sociology', 'English / Hindi'],
    careers: ['Civil Services', 'Law', 'Journalism', 'Social Work']
  },
];

const methods = [
  { icon: BookOpen, title: 'Smart Classrooms', desc: 'Every classroom is equipped with interactive whiteboards and digital learning tools for immersive lessons.' },
  { icon: FlaskConical, title: 'Lab-Based Learning', desc: 'Hands-on experiments in Physics, Chemistry, Biology, and Computer labs reinforce theoretical concepts.' },
  { icon: Calculator, title: 'Conceptual Maths', desc: 'Our structured Maths programme builds strong fundamentals through problem-solving and real-world application.' },
  { icon: GraduationCap, title: 'Board Excellence Programme', desc: 'Dedicated revision cycles, mock exams, and expert mentoring for Class X & XII board success.' },
];

export default function Academics() {
  return (
    <div className="flex flex-col">

      {/* ── Hero Banner ─────────────────────────────────────── */}
      <section
        className="relative min-h-[65vh] flex items-end overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(120deg, rgba(10,28,70,0.95) 35%, rgba(30,86,160,0.6) 100%), url('/images/academics.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="container mx-auto px-6 py-20 relative z-10">
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}
            className="inline-flex items-center gap-2 bg-[#f5a623]/20 border border-[#f5a623]/40 rounded-full px-4 py-1.5 text-[#f5a623] text-xs font-bold tracking-widest uppercase mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#f5a623]" /> CBSE Curriculum
          </motion.div>
          <motion.h1 variants={fadeUp} initial="hidden" animate="visible" custom={1}
            className="text-5xl md:text-7xl font-serif font-black text-white leading-tight mb-4">
            Academic <span className="text-[#f5a623]">Excellence</span>
          </motion.h1>
          <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={2}
            className="text-white/75 text-lg md:text-xl max-w-2xl leading-relaxed">
            A rigorous CBSE curriculum enriched with modern pedagogy, smart technology, and passionate educators who inspire every learner.
          </motion.p>
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={3} className="mt-8 flex gap-3">
            <div className="h-1 w-20 bg-[#f5a623] rounded-full" />
            <div className="h-1 w-8 bg-white/30 rounded-full" />
          </motion.div>
        </div>
      </section>

      {/* ── Overview Strip ───────────────────────────────────── */}
      <section className="py-14 bg-[#1a3a6b]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { num: 'CBSE', label: 'Board Affiliation' },
              { num: 'KG–XII', label: 'Classes Offered' },
              { num: '100%', label: 'Pass Rate (5 Yrs)' },
              { num: '150+', label: 'Qualified Faculty' },
            ].map((s, i) => (
              <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i * 0.5}>
                <div className="text-3xl md:text-4xl font-serif font-black text-[#f5a623] mb-2">{s.num}</div>
                <div className="text-white/60 text-sm font-semibold uppercase tracking-wider">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Class Structure ──────────────────────────────────── */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
            <p className="text-[#f5a623] font-bold tracking-widest uppercase text-sm mb-3">From Nursery to Class XII</p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#1a3a6b] mb-4">Our Academic Structure</h2>
            <p className="text-gray-500 max-w-xl mx-auto text-lg">Every stage carefully crafted to match a child's developmental needs</p>
          </motion.div>
          <div className="flex flex-col gap-5 max-w-4xl mx-auto">
            {stages.map((s, i) => (
              <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i * 0.5}
                className={`flex items-start gap-6 p-6 rounded-2xl border ${s.color} hover:shadow-lg transition-all duration-300 group`}>
                <div className={`${s.accent} text-white rounded-xl p-3 shrink-0 group-hover:scale-110 transition-transform`}>
                  <GraduationCap size={24} />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-1">
                    <h3 className="text-xl font-serif font-bold text-[#1a3a6b]">{s.label}</h3>
                    <span className="bg-white border border-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full font-semibold">{s.classes}</span>
                    <span className="text-gray-400 text-sm">· Ages {s.age}</span>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{s.desc}</p>
                </div>
                <ChevronRight className="text-gray-300 group-hover:text-[#1a3a6b] transition-colors shrink-0 mt-1" size={20} />
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
          <div className="grid md:grid-cols-3 gap-8">
            {streams.map((stream, i) => (
              <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i * 0.5}
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
            <p className="text-gray-500 max-w-xl mx-auto">Modern methods meeting timeless wisdom</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {methods.map((m, i) => (
              <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i * 0.4}
                className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 flex gap-5 group">
                <div className="w-14 h-14 bg-[#1a3a6b]/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-[#1a3a6b] group-hover:text-white transition-all">
                  <m.icon size={28} className="text-[#1a3a6b] group-hover:text-white transition-colors" />
                </div>
                <div>
                  <h3 className="text-xl font-serif font-bold text-[#1a3a6b] mb-2">{m.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-sm">{m.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Image + CTA ─────────────────────────────────────── */}
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
                Our students have consistently achieved 100% pass rates in CBSE Board Examinations. Many of our Class XII graduates have secured top ranks in JEE, NEET, and prestigious colleges nationwide.
              </p>
              <ul className="space-y-3 mb-10">
                {['100% pass rate in CBSE X & XII (last 5 years)', '15+ students in Top 100 state merit list', 'JEE / NEET qualifiers every year', 'NTSE & Olympiad medal winners'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-700 font-medium">
                    <CheckCircle size={18} className="text-green-500 shrink-0" /> {item}
                  </li>
                ))}
              </ul>
              <Link href="/contact" className="inline-block bg-[#1a3a6b] text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-[#0f2557] transition-all hover:scale-105 shadow-lg">
                Enquire About Admissions
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  );
}
