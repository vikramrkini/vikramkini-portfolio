import styled from 'styled-components'

const Wrap = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
`

const Orb = styled.div`
  position: absolute;
  border-radius: 50%;
  filter: blur(${({ $blur }) => $blur || 70}px);
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  background: ${({ $color }) => $color};
  top: ${({ $top }) => $top ?? 'auto'};
  left: ${({ $left }) => $left ?? 'auto'};
  right: ${({ $right }) => $right ?? 'auto'};
  bottom: ${({ $bottom }) => $bottom ?? 'auto'};
`

const Noise = styled.div`
  position: absolute;
  inset: 0;
  opacity: ${({ $opacity }) => $opacity ?? 0.04};
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size: 128px 128px;
`

const DEFAULT_ORBS = [
  {
    $size: 420,
    $color: 'radial-gradient(circle, rgba(124,58,237,0.5), transparent 70%)',
    $top: '-100px',
    $right: '-80px',
  },
  {
    $size: 320,
    $color: 'radial-gradient(circle, rgba(6,182,212,0.35), transparent 70%)',
    $bottom: '-60px',
    $left: '-60px',
  },
  {
    $size: 220,
    $color: 'radial-gradient(circle, rgba(124,58,237,0.2), transparent 70%)',
    $bottom: '80px',
    $right: '30%',
    $blur: 50,
  },
]

export default function OrbBackground({ orbs = DEFAULT_ORBS, noiseOpacity = 0.04 }) {
  return (
    <Wrap>
      {orbs.map((orb, i) => (
        <Orb key={i} {...orb} />
      ))}
      <Noise $opacity={noiseOpacity} />
    </Wrap>
  )
}
