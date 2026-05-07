'use client';

import { useState } from 'react';
import { EbookPage } from '@/lib/page-splitter';
import EbookCover   from '@/components/ebook/EbookCover';
import EbookChapter from '@/components/ebook/EbookChapter';
import EbookContent from '@/components/ebook/EbookContent';

interface PreviewClientProps {
  pages: EbookPage[];
}

export default function PreviewClient({ pages }: PreviewClientProps) {
  const [generating, setGenerating] = useState(false);
  const [result, setResult] = useState<{ success: boolean; pages?: number; path?: string; error?: string } | null>(null);

  async function handleGenerate() {
    setGenerating(true);
    setResult(null);
    try {
      const res  = await fetch('/api/generate-pdf', { method: 'POST' });
      const data = await res.json();
      setResult(data);
    } catch (e: any) {
      setResult({ success: false, error: e.message });
    } finally {
      setGenerating(false);
    }
  }

  return (
    <div style={{
      background: '#0a0a0a',
      minHeight: '100vh',
      padding: '48px 48px 120px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '24px',
    }}>
      {/* Print styles — each ebook-page becomes a PDF page */}
      <style>{`
        @media print {
          body { background: #1E3D2F !important; margin: 0; padding: 0; }
          .preview-toolbar { display: none !important; }
          .preview-wrapper { padding: 0 !important; gap: 0 !important; background: none !important; }
          .ebook-page-wrapper {
            page-break-after: always;
            break-after: page;
            margin: 0 !important;
            box-shadow: none !important;
          }
        }
      `}</style>

      <h1 style={{
        color: '#FAF7F2',
        fontFamily: 'Georgia, serif',
        fontSize: '22px',
        fontWeight: '400',
        marginBottom: '8px',
        letterSpacing: '-0.3px',
      }}>
        Podgląd ebooka
        <span style={{ color: '#8BB5A0', fontSize: '14px', marginLeft: '12px', fontFamily: 'system-ui' }}>
          {pages.length} stron
        </span>
      </h1>

      <div className="preview-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'center' }}>
        {pages.map((page) => (
          <div
            key={page.pageNum}
            className="ebook-page-wrapper"
            style={{
              boxShadow: '0 8px 48px rgba(0,0,0,0.6)',
              borderRadius: '2px',
              overflow: 'hidden',
            }}
          >
            {page.type === 'cover' && (
              <EbookCover title={page.chapterTitle} />
            )}
            {page.type === 'chapter' && (
              <EbookChapter
                pageNum={page.pageNum}
                chapterNum={page.chapterNum}
                chapterTitle={page.chapterTitle}
                chapterDescription={page.chapterDescription}
              />
            )}
            {page.type === 'content' && (
              <EbookContent
                pageNum={page.pageNum}
                chapterTitle={page.chapterTitle}
                elements={page.elements}
                fillRatio={page.fillRatio}
              />
            )}
          </div>
        ))}
      </div>

      {/* Floating toolbar */}
      <div
        className="preview-toolbar"
        style={{
          position: 'fixed',
          bottom: '28px',
          right: '28px',
          background: '#142B20',
          border: '1px solid #2D5A47',
          borderRadius: '12px',
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
          zIndex: 999,
        }}
      >
        <span style={{
          fontFamily: 'system-ui, sans-serif',
          fontSize: '12px',
          color: '#8BB5A0',
        }}>
          {pages.length} stron
        </span>

        <button
          onClick={handleGenerate}
          disabled={generating}
          style={{
            background: generating ? '#2D5A47' : '#E8614A',
            color: '#FAF7F2',
            border: 'none',
            borderRadius: '8px',
            padding: '10px 20px',
            fontFamily: 'system-ui, sans-serif',
            fontSize: '13px',
            fontWeight: '600',
            cursor: generating ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'background 0.2s',
          }}
        >
          {generating ? (
            <>
              <span style={{
                width: '14px', height: '14px',
                border: '2px solid rgba(255,255,255,0.3)',
                borderTopColor: '#FAF7F2',
                borderRadius: '50%',
                display: 'inline-block',
                animation: 'spin 0.8s linear infinite',
              }} />
              Generuję…
            </>
          ) : '⬇ Generuj PDF'}
        </button>

        {result && (
          <span style={{
            fontFamily: 'system-ui, sans-serif',
            fontSize: '12px',
            color: result.success ? '#8BB5A0' : '#E8614A',
          }}>
            {result.success
              ? `✓ Gotowe — ${result.pages} str.`
              : `✗ ${result.error}`}
          </span>
        )}
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
