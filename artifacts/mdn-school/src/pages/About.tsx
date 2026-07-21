import { motion } from 'framer-motion';
import { Target, Eye, Heart, Award, ChevronRight } from 'lucide-react';
import { Link } from 'wouter';

export default function About() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Page Banner */}
      <section 
        className="relative pt-32 pb-24 md:pt-48 md:pb-32 overflow-hidden flex flex-col items-center justify-center text-center"
        style={{ 
          backgroundImage: `linear-gradient(to bottom, rgba(26,58,107,0.85), rgba(26,58,107,0.95)), url('/images/about-school.jpg')`, 
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
            About Us
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center justify-center gap-2 text-white/80 text-sm md:text-base font-medium tracking-wider uppercase"
          >
            <Link href="/" className="hover:text-[#f5a623] transition-colors">Home</Link>
            <ChevronRight size={16} />
            <span className="text-[#f5a623]">About</span>
          </motion.div>
        </div>
      </section>

      {/* History & Legacy */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, scale: 1.05 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8 }}
              className="aspect-square md:aspect-auto md:h-[600px] rounded-3xl overflow-hidden relative shadow-2xl"
            >
              <img src="/images/hero-bg.jpg" alt="MDN Global School Legacy" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a3a6b]/80 to-transparent flex items-end p-10">
                <div className="text-white">
                  <div className="text-4xl font-serif font-bold text-[#f5a623] mb-2">Est. 2000</div>
                  <div className="text-lg font-medium opacity-90">A quarter-century of educational excellence in Kaithal.</div>
                </div>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#1a3a6b] mb-6">Our Legacy of Excellence</h2>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                Founded with a profound vision to transform the educational landscape of Kaithal, MDN Global School has grown from a humble beginning to become a beacon of learning in the region.
              </p>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                Over the decades, we have remained steadfast in our commitment to providing world-class education while staying rooted in our cultural values. Our alumni span the globe, making significant contributions in various fields, a testament to the strong foundation laid here.
              </p>
              
              <div className="grid grid-cols-2 gap-8 border-t border-gray-200 pt-8">
                <div>
                  <div className="text-4xl font-serif font-bold text-[#1a3a6b] mb-2">25+</div>
                  <div className="text-sm font-bold text-gray-500 uppercase tracking-wider">Years of Service</div>
                </div>
                <div>
                  <div className="text-4xl font-serif font-bold text-[#1a3a6b] mb-2">10k+</div>
                  <div className="text-sm font-bold text-gray-500 uppercase tracking-wider">Global Alumni</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              className="bg-white p-12 rounded-3xl shadow-xl border border-black/5"
            >
              <div className="w-20 h-20 rounded-full bg-[#1a3a6b]/10 text-[#1a3a6b] flex items-center justify-center mb-8">
                <Eye size={40} />
              </div>
              <h3 className="text-3xl font-serif font-bold text-[#1a3a6b] mb-6">Our Vision</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                To be a premier institution of learning that nurtures global citizens who are intellectually capable, ethically sound, and socially responsible, ready to face the challenges of a dynamic world.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: 0.2 }}
              className="bg-[#1a3a6b] text-white p-12 rounded-3xl shadow-xl"
            >
              <div className="w-20 h-20 rounded-full bg-[#f5a623]/20 text-[#f5a623] flex items-center justify-center mb-8">
                <Target size={40} />
              </div>
              <h3 className="text-3xl font-serif font-bold mb-6">Our Mission</h3>
              <p className="text-white/80 text-lg leading-relaxed">
                To provide a stimulating learning environment with a technological orientation, which maximizes individual potential and ensures students of all ability levels are well equipped to meet the challenges of education, work and life.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#1a3a6b] mb-6">Our Core Values</h2>
            <div className="w-24 h-1 bg-[#f5a623] mx-auto rounded-full"></div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Integrity", desc: "Upholding the highest moral and ethical standards in all our actions." },
              { title: "Excellence", desc: "Striving for the best in academics, sports, and co-curricular activities." },
              { title: "Compassion", desc: "Fostering an environment of empathy, care, and mutual respect." },
              { title: "Innovation", desc: "Embracing new ideas and methodologies to enhance learning." }
            ].map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-8 bg-gray-50 rounded-3xl hover:shadow-lg transition-shadow border border-gray-100"
              >
                <div className="w-20 h-20 mx-auto rounded-2xl bg-[#1a3a6b] flex items-center justify-center text-[#f5a623] mb-6 transform rotate-3 hover:rotate-0 transition-transform">
                  <Heart size={32} />
                </div>
                <h4 className="text-2xl font-serif font-bold text-[#1a3a6b] mb-4">{value.title}</h4>
                <p className="text-gray-600">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Principal's Message */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto bg-white rounded-[3rem] shadow-xl overflow-hidden border border-gray-100">
            <div className="grid md:grid-cols-5 h-full relative">
              <div className="md:col-span-2 relative min-h-[400px] flex items-center justify-center p-8 bg-[#1a3a6b]">
                <div className="w-56 h-56 md:w-64 md:h-64 rounded-full overflow-hidden border-8 border-[#f5a623] shadow-2xl relative z-10">
                  <img src="/images/principal.jpg" alt="Principal" className="w-full h-full object-cover" />
                </div>
                <div className="absolute inset-0 bg-[url('/images/about-school.jpg')] opacity-10 bg-cover bg-center mix-blend-overlay"></div>
              </div>
              
              <div className="md:col-span-3 p-10 md:p-16 flex flex-col justify-center relative">
                <Award className="absolute top-10 right-10 text-gray-100 w-32 h-32 opacity-50" />
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#1a3a6b] mb-8 relative z-10">From the Principal's Desk</h2>
                <div className="space-y-6 text-gray-600 text-lg italic mb-10 relative z-10">
                  <p>
                    "Education is not the learning of facts, but the training of the mind to think. At MDN Global, we strive to create thinkers, innovators, and leaders who will shape tomorrow."
                  </p>
                  <p>
                    "Our dedicated faculty ensures that every child's unique potential is recognized and nurtured. We invite you to be a part of this beautiful journey of excellence."
                  </p>
                </div>
                <div className="relative z-10">
                  <h4 className="font-bold text-[#1a3a6b] text-2xl mb-1">Dr. Anjali Sharma</h4>
                  <p className="text-[#f5a623] font-bold uppercase tracking-wider text-sm">Principal, MDN Global School</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
