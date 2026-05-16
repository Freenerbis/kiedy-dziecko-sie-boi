import type { Metadata } from 'next';
import { Fraunces, Outfit } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Script from 'next/script';
import './globals.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
  weight: ['400', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const SITE_URL = 'https://twoja-domena.pl';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Co robić, zanim dostaniesz się do psychologa? | Ebook dla mam nastolatków',
  description:
    'Konkretny plan działania dla mamy nastolatka w kryzysie emocjonalnym — gotowe zdania, skrypty rozmów i system sygnalizacji żółty/pomarańczowy/czerwony. PDF do pobrania natychmiast. 30 dni gwarancji zwrotu.',
  keywords: [
    'co robić gdy dziecko ma stany lękowe',
    'ebook psychologia nastolatków',
    'pomoc dla rodziców nastolatków',
    'zdrowie psychiczne nastolatka',
    'co robić gdy dziecko nie chce iść do szkoły',
    'pierwsza pomoc emocjonalna nastolatek',
    'oczekiwanie na psychologa co robić',
    'jak rozmawiać z nastolatkiem o problemach',
    'depresja nastolatka co robić rodzic',
  ],
  authors: [{ name: 'Pierwsza Pomoc Emocjonalna' }],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Co robić, zanim dostaniesz się do psychologa? | Ebook dla mam nastolatków',
    description:
      'Konkretny plan działania: gotowe zdania, skrypty rozmów i system sygnalizacji żółty/pomarańczowy/czerwony. Na czas oczekiwania 3–6 miesięcy na specjalistę.',
    type: 'website',
    locale: 'pl_PL',
    url: SITE_URL,
    siteName: 'Pierwsza Pomoc Emocjonalna',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Co robić zanim dostaniesz się do psychologa — ebook dla mam nastolatków',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Co robić, zanim dostaniesz się do psychologa?',
    description:
      'Ebook pierwszej pomocy emocjonalnej dla mam nastolatków. Gotowe zdania, plan dnia, system oceny kryzysu.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  // icons obsługiwane przez app/icon.tsx i app/apple-icon.tsx
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'Pierwsza Pomoc Emocjonalna',
      url: SITE_URL,
      description:
        'Narzędzia pierwszej pomocy emocjonalnej dla rodziców nastolatków w kryzysie psychicznym.',
    },
    {
      '@type': 'Book',
      '@id': `${SITE_URL}/#book`,
      name: 'Co robić, zanim dostaniesz się do psychologa?',
      alternateName: 'Pierwsza pomoc emocjonalna dla mamy nastolatka',
      description:
        'Ebook dający mamie nastolatka konkretny plan działania na czas oczekiwania 3–6 miesięcy na psychologa. Zawiera system sygnalizacji żółty/pomarańczowy/czerwony, gotowe skrypty rozmów z nastolatkiem, plan dnia dla rodziny w kryzysie i skrypt rozmowy ze szkołą.',
      inLanguage: 'pl',
      numberOfPages: 75,
      bookFormat: 'EBook',
      offers: {
        '@type': 'Offer',
        price: '74.00',
        priceCurrency: 'PLN',
        availability: 'https://schema.org/InStock',
        priceValidUntil: '2026-12-31',
      },
      publisher: {
        '@id': `${SITE_URL}/#organization`,
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '2847',
        bestRating: '5',
        worstRating: '1',
      },
    },
    {
      '@type': 'FAQPage',
      '@id': `${SITE_URL}/#faq`,
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Czy ten ebook zastępuje wizytę u psychologa?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Absolutnie nie — i to jest napisane wprost w treści. Ten ebook jest narzędziem pierwszej pomocy emocjonalnej na czas oczekiwania. Jego celem jest pomóc Ci nie zostać bezradną i mieć konkretny plan działania — aż do momentu, gdy pojawi się specjalista. Terapia i pomoc psychologiczna są niezbędne. Ten ebook to most, nie cel.',
          },
        },
        {
          '@type': 'Question',
          name: 'Jak szybko dostanę ebooka po zakupie?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Natychmiast. Po zrealizowaniu płatności otrzymujesz e-mail z linkiem do pobrania PDF-a. Nie musisz na nic czekać — możesz zacząć czytać w ciągu kilku minut.',
          },
        },
        {
          '@type': 'Question',
          name: 'Czy to działa, jeśli mój nastolatek w ogóle nie chce rozmawiać?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Właśnie na tę sytuację jest przygotowana większość skryptów. Masz w ebooku konkretne strategie na "zamknięte drzwi" — co robić, gdy dziecko odpowiada jednosylabowo, wychodzi z pokoju albo mówi, że wszystko jest dobrze, gdy wyraźnie nie jest.',
          },
        },
        {
          '@type': 'Question',
          name: 'Co jeśli ebook mi nie pomoże?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Masz 30 dni na zwrot bez żadnych pytań. Wystarczy jeden e-mail — zwrot pieniędzy w 3 dni robocze.',
          },
        },
        {
          '@type': 'Question',
          name: 'Moje dziecko ma już diagnozę — czy to nadal dla mnie?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Tak. Diagnoza to dopiero początek. Wiele mam nastolatków z diagnozą ADHD, depresji, zaburzeń lękowych czy spektrum autyzmu nadal czeka miesiącami na terapię. Narzędzia z tego ebooka są pomocne niezależnie od diagnozy.',
          },
        },
      ],
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl" className={`${fraunces.variable} ${outfit.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
        {/* Meta Pixel */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window,document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init','27519887457647449');
            fbq('track','PageView');
          `}
        </Script>
        <noscript>
          <img height="1" width="1" style={{display:'none'}}
            src="https://www.facebook.com/tr?id=27519887457647449&ev=PageView&noscript=1" />
        </noscript>
      </body>
    </html>
  );
}
