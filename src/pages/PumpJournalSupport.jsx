import { Helmet } from 'react-helmet-async'
import { Container, Section, Heading, Subtext } from '../styles/primitives.js'

export default function PumpJournalSupport() {
  return (
    <Container>
      <Helmet>
        <title>PumpJournal — Support</title>
        <meta name="description" content="Get help with PumpJournal. Contact support and browse FAQs." />
      </Helmet>
      <Section>
        <Heading>Support</Heading>
        <Subtext>Need help? Email us at <a href="mailto:support@pumpjournal.app">support@pumpjournal.app</a>.</Subtext>
      </Section>
      <Section>
        <Heading as="h2">FAQ</Heading>
        <ul>
          <li>How do I back up data? — Use your device backup; data is stored locally.</li>
          <li>Do I need an account? — No, PumpJournal is private by default.</li>
          <li>What platforms are supported? — iOS initially, with more to come.</li>
        </ul>
      </Section>
    </Container>
  )
}

