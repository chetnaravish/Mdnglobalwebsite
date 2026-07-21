import { motion } from 'framer-motion';
import { Microscope, MonitorPlay, Library, Dumbbell, Bus, Coffee, HeartPulse, Palette, ChevronRight } from 'lucide-react';
import { Link } from 'wouter';

export default function Facilities() {
  const facilities = [
    {
      title: "Smart Classrooms",
      description: "Air-conditioned, spacious classrooms equipped with interactive flat panels and high-speed internet to make learning engaging and visual.",
      icon: MonitorPlay,
      image: "/images/academics.jpg"
    },
    {
      title: "Science Laboratories",
      description: "State-of-the-art Physics, Chemistry, and Biology labs complying with CBSE safety norms, allowing hands-on practical experience.",
      icon: Microscope,
      image: "/images/facilities-lab.jpg"
    },
    {
      title: "Extensive Library",
      description: "A vast collection of academic books, journals, fiction, and digital resources in a quiet, conducive reading environment.",
      icon: Library,
      image: "/images/facilities-library.jpg"
    },
    {
      title: "Sports Complex",
      description: "Facilities for cricket, football, basketball, badminton, and indoor games. Professional coaching available.",
      icon: Dumbbell,
      image: "/images/facilities-sports.jpg"
    },
    {
      title: "Computer Center",
      description: "Modern IT labs with the latest hardware and software. 1:1 student-to-computer ratio during practical sessions.",
      icon: MonitorPlay,
      image: "/images/facilities-library.jpg"
    },
    {
      title: "Transportation",
      description: "A fleet of GPS-enabled buses covering Kaithal and surrounding areas with trained drivers and female attendants.",
      icon: Bus,
      image: "/images/about-school.jpg"
    },
    {
      title: "Cafeteria",
      description: "Hygienic and nutritious meals prepared under strict quality control. Menu planned by expert nutritionists.",
      icon: Coffee,
      image: "/images/students-happy.jpg"
    },
    {
      title: "Medical Room",
      description: "Fully equipped infirmary with a qualified full-time nurse and a visiting doctor for regular checkups and emergencies.",
      icon: HeartPulse,
      image: "/images/facilities-lab.jpg"
    },
    {
      title: "Art & Craft Studio",
      description: "A dedicated space for students to explore their creativity through painting, sculpture, pottery, and crafts.",
      icon: Palette,
      image: "/images/events-annual.jpg"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Page Banner */}
      <section 
        className="relative pt-32 pb-24 md:pt-48 md:pb-32 overflow-hidden flex flex-col items-center justify-center text-center"
        style={{ 
          backgroundImage: `linear-gradient(to bottom, rgba(26,58,107,0.85), rgba(26,58,107,0.95)), url('/images/facilities-sports.jpg')`, 
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
            World-Class Facilities
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center justify-center gap-2 text-white/80 text-sm md:text-base font-medium tracking-wider uppercase"
          >
            <Link href="/" className="hover:text-[#f5a623] transition-colors">Home</Link>
            <ChevronRight size={16} />
            <span className="text-[#f5a623]">Facilities</span>
          </motion.div>
        </div>
      </section>

      {/* Facilities Grid */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {facilities.map((facility, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: (i % 3) * 0.1, duration: 0.5 }}
                className="group rounded-3xl overflow-hidden border border-gray-200 hover:shadow-2xl transition-all duration-500 bg-white flex flex-col h-full hover:-translate-y-2"
              >
                <div className="h-64 relative overflow-hidden">
                  <img src={facility.image} alt={facility.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-[#1a3a6b]/30 group-hover:bg-[#1a3a6b]/10 transition-colors duration-500"></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <facility.icon size={80} className="text-white drop-shadow-[0_0_15px_rgba(0,0,0,0.5)]" />
                  </div>
                  <div className="absolute bottom-5 left-5 w-14 h-14 bg-white rounded-2xl shadow-xl flex items-center justify-center text-[#1a3a6b] z-10 group-hover:bg-[#f5a623] transition-colors">
                    <facility.icon size={28} />
                  </div>
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <h3 className="text-2xl font-serif font-bold text-[#1a3a6b] mb-4">{facility.title}</h3>
                  <p className="text-gray-600 leading-relaxed flex-1 text-lg">{facility.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Virtual Tour Banner */}
      <section className="py-24 bg-[#1a3a6b] text-white relative overflow-hidden">
        <div className="absolute right-0 top-0 w-1/2 h-full bg-blue-500/20 blur-[120px]"></div>
        <div className="absolute left-0 bottom-0 w-1/3 h-full bg-[#f5a623]/10 blur-[100px]"></div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
          >
            <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6">Experience the Campus</h2>
            <p className="text-white/80 text-xl mb-10 max-w-3xl mx-auto leading-relaxed">
              Words can only say so much. We invite you to visit our campus and see the world-class infrastructure that makes MDN Global School the preferred choice for parents in Kaithal.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link href="/contact" className="w-full sm:w-auto bg-[#f5a623] text-[#1a3a6b] px-10 py-4 rounded-full font-bold text-lg hover:bg-[#e09612] transition-colors shadow-lg hover:scale-105">
                Schedule a Tour
              </Link>
              <button className="w-full sm:w-auto bg-transparent border-2 border-white text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-colors backdrop-blur-sm">
                Watch Virtual Tour
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
