import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { creatorsData } from '../data/creators'
import './CreatorsCarousel.css'

const CreatorsCarousel = () => {
  const [selectedCreator, setSelectedCreator] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const carouselRef = useRef(null)
  const trackRef = useRef(null)
  const startX = useRef(0)
  const scrollLeft = useRef(0)

  useEffect(() => {
    if (selectedCreator) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [selectedCreator])

  // Gestion du swipe tactile
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
    const newIndex = (currentIndex - 1 + creatorsData.length) % creatorsData.length
    setCurrentIndex(newIndex)
    if (trackRef.current) {
      trackRef.current.style.animationPlayState = 'paused'
      trackRef.current.style.transform = `translateX(-${newIndex * 330}px)`
      setTimeout(() => {
        trackRef.current.style.animationPlayState = 'running'
        trackRef.current.style.transform = ''
      }, 300)
    }
  }

  const handleNext = () => {
    const newIndex = (currentIndex + 1) % creatorsData.length
    setCurrentIndex(newIndex)
    if (trackRef.current) {
      trackRef.current.style.animationPlayState = 'paused'
      trackRef.current.style.transform = `translateX(-${newIndex * 330}px)`
      setTimeout(() => {
        trackRef.current.style.animationPlayState = 'running'
        trackRef.current.style.transform = ''
      }, 300)
    }
  }

  // EXACTEMENT 2 fois pour la boucle parfaite
  const allCreators = [...creatorsData, ...creatorsData]

  return (
    <>
      <div 
        className="creators-carousel" 
        ref={carouselRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Flèches de navigation mobile */}
        <button className="carousel-arrow carousel-arrow-left" onClick={handlePrev}>
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
          </svg>
        </button>
        <button className="carousel-arrow carousel-arrow-right" onClick={handleNext}>
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
          </svg>
        </button>

        <div className={`carousel-track ${isDragging ? 'dragging' : ''}`} ref={trackRef}>
          {allCreators.map((creator, index) => (
            <div
              key={index}
              className="carousel-item"
              onClick={() => setSelectedCreator(creator)}
            >
              <div className="carousel-image">
                <img 
                  src={creator.image} 
                  alt={creator.name}
                  style={{ objectPosition: creator.imagePosition }}
                />
              </div>
              <div className="carousel-overlay">
                <h3>{creator.name}</h3>
                <p>{creator.handle}</p>
                <span className="click-text">Cliquer pour voir</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedCreator && (
          <motion.div
            className="creator-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCreator(null)}
          >
            <motion.div
              className="creator-modal-content"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="modal-close"
                onClick={() => setSelectedCreator(null)}
              >
                ✕
              </button>

              <div className="modal-image">
                <img 
                  src={selectedCreator.image} 
                  alt={selectedCreator.name}
                  style={{ objectPosition: selectedCreator.imagePosition }}
                />
              </div>

              <div className="modal-info">
                <h2>{selectedCreator.name}</h2>
                <p className="modal-handle">{selectedCreator.handle}</p>
                <p className="modal-type">{selectedCreator.type}</p>
                <p className="modal-desc">{selectedCreator.description}</p>

                <div className="modal-stats">
                  <div className="modal-stat">
                    <span className="stat-label">Abonnés</span>
                    <span className="stat-value">{selectedCreator.followers}</span>
                  </div>
                  <div className="modal-stat">
                    <span className="stat-label">Engagement</span>
                    <span className="stat-value">{selectedCreator.engagement}</span>
                  </div>
                </div>

                <a
                  href={selectedCreator.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="instagram-btn"
                >
                  Voir Instagram
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default CreatorsCarousel
