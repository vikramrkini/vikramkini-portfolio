import { Helmet } from 'react-helmet-async'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { Container, Section, Heading, Subtext, LinkButton, MutedButton, Card, Grid } from '../styles/primitives.js'
import { useEffect, useState } from 'react'

const SocialGrid = styled(Grid)`
  margin-top: 16px;
  gap: 16px;
  grid-template-columns: repeat(auto-fit, minmax(300px, 420px));
  justify-content: center;
  align-items: start;
  justify-items: stretch;
`

const IconWrap = styled.div`
  width: 36px; height: 36px;
  display: inline-flex; align-items: center; justify-content: center;
  border-radius: 10px;
  background: #111a2b;
  border: 1px solid #1f2c49;
`

const LIWrapper = styled.div`
  display: block;
  width: 100%;
  max-width: 50px;
  margin: 0 auto;
  line-height: 0; /* remove baseline gap */
  /* Hide fallback link text to avoid layout shift */
  a.LI-simple-link { display: none !important; }
  background: transparent;
  border-radius: 12px;
  overflow: hidden;
  iframe {
    display: block;
    background: transparent !important;
    border: 0 !important;
    transform-origin: center center;
    transform: scale(1.05);
  }
`

const SocialCard = styled(Card)`
  width: 100%;
  max-width: 420px;
`

const Avatar = styled.img`
  width: 56px; height: 56px;
  border-radius: 50%;
  border: 1px solid #223152;
  box-shadow: 0 8px 18px rgba(0,0,0,0.25);
`

const StatRow = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
`

const StatPill = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  font-size: 13px;
  color: var(--text);
  background: linear-gradient(180deg, rgba(255,255,255,0.03), transparent 40%), #152033;
  border: 1px solid #1f2c49;
  border-radius: 999px;
`

const RepoList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 6px 0 0;
  display: grid;
  gap: 6px;
  width: 100%;
`

const RepoItem = styled.li`
  font-size: 14px;
  color: var(--muted);
  text-align: center;
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
  const githubUser = 'vikramrkini'

  const [gh, setGh] = useState(null)
  const [repos, setRepos] = useState([])
  const [ghErr, setGhErr] = useState(null)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch (e) {
      setCopied(false)
    }
  }

  useEffect(() => {
    let cancelled = false
    const run = async () => {
      try {
        const ures = await fetch(`https://api.github.com/users/${githubUser}`)
        if (!ures.ok) throw new Error('GitHub user fetch failed')
        const u = await ures.json()
        if (!cancelled) setGh(u)

        const rres = await fetch(`https://api.github.com/users/${githubUser}/repos?per_page=100&sort=updated`)
        if (rres.ok) {
          const r = await rres.json()
          const top = [...r]
            .filter(x => !x.fork)
            .sort((a, b) => (b.stargazers_count ?? 0) - (a.stargazers_count ?? 0))
            .slice(0, 3)
          if (!cancelled) setRepos(top)
        }
      } catch (e) {
        if (!cancelled) setGhErr(String(e))
      }
    }
    run()
    return () => { cancelled = true }
  }, [])

  // Ensure LinkedIn badge renders when this SPA route mounts
  useEffect(() => {
    const badgeEl = document.querySelector('.LI-profile-badge')
    if (!badgeEl) return

    const render = () => {
      if (typeof window !== 'undefined' && typeof window.LIRenderAll === 'function') {
        try { window.LIRenderAll() } catch {}
        return true
      }
      return false
    }

    if (!render()) {
      // If script tag missing or still loading, add/poll briefly
      const existing = document.querySelector('script[src*="platform.linkedin.com/badges/js/profile.js"]')
      if (!existing) {
        const s = document.createElement('script')
        s.src = 'https://platform.linkedin.com/badges/js/profile.js'
        s.async = true; s.defer = true
        s.onload = () => { render() }
        document.body.appendChild(s)
      }
      let elapsed = 0
      const iv = setInterval(() => {
        elapsed += 200
        if (render() || elapsed > 3000) clearInterval(iv)
      }, 200)
      return () => clearInterval(iv)
    }
  }, [])

  // Tweak LinkedIn badge iframe once it is injected, to avoid extra white background
  useEffect(() => {
    const badge = document.querySelector('.LI-profile-badge')
    if (!badge) return
    const apply = () => {
      const iframe = badge.querySelector('iframe')
      if (!iframe) return false
      // Make iframe transparent and clamp wrapper width to iframe's rendered width
      iframe.style.background = 'transparent'
      iframe.style.border = '0'
      const w = iframe.getBoundingClientRect().width
      if (w && Number.isFinite(w)) {
        badge.style.maxWidth = Math.ceil(w) + 'px'
      }
      return true
    }
    if (!apply()) {
      const obs = new MutationObserver(() => { if (apply()) obs.disconnect() })
      obs.observe(badge, { childList: true, subtree: true })
      const t = setTimeout(() => obs.disconnect(), 5000)
      return () => { obs.disconnect(); clearTimeout(t) }
    }
  }, [])

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
          {/* Email: keep simple */}
          <SocialCard as={motion.a}
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
          </SocialCard>

          {/* LinkedIn: official profile badge embed */}
          <SocialCard as={motion.div}
            style={{ padding: 10, display: 'grid', gap: 8, justifyItems: 'center', overflow: 'hidden' }}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.05 }}
          >
            <LIWrapper
              className="LI-profile-badge"
              data-version="v1"
              data-size="large"
              data-locale="en_US"
              data-type="vertical"
              data-theme="dark"
              data-vanity="vikramkini"
              aria-label="Embedded LinkedIn profile"
            >
              <a className="LI-simple-link" href="https://www.linkedin.com/in/vikramkini?trk=profile-badge">Vikram Kini</a>
            </LIWrapper>
          </SocialCard>

          {/* GitHub: live profile and top repos */}
          <SocialCard as={motion.a}
            href={`https://github.com/${githubUser}`}
            target="_blank" rel="me noopener noreferrer"
            aria-label="GitHub profile"
            style={{ textDecoration: 'none', color: 'inherit', padding: 16, display: 'grid', gap: 8, justifyItems: 'center' }}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
          >
            <Avatar src={gh?.avatar_url || 'https://avatars.githubusercontent.com/u/0?v=4'} alt="GitHub avatar" loading="lazy" />
            <strong>{gh?.name || 'GitHub'}</strong>
            <span style={{ color: 'var(--muted)' }}>@{gh?.login || githubUser}</span>
            <StatRow>
              <StatPill title="Public repositories">📦 {gh?.public_repos ?? '—'}</StatPill>
              <StatPill title="Followers">👥 {gh?.followers ?? '—'}</StatPill>
            </StatRow>
            {repos.length > 0 && (
              <RepoList aria-label="Top repositories (by stars)">
                {repos.map(r => (
                  <RepoItem key={r.id}>⭐ {r.stargazers_count} · {r.name}</RepoItem>
                ))}
              </RepoList>
            )}
            {ghErr && <span style={{ color: 'var(--muted)', fontSize: 12 }}>Couldn’t load GitHub data</span>}
          </SocialCard>
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
