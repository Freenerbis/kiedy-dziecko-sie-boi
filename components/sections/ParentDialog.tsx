'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Container from '@/components/ui/Container';

const DIALOG = [
  {
    from: 'mama' as const,
    text: 'Moja córka od tygodnia prawie nic nie je i nie wychodzi z pokoju. Martwię się.',
    delay: 0.2,
  },
  {
    from: 'koleżanka' as const,
    text: 'Oj, to pewnie hormony. Moja też tak miała w tym wieku.',
    delay: 1.1,
  },
  {
    from: 'mama' as const,
    text: 'Próbuję z nią rozmawiać, ale się zamknęła. Boję się, że dzieje się coś poważnego.',
    delay: 2.1,
  },
  {
    from: 'koleżanka' as const,
    text: 'Daj jej czas, sama wyjdzie. Nie dramatyzuj — to po prostu wiek.',
    delay: 3.1,
  },
  {
    from: 'mama' as const,
    text: 'Ale co, jeśli to nie są tylko hormony? Co mam zrobić przez te miesiące czekania?',
    delay: 4.1,
  },
];

function AvatarMama() {
  return (
    <div className="relative w-[52px] h-[52px] flex-shrink-0">
      {/* Gradient ring */}
      <div className="absolute inset-0 rounded-full p-[2.5px]"
        style={{ background: 'linear-gradient(135deg, #E8614A, #F4A07A)' }}>
        <div className="w-full h-full rounded-full"
          style={{ background: 'linear-gradient(160deg, #F4A07A 0%, #E8614A 100%)' }}>
          {/* Initial */}
          <div className="w-full h-full rounded-full flex items-center justify-center">
            <span className="text-white font-black text-xl leading-none" style={{ fontFamily: 'var(--font-playfair)', fontStyle: 'italic' }}>M</span>
          </div>
        </div>
      </div>
      {/* Status dot */}
      <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-amber-400 rounded-full border-2 border-[#1E3D2F] flex items-center justify-center">
        <span className="text-[8px] leading-none">😟</span>
      </div>
    </div>
  );
}

function AvatarKoleżanka() {
  return (
    <div className="relative w-[52px] h-[52px] flex-shrink-0">
      {/* Gradient ring */}
      <div className="absolute inset-0 rounded-full p-[2.5px]"
        style={{ background: 'linear-gradient(135deg, #8BB5A0, #5A9080)' }}>
        <div className="w-full h-full rounded-full"
          style={{ background: 'linear-gradient(160deg, #A8CBB8 0%, #6A9E8A 100%)' }}>
          <div className="w-full h-full rounded-full flex items-center justify-center">
            <span className="text-white font-black text-xl leading-none" style={{ fontFamily: 'var(--font-playfair)', fontStyle: 'italic' }}>K</span>
          </div>
        </div>
      </div>
      {/* Status dot */}
      <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-white/20 rounded-full border-2 border-[#1E3D2F] flex items-center justify-center">
        <span className="text-[8px] leading-none">🙄</span>
      </div>
    </div>
  );
}

function Bubble({
  msg,
  isInView,
}: {
  msg: (typeof DIALOG)[number];
  isInView: boolean;
}) {
  const isMama = msg.from === 'mama';

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.96 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.45, delay: msg.delay, ease: [0.22, 1, 0.36, 1] }}
      className={`flex items-end gap-3 ${isMama ? 'flex-row' : 'flex-row-reverse'}`}
    >
      {/* Avatar */}
      <div className="flex-shrink-0 flex flex-col items-center gap-1">
        {isMama ? <AvatarMama /> : <AvatarKoleżanka />}
        <span className={`text-[10px] font-semibold ${isMama ? 'text-coral' : 'text-sage'}`}>
          {isMama ? 'Mama' : 'Znajoma'}
        </span>
      </div>

      {/* Bubble */}
      <div
        className={`max-w-[68%] px-4 py-3 rounded-2xl text-sm leading-relaxed relative ${
          isMama
            ? 'bg-coral text-white rounded-bl-sm shadow-lg shadow-coral/20'
            : 'bg-white text-forest/80 rounded-br-sm shadow-lg shadow-forest/8 border border-cream-deeper'
        }`}
      >
        {msg.text}
        {/* Tail */}
        <span
          className={`absolute bottom-0 w-3 h-3 ${
            isMama
              ? 'left-[-6px] bg-coral clip-tail-left'
              : 'right-[-6px] bg-white clip-tail-right'
          }`}
          style={{
            clipPath: isMama
              ? 'polygon(100% 0, 100% 100%, 0 100%)'
              : 'polygon(0 0, 0 100%, 100% 100%)',
          }}
        />
      </div>
    </motion.div>
  );
}

export default function ParentDialog() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="py-24 md:py-32 bg-forest overflow-hidden relative">
      {/* Background blobs */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(139,181,160,0.06) 0%, transparent 70%)' }} />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(232,97,74,0.08) 0%, transparent 70%)' }} />

      <Container>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-white/8 text-sage text-xs font-semibold px-4 py-2 rounded-full mb-6 tracking-wide uppercase border border-white/10">
            <span className="w-1.5 h-1.5 bg-coral rounded-full animate-pulse" />
            Znajome słowa?
          </div>
          <h2 className="font-display text-4xl md:text-5xl text-white leading-tight tracking-tight font-black">
            "To pewnie tylko hormony."<br />
            <span className="text-coral">A jeśli nie?</span>
          </h2>
          <p className="text-sage/60 mt-4 text-lg max-w-xl mx-auto">
            Słyszysz to zewsząd — ale Twój instynkt mówi co innego.
          </p>
        </motion.div>

        {/* Dialog */}
        <div ref={ref} className="max-w-2xl mx-auto flex flex-col gap-6">
          {DIALOG.map((msg, i) => (
            <Bubble key={i} msg={msg} isInView={isInView} />
          ))}

          {/* Turning point card */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ delay: 5.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 bg-coral/10 border border-coral/30 rounded-2xl px-6 py-5 flex items-start gap-4 backdrop-blur-sm"
          >
            <div className="w-10 h-10 bg-coral/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-lg">💡</span>
            </div>
            <div>
              <div className="text-coral font-bold text-sm mb-1">Twój instynkt ma rację.</div>
              <p className="text-white/70 text-sm leading-relaxed">
                Matki czują. Nie musisz czekać miesiącami, żeby zacząć działać —
                są konkretne narzędzia, które możesz zastosować{' '}
                <span className="text-white font-semibold">już dziś.</span>
              </p>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
