import { Helmet } from 'react-helmet-async'
import styled from 'styled-components'
import { Container, Section, Heading, Subtext, Card, Grid, LinkButton, MutedButton } from '../styles/primitives.js'
import { Link } from 'react-router-dom'

const TiltCard = styled(Card)`
  perspective: 800px;
  transform-style: preserve-3d;
  transition: transform .2s ease, box-shadow .2s ease;
  &:hover {
    transform: rotateX(2deg) rotateY(-3deg) translateY(-2px);
    box-shadow: 0 16px 32px rgba(0,0,0,0.35);
  }
`

const PageInner = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 24px;
`

const ProjectsGrid = styled(Grid)`
  gap: 28px;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  justify-items: stretch;
`

const ProjectCard = styled(TiltCard)`
  padding: 22px;
  text-align: left;
  display: grid;
  gap: 8px;
`

const Actions = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 6px;
`

export default function Projects() {
  return (
    <Container>
      <Helmet>
        <title>Projects — Vikram Kini</title>
        <meta name="description" content="Selected projects by Vikram Kini, including PumpJournal — a simple and focused workout tracking app." />
      </Helmet>
      <PageInner>
        <Section style={{ marginBottom: 36 }}>
          <Heading>Projects</Heading>
          <Subtext>A selection of work and experiments.</Subtext>
        </Section>
        <ProjectsGrid>
          <ProjectCard>
            <Heading as="h3" style={{ fontSize: 22, margin: 0 }}>PumpJournal</Heading>
            <Subtext style={{ margin: 0 }}>A simple, privacy-first workout journal.</Subtext>
            <Actions>
              <LinkButton as={Link} to="/projects/pumpjournal">View details</LinkButton>
              <MutedButton as={Link} to="/pumpjournal/privacy">Privacy policy</MutedButton>
            </Actions>
          </ProjectCard>
          <ProjectCard>
            <Heading as="h3" style={{ fontSize: 22, margin: 0 }}>BugBane</Heading>
            <Subtext style={{ margin: 0 }}>A comprehensive mutation testing framework for Python.</Subtext>
            <Actions>
              <LinkButton href="https://github.com/vikramrkini/BugBane" target="_blank" rel="noopener noreferrer">GitHub</LinkButton>
            </Actions>
          </ProjectCard>
          <ProjectCard>
            <Heading as="h3" style={{ fontSize: 22, margin: 0 }}>Relay.io</Heading>
            <Subtext style={{ margin: 0 }}>Light‑weight multi‑user video conferencing.</Subtext>
            <Actions>
              <LinkButton href="https://github.com/vikramrkini/Relay.io" target="_blank" rel="noopener noreferrer">GitHub</LinkButton>
            </Actions>
          </ProjectCard>
          <ProjectCard>
            <Heading as="h3" style={{ fontSize: 22, margin: 0 }}>WarCardGame</Heading>
            <Subtext style={{ margin: 0 }}>Classic War card game built with SwiftUI.</Subtext>
            <Actions>
              <LinkButton href="https://github.com/vikramrkini/WarCardGame" target="_blank" rel="noopener noreferrer">GitHub</LinkButton>
            </Actions>
          </ProjectCard>
          <ProjectCard>
            <Heading as="h3" style={{ fontSize: 22, margin: 0 }}>TriQL</Heading>
            <Subtext style={{ margin: 0 }}>Cross‑model DB query tool (Neo4j backend).</Subtext>
            <Actions>
              <LinkButton href="https://github.com/vikramrkini/TriQL" target="_blank" rel="noopener noreferrer">GitHub</LinkButton>
            </Actions>
          </ProjectCard>
          <ProjectCard>
            <Heading as="h3" style={{ fontSize: 22, margin: 0 }}>Academic World Crawler</Heading>
            <Subtext style={{ margin: 0 }}>Distributed crawler + backend for university faculty data.</Subtext>
            <Actions>
              <LinkButton href="https://github.com/vikramrkini/Academic-World-Data-Crawler" target="_blank" rel="noopener noreferrer">GitHub</LinkButton>
            </Actions>
          </ProjectCard>
          
        </ProjectsGrid>
      </PageInner>
    </Container>
  )
}
