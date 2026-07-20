import { motion } from 'framer-motion';
import { Target, Eye, Heart, Award } from 'lucide-react';

export default function About() {
  return (
    <div className="pt-24 pb-16">
      {/* Page Header */}
      <section className="bg-primary text-primary-foreground py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-serif font-bold mb-4"
          >
            About Us
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-primary-foreground/80 max-w-2xl"
          >
            Discover the legacy, vision, and values that drive MDN Global School to excellence.
          </motion.p>
        </div>
      </section>

      {/* History & Legacy */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="aspect-square md:aspect-auto md:h-[600px] rounded-3xl bg-muted overflow-hidden relative"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-foreground to-primary/40 flex items-center justify-center p-8 text-center">
                <span className="text-white/50 font-serif text-2xl border border-white/20 p-8 rounded-xl backdrop-blur-sm">Historic School Photo</span>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-serif font-bold text-foreground mb-6">Our Legacy of Excellence</h2>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                Founded with a profound vision to transform the educational landscape of Kaithal, MDN Global School has grown from a humble beginning to become a beacon of learning in the region.
              </p>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                Over the decades, we have remained steadfast in our commitment to providing world-class education while staying rooted in our cultural values. Our alumni span the globe, making significant contributions in various fields, a testament to the strong foundation laid here.
              </p>
              
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <div className="text-4xl font-serif font-bold text-primary mb-2">1998</div>
                  <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Year Established</div>
                </div>
                <div>
                  <div className="text-4xl font-serif font-bold text-primary mb-2">10k+</div>
                  <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Alumni Network</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-10 rounded-3xl shadow-lg border border-black/5"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-6">
                <Eye size={32} />
              </div>
              <h3 className="text-3xl font-serif font-bold text-foreground mb-4">Our Vision</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                To be a premier institution of learning that nurtures global citizens who are intellectually capable, ethically sound, and socially responsible, ready to face the challenges of a dynamic world.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-foreground text-white p-10 rounded-3xl shadow-lg"
            >
              <div className="w-16 h-16 rounded-full bg-white/10 text-accent flex items-center justify-center mb-6">
                <Target size={32} />
              </div>
              <h3 className="text-3xl font-serif font-bold mb-4">Our Mission</h3>
              <p className="text-white/80 text-lg leading-relaxed">
                To provide a stimulating learning environment with a technological orientation, which maximizes individual potential and ensures students of all ability levels are well equipped to meet the challenges of education, work and life.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-foreground mb-4">Our Core Values</h2>
            <div className="w-24 h-1 bg-accent mx-auto"></div>
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
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-6"
              >
                <div className="w-20 h-20 mx-auto rounded-2xl bg-secondary flex items-center justify-center text-primary mb-6 transform rotate-3">
                  <Heart size={32} />
                </div>
                <h4 className="text-2xl font-serif font-bold text-foreground mb-3">{value.title}</h4>
                <p className="text-muted-foreground">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Principal's Message */}
      <section className="py-20 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-black/5">
            <div className="grid md:grid-cols-5 h-full">
              <div className="md:col-span-2 bg-muted relative min-h-[300px]">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center grayscale contrast-125 mix-blend-multiply"></div>
                <div className="absolute inset-0 bg-primary/20"></div>
              </div>
              <div className="md:col-span-3 p-10 md:p-16 flex flex-col justify-center relative">
                <Award className="absolute top-10 right-10 text-secondary w-24 h-24 opacity-50" />
                <h2 className="text-3xl font-serif font-bold text-foreground mb-6">From the Principal's Desk</h2>
                <div className="space-y-4 text-muted-foreground text-lg italic mb-8 relative z-10">
                  <p>
                    "Education is not the learning of facts, but the training of the mind to think. At MDN Global, we strive to create thinkers, innovators, and leaders."
                  </p>
                  <p>
                    "Our dedicated faculty ensures that every child's unique potential is recognized and nurtured. We invite you to be a part of this journey of excellence."
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-foreground text-xl">Dr. Anjali Sharma</h4>
                  <p className="text-primary font-medium">Principal, MDN Global School</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
