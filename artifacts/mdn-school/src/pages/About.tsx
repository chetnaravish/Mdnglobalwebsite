import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Award, BookOpen, Heart, Star, Users, Target, Eye, Lightbulb, Shield, CheckCircle } from 'lucide-react';
import { Link } from 'wouter';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } })
};
const fadeLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } }
};
const fadeRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } }
};

/* ── Milestone Timeline ─────────────────────────────────── */
const milestones = [
  {
    year: '2000',
    title: 'School Founded',
    desc: 'MDN Global School opened its doors in Kaithal, Haryana, with 120 students and 15 dedicated teachers. Built on the belief that every child deserves quality education, the school quickly earned the trust of families across the region.',
  },
  {
    year: '2004',
    title: 'CBSE Affiliation Granted',
    desc: 'After meeting rigorous national standards set by the Central Board of Secondary Education, MDN Global School received its official CBSE affiliation — a landmark achievement marking our commitment to structured, nationally recognised education.',
  },
  {
    year: '2008',
    title: 'State-Level Academic Honours',
    desc: 'MDN students began winning awards at state-level Science Olympiad, Mathematics Olympiad, and inter-school debate competitions, putting the school firmly on Haryana\'s academic map and inspiring a culture of excellence.',
  },
  {
    year: '2012',
    title: 'Modern Campus Inaugurated',
    desc: 'A transformative expansion: a new multi-storey campus with 40+ classrooms, fully equipped Physics, Chemistry and Biology labs, a 15,000-book library, a computer lab with 100 workstations, and sports facilities across 10 acres of green grounds.',
  },
  {
    year: '2015',
    title: 'Senior Secondary (XI–XII) Launched',
    desc: 'Class XI and XII introduced with three well-structured streams — Science, Commerce, and Humanities. For the first time, students in Kaithal could complete their entire schooling journey at a single institution without relocating.',
  },
  {
    year: '2018',
    title: 'Smart Classroom Initiative',
    desc: 'Every classroom upgraded with interactive digital boards, HD projectors, and high-speed Wi-Fi under our Smart Campus Initiative — fully embracing 21st-century pedagogy and technology-integrated learning for all students from Nursery to Class XII.',
  },
  {
    year: '2024',
    title: '25 Years of Excellence',
    desc: 'Celebrating 25 years of shaping young minds, MDN Global School proudly serves 2,000+ students with 150+ qualified faculty members, a consistent 100% board pass rate, and thousands of alumni contributing to society across India and abroad.',
  },
];

/* ── Vision & Mission card ─────────────────────────────── */
function VisionMissionCard({ delay, icon: Icon, iconBg, badge, title, text, items, reverse }: {
  delay: number; icon: React.ElementType; iconBg: string; badge: string; title: string; text: string;
  items: string[]; reverse?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, x: reverse ? 60 : -60, scale: 0.96 }}
      animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className="relative bg-white/12 backdrop-blur-md border border-white/20 rounded-3xl p-10 hover:bg-white/18 transition-all duration-400 group overflow-hidden"
    >
      {/* Glowing corner */}
      <div className={`absolute -top-16 ${reverse ? '-right-16' : '-left-16'} w-48 h-48 rounded-full blur-3xl opacity-20 ${iconBg} pointer-events-none`} />

      <div className="relative z-10">
        {/* Badge */}
        <div className="flex items-center gap-3 mb-7">
          <div className={`w-14 h-14 ${iconBg} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
            <Icon size={28} className="text-[#1a3a6b]" />
          </div>
          <span className="text-xs font-black tracking-[0.2em] uppercase text-[#f5a623] bg-[#f5a623]/15 px-3 py-1.5 rounded-full border border-[#f5a623]/30">
            {badge}
          </span>
        </div>

        <h3 className="text-3xl font-serif font-black text-white mb-5">{title}</h3>
        <p className="text-white/75 leading-relaxed mb-7 text-base">{text}</p>

        {/* Items */}
        <ul className="space-y-3">
          {items.map((item, j) => (
            <motion.li key={j}
              initial={{ opacity: 0, x: -12 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: delay + 0.2 + j * 0.08 }}
              className="flex items-center gap-3 text-white/85 text-sm font-medium"
            >
              <CheckCircle size={15} className="text-[#f5a623] shrink-0" /> {item}
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export default function About() {
  return (
    <div className="flex flex-col">

      {/* ── Hero Banner ─────────────────────────────────────── */}
      <section className="relative min-h-[75vh] flex items-center overflow-hidden">
        <img src="/images/about-school.jpg" alt="MDN Global School Campus"
          className="absolute inset-0 w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1c46]/62 via-[#0a1c46]/38 to-[#0a1c46]/12" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1c46]/50 via-transparent to-transparent" />

        <div className="container mx-auto px-6 py-24 relative z-10">
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}
            className="inline-flex items-center gap-2 bg-[#f5a623]/20 border border-[#f5a623]/40 rounded-full px-4 py-1.5 text-[#f5a623] text-xs font-bold tracking-widest uppercase mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#f5a623]" /> Our Story
          </motion.div>
          <motion.h1 variants={fadeUp} initial="hidden" animate="visible" custom={1}
            className="text-5xl md:text-7xl font-serif font-black text-white leading-tight mb-5"
            style={{ textShadow: '0 4px 24px rgba(0,0,0,0.5)' }}>
            About <span className="text-[#f5a623]">MDN Global</span>
          </motion.h1>
          <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={2}
            className="text-white/90 text-lg md:text-xl max-w-2xl leading-relaxed">
            Over two decades of nurturing young minds, building character, and creating future leaders in the heart of Haryana.
          </motion.p>
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={3} className="mt-8 flex gap-3">
            <div className="h-1 w-20 bg-[#f5a623] rounded-full" />
            <div className="h-1 w-8 bg-white/30 rounded-full" />
            <div className="h-1 w-4 bg-white/20 rounded-full" />
          </motion.div>
        </div>
      </section>

      {/* ── Our Journey ─────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div variants={fadeLeft} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
              <p className="text-[#f5a623] font-bold tracking-widest uppercase text-sm flex items-center gap-3 mb-4">
                <span className="w-10 h-px bg-[#f5a623]" /> Est. 2000
              </p>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#1a3a6b] mb-6 leading-tight">
                Two Decades of<br />Excellence & Legacy
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-5">
                Founded in 2000, MDN Global School Kaithal began with a clear purpose: to deliver world-class, values-rooted education to the children of Haryana. What started as a modest institution has grown into a landmark of academic excellence.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                Today, with over 2,000 students and 150+ dedicated faculty members, we are one of the most trusted CBSE-affiliated schools in the region — recognised for academic rigour, holistic development, and a community that cares.
              </p>
              <div className="grid grid-cols-3 gap-6 p-6 bg-[#f8f9ff] rounded-2xl">
                {[
                  { num: '25+', label: 'Years of Trust' },
                  { num: '2000+', label: 'Students Enrolled' },
                  { num: '100%', label: 'Board Results' },
                ].map((s, i) => (
                  <div key={i} className="text-center">
                    <div className="text-3xl font-serif font-black text-[#1a3a6b] mb-1">{s.num}</div>
                    <div className="text-xs text-gray-500 font-semibold uppercase tracking-wide">{s.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={fadeRight} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl aspect-[4/5]">
                <img src="/images/about-school.jpg" alt="MDN Global School Campus" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-[#1a3a6b] text-white rounded-2xl p-6 shadow-xl max-w-[220px]">
                <Award className="text-[#f5a623] mb-2" size={32} />
                <div className="text-2xl font-serif font-bold mb-1">CBSE</div>
                <div className="text-white/70 text-sm">Affiliated & Recognised</div>
              </div>
              <div className="absolute -top-5 -right-5 bg-[#f5a623] text-[#1a3a6b] rounded-2xl p-5 shadow-xl">
                <div className="text-3xl font-serif font-black">A+</div>
                <div className="text-xs font-bold uppercase">School Grade</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Timeline ─────────────────────────────────────────── */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
            <p className="text-[#f5a623] font-bold tracking-widest uppercase text-sm mb-3">Our Journey</p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#1a3a6b] mb-4">Key Milestones</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Two decades of growth, one milestone at a time</p>
          </motion.div>
          <div className="relative max-w-3xl mx-auto">
            {/* Vertical line */}
            <div className="absolute left-[50%] top-0 bottom-0 w-px bg-gradient-to-b from-[#1a3a6b]/30 via-[#f5a623] to-[#1a3a6b]/30 hidden md:block" />
            <div className="flex flex-col gap-8">
              {milestones.map((m, i) => (
                <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i * 0.1}
                  className={`flex items-center gap-6 md:gap-0 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  {/* Content */}
                  <div className={`flex-1 ${i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                    <div className={`bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 ${i % 2 === 0 ? 'md:ml-auto' : ''}`}>
                      <span className="text-[#f5a623] font-black text-xl font-serif">{m.year}</span>
                      <h3 className="text-lg font-serif font-bold text-[#1a3a6b] mt-1 mb-2">{m.title}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed">{m.desc}</p>
                    </div>
                  </div>
                  {/* Dot */}
                  <div className="shrink-0 hidden md:flex w-5 h-5 rounded-full bg-[#f5a623] border-4 border-white shadow-lg z-10" />
                  {/* Empty spacer */}
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Vision & Mission — Enhanced ──────────────────────── */}
      <section className="py-28 bg-gradient-to-br from-[#0a1635] via-[#0f2557] to-[#1a3a6b] relative overflow-hidden">
        {/* Animated dots grid */}
        <div className="absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        {/* Glowing blobs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-[120px] opacity-15 bg-blue-400 pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full blur-[100px] opacity-10 bg-[#f5a623] pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-[#f5a623]/15 border border-[#f5a623]/30 rounded-full px-5 py-2 text-[#f5a623] text-xs font-bold tracking-widest uppercase mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#f5a623] animate-pulse" /> Guiding Principles
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">Vision & Mission</h2>
            <p className="text-white/55 text-lg max-w-xl mx-auto">The beliefs that shape every decision we make and every life we touch</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <VisionMissionCard
              delay={0.1}
              icon={Eye}
              iconBg="bg-[#f5a623]"
              badge="Our Vision"
              title="See the Future We're Building"
              text="To be a globally recognised institution that empowers every student with the knowledge, skills, and values to lead with integrity and contribute meaningfully to society."
              items={[
                'Global academic standards, local roots',
                'Character-led leadership in every child',
                'An inclusive environment where all belong',
                'Lifelong learners who think critically'
              ]}
            />
            <VisionMissionCard
              delay={0.25}
              icon={Target}
              iconBg="bg-white"
              badge="Our Mission"
              title="How We Deliver Every Day"
              text="To deliver exceptional CBSE education through innovative pedagogy, experienced faculty, and world-class infrastructure — nurturing curious, compassionate, and confident learners."
              items={[
                'Holistic child development at every stage',
                'Balance of academics and co-curricular',
                'Community values and ethical grounding',
                'Personalised attention and mentoring'
              ]}
              reverse
            />
          </div>

          {/* Animated stats row */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {[
              { num: '25+', label: 'Years of Trust' },
              { num: '150+', label: 'Expert Faculty' },
              { num: '2000+', label: 'Happy Students' },
              { num: '100%', label: 'Board Results' },
            ].map((s, i) => (
              <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i * 0.1}
                className="text-center p-5 bg-white/08 rounded-2xl border border-white/10">
                <div className="text-3xl font-serif font-black text-[#f5a623] mb-1">{s.num}</div>
                <div className="text-white/55 text-xs font-semibold uppercase tracking-widest">{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Core Values ─────────────────────────────────────── */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
            <p className="text-[#f5a623] font-bold tracking-widest uppercase text-sm mb-3">What We Stand For</p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#1a3a6b] mb-4">Our Core Values</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Principles that define our culture and guide every student, teacher, and decision at MDN</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: BookOpen, title: 'Academic Excellence', desc: 'We set high standards and provide every resource students need to surpass them — day after day.', color: 'bg-blue-50 text-blue-700', border: 'border-blue-100' },
              { icon: Heart, title: 'Compassion & Care', desc: 'Every child is valued. We build empathy and kindness in the classroom and beyond.', color: 'bg-red-50 text-red-600', border: 'border-red-100' },
              { icon: Shield, title: 'Integrity & Ethics', desc: 'Honesty, transparency, and moral courage are non-negotiable in everything we do.', color: 'bg-green-50 text-green-700', border: 'border-green-100' },
              { icon: Lightbulb, title: 'Innovation', desc: 'We encourage curiosity and creative thinking across all subjects, all ages, all activities.', color: 'bg-amber-50 text-amber-700', border: 'border-amber-100' },
              { icon: Users, title: 'Teamwork & Inclusion', desc: 'Diverse backgrounds make us stronger. Every student\'s identity is celebrated here.', color: 'bg-purple-50 text-purple-700', border: 'border-purple-100' },
              { icon: Star, title: 'Pursuit of Greatness', desc: 'We inspire students to reach beyond the ordinary — in academics, sport, and life.', color: 'bg-teal-50 text-teal-700', border: 'border-teal-100' },
            ].map((v, i) => (
              <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i * 0.1}
                className={`rounded-2xl p-8 border ${v.border} bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group`}>
                <div className={`w-14 h-14 rounded-xl ${v.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                  <v.icon size={28} />
                </div>
                <h3 className="text-xl font-serif font-bold text-[#1a3a6b] mb-3">{v.title}</h3>
                <p className="text-gray-500 leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Principal's Message ──────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div variants={fadeLeft} initial="hidden" whileInView="visible" viewport={{ once: true }} className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl aspect-[3/4]">
                <img src="/images/principal.jpg" alt="Principal" className="w-full h-full object-cover object-top" />
              </div>
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur rounded-2xl p-5 shadow-lg">
                <div className="font-serif font-bold text-[#1a3a6b] text-lg">Dr. Rajesh Kumar</div>
                <div className="text-[#f5a623] text-sm font-semibold">Principal, MDN Global School</div>
                <div className="text-gray-500 text-xs mt-1">M.Ed · Ph.D. in Education · 20+ Years Experience</div>
              </div>
            </motion.div>
            <motion.div variants={fadeRight} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <p className="text-[#f5a623] font-bold tracking-widest uppercase text-sm flex items-center gap-3 mb-4">
                <span className="w-10 h-px bg-[#f5a623]" /> Principal's Desk
              </p>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#1a3a6b] mb-6 leading-tight">
                A Message from<br />Our Principal
              </h2>
              <div className="text-5xl font-serif text-[#f5a623] leading-none mb-4">"</div>
              <p className="text-gray-700 text-lg leading-relaxed mb-5 italic">
                Education is not the filling of a pail, but the lighting of a fire. At MDN Global School, we don't just teach — we inspire, guide, and ignite the potential within every child who walks through our gates.
              </p>
              <p className="text-gray-600 leading-relaxed mb-5">
                We are committed to an environment where academic rigour meets creative freedom, where tradition meets innovation, and where every student is seen, heard, and celebrated for who they truly are.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                Our teachers are not just instructors; they are mentors, role models, and lifelong supporters of every child's journey. Together, we build the leaders, thinkers, and changemakers of tomorrow.
              </p>
              <div className="border-l-4 border-[#f5a623] pl-6 bg-[#fffbf0] py-4 pr-4 rounded-r-xl">
                <p className="text-[#1a3a6b] font-bold italic">"Our goal is simple: every student leaves MDN not just educated — but transformed."</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>


    </div>
  );
}
