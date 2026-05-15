'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Download } from 'lucide-react';
import Container from '@/components/ui/Container';
import MagneticButton from '@/components/animations/MagneticButton';
import { EBOOK } from '@/lib/constants';

export default function FinalCTA() {
  return (
    <section className="py-24 md:py-36 bg-forest relative overflow-hidden">
      {/* Aurora background */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: [
            'radial-gradient(ellipse at 30% 50%, rgba(139,181,160,0.2) 0%, transparent 60%), radial-gradient(ellipse at 70% 50%, rgba(232,97,74,0.12) 0%, transparent 60%)',
            'radial-gradient(ellipse at 70% 30%, rgba(139,181,160,0.2) 0%, transparent 60%), radial-gradient(ellipse at 30% 70%, rgba(232,97,74,0.12) 0%, transparent 60%)',
            'radial-gradient(ellipse at 30% 50%, rgba(139,181,160,0.2) 0%, transparent 60%), radial-gradient(ellipse at 70% 50%, rgba(232,97,74,0.12) 0%, transparent 60%)',
          ],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="absolute inset-0 noise-overlay opacity-[0.025] pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.15) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      <Container className="relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mx-auto"
        >
          {/* Tag */}
          <div className="inline-flex items-center gap-2 bg-white/10 text-sage text-xs font-semibold px-4 py-2 rounded-full mb-8 tracking-wide uppercase border border-white/10">
            Twój następny krok
          </div>

          {/* Headline */}
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-white leading-tight tracking-tight mb-6 font-black italic">
            Twoje dziecko potrzebuje Cię{' '}
            <span className="relative inline-block">
              <span className="relative z-10 text-coral">teraz</span>
              <motion.span
                className="absolute inset-x-0 bottom-0 h-[3px] bg-coral/40 rounded-full"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                style={{ originX: 0 }}
              />
            </span>
            .
          </h2>

          <p className="text-sage/80 text-lg md:text-xl leading-relaxed mb-4 max-w-2xl mx-auto">
            Nie musisz być psychologiem, żeby pomóc swojemu dziecku przetrwać ten czas.
            Musisz tylko wiedzieć co robić. Ten ebook Ci to pokaże.
          </p>
          <p className="text-sage/50 text-base mb-10">
            74 zł. Mniej niż jedna wizyta. Pobierasz natychmiast.
          </p>

          {/* CTA */}
          <MagneticButton strength={0.2} className="mb-6">
            <a
              href="https://buy.stripe.com/cNi28r3nn2Z7cJr500a7C00"
              className="group relative inline-flex items-center gap-3 bg-coral hover:bg-coral-dark text-white font-bold text-lg md:text-xl px-10 py-5 rounded-2xl transition-all duration-200 hover:scale-105 active:scale-95 shadow-2xl shadow-coral/40 animate-pulse-glow overflow-hidden"
            >
              <Download className="w-5 h-5 relative z-10" />
              <span className="relative z-10">{EBOOK.ctaText}</span>
              <span className="absolute inset-0 bg-white/15 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </a>
          </MagneticButton>

          {/* Trust */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sage/50 text-sm">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-sage/60" />
              30 dni gwarancji zwrotu bez pytań
            </div>
            <div className="hidden sm:block w-px h-4 bg-white/10" />
            <div>Pobierasz natychmiast po zakupie</div>
            <div className="hidden sm:block w-px h-4 bg-white/10" />
            <div>
              Cena regularna:{' '}
              <span className="line-through text-sage/35">{EBOOK.originalPrice} zł</span>
            </div>
          </div>
        </motion.div>

        {/* Bottom quote */}
        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-20 max-w-xl mx-auto border-l-2 border-coral/40 pl-6 text-left"
        >
          <p className="text-sage/60 text-sm leading-relaxed italic">
            &ldquo;Czekałam 4 miesiące na wizytę i nie wiedziałam co z sobą zrobić. Ta książka dała mi konkretny plan na każdy dzień. Pierwszy raz od tygodni poczułam, że wiem co robię.&rdquo;
          </p>
          <cite className="text-sage/40 text-xs mt-3 block not-italic">
            — Agnieszka K., mama 13-latki
          </cite>
        </motion.blockquote>
      </Container>
    </section>
  );
}
