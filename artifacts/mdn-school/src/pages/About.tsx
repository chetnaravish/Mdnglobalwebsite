import { motion } from 'framer-motion';
import { Award, BookOpen, Heart, Star, Users, Target, Eye, Lightbulb, Shield } from 'lucide-react';
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

export default function About() {
  return (
    <div className="flex flex-col">

      {/* ── Hero Banner ─────────────────────────────────────── */}
      <section
        className="relative min-h-[60vh] flex items-end overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(10,28,70,0.92) 40%, rgba(10,28,70,0.55) 100%), url('/images/about-school.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0a1c46]/80" />
        <div className="container mx-auto px-6 py-20 relative z-10">
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}
            className="inline-flex items-center gap-2 bg-[#f5a623]/20 border border-[#f5a623]/40 rounded-full px-4 py-1.5 text-[#f5a623] text-xs font-bold tracking-widest uppercase mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#f5a623]" /> Our Story
          </motion.div>
          <motion.h1 variants={fadeUp} initial="hidden" animate="visible" custom={1}
            className="text-5xl md:text-7xl font-serif font-black text-white leading-tight mb-4">
            About <span className="text-[#f5a623]">MDN Global</span>
          </motion.h1>
          <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={2}
            className="text-white/75 text-lg md:text-xl max-w-2xl leading-relaxed">
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
                Founded in the year 2000, MDN Global School Kaithal began with a simple yet powerful vision: to provide world-class education rooted in Indian values to the children of Haryana.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                Today, with over 2,000 students and 150+ dedicated faculty members, we stand as one of the most trusted CBSE-affiliated schools in the region — a beacon of academic excellence and holistic development.
              </p>
              <div className="grid grid-cols-3 gap-6 p-6 bg-[#f8f9ff] rounded-2xl">
                {[
                  { num: '25+', label: 'Years of Trust' },
                  { num: '2000+', label: 'Alumni Worldwide' },
                  { num: '100%', label: 'Board Results' },
                ].map((s, i) => (
                  <div key={i} className="text-center">
                    <div className="text-3xl font-serif font-black text-[#1a3a6b] mb-1">{s.num}</div>
                    <div className="text-xs text-gray-500 font-semibold uppercase tracking-wide">{s.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={fadeRight} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}
              className="relative">
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

      {/* ── Vision & Mission ─────────────────────────────────── */}
      <section className="py-24 bg-gradient-to-br from-[#0f2557] to-[#1a3a6b] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '48px 48px' }} />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">Vision & Mission</h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">The guiding principles that shape every decision we make</p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: Eye,
                title: 'Our Vision',
                color: 'bg-[#f5a623]',
                text: 'To be a globally recognised institution that empowers every student with the knowledge, skills, and values needed to lead with integrity and contribute meaningfully to society.',
                items: ['Global Academic Standards', 'Character-Led Leadership', 'Inclusive Learning Environment']
              },
              {
                icon: Target,
                title: 'Our Mission',
                color: 'bg-white',
                textColor: 'text-[#1a3a6b]',
                text: 'To deliver exceptional CBSE education through innovative pedagogy, experienced faculty, and world-class infrastructure — nurturing curious, compassionate, and confident learners.',
                items: ['Holistic Child Development', 'Academic & Co-curricular Balance', 'Community & Value Education']
              }
            ].map((card, i) => (
              <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-10 hover:bg-white/15 transition-all duration-300">
                <div className={`w-14 h-14 ${card.color} rounded-2xl flex items-center justify-center mb-6`}>
                  <card.icon size={28} className={card.textColor || 'text-[#1a3a6b]'} />
                </div>
                <h3 className="text-2xl font-serif font-bold text-white mb-4">{card.title}</h3>
                <p className="text-white/70 leading-relaxed mb-6">{card.text}</p>
                <ul className="space-y-2">
                  {card.items.map((item, j) => (
                    <li key={j} className="flex items-center gap-3 text-white/80 text-sm font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#f5a623] shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Core Values ─────────────────────────────────────── */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
            <p className="text-[#f5a623] font-bold tracking-widest uppercase text-sm mb-3">What We Stand For</p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#1a3a6b] mb-4">Our Core Values</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Principles that define our culture and guide our community every single day</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: BookOpen, title: 'Academic Excellence', desc: 'We set high standards and provide every resource students need to achieve them.', color: 'bg-blue-50 text-blue-700', border: 'border-blue-100' },
              { icon: Heart, title: 'Compassion & Care', desc: 'Every child is valued. We build empathy and kindness from the classroom outward.', color: 'bg-red-50 text-red-600', border: 'border-red-100' },
              { icon: Shield, title: 'Integrity & Ethics', desc: 'Honesty, transparency, and moral courage are non-negotiable in our community.', color: 'bg-green-50 text-green-700', border: 'border-green-100' },
              { icon: Lightbulb, title: 'Innovation', desc: 'We encourage curiosity and creative thinking across all subjects and activities.', color: 'bg-amber-50 text-amber-700', border: 'border-amber-100' },
              { icon: Users, title: 'Teamwork & Inclusion', desc: "Diverse backgrounds make us stronger. We celebrate every student's unique identity.", color: 'bg-purple-50 text-purple-700', border: 'border-purple-100' },
              { icon: Star, title: 'Striving for Greatness', desc: 'We inspire students to aim beyond the ordinary in academics, sports, and life.', color: 'bg-teal-50 text-teal-700', border: 'border-teal-100' },
            ].map((v, i) => (
              <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i * 0.5}
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
                <div className="text-gray-500 text-xs mt-1">M.Ed | Ph.D. in Education | 20+ Years Experience</div>
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
              <p className="text-gray-600 leading-relaxed mb-8">
                We are committed to providing an environment where academic rigour meets creative freedom, where tradition meets innovation, and where every student is seen, heard, and celebrated for who they truly are. Together, we build the leaders of tomorrow.
              </p>
              <div className="border-l-4 border-[#f5a623] pl-6 bg-[#fffbf0] py-4 pr-4 rounded-r-xl">
                <p className="text-[#1a3a6b] font-bold italic">"Our goal: every student leaves MDN not just educated — but transformed."</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ──────────────────────────────────────── */}
      <section className="py-20 bg-[#f5a623]">
        <div className="container mx-auto px-6 text-center">
          <motion.h2 variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif font-black text-[#1a3a6b] mb-4">
            Ready to Be Part of Our Story?
          </motion.h2>
          <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1}
            className="text-[#1a3a6b]/75 text-lg mb-8 max-w-xl mx-auto">
            Admissions are open for the 2025–26 academic session. Take the first step today.
          </motion.p>
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="bg-[#1a3a6b] text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-[#0f2557] transition-all hover:scale-105 shadow-xl">
              Apply Now
            </Link>
            <Link href="/academics" className="bg-white/20 text-[#1a3a6b] border-2 border-[#1a3a6b]/30 px-10 py-4 rounded-full font-bold text-lg hover:bg-white/40 transition-all">
              Explore Academics
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
