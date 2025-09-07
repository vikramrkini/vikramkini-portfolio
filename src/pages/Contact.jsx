import { Helmet } from 'react-helmet-async'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { Container, Section, Heading, Subtext, LinkButton, MutedButton, Card, Grid } from '../styles/primitives.js'
import { useState } from 'react'

const SocialGrid = styled(Grid)`
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  margin-top: 16px;
`

const IconWrap = styled.div`
  width: 36px; height: 36px;
  display: inline-flex; align-items: center; justify-content: center;
  border-radius: 10px;
  background: #111a2b;
  border: 1px solid #1f2c49;
`

function IconLinkedIn(props) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V23h-4V8zm7 0h3.8v2.05h.05c.53-1.01 1.83-2.08 3.77-2.08 4.03 0 4.78 2.65 4.78 6.09V23h-4v-6.59c0-1.57-.03-3.59-2.19-3.59-2.19 0-2.53 1.71-2.53 3.48V23h-3.68V8z" />
    </svg>
  )
}

function IconGitHub(props) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 .5A11.5 11.5 0 0 0 .5 12.3c0 5.24 3.4 9.68 8.12 11.25.6.1.82-.26.82-.58 0-.28-.01-1.04-.02-2.04-3.3.73-4-1.6-4-1.6-.55-1.43-1.34-1.8-1.34-1.8-1.1-.77.08-.76.08-.76 1.2.09 1.83 1.26 1.83 1.26 1.08 1.89 2.84 1.34 3.54 1.02.11-.8.42-1.34.76-1.65-2.64-.3-5.42-1.36-5.42-6.05 0-1.34.47-2.43 1.24-3.28-.12-.3-.54-1.52.12-3.17 0 0 1.01-.33 3.3 1.25a11.5 11.5 0 0 1 6 0c2.3-1.58 3.3-1.25 3.3-1.25.66 1.65.24 2.87.12 3.17.77.85 1.23 1.94 1.23 3.28 0 4.7-2.79 5.74-5.45 6.04.43.37.81 1.1.81 2.23 0 1.6-.02 2.88-.02 3.27 0 .32.21.69.83.57A11.5 11.5 0 0 0 23.5 12.3 11.5 11.5 0 0 0 12 .5z" />
    </svg>
  )
}

function IconMail(props) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4-8 5L4 8V6l8 5 8-5v2Z" />
    </svg>
  )
}

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const email = 'vrkini23@gmail.com'

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch (e) {
      setCopied(false)
    }
  }

  return (
    <Container as={motion.div}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.6 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <Helmet>
        <title>Contact — Vikram Kini</title>
        <meta name="description" content="Get in touch with Vikram Kini. Email and social links." />
      </Helmet>
      <Section>
        <Heading as={motion.h1}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.8 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        >Let’s connect</Heading>
        <Subtext as={motion.p}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.8 }}
          transition={{ duration: 0.45, ease: 'easeOut', delay: 0.05 }}
        >Open to roles, freelance, and collaborations.</Subtext>

        <SocialGrid>
          <Card as={motion.a}
            href={`mailto:${email}?subject=Hello%20Vikram`}
            aria-label="Send me an email"
            style={{ textDecoration: 'none', color: 'inherit', padding: 16, display: 'grid', gap: 10, justifyItems: 'center' }}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <IconWrap><IconMail /></IconWrap>
            <strong>Email</strong>
            <span style={{ color: 'var(--muted)' }}>{email}</span>
          </Card>

          <Card as={motion.a}
            href="https://linkedin.com/in/vikramkini"
            target="_blank" rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            style={{ textDecoration: 'none', color: 'inherit', padding: 16, display: 'grid', gap: 10, justifyItems: 'center' }}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.05 }}
          >
            <IconWrap><IconLinkedIn /></IconWrap>
            <strong>LinkedIn</strong>
            <span style={{ color: 'var(--muted)' }}>linkedin.com/in/vikramkini</span>
          </Card>

          <Card as={motion.a}
            href="https://github.com/vikramrkini"
            target="_blank" rel="noopener noreferrer"
            aria-label="GitHub profile"
            style={{ textDecoration: 'none', color: 'inherit', padding: 16, display: 'grid', gap: 10, justifyItems: 'center' }}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
          >
            <IconWrap><IconGitHub /></IconWrap>
            <strong>GitHub</strong>
            <span style={{ color: 'var(--muted)' }}>github.com/vikramrkini</span>
          </Card>
        </SocialGrid>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center', marginTop: 16 }}>
          <LinkButton href={`mailto:${email}?subject=Hello%20Vikram`}>Email Me</LinkButton>
          <MutedButton as="button" onClick={copyEmail} aria-live="polite">
            {copied ? 'Copied!' : 'Copy Email'}
          </MutedButton>
        </div>
      </Section>
    </Container>
  )
}
