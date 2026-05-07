interface ListaElementProps {
  items: string[];
}

export default function ListaElement({ items }: ListaElementProps) {
  return (
    <ul style={{
      listStyle: 'none',
      margin: '12px 0',
      padding: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
    }}>
      {items.map((item, i) => (
        <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
          <span style={{
            color: '#E8614A',
            fontSize: '14px',
            lineHeight: '1.6',
            flexShrink: 0,
            marginTop: '1px',
          }}>
            ▸
          </span>
          <span style={{
            fontFamily: 'system-ui, sans-serif',
            fontSize: '13px',
            lineHeight: '1.7',
            color: '#FAF7F2',
          }}>
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}
