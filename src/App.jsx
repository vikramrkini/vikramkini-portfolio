import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import { GlobalStyle, AppShell, PageWrap } from './styles/primitives.js'
import Cursor from './components/Cursor.jsx'
import Nav from './components/Nav.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Work from './pages/Work.jsx'
import Contact from './pages/Contact.jsx'
import PumpJournalLanding from './pages/PumpJournalLanding.jsx'
import PumpJournalSupport from './pages/PumpJournalSupport.jsx'
import PumpJournalPrivacy from './pages/PumpJournalPrivacy.jsx'

function App() {
  return (
    <HashRouter>
      <GlobalStyle />
      <Cursor />
      <AppShell>
        <Nav />
        <PageWrap>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/work" element={<Work />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/projects/pumpjournal" element={<PumpJournalLanding />} />
            <Route path="/pumpjournal/support" element={<PumpJournalSupport />} />
            <Route path="/pumpjournal/privacy" element={<PumpJournalPrivacy />} />
            {/* Legacy redirects */}
            <Route path="/projects" element={<Navigate to="/work" replace />} />
            <Route path="/about" element={<Navigate to="/" replace />} />
            <Route path="/resume" element={<Navigate to="/" replace />} />
          </Routes>
        </PageWrap>
        <Footer />
      </AppShell>
    </HashRouter>
  )
}

export default App
