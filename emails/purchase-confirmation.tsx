import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
  Row,
  Column,
} from '@react-email/components';

interface PurchaseConfirmationProps {
  customerName?: string;
  downloadUrl?: string;
}

export default function PurchaseConfirmation({
  customerName = 'Mamo',
  downloadUrl = 'https://pomocemocjonalna.pl/Kiedy_Twoje_Dziecko_Sie_Boi.pdf',
}: PurchaseConfirmationProps) {
  return (
    <Html lang="pl">
      <Head />
      <Preview>Twój ebook jest gotowy do pobrania — dziękuję za zakup 💚</Preview>
      <Body style={main}>

        {/* Header */}
        <Section style={header}>
          <Container style={headerInner}>
            <Text style={logo}>pomocemocjonalna.pl</Text>
          </Container>
        </Section>

        <Container style={container}>

          {/* Hero */}
          <Section style={heroSection}>
            <Text style={greeting}>Cześć, {customerName} 👋</Text>
            <Heading style={h1}>
              Twój ebook czeka.
            </Heading>
            <Text style={subtitle}>
              Cieszę się, że jesteś. To, że kupiłaś ten ebook, mówi mi że bardzo zależy Ci na Twoim dziecku — i że nie chcesz tylko czekać.
            </Text>
          </Section>

          {/* Download button */}
          <Section style={ctaSection}>
            <Button style={downloadButton} href={downloadUrl}>
              ↓ Pobierz ebook PDF
            </Button>
            <Text style={ctaNote}>
              Kliknij przycisk lub skopiuj link: <br />
              <span style={linkStyle}>{downloadUrl}</span>
            </Text>
          </Section>

          <Hr style={divider} />

          {/* What's inside */}
          <Section style={section}>
            <Heading style={h2}>Co znajdziesz w środku</Heading>
            <Text style={bodyText}>
              Ebook zawiera <strong>16 rozdziałów</strong> napisanych specjalnie dla mam, które czekają na wizytę u specjalisty i potrzebują konkretnego planu — nie ogólników.
            </Text>
            {[
              'System sygnalizacji żółty/pomarańczowy/czerwony',
              'Gotowe skrypty rozmów z nastolatkiem',
              '10 zdań, których NIE mówić (i co zamiast nich)',
              'Skrypt rozmowy ze szkołą i pedagogiem',
              '8-tygodniowy plan działania dla rodzica',
              'Sygnały alarmowe wymagające pilnej interwencji',
            ].map((item, i) => (
              <Row key={i} style={featureRow}>
                <Column style={checkCol}>
                  <Text style={check}>✓</Text>
                </Column>
                <Column>
                  <Text style={featureText}>{item}</Text>
                </Column>
              </Row>
            ))}
          </Section>

          <Hr style={divider} />

          {/* Personal note */}
          <Section style={section}>
            <Heading style={h2}>Słowo ode mnie</Heading>
            <Text style={bodyText}>
              Przez lata pracowałam z rodzinami, których dzieci przechodziły kryzysy emocjonalne. Widziałam to samo w kółko: mama zdesperowana, dziecko cierpi, termin za 4 miesiące.
            </Text>
            <Text style={bodyText}>
              Ten ebook to odpowiedź na pytanie, które słyszałam <strong>setki razy</strong>: <em>"Co mam robić zanim dostanę się do psychologa?"</em>
            </Text>
            <Text style={bodyText}>
              Zebrałam tu wszystko, co mówiłam rodzicom na pierwszych spotkaniach. Mam nadzieję, że pomogę Ci tak jak pomogłam im.
            </Text>
            <Text style={signature}>
              Z serdecznościami,<br />
              <strong>Katarzyna Wiśniewska</strong><br />
              <span style={signatureRole}>Konsultantka rodzicielska</span>
            </Text>
          </Section>

          <Hr style={divider} />

          {/* Guarantee reminder */}
          <Section style={guaranteeSection}>
            <Text style={guaranteeText}>
              🛡️ <strong>Pamiętaj</strong> — masz <strong>30 dni na zwrot</strong> bez żadnych pytań. Jeśli ebook nie spełni Twoich oczekiwań, wyślij maila na kontakt@pomocemocjonalna.pl — zwrot w 3 dni robocze.
            </Text>
          </Section>

        </Container>

        {/* Footer */}
        <Section style={footer}>
          <Container>
            <Text style={footerText}>
              pomocemocjonalna.pl · kontakt@pomocemocjonalna.pl
            </Text>
            <Text style={footerSmall}>
              Otrzymałaś tego maila ponieważ dokonałaś zakupu na pomocemocjonalna.pl
            </Text>
          </Container>
        </Section>

      </Body>
    </Html>
  );
}

// ─── Styles ─────────────────────────────────────────────────────────────────

const main = {
  backgroundColor: '#F5F0E8',
  fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
};

const header = {
  backgroundColor: '#1E3D32',
  padding: '20px 0',
};

const headerInner = {
  maxWidth: '560px',
  margin: '0 auto',
  textAlign: 'center' as const,
};

const logo = {
  color: '#8BB5A0',
  fontSize: '14px',
  fontWeight: '600',
  letterSpacing: '0.1em',
  textTransform: 'uppercase' as const,
  margin: '0',
};

const container = {
  maxWidth: '560px',
  margin: '0 auto',
  backgroundColor: '#FFFFFF',
  borderRadius: '0 0 16px 16px',
  overflow: 'hidden',
};

const heroSection = {
  backgroundColor: '#1E3D32',
  padding: '40px 40px 36px',
};

const greeting = {
  color: '#8BB5A0',
  fontSize: '14px',
  margin: '0 0 8px 0',
};

const h1 = {
  color: '#FFFFFF',
  fontSize: '36px',
  fontWeight: '900',
  lineHeight: '1.1',
  margin: '0 0 16px 0',
};

const subtitle = {
  color: 'rgba(139,181,160,0.85)',
  fontSize: '15px',
  lineHeight: '1.6',
  margin: '0',
};

const ctaSection = {
  padding: '36px 40px',
  textAlign: 'center' as const,
  backgroundColor: '#FAFAF8',
};

const downloadButton = {
  backgroundColor: '#E8614A',
  color: '#FFFFFF',
  fontSize: '16px',
  fontWeight: '700',
  padding: '16px 40px',
  borderRadius: '12px',
  textDecoration: 'none',
  display: 'inline-block',
};

const ctaNote = {
  color: '#9CA3AF',
  fontSize: '11px',
  marginTop: '12px',
  lineHeight: '1.6',
};

const linkStyle = {
  color: '#E8614A',
  wordBreak: 'break-all' as const,
};

const divider = {
  borderColor: '#F0EBE1',
  margin: '0',
};

const section = {
  padding: '32px 40px',
};

const h2 = {
  color: '#1E3D32',
  fontSize: '20px',
  fontWeight: '800',
  margin: '0 0 16px 0',
};

const bodyText = {
  color: '#4B5563',
  fontSize: '14px',
  lineHeight: '1.7',
  margin: '0 0 12px 0',
};

const featureRow = {
  marginBottom: '6px',
};

const checkCol = {
  width: '24px',
  verticalAlign: 'top' as const,
};

const check = {
  color: '#E8614A',
  fontWeight: '700',
  fontSize: '14px',
  margin: '0',
  lineHeight: '1.5',
};

const featureText = {
  color: '#374151',
  fontSize: '13px',
  margin: '0',
  lineHeight: '1.5',
};

const signature = {
  color: '#1E3D32',
  fontSize: '14px',
  lineHeight: '1.7',
  margin: '20px 0 0 0',
};

const signatureRole = {
  color: '#8BB5A0',
  fontSize: '12px',
};

const guaranteeSection = {
  backgroundColor: '#F0F7F4',
  margin: '0 24px 24px',
  borderRadius: '12px',
  padding: '16px 20px',
};

const guaranteeText = {
  color: '#1E3D32',
  fontSize: '13px',
  lineHeight: '1.6',
  margin: '0',
};

const footer = {
  padding: '24px 0',
};

const footerText = {
  color: '#9CA3AF',
  fontSize: '12px',
  textAlign: 'center' as const,
  margin: '0 0 4px 0',
};

const footerSmall = {
  color: '#C4C4C4',
  fontSize: '11px',
  textAlign: 'center' as const,
  margin: '0',
};
