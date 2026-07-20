import { motion } from 'framer-motion';
import { BookOpen, Calculator, FlaskConical, Globe, Palette, Monitor, ChevronRight } from 'lucide-react';

export default function Academics() {
  return (
    <div className="pt-24 pb-16">
      {/* Page Header */}
      <section className="bg-primary text-primary-foreground py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-serif font-bold mb-4"
          >
            Academics
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-primary-foreground/80 max-w-2xl"
          >
            A rigorous, CBSE-affiliated curriculum designed to foster critical thinking and lifelong learning.
          </motion.p>
        </div>
      </section>

      {/* Curriculum Overview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">CBSE Affiliated Curriculum</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Our academic program follows the guidelines set by the Central Board of Secondary Education (CBSE), New Delhi. We blend traditional teaching methodologies with modern, experiential learning techniques to ensure holistic academic development.
            </p>
            <div className="inline-block bg-secondary text-primary px-6 py-3 rounded-full font-bold text-sm tracking-widest uppercase border border-primary/20">
              Affiliation No: XXXXXX
            </div>
          </motion.div>
        </div>
      </section>

      {/* Class Structure */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-foreground mb-4">Academic Structure</h2>
            <p className="text-muted-foreground text-lg">A developmental approach to education from early years to senior secondary.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { stage: "Pre-Primary", classes: "Nursery to UKG", focus: "Play-way method, motor skills development, basic numeracy and literacy.", color: "border-t-pink-500" },
              { stage: "Primary", classes: "Class 1 to 5", focus: "Foundation building, interactive learning, environmental awareness.", color: "border-t-amber-500" },
              { stage: "Middle", classes: "Class 6 to 8", focus: "Exploratory learning, critical thinking, introduction to varied subjects.", color: "border-t-green-500" },
              { stage: "Secondary", classes: "Class 9 to 12", focus: "Board exam preparation, career counseling, specialized streams.", color: "border-t-blue-500" },
            ].map((structure, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`bg-white rounded-2xl p-8 shadow-sm border-t-4 ${structure.color} border-l border-r border-b border-black/5 hover:shadow-xl transition-shadow`}
              >
                <h3 className="text-2xl font-serif font-bold text-foreground mb-2">{structure.stage}</h3>
                <div className="text-sm font-bold text-primary bg-primary/10 inline-block px-3 py-1 rounded-full mb-4">
                  {structure.classes}
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">{structure.focus}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Senior Secondary Streams */}
      <section className="py-20 bg-foreground text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold mb-4">Senior Secondary Streams (11 & 12)</h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">Specialized pathways to prepare students for higher education and future careers.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Science */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-white/10 border border-white/20 rounded-3xl p-8 backdrop-blur-sm"
            >
              <div className="w-14 h-14 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center mb-6">
                <FlaskConical size={28} />
              </div>
              <h3 className="text-2xl font-serif font-bold mb-6">Science Stream</h3>
              <ul className="space-y-3 mb-8 text-white/80">
                <li className="flex items-center gap-2"><ChevronRight size={16} className="text-blue-400" /> Physics</li>
                <li className="flex items-center gap-2"><ChevronRight size={16} className="text-blue-400" /> Chemistry</li>
                <li className="flex items-center gap-2"><ChevronRight size={16} className="text-blue-400" /> Mathematics / Biology</li>
                <li className="flex items-center gap-2"><ChevronRight size={16} className="text-blue-400" /> English Core</li>
                <li className="flex items-center gap-2"><ChevronRight size={16} className="text-blue-400" /> Optional (CS / Physical Ed)</li>
              </ul>
            </motion.div>

            {/* Commerce */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white/10 border border-white/20 rounded-3xl p-8 backdrop-blur-sm relative transform md:-translate-y-4 shadow-2xl border-t-accent"
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-foreground text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">Most Popular</div>
              <div className="w-14 h-14 rounded-full bg-accent/20 text-accent flex items-center justify-center mb-6">
                <Calculator size={28} />
              </div>
              <h3 className="text-2xl font-serif font-bold mb-6">Commerce Stream</h3>
              <ul className="space-y-3 mb-8 text-white/80">
                <li className="flex items-center gap-2"><ChevronRight size={16} className="text-accent" /> Accountancy</li>
                <li className="flex items-center gap-2"><ChevronRight size={16} className="text-accent" /> Business Studies</li>
                <li className="flex items-center gap-2"><ChevronRight size={16} className="text-accent" /> Economics</li>
                <li className="flex items-center gap-2"><ChevronRight size={16} className="text-accent" /> English Core</li>
                <li className="flex items-center gap-2"><ChevronRight size={16} className="text-accent" /> Mathematics / IP</li>
              </ul>
            </motion.div>

            {/* Humanities */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white/10 border border-white/20 rounded-3xl p-8 backdrop-blur-sm"
            >
              <div className="w-14 h-14 rounded-full bg-pink-500/20 text-pink-400 flex items-center justify-center mb-6">
                <Globe size={28} />
              </div>
              <h3 className="text-2xl font-serif font-bold mb-6">Humanities Stream</h3>
              <ul className="space-y-3 mb-8 text-white/80">
                <li className="flex items-center gap-2"><ChevronRight size={16} className="text-pink-400" /> History</li>
                <li className="flex items-center gap-2"><ChevronRight size={16} className="text-pink-400" /> Political Science</li>
                <li className="flex items-center gap-2"><ChevronRight size={16} className="text-pink-400" /> Geography / Sociology</li>
                <li className="flex items-center gap-2"><ChevronRight size={16} className="text-pink-400" /> English Core</li>
                <li className="flex items-center gap-2"><ChevronRight size={16} className="text-pink-400" /> Optional Subjects</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-serif font-bold text-foreground mb-16">Our Teaching Methodology</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: BookOpen, title: "Conceptual Clarity", desc: "Focus on understanding over rote memorization." },
              { icon: Monitor, title: "Tech-Integrated", desc: "Smart boards and digital resources in every classroom." },
              { icon: Palette, title: "Experiential", desc: "Learning by doing through projects and practicals." },
              { icon: Globe, title: "Global Outlook", desc: "Connecting local learning to global contexts." }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center group">
                <div className="w-20 h-20 rounded-2xl bg-secondary flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <item.icon size={32} />
                </div>
                <h4 className="text-lg font-bold text-foreground mb-2">{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
