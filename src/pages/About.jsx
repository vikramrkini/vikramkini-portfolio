import { Helmet } from 'react-helmet-async'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { Container, Section, Heading, Subtext, Card, Grid } from '../styles/primitives.js'
import aboutMe from '../assets/aboutme.png'

const FullWidth = styled(Container)`
  max-width: none;
  width: 100%;
  padding-left: clamp(16px, 6vw, 56px);
  padding-right: clamp(16px, 6vw, 56px);
  text-align: center;
`

const Portrait = styled.img`
  display: block;
  margin: 10px auto 18px;
  width: min(280px, 70vw);
  height: auto;
  aspect-ratio: 3/4;
  object-fit: cover;
  border-radius: 18px;
  border: 1px solid #223152;
  box-shadow: 0 18px 40px rgba(0,0,0,0.35);
`

const Longform = styled.div`
  width: 100%;
  text-align: center;
  p { margin: 0 0 16px; }
`

export default function About() {
  const container = {
    hidden: { opacity: 1 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.05 }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } }
  }

  return (
    <FullWidth>
      <Helmet>
        <title>About — Vikram Kini</title>
        <meta name="description" content="About Vikram Kini — Full Stack Engineer building production React, React Native, and Spring Boot applications." />
      </Helmet>
      <Section>
        <Heading as={motion.h1}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.7 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        >About Me</Heading>
        <Portrait as={motion.img}
          src={aboutMe}
          alt="Portrait of Vikram Kini"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.55 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
        <Longform as={motion.div}
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.25 }}
        >
          <motion.p variants={item}>My passion for technology began long before I wrote my first line of code. At the age of eleven, I was captivated by Apple’s voice assistant, Siri. The idea that a small device in my hand could understand my questions and respond intelligently felt like magic — and it sparked a curiosity that never left me. That moment planted the seed for what would become a lifelong fascination with computer science and the transformative role it plays in our daily lives.</motion.p>
          <motion.p variants={item}>As I grew older, that curiosity evolved into a determination to understand the mechanics behind intelligent systems. During my undergraduate studies in Computer Science and Engineering at the University of Mumbai, I focused on artificial intelligence, machine learning, big data analytics, and database systems, applying them through hands-on projects.</motion.p>
          <motion.p variants={item}>One project I am especially proud of is TriQL, a beginner-friendly database learning tool with visual query execution. It reduced learning time by 20% and improved student engagement through an interactive UI.</motion.p>
          <motion.p variants={item}>Eager to expand my horizons, I pursued a Master's in Computer Science at the University of Illinois Urbana-Champaign (UIUC), graduating with a 4.0/4.0 GPA and deepening my work in systems, AI, and databases.</motion.p>
          <motion.p variants={item}>Professionally, I've built software that serves thousands of users. At ISAFE Enterprises LLC, I architected a React compliance platform integrated with Spring Boot microservices for 1,000+ K-12 clients and ~75,000 users, launched a React Native iOS/Android app, shipped AWS Lambda services that cut deployment time 49%, and delivered an AI assistant using AWS Lex and LLM integrations that improved support resolution speed 38%. I also integrated secure auth across 5+ SSO providers and reduced frontend error rates with Jest/RTL and Cypress. At Airbook.io, I developed React and Flask BI dashboards for 500+ early paid users and deployed Docker/Kubernetes microservices that reduced deploy time from 30 to 7 minutes.</motion.p>
          <motion.p variants={item}>Beyond work, I continue to explore projects that reflect my passions. One example is PumpJournal, an AI-assisted iOS fitness journal with real-time HealthKit sync and cloud backup that reached 300+ downloads in its first 2 weeks.</motion.p>
          <motion.p variants={item}>What started with a simple “Hey, Siri” has grown into a career centered on solving problems with code. For me, computer science isn’t just a discipline — it’s a way to create, to innovate, and to bring ideas to life. Whether it’s through building scalable platforms, experimenting with AI, or launching side projects, I remain driven by the same curiosity I had as a kid: the excitement of asking a question and building something intelligent enough to answer.</motion.p>
        </Longform>
      </Section>
    </FullWidth>
  )
}
