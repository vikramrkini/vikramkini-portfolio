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
    --gold:           #e9c349;
    --gold-muted:     rgba(233,195,73,0.4);
    --gradient-brand: linear-gradient(135deg, #7c3aed, #06b6d4);
    --gradient-text:  linear-gradient(135deg, #fff 40%, rgba(167,139,250,0.6));
    --font-display:   'Syne', sans-serif;
    --font-body:      'DM Sans', sans-serif;
  }

  *, *::before, *::after { box-sizing: border-box; }

  html, body, #root {
    width: 100%;
    min-width: 100vw;
    min-height: 100%;
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
