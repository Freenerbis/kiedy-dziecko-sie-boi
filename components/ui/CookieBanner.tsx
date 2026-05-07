'use client';

import { useState, useEffect } from 'react';
import { Cookie, X, ChevronDown, ChevronUp } from 'lucide-react';

const STORAGE_KEY = 'cookie-consent';

type Consent = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
};

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [consent, setConsent] = useState<Consent>({
    necessary: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      const t = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(t);
    }
  }, []);

  const save = (c: Consent) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(c));
    setVisible(false);
  };

  const acceptAll = () =>
    save({ necessary: true, analytics: true, marketing: true });

  const acceptSelected = () => save(consent);

  const rejectAll = () =>
    save({ necessary: true, analytics: false, marketing: false });

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-4 right-4 z-[9999] w-[300px]"
      aria-live="polite"
      aria-label="Zgoda na pliki cookie"
    >
      <div
        className="bg-forest border border-white/10 rounded-2xl shadow-2xl shadow-black/40 overflow-hidden"
        style={{ backdropFilter: 'blur(12px)' }}
      >
        {/* Header */}
        <div className="flex items-center gap-2 px-4 pt-4 pb-2">
          <div className="w-6 h-6 bg-coral/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <Cookie className="w-3.5 h-3.5 text-coral" />
          </div>
          <p className="text-white font-semibold text-xs flex-1">
            Pliki cookie
          </p>
          <button
            onClick={rejectAll}
            className="text-white/30 hover:text-white/70 transition-colors"
            aria-label="Odrzuć i zamknij"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Description */}
        <div className="px-4 pb-2">
          <p className="text-sage/60 text-[11px] leading-relaxed">
            Używamy cookies do analizy ruchu i reklam.{' '}
            <a
              href="/polityka-prywatnosci"
              className="text-coral underline underline-offset-2 hover:text-coral/80"
            >
              Polityka prywatności
            </a>
          </p>
        </div>

        {/* Expandable details */}
        <div className="px-4 pb-1">
          <button
            onClick={() => setExpanded((v) => !v)}
            className="flex items-center gap-1 text-sage/45 text-[11px] hover:text-sage/70 transition-colors"
          >
            {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            {expanded ? 'Ukryj' : 'Dostosuj'}
          </button>

          {expanded && (
            <div className="mt-2 space-y-2 pb-1">
              {/* Necessary */}
              <div className="flex items-center gap-2">
                <div className="w-7 h-4 bg-sage/40 rounded-full relative flex-shrink-0">
                  <div className="absolute right-0.5 top-0.5 w-3 h-3 bg-white rounded-full" />
                </div>
                <div>
                  <p className="text-white/70 text-[11px] font-semibold leading-none">
                    Niezbędne <span className="text-sage/40 font-normal">(zawsze)</span>
                  </p>
                </div>
              </div>

              {/* Analytics */}
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => setConsent((c) => ({ ...c, analytics: !c.analytics }))}
              >
                <div className={`w-7 h-4 rounded-full relative flex-shrink-0 transition-colors duration-200 ${consent.analytics ? 'bg-coral' : 'bg-white/15'}`}>
                  <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all duration-200 ${consent.analytics ? 'right-0.5' : 'left-0.5'}`} />
                </div>
                <p className="text-white/70 text-[11px] font-semibold">Analityczne</p>
              </div>

              {/* Marketing */}
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => setConsent((c) => ({ ...c, marketing: !c.marketing }))}
              >
                <div className={`w-7 h-4 rounded-full relative flex-shrink-0 transition-colors duration-200 ${consent.marketing ? 'bg-coral' : 'bg-white/15'}`}>
                  <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all duration-200 ${consent.marketing ? 'right-0.5' : 'left-0.5'}`} />
                </div>
                <p className="text-white/70 text-[11px] font-semibold">Marketingowe</p>
              </div>
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2 p-4 pt-3">
          {expanded ? (
            <button
              onClick={acceptSelected}
              className="flex-1 text-center text-[11px] font-semibold text-white/55 hover:text-white border border-white/15 hover:border-white/30 py-2 px-3 rounded-xl transition-all duration-150"
            >
              Zapisz
            </button>
          ) : (
            <button
              onClick={rejectAll}
              className="flex-1 text-center text-[11px] font-semibold text-white/45 hover:text-white/70 py-2 px-3 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-150"
            >
              Odrzuć
            </button>
          )}
          <button
            onClick={acceptAll}
            className="flex-1 bg-coral hover:bg-coral-dark text-white text-[11px] font-bold py-2 px-3 rounded-xl transition-all duration-150 hover:scale-[1.02] active:scale-[0.98] shadow-md shadow-coral/30"
          >
            Akceptuj wszystkie
          </button>
        </div>
      </div>
    </div>
  );
}
