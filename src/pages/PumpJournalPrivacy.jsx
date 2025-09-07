import { Helmet } from 'react-helmet-async'
import { Container, Section, Heading, Subtext } from '../styles/primitives.js'

export default function PumpJournalPrivacy() {
  return (
    <Container>
      <Helmet>
        <title>PumpJournal — Privacy Policy</title>
        <meta name="description" content="PumpJournal Privacy Policy — what data we collect, how we store it, sharing, your rights, and how to contact us." />
      </Helmet>
      <Section>
        <Heading>Privacy Policy</Heading>
        <Subtext>Effective date: 2025-01-01</Subtext>
      </Section>
      <Section>
        <Heading as="h2">Introduction</Heading>
        <p>PumpJournal is designed to be simple and privacy-first. We collect only what is necessary to provide the app’s core functionality.</p>
      </Section>
      <Section>
        <Heading as="h2">Data Collected</Heading>
        <ul>
          <li>Workout entries you create in the app.</li>
          <li>Basic diagnostics and crash reports, if you opt in.</li>
        </ul>
      </Section>
      <Section>
        <Heading as="h2">Storage</Heading>
        <p>Your workout data is stored locally on your device. Back up your device regularly to preserve your data.</p>
      </Section>
      <Section>
        <Heading as="h2">Sharing</Heading>
        <p>We do not sell your data. We only share diagnostic data with service providers to improve reliability.</p>
      </Section>
      <Section>
        <Heading as="h2">Your Rights</Heading>
        <p>You may request deletion of any optional diagnostic data associated with you. For local data removal, delete the app from your device.</p>
      </Section>
      <Section>
        <Heading as="h2">Contact</Heading>
        <p>For privacy questions, contact <a href="mailto:support@pumpjournal.app">support@pumpjournal.app</a>.</p>
      </Section>
      <Section>
        <Heading as="h2">Effective Date</Heading>
        <p>This policy is effective January 1, 2025 and will be updated as needed.</p>
      </Section>
    </Container>
  )
}

