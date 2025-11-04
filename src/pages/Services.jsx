import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import AnimatedSection from '../components/AnimatedSection'
import './Services.css'

const Services = () => {
  const services = [
    {
      title: 'Stratégie & Audit',
      subtitle: 'Optimisation complète de votre présence digitale',
      description: 'Analyse approfondie de votre profil et définition d\'une stratégie de croissance personnalisée pour maximiser votre impact.',
      features: [
        'Audit complet de votre profil et contenu',
        'Analyse détaillée de votre audience',
        'Définition de votre positionnement unique',
        'Plan d\'action personnalisé sur 6 mois',
        'Recommandations d\'optimisation',
        'Suivi mensuel de vos performances'
      ]
    },
    {
      title: 'Media Kit Professionnel',
      subtitle: 'Votre dossier de présentation qui impressionne',
      description: 'Création d\'un media kit sur-mesure qui met en valeur vos statistiques et votre univers pour séduire les marques.',
      features: [
        'Design professionnel et moderne',
        'Présentation de vos statistiques clés',
        'Portfolio de vos meilleures collaborations',
        'Grille tarifaire claire et attractive',
        'Informations démographiques de l\'audience',
        'Formats PDF et PowerPoint'
      ]
    },
    {
      title: 'Gestion de Partenariats',
      subtitle: 'Des collaborations stratégiques et lucratives',
      description: 'Identification, négociation et gestion complète de vos partenariats avec des marques alignées à vos valeurs.',
      features: [
        'Prospection ciblée de marques pertinentes',
        'Négociation de contrats avantageux',
        'Gestion administrative complète',
        'Suivi des campagnes et livrables',
        'Reporting de performance',
        'Facturation et relances de paiement'
      ]
    },
    {
      title: 'Monétisation Avancée',
      subtitle: 'Développez des revenus durables et diversifiés',
      description: 'Stratégies de monétisation complètes pour transformer votre communauté en source de revenus récurrents.',
      features: [
        'Création de produits digitaux (ebooks, formations)',
        'Mise en place de communautés privées payantes',
        'Stratégie d\'affiliation optimisée',
        'Développement d\'offres de consulting',
        'Lancement de services personnalisés',
        'Modèles de revenus passifs'
      ]
    },
    {
      title: 'Conseil Business',
      subtitle: 'Accompagnement juridique et stratégique',
      description: 'Support complet pour structurer et pérenniser votre activité de créateur de contenu professionnel.',
      features: [
        'Conseil sur le statut juridique optimal',
        'Modèles de contrats et documents légaux',
        'Gestion financière et comptabilité',
        'Optimisation fiscale pour créateurs',
        'Protection de votre marque personnelle',
        'Accompagnement entrepreneurial'
      ]
    },
    {
      title: 'Création de Contenu',
      subtitle: 'Production de contenus impactants et professionnels',
      description: 'Support créatif pour produire des contenus de qualité qui engagent votre audience et attirent les marques.',
      features: [
        'Conseil éditorial et stratégie de contenu',
        'Idéation et planification de campagnes',
        'Calendrier éditorial personnalisé',
        'Recommandations de formats et tendances',
        'Analyse de performance du contenu',
        'Optimisation pour chaque plateforme'
      ]
    },
    {
      title: 'Création de Produits Digitaux',
      subtitle: 'Ebooks, masterclass et formations pour monétiser votre expertise',
      description: 'Développement de produits digitaux premium pour créer des revenus passifs et affirmer votre position d\'expert.',
      features: [
        'Création d\'ebooks professionnels',
        'Production de masterclass vidéo',
        'Conception de formations en ligne',
        'Templates et ressources téléchargeables',
        'Stratégie de lancement et promotion',
        'Plateforme de vente et gestion'
      ]
    }
  ]

  const process = [
    {
      number: '01',
      title: 'Découverte',
      description: 'Premier échange pour comprendre vos objectifs, votre univers et vos ambitions.'
    },
    {
      number: '02',
      title: 'Stratégie',
      description: 'Élaboration d\'un plan d\'action personnalisé adapté à votre profil et vos besoins.'
    },
    {
      number: '03',
      title: 'Exécution',
      description: 'Mise en œuvre des actions définies avec un accompagnement continu et réactif.'
    },
    {
      number: '04',
      title: 'Optimisation',
      description: 'Suivi des résultats et ajustements pour maximiser votre croissance et vos revenus.'
    }
  ]

  const values = [
    { 
      title: 'Liberté créative', 
      description: 'Nous préservons votre authenticité et votre style unique. Votre voix reste la vôtre.' 
    },
    {
      title: 'Excellence', 
      description: 'Nous visons l\'excellence dans chaque projet. Un souci du détail permanent pour votre réussite.' 
    },
    { 
      title: 'Transparence', 
      description: 'Communication claire et honnête à chaque étape. Pas de frais cachés, pas de surprises.' 
    },
    {
      title: 'Ambition', 
      description: 'Nous croyons en vos objectifs les plus audacieux et mettons tout en œuvre pour les atteindre.' 
    }
  ]

  return (
    <div className="services-page">
      <section className="services-hero">
        <div className="container">
          <AnimatedSection>
            <div className="page-header">
              <span className="section-label">Notre Expertise</span>
              <h1>Services</h1>
              <div className="gold-line"></div>
              <p className="page-description">
                Un accompagnement complet et personnalisé pour développer votre activité de créateur
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="services-list-section">
        <div className="container">
          <div className="services-grid-detailed">
            {services.map((service, index) => (
              <AnimatedSection key={index} delay={index * 0.1}>
                <motion.div
                  className="service-card-detailed"
                  whileHover={{ y: -8 }}
                >
                  <div className="service-number">{`0${index + 1}`}</div>
                  <h3>{service.title}</h3>
                  <h4 className="service-subtitle">{service.subtitle}</h4>
                  <p className="service-desc">{service.description}</p>
                  <ul className="service-features">
                    {service.features.map((feature, idx) => (
                      <li key={idx}>
                        <span className="feature-icon">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="process-section dark-section">
        <div className="container">
          <AnimatedSection>
            <div className="section-header">
              <span className="section-label">Notre Méthode</span>
              <h2>Comment nous travaillons</h2>
              <div className="gold-line"></div>
            </div>
          </AnimatedSection>

          <div className="process-grid">
            {process.map((step, index) => (
              <AnimatedSection key={index} delay={index * 0.1}>
                <motion.div
                  className="process-step"
                  whileHover={{ scale: 1.03 }}
                >
                  <div className="process-number">{step.number}</div>
                  <h4>{step.title}</h4>
                  <p>{step.description}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="values-section dark-section">
        <div className="container">
          <AnimatedSection>
            <div className="section-header">
              <span className="section-label">Notre ADN</span>
              <h2>Nos Valeurs</h2>
              <div className="gold-line"></div>
            </div>
          </AnimatedSection>

          <div className="values-grid">
            {values.map((item, index) => (
              <AnimatedSection key={index} delay={index * 0.1}>
                <motion.div
                  className="value-item"
                  whileHover={{ scale: 1.05 }}
                >
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-services-section dark-section">
        <div className="container">
          <AnimatedSection>
            <div className="cta-services-content">
              <h2>Prêt à passer au niveau supérieur ?</h2>
              <p>Discutons de votre projet et définissons ensemble la stratégie qui vous correspond</p>
              <Link to="/contact" className="btn btn-primary">
                Nous contacter
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  )
}

export default Services
