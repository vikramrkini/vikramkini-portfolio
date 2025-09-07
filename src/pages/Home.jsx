import { Helmet } from 'react-helmet-async'
import styled, { keyframes } from 'styled-components'
import { Container, Section, Heading, Subtext, LinkButton, MutedButton } from '../styles/primitives.js'
import { Link } from 'react-router-dom'

const shimmer = keyframes`
  0% { background-position: 0% 50%; }
  100% { background-position: 200% 50%; }
`

const GlowTitle = styled(Heading)`
  background: linear-gradient(90deg,#e8eefc 0%, #bcd3ff 25%, #c7b6ff 50%, #9cf5e4 75%, #e8eefc 100%);
  background-size: 200% 100%;
  -webkit-background-clip: text; background-clip: text; color: transparent;
  animation: ${shimmer} 14s linear infinite;
  text-shadow: 0 6px 40px rgba(100, 251, 210, 0.08), 0 2px 14px rgba(142, 178, 255, 0.12);
`

const CTAWrap = styled.div`
  display: flex; gap: 12px; flex-wrap: wrap; margin-top: 8px;
`

export default function Home() {
  return (
    <Container as={Section}>
      <Helmet>
        <title>Vikram Kini — Software Engineer</title>
        <meta name="description" content="Software Engineer specializing in React, Swift, and Spring Boot. Explore projects and get in touch." />
      </Helmet>
      <GlowTitle>Vikram Kini</GlowTitle>
      <Subtext>Software Engineer · React · Swift · Spring Boot</Subtext>
      <CTAWrap>
        <LinkButton as={Link} to="/projects">View Projects</LinkButton>
        <MutedButton as={Link} to="/contact">Contact</MutedButton>
      </CTAWrap>
    </Container>
  )
}
