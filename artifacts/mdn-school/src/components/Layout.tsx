import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
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
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <div className="flex min-h-screen flex-col font-sans">
      <header
        className="fixed top-0 left-0 right-0 z-50 bg-[#1a3a6b] text-white shadow-lg py-3 border-b border-white/10"
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center z-50 shrink-0" data-testid="link-logo">
            <img
              src="/images/mdn-logo.svg"
              alt="MDN Global School Kaithal"
              className="h-12 md:h-14 w-auto"
              style={{ filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.35))' }}
            />
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="mb-6">
                <span className="text-3xl font-serif font-bold block mb-1">MDN</span>
                <span className="text-xs font-bold tracking-widest uppercase opacity-100 text-[#f5a623] block mb-4">Global School Kaithal</span>
                <div className="inline-block border border-white/30 rounded px-3 py-1 text-xs font-semibold text-white">
                  Affiliated to CBSE
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
              <h3 className="text-lg font-serif font-bold mb-6 border-b border-white/20 pb-2 inline-block">Quick Links</h3>
              <ul className="space-y-3">
                {navLinks.map((link) => (
                  <li key={link.path}>
                    <Link href={link.path} className="text-white/70 hover:text-[#f5a623] transition-colors flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#f5a623]"></span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-serif font-bold mb-6 border-b border-white/20 pb-2 inline-block">Academics</h3>
              <ul className="space-y-3">
                <li><Link href="/academics" className="text-white/70 hover:text-[#f5a623] transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#f5a623]"></span>Pre-Primary</Link></li>
                <li><Link href="/academics" className="text-white/70 hover:text-[#f5a623] transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#f5a623]"></span>Primary</Link></li>
                <li><Link href="/academics" className="text-white/70 hover:text-[#f5a623] transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#f5a623]"></span>Middle School</Link></li>
                <li><Link href="/academics" className="text-white/70 hover:text-[#f5a623] transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#f5a623]"></span>Secondary</Link></li>
                <li><Link href="/academics" className="text-white/70 hover:text-[#f5a623] transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#f5a623]"></span>Senior Secondary</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-serif font-bold mb-6 border-b border-white/20 pb-2 inline-block">Contact Info</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin className="text-[#f5a623] shrink-0 mt-1" size={18} />
                  <span className="text-white/70 text-sm leading-relaxed">
                    MDN Global School,<br />
                    Kaithal, Haryana,<br />
                    India
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="text-[#f5a623] shrink-0" size={18} />
                  <span className="text-white/70 text-sm">+91 XXXXXXXXXX</span>
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
