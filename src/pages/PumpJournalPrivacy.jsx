import { Helmet } from 'react-helmet-async'
import styled from 'styled-components'
import { Container, Section, Heading, Subtext } from '../styles/primitives.js'

const PolicyBody = styled.div`
  max-width: 820px;
  margin: 0 auto;
  text-align: left;
  p { margin: 8px 0 0; }
`

export default function PumpJournalPrivacy() {
  return (
    <Container>
      <Helmet>
        <title>PumpJournal — Privacy Policy</title>
        <meta
          name="description"
          content="PumpJournal Privacy Policy — information we collect, how we use and store it, sharing, your choices, and how to contact us."
        />
      </Helmet>
      <PolicyBody>
        <Section>
          <Heading>Privacy Policy</Heading>
          <Subtext>Effective Date: July 6, 2025</Subtext>
        </Section>

        <Section>
          <Heading as="h2">1. Information We Collect</Heading>
          <ul>
            <li>
              <strong>Provided Directly:</strong> Email, password, name, age, gender,
              height, weight, fitness goals, medical conditions, injuries.
            </li>
            <li>
              <strong>Workout Data:</strong> Exercises, sets, reps, weights, dates,
              durations.
            </li>
            <li>
              <strong>Measurements:</strong> Body fat %, circumferences, custom metrics.
            </li>
            <li>
              <strong>Usage Data:</strong> Device type, OS, crash logs, screens visited,
              time spent.
            </li>
          </ul>
        </Section>

        <Section>
          <Heading as="h2">2. How We Use Your Information</Heading>
          <ul>
            <li>Provide and maintain core features (workout saving, plan generation).</li>
            <li>Personalize your experience (recommendations, progress).</li>
            <li>Communicate updates and promotions.</li>
            <li>Analyze usage to improve the app.</li>
          </ul>
        </Section>

        <Section>
          <Heading as="h2">3. Data Storage & Security</Heading>
          <ul>
            <li>
              <strong>Firebase Backend:</strong> Firestore, Auth, Storage with TLS and
              encryption at rest.
            </li>
            <li>
              <strong>Access Control:</strong> Only authenticated users can access their
              data.
            </li>
            <li>
              <strong>Protection:</strong> Regular audits and dependency updates.
            </li>
          </ul>
        </Section>

        <Section>
          <Heading as="h2">4. Sharing Your Information</Heading>
          <ul>
            <li>We do not sell your data.</li>
            <li>Shared only with Firebase services and to comply with legal requests.</li>
            <li>Business transfers may occur with user notification.</li>
          </ul>
        </Section>

        <Section>
          <Heading as="h2">5. Third-Party Services & Links</Heading>
          <ul>
            <li>Firebase Analytics and Crashlytics for anonymous metrics.</li>
            <li>Links to external sites are not covered by this Policy.</li>
          </ul>
        </Section>

        <Section>
          <Heading as="h2">6. Your Choices & Rights</Heading>
          <ul>
            <li>
              <strong>Access &amp; Portability:</strong> Request your data anytime.
            </li>
            <li>
              <strong>Correction &amp; Deletion:</strong> Edit or remove your account.
            </li>
            <li>
              <strong>Opt-Out:</strong> Unsubscribe from marketing emails.
            </li>
          </ul>
        </Section>

        <Section>
          <Heading as="h2">7. Children’s Privacy</Heading>
          <p>
            Not for users under 13; we do not knowingly collect children’s data.
          </p>
        </Section>

        <Section>
          <Heading as="h2">8. Changes to This Policy</Heading>
          <p>
            The Effective Date is shown above. We will notify users of material
            changes.
          </p>
        </Section>

        <Section>
          <Heading as="h2">9. Contact Us</Heading>
          <p>
            Email: <a href="mailto:vikramkini9@gmail.com">vikramkini9@gmail.com</a>
          </p>
        </Section>
      </PolicyBody>
    </Container>
  )
}
