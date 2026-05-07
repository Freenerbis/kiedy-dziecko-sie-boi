'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Star, X } from 'lucide-react';

export default function StickyBar() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (!dismissed) setVisible(window.scrollY > 600);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [dismissed]);

  return (
    <AnimatePresence>
      {visible && !dismissed && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-0 left-0 right-0 z-50"
        >
          {/* Blur backdrop */}
          <div className="bg-forest/95 backdrop-blur-md border-t border-white/10 px-4 py-3 md:py-4 shadow-2xl shadow-black/40">
            <div className="max-w-5xl mx-auto flex items-center gap-4 justify-between">

              {/* Left: info */}
              <div className="hidden md:flex items-center gap-5 flex-shrink-0">
                <div className="flex items-center gap-1.5 text-sage/70 text-xs">
                  <Star className="w-3.5 h-3.5 text-coral fill-coral" />
                  <span>4.9/5 · 2 847 mam</span>
                </div>
                <div className="w-px h-4 bg-white/10" />
                <div className="flex items-center gap-1.5 text-sage/70 text-xs">
                  <ShieldCheck className="w-3.5 h-3.5 text-sage" />
                  <span>30 dni gwarancji zwrotu</span>
                </div>
              </div>

              {/* Center: headline */}
              <div className="flex-1 md:text-center">
                <p className="text-white text-sm font-semibold leading-snug">
                  <span className="text-coral">Twoje dziecko potrzebuje Cię teraz</span>
                  <span className="text-white/50 font-normal hidden sm:inline"> — nie za 3 miesiące.</span>
                </p>
                <p className="text-sage/50 text-xs mt-0.5 hidden md:block">
                  🔥 Dziś kupiło już 23 mamy
                </p>
              </div>

              {/* Right: CTA + dismiss */}
              <div className="flex items-center gap-3 flex-shrink-0">
                <a
                  href="#oferta"
                  onClick={() => setVisible(false)}
                  className="inline-flex items-center gap-2 bg-coral hover:bg-coral-dark text-white font-bold text-sm px-5 py-2.5 rounded-xl transition-all hover:scale-105 active:scale-95 shadow-lg shadow-coral/30 whitespace-nowrap"
                >
                  Chcę plan — 74 zł
                </a>
                <button
                  onClick={() => setDismissed(true)}
                  className="text-white/30 hover:text-white/60 transition-colors p-1"
                  aria-label="Zamknij"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
