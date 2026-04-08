import { Helmet } from 'react-helmet-async'
import styled from 'styled-components'

const PageWrap = styled.div`
  max-width: 860px;
  margin: 0 auto;
  padding: clamp(120px, 12vw, 160px) clamp(24px, 6vw, 72px) clamp(80px, 8vw, 120px);
`

const SectionBlock = styled.div`
  margin-bottom: 32px;
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
  margin: 0 0 10px;
  font-family: var(--font-display);
  font-size: 18px;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: var(--text);
`

const Muted = styled.p`
  margin: 0 0 6px;
  font-family: var(--font-body);
  font-size: 15px;
  color: var(--text-muted);
  line-height: 1.75;
  font-weight: 300;
`

const PolicyList = styled.ul`
  padding-left: 20px;
  margin: 0;
  font-family: var(--font-body);
  font-size: 14px;
  color: var(--text-muted);
  line-height: 1.8;
  font-weight: 300;

  li { margin-bottom: 4px; }
`

const PolicyBody = styled.div`
  text-align: left;

  p {
    margin: 8px 0 0;
    font-family: var(--font-body);
    font-size: 14px;
    color: var(--text-muted);
    line-height: 1.8;
    font-weight: 300;
  }

  a { color: var(--violet-muted); }
`

export default function PumpJournalPrivacy() {
  return (
    <PageWrap>
      <Helmet>
        <title>PumpJournal — Privacy Policy</title>
        <meta
          name="description"
          content="PumpJournal Privacy Policy — information we collect, how we use and store it, sharing, your choices, and how to contact us."
        />
      </Helmet>

      <PolicyBody>
        <SectionBlock>
          <PageHeading>Privacy Policy</PageHeading>
          <Muted>Effective Date: July 6, 2025</Muted>
        </SectionBlock>

        <SectionBlock>
          <SectionHeading>1. Information We Collect</SectionHeading>
          <PolicyList>
            <li><strong>Provided Directly:</strong> Email, password, name, age, gender, height, weight, fitness goals, medical conditions, injuries.</li>
            <li><strong>Workout Data:</strong> Exercises, sets, reps, weights, dates, durations.</li>
            <li><strong>Measurements:</strong> Body fat %, circumferences, custom metrics.</li>
            <li><strong>Usage Data:</strong> Device type, OS, crash logs, screens visited, time spent.</li>
          </PolicyList>
        </SectionBlock>

        <SectionBlock>
          <SectionHeading>2. How We Use Your Information</SectionHeading>
          <PolicyList>
            <li>Provide and maintain core features (workout saving, plan generation).</li>
            <li>Personalize your experience (recommendations, progress).</li>
            <li>Communicate updates and promotions.</li>
            <li>Analyze usage to improve the app.</li>
          </PolicyList>
        </SectionBlock>

        <SectionBlock>
          <SectionHeading>3. Data Storage &amp; Security</SectionHeading>
          <PolicyList>
            <li><strong>Firebase Backend:</strong> Firestore, Auth, Storage with TLS and encryption at rest.</li>
            <li><strong>Access Control:</strong> Only authenticated users can access their data.</li>
            <li><strong>Protection:</strong> Regular audits and dependency updates.</li>
          </PolicyList>
        </SectionBlock>

        <SectionBlock>
          <SectionHeading>4. Sharing Your Information</SectionHeading>
          <PolicyList>
            <li>We do not sell your data.</li>
            <li>Shared only with Firebase services and to comply with legal requests.</li>
            <li>Business transfers may occur with user notification.</li>
          </PolicyList>
        </SectionBlock>

        <SectionBlock>
          <SectionHeading>5. Third-Party Services &amp; Links</SectionHeading>
          <PolicyList>
            <li>Firebase Analytics and Crashlytics for anonymous metrics.</li>
            <li>Links to external sites are not covered by this Policy.</li>
          </PolicyList>
        </SectionBlock>

        <SectionBlock>
          <SectionHeading>6. Your Choices &amp; Rights</SectionHeading>
          <PolicyList>
            <li><strong>Access &amp; Portability:</strong> Request your data anytime.</li>
            <li><strong>Correction &amp; Deletion:</strong> Edit or remove your account.</li>
            <li><strong>Opt-Out:</strong> Unsubscribe from marketing emails.</li>
          </PolicyList>
        </SectionBlock>

        <SectionBlock>
          <SectionHeading>7. Children&apos;s Privacy</SectionHeading>
          <p>Not for users under 13; we do not knowingly collect children&apos;s data.</p>
        </SectionBlock>

        <SectionBlock>
          <SectionHeading>8. Changes to This Policy</SectionHeading>
          <p>The Effective Date is shown above. We will notify users of material changes.</p>
        </SectionBlock>

        <SectionBlock>
          <SectionHeading>9. Contact Us</SectionHeading>
          <p>Email: <a href="mailto:vikramkini9@gmail.com">vikramkini9@gmail.com</a></p>
        </SectionBlock>
      </PolicyBody>
    </PageWrap>
  )
}
