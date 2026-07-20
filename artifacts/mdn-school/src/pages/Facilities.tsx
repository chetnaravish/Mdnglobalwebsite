import { motion } from 'framer-motion';
import { Microscope, MonitorPlay, Library, Dumbbell, Bus, Coffee, HeartPulse, Palette } from 'lucide-react';

export default function Facilities() {
  const facilities = [
    {
      title: "Smart Classrooms",
      description: "Air-conditioned, spacious classrooms equipped with interactive flat panels and high-speed internet to make learning engaging and visual.",
      icon: MonitorPlay,
      image: "bg-blue-900/10"
    },
    {
      title: "Science Laboratories",
      description: "State-of-the-art Physics, Chemistry, and Biology labs complying with CBSE safety norms, allowing hands-on practical experience.",
      icon: Microscope,
      image: "bg-emerald-900/10"
    },
    {
      title: "Computer Center",
      description: "Modern IT labs with the latest hardware and software. 1:1 student-to-computer ratio during practical sessions.",
      icon: MonitorPlay,
      image: "bg-indigo-900/10"
    },
    {
      title: "Extensive Library",
      description: "A vast collection of academic books, journals, fiction, and digital resources in a quiet, conducive reading environment.",
      icon: Library,
      image: "bg-amber-900/10"
    },
    {
      title: "Sports Complex",
      description: "Facilities for cricket, football, basketball, badminton, and indoor games. Professional coaching available.",
      icon: Dumbbell,
      image: "bg-orange-900/10"
    },
    {
      title: "Transportation",
      description: "A fleet of GPS-enabled buses covering Kaithal and surrounding areas with trained drivers and female attendants.",
      icon: Bus,
      image: "bg-yellow-900/10"
    },
    {
      title: "Cafeteria",
      description: "Hygienic and nutritious meals prepared under strict quality control. Menu planned by nutritionists.",
      icon: Coffee,
      image: "bg-red-900/10"
    },
    {
      title: "Medical Room",
      description: "Fully equipped infirmary with a qualified full-time nurse and a visiting doctor for regular checkups and emergencies.",
      icon: HeartPulse,
      image: "bg-rose-900/10"
    },
    {
      title: "Art & Craft Studio",
      description: "A dedicated space for students to explore their creativity through painting, sculpture, pottery, and crafts.",
      icon: Palette,
      image: "bg-purple-900/10"
    }
  ];

  return (
    <div className="pt-24 pb-16">
      {/* Page Header */}
      <section className="bg-primary text-primary-foreground py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')]"></div>
        <div className="container mx-auto px-4 relative z-10 text-center md:text-left">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-serif font-bold mb-4"
          >
            World-Class Facilities
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-primary-foreground/80 max-w-2xl mx-auto md:mx-0"
          >
            Providing an environment that inspires excellence in every sphere of student life.
          </motion.p>
        </div>
      </section>

      {/* Facilities Grid */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {facilities.map((facility, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: (i % 3) * 0.1, duration: 0.5 }}
                className="group rounded-3xl overflow-hidden border border-black/5 hover:shadow-2xl transition-all duration-300 bg-white flex flex-col h-full"
              >
                <div className={`h-48 ${facility.image} relative overflow-hidden`}>
                  {/* Abstract placeholder instead of real images */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:scale-110 transition-transform duration-700">
                    <facility.icon size={100} />
                  </div>
                  <div className="absolute bottom-4 left-4 w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center text-primary">
                    <facility.icon size={24} />
                  </div>
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <h3 className="text-2xl font-serif font-bold text-foreground mb-3">{facility.title}</h3>
                  <p className="text-muted-foreground leading-relaxed flex-1">{facility.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Virtual Tour Banner */}
      <section className="py-20 bg-foreground text-white relative overflow-hidden">
        <div className="absolute right-0 top-0 w-1/2 h-full bg-primary/20 blur-[100px]"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">Experience the Campus</h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Words can only say so much. We invite you to visit our campus and see the world-class infrastructure that makes MDN Global School the preferred choice for parents in Kaithal.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-accent text-primary-foreground px-8 py-3 rounded-full font-bold hover:bg-accent/90 transition-colors shadow-lg">
              Schedule a Campus Tour
            </button>
            <button className="bg-white/10 border border-white/20 text-white px-8 py-3 rounded-full font-bold hover:bg-white/20 transition-colors backdrop-blur-sm">
              Watch Virtual Tour
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
