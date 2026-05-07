interface EbookCoverProps {
  title?: string;
}

export default function EbookCover({ title }: EbookCoverProps) {
  return (
    <div style={{
      width: '794px',
      height: '1123px',
      background: 'linear-gradient(160deg, #1E3D2F 0%, #0F2018 100%)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '72px 72px 56px',
      position: 'relative',
      overflow: 'hidden',
      boxSizing: 'border-box',
      flexShrink: 0,
    }}>
      {/* Giant decorative "2" in background */}
      <span style={{
        position: 'absolute',
        bottom: '-60px',
        right: '-20px',
        fontFamily: 'Georgia, serif',
        fontSize: '520px',
        fontWeight: '900',
        color: 'rgba(255,255,255,0.03)',
        lineHeight: '1',
        userSelect: 'none',
        pointerEvents: 'none',
      }}>
        2
      </span>

      {/* Subtle circle decoration */}
      <div style={{
        position: 'absolute',
        top: '-100px',
        right: '-100px',
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        border: '1px solid rgba(232, 97, 74, 0.08)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        top: '-60px',
        right: '-60px',
        width: '280px',
        height: '280px',
        borderRadius: '50%',
        border: '1px solid rgba(232, 97, 74, 0.05)',
        pointerEvents: 'none',
      }} />

      {/* Top — publisher */}
      <div>
        <span style={{
          fontFamily: 'system-ui, sans-serif',
          fontSize: '11px',
          fontWeight: '700',
          letterSpacing: '4px',
          textTransform: 'uppercase',
          color: '#E8614A',
        }}>
          pomocemocjonalna.pl
        </span>
      </div>

      {/* Center — main content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '24px' }}>
        {/* Thin accent line */}
        <div style={{ width: '48px', height: '3px', background: '#E8614A', borderRadius: '2px' }} />

        <h1 style={{
          fontFamily: 'Georgia, serif',
          fontSize: '46px',
          fontWeight: '700',
          color: '#FAF7F2',
          lineHeight: '1.18',
          letterSpacing: '-0.5px',
          margin: 0,
          maxWidth: '72%',
        }}>
          {title || 'Co robić, zanim dostaniesz się do psychologa?'}
        </h1>

        <p style={{
          fontFamily: 'system-ui, sans-serif',
          fontSize: '17px',
          color: '#C4DDD4',
          margin: 0,
          lineHeight: '1.6',
          maxWidth: '68%',
        }}>
          Pierwsza pomoc emocjonalna dla mamy nastolatka w kryzysie
        </p>

        {/* Rating */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '8px' }}>
          <span style={{
            fontFamily: 'system-ui, sans-serif',
            fontSize: '13px',
            color: '#E8614A',
            letterSpacing: '0.5px',
          }}>
            4.9 / 5 &nbsp;★★★★★
          </span>
        </div>
      </div>

      {/* Bottom — meta info */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        borderTop: '1px solid #2D5A47',
        paddingTop: '24px',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {['9 rozdziałów', '20+ gotowych skryptów', 'Plan działania na 4 tygodnie'].map(tag => (
            <span key={tag} style={{
              fontFamily: 'system-ui, sans-serif',
              fontSize: '11px',
              color: '#8BB5A0',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}>
              <span style={{ color: '#E8614A', fontSize: '10px' }}>▸</span>
              {tag}
            </span>
          ))}
        </div>
        <div style={{
          fontFamily: 'system-ui, sans-serif',
          fontSize: '10px',
          color: '#2D5A47',
          textAlign: 'right',
          maxWidth: '200px',
          lineHeight: '1.6',
        }}>
          Nie zastępuje pomocy psychologicznej.<br />
          Narzędzie pierwszej pomocy na czas oczekiwania.
        </div>
      </div>
    </div>
  );
}
