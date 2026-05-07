'use client';

import { motion } from 'framer-motion';
import { GraduationCap, Users, Building2, Quote } from 'lucide-react';
import Container from '@/components/ui/Container';

const CREDENTIALS = [
  { icon: GraduationCap, label: 'Wykształcenie', text: 'Psycholog kliniczny, UW' },
  { icon: Users,         label: 'Doświadczenie', text: '12 lat pracy z młodzieżą' },
  { icon: Building2,     label: 'Praca',         text: 'Poradnia PPP, Warszawa' },
];

const HIGHLIGHTS = [
  { value: '12+', label: 'lat praktyki' },
  { value: '500+', label: 'rodzin objętych pomocą' },
  { value: '3', label: 'lata pisania ebooka' },
];

export default function Author() {
  return (
    <section className="py-20 md:py-28 bg-cream relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 section-divider" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 90% 50%, rgba(139,181,160,0.07) 0%, transparent 55%)',
        }}
      />

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl mx-auto"
        >
          {/* Label */}
          <div className="text-center mb-10">
            <span className="label-badge">O autorce</span>
          </div>

          <div className="bg-white rounded-3xl border border-cream-deeper shadow-xl shadow-forest/[0.06] overflow-hidden">
            {/* Top accent */}
            <div className="h-[3px] bg-gradient-to-r from-sage/40 via-coral/50 to-sage/30" />

            <div className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">

                {/* Avatar col */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                  className="flex-shrink-0 flex flex-col items-center gap-4 md:w-40"
                >
                  {/* Photo */}
                  <div className="relative">
                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden shadow-lg shadow-forest/20 ring-2 ring-sage/20">
                      <img
                        src="https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=320&h=320&fit=crop&crop=face&auto=format&q=80"
                        alt="Katarzyna Wiśniewska — psycholog kliniczny"
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                    {/* Verified badge */}
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-coral rounded-full flex items-center justify-center shadow-md shadow-coral/40 border-2 border-white">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  </div>

                  <div className="text-center">
                    <p className="font-display font-black text-forest text-base leading-tight">
                      Katarzyna Wiśniewska
                    </p>
                    <p className="text-forest/45 text-xs mt-0.5">Psycholog kliniczny</p>
                  </div>

                  {/* Mini stats */}
                  <div className="w-full flex flex-col gap-1.5 mt-1">
                    {HIGHLIGHTS.map(({ value, label }) => (
                      <div key={label} className="flex items-center justify-between bg-cream rounded-xl px-3 py-2">
                        <span className="font-display font-black text-forest text-sm">{value}</span>
                        <span className="text-forest/45 text-[11px]">{label}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Content col */}
                <div className="flex-1 min-w-0">
                  {/* Pull quote */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="relative mb-6"
                  >
                    <Quote className="absolute -top-1 -left-1 w-6 h-6 text-coral/20" />
                    <h2 className="font-display text-2xl md:text-3xl text-forest font-black leading-tight pl-5">
                      Napisałam ten ebook, bo sama widziałam jak mamy czekają.
                    </h2>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55, delay: 0.25 }}
                  >
                    {/* Notebook paper bio block */}
                    <div
                      className="relative rounded-2xl px-6 pt-5 pb-6 mb-7 overflow-hidden"
                      style={{
                        backgroundColor: '#FDFAF4',
                        backgroundImage: `
                          linear-gradient(90deg, transparent 38px, rgba(232,97,74,0.18) 38px, rgba(232,97,74,0.18) 40px, transparent 40px),
                          linear-gradient(transparent calc(1.75em - 1px), rgba(139,181,160,0.22) calc(1.75em - 1px), rgba(139,181,160,0.22) 1.75em, transparent 1.75em)
                        `,
                        backgroundSize: '100% 100%, 100% 1.75em',
                        lineHeight: '1.75em',
                        boxShadow: 'inset 0 0 0 1px rgba(139,181,160,0.15), 0 2px 12px rgba(30,61,47,0.05)',
                      }}
                    >
                      {/* Hole punches */}
                      <div className="absolute left-[13px] top-5 w-3 h-3 rounded-full bg-cream-dark border border-cream-deeper/60 shadow-inner" />
                      <div className="absolute left-[13px] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-cream-dark border border-cream-deeper/60 shadow-inner" />
                      <div className="absolute left-[13px] bottom-5 w-3 h-3 rounded-full bg-cream-dark border border-cream-deeper/60 shadow-inner" />

                      <div className="pl-8">
                        <p className="text-forest/75 text-[15px] leading-[1.75em] mb-[1.75em]">
                          Przez 12 lat pracowałam w poradni psychologiczno-pedagogicznej z rodzinami,
                          których dzieci przechodziły kryzysy emocjonalne. Widziałam to samo
                          w kółko: mama zdesperowana, dziecko cierpi, termin za 4 miesiące.
                          I mama nie wie, co zrobić <em>dziś wieczorem</em>.
                        </p>

                        <p className="text-forest/75 text-[15px] leading-[1.75em] mb-[1.75em]">
                          Jestem też mamą 15-letniej Zosi. Wiem, jak wygląda ta sytuacja z obu stron —
                          z gabinetu i ze swojej kuchni o 23:00. To połączenie sprawiło, że wiedziałam,
                          co napisać.
                        </p>

                        <p className="text-forest/75 text-[15px] leading-[1.75em]">
                          Ten ebook to odpowiedź na pytanie, które słyszałam{' '}
                          <strong className="text-forest">setki razy</strong>:{' '}
                          <span className="text-forest font-semibold italic">
                            „Co mam robić zanim dostanę się do psychologa?"
                          </span>{' '}
                          Zebrałam tu wszystko, co mówiłam rodzicom na pierwszych spotkaniach — konkretnie, bez owijania w bawełnę.
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Credentials */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.35 }}
                    className="flex flex-col sm:flex-row flex-wrap gap-2.5"
                  >
                    {CREDENTIALS.map(({ icon: Icon, label, text }) => (
                      <div
                        key={text}
                        className="group flex items-center gap-2.5 bg-sage/8 hover:bg-sage/14 border border-sage/20 rounded-xl px-3.5 py-2.5 transition-colors duration-200"
                      >
                        <div className="w-7 h-7 bg-white rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
                          <Icon className="w-3.5 h-3.5 text-forest/60" />
                        </div>
                        <div>
                          <p className="text-forest/40 text-[10px] uppercase tracking-wide font-semibold leading-none mb-0.5">{label}</p>
                          <p className="text-forest/80 text-xs font-medium leading-tight">{text}</p>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
