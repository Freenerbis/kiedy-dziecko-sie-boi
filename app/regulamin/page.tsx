import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Regulamin sprzedaży | Pierwsza Pomoc Emocjonalna',
  description: 'Regulamin sprzedaży ebooka „Co robić, zanim dostaniesz się do psychologa?" — warunki zakupu, dostawy, zwrotów i reklamacji.',
  robots: { index: false, follow: false },
};

export default function Regulamin() {
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
            Regulamin sprzedaży
          </h1>
          <p className="text-sage/60 text-sm">
            Obowiązuje od 1 stycznia 2025 r. &nbsp;·&nbsp; Ostatnia aktualizacja: 1 stycznia 2025 r.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="prose prose-sm max-w-none text-forest/80 space-y-10">

          {/* §1 */}
          <section>
            <h2 className="font-display text-xl font-bold text-forest mb-4 pb-2 border-b border-forest/10">
              §1. Postanowienia ogólne
            </h2>
            <ol className="list-decimal pl-5 space-y-2 text-sm leading-relaxed">
              <li>Niniejszy Regulamin określa warunki sprzedaży produktów cyfrowych oferowanych za pośrednictwem serwisu internetowego dostępnego pod adresem <strong>pomocemocjonalna.pl</strong> (dalej: „Sklep").</li>
              <li>Sprzedawcą jest osoba fizyczna prowadząca działalność pod nazwą <strong>Pierwsza Pomoc Emocjonalna</strong>, e-mail: <strong>kontakt@pomocemocjonalna.pl</strong> (dalej: „Sprzedawca").</li>
              <li>Kupującym może być każda pełnoletnia osoba fizyczna posiadająca pełną zdolność do czynności prawnych, osoba prawna lub jednostka organizacyjna nieposiadająca osobowości prawnej (dalej: „Klient").</li>
              <li>Przed złożeniem zamówienia Klient zobowiązany jest zapoznać się z niniejszym Regulaminem. Złożenie zamówienia jest równoznaczne z akceptacją jego treści.</li>
              <li>Regulamin jest dostępny bezpłatnie pod adresem <strong>pomocemocjonalna.pl/regulamin</strong> w formie umożliwiającej jego pobranie, utrwalenie i wydrukowanie.</li>
            </ol>
          </section>

          {/* §2 */}
          <section>
            <h2 className="font-display text-xl font-bold text-forest mb-4 pb-2 border-b border-forest/10">
              §2. Przedmiot sprzedaży
            </h2>
            <ol className="list-decimal pl-5 space-y-2 text-sm leading-relaxed">
              <li>Przedmiotem sprzedaży jest produkt cyfrowy w formacie PDF — ebook pt. <strong>„Co robić, zanim dostaniesz się do psychologa? Pierwsza pomoc emocjonalna dla mamy nastolatka"</strong> (dalej: „Ebook").</li>
              <li>Ebook stanowi utwór w rozumieniu ustawy z dnia 4 lutego 1994 r. o prawie autorskim i prawach pokrewnych i jest chroniony prawem autorskim. Wszelkie prawa zastrzeżone.</li>
              <li>Ebook zawiera materiały edukacyjne o charakterze informacyjnym. <strong>Nie stanowi on porady medycznej, psychologicznej ani terapeutycznej i nie zastępuje konsultacji ze specjalistą.</strong></li>
              <li>Opis produktu, liczba stron i zawarte narzędzia mogą ulegać aktualizacjom w kolejnych wersjach pliku. Klient ma prawo do pobrania najnowszej wersji bez dodatkowych opłat.</li>
            </ol>
          </section>

          {/* §3 */}
          <section>
            <h2 className="font-display text-xl font-bold text-forest mb-4 pb-2 border-b border-forest/10">
              §3. Składanie zamówień
            </h2>
            <ol className="list-decimal pl-5 space-y-2 text-sm leading-relaxed">
              <li>Zamówienia przyjmowane są przez całą dobę, 7 dni w tygodniu, za pośrednictwem formularza zamówienia dostępnego w Sklepie.</li>
              <li>W celu złożenia zamówienia Klient podaje: imię i nazwisko (lub nazwę firmy), adres e-mail oraz dane do faktury (jeśli dotyczy).</li>
              <li>Po złożeniu zamówienia Klient otrzymuje na podany adres e-mail potwierdzenie złożenia zamówienia wraz z podsumowaniem jego szczegółów.</li>
              <li>Umowa sprzedaży zostaje zawarta z chwilą zaksięgowania płatności na rachunku Sprzedawcy.</li>
              <li>Sprzedawca zastrzega sobie prawo do anulowania zamówienia w przypadku podania przez Klienta błędnych danych lub braku możliwości realizacji płatności. O anulowaniu Klient jest niezwłocznie informowany drogą elektroniczną.</li>
            </ol>
          </section>

          {/* §4 */}
          <section>
            <h2 className="font-display text-xl font-bold text-forest mb-4 pb-2 border-b border-forest/10">
              §4. Ceny i płatności
            </h2>
            <ol className="list-decimal pl-5 space-y-2 text-sm leading-relaxed">
              <li>Ceny podane w Sklepie są cenami brutto i wyrażone są w polskich złotych (PLN). Cena zawiera podatek VAT według obowiązujących przepisów.</li>
              <li>Cena obowiązująca w chwili złożenia zamówienia jest wiążąca dla obu stron umowy.</li>
              <li>Dostępne metody płatności:
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li>BLIK</li>
                  <li>karta płatnicza (Visa, Mastercard)</li>
                  <li>szybki przelew bankowy</li>
                </ul>
              </li>
              <li>Płatności obsługiwane są przez <strong>Stripe Payments Europe, Ltd.</strong> Sprzedawca nie przechowuje danych kart płatniczych Klientów.</li>
              <li>Na życzenie Klienta Sprzedawca wystawia fakturę VAT. Prośbę o fakturę należy zgłosić najpóźniej w dniu zakupu, podając dane firmy i NIP.</li>
            </ol>
          </section>

          {/* §5 */}
          <section>
            <h2 className="font-display text-xl font-bold text-forest mb-4 pb-2 border-b border-forest/10">
              §5. Dostawa produktu cyfrowego
            </h2>
            <ol className="list-decimal pl-5 space-y-2 text-sm leading-relaxed">
              <li>Ebook dostarczany jest drogą elektroniczną, natychmiast po zaksięgowaniu płatności — na adres e-mail podany przez Klienta przy zamówieniu.</li>
              <li>E-mail zawiera link do pobrania pliku PDF. Link jest aktywny przez 30 dni i umożliwia pobranie pliku maksymalnie 5 razy. W przypadku problemów z pobraniem Klient może skontaktować się ze Sprzedawcą w celu uzyskania nowego linku.</li>
              <li>Sprzedawca nie ponosi odpowiedzialności za niedostarczenie e-maila wynikające z przyczyn leżących po stronie operatora poczty elektronicznej Klienta lub błędnie podanego adresu e-mail.</li>
              <li>Ebook nie jest dostarczany w formie fizycznej (drukowanej).</li>
            </ol>
          </section>

          {/* §6 */}
          <section>
            <h2 className="font-display text-xl font-bold text-forest mb-4 pb-2 border-b border-forest/10">
              §6. Prawo do odstąpienia od umowy i gwarancja satysfakcji
            </h2>
            <ol className="list-decimal pl-5 space-y-2 text-sm leading-relaxed">
              <li>Zgodnie z art. 38 pkt 13 ustawy z dnia 30 maja 2014 r. o prawach konsumenta, prawo do odstąpienia od umowy bez podania przyczyny <strong>nie przysługuje</strong> w przypadku treści cyfrowych, które nie są zapisane na nośniku materialnym, jeżeli spełnianie świadczenia rozpoczęło się za wyraźną zgodą konsumenta przed upływem terminu do odstąpienia od umowy i po poinformowaniu go przez przedsiębiorcę o utracie prawa do odstąpienia od umowy.</li>
              <li>Klient wyraża taką zgodę w trakcie procesu zakupu, zaznaczając stosowne pole przed sfinalizowaniem zamówienia.</li>
              <li>Pomimo powyższego, Sprzedawca dobrowolnie oferuje <strong>30-dniową gwarancję satysfakcji</strong>: jeżeli w ciągu 30 dni od daty zakupu Klient uzna, że Ebook nie spełnił jego oczekiwań, może zwrócić się o pełen zwrot ceny zakupu bez podania przyczyny.</li>
              <li>W celu skorzystania z gwarancji satysfakcji należy przesłać wiadomość e-mail na adres <strong>kontakt@pomocemocjonalna.pl</strong> z tytułem „ZWROT" i podać adres e-mail użyty przy zakupie.</li>
              <li>Zwrot zostanie zrealizowany w ciągu <strong>3 dni roboczych</strong> tą samą metodą płatności, którą Klient dokonał zakupu.</li>
              <li>Gwarancja satysfakcji jest dobrowolnym zobowiązaniem Sprzedawcy i nie ogranicza ani nie wyłącza ustawowych praw konsumenta.</li>
            </ol>
          </section>

          {/* §7 */}
          <section>
            <h2 className="font-display text-xl font-bold text-forest mb-4 pb-2 border-b border-forest/10">
              §7. Reklamacje
            </h2>
            <ol className="list-decimal pl-5 space-y-2 text-sm leading-relaxed">
              <li>Klient ma prawo złożyć reklamację, jeżeli Ebook jest niezgodny z opisem lub nie nadaje się do użycia (np. plik jest uszkodzony, niepełny lub nie otwiera się).</li>
              <li>Reklamację należy złożyć na adres e-mail: <strong>kontakt@pomocemocjonalna.pl</strong> z tytułem „REKLAMACJA". W treści wiadomości należy wskazać: imię i nazwisko, adres e-mail użyty przy zakupie, opis stwierdzonej wady oraz żądanie Klienta.</li>
              <li>Sprzedawca rozpatruje reklamację w terminie 14 dni roboczych od daty jej otrzymania i informuje Klienta o wyniku drogą elektroniczną.</li>
              <li>W przypadku uznania reklamacji Sprzedawca przesyła Klientowi poprawiony lub nowy plik bądź — na życzenie Klienta — dokonuje zwrotu ceny.</li>
            </ol>
          </section>

          {/* §8 */}
          <section>
            <h2 className="font-display text-xl font-bold text-forest mb-4 pb-2 border-b border-forest/10">
              §8. Licencja i prawa autorskie
            </h2>
            <ol className="list-decimal pl-5 space-y-2 text-sm leading-relaxed">
              <li>Zakup Ebooka uprawnia Klienta do korzystania z niego wyłącznie na własny użytek osobisty (licencja niewyłączna, nieprzenoszalna).</li>
              <li>Zabronione jest w szczególności:
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li>kopiowanie, powielanie i dystrybucja Ebooka w całości lub w części,</li>
                  <li>udostępnianie Ebooka osobom trzecim odpłatnie lub nieodpłatnie,</li>
                  <li>publikowanie treści Ebooka w internecie (w tym na portalach społecznościowych),</li>
                  <li>przetwarzanie, tłumaczenie lub tworzenie dzieł zależnych bez pisemnej zgody Sprzedawcy.</li>
                </ul>
              </li>
              <li>Naruszenie praw autorskich może skutkować odpowiedzialnością cywilną i karną na podstawie przepisów ustawy o prawie autorskim i prawach pokrewnych.</li>
            </ol>
          </section>

          {/* §9 */}
          <section>
            <h2 className="font-display text-xl font-bold text-forest mb-4 pb-2 border-b border-forest/10">
              §9. Odpowiedzialność
            </h2>
            <ol className="list-decimal pl-5 space-y-2 text-sm leading-relaxed">
              <li>Treści zawarte w Ebooku mają charakter wyłącznie edukacyjny i informacyjny. Sprzedawca nie ponosi odpowiedzialności za skutki stosowania zawartych w nim wskazówek.</li>
              <li>Ebook nie zastępuje profesjonalnej pomocy psychologicznej, terapeutycznej ani medycznej. W przypadku podejrzenia poważnych zaburzeń psychicznych lub zagrożenia życia należy niezwłocznie skontaktować się z lekarzem lub pogotowiem ratunkowym (112).</li>
              <li>Sprzedawca nie ponosi odpowiedzialności za niemożność korzystania z Ebooka wynikającą z przyczyn leżących po stronie Klienta (np. brak odpowiedniego oprogramowania do odczytu plików PDF).</li>
              <li>W zakresie dopuszczalnym przez przepisy prawa, odpowiedzialność Sprzedawcy wobec Klienta niebędącego konsumentem ograniczona jest do wartości zapłaconej ceny Ebooka.</li>
            </ol>
          </section>

          {/* §10 */}
          <section>
            <h2 className="font-display text-xl font-bold text-forest mb-4 pb-2 border-b border-forest/10">
              §10. Ochrona danych osobowych
            </h2>
            <p className="text-sm leading-relaxed">
              Zasady przetwarzania danych osobowych Klientów określa Polityka Prywatności dostępna pod adresem{' '}
              <Link href="/polityka-prywatnosci" className="text-coral underline underline-offset-2 hover:text-coral/70">
                pomocemocjonalna.pl/polityka-prywatnosci
              </Link>.
            </p>
          </section>

          {/* §11 */}
          <section>
            <h2 className="font-display text-xl font-bold text-forest mb-4 pb-2 border-b border-forest/10">
              §11. Pozasądowe sposoby rozwiązywania sporów
            </h2>
            <ol className="list-decimal pl-5 space-y-2 text-sm leading-relaxed">
              <li>Konsument ma prawo skorzystać z pozasądowych sposobów rozwiązywania sporów, w tym:
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li>mediacji prowadzonej przez Inspekcję Handlową,</li>
                  <li>postępowania przed Stałym Polubownym Sądem Konsumenckim,</li>
                  <li>platformy ODR dostępnej pod adresem: <a href="https://ec.europa.eu/consumers/odr" className="text-coral underline underline-offset-2 hover:text-coral/70" target="_blank" rel="noopener noreferrer">ec.europa.eu/consumers/odr</a>.</li>
                </ul>
              </li>
              <li>Sprzedawca nie jest obowiązany do korzystania z pozasądowych sposobów rozwiązywania sporów, jednak dokłada wszelkich starań, aby spory rozwiązywać polubownie.</li>
            </ol>
          </section>

          {/* §12 */}
          <section>
            <h2 className="font-display text-xl font-bold text-forest mb-4 pb-2 border-b border-forest/10">
              §12. Postanowienia końcowe
            </h2>
            <ol className="list-decimal pl-5 space-y-2 text-sm leading-relaxed">
              <li>W sprawach nieuregulowanych niniejszym Regulaminem zastosowanie mają przepisy prawa polskiego, w szczególności Kodeksu Cywilnego oraz ustawy o prawach konsumenta.</li>
              <li>Sprzedawca zastrzega sobie prawo do zmiany Regulaminu. Zmiany wchodzą w życie z dniem ich opublikowania w Sklepie i nie mają zastosowania do zamówień złożonych przed datą zmiany.</li>
              <li>Sądem właściwym do rozstrzygania sporów wynikłych z umów zawartych z konsumentami jest sąd właściwy miejscowo dla siedziby konsumenta lub sąd właściwy według przepisów ogólnych — według wyboru konsumenta.</li>
            </ol>
          </section>

          {/* Contact box */}
          <div className="bg-forest/5 border border-forest/10 rounded-2xl p-6 mt-10">
            <p className="text-forest font-semibold text-sm mb-1">Kontakt w sprawie zamówień i zwrotów</p>
            <p className="text-forest/60 text-sm">
              E-mail: <a href="mailto:kontakt@pomocemocjonalna.pl" className="text-coral underline underline-offset-2 hover:text-coral/70">kontakt@pomocemocjonalna.pl</a><br />
              Czas odpowiedzi: do 2 dni roboczych
            </p>
          </div>

        </div>

        {/* Bottom nav */}
        <div className="mt-12 pt-8 border-t border-forest/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-forest/40">
          <Link href="/" className="hover:text-forest/70 transition-colors">← Wróć na stronę główną</Link>
          <Link href="/polityka-prywatnosci" className="hover:text-forest/70 transition-colors">Polityka prywatności →</Link>
        </div>
      </div>
    </div>
  );
}
