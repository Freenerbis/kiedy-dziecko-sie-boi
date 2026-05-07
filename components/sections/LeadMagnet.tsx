'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Download, CheckCircle, AlertCircle } from 'lucide-react';
import Container from '@/components/ui/Container';

type FormState = 'idle' | 'loading' | 'success' | 'error';

export default function LeadMagnet() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [formState, setFormState] = useState<FormState>('idle');
  const [shake, setShake] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }
    setFormState('loading');
    // Symulacja wysyłki — podłącz do swojego dostawcy e-mail (Mailchimp, ConvertKit, itp.)
    await new Promise((r) => setTimeout(r, 1200));
    setFormState('success');
  };

  return (
    <section className="py-24 md:py-32 bg-paper">
      <Container>
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white rounded-3xl p-8 md:p-12 border border-cream-deeper shadow-xl shadow-forest/8"
          >
            {/* Icon */}
            <div className="w-14 h-14 bg-sage/15 border border-sage/25 rounded-2xl flex items-center justify-center mb-6">
              <Download className="w-6 h-6 text-forest" />
            </div>

            {/* Header */}
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 bg-sage/15 text-forest text-xs font-semibold px-3 py-1.5 rounded-full mb-4 tracking-wide uppercase">
                Bezpłatny PDF
              </div>
              <h2 className="font-display text-3xl md:text-4xl text-forest leading-tight tracking-tight mb-3">
                Nie jesteś jeszcze gotowa?<br />
                <span className="text-coral">Zacznij od darmowego kwestionariusza.</span>
              </h2>
              <p className="text-forest/60 text-base leading-relaxed">
                Pobierz bezpłatny PDF <strong className="text-forest font-semibold">&ldquo;Czy moje dziecko potrzebuje pomocy?&rdquo;</strong> — kwestionariusz, który pomoże Ci ocenić sytuację w 10 minut. Bez zobowiązań.
              </p>
            </div>

            {/* Form or success */}
            <AnimatePresence mode="wait">
              {formState === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="text-center py-8"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1, type: 'spring', stiffness: 400, damping: 15 }}
                    className="w-16 h-16 bg-sage/15 rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                    <CheckCircle className="w-8 h-8 text-forest" />
                  </motion.div>
                  <h3 className="font-display text-forest text-2xl font-semibold mb-2">
                    Sprawdź skrzynkę!
                  </h3>
                  <p className="text-forest/60 text-sm max-w-xs mx-auto">
                    Wysłałam kwestionariusz na Twój adres. Zajrzyj też do folderu SPAM, jeśli nie widzisz wiadomości.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  animate={shake ? { x: [-8, 8, -6, 6, -4, 4, 0] } : {}}
                  transition={{ duration: 0.4 }}
                  noValidate
                >
                  {/* Social proof */}
                  <div className="flex items-center gap-2.5 mb-5 bg-sage/10 border border-sage/20 rounded-xl px-4 py-3">
                    <div className="flex -space-x-2 flex-shrink-0">
                      {['A', 'M', 'K', 'D'].map((l) => (
                        <div
                          key={l}
                          className="w-7 h-7 bg-forest text-white rounded-full border-2 border-white flex items-center justify-center text-[9px] font-bold"
                        >
                          {l}
                        </div>
                      ))}
                    </div>
                    <p className="text-forest/60 text-xs leading-snug">
                      <strong className="text-forest font-semibold">847 mam</strong> pobrało kwestionariusz w tym miesiącu
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 mb-4">
                    <input
                      type="text"
                      placeholder="Twoje imię"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="flex-1 bg-cream border border-cream-deeper focus:border-forest/40 rounded-xl px-4 py-3.5 text-forest text-sm placeholder:text-forest/35 outline-none transition-colors focus:bg-white"
                      aria-label="Imię"
                    />
                    <input
                      type="email"
                      placeholder="Twój adres e-mail"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1 bg-cream border border-cream-deeper focus:border-forest/40 rounded-xl px-4 py-3.5 text-forest text-sm placeholder:text-forest/35 outline-none transition-colors focus:bg-white"
                      aria-label="Adres e-mail"
                    />
                  </div>

                  {/* Honeypot */}
                  <input type="text" name="_hp" className="hidden" tabIndex={-1} aria-hidden="true" />

                  <button
                    type="submit"
                    disabled={formState === 'loading'}
                    className="w-full flex items-center justify-center gap-2.5 bg-forest hover:bg-forest-light text-white font-bold py-4 rounded-xl transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {formState === 'loading' ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                      />
                    ) : (
                      <>
                        <Mail className="w-4 h-4" />
                        Pobieram darmowy kwestionariusz
                      </>
                    )}
                  </button>

                  {formState === 'error' && (
                    <div className="flex items-center gap-2 text-red-500 text-xs mt-3">
                      <AlertCircle className="w-3.5 h-3.5" />
                      Coś poszło nie tak. Spróbuj ponownie.
                    </div>
                  )}

                  <p className="text-forest/35 text-xs mt-4 text-center leading-relaxed">
                    Bez spamu. Możesz wypisać się w każdej chwili. Twój adres e-mail jest bezpieczny.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
