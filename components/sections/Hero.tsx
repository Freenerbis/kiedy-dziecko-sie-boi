'use client';

import { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ShieldCheck, Star, ArrowDown } from 'lucide-react';
import Container from '@/components/ui/Container';
import MagneticButton from '@/components/animations/MagneticButton';
import { EBOOK } from '@/lib/constants';

const H1_LINES = ['Boisz się', 'powiedzieć', 'złe słowo.'];

export default function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spotX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const spotY = useSpring(mouseY, { stiffness: 40, damping: 20 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [mouseX, mouseY]);

  const spotBg = useTransform(
    [spotX, spotY],
    ([x, y]: number[]) =>
      `radial-gradient(700px circle at ${x}px ${y}px, rgba(139,181,160,0.07) 0%, transparent 60%)`
  );

  return (
    <section id="hero" className="relative min-h-screen bg-forest overflow-hidden flex items-center pt-20">
      {/* Blobs */}
      <motion.div
        className="absolute top-[-15%] right-[-8%] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(139,181,160,0.25) 0%, transparent 70%)' }}
        animate={{ scale: [1, 1.15, 1], x: [0, 25, 0], y: [0, -15, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(232,97,74,0.18) 0%, transparent 70%)' }}
        animate={{ scale: [1, 1.25, 1], x: [0, -15, 0], y: [0, 18, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
      <motion.div
        className="absolute top-[40%] left-[20%] w-[300px] h-[300px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(139,181,160,0.08) 0%, transparent 70%)' }}
        animate={{ scale: [1, 1.3, 1], y: [0, -30, 0] }}
        transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
      />

      {/* Spotlight */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ background: spotBg }} />

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.15) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />
      <div className="absolute inset-0 noise-overlay opacity-[0.025] pointer-events-none" />

      <Container className="relative z-10 py-20 md:py-28 lg:py-32">
        <div className="max-w-4xl mx-auto text-center">

          {/* Tag */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2.5 bg-white/10 backdrop-blur-sm border border-white/15 rounded-full px-4 py-2 mb-10"
          >
            <motion.span
              className="w-2 h-2 bg-coral rounded-full"
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-sm text-sage font-medium">Dołącz do <strong className="text-white">2 847 mam</strong>, które nie czekają biernie</span>
          </motion.div>

          {/* H1 */}
          <h1 className="font-display font-black italic text-6xl md:text-7xl xl:text-8xl text-white leading-[1.0] tracking-tight mb-8">
            {H1_LINES.map((line, i) => (
              <span key={i} className="block overflow-hidden pb-3">
                <motion.span
                  className="block"
                  initial={{ y: '105%', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.85, delay: 0.25 + i * 0.14, ease: [0.16, 1, 0.3, 1] }}
                >
                  {i === 2 ? (
                    <>złe słowo<span className="text-coral">.</span></>
                  ) : line}
                </motion.span>
              </span>
            ))}
          </h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="text-sage/85 text-xl md:text-2xl leading-relaxed mb-10 max-w-2xl mx-auto"
          >
            Termin u psychologa za 3 miesiące. Twoje dziecko się zamknęło. Ten ebook daje Ci{' '}
            <span className="text-white font-semibold">gotowe zdania i konkretny plan</span>{' '}
            — na każdy dzień oczekiwania.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.05 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
          >
            <MagneticButton strength={0.25}>
              <a
                href="#oferta"
                className="group relative inline-flex items-center gap-3 bg-coral hover:bg-coral-dark text-white font-bold text-lg px-10 py-5 rounded-2xl transition-all duration-200 hover:scale-105 active:scale-95 shadow-2xl shadow-coral/40 animate-pulse-glow overflow-hidden"
              >
                <span className="relative z-10">{EBOOK.ctaText}</span>
                <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </a>
            </MagneticButton>
            <div className="text-sage/60 text-sm">
              Cena regularna:{' '}
              <span className="line-through text-sage/50">{EBOOK.originalPrice} zł</span>
            </div>
          </motion.div>

          {/* Trust */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="flex flex-wrap items-center justify-center gap-5"
          >
            <div className="flex items-center gap-1.5 text-sage/60 text-sm">
              <ShieldCheck className="w-4 h-4 text-sage" />
              {EBOOK.guarantee} dni gwarancji zwrotu
            </div>
            <div className="w-px h-4 bg-white/15 hidden sm:block" />
            <div className="flex items-center gap-1.5 text-sage/60 text-sm">
              <Star className="w-4 h-4 text-coral fill-coral" />
              4.9/5 — 2 847 mam
            </div>
            <div className="w-px h-4 bg-white/15 hidden sm:block" />
            <div className="text-sage/60 text-sm">Pobierasz natychmiast po zakupie</div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="flex flex-col items-center mt-20 gap-2"
        >
          <span className="text-sage/40 text-xs tracking-widest uppercase">Przewiń</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowDown className="w-4 h-4 text-sage/40" />
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
