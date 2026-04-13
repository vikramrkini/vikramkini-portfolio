import { useEffect, useRef } from 'react'
import styled from 'styled-components'

const Dot = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--gold);
  pointer-events: none;
  z-index: 9999;
  will-change: transform;
`

const Ring = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 1.5px solid rgba(233, 195, 73, 0.45);
  pointer-events: none;
  z-index: 9998;
  will-change: transform;
`

export default function Cursor() {
  const dotRef  = useRef(null)
  const ringRef = useRef(null)
  const mouse   = useRef({ x: -100, y: -100 })
  const ring    = useRef({ x: -100, y: -100 })
  const rafId   = useRef(null)

  useEffect(() => {
    // Only activate on true pointer (mouse) devices
    if (!window.matchMedia('(pointer: fine)').matches) return

    const onMove = (e) => {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY
    }
    window.addEventListener('mousemove', onMove, { passive: true })

    const tick = () => {
      // Dot: instant snap
      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate(${mouse.current.x}px, ${mouse.current.y}px) translate(-50%, -50%)`
      }

      // Ring: smooth LERP trail
      ring.current.x += (mouse.current.x - ring.current.x) * 0.14
      ring.current.y += (mouse.current.y - ring.current.y) * 0.14
      if (ringRef.current) {
        ringRef.current.style.transform =
          `translate(${ring.current.x}px, ${ring.current.y}px) translate(-50%, -50%)`
      }

      rafId.current = requestAnimationFrame(tick)
    }
    rafId.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId.current)
    }
  }, [])

  // Hide the native cursor on pointer devices via global style
  useEffect(() => {
    const isPointer = window.matchMedia('(pointer: fine)').matches
    if (isPointer) document.documentElement.style.cursor = 'none'
    return () => { document.documentElement.style.cursor = '' }
  }, [])

  // Don't render on touch devices
  if (typeof window !== 'undefined' && !window.matchMedia('(pointer: fine)').matches) {
    return null
  }

  return (
    <>
      <Dot ref={dotRef} />
      <Ring ref={ringRef} />
    </>
  )
}
