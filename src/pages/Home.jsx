import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import AnimatedSection from '../components/AnimatedSection'
import CreatorsCarousel from '../components/CreatorsCarousel'
import './Home.css'

const AnimatedCounter = ({ value, duration = 1500 }) => {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          
          // Gérer les plages (ex: "8-15%")
          if (value.includes('-') && !value.startsWith('-') && !value.startsWith('+')) {
            const parts = value.split('-')
            const endValue = parseInt(parts[1].replace(/[^0-9]/g, ''))
            const increment = endValue / (duration / 16)
            let current = 0
            
            const timer = setInterval(() => {
              current += increment
              if (current >= endValue) {
                setCount(endValue)
                clearInterval(timer)
              } else {
                setCount(Math.floor(current))
              }
            }, 16)
            
            return () => clearInterval(timer)
          } else {
            // Valeurs normales
            const numericValue = parseInt(value.replace(/[^0-9]/g, ''))
            const increment = numericValue / (duration / 16)
            let current = 0
            
            const timer = setInterval(() => {
              current += increment
              if (current >= numericValue) {
                setCount(numericValue)
                clearInterval(timer)
              } else {
                setCount(Math.floor(current))
              }
            }, 16)
            
            return () => clearInterval(timer)
          }
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [value, duration, hasAnimated])

  const formatValue = (num) => {
    const originalValue = value
    
    // Gérer les plages
    if (originalValue.includes('-') && !originalValue.startsWith('-') && !originalValue.startsWith('+')) {
      const parts = originalValue.split('-')
      const startNum = parts[0]
      return `${startNum}-${num}%`
    }
    
    if (originalValue.startsWith('+')) return `+${num}%`
    if (originalValue.includes('%')) return `${num}%`
    return `${num}+`
  }

  return <span ref={ref}>{formatValue(count)}</span>
}

const Home = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [showPlayButton, setShowPlayButton] = useState(true)
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.75) {
            video.play()
            setIsPlaying(true)
          } else {
            video.pause()
            setIsPlaying(false)
            setShowPlayButton(true)
          }
        })
      },
      { threshold: [0.75] }
    )

    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  const handlePlayClick = () => {
    const video = videoRef.current
    if (video) {
      video.play()
      setIsPlaying(true)
      setTimeout(() => setShowPlayButton(false), 1000)
    }
  }

  const handleVideoClick = () => {
    const video = videoRef.current
    if (video) {
      if (video.paused) {
        video.play()
        setIsPlaying(true)
      } else {
        video.pause()
        setIsPlaying(false)
        setShowPlayButton(true)
      }
    }
  }

  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="container">
          <AnimatedSection>
            <div className="hero-content">
              <div className="hero-brand">Nexus Influence</div>
              <h1>Valorisez votre talent</h1>
              <p className="hero-subtitle">
                L'agence qui accompagne les créateurs de contenu vers le succès
              </p>
              <div className="hero-buttons">
                <Link to="/contact" className="btn btn-primary">
                  Nous rejoindre
                </Link>
                <Link to="/creators" className="btn btn-outline">
                  Nos créateurs
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="carousel-section dark-section">
        <div className="container">
          <div className="carousel-layout">
            <div className="carousel-left">
              <AnimatedSection>
                <span className="section-label">Notre Équipe</span>
                <h2 className="carousel-title">Nos Créateurs</h2>
                <div className="gold-line"></div>
                <p className="carousel-description">
                  Découvrez les talents que nous accompagnons dans leur développement et leur réussite.
                </p>
                <Link to="/creators" className="btn btn-outline">
                  Voir tous nos créateurs
                </Link>
              </AnimatedSection>
            </div>
            <div className="carousel-right">
              <CreatorsCarousel />
            </div>
          </div>
        </div>
      </section>

      <section className="values-section dark-section">
        <div className="container">
          <AnimatedSection>
            <div className="section-header">
              <span className="section-label">Notre ADN</span>
              <h2>Ce qui nous différencie</h2>
              <div className="gold-line"></div>
            </div>
          </AnimatedSection>

          <div className="values-grid">
            {[
              { icon: '🎨', title: 'Liberté créative', desc: 'Nous préservons votre authenticité et votre style unique', color: '#FF6B9D' },
              { icon: '⭐', title: 'Excellence', desc: 'Un souci du détail permanent dans chaque projet', color: '#FFD700' },
              { icon: '🤝', title: 'Transparence', desc: 'Communication claire et honnête à chaque étape', color: '#4ECDC4' },
              { icon: '🚀', title: 'Ambition', desc: 'Nous croyons en vos objectifs les plus audacieux', color: '#95E1D3' },
              { icon: '👤', title: 'Accompagnement personnel', desc: 'Chacun de nos créateurs bénéficie d\'un suivi individuel et personnalisé', color: '#9B59B6' },
              { icon: '🎯', title: 'Spécialistes micro-influenceurs', desc: 'Nous sommes spécialisés dans l\'accompagnement des micro-créateurs à fort potentiel', color: '#3498DB' }
            ].map((value, index) => (
              <AnimatedSection key={index} delay={index * 0.1}>
                <motion.div
                  className={`value-card value-card-${index + 1}`}
                  whileHover={{ scale: 1.05, rotate: index % 2 === 0 ? 2 : -2 }}
                  style={{ '--value-color': value.color }}
                >
                  <div className="value-icon">{value.icon}</div>
                  <h4>{value.title}</h4>
                  <p>{value.desc}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="services-preview-section dark-section">
        <div className="container">
          <AnimatedSection>
            <div className="section-header">
              <span className="section-label">Notre Expertise</span>
              <h2>Services</h2>
              <div className="gold-line"></div>
            </div>
          </AnimatedSection>

          <div className="services-grid">
            {[
              { 
                title: 'Stratégie & Audit', 
                desc: 'Analyse complète de votre profil et définition de votre stratégie de croissance personnalisée',
                color: '#4A90E2'
              },
              { 
                title: 'Media Kit', 
                desc: 'Création de votre dossier de présentation professionnel pour séduire les marques',
                color: '#9B59B6'
              },
              { 
                title: 'Gestion de Partenariats', 
                desc: 'Identification, négociation et gestion de vos collaborations avec les marques',
                color: '#E74C3C'
              },
              { 
                title: 'Monétisation', 
                desc: 'Développement de revenus durables via votre communauté et vos contenus',
                color: '#2ECC71'
              },
              { 
                title: 'Produits Digitaux', 
                desc: 'Création d\'ebooks, masterclass et formations pour monétiser votre expertise',
                color: '#F39C12'
              }
            ].map((service, index) => (
              <AnimatedSection key={index} delay={index * 0.1}>
                <motion.div
                  className="service-card"
                  whileHover={{ y: -8, rotate: index % 2 === 0 ? 1 : -1 }}
                  style={{ '--service-color': service.color }}
                >
                  <div className="service-number-home">{`0${index + 1}`}</div>
                  <h4>{service.title}</h4>
                  <p>{service.desc}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={0.4}>
            <div className="services-cta">
              <Link to="/services" className="btn btn-primary">
                Découvrir tous nos services
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="stats-section light-section">
        <div className="container">
          <AnimatedSection>
            <h2 className="section-title">Des résultats qui parlent</h2>
          </AnimatedSection>

          <div className="stats-container">
            <div className="stats-left">
              {[
                { value: '+42%', label: 'Partenariats long terme en 2024', color: '#2196F3', animate: true },
                { value: '8-15%', label: 'Engagement des micro-créateurs', color: '#4CAF50', animate: false },
                { value: '71%', label: 'Des créateurs gagnent <500€/mois', color: '#FF5722', animate: true }
              ].map((stat, index) => (
                <AnimatedSection key={index} delay={index * 0.1}>
                  <motion.div
                    className="stat-box"
                    whileHover={{ y: -5, scale: 1.02 }}
                    style={{ '--stat-color': stat.color }}
                  >
                    <div className="stat-value">
                      {stat.animate ? <AnimatedCounter value={stat.value} duration={2000} /> : stat.value}
                    </div>
                    <div className="stat-label">{stat.label}</div>
                  </motion.div>
                </AnimatedSection>
              ))}
            </div>

            <div className="stats-right">
              <div className="video-container">
                <video 
                  ref={videoRef}
                  className="stats-video" 
                  loop 
                  playsInline
                  onClick={handleVideoClick}
                >
                  <source src="/videos/august.mp4" type="video/mp4" />
                </video>
                {showPlayButton && !isPlaying && (
                  <button className="play-button" onClick={handlePlayClick}>
                    ▶
                  </button>
                )}
                <a 
                  href="https://www.instagram.com/outdoorgingerchannel/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="video-instagram-btn"
                  onClick={(e) => e.stopPropagation()}
                >
                  Voir sur Instagram
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about-section dark-section">
        <div className="container">
          <AnimatedSection>
            <div className="section-header">
              <span className="section-label">À Propos</span>
              <h2>Qui sommes-nous ?</h2>
              <div className="gold-line"></div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="about-content">
              <p className="about-text-main">
                Nexus Influence est née d'une conviction : chaque créateur de contenu mérite un accompagnement professionnel pour transformer sa passion en carrière durable.
              </p>
              <p className="about-text-main">
                Fondée par <strong>Pierre O'Neill</strong> et <strong>Vasco Preun</strong>, deux jeunes entrepreneurs passionnés par l'univers digital, notre agence redéfinit les standards de l'accompagnement des créateurs.
              </p>
              <p className="about-text-main">
                Nous croyons en une approche humaine, transparente et ambitieuse. Notre mission ? Vous aider à construire un personal brand authentique, développer des partenariats stratégiques et maximiser vos revenus tout en préservant votre liberté créative.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="cta-section dark-section">
        <div className="container">
          <AnimatedSection>
            <div className="cta-content">
              <h2>Prêt à valoriser votre talent ?</h2>
              <p>Rejoignez les créateurs qui ont choisi Nexus Influence</p>
              <div className="cta-buttons">
                <Link to="/contact" className="btn btn-primary">
                  Nous contacter
                </Link>
                <Link to="/creators" className="btn btn-outline">
                  Voir nos créateurs
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}

export default Home
