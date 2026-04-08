import { useEffect, useState, useCallback } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import styled from 'styled-components'

const NavWrap = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  background: rgba(7, 7, 15, 0.6);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  box-shadow: 0 40px 40px -15px rgba(255, 255, 255, 0.04);
`

const NavInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 3rem;
  height: 64px;

  @media (max-width: 768px) {
    padding: 0 1.5rem;
  }
`

const Logo = styled(NavLink)`
  font-family: var(--font-display);
  font-size: 0.9rem;
  font-weight: 300;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--text);

  &:hover { color: var(--gold); }
  transition: color 500ms ease;
`

const NavLinks = styled.div`
  display: flex;
  gap: 2.5rem;
  align-items: center;

  @media (max-width: 768px) { display: none; }
`

const NavLinkStyled = styled.button`
  font-family: var(--font-body);
  font-size: 0.7rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--text-muted);
  background: none;
  border: none;
  padding: 0;
  transition: color 500ms ease;

  &:hover, &.active { color: var(--gold); }
`

const NavLinkRoute = styled(NavLink)`
  font-family: var(--font-body);
  font-size: 0.7rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--text-muted);
  transition: color 500ms ease;

  &:hover, &.active { color: var(--gold); }
`

const ResumeCta = styled.a`
  font-family: var(--font-body);
  font-size: 0.7rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--text-muted);
  transition: color 500ms ease;

  &:hover { color: var(--gold); }
`

const HamBtn = styled.button`
  display: none;
  background: none;
  border: none;
  color: var(--text-muted);
  padding: 4px;
  line-height: 1;

  @media (max-width: 768px) { display: block; }
`

const MobileOverlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(7, 7, 15, 0.97);
  backdrop-filter: blur(14px);
  z-index: 99;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2.5rem;
`

const MobileNavBtn = styled.button`
  font-family: var(--font-display);
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-muted);
  background: none;
  border: none;
  letter-spacing: -0.02em;
  transition: color 0.2s ease;

  &:hover { color: var(--text); }
`

const MobileNavLink = styled(NavLink)`
  font-family: var(--font-display);
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-muted);
  letter-spacing: -0.02em;
  transition: color 0.2s ease;

  &:hover, &.active { color: var(--text); }
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

const HamIcon = () => (
  <svg width="22" height="16" viewBox="0 0 22 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <line x1="0" y1="2" x2="22" y2="2" />
    <line x1="0" y1="8" x2="22" y2="8" />
    <line x1="0" y1="14" x2="22" y2="14" />
  </svg>
)

export default function Nav() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const pdfUrl = `${import.meta.env.BASE_URL}Resume-Vikram.pdf`

  useEffect(() => { setOpen(false) }, [location.pathname])

  const goToExperience = useCallback(() => {
    if (location.pathname !== '/') {
      navigate('/')
      setTimeout(() => {
        document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })
      }, 300)
    } else {
      document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [location.pathname, navigate])

  return (
    <>
      <NavWrap>
        <NavInner>
          <Logo to="/">Vikram Kini</Logo>
          <NavLinks>
            <NavLinkStyled onClick={goToExperience}>Experience</NavLinkStyled>
            <NavLinkRoute to="/work">Projects</NavLinkRoute>
            <NavLinkRoute to="/contact">Contact</NavLinkRoute>
            <ResumeCta href={pdfUrl} target="_blank" rel="noopener">Résumé</ResumeCta>
          </NavLinks>
          <HamBtn onClick={() => setOpen(true)} aria-label="Open navigation">
            <HamIcon />
          </HamBtn>
        </NavInner>
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
            <MobileNavBtn onClick={() => { setOpen(false); goToExperience() }}>Experience</MobileNavBtn>
            <MobileNavLink to="/work" onClick={() => setOpen(false)}>Projects</MobileNavLink>
            <MobileNavLink to="/contact" onClick={() => setOpen(false)}>Contact</MobileNavLink>
            <MobileNavBtn as="a" href={pdfUrl} target="_blank" rel="noopener" style={{ fontSize: '1.5rem', letterSpacing: 0 }}>
              Résumé ↗
            </MobileNavBtn>
          </MobileOverlay>
        )}
      </AnimatePresence>
    </>
  )
}
