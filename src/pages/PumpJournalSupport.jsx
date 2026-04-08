import { Helmet } from 'react-helmet-async'
import styled from 'styled-components'

const PageWrap = styled.div`
  max-width: 860px;
  margin: 0 auto;
  padding: clamp(120px, 12vw, 160px) clamp(24px, 6vw, 72px) clamp(80px, 8vw, 120px);
`

const SectionBlock = styled.div`
  margin-bottom: 40px;
`

const PageHeading = styled.h1`
  margin: 0 0 8px;
  font-family: var(--font-display);
  font-size: clamp(28px, 5vw, 42px);
  font-weight: 800;
  letter-spacing: -0.03em;
  color: var(--text);
`

const SectionHeading = styled.h2`
  margin: 0 0 8px;
  font-family: var(--font-display);
  font-size: 22px;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--text);
`

const Muted = styled.p`
  margin: 0 0 12px;
  font-family: var(--font-body);
  font-size: 15px;
  color: var(--text-muted);
  line-height: 1.75;
  font-weight: 300;

  a { color: var(--violet-muted); }
`

const FormWrap = styled.form`
  max-width: 680px;
  display: grid;
  gap: 12px;
`

const Field = styled.div`
  display: grid;
  gap: 6px;
`

const Label = styled.label`
  font-family: var(--font-body);
  font-size: 13px;
  font-weight: 500;
  color: var(--text-muted);
`

const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid var(--glass-border);
  background: var(--glass-bg);
  color: var(--text);
  font-family: var(--font-body);
  font-size: 14px;
  outline: none;

  &:focus {
    border-color: rgba(124,58,237,0.5);
    box-shadow: 0 0 0 3px rgba(124,58,237,0.15);
  }
`

const TextArea = styled.textarea`
  width: 100%;
  min-height: 140px;
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid var(--glass-border);
  background: var(--glass-bg);
  color: var(--text);
  font-family: var(--font-body);
  font-size: 14px;
  resize: vertical;
  outline: none;

  &:focus {
    border-color: rgba(124,58,237,0.5);
    box-shadow: 0 0 0 3px rgba(124,58,237,0.15);
  }
`

const Submit = styled.button`
  display: inline-flex;
  align-items: center;
  padding: 12px 26px;
  border-radius: 10px;
  background: var(--gradient-brand);
  color: #fff;
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 500;
  border: none;
  box-shadow: 0 0 24px rgba(124,58,237,0.4);
  transition: box-shadow 0.25s ease, transform 0.2s ease;

  &:hover {
    box-shadow: 0 0 36px rgba(124,58,237,0.65);
    transform: translateY(-1px);
  }
`

export default function PumpJournalSupport() {
  const FORMSPREE_ID = import.meta?.env?.VITE_FORMSPREE_ID || null
  const endpoint = FORMSPREE_ID ? `https://formspree.io/f/${FORMSPREE_ID}` : null

  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form).entries())

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
      } catch { /* fallback to mailto */ }
    }

    const to = 'vikramkini9@gmail.com'
    const subj = encodeURIComponent(`PumpJournal Support: ${data.subject || ''}`)
    const body = encodeURIComponent(
      `Name: ${data.name || ''}\nEmail: ${data.email || ''}\n\nMessage:\n${data.message || ''}`
    )
    window.location.href = `mailto:${to}?subject=${subj}&body=${body}`
  }

  return (
    <PageWrap>
      <Helmet>
        <title>PumpJournal — Support</title>
        <meta name="description" content="Get help with PumpJournal. Contact support." />
      </Helmet>

      <SectionBlock>
        <PageHeading>Support</PageHeading>
        <Muted>
          Use the form below or email{' '}
          <a href="mailto:vikramkini9@gmail.com">vikramkini9@gmail.com</a>.
        </Muted>
      </SectionBlock>

      <SectionBlock>
        <SectionHeading>Contact Us</SectionHeading>
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
            <Submit type="submit">Send Message</Submit>
            {!endpoint && (
              <span style={{ color: 'var(--text-faint)', fontSize: 13, fontFamily: 'var(--font-body)' }}>
                This will open your email app.
              </span>
            )}
          </div>
        </FormWrap>
      </SectionBlock>
    </PageWrap>
  )
}
