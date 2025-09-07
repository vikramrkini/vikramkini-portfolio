import styled, { keyframes } from 'styled-components'

const floatX = keyframes`
  0% { transform: translate(-10%, -10%) scale(1); }
  50% { transform: translate(10%, 5%) scale(1.05); }
  100% { transform: translate(-10%, -10%) scale(1); }
`

const floatY = keyframes`
  0% { transform: translate(10%, -5%) scale(1.05) rotate(0deg); }
  50% { transform: translate(-5%, 10%) scale(1) rotate(10deg); }
  100% { transform: translate(10%, -5%) scale(1.05) rotate(0deg); }
`

const pulse = keyframes`
  0%, 100% { opacity: .35; }
  50% { opacity: .6; }
`

const Wrap = styled.div`
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  overflow: hidden;
`

const Blob = styled.div`
  position: absolute;
  width: 100vmax;
  height: 100vmax;
  filter: blur(60px) saturate(120%);
  opacity: .45;
  will-change: transform, opacity;
  animation: ${pulse} 12s ease-in-out infinite;
`

const BlobA = styled(Blob)`
  top: -20vmax; left: -10vmax;
  background: radial-gradient(closest-side, rgba(98,160,255,.9), transparent 60%);
  animation: ${floatX} 28s ease-in-out infinite;
`

const BlobB = styled(Blob)`
  right: -25vmax; top: -15vmax;
  background: radial-gradient(closest-side, rgba(187,136,255,.85), transparent 60%);
  animation: ${floatY} 32s ease-in-out infinite;
`

const BlobC = styled(Blob)`
  bottom: -25vmax; left: 10vmax;
  background: radial-gradient(closest-side, rgba(100,251,210,.8), transparent 60%);
  animation: ${floatX} 36s ease-in-out infinite reverse;
`

const Scanline = styled.div`
  position: absolute; inset: 0;
  background: linear-gradient(transparent 70%, rgba(255,255,255,0.04) 71%),
              repeating-linear-gradient(0deg, rgba(255,255,255,0.015) 0 2px, transparent 2px 4px);
  mix-blend-mode: screen;
`

export default function BackgroundFX() {
  return (
    <Wrap aria-hidden="true">
      <BlobA />
      <BlobB />
      <BlobC />
      <Scanline />
    </Wrap>
  )
}
