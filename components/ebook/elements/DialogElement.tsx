import { DialogLine } from '@/lib/ebook-parser';

interface DialogElementProps {
  lines: DialogLine[];
}

export default function DialogElement({ lines }: DialogElementProps) {
  return (
    <div style={{ margin: '14px 0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {lines.map((line, i) => {
        if (line.speaker === 'meta') {
          return (
            <p key={i} style={{
              fontFamily: 'Georgia, serif',
              fontStyle: 'italic',
              fontSize: '11px',
              color: '#8BB5A0',
              margin: '2px 0',
              textAlign: 'center',
            }}>
              {line.text}
            </p>
          );
        }

        const isMama = line.speaker === 'MAMA';
        return (
          <div
            key={i}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: isMama ? 'flex-start' : 'flex-end',
            }}
          >
            <span style={{
              fontFamily: 'system-ui, sans-serif',
              fontSize: '9px',
              fontWeight: '700',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              color: isMama ? '#E8614A' : '#8BB5A0',
              marginBottom: '3px',
              paddingLeft: isMama ? '4px' : '0',
              paddingRight: isMama ? '0' : '4px',
            }}>
              {line.speaker}
            </span>
            <div style={{
              background: isMama
                ? 'rgba(232, 97, 74, 0.12)'
                : 'rgba(139, 181, 160, 0.12)',
              borderRadius: isMama ? '4px 12px 12px 12px' : '12px 4px 12px 12px',
              padding: '10px 14px',
              maxWidth: '82%',
              border: isMama
                ? '1px solid rgba(232, 97, 74, 0.2)'
                : '1px solid rgba(139, 181, 160, 0.2)',
            }}>
              <p style={{
                fontFamily: 'system-ui, sans-serif',
                fontSize: '12.5px',
                lineHeight: '1.65',
                color: '#FAF7F2',
                margin: 0,
              }}>
                {line.text}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
