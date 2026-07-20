import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, ArrowRight } from 'lucide-react';

export default function Events() {
  const upcomingEvents = [
    {
      title: "Annual Sports Meet 2025",
      date: "Oct 15, 2025",
      time: "08:00 AM - 04:00 PM",
      location: "Main Sports Ground",
      category: "Sports",
      description: "A showcase of athletic prowess. Track and field events, team sports finals, and the grand march past."
    },
    {
      title: "Science & Tech Exhibition",
      date: "Nov 05, 2025",
      time: "10:00 AM - 02:00 PM",
      location: "School Auditorium",
      category: "Academics",
      description: "Students from classes 6-12 display working models, robotics projects, and innovative scientific solutions."
    },
    {
      title: "Cultural Fest - 'Tarang'",
      date: "Dec 20, 2025",
      time: "05:00 PM - 09:00 PM",
      location: "Open Air Theatre",
      category: "Culture",
      description: "An evening of music, dance, and theatrical performances celebrating India's diverse cultural heritage."
    }
  ];

  const pastEvents = [
    { title: "Inter-School Debate Competition", date: "Sep 2025" },
    { title: "Teacher's Day Celebration", date: "Sep 2025" },
    { title: "Independence Day Flag Hoisting", date: "Aug 2025" },
    { title: "CBSE Board Results Felicitation", date: "Jul 2025" }
  ];

  return (
    <div className="pt-24 pb-16 bg-secondary/30 min-h-screen">
      {/* Page Header */}
      <section className="bg-primary text-primary-foreground py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/always-grey.png')]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-serif font-bold mb-4"
          >
            Events & Life at MDN
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-primary-foreground/80 max-w-2xl"
          >
            Education extends beyond the classroom. Explore our vibrant campus life.
          </motion.p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content: Upcoming Events */}
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-serif font-bold text-foreground">Upcoming Events</h2>
              <span className="text-sm font-bold text-primary bg-primary/10 px-4 py-1 rounded-full uppercase tracking-wider">
                Fall 2025
              </span>
            </div>

            <div className="space-y-6">
              {upcomingEvents.map((event, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-black/5 hover:shadow-xl transition-all group flex flex-col md:flex-row gap-8"
                >
                  <div className="shrink-0 text-center md:text-left md:border-r md:border-border md:pr-8 flex flex-col justify-center">
                    <div className="text-primary font-bold text-lg mb-1">{event.date.split(' ')[0]}</div>
                    <div className="text-5xl font-serif font-black text-foreground mb-1">{event.date.split(' ')[1].replace(',', '')}</div>
                    <div className="text-muted-foreground text-sm font-medium">{event.date.split(' ')[2]}</div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-accent bg-accent/10 px-3 py-1 rounded-full">
                        {event.category}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">{event.title}</h3>
                    <p className="text-muted-foreground mb-6 line-clamp-2">{event.description}</p>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm font-medium text-foreground/70">
                      <div className="flex items-center gap-2">
                        <Clock size={16} className="text-primary" />
                        {event.time}
                      </div>
                      <div className="hidden sm:block w-1 h-1 rounded-full bg-border"></div>
                      <div className="flex items-center gap-2">
                        <MapPin size={16} className="text-primary" />
                        {event.location}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Sidebar: Calendar & Past Events */}
          <div className="space-y-8">
            {/* Academic Calendar Card */}
            <div className="bg-foreground text-white rounded-3xl p-8 relative overflow-hidden">
              <Calendar className="absolute -right-8 -bottom-8 w-40 h-40 text-white/5" />
              <h3 className="text-2xl font-serif font-bold mb-4 relative z-10">Academic Calendar</h3>
              <p className="text-white/70 mb-8 relative z-10 text-sm">Download the complete academic calendar for the session 2025-26, including exam schedules and holidays.</p>
              <button className="w-full bg-accent text-primary-foreground font-bold py-3 rounded-xl hover:bg-accent/90 transition-colors relative z-10 flex items-center justify-center gap-2">
                Download PDF <ArrowRight size={18} />
              </button>
            </div>

            {/* Past Events List */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-black/5">
              <h3 className="text-xl font-serif font-bold text-foreground mb-6">Recent Highlights</h3>
              <ul className="space-y-6">
                {pastEvents.map((event, i) => (
                  <li key={i} className="flex gap-4 group cursor-pointer">
                    <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                      <Calendar size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground group-hover:text-primary transition-colors text-sm">{event.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1">{event.date}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <button className="mt-8 text-primary font-bold text-sm hover:underline w-full text-left">
                View Gallery →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
