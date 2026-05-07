'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';

const PURCHASES: Array<{ name: string; cityOf: string; time: string; msg: string }> = [
  { name: 'Monika',   cityOf: 'Warszawy',     time: 'przed chwilą', msg: 'nie wiedziała co mówić córce w kryzysie — dlatego kupiła ebooka' },
  { name: 'Agnieszka',cityOf: 'Krakowa',      time: '2 min temu',   msg: 'po nocy bez snu ze strachu o córkę — kupiła ebooka' },
  { name: 'Kasia',    cityOf: 'Wrocławia',    time: '4 min temu',   msg: 'nie wiedziała co mówić córce — dlatego kupiła ebooka' },
  { name: 'Dorota',   cityOf: 'Gdańska',      time: 'przed chwilą', msg: 'termin u psychologa za 2 miesiące — nie chciała czekać' },
  { name: 'Joanna',   cityOf: 'Poznania',     time: '1 min temu',   msg: 'syn zamknął się w pokoju i przestał rozmawiać — kupiła ebooka' },
  { name: 'Renata',   cityOf: 'Łodzi',        time: '3 min temu',   msg: 'każda rozmowa kończyła się krzykiem — szukała pomocy' },
  { name: 'Barbara',  cityOf: 'Katowic',      time: '6 min temu',   msg: 'bała się że powie coś złego córce — dlatego kupiła ebooka' },
  { name: 'Marta',    cityOf: 'Lublina',      time: 'przed chwilą', msg: 'nie wiedziała jak reagować na płacz córki — kupiła ebooka' },
  { name: 'Anna',     cityOf: 'Szczecina',    time: '5 min temu',   msg: 'termin u terapeuty za 4 miesiące — nie chciała czekać' },
  { name: 'Ewa',      cityOf: 'Rzeszowa',     time: '2 min temu',   msg: 'córka przestała z nią rozmawiać — szukała co robić' },
  { name: 'Magda',    cityOf: 'Bydgoszczy',   time: 'przed chwilą', msg: 'córka przestała jeść — nie wiedziała jak jej pomóc' },
  { name: 'Sylwia',   cityOf: 'Białegostoku', time: '3 min temu',   msg: 'bała się że złymi słowami zaszkodzi córce — kupiła ebooka' },
  { name: 'Karolina', cityOf: 'Torunia',      time: '7 min temu',   msg: 'po kłótni syn przestał rozmawiać — kupiła ebooka' },
  { name: 'Beata',    cityOf: 'Olsztyna',     time: '1 min temu',   msg: 'termin u specjalisty za 6 tygodni — nie chciała czekać' },
  { name: 'Natalia',  cityOf: 'Kielc',        time: 'przed chwilą', msg: 'bała się każdej rozmowy z córką — dlatego kupiła ebooka' },
];

const SHOW_DELAY_MS = 18_000;
const INTERVAL_MS = 35_000;
const VISIBLE_MS = 5_500;

export default function LiveNotificationToast() {
  const [current, setCurrent] = useState<typeof PURCHASES[number] | null>(null);
  const [index, setIndex] = useState(() => Math.floor(Math.random() * PURCHASES.length));

  useEffect(() => {
    const show = () => {
      setIndex((prev) => {
        const next = (prev + 1) % PURCHASES.length;
        setCurrent(PURCHASES[next]);
        setTimeout(() => setCurrent(null), VISIBLE_MS);
        return next;
      });
    };

    const initial = setTimeout(show, SHOW_DELAY_MS);
    const interval = setInterval(show, INTERVAL_MS);

    return () => {
      clearTimeout(initial);
      clearInterval(interval);
    };
  }, []);

  return (
    <AnimatePresence>
      {current && (
        <motion.div
          key={`${current.name}-${current.cityOf}`}
          initial={{ opacity: 0, x: -80, y: 0 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -80 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-24 left-4 z-40 max-w-[260px]"
        >
          <div className="bg-white rounded-2xl shadow-xl shadow-forest/15 border border-cream-deeper px-4 py-3 flex items-center gap-3">
            <div className="w-9 h-9 bg-coral/15 rounded-xl flex items-center justify-center flex-shrink-0">
              <ShoppingBag className="w-4 h-4 text-coral" />
            </div>
            <div>
              <p className="text-forest text-xs font-semibold leading-tight">
                {current.name} z {current.cityOf}
                <span className="text-forest/35 font-normal"> · {current.time}</span>
              </p>
              <p className="text-forest/55 text-[11px] leading-snug mt-0.5">
                {current.msg}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
