'use client';

import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';
import { STEPS } from '@/lib/constants';

export default function HowItWorks() {
  return (
    <section className="py-24 md:py-32 bg-paper">
      <Container>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-forest/8 text-forest text-xs font-semibold px-4 py-2 rounded-full mb-6 tracking-wide uppercase">
            Jak to działa
          </div>
          <h2 className="font-display text-4xl md:text-5xl text-forest leading-tight tracking-tight">
            Od zakupu do działania<br />
            <span className="text-coral">w ciągu jednego wieczoru</span>
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="relative max-w-3xl mx-auto">
          {/* Connecting line */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            className="absolute left-[28px] md:left-1/2 top-8 bottom-8 w-[2px] bg-gradient-to-b from-coral/60 via-sage/40 to-transparent origin-top hidden sm:block"
            style={{ marginLeft: '-1px' }}
          />

          <div className="flex flex-col gap-10">
            {STEPS.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.65, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                className={`relative flex items-start gap-6 sm:gap-0 ${
                  i % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'
                }`}
              >
                {/* Number bubble — center on desktop */}
                <div
                  className={`relative z-10 flex-shrink-0 sm:absolute sm:left-1/2 sm:-translate-x-1/2`}
                >
                  <motion.div
                    className="w-14 h-14 bg-forest text-white rounded-2xl flex items-center justify-center font-display text-lg font-bold shadow-lg shadow-forest/30"
                    whileInView={{ scale: [0.5, 1.1, 1] }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.15 + 0.2 }}
                  >
                    {step.number}
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-coral rounded-full" />
                  </motion.div>
                </div>

                {/* Content card */}
                <div
                  className={`sm:w-[calc(50%-48px)] ${
                    i % 2 === 0
                      ? 'sm:pr-8 sm:text-right sm:ml-0'
                      : 'sm:pl-8 sm:ml-auto sm:text-left'
                  } pl-4 sm:pl-0`}
                >
                  <motion.div
                    whileHover={{ scale: 1.02, y: -2 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="bg-white rounded-2xl p-6 border border-cream-deeper shadow-sm hover:shadow-lg hover:shadow-forest/8 transition-shadow duration-300"
                  >
                    <h3 className="font-display text-forest text-xl font-semibold mb-2">
                      {step.title}
                    </h3>
                    <p className="text-forest/60 text-sm leading-relaxed">{step.description}</p>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mini CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 max-w-md mx-auto text-center"
        >
          <p className="text-forest/55 text-sm mb-4">
            Cały ten proces zajmuje <strong className="text-forest">jeden wieczór</strong>.<br />
            Twoje dziecko nie może czekać na Twój plan dłużej.
          </p>
          <a
            href="#oferta"
            className="inline-flex items-center gap-2 bg-forest hover:bg-forest/90 text-white font-semibold text-sm px-7 py-3 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg shadow-forest/20"
          >
            Zaczynam dziś — 74 zł
          </a>
        </motion.div>
      </Container>
    </section>
  );
}
