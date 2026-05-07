'use client';

import { Check, ShieldCheck, Download, Clock } from 'lucide-react';
import Container from '@/components/ui/Container';
import { EBOOK, PRICING_FEATURES, BONUS } from '@/lib/constants';

export default function Pricing() {
  return (
    <section id="oferta" className="py-24 md:py-32 bg-forest relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(ellipse at 70% 20%, rgba(139,181,160,0.15) 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(232,97,74,0.1) 0%, transparent 60%)',
        }}
      />
      <div className="absolute inset-0 noise-overlay opacity-[0.025] pointer-events-none" />

      <Container className="relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white/10 text-sage text-xs font-semibold px-4 py-2 rounded-full mb-6 tracking-wide uppercase border border-white/10">
            Twój ebook
          </div>
          <h2 className="font-display text-4xl md:text-5xl text-white leading-tight tracking-tight mb-4 font-black">
            Zacznij działać dziś.
            <br />
            <span className="text-sage">Nie za 4 miesiące.</span>
          </h2>
        </div>

        {/* Pricing card */}
        <div className="max-w-2xl mx-auto">
          <div className="relative bg-white rounded-3xl overflow-hidden shadow-2xl shadow-black/30">
            {/* Badge */}
            <div className="absolute top-5 right-5 bg-coral text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg shadow-coral/40 z-10">
              -42% teraz
            </div>

            {/* Top section */}
            <div className="bg-forest p-6 pb-8">
              <div className="flex items-end gap-3 mb-2">
                <span className="font-display text-5xl text-white font-bold leading-none">
                  {EBOOK.price} zł
                </span>
                <div className="mb-2">
                  <div className="text-sage/60 text-sm line-through leading-none mb-1">
                    {EBOOK.originalPrice} zł
                  </div>
                  <div className="text-coral text-xs font-semibold">Oszczędzasz {EBOOK.originalPrice - EBOOK.price} zł</div>
                </div>
              </div>

              {/* Price comparisons */}
              <div className="flex flex-wrap gap-2 mb-3">
                {[
                  '< jedna wizyta u psychologa',
                  '2,47 zł / dzień',
                  'mniej niż kawa tygodniowo',
                ].map((label) => (
                  <span key={label} className="text-[11px] bg-white/10 text-sage/80 px-2.5 py-1 rounded-full border border-white/10">
                    {label}
                  </span>
                ))}
              </div>

              <p className="text-sage/70 text-sm mb-6">{EBOOK.subtitle}</p>
            </div>

            {/* Features */}
            <div className="p-6">
              <p className="text-forest font-semibold text-sm mb-5 uppercase tracking-wide">
                Co zawiera ebook:
              </p>
              <ul className="space-y-3 mb-8">
                {PRICING_FEATURES.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-coral/15 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-coral" strokeWidth={3} />
                    </div>
                    <span className="text-forest/75 text-sm leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Value stack */}
              <div className="mb-6 rounded-xl bg-sage/8 border border-sage/20 p-4">
                <p className="text-forest/50 text-xs uppercase tracking-wide font-semibold mb-3">Co dostajesz w pakiecie:</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-forest/70">Ebook (90–110 stron, 16 rozdziałów)</span>
                    <span className="text-forest/50 line-through text-xs mt-0.5">127 zł</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-forest/70">Bonus: Telefon SOS (20 gotowych zdań)</span>
                    <span className="text-forest/50 line-through text-xs mt-0.5">49 zł</span>
                  </div>
                  <div className="border-t border-sage/20 pt-2 flex justify-between font-bold">
                    <span className="text-forest text-sm">Łączna wartość</span>
                    <span className="text-forest/50 line-through text-sm">176 zł</span>
                  </div>
                  <div className="flex justify-between font-black">
                    <span className="text-forest">Ty płacisz dziś</span>
                    <span className="text-coral text-lg">74 zł</span>
                  </div>
                </div>
              </div>

              {/* Bonus box */}
              <div className="mb-8 rounded-2xl border-2 border-dashed border-coral/30 bg-coral/5 p-5">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="text-forest font-bold text-sm">🎁 Bonus: {BONUS.title}</span>
                  <span className="text-[11px] bg-coral/15 text-coral font-semibold px-2 py-0.5 rounded-full">
                    gratis
                  </span>
                </div>
                <p className="text-forest/55 text-xs leading-relaxed">
                  {BONUS.description}
                </p>
              </div>

              {/* CTA */}
              <a
                href={EBOOK.buyLink}
                className="group relative w-full inline-flex items-center justify-center gap-3 bg-coral hover:bg-coral-dark text-white font-bold text-base py-3.5 px-8 rounded-2xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-coral/35 overflow-hidden"
              >
                <Download className="w-5 h-5 relative z-10" />
                <span className="relative z-10">Chcę wiedzieć co mówić — 74 zł</span>
                <span className="absolute inset-0 bg-white/15 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </a>

              {/* Trust row */}
              <div className="mt-5 flex flex-col sm:flex-row items-center justify-center gap-4 text-forest/45 text-xs">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-sage" />
                  30 dni gwarancji zwrotu
                </div>
                <div className="hidden sm:block w-px h-4 bg-forest/10" />
                <div className="flex items-center gap-1.5">
                  <Download className="w-3.5 h-3.5 text-sage" />
                  Pobierasz natychmiast
                </div>
                <div className="hidden sm:block w-px h-4 bg-forest/10" />
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-sage" />
                  Dostęp bezterminowy
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Note below card */}
        <p className="text-center text-sage/40 text-xs mt-8 max-w-md mx-auto">
          Ten ebook nie zastępuje terapii ani pomocy psychologicznej. Jest narzędziem pierwszej pomocy emocjonalnej na czas oczekiwania na specjalistę.
        </p>
      </Container>
    </section>
  );
}
