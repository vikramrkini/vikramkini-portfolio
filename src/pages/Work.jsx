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
      'AI-powered fitness tracking app. Log workouts with natural language, track progressive overload automatically.',
    tag: 'iOS · AI',
    tagVariant: 'violet',
    icon: '💪',
    gradient: 'linear-gradient(135deg, rgba(124,58,237,0.25), rgba(6,182,212,0.15))',
    to: '/projects/pumpjournal',
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
