'use client';

import { useEffect } from 'react';

const PIXEL_ID = '27519887457647449';

export default function MetaPixel() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if ((window as any)._fbqInit) return;
    (window as any)._fbqInit = true;

    const f = window as any;
    const b = document;
    if (f.fbq) return;

    const n: any = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = true;
    n.version = '2.0';
    n.queue = [];

    const t = b.createElement('script') as HTMLScriptElement;
    t.async = true;
    t.src = 'https://connect.facebook.net/en_US/fbevents.js';
    const s = b.getElementsByTagName('script')[0];
    s.parentNode!.insertBefore(t, s);

    f.fbq('init', PIXEL_ID);
    f.fbq('track', 'PageView');
  }, []);

  return (
    <noscript>
      <img
        height="1"
        width="1"
        style={{ display: 'none' }}
        src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
      />
    </noscript>
  );
}
