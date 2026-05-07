'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, BookOpen } from 'lucide-react';
import Container from '@/components/ui/Container';
import { EBOOK } from '@/lib/constants';

const NAV_LINKS = [
  { label: 'Dla kogo', href: '#dla-kogo' },
  { label: 'Co w środku', href: '#co-w-srodku' },
  { label: 'Opinie', href: '#opinie' },
  { label: 'FAQ', href: '#faq' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-forest/90 backdrop-blur-md border-b border-white/10 py-3 shadow-xl shadow-black/20'
            : 'bg-transparent py-5'
        }`}
      >
        <Container className="flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-coral rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
              <BookOpen className="w-4 h-4 text-white" />
            </div>
            <span className="font-display text-white font-semibold text-sm leading-tight hidden sm:block">
              Pierwsza Pomoc<br />
              <span className="text-sage text-xs font-normal">Emocjonalna</span>
            </span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sage/80 hover:text-white text-sm transition-colors underline-hover"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <a
              href="#oferta"
              className="hidden md:inline-flex items-center gap-2 bg-coral hover:bg-coral-dark text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg shadow-coral/30"
            >
              Kup ebooka — {EBOOK.price} zł
            </a>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Menu"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </Container>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed top-16 left-0 right-0 z-40 bg-forest/95 backdrop-blur-lg border-b border-white/10 md:hidden"
          >
            <Container className="py-6 flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-sage text-base py-2 border-b border-white/10 hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#oferta"
                onClick={() => setMenuOpen(false)}
                className="mt-2 bg-coral text-white font-semibold py-3 px-6 rounded-full text-center hover:bg-coral-dark transition-colors"
              >
                {EBOOK.ctaText}
              </a>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
