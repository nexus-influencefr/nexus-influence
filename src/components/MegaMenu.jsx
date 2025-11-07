import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { creatorsData } from '../data/creators'
import { partnersData } from '../data/partners'
import './MegaMenu.css'

const MegaMenu = ({ type, isActive }) => {
  const services = [
    { title: 'Stratégie & Audit', description: 'Analyse complète de votre profil et définition de votre stratégie de croissance' },
    { title: 'Media Kit', description: 'Création de votre dossier de présentation professionnel pour séduire les marques' },
    { title: 'Gestion de Partenariats', description: 'Identification, négociation et gestion de vos collaborations avec les marques' },
    { title: 'Monétisation', description: 'Développement de revenus durables via votre communauté et vos contenus' },
    { title: 'Produits Digitaux', description: 'Création d\'ebooks, masterclass et formations pour monétiser votre expertise' }
  ]

  if (type === 'creators') {
    return (
      <AnimatePresence>
        {isActive && (
      <motion.div
        className="mega-menu"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
      >
            <div className="mega-menu-content">
          <h3 className="mega-menu-title">Nos Créateurs</h3>
          <div className="creators-grid-menu">
                {creatorsData.map((creator, index) => (
                  <Link 
                key={index}
                    to="/creators"
                className="creator-item-menu"
              >
                    <div className="creator-avatar-menu">
                  <img 
                    src={creator.image} 
                    alt={creator.name}
                        style={{ objectPosition: creator.imagePosition }}
                    onError={(e) => {
                      e.target.style.display = 'none'
                    }}
                  />
                </div>
                    <div className="creator-info-menu">
                  <div className="creator-name-menu">{creator.name}</div>
                      <div className="creator-handle-menu">{creator.handle}</div>
                      <div className="creator-type-menu">{creator.type}</div>
                </div>
                  </Link>
            ))}
          </div>
          <Link to="/creators" className="mega-menu-link">
            Voir tous nos créateurs →
          </Link>
        </div>
      </motion.div>
        )}
      </AnimatePresence>
    )
  }

  if (type === 'services') {
    return (
      <AnimatePresence>
        {isActive && (
      <motion.div
        className="mega-menu"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
      >
        <div className="mega-menu-content services-menu">
          <h3 className="mega-menu-title">Nos Services</h3>
          <div className="services-grid-menu">
            {services.map((service, index) => (
                  <Link
                key={index}
                    to="/services"
                className="service-item-menu"
              >
                <div className="service-info-menu">
                  <div className="service-title-menu">{service.title}</div>
                  <div className="service-desc-menu">{service.description}</div>
                </div>
                  </Link>
            ))}
          </div>
          <Link to="/services" className="mega-menu-link">
            Découvrir tous nos services →
          </Link>
        </div>
      </motion.div>
        )}
      </AnimatePresence>
    )
  }

  if (type === 'partners') {
    return (
      <AnimatePresence>
        {isActive && (
      <motion.div
        className="mega-menu mega-menu-partners"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
      >
        <div className="mega-menu-content partners-menu">
          <h3 className="mega-menu-title">Ils nous font confiance</h3>
              <div className="partners-simple-grid">
                <div className="partners-scroll-track">
                  {[...partnersData, ...partnersData].map((partner, index) => {
                    const logo = (
                      <img 
                        src={partner.logo} 
                        alt={partner.name}
                        className="partner-logo-img"
                      />
                    )

                    return partner.website ? (
                      <a
                        key={index}
                        href={partner.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="partner-logo-item-menu"
                      >
                        {logo}
                      </a>
                    ) : (
                      <div
                        key={index}
                        className="partner-logo-item-menu"
                      >
                        {logo}
                </div>
                    )
                  })}
            </div>
          </div>
          <Link to="/partners" className="mega-menu-link">
            Voir tous nos partenaires →
          </Link>
        </div>
      </motion.div>
        )}
      </AnimatePresence>
    )
  }

  if (type === 'contact') {
    return (
      <AnimatePresence>
        {isActive && (
      <motion.div
        className="mega-menu mega-menu-contact"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
      >
        <div className="mega-menu-content contact-menu">
          <h3 className="mega-menu-title">Une question ?</h3>
          <p className="contact-text">
            N'hésitez pas à passer le cap et nous contacter, <strong>on ne mord pas !</strong>
          </p>
          <div className="contact-quick">
                <a href="mailto:contact@nexuscircle.fr" className="contact-quick-item">
              📧 <span>contact@nexuscircle.fr</span>
                </a>
                <a href="tel:+33626452165" className="contact-quick-item">
              📞 <span>06 26 45 21 65</span>
                </a>
          </div>
          <Link to="/contact" className="mega-menu-link">
            Nous contacter →
          </Link>
        </div>
      </motion.div>
        )}
      </AnimatePresence>
    )
  }

  return null
}

export default MegaMenu

