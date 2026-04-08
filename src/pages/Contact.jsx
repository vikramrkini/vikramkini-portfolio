import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import styled from 'styled-components'
import OrbBackground from '../components/OrbBackground.jsx'

const ContactSection = styled.section`
  position: relative;
  min-height: 100svh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 120px 24px 80px;
  overflow: hidden;
`

const Inner = styled(motion.div)`
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 520px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
`

const Label = styled(motion.div)`
  font-family: var(--font-display);
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--violet-muted);
  margin-bottom: 16px;
`

const Title = styled(motion.h1)`
  margin: 0 0 16px;
  font-family: var(--font-display);
  font-size: clamp(32px, 5vw, 48px);
  font-weight: 800;
  letter-spacing: -0.03em;
  color: var(--text);
  line-height: 1;
`

const Sub = styled(motion.p)`
  margin: 0 0 34px;
  font-family: var(--font-body);
  font-size: 16px;
  color: var(--text-muted);
  line-height: 1.75;
  font-weight: 300;
  max-width: 400px;
`

const EmailBtn = styled(motion.a)`
  display: inline-block;
  padding: 14px 34px;
  border-radius: 12px;
  background: var(--gradient-brand);
  color: #fff;
  font-family: var(--font-body);
  font-size: 15px;
  font-weight: 500;
  box-shadow: 0 0 32px rgba(124,58,237,0.4);
  margin-bottom: 20px;
  transition: box-shadow 0.25s ease, transform 0.2s ease;

  &:hover {
    box-shadow: 0 0 48px rgba(124,58,237,0.65);
    transform: translateY(-1px);
  }
`

const LinksRow = styled(motion.div)`
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
`

const LinkBtn = styled.a`
  padding: 9px 20px;
  border-radius: 10px;
  background: rgba(255,255,255,0.04);
  border: 1px solid var(--glass-border);
  color: var(--text-muted);
  font-family: var(--font-body);
  font-size: 13px;
  transition: background 0.2s ease, color 0.2s ease;

  &:hover {
    background: rgba(255,255,255,0.08);
    color: var(--text);
  }
`

const ease = [0.25, 0.46, 0.45, 0.94]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
}

const CONTACT_ORBS = [
  {
    $size: 420,
    $color: 'radial-gradient(circle, rgba(124,58,237,0.25), transparent 70%)',
    $top: '-100px',
    $right: '-100px',
  },
  {
    $size: 320,
    $color: 'radial-gradient(circle, rgba(6,182,212,0.2), transparent 70%)',
    $bottom: '-80px',
    $left: '-60px',
  },
]

export default function Contact() {
  const pdfUrl = `${import.meta.env.BASE_URL}Resume-Vikram.pdf`

  return (
    <>
      <Helmet>
        <title>Contact — Vikram Kini</title>
        <meta name="description" content="Get in touch with Vikram Kini." />
      </Helmet>

      <ContactSection>
        <OrbBackground orbs={CONTACT_ORBS} noiseOpacity={0.03} />

        <Inner
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Label variants={itemVariants}>Get in touch</Label>
          <Title variants={itemVariants}>Let&apos;s build something.</Title>
          <Sub variants={itemVariants}>
            Open to full-time roles, freelance projects, and interesting
            conversations. Best reached by email.
          </Sub>
          <EmailBtn
            variants={itemVariants}
            href="mailto:vrkini23@gmail.com"
          >
            vrkini23@gmail.com →
          </EmailBtn>
          <LinksRow variants={itemVariants}>
            <LinkBtn
              href="https://linkedin.com/in/vikramkini"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn ↗
            </LinkBtn>
            <LinkBtn
              href="https://github.com/vikramrkini"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub ↗
            </LinkBtn>
            <LinkBtn href={pdfUrl} target="_blank" rel="noopener">
              Resume ↗
            </LinkBtn>
          </LinksRow>
        </Inner>
      </ContactSection>
    </>
  )
}
