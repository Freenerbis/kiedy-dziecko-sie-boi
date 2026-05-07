interface BoxElementProps {
  content: string;
}

export default function BoxElement({ content }: BoxElementProps) {
  return (
    <div style={{
      background: 'rgba(45, 90, 71, 0.45)',
      borderLeft: '3px solid #E8614A',
      borderRadius: '0 8px 8px 0',
      padding: '18px 22px',
      margin: '14px 0',
    }}>
      <p style={{
        fontFamily: 'system-ui, sans-serif',
        fontSize: '13px',
        lineHeight: '1.75',
        color: '#FAF7F2',
        margin: 0,
        whiteSpace: 'pre-line',
      }}>
        {content}
      </p>
    </div>
  );
}
