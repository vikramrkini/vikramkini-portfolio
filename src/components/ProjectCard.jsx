import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import styled from 'styled-components'

const Card = styled(motion.div)`
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 16px;
  overflow: hidden;
  transition: border-color 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    border-color: rgba(124,58,237,0.45);
    box-shadow: 0 0 28px rgba(124,58,237,0.18), 0 8px 32px rgba(0,0,0,0.4);
  }
`

const Thumb = styled.div`
  height: 130px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 34px;
  background: ${({ $gradient }) =>
    $gradient || 'linear-gradient(135deg, rgba(124,58,237,0.25), rgba(6,182,212,0.15))'};
  position: relative;
`

const ThumbGlow = styled.div`
  position: absolute;
  top: -30px;
  right: -30px;
  width: 110px;
  height: 110px;
  background: radial-gradient(circle, rgba(6,182,212,0.3), transparent 65%);
  pointer-events: none;
`

const Body = styled.div`
  padding: 16px 18px 18px;
`

const TagChip = styled.span`
  display: inline-block;
  padding: 3px 10px;
  border-radius: 100px;
  font-family: var(--font-display);
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.08em;
  margin-bottom: 9px;
  background: ${({ $variant }) =>
    $variant === 'cyan' ? 'rgba(6,182,212,0.12)' : 'rgba(124,58,237,0.12)'};
  border: 1px solid ${({ $variant }) =>
    $variant === 'cyan' ? 'rgba(6,182,212,0.25)' : 'rgba(124,58,237,0.25)'};
  color: ${({ $variant }) =>
    $variant === 'cyan' ? 'var(--cyan-muted)' : 'var(--violet-muted)'};
`

const Title = styled.h3`
  margin: 0 0 7px;
  font-family: var(--font-display);
  font-size: 18px;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--text);
`

const Desc = styled.p`
  margin: 0;
  font-family: var(--font-body);
  font-size: 13px;
  color: var(--text-muted);
  line-height: 1.65;
  font-weight: 300;
`

function CardInner({ icon, gradient, tag, tagVariant = 'violet', title, description }) {
  return (
    <Card whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
      <Thumb $gradient={gradient}>
        <ThumbGlow />
        {icon}
      </Thumb>
      <Body>
        <TagChip $variant={tagVariant}>{tag}</TagChip>
        <Title>{title}</Title>
        <Desc>{description}</Desc>
      </Body>
    </Card>
  )
}

export default function ProjectCard({ to, href, ...rest }) {
  if (to) {
    return (
      <Link to={to} style={{ display: 'block' }}>
        <CardInner {...rest} />
      </Link>
    )
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" style={{ display: 'block' }}>
      <CardInner {...rest} />
    </a>
  )
}
