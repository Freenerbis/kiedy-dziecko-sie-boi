'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Heart } from 'lucide-react';
import Link from 'next/link';

export default function SukcesPage() {
  useEffect(() => {
    const trackPurchase = () => {
      if (typeof window !== 'undefined' && (window as any).fbq) {
        (window as any).fbq('track', 'Purchase', {
          value: 74,
          currency: 'PLN',
        });
      } else {
        setTimeout(trackPurchase, 500);
      }
    };
    trackPurchase();
  }, []);

  return (
    <div className="min-h-screen bg-forest flex items-center justify-center px-4 relative overflow-hidden">

      {/* Blobs */}
      <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(139,181,160,0.2) 0%, transparent 70%)' }} />
      <div className="absolute bottom-[-10%] left-[-5%] w-[300px] h-[300px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(232,97,74,0.15) 0%, transparent 70%)' }} />

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative bg-white rounded-3xl p-8 md:p-12 max-w-lg w-full text-center shadow-2xl shadow-black/30"
      >
        {/* Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 200, damping: 15 }}
          className="w-20 h-20 bg-forest rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-forest/30"
        >
          <Heart className="w-9 h-9 text-coral fill-coral" />
        </motion.div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <h1 className="font-display text-3xl md:text-4xl text-forest font-black mb-3">
            Dziękuję za zakup!
          </h1>
          <p className="text-forest/60 text-base leading-relaxed mb-8">
            Za chwilę otrzymasz maila z linkiem do pobrania. Możesz też pobrać ebook bezpośrednio teraz:
          </p>
        </motion.div>

        {/* Email info */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.5 }}
          className="bg-sage/10 border border-sage/20 rounded-2xl px-6 py-5 mb-6"
        >
          <p className="text-forest text-base font-semibold mb-1">📧 Sprawdź swoją skrzynkę</p>
          <p className="text-forest/60 text-sm leading-relaxed">
            Wysłaliśmy Ci email z linkiem do pobrania ebooka. Powinien przyjść w ciągu <strong>kilku minut</strong>.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="bg-cream rounded-xl px-5 py-4 mb-6 text-left"
        >
          <p className="text-forest/50 text-xs leading-relaxed">
            Nie widzisz maila? Sprawdź folder <strong>spam</strong> lub <strong>oferty</strong>. Jeśli nadal nic nie ma — napisz na{' '}
            <a href="mailto:kontakt@pomocemocjonalna.pl" className="text-coral underline">
              kontakt@pomocemocjonalna.pl
            </a>
          </p>
        </motion.div>

        {/* Trust */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex items-center justify-center gap-2 text-forest/40 text-xs"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-sage" />
          30 dni gwarancji zwrotu · kontakt@pomocemocjonalna.pl
        </motion.div>

        {/* Back link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-6"
        >
          <Link href="/" className="text-forest/30 text-xs hover:text-forest/60 transition-colors">
            ← Wróć do strony głównej
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
