import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, ArrowRight, ChevronRight } from 'lucide-react';
import { Link } from 'wouter';

export default function Events() {
  const upcomingEvents = [
    {
      title: "Annual Sports Meet 2025",
      date: "Oct 15, 2025",
      time: "08:00 AM - 04:00 PM",
      location: "Main Sports Ground",
      category: "Sports",
      description: "A grand showcase of athletic prowess. Track and field events, team sports finals, and the spectacular march past."
    },
    {
      title: "Science & Tech Exhibition",
      date: "Nov 05, 2025",
      time: "10:00 AM - 02:00 PM",
      location: "School Auditorium",
      category: "Academics",
      description: "Students from classes 6-12 display working models, robotics projects, and innovative scientific solutions to modern problems."
    },
    {
      title: "Cultural Fest - 'Tarang'",
      date: "Dec 20, 2025",
      time: "05:00 PM - 09:00 PM",
      location: "Open Air Theatre",
      category: "Culture",
      description: "A mesmerizing evening of music, dance, and theatrical performances celebrating India's rich and diverse cultural heritage."
    }
  ];

  const pastEvents = [
    { title: "Inter-School Debate Competition", date: "Sep 2025" },
    { title: "Teacher's Day Celebration", date: "Sep 2025" },
    { title: "Independence Day Flag Hoisting", date: "Aug 2025" },
    { title: "CBSE Board Results Felicitation", date: "Jul 2025" }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Page Banner */}
      <section 
        className="relative pt-32 pb-24 md:pt-48 md:pb-32 overflow-hidden flex flex-col items-center justify-center text-center"
        style={{ 
          backgroundImage: `linear-gradient(to bottom, rgba(26,58,107,0.85), rgba(26,58,107,0.95)), url('/images/events-annual.jpg')`, 
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
            Events & Life at MDN
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center justify-center gap-2 text-white/80 text-sm md:text-base font-medium tracking-wider uppercase"
          >
            <Link href="/" className="hover:text-[#f5a623] transition-colors">Home</Link>
            <ChevronRight size={16} />
            <span className="text-[#f5a623]">Events</span>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-24">
        <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
          
          {/* Main Content: Upcoming Events */}
          <div className="lg:col-span-2 space-y-10">
            <div className="flex items-center justify-between border-b-2 border-gray-200 pb-4 mb-8">
              <h2 className="text-4xl font-serif font-bold text-[#1a3a6b]">Upcoming Events</h2>
              <span className="text-sm font-bold text-[#1a3a6b] bg-[#f5a623] px-5 py-2 rounded-full uppercase tracking-wider shadow-sm">
                Fall 2025
              </span>
            </div>

            <div className="space-y-10">
              {upcomingEvents.map((event, i) => {
                const bgImg = i === 0 ? "/images/events-sports.jpg" : i === 1 ? "/images/facilities-lab.jpg" : "/images/events-annual.jpg";
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ delay: i * 0.1 }}
                    className="relative rounded-[2rem] overflow-hidden shadow-xl group flex flex-col md:flex-row min-h-[280px]"
                  >
                    <div className="absolute inset-0 md:w-2/5 h-64 md:h-auto">
                      <img src={bgImg} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Event" />
                      <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#1a3a6b] via-[#1a3a6b]/80 to-transparent"></div>
                    </div>
                    
                    <div className="relative z-10 flex flex-col md:flex-row w-full md:w-3/5 md:ml-auto p-8 bg-[#1a3a6b] text-white gap-8 md:rounded-l-3xl">
                      <div className="shrink-0 text-left md:border-r md:border-white/20 md:pr-8 flex flex-col justify-center">
                        <div className="text-[#f5a623] font-bold text-xl mb-1 uppercase tracking-widest">{event.date.split(' ')[0]}</div>
                        <div className="text-6xl font-serif font-black mb-1 drop-shadow-md">{event.date.split(' ')[1].replace(',', '')}</div>
                        <div className="text-white/70 text-base font-bold tracking-widest">{event.date.split(' ')[2]}</div>
                      </div>
                      
                      <div className="flex-1 flex flex-col justify-center">
                        <div className="flex items-center gap-3 mb-4">
                          <span className="text-xs font-bold uppercase tracking-wider text-[#1a3a6b] bg-[#f5a623] px-3 py-1 rounded-full shadow-sm">
                            {event.category}
                          </span>
                        </div>
                        <h3 className="text-2xl font-bold mb-4 group-hover:text-[#f5a623] transition-colors">{event.title}</h3>
                        <p className="text-white/80 mb-6 text-sm leading-relaxed">{event.description}</p>
                        
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm font-medium text-white/90">
                          <div className="flex items-center gap-2">
                            <Clock size={16} className="text-[#f5a623]" />
                            {event.time}
                          </div>
                          <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-white/30"></div>
                          <div className="flex items-center gap-2">
                            <MapPin size={16} className="text-[#f5a623]" />
                            {event.location}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Sidebar: Calendar & Past Events */}
          <div className="space-y-10">
            {/* Academic Calendar Card */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-[#1a3a6b] text-white rounded-[2rem] p-10 relative overflow-hidden shadow-xl"
            >
              <Calendar className="absolute -right-10 -bottom-10 w-48 h-48 text-white/5 transform rotate-12" />
              <h3 className="text-3xl font-serif font-bold mb-4 relative z-10">Academic Calendar</h3>
              <p className="text-white/80 mb-8 relative z-10 text-lg leading-relaxed">Download the complete academic calendar for the session 2025-26, including exam schedules and holidays.</p>
              <button className="w-full bg-[#f5a623] text-[#1a3a6b] font-bold py-4 rounded-xl hover:bg-[#e09612] transition-colors relative z-10 flex items-center justify-center gap-2 text-lg shadow-lg">
                Download PDF <ArrowRight size={20} />
              </button>
            </motion.div>

            {/* Past Events List */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-[2rem] p-10 shadow-lg border border-gray-100"
            >
              <h3 className="text-2xl font-serif font-bold text-[#1a3a6b] mb-8 border-b-2 border-gray-100 pb-4">Recent Highlights</h3>
              <ul className="space-y-6">
                {pastEvents.map((event, i) => (
                  <li key={i} className="flex gap-5 group cursor-pointer items-center">
                    <div className="w-14 h-14 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center text-[#1a3a6b] shrink-0 group-hover:bg-[#1a3a6b] group-hover:text-[#f5a623] transition-colors duration-300">
                      <Calendar size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#1a3a6b] group-hover:text-[#f5a623] transition-colors text-base mb-1">{event.title}</h4>
                      <p className="text-sm text-gray-500 font-medium">{event.date}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <button className="mt-8 text-[#1a3a6b] font-bold text-base hover:text-[#f5a623] transition-colors w-full text-left flex items-center gap-2">
                View Full Gallery <ArrowRight size={16} />
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
