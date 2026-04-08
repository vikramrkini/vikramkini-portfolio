import { useEffect, useState } from 'react'
import { useMotionValue, useSpring } from 'framer-motion'
import styled from 'styled-components'
import { motion } from 'framer-motion'

const CursorDot = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--violet-muted);
  pointer-events: none;
  z-index: 9999;
  translate: -50% -50%;
`

const CursorRing = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 1px solid rgba(167,139,250,0.4);
  pointer-events: none;
  z-index: 9998;
  translate: -50% -50%;
`

export default function Cursor() {
  const [isPointer, setIsPointer] = useState(false)

  useEffect(() => {
    setIsPointer(window.matchMedia('(pointer: fine)').matches)
  }, [])

  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  const dotX = useSpring(mouseX, { stiffness: 600, damping: 35, mass: 0.3 })
  const dotY = useSpring(mouseY, { stiffness: 600, damping: 35, mass: 0.3 })
  const ringX = useSpring(mouseX, { stiffness: 280, damping: 26, mass: 0.5 })
  const ringY = useSpring(mouseY, { stiffness: 280, damping: 26, mass: 0.5 })

  useEffect(() => {
    if (!isPointer) return
    const move = (e) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [isPointer, mouseX, mouseY])

  if (!isPointer) return null

  return (
    <>
      <CursorDot style={{ x: dotX, y: dotY }} />
      <CursorRing style={{ x: ringX, y: ringY }} />
    </>
  )
}
