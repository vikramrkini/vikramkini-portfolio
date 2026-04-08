import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import styled, { keyframes } from 'styled-components'
import portfolioImg from '../assets/portfolio.png'

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

const float = keyframes`
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50%       { transform: translateY(-20px) rotate(5deg); }
`

const TechIcon = styled.div`
  position: absolute;
  width: 44px;
  height: 44px;
  opacity: ${({ $opacity }) => $opacity || 0.3};
  animation: ${float} 8s ease-in-out infinite;
  animation-delay: ${({ $delay }) => $delay || '0s'};
  top: ${({ $top }) => $top || 'auto'};
  left: ${({ $left }) => $left || 'auto'};
  right: ${({ $right }) => $right || 'auto'};
  bottom: ${({ $bottom }) => $bottom || 'auto'};
  z-index: 5;
  pointer-events: none;

  svg { width: 100%; height: 100%; }

  @media (max-width: 768px) { display: none; }
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

const HeroRule = styled.div`
  flex-shrink: 0;
  width: 6rem;
  height: 1px;
  background: rgba(255, 255, 255, 0.15);
  margin-top: 0.75rem;
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

/* ─────────────────────────────────────────────
   Tech icons — white/outline, accurate brand marks
───────────────────────────────────────────── */

/* JavaScript — official yellow square mark, white version */
const IconJS = () => (
  <svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
    <rect width="128" height="128" rx="6" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="4"/>
    <text x="64" y="96" textAnchor="middle" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="62" fill="white">JS</text>
  </svg>
)

/* TypeScript — blue square mark, white version */
const IconTS = () => (
  <svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
    <rect width="128" height="128" rx="6" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="4"/>
    <text x="64" y="96" textAnchor="middle" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="62" fill="white">TS</text>
  </svg>
)

/* React — accurate three-orbit atom */
const IconReact = () => (
  <svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
    <circle cx="64" cy="64" r="10" fill="white"/>
    <ellipse cx="64" cy="64" rx="60" ry="22" fill="none" stroke="white" strokeWidth="4"/>
    <ellipse cx="64" cy="64" rx="60" ry="22" fill="none" stroke="white" strokeWidth="4" transform="rotate(60 64 64)"/>
    <ellipse cx="64" cy="64" rx="60" ry="22" fill="none" stroke="white" strokeWidth="4" transform="rotate(120 64 64)"/>
  </svg>
)

/* Next.js — circle with accurate N letterform */
const IconNextJS = () => (
  <svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
    <circle cx="64" cy="64" r="58" fill="none" stroke="white" strokeWidth="4"/>
    <text x="64" y="88" textAnchor="middle" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="68" fill="white">N</text>
  </svg>
)

/* Python — two interlocked snake shapes */
const IconPython = () => (
  <svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
    {/* Top snake (blue body) */}
    <path d="M64 8 C40 8 30 18 30 36 L30 52 L64 52 L64 58 L22 58 C14 58 8 66 8 76 C8 90 18 102 36 106 L36 92 C28 90 22 84 22 76 L22 72 L64 72 L64 78 L64 72 L78 72 L78 64 L78 52 L98 52 L98 36 C98 18 88 8 64 8 Z" fill="white" opacity="0.9"/>
    {/* Bottom snake (yellow body) */}
    <path d="M64 120 C88 120 98 110 98 92 L98 76 L64 76 L64 70 L106 70 C114 70 120 62 120 52 C120 38 110 26 92 22 L92 36 C100 38 106 44 106 52 L106 56 L64 56 L64 50 L64 56 L50 56 L50 64 L50 76 L30 76 L30 92 C30 110 40 120 64 120 Z" fill="rgba(255,255,255,0.55)"/>
    <circle cx="52" cy="32" r="6" fill="white"/>
    <circle cx="76" cy="96" r="6" fill="rgba(255,255,255,0.7)"/>
  </svg>
)

/* AWS — "aws" wordmark with smile arrow */
const IconAWS = () => (
  <svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
    <text x="64" y="58" textAnchor="middle" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="42" fill="white" letterSpacing="-1">AWS</text>
    {/* Smile arrow */}
    <path d="M24 76 Q64 98 104 76" fill="none" stroke="white" strokeWidth="5" strokeLinecap="round"/>
    <polygon points="104,70 112,80 100,82" fill="white"/>
  </svg>
)

/* Vercel — accurate upward triangle */
const IconVercel = () => (
  <svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
    <polygon points="64,12 118,108 10,108" fill="white"/>
  </svg>
)

/* Docker — whale with containers */
const IconDocker = () => (
  <svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
    {/* Containers */}
    <rect x="14" y="44" width="18" height="16" rx="2" fill="none" stroke="white" strokeWidth="3.5"/>
    <rect x="36" y="44" width="18" height="16" rx="2" fill="none" stroke="white" strokeWidth="3.5"/>
    <rect x="58" y="44" width="18" height="16" rx="2" fill="none" stroke="white" strokeWidth="3.5"/>
    <rect x="36" y="24" width="18" height="16" rx="2" fill="none" stroke="white" strokeWidth="3.5"/>
    <rect x="58" y="24" width="18" height="16" rx="2" fill="none" stroke="white" strokeWidth="3.5"/>
    <rect x="58" y="4" width="18" height="16" rx="2" fill="none" stroke="white" strokeWidth="3.5"/>
    {/* Whale body */}
    <path d="M8 66 C8 66 14 60 26 62 C30 54 40 54 44 62 C60 58 80 66 88 74 C96 82 94 92 82 94 C70 96 20 94 12 86 C4 78 8 66 8 66 Z" fill="white"/>
    {/* Whale tail */}
    <path d="M96 70 C104 64 114 62 118 68 C122 74 118 80 110 80" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round"/>
    {/* Water spout */}
    <path d="M70 58 Q72 48 68 40" stroke="white" strokeWidth="3" strokeLinecap="round" fill="none"/>
    <path d="M68 40 Q64 34 70 30" stroke="white" strokeWidth="3" strokeLinecap="round" fill="none"/>
  </svg>
)

/* PostgreSQL — elephant head silhouette */
const IconPostgres = () => (
  <svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
    <circle cx="64" cy="52" r="36" fill="none" stroke="white" strokeWidth="4"/>
    <text x="64" y="60" textAnchor="middle" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="22" fill="white">PG</text>
    {/* Trunk */}
    <path d="M86 68 C96 72 100 82 96 92 C94 98 88 102 84 98" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round"/>
    {/* Ear */}
    <path d="M34 36 C20 28 16 44 28 52" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round"/>
    {/* Tusk */}
    <path d="M50 82 C46 90 48 100 56 102" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round"/>
  </svg>
)

const TECH_ICONS = [
  /* Top edge */
  { Icon: IconReact,   $top: '7%',   $left: '18%',  $delay: '0s',   $opacity: 0.35 },
  { Icon: IconTS,      $top: '7%',   $right: '12%', $delay: '2s',   $opacity: 0.32 },
  /* Left edge */
  { Icon: IconPython,  $top: '38%',  $left: '2%',   $delay: '4s',   $opacity: 0.30 },
  { Icon: IconDocker,  $bottom: '18%', $left: '3%', $delay: '1s',   $opacity: 0.28 },
  /* Right edge */
  { Icon: IconAWS,     $top: '30%',  $right: '2%',  $delay: '3s',   $opacity: 0.30 },
  { Icon: IconJS,      $bottom: '22%', $right: '3%',$delay: '5s',   $opacity: 0.32 },
  /* Bottom edge */
  { Icon: IconNextJS,  $bottom: '6%', $left: '22%', $delay: '1.5s', $opacity: 0.30 },
  { Icon: IconVercel,  $bottom: '6%', $right: '20%',$delay: '6s',   $opacity: 0.28 },
]

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
  left: -1.5rem;
  top: -0.5rem;
  font-family: var(--font-display);
  font-style: italic;
  font-size: 3.75rem;
  font-weight: 700;
  color: var(--gold);
  opacity: 0.2;
  line-height: 1;
  transition: opacity 0.3s ease;
  user-select: none;
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

/* ─────────────────────────────────────────────
   Data
───────────────────────────────────────────── */
const EXPERIENCE = [
  {
    role: 'Full Stack Engineer',
    company: 'ISAFE Enterprises LLC',
    period: '2023 – Present',
    description: 'Architected a React compliance platform integrated with Spring Boot microservices for 1,000+ K-12 clients and ~75,000 users. Launched a React Native iOS/Android app, shipped AWS Lambda services cutting deployment time 49%, and delivered an AI assistant via AWS Lex + LLMs that improved support resolution speed 38%. Integrated auth across 5+ SSO providers.',
    tags: ['React', 'React Native', 'Spring Boot', 'AWS Lambda', 'AI/LLMs', 'SSO', 'Jest', 'Cypress'],
  },
  {
    role: 'Software Engineer',
    company: 'Airbook.io',
    period: '2022 – 2023',
    description: 'Developed React and Flask BI dashboards adopted by 500+ early paid users. Deployed Docker/Kubernetes microservices that reduced deploy time from 30 to 7 minutes.',
    tags: ['React', 'Flask', 'Python', 'Docker', 'Kubernetes'],
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

      {/* ── Hero ── */}
      <HeroSection>
        <HeroImage>
          <img src={portfolioImg} alt="Vikram Kini" />
          {TECH_ICONS.map((item, i) => (
            <TechIcon key={i} $top={item.$top} $left={item.$left} $right={item.$right} $bottom={item.$bottom} $delay={item.$delay} $opacity={item.$opacity}>
              {item.Icon()}
            </TechIcon>
          ))}
        </HeroImage>

        <HeroGradientOverlay />

        <HeroContent>
          <HeroOverline {...fadeUp(0.1)}>
            Software Engineer &amp; Architect
          </HeroOverline>

          <HeroH1 {...fadeUp(0.25)}>
            Building<br />
            <GoldSpan>Digital</GoldSpan> Products
          </HeroH1>

          <HeroDivider {...fadeUp(0.4)}>
            <HeroRule />
            <HeroBody>
              Full Stack Engineer with a Master&apos;s from UIUC (4.0 GPA).
              I ship React platforms for 75,000+ users, AI-powered iOS apps,
              and AWS microservices at scale.
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
            {EXPERIENCE.map(({ role, company, period, description, tags }, i) => (
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
