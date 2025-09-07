import styled, { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  :root {
    --bg: #0b0f15;
    --surface: #121826;
    --text: #e8eefc;
    --muted: #a9b4cc;
    --primary: #5aa2ff;
    --primary-contrast: #071425;
    --focus: #ffd166;
  }
  * { box-sizing: border-box; }
  html, body, #root { height: 100%; }
  body {
    margin: 0;
    color: var(--text);
    background: radial-gradient(1200px 600px at 10% -10%, #1a2338, transparent 60%),
                radial-gradient(1000px 500px at 90% -20%, #12203a, transparent 50%),
                var(--bg);
    font: 16px/1.6 system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Arial, "Apple Color Emoji", "Segoe UI Emoji";
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  a { color: inherit; text-decoration: none; }
  a:focus { outline: 3px solid var(--focus); outline-offset: 2px; }
  button:focus { outline: 3px solid var(--focus); outline-offset: 2px; }
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after { animation: none !important; transition: none !important; }
  }
`

export const PageWrap = styled.main`
  min-height: calc(100vh - 140px);
`

export const Container = styled.div`
  max-width: 960px;
  margin: 0 auto;
  padding: 24px 20px;
`

export const Section = styled.section`
  margin: 24px 0 40px;
`

export const Heading = styled.h1`
  margin: 0 0 8px;
  font-size: clamp(28px, 6vw, 44px);
  letter-spacing: -0.02em;
`

export const Subtext = styled.p`
  margin: 0 0 16px;
  color: var(--muted);
  font-size: clamp(16px, 2.5vw, 18px);
`

export const LinkButton = styled.a`
  display: inline-block;
  padding: 10px 16px;
  border-radius: 10px;
  background: var(--primary);
  color: var(--primary-contrast);
  font-weight: 600;
  transition: transform .12s ease, box-shadow .12s ease, background .2s ease;
  box-shadow: 0 6px 18px rgba(90,162,255,0.25);
  &:hover { transform: translateY(-1px); box-shadow: 0 8px 22px rgba(90,162,255,0.32); }
  &:active { transform: translateY(0); }
`

export const MutedButton = styled(LinkButton)`
  background: transparent;
  color: var(--text);
  border: 1px solid #26324a;
  box-shadow: none;
`

export const Card = styled.div`
  background: linear-gradient(180deg, rgba(255,255,255,0.02), transparent 40%), var(--surface);
  border: 1px solid #1e2941;
  border-radius: 14px;
  padding: 18px;
  box-shadow: 0 10px 20px rgba(0,0,0,0.25);
`

export const Grid = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
`

export const Nav = styled.nav`
  position: sticky;
  top: 0;
  z-index: 10;
  background: rgba(11, 15, 21, 0.7);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid #19233a;
`

export const NavInner = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 12px;
  padding-bottom: 12px;
`

export const NavLinks = styled.div`
  display: flex;
  gap: 14px;
  a {
    position: relative;
    padding: 8px 10px;
    border-radius: 8px;
    color: var(--muted);
    transition: color .2s ease, text-shadow .2s ease;
  }
  a::after {
    content: '';
    position: absolute;
    left: 10px;
    right: 10px;
    bottom: 4px;
    height: 2px;
    border-radius: 2px;
    background: linear-gradient(90deg, transparent, #6aa5ff, #b88cff, #64fbd2, transparent);
    opacity: 0;
    transform: scaleX(0.4);
    transition: opacity .25s ease, transform .25s ease;
  }
  a[aria-current="page"], a.active {
    color: var(--text);
    background: #1a2338;
    text-shadow: 0 0 12px rgba(136,178,255,0.35);
  }
  a:hover::after { opacity: .9; transform: scaleX(1); }
`

export const FooterWrap = styled.footer`
  border-top: 1px solid #19233a;
  background: rgba(11,15,21,0.6);
`

export const FooterInner = styled(Container)`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 10px 14px;
  padding-top: 16px;
  padding-bottom: 20px;
  color: var(--muted);
`
