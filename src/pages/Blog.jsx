import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AnimatedSection from '../components/AnimatedSection'
import { articlesData } from '../data/articles'
import './Blog.css'

const Blog = () => {
  const [selectedArticle, setSelectedArticle] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('all')

  useEffect(() => {
    if (selectedArticle) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [selectedArticle])

  const categories = ['all', 'stats', 'conseils', 'tendances']
  
  const filteredArticles = selectedCategory === 'all' 
    ? articlesData 
    : articlesData.filter(article => article.category === selectedCategory)

  const featuredArticles = filteredArticles.filter(article => article.featured)
  const regularArticles = filteredArticles.filter(article => !article.featured)

  return (
    <div className="blog-page">
      <section className="blog-hero">
        <div className="container">
          <AnimatedSection>
            <div className="page-header">
              <span className="section-label">Actualités & Conseils</span>
              <h1>Blog</h1>
              <div className="gold-line"></div>
              <p className="page-description">
                Découvrez nos derniers articles sur le monde de l'influence
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="blog-content">
        <div className="container">
          <div className="category-filters">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`category-btn ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat === 'all' ? 'Tous' : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>

          {featuredArticles.length > 0 && (
            <div className="featured-articles">
              <h2 className="section-title">Articles à la une</h2>
              <div className="featured-grid">
                {featuredArticles.map((article, index) => (
                  <AnimatedSection key={article.id} delay={index * 0.1}>
                    <motion.article
                      className="featured-card"
                      whileHover={{ y: -5 }}
                      onClick={() => setSelectedArticle(article)}
                    >
                      <div className="featured-image">
                        <div className="article-emoji">{article.image}</div>
                      </div>
                      <div className="featured-content">
                        <div className="article-meta">
                          <span>{article.date}</span>
                          <span>{article.readTime}</span>
                        </div>
                        <h3>{article.title}</h3>
                        <p>{article.excerpt}</p>
                        <button className="read-more">Lire la suite</button>
                      </div>
                    </motion.article>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          )}

          {regularArticles.length > 0 && (
            <div className="all-articles">
              <h2 className="section-title">Tous les articles</h2>
              <div className="articles-grid">
                {regularArticles.map((article, index) => (
                  <AnimatedSection key={article.id} delay={index * 0.1}>
                    <motion.article
                      className="article-card"
                      whileHover={{ y: -5 }}
                      onClick={() => setSelectedArticle(article)}
                    >
                      <div className="article-image">
                        <div className="article-emoji">{article.image}</div>
                      </div>
                      <div className="article-content">
                        <div className="article-meta">
                          <span>{article.date}</span>
                          <span>{article.readTime}</span>
                        </div>
                        <h3>{article.title}</h3>
                        <p>{article.excerpt}</p>
                        <button className="read-link">Lire la suite →</button>
                      </div>
                    </motion.article>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <AnimatePresence>
        {selectedArticle && (
          <motion.div
            className="article-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedArticle(null)}
          >
            <motion.div
              className="article-modal-content"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="modal-close" onClick={() => setSelectedArticle(null)}>
                ✕
              </button>
              
              <div className="modal-header">
                <div className="modal-emoji">{selectedArticle.image}</div>
                <h2>{selectedArticle.title}</h2>
                <div className="article-meta">
                  <span>{selectedArticle.date}</span>
                  <span>{selectedArticle.readTime}</span>
                </div>
              </div>

              <div className="modal-body">
                {selectedArticle.content.split('\n').map((paragraph, index) => {
                  if (paragraph.startsWith('## ')) {
                    return <h2 key={index}>{paragraph.replace('## ', '')}</h2>
                  } else if (paragraph.startsWith('### ')) {
                    return <h3 key={index}>{paragraph.replace('### ', '')}</h3>
                  } else if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                    return <h4 key={index}>{paragraph.replace(/\*\*/g, '')}</h4>
                  } else if (paragraph.trim()) {
                    return <p key={index}>{paragraph}</p>
                  }
                  return null
                })}
              </div>

              {selectedArticle.instagram && (
                <div className="modal-footer">
                  <a 
                    href={selectedArticle.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                  >
                    Suivez-nous sur Instagram
                  </a>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Blog

