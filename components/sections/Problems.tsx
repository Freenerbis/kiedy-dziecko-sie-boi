'use client';

import { motion } from 'framer-motion';
import { CalendarX2, HelpCircle, AlertTriangle, Wifi, Users } from 'lucide-react';
import Container from '@/components/ui/Container';
import { PROBLEMS } from '@/lib/constants';

const PROBLEM_STYLES = [
  { Icon: CalendarX2,    iconColor: 'text-coral',      iconBg: 'bg-coral/10',   accentBg: 'bg-coral' },
  { Icon: HelpCircle,    iconColor: 'text-amber-500',  iconBg: 'bg-amber-50',   accentBg: 'bg-amber-400' },
  { Icon: AlertTriangle, iconColor: 'text-orange-500', iconBg: 'bg-orange-50',  accentBg: 'bg-orange-400' },
  { Icon: Wifi,          iconColor: 'text-blue-400',   iconBg: 'bg-blue-50',    accentBg: 'bg-blue-400' },
  { Icon: Users,         iconColor: 'text-forest',     iconBg: 'bg-forest/8',   accentBg: 'bg-forest' },
];

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Problems() {
  return (
    <section id="dla-kogo" className="py-24 md:py-32 bg-cream relative overflow-hidden">
      {/* Subtle top divider */}
      <div className="absolute top-0 inset-x-0 section-divider" />

      {/* Background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 80% 0%, rgba(139,181,160,0.08) 0%, transparent 55%), radial-gradient(ellipse at 10% 100%, rgba(232,97,74,0.05) 0%, transparent 50%)',
        }}
      />

      <Container className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <span className="label-badge mb-6">Czy to brzmi znajomo?</span>
          <h2 className="font-display text-4xl md:text-5xl text-forest leading-tight mb-4 tracking-tight font-black">
            Wiesz, że coś jest nie tak.<br />
            <span className="text-coral">Ale nie wiesz, co zrobić.</span>
          </h2>
          <p className="text-forest/60 text-lg max-w-2xl mx-auto leading-relaxed">
            83% rodziców uważa, że zdrowie psychiczne dzieci się pogarsza. Średni czas oczekiwania
            na psychologa dziecięcego to 3–6 miesięcy. Ty jesteś sama z problemem — teraz.
          </p>
        </motion.div>

        {/* Problems grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {PROBLEMS.map((problem, i) => {
            const { Icon, iconColor, iconBg, accentBg } = PROBLEM_STYLES[i];
            return (
              <motion.div
                key={i}
                custom={i}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                whileHover={{ y: -5 }}
                transition={{ type: 'spring', stiffness: 280, damping: 24 }}
                className={`group relative bg-white rounded-2xl p-7 border border-cream-deeper/80 hover:border-forest/10 hover:shadow-xl hover:shadow-forest/[0.07] transition-all duration-300 overflow-hidden card-shine ${
                  i === 4 ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
              >
                {/* Left accent bar */}
                <div
                  className={`absolute left-0 top-[12%] bottom-[12%] w-[3px] rounded-r-full ${accentBg} opacity-40 group-hover:opacity-80 group-hover:top-[6%] group-hover:bottom-[6%] transition-all duration-300`}
                />

                {/* Background number */}
                <div className="absolute -bottom-2 -right-1 font-display text-[72px] font-black text-forest/[0.04] group-hover:text-forest/[0.07] transition-colors select-none leading-none pointer-events-none">
                  {String(i + 1).padStart(2, '0')}
                </div>

                {/* Icon */}
                <motion.div
                  className={`w-11 h-11 ${iconBg} rounded-xl flex items-center justify-center mb-5`}
                  whileInView={{ scale: [0.5, 1.15, 1] }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + i * 0.08, duration: 0.5, ease: 'backOut' }}
                >
                  <Icon className={`w-5 h-5 ${iconColor}`} strokeWidth={1.75} />
                </motion.div>

                <h3 className="font-display text-[17px] text-forest font-semibold mb-2.5 leading-snug pr-10 group-hover:text-forest-light transition-colors">
                  {problem.title}
                </h3>
                <p className="text-forest/55 text-sm leading-relaxed relative z-10">
                  {problem.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Bridge to solution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 flex justify-center"
        >
          <div className="p-[1px] rounded-2xl gradient-border-coral max-w-xl w-full">
            <div className="bg-forest rounded-[15px] px-8 py-5 text-center">
              <p className="text-sage/90 text-base leading-relaxed">
                <strong className="text-white font-semibold">Nie masz czasu czekać.</strong>{' '}
                I nie powinna czekać bezczynnie — masz narzędzia, żeby działać już dziś.
              </p>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
