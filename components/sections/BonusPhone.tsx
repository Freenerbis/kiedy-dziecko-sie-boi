'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Send, ChevronRight, ShieldCheck, Download } from 'lucide-react';
import Link from 'next/link';

type Scenario = {
  id: string;
  label: string;
  tag: string;
  childMessages: string[];
  preview: {
    text: string;
    note: string;
  };
  locked: { text: string }[];
};

const SCENARIOS: Scenario[] = [
  {
    id: 'zostaw',
    label: '"Zostaw mnie"',
    tag: 'wycofanie',
    childMessages: [
      'mamo serio daj spokój',
      'zostaw mnie',
    ],
    preview: {
      text: 'ok, zostawiam. jestem w kuchni jakbyś chciała',
      note: 'Krótko, bez pretensji. Nie zamykasz drzwi — po prostu nie pchasz się przez nie siłą.',
    },
    locked: [
      { text: 'Co napisać gdy trzaska drzwiami i nie wraca...' },
      { text: 'Jak odezwać się po 2h bez odpowiedzi...' },
      { text: 'Jak wrócić do rozmowy następnego ranka...' },
    ],
  },
  {
    id: 'niema',
    label: 'Czyta i nie odpisuje',
    tag: 'ignorowanie',
    childMessages: [
      'Wyświetlono • 14:32',
    ],
    preview: {
      text: 'hej. nie musisz nic pisać. myślę o tobie 💙',
      note: 'Nie pytasz dlaczego nie odpisuje. Jeden sygnał — jestem tu — i tyle. Bez oczekiwań.',
    },
    locked: [
      { text: 'Co napisać gdy milczy od rana do wieczora...' },
      { text: 'Kiedy zadzwonić zamiast pisać...' },
      { text: 'Jak nie wpaść w spiralę "może coś zrobiłam źle"...' },
    ],
  },
  {
    id: 'dobrzeok',
    label: '"Wszystko ok" (ale nie jest)',
    tag: 'zaprzeczanie',
    childMessages: [
      'mamo wszystko ok',
      'po prostu jestem zmęczona',
    ],
    preview: {
      text: 'okej. wiem że zmęczenie jest naprawdę. powiedz jak mogę pomóc — nawet jeśli to "zostaw mnie w spokoju" 😊',
      note: 'Nie podważasz jej wersji. Dajesz wybór — i sygnał że każda odpowiedź jest ok.',
    },
    locked: [
      { text: 'Co mówić gdy "ok" powtarza się od tygodni...' },
      { text: 'Na co zwracać uwagę gdy słyszysz "wszystko ok"...' },
      { text: 'Jak zapytać drugi raz bez przesłuchania...' },
    ],
  },
  {
    id: 'place',
    label: 'Płacze i nie mówi dlaczego',
    tag: 'emocje',
    childMessages: [
      'nie wiem',
      'po prostu mi źle',
    ],
    preview: {
      text: 'mogę usiąść obok? nie musisz nic mówić',
      note: 'Żadnego "ale co się stało". Oferujesz siebie — nie rozwiązanie. To często jedyne czego potrzebuje.',
    },
    locked: [
      { text: 'Co robić gdy płacze i zamyka się w łazience...' },
      { text: 'Jak nie reagować własną paniką...' },
      { text: 'Co powiedzieć po tym jak się uspokoi...' },
    ],
  },
];

function PhoneMockup({ scenario }: { scenario: Scenario }) {
  return (
    <div className="relative mx-auto" style={{ width: '260px' }}>

      {/* Left buttons — silent + volume */}
      <div className="absolute left-0 top-[88px] w-[3px] h-[32px] bg-[#2a2a2a] rounded-l-sm -translate-x-[3px]" />
      <div className="absolute left-0 top-[132px] w-[3px] h-[56px] bg-[#2a2a2a] rounded-l-sm -translate-x-[3px]" />
      <div className="absolute left-0 top-[198px] w-[3px] h-[56px] bg-[#2a2a2a] rounded-l-sm -translate-x-[3px]" />

      {/* Right button — power */}
      <div className="absolute right-0 top-[148px] w-[3px] h-[72px] bg-[#2a2a2a] rounded-r-sm translate-x-[3px]" />

      {/* Phone body */}
      <div
        className="relative rounded-[44px] overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.45),0_0_0_1px_rgba(255,255,255,0.06)_inset]"
        style={{
          background: '#1C1C1E',
          padding: '12px',
        }}
      >
        {/* Inner screen */}
        <div className="rounded-[34px] overflow-hidden bg-[#F2F2F7]">

          {/* Dynamic Island */}
          <div className="flex justify-center pt-3 pb-1 bg-[#F2F2F7]">
            <div
              className="h-[32px] bg-[#1C1C1E] rounded-full flex items-center justify-center gap-2 px-4"
              style={{ width: '108px' }}
            >
              <div className="w-2 h-2 bg-[#2C2C2E] rounded-full" />
              <div className="w-1.5 h-1.5 bg-[#3A3A3C] rounded-full" />
            </div>
          </div>

          {/* Status bar */}
          <div className="flex justify-between items-center px-5 py-1 bg-[#F2F2F7]">
            <span className="text-[#1C1C1E] text-[11px] font-semibold">9:41</span>
            <div className="flex items-center gap-1.5">
              <div className="flex gap-[2px] items-end h-3">
                {[3, 5, 8, 10].map((h, i) => (
                  <div key={i} className="w-[3px] bg-[#1C1C1E] rounded-full" style={{ height: `${h}px` }} />
                ))}
              </div>
              <div className="w-4 h-[8px] border border-[#1C1C1E]/60 rounded-[2px] relative">
                <div className="absolute inset-[1.5px] right-[1.5px] bg-[#1C1C1E]/60 rounded-[1px]" />
              </div>
            </div>
          </div>

          {/* Contact bar */}
          <div className="bg-[#F2F2F7] border-b border-[#C6C6C8]/60 px-4 py-3 flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-sage to-forest rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
              <span className="text-white text-sm font-bold">Z</span>
            </div>
            <div>
              <div className="text-[#1C1C1E] text-[13px] font-semibold">Zosia</div>
              <div className="text-[#8E8E93] text-[10px]">Ostatnio aktywna 3 godz. temu</div>
            </div>
          </div>

          {/* Messages */}
          <div className="bg-white px-4 py-4 flex flex-col gap-3" style={{ minHeight: '320px' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={scenario.id + '-msgs'}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-2"
              >
                {scenario.childMessages.map((msg, i) => (
                  msg === 'Wyświetlono • 14:32'
                    ? (
                      <div key={i} className="flex justify-end">
                        <span className="text-[#8E8E93] text-[10px] italic">{msg}</span>
                      </div>
                    )
                    : (
                      <div key={i} className="flex items-end gap-1">
                        <div className="bg-[#E9E9EB] text-[#1C1C1E] text-[13px] leading-snug px-3.5 py-2 rounded-2xl rounded-bl-[4px] max-w-[75%]">
                          {msg}
                        </div>
                      </div>
                    )
                ))}
              </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.div
                key={scenario.id + '-reply'}
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, delay: 0.15 }}
                className="flex justify-end mt-1"
              >
                <div className="bg-[#007AFF] text-white text-[13px] leading-snug px-3.5 py-2 rounded-2xl rounded-br-[4px] max-w-[82%]">
                  {scenario.preview.text}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Input bar */}
          <div className="bg-[#F2F2F7] border-t border-[#C6C6C8]/60 px-4 py-2.5 flex items-center gap-2">
            <div className="flex-1 bg-white border border-[#C6C6C8]/80 rounded-full px-4 py-1.5 text-[11px] text-[#8E8E93]">
              Napisz do Zosi...
            </div>
            <div className="w-8 h-8 bg-[#007AFF] rounded-full flex items-center justify-center flex-shrink-0 shadow-md shadow-blue-500/30">
              <Send className="w-3.5 h-3.5 text-white" />
            </div>
          </div>

          {/* Home bar */}
          <div className="bg-[#F2F2F7] flex justify-center py-2">
            <div className="w-24 h-1 bg-[#1C1C1E]/20 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function BonusPhone() {
  const [active, setActive] = useState<Scenario>(SCENARIOS[0]);

  return (
    <div className="py-16 md:py-24">
      {/* Header */}
      <div className="text-center mb-12 px-4">
        <Link href="/" className="inline-flex items-center gap-2 text-forest/40 text-sm mb-8 hover:text-forest transition-colors">
          ← Wróć do strony
        </Link>
        <div className="inline-flex items-center gap-2 bg-coral/10 text-coral text-xs font-semibold px-4 py-2 rounded-full mb-5 tracking-wide uppercase">
          🎁 Bonus do ebooka
        </div>
        <h1 className="font-display text-4xl md:text-5xl text-forest font-black leading-tight tracking-tight mb-4">
          Telefon SOS<br />
          <span className="text-coral">Gotowe odpowiedzi.</span>
        </h1>
        <p className="text-forest/55 text-lg max-w-lg mx-auto">
          Wybierz sytuację i zobacz przykład odpowiedzi, którą możesz wysłać swojemu dziecku. Pełny bonus zawiera <strong className="text-forest">20 scenariuszy.</strong>
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left: scenario picker + note */}
        <div className="flex flex-col gap-4">
          <p className="text-forest/50 text-xs font-semibold uppercase tracking-widest mb-1">Wybierz sytuację:</p>

          {SCENARIOS.map((s) => (
            <motion.button
              key={s.id}
              onClick={() => setActive(s)}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
              className={`text-left w-full px-5 py-4 rounded-2xl border-2 transition-all duration-200 flex items-center justify-between gap-3 ${
                active.id === s.id
                  ? 'border-coral bg-coral/5 shadow-md shadow-coral/10'
                  : 'border-cream-deeper bg-white hover:border-forest/20'
              }`}
            >
              <div>
                <div className={`font-semibold text-sm ${active.id === s.id ? 'text-coral' : 'text-forest'}`}>
                  {s.label}
                </div>
                <div className="text-forest/40 text-xs mt-0.5 capitalize">{s.tag}</div>
              </div>
              <ChevronRight className={`w-4 h-4 flex-shrink-0 transition-colors ${active.id === s.id ? 'text-coral' : 'text-forest/25'}`} />
            </motion.button>
          ))}

          {/* Note about the reply */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-2 bg-forest/5 border border-forest/10 rounded-2xl px-5 py-4"
            >
              <div className="text-forest/40 text-[10px] font-semibold uppercase tracking-wide mb-1">Dlaczego to działa:</div>
              <p className="text-forest/70 text-sm leading-relaxed">{active.preview.note}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right: phone + locked */}
        <div className="flex flex-col items-center gap-6">
          <PhoneMockup scenario={active} />

          {/* Locked scenarios */}
          <div className="w-full max-w-[300px]">
            <div className="text-forest/35 text-[10px] font-semibold uppercase tracking-widest text-center mb-3">
              W pełnej wersji bonusu:
            </div>
            <div className="flex flex-col gap-2">
              {active.locked.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-center gap-2.5 bg-white/60 border border-cream-deeper rounded-xl px-3.5 py-2.5 text-sm text-forest/40"
                >
                  <Lock className="w-3.5 h-3.5 flex-shrink-0 text-forest/25" />
                  <span className="text-xs">{item.text}</span>
                </motion.div>
              ))}
              <div className="flex items-center gap-2.5 bg-white/60 border border-cream-deeper rounded-xl px-3.5 py-2.5">
                <Lock className="w-3.5 h-3.5 flex-shrink-0 text-forest/25" />
                <span className="text-xs text-forest/40">+ {20 - 1} kolejnych scenariuszy...</span>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="w-full max-w-[300px] flex flex-col gap-3">
            <a
              href="/#oferta"
              className="w-full inline-flex items-center justify-center gap-2 bg-coral hover:bg-coral-dark text-white font-bold text-sm py-3.5 px-6 rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-lg shadow-coral/30"
            >
              <Download className="w-4 h-4" />
              Kup ebooka i odbierz bonus — 74 zł
            </a>
            <div className="flex items-center justify-center gap-1.5 text-forest/35 text-xs">
              <ShieldCheck className="w-3.5 h-3.5" />
              30 dni gwarancji zwrotu
            </div>
          </div>
        </div>
      </div>

      {/* Bottom note */}
      <p className="text-center text-forest/30 text-xs mt-16 px-4">
        To jest przedsmak — pełny bonus zawiera 20 scenariuszy z gotowymi zdaniami, wariantami i wskazówkami kiedy ich używać.
      </p>
    </div>
  );
}
