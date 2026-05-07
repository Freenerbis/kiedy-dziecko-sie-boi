import { EbookElement } from '@/lib/ebook-parser';
import EbookHeader from './EbookHeader';
import EbookFooter from './EbookFooter';
import BoxElement      from './elements/BoxElement';
import DialogElement   from './elements/DialogElement';
import ListaElement    from './elements/ListaElement';
import CwiczenieElement from './elements/CwiczenieElement';
import CytatElement    from './elements/CytatElement';

interface EbookContentProps {
  pageNum: number;
  chapterTitle?: string;
  elements: EbookElement[];
  fillRatio: number;
}

export default function EbookContent({
  pageNum,
  chapterTitle,
  elements,
  fillRatio,
}: EbookContentProps) {
  // If page is less than 82% full, stretch line-height on paragraphs
  const stretch = fillRatio < 0.82 && elements.length > 0;
  const extraLineH = stretch ? Math.min(0.55, (0.82 - fillRatio) * 2.5) : 0;

  return (
    <div style={{
      width: '794px',
      height: '1123px',
      background: '#1E3D2F',
      padding: '64px 72px',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      flexShrink: 0,
    }}>
      <EbookHeader pageNum={pageNum} chapterTitle={chapterTitle} />

      {/* Content area */}
      <div style={{ flex: 1, overflow: 'hidden' }}>
        {elements.map((el, i) => {
          switch (el.type) {
            case 'h2':
              return (
                <h2 key={i} style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: '22px',
                  fontWeight: '700',
                  color: '#E8614A',
                  margin: '20px 0 10px',
                  lineHeight: '1.3',
                }}>
                  {el.content}
                </h2>
              );

            case 'h3':
              return (
                <h3 key={i} style={{
                  fontFamily: 'system-ui, sans-serif',
                  fontSize: '11px',
                  fontWeight: '700',
                  color: '#C4DDD4',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  margin: '18px 0 8px',
                }}>
                  {el.content}
                </h3>
              );

            case 'paragraph':
              return (
                <p key={i} style={{
                  fontFamily: 'system-ui, sans-serif',
                  fontSize: '14px',
                  lineHeight: String(1.8 + extraLineH),
                  color: '#FAF7F2',
                  margin: '0 0 14px',
                }}>
                  {el.content}
                </p>
              );

            case 'box':
              return <BoxElement key={i} content={el.content} />;

            case 'dialog':
              return <DialogElement key={i} lines={el.lines || []} />;

            case 'lista':
              return <ListaElement key={i} items={el.items || []} />;

            case 'cwiczenie':
              return <CwiczenieElement key={i} content={el.content} />;

            case 'cytat':
              return <CytatElement key={i} content={el.content} />;

            default:
              return null;
          }
        })}
      </div>

      <EbookFooter />
    </div>
  );
}
