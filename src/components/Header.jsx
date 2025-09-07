import { NavLink } from 'react-router-dom'
import { Nav, NavInner, NavLinks } from '../styles/primitives.js'

export default function Header() {
  return (
    <Nav>
      <NavInner>
        <div style={{ fontWeight: 700 }}>
          Vikram Kini
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

