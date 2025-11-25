import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { creatorsData } from '../data/creators'
import './CreatorsCarousel.css'

const CreatorsCarousel = () => {
  const [selectedCreator, setSelectedCreator] = useState(null)
  const [isMobile, setIsMobile] = useState(false)
  const carouselRef = useRef(null)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Pauser l'animation quand le carousel n'est pas visible
  useEffect(() => {
    if (isMobile) return // Pas d'animation sur mobile
    
    const carousel = carouselRef.current
    if (!carousel) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const track = carousel.querySelector('.carousel-track')
          if (track) {
            if (entry.isIntersecting) {
              track.style.animationPlayState = 'running'
            } else {
              track.style.animationPlayState = 'paused'
            }
          }
        })
      },
      { threshold: 0.1 }
    )

    observer.observe(carousel)

    return () => {
      observer.disconnect()
    }
  }, [isMobile])

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

  // EXACTEMENT 2 fois pour la boucle parfaite (desktop uniquement)
  const allCreators = !isMobile ? [...creatorsData, ...creatorsData] : creatorsData

  return (
    <>
      <div className="creators-carousel" ref={carouselRef}>
        <div className="carousel-track">
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
                  loading="lazy"
                  decoding="async"
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
                  loading="eager"
                  decoding="async"
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
