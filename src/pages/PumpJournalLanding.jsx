import { Helmet } from 'react-helmet-async'
import { Container, Section, Heading, Subtext, LinkButton, MutedButton, Grid, Card } from '../styles/primitives.js'
import { Link } from 'react-router-dom'

export default function PumpJournalLanding() {
  return (
    <Container>
      <Helmet>
        <title>PumpJournal — Workout Journal</title>
        <meta name="description" content="PumpJournal — a simple, privacy-first workout journal. Track your workouts without the noise." />
      </Helmet>
      <Section>
        <Heading>PumpJournal</Heading>
        <Subtext>A simple, privacy-first workout journal.</Subtext>
        <div style={{ display: 'flex', gap: 12, marginTop: 8, flexWrap: 'wrap' }}>
          <LinkButton as={Link} to="/pumpjournal/support">Support</LinkButton>
          <MutedButton as={Link} to="/pumpjournal/privacy">Privacy</MutedButton>
        </div>
      </Section>
      <Section>
        <Heading as="h2">Features</Heading>
        <Grid>
          <Card>
            <Heading as="h3" style={{ fontSize: 20 }}>Fast logging</Heading>
            <Subtext>Quickly add sets and reps with minimal taps.</Subtext>
          </Card>
          <Card>
            <Heading as="h3" style={{ fontSize: 20 }}>Private by default</Heading>
            <Subtext>No accounts required. Your data stays on your device.</Subtext>
          </Card>
          <Card>
            <Heading as="h3" style={{ fontSize: 20 }}>Simple insights</Heading>
            <Subtext>See your recent history and progress at a glance.</Subtext>
          </Card>
        </Grid>
      </Section>
    </Container>
  )
}

