import { Link } from 'react-router-dom'
import { FooterWrap, FooterInner } from '../styles/primitives.js'

export default function Footer() {
  const year = 2025
  return (
    <FooterWrap>
      <FooterInner>
        <div>© {year} Vikram Kini</div>
        <div style={{ display: 'flex', gap: 12 }}>
          <Link to="/projects">Projects</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/pumpjournal/support">PumpJournal Support</Link>
          <Link to="/pumpjournal/privacy">PumpJournal Privacy</Link>
        </div>
      </FooterInner>
    </FooterWrap>
  )
}

