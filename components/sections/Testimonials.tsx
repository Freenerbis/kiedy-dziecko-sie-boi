'use client';

import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import { STATS } from '@/lib/constants';

const CARDS = [
  {
    name: 'Agnieszka K.',
    role: 'Mama 13-latki',
    rotate: '-3deg',
    delay: 0,
    time: '21:47',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=80&h=80&fit=crop&crop=face&auto=format&q=80',
    messages: [
      'czekam już 4 miesiące na wizytę u psychologa i nie wiedziałam co ze sobą zrobić w tym czasie. ten ebook dał mi konkretny plan na każdy dzień, pierwszy raz od tygodni poczułam że wiem co robię ❤️',
      'córka wczoraj sama przyszła do mnie porozmawiać. pierwszy raz od miesięcy. używałam skryptu z rozdziału 4 i po prostu zadziałało 😭',
    ],
  },
  {
    name: 'Marta J.',
    role: 'Mama 14-latka',
    rotate: '1.5deg',
    delay: 0.1,
    time: '03:23',
    avatar: 'https://images.unsplash.com/photo-1592621385612-4d7129426394?w=80&h=80&fit=crop&crop=face&auto=format&q=80',
    messages: [
      'piszę o 3 w nocy bo musiałam ci podziękować. mój syn płakał dziś przez 2 godziny i ja wiedziałam co mówić. słowo w słowo z ebooka. wcześniej bałam się że powiem złe słowo i zaszkodzę, a tu po prostu wzięłam gotowe zdania i działałam',
      'uratował mi tę noc. serio. dziękuję ci z całego serca 💙',
    ],
  },
  {
    name: 'Dorota M.',
    role: 'Mama 14-latki',
    rotate: '2.5deg',
    delay: 0.2,
    time: '18:03',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&h=80&fit=crop&crop=face&auto=format&q=80',
    messages: [
      'powiem ci szczerze, na początku byłam sceptyczna - myślałam że kolejny poradnik z ogólnikami. ale ten system żółty/pomarańczowy/czerwony to był strzał w dziesiątkę. nareszcie wiem czy to bunt czy coś poważniejszego, przestałam panikować przy każdym złym dniu',
      'poleciłam już 3 mamom z grupy na fb. wszystkie mówią to samo - wreszcie coś konkretnego ❤️',
    ],
  },
];

function MessengerCard({
  name, role, rotate, delay, messages, time, avatar,
}: typeof CARDS[0]) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, transition: { type: 'spring', stiffness: 260, damping: 20 } }}
      style={{ rotate, transformOrigin: 'top center' }}
      className="relative bg-white rounded-2xl p-5 shadow-[0_8px_40px_rgba(0,0,0,0.10)] flex flex-col gap-4 w-[300px] sm:w-[320px] flex-shrink-0 cursor-default"
    >
      {/* Pin */}
      <div
        className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full shadow-md z-10"
        style={{ background: '#E8614A', boxShadow: '0 2px 8px rgba(232,97,74,0.45)' }}
      />

      {/* Messenger screenshot */}
      <div className="rounded-xl overflow-hidden bg-[#1c1c1e] pb-4 px-3 flex flex-col gap-2 mt-2 relative">

        {/* Status bar */}
        <div className="flex items-center justify-center h-6 bg-[#1c1c1e]">
          <span className="text-white/40 text-[10px] font-medium tracking-widest">{time}</span>
        </div>

        {/* Messenger header — contact */}
        <div className="flex flex-col items-center gap-1.5 py-3 border-b border-white/10">
          <div className="relative">
            <img
              src={avatar}
              alt={name}
              className="w-12 h-12 rounded-full object-cover ring-2 ring-white/10"
            />
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#1c1c1e]" />
          </div>
          <div className="text-center">
            <div className="text-white text-[11px] font-semibold leading-none">{name}</div>
            <div className="text-white/35 text-[9px] mt-0.5">Facebook · {role}</div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex flex-col gap-2 pt-1">
          {messages.map((msg, i) => (
            <div key={i} className="flex flex-col items-start gap-0.5">
              <div
                className="rounded-2xl rounded-tl-sm px-3 py-2 text-[11.5px] leading-[1.55] text-white/90"
                style={{ background: '#3a3a3c', maxWidth: '92%' }}
              >
                {msg}
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Author */}
      <div className="px-1">
        <div className="font-display text-2xl font-black text-forest tracking-tight leading-none mb-1">
          {name}
        </div>
        <div className="text-[11px] font-semibold tracking-[0.15em] uppercase text-coral/70">
          {role}
        </div>
      </div>
    </motion.div>
  );
}

export default function Testimonials() {
  return (
    <section id="opinie" className="py-24 md:py-32 bg-cream overflow-hidden">
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
            Co mówią mamy
          </div>
          <h2 className="font-display text-4xl md:text-5xl text-forest leading-tight tracking-tight mb-4 font-black">
            Trzy domy. Trzy nastolatki.<br />
            <span className="text-coral">Jedna rzecz się zmieniła.</span>
          </h2>
          <p className="text-forest/55 text-lg max-w-xl mx-auto">
            Ponad 2 847 mam już skorzystało. Oto co piszą.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20"
        >
          {[
            { ...STATS[0], icon: '👩', accent: '#8BB5A0', label2: 'mam nie czeka biernie' },
            { ...STATS[1], icon: '⭐', accent: '#E8C84A', label2: 'średnia ocena' },
            { ...STATS[2], icon: '🛡️', accent: '#7AB5E8', label2: 'gwarancji zwrotu' },
            { ...STATS[3], icon: '💬', accent: '#E8614A', label2: 'czuje się bezradnie' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
              whileHover={{ y: -6, scale: 1.04 }}
              style={{ transition: 'box-shadow 0.3s' }}
              className="relative bg-forest rounded-2xl p-5 text-center overflow-hidden group cursor-default"
            >
              {/* Glow blob */}
              <div
                className="absolute -top-6 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full blur-2xl opacity-20 group-hover:opacity-35 transition-opacity duration-500"
                style={{ background: stat.accent }}
              />
              {/* Top line accent */}
              <div
                className="absolute inset-x-0 top-0 h-[3px] rounded-t-2xl opacity-70"
                style={{ background: `linear-gradient(90deg, transparent, ${stat.accent}, transparent)` }}
              />
              <div className="relative z-10 flex flex-col items-center gap-2">
                {/* Icon */}
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-base mb-1"
                  style={{ background: `${stat.accent}22`, border: `1px solid ${stat.accent}44` }}
                >
                  {stat.icon}
                </div>
                {/* Number */}
                <div className="font-display text-3xl md:text-4xl text-white font-bold leading-none">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                {/* Divider */}
                <div className="w-8 h-px mx-auto" style={{ background: `${stat.accent}50` }} />
                {/* Label */}
                <div className="text-sage/70 text-xs md:text-sm leading-snug">{stat.label2}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>

      {/* Cards row */}
      <div className="flex justify-center items-start gap-6 md:gap-10 px-6 pt-6 pb-16 flex-wrap md:flex-nowrap">
        {CARDS.map((card, i) => (
          <div
            key={i}
            style={{ marginTop: i === 1 ? '40px' : '0' }}
          >
            <MessengerCard {...card} />
          </div>
        ))}
      </div>

      {/* Guarantee + CTA */}
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 bg-gradient-to-br from-sage/10 to-sage/5 border border-sage/20 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 text-center md:text-left relative overflow-hidden"
        >
          <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-sage/50 to-transparent rounded-t-2xl" />
          <div className="w-16 h-16 bg-forest rounded-2xl flex items-center justify-center flex-shrink-0 mx-auto md:mx-0 shadow-lg shadow-forest/20">
            <span className="text-2xl">🛡️</span>
          </div>
          <div>
            <h3 className="font-display text-forest text-xl font-semibold mb-1">
              30 dni gwarancji zwrotu — bez pytań
            </h3>
            <p className="text-forest/60 text-sm leading-relaxed max-w-xl">
              Jeśli po przeczytaniu ebooka uznasz, że to nie dla Ciebie — wyślij jednego maila.
              Zwrot pieniędzy w 3 dni robocze. Nie chcę Twoich pieniędzy, jeśli nie pomogłam.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 text-center"
        >
          <p className="text-forest/60 text-base mb-5">
            Dołącz do nich — i zacznij działać jeszcze dziś wieczór.
          </p>
          <a
            href="#oferta"
            className="group inline-flex items-center gap-3 bg-coral hover:bg-coral-dark text-white font-bold text-lg px-10 py-4 rounded-2xl transition-all duration-200 hover:scale-105 active:scale-95 shadow-xl shadow-coral/30"
          >
            <span>Chcę wiedzieć co mówić — 74 zł</span>
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >→</motion.span>
          </a>
          <p className="text-forest/35 text-xs mt-3">
            Pobierasz natychmiast · 30 dni gwarancji zwrotu
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
