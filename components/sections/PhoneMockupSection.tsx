'use client';

import { motion } from 'framer-motion';
import { Clock, X } from 'lucide-react';
import IPhoneMockup from '@/components/ui/iphone-mockup';

const CAL_DAYS = Array.from({ length: 30 }, (_, i) => ({ day: i + 1, free: i === 28 }));

function PhoneScreen() {
  return (
    <div
      className="flex flex-col h-full"
      style={{ background: '#1E3D32', fontFamily: 'system-ui, -apple-system, sans-serif' }}
    >
      {/* Status bar */}
      <div className="flex items-center justify-between px-4 pt-2 pb-1 text-[11px] text-white/60">
        <span className="font-semibold">9:41</span>
        <div className="flex items-center gap-[3px]">
          <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
            <rect x="0" y="3" width="3" height="9" rx="1" fill="white" fillOpacity="0.4"/>
            <rect x="4.5" y="2" width="3" height="10" rx="1" fill="white" fillOpacity="0.6"/>
            <rect x="9" y="0" width="3" height="12" rx="1" fill="white" fillOpacity="0.9"/>
          </svg>
          <span className="text-[10px] font-medium">LTE</span>
          <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
            <rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke="white" strokeOpacity="0.35"/>
            <rect x="2" y="2" width="16" height="8" rx="2" fill="white" fillOpacity="0.9"/>
            <path d="M23 4.5V7.5C23.8284 7.22 24.5 6.67 24.5 6C24.5 5.33 23.8284 4.78 23 4.5Z" fill="white" fillOpacity="0.4"/>
          </svg>
        </div>
      </div>

      {/* Call header */}
      <div className="flex flex-col items-center py-3 border-b border-white/8">
        <div className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center mb-2 ring-2 ring-white/10">
          <span className="text-lg">🏥</span>
        </div>
        <div className="text-[13px] font-semibold text-white tracking-tight">Gabinet Psychologiczny</div>
        <div className="flex items-center gap-1.5 mt-0.5">
          <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
          <span className="text-[10px] text-white/50">Trwa połączenie • 03:12</span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 px-3 py-3 flex flex-col gap-2.5 overflow-hidden">
        {/* Sent */}
        <div className="flex justify-end">
          <div className="rounded-[14px] rounded-tr-[4px] px-3 py-2 max-w-[82%]"
            style={{ background: '#E8614A' }}>
            <p className="text-[11px] leading-[1.45] text-white">
              Dzień dobry, chciałabym umówić wizytę dla córki. To pilna sprawa…
            </p>
          </div>
        </div>

        {/* Received */}
        <div className="flex flex-col gap-1">
          <span className="text-[8px] text-white/30 uppercase tracking-[0.12em] pl-0.5">Rejestracja</span>
          <div className="rounded-[14px] rounded-tl-[4px] px-3 py-2 max-w-[88%]"
            style={{ background: 'rgba(255,255,255,0.1)' }}>
            <p className="text-[11px] leading-[1.45] text-white/85">
              Dzień dobry. Pozwoli Pani, że sprawdzę terminarz… chwileczkę.
            </p>
          </div>
        </div>

        {/* Calendar card */}
        <div className="flex flex-col gap-1">
          <span className="text-[8px] text-white/30 uppercase tracking-[0.12em] pl-0.5">Rejestracja</span>
          <div className="rounded-[14px] rounded-tl-[4px] px-3 py-3 w-[95%]"
            style={{ background: 'rgba(255,255,255,0.08)' }}>
            <p className="text-[8px] text-white/40 uppercase tracking-[0.1em] text-center mb-2">
              Dostępność — Czerwiec 2026
            </p>
            <div className="grid grid-cols-7 gap-[3px]">
              {CAL_DAYS.map(({ day, free }) => (
                <div key={day}
                  className={`aspect-square rounded-[3px] flex items-center justify-center text-[7px] ${
                    free
                      ? 'text-green-300'
                      : 'bg-white/8 text-transparent'
                  }`}
                  style={free ? { background: 'rgba(74,222,128,0.2)', boxShadow: '0 0 0 1px rgba(74,222,128,0.4)' } : {}}
                >
                  {free ? '✓' : '·'}
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center gap-4 mt-2">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-[2px] bg-white/10" />
                <span className="text-[7px] text-white/35">Zajęte</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-[2px]" style={{ background: 'rgba(74,222,128,0.2)', boxShadow: '0 0 0 1px rgba(74,222,128,0.4)' }} />
                <span className="text-[7px] text-white/35">1 wolny termin</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hang up */}
      <div className="flex justify-center pb-3 pt-1">
        <div className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
          style={{ background: '#EF4444', boxShadow: '0 4px 20px rgba(239,68,68,0.5)' }}>
          <X className="w-5 h-5 text-white" strokeWidth={2.5} />
        </div>
      </div>
    </div>
  );
}

export default function PhoneMockupSection() {
  return (
    <section className="py-20 md:py-28 bg-cream overflow-hidden">
      <div className="flex justify-center">
        <div className="relative">

          {/* Badge top-right — czas oczekiwania */}
          <motion.div
            initial={{ opacity: 0, x: 20, y: -10 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute -top-4 -right-4 md:-right-16 z-20 bg-white rounded-2xl px-4 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-gray-100/80 min-w-[160px]"
          >
            <div className="flex items-center gap-1.5 mb-0.5">
              <Clock className="w-3.5 h-3.5 text-coral" />
              <span className="text-[10px] font-semibold text-forest/60 uppercase tracking-wide">Czas oczekiwania</span>
            </div>
            <div className="font-display text-3xl font-black text-forest leading-none tracking-tight">
              ~2 mies.
            </div>
            <div className="text-[10px] text-forest/40 mt-0.5">to minimalny czas</div>
          </motion.div>

          {/* iPhone */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <IPhoneMockup
                model="15-pro"
                color="space-black"
                screenBg="#1E3D32"
                scale={0.58}
                shadow="0 40px 100px rgba(0,0,0,0.30), 0 8px 30px rgba(0,0,0,0.18)"
              >
                <PhoneScreen />
              </IPhoneMockup>
            </motion.div>
          </motion.div>

          {/* Badge bottom-right — Twoje dziecko */}
          <motion.div
            initial={{ opacity: 0, x: 20, y: 10 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="absolute -bottom-4 -right-4 md:-right-14 z-20 rounded-2xl px-4 py-3 shadow-[0_8px_32px_rgba(232,97,74,0.35)] max-w-[160px]"
            style={{ background: '#E8614A' }}
          >
            <p className="text-white text-[13px] font-medium leading-snug">
              Twoje dziecko potrzebuje Cię
            </p>
            <p className="text-white font-display text-[22px] font-black leading-none tracking-tight">
              teraz.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
