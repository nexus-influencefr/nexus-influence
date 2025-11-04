import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import MegaMenu from './MegaMenu'
import './Header.css'

const Header = () => {
  const [activeMenu, setActiveMenu] = useState(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  const menuItems = [
    { label: 'Accueil', link: '/' },
    { label: 'Créateurs', type: 'creators' },
    { label: 'Services', type: 'services' },
    { label: 'Partenaires', type: 'partners' },
    { label: 'Blog', link: '/blog' },
    { label: 'Contact', type: 'contact' }
  ]

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo-container">
              <img 
            src="/logo.svg" 
                alt="Nexus Influence" 
            className="logo"
                onError={(e) => {
                  e.target.style.display = 'none'
              e.target.nextSibling.style.marginLeft = '0'
                }}
              />
          <span className="logo-text">Nexus Influence.</span>
          </Link>

        <nav className="nav-menu">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className="nav-link-wrapper"
              onMouseEnter={() => item.type && setActiveMenu(item.type)}
              onMouseLeave={() => setActiveMenu(null)}
              >
                <Link
                to={item.link || `/${item.type}`}
                className={`nav-link ${location.pathname === (item.link || `/${item.type}`) ? 'active' : ''}`}
                >
                  {item.label}
                </Link>
              {item.type && <MegaMenu type={item.type} isActive={activeMenu === item.type} />}
            </div>
            ))}
          </nav>

        <button 
          className="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
          >
          {isMobileMenuOpen ? '✕' : '☰'}
        </button>
          </div>

      {isMobileMenuOpen && (
        <div className="mobile-menu">
          {menuItems.map((item, index) => (
            <Link 
              key={index}
              to={item.link || `/${item.type}`}
              className="mobile-nav-link"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}

export default Header
