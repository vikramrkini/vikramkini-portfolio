import { NavLink } from 'react-router-dom'
import { Nav, NavInner, NavLinks } from '../styles/primitives.js'

export default function Header() {
  return (
    <Nav>
      <NavInner>
        <div style={{ fontWeight: 800, letterSpacing: '-0.02em' }}>
          <span style={{
            background: 'linear-gradient(90deg,#8ab4ff,#b388ff,#64fbd2)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent'
          }}>Vikram Kini</span>
        </div>
        <NavLinks>
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/projects">Projects</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </NavLinks>
      </NavInner>
    </Nav>
  )
}
