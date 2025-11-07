import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AnimatedSection from '../components/AnimatedSection'
import './Contact.css'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const [brochureData, setBrochureData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    type: ''
  })

  const [submitted, setSubmitted] = useState(false)
  const [showBrochureModal, setShowBrochureModal] = useState(false)
  const [brochureSubmitted, setBrochureSubmitted] = useState(false)

  useEffect(() => {
    if (showBrochureModal) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [showBrochureModal])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleBrochureChange = (e) => {
    setBrochureData({
      ...brochureData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      // Envoyer l'email via Formspree
      const response = await fetch('https://formspree.io/f/mgvpjqnv', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          _replyto: formData.email,
          _subject: `Nouveau message de ${formData.name} - ${formData.subject}`
        })
      })

      if (response.ok) {
        setSubmitted(true)
        setTimeout(() => {
          setSubmitted(false)
          setFormData({ name: '', email: '', subject: '', message: '' })
        }, 3000)
      } else {
        alert('Erreur lors de l\'envoi du message. Veuillez réessayer.')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Erreur lors de l\'envoi du message. Veuillez réessayer.')
    }
  }

  const handleBrochureSubmit = async (e) => {
    e.preventDefault()
    
    try {
      // Envoyer les informations par email
      await fetch('https://formspree.io/f/mgvpjqnv', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          firstName: brochureData.firstName,
          lastName: brochureData.lastName,
          email: brochureData.email,
          type: brochureData.type,
          _replyto: brochureData.email,
          _subject: `Demande de brochure - ${brochureData.firstName} ${brochureData.lastName} (${brochureData.type})`
        })
      })

      setBrochureSubmitted(true)
      
      // Télécharger automatiquement le PDF
      setTimeout(() => {
        const link = document.createElement('a')
        link.href = '/documents/brochure.pdf'
        link.download = 'Brochure-Nexus-Circle.pdf'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        
        // Fermer le modal après téléchargement
        setTimeout(() => {
          setShowBrochureModal(false)
          setBrochureSubmitted(false)
          setBrochureData({ firstName: '', lastName: '', email: '', type: '' })
        }, 1500)
      }, 1000)
    } catch (error) {
      console.error('Error:', error)
      alert('Erreur lors de l\'envoi. Veuillez réessayer.')
    }
  }

  return (
    <div className="contact-page">
      <section className="contact-hero">
        <div className="container">
          <AnimatedSection>
            <div className="page-header">
              <span className="section-label">Parlons Ensemble</span>
              <h1>Contact</h1>
              <div className="gold-line"></div>
              <p className="page-description">
                Une question ? Un projet ? N'hésitez pas à nous contacter
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="contact-content">
        <div className="container">
          <div className="contact-grid">
            <AnimatedSection>
              <div className="contact-info">
                <h2>Contactez-nous</h2>
                <p className="contact-intro">
                  N'hésitez pas à passer le cap et nous contacter, <strong>on ne mord pas !</strong>
                </p>

                <div className="contact-methods">
                  <a href="mailto:contact@nexuscircle.fr" className="contact-method">
                    <div className="method-icon">📧</div>
                    <div className="method-info">
                      <h4>Email</h4>
                      <p>contact@nexuscircle.fr</p>
                    </div>
                  </a>

                  <a href="tel:+33626452165" className="contact-method">
                    <div className="method-icon">📞</div>
                    <div className="method-info">
                      <h4>Téléphone</h4>
                      <p>06 26 45 21 65</p>
                    </div>
                  </a>

                  <a 
                    href="https://instagram.com/nexus__circle" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="contact-method"
                  >
                    <div className="method-icon method-icon-social">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </div>
                    <div className="method-info">
                      <h4>Instagram</h4>
                      <p>@nexus__circle</p>
                    </div>
                  </a>

                  <a 
                    href="https://www.linkedin.com/company/nexus-circle-fr" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="contact-method"
                  >
                    <div className="method-icon method-icon-social">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    </div>
                    <div className="method-info">
                      <h4>LinkedIn</h4>
                      <p>Nexus Circle</p>
                    </div>
                  </a>
                </div>

                <div className="brochure-section">
                  <h3>Téléchargez notre brochure</h3>
                  <p>Découvrez tous nos services en détail</p>
                  <button 
                    onClick={() => setShowBrochureModal(true)}
                    className="brochure-btn"
                  >
                    📄 Télécharger la brochure
                  </button>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <motion.div className="contact-form-container">
                <h2>Envoyez-nous un message</h2>
                
                {submitted ? (
                  <motion.div
                    className="success-message"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <div className="success-icon">✓</div>
                    <h3>Message envoyé !</h3>
                    <p>Nous vous répondrons dans les plus brefs délais.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="contact-form">
                    <div className="form-group">
                      <label htmlFor="name">Nom</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Votre nom"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="votre@email.com"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="subject">Sujet</label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="subject-select"
                      >
                        <option value="">Sélectionnez un sujet</option>
                        <option value="creator">Devenir créateur</option>
                        <option value="brand">Partenariat marque</option>
                        <option value="info">Demande d'information</option>
                        <option value="other">Autre</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="message">Message</label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows="6"
                        placeholder="Votre message..."
                      ></textarea>
                    </div>

                    <button type="submit" className="btn btn-primary submit-btn">
                      Envoyer le message
                    </button>
                  </form>
                )}
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {showBrochureModal && (
          <motion.div
            className="brochure-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowBrochureModal(false)}
          >
            <motion.div
              className="brochure-modal-content"
              initial={{ y: 50, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 50, opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="brochure-modal-close"
                onClick={() => setShowBrochureModal(false)}
              >
                ✕
              </button>

              {brochureSubmitted ? (
                <motion.div
                  className="brochure-success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div className="success-icon">✓</div>
                  <h3>Brochure envoyée !</h3>
                  <p>Vérifiez votre boîte email dans quelques instants.</p>
                </motion.div>
              ) : (
                <>
                  <h2>Recevoir notre brochure</h2>
                  <p className="brochure-modal-intro">
                    Remplissez ce formulaire pour recevoir notre brochure complète par email
                  </p>

                  <form onSubmit={handleBrochureSubmit} className="brochure-form">
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="firstName">Prénom</label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={brochureData.firstName}
                          onChange={handleBrochureChange}
                          required
                          placeholder="Votre prénom"
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="lastName">Nom</label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={brochureData.lastName}
                          onChange={handleBrochureChange}
                          required
                          placeholder="Votre nom"
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="brochureEmail">Email</label>
                      <input
                        type="email"
                        id="brochureEmail"
                        name="email"
                        value={brochureData.email}
                        onChange={handleBrochureChange}
                        required
                        placeholder="votre@email.com"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="brochureType">Vous êtes...</label>
                      <select
                        id="brochureType"
                        name="type"
                        value={brochureData.type}
                        onChange={handleBrochureChange}
                        required
                        className="subject-select"
                      >
                        <option value="">Sélectionnez votre profil</option>
                        <option value="creator">Créateur de contenu</option>
                        <option value="brand">Marque / Entreprise</option>
                        <option value="other">Autre</option>
                      </select>
                    </div>

                    <button type="submit" className="btn btn-primary submit-btn">
                      Recevoir la brochure
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Contact

