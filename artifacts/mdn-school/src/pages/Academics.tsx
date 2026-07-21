import { motion } from 'framer-motion';
import { BookOpen, Calculator, FlaskConical, Globe, Palette, Monitor, ChevronRight } from 'lucide-react';
import { Link } from 'wouter';

export default function Academics() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Page Banner */}
      <section 
        className="relative pt-32 pb-24 md:pt-48 md:pb-32 overflow-hidden flex flex-col items-center justify-center text-center"
        style={{ 
          backgroundImage: `linear-gradient(to bottom, rgba(26,58,107,0.85), rgba(26,58,107,0.95)), url('/images/academics.jpg')`, 
          backgroundSize: 'cover', 
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="container relative z-10 px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-serif font-bold text-white mb-6"
          >
            Academics
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center justify-center gap-2 text-white/80 text-sm md:text-base font-medium tracking-wider uppercase"
          >
            <Link href="/" className="hover:text-[#f5a623] transition-colors">Home</Link>
            <ChevronRight size={16} />
            <span className="text-[#f5a623]">Academics</span>
          </motion.div>
        </div>
      </section>

      {/* Curriculum Overview */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#1a3a6b] mb-8">CBSE Affiliated Curriculum</h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-10">
              Our academic program strictly adheres to the guidelines set by the Central Board of Secondary Education (CBSE), New Delhi. We seamlessly blend traditional teaching methodologies with modern, experiential learning techniques to ensure holistic academic development for every child.
            </p>
            <div className="inline-block bg-[#1a3a6b] text-[#f5a623] px-8 py-4 rounded-full font-bold text-sm tracking-[0.2em] uppercase shadow-lg">
              Affiliation No: XXXXXX
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 1.05 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            className="mt-20 rounded-[2.5rem] overflow-hidden shadow-2xl relative group"
          >
            <img src="/images/academics.jpg" alt="Smart Classroom" className="w-full h-auto object-cover max-h-[600px] group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-8 md:p-12">
              <h3 className="text-white text-3xl md:text-4xl font-serif font-bold text-left drop-shadow-md">Technology-Integrated Smart Learning</h3>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Class Structure */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#1a3a6b] mb-6">Academic Structure</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">A carefully designed developmental approach to education, from early years to senior secondary.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { stage: "Pre-Primary", classes: "Nursery to UKG", focus: "Play-way method, motor skills development, basic numeracy and literacy.", color: "border-t-pink-500", text: "text-pink-600", bg: "bg-pink-50" },
              { stage: "Primary", classes: "Class 1 to 5", focus: "Foundation building, interactive learning, environmental awareness.", color: "border-t-[#f5a623]", text: "text-[#d98c14]", bg: "bg-amber-50" },
              { stage: "Middle", classes: "Class 6 to 8", focus: "Exploratory learning, critical thinking, introduction to varied subjects.", color: "border-t-green-500", text: "text-green-600", bg: "bg-green-50" },
              { stage: "Secondary", classes: "Class 9 to 12", focus: "Board exam preparation, career counseling, specialized streams.", color: "border-t-[#1a3a6b]", text: "text-[#1a3a6b]", bg: "bg-blue-50" },
            ].map((structure, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: i * 0.1 }}
                className={`bg-white rounded-3xl p-8 shadow-md border-t-[6px] ${structure.color} hover:shadow-2xl transition-all duration-300 hover:-translate-y-2`}
              >
                <h3 className="text-3xl font-serif font-bold text-[#1a3a6b] mb-4">{structure.stage}</h3>
                <div className={`text-sm font-bold ${structure.text} ${structure.bg} inline-block px-4 py-2 rounded-full mb-6 uppercase tracking-wider`}>
                  {structure.classes}
                </div>
                <p className="text-gray-600 text-base leading-relaxed">{structure.focus}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Senior Secondary Streams */}
      <section className="py-24 bg-[#1a3a6b] text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-white">Senior Secondary Streams</h2>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">Specialized pathways for Classes 11 & 12 to prepare students for higher education and future careers.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Science */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              className="bg-white/10 border border-white/20 rounded-[2.5rem] p-10 backdrop-blur-sm hover:bg-white/15 transition-colors"
            >
              <div className="w-16 h-16 rounded-2xl bg-blue-400/20 text-blue-300 flex items-center justify-center mb-8">
                <FlaskConical size={32} />
              </div>
              <h3 className="text-3xl font-serif font-bold mb-8">Science</h3>
              <ul className="space-y-4 mb-8 text-white/90 text-lg">
                <li className="flex items-center gap-3"><ChevronRight size={20} className="text-blue-300" /> Physics</li>
                <li className="flex items-center gap-3"><ChevronRight size={20} className="text-blue-300" /> Chemistry</li>
                <li className="flex items-center gap-3"><ChevronRight size={20} className="text-blue-300" /> Mathematics / Biology</li>
                <li className="flex items-center gap-3"><ChevronRight size={20} className="text-blue-300" /> English Core</li>
                <li className="flex items-center gap-3"><ChevronRight size={20} className="text-blue-300" /> Optional Subject</li>
              </ul>
            </motion.div>

            {/* Commerce */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: 0.1 }}
              className="bg-[#f5a623] text-[#1a3a6b] rounded-[2.5rem] p-10 shadow-2xl relative transform md:-translate-y-6 border-4 border-[#1a3a6b]"
            >
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-[#1a3a6b] text-white text-sm font-bold px-6 py-2 rounded-full uppercase tracking-widest shadow-lg border-2 border-[#f5a623]">
                Most Popular
              </div>
              <div className="w-16 h-16 rounded-2xl bg-[#1a3a6b]/10 text-[#1a3a6b] flex items-center justify-center mb-8">
                <Calculator size={32} />
              </div>
              <h3 className="text-3xl font-serif font-bold mb-8">Commerce</h3>
              <ul className="space-y-4 mb-8 text-[#1a3a6b]/90 text-lg font-medium">
                <li className="flex items-center gap-3"><ChevronRight size={20} className="text-[#1a3a6b]" /> Accountancy</li>
                <li className="flex items-center gap-3"><ChevronRight size={20} className="text-[#1a3a6b]" /> Business Studies</li>
                <li className="flex items-center gap-3"><ChevronRight size={20} className="text-[#1a3a6b]" /> Economics</li>
                <li className="flex items-center gap-3"><ChevronRight size={20} className="text-[#1a3a6b]" /> English Core</li>
                <li className="flex items-center gap-3"><ChevronRight size={20} className="text-[#1a3a6b]" /> Mathematics / IP</li>
              </ul>
            </motion.div>

            {/* Humanities */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: 0.2 }}
              className="bg-white/10 border border-white/20 rounded-[2.5rem] p-10 backdrop-blur-sm hover:bg-white/15 transition-colors"
            >
              <div className="w-16 h-16 rounded-2xl bg-pink-400/20 text-pink-300 flex items-center justify-center mb-8">
                <Globe size={32} />
              </div>
              <h3 className="text-3xl font-serif font-bold mb-8">Humanities</h3>
              <ul className="space-y-4 mb-8 text-white/90 text-lg">
                <li className="flex items-center gap-3"><ChevronRight size={20} className="text-pink-300" /> History</li>
                <li className="flex items-center gap-3"><ChevronRight size={20} className="text-pink-300" /> Political Science</li>
                <li className="flex items-center gap-3"><ChevronRight size={20} className="text-pink-300" /> Geography</li>
                <li className="flex items-center gap-3"><ChevronRight size={20} className="text-pink-300" /> English Core</li>
                <li className="flex items-center gap-3"><ChevronRight size={20} className="text-pink-300" /> Optional Subject</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#1a3a6b] mb-16">Our Teaching Methodology</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-12">
              {[
                { icon: BookOpen, title: "Conceptual Clarity", desc: "Focus on deep understanding rather than rote memorization." },
                { icon: Monitor, title: "Tech-Integrated", desc: "Smart boards and digital learning resources in every classroom." },
                { icon: Palette, title: "Experiential", desc: "Learning by doing through practical projects and activities." },
                { icon: Globe, title: "Global Outlook", desc: "Connecting local curriculum to broader global contexts." }
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center group">
                  <div className="w-24 h-24 rounded-3xl bg-gray-50 flex items-center justify-center text-[#1a3a6b] mb-6 border border-gray-100 group-hover:bg-[#1a3a6b] group-hover:text-[#f5a623] transition-all duration-300 shadow-sm group-hover:shadow-xl group-hover:-translate-y-2">
                    <item.icon size={40} />
                  </div>
                  <h4 className="text-xl font-bold text-[#1a3a6b] mb-3">{item.title}</h4>
                  <p className="text-base text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
