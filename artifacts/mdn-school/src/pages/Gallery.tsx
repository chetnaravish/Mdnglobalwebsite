import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, Images } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } })
};

/* ── Gallery data ─────────────────────────────────────── */
type Photo = { src: string; caption: string; pos?: string };
type Section = { id: string; label: string; color: string; count: number; photos: Photo[] };

const sections: Section[] = [
  {
    id: 'campus',
    label: 'Campus Life',
    color: 'bg-blue-600',
    count: 6,
    photos: [
      { src: '/images/mdn-building-2.png', caption: 'MDN Global School — Main Building', pos: 'center center' },
      { src: '/images/mdn-building-3.png', caption: 'Aerial View — School Campus & Sports Ground', pos: 'center center' },
      { src: '/images/mdn-building-1.avif', caption: 'MDN Global School — Campus Overview', pos: 'center center' },
      { src: '/images/mdn-building-4.avif', caption: 'School Building — Drone View', pos: 'center center' },
      { src: '/images/pre-primary-kids.png', caption: 'Pre-Primary Students — Classroom Learning', pos: 'center center' },
      { src: '/images/primary-kids.png', caption: 'Primary Students — Playground Fun', pos: 'center center' },
      { src: '/images/students-happy.jpg', caption: 'Students During Break Time', pos: 'center top' },
    ]
  },
  {
    id: 'sports',
    label: 'Sports',
    color: 'bg-green-600',
    count: 6,
    photos: [
      { src: '/images/facilities-sports.jpg', caption: 'Sports Complex — Cricket Ground', pos: 'center center' },
      { src: '/images/events-sports.jpg', caption: 'Annual Sports Meet 2024', pos: 'center center' },
      { src: '/images/facilities-sports.jpg', caption: 'Football Practice Session', pos: 'center top' },
      { src: '/images/events-sports.jpg', caption: 'Basketball Tournament', pos: 'center bottom' },
      { src: '/images/facilities-sports.jpg', caption: 'Athletics — Track Events', pos: 'center center' },
      { src: '/images/events-sports.jpg', caption: 'Award Ceremony — Sports Day', pos: 'center top' },
    ]
  },
  {
    id: 'cultural',
    label: 'Cultural Events',
    color: 'bg-purple-600',
    count: 6,
    photos: [
      { src: '/images/annual-function.png', caption: 'Annual Function — Cultural Dance Performance', pos: 'center center' },
      { src: '/images/events-annual.jpg', caption: 'Annual Day — Cultural Performances', pos: 'center center' },
      { src: '/images/students-happy.jpg', caption: 'Independence Day Celebration', pos: 'center top' },
      { src: '/images/events-annual.jpg', caption: "Cultural Fest 'Utsav' — Dance Show", pos: 'center bottom' },
      { src: '/images/students-happy.jpg', caption: "Children's Day Grand Celebration", pos: 'center center' },
      { src: '/images/events-annual.jpg', caption: 'Music & Drama Performance', pos: 'center top' },
      { src: '/images/students-happy.jpg', caption: 'Prize Distribution Ceremony', pos: 'center center' },
    ]
  },
  {
    id: 'academics',
    label: 'Academic Life',
    color: 'bg-amber-600',
    count: 6,
    photos: [
      { src: '/images/academics.jpg', caption: 'Smart Classroom — Interactive Learning', pos: 'center center' },
      { src: '/images/science-lab.png', caption: 'Science Lab — Practical Session', pos: 'center center' },
      { src: '/images/classroom.png', caption: 'School Library — Reading Zone', pos: 'center center' },
      { src: '/images/academics.jpg', caption: 'Computer Lab — Coding Class', pos: 'center top' },
      { src: '/images/science-lab.png', caption: 'Chemistry Lab Experiment', pos: 'center bottom' },
      { src: '/images/classroom.png', caption: 'Students Studying Together', pos: 'center top' },
    ]
  },
  {
    id: 'facilities',
    label: 'Facilities',
    color: 'bg-rose-600',
    count: 6,
    photos: [
      { src: '/images/classroom-students.jpg', caption: 'Classroom — Students in Session', pos: 'center center' },
      { src: '/images/science-lab.png', caption: 'State-of-the-Art Science Laboratory', pos: 'center center' },
      { src: '/images/library-students.jpg', caption: 'Library & Resource Centre', pos: 'center center' },
      { src: '/images/facilities-sports.jpg', caption: 'Indoor Sports Hall', pos: 'center center' },
      { src: '/images/academics.jpg', caption: 'Digital Classroom Technology', pos: 'center top' },
      { src: '/images/science-lab.png', caption: 'Physics Lab — Apparatus Setup', pos: 'center bottom' },
      { src: '/images/classroom.png', caption: 'Reading Room — Quiet Zone', pos: 'center top' },
    ]
  },
];

const ALL_PHOTOS = sections.flatMap(s => s.photos.map(p => ({ ...p, sectionLabel: s.label })));

/* ── Lightbox ─────────────────────────────────────────── */
function Lightbox({ photo, onClose }: { photo: Photo & { sectionLabel?: string }; onClose: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.88, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.88, opacity: 0 }} transition={{ duration: 0.25 }}
          className="relative max-w-5xl w-full"
          onClick={e => e.stopPropagation()}
        >
          <div className="rounded-2xl overflow-hidden bg-black shadow-2xl">
            <img src={photo.src} alt={photo.caption}
              className="w-full max-h-[78vh] object-contain" />
          </div>
          <div className="mt-4 text-center px-6">
            {photo.sectionLabel && (
              <p className="text-[#f5a623] text-xs font-bold uppercase tracking-widest mb-1">{photo.sectionLabel}</p>
            )}
            <p className="text-white font-semibold text-lg leading-snug">{photo.caption}</p>
          </div>
          <button onClick={onClose} aria-label="Close"
            className="absolute -top-4 -right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors">
            <X size={20} className="text-gray-800" />
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ── Auto-scrolling marquee row ───────────────────────── */
function MarqueeRow({ photos, reverse, onOpen }: {
  photos: (Photo & { sectionLabel?: string })[];
  reverse?: boolean;
  onOpen: (p: Photo & { sectionLabel?: string }) => void;
}) {
  const items = [...photos, ...photos];
  return (
    <div className="gallery-marquee">
      <div
        className={`gallery-marquee-track ${reverse ? 'reverse' : ''}`}
        style={{ '--marquee-duration': `${Math.max(35, photos.length * 4)}s` } as React.CSSProperties}
      >
        {items.map((photo, i) => (
          <figure key={`${i}-${photo.src}`} onClick={() => onOpen(photo)}
            className="w-64 md:w-80 shrink-0 mr-5 cursor-pointer group">
            <div className="relative rounded-xl overflow-hidden shadow-md group-hover:shadow-xl transition-shadow duration-300 aspect-[4/3] bg-gray-100">
              <img src={photo.src} alt={photo.caption} loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                style={{ objectPosition: photo.pos || 'center' }} />
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30 transition-colors duration-300">
                <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity" size={26} />
              </div>
            </div>
            <figcaption className="mt-3 px-1">
              {photo.sectionLabel && (
                <p className="text-[11px] font-bold uppercase tracking-widest text-[#f5a623]">{photo.sectionLabel}</p>
              )}
              <p className="text-sm font-semibold text-gray-800 leading-snug mt-0.5">{photo.caption}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

/* ── Two scrolling rows (All Photos view) ─────────────── */
function ScrollingRows({ photos, onOpen }: {
  photos: (Photo & { sectionLabel?: string })[];
  onOpen: (p: Photo & { sectionLabel?: string }) => void;
}) {
  const mid = Math.ceil(photos.length / 2);
  return (
    <div className="space-y-8">
      <MarqueeRow photos={photos.slice(0, mid)} onOpen={onOpen} />
      <MarqueeRow photos={photos.slice(mid)} reverse onOpen={onOpen} />
    </div>
  );
}

/* ── Photo card ───────────────────────────────────────── */
function PhotoCard({ photo, index, onClick }: { photo: Photo & { sectionLabel?: string }; index: number; onClick: () => void }) {
  return (
    <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} custom={index % 6 * 0.07}
      className="group rounded-2xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white border border-gray-100"
      onClick={onClick}
    >
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img src={photo.src} alt={photo.caption} loading="lazy"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          style={{ objectPosition: photo.pos || 'center' }} />
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30 transition-colors duration-300">
          <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity" size={26} />
        </div>
      </div>
      <div className="p-3">
        {photo.sectionLabel && (
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#f5a623]">{photo.sectionLabel}</p>
        )}
        <p className="text-sm font-semibold text-gray-800 leading-snug mt-0.5 line-clamp-2">{photo.caption}</p>
      </div>
    </motion.div>
  );
}

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [lightboxPhoto, setLightboxPhoto] = useState<(Photo & { sectionLabel?: string }) | null>(null);

  const activeSection = activeFilter === 'all' ? null : sections.find(s => s.id === activeFilter);
  const displayPhotos = activeFilter === 'all' ? ALL_PHOTOS : (activeSection?.photos.map(p => ({ ...p, sectionLabel: activeSection.label })) ?? []);

  return (
    <div className="flex flex-col">

      {/* ── Hero Banner ───────────────────────────────────── */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <img src="/images/events-annual.jpg" alt="MDN Global School Gallery"
          className="absolute inset-0 w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1c46]/65 via-[#0a1c46]/38 to-[#0a1c46]/12" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1c46]/45 via-transparent to-transparent" />

        <div className="container mx-auto px-6 py-24 relative z-10">
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}
            className="inline-flex items-center gap-2 bg-[#f5a623]/20 border border-[#f5a623]/40 rounded-full px-4 py-1.5 text-[#f5a623] text-xs font-bold tracking-widest uppercase mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#f5a623]" /> Life at MDN
          </motion.div>
          <motion.h1 variants={fadeUp} initial="hidden" animate="visible" custom={1}
            className="text-5xl md:text-7xl font-serif font-black text-white leading-tight mb-5"
            style={{ textShadow: '0 4px 24px rgba(0,0,0,0.5)' }}>
            School <span className="text-[#f5a623]">Gallery</span>
          </motion.h1>
          <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={2}
            className="text-white/90 text-lg md:text-xl max-w-2xl leading-relaxed">
            Moments that define us — from classrooms to sports fields, cultural stages to campus corridors.
          </motion.p>

          {/* Stats row */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={3}
            className="mt-10 flex flex-wrap gap-x-6 gap-y-2">
            {sections.map(s => (
              <span key={s.id} className="text-white/70 text-sm font-medium">{s.label}</span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Section Overview Cards ─────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-12">
            <p className="text-[#f5a623] font-bold tracking-widest uppercase text-sm mb-3">Browse by Category</p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#1a3a6b]">Gallery Sections</h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {sections.map((s, i) => (
              <motion.button key={s.id} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i * 0.1}
                onClick={() => { setActiveFilter(s.id); document.getElementById('gallery-grid')?.scrollIntoView({ behavior: 'smooth' }); }}
                className={`group relative rounded-2xl overflow-hidden aspect-square cursor-pointer border-2 transition-all duration-300 hover:scale-105 hover:shadow-xl ${activeFilter === s.id ? 'border-[#f5a623] ring-2 ring-[#f5a623]/30' : 'border-transparent'}`}>
                <img src={s.photos[0].src} alt={s.label}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  style={{ objectPosition: s.photos[0].pos || 'center' }} />
                <div className={`absolute inset-0 bg-gradient-to-t from-black/80 to-black/20`} />
                <div className={`absolute inset-x-0 bottom-0 p-4`}>
                  <p className="text-white font-serif font-bold text-base leading-tight">{s.label}</p>
                  <p className="text-white/60 text-xs mt-0.5">{s.count} Photos</p>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Photo Grid ───────────────────────────────────────── */}
      <section id="gallery-grid" className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-3 mb-12 justify-center">
            <button
              onClick={() => setActiveFilter('all')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-200 ${
                activeFilter === 'all'
                  ? 'bg-[#1a3a6b] text-white shadow-lg shadow-[#1a3a6b]/20'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-[#1a3a6b] hover:text-[#1a3a6b]'
              }`}
            >
              <Images size={15} /> All Photos <span className="opacity-60">({ALL_PHOTOS.length})</span>
            </button>
            {sections.map(s => (
              <button key={s.id}
                onClick={() => setActiveFilter(s.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-200 ${
                  activeFilter === s.id
                    ? 'bg-[#1a3a6b] text-white shadow-lg shadow-[#1a3a6b]/20'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-[#1a3a6b] hover:text-[#1a3a6b]'
                }`}
              >
                {s.label} <span className="opacity-60">({s.count})</span>
              </button>
            ))}
          </div>

          {/* Section Title */}
          {activeFilter !== 'all' && activeSection && (
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-10 text-center">
              <h3 className="text-2xl font-serif font-bold text-[#1a3a6b]">{activeSection.label}</h3>
              <p className="text-gray-500 text-sm mt-1">{activeSection.count} photos</p>
            </motion.div>
          )}

          {/* Photos — scrolling rows for All, grid for a category */}
          <AnimatePresence mode="wait">
            <motion.div key={activeFilter}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {activeFilter === 'all' ? (
                <ScrollingRows photos={displayPhotos} onOpen={setLightboxPhoto} />
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {displayPhotos.map((photo, i) => (
                    <PhotoCard key={`${activeFilter}-${i}`} photo={photo} index={i}
                      onClick={() => setLightboxPhoto(photo)} />
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── Section-by-Section Showcase ──────────────────────── */}
      {activeFilter === 'all' && sections.map((section, si) => (
        <section key={section.id} className={si % 2 === 0 ? 'py-16 bg-white' : 'py-16 bg-gray-50'}>
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-baseline gap-3 flex-wrap">
                <h3 className="text-2xl font-serif font-bold text-[#1a3a6b]">{section.label}</h3>
                <span className="text-gray-400 text-sm">·  {section.count} Photos</span>
              </div>
              <button
                onClick={() => { setActiveFilter(section.id); document.getElementById('gallery-grid')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="text-sm font-semibold text-[#1a3a6b] hover:text-[#f5a623] transition-colors flex items-center gap-1"
              >
                View all →
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {section.photos.map((photo, i) => (
                <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} custom={i * 0.07}
                  className={`group rounded-xl overflow-hidden cursor-pointer shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 bg-white border border-gray-100 ${
                    i === 0 ? 'col-span-2 row-span-1' : ''
                  }`}
                  onClick={() => setLightboxPhoto({ ...photo, sectionLabel: section.label })}
                >
                  <div className={`relative overflow-hidden bg-gray-100 ${i === 0 ? 'aspect-video' : 'aspect-square'}`}>
                    <img src={photo.src} alt={photo.caption} loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      style={{ objectPosition: photo.pos || 'center' }} />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                      <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity" size={22} />
                    </div>
                  </div>
                  <p className="px-3 py-2 text-xs font-semibold text-gray-700 leading-snug">{photo.caption}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* ── CTA ─────────────────────────────────────────────── */}
      <section className="py-20 bg-[#1a3a6b]">
        <div className="container mx-auto px-6 text-center">
          <motion.h2 variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
            Want to Be Part of These Moments?
          </motion.h2>
          <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1}
            className="text-white/60 text-lg mb-8 max-w-xl mx-auto">
            Admissions are open for the 2025–26 session.
          </motion.p>
          <motion.a href="/contact" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2}
            className="inline-block bg-[#f5a623] text-[#1a3a6b] px-10 py-4 rounded-full font-bold text-lg hover:bg-yellow-400 transition-all hover:scale-105 shadow-xl">
            Enquire Now
          </motion.a>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxPhoto && <Lightbox photo={lightboxPhoto} onClose={() => setLightboxPhoto(null)} />}
    </div>
  );
}
