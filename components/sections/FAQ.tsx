'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import Container from '@/components/ui/Container';
import { FAQ_ITEMS } from '@/lib/constants';

function FAQItem({
  question,
  answer,
  index,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className={`rounded-2xl overflow-hidden transition-all duration-300 ${
        isOpen
          ? 'border border-coral/25 shadow-lg shadow-coral/8'
          : 'border border-cream-deeper hover:border-forest/15'
      }`}
    >
      <button
        onClick={onToggle}
        className={`w-full flex items-center justify-between gap-4 px-6 py-5 text-left transition-colors duration-200 ${
          isOpen ? 'bg-coral/[0.03]' : 'bg-white hover:bg-cream/60'
        }`}
        aria-expanded={isOpen}
      >
        <div className="flex items-start gap-3 min-w-0">
          {/* Number */}
          <span className={`font-display font-bold text-sm tabular-nums flex-shrink-0 mt-0.5 transition-colors ${isOpen ? 'text-coral/70' : 'text-forest/20'}`}>
            {String(index + 1).padStart(2, '0')}.
          </span>
          <span
            className={`font-display font-semibold text-base leading-snug transition-colors ${
              isOpen ? 'text-forest' : 'text-forest/80'
            }`}
          >
            {question}
          </span>
        </div>

        {/* Icon */}
        <div
          className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 ${
            isOpen
              ? 'bg-coral/15 text-coral border border-coral/20'
              : 'border border-forest/15 text-forest/35 hover:border-forest/30'
          }`}
        >
          {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={`px-6 pb-5 ${isOpen ? 'bg-coral/[0.03]' : 'bg-white'}`}>
              <div className="ml-9">
                <div className="w-6 h-px bg-coral/30 mb-4" />
                <p className="text-forest/65 text-sm leading-relaxed">{answer}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 md:py-32 bg-cream relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 section-divider" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 20% 50%, rgba(139,181,160,0.06) 0%, transparent 60%)',
        }}
      />

      <Container className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14"
        >
          <span className="label-badge mb-6">Pytania i odpowiedzi</span>
          <h2 className="font-display text-4xl md:text-5xl text-forest leading-tight tracking-tight font-black">
            Masz wątpliwości?<br />
            <span className="text-coral">Rozumiem — czytaj dalej.</span>
          </h2>
        </motion.div>

        {/* FAQ list */}
        <div className="max-w-2xl mx-auto flex flex-col gap-3">
          {FAQ_ITEMS.map((item, i) => (
            <FAQItem
              key={i}
              index={i}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>

        {/* Contact line */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 text-center"
        >
          <p className="text-forest/50 text-sm">
            Masz inne pytanie?{' '}
            <a
              href="mailto:kontakt@pomocemocjonalna.pl"
              className="text-forest font-medium underline-hover hover:text-coral transition-colors"
            >
              Napisz do mnie
            </a>
            {' '}— odpiszę w ciągu 24 godzin.
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
