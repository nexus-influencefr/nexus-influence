import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { creatorsData } from '../data/creators'
import './CreatorsCarousel.css'

const CreatorsCarousel = () => {
  const [selectedCreator, setSelectedCreator] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isHorizontalSwipe, setIsHorizontalSwipe] = useState(false)
  const carouselRef = useRef(null)
  const trackRef = useRef(null)
  const startX = useRef(0)
  const startY = useRef(0)
  const scrollLeft = useRef(0)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (selectedCreator) {
      // Bloquer complètement le scroll
      const scrollY = window.scrollY
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = '100%'
      document.body.style.overflow = 'hidden'
      
      return () => {
        // Restaurer le scroll
        document.body.style.position = ''
        document.body.style.top = ''
        document.body.style.width = ''
        document.body.style.overflow = ''
        window.scrollTo(0, scrollY)
      }
    }
  }, [selectedCreator])

  // Gestion tactile (mobile) - détecte la direction
  const handleTouchStart = (e) => {
    if (isMobile) {
      startX.current = e.touches[0].pageX
      startY.current = e.touches[0].pageY
      setIsHorizontalSwipe(false)
    }
  }

  const handleTouchMove = (e) => {
    if (!isMobile) return
    
    const currentX = e.touches[0].pageX
    const currentY = e.touches[0].pageY
    const deltaX = Math.abs(currentX - startX.current)
    const deltaY = Math.abs(currentY - startY.current)

    // Si on n'a pas encore déterminé la direction et que le mouvement est significatif
    if (!isHorizontalSwipe && (deltaX > 10 || deltaY > 10)) {
      // Si le mouvement horizontal est plus important que le vertical
      if (deltaX > deltaY) {
        setIsHorizontalSwipe(true)
        setIsDragging(true)
        e.preventDefault() // Empêche le scroll vertical seulement pour swipe horizontal
      } else {
        // Mouvement vertical - on laisse le scroll normal
        return
      }
    }

    // Si c'est un swipe horizontal, on gère le carrousel
    if (isHorizontalSwipe && trackRef.current) {
      e.preventDefault()
      const walk = (currentX - startX.current) * 1.5
      trackRef.current.style.transform = `translateX(${walk}px)`
    }
  }

  const handleTouchEnd = () => {
    if (isMobile) {
      if (isHorizontalSwipe && trackRef.current) {
        // Retour à la position initiale ou snap
        trackRef.current.style.transform = ''
      }
      setIsDragging(false)
      setIsHorizontalSwipe(false)
    }
  }

  // Gestion souris (desktop uniquement)
  const handleMouseDown = (e) => {
    if (!isMobile) {
      setIsDragging(true)
      startX.current = e.pageX
      if (trackRef.current) {
        trackRef.current.style.animationPlayState = 'paused'
        const computedStyle = window.getComputedStyle(trackRef.current)
        const matrix = new DOMMatrix(computedStyle.transform)
        scrollLeft.current = matrix.m41
      }
    }
  }

  const handleMouseMove = (e) => {
    if (!isDragging || !trackRef.current || isMobile) return
    e.preventDefault()
    const x = e.pageX
    const walk = (x - startX.current) * 1.5
    trackRef.current.style.transform = `translateX(${scrollLeft.current + walk}px)`
  }

  const handleMouseUp = () => {
    if (!isMobile) {
      setIsDragging(false)
      if (trackRef.current) {
        trackRef.current.style.animationPlayState = 'running'
        trackRef.current.style.transform = ''
      }
    }
  }

  // EXACTEMENT 2 fois pour la boucle parfaite (desktop uniquement)
  const allCreators = !isMobile ? [...creatorsData, ...creatorsData] : creatorsData

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
        
        {/* Indicateurs visuels */}
        <div className="carousel-indicators">
          {creatorsData.map((_, index) => (
            <div key={index} className="carousel-dot"></div>
          ))}
        </div>
      </div>
      
      {/* Texte indicatif mobile - en dehors du carrousel */}
      {isMobile && (
        <div className="carousel-hint-container">
          <span className="carousel-hint-text">Swipe pour voir plus →</span>
        </div>
      )}

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
                  <Link to="/contact" className="modal-stat modal-stat-clickable" onClick={() => setSelectedCreator(null)}>
                    <span className="stat-label">Engagement</span>
                    <span className="stat-value">{selectedCreator.engagement}</span>
                  </Link>
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
