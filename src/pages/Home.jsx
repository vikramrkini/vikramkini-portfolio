import { useState, useRef, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { motion, useMotionValue, useTransform, useSpring, useInView } from 'framer-motion'
import styled, { keyframes } from 'styled-components'
import portfolioImg from '../assets/portfolio.png'
import aboutMeImg from '../assets/aboutme.png'
import {
  SiJavascript, SiTypescript, SiReact, SiNextdotjs, SiNodedotjs,
  SiPython, SiSwift, SiSpringboot, SiFlask, SiDjango,
  SiPostgresql, SiMysql, SiMongodb, SiFirebase,
  SiGooglecloud, SiDocker, SiKubernetes, SiGit, SiVercel,
} from 'react-icons/si'
import { FaJava, FaAws } from 'react-icons/fa6'

/* ─────────────────────────────────────────────
   Hero Section
───────────────────────────────────────────── */
const HeroSection = styled.section`
  position: relative;
  min-height: 100svh;
  display: flex;
  align-items: center;
  overflow: hidden;
  background: var(--bg-base);
`

const HeroImage = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  overflow: hidden;

  img {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-15%);
    height: 95%;
    width: auto;
    filter: grayscale(1);
    opacity: 0.55;
    transition: filter 1000ms ease, opacity 1000ms ease;
    /* Fade edges into background */
    mask-image: radial-gradient(ellipse 55% 90% at 50% 55%, black 40%, rgba(0,0,0,0.5) 65%, transparent 85%);
    -webkit-mask-image: radial-gradient(ellipse 55% 90% at 50% 55%, black 40%, rgba(0,0,0,0.5) 65%, transparent 85%);
  }

  &:hover img {
    filter: grayscale(0);
    opacity: 0.75;
  }

  @media (max-width: 768px) {
    display: none;
  }
`

const HeroGradientOverlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 2;
  background:
    linear-gradient(to right, #07070f 20%, rgba(7,7,15,0.5) 42%, rgba(7,7,15,0.05) 70%, #07070f 100%),
    linear-gradient(to bottom, rgba(7,7,15,0.4) 0%, transparent 15%, transparent 80%, rgba(7,7,15,0.7) 100%);
  pointer-events: none;
`

const marqueeLeft = keyframes`
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
`

const marqueeRight = keyframes`
  from { transform: translateX(-50%); }
  to   { transform: translateX(0); }
`


const HeroContent = styled.div`
  position: relative;
  z-index: 10;
  padding: 0 6rem;
  max-width: 680px;

  @media (max-width: 1024px) { padding: 0 3rem; }
  @media (max-width: 768px) { padding: 0 1.5rem; max-width: 100%; }
`

const HeroOverline = styled(motion.p)`
  font-family: var(--font-body);
  font-size: 0.625rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--gold);
  margin: 0 0 1.5rem;
`

const HeroH1 = styled(motion.h1)`
  font-family: var(--font-display);
  font-style: italic;
  font-size: clamp(3.5rem, 8vw, 7rem);
  font-weight: 700;
  line-height: 1.05;
  letter-spacing: -0.03em;
  color: var(--text);
  margin: 0 0 2rem;
`

const GoldSpan = styled.span`
  color: var(--gold);
  padding-right: 0.15em;
`

const HeroDivider = styled(motion.div)`
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
  margin-bottom: 2.5rem;
`


const HeroBody = styled.p`
  font-family: var(--font-body);
  font-size: 1.125rem;
  color: var(--text-muted);
  line-height: 1.75;
  margin: 0;
  max-width: 28rem;
  font-weight: 300;
`

const HeroCtas = styled(motion.div)`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`

const BtnGold = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.4em;
  padding: 0.75rem 1.75rem;
  border-radius: 3px;
  background: var(--gold);
  color: #0a0a0a;
  font-family: var(--font-body);
  font-size: 0.625rem;
  font-weight: 600;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  transition: opacity 0.3s ease;

  &:hover { opacity: 0.85; }
`

const BtnOutline = styled.a`
  display: inline-flex;
  align-items: center;
  padding: 0.75rem 1.75rem;
  border-radius: 3px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: var(--text-muted);
  font-family: var(--font-body);
  font-size: 0.625rem;
  font-weight: 500;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  transition: color 0.3s ease, border-color 0.3s ease;

  &:hover { color: var(--gold); border-color: var(--gold-muted); }
`

/* Word reveal — clip-mask slide-up animation */
const WordClip = styled.span`
  display: inline-block;
  overflow: hidden;
  vertical-align: bottom;
  line-height: 1.08;
`

const WordInner = styled(motion.span)`
  display: inline-block;
`

const heroTitleVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13, delayChildren: 0.2 } },
}

const wordReveal = {
  hidden: { y: '108%' },
  visible: { y: 0, transition: { duration: 0.78, ease: [0.25, 0.46, 0.45, 0.94] } },
}

/* ─────────────────────────────────────────────
   Skills — data
───────────────────────────────────────────── */
const SKILLS_ROW1 = [
  { Icon: SiJavascript, name: 'JavaScript' },
  { Icon: SiTypescript, name: 'TypeScript' },
  { Icon: SiReact,      name: 'React' },
  { Icon: SiNextdotjs,  name: 'Next.js' },
  { Icon: SiNodedotjs,  name: 'Node.js' },
  { Icon: SiPython,     name: 'Python' },
  { Icon: SiSwift,      name: 'Swift' },
  { Icon: FaJava,       name: 'Java' },
  { Icon: SiSpringboot, name: 'Spring Boot' },
  { Icon: SiFlask,      name: 'Flask' },
  { Icon: SiDjango,     name: 'Django' },
  { Icon: SiReact,      name: 'React Native' },
]

const SKILLS_ROW2 = [
  { Icon: SiPostgresql,  name: 'PostgreSQL' },
  { Icon: SiMysql,       name: 'MySQL' },
  { Icon: SiMongodb,     name: 'MongoDB' },
  { Icon: SiFirebase,    name: 'Firebase' },
  { Icon: FaAws,         name: 'AWS' },
  { Icon: SiGooglecloud, name: 'GCP' },
  { Icon: SiDocker,      name: 'Docker' },
  { Icon: SiKubernetes,  name: 'Kubernetes' },
  { Icon: SiGit,         name: 'Git' },
  { Icon: SiVercel,      name: 'Vercel' },
]

/* ─────────────────────────────────────────────
   Skills — styled components
───────────────────────────────────────────── */
const SkillsSection = styled.section`
  background: var(--bg-surface);
  padding: 5rem 0 4.5rem;
  overflow: hidden;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
`

const SkillsHeader = styled.div`
  text-align: center;
  padding: 0 6rem;
  margin-bottom: 3rem;

  @media (max-width: 768px) { padding: 0 1.5rem; }
`

const SkillsSectionLabel = styled.p`
  font-family: var(--font-body);
  font-size: 0.625rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--gold);
  margin: 0 0 0.75rem;
`

const SkillsHeading = styled.h2`
  font-family: var(--font-display);
  font-style: italic;
  font-size: clamp(1.75rem, 3vw, 2.5rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  color: var(--text);
  margin: 0;
  line-height: 1.1;
`

const MarqueeOuter = styled.div`
  mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
  -webkit-mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
  margin-bottom: 1rem;

  &:last-child { margin-bottom: 0; }
`

const MarqueeInner = styled.div`
  display: flex;
  gap: 0.875rem;
  width: max-content;
  animation: ${({ $reverse }) => $reverse ? marqueeRight : marqueeLeft}
    ${({ $duration }) => $duration || '36s'} linear infinite;

  &:hover { animation-play-state: paused; }
`

const SkillPill = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.55rem 1rem;
  background: rgba(255, 255, 255, 0.025);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 3px;
  white-space: nowrap;
  cursor: default;
  transition: border-color 0.4s ease, background 0.4s ease;

  &:hover {
    border-color: rgba(233, 195, 73, 0.3);
    background: rgba(233, 195, 73, 0.04);
  }
`

const SkillIconWrap = styled.div`
  opacity: 0.6;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`

const SkillName = styled.span`
  font-family: var(--font-body);
  font-size: 0.6875rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.45);
`

/* ─────────────────────────────────────────────
   About Section
───────────────────────────────────────────── */
const AboutSection = styled.section`
  background: var(--bg-base);
  padding: 8rem 6rem;

  @media (max-width: 1024px) { padding: 6rem 3rem; }
  @media (max-width: 768px)  { padding: 4rem 1.5rem; }
`

const AboutGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 5fr 7fr;
  gap: 5rem;
  align-items: start;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
`

const PortraitPerspective = styled.div`
  perspective: 900px;
`

const AboutPortraitWrap = styled(motion.div)`
  position: relative;
  transform-style: preserve-3d;
  will-change: transform;
`

const AboutPortrait = styled.img`
  width: 100%;
  aspect-ratio: 3/4;
  object-fit: cover;
  object-position: top center;
  border-radius: 4px;
  filter: grayscale(1);
  opacity: 0.75;
  transition: filter 1000ms ease, opacity 1000ms ease;
  box-shadow: 0 0 0 1px rgba(233, 195, 73, 0.15), 0 24px 60px rgba(0, 0, 0, 0.5);

  &:hover {
    filter: grayscale(0);
    opacity: 1;
  }

  @media (max-width: 768px) {
    max-width: 280px;
    margin: 0 auto;
    display: block;
  }
`

const AboutContent = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

const AboutSectionLabel = styled.p`
  font-family: var(--font-body);
  font-size: 0.625rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--gold);
  margin: 0 0 0.5rem;
`

const AboutHeading = styled.h2`
  font-family: var(--font-display);
  font-style: italic;
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  color: var(--text);
  margin: 0 0 1.5rem;
  line-height: 1.1;
`

const AboutRule = styled.div`
  width: 4rem;
  height: 1px;
  background: rgba(255, 255, 255, 0.12);
  margin-bottom: 0.5rem;
`

const AboutP = styled(motion.p)`
  font-family: var(--font-body);
  font-size: 0.9375rem;
  color: var(--text-muted);
  line-height: 1.85;
  margin: 0;
  font-weight: 300;
`

/* ─────────────────────────────────────────────
   Experience Section
───────────────────────────────────────────── */
const ExpSection = styled.section`
  background: var(--bg-surface);
  padding: 8rem 6rem;

  @media (max-width: 1024px) { padding: 6rem 3rem; }
  @media (max-width: 768px)  { padding: 4rem 1.5rem; }
`

const ExpGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 4rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
`

const ExpSideTitle = styled(motion.div)``

const ExpSectionLabel = styled.p`
  font-family: var(--font-body);
  font-size: 0.625rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--text-muted);
  margin: 0 0 1rem;
`

const ExpSectionHeading = styled.h2`
  font-family: var(--font-display);
  font-style: italic;
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  color: var(--text);
  margin: 0;
  line-height: 1.1;
`

const ExpEntries = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 4rem;
`

const ExpEntry = styled(motion.div)`
  position: relative;
  padding-left: 3rem;
  border-left: 1px solid rgba(255, 255, 255, 0.15);

  &:hover .exp-number { opacity: 0.4; }
`

const ExpNumber = styled.div`
  position: absolute;
  left: -0.5rem;
  top: -3.25rem;
  font-family: var(--font-display);
  font-style: italic;
  font-size: 3.75rem;
  font-weight: 700;
  color: var(--gold);
  opacity: 0.25;
  line-height: 1;
  transition: opacity 0.3s ease;
  user-select: none;
  pointer-events: none;
`

const ExpHeader = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 0.75rem;
  flex-wrap: wrap;
`

const ExpRole = styled.h3`
  font-family: var(--font-display);
  font-size: clamp(1.25rem, 2.5vw, 1.875rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--text);
  margin: 0;
`

const ExpPeriod = styled.span`
  font-family: var(--font-body);
  font-size: 0.625rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--text-muted);
  white-space: nowrap;
`

const ExpCompany = styled.p`
  font-family: var(--font-body);
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--gold);
  margin: 0 0 0.75rem;
  opacity: 0.8;
`

const ExpDesc = styled.p`
  font-family: var(--font-body);
  font-size: 0.9375rem;
  color: var(--text-muted);
  line-height: 1.8;
  margin: 0 0 1.25rem;
  font-weight: 300;
`

const ExpTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`

const ExpTag = styled.span`
  font-family: var(--font-body);
  font-size: 0.625rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--text-muted);
  background: #353535;
  border-radius: 2px;
  padding: 0.3rem 0.6rem;
`

const ExpMetrics = styled.div`
  display: flex;
  gap: 2.5rem;
  margin-bottom: 1.25rem;
  flex-wrap: wrap;
`

const ExpMetric = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`

const ExpMetricValue = styled.div`
  font-family: var(--font-display);
  font-style: italic;
  font-size: 1.625rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1;
  color: var(--gold);
`

const ExpMetricLabel = styled.div`
  font-family: var(--font-body);
  font-size: 0.55rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--text-muted);
  opacity: 0.6;
`

/* ─────────────────────────────────────────────
   Data
───────────────────────────────────────────── */
const EXPERIENCE = [
  {
    role: 'Software Engineer',
    company: 'ISAFE Enterprises LLC',
    period: 'Jun 2023 – Present',
    description: 'Led full-stack development of a compliance platform serving 75,000+ users across 1,000+ K-12 schools. Built everything from the React frontend and React Native mobile apps to AWS Lambda backend services and an AI support assistant — reducing support resolution time by 38% and cutting release cycles from 2 hours to 15 minutes.',
    tags: ['React', 'React Native', 'AWS Lambda', 'Python', 'MySQL', 'Jest', 'Cypress', 'GitLab CI/CD', 'SSO'],
    metrics: [
      { value: 75000, suffix: '+', label: 'Users Served' },
      { value: 38, suffix: '%', label: 'Faster Support' },
      { value: 49, suffix: '%', label: 'Deploy Time Cut' },
    ],
  },
  {
    role: 'Software Developer',
    company: 'PrairieLearn Inc.',
    period: 'May 2023 – Aug 2023',
    description: 'Part-time role during my Master\'s at UIUC. Built deadline automation tooling in React and Node.js that saved instructors 13+ hours per week, and brought the platform to WCAG 2.1 AA accessibility compliance.',
    tags: ['React', 'Node.js', 'REST APIs', 'Accessibility'],
    metrics: [
      { value: 13, suffix: '+', label: 'Hrs Saved / Week' },
    ],
  },
  {
    role: 'Founding Software Engineer',
    company: 'Airbook.io',
    period: 'Nov 2021 – Jul 2022',
    description: 'Early engineer on a BI startup, building React and Flask dashboards used by 500+ paying customers. Set up the full containerized deployment pipeline with Docker and Kubernetes, cutting deploy time from 30 minutes to 7.',
    tags: ['React', 'Flask', 'Python', 'Docker', 'Kubernetes'],
    metrics: [
      { value: 500, suffix: '+', label: 'Paying Users' },
      { value: 77, suffix: '%', label: 'Faster Deploys' },
    ],
  },
]

/* ─────────────────────────────────────────────
   Animation helpers
───────────────────────────────────────────── */
const ease = [0.25, 0.46, 0.45, 0.94]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease },
})

/* Count-up component — triggers once when scrolled into view */
function StatCount({ value, suffix = '' }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!isInView) return
    const duration = 1600
    const start = performance.now()
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.round(eased * value))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [isInView, value])

  return <span ref={ref}>{display.toLocaleString()}{suffix}</span>
}

export default function Home() {
  const pdfUrl = `${import.meta.env.BASE_URL}Resume-Vikram.pdf`

  /* Portrait 3D tilt */
  const portraitRef = useRef(null)
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-10, 10]), { stiffness: 180, damping: 28 })
  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [8, -8]),  { stiffness: 180, damping: 28 })

  const onPortraitMove = (e) => {
    const rect = portraitRef.current?.getBoundingClientRect()
    if (!rect) return
    rawX.set((e.clientX - rect.left) / rect.width - 0.5)
    rawY.set((e.clientY - rect.top)  / rect.height - 0.5)
  }
  const onPortraitLeave = () => { rawX.set(0); rawY.set(0) }

  return (
    <>
      <Helmet>
        <title>Vikram Kini — Full Stack Engineer</title>
        <meta
          name="description"
          content="Vikram Kini — Full Stack Engineer building AI-enabled web and mobile products."
        />
      </Helmet>

      {/* ── Hero ── */}
      <HeroSection>
        <HeroImage>
          <img src={portfolioImg} alt="Vikram Kini" />
        </HeroImage>

        <HeroGradientOverlay />

        <HeroContent>
          <HeroOverline {...fadeUp(0.1)}>
            AI-Native &middot; Full Stack Engineer
          </HeroOverline>

          <HeroH1 initial="hidden" animate="visible" variants={heroTitleVariants}>
            <WordClip><WordInner variants={wordReveal}>Engineered</WordInner></WordClip>
            <br />
            <WordClip><WordInner variants={wordReveal}>to <GoldSpan>Scale.</GoldSpan></WordInner></WordClip>
          </HeroH1>

          <HeroDivider {...fadeUp(0.4)}>
            <HeroBody>
              UIUC CS Master&apos;s, 4.0 GPA. I architect React platforms,
              AI assistants, and AWS microservices — actively used by
              75,000+ people across 1,000+ organizations.
            </HeroBody>
          </HeroDivider>

          <HeroCtas {...fadeUp(0.55)}>
            <BtnGold to="/work">View Projects →</BtnGold>
            <BtnOutline href={pdfUrl} target="_blank" rel="noopener">
              Download Résumé
            </BtnOutline>
          </HeroCtas>
        </HeroContent>
      </HeroSection>

      {/* ── Skills Marquee ── */}
      <SkillsSection>
        <SkillsHeader>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease }}
          >
            <SkillsSectionLabel>Tech Stack</SkillsSectionLabel>
            <SkillsHeading>What I Work With</SkillsHeading>
          </motion.div>
        </SkillsHeader>

        <MarqueeOuter>
          <MarqueeInner $duration="38s">
            {[...SKILLS_ROW1, ...SKILLS_ROW1].map((skill, i) => (
              <SkillPill key={i}>
                <SkillIconWrap>{skill.Icon({ size: 18 })}</SkillIconWrap>
                <SkillName>{skill.name}</SkillName>
              </SkillPill>
            ))}
          </MarqueeInner>
        </MarqueeOuter>

        <MarqueeOuter>
          <MarqueeInner $reverse $duration="32s">
            {[...SKILLS_ROW2, ...SKILLS_ROW2].map((skill, i) => (
              <SkillPill key={i}>
                <SkillIconWrap>{skill.Icon({ size: 18 })}</SkillIconWrap>
                <SkillName>{skill.name}</SkillName>
              </SkillPill>
            ))}
          </MarqueeInner>
        </MarqueeOuter>
      </SkillsSection>

      {/* ── About ── */}
      <AboutSection id="about">
        <AboutGrid>
          <PortraitPerspective>
            <AboutPortraitWrap
              ref={portraitRef}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, ease }}
              onMouseMove={onPortraitMove}
              onMouseLeave={onPortraitLeave}
              style={{ rotateX, rotateY }}
            >
              <AboutPortrait src={aboutMeImg} alt="Vikram Kini" />
            </AboutPortraitWrap>
          </PortraitPerspective>

          <AboutContent
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease }}
          >
            <div>
              <AboutSectionLabel>Who I am</AboutSectionLabel>
              <AboutHeading>The Story</AboutHeading>
              <AboutRule />
            </div>

            <AboutP
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: 0.05, ease }}
            >
              My passion for technology began long before I wrote my first line of code. At the age of eleven, I was captivated by Apple&apos;s voice assistant, Siri. The idea that a small device in my hand could understand my questions and respond intelligently felt like magic — and it sparked a curiosity that never left me.
            </AboutP>

            <AboutP
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: 0.1, ease }}
            >
              During my undergraduate studies in Computer Science at the University of Mumbai, I focused on artificial intelligence, machine learning, and database systems. One project I&apos;m especially proud of is TriQL — a beginner-friendly database learning tool with visual query execution that reduced learning time by 20%.
            </AboutP>

            <AboutP
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: 0.15, ease }}
            >
              I then pursued a Master&apos;s in Computer Science at the University of Illinois Urbana-Champaign (UIUC), graduating with a 4.0 GPA and deepening my work in systems, AI, and databases.
            </AboutP>

            <AboutP
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: 0.2, ease }}
            >
              Beyond work, I continue to explore side projects that reflect my passions. PumpJournal — an AI-assisted iOS fitness journal with real-time HealthKit sync and cloud backup — reached 300+ downloads in its first two weeks. What started with a simple &quot;Hey, Siri&quot; has grown into a career centered on solving problems with code.
            </AboutP>
          </AboutContent>
        </AboutGrid>
      </AboutSection>

      {/* ── Experience ── */}
      <ExpSection id="experience">
        <ExpGrid>
          <ExpSideTitle
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease }}
          >
            <ExpSectionLabel>Where I&apos;ve worked</ExpSectionLabel>
            <ExpSectionHeading>Experience &amp;<br />Expertise</ExpSectionHeading>
          </ExpSideTitle>

          <ExpEntries
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, ease }}
          >
            {EXPERIENCE.map(({ role, company, period, description, tags, metrics }, i) => (
              <ExpEntry
                key={company}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.15, ease }}
              >
                <ExpNumber className="exp-number">
                  {String(i + 1).padStart(2, '0')}
                </ExpNumber>
                <ExpHeader>
                  <ExpRole>{role}</ExpRole>
                  <ExpPeriod>{period}</ExpPeriod>
                </ExpHeader>
                <ExpCompany>{company}</ExpCompany>
                {metrics && (
                  <ExpMetrics>
                    {metrics.map(({ value, suffix, label }) => (
                      <ExpMetric key={label}>
                        <ExpMetricValue>
                          <StatCount value={value} suffix={suffix} />
                        </ExpMetricValue>
                        <ExpMetricLabel>{label}</ExpMetricLabel>
                      </ExpMetric>
                    ))}
                  </ExpMetrics>
                )}
                <ExpDesc>{description}</ExpDesc>
                <ExpTags>
                  {tags.map((t) => <ExpTag key={t}>{t}</ExpTag>)}
                </ExpTags>
              </ExpEntry>
            ))}
          </ExpEntries>
        </ExpGrid>
      </ExpSection>
    </>
  )
}
