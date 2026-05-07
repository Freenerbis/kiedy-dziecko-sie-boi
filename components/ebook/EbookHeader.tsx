interface EbookHeaderProps {
  pageNum: number;
  chapterTitle?: string;
}

export default function EbookHeader({ pageNum, chapterTitle }: EbookHeaderProps) {
  return (
    <div style={{
      height: '36px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottom: '1px solid #2D5A47',
      marginBottom: '18px',
      paddingBottom: '8px',
      flexShrink: 0,
    }}>
      <span style={{
        fontFamily: 'system-ui, sans-serif',
        fontSize: '9px',
        color: '#8BB5A0',
        letterSpacing: '0.5px',
      }}>
        pomocemocjonalna.pl
      </span>

      {chapterTitle && (
        <span style={{
          fontFamily: 'system-ui, sans-serif',
          fontSize: '9px',
          color: '#8BB5A0',
          textTransform: 'uppercase',
          letterSpacing: '1.5px',
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          maxWidth: '55%',
          textAlign: 'center',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
        }}>
          {chapterTitle}
        </span>
      )}

      <span style={{
        fontFamily: 'system-ui, sans-serif',
        fontSize: '9px',
        color: '#8BB5A0',
      }}>
        {pageNum}
      </span>
    </div>
  );
}
