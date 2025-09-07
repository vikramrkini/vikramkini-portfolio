import { Helmet } from 'react-helmet-async'
import { Container, Section, Heading, Subtext, Card, Grid, LinkButton, MutedButton } from '../styles/primitives.js'
import { Link } from 'react-router-dom'

export default function Projects() {
  return (
    <Container>
      <Helmet>
        <title>Projects — Vikram Kini</title>
        <meta name="description" content="Selected projects by Vikram Kini, including PumpJournal — a simple and focused workout tracking app." />
      </Helmet>
      <Section>
        <Heading>Projects</Heading>
        <Subtext>A selection of work and experiments.</Subtext>
      </Section>
      <Grid>
        <Card>
          <Heading as="h3" style={{ fontSize: 22, marginBottom: 6 }}>PumpJournal</Heading>
          <Subtext>A simple, privacy-first workout journal.</Subtext>
          <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
            <LinkButton as={Link} to="/projects/pumpjournal">View details</LinkButton>
            <MutedButton as={Link} to="/pumpjournal/support">Support</MutedButton>
          </div>
        </Card>
        <Card>
          <Heading as="h3" style={{ fontSize: 22, marginBottom: 6 }}>Portfolio Site</Heading>
          <Subtext>This website — built with Vite, React, and styled-components.</Subtext>
        </Card>
      </Grid>
    </Container>
  )
}

