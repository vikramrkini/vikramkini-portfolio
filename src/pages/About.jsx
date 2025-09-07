import { Helmet } from 'react-helmet-async'
import { Container, Section, Heading, Subtext } from '../styles/primitives.js'

export default function About() {
  return (
    <Container>
      <Helmet>
        <title>About — Vikram Kini</title>
        <meta name="description" content="About Vikram Kini — Software Engineer focused on building clean, reliable products with React, Swift, and Spring Boot." />
      </Helmet>
      <Section>
        <Heading>About</Heading>
        <Subtext>
          I’m a software engineer who enjoys designing and shipping pragmatic, performant products.
          I work across the stack with React on the web, Swift for iOS, and Spring Boot for backend services.
        </Subtext>
      </Section>
      <Section>
        <Heading as="h2">Skills</Heading>
        <ul>
          <li>Frontend: React, Vite, TypeScript, styled-components</li>
          <li>Mobile: Swift, SwiftUI</li>
          <li>Backend: Spring Boot, REST APIs</li>
          <li>Tooling: GitHub Actions, CI/CD, testing</li>
        </ul>
      </Section>
    </Container>
  )
}

