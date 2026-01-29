import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
  Section,
} from '@react-email/components'

interface WelcomeEmailProps {
  name?: string
}

export function WelcomeEmail({ name }: WelcomeEmailProps) {
  const displayName = name?.trim() || 'there'

  return (
    <Html>
      <Head />
      <Preview>You&apos;re on the PipBot waitlist! 🎉</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Text style={logo}>PipBot</Text>
          </Section>

          <Section style={content}>
            <Heading style={heading}>Hey {displayName}! 👋</Heading>

            <Text style={paragraph}>
              Thanks for signing up for early access to PipBot.
            </Text>

            <Text style={paragraph}>
              We&apos;re building an AI companion that lives on your desktop — always there 
              when you need help, out of the way when you don&apos;t.
            </Text>

            <Text style={paragraph}>
              We&apos;ll email you as soon as PipBot is ready for Mac.
            </Text>

            <Section style={divider} />

            <Text style={signature}>
              — The Pip Team
            </Text>
          </Section>

          <Section style={footer}>
            <Text style={footerText}>
              You received this email because you signed up for the PipBot waitlist.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

// Styles
const main = {
  backgroundColor: '#0a0a0a',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  padding: '40px 20px',
}

const container = {
  maxWidth: '480px',
  margin: '0 auto',
  backgroundColor: '#171717',
  borderRadius: '12px',
  overflow: 'hidden',
  border: '1px solid #262626',
}

const header = {
  padding: '32px 32px 0',
  textAlign: 'center' as const,
}

const logo = {
  color: '#10b981',
  fontSize: '20px',
  fontWeight: '700',
  margin: '0',
}

const content = {
  padding: '32px',
}

const heading = {
  color: '#fafafa',
  fontSize: '24px',
  fontWeight: '600',
  margin: '0 0 24px',
  lineHeight: '1.3',
}

const paragraph = {
  color: '#a3a3a3',
  fontSize: '16px',
  lineHeight: '1.6',
  margin: '0 0 16px',
}

const divider = {
  borderTop: '1px solid #262626',
  margin: '24px 0',
}

const signature = {
  color: '#fafafa',
  fontSize: '14px',
  fontStyle: 'italic',
  margin: '0',
}

const footer = {
  padding: '24px 32px',
  backgroundColor: '#0a0a0a',
  borderTop: '1px solid #262626',
}

const footerText = {
  color: '#525252',
  fontSize: '12px',
  lineHeight: '1.5',
  margin: '0 0 8px',
  textAlign: 'center' as const,
}

export default WelcomeEmail
