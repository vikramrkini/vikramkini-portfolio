import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import styled from 'styled-components'

const WorkSection = styled.section`
  background: var(--bg-base);
  min-height: 100svh;
  padding: clamp(6rem, 10vw, 8rem) 6rem clamp(4rem, 8vw, 8rem);

  @media (max-width: 1024px) { padding: 6rem 3rem; }
  @media (max-width: 768px)  { padding: 5rem 1.5rem 3rem; }
`

const Inner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`

const HeaderRow = styled(motion.div)`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 2rem;
  margin-bottom: 5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 3rem;
  }
`

const HeaderLeft = styled.div``

const SectionOverline = styled.p`
  font-family: var(--font-body);
  font-size: 0.625rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--gold);
  margin: 0 0 0.75rem;
`

const SectionTitle = styled.h1`
  font-family: var(--font-display);
  font-style: italic;
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  color: var(--text);
  margin: 0;
  line-height: 1.05;
`

const HeaderRight = styled.p`
  font-family: var(--font-body);
  font-style: italic;
  font-size: 1rem;
  color: var(--text-muted);
  line-height: 1.7;
  max-width: 22rem;
  margin: 0;
  font-weight: 300;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`

const CardWrap = styled(motion.div)`
  &:nth-child(even) {
    margin-top: 8rem;

    @media (max-width: 768px) { margin-top: 0; }
  }
`

const CardLink = styled(Link)`
  display: block;
  text-decoration: none;
  color: inherit;
`

const CardLinkExt = styled.a`
  display: block;
  text-decoration: none;
  color: inherit;
`

const CardImageWrap = styled.div`
  position: relative;
  aspect-ratio: 4 / 5;
  overflow: hidden;
  background: var(--bg-surface);
  border-radius: 4px;
  margin-bottom: 1.5rem;
`

const CardImage = styled.div`
  width: 100%;
  height: 100%;
  background: ${({ $gradient }) => $gradient || 'linear-gradient(135deg, rgba(124,58,237,0.3), rgba(6,182,212,0.2))'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  transition: transform 700ms ease, opacity 700ms ease;
  opacity: 0.8;

  ${CardImageWrap}:hover & {
    transform: scale(1.05);
    opacity: 1;
  }
`

const CardHoverTint = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(233, 195, 73, 0.08);
  opacity: 0;
  transition: opacity 500ms ease;

  ${CardImageWrap}:hover & { opacity: 1; }
`

const CardMeta = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
`

const CardInfo = styled.div``

const CardTag = styled.p`
  font-family: var(--font-body);
  font-size: 0.625rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--text-muted);
  margin: 0 0 0.4rem;
`

const CardTitle = styled.h3`
  font-family: var(--font-display);
  font-size: clamp(1.2rem, 2.5vw, 1.5rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--text);
  margin: 0 0 0.4rem;
`

const CardDesc = styled.p`
  font-family: var(--font-body);
  font-size: 0.875rem;
  color: var(--text-muted);
  line-height: 1.65;
  margin: 0;
  font-weight: 300;
`

const CardArrow = styled.div`
  font-size: 1.25rem;
  color: var(--gold);
  flex-shrink: 0;
  transition: transform 300ms ease;
  margin-top: 0.2rem;

  ${CardMeta}:hover & { transform: translate(8px, -4px); }
`

const PROJECTS = [
  {
    title: 'PumpJournal',
    description: 'AI-assisted iOS fitness journal with real-time HealthKit sync and cloud backup. 300+ downloads in the first 2 weeks.',
    tag: 'iOS · AI · Swift',
    icon: '💪',
    gradient: 'linear-gradient(135deg, rgba(124,58,237,0.35), rgba(6,182,212,0.2))',
    to: '/projects/pumpjournal',
  },
  {
    title: 'BugBane',
    description: 'A comprehensive mutation testing framework for Python — improve test quality by automatically injecting faults.',
    tag: 'Python · Testing',
    icon: '🐛',
    gradient: 'linear-gradient(135deg, rgba(6,182,212,0.3), rgba(124,58,237,0.15))',
    href: 'https://github.com/vikramrkini/BugBane',
  },
  {
    title: 'Relay.io',
    description: 'Light-weight multi-user video conferencing built for low-latency real-time communication.',
    tag: 'Web · WebRTC · Full Stack',
    icon: '🎥',
    gradient: 'linear-gradient(135deg, rgba(233,195,73,0.2), rgba(124,58,237,0.2))',
    href: 'https://github.com/vikramrkini/Relay.io',
  },
  {
    title: 'TriQL',
    description: 'Beginner-friendly database learning tool with visual query execution. Reduced learning time by 20%.',
    tag: 'Web · Education · SQL',
    icon: '🗄️',
    gradient: 'linear-gradient(135deg, rgba(124,58,237,0.2), rgba(233,195,73,0.15))',
    href: 'https://github.com/vikramrkini/TriQL',
  },
  {
    title: 'WarCardGame',
    description: 'Classic War card game built with SwiftUI — clean state management and smooth animations.',
    tag: 'iOS · SwiftUI',
    icon: '🃏',
    gradient: 'linear-gradient(135deg, rgba(6,182,212,0.25), rgba(233,195,73,0.15))',
    href: 'https://github.com/vikramrkini/WarCardGame',
  },
  {
    title: 'Academic World Crawler',
    description: 'Distributed crawler and backend for aggregating university faculty research data at scale.',
    tag: 'Python · Data · Distributed',
    icon: '🕷️',
    gradient: 'linear-gradient(135deg, rgba(233,195,73,0.2), rgba(6,182,212,0.15))',
    href: 'https://github.com/vikramrkini/Academic-World-Data-Crawler',
  },
]

const ease = [0.25, 0.46, 0.45, 0.94]

function ProjectCard({ title, description, tag, icon, gradient, to, href }) {
  const content = (
    <>
      <CardImageWrap>
        <CardImage $gradient={gradient}>{icon}</CardImage>
        <CardHoverTint />
      </CardImageWrap>
      <CardMeta>
        <CardInfo>
          <CardTag>{tag}</CardTag>
          <CardTitle>{title}</CardTitle>
          <CardDesc>{description}</CardDesc>
        </CardInfo>
        <CardArrow>↗</CardArrow>
      </CardMeta>
    </>
  )

  if (to) return <CardLink to={to}>{content}</CardLink>
  return <CardLinkExt href={href} target="_blank" rel="noopener noreferrer">{content}</CardLinkExt>
}

export default function Work() {
  return (
    <>
      <Helmet>
        <title>Projects — Vikram Kini</title>
        <meta name="description" content="Selected projects by Vikram Kini — Full Stack Engineer." />
      </Helmet>

      <WorkSection>
        <Inner>
          <HeaderRow
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
          >
            <HeaderLeft>
              <SectionOverline>Curated Works</SectionOverline>
              <SectionTitle>Selected Projects</SectionTitle>
            </HeaderLeft>
            <HeaderRight>
              A selection of work spanning mobile, web, AI, and systems — built with a focus on craft and impact.
            </HeaderRight>
          </HeaderRow>

          <Grid>
            {PROJECTS.map((project, i) => (
              <CardWrap
                key={project.title}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.08, ease }}
              >
                <ProjectCard {...project} />
              </CardWrap>
            ))}
          </Grid>
        </Inner>
      </WorkSection>
    </>
  )
}
