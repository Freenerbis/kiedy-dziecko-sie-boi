'use client';

import { useState } from 'react';
import { Download } from 'lucide-react';

function drawAd(canvas: HTMLCanvasElement, fmt: 'square' | 'story') {
  const baseW   = fmt === 'story' ? 259 : 460;
  const baseH   = 460;
  const exportW = fmt === 'story' ? 1080 : 1080;
  const exportH = fmt === 'story' ? 1920 : 1080;
  canvas.width  = exportW;
  canvas.height = exportH;

  const ctx   = canvas.getContext('2d')!;
  const scale = exportW / baseW;
  ctx.save();
  ctx.scale(scale, scale);

  const isStory = fmt === 'story';
  const pad     = isStory ? 18 : 30;
  const availW  = baseW - 2 * pad;
  const k       = availW / 400;
  const sx      = 1.545;

  const FOREST = '#1E3D2F';
  const CORAL  = '#E8614A';
  const CREAM  = '#FAF7F2';

  // Background
  ctx.fillStyle = FOREST;
  ctx.fillRect(0, 0, baseW, baseH);

  // Sage blob top-right
  const sSize = Math.round(baseH * 0.75);
  const sCX   = baseW * 1.08 - sSize / 2;
  const sCY   = -baseH * 0.12 + sSize / 2;
  const sGrad = ctx.createRadialGradient(sCX, sCY, 0, sCX, sCY, sSize / 2);
  sGrad.addColorStop(0, 'rgba(139,181,160,0.28)');
  sGrad.addColorStop(1, 'rgba(139,181,160,0)');
  ctx.fillStyle = sGrad;
  ctx.fillRect(0, 0, baseW, baseH);

  // Coral blob bottom-left
  const cSize = Math.round(baseH * 0.6);
  const cCX   = -baseW * 0.06 + cSize / 2;
  const cCY   = baseH * 1.10 - cSize / 2;
  const cGrad = ctx.createRadialGradient(cCX, cCY, 0, cCX, cCY, cSize / 2);
  cGrad.addColorStop(0, 'rgba(232,97,74,0.22)');
  cGrad.addColorStop(1, 'rgba(232,97,74,0)');
  ctx.fillStyle = cGrad;
  ctx.fillRect(0, 0, baseW, baseH);

  // Grid
  ctx.strokeStyle = 'rgba(255,255,255,0.006)';
  ctx.lineWidth   = 0.5;
  for (let x = 0; x <= baseW; x += 64) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, baseH); ctx.stroke(); }
  for (let y = 0; y <= baseH; y += 64) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(baseW, y); ctx.stroke(); }

  // Decorative "?"
  const qFs = Math.round(baseH * 0.52);
  ctx.save();
  ctx.font         = `${qFs}px Impact, Arial, sans-serif`;
  ctx.fillStyle    = 'rgba(139,181,160,0.07)';
  ctx.textBaseline = 'top';
  ctx.textAlign    = 'left';
  const qW = ctx.measureText('?').width;
  ctx.fillText('?', baseW * 0.98 - qW, baseH * 0.02);
  ctx.restore();

  // Top tag
  const tagFs = isStory ? 7 : 8;
  const tagPX = isStory ? 6 : 9;
  const tagPY = isStory ? 2 : 3;
  ctx.save();
  ctx.font         = `900 ${tagFs}px system-ui, sans-serif`;
  ctx.textBaseline = 'middle';
  const tagTW = ctx.measureText('OSTRZEZENIE').width;
  const tagBW = tagTW + tagPX * 2;
  const tagBH = tagFs + tagPY * 2;
  ctx.fillStyle = CORAL;
  ctx.fillRect(pad, pad, tagBW, tagBH);
  ctx.fillStyle = '#fff';
  ctx.fillText('OSTRZEZENIE', pad + tagPX, pad + tagBH / 2);
  const secFs = isStory ? 6 : 7;
  ctx.font      = `400 ${secFs}px system-ui, sans-serif`;
  ctx.fillStyle = 'rgba(139,181,160,0.53)';
  ctx.fillText('// dla mam nastolatkow', pad + tagBW + 8, pad + tagBH / 2);
  ctx.restore();

  // Text lines
  const tagAreaH = pad + tagBH + 8;
  const bottomH  = isStory ? 50 : 58;
  const areaH    = baseH - bottomH - tagAreaH;

  const fSLYSZE = Math.round(80 * k);
  const fJAK    = Math.round(48 * k);
  const fNIE    = Math.round(99 * k);
  const fWIEM   = Math.round(55 * k);
  const fROBIC  = Math.round(31 * k);

  const lines = [
    { text: 'SLYSZĘ',       color: CORAL,                    fs: fSLYSZE },
    { text: 'JAK PLACZE.',  color: 'rgba(139,181,160,0.44)', fs: fJAK    },
    { text: 'NIE',          color: CREAM,                    fs: fNIE    },
    { text: 'WIEM',         color: CORAL,                    fs: fWIEM   },
    { text: 'CO ROBIC.',    color: CREAM,                    fs: fROBIC  },
  ];

  const totalH = lines.reduce((s, l, i) => s + l.fs * 0.88 + (i < lines.length - 1 ? l.fs * 0.05 : 0), 0);
  let lineTop  = tagAreaH + (areaH - totalH) / 2;

  ctx.save();
  ctx.textBaseline = 'top';
  ctx.textAlign    = 'left';
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    ctx.save();
    ctx.font      = `${l.fs}px Impact, Arial, sans-serif`;
    ctx.fillStyle = l.color;
    ctx.translate(pad, lineTop);
    ctx.scale(sx, 1);
    ctx.fillText(l.text, 0, 0);
    ctx.restore();
    lineTop += l.fs * 0.88 + (i < lines.length - 1 ? l.fs * 0.05 : 0);
  }
  ctx.restore();

  // Bottom divider
  const divY  = baseH - bottomH;
  const mbDiv = isStory ? 7 : 9;
  const btFs  = isStory ? 8 : 9.5;
  ctx.strokeStyle = 'rgba(139,181,160,0.2)';
  ctx.lineWidth   = 0.5;
  ctx.beginPath(); ctx.moveTo(pad, divY); ctx.lineTo(baseW - pad, divY); ctx.stroke();

  // Bottom text
  ctx.save();
  ctx.textBaseline = 'top';
  const bt1Y   = divY + mbDiv;
  const partA  = 'Termin u psychologa za 3 miesiace. ';
  ctx.font      = `400 ${btFs}px system-ui, sans-serif`;
  ctx.fillStyle = 'rgba(139,181,160,0.6)';
  ctx.textAlign = 'left';
  ctx.fillText(partA, pad, bt1Y);
  const partAW = ctx.measureText(partA).width;
  ctx.font      = `700 ${btFs}px system-ui, sans-serif`;
  ctx.fillStyle = CORAL;
  ctx.fillText('Pobierasz natychmiast.', pad + partAW, bt1Y);

  const footerY = bt1Y + btFs * 1.55 + (isStory ? 4 : 6);
  ctx.font      = `700 7px system-ui, sans-serif`;
  ctx.fillStyle = 'rgba(139,181,160,0.33)';
  ctx.textAlign = 'left';
  ctx.fillText('pomocemocjonalna.pl', pad, footerY);
  ctx.font      = `400 7.5px system-ui, sans-serif`;
  ctx.fillStyle = 'rgba(232,97,74,0.6)';
  ctx.textAlign = 'right';
  ctx.fillText('4.9 / 5', baseW - pad, footerY);
  ctx.restore();

  ctx.restore();
}

export default function ExportAdButton() {
  const [state, setState] = useState<'idle' | 'done' | 'err'>('idle');

  const handle = () => {
    try {
      const c1 = document.createElement('canvas');
      drawAd(c1, 'square');
      const a1 = document.createElement('a');
      a1.href = c1.toDataURL('image/png');
      a1.download = 'reklama-1x1.png';
      document.body.appendChild(a1); a1.click(); document.body.removeChild(a1);

      const c2 = document.createElement('canvas');
      drawAd(c2, 'story');
      const a2 = document.createElement('a');
      a2.href = c2.toDataURL('image/png');
      a2.download = 'reklama-9x16.png';
      document.body.appendChild(a2); a2.click(); document.body.removeChild(a2);

      setState('done');
    } catch (e) {
      console.error(e);
      setState('err');
    }
  };

  return (
    <button
      type="button"
      onClick={handle}
      style={{
        display: 'flex', alignItems: 'center', gap: 6,
        padding: '6px 14px', borderRadius: 8,
        background: state === 'done' ? '#16a34a' : state === 'err' ? '#dc2626' : '#2a5c3f',
        color: 'white', fontSize: 12, fontWeight: 700,
        border: 'none', cursor: 'pointer',
      }}
    >
      <Download size={14} />
      {state === 'done' ? '✓ Pobrano!' : state === 'err' ? '✗ Błąd' : 'PNG 1:1 + 9:16'}
    </button>
  );
}
