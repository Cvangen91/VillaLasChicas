import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import villaLogo from '../../../bilder/villalogo.png'
import arrowDown from '../../../bilder/arrowdown.png'
import arrowUp from '../../../bilder/arrowup.png'
import norwayFlag from '../../../bilder/Norgeflagg.png'
import englishFlag from '../../../bilder/england.png'
import spainFlag from '../../../bilder/spainflag.png'

function Navbar({ texts, setLanguage, language }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false)
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  const getLinkStyle = (active) => ({
    color: active ? '#8AB5BF' : '#1F2933',
    textDecoration: 'none',
    fontWeight: active ? '700' : '500',
    textShadow: active ? '0 0 14px rgba(138, 181, 191, 0.5)' : 'none',
    transition: 'color 0.2s ease, text-shadow 0.2s ease',
  })

  const mobileLinkStyle = {
    color: '#1F2933',
    textDecoration: 'none',
    fontSize: '1.05rem',
    padding: '0.3rem 0',
  }

  const languageArrow = isLangDropdownOpen ? arrowUp : arrowDown
  const languageOptions = {
    no: { label: 'Norsk', flag: norwayFlag },
    en: { label: 'English', flag: englishFlag },
    es: { label: 'Español', flag: spainFlag },
  }
  const activeLanguage = languageOptions[language] ?? languageOptions.en
  const flagStyle = {
    width: '22px',
    height: '16px',
    objectFit: 'cover',
    borderRadius: '2px',
    display: 'inline-block',
    verticalAlign: 'middle',
  }

  return (
    <nav
      style={{
        backgroundColor: '#FFFFFF',
        padding: '1rem 1.5rem',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.08)',
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
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            fontSize: '1.4rem',
            fontWeight: '700',
            color: '#8AB5BF',
            textDecoration: 'none',
          }}
        >
          <img
            src={villaLogo}
            alt="Villa Las Chicas logo"
            style={{
              height: '24px',
              width: 'auto',
              display: 'block',
              filter: 'brightness(1.02)',
            }}
          />
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
                padding: '0.75rem 1.15rem',
                borderRadius: '999px',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.65rem',
                fontSize: '1.1rem',
                fontWeight: '600',
              }}
            >
              <img src={activeLanguage.flag} alt="" style={flagStyle} />
              <span>{activeLanguage.label}</span>
              <img
                src={languageArrow}
                alt=""
                style={{
                  width: '12px',
                  height: '12px',
                  objectFit: 'contain',
                  filter: 'brightness(0) invert(1)',
                }}
              />
            </button>

            {isLangDropdownOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 0.5rem)',
                  right: 0,
                  backgroundColor: '#FFFFFF',
                  borderRadius: '8px',
                  minWidth: '110px',
                  overflow: 'hidden',
                  boxShadow: '0 8px 20px rgba(0, 0, 0, 0.12)',
                  border: '1px solid rgba(47, 54, 64, 0.08)',
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
                    color: language === 'no' ? '#F2F2F2' : '#1F2933',
                    cursor: 'pointer',
                  }}
                >
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                    <img src={languageOptions.no.flag} alt="" style={flagStyle} />
                    <span>{languageOptions.no.label}</span>
                  </span>
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
                    color: language === 'en' ? '#F2F2F2' : '#1F2933',
                    cursor: 'pointer',
                  }}
                >
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                    <img src={languageOptions.en.flag} alt="" style={flagStyle} />
                    <span>{languageOptions.en.label}</span>
                  </span>
                </button>
                <button
                  onClick={() => {
                    setLanguage('es')
                    setIsLangDropdownOpen(false)
                  }}
                  style={{
                    width: '100%',
                    border: 'none',
                    padding: '0.7rem 1rem',
                    textAlign: 'left',
                    backgroundColor: language === 'es' ? '#45858C' : 'transparent',
                    color: language === 'es' ? '#F2F2F2' : '#1F2933',
                    cursor: 'pointer',
                  }}
                >
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                    <img src={languageOptions.es.flag} alt="" style={flagStyle} />
                    <span>{languageOptions.es.label}</span>
                  </span>
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
            backgroundColor: '#FFFFFF',
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

          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button
              onClick={() => {
                setLanguage('no')
                setIsMenuOpen(false)
              }}
              style={{
                flex: 1,
                border: 'none',
                borderRadius: '8px',
                backgroundColor: language === 'no' ? '#45858C' : '#EEF3F5',
                color: language === 'no' ? '#F2F2F2' : '#1F2933',
                padding: '0.65rem 0.9rem',
              }}
            >
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                <img src={languageOptions.no.flag} alt="" style={flagStyle} />
                <span>{languageOptions.no.label}</span>
              </span>
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
                backgroundColor: language === 'en' ? '#45858C' : '#EEF3F5',
                color: language === 'en' ? '#F2F2F2' : '#1F2933',
                padding: '0.65rem 0.9rem',
              }}
            >
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                <img src={languageOptions.en.flag} alt="" style={flagStyle} />
                <span>{languageOptions.en.label}</span>
              </span>
            </button>
            <button
              onClick={() => {
                setLanguage('es')
                setIsMenuOpen(false)
              }}
              style={{
                flex: 1,
                border: 'none',
                borderRadius: '8px',
                backgroundColor: language === 'es' ? '#45858C' : '#EEF3F5',
                color: language === 'es' ? '#F2F2F2' : '#1F2933',
                padding: '0.65rem 0.9rem',
              }}
            >
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                <img src={languageOptions.es.flag} alt="" style={flagStyle} />
                <span>{languageOptions.es.label}</span>
              </span>
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