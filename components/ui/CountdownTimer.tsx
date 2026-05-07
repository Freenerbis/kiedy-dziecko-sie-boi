'use client';

import { useEffect, useState } from 'react';

const TIMER_KEY = 'ebook_promo_start_v1';
const DURATION_MS = 72 * 60 * 60 * 1000;

interface TimeLeft {
  hours: string;
  minutes: string;
  seconds: string;
}

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ hours: '72', minutes: '00', seconds: '00' });
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    let startTime: number;
    const stored = localStorage.getItem(TIMER_KEY);
    if (stored) {
      startTime = parseInt(stored, 10);
    } else {
      startTime = Date.now();
      localStorage.setItem(TIMER_KEY, String(startTime));
    }

    const tick = () => {
      const elapsed = Date.now() - startTime;
      const remaining = DURATION_MS - elapsed;

      if (remaining <= 0) {
        setIsExpired(true);
        setTimeLeft({ hours: '00', minutes: '00', seconds: '00' });
        return;
      }

      const totalSeconds = Math.floor(remaining / 1000);
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      setTimeLeft({
        hours: String(hours).padStart(2, '0'),
        minutes: String(minutes).padStart(2, '0'),
        seconds: String(seconds).padStart(2, '0'),
      });
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  if (isExpired) {
    return (
      <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3">
        <span className="text-sage text-sm">Cena promocyjna wygasła</span>
      </div>
    );
  }

  return (
    <div className="inline-flex flex-col sm:flex-row sm:items-center gap-3">
      <div className="text-sage/80 text-sm font-medium">Cena promocyjna kończy się za:</div>
      <div className="flex items-center gap-2">
        {[
          { value: timeLeft.hours, label: 'godz' },
          { value: timeLeft.minutes, label: 'min' },
          { value: timeLeft.seconds, label: 'sek' },
        ].map((unit, i) => (
          <div key={unit.label} className="flex items-center gap-2">
            <div className="flex flex-col items-center">
              <div className="bg-white/15 backdrop-blur-sm border border-white/20 rounded-lg w-14 h-12 flex items-center justify-center">
                <span className="font-display text-white text-xl font-bold tabular-nums leading-none">
                  {unit.value}
                </span>
              </div>
              <span className="text-sage/60 text-[10px] mt-1 uppercase tracking-widest">{unit.label}</span>
            </div>
            {i < 2 && (
              <span className="text-white/40 text-xl font-bold mb-4 select-none">:</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
