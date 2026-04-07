# Portfolio Redesign — "Stellar" Design Spec

**Date:** 2026-04-06  
**Aesthetic:** Dark Precision × Bold Modernism  
**Approach:** A — Full Immersion ("Stellar")

---

## 1. Information Architecture

### Routes (HashRouter, unchanged)

| Route | Page | Notes |
|-------|------|-------|
| `/#/` | Home | Hero + About strip + skills |
| `/#/work` | Work | Replaces `/projects` |
| `/#/contact` | Contact | Simplified, no form |
| `/#/projects/pumpjournal` | PumpJournal | Redesigned with new system |
| `/#/pumpjournal/support` | Support | Kept as-is |
| `/#/pumpjournal/privacy` | Privacy | Kept as-is |

**Removed routes:** `/#/about` (merged into Home), `/#/resume` (PDF opens from nav CTA directly).

**Redirects:** `/#/projects` → `/#/work`, `/#/about` → `/#/` — both for backwards compatibility.

### Navigation

Floating pill-shaped navbar, horizontally centered at the top of every page.

- **Left:** `VK` logo in Syne 800, violet (`#a78bfa`)
- **Center:** `Work · Contact` links in DM Sans, muted white
- **Right:** `Resume ↗` pill button — gradient violet/cyan border, opens PDF in new tab
- **Scroll behavior:** Below 80px scroll, nav gains `backdrop-filter: blur(12px)` + `background: rgba(7,7,15,0.7)` transition

---

## 2. Visual System

### Color Tokens

```css
--bg-base:      #07070f;   /* page canvas */
--bg-surface:   #0f0f1a;   /* cards, strips */
--violet:       #7c3aed;   /* primary accent */
--violet-muted: #a78bfa;   /* labels, muted accents */
--cyan:         #06b6d4;   /* secondary accent */
--cyan-muted:   #67e8f9;   /* cyan labels */
--text:         #ffffff;
--text-muted:   rgba(255,255,255,0.45);
--text-faint:   rgba(255,255,255,0.25);
--glass-bg:     rgba(255,255,255,0.03);
--glass-border: rgba(255,255,255,0.07);
--gradient-brand: linear-gradient(135deg, #7c3aed, #06b6d4);
--gradient-text:  linear-gradient(135deg, #fff 40%, rgba(167,139,250,0.6));
```

### Typography

| Role | Font | Weight | Size | Tracking |
|------|------|--------|------|----------|
| Display XL (hero name) | Syne | 800 | `clamp(52px, 8vw, 80px)` | −0.04em |
| Display LG (section titles) | Syne | 800 | `clamp(32px, 5vw, 48px)` | −0.03em |
| Display MD (card titles) | Syne | 700 | 20px | −0.02em |
| Label (tags, badges) | Syne | 600 | 10px | 0.25em UC |
| Body | DM Sans | 300 | 16px / 1.7 | normal |
| Body SM | DM Sans | 400 | 13px / 1.6 | normal |

Both fonts loaded from Google Fonts. Applied globally via `GlobalStyle`.

### Shared Visual Effects

- **Gradient orbs:** `radial-gradient` blobs, `filter: blur(60–80px)`, absolutely positioned, `pointer-events: none`
- **Noise texture:** SVG `feTurbulence` overlay at 4% opacity on hero sections, `background-size: 128px`
- **Glassmorphism cards:** `background: rgba(255,255,255,0.03)`, `border: 1px solid rgba(255,255,255,0.07)`, `border-radius: 16px`
- **Gradient border:** `linear-gradient` background with `padding-box` / `border-box` technique
- **Custom cursor:** 8px dot (`position: fixed`, `pointer-events: none`) + 28px ring follower, both violet-tinted, animate with Framer Motion `useSpring`. `cursor: none` on `body` is guarded by `@media (pointer: fine)` so it only applies on mouse devices.

---

## 3. Page Designs

### Home (`/#/`)

**Hero (full viewport)**
- Background: `--bg-base` + 3 gradient orbs (violet top-right, cyan bottom-left, violet-muted center-right)
- Noise texture overlay
- Content (vertically centered, text-aligned center):
  1. Availability badge: pulsing dot + "Available for opportunities" — violet pill
  2. `Vikram Kini` — Display XL, gradient text
  3. `Full Stack Engineer` — Display LG, gradient-brand text
  4. Bio copy — Body, `--text-muted`, max-width 480px
  5. CTA row: `View My Work →` (gradient btn) + `Download Resume` (ghost) + `LinkedIn ↗` (ghost)
- Scroll indicator: thin 32px line fading into "scroll" label, bottom-center

**About Strip (below hero)**
- Background: `--bg-surface`, top border `rgba(255,255,255,0.06)`
- 2-column grid (responsive: stacks on mobile)
  - Left: "About me" label + 2-line headline
  - Right: Short bio paragraph + skill tags (pill chips, 2 highlighted in violet)

**Entrance animation sequence (Framer Motion):**
1. Orbs: `scale: 0 → 1`, `opacity: 0 → 1`, staggered 0.1s, spring
2. Badge: `opacity: 0 → 1`, `y: 10 → 0`, delay 0.2s
3. Name: `opacity: 0 → 1`, `y: 20 → 0`, delay 0.35s
4. Role: `opacity: 0 → 1`, `y: 20 → 0`, delay 0.5s
5. Bio: `opacity: 0 → 1`, delay 0.65s
6. Buttons: `opacity: 0 → 1`, staggered 0.1s each, delay 0.75s
7. Scroll indicator: `opacity: 0 → 1`, delay 1.1s
- About strip: `whileInView` trigger, `y: 40 → 0`, `once: true`

---

### Work (`/#/work`)

- Same orb background as Home (lighter opacity)
- Section header (centered): label "Portfolio" + title "Selected Work"
- Project grid: `auto-fit, minmax(300px, 1fr)`, gap 20px, max-width 1100px centered
- Each **ProjectCard**:
  - Gradient thumbnail area (120px tall) with emoji/icon centered (real thumbnail image if provided)
  - Body: tag chip + title (Syne 700) + description (DM Sans 300)
  - Gradient border glow using padding-box/border-box trick
  - Hover: `translateY(-4px)`, border glow intensifies (`opacity: 1`), inner glow blooms
  - Props: `to` (internal HashRouter route) or `href` (external URL, `target="_blank"`). PumpJournal uses `to`. Other projects use `href`.
- Cards stagger in with `whileInView`, `y: 30 → 0`, 0.08s stagger

---

### Contact (`/#/contact`)

- Full-viewport centered layout, same orb background
- Content (centered column, max-width 520px):
  - Label: "Get in touch"
  - Headline: "Let's build something." — Display LG
  - Subtext: availability/approach copy — Body muted
  - Primary CTA: large gradient button with email address → `mailto:`
  - Secondary links row: LinkedIn, GitHub, Resume (ghost buttons)
- No contact form — direct email preferred
- Entrance: `y: 30 → 0`, `opacity: 0 → 1`, staggered children

---

### PumpJournal (`/#/projects/pumpjournal`)

Redesigned using the new visual system (same nav, same bg, same tokens). Content structure unchanged (hero, features, CTA, app store links).

---

## 4. Animation System

All animation via **Framer Motion**. No CSS `@keyframes` for entrance/exit animations.

| Pattern | Usage | Config |
|---------|-------|--------|
| Page entrance | Every page, children stagger | `initial: {opacity:0, y:20}`, spring stiffness 100, damping 20 |
| Scroll reveal | About strip, work cards | `whileInView`, `once: true`, viewport margin `-80px` |
| Hover lift | Cards, buttons | `whileHover: {y: -4}`, duration 0.2s |
| Orb bloom | Hero load | `scale: 0→1`, spring, staggered |
| Nav blur | Scroll past 80px | JS scroll listener → CSS class toggle (not Framer) |
| Cursor | Global | `useSpring` on mouse position, dot + ring follower |
| Availability pulse | Badge dot | CSS `@keyframes pulse` (box-shadow) — exception for simple loop |

---

## 5. Component Architecture

All shared primitives replaced. New file: `src/styles/primitives.js`.

### New primitives exports:
- `GlobalStyle` — CSS vars, font import, body reset, cursor hide on custom cursor
- `AppShell` — flex column, min-height 100svh
- `PageWrap` — flex:1
- `GradientText` — reusable gradient clip component
- `GlassCard` — base glass card styles
- `OrbField` — positioned orb container (renders 2–3 orbs + noise)
- `Tag` — pill chip, variant prop: `violet | cyan | neutral`
- `Button` — variant prop: `primary | ghost | glow`

### New components:
- `src/components/Cursor.jsx` — custom cursor (dot + ring), hidden on touch devices
- `src/components/Nav.jsx` — floating pill nav, scroll-aware blur
- `src/components/Footer.jsx` — minimal dark footer (keep existing, restyle)
- `src/components/ProjectCard.jsx` — card with gradient border, hover animation
- `src/components/OrbBackground.jsx` — reusable orb + noise bg

### Pages:
- `src/pages/Home.jsx` — hero + about strip
- `src/pages/Work.jsx` — replaces `Projects.jsx`
- `src/pages/Contact.jsx` — simplified
- `src/pages/PumpJournalLanding.jsx` — redesigned with new system

### App.jsx changes:
- Add `/work` route, redirect `/projects` → `/work`
- Remove `/about` route
- Remove `/resume` route
- Render `<Cursor />` inside `AppShell`

---

## 6. Responsiveness

| Breakpoint | Changes |
|------------|---------|
| `< 768px` | Nav pill collapses to logo + hamburger icon (☰); menu slides down as a dark overlay; hero name scales down via clamp; About strip stacks to 1-col; Work grid → 1-col |
| `< 480px` | Hero buttons stack vertically; hero bio font-size reduces |

Custom cursor disabled on touch devices (`@media (pointer: coarse)`).

---

## 7. Out of Scope

- Blog / writing page
- Dark/light mode toggle
- Contact form (email CTA only)
- Animation preferences toggle (reduced motion handled via CSS media query)
