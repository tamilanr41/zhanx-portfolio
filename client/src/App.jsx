import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { LazyMotion, domAnimation, AnimatePresence } from 'framer-motion'
import { trackPageVisit } from './utils/tracking'
import useLenis from './hooks/useLenis'
import Navbar from './components/Navbar'
import Loader from './components/Loader'
import CookieConsent from './components/CookieConsent'
import ScrollProgress from './components/ScrollProgress'
import Home from './pages/Home'
import Projects from './pages/Projects'
import ServicesPage from './pages/ServicesPage'
import TestimonialsPage from './pages/TestimonialsPage'
import ContactPage from './pages/ContactPage'
import AiMentor from './pages/AiMentor'
import Terms from './pages/Terms'
import Privacy from './pages/Privacy'
import Skills from './pages/Skills'
import Stats from './pages/Stats'
import WelcomeModal from './components/WelcomeModal'
import CursorChain from './components/CursorChain'
import BackToTop from './components/BackToTop'
import './styles.css'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
    if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true })
  }, [pathname])
  return null
}

export default function App() {
  const [loading, setLoading] = useState(true)
  const [welcomeClosed, setWelcomeClosed] = useState(false)
  useLenis()

  useEffect(() => { trackPageVisit() }, [])

  return (
    <BrowserRouter>
      <AnimatePresence>
        {loading && <Loader onFinish={() => setLoading(false)} />}
      </AnimatePresence>

      <LazyMotion features={domAnimation}>
        <div className="film-grain" />
        <CursorChain />
        <ScrollProgress />
        <BackToTop />
        <ScrollToTop />
        <main className="md:block">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/testimonials" element={<TestimonialsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/ai-mentor" element={<AiMentor />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/stats" element={<Stats />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
      </LazyMotion>
      <CookieConsent started={welcomeClosed} />
      {!loading && <WelcomeModal onClose={() => setWelcomeClosed(true)} />}
    </BrowserRouter>
  )
}
