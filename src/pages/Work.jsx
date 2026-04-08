import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import styled from 'styled-components'
import OrbBackground from '../components/OrbBackground.jsx'
import ProjectCard from '../components/ProjectCard.jsx'

const WorkSection = styled.section`
  position: relative;
  min-height: 100svh;
  padding: clamp(120px, 12vw, 160px) clamp(24px, 6vw, 80px) clamp(80px, 8vw, 120px);
  overflow: hidden;
`

const Inner = styled.div`
  position: relative;
  z-index: 2;
  max-width: 1100px;
  margin: 0 auto;
`

const PageHeader = styled(motion.div)`
  text-align: center;
  margin-bottom: 48px;
`

const SectionLabel = styled.div`
  font-family: var(--font-display);
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--violet-muted);
  margin-bottom: 12px;
`

const SectionTitle = styled.h1`
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(32px, 5vw, 48px);
  font-weight: 800;
  letter-spacing: -0.03em;
  color: var(--text);
`

const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
`

const PROJECTS = [
  {
    title: 'PumpJournal',
    description:
      'AI-assisted iOS fitness journal with real-time HealthKit sync and cloud backup. 300+ downloads in the first 2 weeks.',
    tag: 'iOS · AI',
    tagVariant: 'violet',
    icon: '💪',
    gradient: 'linear-gradient(135deg, rgba(124,58,237,0.25), rgba(6,182,212,0.15))',
    to: '/projects/pumpjournal',
  },
  {
    title: 'BugBane',
    description: 'A comprehensive mutation testing framework for Python.',
    tag: 'Python · Testing',
    tagVariant: 'cyan',
    icon: '🐛',
    gradient: 'linear-gradient(135deg, rgba(6,182,212,0.2), rgba(124,58,237,0.1))',
    href: 'https://github.com/vikramrkini/BugBane',
  },
  {
    title: 'Relay.io',
    description: 'Light-weight multi-user video conferencing.',
    tag: 'Web · Full Stack',
    tagVariant: 'cyan',
    icon: '🎥',
    gradient: 'linear-gradient(135deg, rgba(6,182,212,0.2), rgba(124,58,237,0.1))',
    href: 'https://github.com/vikramrkini/Relay.io',
  },
  {
    title: 'WarCardGame',
    description: 'Classic War card game built with SwiftUI.',
    tag: 'iOS · SwiftUI',
    tagVariant: 'violet',
    icon: '🃏',
    gradient: 'linear-gradient(135deg, rgba(124,58,237,0.2), rgba(6,182,212,0.1))',
    href: 'https://github.com/vikramrkini/WarCardGame',
  },
  {
    title: 'TriQL',
    description: 'Beginner-friendly database learning tool with visual query execution.',
    tag: 'Web · Education',
    tagVariant: 'cyan',
    icon: '🗄️',
    gradient: 'linear-gradient(135deg, rgba(6,182,212,0.2), rgba(124,58,237,0.1))',
    href: 'https://github.com/vikramrkini/TriQL',
  },
  {
    title: 'Academic World Crawler',
    description: 'Distributed crawler + backend for university faculty data.',
    tag: 'Python · Data',
    tagVariant: 'violet',
    icon: '🕷️',
    gradient: 'linear-gradient(135deg, rgba(124,58,237,0.2), rgba(6,182,212,0.1))',
    href: 'https://github.com/vikramrkini/Academic-World-Data-Crawler',
  },
]

const ease = [0.25, 0.46, 0.45, 0.94]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
}

const WORK_ORBS = [
  {
    $size: 360,
    $color: 'radial-gradient(circle, rgba(124,58,237,0.3), transparent 70%)',
    $top: '-80px',
    $left: '-60px',
  },
  {
    $size: 260,
    $color: 'radial-gradient(circle, rgba(6,182,212,0.2), transparent 70%)',
    $bottom: '-40px',
    $right: '-30px',
  },
]

export default function Work() {
  return (
    <>
      <Helmet>
        <title>Work — Vikram Kini</title>
        <meta
          name="description"
          content="Selected projects by Vikram Kini — Full Stack Engineer."
        />
      </Helmet>

      <WorkSection>
        <OrbBackground orbs={WORK_ORBS} noiseOpacity={0.03} />

        <Inner>
          <PageHeader
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
          >
            <SectionLabel>Portfolio</SectionLabel>
            <SectionTitle>Selected Work</SectionTitle>
          </PageHeader>

          <Grid
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {PROJECTS.map((project) => (
              <motion.div key={project.title} variants={cardVariants}>
                <ProjectCard {...project} />
              </motion.div>
            ))}
          </Grid>
        </Inner>
      </WorkSection>
    </>
  )
}
