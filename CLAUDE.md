# CLAUDE.md
This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Role
You are a **Senior UI Developer** working on this personal portfolio. Your primary responsibility is to design and build polished, production-grade UI that faithfully follows the established "Stellar" design system **and** mirrors the reference design described in the **Design Reference** section below. Before writing any code, internalize the color palette, typography, layout structure, component patterns, and animation conventions defined in this file. Every UI decision — spacing, motion, color usage, component structure — must feel intentional and consistent with both the existing codebase and the reference design. Do not introduce new visual patterns, libraries, or design directions without a strong reason.

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

---

## Design Reference

The portfolio must closely follow the reference design below. Translate every layout, typographic, and interaction detail into styled-components using the existing Stellar design tokens. Do **not** use Tailwind — re-express every pattern as styled-components.

### Global Tokens (map to existing CSS vars where possible)
| Reference token | Stellar equivalent | Value |
|---|---|---|
| `#131313` background | `--bg-base` | `#07070f` |
| `#0f0f1a` surface | `--bg-surface` | `#0f0f1a` |
| `#e9c349` primary/gold | use `--violet` or add `--gold: #e9c349` | `#e9c349` |
| `#b5cad4` secondary text | `--text-muted` | `rgba(255,255,255,0.45)` |
| `#e5e2e1` on-surface text | `--text` | `#ffffff` |
| `#353535` surface-high | `--bg-surface` variant | `#353535` |

> The reference design uses a gold/amber (`#e9c349`) primary accent. Decide with the developer whether to replace or supplement the existing violet/cyan palette with this gold tone. If supplementing, add `--gold: #e9c349` as a new CSS var in `GlobalStyle` and use it for primary accents in the sections below.

### Typography (reference uses Newsreader + Manrope — map to Syne + DM Sans)
- **Display / headings:** Syne, italic where the reference uses `font-headline italic` (Newsreader italic). Large, tight tracking (`letter-spacing: -0.03em`). Sizes: hero `clamp(4rem, 10vw, 8rem)`, section titles `3rem–5rem`.
- **Body / labels:** DM Sans. Label overlines use `font-size: 0.625rem`, `letter-spacing: 0.3em`, `text-transform: uppercase`.
- **Nav links:** DM Sans, `0.7rem`, `letter-spacing: 0.2em`, uppercase.

### Nav
- Fixed, full-width, `z-index: 50`.
- Background: `rgba(7, 7, 15, 0.6)`, `backdrop-filter: blur(20px)`.
- Shadow: subtle bottom glow `box-shadow: 0 40px 40px -15px rgba(255,255,255,0.04)`.
- Left: name/logo in Syne, light weight, wide tracking.
- Center/right: nav links (Experience, Projects, Contact) in DM Sans uppercase, hover transitions to gold/primary over 500ms.
- Mobile: hamburger icon (Material Symbols or SVG), hide links below `md` breakpoint.

### Hero Section
- `min-height: 100svh`, dark background, content left-aligned, image right-aligned.
- **Hero image:** use `assets/portfolio.png` (import via `import.meta.env.BASE_URL + 'portfolio.png'`). Display it right-aligned, covering `~75%` of viewport width, with:
  - `object-fit: cover`, full section height.
  - Fade mask from right to left: `mask-image: linear-gradient(to right, black 40%, transparent 90%)`.
  - Default state: `filter: grayscale(1)`, `opacity: 0.6`.
  - Hover state: `filter: grayscale(0)`, `opacity: 1`, transition `1000ms ease`.
- **Floating tech icons** overlaid on the hero image: JS, TS, React, Next.js, Python, AWS, Vercel SVG, PostgreSQL. Each absolutely positioned, low opacity (0.2–0.4), `filter: grayscale(1) invert(1)`, with a looping float animation:
  ```css
  @keyframes float {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    50%       { transform: translateY(-20px) rotate(5deg); }
  }
  animation: float 8s ease-in-out infinite;
  ```
  Stagger `animation-delay` per icon (0s, 1s, 1.5s, 2s, 3s, 4s, 5s, 6s).
- **Text block** (left, `z-index: 10`, `padding: 0 6rem`):
  - Overline: `SOFTWARE ENGINEER & ARCHITECT` in DM Sans, `0.625rem`, `letter-spacing: 0.3em`, uppercase, gold/primary color.
  - H1: two-line headline in Syne italic, `clamp(4rem, 8vw, 7rem)`, `line-height: 1.05`, tight tracking. Second line has a primary-colored span (`Digital`) with right padding.
  - Divider row: `1px` horizontal rule (`width: 6rem`, low-opacity) + body paragraph in DM Sans, `1.125rem`, muted color, `max-width: 28rem`, relaxed line-height.
- Gradient overlay on image: `linear-gradient(to left, transparent, rgba(7,7,15,0.2), #07070f)` placed above the image, below text.

### Experience Section
- Background: slightly lighter surface (`--bg-surface` or `#0f0f1a`).
- Padding: `8rem` vertical, `6rem` horizontal.
- 12-column grid: left column (4 cols) = section title + subtitle; right column (8 cols) = experience entries.
- Section title: Syne italic, `~3rem`, tight tracking. Subtitle: DM Sans, `0.625rem`, uppercase, wide tracking, muted.
- Each experience entry:
  - Large italic numbered ghost label (`01`, `02`) positioned absolutely to the left, Syne italic, `3.75rem`, gold at `20%` opacity, transitions to `40%` on group hover.
  - Left border: `1px solid` at `15%` opacity, `padding-left: 2rem`.
  - Role title: Syne, `~1.875rem`. Date range: DM Sans, `0.625rem`, uppercase, wide tracking, muted — right-aligned baseline.
  - Description: DM Sans, muted secondary color, relaxed line-height.
  - Skill tags: small pill chips — `background: #353535`, `border-radius: 2px`, `font-size: 0.625rem`, uppercase, tight tracking. **No border.**
  - Entries spaced `6rem` apart vertically.

### Projects Section
- Background: `--bg-base` (darkest).
- Padding: `8rem` vertical, `6rem` horizontal.
- Header row: left = overline (`Curated Works`) + italic section title; right = italic muted body copy. Justified space-between, align end.
- Project grid: 2-column, `5rem` gap. Second card offset `mt: 8rem` on desktop (staggered layout).
- Each project card:
  - Image container: `aspect-ratio: 4/5`, `overflow: hidden`, background surface color.
  - Image: `object-fit: cover`, `opacity: 0.8`, hover `opacity: 1`, hover `scale(1.05)`, `transition: 700ms`.
  - Gold tint overlay on hover: `background: rgba(233,195,73,0.1)`, `opacity: 0` → `1` on hover.
  - Below image: project name (Syne, `~1.5rem`) + description (DM Sans, `0.875rem`, muted). Arrow icon (`↗`) right-aligned, gold color, translates `+8px X` on group hover.

### Contact Section
- Background: `--bg-base` with very subtle top/bottom borders (`1px solid` at `5%` opacity).
- Padding: `10rem` vertical, `6rem` horizontal.
- Two-column layout (50/50 on desktop):
  - **Left:** Large Syne italic headline (`~4.375rem`, tight tracking), "Let's build something enduring." with primary-colored last word. Below: email as a large clickable Syne headline (`~1.875rem`) that transitions to gold on hover. Social links row: LinkedIn, GitHub, ReadCV in DM Sans uppercase, tiny, spaced.
  - **Right:** Minimal contact form on a slightly lighter surface card (`padding: 3rem`, `border: 1px solid` at `10%` opacity). Three fields: Name, Email, Message. Each field:
    - Transparent background, `border-bottom: 1px solid` (muted), no border elsewhere.
    - Floating label pattern: label sits at input baseline, animates to above (`-1rem`) on focus/filled, transitions to gold.
    - `padding: 1rem 0`, DM Sans body font.
  - Submit button: full width, `padding: 1.5rem`, gold background, dark text, DM Sans `0.625rem` uppercase `letter-spacing: 0.3em`. Hover: transitions over `500ms`.

### Footer
- `background: --bg-base`.
- `border-top: 1px solid` at `10%` opacity.
- `padding: 5rem` vertical, `3rem` horizontal.
- Two-column flex: left = copyright in DM Sans `0.625rem` uppercase muted; right = three social links (LinkedIn, GitHub, ReadCV) same style, hover transitions to full white.
- Overall `opacity: 0.6`.

---

## Design Principles (follow strictly)
- **Fidelity first:** Match the reference design layout, spacing, and typographic hierarchy exactly before adjusting for the Stellar palette.
- **Spacing & rhythm:** 4px base unit. Section vertical padding `8rem`, horizontal `6rem` (desktop). Scale down proportionally on mobile.
- **Typography:** Syne for all display/headings (italic style matches the Newsreader italic feel of the reference). DM Sans for body, labels, nav, tags, buttons. Never introduce other fonts.
- **Motion:** Framer Motion for all entrance animations (`whileInView`, `initial/animate`). Float keyframes for tech icons. Hover transitions via styled-components CSS only (no Framer for simple hover states).
- **Glassmorphism:** `GlassCard` pattern for any card surfaces not already specified above.
- **Glow & depth:** Use box-shadow accent glows sparingly — hero image area and nav only unless a specific section calls for it.
- **Responsiveness:** Mobile-first. Nav collapses to hamburger. Hero stacks vertically (image below text, mask removed). Grids collapse to single column. All font sizes use `clamp()`.
- **Accessibility:** Sufficient contrast on all body text. Focus-visible styles on all interactive elements. Form labels must remain accessible (not just visually floating).

## Conventions
- Plain JavaScript (`.js`/`.jsx`) — no TypeScript in this repo
- Styling is entirely styled-components; no CSS files or Tailwind
- Page-specific styled components are defined at the top of the page file; shared primitives go in `primitives.js`
- `no-unused-vars` ESLint rule ignores `UPPER_CASE` named vars (styled-components pattern)
