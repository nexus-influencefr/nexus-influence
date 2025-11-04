import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import AnimatedSection from '../components/AnimatedSection'
import { partnersData } from '../data/partners'
import './Partners.css'

const Partners = () => {
  const [isDragging, setIsDragging] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isManualMode, setIsManualMode] = useState(false)
  const trackRef = useRef(null)
  const startX = useRef(0)
  const scrollLeft = useRef(0)

  const handleTouchStart = (e) => {
    setIsDragging(true)
    startX.current = e.touches[0].pageX
    if (trackRef.current) {
      trackRef.current.style.animationPlayState = 'paused'
      const computedStyle = window.getComputedStyle(trackRef.current)
      const matrix = new DOMMatrix(computedStyle.transform)
      scrollLeft.current = matrix.m41
    }
  }

  const handleTouchMove = (e) => {
    if (!isDragging || !trackRef.current) return
    const x = e.touches[0].pageX
    const walk = (x - startX.current) * 1.5
    trackRef.current.style.transform = `translateX(${scrollLeft.current + walk}px)`
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
    if (trackRef.current) {
      trackRef.current.style.animationPlayState = 'running'
      trackRef.current.style.transform = ''
    }
  }

  // Gestion souris (desktop)
  const handleMouseDown = (e) => {
    setIsDragging(true)
    startX.current = e.pageX
    if (trackRef.current) {
      trackRef.current.style.animationPlayState = 'paused'
      const computedStyle = window.getComputedStyle(trackRef.current)
      const matrix = new DOMMatrix(computedStyle.transform)
      scrollLeft.current = matrix.m41
    }
  }

  const handleMouseMove = (e) => {
    if (!isDragging || !trackRef.current) return
    e.preventDefault()
    const x = e.pageX
    const walk = (x - startX.current) * 1.5
    trackRef.current.style.transform = `translateX(${scrollLeft.current + walk}px)`
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    if (trackRef.current) {
      trackRef.current.style.animationPlayState = 'running'
      trackRef.current.style.transform = ''
    }
  }

  // Navigation avec flèches (mobile)
  const handlePrev = () => {
    if (!isManualMode) {
      setIsManualMode(true)
      if (trackRef.current) {
        trackRef.current.style.animation = 'none'
      }
    }
    const newIndex = (currentIndex - 1 + partnersData.length) % partnersData.length
    setCurrentIndex(newIndex)
    if (trackRef.current) {
      // Centrer la carte : largeur écran / 2 - largeur carte / 2 - position carte
      const screenCenter = window.innerWidth / 2
      const cardCenter = 160 // 320px / 2
      const offset = screenCenter - cardCenter - (newIndex * 360)
      trackRef.current.style.transform = `translateX(${offset}px)`
    }
  }

  const handleNext = () => {
    if (!isManualMode) {
      setIsManualMode(true)
      if (trackRef.current) {
        trackRef.current.style.animation = 'none'
      }
    }
    const newIndex = (currentIndex + 1) % partnersData.length
    setCurrentIndex(newIndex)
    if (trackRef.current) {
      // Centrer la carte : largeur écran / 2 - largeur carte / 2 - position carte
      const screenCenter = window.innerWidth / 2
      const cardCenter = 160 // 320px / 2
      const offset = screenCenter - cardCenter - (newIndex * 360)
      trackRef.current.style.transform = `translateX(${offset}px)`
    }
  }

  return (
    <div className="partners-page">
      <section className="partners-hero">
        <div className="container">
          <AnimatedSection>
            <div className="page-header">
              <span className="section-label">Nos Collaborations</span>
              <h1>Partenaires</h1>
              <div className="gold-line"></div>
              <p className="page-description">
                Les marques de confiance qui collaborent avec nos créateurs
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="partners-carousel-section">
        <div className="container">
          <div 
            className="partners-slider"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {/* Flèches de navigation mobile */}
            <button className="partners-arrow partners-arrow-left" onClick={handlePrev}>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
              </svg>
            </button>
            <button className="partners-arrow partners-arrow-right" onClick={handleNext}>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
              </svg>
            </button>

            <div className={`partners-track ${isDragging ? 'dragging' : ''}`} ref={trackRef}>
              {[...partnersData, ...partnersData].map((partner, index) => {
                const content = (
                  <>
                    <div className="partner-logo">
                      <img 
                        src={partner.logo} 
                        alt={partner.name}
                        className="partner-logo-img"
                      />
                    </div>
                    <h3 className="partner-name">{partner.name}</h3>
                    <p className="partner-desc">{partner.description}</p>
                  </>
                )

                return partner.website ? (
                  <a 
                    key={index} 
                    href={partner.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="partner-item partner-item-link"
                  >
                    {content}
                  </a>
                ) : (
              <div key={index} className="partner-item">
                    {content}
                  </div>
                )
              })}
              </div>
          </div>
        </div>
      </section>

      <section className="partners-values-section dark-section">
        <div className="container">
          <AnimatedSection>
            <div className="section-header">
              <span className="section-label">Nos Engagements</span>
              <h2>Nos Valeurs</h2>
              <div className="gold-line"></div>
            </div>
          </AnimatedSection>

          <div className="values-grid">
            {[
              { 
                title: 'Liberté créative', 
                desc: 'Nous préservons votre authenticité et votre style unique dans chaque collaboration.' 
              },
              { 
                title: 'Excellence', 
                desc: 'Un souci du détail permanent pour garantir la qualité de chaque partenariat.' 
              },
              { 
                title: 'Transparence', 
                desc: 'Communication claire et honnête à chaque étape de notre collaboration.' 
              },
              { 
                title: 'Ambition', 
                desc: 'Nous croyons en vos objectifs les plus audacieux et vous aidons à les réaliser.' 
              }
            ].map((value, index) => (
              <AnimatedSection key={index} delay={index * 0.1}>
                <motion.div
                  className="value-card"
                  whileHover={{ scale: 1.05 }}
                >
                  <h4>{value.title}</h4>
                  <p>{value.desc}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Partners

