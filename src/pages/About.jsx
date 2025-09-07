import { Helmet } from 'react-helmet-async'
import styled from 'styled-components'
import { Container, Section, Heading, Subtext, Card, Grid } from '../styles/primitives.js'

const Profile = styled.div`
  display: grid;
  grid-template-columns: 140px 1fr;
  gap: 18px;
  align-items: center;
  @media (max-width: 560px) { grid-template-columns: 1fr; }
`

const Avatar = styled.img`
  width: 140px; height: 140px; border-radius: 16px; object-fit: cover;
  border: 1px solid #223152; box-shadow: 0 10px 24px rgba(0,0,0,0.25);
`

export default function About() {
  return (
    <Container>
      <Helmet>
        <title>About — Vikram Kini</title>
        <meta name="description" content="About Vikram Kini — Software Engineer focused on building clean, reliable products with React, Swift, and Spring Boot." />
      </Helmet>
      <Section>
        <Heading>About</Heading>
        <Profile>
          <Avatar src="avatar.svg" alt="Portrait of Vikram Kini" />
          <Subtext>
            I’m Vikram, a software engineer crafting clean, reliable products with a calm aesthetic.
            I focus on delightful, accessible experiences powered by React on the web, Swift for iOS, and Spring Boot on the backend.
            I care deeply about performance, clarity, and shipping.
          </Subtext>
        </Profile>
      </Section>
      <Section>
        <Heading as="h2">Skills</Heading>
        <Grid>
          <Card>
            <Heading as="h3" style={{ fontSize: 18 }}>Frontend</Heading>
            <ul>
              <li>React, Vite, TypeScript</li>
              <li>styled-components, Accessibility</li>
              <li>Performance & testing</li>
            </ul>
          </Card>
          <Card>
            <Heading as="h3" style={{ fontSize: 18 }}>Mobile</Heading>
            <ul>
              <li>Swift, SwiftUI</li>
              <li>Local-first & offline</li>
            </ul>
          </Card>
          <Card>
            <Heading as="h3" style={{ fontSize: 18 }}>Backend</Heading>
            <ul>
              <li>Spring Boot, REST APIs</li>
              <li>CI/CD with GitHub Actions</li>
            </ul>
          </Card>
        </Grid>
      </Section>
    </Container>
  )
}
