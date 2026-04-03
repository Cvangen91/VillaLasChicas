import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

function Navbar({ texts, setLanguage, language }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false)
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  const getLinkStyle = (active) => ({
    color: active ? '#8AB5BF' : '#F2F2F2',
    textDecoration: 'none',
    fontWeight: active ? '700' : '500',
    transition: 'color 0.2s ease',
  })

  const mobileLinkStyle = {
    color: '#F2F2F2',
    textDecoration: 'none',
    fontSize: '1.05rem',
    padding: '0.3rem 0',
  }

  return (
    <nav
      style={{
        backgroundColor: '#2F3640',
        padding: '1rem 1.5rem',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.12)',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem',
        }}
      >
        <Link
          to="/"
          style={{
            fontSize: '1.4rem',
            fontWeight: '700',
            color: '#8AB5BF',
            textDecoration: 'none',
          }}
        >
          Villa Las Chicas
        </Link>

        <div
          className="desktop-menu"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
          }}
        >
          <Link to="/" style={getLinkStyle(isActive('/'))}>
            {texts.nav.home}
          </Link>
          <Link to="/about" style={getLinkStyle(isActive('/about'))}>
            {texts.nav.about}
          </Link>
          <Link to="/contact" style={getLinkStyle(isActive('/contact'))}>
            {texts.nav.contact}
          </Link>

          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
              style={{
                backgroundColor: '#45858C',
                color: '#F2F2F2',
                border: 'none',
                padding: '0.55rem 0.9rem',
                borderRadius: '999px',
                cursor: 'pointer',
              }}
            >
              {language.toUpperCase()} ▼
            </button>

            {isLangDropdownOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 0.5rem)',
                  right: 0,
                  backgroundColor: '#2F3640',
                  borderRadius: '8px',
                  minWidth: '110px',
                  overflow: 'hidden',
                  boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
                }}
              >
                <button
                  onClick={() => {
                    setLanguage('no')
                    setIsLangDropdownOpen(false)
                  }}
                  style={{
                    width: '100%',
                    border: 'none',
                    padding: '0.7rem 1rem',
                    textAlign: 'left',
                    backgroundColor: language === 'no' ? '#45858C' : 'transparent',
                    color: '#F2F2F2',
                    cursor: 'pointer',
                  }}
                >
                  Norsk
                </button>
                <button
                  onClick={() => {
                    setLanguage('en')
                    setIsLangDropdownOpen(false)
                  }}
                  style={{
                    width: '100%',
                    border: 'none',
                    padding: '0.7rem 1rem',
                    textAlign: 'left',
                    backgroundColor: language === 'en' ? '#45858C' : 'transparent',
                    color: '#F2F2F2',
                    cursor: 'pointer',
                  }}
                >
                  English
                </button>
              </div>
            )}
          </div>
        </div>

        <button
          className="mobile-menu-btn"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          style={{
            display: 'none',
            background: 'transparent',
            border: 'none',
            color: '#8AB5BF',
            fontSize: '1.5rem',
            cursor: 'pointer',
          }}
        >
          ☰
        </button>
      </div>

      {isMenuOpen && (
        <div
          className="mobile-menu"
          style={{
            maxWidth: '1200px',
            margin: '1rem auto 0',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.8rem',
            borderTop: '1px solid #45858C',
            paddingTop: '1rem',
          }}
        >
          <Link to="/" style={mobileLinkStyle} onClick={() => setIsMenuOpen(false)}>
            {texts.nav.home}
          </Link>
          <Link to="/about" style={mobileLinkStyle} onClick={() => setIsMenuOpen(false)}>
            {texts.nav.about}
          </Link>
          <Link to="/contact" style={mobileLinkStyle} onClick={() => setIsMenuOpen(false)}>
            {texts.nav.contact}
          </Link>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={() => {
                setLanguage('no')
                setIsMenuOpen(false)
              }}
              style={{
                flex: 1,
                border: 'none',
                borderRadius: '8px',
                backgroundColor: language === 'no' ? '#45858C' : '#3a424d',
                color: '#F2F2F2',
                padding: '0.65rem 0.9rem',
              }}
            >
              Norsk
            </button>
            <button
              onClick={() => {
                setLanguage('en')
                setIsMenuOpen(false)
              }}
              style={{
                flex: 1,
                border: 'none',
                borderRadius: '8px',
                backgroundColor: language === 'en' ? '#45858C' : '#3a424d',
                color: '#F2F2F2',
                padding: '0.65rem 0.9rem',
              }}
            >
              English
            </button>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-menu {
            display: none !important;
          }

          .mobile-menu-btn {
            display: block !important;
          }
        }
      `}</style>
    </nav>
  )
}

export default Navbar