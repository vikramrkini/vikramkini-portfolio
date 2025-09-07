import { Helmet } from 'react-helmet-async'
import { Container, Section, Heading, Subtext, LinkButton, MutedButton } from '../styles/primitives.js'

export default function Contact() {
  return (
    <Container>
      <Helmet>
        <title>Contact — Vikram Kini</title>
        <meta name="description" content="Get in touch with Vikram Kini. Email and social links." />
      </Helmet>
      <Section>
        <Heading>Contact</Heading>
        <Subtext>Say hello — I’m open to new opportunities and collaborations.</Subtext>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 8 }}>
          <LinkButton href="mailto:hello@vikramkini.dev">Email</LinkButton>
          <MutedButton href="#">Twitter</MutedButton>
          <MutedButton href="#">LinkedIn</MutedButton>
          <MutedButton href="#">GitHub</MutedButton>
        </div>
      </Section>
    </Container>
  )
}

