'use client';

import { motion } from 'framer-motion';
import {
  AlertTriangle,
  MessageCircle,
  Zap,
  CalendarDays,
  School,
  LifeBuoy,
} from 'lucide-react';
import Container from '@/components/ui/Container';
import { BENEFITS } from '@/lib/constants';

const ICONS = [AlertTriangle, MessageCircle, Zap, CalendarDays, School, LifeBuoy];

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.65, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Benefits() {
  return (
    <section id="co-w-srodku" className="py-24 md:py-32 bg-forest relative overflow-hidden">
      {/* Background decoration */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #8BB5A0 0%, transparent 70%)' }}
      />
      <div
        className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full opacity-8 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #E8614A 0%, transparent 70%)' }}
      />
      <div className="absolute inset-0 noise-overlay opacity-[0.025] pointer-events-none" />

      <Container className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-white/10 text-sage text-xs font-semibold px-4 py-2 rounded-full mb-6 tracking-wide uppercase border border-white/10">
            Co dostaniesz w środku
          </div>
          <h2 className="font-display text-4xl md:text-5xl text-white leading-tight mb-4 tracking-tight font-black">
            Konkretne narzędzia,<br />
            <span className="text-sage">nie kolejna teoria</span>
          </h2>
          <p className="text-sage/70 text-lg max-w-2xl mx-auto">
            Każdy rozdział to gotowe do użycia narzędzie. Nie "bądź obecna" — tylko CO, JAK i KIEDY.
          </p>
        </motion.div>

        {/* Benefits grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {BENEFITS.map((benefit, i) => {
            const Icon = ICONS[i];
            return (
              <motion.div
                key={i}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                className="group relative bg-white/6 hover:bg-white/10 backdrop-blur-sm border border-white/10 hover:border-sage/25 rounded-2xl p-7 transition-all duration-300 overflow-hidden"
              >
                {/* Top accent line on hover */}
                <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-coral/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center rounded-t-2xl" />

                {/* Icon */}
                <motion.div
                  className="w-12 h-12 bg-sage/15 border border-sage/20 rounded-xl flex items-center justify-center mb-5 group-hover:bg-coral/20 group-hover:border-coral/30 transition-all duration-300"
                  whileHover={{ rotate: [0, -8, 8, 0] }}
                  transition={{ duration: 0.4 }}
                >
                  <Icon className="w-5 h-5 text-sage group-hover:text-coral transition-colors duration-300" />
                </motion.div>

                <h3 className="font-display text-white text-lg font-semibold mb-3 leading-snug relative z-10">
                  {benefit.title}
                </h3>
                <p className="text-sage/65 text-sm leading-relaxed relative z-10">{benefit.description}</p>

                {/* Big background number */}
                <div className="absolute -bottom-3 -right-1 font-display text-[80px] font-black text-white/[0.05] group-hover:text-white/[0.09] transition-colors select-none leading-none pointer-events-none">
                  {String(i + 1).padStart(2, '0')}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <a
            href="#oferta"
            className="inline-flex items-center gap-3 bg-coral hover:bg-coral-dark text-white font-bold text-base px-8 py-4 rounded-2xl transition-all duration-200 hover:scale-105 active:scale-95 shadow-xl shadow-coral/35"
          >
            Chcę te narzędzia — 74 zł
          </a>
          <p className="mt-3 text-sage/40 text-sm">30 dni gwarancji zwrotu</p>
        </motion.div>
      </Container>
    </section>
  );
}
