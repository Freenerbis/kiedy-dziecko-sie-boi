'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { PhoneMissed, UtensilsCrossed, Lock, VolumeX, BedDouble, School, Send } from 'lucide-react';
import Container from '@/components/ui/Container';

type Msg = {
  id: number;
  from: 'mama' | 'zosia' | 'seen';
  text: string;
  time: string;
};

const now = () => new Date().toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' });

const INITIAL_MSGS: Msg[] = [
  { id: 1, from: 'mama',  text: 'Córeczko, jak było w szkole?',             time: '15:12' },
  { id: 2, from: 'zosia', text: 'ok',                                        time: '18:47' },
  { id: 3, from: 'mama',  text: 'Coś się stało? Czekałam na Ciebie z obiadem', time: '18:49' },
  { id: 4, from: 'zosia', text: 'nie chce mi się jeść',                      time: '21:03' },
  { id: 5, from: 'mama',  text: 'Wszystko dobrze? Może pogadamy wieczorem?', time: '21:05' },
  { id: 6, from: 'mama',  text: 'Kocham Cię',                                time: '22:30' },
  { id: 7, from: 'seen',  text: 'Wyświetlono • 22:31',                       time: '' },
];

const ZOSIA_REPLIES = [
  { type: 'text', text: 'ok' },
  { type: 'text', text: 'nie wiem' },
  { type: 'seen', text: 'Wyświetlono' },
  { type: 'text', text: 'zostaw mnie' },
  { type: 'text', text: 'spoko' },
  { type: 'seen', text: 'Wyświetlono' },
  { type: 'text', text: 'nie chce mi się gadać' },
  { type: 'text', text: 'wszystko dobrze' },
  { type: 'text', text: 'mhm' },
  { type: 'seen', text: 'Wyświetlono' },
  { type: 'text', text: 'po co pytasz' },
  { type: 'text', text: 'jestem zmęczona' },
  { type: 'text', text: 'nie teraz' },
  { type: 'seen', text: 'Wyświetlono' },
  { type: 'text', text: '...' },
  { type: 'text', text: 'nie wiem co chcesz żebym powiedziała' },
];

const SIGNALS = [
  { Icon: PhoneMissed,     label: 'Nie odbiera, nie odpisuje' },
  { Icon: UtensilsCrossed, label: 'Odmawia jedzenia' },
  { Icon: Lock,            label: 'Zamknięta w pokoju' },
  { Icon: VolumeX,         label: 'Jednosylabowe odpowiedzi' },
  { Icon: BedDouble,       label: 'Śpi za dużo lub za mało' },
  { Icon: School,          label: 'Unika szkoły, wagary' },
];

let replyIndex = 0;

export default function ChildMessages() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Msg[]>(INITIAL_MSGS);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [nextId, setNextId] = useState(100);

  const scrollToBottom = () => {
    const container = chatContainerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  };

  useEffect(() => { scrollToBottom(); }, [messages, isTyping]);

  const sendMessage = useCallback(() => {
    const text = input.trim();
    if (!text || isTyping) return;

    const mamaMsg: Msg = { id: nextId, from: 'mama', text, time: now() };
    setMessages(prev => [...prev, mamaMsg]);
    setNextId(n => n + 1);
    setInput('');

    const reply = ZOSIA_REPLIES[replyIndex % ZOSIA_REPLIES.length];
    replyIndex++;

    const typingDelay = 800 + Math.random() * 600;
    const replyDelay = typingDelay + 1500 + Math.random() * 1500;

    setTimeout(() => setIsTyping(true), typingDelay);
    setTimeout(() => {
      setIsTyping(false);
      const zMsg: Msg = {
        id: nextId + 1,
        from: reply.type === 'seen' ? 'seen' : 'zosia',
        text: reply.type === 'seen' ? `${reply.text} • ${now()}` : reply.text,
        time: now(),
      };
      setMessages(prev => [...prev, zMsg]);
      setNextId(n => n + 2);
    }, replyDelay);
  }, [input, isTyping, nextId]);

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') sendMessage();
  };

  return (
    <section className="py-24 md:py-32 bg-paper overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-center">

          {/* Left: interactive phone */}
          <div className="flex flex-col items-center order-2 lg:order-1" ref={sectionRef}>
            <div className="flex items-center gap-4">
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              {/* Glow */}
              <div className="absolute -inset-8 bg-forest/6 rounded-[56px] blur-3xl" />

              {/* Phone frame */}
              <div
                className="relative w-[240px] rounded-[40px] overflow-hidden shadow-2xl shadow-forest/25"
                style={{ background: '#F2F2F7', border: '10px solid #1C1C1E' }}
              >
                {/* Dynamic Island */}
                <div className="flex justify-center pt-2 pb-1 bg-[#F2F2F7]">
                  <div className="w-[90px] h-[30px] bg-[#1C1C1E] rounded-full flex items-center justify-center gap-2">
                    <div className="w-2.5 h-2.5 bg-[#2C2C2E] rounded-full" />
                    <div className="w-1.5 h-1.5 bg-[#3A3A3C] rounded-full" />
                  </div>
                </div>

                {/* Status bar */}
                <div className="flex justify-between items-center px-4 pb-1 bg-[#F2F2F7]">
                  <span className="text-[#1C1C1E] text-[9px] font-semibold">9:41</span>
                  <div className="flex items-center gap-1">
                    <div className="flex gap-[2px] items-end h-2.5">
                      {[3, 5, 7, 9].map((h, i) => (
                        <div key={i} className="w-[3px] bg-[#1C1C1E] rounded-full" style={{ height: `${h}px` }} />
                      ))}
                    </div>
                    <div className="w-[14px] h-[7px] border border-[#1C1C1E]/60 rounded-[2px] relative ml-0.5">
                      <div className="absolute inset-[1px] right-[1px] bg-[#1C1C1E]/60 rounded-[1px]" />
                    </div>
                  </div>
                </div>

                {/* Top bar */}
                <div className="bg-[#F2F2F7] border-b border-[#C6C6C8]/60 px-4 py-2.5 flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-sage to-forest rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-[11px] font-bold">Z</span>
                  </div>
                  <div>
                    <div className="text-[#1C1C1E] text-[11px] font-semibold">Zosia</div>
                    <div className="text-[#8E8E93] text-[9px]">Ostatnio aktywna 3 godz. temu</div>
                  </div>
                  <motion.div
                    className="ml-auto w-2 h-2 bg-orange-400 rounded-full"
                    animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>

                {/* Messages */}
                <div
                  ref={chatContainerRef}
                  className="bg-white px-3 py-3 flex flex-col gap-2 overflow-y-auto no-scrollbar"
                  style={{ height: '260px' }}
                >
                  <AnimatePresence initial={false}>
                    {messages.map((msg) => {
                      if (msg.from === 'seen') {
                        return (
                          <motion.div
                            key={msg.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex justify-end"
                          >
                            <span className="text-[#8E8E93] text-[8px] italic">{msg.text}</span>
                          </motion.div>
                        );
                      }
                      const isMama = msg.from === 'mama';
                      return (
                        <motion.div
                          key={msg.id}
                          initial={{ opacity: 0, y: 10, scale: 0.94 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                          className={`flex flex-col gap-0.5 ${isMama ? 'items-end' : 'items-start'}`}
                        >
                          <div
                            className={`max-w-[78%] px-3 py-1.5 text-[10px] leading-snug rounded-2xl ${
                              isMama
                                ? 'bg-[#007AFF] text-white rounded-br-[4px]'
                                : 'bg-[#E9E9EB] text-[#1C1C1E] rounded-bl-[4px]'
                            }`}
                          >
                            {msg.text}
                          </div>
                          {msg.time && (
                            <span className="text-[7px] text-[#8E8E93]">{msg.time}</span>
                          )}
                        </motion.div>
                      );
                    })}

                    {/* Typing indicator */}
                    {isTyping && (
                      <motion.div
                        key="typing"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex items-start gap-1"
                      >
                        <div className="bg-[#E9E9EB] px-3 py-2 rounded-2xl rounded-bl-[4px] flex gap-1 items-center">
                          {[0, 0.2, 0.4].map((d, i) => (
                            <motion.span
                              key={i}
                              className="w-1.5 h-1.5 bg-[#8E8E93] rounded-full block"
                              animate={{ y: [0, -3, 0] }}
                              transition={{ duration: 0.5, delay: d, repeat: Infinity }}
                            />
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Input */}
                <div className="bg-[#F2F2F7] border-t border-[#C6C6C8]/60 px-3 py-2 flex items-center gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={handleKey}
                    placeholder="Napisz do Zosi..."
                    disabled={isTyping}
                    className="flex-1 bg-white border border-[#C6C6C8]/80 rounded-full px-3 py-1.5 text-[#1C1C1E] text-[9px] placeholder:text-[#8E8E93] outline-none disabled:opacity-50"
                  />
                  <button
                    onClick={sendMessage}
                    disabled={!input.trim() || isTyping}
                    className="w-7 h-7 bg-[#007AFF] disabled:bg-[#C7C7CC] rounded-full flex items-center justify-center transition-colors flex-shrink-0"
                  >
                    <Send className="w-3 h-3 text-white" />
                  </button>
                </div>

                {/* Home bar */}
                <div className="bg-[#F2F2F7] flex justify-center py-1.5">
                  <div className="w-20 h-1 bg-[#1C1C1E]/20 rounded-full" />
                </div>
              </div>

            </motion.div>

            {/* Badge beside phone */}
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.9 }}
              animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
              transition={{ delay: 1.5, type: 'spring', stiffness: 300 }}
              className="bg-white border border-orange-100 rounded-2xl px-3 py-2.5 shadow-xl shadow-orange-500/10 w-[130px] flex-shrink-0"
            >
              <div className="text-orange-500 text-[9px] font-bold tracking-wide uppercase mb-0.5">Sygnał alarmowy</div>
              <div className="text-[#1C1C1E] text-[11px] font-semibold">Wycofanie społeczne</div>
              <div className="text-[#8E8E93] text-[9px]">3 dni bez większego kontaktu</div>
            </motion.div>
            </div>

            {/* Hint below phone */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 1.8 }}
              className="mt-10 text-forest/35 text-xs text-center max-w-[200px]"
            >
              Napisz coś do Zosi — sprawdź jak odpowiada
            </motion.p>
          </div>

          {/* Right: text + signals */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="order-1 lg:order-2"
          >
            <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-500 text-xs font-semibold px-4 py-2 rounded-full mb-6 tracking-wide uppercase border border-orange-100">
              <span className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-pulse" />
              Sygnały niepokoju
            </div>

            <h2 className="font-display font-black text-4xl md:text-5xl text-forest leading-tight tracking-tight mb-5">
              Twoje dziecko<br />
              <span className="text-coral">mówi Ci coś.</span><br />
              <span className="text-forest/50 text-3xl md:text-4xl font-bold not-italic">Tylko nie słowami.</span>
            </h2>

            <p className="text-forest/60 text-lg leading-relaxed mb-8">
              Jednosylabowe odpowiedzi, zamknięte drzwi, odrzucone telefony — to nie jest bunt.
              To sygnały, które mama powinna umieć odczytać i na które powinna wiedzieć jak zareagować.
            </p>

            {/* Signal grid */}
            <div className="relative rounded-2xl overflow-hidden p-5">
              <motion.div
                className="absolute inset-0"
                animate={{
                  background: [
                    'linear-gradient(135deg, #1E3D2F 0%, #142B20 100%)',
                    'linear-gradient(135deg, #1a3829 0%, #1E3D2F 100%)',
                    'linear-gradient(135deg, #1E3D2F 0%, #142B20 100%)',
                  ],
                }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.div
                className="absolute -top-8 -right-8 w-40 h-40 rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(232,97,74,0.25) 0%, transparent 70%)' }}
                animate={{ scale: [1, 1.3, 1], x: [0, 10, 0], y: [0, -10, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.div
                className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(139,181,160,0.2) 0%, transparent 70%)' }}
                animate={{ scale: [1, 1.4, 1], x: [0, -8, 0], y: [0, 8, 0] }}
                transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
              />
              <div className="absolute inset-0 noise-overlay opacity-[0.03] pointer-events-none" />

              <div className="relative z-10 grid grid-cols-2 gap-2.5">
                {SIGNALS.map((s, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20, scale: 0.92 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.09, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ y: -3, scale: 1.03 }}
                    className="group relative flex flex-col gap-2 bg-white/8 hover:bg-white/14 border border-white/10 hover:border-coral/40 rounded-xl px-3.5 py-3.5 transition-all duration-250 cursor-default overflow-hidden"
                  >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                      style={{ background: 'radial-gradient(circle at 50% 0%, rgba(232,97,74,0.12) 0%, transparent 70%)' }}
                    />
                    <motion.div
                      className="w-8 h-8 bg-coral/20 border border-coral/25 rounded-lg flex items-center justify-center group-hover:bg-coral/30 transition-colors duration-200"
                      whileHover={{ rotate: [0, -8, 8, 0] }}
                      transition={{ duration: 0.35 }}
                    >
                      <s.Icon className="w-3.5 h-3.5 text-coral" />
                    </motion.div>
                    <span className="text-white/80 text-[11px] font-medium leading-tight">{s.label}</span>
                    <span className="absolute bottom-1.5 right-2.5 font-display text-3xl font-black text-white/4 select-none leading-none">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="mt-4 bg-sage/12 border border-sage/20 rounded-2xl px-6 py-5"
            >
              <p className="text-forest/80 text-sm leading-relaxed">
                <strong className="text-forest font-bold">W ebooku dowiesz się:</strong>{' '}
                jak odróżnić "normalny bunt" od sygnałów wymagających działania — i co dokładnie powiedzieć, kiedy dziecko milczy.
              </p>
            </motion.div>
          </motion.div>

        </div>
      </Container>
    </section>
  );
}
