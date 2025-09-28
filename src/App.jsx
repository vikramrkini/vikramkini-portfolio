import { HashRouter, Routes, Route } from 'react-router-dom';
import { GlobalStyle, AppShell, PageWrap } from './styles/primitives.js';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import BackgroundFX from './components/BackgroundFX.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Projects from './pages/Projects.jsx';
import Contact from './pages/Contact.jsx';
import PumpJournalLanding from './pages/PumpJournalLanding.jsx';
import PumpJournalSupport from './pages/PumpJournalSupport.jsx';
import PumpJournalPrivacy from './pages/PumpJournalPrivacy.jsx';
import Resume from './routes/Resume.jsx';

function App() {
  return (
    <HashRouter>
      <GlobalStyle />
      <AppShell>
        <BackgroundFX />
        <Header />
        <PageWrap>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/projects/pumpjournal" element={<PumpJournalLanding />} />
            <Route path="/pumpjournal/support" element={<PumpJournalSupport />} />
            <Route path="/pumpjournal/privacy" element={<PumpJournalPrivacy />} />
            <Route path="/resume" element={<Resume />} />
          </Routes>
        </PageWrap>
        <Footer />
      </AppShell>
    </HashRouter>
  );
}

export default App;
