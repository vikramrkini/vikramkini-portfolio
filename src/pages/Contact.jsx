import { Helmet } from 'react-helmet-async'
import { useState } from 'react'
import { motion } from 'framer-motion'
import styled from 'styled-components'

const ContactSection = styled.section`
  background: var(--bg-base);
  min-height: 100svh;
  padding: clamp(5rem, 10vw, 10rem) 6rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  align-items: center;

  @media (max-width: 1024px) { padding: 6rem 3rem; }
  @media (max-width: 768px)  { padding: 5rem 1.5rem; }
`

const Inner = styled(motion.div)`
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6rem;
  align-items: start;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`

/* Left column */
const ContactLeft = styled.div``

const ContactHeadline = styled.h1`
  font-family: var(--font-display);
  font-style: italic;
  font-size: clamp(2.5rem, 5vw, 4.375rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1.05;
  color: var(--text);
  margin: 0 0 2rem;

  span { color: var(--gold); }
`

const ContactEmail = styled.a`
  display: block;
  font-family: var(--font-display);
  font-size: clamp(1.25rem, 2.5vw, 1.875rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--text-muted);
  margin-bottom: 2rem;
  transition: color 500ms ease;

  &:hover { color: var(--gold); }
`

const SocialRow = styled.div`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
`

const SocialLink = styled.a`
  font-family: var(--font-body);
  font-size: 0.625rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--text-muted);
  transition: color 500ms ease;

  &:hover { color: var(--text); }
`

/* Right column — form */
const FormCard = styled.div`
  background: rgba(255, 255, 255, 0.025);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  padding: 3rem;

  @media (max-width: 480px) { padding: 2rem 1.5rem; }
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
`

const FieldWrap = styled.div`
  position: relative;
`

const FieldLabel = styled.label`
  position: absolute;
  left: 0;
  top: ${({ $active }) => $active ? '-1rem' : '0.9rem'};
  font-family: var(--font-body);
  font-size: ${({ $active }) => $active ? '0.625rem' : '0.875rem'};
  letter-spacing: ${({ $active }) => $active ? '0.2em' : '0.05em'};
  text-transform: ${({ $active }) => $active ? 'uppercase' : 'none'};
  color: ${({ $active }) => $active ? 'var(--gold)' : 'var(--text-muted)'};
  transition: all 300ms ease;
  pointer-events: none;
`

const FieldInput = styled.input`
  width: 100%;
  background: transparent;
  border: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.15);
  color: var(--text);
  font-family: var(--font-body);
  font-size: 1rem;
  padding: 0.75rem 0;
  outline: none;
  transition: border-color 300ms ease;

  &:focus { border-color: var(--gold); }
`

const FieldTextarea = styled.textarea`
  width: 100%;
  background: transparent;
  border: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.15);
  color: var(--text);
  font-family: var(--font-body);
  font-size: 1rem;
  padding: 0.75rem 0;
  outline: none;
  resize: none;
  min-height: 100px;
  transition: border-color 300ms ease;

  &:focus { border-color: var(--gold); }
`

const SubmitBtn = styled.button`
  width: 100%;
  padding: 1.5rem;
  background: var(--gold);
  color: #0a0a0a;
  font-family: var(--font-body);
  font-size: 0.625rem;
  font-weight: 700;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  border: none;
  border-radius: 3px;
  transition: opacity 500ms ease;

  &:hover { opacity: 0.85; }
  &:disabled { opacity: 0.5; }
`

const SuccessMsg = styled.p`
  font-family: var(--font-body);
  font-size: 0.875rem;
  color: var(--gold);
  text-align: center;
  margin: 0;
`

function FloatingField({ id, label, type = 'text', textarea = false, value, onChange }) {
  const active = value.length > 0

  return (
    <FieldWrap>
      <FieldLabel htmlFor={id} $active={active}>{label}</FieldLabel>
      {textarea ? (
        <FieldTextarea id={id} value={value} onChange={onChange} rows={4} />
      ) : (
        <FieldInput id={id} type={type} value={value} onChange={onChange} />
      )}
    </FieldWrap>
  )
}

const ease = [0.25, 0.46, 0.45, 0.94]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease } },
}

export default function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    // mailto fallback — no backend required
    const to = 'vrkini23@gmail.com'
    const subj = encodeURIComponent(`Portfolio message from ${name}`)
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)
    window.location.href = `mailto:${to}?subject=${subj}&body=${body}`
    setTimeout(() => { setSent(true); setSending(false) }, 500)
  }

  return (
    <>
      <Helmet>
        <title>Contact — Vikram Kini</title>
        <meta name="description" content="Get in touch with Vikram Kini." />
      </Helmet>

      <ContactSection>
        <Inner
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <ContactLeft>
            <motion.div variants={itemVariants}>
              <ContactHeadline>
                Let&apos;s build something <span>enduring.</span>
              </ContactHeadline>
            </motion.div>

            <motion.div variants={itemVariants}>
              <ContactEmail href="mailto:vrkini23@gmail.com">
                vrkini23@gmail.com
              </ContactEmail>
            </motion.div>

            <motion.div variants={itemVariants}>
              <SocialRow>
                <SocialLink href="https://linkedin.com/in/vikramkini" target="_blank" rel="noopener noreferrer">
                  LinkedIn ↗
                </SocialLink>
                <SocialLink href="https://github.com/vikramrkini" target="_blank" rel="noopener noreferrer">
                  GitHub ↗
                </SocialLink>
              </SocialRow>
            </motion.div>
          </ContactLeft>

          <motion.div variants={itemVariants}>
            <FormCard>
              {sent ? (
                <SuccessMsg>Opening your mail app — thanks for reaching out!</SuccessMsg>
              ) : (
                <Form onSubmit={handleSubmit}>
                  <FloatingField
                    id="name"
                    label="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <FloatingField
                    id="email"
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <FloatingField
                    id="message"
                    label="Message"
                    textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <SubmitBtn type="submit" disabled={sending}>
                    {sending ? 'Opening mail app…' : 'Send Message'}
                  </SubmitBtn>
                </Form>
              )}
            </FormCard>
          </motion.div>
        </Inner>
      </ContactSection>
    </>
  )
}
