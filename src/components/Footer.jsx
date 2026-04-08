import styled from 'styled-components'

const Wrap = styled.footer`
  background: var(--bg-base);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 5rem 3rem;
  opacity: 0.6;

  @media (max-width: 768px) { padding: 3rem 1.5rem; }
`

const Inner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
`

const Copy = styled.p`
  font-family: var(--font-body);
  font-size: 0.625rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--text-muted);
  margin: 0;
`

const SocialLinks = styled.div`
  display: flex;
  gap: 2rem;
`

const SocialLink = styled.a`
  font-family: var(--font-body);
  font-size: 0.625rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--text-muted);
  transition: color 300ms ease;

  &:hover { color: var(--text); }
`

export default function Footer() {
  return (
    <Wrap>
      <Inner>
        <Copy>© {new Date().getFullYear()} Vikram Kini — All rights reserved</Copy>
        <SocialLinks>
          <SocialLink href="https://linkedin.com/in/vikramkini" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </SocialLink>
          <SocialLink href="https://github.com/vikramrkini" target="_blank" rel="noopener noreferrer">
            GitHub
          </SocialLink>
        </SocialLinks>
      </Inner>
    </Wrap>
  )
}
