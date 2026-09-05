import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, Images } from 'lucide-react';
import SEOHead from '@/components/SEOHead';

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } })
};

/* ── Gallery data ─────────────────────────────────────── */
type Photo = { src: string; caption: string; pos?: string };
type Section = { id: string; label: string; desc: string; color: string; count: number; photos: Photo[] };

const sections: Section[] = [
  {
    id: 'campus',
    label: 'Campus Images',
    desc: 'Explore our sprawling campus with modern infrastructure and green surroundings',
    color: 'bg-blue-600',
    count: 7,
    photos: [
      { src: '/images/mdn-building-2.jfif', caption: 'MDN Global School — Main Building', pos: 'center center' },
      { src: '/images/mdn-building-3.jfif', caption: 'Aerial View — School Campus & Sports Ground', pos: 'center center' },
      { src: '/images/mdn-building-1.avif', caption: 'MDN Global School — Campus Overview', pos: 'center center' },
      { src: '/images/mdn-building-4.avif', caption: 'School Building — Drone View', pos: 'center center' },
      { src: '/images/pre-primary-kids.png', caption: 'Pre-Primary Students — Classroom Learning', pos: 'center center' },
      { src: '/images/primary-kids.png', caption: 'Primary Students — Playground Fun', pos: 'center center' },
      { src: '/images/students-happy.jpg', caption: 'Students During Break Time', pos: 'center top' },
    ]
  },
  {
    id: 'sports',
    label: 'Sports Images',
    desc: 'Our students shine in cricket, football, basketball and athletics',
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
    desc: 'Vibrant cultural celebrations, annual functions and festive moments',
    color: 'bg-purple-600',
    count: 7,
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
    desc: 'Smart classrooms, science labs and dedicated learning spaces',
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
    desc: 'World-class facilities including library, labs and activity rooms',
    color: 'bg-rose-600',
    count: 7,
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

/* ── Single Image Slideshow (manual scroll with arrows) ─ */
function SlideshowSection({ section, onOpen }: {
  section: Section;
  onOpen: (p: Photo & { sectionLabel?: string }) => void;
}) {
  const [current, setCurrent] = useState(0);
  const total = section.photos.length;

  const goNext = useCallback(() => setCurrent(p => (p + 1) % total), [total]);
  const goPrev = useCallback(() => setCurrent(p => (p - 1 + total) % total), [total]);

  const handleClick = useCallback(() => {
    onOpen({ ...section.photos[current], sectionLabel: section.label });
  }, [current, section, onOpen]);

  const photo = section.photos[current];

  return (
    <motion.section
      variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}
      className="py-10 md:py-14"
    >
      <div className="container mx-auto px-6">
        {/* Centered Section Heading */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#1a3a6b]">{section.label}</h2>
          <p className="text-gray-500 text-sm mt-2 max-w-md mx-auto">{section.desc}</p>
        </div>

        {/* Slideshow with arrows */}
        <div className="relative max-w-4xl mx-auto">
          {/* Left Arrow */}
          <button
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 w-10 h-10 rounded-full bg-white/90 hover:bg-white shadow-lg flex items-center justify-center transition-all hover:scale-110 border border-gray-200"
            aria-label="Previous image"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#1a3a6b]">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Right Arrow */}
          <button
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 w-10 h-10 rounded-full bg-white/90 hover:bg-white shadow-lg flex items-center justify-center transition-all hover:scale-110 border border-gray-200"
            aria-label="Next image"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#1a3a6b]">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          {/* Image Container */}
          <div
            className="relative rounded-2xl overflow-hidden shadow-xl cursor-pointer bg-gray-100"
            style={{ aspectRatio: '16/9' }}
            onClick={handleClick}
          >
            {section.photos.map((p, i) => (
              <img
                key={`${section.id}-${i}`}
                src={p.src}
                alt={p.caption}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ease-in-out"
                style={{
                  objectPosition: p.pos || 'center',
                  opacity: i === current ? 1 : 0,
                }}
              />
            ))}

            {/* Caption overlay */}
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-5 md:p-6 z-10">
              <p className="text-white font-semibold text-base md:text-lg leading-snug drop-shadow-lg">{photo.caption}</p>
              <p className="text-white/60 text-xs mt-1">{current + 1} / {total}</p>
            </div>

            {/* Zoom icon on hover */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/20 transition-colors duration-300 z-10">
              <div className="opacity-0 hover:opacity-100 transition-opacity bg-white/20 backdrop-blur-sm rounded-full p-3">
                <ZoomIn className="text-white" size={28} />
              </div>
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-4">
            {section.photos.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === current ? 'w-6 h-1.5 bg-[#f5a623]' : 'w-1.5 h-1.5 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}

export default function Gallery() {
  const [lightboxPhoto, setLightboxPhoto] = useState<(Photo & { sectionLabel?: string }) | null>(null);

  return (
    <div className="flex flex-col">
      <SEOHead
        title="Gallery"
        path="/gallery"
        description="View the MDN Global School Kaithal photo gallery — campus, sports, cultural events, academic life, and world-class facilities captured in moments."
      />

      {/* ── Hero Banner ───────────────────────────────────── */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <img src="/images/events-annual.jpg" alt="Annual day cultural celebration at MDN Global School Kaithal"
          className="absolute inset-0 w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1c46]/65 via-[#0a1c46]/38 to-[#0a1c46]/12" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1c46]/45 via-transparent to-transparent" />

        <div className="container mx-auto px-6 py-24 relative z-10">
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}
            className="inline-flex items-center gap-2 bg-[#f5a623]/20 border border-[#f5a623]/40 rounded-full px-4 py-1.5 text-[#f5a623] text-xs font-bold tracking-widest uppercase mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#f5a623]" /> Life at MDN
          </motion.div>
          <motion.h1 variants={fadeUp} initial="hidden" animate="visible" custom={1}
            className="text-3xl sm:text-5xl md:text-7xl font-serif font-black text-white leading-tight mb-5"
            style={{ textShadow: '0 4px 24px rgba(0,0,0,0.5)' }}>
            School <span className="text-[#f5a623]">Gallery</span>
          </motion.h1>
          <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={2}
            className="text-white/90 text-lg md:text-xl max-w-2xl leading-relaxed">
            Moments that define us — from classrooms to sports fields, cultural stages to campus corridors.
          </motion.p>

          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={3}
            className="mt-10 flex flex-wrap gap-x-6 gap-y-2">
            {sections.map(s => (
              <span key={s.id} className="text-white/70 text-sm font-medium">{s.label}</span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── All Photos Scrolling Marquee (2 rows) ──────────── */}
      <section className="py-14 md:py-20 bg-white">
        <div className="container mx-auto px-6 mb-10">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-[#1a3a6b]/10 rounded-full px-4 py-1.5 mb-4">
              <Images size={16} className="text-[#1a3a6b]" />
              <span className="text-[#1a3a6b] text-xs font-bold uppercase tracking-widest">Auto Scrolling</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#1a3a6b]">All Gallery Images</h2>
          </motion.div>
        </div>
        <ScrollingRows photos={ALL_PHOTOS} onOpen={setLightboxPhoto} />
      </section>

      {/* ── Individual Sections — One image at a time ──────── */}
      <section className="py-10 md:py-16 bg-gray-50">
        <div className="container mx-auto px-6 mb-8">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#1a3a6b]">Browse by Category</h2>
          </motion.div>
        </div>

        {sections.map((section) => (
          <SlideshowSection key={section.id} section={section} onOpen={setLightboxPhoto} />
        ))}
      </section>

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
