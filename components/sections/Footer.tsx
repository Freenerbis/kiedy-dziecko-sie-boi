import { BookOpen } from 'lucide-react';
import Container from '@/components/ui/Container';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-forest-deep py-12 border-t border-white/8">
      <Container>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-coral rounded-lg flex items-center justify-center">
              <BookOpen className="w-3.5 h-3.5 text-white" />
            </div>
            <div>
              <div className="text-white text-sm font-semibold font-display">Pierwsza Pomoc Emocjonalna</div>
              <div className="text-sage/40 text-xs">dla mam nastolatków</div>
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {[
              { label: 'Regulamin', href: '/regulamin' },
              { label: 'Polityka prywatności', href: '/polityka-prywatnosci' },
              { label: 'Kontakt', href: 'mailto:kontakt@pomocemocjonalna.pl' },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sage/40 hover:text-sage/70 text-xs transition-colors underline-hover"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-sage/30 text-xs text-center md:text-right">
            &copy; {year} Pierwsza Pomoc Emocjonalna.<br className="md:hidden" /> Wszelkie prawa zastrzeżone.
          </p>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 pt-6 border-t border-white/5 text-center">
          <p className="text-sage/25 text-[11px] leading-relaxed max-w-2xl mx-auto">
            Treści zawarte w tym ebooku mają charakter informacyjny i edukacyjny. Nie zastępują porady psychologicznej, psychiatrycznej ani terapeutycznej. W sytuacji zagrożenia życia lub zdrowia dziecka skontaktuj się z pogotowiem (112) lub Telefonem Zaufania dla Dzieci i Młodzieży (116 111).
          </p>
        </div>
      </Container>
    </footer>
  );
}
