import { Helmet } from 'react-helmet-async'
import styled from 'styled-components'
import { Container, Section, Heading, Subtext, LinkButton } from '../styles/primitives.js'

const FormWrap = styled.form`
  max-width: 680px;
  margin: 0 auto;
  text-align: left;
  display: grid;
  gap: 12px;
`

const Field = styled.div`
  display: grid;
  gap: 6px;
`

const Label = styled.label`
  font-weight: 600;
  color: var(--text);
`

const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid #223152;
  background: #0f1726;
  color: var(--text);
  outline: none;
  &:focus { border-color: var(--primary); box-shadow: 0 0 0 3px rgba(90,162,255,0.2); }
`

const TextArea = styled.textarea`
  width: 100%;
  min-height: 140px;
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid #223152;
  background: #0f1726;
  color: var(--text);
  resize: vertical;
  outline: none;
  &:focus { border-color: var(--primary); box-shadow: 0 0 0 3px rgba(90,162,255,0.2); }
`

const Submit = styled(LinkButton).attrs({ as: 'button', type: 'submit' })`
  cursor: pointer;
`

export default function PumpJournalSupport() {
  const FORMSPREE_ID = import.meta?.env?.VITE_FORMSPREE_ID || null
  const endpoint = FORMSPREE_ID ? `https://formspree.io/f/${FORMSPREE_ID}` : null

  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form).entries())

    // If configured, send via Formspree
    if (endpoint) {
      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...data, _subject: `PumpJournal Support: ${data.subject || ''}` })
        })
        if (res.ok) {
          alert('Thanks! Your message was sent.')
          form.reset()
          return
        }
      } catch (_) {}
    }

    // Fallback: open mail client with prefilled message
    const to = 'vikramkini9@gmail.com'
    const subj = encodeURIComponent(`PumpJournal Support: ${data.subject || ''}`)
    const body = encodeURIComponent(
      `Name: ${data.name || ''}\nEmail: ${data.email || ''}\n\nMessage:\n${data.message || ''}`
    )
    window.location.href = `mailto:${to}?subject=${subj}&body=${body}`
  }

  return (
    <Container>
      <Helmet>
        <title>PumpJournal — Support</title>
        <meta name="description" content="Get help with PumpJournal. Contact support and browse FAQs." />
      </Helmet>
      <Section>
        <Heading>Support</Heading>
        <Subtext>Use the form below or email <a href="mailto:vikramkini9@gmail.com">vikramkini9@gmail.com</a>.</Subtext>
      </Section>

      <Section>
        <Heading as="h2">Contact Us</Heading>
        <FormWrap onSubmit={handleSubmit}>
          <Field>
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" type="text" placeholder="Your name" autoComplete="name" required />
          </Field>
          <Field>
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" placeholder="you@example.com" autoComplete="email" required />
          </Field>
          <Field>
            <Label htmlFor="subject">Subject</Label>
            <Input id="subject" name="subject" type="text" placeholder="How can we help?" required />
          </Field>
          <Field>
            <Label htmlFor="message">Message</Label>
            <TextArea id="message" name="message" placeholder="Write your message..." required />
          </Field>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <Submit>Send Message</Submit>
            {!endpoint && (
              <span style={{ color: 'var(--muted)', fontSize: 13 }}>
                This will open your email app to send.
              </span>
            )}
          </div>
        </FormWrap>
      </Section>

      { /* FAQ section removed per request */ }
    </Container>
  )
}
