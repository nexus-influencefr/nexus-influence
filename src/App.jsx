import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { Analytics } from '@vercel/analytics/react'
import Header from './components/Header'
import Footer from './components/Footer'
import AnimatedBackground from './components/AnimatedBackground'
import Chatbot from './components/Chatbot'
import Home from './pages/Home'
import Creators from './pages/Creators'
import Services from './pages/Services'
import Partners from './pages/Partners'
import Blog from './pages/Blog'
import Contact from './pages/Contact'
import './App.css'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AnimatedBackground />
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/creators" element={<Creators />} />
            <Route path="/services" element={<Services />} />
            <Route path="/partners" element={<Partners />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
        <Chatbot />
      </div>
      <Analytics />
    </Router>
  )
}

export default App
