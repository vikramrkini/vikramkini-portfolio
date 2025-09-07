import { HashRouter, Routes, Route } from 'react-router-dom'
import { GlobalStyle } from './styles/primitives.js'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Projects from './pages/Projects.jsx'
import Contact from './pages/Contact.jsx'
import PumpJournalLanding from './pages/PumpJournalLanding.jsx'
import PumpJournalSupport from './pages/PumpJournalSupport.jsx'
import PumpJournalPrivacy from './pages/PumpJournalPrivacy.jsx'

function App() {
  return (
    <HashRouter>
      <GlobalStyle />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/projects/pumpjournal" element={<PumpJournalLanding />} />
        <Route path="/pumpjournal/support" element={<PumpJournalSupport />} />
        <Route path="/pumpjournal/privacy" element={<PumpJournalPrivacy />} />
      </Routes>
      <Footer />
    </HashRouter>
  )
}

export default App
