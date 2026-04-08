import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import styled from 'styled-components'
import OrbBackground from '../components/OrbBackground.jsx'

const Page = styled.section`
  position: relative;
  min-height: 100svh;
  padding: clamp(120px, 12vw, 160px) clamp(24px, 6vw, 72px) clamp(80px, 8vw, 120px);
  overflow: hidden;
`

const Inner = styled.div`
  position: relative;
  z-index: 2;
  max-width: 860px;
  margin: 0 auto;
`

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-body);
  font-size: 13px;
  color: var(--text-faint);
  margin-bottom: 40px;
  transition: color 0.2s ease;

  &:hover { color: var(--text-muted); }
`

const Hero = styled(motion.div)`
  margin-bottom: 64px;
`

const AppLabel = styled.div`
  font-family: var(--font-display);
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: var(--violet-muted);
  margin-bottom: 14px;
`

const AppTitle = styled.h1`
  margin: 0 0 14px;
  font-family: var(--font-display);
  font-size: clamp(40px, 7vw, 68px);
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 0.9;
  background: var(--gradient-text);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`

const AppSub = styled.p`
  margin: 0 0 28px;
  font-family: var(--font-body);
  font-size: clamp(15px, 2vw, 17px);
  color: var(--text-muted);
  line-height: 1.75;
  font-weight: 300;
  max-width: 520px;
`

const CtaRow = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`

const BtnPrimary = styled.a`
  display: inline-flex;
  align-items: center;
  padding: 12px 26px;
  border-radius: 10px;
  background: var(--gradient-brand);
  color: #fff;
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 500;
  box-shadow: 0 0 24px rgba(124,58,237,0.4);
  transition: box-shadow 0.25s ease, transform 0.2s ease;

  &:hover {
    box-shadow: 0 0 36px rgba(124,58,237,0.65);
    transform: translateY(-1px);
  }
`

const BtnGhost = styled(Link)`
  display: inline-flex;
  align-items: center;
  padding: 11px 22px;
  border-radius: 10px;
  background: rgba(255,255,255,0.04);
  color: var(--text-muted);
  font-family: var(--font-body);
  font-size: 14px;
  border: 1px solid var(--glass-border);
  transition: background 0.2s ease, color 0.2s ease;

  &:hover {
    background: rgba(255,255,255,0.08);
    color: var(--text);
  }
`

const FeaturesSection = styled(motion.div)`
  margin-top: 0;
`

const FeaturesLabel = styled.div`
  font-family: var(--font-display);
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: var(--violet-muted);
  margin-bottom: 24px;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
`

const FeatureCard = styled.div`
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 14px;
  padding: 22px 20px;
  transition: border-color 0.25s ease;

  &:hover { border-color: rgba(124,58,237,0.35); }
`

const FeatureIcon = styled.div`
  font-size: 24px;
  margin-bottom: 12px;
`

const FeatureTitle = styled.h3`
  margin: 0 0 7px;
  font-family: var(--font-display);
  font-size: 16px;
  font-weight: 700;
  color: var(--text);
  letter-spacing: -0.01em;
`

const FeatureDesc = styled.p`
  margin: 0;
  font-family: var(--font-body);
  font-size: 13px;
  color: var(--text-muted);
  line-height: 1.65;
  font-weight: 300;
`

const ease = [0.25, 0.46, 0.45, 0.94]

const FEATURES = [
  {
    icon: '⚡',
    title: 'Fast logging',
    desc: 'Quickly add sets and reps with minimal taps. Built for the gym floor.',
  },
  {
    icon: '🔒',
    title: 'Private by default',
    desc: 'No accounts required. Your data stays on your device.',
  },
  {
    icon: '📈',
    title: 'Simple insights',
    desc: 'See your recent history and progressive overload at a glance.',
  },
]

const PJ_ORBS = [
  {
    $size: 380,
    $color: 'radial-gradient(circle, rgba(124,58,237,0.4), transparent 70%)',
    $top: '-80px',
    $right: '-60px',
  },
  {
    $size: 260,
    $color: 'radial-gradient(circle, rgba(6,182,212,0.25), transparent 70%)',
    $bottom: '-40px',
    $left: '-40px',
  },
]

export default function PumpJournalLanding() {
  return (
    <Page>
      <Helmet>
        <title>PumpJournal — Workout Journal</title>
        <meta
          name="description"
          content="PumpJournal — a simple, privacy-first workout journal. Track your workouts without the noise."
        />
      </Helmet>

      <OrbBackground orbs={PJ_ORBS} noiseOpacity={0.03} />

      <Inner>
        <BackLink to="/work">← Back to Work</BackLink>

        <Hero
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease }}
        >
          <AppLabel>iOS App</AppLabel>
          <AppTitle>PumpJournal</AppTitle>
          <AppSub>
            A simple, privacy-first workout journal. Track workouts without the noise —
            no accounts, no subscriptions, no distractions.
          </AppSub>
          <CtaRow>
            <BtnPrimary href="#" target="_blank" rel="noopener">
              App Store ↗
            </BtnPrimary>
            <BtnGhost to="/pumpjournal/support">Support</BtnGhost>
            <BtnGhost to="/pumpjournal/privacy">Privacy</BtnGhost>
          </CtaRow>
        </Hero>

        <FeaturesSection
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease }}
        >
          <FeaturesLabel>Features</FeaturesLabel>
          <Grid>
            {FEATURES.map(({ icon, title, desc }) => (
              <FeatureCard key={title}>
                <FeatureIcon>{icon}</FeatureIcon>
                <FeatureTitle>{title}</FeatureTitle>
                <FeatureDesc>{desc}</FeatureDesc>
              </FeatureCard>
            ))}
          </Grid>
        </FeaturesSection>
      </Inner>
    </Page>
  )
}
