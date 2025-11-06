import { Helmet } from 'react-helmet-async'
import styled from 'styled-components'
import { useEffect, useMemo, useState, useCallback } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Container, Heading, Subtext, Card, Grid, LinkButton, MutedButton } from '../styles/primitives.js'

const Deck = styled.div`
  position: relative;
  width: 100%;
  /* Body becomes scroll container via class; slides fill viewport. */
`

const Slide = styled.section`
  position: relative;
  min-height: 100svh;
  width: 100%;
  scroll-snap-align: start;
  scroll-snap-stop: always;
  scroll-margin-top: 70px;
  display: grid;
  align-items: center;
  justify-items: center;
  padding: clamp(16px, 5vw, 40px) clamp(12px, 5vw, 40px);
`

const SlideInner = styled(Container)`
  max-width: 1200px;
  padding: 0;
`

const MiniNav = styled.nav`
  position: fixed;
  top: 50%;
  right: clamp(8px, 3vw, 24px);
  transform: translateY(-50%);
  z-index: 30;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: rgba(17,23,37,0.45);
  border: 1px solid #1e2941;
  padding: 8px;
  border-radius: 12px;
  backdrop-filter: blur(6px);
  @media (max-width: 820px) { display: none; }
`

const MiniItem = styled.button`
  appearance: none;
  border: 0;
  padding: 8px 10px;
  border-radius: 10px;
  font: inherit;
  color: ${({ active }) => (active ? 'var(--text)' : 'var(--muted)')};
  background: ${({ active }) => (active ? '#1a2338' : 'transparent')};
  cursor: pointer;
  text-align: left;
  white-space: nowrap;
  transition: background .2s ease, color .2s ease, transform .12s ease;
  &:hover { transform: translateY(-1px); }
`

const Chips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
`

const Chip = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 999px;
  font-size: 14px;
  color: var(--text);
  background:
    linear-gradient(180deg, rgba(255,255,255,0.03), transparent 40%),
    #152033;
  border: 1px solid #1f2c49;
`

const SkillGroup = styled.div`
  margin-top: 16px;
`

const GroupTitle = styled.h3`
  margin: 0 0 10px;
  font-size: clamp(16px, 2.2vw, 18px);
  color: var(--muted);
  font-weight: 700;
`

const Timeline = styled.div`
  position: relative;
  display: grid;
  gap: 16px;
  margin-top: 12px;
  padding-left: 20px;
  &:before {
    content: '';
    position: absolute;
    left: 8px;
    top: 0; bottom: 0;
    width: 2px;
    background: linear-gradient(180deg,#6aa5ff,#b88cff,#64fbd2);
    opacity: .35;
  }
`

const TimelineItem = styled(Card)`
  position: relative;
  text-align: left;
  padding-left: 18px;
  &:before {
    content: '';
    position: absolute;
    left: -14px;
    top: 18px;
    width: 10px; height: 10px;
    border-radius: 50%;
    background: #8ab4ff;
    box-shadow: 0 0 0 4px rgba(138,180,255,0.2);
  }
`

export default function Home() {
  const pdfUrl = `${import.meta.env.BASE_URL}Resume-Vikram.pdf`

  const sections = useMemo(() => ([
    { id: 'intro', label: 'Intro' },
    { id: 'highlights', label: 'Highlights' },
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' },
    { id: 'leadership', label: 'Leadership' },
    { id: 'skills', label: 'Skills' },
    { id: 'cta', label: 'More' },
  ]), [])

  const [active, setActive] = useState(sections[0].id)
  const { scrollYProgress } = useScroll()
  const yHero = useTransform(scrollYProgress, [0, 0.25], [0, -20])
  const oHero = useTransform(scrollYProgress, [0, 0.25], [1, 0.96])
  const ySub = useTransform(scrollYProgress, [0, 0.25], [0, -10])

  useEffect(() => {
    // Limit scroll-snap behavior to this page only
    document.body.classList.add('deck')
    const els = sections
      .map(s => document.getElementById(s.id))
      .filter(Boolean)
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id) })
    }, { threshold: 0.6 })
    els.forEach(el => io.observe(el))
    return () => {
      document.body.classList.remove('deck')
      els.forEach(el => io.unobserve(el))
    }
  }, [sections])

  const goTo = useCallback((id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  return (
    <>
      <Helmet>
        <title>Portfolio — Vikram Kini</title>
        <meta name="description" content="Professional software engineer portfolio — React, Swift, and Spring Boot. View resume and experience." />
      </Helmet>

      <MiniNav aria-label="Resume sections">
        {sections.map(s => (
          <MiniItem key={s.id} active={active === s.id} aria-current={active === s.id ? 'true' : undefined} onClick={() => goTo(s.id)}>
            {s.label}
          </MiniItem>
        ))}
      </MiniNav>

      <Deck>
        <Slide id="intro" data-snap>
          <SlideInner as={motion.div}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.8 }}
            transition={{ type: 'spring', stiffness: 120, damping: 16 }}
          >
            <Heading as={motion.h1} style={{ y: yHero, opacity: oHero }}>I build AI-powered, user-first software.</Heading>
            <Subtext as={motion.p} style={{ y: ySub, opacity: oHero }}>Software Engineer — Full-stack · Mobile · Cloud</Subtext>
            <Subtext as={motion.p} style={{ y: ySub, opacity: oHero, maxWidth: 900, margin: '6px auto 10px' }}>
              I turn product ideas into performant web and mobile experiences — bringing AI assistance where it creates real value.
            </Subtext>

            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 16 }}>
              <LinkButton href={pdfUrl} target="_blank" rel="noopener">Download Resume</LinkButton>
              {/* was: href="#/contact" */}
              <MutedButton as={Link} to="/contact">Contact Me</MutedButton>
            </div>
          </SlideInner>
        </Slide>

        <Slide id="highlights" data-snap>
          <SlideInner>
            <Heading as={motion.h2}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.6 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
            >Highlights</Heading>
            <Subtext as={motion.p}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.6 }}
              transition={{ duration: 0.45, ease: 'easeOut', delay: 0.05 }}
            >Selected outcomes and impact</Subtext>
            <Grid style={{ marginTop: 16 }}>
              <Card as={motion.div}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.35 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                <h3 style={{ marginTop: 0 }}>Platform Scale</h3>
                <p style={{ margin: '6px 0 0', color: 'var(--muted)' }}>Architected a compliance-driven document delivery platform now trusted by <b>1,000+ K-12 districts</b> for secure, auditable workflows.</p>
              </Card>
              <Card as={motion.div}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.35 }}
                transition={{ duration: 0.5, ease: 'easeOut', delay: 0.08 }}
              >
                <h3 style={{ marginTop: 0 }}>0→1 Product Launch</h3>
                <p style={{ margin: '6px 0 0', color: 'var(--muted)' }}>Designed and launched <b>PumpJournal</b>, an AI-powered fitness app that delivers personalized workout plans, logging, and HealthKit sync end-to-end.</p>
              </Card>
              <Card as={motion.div}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.35 }}
                transition={{ duration: 0.5, ease: 'easeOut', delay: 0.16 }}
              >
                <h3 style={{ marginTop: 0 }}>Academic Excellence</h3>
                <p style={{ margin: '6px 0 0', color: 'var(--muted)' }}>Earned a <b>4.0/4.0 GPA</b> in the M.S. Computer Science program at UIUC, excelling in Cloud Computing, Applied ML, and Software Engineering.</p>
              </Card>
            </Grid>
          </SlideInner>
        </Slide>

        <Slide id="experience" data-snap>
          <SlideInner>
            <Heading as={motion.h2}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.6 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
            >Experience</Heading>
            <Timeline>
              <TimelineItem as={motion.div}
                initial={{ opacity: 0, x: -14 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.35 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                <strong>I-SAFE Enterprises LLC</strong> — Software Engineer
                <div style={{ color: 'var(--muted)', marginTop: 6 }}>Jun 2024 – Present · React.js, Spring Boot, AWS, React Native</div>
                <ul>
                  <li>Architected a compliance-driven document delivery platform using React.js and Spring Boot, now adopted by 1,000+ K-12 districts.</li>
                  <li>Developed and launched the MyOK mobile app (React Native), available on both App Store and Google Play.</li>
                  <li>Built AI-powered document automation workflows processing 10K+ records monthly, cutting manual effort to near zero.</li>
                  <li>Integrated AWS Lex and Lambda to create an AI assistant that reduced support tickets by 38% and improved form completion by 22%.</li>
                  <li>Designed and deployed event-driven AWS microservices in Python, reducing deployment time by 49%.</li>
                  <li>Unified 5+ SSO integrations across enterprise products, simplifying authentication and improving reliability.</li>
                  <li>Automated marketing operations using n8n workflows, saving $85K annually in operational costs.</li>
                  <li>Collaborated with cross-functional teams and district stakeholders to align features with compliance and user needs.</li>
                </ul>
              </TimelineItem>

              <TimelineItem as={motion.div}
                initial={{ opacity: 0, x: -14 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.35 }}
                transition={{ duration: 0.5, ease: 'easeOut', delay: 0.08 }}
              >
                <strong>PrairieLearn Inc.</strong> — Software Developer (Part-Time)
                <div style={{ color: 'var(--muted)', marginTop: 6 }}>May 2023 – Aug 2023 · Node.js, React.js, PostgreSQL</div>
                <ul>
                  <li>Built and shipped a deadline exception tracking system with Node.js, React.js, and PostgreSQL, saving instructors 13+ hours weekly.</li>
                  <li>Enhanced user workflows and REST API endpoints to streamline course management for thousands of students.</li>
                </ul>
              </TimelineItem>

              <TimelineItem as={motion.div}
                initial={{ opacity: 0, x: -14 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.35 }}
                transition={{ duration: 0.5, ease: 'easeOut', delay: 0.16 }}
              >
                <strong>Airbook.io</strong> — Founding Software Engineer
                <div style={{ color: 'var(--muted)', marginTop: 6 }}>Nov 2021 – Jul 2022 · Python, Docker, Kubernetes, Transformer NLP</div>
                <ul>
                  <li>Developed the core backend and infrastructure for a BI & Analytics platform serving 500+ users in its first quarter.</li>
                  <li>Implemented NLP pipelines with transformer models to automate insights extraction from data.</li>
                  <li>Containerized and scaled microservices using Docker and Kubernetes, cutting deployment time from 30 -> 7 minutes.</li>
                  <li>Collaborated with the founding team to shape product direction, scalability, and engineering best practices in a startup environment.</li>
                </ul>
              </TimelineItem>
            </Timeline>
          </SlideInner>
        </Slide>

        <Slide id="education" data-snap>
          <SlideInner>
            <Heading as={motion.h2}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.6 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
            >Education</Heading>
            <Grid style={{ marginTop: 16 }}>
              <Card as={motion.div}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.35 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                <h3 style={{ margin: 0 }}>University of Illinois at Urbana-Champaign</h3>
                <div style={{ color: 'var(--muted)', marginTop: 6 }}>M.S. in Computer Science</div>
                <div style={{ color: 'var(--muted)' }}>Aug 2022 – May 2024 · GPA: 4.00/4.00</div>
              </Card>
              <Card as={motion.div}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.35 }}
                transition={{ duration: 0.5, ease: 'easeOut', delay: 0.08 }}
              >
                <h3 style={{ margin: 0 }}>University of Mumbai</h3>
                <div style={{ color: 'var(--muted)', marginTop: 6 }}>B.E. in Computer Science and Engineering</div>
                <div style={{ color: 'var(--muted)' }}>Aug 2018 – Jun 2021 · GPA: 9.84/10</div>
              </Card>
            </Grid>
          </SlideInner>
        </Slide>

        <Slide id="leadership" data-snap>
          <SlideInner>
            <Heading as={motion.h2}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.6 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
            >Leadership</Heading>
            <Grid style={{ marginTop: 16 }}>
              <Card as={motion.div}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.35 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                <h3 style={{ marginTop: 0 }}>Course Assistants Lead</h3>
                <p style={{ margin: '6px 0 0', color: 'var(--muted)' }}>
                  Led a team of 12 course assistants supporting 800+ students, driving a 95% 'A' grade rate through mentorship and training.
                </p>
              </Card>
              <Card as={motion.div}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.35 }}
                transition={{ duration: 0.5, ease: 'easeOut', delay: 0.08 }}
              >
                <h3 style={{ marginTop: 0 }}>Mentor</h3>
                <p style={{ margin: '6px 0 0', color: 'var(--muted)' }}>
                  Mentored 4 undergraduates on a capstone project achieving 100% feature completion and high faculty recognition.
                </p>
              </Card>
            </Grid>
          </SlideInner>
        </Slide>

        <Slide id="skills" data-snap>
          <SlideInner>
            <Heading as={motion.h2}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.6 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
            >Skills</Heading>
            <Subtext as={motion.p}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.6 }}
              transition={{ duration: 0.45, ease: 'easeOut', delay: 0.05 }}
            >Core tools across the stack</Subtext>

            <SkillGroup as={motion.div}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
            >
              <GroupTitle>Languages</GroupTitle>
              <Chips>
                <Chip>JavaScript</Chip>
                <Chip>TypeScript</Chip>
                <Chip>Python</Chip>
                <Chip>Java</Chip>
                <Chip>PHP</Chip>
                <Chip>Swift</Chip>
              </Chips>
            </SkillGroup>

            <SkillGroup as={motion.div}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.45, ease: 'easeOut', delay: 0.05 }}
            >
              <GroupTitle>Frameworks</GroupTitle>
              <Chips>
                <Chip>React.js</Chip>
                <Chip>React Router</Chip>
                <Chip>Styled-Components</Chip>
                <Chip>Framer Motion</Chip>
                <Chip>React Helmet Async</Chip>
                <Chip>Node.js</Chip>
                <Chip>React Native</Chip>
                <Chip>Next.js</Chip>
                <Chip>Redux</Chip>
                <Chip>Flask</Chip>
                <Chip>Spring Boot</Chip>
                <Chip>Bootstrap</Chip>
                <Chip>Drupal</Chip>
              </Chips>
            </SkillGroup>

            <SkillGroup as={motion.div}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.45, ease: 'easeOut', delay: 0.1 }}
            >
              <GroupTitle>Database Technologies</GroupTitle>
              <Chips>
                <Chip>Firestore</Chip>
                <Chip>MongoDB</Chip>
                <Chip>MySQL</Chip>
                <Chip>PostgreSQL</Chip>
                <Chip>Neo4j</Chip>
              </Chips>
            </SkillGroup>

            <SkillGroup as={motion.div}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.45, ease: 'easeOut', delay: 0.15 }}
            >
              <GroupTitle>Cloud Platforms / BaaS</GroupTitle>
              <Chips>
                <Chip>Firebase</Chip>
                <Chip>AWS (EC2, Lambda, RDS, Comprehend, Lex)</Chip>
                <Chip>Kubernetes</Chip>
              </Chips>
            </SkillGroup>

            <SkillGroup as={motion.div}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.45, ease: 'easeOut', delay: 0.2 }}
            >
              <GroupTitle>Tools & DevOps</GroupTitle>
              <Chips>
                <Chip>Vite</Chip>
                <Chip>ESLint</Chip>
                <Chip>GitHub Pages</Chip>
                <Chip>GitHub Actions</Chip>
                <Chip>Git</Chip>
                <Chip>GitLab CI/CD</Chip>
                <Chip>Docker</Chip>
                <Chip>Postman</Chip>
                <Chip>PyTest</Chip>
                <Chip>Jest</Chip>
                <Chip>JIRA</Chip>
              </Chips>
            </SkillGroup>
          </SlideInner>
        </Slide>

        <Slide id="cta" data-snap>
          <SlideInner>
            <Heading as={motion.h2}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.6 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
            >Explore more</Heading>
            <Subtext as={motion.p}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.6 }}
              transition={{ duration: 0.45, ease: 'easeOut', delay: 0.05 }}
            >See projects or grab the PDF</Subtext>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 12 }}>
              {/* was: href="#/projects" */}
              <LinkButton as={Link} to="/projects">Projects</LinkButton>
              <LinkButton href={pdfUrl} target="_blank" rel="noopener">Download/Print</LinkButton>
            </div>
          </SlideInner>
        </Slide>
      </Deck>
    </>
  )
}
