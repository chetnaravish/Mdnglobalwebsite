import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Users, Trophy, GraduationCap, ChevronRight } from 'lucide-react';
import { Link } from 'wouter';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-foreground">
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,_rgba(30,86,160,0.8)_0%,_transparent_50%)]" />
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_70%,_rgba(245,166,35,0.4)_0%,_transparent_50%)]" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        </div>

        <div className="container relative z-10 mx-auto px-4 pt-20 pb-12 flex flex-col items-center text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="max-w-4xl"
          >
            <motion.div variants={fadeIn} className="mb-6 inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full text-white/90 text-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
              Admissions Open for 2025-26
            </motion.div>
            
            <motion.h1 
              variants={fadeIn}
              className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white leading-tight tracking-tight mb-6"
            >
              Excellence in <br />
              <span className="text-accent italic">Education</span>
            </motion.h1>
            
            <motion.p 
              variants={fadeIn}
              className="text-lg md:text-2xl text-white/80 max-w-2xl mx-auto mb-10 font-light"
            >
              Nurturing young minds to become global citizens of tomorrow. A premier CBSE affiliated institution in Kaithal.
            </motion.p>
            
            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="w-full sm:w-auto bg-accent text-primary-foreground px-8 py-4 rounded-full text-lg font-semibold hover:bg-accent/90 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-accent/20 flex items-center justify-center gap-2"
                data-testid="hero-apply-btn"
              >
                Apply Now <ArrowRight size={20} />
              </Link>
              <Link
                href="/about"
                className="w-full sm:w-auto bg-white/10 text-white border border-white/30 px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/20 transition-all backdrop-blur-sm flex items-center justify-center"
                data-testid="hero-explore-btn"
              >
                Explore MDN
              </Link>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50"
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-white/50 to-transparent"></div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white relative z-20 -mt-8 rounded-t-[3rem] shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-gray-200">
            {[
              { icon: BookOpen, count: "25+", label: "Years of Excellence" },
              { icon: Users, count: "2000+", label: "Students Enrolled" },
              { icon: GraduationCap, count: "150+", label: "Expert Faculty" },
              { icon: Trophy, count: "100%", label: "CBSE Pass Rate" },
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center text-center p-4 pt-8 md:pt-4"
              >
                <div className="w-16 h-16 rounded-full bg-secondary text-primary flex items-center justify-center mb-4">
                  <stat.icon size={32} />
                </div>
                <h3 className="text-4xl font-serif font-bold text-foreground mb-2">{stat.count}</h3>
                <p className="text-muted-foreground font-medium uppercase tracking-wider text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Teaser */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-accent font-bold tracking-widest uppercase mb-4 text-sm flex items-center gap-4">
                <div className="w-12 h-px bg-accent"></div>
                Welcome to MDN
              </div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6 leading-tight">
                Shaping the Leaders <br />of Tomorrow
              </h2>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                At MDN Global School, we believe that education is not just about academic excellence, but about character building and holistic development. Our state-of-the-art campus in Kaithal provides the perfect ecosystem for children to discover their true potential.
              </p>
              <ul className="space-y-4 mb-8">
                {['Innovative teaching methodologies', 'World-class sports facilities', 'Focus on moral values and ethics'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-foreground font-medium">
                    <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <ChevronRight size={14} />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-primary font-bold hover:text-primary/80 transition-colors group"
                data-testid="link-read-more"
              >
                Read our full story 
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="aspect-[4/3] rounded-2xl bg-muted overflow-hidden relative shadow-2xl">
                {/* Placeholder for real school image */}
                <div className="absolute inset-0 bg-gradient-to-tr from-primary to-primary/40 flex items-center justify-center p-8 text-center">
                  <span className="text-white/50 font-serif text-2xl border border-white/20 p-8 rounded-xl backdrop-blur-sm">School Building Image</span>
                </div>
              </div>
              <div className="absolute -bottom-8 -left-8 bg-white p-8 rounded-xl shadow-xl max-w-xs hidden md:block">
                <div className="text-4xl font-serif font-bold text-primary mb-2">100%</div>
                <div className="text-sm text-muted-foreground font-medium">Board Results for the last 5 consecutive years.</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Sections (Cards) */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">Discover the MDN Edge</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Everything your child needs to thrive academically, physically, and emotionally.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Academics',
                desc: 'Rigorous CBSE curriculum designed to foster critical thinking and intellectual curiosity.',
                link: '/academics',
                color: 'bg-blue-50',
                icon: BookOpen
              },
              {
                title: 'Facilities',
                desc: 'Smart classrooms, advanced labs, and expansive sports grounds for holistic growth.',
                link: '/facilities',
                color: 'bg-amber-50',
                icon: Trophy
              },
              {
                title: 'Events & Culture',
                desc: 'A vibrant calendar of cultural fests, sports meets, and intellectual competitions.',
                link: '/events',
                color: 'bg-green-50',
                icon: Users
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className={`group rounded-2xl p-8 ${feature.color} border border-black/5 hover:shadow-xl transition-all duration-300 hover:-translate-y-2`}
              >
                <div className="w-14 h-14 rounded-xl bg-white shadow-sm flex items-center justify-center mb-6 text-foreground group-hover:scale-110 transition-transform">
                  <feature.icon size={28} />
                </div>
                <h3 className="text-2xl font-serif font-bold text-foreground mb-4">{feature.title}</h3>
                <p className="text-muted-foreground mb-8 line-clamp-3">{feature.desc}</p>
                <Link
                  href={feature.link}
                  className="inline-flex items-center gap-2 text-foreground font-bold hover:text-primary transition-colors"
                >
                  Explore <ArrowRight size={16} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-foreground text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary rounded-full blur-[100px] opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent rounded-full blur-[100px] opacity-20"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">What Parents Say</h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">Trust is earned. Hear from the families who have chosen MDN Global School.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { text: "The transformation in my child's confidence is remarkable. The teachers here don't just teach, they mentor.", author: "Rajesh Kumar", role: "Parent of Class 8 Student" },
              { text: "Best infrastructure in Kaithal. The balance between academics and sports is exactly what we were looking for.", author: "Priya Sharma", role: "Parent of Class 5 Student" },
              { text: "During board exams, the school provided exceptional support. My daughter scored 96% thanks to the dedicated faculty.", author: "Sandeep Singh", role: "Parent of Class 12 Student" }
            ].map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-sm"
              >
                <div className="flex text-accent mb-4">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-white/90 text-lg mb-6 leading-relaxed italic">"{testimonial.text}"</p>
                <div>
                  <div className="font-bold text-white">{testimonial.author}</div>
                  <div className="text-white/60 text-sm">{testimonial.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
