# Portfolio Redesign — "Stellar" Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fully redesign vikramkini-portfolio from a warm parchment theme to a dark, violet-cyan "Stellar" aesthetic with Framer Motion animations, a floating pill nav, custom cursor, glassmorphism cards, and condensed routing (Home / Work / Contact).

**Architecture:** Shared design tokens live in `src/styles/primitives.js` (replaced wholesale). Reusable visual primitives (`OrbBackground`, `ProjectCard`, `Cursor`, `Nav`) are self-contained components. Pages are rebuilt from scratch using these primitives; no page shares state with another.

**Tech Stack:** React 18, Vite, styled-components 6, Framer Motion 11, react-router-dom 7 (HashRouter), react-helmet-async 2. No test runner — verification is `npm run lint` + visual check in dev server.

---

## File Map

| Action | Path | Responsibility |
|--------|------|----------------|
| Modify | `index.html` | Swap Inter → Syne + DM Sans Google Fonts, update theme-color |
| Replace | `src/styles/primitives.js` | CSS design tokens, GlobalStyle, AppShell, PageWrap, GlassCard |
| Create | `src/components/OrbBackground.jsx` | Reusable gradient orb blobs + noise texture overlay |
| Create | `src/components/Cursor.jsx` | Custom dot + ring cursor using Framer Motion useSpring |
| Replace | `src/components/Nav.jsx` (was `Header.jsx`) | Floating pill nav with scroll blur, hamburger mobile menu |
| Replace | `src/components/Footer.jsx` | Minimal dark footer |
| Create | `src/components/ProjectCard.jsx` | Glassmorphism project card with hover glow |
| Replace | `src/App.jsx` | Updated routes: /work, /contact, redirects for /about /projects /resume |
| Replace | `src/pages/Home.jsx` | Cinematic hero + about strip |
| Create | `src/pages/Work.jsx` | Project grid page (replaces Projects.jsx) |
| Replace | `src/pages/Contact.jsx` | Minimal contact page |
| Replace | `src/pages/PumpJournalLanding.jsx` | Restyled with new dark visual system |
| Delete | `src/components/Header.jsx` | Replaced by Nav.jsx |
| Delete | `src/components/BackgroundFX.jsx` | Was a no-op, replaced by OrbBackground |
| Delete | `src/pages/About.jsx` | Merged into Home |
| Delete | `src/pages/Projects.jsx` | Replaced by Work.jsx |
| Delete | `src/routes/Resume.jsx` | Route removed, PDF linked directly from nav |

---

## Task 1: Update index.html

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Replace the font link and update meta**

Open `index.html` and make these two changes:

Replace the existing Inter font `<link>` tags (lines 15–17) with:
```html
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap" rel="stylesheet">
```

Replace the theme-color meta tag:
```html
    <meta name="theme-color" content="#07070f" />
```

- [ ] **Step 2: Lint and verify**

```bash
npm run lint
```
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "chore: swap fonts to Syne + DM Sans, update theme-color to dark"
```

---

## Task 2: Replace Design System (primitives.js)

**Files:**
- Replace: `src/styles/primitives.js`

- [ ] **Step 1: Write the new primitives**

Replace the entire content of `src/styles/primitives.js` with:

```js
import styled, { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  :root {
    --bg-base:        #07070f;
    --bg-surface:     #0f0f1a;
    --violet:         #7c3aed;
    --violet-muted:   #a78bfa;
    --cyan:           #06b6d4;
    --cyan-muted:     #67e8f9;
    --text:           #ffffff;
    --text-muted:     rgba(255,255,255,0.45);
    --text-faint:     rgba(255,255,255,0.25);
    --glass-bg:       rgba(255,255,255,0.03);
    --glass-border:   rgba(255,255,255,0.07);
    --gradient-brand: linear-gradient(135deg, #7c3aed, #06b6d4);
    --gradient-text:  linear-gradient(135deg, #fff 40%, rgba(167,139,250,0.6));
    --font-display:   'Syne', sans-serif;
    --font-body:      'DM Sans', sans-serif;
  }

  *, *::before, *::after { box-sizing: border-box; }

  html, body, #root {
    width: 100%;
    min-width: 100vw;
    height: 100%;
  }

  html { scroll-behavior: smooth; }

  body {
    margin: 0;
    min-height: 100svh;
    background: var(--bg-base);
    color: var(--text);
    font: 300 16px/1.7 var(--font-body);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
  }

  /* Hide default cursor only on pointer devices — custom cursor takes over */
  @media (pointer: fine) {
    *, a, button { cursor: none; }
  }

  a { color: inherit; text-decoration: none; }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation: none !important;
      transition: none !important;
    }
  }
`

export const AppShell = styled.div`
  min-height: 100svh;
  display: flex;
  flex-direction: column;
`

export const PageWrap = styled.main`
  flex: 1;
  width: 100%;
`

export const GlassCard = styled.div`
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 16px;
`
```

- [ ] **Step 2: Lint**

```bash
npm run lint
```
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/styles/primitives.js
git commit -m "feat: replace design system with Stellar dark tokens"
```

---

## Task 3: Create OrbBackground Component

**Files:**
- Create: `src/components/OrbBackground.jsx`

- [ ] **Step 1: Write the component**

Create `src/components/OrbBackground.jsx`:

```jsx
import styled from 'styled-components'

const Wrap = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
`

const Orb = styled.div`
  position: absolute;
  border-radius: 50%;
  filter: blur(${({ $blur }) => $blur || 70}px);
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  background: ${({ $color }) => $color};
  top: ${({ $top }) => $top ?? 'auto'};
  left: ${({ $left }) => $left ?? 'auto'};
  right: ${({ $right }) => $right ?? 'auto'};
  bottom: ${({ $bottom }) => $bottom ?? 'auto'};
`

const Noise = styled.div`
  position: absolute;
  inset: 0;
  opacity: ${({ $opacity }) => $opacity ?? 0.04};
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size: 128px 128px;
`

const DEFAULT_ORBS = [
  {
    $size: 420,
    $color: 'radial-gradient(circle, rgba(124,58,237,0.5), transparent 70%)',
    $top: '-100px',
    $right: '-80px',
  },
  {
    $size: 320,
    $color: 'radial-gradient(circle, rgba(6,182,212,0.35), transparent 70%)',
    $bottom: '-60px',
    $left: '-60px',
  },
  {
    $size: 220,
    $color: 'radial-gradient(circle, rgba(124,58,237,0.2), transparent 70%)',
    $bottom: '80px',
    $right: '30%',
    $blur: 50,
  },
]

export default function OrbBackground({ orbs = DEFAULT_ORBS, noiseOpacity = 0.04 }) {
  return (
    <Wrap>
      {orbs.map((orb, i) => (
        <Orb key={i} {...orb} />
      ))}
      <Noise $opacity={noiseOpacity} />
    </Wrap>
  )
}
```

- [ ] **Step 2: Lint**

```bash
npm run lint
```
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/OrbBackground.jsx
git commit -m "feat: add OrbBackground reusable orb + noise component"
```

---

## Task 4: Create Cursor Component

**Files:**
- Create: `src/components/Cursor.jsx`

- [ ] **Step 1: Write the component**

Create `src/components/Cursor.jsx`:

```jsx
import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function Cursor() {
  const [isPointer, setIsPointer] = useState(false)

  useEffect(() => {
    setIsPointer(window.matchMedia('(pointer: fine)').matches)
  }, [])

  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  const dotX = useSpring(mouseX, { stiffness: 600, damping: 35, mass: 0.3 })
  const dotY = useSpring(mouseY, { stiffness: 600, damping: 35, mass: 0.3 })
  const ringX = useSpring(mouseX, { stiffness: 280, damping: 26, mass: 0.5 })
  const ringY = useSpring(mouseY, { stiffness: 280, damping: 26, mass: 0.5 })

  useEffect(() => {
    if (!isPointer) return
    const move = (e) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [isPointer, mouseX, mouseY])

  if (!isPointer) return null

  const shared = {
    position: 'fixed',
    top: 0,
    left: 0,
    pointerEvents: 'none',
    translateX: '-50%',
    translateY: '-50%',
  }

  return (
    <>
      <motion.div
        style={{
          ...shared,
          zIndex: 9999,
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: 'var(--violet-muted)',
          x: dotX,
          y: dotY,
        }}
      />
      <motion.div
        style={{
          ...shared,
          zIndex: 9998,
          width: 28,
          height: 28,
          borderRadius: '50%',
          border: '1px solid rgba(167,139,250,0.4)',
          x: ringX,
          y: ringY,
        }}
      />
    </>
  )
}
```

- [ ] **Step 2: Lint**

```bash
npm run lint
```
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/Cursor.jsx
git commit -m "feat: add custom cursor with Framer Motion spring tracking"
```

---

## Task 5: Create Nav Component

**Files:**
- Create: `src/components/Nav.jsx`

- [ ] **Step 1: Write the component**

Create `src/components/Nav.jsx`:

```jsx
import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import styled from 'styled-components'

const NavWrap = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  justify-content: center;
  padding: 20px 16px;
`

const Pill = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 24px;
  padding: 10px 20px;
  border-radius: 100px;
  background: ${({ $scrolled }) =>
    $scrolled ? 'rgba(7,7,15,0.85)' : 'rgba(255,255,255,0.03)'};
  border: 1px solid ${({ $scrolled }) =>
    $scrolled ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.07)'};
  backdrop-filter: ${({ $scrolled }) => ($scrolled ? 'blur(14px)' : 'none')};
  transition: background 0.35s ease, border-color 0.35s ease, backdrop-filter 0.35s ease;
`

const Logo = styled(NavLink)`
  font-family: var(--font-display);
  font-size: 14px;
  font-weight: 800;
  color: var(--violet-muted);
  letter-spacing: -0.02em;
  line-height: 1;
`

const Links = styled.div`
  display: flex;
  gap: 20px;

  @media (max-width: 768px) { display: none; }
`

const Link = styled(NavLink)`
  font-family: var(--font-body);
  font-size: 13px;
  color: var(--text-muted);
  transition: color 0.2s ease;

  &.active, &:hover { color: var(--text); }
`

const ResumeCta = styled.a`
  padding: 6px 14px;
  border-radius: 100px;
  background: rgba(124,58,237,0.12);
  border: 1px solid rgba(124,58,237,0.28);
  color: var(--violet-muted);
  font-family: var(--font-body);
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;
  transition: background 0.2s ease, border-color 0.2s ease;

  &:hover {
    background: rgba(124,58,237,0.22);
    border-color: rgba(124,58,237,0.5);
  }

  @media (max-width: 768px) { display: none; }
`

const HamBtn = styled.button`
  display: none;
  background: none;
  border: none;
  color: var(--text-muted);
  font-size: 18px;
  line-height: 1;
  padding: 4px 6px;

  @media (max-width: 768px) { display: block; }
`

const MobileOverlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(7,7,15,0.96);
  backdrop-filter: blur(14px);
  z-index: 99;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 36px;
`

const MobileLink = styled(NavLink)`
  font-family: var(--font-display);
  font-size: 36px;
  font-weight: 700;
  color: var(--text-muted);
  transition: color 0.2s ease;

  &.active, &:hover { color: var(--text); }
`

const CloseBtn = styled.button`
  position: absolute;
  top: 24px;
  right: 24px;
  background: none;
  border: none;
  color: var(--text-muted);
  font-size: 22px;
  line-height: 1;
  padding: 4px;
`

const MobileResume = styled.a`
  padding: 10px 28px;
  border-radius: 100px;
  background: rgba(124,58,237,0.15);
  border: 1px solid rgba(124,58,237,0.3);
  color: var(--violet-muted);
  font-family: var(--font-body);
  font-size: 15px;
  font-weight: 500;
`

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const pdfUrl = `${import.meta.env.BASE_URL}Resume-Vikram.pdf`

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => { setOpen(false) }, [location.pathname])

  return (
    <>
      <NavWrap>
        <Pill $scrolled={scrolled}>
          <Logo to="/">VK</Logo>
          <Links>
            <Link to="/work">Work</Link>
            <Link to="/contact">Contact</Link>
          </Links>
          <ResumeCta href={pdfUrl} target="_blank" rel="noopener">Resume ↗</ResumeCta>
          <HamBtn onClick={() => setOpen(true)} aria-label="Open navigation">☰</HamBtn>
        </Pill>
      </NavWrap>

      <AnimatePresence>
        {open && (
          <MobileOverlay
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <CloseBtn onClick={() => setOpen(false)} aria-label="Close navigation">✕</CloseBtn>
            <MobileLink to="/">Home</MobileLink>
            <MobileLink to="/work">Work</MobileLink>
            <MobileLink to="/contact">Contact</MobileLink>
            <MobileResume href={pdfUrl} target="_blank" rel="noopener">Resume ↗</MobileResume>
          </MobileOverlay>
        )}
      </AnimatePresence>
    </>
  )
}
```

- [ ] **Step 2: Lint**

```bash
npm run lint
```
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/Nav.jsx
git commit -m "feat: add floating pill Nav with scroll blur and mobile overlay"
```

---

## Task 6: Update Footer Component

**Files:**
- Replace: `src/components/Footer.jsx`

- [ ] **Step 1: Rewrite the footer**

Replace the entire content of `src/components/Footer.jsx` with:

```jsx
import styled from 'styled-components'

const Wrap = styled.footer`
  border-top: 1px solid rgba(255,255,255,0.06);
  background: var(--bg-surface);
  padding: 20px 24px;
  text-align: center;
  color: var(--text-faint);
  font-family: var(--font-body);
  font-size: 12px;
`

export default function Footer() {
  return (
    <Wrap>© {new Date().getFullYear()} Vikram Kini</Wrap>
  )
}
```

- [ ] **Step 2: Lint**

```bash
npm run lint
```
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/Footer.jsx
git commit -m "feat: restyle footer with dark Stellar tokens"
```

---

## Task 7: Create ProjectCard Component

**Files:**
- Create: `src/components/ProjectCard.jsx`

- [ ] **Step 1: Write the component**

Create `src/components/ProjectCard.jsx`:

```jsx
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import styled from 'styled-components'

const Card = styled(motion.div)`
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 16px;
  overflow: hidden;
  transition: border-color 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    border-color: rgba(124,58,237,0.45);
    box-shadow: 0 0 28px rgba(124,58,237,0.18), 0 8px 32px rgba(0,0,0,0.4);
  }
`

const Thumb = styled.div`
  height: 130px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 34px;
  background: ${({ $gradient }) =>
    $gradient || 'linear-gradient(135deg, rgba(124,58,237,0.25), rgba(6,182,212,0.15))'};
  position: relative;
`

const ThumbGlow = styled.div`
  position: absolute;
  top: -30px;
  right: -30px;
  width: 110px;
  height: 110px;
  background: radial-gradient(circle, rgba(6,182,212,0.3), transparent 65%);
  pointer-events: none;
`

const Body = styled.div`
  padding: 16px 18px 18px;
`

const TagChip = styled.span`
  display: inline-block;
  padding: 3px 10px;
  border-radius: 100px;
  font-family: var(--font-display);
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.08em;
  margin-bottom: 9px;
  background: ${({ $variant }) =>
    $variant === 'cyan' ? 'rgba(6,182,212,0.12)' : 'rgba(124,58,237,0.12)'};
  border: 1px solid ${({ $variant }) =>
    $variant === 'cyan' ? 'rgba(6,182,212,0.25)' : 'rgba(124,58,237,0.25)'};
  color: ${({ $variant }) =>
    $variant === 'cyan' ? 'var(--cyan-muted)' : 'var(--violet-muted)'};
`

const Title = styled.h3`
  margin: 0 0 7px;
  font-family: var(--font-display);
  font-size: 18px;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--text);
`

const Desc = styled.p`
  margin: 0;
  font-family: var(--font-body);
  font-size: 13px;
  color: var(--text-muted);
  line-height: 1.65;
  font-weight: 300;
`

function CardInner({ icon, gradient, tag, tagVariant = 'violet', title, description }) {
  return (
    <Card whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
      <Thumb $gradient={gradient}>
        <ThumbGlow />
        {icon}
      </Thumb>
      <Body>
        <TagChip $variant={tagVariant}>{tag}</TagChip>
        <Title>{title}</Title>
        <Desc>{description}</Desc>
      </Body>
    </Card>
  )
}

export default function ProjectCard({ to, href, ...rest }) {
  if (to) {
    return (
      <Link to={to} style={{ display: 'block' }}>
        <CardInner {...rest} />
      </Link>
    )
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" style={{ display: 'block' }}>
      <CardInner {...rest} />
    </a>
  )
}
```

- [ ] **Step 2: Lint**

```bash
npm run lint
```
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/ProjectCard.jsx
git commit -m "feat: add glassmorphism ProjectCard with hover glow"
```

---

## Task 8: Update App.jsx Routing

**Files:**
- Replace: `src/App.jsx`

- [ ] **Step 1: Rewrite App.jsx**

Replace the entire content of `src/App.jsx` with:

```jsx
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import { GlobalStyle, AppShell, PageWrap } from './styles/primitives.js'
import Cursor from './components/Cursor.jsx'
import Nav from './components/Nav.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Work from './pages/Work.jsx'
import Contact from './pages/Contact.jsx'
import PumpJournalLanding from './pages/PumpJournalLanding.jsx'
import PumpJournalSupport from './pages/PumpJournalSupport.jsx'
import PumpJournalPrivacy from './pages/PumpJournalPrivacy.jsx'

function App() {
  return (
    <HashRouter>
      <GlobalStyle />
      <Cursor />
      <AppShell>
        <Nav />
        <PageWrap>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/work" element={<Work />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/projects/pumpjournal" element={<PumpJournalLanding />} />
            <Route path="/pumpjournal/support" element={<PumpJournalSupport />} />
            <Route path="/pumpjournal/privacy" element={<PumpJournalPrivacy />} />
            {/* Legacy redirects */}
            <Route path="/projects" element={<Navigate to="/work" replace />} />
            <Route path="/about" element={<Navigate to="/" replace />} />
            <Route path="/resume" element={<Navigate to="/" replace />} />
          </Routes>
        </PageWrap>
        <Footer />
      </AppShell>
    </HashRouter>
  )
}

export default App
```

- [ ] **Step 2: Lint**

```bash
npm run lint
```
Expected: no errors.

- [ ] **Step 3: Start dev server and verify routing**

```bash
npm run dev
```

Open http://localhost:5173. Verify:
- `/#/` loads (blank page is fine — Home.jsx not yet rewritten)
- `/#/projects` redirects to `/#/work`
- `/#/about` redirects to `/#/`
- Nav is visible as a floating pill centered at top

- [ ] **Step 4: Commit**

```bash
git add src/App.jsx
git commit -m "feat: update routing — /work, /contact, legacy redirects, wire Cursor + Nav"
```

---

## Task 9: Rewrite Home Page

**Files:**
- Replace: `src/pages/Home.jsx`

- [ ] **Step 1: Write Home.jsx**

Replace the entire content of `src/pages/Home.jsx` with:

```jsx
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
```

- [ ] **Step 2: Lint and visual check**

```bash
npm run lint
```
Expected: no errors.

Open http://localhost:5173/#/ and verify:
- Dark canvas loads with violet + cyan orbs blooming in
- Badge, name, role, bio, buttons stagger in from bottom
- Scroll indicator appears last
- About strip slides in on scroll
- Skill chips render with violet highlight on React / Node.js / AI

- [ ] **Step 3: Commit**

```bash
git add src/pages/Home.jsx
git commit -m "feat: rewrite Home page — cinematic hero, about strip, stagger animations"
```

---

## Task 10: Create Work Page

**Files:**
- Create: `src/pages/Work.jsx`

- [ ] **Step 1: Write Work.jsx**

Create `src/pages/Work.jsx`:

```jsx
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import styled from 'styled-components'
import OrbBackground from '../components/OrbBackground.jsx'
import ProjectCard from '../components/ProjectCard.jsx'

const WorkSection = styled.section`
  position: relative;
  min-height: 100svh;
  padding: clamp(120px, 12vw, 160px) clamp(24px, 6vw, 80px) clamp(80px, 8vw, 120px);
  overflow: hidden;
`

const Inner = styled.div`
  position: relative;
  z-index: 2;
  max-width: 1100px;
  margin: 0 auto;
`

const Header = styled(motion.div)`
  text-align: center;
  margin-bottom: 48px;
`

const SectionLabel = styled.div`
  font-family: var(--font-display);
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--violet-muted);
  margin-bottom: 12px;
`

const SectionTitle = styled.h1`
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(32px, 5vw, 48px);
  font-weight: 800;
  letter-spacing: -0.03em;
  color: var(--text);
`

const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
`

/* Add your projects here. Use `to` for internal routes, `href` for external links. */
const PROJECTS = [
  {
    title: 'PumpJournal',
    description:
      'AI-powered fitness tracking app. Log workouts with natural language, track progressive overload automatically.',
    tag: 'iOS · AI',
    tagVariant: 'violet',
    icon: '💪',
    gradient: 'linear-gradient(135deg, rgba(124,58,237,0.25), rgba(6,182,212,0.15))',
    to: '/projects/pumpjournal',
  },
  // Add more projects here:
  // {
  //   title: 'Project Name',
  //   description: 'Short description.',
  //   tag: 'Web · Full Stack',
  //   tagVariant: 'cyan',
  //   icon: '🌐',
  //   gradient: 'linear-gradient(135deg, rgba(6,182,212,0.2), rgba(124,58,237,0.1))',
  //   href: 'https://github.com/...',
  // },
]

const ease = [0.25, 0.46, 0.45, 0.94]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
}

const WORK_ORBS = [
  {
    $size: 360,
    $color: 'radial-gradient(circle, rgba(124,58,237,0.3), transparent 70%)',
    $top: '-80px',
    $left: '-60px',
  },
  {
    $size: 260,
    $color: 'radial-gradient(circle, rgba(6,182,212,0.2), transparent 70%)',
    $bottom: '-40px',
    $right: '-30px',
  },
]

export default function Work() {
  return (
    <>
      <Helmet>
        <title>Work — Vikram Kini</title>
        <meta
          name="description"
          content="Selected projects by Vikram Kini — Full Stack Engineer."
        />
      </Helmet>

      <WorkSection>
        <OrbBackground orbs={WORK_ORBS} noiseOpacity={0.03} />

        <Inner>
          <Header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
          >
            <SectionLabel>Portfolio</SectionLabel>
            <SectionTitle>Selected Work</SectionTitle>
          </Header>

          <Grid
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {PROJECTS.map((project) => (
              <motion.div key={project.title} variants={cardVariants}>
                <ProjectCard {...project} />
              </motion.div>
            ))}
          </Grid>
        </Inner>
      </WorkSection>
    </>
  )
}
```

- [ ] **Step 2: Lint and visual check**

```bash
npm run lint
```

Open http://localhost:5173/#/work and verify:
- PumpJournal card renders with orb background
- Card lifts on hover with violet border glow
- Header fades up on load

- [ ] **Step 3: Commit**

```bash
git add src/pages/Work.jsx
git commit -m "feat: add Work page with staggered ProjectCard grid"
```

---

## Task 11: Rewrite Contact Page

**Files:**
- Replace: `src/pages/Contact.jsx`

- [ ] **Step 1: Write Contact.jsx**

Replace the entire content of `src/pages/Contact.jsx` with:

```jsx
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
```

- [ ] **Step 2: Lint and visual check**

```bash
npm run lint
```

Open http://localhost:5173/#/contact. Verify staggered entrance, email button glows on hover.

- [ ] **Step 3: Commit**

```bash
git add src/pages/Contact.jsx
git commit -m "feat: rewrite Contact page — minimal dark design with stagger animation"
```

---

## Task 12: Restyle PumpJournal Landing

**Files:**
- Replace: `src/pages/PumpJournalLanding.jsx`

- [ ] **Step 1: Rewrite PumpJournalLanding.jsx**

Replace the entire content of `src/pages/PumpJournalLanding.jsx` with:

```jsx
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import styled from 'styled-components'
import OrbBackground from '../components/OrbBackground.jsx'

const Page = styled.section`
  position: relative;
  min-height: 100svh;
  padding: clamp(120px, 12vw, 160px) clamp(24px, 6vw, 72px) clamp(80px, 8vw, 120px);
  overflow: hidden;
`

const Inner = styled.div`
  position: relative;
  z-index: 2;
  max-width: 860px;
  margin: 0 auto;
`

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-body);
  font-size: 13px;
  color: var(--text-faint);
  margin-bottom: 40px;
  transition: color 0.2s ease;

  &:hover { color: var(--text-muted); }
`

const Hero = styled(motion.div)`
  margin-bottom: 64px;
`

const AppLabel = styled.div`
  font-family: var(--font-display);
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: var(--violet-muted);
  margin-bottom: 14px;
`

const AppTitle = styled.h1`
  margin: 0 0 14px;
  font-family: var(--font-display);
  font-size: clamp(40px, 7vw, 68px);
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 0.9;
  background: var(--gradient-text);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`

const AppSub = styled.p`
  margin: 0 0 28px;
  font-family: var(--font-body);
  font-size: clamp(15px, 2vw, 17px);
  color: var(--text-muted);
  line-height: 1.75;
  font-weight: 300;
  max-width: 520px;
`

const CtaRow = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`

const BtnPrimary = styled.a`
  display: inline-flex;
  align-items: center;
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

const BtnGhost = styled(Link)`
  display: inline-flex;
  align-items: center;
  padding: 11px 22px;
  border-radius: 10px;
  background: rgba(255,255,255,0.04);
  color: var(--text-muted);
  font-family: var(--font-body);
  font-size: 14px;
  border: 1px solid var(--glass-border);
  transition: background 0.2s ease, color 0.2s ease;

  &:hover {
    background: rgba(255,255,255,0.08);
    color: var(--text);
  }
`

const FeaturesSection = styled(motion.div)`
  margin-top: 0;
`

const FeaturesLabel = styled.div`
  font-family: var(--font-display);
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: var(--violet-muted);
  margin-bottom: 24px;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
`

const FeatureCard = styled.div`
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 14px;
  padding: 22px 20px;
  transition: border-color 0.25s ease;

  &:hover { border-color: rgba(124,58,237,0.35); }
`

const FeatureIcon = styled.div`
  font-size: 24px;
  margin-bottom: 12px;
`

const FeatureTitle = styled.h3`
  margin: 0 0 7px;
  font-family: var(--font-display);
  font-size: 16px;
  font-weight: 700;
  color: var(--text);
  letter-spacing: -0.01em;
`

const FeatureDesc = styled.p`
  margin: 0;
  font-family: var(--font-body);
  font-size: 13px;
  color: var(--text-muted);
  line-height: 1.65;
  font-weight: 300;
`

const ease = [0.25, 0.46, 0.45, 0.94]

const FEATURES = [
  {
    icon: '⚡',
    title: 'Fast logging',
    desc: 'Quickly add sets and reps with minimal taps. Built for the gym floor.',
  },
  {
    icon: '🔒',
    title: 'Private by default',
    desc: 'No accounts required. Your data stays on your device.',
  },
  {
    icon: '📈',
    title: 'Simple insights',
    desc: 'See your recent history and progressive overload at a glance.',
  },
]

const PJ_ORBS = [
  {
    $size: 380,
    $color: 'radial-gradient(circle, rgba(124,58,237,0.4), transparent 70%)',
    $top: '-80px',
    $right: '-60px',
  },
  {
    $size: 260,
    $color: 'radial-gradient(circle, rgba(6,182,212,0.25), transparent 70%)',
    $bottom: '-40px',
    $left: '-40px',
  },
]

export default function PumpJournalLanding() {
  return (
    <Page>
      <Helmet>
        <title>PumpJournal — Workout Journal</title>
        <meta
          name="description"
          content="PumpJournal — a simple, privacy-first workout journal. Track your workouts without the noise."
        />
      </Helmet>

      <OrbBackground orbs={PJ_ORBS} noiseOpacity={0.03} />

      <Inner>
        <BackLink to="/work">← Back to Work</BackLink>

        <Hero
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease }}
        >
          <AppLabel>iOS App</AppLabel>
          <AppTitle>PumpJournal</AppTitle>
          <AppSub>
            A simple, privacy-first workout journal. Track workouts without the noise —
            no accounts, no subscriptions, no distractions.
          </AppSub>
          <CtaRow>
            <BtnPrimary href="#" target="_blank" rel="noopener">
              App Store ↗
            </BtnPrimary>
            <BtnGhost to="/pumpjournal/support">Support</BtnGhost>
            <BtnGhost to="/pumpjournal/privacy">Privacy</BtnGhost>
          </CtaRow>
        </Hero>

        <FeaturesSection
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease }}
        >
          <FeaturesLabel>Features</FeaturesLabel>
          <Grid>
            {FEATURES.map(({ icon, title, desc }) => (
              <FeatureCard key={title}>
                <FeatureIcon>{icon}</FeatureIcon>
                <FeatureTitle>{title}</FeatureTitle>
                <FeatureDesc>{desc}</FeatureDesc>
              </FeatureCard>
            ))}
          </Grid>
        </FeaturesSection>
      </Inner>
    </Page>
  )
}
```

- [ ] **Step 2: Lint and visual check**

```bash
npm run lint
```

Open http://localhost:5173/#/projects/pumpjournal. Verify dark styling, orbs, feature cards.

- [ ] **Step 3: Commit**

```bash
git add src/pages/PumpJournalLanding.jsx
git commit -m "feat: restyle PumpJournal landing with Stellar dark system"
```

---

## Task 13: Delete Obsolete Files

**Files:**
- Delete: `src/components/Header.jsx`
- Delete: `src/components/BackgroundFX.jsx`
- Delete: `src/pages/About.jsx`
- Delete: `src/pages/Projects.jsx`
- Delete: `src/routes/Resume.jsx`

- [ ] **Step 1: Delete the files**

```bash
git rm src/components/Header.jsx \
       src/components/BackgroundFX.jsx \
       src/pages/About.jsx \
       src/pages/Projects.jsx \
       src/routes/Resume.jsx
```

- [ ] **Step 2: Lint and final visual check**

```bash
npm run lint
```
Expected: no errors (none of these files were imported after Task 8 rewrote App.jsx).

Run dev server and do a final pass through all routes:
- `/#/` — hero + about strip
- `/#/work` — project grid
- `/#/contact` — contact page
- `/#/projects/pumpjournal` — pumpjournal landing
- `/#/projects` — redirects to `/#/work` ✓
- `/#/about` — redirects to `/#/` ✓
- Nav pill visible everywhere, Resume ↗ opens PDF in new tab
- Custom cursor follows mouse (desktop only)
- Mobile: hamburger opens overlay at < 768px

- [ ] **Step 3: Commit**

```bash
git commit -m "chore: remove obsolete Header, BackgroundFX, About, Projects, Resume files"
```

---

## Task 14: Production Build Check

**Files:** None modified.

- [ ] **Step 1: Build for production**

```bash
npm run build
```
Expected: build succeeds, no errors. `dist/` generated.

- [ ] **Step 2: Preview production build**

```bash
npm run preview
```

Open the preview URL and verify: all routes load, fonts load (Syne + DM Sans), orbs render, animations play.

- [ ] **Step 3: Update CLAUDE.md**

Open `CLAUDE.md` and update the **Architecture** section to reflect the new component structure (OrbBackground, Cursor, Nav, ProjectCard) and the condensed routing. Also update the palette section to the new dark tokens.

- [ ] **Step 4: Final commit**

```bash
git add CLAUDE.md
git commit -m "docs: update CLAUDE.md to reflect Stellar redesign architecture"
```
