import { Helmet } from 'react-helmet-async'
import styled from 'styled-components'
import { Container, Section, Heading, Subtext } from '../styles/primitives.js'

const ResumeWrap = styled.div`
  margin-top: 18px;
  height: 85vh;
  min-width: 100%;
`

const FullWidth = styled(Container)`
  padding-left: 0;
  padding-right: 0;
  width: 100%;
`

const ResumeContainer = styled.div`
  width: 100%;
  margin: 18px auto 0;
  height: 80vh;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #1e2941;
  box-shadow: 0 8px 22px rgba(0,0,0,0.28);
  background: rgba(0,0,0,0.08);
`

export default function Home() {
  const pdfUrl = `${import.meta.env.BASE_URL}Resume-Vikram.pdf`
  return (
    <FullWidth as={Section}>
      <Helmet>
        <title>Portfolio — Vikram Kini</title>
        <meta name="description" content="Professional software engineer portfolio — React, Swift, and Spring Boot. View resume and experience." />
      </Helmet>
      <Heading as="h1">Building thoughtful, reliable software.</Heading>
      <Subtext>Software Engineer · React · Swift · Spring Boot</Subtext>
      <Subtext style={{ maxWidth: 900, margin: '4px auto 0' }}>
        I design and ship human‑centered products across web, iOS, and backend systems — balancing aesthetics, performance, and pragmatism.
      </Subtext>
      <ResumeContainer>
        <ResumeWrap>
          <iframe
            title="Resume PDF"
            src={`${pdfUrl}#zoom=90&toolbar=0&navpanes=0&statusbar=0`}
            width="100%"
            height="100%"
            style={{ border: 0, display: 'block' }}
          />
        </ResumeWrap>
      </ResumeContainer>
    </FullWidth>
  )
}
