# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # start dev server (localhost:5173)
npm run build     # production build → dist/
npm run preview   # preview the production build locally
npm run lint      # ESLint (JS/JSX only, no TypeScript)
```

No test suite exists in this project.

## Architecture

Single-page React portfolio built with Vite, deployed as a static site. "Stellar" dark design — violet/cyan palette, Syne + DM Sans typography.

**Routing:** `HashRouter` (`/#/path`) — this is intentional for static hosting compatibility. All routes are defined in `src/App.jsx`.

**Layout shell** (`src/App.jsx`): `<Cursor />` (global custom cursor) → `<Nav />` (floating pill nav) → `<PageWrap>` (routes) → `<Footer />`. All wrapped in `AppShell` (flex column, min-height 100svh).

**Design system** (`src/styles/primitives.js`): CSS custom properties and base layout exports: `GlobalStyle`, `AppShell`, `PageWrap`, `GlassCard`. All design tokens are CSS vars defined in `GlobalStyle`. Pages define their own page-specific styled components; do not add new shared primitives here without good reason.

**Color palette** (dark violet/cyan — "Stellar"):
- `--bg-base: #07070f` — page canvas
- `--bg-surface: #0f0f1a` — cards, strips
- `--violet: #7c3aed`, `--violet-muted: #a78bfa` — primary accent
- `--cyan: #06b6d4`, `--cyan-muted: #67e8f9` — secondary accent
- `--text: #ffffff`, `--text-muted: rgba(255,255,255,0.45)`

**Shared components** (`src/components/`):
- `Nav.jsx` — floating pill nav, scroll-aware blur, hamburger on mobile
- `Cursor.jsx` — custom dot + ring cursor (mouse devices only, Framer Motion spring)
- `OrbBackground.jsx` — reusable gradient orb blobs + noise texture overlay
- `ProjectCard.jsx` — glassmorphism card with hover glow, supports `to` (internal) or `href` (external)
- `Footer.jsx` — minimal dark footer

**Pages** (`src/pages/`): Route-level components. Each page uses `<Helmet>` for per-page `<title>` and `<meta>`. Routes: `/` (Home), `/work` (Work), `/contact` (Contact), `/projects/pumpjournal`, `/pumpjournal/support`, `/pumpjournal/privacy`. Legacy routes `/projects`, `/about`, `/resume` redirect.

**Static assets:** PDF resume lives in `public/` and is accessed via `import.meta.env.BASE_URL`.

**Animation:** Framer Motion for all entrance animations. `whileInView` for scroll-triggered reveals. CSS `@keyframes` only for simple repeating loops (e.g., badge pulse).

## Conventions

- Plain JavaScript (`.js`/`.jsx`) — no TypeScript in this repo
- Styling is entirely styled-components; no CSS files or Tailwind
- Page-specific styled components are defined at the top of the page file; shared primitives go in `primitives.js`
- `no-unused-vars` ESLint rule ignores `UPPER_CASE` named vars (styled-components pattern)
