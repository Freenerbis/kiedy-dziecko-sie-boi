'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, BookOpen } from 'lucide-react';
import { EBOOK } from '@/lib/constants';

const STORAGE_KEY = 'exit_intent_dismissed_v2';
const DISMISS_TTL_MS = 24 * 60 * 60 * 1000;

function isDismissed(): boolean {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return false;
    const ts = parseInt(stored, 10);
    return Date.now() - ts < DISMISS_TTL_MS;
  } catch {
    return false;
  }
}

export default function ExitIntentPopup() {
  const [visible, setVisible] = useState(false);

  const dismiss = useCallback(() => {
    setVisible(false);
    try { localStorage.setItem(STORAGE_KEY, String(Date.now())); } catch {}
  }, []);

  useEffect(() => {
    if (isDismissed()) return;

    let fired = false;

    const fire = () => {
      if (fired) return;
      fired = true;
      setVisible(true);
    };

    // Desktop: exit intent via mouse leaving top of viewport
    const onMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 10) fire();
    };

    // Mobile: scroll-up detection (user scrolls back to top — intent to leave)
    let lastScrollY = window.scrollY;
    let scrollUpStartY = window.scrollY;
    const onScroll = () => {
      const currentY = window.scrollY;
      if (currentY < lastScrollY) {
        // Scrolling up
        if (scrollUpStartY - currentY > 150 && currentY < 400) {
          fire();
        }
      } else {
        scrollUpStartY = currentY;
      }
      lastScrollY = currentY;
    };

    // Fallback: show after 90s of inactivity (desktop & mobile)
    const inactivityTimer = setTimeout(fire, 90_000);

    const desktopTimer = setTimeout(() => {
      document.addEventListener('mouseleave', onMouseLeave);
    }, 8_000);

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      clearTimeout(desktopTimer);
      clearTimeout(inactivityTimer);
      document.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[80] bg-black/50 backdrop-blur-sm"
            onClick={dismiss}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[90] flex items-center justify-center px-4 pointer-events-none"
          >
            <div className="relative bg-white rounded-3xl shadow-2xl shadow-black/20 max-w-md w-full pointer-events-auto overflow-hidden">

              {/* Forest top strip */}
              <div className="bg-forest px-8 pt-8 pb-6 relative">
                {/* Close button */}
                <button
                  onClick={dismiss}
                  className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
                  aria-label="Zamknij"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Icon */}
                <div className="w-12 h-12 bg-coral rounded-2xl flex items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>

                <p className="text-sage/80 text-xs font-semibold tracking-widest uppercase mb-2">
                  Zaczekaj chwilę
                </p>
                <h2 className="font-display text-white text-2xl font-black leading-tight">
                  Twoje dziecko czeka.<br />
                  <span className="text-coral">Ty masz plan?</span>
                </h2>
              </div>

              {/* Body */}
              <div className="px-8 py-6">
                <p className="text-forest/65 text-sm leading-relaxed mb-5">
                  Większość mam wychodzi z tej strony z tym samym co weszła —
                  <strong className="text-forest"> bezradnością</strong>. Zanim to zrobisz,
                  przypomnij sobie dlaczego tu przyszłaś.
                </p>

                <ul className="flex flex-col gap-2 mb-6">
                  {[
                    'System sygnalizacji: żółty / pomarańczowy / czerwony',
                    'Gotowe zdania na najtrudniejsze rozmowy',
                    'Plan dnia dla rodziny w kryzysie',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-forest/75">
                      <span className="w-4 h-4 bg-coral/15 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="w-1.5 h-1.5 bg-coral rounded-full block" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>

                {/* Value reminder */}
                <div className="flex items-center justify-between bg-sage/10 rounded-xl px-4 py-2.5 mb-4 text-xs">
                  <span className="text-forest/60">Ebook — 16 rozdziałów</span>
                  <div className="flex items-center gap-2">
                    <span className="text-forest/40 line-through">127 zł</span>
                    <span className="text-coral font-bold text-sm">74 zł</span>
                  </div>
                </div>

                {/* CTA */}
                <a
                  href="https://buy.stripe.com/cNi28r3nn2Z7cJr500a7C00"
                  onClick={dismiss}
                  className="block w-full text-center bg-coral hover:bg-coral-dark text-white font-bold text-base py-4 rounded-2xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-coral/30 mb-3"
                >
                  Chcę wiedzieć co mówić — 74 zł
                </a>

                <div className="flex items-center justify-center gap-1.5 text-forest/40 text-xs">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  30 dni gwarancji zwrotu bez pytań
                </div>

                <button
                  onClick={dismiss}
                  className="block w-full text-center text-forest/30 hover:text-forest/50 text-xs mt-4 transition-colors"
                >
                  Nie, dziękuję — wychodzę bez planu
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
