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

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center top;
    filter: grayscale(1);
    opacity: 0.45;
    transition: filter 1000ms ease, opacity 1000ms ease;
    /* Vignette mask — center visible, edges fade into dark bg */
    mask-image: radial-gradient(ellipse 65% 85% at 55% 45%, black 25%, rgba(0,0,0,0.6) 55%, transparent 80%);
    -webkit-mask-image: radial-gradient(ellipse 65% 85% at 55% 45%, black 25%, rgba(0,0,0,0.6) 55%, transparent 80%);
  }

  &:hover img {
    filter: grayscale(0);
    opacity: 0.65;
  }

  @media (max-width: 768px) {
    display: none;
  }
`

const HeroGradientOverlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 2;
  /* Strong left vignette so text stays readable; subtle overall darkening */
  background:
    linear-gradient(to right, #07070f 18%, rgba(7,7,15,0.55) 45%, rgba(7,7,15,0.1) 75%, #07070f 100%),
    linear-gradient(to bottom, rgba(7,7,15,0.3) 0%, transparent 20%, transparent 80%, rgba(7,7,15,0.6) 100%);
  pointer-events: none;
`

const float = keyframes`
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50%       { transform: translateY(-20px) rotate(5deg); }
`

const TechIcon = styled.div`
  position: absolute;
  width: 48px;
  height: 48px;
  opacity: ${({ $opacity }) => $opacity || 0.25};
  filter: grayscale(1) invert(1);
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
   Tech icons (inline SVG)
───────────────────────────────────────────── */
const IconJS = () => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" fill="#F7DF1E" rx="2"/>
    <path d="M9.5 24.5c.6 1 1.5 1.8 3.2 1.8 1.9 0 3-.9 3-2.2 0-1.5-.8-2-2.5-2.8l-.9-.4c-2.5-1.1-4.1-2.4-4.1-5.2 0-2.5 2-4.4 5-4.4 2.2 0 3.7.8 4.8 2.8l-2.6 1.7c-.6-1-1.2-1.4-2.2-1.4-1 0-1.7.6-1.7 1.4 0 1 .6 1.4 2 2.1l.9.4c2.9 1.3 4.5 2.5 4.5 5.4 0 3.1-2.4 4.6-5.7 4.6-3.1 0-5.1-1.5-6.1-3.5l2.8-1.7zM22.5 24.1c.4.8 1 1.3 1.9 1.3.9 0 1.5-.4 1.5-1.9V11.7h3.3v11.9c0 3.1-1.8 4.5-4.5 4.5-2.4 0-3.8-1.2-4.5-2.7l2.3-1.3z" fill="#0A0A0A"/>
  </svg>
)

const IconTS = () => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" fill="#3178C6" rx="2"/>
    <path d="M18 14.5h-4v-2.5H26V14.5h-4v11H18v-11zM8 17.5c.5 1 1.3 1.7 2.8 1.7 1.4 0 2.2-.7 2.2-1.6 0-1.1-.8-1.5-2.3-2.1l-.7-.3c-1.9-.8-3.2-1.8-3.2-4 0-2 1.6-3.4 4-3.4 1.7 0 2.9.6 3.8 2.2l-2 1.3c-.5-.8-1-1.1-1.8-1.1s-1.3.5-1.3 1.1c0 .8.5 1.1 1.7 1.6l.7.3c2.3 1 3.6 2 3.6 4.2 0 2.4-1.9 3.6-4.5 3.6-2.4 0-4-.9-4.8-2.7L8 17.5z" fill="white"/>
  </svg>
)

const IconReact = () => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="16" cy="16" r="3" fill="#61DAFB"/>
    <ellipse cx="16" cy="16" rx="13" ry="5" stroke="#61DAFB" strokeWidth="1.5" fill="none"/>
    <ellipse cx="16" cy="16" rx="13" ry="5" stroke="#61DAFB" strokeWidth="1.5" fill="none" transform="rotate(60 16 16)"/>
    <ellipse cx="16" cy="16" rx="13" ry="5" stroke="#61DAFB" strokeWidth="1.5" fill="none" transform="rotate(120 16 16)"/>
  </svg>
)

const IconPython = () => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 3C9.4 3 9.9 5.8 9.9 5.8L9.9 8.8H16.1V9.8H7.4C7.4 9.8 3 9.3 3 16c0 6.7 3.9 6.5 3.9 6.5H8.8v-3.1s-.1-3.9 3.8-3.9H18.7s3.7.1 3.7-3.6V6.7C22.4 6.7 22.7 3 16 3zM12.7 5.3c.7 0 1.2.5 1.2 1.2s-.5 1.2-1.2 1.2-1.2-.5-1.2-1.2.5-1.2 1.2-1.2z" fill="#4B8BBE"/>
    <path d="M16 29c6.6 0 6.1-2.8 6.1-2.8l-.1-3H15.9v-1h8.7S29 22.7 29 16c0-6.7-3.9-6.5-3.9-6.5H23.2v3.1s.1 3.9-3.8 3.9H12.9s-3.7-.1-3.7 3.6v6.2C9.2 26.3 9.4 29 16 29zM19.3 26.7c-.7 0-1.2-.5-1.2-1.2s.5-1.2 1.2-1.2 1.2.5 1.2 1.2-.5 1.2-1.2 1.2z" fill="#FFD43B"/>
  </svg>
)

const IconAWS = () => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 18l-2 6h2l.5-1.5h2L12 24h2l-2-6H9zm1 3.5.7-2.5.7 2.5H10zM19 18l-1.5 4.5L16 18h-2l2 6h2l1.5-4.5L21 24h2l2-6h-2l-1.5 4.5L20 18h-1zM4 22c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2H4z" fill="#FF9900"/>
    <path d="M24 10c0-3.3-3.6-6-8-6s-8 2.7-8 6c-2.2.4-4 2-4 4 0 2.2 1.8 4 4 4h16c2.2 0 4-1.8 4-4 0-2-1.8-3.6-4-4z" fill="#FF9900" opacity="0.3"/>
  </svg>
)

const IconVercel = () => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 4L30 28H2L16 4z" fill="white"/>
  </svg>
)

const IconNextJS = () => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="16" cy="16" r="14" fill="#000000"/>
    <path d="M10 22V10l14 14.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10 10h7" stroke="white" strokeWidth="2" strokeLinecap="round"/>
  </svg>
)

const IconPostgres = () => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="16" cy="8" rx="9" ry="5" stroke="#336791" strokeWidth="1.5" fill="none"/>
    <path d="M7 8v10c0 2.8 4 5 9 5s9-2.2 9-5V8" stroke="#336791" strokeWidth="1.5" fill="none"/>
    <path d="M7 13c0 2.8 4 5 9 5s9-2.2 9-5" stroke="#336791" strokeWidth="1.5" fill="none"/>
    <path d="M7 18c0 2.8 4 5 9 5s9-2.2 9-5" stroke="#336791" strokeWidth="1.5" fill="none"/>
  </svg>
)

const TECH_ICONS = [
  /* Around the face (center/right of screen) */
  { Icon: IconReact,    $top: '15%',  $left: '52%',  $delay: '0s',   $opacity: 0.35 },
  { Icon: IconJS,       $top: '22%',  $left: '72%',  $delay: '1s',   $opacity: 0.3  },
  { Icon: IconTS,       $top: '42%',  $left: '75%',  $delay: '1.5s', $opacity: 0.28 },
  { Icon: IconNextJS,   $top: '62%',  $left: '65%',  $delay: '2s',   $opacity: 0.3  },
  { Icon: IconAWS,      $top: '68%',  $left: '45%',  $delay: '3s',   $opacity: 0.25 },
  /* Near the text (left side) */
  { Icon: IconPython,   $top: '20%',  $left: '34%',  $delay: '4s',   $opacity: 0.28 },
  { Icon: IconVercel,   $top: '72%',  $left: '28%',  $delay: '5s',   $opacity: 0.25 },
  { Icon: IconPostgres, $top: '55%',  $left: '82%',  $delay: '6s',   $opacity: 0.22 },
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
