'use client';

import { useState } from 'react';
import { Copy, Check, ExternalLink } from 'lucide-react';
import ExportAdButton from '@/components/sections/ExportAd';

// ─── Types ────────────────────────────────────────────────────────────────────
type Platform   = 'facebook' | 'instagram' | 'tiktok';
type Format     = 'square' | 'story' | 'post';
type Variant    = 'emotional' | 'problem' | 'testimonial' | 'urgency';
type FontStyle  = 'grotesk' | 'editorial' | 'mono' | 'condensed' | 'rounded';
type AdStyle    = 'dark' | 'brand';
type FunnelStage = 'cold' | 'warm' | 'retargeting';

type AdCopy = {
  headline: string;
  primary: string;
  cta: string;
  hashtags: string;
  hook?: string;
};

// ─── Config ───────────────────────────────────────────────────────────────────
const PLATFORMS: { id: Platform; label: string; icon: string }[] = [
  { id: 'facebook',  label: 'Facebook',  icon: '📘' },
  { id: 'instagram', label: 'Instagram', icon: '📸' },
  { id: 'tiktok',    label: 'TikTok',    icon: '🎵' },
];

const FORMATS: { id: Format; label: string; ratio: string; w: number; h: number }[] = [
  { id: 'square', label: 'Kwadrat',      ratio: '1:1',  w: 460, h: 460 },
  { id: 'story',  label: 'Story/Reels',  ratio: '9:16', w: 259, h: 460 },
  { id: 'post',   label: 'Post 16:9',    ratio: '16:9', w: 460, h: 259 },
];

const FUNNEL_STAGES: { id: FunnelStage; label: string; desc: string; dot: string }[] = [
  { id: 'cold',        label: '❄️ Zimny',       desc: 'Nie zna marki',   dot: '#60a5fa' },
  { id: 'warm',        label: '🔥 Ciepły',       desc: 'Odwiedził stronę', dot: '#fb923c' },
  { id: 'retargeting', label: '🎯 Retargeting',  desc: 'Był na /oferta',  dot: '#a78bfa' },
];

const VARIANTS: { id: Variant; label: string; emoji: string }[] = [
  { id: 'emotional',   label: 'Emocjonalny (PAS)', emoji: '💙' },
  { id: 'problem',     label: 'Problem + dane',    emoji: '📊' },
  { id: 'testimonial', label: 'Opinia przed/po',   emoji: '⭐' },
  { id: 'urgency',     label: 'FOMO + pilność',    emoji: '🔥' },
];

const FONTS: { id: FontStyle; label: string; family: string; headingFamily: string }[] = [
  { id: 'grotesk',   label: 'Grotesk',    family: '"Helvetica Neue",Arial,sans-serif',    headingFamily: '"Helvetica Neue",Arial,sans-serif' },
  { id: 'editorial', label: 'Editorial',  family: 'Georgia,serif',                        headingFamily: 'Georgia,serif' },
  { id: 'mono',      label: 'Mono',       family: '"Courier New",monospace',              headingFamily: '"Courier New",monospace' },
  { id: 'condensed', label: 'Condensed',  family: 'Impact,sans-serif',                    headingFamily: 'Impact,sans-serif' },
  { id: 'rounded',   label: 'Rounded',    family: 'system-ui,sans-serif',                 headingFamily: 'system-ui,sans-serif' },
];

const CHAR_LIMITS: Record<Platform, { headline: number; primary: number; cta: number }> = {
  facebook:  { headline: 255, primary: 500, cta: 30  },
  instagram: { headline: 125, primary: 2200, cta: 125 },
  tiktok:    { headline: 150, primary: 2200, cta: 150 },
};

const HEADLINES: Record<Variant, { line1: string; line2: string; line3: string }> = {
  emotional:   { line1: 'TWOJA',   line2: 'CÓRKA',    line3: 'MILCZY.'     },
  problem:     { line1: '91 DNI',  line2: 'NA WIZYTĘ.', line3: 'CO TERAZ?' },
  testimonial: { line1: '7 DNI.',  line2: 'WSZYSTKO', line3: 'SIĘ ZMIENIŁO.' },
  urgency:     { line1: 'ZOSTAŁO', line2: 'TYLKO',    line3: '48 GODZIN.'  },
};

const BRAND_HEADLINES: Record<Variant, { line1: string; line2: string; line3: string }> = {
  emotional:   { line1: 'Stoję za',   line2: 'drzwiami.', line3: 'Co teraz?'       },
  problem:     { line1: '91 dni',     line2: 'na wizytę —', line3: 'co teraz?'    },
  testimonial: { line1: '"W 7 dni',   line2: 'córka sama',  line3: 'przyszła."'   },
  urgency:     { line1: 'Zostało',    line2: 'tylko',       line3: '48 godzin.'   },
};

// ─── Copy Database ─────────────────────────────────────────────────────────────
const COPY: Record<FunnelStage, Record<Platform, Record<Variant, AdCopy>>> = {

  // ── COLD ──────────────────────────────────────────────────────────────────
  cold: {
    facebook: {
      emotional: {
        headline: 'Twoja córka przestała mówić. I nie wiesz co robić.',
        primary: `Wiesz, że coś jest nie tak — widać to w oczach, przy kolacji, w krótkich "dobrze" i "nieważne".

Dzwonisz na pogotowie psychologiczne. Słyszysz: "Najwcześniejszy termin za 3 miesiące."

I zostajesz z tym sama.

„Co robić, zanim dostaniesz się do psychologa?" to jedyna książka pisana właśnie na te 3 miesiące.

✓ Dokładne zdania — co mówić, a czego NIGDY nie mówić
✓ Jak reagować gdy dziecko milczy, płacze lub atakuje
✓ Jak rozpoznać sygnały wymagające natychmiastowej pomocy
✓ Plan działania na każdy tydzień oczekiwania
✓ BONUS: 20 gotowych odpowiedzi na najtrudniejsze SMS-y od dziecka

2 847 mam już nie czeka biernie. Dołącz do nich.

74 zł · Pobierasz natychmiast · 30 dni gwarancji`,
        cta: 'Chcę wiedzieć co robić → 74 zł',
        hashtags: '#rodzicielstwo #nastolatek #pomocpsychologiczna #mama #kryzys',
      },
      problem: {
        headline: 'Psycholog powiedział mi coś, czego się nie spodziewałam.',
        primary: `"Najgorsza rzecz jaką możesz zrobić, to czekać bezczynnie."

Tymczasem średni czas oczekiwania na psychologa dziecięcego w Polsce to 91 dni.

91 dni, w których Twoje dziecko zmienia się na Twoich oczach.
91 dni, w których każda nieodpowiednia reakcja pogłębia dystans.
91 dni, które możesz albo zmarnować — albo wykorzystać.

„Co robić, zanim dostaniesz się do psychologa?" daje Ci konkretny plan na każdy dzień tego okresu.

Kup dziś. Zacznij czytać za 5 minut.`,
        cta: 'Zaczynam działać teraz — 74 zł',
        hashtags: '#psychologdziecięcy #nastolatek #kryzysemocjonalny #mama #pomocpsychologiczna',
      },
      testimonial: {
        headline: '"Tydzień temu nie wiedziałam jak zacząć rozmowę. Dziś ona sama przyszła do mnie."',
        primary: `Agnieszka, mama 15-letniej Zuzi:

"Kupiłam w piątek wieczorem, bo płakałam nad telefonem. W sobotę wypróbowałam pierwszą technikę. W niedzielę Zuzia sama usiadła przy mnie i zaczęła mówić."

⭐⭐⭐⭐⭐ — "To konkretne zdania, których nikt mi wcześniej nie dał."

Przed: milczenie, napięcie, jednostronne pytania.
Po: dziecko, które samo przychodzi porozmawiać.

2 847 mam. Ocena 4.9/5. 30 dni gwarancji bez pytania.`,
        cta: 'Chcę takich wyników — 74 zł',
        hashtags: '#opinie #mamanastolatka #wyniki #relacjezdzieckiem #ebook',
      },
      urgency: {
        headline: 'Cena 74 zł kończy się za 48 godzin. Potem wraca do 127 zł.',
        primary: `Nie dlatego żebyś czuła presję.

Dlatego, że każdy dzień bez narzędzi to dzień, w którym dystans może rosnąć.

Co dostaniesz za 74 zł:

✅ Ebook „Co robić, zanim dostaniesz się do psychologa?" — 75 stron
✅ Gotowe skrypty rozmów na 12 najtrudniejszych sytuacji
✅ System oceny powagi sytuacji (kiedy działać NATYCHMIAST)
✅ Plan tygodniowy dla rodziny w kryzysie
✅ BONUS: Telefon SOS — 20 gotowych odpowiedzi na SMS-y

Pobierasz natychmiast. Zaczniesz czytać za 5 minut.
30 dni gwarancji zwrotu — bez jednego pytania.`,
        cta: 'Korzystam z ceny 74 zł — zostało 48h',
        hashtags: '#promocja #ebook #mama #nastolatek #ostatniaszansa',
      },
    },
    instagram: {
      emotional: {
        headline: 'Napisała "wszystko ok". Ale Ty wiesz, że nie jest ok. 💙',
        primary: `To uczucie, gdy widzisz że coś jest nie tak — ale nie wiesz jak przez ten mur.

Termin u psychologa: za 3 miesiące.
Twoje dziecko: teraz.

Ten ebook daje Ci dokładne zdania, których potrzebujesz.

🔗 Link w bio → 74 zł`,
        cta: 'link w bio',
        hashtags: '#mama #nastolatek #relacjezdzieckiem #pomocpsychologiczna #ebook #kryzys',
        hook: 'Twoje dziecko mówi "wszystko ok" — ale Ty wiesz, że kłamie. Co wtedy? 👇',
      },
      problem: {
        headline: '91 dni. Tyle czeka się na psychologa dziecięcego w Polsce. 😔',
        primary: `Co robisz przez te 3 miesiące?

❌ Czekasz i masz nadzieję że "samo przejdzie"?
❌ Próbujesz rozmawiać i słyszysz "zostaw mnie"?

Albo:
✅ Działasz z planem.

🔗 Link w bio`,
        cta: 'link w bio',
        hashtags: '#psycholog #nastolatek #mama #91dni #pomocpsychologiczna #kryzysemocjonalny',
        hook: '91 dni na psychologa. Co robisz przez te 3 miesiące? 📋',
      },
      testimonial: {
        headline: '"Kupiłam w piątek. W niedzielę córka sama przyszła porozmawiać." ⭐',
        primary: `Agnieszka, mama 15-latki:

"Całe miesiące próbowałam różnych podejść. W ciągu 48h coś się zmieniło — nie w Zuzi, ale we MNIE."

4.9/5 ⭐ · 2 847 mam · 30 dni gwarancji

🔗 Link w bio → 74 zł`,
        cta: 'link w bio',
        hashtags: '#opinie #mama #nastolatka #wyniki #transformacja #ebook',
        hook: 'Przed: córka nie rozmawiała ze mną od tygodni. Po: sama przyszła 👇',
      },
      urgency: {
        headline: '⏳ 48h zostały do końca ceny 74 zł',
        primary: `Potem wraca do 127 zł.

→ 75 stron konkretnych technik
→ Plan na każdy tydzień
→ BONUS: 20 gotowych SMS-ów

🔗 Link w bio`,
        cta: 'link w bio',
        hashtags: '#promocja #48h #ebook #mama #nastolatek #teraz',
        hook: 'Zostało 48 godzin na cenę 74 zł — potem 127 zł ⏳',
      },
    },
    tiktok: {
      emotional: {
        headline: 'POV: piszesz do córki i widzisz "wyświetlono"',
        primary: `Hook (pierwsze 3 sekundy):
"Napisałaś do córki. Wyświetlono. Brak odpowiedzi od 6 godzin."

Skrypt (15–30 sek):
1. Pokaż ekran — wiadomość bez odpowiedzi
2. VO: "Przez rok robiłam jedną rzecz, która odpychała ją ode mnie."
3. Cut: "Psycholog powiedział mi to na pierwszej wizycie."
4. Pokaż okładkę ebooka + 3 konkretne techniki
5. VO: "74 zł, link w bio, 30 dni gwarancji."
6. CTA overlay: "Przestań zgadywać. Zacznij wiedzieć."`,
        cta: 'link w bio',
        hashtags: '#mama #nastolatek #foryou #fyp #poradyrodzicielskie #psychologia',
        hook: 'Napisałaś. Wyświetlono. Cisza. Co z tym zrobić? 👇 #mama #nastolatek',
      },
      problem: {
        headline: '3 zdania które ZAMYKAJĄ Twoje dziecko (i co mówić zamiast)',
        primary: `Hook: "Jeśli mówisz którąkolwiek z tych 3 rzeczy — odpychasz dziecko."

Skrypt (30–45 sek):
1. "Numer 1: 'Wiem jak się czujesz.' — Twoje dziecko słyszy: nie, nie wiesz."
2. "Numer 2: 'Za moich czasów...' — automatyczny wyłącznik."
3. "Numer 3: 'Będzie dobrze.' — szczególnie zabójcze gdy nie wiadomo czy będzie."
4. Pokaż 1 konkretne zdanie zastępcze dla każdego
5. CTA: "Ebook w bio, 74 zł, pobierasz natychmiast."`,
        cta: 'link w bio',
        hashtags: '#nastolatek #rodzicielstwo #psychologia #komunikacja #mama #fyp',
        hook: '3 zdania które mówi KAŻDA mama — żadne nie działa. Co zamiast? 👇',
      },
      testimonial: {
        headline: 'Kupiłam w piątek. W niedzielę córka sama do mnie przyszła.',
        primary: `Hook: "Nie zmieniłam córki. Zmieniłam SIEBIE. I to wystarczyło."

Skrypt (20–30 sek):
1. Pokaż "przed": wiadomość bez odpowiedzi
2. VO: "Przez miesiące próbowałam różnych rzeczy."
3. VO: "Kupiłam ebook w piątek o 22:00."
4. Pokaż 1 technikę którą zastosowałaś
5. VO: "W niedzielę córka sama zaczęła mówić."
6. CTA: "74 zł, link w bio, 30 dni gwarancji."`,
        cta: 'link w bio',
        hashtags: '#mamytiktok #nastolatek #transformacja #relacje #ebook #fyp',
        hook: 'W piątek płakałam nad telefonem. W niedzielę córka sama do mnie przyszła 💙',
      },
      urgency: {
        headline: '48 godzin. Potem cena wraca do 127 zł.',
        primary: `Hook: "Masz nastolatka w kryzysie i czekasz na psychologa — to jest dla Ciebie."

Skrypt (15 sek):
1. Pokaż timer "48H"
2. VO: "Ebook dla mam — dziś 74 zł, jutro 127 zł."
3. 3 benefity w tekście na ekranie
4. VO: "30 dni gwarancji zwrotu. Link w bio."`,
        cta: 'link w bio',
        hashtags: '#promocja #ebook #mama #nastolatek #48godzin #fyp',
        hook: 'Masz nastolatka w kryzysie? To jest dla Ciebie — ale tylko przez 48h ⏳',
      },
    },
  },

  // ── WARM ──────────────────────────────────────────────────────────────────
  warm: {
    facebook: {
      emotional: {
        headline: 'Wróciłaś. Wiemy, że to nie jest łatwa decyzja.',
        primary: `Zastanawiałaś się nad tym ebookiem. Byłaś blisko.

Może coś Cię powstrzymało. Może cena. Może "a co jeśli nie zadziała?"

Chcę Ci powiedzieć jedno: masz 30 dni na zwrot bez pytań. Zero ryzyka.

Jedyne co możesz stracić — to jeszcze kilka dni bez planu.

Co możesz zyskać:
✓ Konkretne zdania na najtrudniejsze rozmowy
✓ Wiedzę co zrobić gdy dziecko się zamknęło
✓ Pewność, że nie powiesz czegoś, co zaszkodzi

2 847 mam wybrało działanie. Dołącz do nich.

74 zł · Pobierasz natychmiast · 30 dni gwarancji`,
        cta: 'Wracam i kupuję — 74 zł',
        hashtags: '#mama #nastolatek #decyzja #pomocpsychologiczna #ebook',
      },
      problem: {
        headline: 'Czytałaś o tym ebooku. Ale problem nadal istnieje.',
        primary: `Odwiedziłaś naszą stronę. Wiedziałaś, że potrzebujesz pomocy.

Mija czas. Problem nie znika.

→ Bez działania kolejki nie skracają się
→ Każdy tydzień bez narzędzi to tydzień zmarnowany
→ Dzieci, których rodzice są aktywni, lepiej przechodzą kryzys

Masz narzędzie. 74 zł. 30 dni gwarancji. Pobierasz teraz.

Czego jeszcze potrzebujesz, żeby zacząć?`,
        cta: 'Zaczynam działać — 74 zł',
        hashtags: '#nastolatek #mama #kryzysemocjonalny #ebook #pomocpsychologiczna',
      },
      testimonial: {
        headline: '"Wahałam się 2 tygodnie. Żałuję, że nie kupiłam od razu." — Monika, mama 15-latka',
        primary: `Monika wracała na stronę 3 razy zanim kupiła.

"Bałam się że to kolejne ogólniki. Że nie zadziała właśnie u mnie."

Kupiła w niedzielę. W piątek napisała:
"Mój syn powiedział 'mamo, powiem ci coś ważnego' — i to nie zdarzyło się od 6 miesięcy."

Wahanie kosztowało ją te 6 miesięcy.

4.9/5 ⭐ · 2 847 mam · 30 dni gwarancji`,
        cta: 'Nie czekam dłużej — 74 zł',
        hashtags: '#opinie #mama #nastolatek #wahanie #decyzja #ebook',
      },
      urgency: {
        headline: '⏳ Wróciłaś — cena 74 zł nie będzie tu zawsze.',
        primary: `Byłaś na naszej stronie. Wróciłaś.

To znaczy, że wciąż o tym myślisz. Twoje dziecko nadal potrzebuje pomocy.

Każdy dzień bez narzędzi to dzień, w którym:
→ Rozmowy mogą pójść w złym kierunku
→ Dystans między Tobą a dzieckiem rośnie
→ Tracisz czas, który możesz wykorzystać

74 zł · 30 dni gwarancji · Pobierasz natychmiast`,
        cta: 'Kupuję teraz — 74 zł',
        hashtags: '#teraz #mama #nastolatek #ebook #pomocpsychologiczna',
      },
    },
    instagram: {
      emotional: {
        headline: 'Wróciłaś 💙 To znaczy, że wciąż szukasz odpowiedzi.',
        primary: `Widziałaś nasz ebook. Zastanawiałaś się.

Jedna rzecz: 30 dni gwarancji zwrotu. Zero ryzyka.

Tylko szansa, że znajdziesz zdania których szukasz.

🔗 Link w bio → 74 zł`,
        cta: 'link w bio',
        hashtags: '#mama #nastolatek #decyzja #ebook #gwarancja #bezryzyka',
        hook: 'Wróciłaś. Twoje dziecko wciąż czeka. Oto co możesz zrobić dziś 💙',
      },
      problem: {
        headline: 'Byłaś blisko. Problem nadal czeka. 📋',
        primary: `Widziałaś ofertę. Nie kupiłaś.

A problem nadal jest. Termin nadal daleko.

74 zł. 30 dni gwarancji. Co Cię powstrzymuje?

🔗 Link w bio`,
        cta: 'link w bio',
        hashtags: '#mama #nastolatek #kryzys #ebook #decyzja #pomocpsychologiczna',
        hook: 'Zastanawiałaś się nad tym ebookiem. Problem nadal istnieje 👇',
      },
      testimonial: {
        headline: '"Wahałam się. Żałuję tylko że nie kupiłam wcześniej." ⭐',
        primary: `Monika wracała 3 razy. Kupiła. Tydzień później syn sam zaczął rozmawiać.

"Czas na wahanie to czas kiedy mogłam już działać."

4.9/5 · 2 847 mam · 30 dni gwarancji

🔗 Link w bio → 74 zł`,
        cta: 'link w bio',
        hashtags: '#opinie #wahanie #decyzja #mama #nastolatek #ebook',
        hook: 'Wahała się 2 tygodnie. Potem kupiła. Oto co się stało w tydzień 👇',
      },
      urgency: {
        headline: '⏳ Wróciłaś — cena 74 zł nie jest na zawsze',
        primary: `Byłaś blisko. Wróciłaś.

Twoje dziecko czeka. Działaj.

74 zł · 30 dni gwarancji · Link w bio`,
        cta: 'link w bio',
        hashtags: '#teraz #mama #nastolatek #ebook #pilność',
        hook: 'Wróciłaś po raz drugi. Twoje dziecko potrzebuje Cię teraz ⏳',
      },
    },
    tiktok: {
      emotional: {
        headline: 'POV: wróciłaś na tę stronę po raz drugi',
        primary: `Hook: "Oglądasz ten ebook już drugi raz. Coś Cię zatrzymuje."

Skrypt (15 sek):
1. VO: "Wiesz co Cię zatrzymuje? Strach że nie zadziała."
2. VO: "Dlatego jest 30 dni gwarancji zwrotu."
3. VO: "Zero ryzyka. Tylko szansa na konkretny plan."
4. CTA: "74 zł, link w bio."`,
        cta: 'link w bio',
        hashtags: '#mama #nastolatek #decyzja #fyp #ebook #gwarancja',
        hook: 'Wróciłaś. Twoje dziecko nadal potrzebuje Cię. Co czeka? 👇',
      },
      problem: {
        headline: 'Wróciłaś — problem się nie rozwiązał sam',
        primary: `Hook: "Byłaś na tej stronie. Wróciłaś. Problem nie zniknął."

Skrypt (15 sek):
1. VO: "Termin u psychologa nadal daleko."
2. VO: "Twoje dziecko nadal potrzebuje pomocy."
3. VO: "74 zł. 30 dni gwarancji. Działaj."
4. CTA: "Link w bio."`,
        cta: 'link w bio',
        hashtags: '#mama #nastolatek #kryzys #fyp #ebook',
        hook: 'Problem się nie rozwiązał. Ale masz narzędzie. 👇',
      },
      testimonial: {
        headline: '"Wahałam się. Żałuję tylko że nie kupiłam wcześniej."',
        primary: `Hook: "Wahasz się? Ona wahała się 2 tygodnie. Oto co straciła."

Skrypt (20 sek):
1. VO: "Monika czekała 2 tygodnie zanim kupiła."
2. VO: "W tym czasie mogła już działać."
3. VO: "Tydzień po zakupie syn sam zaczął rozmawiać."
4. CTA: "74 zł, 30 dni gwarancji, link w bio."`,
        cta: 'link w bio',
        hashtags: '#mama #wahanie #nastolatek #ebook #fyp #decyzja',
        hook: 'Wahała się 2 tygodnie. Potem kupiła. Żałuje tylko jednego 👇',
      },
      urgency: {
        headline: 'Wróciłaś — cena 74 zł nie czeka wiecznie',
        primary: `Hook: "Oglądasz to już drugi raz. Cena 74 zł nie będzie tu zawsze."

Skrypt (10 sek):
1. VO: "74 zł. 30 dni gwarancji. Pobierasz teraz."
2. VO: "Twoje dziecko potrzebuje Cię z planem."
3. CTA: "Link w bio."`,
        cta: 'link w bio',
        hashtags: '#mama #nastolatek #pilność #fyp #ebook #teraz',
        hook: 'Wróciłaś. Czas działać. ⏳',
      },
    },
  },

  // ── RETARGETING ───────────────────────────────────────────────────────────
  retargeting: {
    facebook: {
      emotional: {
        headline: 'Byłaś o krok. Twoje dziecko nadal czeka na Twój plan.',
        primary: `Oglądałaś ofertę. Coś Cię zatrzymało w ostatniej chwili.

Chcę być z Tobą szczera.

74 zł to 2,47 zł dziennie przez miesiąc. Mniej niż kawa tygodniowo.

Ale wiem, że nie chodzi o pieniądze. Chodzi o to, czy to zadziała.

Dlatego masz 30 dni na zwrot — bez pytań, bez tłumaczenia. Jeden mail i pieniądze wracają w 3 dni.

Nic nie tracisz. Możesz zyskać konkretny plan na najtrudniejszy czas.

Co decydujesz?`,
        cta: 'Kupuję — 74 zł (30 dni na zwrot)',
        hashtags: '#mama #decyzja #nastolatek #ebook #gwarancja #bezryzyka',
      },
      problem: {
        headline: 'Widziałaś co dostajesz za 74 zł. Co Cię powstrzymuje?',
        primary: `Byłaś na stronie z ofertą. Widziałaś szczegóły.

Może zastanawiałaś się: "Czy 74 zł to nie za dużo?"

Porównanie:
→ Jedna wizyta u psychologa: 180–250 zł (z kolejką 3 mies.)
→ Kurs online o wychowaniu: 300–800 zł
→ Ten ebook z konkretnym planem: 74 zł + 30 dni gwarancji

Jedyne ryzyko to 74 zł przez 30 dni — które możesz odzyskać w każdej chwili.

Twoje dziecko potrzebuje Cię teraz.`,
        cta: 'Tak, kupuję — 74 zł',
        hashtags: '#wartość #mama #nastolatek #cena #ebook #gwarancja',
      },
      testimonial: {
        headline: '"Zastanawiałam się czy warto. Po tygodniu wiedziałam: to najlepsza decyzja."',
        primary: `Dorota, mama 14-latki:

"Byłam na stronie kilka razy. Za każdym razem wychodziłam. Aż pewnego wieczoru córka płakała i nie wiedziałam absolutnie nic co zrobić.

Kupiłam o 23:00. Zaczęłam czytać od razu. O 1:00 miałam plan na następny dzień.

Był skuteczny."

Jeśli wahasz się — jeden wieczór może zmienić wszystko.

74 zł · 30 dni gwarancji`,
        cta: 'Chcę ten plan — 74 zł',
        hashtags: '#opinie #mama #nastolatek #decyzja #wyniki #ebook #warto',
      },
      urgency: {
        headline: 'Ostatni krok. 74 zł. 30 sekund.',
        primary: `Widziałaś ofertę. Wiesz co dostajesz.

Masz 30 dni na zwrot — zero ryzyka.

Twoje dziecko potrzebuje Cię z planem.

Nie jutro. Dziś.`,
        cta: 'Kupuję teraz — 74 zł',
        hashtags: '#teraz #mama #nastolatek #ostatnikrok #ebook #działaj',
      },
    },
    instagram: {
      emotional: {
        headline: 'Byłaś o krok 💙 30 dni gwarancji. Zero ryzyka.',
        primary: `Oglądałaś ofertę. Coś Cię zatrzymało.

Jedno: masz 30 dni na zwrot bez pytania.

Twoje dziecko potrzebuje Cię z planem.

🔗 Link w bio → 74 zł`,
        cta: 'link w bio',
        hashtags: '#mama #nastolatek #decyzja #ebook #gwarancja #bezryzyka',
        hook: 'Byłaś o krok. 30 dni gwarancji. Co czeka? 💙',
      },
      problem: {
        headline: '74 zł vs 200 zł za wizytę. I bez kolejki. 📊',
        primary: `74 zł za plan na 3 miesiące oczekiwania.
30 dni gwarancji zwrotu.

Jedna wizyta u psychologa: 200 zł — i to z kolejką.

🔗 Link w bio`,
        cta: 'link w bio',
        hashtags: '#wartość #mama #nastolatek #ebook #cena #decyzja',
        hook: '74 zł vs 200 zł za jedną wizytę. Porównanie 📊',
      },
      testimonial: {
        headline: '"Kupowałam o 23:00. Miałam plan na rano." ⭐',
        primary: `Dorota kupiła w środku nocy gdy córka płakała.

"Zaczęłam czytać od razu. O 1:00 miałam plan."

Nie czekaj na idealny moment.

🔗 Link w bio → 74 zł`,
        cta: 'link w bio',
        hashtags: '#opinie #mama #nastolatek #ebook #wyniki #decyzja',
        hook: 'Kupiła o 23:00. O 1:00 miała plan. Co zrobiła? 👇',
      },
      urgency: {
        headline: '⚡ Ostatni krok. 74 zł. Działaj.',
        primary: `Widziałaś. Wiesz. Zostało jedno kliknięcie.

30 dni gwarancji. Pobierasz natychmiast.

🔗 Link w bio`,
        cta: 'link w bio',
        hashtags: '#teraz #mama #nastolatek #ebook #działaj #ostatnikrok',
        hook: 'Jedno kliknięcie. 30 dni gwarancji. Twoje dziecko czeka ⚡',
      },
    },
    tiktok: {
      emotional: {
        headline: 'POV: oglądałaś tę ofertę — i wróciłaś',
        primary: `Hook: "Byłaś o krok. Coś Cię zatrzymało. Masz 30 dni na zwrot."

Skrypt (15 sek):
1. VO: "Oglądałaś ofertę. Nie kupiłaś."
2. VO: "Masz 30 dni na zwrot. Zero ryzyka."
3. VO: "Twoje dziecko potrzebuje Cię z planem."
4. CTA: "74 zł, link w bio."`,
        cta: 'link w bio',
        hashtags: '#mama #nastolatek #decyzja #fyp #ebook #gwarancja',
        hook: 'Byłaś o krok. Zero ryzyka. Co czeka? 💙',
      },
      problem: {
        headline: '74 zł vs 200 zł za wizytę — i bez kolejki',
        primary: `Hook: "Zastanawiałaś się czy warto? Oto porównanie."

Skrypt (15 sek):
1. VO: "Jedna wizyta u psychologa: 200 zł, kolejka 3 mies."
2. VO: "Ten ebook: 74 zł, pobierasz teraz, 30 dni gwarancji."
3. VO: "Która opcja ma więcej sensu?"
4. CTA: "Link w bio."`,
        cta: 'link w bio',
        hashtags: '#wartość #mama #nastolatek #fyp #ebook #porównanie',
        hook: '74 zł z gwarancją vs 200 zł wizyta. Porównanie 📊',
      },
      testimonial: {
        headline: 'Kupiła o 23:00. O 1:00 miała plan na rano.',
        primary: `Hook: "Córka płakała. Ona nie wiedziała co zrobić. Kupiła ebook."

Skrypt (20 sek):
1. VO: "Dorota nie wiedziała co zrobić gdy córka płakała."
2. VO: "Kupiła o 23:00. Zaczęła czytać."
3. VO: "O 1:00 miała plan na rano."
4. CTA: "74 zł, link w bio, 30 dni gwarancji."`,
        cta: 'link w bio',
        hashtags: '#mama #nastolatek #plan #fyp #ebook #wyniki',
        hook: 'Córka płakała o 23:00. Ona kupiła ebook. O 1:00 miała plan 💙',
      },
      urgency: {
        headline: 'Jedno kliknięcie. 30 dni gwarancji. Działaj.',
        primary: `Hook: "Oglądałaś. Wiesz co dostajesz. Zostało jedno kliknięcie."

Skrypt (10 sek):
1. VO: "74 zł. 30 dni gwarancji. Pobierasz natychmiast."
2. VO: "Twoje dziecko potrzebuje Cię z planem."
3. CTA: "Link w bio."`,
        cta: 'link w bio',
        hashtags: '#teraz #mama #nastolatek #fyp #ebook #działaj',
        hook: 'Jedno kliknięcie. Twoje dziecko czeka na Twój plan ⚡',
      },
    },
  },
};

// ─── Score ────────────────────────────────────────────────────────────────────
function computeScore(copy: AdCopy): number {
  let s = 0;
  if (copy.hook)                                                  s += 2;
  if (/[?!]/.test(copy.headline))                                 s += 1;
  if (/[✓✅→]/.test(copy.primary))                               s += 1;
  if (/2 847|mam/.test(copy.primary))                             s += 1;
  if (/74/.test(copy.cta))                                        s += 2;
  if (/gwarancj/.test(copy.primary))                              s += 1;
  if (/teraz|dziś|natychmiast|48h/.test(copy.primary))            s += 1;
  if (copy.primary.length > 150)                                  s += 1;
  return Math.min(s, 10);
}

// ─── Utility components ───────────────────────────────────────────────────────
function CopyBtn({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
      className="flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-md transition-all"
      style={{ background: copied ? 'rgba(34,197,94,0.12)' : 'rgba(255,255,255,0.07)', color: copied ? '#4ade80' : 'rgba(255,255,255,0.45)' }}
    >
      {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
      {copied ? 'OK' : 'Kopiuj'}
    </button>
  );
}

function CharCount({ text, max, warn }: { text: string; max: number; warn?: number }) {
  const n = text.length;
  const isOver = n > max;
  const isWarn = warn ? n > warn : false;
  return (
    <span style={{ fontSize: 10, color: isOver ? '#f87171' : isWarn ? '#fb923c' : 'rgba(255,255,255,0.2)' }}>
      {n}/{max}
    </span>
  );
}

function ScoreDots({ score }: { score: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} style={{
          width: 5, height: 5, borderRadius: '50%',
          background: i < score
            ? score >= 8 ? '#4ade80' : score >= 5 ? '#fb923c' : '#f87171'
            : 'rgba(255,255,255,0.1)',
          transition: 'background 0.3s',
        }} />
      ))}
      <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', marginLeft: 4 }}>{score}/10</span>
    </div>
  );
}

function SideLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', marginBottom: 8 }}>
      {children}
    </div>
  );
}

// ─── Device frames ────────────────────────────────────────────────────────────
function PhoneFrame({ children, w, h }: { children: React.ReactNode; w: number; h: number }) {
  return (
    <div style={{ position: 'relative', width: w + 22, paddingTop: 36, paddingBottom: 18, paddingLeft: 11, paddingRight: 11, background: '#1c1c1e', borderRadius: 40, boxShadow: '0 0 0 1px #3a3a3c, 0 24px 64px rgba(0,0,0,0.8)', flexShrink: 0 }}>
      {/* Notch */}
      <div style={{ position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)', width: 80, height: 22, background: '#1c1c1e', borderRadius: 12, zIndex: 2 }} />
      <div style={{ position: 'absolute', top: 14, left: 20, fontSize: 9, color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>9:41</div>
      <div style={{ position: 'absolute', top: 14, right: 20, fontSize: 9, color: 'rgba(255,255,255,0.5)' }}>●●●</div>
      <div style={{ borderRadius: 24, overflow: 'hidden', width: w, height: h }}>
        {children}
      </div>
      <div style={{ position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)', width: 100, height: 4, background: 'rgba(255,255,255,0.2)', borderRadius: 2 }} />
    </div>
  );
}

function FeedFrame({ children, w, h, platform }: { children: React.ReactNode; w: number; h: number; platform: Platform }) {
  const isIg = platform === 'instagram';
  return (
    <div style={{ width: w + 32, background: '#fff', borderRadius: 14, overflow: 'hidden', boxShadow: '0 8px 40px rgba(0,0,0,0.35)', flexShrink: 0 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', borderBottom: '1px solid #f0f0f0' }}>
        <div style={{ width: 30, height: 30, borderRadius: isIg ? '50%' : 8, background: '#1E3D2F', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: 'white', fontWeight: 'bold', flexShrink: 0 }}>KW</div>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#1a1a1a' }}>{isIg ? 'katarzyna.wisniewska' : 'Katarzyna Wiśniewska'}</div>
          <div style={{ fontSize: 10, color: '#8a8a8a' }}>Sponsorowane · {isIg ? '🌐' : '🌐'}</div>
        </div>
        {isIg && <div style={{ marginLeft: 'auto', fontSize: 16, color: '#1a1a1a' }}>···</div>}
      </div>
      {/* Ad */}
      <div style={{ overflow: 'hidden', margin: '0 16px', borderRadius: 4 }}>
        {children}
      </div>
      {/* Footer */}
      <div style={{ padding: '10px 14px', borderTop: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {isIg
          ? <><span style={{ fontSize: 18 }}>🤍</span><span style={{ fontSize: 18 }}>💬</span><span style={{ fontSize: 18 }}>↗️</span><span style={{ marginLeft: 'auto', fontSize: 18 }}>🔖</span></>
          : <><span style={{ fontSize: 11, color: '#1877F2', fontWeight: 700 }}>Dowiedz się więcej</span><span style={{ fontSize: 11, color: '#8a8a8a' }}>💬 Komentarz</span></>
        }
      </div>
    </div>
  );
}

// ─── Shared noise URI ────────────────────────────────────────────────────────
const AD_NOISE = 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")';

// ─── Ad preview — DARK style, 4 variant-specific aesthetics ──────────────────
function AdPreviewDark({ format, variant, fontStyle }: { format: Format; variant: Variant; fontStyle: FontStyle }) {
  const { w, h } = FORMATS.find(f => f.id === format)!;
  const font      = FONTS.find(f => f.id === fontStyle)!;
  const isPost    = format === 'post';
  const isStory   = format === 'story';
  const pad       = isPost ? 24 : isStory ? 18 : 30;

  // ── EMOTIONAL — "Pod drzwiami" ────────────────────────────────────────────
  if (variant === 'emotional') {
    // ── BRUTALIST FULL-WIDTH TYPE ──────────────────────────────────────────────
    // Impact font measured at 100px: "NIE"=122px, "WIEM"=220px, "CO ROBIĆ."=385px
    // Target: each line fills availW exactly with scaleX(1.545)
    // Font sizes calibrated per format (square=400px, story=223px, post=412px avail)
    const availW = w - 2 * pad;
    const k = availW / 400;
    // Base sizes fill 400px at scaleX(1.545), scaled by k for format
    // 5-line block scaled ~0.85 vs original 3-line to preserve vertical fit
    // "SŁYSZĘ" measured 264px @ 100px → fillFs=151 → ×0.53=80px
    // "JAK PŁACZE." measured 439px @ 100px → fillFs=91 → ×0.53=48px
    const fSLYSZE = Math.round(80 * k);
    const fJAK    = Math.round(48 * k);
    const fNIE    = Math.round(99 * k);
    const fWIEM   = Math.round(55 * k);
    const fROBIC  = Math.round(31 * k);
    const sx = 1.545;

    // Bottom section height
    const bottomH = isPost ? 0 : isStory ? 50 : 58;
    // Tag height
    const tagAreaH = pad + 22 + 8; // pad + tag + gap

    // Landing page palette
    const forest = '#1E3D2F';
    const coral  = '#E8614A';
    const sage   = '#8BB5A0';
    const cream  = '#FAF7F2';

    return (
      <div style={{ width: w, height: h, position: 'relative', overflow: 'hidden', background: forest, fontFamily: 'Impact, "Arial Narrow", sans-serif' }}>

        {/* ── Sage blob top-right (matches Hero) ── */}
        <div style={{
          position: 'absolute', right: '-8%', top: '-12%',
          width: Math.round(h * 0.75), height: Math.round(h * 0.75), borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139,181,160,0.28) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        {/* ── Coral blob bottom-left ── */}
        <div style={{
          position: 'absolute', left: '-6%', bottom: '-10%',
          width: Math.round(h * 0.6), height: Math.round(h * 0.6), borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(232,97,74,0.22) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        {/* ── Subtle grid (matches Hero) ── */}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.04, pointerEvents: 'none',
          backgroundImage: 'linear-gradient(rgba(255,255,255,.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.15) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }} />

        {/* ── Noise grain ── */}
        <div style={{ position: 'absolute', inset: 0, opacity: 0.025, backgroundImage: AD_NOISE, backgroundSize: '200px', pointerEvents: 'none' }} />

        {/* ── Decorative faded "?" top-right ── */}
        <div style={{
          position: 'absolute', right: '-2%', top: '2%',
          fontSize: Math.round(h * 0.52), fontWeight: 900, lineHeight: 1,
          color: 'rgba(139,181,160,0.07)', userSelect: 'none', pointerEvents: 'none',
          fontFamily: 'Impact, sans-serif', letterSpacing: '-0.05em',
        }}>?</div>

        {/* ── Top tag ── */}
        <div style={{ position: 'absolute', top: pad, left: pad, display: 'flex', alignItems: 'center', gap: 8, zIndex: 10 }}>
          <div style={{ background: coral, padding: `${isPost ? 2 : 3}px ${isPost ? 6 : 9}px`, borderRadius: 2 }}>
            <span style={{ fontSize: isPost ? 7 : 8, fontWeight: 900, color: '#fff', letterSpacing: '0.18em', textTransform: 'uppercase', fontFamily: 'system-ui' }}>OSTRZEŻENIE</span>
          </div>
          <span style={{ fontSize: isPost ? 6 : 7, color: `${sage}88`, letterSpacing: '0.16em', textTransform: 'uppercase', fontFamily: 'system-ui' }}>// dla mam nastolatków</span>
        </div>

        {/* ── Main stacked text — each line scaleX'd to fill full width ── */}
        <div style={{
          position: 'absolute',
          top: tagAreaH,
          left: pad,
          right: 0,
          bottom: bottomH,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          zIndex: 10,
          overflow: 'hidden',
        }}>
          {[
            { text: 'SŁYSZĘ',      color: coral,              fs: fSLYSZE },
            { text: 'JAK PŁACZE.', color: `${sage}70`,        fs: fJAK    },
            { text: 'NIE',         color: cream,              fs: fNIE    },
            { text: 'WIEM',        color: coral,              fs: fWIEM   },
            { text: 'CO ROBIĆ.',   color: cream,              fs: fROBIC  },
          ].map((line, i) => (
            <div key={i} style={{
              fontSize: line.fs,
              color: line.color,
              lineHeight: 0.88,
              letterSpacing: '-0.01em',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
              transformOrigin: 'left center',
              transform: `scaleX(${sx})`,
              display: 'block',
              marginBottom: i < 4 ? Math.round(line.fs * 0.05) : 0,
            }}>{line.text}</div>
          ))}
        </div>

        {/* ── Bottom section ── */}
        {!isPost && (
          <div style={{
            position: 'absolute', bottom: 0, left: pad, right: pad,
            height: bottomH, display: 'flex', flexDirection: 'column',
            justifyContent: 'center', zIndex: 10,
          }}>
            <div style={{ height: 1, background: 'rgba(139,181,160,0.2)', marginBottom: isStory ? 7 : 9 }} />
            <div style={{ fontSize: isStory ? 8 : 9.5, fontFamily: 'system-ui', color: `${sage}99`, lineHeight: 1.55, marginBottom: isStory ? 4 : 6 }}>
              Termin u psychologa za 3 miesiące.{' '}
              <span style={{ color: coral, fontWeight: 700 }}>Pobierasz natychmiast.</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 7, fontFamily: 'system-ui', fontWeight: 700, letterSpacing: '0.13em', textTransform: 'uppercase', color: `${sage}55` }}>pomocemocjonalna.pl</span>
              <span style={{ fontSize: 7.5, color: coral, opacity: 0.6, letterSpacing: '0.04em' }}>★★★★★ 4.9</span>
            </div>
          </div>
        )}

        {/* ── Post: info column right ── */}
        {isPost && (
          <div style={{
            position: 'absolute', right: pad, top: '50%',
            transform: 'translateY(-50%)',
            display: 'flex', flexDirection: 'column', gap: 5, alignItems: 'flex-end', zIndex: 10,
          }}>
            <div style={{ fontSize: 7.5, fontFamily: 'system-ui', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: `${sage}55` }}>pomocemocjonalna.pl</div>
            <div style={{ fontSize: 8.5, color: coral, opacity: 0.65 }}>★★★★★ 4.9</div>
          </div>
        )}
      </div>
    );
  }

  // ── PROBLEM — Data Brutalism ───────────────────────────────────────────────
  if (variant === 'problem') {
    const bigN = isPost ? 88 : isStory ? 144 : 136;
    return (
      <div style={{ width: w, height: h, position: 'relative', overflow: 'hidden', background: '#F7F4EE', fontFamily: 'system-ui, sans-serif' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: isPost ? 5 : 7, background: '#E8614A', zIndex: 5 }} />
        <div style={{ position: 'absolute', bottom: isPost ? -20 : -36, right: isPost ? -10 : -20, fontSize: bigN * 2.3, fontWeight: 900, color: 'rgba(30,61,47,0.04)', lineHeight: 1, letterSpacing: '-0.05em', fontFamily: '"Arial Black",sans-serif', userSelect: 'none', pointerEvents: 'none' }}>91</div>
        <div style={{ position: 'absolute', inset: 0, paddingTop: pad + (isPost ? 5 : 7), paddingLeft: pad, paddingRight: pad, paddingBottom: pad, display: 'flex', flexDirection: isPost ? 'row' : 'column', justifyContent: 'space-between', alignItems: isPost ? 'center' : 'flex-start', gap: isPost ? 20 : 0, zIndex: 10 }}>
          {isPost ? (<>
            <div><div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '3px 9px', borderRadius: 4, background: '#1E3D2F', marginBottom: 10 }}><span style={{ fontSize: 7, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.75)' }}>Dane NFZ · 2024</span></div><div style={{ fontSize: bigN, fontWeight: 900, color: '#1E3D2F', fontFamily: '"Arial Black",sans-serif', lineHeight: 0.88, letterSpacing: '-0.04em' }}>91</div><div style={{ fontSize: 14, fontWeight: 800, color: '#1E3D2F', textTransform: 'uppercase', letterSpacing: '0.02em', marginTop: 4 }}>dni na psychologa.</div></div>
            <div style={{ flex: 1, borderLeft: '1px solid rgba(30,61,47,0.1)', paddingLeft: 20 }}><div style={{ fontSize: 12, color: '#1E3D2F', lineHeight: 1.65 }}>W tych 91 dniach <strong>każda nieodpowiednia reakcja</strong> pogłębia dystans.</div></div>
          </>) : (<>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '3px 9px', borderRadius: 4, background: '#1E3D2F' }}><span style={{ fontSize: 7, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.75)' }}>Dane NFZ · 2024</span></div>
            <div>
              <div style={{ fontSize: bigN, fontWeight: 900, color: '#1E3D2F', fontFamily: '"Arial Black",sans-serif', lineHeight: 0.88, letterSpacing: '-0.04em' }}>91</div>
              <div style={{ fontSize: isStory ? 17 : 20, fontWeight: 800, color: '#1E3D2F', textTransform: 'uppercase', letterSpacing: '0.01em', marginTop: 4, lineHeight: 1.1 }}>dni na wizytę u<br />psychologa.</div>
              <div style={{ marginTop: 16 }}><div style={{ display: 'flex', gap: 3 }}>{Array.from({ length: 13 }).map((_, i) => <div key={i} style={{ flex: 1, height: isStory ? 4 : 5, borderRadius: 99, background: i < 9 ? 'rgba(30,61,47,0.1)' : '#E8614A' }} />)}</div><div style={{ fontSize: 9, color: 'rgba(30,61,47,0.4)', display: 'flex', justifyContent: 'space-between', marginTop: 4 }}><span>dziś</span><span style={{ color: '#E8614A', fontWeight: 700 }}>↑ dzień 91.</span></div></div>
              {!isStory && <div style={{ marginTop: 12, fontSize: 11, color: 'rgba(30,61,47,0.55)', lineHeight: 1.65 }}>91 dni, w których <strong style={{ color: '#1E3D2F' }}>każda rozmowa ma znaczenie</strong>. Ten ebook daje Ci konkretny plan na każdy z nich.</div>}
            </div>
            <div><div style={{ height: 1, background: 'rgba(30,61,47,0.08)', marginBottom: 12 }} /><div style={{ fontSize: 8, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(30,61,47,0.35)', marginBottom: 4 }}>pomocemocjonalna.pl</div><div style={{ fontSize: 9, color: 'rgba(30,61,47,0.35)' }}>★★★★★ 2 847 mam</div></div>
          </>)}
        </div>
      </div>
    );
  }

  // ── TESTIMONIAL — Warm Editorial ──────────────────────────────────────────
  if (variant === 'testimonial') {
    const qSz  = isPost ? 60 : isStory ? 80 : 80;
    const tSz  = isPost ? 12 : isStory ? 12 : 13;
    const fold = isPost ? 36 : 44;
    return (
      <div style={{ width: w, height: h, position: 'relative', overflow: 'hidden', background: '#F3EEE3', fontFamily: 'Georgia,serif' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: isPost ? 5 : 6, background: '#1E3D2F', zIndex: 5 }} />
        <div style={{ position: 'absolute', top: 0, right: 0, width: 0, height: 0, borderStyle: 'solid', borderWidth: `0 ${fold}px ${fold}px 0`, borderColor: `transparent #E8614A transparent transparent`, zIndex: 5 }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(transparent, transparent 27px, rgba(30,61,47,0.05) 27px, rgba(30,61,47,0.05) 28px)', opacity: 0.4, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, paddingLeft: (pad + 6), paddingRight: pad, paddingTop: pad, paddingBottom: pad, display: 'flex', flexDirection: isPost ? 'row' : 'column', justifyContent: 'space-between', alignItems: isPost ? 'center' : 'flex-start', gap: isPost ? 18 : 0, zIndex: 10 }}>
          <div style={{ flex: isPost ? 1 : undefined }}>
            <div style={{ fontSize: qSz, lineHeight: 0.65, color: '#E8614A', fontWeight: 700, marginBottom: isPost ? 6 : 10, opacity: 0.88 }}>"</div>
            <div style={{ fontSize: tSz, color: '#1E3D2F', lineHeight: 1.7, fontStyle: 'italic', maxWidth: isPost ? 260 : undefined }}>Kupiłam w piątek wieczorem, bo płakałam nad telefonem. W sobotę wypróbowałam pierwszą technikę. <strong style={{ fontStyle: 'normal', fontWeight: 700 }}>W niedzielę Zuzia sama usiadła przy mnie i zaczęła mówić.</strong></div>
            <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 9 }}>
              <div style={{ width: isPost ? 24 : 28, height: isPost ? 24 : 28, borderRadius: '50%', background: '#1E3D2F', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><span style={{ fontSize: isPost ? 9 : 11, color: '#F3EEE3', fontWeight: 700, fontFamily: 'system-ui', fontStyle: 'normal' }}>A</span></div>
              <div><div style={{ fontSize: isPost ? 10 : 11, fontWeight: 700, color: '#1E3D2F', fontStyle: 'normal', fontFamily: 'system-ui' }}>Agnieszka</div><div style={{ fontSize: isPost ? 8 : 9, color: 'rgba(30,61,47,0.45)', fontStyle: 'normal', fontFamily: 'system-ui' }}>mama 15-letniej Zuzi · Kraków</div></div>
              <div style={{ marginLeft: 'auto' }}>{[1,2,3,4,5].map(i => <span key={i} style={{ color: '#E8614A', fontSize: 9 }}>★</span>)}</div>
            </div>
            {!isPost && !isStory && <div style={{ marginTop: 14, display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 6, alignItems: 'center' }}><div style={{ padding: '7px 9px', background: 'rgba(232,97,74,0.07)', borderRadius: 7, border: '1px solid rgba(232,97,74,0.13)' }}><div style={{ fontSize: 7, fontWeight: 700, letterSpacing: '0.1em', color: 'rgba(232,97,74,0.55)', marginBottom: 3, fontFamily: 'system-ui', fontStyle: 'normal', textTransform: 'uppercase' }}>Przed</div><div style={{ fontSize: 10, color: 'rgba(30,61,47,0.55)', fontStyle: 'italic', lineHeight: 1.4 }}>Milczenie, zamknięte drzwi</div></div><div style={{ fontSize: 13, color: '#8BB5A0', fontStyle: 'normal', fontFamily: 'system-ui', textAlign: 'center' }}>→</div><div style={{ padding: '7px 9px', background: 'rgba(30,61,47,0.05)', borderRadius: 7, border: '1px solid rgba(30,61,47,0.1)' }}><div style={{ fontSize: 7, fontWeight: 700, letterSpacing: '0.1em', color: 'rgba(30,61,47,0.45)', marginBottom: 3, fontFamily: 'system-ui', fontStyle: 'normal', textTransform: 'uppercase' }}>Po 7 dniach</div><div style={{ fontSize: 10, color: '#1E3D2F', fontStyle: 'italic', lineHeight: 1.4, fontWeight: 600 }}>Córka sama przyszła porozmawiać</div></div></div>}
          </div>
          {isPost ? (
            <div style={{ borderLeft: '1px solid rgba(30,61,47,0.1)', paddingLeft: 18, flexShrink: 0 }}><div style={{ fontSize: 8, fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: 'rgba(30,61,47,0.35)', fontFamily: 'system-ui', fontStyle: 'normal' }}>2 847 mam · 4.9/5</div></div>
          ) : (
            <div><div style={{ height: 1, background: 'rgba(30,61,47,0.07)', marginBottom: 12 }} /><div style={{ fontSize: 8, fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: 'rgba(30,61,47,0.35)', marginBottom: 4, fontFamily: 'system-ui', fontStyle: 'normal' }}>pomocemocjonalna.pl · 2 847 mam · 4.9/5</div></div>
          )}
        </div>
      </div>
    );
  }

  // ── URGENCY — Brutal Countdown ────────────────────────────────────────────
  const bigN = isPost ? 100 : isStory ? 154 : 144;
  return (
    <div style={{ width: w, height: h, position: 'relative', overflow: 'hidden', background: '#E8614A', fontFamily: '"Arial Black",Impact,sans-serif' }}>
      <div style={{ position: 'absolute', inset: 0, opacity: 0.07, backgroundImage: 'repeating-linear-gradient(0deg,rgba(255,255,255,0.5) 0,rgba(255,255,255,0.5) 1px,transparent 1px,transparent 44px),repeating-linear-gradient(90deg,rgba(255,255,255,0.5) 0,rgba(255,255,255,0.5) 1px,transparent 1px,transparent 44px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(145deg,rgba(255,255,255,0.08) 0%,transparent 45%,rgba(0,0,0,0.12) 100%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, width: 0, height: 0, borderStyle: 'solid', borderWidth: `0 0 ${isPost ? 80 : 100}px ${isPost ? 80 : 100}px`, borderColor: `transparent transparent rgba(0,0,0,0.12) transparent`, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: 0, padding: pad, display: 'flex', flexDirection: isPost ? 'row' : 'column', justifyContent: isPost ? 'space-between' : 'space-between', alignItems: isPost ? 'center' : 'flex-start', zIndex: 10 }}>
        {isPost ? (<>
          <div><div style={{ fontSize: 8, fontFamily: 'system-ui', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.65)', marginBottom: 6 }}>ZOSTAŁO TYLKO</div><div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, lineHeight: 1 }}><span style={{ fontSize: bigN, color: 'white', lineHeight: 0.88, letterSpacing: '-0.04em' }}>48</span><span style={{ fontSize: bigN * 0.28, color: 'rgba(255,255,255,0.65)', lineHeight: 1.1, paddingBottom: 8 }}>GODZIN</span></div><div style={{ fontSize: 11, fontFamily: 'system-ui', fontWeight: 400, color: 'rgba(255,255,255,0.6)', marginTop: 5 }}>Potem cena wraca do 127 zł</div></div>
          <div style={{ textAlign: 'right' }}><div style={{ fontSize: 9, fontFamily: 'system-ui', color: 'rgba(255,255,255,0.55)' }}>★★★★★ 2 847 mam</div></div>
        </>) : (<>
          <div><div style={{ fontSize: 8, fontFamily: 'system-ui', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.72)', marginBottom: 7 }}>⏳ ZOSTAŁO TYLKO</div><div style={{ width: 24, height: 3, background: 'rgba(255,255,255,0.35)', borderRadius: 99 }} /></div>
          <div>
            <div style={{ fontSize: bigN, color: 'white', lineHeight: 0.88, letterSpacing: '-0.04em' }}>48</div>
            <div style={{ fontSize: isStory ? 28 : 34, color: 'rgba(255,255,255,0.68)', letterSpacing: '0.04em', marginTop: 5 }}>GODZIN</div>
            <div style={{ marginTop: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5 }}><span style={{ fontSize: 11, fontFamily: 'system-ui', color: 'rgba(255,255,255,0.68)' }}>Pobierasz natychmiast.</span></div>
              {!isStory && <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 8 }}>{['75 stron technik', 'Plan na każdy tydzień', 'BONUS: 20 gotowych SMS-ów'].map((item, i) => <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}><div style={{ width: 13, height: 13, borderRadius: '50%', background: 'rgba(255,255,255,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><span style={{ fontSize: 7, fontFamily: 'system-ui', color: 'white' }}>✓</span></div><span style={{ fontSize: 11, fontFamily: 'system-ui', fontWeight: 400, color: 'rgba(255,255,255,0.65)' }}>{item}</span></div>)}</div>}
            </div>
          </div>
          <div><div style={{ height: 1, background: 'rgba(255,255,255,0.18)', marginBottom: 12 }} /><div style={{ fontSize: 8, fontFamily: 'system-ui', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.46)', marginBottom: 4 }}>pomocemocjonalna.pl · ★★★★★ 2 847 mam</div></div>
        </>)}
      </div>
    </div>
  );
}

// ─── Brand style preview ──────────────────────────────────────────────────────
function AdPreviewBrand({ format, variant, fontStyle }: { format: Format; variant: Variant; fontStyle: FontStyle }) {
  const { w, h } = FORMATS.find(f => f.id === format)!;
  const hl        = BRAND_HEADLINES[variant];
  const font      = FONTS.find(f => f.id === fontStyle)!;
  const isPost    = format === 'post';
  const isStory   = format === 'story';
  const isEd      = fontStyle === 'editorial';
  const pad       = isPost ? 24 : 30;
  const bottomH   = isPost ? 50 : 58;
  const hSize     = isPost ? 28 : isStory ? 38 : 44;

  return (
    <div style={{ width: w, height: h, fontFamily: font.family, overflow: 'hidden', position: 'relative', flexShrink: 0 }}>
      {/* Forest bg top */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: bottomH, background: '#1E3D2F' }} />
      {/* Cream footer */}
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: bottomH, background: '#F4EEE3' }} />
      {/* Coral divider */}
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: bottomH - 3, height: 4, background: '#E8614A' }} />
      {/* Decorative circle */}
      <div style={{ position: 'absolute', top: -40, right: -40, width: 180, height: 180, borderRadius: '50%', background: '#8BB5A0', opacity: 0.10 }} />
      {/* Noise */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: AD_NOISE, backgroundSize: '200px', pointerEvents: 'none' }} />
      {/* Content top */}
      <div style={{ position: 'relative', zIndex: 10, height: `calc(100% - ${bottomH}px)`, padding: pad, paddingBottom: 16, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: 'rgba(244,238,227,0.10)', border: '1px solid rgba(244,238,227,0.20)', borderRadius: 99, padding: '4px 11px', width: 'fit-content' }}>
          <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#E8614A' }} />
          <span style={{ color: 'rgba(244,238,227,0.65)', fontSize: 8, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Dla mam nastolatków</span>
        </div>
        <div>
          <div style={{ fontSize: hSize, fontWeight: isEd ? 700 : 900, lineHeight: 1.05, fontStyle: isEd ? 'italic' : 'normal', letterSpacing: '-0.025em' }}>
            <div style={{ color: '#F4EEE3' }}>{hl.line1}</div>
            <div style={{ color: '#E8614A' }}>{hl.line2}</div>
            <div style={{ color: '#F4EEE3' }}>{hl.line3}</div>
          </div>
          {!isPost && <div style={{ marginTop: 12, color: 'rgba(244,238,227,0.38)', fontSize: 11, lineHeight: 1.6, fontFamily: 'system-ui', fontStyle: 'normal' }}><span style={{ color: 'rgba(244,238,227,0.72)', fontWeight: 600 }}>Konkretne zdania, nie ogólniki.</span> 2 847 mam.</div>}
        </div>
      </div>
      {/* Footer */}
      <div style={{ position: 'relative', zIndex: 10, height: bottomH, padding: `0 ${pad}px`, display: 'flex', alignItems: 'center' }}>
        <div><div style={{ fontSize: 9, fontWeight: 800, color: '#1E3D2F', fontFamily: 'system-ui' }}>pomocemocjonalna.pl</div><div style={{ display: 'flex', alignItems: 'center', gap: 3, marginTop: 2 }}><div style={{ width: 5, height: 5, borderRadius: '50%', background: '#8BB5A0' }} /><span style={{ fontSize: 7, fontWeight: 700, color: '#8BB5A0', fontFamily: 'system-ui' }}>★★★★★ · 2 847 mam</span></div></div>
      </div>
    </div>
  );
}

// ─── Module-level styles (must be outside component to avoid remount bug) ─────
const S = {
  bg:       '#09090B',
  sidebar:  '#0e0e10',
  border:   'rgba(255,255,255,0.06)',
  label:    'rgba(255,255,255,0.25)',
  text:     'rgba(255,255,255,0.85)',
  muted:    'rgba(255,255,255,0.4)',
  coral:    '#E8614A',
} as const;

function OptionBtn({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        display: 'flex', alignItems: 'center', gap: 6,
        padding: '7px 10px', borderRadius: 8,
        border: `1px solid ${active ? S.coral : S.border}`,
        background: active ? 'rgba(232,97,74,0.1)' : 'transparent',
        color: active ? 'white' : S.muted,
        fontSize: 12, fontWeight: active ? 600 : 400,
        width: '100%', textAlign: 'left', cursor: 'pointer',
        transition: 'all 0.15s',
      }}
    >
      {children}
    </button>
  );
}

function CopyField({ label, text, max, warn, mono }: { label: string; text: string; max: number; warn?: number; mono?: boolean }) {
  return (
    <div style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${S.border}`, borderRadius: 10, overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', borderBottom: `1px solid ${S.border}` }}>
        <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: S.label }}>{label}</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <CharCount text={text} max={max} warn={warn} />
          <CopyBtn text={text} />
        </div>
      </div>
      <div style={{ padding: '10px 12px', fontSize: mono ? 11 : 12, color: S.text, lineHeight: 1.6, whiteSpace: mono ? 'pre-wrap' : 'normal', fontFamily: mono ? '"Courier New",monospace' : 'inherit', maxHeight: 160, overflowY: 'auto' }}>
        {text}
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function AdsConfigurator() {
  const [platform, setPlatform]   = useState<Platform>('facebook');
  const [format, setFormat]       = useState<Format>('square');
  const [variant, setVariant]     = useState<Variant>('emotional');
  const [fontStyle, setFontStyle] = useState<FontStyle>('grotesk');
  const [adStyle, setAdStyle]     = useState<AdStyle>('dark');
  const [stage, setStage]         = useState<FunnelStage>('cold');

  const copy      = COPY[stage][platform][variant];
  const limits    = CHAR_LIMITS[platform];
  const score     = computeScore(copy);
  const fmt       = FORMATS.find(f => f.id === format)!;
  const stageInfo = FUNNEL_STAGES.find(s => s.id === stage)!;

  const AdPreview = adStyle === 'dark' ? AdPreviewDark : AdPreviewBrand;
  const adEl = <AdPreview format={format} variant={variant} fontStyle={fontStyle} />;

  const wrappedPreview = format === 'story'
    ? <PhoneFrame w={fmt.w} h={fmt.h}>{adEl}</PhoneFrame>
    : <FeedFrame w={fmt.w} h={fmt.h} platform={platform}>{adEl}</FeedFrame>;

  // Auto-scale preview to always fit the canvas
  const frameW = format === 'story' ? fmt.w + 22 : fmt.w + 32;
  const frameH = format === 'story' ? fmt.h + 54 : fmt.h + 90;
  const previewScale = Math.min(620 / frameW, 600 / frameH);

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: S.bg, color: 'white', fontFamily: '"DM Sans",system-ui,sans-serif', overflow: 'hidden' }}>


      {/* ── Header ── */}
      <div style={{ height: 52, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px', borderBottom: `1px solid ${S.border}`, flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 11, color: S.label }}>🔒</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: S.text }}>Ad Studio</span>
          <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 99, background: 'rgba(255,255,255,0.06)', color: S.muted }}>
            {PLATFORMS.find(p => p.id === platform)?.icon} {platform} · {fmt.ratio} · {stageInfo.label}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 10, color: S.label }}>Ocena copy:</span>
            <ScoreDots score={score} />
          </div>
          <ExportAdButton />
          <button
            type="button"
            onClick={() => { const all = [copy.hook, copy.headline, copy.primary, copy.cta, copy.hashtags].filter(Boolean).join('\n\n---\n\n'); navigator.clipboard.writeText(all); }}
            style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 14px', borderRadius: 8, background: S.coral, color: 'white', fontSize: 12, fontWeight: 700, border: 'none', cursor: 'pointer' }}
          >
            <Copy className="w-3.5 h-3.5" /> Kopiuj wszystko
          </button>
          <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: S.muted, textDecoration: 'none' }}>
            <ExternalLink className="w-3.5 h-3.5" /> Strona
          </a>
        </div>
      </div>

      {/* ── 3-panel layout ── */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

        {/* LEFT SIDEBAR */}
        <div style={{ width: 220, borderRight: `1px solid ${S.border}`, background: S.sidebar, overflowY: 'auto', flexShrink: 0, padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* Platforma */}
          <div>
            <SideLabel>Platforma</SideLabel>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {PLATFORMS.map(p => (
                <OptionBtn key={p.id} active={platform === p.id} onClick={() => setPlatform(p.id)}>
                  <span>{p.icon}</span><span>{p.label}</span>
                </OptionBtn>
              ))}
            </div>
          </div>

          {/* Format */}
          <div>
            <SideLabel>Format</SideLabel>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {FORMATS.map(f => (
                <OptionBtn key={f.id} active={format === f.id} onClick={() => setFormat(f.id)}>
                  <span style={{ fontSize: 10, opacity: 0.5, fontFamily: 'monospace' }}>{f.ratio}</span>
                  <span>{f.label}</span>
                </OptionBtn>
              ))}
            </div>
          </div>

          {/* Etap lejka */}
          <div>
            <SideLabel>Etap lejka</SideLabel>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {FUNNEL_STAGES.map(s => (
                <OptionBtn key={s.id} active={stage === s.id} onClick={() => setStage(s.id)}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <span style={{ fontSize: 12 }}>{s.label}</span>
                    <span style={{ fontSize: 10, color: stage === s.id ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.25)' }}>{s.desc}</span>
                  </div>
                </OptionBtn>
              ))}
            </div>
          </div>

          {/* Wariant */}
          <div>
            <SideLabel>Wariant copy</SideLabel>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {VARIANTS.map(v => (
                <OptionBtn key={v.id} active={variant === v.id} onClick={() => setVariant(v.id)}>
                  <span>{v.emoji}</span><span style={{ fontSize: 11 }}>{v.label}</span>
                </OptionBtn>
              ))}
            </div>
          </div>

          {/* Styl */}
          <div>
            <SideLabel>Styl graficzny</SideLabel>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
              {(['dark', 'brand'] as AdStyle[]).map(s => (
                <button type="button" key={s} onClick={() => setAdStyle(s)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, padding: '10px 6px', borderRadius: 8, border: `1px solid ${adStyle === s ? S.coral : S.border}`, background: adStyle === s ? 'rgba(232,97,74,0.1)' : 'transparent', cursor: 'pointer' }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: s === 'dark' ? '#0d1117' : '#F5EFE6', border: `1px solid ${S.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: s === 'dark' ? '#E8614A' : '#1E3D2F' }} />
                  </div>
                  <span style={{ fontSize: 10, color: adStyle === s ? 'white' : S.muted, fontWeight: adStyle === s ? 700 : 400 }}>{s === 'dark' ? 'Ciemny' : 'Markowy'}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Czcionka */}
          <div>
            <SideLabel>Czcionka</SideLabel>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {FONTS.map(f => (
                <OptionBtn key={f.id} active={fontStyle === f.id} onClick={() => setFontStyle(f.id)}>
                  <span style={{ fontFamily: f.headingFamily, fontSize: 13, fontWeight: 700 }}>{f.label}</span>
                </OptionBtn>
              ))}
            </div>
          </div>
        </div>

        {/* CENTER CANVAS */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'repeating-conic-gradient(#111113 0% 25%, #0d0d10 0% 50%) 0 0 / 20px 20px', overflow: 'auto', padding: 40 }}>
          <div
            style={{
              flexShrink: 0,
              transform: `scale(${previewScale})`,
              transformOrigin: 'center center',
            }}
          >
            {wrappedPreview}
          </div>
        </div>

        {/* RIGHT COPY PANEL */}
        <div style={{ width: 340, borderLeft: `1px solid ${S.border}`, background: S.sidebar, overflowY: 'auto', flexShrink: 0, padding: '16px 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>

          {/* Stage badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', borderRadius: 8, background: 'rgba(255,255,255,0.04)', border: `1px solid ${S.border}`, marginBottom: 2 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: stageInfo.dot, flexShrink: 0 }} />
            <span style={{ fontSize: 11, color: S.muted }}>Etap: <strong style={{ color: S.text }}>{stageInfo.label}</strong> — {stageInfo.desc}</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {copy.hook && (
              <CopyField label="Hook (pierwsze zdanie)" text={copy.hook} max={limits.headline} mono={false} />
            )}
            <CopyField label="Nagłówek" text={copy.headline} max={limits.headline} warn={Math.floor(limits.headline * 0.6)} />
            <CopyField label="Treść główna" text={copy.primary} max={limits.primary} warn={Math.floor(limits.primary * 0.7)} mono />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              <CopyField label="CTA" text={copy.cta} max={limits.cta} />
              <CopyField label="Hashtagi" text={copy.hashtags} max={2200} />
            </div>
          </div>

          {/* Score breakdown */}
          <div style={{ marginTop: 4, padding: '10px 12px', borderRadius: 10, background: 'rgba(255,255,255,0.02)', border: `1px solid ${S.border}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: S.label }}>Ocena copy</span>
              <ScoreDots score={score} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
              {[
                ['Hook',        !!copy.hook],
                ['Emocja/❓',   /[?!]/.test(copy.headline)],
                ['Lista korzyści', /[✓✅→]/.test(copy.primary)],
                ['Social proof', /2 847|mam/.test(copy.primary)],
                ['Cena w CTA',  /74/.test(copy.cta)],
                ['Gwarancja',   /gwarancj/.test(copy.primary)],
                ['Pilność',     /teraz|dziś|natychmiast|48h/.test(copy.primary)],
                ['Długość OK',  copy.primary.length > 150],
              ].map(([label, ok]) => (
                <div key={label as string} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 10, color: ok ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.2)' }}>
                  <span style={{ color: ok ? '#4ade80' : 'rgba(255,255,255,0.12)' }}>{ok ? '✓' : '○'}</span>
                  {label as string}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
