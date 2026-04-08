import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import styled from 'styled-components'
import OrbBackground from '../components/OrbBackground.jsx'

/* ── Hero ── */
const HeroSection = styled.section`
  position: relative;
  min-height: 100svh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  text-align: center;
  padding: 100px 24px 80px;
  max-width: 640px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Badge = styled(motion.div)`
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 5px 14px;
  border-radius: 100px;
  background: rgba(124,58,237,0.12);
  border: 1px solid rgba(124,58,237,0.25);
  color: var(--violet-muted);
  font-family: var(--font-display);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.08em;
  margin-bottom: 28px;
`

const BadgeDot = styled.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--violet-muted);
  box-shadow: 0 0 6px var(--violet-muted);
  flex-shrink: 0;

  @keyframes pulse-glow {
    0%, 100% { box-shadow: 0 0 4px var(--violet-muted); }
    50% { box-shadow: 0 0 10px var(--violet-muted), 0 0 20px rgba(167,139,250,0.3); }
  }
  animation: pulse-glow 2.2s ease-in-out infinite;
`

const HeroName = styled(motion.h1)`
  margin: 0 0 10px;
  font-family: var(--font-display);
  font-size: clamp(48px, 8vw, 80px);
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 0.9;
  background: var(--gradient-text);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`

const HeroRole = styled(motion.p)`
  margin: 0 0 22px;
  font-family: var(--font-display);
  font-size: clamp(20px, 3.5vw, 30px);
  font-weight: 700;
  letter-spacing: -0.02em;
  background: var(--gradient-brand);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`

const HeroBio = styled(motion.p)`
  margin: 0 0 34px;
  font-family: var(--font-body);
  font-size: clamp(15px, 1.8vw, 17px);
  color: var(--text-muted);
  line-height: 1.75;
  font-weight: 300;
  max-width: 460px;
`

const ActionRow = styled(motion.div)`
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
`

const BtnPrimary = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 6px;
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

const BtnGhost = styled.a`
  display: inline-flex;
  align-items: center;
  padding: 11px 22px;
  border-radius: 10px;
  background: rgba(255,255,255,0.04);
  color: var(--text-muted);
  font-family: var(--font-body);
  font-size: 14px;
  border: 1px solid var(--glass-border);
  transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;

  &:hover {
    background: rgba(255,255,255,0.08);
    color: var(--text);
    border-color: rgba(255,255,255,0.15);
  }
`

const ScrollIndicator = styled(motion.div)`
  position: absolute;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  z-index: 2;
`

const ScrollLine = styled.div`
  width: 1px;
  height: 32px;
  background: linear-gradient(180deg, rgba(124,58,237,0.8), transparent);
`

const ScrollLabel = styled.span`
  font-family: var(--font-display);
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--text-faint);
`

/* ── About strip ── */
const AboutStrip = styled.section`
  background: var(--bg-surface);
  border-top: 1px solid rgba(255,255,255,0.06);
  padding: clamp(52px, 7vw, 88px) clamp(24px, 7vw, 96px);
`

const AboutGrid = styled(motion.div)`
  max-width: 920px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 52px;
  align-items: start;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 28px;
  }
`

const AboutLabel = styled.div`
  font-family: var(--font-display);
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: var(--violet-muted);
  margin-bottom: 14px;
`

const AboutHeadline = styled.h2`
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(24px, 3.5vw, 36px);
  font-weight: 700;
  letter-spacing: -0.025em;
  color: var(--text);
  line-height: 1.15;
`

const AboutBody = styled.p`
  margin: 0 0 22px;
  font-family: var(--font-body);
  font-size: 15px;
  color: var(--text-muted);
  line-height: 1.8;
  font-weight: 300;
`

const SkillsWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`

const SkillChip = styled.span`
  padding: 5px 13px;
  border-radius: 100px;
  font-family: var(--font-body);
  font-size: 12px;
  background: ${({ $hi }) => $hi ? 'rgba(124,58,237,0.12)' : 'rgba(255,255,255,0.04)'};
  border: 1px solid ${({ $hi }) => $hi ? 'rgba(124,58,237,0.25)' : 'rgba(255,255,255,0.08)'};
  color: ${({ $hi }) => $hi ? 'var(--violet-muted)' : 'var(--text-muted)'};
`

/* ── Animation helpers ── */
const ease = [0.25, 0.46, 0.45, 0.94]

const fadeUp = (delay) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease },
})

const SKILLS = [
  { label: 'React', hi: true },
  { label: 'Node.js', hi: true },
  { label: 'AI / LLMs', hi: true },
  { label: 'iOS · React Native', hi: false },
  { label: 'PostgreSQL', hi: false },
  { label: 'TypeScript', hi: false },
  { label: 'Design Systems', hi: false },
]

export default function Home() {
  const pdfUrl = `${import.meta.env.BASE_URL}Resume-Vikram.pdf`

  return (
    <>
      <Helmet>
        <title>Vikram Kini — Full Stack Engineer</title>
        <meta
          name="description"
          content="Vikram Kini — Full Stack Engineer building AI-enabled web and mobile products."
        />
      </Helmet>

      <HeroSection>
        <OrbBackground />

        <HeroContent>
          <Badge {...fadeUp(0.2)}>
            <BadgeDot /> Available for opportunities
          </Badge>

          <HeroName {...fadeUp(0.35)}>Vikram Kini</HeroName>

          <HeroRole {...fadeUp(0.5)}>Full Stack Engineer</HeroRole>

          <HeroBio {...fadeUp(0.65)}>
            Building AI-enabled web &amp; mobile products at the intersection of
            design and engineering. I care about the craft of software as much
            as what it does.
          </HeroBio>

          <ActionRow {...fadeUp(0.8)}>
            <BtnPrimary to="/work">View My Work →</BtnPrimary>
            <BtnGhost href={pdfUrl} target="_blank" rel="noopener">
              Download Resume
            </BtnGhost>
            <BtnGhost
              href="https://linkedin.com/in/vikramkini"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn ↗
            </BtnGhost>
          </ActionRow>
        </HeroContent>

        <ScrollIndicator {...fadeUp(1.1)}>
          <ScrollLine />
          <ScrollLabel>scroll</ScrollLabel>
        </ScrollIndicator>
      </HeroSection>

      <AboutStrip>
        <AboutGrid
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease }}
        >
          <div>
            <AboutLabel>About me</AboutLabel>
            <AboutHeadline>
              Engineer who designs.<br />Designer who ships.
            </AboutHeadline>
          </div>
          <div>
            <AboutBody>
              Full stack developer with a product mindset. I build reliable,
              maintainable software — and I think obsessively about how it feels
              to use. Currently focused on AI-enabled applications and mobile.
            </AboutBody>
            <SkillsWrap>
              {SKILLS.map(({ label, hi }) => (
                <SkillChip key={label} $hi={hi}>{label}</SkillChip>
              ))}
            </SkillsWrap>
          </div>
        </AboutGrid>
      </AboutStrip>
    </>
  )
}
