import styled from 'styled-components'

const Wrap = styled.footer`
  border-top: 1px solid rgba(255,255,255,0.06);
  background: var(--bg-surface);
  padding: 20px 24px;
  text-align: center;
  color: var(--text-faint);
  font-family: var(--font-body);
  font-size: 12px;
`

export default function Footer() {
  return (
    <Wrap>© {new Date().getFullYear()} Vikram Kini</Wrap>
  )
}
