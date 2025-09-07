## Vikram Kini — Portfolio

Production-ready personal portfolio built with Vite, React, styled-components, react-router-dom (HashRouter), and react-helmet-async. Deployed to GitHub Pages via GitHub Actions.

### Tech
- Vite + React
- styled-components (design system primitives)
- react-router-dom (HashRouter for GitHub Pages)
- react-helmet-async (per-route SEO)
- GitHub Actions (build and deploy)

### Local Development
- Prerequisites: Node 18+ (Node 20 recommended)
- Install deps: `npm ci`
- Run dev server: `npm run dev`
- Build: `npm run build`
- Preview build: `npm run preview`

### GitHub Pages Deployment
This repo includes a workflow at `.github/workflows/deploy.yml` that builds on pushes to `main` and deploys the `dist/` folder to GitHub Pages.

Steps to enable Pages:
1. Push to `main`.
2. In GitHub → Settings → Pages, set Source to "GitHub Actions".
3. Ensure `Permissions` for Actions are enabled in repo settings.

Vite is configured with `base: '/vikramkini-portfolio/'` for correct asset paths on Pages.

### Custom Domain (optional)
If using a custom domain:
1. In repo → Settings → Pages, set your custom domain.
2. Add a `CNAME` file to `public/` with your domain (e.g., `vikramkini.dev`).
3. Point your DNS to GitHub Pages per GitHub’s docs.

### SEO
- Per-route `<title>` and meta descriptions via `react-helmet-async`.
- `public/robots.txt` and `public/sitemap.xml` include the hash-based routes.

### Routes
- `#/` Home
- `#/about` About
- `#/projects` Projects
- `#/contact` Contact
- `#/projects/pumpjournal` PumpJournal Landing
- `#/pumpjournal/support` Support
- `#/pumpjournal/privacy` Privacy Policy

### License
All rights reserved. No license is granted for reuse.
