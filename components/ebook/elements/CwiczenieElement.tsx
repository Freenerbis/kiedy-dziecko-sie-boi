interface CwiczenieElementProps {
  content: string;
}

export default function CwiczenieElement({ content }: CwiczenieElementProps) {
  const lines = content.split('\n').filter(Boolean);
  const title = lines[0];
  const rest  = lines.slice(1);

  return (
    <div style={{
      background: '#142B20',
      border: '1px solid #2D5A47',
      borderRadius: '8px',
      padding: '18px 22px',
      margin: '14px 0',
      position: 'relative',
    }}>
      {/* icon + label */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
        <span style={{ fontSize: '14px' }}>✏</span>
        <span style={{
          fontFamily: 'system-ui, sans-serif',
          fontSize: '9px',
          fontWeight: '700',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          color: '#E8614A',
        }}>
          Ćwiczenie
        </span>
      </div>

      {title && (
        <p style={{
          fontFamily: 'system-ui, sans-serif',
          fontSize: '13px',
          fontWeight: '600',
          color: '#C4DDD4',
          margin: '0 0 14px',
          lineHeight: '1.5',
        }}>
          {title}
        </p>
      )}

      {/* task lines */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {rest.map((line, i) => (
          <div key={i}>
            <p style={{
              fontFamily: 'system-ui, sans-serif',
              fontSize: '12px',
              color: '#FAF7F2',
              margin: '0 0 5px',
              lineHeight: '1.5',
            }}>
              {line}
            </p>
            <div style={{
              borderBottom: '1px dashed #2D5A47',
              height: '1px',
              width: '100%',
            }} />
          </div>
        ))}
      </div>
    </div>
  );
}
