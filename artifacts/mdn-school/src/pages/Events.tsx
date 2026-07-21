import { motion } from 'framer-motion';
import { Calendar, Trophy, Music, Globe, Microscope, Star, ArrowRight, Clock } from 'lucide-react';
import { Link } from 'wouter';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } })
};

const upcomingEvents = [
  { month: 'AUG', date: '15', title: 'Independence Day Celebration', type: 'National Event', color: 'border-l-orange-400 bg-orange-50', badge: 'bg-orange-100 text-orange-700', time: '8:00 AM', venue: 'Main Ground' },
  { month: 'SEP', date: '5', title: 'Teachers\' Day Special Programme', type: 'School Event', color: 'border-l-blue-400 bg-blue-50', badge: 'bg-blue-100 text-blue-700', time: '10:00 AM', venue: 'Auditorium' },
  { month: 'OCT', date: '2', title: 'Gandhi Jayanti & Swachh Bharat', type: 'National Event', color: 'border-l-green-400 bg-green-50', badge: 'bg-green-100 text-green-700', time: '9:00 AM', venue: 'School Campus' },
  { month: 'NOV', date: '14', title: 'Children\'s Day Grand Celebration', type: 'Cultural', color: 'border-l-purple-400 bg-purple-50', badge: 'bg-purple-100 text-purple-700', time: '9:30 AM', venue: 'Open Amphitheatre' },
  { month: 'DEC', date: '25', title: 'Annual Prize Distribution & Graduation', type: 'Annual Event', color: 'border-l-amber-400 bg-amber-50', badge: 'bg-amber-100 text-amber-700', time: '11:00 AM', venue: 'Main Auditorium' },
  { month: 'JAN', date: '26', title: 'Republic Day Parade & Cultural Show', type: 'National Event', color: 'border-l-red-400 bg-red-50', badge: 'bg-red-100 text-red-700', time: '8:00 AM', venue: 'Main Ground' },
];

const annualHighlights = [
  {
    icon: Star,
    title: 'Annual Sports Meet',
    desc: 'A 3-day extravaganza of athletics, team sports, and fitness events with district-level competitions and medal ceremonies.',
    image: '/images/facilities-sports.jpg',
    color: 'from-green-700 to-green-900',
  },
  {
    icon: Music,
    title: 'Cultural Fest — Utsav',
    desc: 'Our flagship cultural festival featuring classical dance, music performances, drama, art exhibitions, and inter-school competitions.',
    image: '/images/events-annual.jpg',
    color: 'from-purple-700 to-purple-900',
  },
  {
    icon: Microscope,
    title: 'Science Exhibition',
    desc: 'Students showcase innovative projects, working models, and research across Physics, Chemistry, Biology, and Technology.',
    image: '/images/facilities-lab.jpg',
    color: 'from-blue-700 to-blue-900',
  },
  {
    icon: Globe,
    title: 'MDN Debate Championship',
    desc: 'An annual inter-school debate tournament that hones critical thinking, public speaking, and argumentation skills.',
    image: '/images/about-school.jpg',
    color: 'from-amber-700 to-amber-900',
  },
  {
    icon: Trophy,
    title: 'Inter-School Sports',
    desc: 'We host and participate in district and state-level sports tournaments across cricket, football, badminton, and athletics.',
    image: '/images/events-sports.jpg',
    color: 'from-rose-700 to-rose-900',
  },
  {
    icon: Calendar,
    title: 'Annual Day & Prize Distribution',
    desc: 'A grand celebration of student achievements with cultural performances, chief guest felicitation, and award ceremonies.',
    image: '/images/students-happy.jpg',
    color: 'from-teal-700 to-teal-900',
  },
];

export default function Events() {
  return (
    <div className="flex flex-col">

      {/* ── Hero Banner ─────────────────────────────────────── */}
      <section className="relative min-h-[75vh] flex items-center overflow-hidden">
        <img
          src="/images/events-annual.jpg"
          alt="Events at MDN Global School"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1c46]/88 via-[#0a1c46]/55 to-[#500050]/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1c46]/65 via-transparent to-transparent" />

        <div className="container mx-auto px-6 py-24 relative z-10">
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}
            className="inline-flex items-center gap-2 bg-[#f5a623]/20 border border-[#f5a623]/40 rounded-full px-4 py-1.5 text-[#f5a623] text-xs font-bold tracking-widest uppercase mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#f5a623]" /> School Calendar 2024–25
          </motion.div>
          <motion.h1 variants={fadeUp} initial="hidden" animate="visible" custom={1}
            className="text-5xl md:text-7xl font-serif font-black text-white leading-tight mb-5"
            style={{ textShadow: '0 4px 24px rgba(0,0,0,0.5)' }}>
            Events & <span className="text-[#f5a623]">Culture</span>
          </motion.h1>
          <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={2}
            className="text-white/90 text-lg md:text-xl max-w-2xl leading-relaxed">
            A vibrant calendar of cultural festivals, sports competitions, academic fairs, and national celebrations that make MDN Global School truly alive.
          </motion.p>
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={3} className="mt-8 flex gap-3">
            <div className="h-1 w-20 bg-[#f5a623] rounded-full" />
            <div className="h-1 w-8 bg-white/30 rounded-full" />
          </motion.div>
        </div>
      </section>

      {/* ── Upcoming Events ──────────────────────────────────── */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-16">
            <p className="text-[#f5a623] font-bold tracking-widest uppercase text-sm flex items-center gap-3 mb-3">
              <span className="w-10 h-px bg-[#f5a623]" /> Mark Your Calendar
            </p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#1a3a6b] mb-3">Upcoming Events</h2>
            <p className="text-gray-500 text-lg">Key dates for the academic year 2024–25</p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-5 max-w-5xl">
            {upcomingEvents.map((event, i) => (
              <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} custom={i % 2 * 0.2}
                className={`flex items-start gap-5 p-6 rounded-2xl border-l-4 ${event.color} hover:shadow-lg transition-all duration-300 group`}>
                <div className="text-center shrink-0 w-14">
                  <div className="text-xs font-black text-gray-400 uppercase tracking-wider">{event.month}</div>
                  <div className="text-3xl font-serif font-black text-[#1a3a6b]">{event.date}</div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${event.badge}`}>{event.type}</span>
                  </div>
                  <h3 className="font-serif font-bold text-[#1a3a6b] text-lg leading-tight mb-2">{event.title}</h3>
                  <div className="flex items-center gap-4 text-gray-400 text-xs font-medium">
                    <span className="flex items-center gap-1"><Clock size={11} /> {event.time}</span>
                    <span>📍 {event.venue}</span>
                  </div>
                </div>
                <ArrowRight className="text-gray-300 group-hover:text-[#1a3a6b] shrink-0 mt-1 transition-colors" size={18} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Annual Highlights Grid ───────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-16">
            <p className="text-[#f5a623] font-bold tracking-widest uppercase text-sm mb-3">Year-Round Activity</p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#1a3a6b] mb-4">Annual Highlights</h2>
            <p className="text-gray-500 max-w-xl mx-auto text-lg">The signature events that define the MDN Global School experience</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {annualHighlights.map((event, i) => (
              <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} custom={i % 3 * 0.2}
                className="rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-400 hover:-translate-y-2 group border border-gray-100">
                <div className="relative h-52 overflow-hidden">
                  <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className={`absolute inset-0 bg-gradient-to-t ${event.color} opacity-70`} />
                  <div className="absolute bottom-4 left-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-white">
                    <event.icon size={20} />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-serif font-bold text-[#1a3a6b] mb-3">{event.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{event.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Photo Gallery Teaser ─────────────────────────────── */}
      <section className="py-24 bg-gradient-to-br from-[#0f2557] to-[#1a3a6b]">
        <div className="container mx-auto px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-12">
            <p className="text-[#f5a623] font-bold tracking-widest uppercase text-sm mb-3">Memories</p>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">Moments at MDN</h2>
            <p className="text-white/60 max-w-xl mx-auto">Glimpses of the vibrant life inside our campus</p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['/images/events-annual.jpg', '/images/facilities-sports.jpg', '/images/facilities-lab.jpg', '/images/events-sports.jpg',
              '/images/students-happy.jpg', '/images/about-school.jpg', '/images/academics.jpg', '/images/facilities-library.jpg'
            ].map((img, i) => (
              <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} custom={i * 0.1}
                className={`rounded-2xl overflow-hidden shadow-lg ${i === 0 || i === 5 ? 'row-span-1 col-span-1' : ''} group aspect-square`}>
                <img src={img} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 brightness-90 hover:brightness-110" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────── */}
      <section className="py-20 bg-[#f5a623] text-center">
        <div className="container mx-auto px-6">
          <motion.h2 variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif font-black text-[#1a3a6b] mb-4">
            Be Part of the MDN Family
          </motion.h2>
          <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1}
            className="text-[#1a3a6b]/75 text-lg mb-8 max-w-xl mx-auto">
            Join our vibrant community and give your child the school experience they deserve.
          </motion.p>
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="bg-[#1a3a6b] text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-[#0f2557] transition-all hover:scale-105 shadow-xl">
              Enquire Now
            </Link>
            <Link href="/about" className="bg-white/30 border-2 border-[#1a3a6b]/30 text-[#1a3a6b] px-10 py-4 rounded-full font-bold text-lg hover:bg-white/50 transition-all">
              Know More
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
