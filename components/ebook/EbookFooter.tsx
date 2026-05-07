export default function EbookFooter() {
  return (
    <div style={{
      height: '26px',
      display: 'flex',
      alignItems: 'flex-end',
      borderTop: '1px solid #2D5A47',
      marginTop: '14px',
      paddingTop: '6px',
      flexShrink: 0,
    }}>
      <span style={{
        fontFamily: 'system-ui, sans-serif',
        fontSize: '9px',
        color: '#2D5A47',
        letterSpacing: '0.3px',
      }}>
        © pomocemocjonalna.pl — Wszelkie prawa zastrzeżone. Nie do dalszego rozpowszechniania.
      </span>
    </div>
  );
}
