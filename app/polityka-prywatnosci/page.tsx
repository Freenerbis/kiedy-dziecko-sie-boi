import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Polityka prywatności | Pierwsza Pomoc Emocjonalna',
  description: 'Polityka prywatności serwisu pomocemocjonalna.pl — informacje o przetwarzaniu danych osobowych, plikach cookie i prawach użytkownika.',
  robots: { index: false, follow: false },
};

export default function PolitykaPrywatnosci() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Top bar */}
      <div className="bg-forest">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-white/70 hover:text-white text-sm transition-colors">
            ← Wróć na stronę główną
          </Link>
          <span className="text-sage/50 text-xs">pomocemocjonalna.pl</span>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-forest pb-12 pt-10">
        <div className="max-w-3xl mx-auto px-6">
          <div className="inline-flex items-center gap-2 bg-white/10 text-sage text-xs font-semibold px-3 py-1.5 rounded-full mb-5 tracking-wide uppercase border border-white/10">
            Dokument prawny
          </div>
          <h1 className="font-display text-4xl md:text-5xl text-white font-black leading-tight mb-3">
            Polityka prywatności
          </h1>
          <p className="text-sage/60 text-sm">
            Obowiązuje od 1 stycznia 2025 r. &nbsp;·&nbsp; Ostatnia aktualizacja: 1 stycznia 2025 r.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="prose prose-sm max-w-none text-forest/80 space-y-10">

          {/* Intro */}
          <div className="bg-forest/5 border border-forest/10 rounded-2xl p-5 text-sm leading-relaxed text-forest/70">
            Dbamy o Twoją prywatność. Niniejsza Polityka Prywatności opisuje, jakie dane zbieramy, w jakim celu i na jakiej podstawie prawnej — oraz jakie prawa Ci przysługują. Staramy się pisać po ludzku, bez prawniczego żargonu tam, gdzie to możliwe.
          </div>

          {/* §1 */}
          <section>
            <h2 className="font-display text-xl font-bold text-forest mb-4 pb-2 border-b border-forest/10">
              §1. Administrator danych
            </h2>
            <p className="text-sm leading-relaxed mb-3">
              Administratorem Twoich danych osobowych jest:
            </p>
            <div className="bg-forest/5 rounded-xl p-4 text-sm space-y-1">
              <p><strong>Pierwsza Pomoc Emocjonalna</strong></p>
              <p>E-mail: <a href="mailto:kontakt@pomocemocjonalna.pl" className="text-coral underline underline-offset-2">kontakt@pomocemocjonalna.pl</a></p>
            </div>
            <p className="text-sm leading-relaxed mt-3">
              W sprawach dotyczących ochrony danych osobowych możesz kontaktować się z nami pod powyższym adresem e-mail.
            </p>
          </section>

          {/* §2 */}
          <section>
            <h2 className="font-display text-xl font-bold text-forest mb-4 pb-2 border-b border-forest/10">
              §2. Jakie dane zbieramy i w jakim celu
            </h2>

            <h3 className="font-semibold text-forest text-sm mb-2 mt-4">A. Dane zakupowe</h3>
            <p className="text-sm leading-relaxed mb-2">
              Gdy kupujesz Ebook, przetwarzamy:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm leading-relaxed mb-3">
              <li>imię i nazwisko (lub nazwę firmy),</li>
              <li>adres e-mail,</li>
              <li>dane do faktury (jeśli ich podanie jest potrzebne): adres, NIP.</li>
            </ul>
            <p className="text-sm leading-relaxed">
              <strong>Cel:</strong> realizacja umowy sprzedaży (dostarczenie Ebooka, wystawienie faktury).<br />
              <strong>Podstawa prawna:</strong> art. 6 ust. 1 lit. b RODO (wykonanie umowy).<br />
              <strong>Czas przechowywania:</strong> 5 lat od końca roku podatkowego, w którym nastąpiła sprzedaż (wymóg przepisów podatkowych), następnie dane są usuwane.
            </p>

            <h3 className="font-semibold text-forest text-sm mb-2 mt-6">B. Dane do marketingu e-mailowego (newsletter)</h3>
            <p className="text-sm leading-relaxed mb-2">
              Jeśli zapisujesz się na newsletter lub wyrażasz zgodę na komunikację marketingową, przetwarzamy:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm leading-relaxed mb-3">
              <li>adres e-mail.</li>
            </ul>
            <p className="text-sm leading-relaxed">
              <strong>Cel:</strong> wysyłka informacji o produktach, nowościach i treściach edukacyjnych.<br />
              <strong>Podstawa prawna:</strong> art. 6 ust. 1 lit. a RODO (Twoja zgoda).<br />
              <strong>Czas przechowywania:</strong> do momentu cofnięcia zgody. Możesz wypisać się z newslettera w każdej chwili klikając link „wypisz się" w dowolnym e-mailu.<br />
              <strong>Operator:</strong> korzystamy z platformy <strong>Resend</strong> (Resend Inc., USA) — dane przesyłane na podstawie standardowych klauzul umownych UE.
            </p>

            <h3 className="font-semibold text-forest text-sm mb-2 mt-6">C. Dane analityczne</h3>
            <p className="text-sm leading-relaxed mb-2">
              Za Twoją zgodą zbieramy dane o korzystaniu ze strony (wyłącznie anonimowe lub pseudonimizowane):
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm leading-relaxed mb-3">
              <li>strony odwiedzane, czas wizyty, źródło wejścia,</li>
              <li>typ urządzenia i przeglądarki,</li>
              <li>adres IP (w formie zanonimizowanej).</li>
            </ul>
            <p className="text-sm leading-relaxed">
              <strong>Cel:</strong> analiza ruchu na stronie, poprawa jej działania.<br />
              <strong>Podstawa prawna:</strong> art. 6 ust. 1 lit. a RODO (zgoda przez baner cookie).<br />
              <strong>Narzędzie:</strong> Google Analytics 4 (z włączoną anonimizacją IP).
            </p>

            <h3 className="font-semibold text-forest text-sm mb-2 mt-6">D. Dane marketingowe (reklamy)</h3>
            <p className="text-sm leading-relaxed mb-2">
              Za Twoją zgodą możemy korzystać z:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm leading-relaxed mb-3">
              <li>Meta Pixel (Facebook/Instagram) — śledzenie konwersji i remarketing,</li>
              <li>Google Ads — śledzenie konwersji i remarketing.</li>
            </ul>
            <p className="text-sm leading-relaxed">
              <strong>Cel:</strong> wyświetlanie dopasowanych reklam osobom, które odwiedziły stronę.<br />
              <strong>Podstawa prawna:</strong> art. 6 ust. 1 lit. a RODO (zgoda przez baner cookie).<br />
              <strong>Czas przechowywania:</strong> zgodnie z politykami Meta i Google (zazwyczaj do 180 dni).
            </p>
          </section>

          {/* §3 */}
          <section>
            <h2 className="font-display text-xl font-bold text-forest mb-4 pb-2 border-b border-forest/10">
              §3. Pliki cookie
            </h2>
            <ol className="list-decimal pl-5 space-y-2 text-sm leading-relaxed">
              <li>Strona używa plików cookie — małych plików tekstowych zapisywanych w przeglądarce.</li>
              <li>Używamy trzech kategorii cookies:
                <ul className="list-disc pl-5 mt-2 space-y-1.5">
                  <li><strong>Niezbędne</strong> — wymagane do działania strony (sesja, bezpieczeństwo). Nie wymagają zgody.</li>
                  <li><strong>Analityczne</strong> — Google Analytics. Wymagają zgody. Możesz cofnąć zgodę w dowolnym momencie.</li>
                  <li><strong>Marketingowe</strong> — Meta Pixel, Google Ads. Wymagają zgody. Możesz cofnąć zgodę w dowolnym momencie.</li>
                </ul>
              </li>
              <li>Możesz zarządzać zgodami w bannerze cookie dostępnym na stronie lub bezpośrednio w ustawieniach swojej przeglądarki.</li>
              <li>Cofnięcie zgody na cookies analityczne i marketingowe nie wpłynie na możliwość korzystania ze strony.</li>
            </ol>
          </section>

          {/* §4 */}
          <section>
            <h2 className="font-display text-xl font-bold text-forest mb-4 pb-2 border-b border-forest/10">
              §4. Przekazywanie danych podmiotom trzecim
            </h2>
            <ol className="list-decimal pl-5 space-y-2 text-sm leading-relaxed">
              <li>Nie sprzedajemy Twoich danych osobowych.</li>
              <li>Twoje dane mogą być przekazywane zaufanym podmiotom przetwarzającym dane w naszym imieniu, wyłącznie w zakresie niezbędnym do realizacji usług:
                <ul className="list-disc pl-5 mt-2 space-y-1.5">
                  <li><strong>Stripe Payments Europe, Ltd.</strong> — obsługa płatności kartą i BLIK (dane przesyłane do USA na podstawie standardowych klauzul umownych),</li>
                  <li><strong>Resend Inc.</strong> — wysyłka e-maili transakcyjnych (link do pobrania, potwierdzenia zamówień),</li>
                  <li><strong>Google LLC</strong> — Google Analytics, Google Ads (dane przesyłane do USA na podstawie standardowych klauzul umownych),</li>
                  <li><strong>Meta Platforms Ireland Ltd</strong> — Meta Pixel (dane przesyłane do USA na podstawie standardowych klauzul umownych),</li>
                  <li><strong>Dostawca hostingu</strong> — serwery strony internetowej.</li>
                </ul>
              </li>
              <li>Wszystkie podmioty przetwarzają dane na podstawie umów powierzenia przetwarzania danych i są zobowiązane do zachowania poufności.</li>
            </ol>
          </section>

          {/* §5 */}
          <section>
            <h2 className="font-display text-xl font-bold text-forest mb-4 pb-2 border-b border-forest/10">
              §5. Twoje prawa
            </h2>
            <p className="text-sm leading-relaxed mb-3">
              Na podstawie RODO przysługują Ci następujące prawa:
            </p>
            <ul className="space-y-2 text-sm leading-relaxed">
              {[
                ['Prawo dostępu', 'możesz zapytać, jakie dane o Tobie przechowujemy i otrzymać ich kopię.'],
                ['Prawo do sprostowania', 'możesz żądać poprawienia błędnych lub niekompletnych danych.'],
                ['Prawo do usunięcia', 'możesz żądać usunięcia danych (o ile nie stoją temu na przeszkodzie przepisy prawa, np. podatkowe).'],
                ['Prawo do ograniczenia przetwarzania', 'możesz żądać wstrzymania przetwarzania w określonych sytuacjach.'],
                ['Prawo do przenoszenia danych', 'możesz otrzymać swoje dane w formacie nadającym się do odczytu maszynowego.'],
                ['Prawo sprzeciwu', 'możesz sprzeciwić się przetwarzaniu danych opartemu na naszym prawnie uzasadnionym interesie.'],
                ['Prawo do cofnięcia zgody', 'jeśli przetwarzanie odbywa się na podstawie zgody, możesz ją cofnąć w dowolnym momencie bez wpływu na zgodność z prawem przetwarzania sprzed cofnięcia.'],
              ].map(([title, desc]) => (
                <li key={title} className="flex gap-2">
                  <span className="w-1.5 h-1.5 bg-coral rounded-full flex-shrink-0 mt-1.5" />
                  <span><strong>{title}</strong> — {desc}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm leading-relaxed mt-4">
              Aby skorzystać z powyższych praw, wyślij wiadomość na adres{' '}
              <a href="mailto:kontakt@pomocemocjonalna.pl" className="text-coral underline underline-offset-2">kontakt@pomocemocjonalna.pl</a>.
              Odpowiemy w ciągu 30 dni.
            </p>
            <p className="text-sm leading-relaxed mt-3">
              Masz również prawo wniesienia skargi do organu nadzorczego —{' '}
              <strong>Prezesa Urzędu Ochrony Danych Osobowych (UODO)</strong>,
              ul. Stawki 2, 00-193 Warszawa, <a href="https://www.uodo.gov.pl" className="text-coral underline underline-offset-2" target="_blank" rel="noopener noreferrer">www.uodo.gov.pl</a>.
            </p>
          </section>

          {/* §6 */}
          <section>
            <h2 className="font-display text-xl font-bold text-forest mb-4 pb-2 border-b border-forest/10">
              §6. Bezpieczeństwo danych
            </h2>
            <ol className="list-decimal pl-5 space-y-2 text-sm leading-relaxed">
              <li>Strona działa wyłącznie przez szyfrowane połączenie HTTPS.</li>
              <li>Stosujemy odpowiednie środki techniczne i organizacyjne, aby chronić dane przed nieuprawnionym dostępem, utratą lub zniszczeniem.</li>
              <li>Dostęp do danych osobowych Klientów mają wyłącznie osoby upoważnione, zobowiązane do zachowania poufności.</li>
              <li>Dane kart płatniczych nie są przez nas przechowywane — są przetwarzane wyłącznie przez operatora płatności.</li>
            </ol>
          </section>

          {/* §7 */}
          <section>
            <h2 className="font-display text-xl font-bold text-forest mb-4 pb-2 border-b border-forest/10">
              §7. Zmiany Polityki Prywatności
            </h2>
            <ol className="list-decimal pl-5 space-y-2 text-sm leading-relaxed">
              <li>Zastrzegamy sobie prawo do zmiany niniejszej Polityki Prywatności w celu dostosowania jej do zmian prawa lub sposobu działania strony.</li>
              <li>Każda zmiana będzie opublikowana na tej stronie wraz z nową datą aktualizacji. W przypadku istotnych zmian poinformujemy Cię o tym e-mailem (jeśli jesteś zapisana/-ny na newsletter).</li>
            </ol>
          </section>

          {/* Contact box */}
          <div className="bg-forest/5 border border-forest/10 rounded-2xl p-6 mt-10">
            <p className="text-forest font-semibold text-sm mb-1">Masz pytania o prywatność?</p>
            <p className="text-forest/60 text-sm">
              Napisz do nas: <a href="mailto:kontakt@pomocemocjonalna.pl" className="text-coral underline underline-offset-2 hover:text-coral/70">kontakt@pomocemocjonalna.pl</a><br />
              Czas odpowiedzi: do 2 dni roboczych
            </p>
          </div>

        </div>

        {/* Bottom nav */}
        <div className="mt-12 pt-8 border-t border-forest/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-forest/40">
          <Link href="/" className="hover:text-forest/70 transition-colors">← Wróć na stronę główną</Link>
          <Link href="/regulamin" className="hover:text-forest/70 transition-colors">Regulamin sprzedaży →</Link>
        </div>
      </div>
    </div>
  );
}
