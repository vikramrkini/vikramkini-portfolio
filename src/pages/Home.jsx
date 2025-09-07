import { Helmet } from 'react-helmet-async'
import { Container, Section, Heading, Subtext, LinkButton, MutedButton } from '../styles/primitives.js'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <Container as={Section}>
      <Helmet>
        <title>Vikram Kini — Software Engineer</title>
        <meta name="description" content="Software Engineer specializing in React, Swift, and Spring Boot. Explore projects and get in touch." />
      </Helmet>
      <Heading>Vikram Kini</Heading>
      <Subtext>Software Engineer · React · Swift · Spring Boot</Subtext>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 8 }}>
        <LinkButton as={Link} to="/projects">View Projects</LinkButton>
        <MutedButton as={Link} to="/contact">Contact</MutedButton>
      </div>
    </Container>
  )
}
