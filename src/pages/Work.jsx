import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import styled, { keyframes } from 'styled-components'
import {
  SiPython, SiPostgresql, SiNextdotjs, SiDocker, SiSwift, SiFirebase,
  SiTypescript, SiNodedotjs, SiJavascript, SiOpenai, SiRedis,
} from 'react-icons/si'

/* ─── Keyframes ──────────────────────────────────────────────── */
const shimmer = keyframes`
  0%   { background-position: -200% center; }
  100% { background-position:  200% center; }
`

/* ─── Layout ─────────────────────────────────────────────────── */
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

/* ─── Card Image ─────────────────────────────────────────────── */
const CardImageWrap = styled.div`
  position: relative;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: var(--bg-surface);
  border-radius: 4px;
  margin-bottom: 1.5rem;
`

const CardImageBg = styled.div`
  position: absolute;
  inset: 0;
  background: ${({ $gradient }) => $gradient || 'linear-gradient(135deg, rgba(124,58,237,0.3), rgba(6,182,212,0.2))'};
  transition: transform 700ms ease, opacity 700ms ease;
  opacity: 0.9;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: radial-gradient(circle, rgba(255,255,255,0.055) 1px, transparent 1px);
    background-size: 20px 20px;
    opacity: 0.7;
  }

  ${CardImageWrap}:hover & {
    transform: scale(1.03);
    opacity: 1;
  }
`

const CardHoverTint = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(233, 195, 73, 0.07);
  opacity: 0;
  transition: opacity 500ms ease;
  z-index: 2;

  ${CardImageWrap}:hover & { opacity: 1; }
`

const IconLayer = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`

/* Central hero icon */
const HeroIconWrap = styled.div`
  font-size: 5.5rem;
  opacity: 0.55;
  color: ${({ $color }) => $color || 'var(--text)'};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 600ms ease, transform 600ms ease;
  position: relative;
  z-index: 2;

  ${CardImageWrap}:hover & {
    opacity: 0.8;
    transform: scale(1.08);
  }
`

const AbsIcon = styled.div`
  position: absolute;
  top: ${({ $top }) => $top || 'auto'};
  left: ${({ $left }) => $left || 'auto'};
  right: ${({ $right }) => $right || 'auto'};
  bottom: ${({ $bottom }) => $bottom || 'auto'};
  font-size: ${({ $size }) => $size || '2rem'};
  opacity: ${({ $opacity }) => $opacity || 0.15};
  color: ${({ $color }) => $color || 'var(--text)'};
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 500ms ease;

  ${CardImageWrap}:hover & {
    opacity: ${({ $hoverOpacity }) => $hoverOpacity || 0.28};
  }
`

/* ─── Featured Badge ─────────────────────────────────────────── */
const FeaturedBadge = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  z-index: 10;
  font-family: var(--font-body);
  font-size: 0.5rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: #07070f;
  background: var(--gold);
  padding: 0.35rem 0.75rem;
  border-radius: 2px;
  font-weight: 600;
  background-size: 200% auto;
  animation: ${shimmer} 3s linear infinite;
  background-image: linear-gradient(90deg, #e9c349, #f5d878, #e9c349);
`

/* ─── Card Meta ──────────────────────────────────────────────── */
const CardMeta = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
`

const CardInfo = styled.div`
  flex: 1;
  min-width: 0;
`

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
  margin: 0 0 0.85rem;
  font-weight: 300;
`

const CardStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
`

const CardChip = styled.span`
  font-family: var(--font-body);
  font-size: 0.5rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--text-muted);
  background: #1a1a2a;
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 2px;
  padding: 0.3rem 0.55rem;
`

const CardArrow = styled.div`
  font-size: 1.25rem;
  color: var(--gold);
  flex-shrink: 0;
  transition: transform 300ms ease;
  margin-top: 0.2rem;

  ${CardMeta}:hover & { transform: translate(8px, -4px); }
`

/* ─── Projects Data ──────────────────────────────────────────── */
const PROJECTS = [
  {
    title: 'DiagAssistAI',
    description: 'Clinical AI assistant with voice intake, real-time symptom analysis, and differential diagnosis generation — built for frontline healthcare teams.',
    tag: 'AI · Healthcare · Full Stack',
    stack: ['Python', 'FastAPI', 'Next.js', 'PostgreSQL', 'OpenAI', 'Docker'],
    gradient: 'linear-gradient(135deg, rgba(6,182,212,0.25), rgba(124,58,237,0.2))',
    featured: true,
    heroIcon: <SiPython />,
    heroColor: '#06b6d4',
    accentIcons: [
      { icon: <SiOpenai />, color: '#ffffff', top: '12%', right: '12%', size: '1.75rem', opacity: 0.2 },
      { icon: <SiNextdotjs />, color: '#ffffff', bottom: '12%', left: '12%', size: '1.5rem', opacity: 0.18 },
      { icon: <SiPostgresql />, color: '#336791', bottom: '12%', right: '18%', size: '1.5rem', opacity: 0.18 },
      { icon: <SiDocker />, color: '#2496ed', top: '12%', left: '12%', size: '1.5rem', opacity: 0.18 },
    ],
    href: 'https://github.com/vikramrkini',
  },
  {
    title: 'PumpJournal',
    description: 'AI-assisted iOS fitness journal with real-time HealthKit sync and cloud backup — 300+ downloads in the first 2 weeks after launch.',
    tag: 'iOS · AI · Swift',
    stack: ['Swift', 'SwiftUI', 'Firebase', 'HealthKit', 'CoreData'],
    gradient: 'linear-gradient(135deg, rgba(124,58,237,0.35), rgba(233,195,73,0.15))',
    featured: true,
    heroIcon: <SiSwift />,
    heroColor: '#f05138',
    accentIcons: [
      { icon: <SiFirebase />, color: '#ffca28', top: '12%', right: '12%', size: '1.75rem', opacity: 0.2 },
      { icon: <SiOpenai />, color: '#a78bfa', bottom: '12%', left: '12%', size: '1.5rem', opacity: 0.18 },
    ],
    to: '/projects/pumpjournal',
  },
  {
    title: 'Inboxalytics',
    description: 'Intelligent email platform with Gmail sync, AI-powered priority triage, and behavioral analytics — turns inbox chaos into actionable signal.',
    tag: 'SaaS · AI · Full Stack',
    stack: ['Next.js', 'NestJS', 'TypeScript', 'Redis', 'OpenAI', 'Prisma'],
    gradient: 'linear-gradient(135deg, rgba(233,195,73,0.18), rgba(6,182,212,0.15))',
    featured: true,
    heroIcon: <SiNextdotjs />,
    heroColor: '#e9c349',
    accentIcons: [
      { icon: <SiOpenai />, color: '#ffffff', top: '12%', right: '12%', size: '1.75rem', opacity: 0.2 },
      { icon: <SiTypescript />, color: '#3178c6', bottom: '12%', left: '12%', size: '1.5rem', opacity: 0.18 },
      { icon: <SiRedis />, color: '#dc382d', top: '12%', left: '12%', size: '1.5rem', opacity: 0.18 },
    ],
    href: 'https://github.com/vikramrkini',
  },
  {
    title: 'BugBane',
    description: 'A comprehensive mutation testing framework for Python — improve test quality by automatically injecting faults.',
    tag: 'Python · Testing · OSS',
    stack: ['Python', 'AST', 'pytest', 'CLI'],
    gradient: 'linear-gradient(135deg, rgba(6,182,212,0.3), rgba(124,58,237,0.15))',
    heroIcon: <SiPython />,
    heroColor: '#3572a5',
    accentIcons: [
      { icon: <SiNodedotjs />, color: '#68a063', bottom: '12%', right: '12%', size: '1.5rem', opacity: 0.18 },
    ],
    href: 'https://github.com/vikramrkini/BugBane',
  },
  {
    title: 'TriQL',
    description: 'Beginner-friendly database learning tool with visual query execution. Reduced learning time by 20% in user testing.',
    tag: 'Web · Education · SQL',
    stack: ['JavaScript', 'PostgreSQL', 'Node.js', 'React'],
    gradient: 'linear-gradient(135deg, rgba(124,58,237,0.2), rgba(233,195,73,0.15))',
    heroIcon: <SiPostgresql />,
    heroColor: '#336791',
    accentIcons: [
      { icon: <SiJavascript />, color: '#f7df1e', bottom: '12%', right: '12%', size: '1.5rem', opacity: 0.2 },
      { icon: <SiNodedotjs />, color: '#68a063', top: '12%', right: '12%', size: '1.5rem', opacity: 0.18 },
    ],
    href: 'https://github.com/vikramrkini/TriQL',
  },
  {
    title: 'Relay.io',
    description: 'Light-weight multi-user video conferencing built for low-latency real-time communication over WebRTC.',
    tag: 'Web · WebRTC · Full Stack',
    stack: ['Node.js', 'WebRTC', 'Socket.io', 'JavaScript'],
    gradient: 'linear-gradient(135deg, rgba(233,195,73,0.2), rgba(124,58,237,0.2))',
    heroIcon: <SiNodedotjs />,
    heroColor: '#68a063',
    accentIcons: [
      { icon: <SiJavascript />, color: '#f7df1e', top: '12%', right: '12%', size: '1.5rem', opacity: 0.2 },
    ],
    href: 'https://github.com/vikramrkini/Relay.io',
  },
]

const ease = [0.25, 0.46, 0.45, 0.94]

/* ─── ProjectCard ────────────────────────────────────────────── */
function ProjectCard({ title, description, tag, stack, gradient, featured, heroIcon, heroColor, accentIcons = [], to, href }) {
  const content = (
    <>
      <CardImageWrap>
        <CardImageBg $gradient={gradient} />
        <IconLayer>
          <HeroIconWrap $color={heroColor}>{heroIcon}</HeroIconWrap>
          {accentIcons.map((a, i) => (
            <AbsIcon
              key={i}
              $top={a.top}
              $left={a.left}
              $right={a.right}
              $bottom={a.bottom}
              $size={a.size}
              $opacity={a.opacity}
              $hoverOpacity={a.opacity * 1.8}
              $color={a.color}
            >
              {a.icon}
            </AbsIcon>
          ))}
        </IconLayer>
        {featured && <FeaturedBadge>Featured</FeaturedBadge>}
        <CardHoverTint />
      </CardImageWrap>
      <CardMeta>
        <CardInfo>
          <CardTag>{tag}</CardTag>
          <CardTitle>{title}</CardTitle>
          <CardDesc>{description}</CardDesc>
          <CardStack>
            {stack.map((tech) => (
              <CardChip key={tech}>{tech}</CardChip>
            ))}
          </CardStack>
        </CardInfo>
        <CardArrow>↗</CardArrow>
      </CardMeta>
    </>
  )

  if (to) return <CardLink to={to}>{content}</CardLink>
  return <CardLinkExt href={href} target="_blank" rel="noopener noreferrer">{content}</CardLinkExt>
}

/* ─── Page ───────────────────────────────────────────────────── */
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
