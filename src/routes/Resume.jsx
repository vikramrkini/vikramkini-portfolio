import { Helmet } from 'react-helmet-async'
import styled from 'styled-components'
import { Container, Section, Heading, Subtext, LinkButton, MutedButton, Card } from '../styles/primitives.js'

const Viewer = styled(Card)`
  width: 100%;
  height: 85vh;
  padding: 0;
  overflow: hidden;
  border-radius: 14px;
`

export default function Resume() {
  const pdfUrl = `${import.meta.env.BASE_URL}Resume-Vikram.pdf`

  return (
    <Container>
      <Helmet>
        <title>Resume — Vikram Kini</title>
        <meta name="description" content="View or download Vikram Kini's resume (PDF)." />
      </Helmet>
      <Section>
        <Heading>Resume</Heading>
        <Subtext>View the PDF inline below, or use the buttons to open it in a new tab or download a copy.</Subtext>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 12, marginBottom: 16 }}>
          <LinkButton href={pdfUrl} target="_blank" rel="noopener noreferrer">Open in New Tab</LinkButton>
          <MutedButton href={pdfUrl} download>Download PDF</MutedButton>
        </div>
        <Viewer as="div" role="region" aria-label="Resume PDF viewer">
          <object data={pdfUrl} type="application/pdf" width="100%" height="100%">
            <iframe title="Resume PDF" src={pdfUrl} width="100%" height="100%" style={{ border: 0 }} />
          </object>
        </Viewer>
        <div style={{ marginTop: 10 }}>
          <a href={pdfUrl} target="_blank" rel="noopener noreferrer">Open the PDF</a>
        </div>
      </Section>
    </Container>
  )
}
