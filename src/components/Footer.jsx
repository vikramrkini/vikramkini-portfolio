import { FooterWrap, FooterInner } from '../styles/primitives.js'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <FooterWrap>
      <FooterInner>
        <div>© {year} Vikram Kini</div>
      </FooterInner>
    </FooterWrap>
  )
}
