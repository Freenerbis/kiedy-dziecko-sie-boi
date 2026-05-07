interface CytatElementProps {
  content: string;
}

export default function CytatElement({ content }: CytatElementProps) {
  // Split on last " — " for attribution
  const dashIdx = content.lastIndexOf(' — ');
  const quote  = dashIdx > 0 ? content.slice(0, dashIdx).trim() : content.trim();
  const author = dashIdx > 0 ? content.slice(dashIdx + 3).trim() : '';

  return (
    <div style={{
      position: 'relative',
      margin: '18px 8px',
      padding: '20px 28px 20px 36px',
    }}>
      {/* decorative big quote mark */}
      <span style={{
        position: 'absolute',
        top: '-8px',
        left: '0px',
        fontFamily: 'Georgia, serif',
        fontSize: '80px',
        lineHeight: '1',
        color: 'rgba(232, 97, 74, 0.25)',
        userSelect: 'none',
        pointerEvents: 'none',
      }}>
        &ldquo;
      </span>

      <p style={{
        fontFamily: 'Georgia, serif',
        fontStyle: 'italic',
        fontSize: '16px',
        lineHeight: '1.75',
        color: '#C4DDD4',
        margin: 0,
        position: 'relative',
        zIndex: 1,
      }}>
        {quote}
      </p>

      {author && (
        <p style={{
          fontFamily: 'system-ui, sans-serif',
          fontSize: '11px',
          color: '#8BB5A0',
          margin: '10px 0 0',
          letterSpacing: '0.5px',
        }}>
          — {author}
        </p>
      )}
    </div>
  );
}
