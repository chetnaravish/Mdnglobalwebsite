import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Academics', path: '/academics' },
    { name: 'Facilities', path: '/facilities' },
    { name: 'Events', path: '/events' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <div className="flex min-h-screen flex-col font-sans">
      <header
        className="fixed top-0 left-0 right-0 z-50 bg-[#1a3a6b] text-white shadow-lg py-3 border-b border-white/10"
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 z-50 shrink-0" data-testid="link-logo">
            <img
              src="/images/mdn-logo.jfif"
              alt="MDN Global School Kaithal"
              className="h-16 md:h-20 w-auto object-contain"
              style={{ filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.35))' }}
            />
            <span className="text-white font-bold text-base md:text-lg leading-tight whitespace-nowrap tracking-wide">
              MDN Global School Kaithal
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-[#f5a623] relative py-1',
                  location === link.path ? 'text-[#f5a623]' : 'text-white'
                )}
                data-testid={`nav-link-${link.name.toLowerCase()}`}
              >
                {link.name}
                {location === link.path && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#f5a623]"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden z-50 p-2 text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
            data-testid="button-mobile-menu"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-[#1a3a6b] flex flex-col pt-24 px-6 pb-6 overflow-y-auto"
          >
            <nav className="flex flex-col gap-6 text-center">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={cn(
                    'text-2xl font-serif text-white hover:text-[#f5a623] transition-colors',
                    location === link.path && 'text-[#f5a623] font-bold'
                  )}
                  data-testid={`mobile-nav-link-${link.name.toLowerCase()}`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="mt-8 pt-8 border-t border-white/20">
                <Link
                  href="/contact"
                  className="inline-block bg-[#f5a623] text-[#1a3a6b] px-8 py-3 rounded-full text-lg font-bold w-full shadow-lg"
                  data-testid="button-mobile-admissions"
                >
                  Apply Now
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-1 flex flex-col">
        {children}
      </main>

      <footer className="bg-[#1a3a6b] text-white pt-16 pb-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
            <div>
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src="/images/mdn-logo.jfif"
                    alt="MDN Global School Kaithal"
                    className="h-20 w-auto object-contain shrink-0"
                    style={{ filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.4))' }}
                  />
                  <div>
                    <span className="text-lg font-bold text-white leading-tight block">MDN Global School Kaithal</span>
                    <div className="inline-block border border-white/30 rounded px-2 py-0.5 text-xs font-semibold text-[#f5a623] mt-1">
                      Affiliated to CBSE
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-white/70 text-sm leading-relaxed mb-6">
                Empowering minds and shaping futures. We provide a holistic educational environment that nurtures intellectual, physical, and emotional growth.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#f5a623] hover:text-[#1a3a6b] transition-colors">
                  <Facebook size={18} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#f5a623] hover:text-[#1a3a6b] transition-colors">
                  <Twitter size={18} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#f5a623] hover:text-[#1a3a6b] transition-colors">
                  <Instagram size={18} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#f5a623] hover:text-[#1a3a6b] transition-colors">
                  <Linkedin size={18} />
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-serif font-bold mb-6 border-b border-white/20 pb-2 inline-block">Follow Us</h3>
              <ul className="space-y-4">
                <li>
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                    className="text-white/70 hover:text-[#f5a623] transition-colors flex items-center gap-3 group">
                    <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[#f5a623] group-hover:text-[#1a3a6b] transition-colors shrink-0">
                      <Facebook size={15} />
                    </span>
                    <span>Facebook</span>
                  </a>
                </li>
                <li>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                    className="text-white/70 hover:text-[#f5a623] transition-colors flex items-center gap-3 group">
                    <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[#f5a623] group-hover:text-[#1a3a6b] transition-colors shrink-0">
                      <Instagram size={15} />
                    </span>
                    <span>Instagram</span>
                  </a>
                </li>
                <li>
                  <a href="https://mdnglobalschool.com" target="_blank" rel="noopener noreferrer"
                    className="text-white/70 hover:text-[#f5a623] transition-colors flex items-center gap-3 group">
                    <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[#f5a623] group-hover:text-[#1a3a6b] transition-colors shrink-0">
                      <Globe size={15} />
                    </span>
                    <span>Official Website</span>
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-serif font-bold mb-6 border-b border-white/20 pb-2 inline-block">Contact Info</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin className="text-[#f5a623] shrink-0 mt-1" size={18} />
                  <span className="text-white/70 text-sm leading-relaxed">
                    MDN Global School,<br />
                    Deod Kheri Road, Kaithal,<br />
                    Haryana – 136027
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="text-[#f5a623] shrink-0" size={18} />
                  <a href="tel:+918708771586" className="text-white/70 text-sm hover:text-[#f5a623] transition-colors">+91 87087 71586</a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="text-[#f5a623] shrink-0" size={18} />
                  <span className="text-white/70 text-sm">info@mdnglobalschool.com</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row items-center justify-between text-white/50 text-xs">
            <p>&copy; {new Date().getFullYear()} MDN Global School Kaithal. All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
