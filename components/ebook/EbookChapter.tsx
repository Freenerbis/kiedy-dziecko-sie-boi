import EbookHeader from './EbookHeader';
import EbookFooter from './EbookFooter';

interface EbookChapterProps {
  pageNum: number;
  chapterNum?: number;
  chapterTitle?: string;
  chapterDescription?: string;
}

export default function EbookChapter({
  pageNum,
  chapterNum,
  chapterTitle,
  chapterDescription,
}: EbookChapterProps) {
  return (
    <div style={{
      width: '794px',
      height: '1123px',
      background: '#1E3D2F',
      padding: '64px 72px',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden',
      flexShrink: 0,
    }}>
      <EbookHeader pageNum={pageNum} />

      {/* Big chapter number in background */}
      {chapterNum && (
        <span style={{
          position: 'absolute',
          bottom: '40px',
          right: '40px',
          fontFamily: 'Georgia, serif',
          fontSize: '260px',
          fontWeight: '900',
          color: 'rgba(232, 97, 74, 0.10)',
          lineHeight: '1',
          userSelect: 'none',
          pointerEvents: 'none',
          zIndex: 0,
        }}>
          {chapterNum}
        </span>
      )}

      {/* Content */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 1,
        gap: '28px',
      }}>
        {chapterNum && (
          <span style={{
            fontFamily: 'system-ui, sans-serif',
            fontSize: '10px',
            fontWeight: '700',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            color: '#E8614A',
          }}>
            Rozdział {chapterNum}
          </span>
        )}

        {/* Accent line */}
        <div style={{ width: '40px', height: '3px', background: '#E8614A', borderRadius: '2px' }} />

        <h2 style={{
          fontFamily: 'Georgia, serif',
          fontSize: '36px',
          fontWeight: '700',
          color: '#FAF7F2',
          margin: 0,
          lineHeight: '1.25',
          letterSpacing: '-0.3px',
          maxWidth: '76%',
        }}>
          {chapterTitle}
        </h2>

        {chapterDescription && (
          <p style={{
            fontFamily: 'Georgia, serif',
            fontStyle: 'italic',
            fontSize: '16px',
            color: '#C4DDD4',
            margin: 0,
            lineHeight: '1.65',
            maxWidth: '72%',
          }}>
            {chapterDescription}
          </p>
        )}
      </div>

      <EbookFooter />
    </div>
  );
}
