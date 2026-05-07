'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Phone, PhoneOff, Clock, CalendarX2, HeartCrack } from 'lucide-react';
import Container from '@/components/ui/Container';

const MESSAGES = [
  {
    from: 'mama' as const,
    text: 'Dzień dobry, chciałabym umówić wizytę dla córki. To pilna sprawa...',
    delay: 0.2,
  },
  {
    from: 'recepcja' as const,
    text: 'Dzień dobry. Pozwoli Pani, że sprawdzę terminarz... chwileczkę.',
    delay: 1.1,
  },
  {
    from: 'recepcja' as const,
    text: 'Najbliższy wolny termin to 18 czerwca.',
    delay: 2.1,
  },
  {
    from: 'mama' as const,
    text: 'To... prawie 2 miesiące.',
    delay: 3.0,
  },
  {
    from: 'recepcja' as const,
    text: 'Niestety tak. Chce Pani zarezerwować?',
    delay: 3.8,
  },
];

const CALENDAR_DAYS = Array.from({ length: 30 }, (_, i) => i + 1);
const BUSY_DAYS = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29];
const FREE_DAY = 30;

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-3 py-2 bg-white/15 rounded-2xl rounded-bl-sm w-fit">
      {[0, 0.2, 0.4].map((d, i) => (
        <motion.span
          key={i}
          className="w-1.5 h-1.5 bg-white/60 rounded-full block"
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 0.6, delay: d, repeat: Infinity }}
        />
      ))}
    </div>
  );
}

function ChatBubble({
  msg,
  index,
  isInView,
}: {
  msg: (typeof MESSAGES)[number];
  index: number;
  isInView: boolean;
}) {
  const isMama = msg.from === 'mama';
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.35, delay: msg.delay, ease: [0.22, 1, 0.36, 1] }}
      className={`flex ${isMama ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`max-w-[82%] px-2.5 py-1.5 text-[10px] leading-snug rounded-xl ${
          isMama
            ? 'bg-coral text-white rounded-br-sm'
            : 'bg-white/15 text-white/90 rounded-bl-sm'
        }`}
      >
        {!isMama && (
          <div className="text-white/50 text-[8px] mb-0.5 font-medium tracking-wide">
            REJESTRACJA
          </div>
        )}
        {msg.text}
        {index === 2 && (
          <div className="mt-0.5 text-coral/90 font-bold text-[9px]">← za prawie 2 miesiące</div>
        )}
      </div>
    </motion.div>
  );
}

export default function WaitingReality() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="dla-kogo" className="py-24 md:py-32 bg-paper overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-2 bg-coral/12 text-coral text-xs font-semibold px-4 py-2 rounded-full mb-6 tracking-wide uppercase">
              <span className="w-1.5 h-1.5 bg-coral rounded-full animate-pulse" />
              Rzeczywistość
            </div>

            <h2 className="font-display text-4xl md:text-5xl text-forest leading-tight tracking-tight mb-6 font-black">
              Dzwonisz.<br />
              Piszesz.<br />
              <span className="text-coral">Słyszysz: za 2 miesiące.</span>
            </h2>

            <p className="text-forest/60 text-lg leading-relaxed mb-8 max-w-md">
              Średni czas oczekiwania na psychologa dziecięcego w Polsce to{' '}
              <strong className="text-forest font-semibold">3–6 miesięcy.</strong>{' '}
              W tym czasie Twoje dziecko nie przestaje potrzebować pomocy.
              A Ty zostajesz sama z pytaniem:{' '}
              <em className="text-forest/80">co robię przez te miesiące?</em>
            </p>

            {/* Loss aversion block */}
            <div className="bg-coral/8 border border-coral/20 rounded-2xl px-5 py-4 mb-8">
              <p className="text-coral text-xs font-bold uppercase tracking-widest mb-2">Bez planu każdy dzień oczekiwania to:</p>
              <ul className="space-y-1.5">
                {[
                  'Rozmowa, która kończy się trzaśnięciem drzwiami',
                  'Noc z telefonem w dłoni — "czy piszę do mnie?"',
                  'Poczucie winy, że mówię złe słowa',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-forest/70">
                    <span className="text-coral mt-0.5 flex-shrink-0">✕</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Stats */}
            <div className="flex flex-col gap-4">
              {[
                {
                  Icon: Phone,
                  color: 'text-coral',
                  bg: 'bg-coral/10',
                  stat: '4×',
                  text: 'Średnio 4 telefony zanim uda się w ogóle dodzwonić',
                },
                {
                  Icon: CalendarX2,
                  color: 'text-forest',
                  bg: 'bg-forest/8',
                  stat: '3–6 mies.',
                  text: 'Średni czas oczekiwania na wizytę u specjalisty',
                },
                {
                  Icon: HeartCrack,
                  color: 'text-coral',
                  bg: 'bg-coral/10',
                  stat: '83%',
                  text: 'Rodziców czuje się bezradnie w czasie oczekiwania',
                },
              ].map(({ Icon, color, bg, stat, text }, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + i * 0.15, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ x: 4, transition: { duration: 0.2 } }}
                  className="flex items-center gap-4 bg-white rounded-2xl px-4 py-3.5 border border-cream-deeper shadow-sm hover:shadow-md transition-shadow cursor-default"
                >
                  <motion.div
                    className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center flex-shrink-0`}
                    whileInView={{ scale: [0.5, 1.15, 1] }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.15, duration: 0.5, ease: 'backOut' }}
                  >
                    <Icon className={`w-5 h-5 ${color}`} />
                  </motion.div>
                  <div>
                    <div className={`font-display font-black text-lg leading-none ${color} mb-0.5`}>{stat}</div>
                    <div className="text-forest/60 text-sm leading-snug">{text}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: phone mockup */}
          <div className="flex justify-center lg:justify-end" ref={ref}>
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              {/* Glow */}
              <div className="absolute -inset-6 bg-forest/8 rounded-[48px] blur-2xl" />

              {/* Phone frame */}
              <div
                className="relative w-[210px] rounded-[36px] overflow-hidden shadow-2xl shadow-forest/30"
                style={{
                  background: 'linear-gradient(180deg, #1a2f24 0%, #142B20 100%)',
                  border: '9px solid #0d1e15',
                }}
              >
                {/* Notch */}
                <div className="flex justify-center pt-1.5 pb-0.5">
                  <div className="w-16 h-3.5 bg-black/80 rounded-full" />
                </div>

                {/* Status bar */}
                <div className="flex justify-between items-center px-4 pb-1 text-white/40 text-[8px]">
                  <span>9:41</span>
                  <div className="flex items-center gap-1">
                    <div className="flex gap-0.5 items-end h-2">
                      {[2,4,6,8].map((h, i) => (
                        <div key={i} className="w-0.5 bg-white/40 rounded-full" style={{ height: `${h}px` }} />
                      ))}
                    </div>
                    <span>LTE</span>
                    <div className="w-3.5 h-1.5 border border-white/40 rounded-[2px] relative">
                      <div className="absolute inset-[1px] right-[1px] bg-white/40 rounded-[1px]" />
                    </div>
                  </div>
                </div>

                {/* Call header */}
                <div className="bg-forest-deep/60 px-4 py-2 text-center border-b border-white/8 flex items-center gap-2.5 justify-center">
                  <div className="w-7 h-7 bg-sage/20 border border-sage/30 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xs">🏥</span>
                  </div>
                  <div className="text-left">
                    <div className="text-white text-[10px] font-semibold leading-none">Gabinet Psychologiczny</div>
                    <div className="flex items-center gap-1 mt-0.5">
                      <motion.div
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-1 h-1 bg-green-400 rounded-full"
                      />
                      <span className="text-white/40 text-[8px]">Trwa połączenie • 03:12</span>
                    </div>
                  </div>
                </div>

                {/* Chat messages — scrollable */}
                <div
                  className="px-2.5 py-2.5 flex flex-col gap-2 bg-forest/30 overflow-y-auto no-scrollbar"
                  style={{ height: '165px' }}
                >
                  {MESSAGES.map((msg, i) => (
                    <ChatBubble key={i} msg={msg} index={i} isInView={isInView} />
                  ))}

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 4.8 }}
                    className="flex justify-start"
                  >
                    <TypingIndicator />
                  </motion.div>
                </div>

                {/* Calendar strip */}
                <div className="bg-forest-deep/80 px-3 pt-2 pb-1.5 border-t border-white/8">
                  <div className="text-white/30 text-[8px] tracking-widest uppercase mb-1.5">
                    Dostępność — Czerwiec 2026
                  </div>
                  <div className="grid grid-cols-10 gap-0.5">
                    {CALENDAR_DAYS.map((day) => (
                      <div
                        key={day}
                        className={`h-3.5 rounded-[2px] text-[6px] flex items-center justify-center font-bold ${
                          day === FREE_DAY
                            ? 'bg-sage/80 text-forest'
                            : BUSY_DAYS.includes(day)
                            ? 'bg-white/10 text-white/20'
                            : 'bg-white/5'
                        }`}
                      >
                        {day === FREE_DAY ? '✓' : ''}
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between mt-1.5">
                    <div className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 bg-white/15 rounded-[1px]" />
                      <span className="text-white/25 text-[7px]">Zajęty</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 bg-sage/70 rounded-[1px]" />
                      <span className="text-sage/60 text-[7px]">1 wolny termin</span>
                    </div>
                  </div>
                </div>

                {/* Hangup button */}
                <div className="bg-forest-deep/90 px-4 py-2 flex justify-center border-t border-white/5">
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-8 h-8 bg-red-500/90 rounded-full flex items-center justify-center shadow-lg shadow-red-500/30"
                  >
                    <PhoneOff className="w-3.5 h-3.5 text-white" />
                  </motion.div>
                </div>
              </div>

              {/* Floating badge — góra prawa, poza telefonem */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: -10 }}
                animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                transition={{ delay: 4.2, duration: 0.5, type: 'spring', stiffness: 300 }}
                className="absolute -top-6 -right-24 bg-white rounded-2xl px-4 py-3 shadow-xl shadow-forest/15 border border-cream-deeper z-20"
              >
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="w-3.5 h-3.5 text-coral" />
                  <span className="text-coral text-xs font-bold">Czas oczekiwania</span>
                </div>
                <div className="font-display text-forest text-2xl font-bold leading-none">
                  ~2 mies.
                </div>
                <div className="text-forest/40 text-[10px] mt-0.5">to minimalny czas</div>
              </motion.div>

              {/* Second floating badge — dół prawa, poza telefonem */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                transition={{ delay: 4.5, duration: 0.5, type: 'spring', stiffness: 300 }}
                className="absolute -bottom-6 -right-24 bg-coral text-white rounded-2xl px-4 py-2.5 shadow-xl shadow-coral/30 z-20"
              >
                <div className="text-xs font-semibold leading-tight">Twoje dziecko</div>
                <div className="text-xs font-semibold leading-tight">potrzebuje Cię</div>
                <div className="font-display text-lg font-bold">teraz.</div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
