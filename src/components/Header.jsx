import { NavLink } from 'react-router-dom'
import { Nav, NavInner, NavLinks } from '../styles/primitives.js'
import styled from 'styled-components'
import { motion, useScroll } from 'framer-motion'

const Title = styled(motion.h1)`
  margin: 0;
  font-size: clamp(18px, 2.6vw, 24px);
  font-weight: 800;
  letter-spacing: -0.02em;
  text-align: center;
  background: linear-gradient(90deg,#8ab4ff,#b388ff,#64fbd2);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`

const Progress = styled(motion.div)`
  position: fixed;
  top: 0; left: 0; right: 0;
  height: 3px;
  background: linear-gradient(90deg, #64fbd2, #8ab4ff, #b388ff);
  transform-origin: 0% 50%;
  z-index: 50;
`

export default function Header() {
  const { scrollYProgress } = useScroll()

  const letters = Array.from('Vikram Kini')
  const container = {
    hidden: { opacity: 0, y: -6 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.035, delayChildren: 0.12 * i }
    })
  }
  const child = {
    hidden: { opacity: 0, y: 6 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <>
      <Progress style={{ scaleX: scrollYProgress }} />
      <Nav>
        <NavInner>
          <Title
            aria-label="Vikram Kini"
            variants={container}
            initial="hidden"
            animate="visible"
          >
            {letters.map((ch, idx) => (
              <motion.span key={idx} variants={child} style={{ display: 'inline-block' }}>
                {ch === ' ' ? '\u00A0' : ch}
              </motion.span>
            ))}
          </Title>
          <NavLinks as={motion.div}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 120, damping: 14 }}
          >
            <NavLink to="/" end>Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/projects">Projects</NavLink>
            <NavLink to="/contact">Contact</NavLink>
          </NavLinks>
        </NavInner>
      </Nav>
    </>
  )
}
