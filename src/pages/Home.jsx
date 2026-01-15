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
        <meta name="description" content="Full Stack Engineer with 3+ years building production web and mobile apps. View resume and experience." />
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
            <Heading as={motion.h1} style={{ y: yHero, opacity: oHero }}>Full Stack Engineer building AI-enabled web and mobile products.</Heading>
            <Subtext as={motion.p} style={{ y: ySub, opacity: oHero }}>3+ years shipping React, React Native, and Spring Boot applications for enterprise customers.</Subtext>
            <Subtext as={motion.p} style={{ y: ySub, opacity: oHero, maxWidth: 900, margin: '6px auto 10px' }}>
              Known for measurable gains in performance, reliability, and release workflow.
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
                <p style={{ margin: '6px 0 0', color: 'var(--muted)' }}>Architected a React compliance platform integrated with Spring Boot microservices, adopted by <b>1,000+ K-12 clients</b> and serving ~75,000 users.</p>
              </Card>
              <Card as={motion.div}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.35 }}
                transition={{ duration: 0.5, ease: 'easeOut', delay: 0.08 }}
              >
                <h3 style={{ marginTop: 0 }}>AI Support at Scale</h3>
                <p style={{ margin: '6px 0 0', color: 'var(--muted)' }}>Improved support resolution speed by <b>38%</b> by shipping an AI in-app assistant using AWS Lex and LLM integrations.</p>
              </Card>
              <Card as={motion.div}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.35 }}
                transition={{ duration: 0.5, ease: 'easeOut', delay: 0.16 }}
              >
                <h3 style={{ marginTop: 0 }}>PumpJournal Launch</h3>
                <p style={{ margin: '6px 0 0', color: 'var(--muted)' }}>Shipped <b>PumpJournal</b>, an AI-assisted iOS fitness journal with real-time HealthKit sync and cloud backup; 300+ downloads in the first 2 weeks.</p>
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
                <strong>ISAFE Enterprises LLC</strong> — Software Engineer
                <div style={{ color: 'var(--muted)', marginTop: 6 }}>Jun 2023 - Present · React.js, Spring Boot, AWS, React Native</div>
                <ul>
                  <li>Architected a React compliance platform integrated with Spring Boot microservices, adopted by 1,000+ K-12 clients and serving ~75,000 users with privacy and governance.</li>
                  <li>Launched a React Native iOS/Android app on both app stores with shared UI components for consistent UX.</li>
                  <li>Reduced deployment time 49% by deploying event-driven AWS Lambda (Python) microservices for backend workflows.</li>
                  <li>Integrated REST APIs and implemented secure auth across 5+ SSO providers, improving login reliability and access.</li>
                  <li>Improved support resolution speed 38% by shipping an AI in-app assistant using AWS Lex and LLM integrations.</li>
                  <li>Reduced frontend error rate 36% with Jest/RTL and Cypress E2E tests, tracked in Sentry.</li>
                  <li>Automated GitLab CI/CD for Agile releases, cutting steps from 9 to 2 and dev-to-release time from ~2 hrs to 15 mins.</li>
                  <li>Optimized MySQL 8 schemas on AWS RDS and hardened Apache with Fail2Ban plus AWS WAF/Sucuri, cutting p95 latency from ~420 ms to ~160 ms and blocking ~1,300 suspicious requests/day.</li>
                </ul>
              </TimelineItem>

              <TimelineItem as={motion.div}
                initial={{ opacity: 0, x: -14 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.35 }}
                transition={{ duration: 0.5, ease: 'easeOut', delay: 0.08 }}
              >
                <strong>PrairieLearn Inc.</strong> — Software Developer (Part-Time)
                <div style={{ color: 'var(--muted)', marginTop: 6 }}>May 2023 - Aug 2023 · React.js, Node.js</div>
                <ul>
                  <li>Designed and implemented React.js and Node.js modules to streamline deadline management, cutting instructor workload by 13+ hours weekly.</li>
                  <li>Contributed to RESTful API enhancements and responsive UI components aligned with accessibility standards.</li>
                </ul>
              </TimelineItem>

              <TimelineItem as={motion.div}
                initial={{ opacity: 0, x: -14 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.35 }}
                transition={{ duration: 0.5, ease: 'easeOut', delay: 0.16 }}
              >
                <strong>Airbook.io</strong> — Founding Software Engineer
                <div style={{ color: 'var(--muted)', marginTop: 6 }}>Nov 2021 - Jul 2022 · React.js, Flask, Docker, Kubernetes</div>
                <ul>
                  <li>Developed React and Flask-based BI dashboards and data visualizations used by 500+ early paid users.</li>
                  <li>Deployed containerized microservices using Docker and Kubernetes, reducing deploy time from 30 to 7 minutes.</li>
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
                <div style={{ color: 'var(--muted)' }}>Aug 2022 - May 2024 · GPA: 4.0/4.0</div>
              </Card>
              <Card as={motion.div}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.35 }}
                transition={{ duration: 0.5, ease: 'easeOut', delay: 0.08 }}
              >
                <h3 style={{ margin: 0 }}>University of Mumbai</h3>
                <div style={{ color: 'var(--muted)', marginTop: 6 }}>B.E. in Computer Science and Engineering</div>
                <div style={{ color: 'var(--muted)' }}>Aug 2018 - Jun 2021 · GPA: 3.96/4.0</div>
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
                  Mentored a team of 4 undergrads to deliver a 100% complete project, earning excellent faculty feedback.
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
              <GroupTitle>Programming Languages</GroupTitle>
              <Chips>
                <Chip>JavaScript</Chip>
                <Chip>TypeScript</Chip>
                <Chip>Python</Chip>
                <Chip>Java</Chip>
                <Chip>SQL</Chip>
                <Chip>HTML</Chip>
                <Chip>CSS</Chip>
                <Chip>Swift</Chip>
              </Chips>
            </SkillGroup>

            <SkillGroup as={motion.div}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.45, ease: 'easeOut', delay: 0.05 }}
            >
              <GroupTitle>Frameworks and Libraries</GroupTitle>
              <Chips>
                <Chip>React.js</Chip>
                <Chip>React Native</Chip>
                <Chip>Next.js</Chip>
                <Chip>Node.js</Chip>
                <Chip>Spring Boot</Chip>
                <Chip>Flask</Chip>
                <Chip>Django</Chip>
                <Chip>Drupal</Chip>
              </Chips>
            </SkillGroup>

            <SkillGroup as={motion.div}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.45, ease: 'easeOut', delay: 0.1 }}
            >
              <GroupTitle>Databases</GroupTitle>
              <Chips>
                <Chip>PostgreSQL</Chip>
                <Chip>MySQL</Chip>
                <Chip>MongoDB</Chip>
                <Chip>Neo4j</Chip>
                <Chip>Firestore</Chip>
              </Chips>
            </SkillGroup>

            <SkillGroup as={motion.div}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.45, ease: 'easeOut', delay: 0.15 }}
            >
              <GroupTitle>Cloud and Platforms</GroupTitle>
              <Chips>
                <Chip>AWS</Chip>
                <Chip>Google Cloud Platform</Chip>
                <Chip>Firebase</Chip>
              </Chips>
            </SkillGroup>

            <SkillGroup as={motion.div}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.45, ease: 'easeOut', delay: 0.2 }}
            >
              <GroupTitle>DevOps and Tools</GroupTitle>
              <Chips>
                <Chip>Git</Chip>
                <Chip>Docker</Chip>
                <Chip>Kubernetes</Chip>
                <Chip>Babel</Chip>
                <Chip>VS Code</Chip>
                <Chip>Postman</Chip>
                <Chip>JIRA</Chip>
                <Chip>Copilot</Chip>
                <Chip>Cypress</Chip>
                <Chip>Jest</Chip>
                <Chip>CI/CD</Chip>
                <Chip>Agile</Chip>
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
