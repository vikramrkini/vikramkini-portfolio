import { Helmet } from 'react-helmet-async'
import styled from 'styled-components'
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
  return (
    <FullWidth>
      <Helmet>
        <title>About — Vikram Kini</title>
        <meta name="description" content="About Vikram Kini — Software Engineer focused on building clean, reliable products with React, Swift, and Spring Boot." />
      </Helmet>
      <Section>
        <Heading>About Me</Heading>
        <Portrait src={aboutMe} alt="Portrait of Vikram Kini" />
        <Longform>
          <p>My passion for technology began long before I wrote my first line of code. At the age of eleven, I was captivated by Apple’s voice assistant, Siri. The idea that a small device in my hand could understand my questions and respond intelligently felt like magic — and it sparked a curiosity that never left me. That moment planted the seed for what would become a lifelong fascination with computer science and the transformative role it plays in our daily lives.</p>
          <p>As I grew older, that curiosity evolved into a determination to understand the mechanics behind intelligent systems. During my undergraduate studies in Computer Engineering at the University of Mumbai, I dove deep into subjects like Artificial Intelligence, Machine Learning, Big Data Analytics, and Database Systems. I ranked at the very top of my department and within the top 1% of the entire university, not only mastering the theoretical foundations but also applying them through hands-on projects.</p>
          <p>One of my most meaningful projects was ACUITY, a student alertness monitoring system designed to help teachers understand engagement in online classrooms. By combining face detection, tracking algorithms, and custom metrics for facial movement, we created a tool that classified students into attentive, transcribing, or distracted states — and delivered real-time insights to instructors. I also worked on a plagiarism detection system using a Siamese Neural Network and BiLSTM models, building a pipeline that could effectively compare documents at scale. These projects taught me the art of transforming complex concepts into real, working solutions.</p>
          <p>Eager to expand my horizons, I pursued a Master’s in Computer Science at the University of Illinois Urbana-Champaign (UIUC), where I maintained a perfect 4.0 GPA. At UIUC, I explored systems, AI, and databases more deeply, while also gaining practical exposure to the kinds of large-scale challenges tackled by industry.</p>
          <p>Professionally, I’ve built software that serves thousands of users. At ISAFE Enterprises, I helped rebuild a district-wide ed-tech platform with a headless CMS architecture, designed microservices with Spring Boot and AWS, and launched the MyOK mobile app that increased user engagement by 20%. I also developed an AI-powered assistant that cut support requests by 38% by guiding educators through complex workflows in real time. At Airbook.io, I owned backend development for a BI & Analytics platform, delivering NLP pipelines, third-party integrations, and optimizations that improved efficiency and cut costs.</p>
          <p>Beyond work, I continue to explore projects that reflect my passions. One example is PumpJournal, an iOS app I designed to close the gap in fitness journaling. It leverages SwiftUI, Firebase, and Apple HealthKit to generate AI-driven workout plans, log exercises seamlessly, and sync with Apple Health for progress tracking. Projects like these let me merge technical exploration with personal interests — and push me to think creatively about how technology can make everyday life smarter.</p>
          <p>What started with a simple “Hey, Siri” has grown into a career centered on solving problems with code. For me, computer science isn’t just a discipline — it’s a way to create, to innovate, and to bring ideas to life. Whether it’s through building scalable platforms, experimenting with AI, or launching side projects, I remain driven by the same curiosity I had as a kid: the excitement of asking a question and building something intelligent enough to answer.</p>
        </Longform>
      </Section>
    </FullWidth>
  )
}
