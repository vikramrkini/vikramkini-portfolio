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
