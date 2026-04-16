import { useEffect, useRef, useState } from 'react'
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
  const [navRevealProgress, setNavRevealProgress] = useState(0)
  const navRef = useRef(null)
  const location = useLocation()

  useEffect(() => {
    setIsMenuOpen(false)
    setIsLangDropdownOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (location.pathname !== '/') {
      setNavRevealProgress(1)
      return undefined
    }

    let frameId = 0

    const updateReveal = () => {
      const heroSection = document.querySelector('.home-hero')
      const waveSection = document.querySelector('.home-hero-wave')

      if (!heroSection) {
        setNavRevealProgress(1)
        return
      }

      const heroTop = heroSection.offsetTop
      const heroHeight = heroSection.offsetHeight
      const navHeight = navRef.current?.offsetHeight ?? (window.innerWidth <= 768 ? 76 : 88)
      const fallbackWaveHeight = window.innerWidth <= 768 ? 68 : 80
      const waveHeight = waveSection?.offsetHeight || fallbackWaveHeight
      const revealStart = Math.max(heroTop + heroHeight - waveHeight - navHeight, 0)
      const revealDistance = Math.max(waveHeight + 28, 96)
      const revealEnd = revealStart + revealDistance
      const rawProgress = Math.min(
        Math.max((window.scrollY - revealStart) / (revealEnd - revealStart), 0),
        1
      )
      const easedProgress = rawProgress * rawProgress * (3 - 2 * rawProgress)

      setNavRevealProgress(easedProgress)
    }

    const handleScroll = () => {
      if (frameId) return

      frameId = window.requestAnimationFrame(() => {
        updateReveal()
        frameId = 0
      })
    }

    updateReveal()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)

    return () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId)
      }
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [location.pathname])

  const isActive = (path) => location.pathname === path
  const isHomePage = location.pathname === '/'
  const isMenuExpanded = isMenuOpen || isLangDropdownOpen
  const visualReveal = !isHomePage ? 1 : navRevealProgress
  const visualEase = Math.pow(visualReveal, 1.35)
  const overlayStrength = isHomePage && !isMenuExpanded ? 1 - visualEase : 0
  const mixChannel = (from, to, amount) => Math.round(from + (to - from) * amount)
  const blendColor = (from, to, amount) => {
    const clamped = Math.min(Math.max(amount, 0), 1)
    return `rgb(${mixChannel(from[0], to[0], clamped)}, ${mixChannel(from[1], to[1], clamped)}, ${mixChannel(from[2], to[2], clamped)})`
  }
  const navTextColor = isMenuExpanded
    ? '#1F2933'
    : blendColor([248, 251, 251], [31, 41, 51], visualEase)
  const activeLinkColor = blendColor([168, 214, 221], [69, 133, 140], Math.min(0.12 + visualEase * 0.88, 1))
  const menuButtonColor = blendColor([248, 251, 251], [138, 181, 191], Math.min(visualEase * 1.05, 1))
  const languageButtonOpacity = isMenuExpanded ? 1 : 0.7 + visualEase * 0.26
  const languageButtonBorderOpacity = isMenuExpanded ? 0 : overlayStrength * 0.24
  const logoBadgeOpacity = isHomePage && !isMenuExpanded ? overlayStrength * 0.18 : 0

  const getLinkStyle = (active) => ({
    color: active ? activeLinkColor : navTextColor,
    textDecoration: 'none',
    fontWeight: active ? '700' : '500',
    textShadow: `0 4px 18px rgba(0, 0, 0, ${overlayStrength * 0.28})`,
  })

  const mobileLinkStyle = (active) => ({
    display: 'block',
    color: active ? '#2B7C84' : '#1F2933',
    textDecoration: 'none',
    fontSize: '1.05rem',
    padding: '0.8rem 0.9rem',
    borderRadius: '10px',
    backgroundColor: active ? 'rgba(138, 181, 191, 0.16)' : 'transparent',
    fontWeight: active ? '700' : '500',
  })

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
  const logoHeight = '24px'

  return (
    <nav
      ref={navRef}
      style={{
        backgroundColor: isMenuExpanded
          ? 'rgba(252, 253, 252, 0.98)'
          : `rgba(255, 255, 255, ${visualEase * 0.96})`,
        padding: '1rem 1.5rem',
        position: isHomePage ? 'fixed' : 'sticky',
        top: 0,
        left: 0,
        right: 0,
        width: '100%',
        zIndex: 1100,
        boxShadow: isMenuExpanded
          ? '0 8px 24px rgba(0, 0, 0, 0.10)'
          : `0 2px 18px rgba(0, 0, 0, ${visualEase * 0.08})`,
        borderBottom: isMenuExpanded
          ? '1px solid rgba(47, 54, 64, 0.08)'
          : `1px solid rgba(47, 54, 64, ${visualEase * 0.08})`,
        backdropFilter: `blur(${visualEase * 10}px)`,
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
            justifyContent: 'center',
            gap: '0.75rem',
            fontSize: '1.4rem',
            fontWeight: '700',
            color: '#8AB5BF',
            textDecoration: 'none',
            minWidth: 'auto',
            padding: '0.45rem 0.75rem',
            borderRadius: '999px',
            backgroundColor: `rgba(15, 24, 32, ${logoBadgeOpacity})`,
            backdropFilter: 'none',
            border: `1px solid rgba(255, 255, 255, ${logoBadgeOpacity * 0.3})`,
          }}
        >
          <img
            src={villaLogo}
            alt="Villa Las Chicas logo"
            style={{
              height: logoHeight,
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
                backgroundColor: `rgba(69, 133, 140, ${languageButtonOpacity})`,
                color: '#F2F2F2',
                border: `1px solid rgba(255, 255, 255, ${languageButtonBorderOpacity})`,
                padding: '0.75rem 1.15rem',
                borderRadius: '999px',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.65rem',
                fontSize: '1.1rem',
                fontWeight: '600',
                backdropFilter: 'none',
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
          aria-label="Open menu"
          style={{
            display: 'none',
            background: `rgba(255, 255, 255, ${overlayStrength * 0.12})`,
            border: `1px solid rgba(255, 255, 255, ${overlayStrength * 0.24})`,
            color: menuButtonColor,
            fontSize: '1.5rem',
            cursor: 'pointer',
            borderRadius: '999px',
            width: '42px',
            height: '42px',
            backdropFilter: `blur(${overlayStrength * 10}px)`,
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
            margin: '0.85rem auto 0',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.35rem',
            border: '1px solid rgba(69, 133, 140, 0.16)',
            padding: '0.8rem',
            backgroundColor: 'rgba(252, 253, 252, 0.98)',
            borderRadius: '16px',
            boxShadow: '0 14px 34px rgba(0, 0, 0, 0.10)',
          }}
        >
          <Link to="/" style={mobileLinkStyle(isActive('/'))} onClick={() => setIsMenuOpen(false)}>
            {texts.nav.home}
          </Link>
          <Link to="/about" style={mobileLinkStyle(isActive('/about'))} onClick={() => setIsMenuOpen(false)}>
            {texts.nav.about}
          </Link>
          <Link to="/contact" style={mobileLinkStyle(isActive('/contact'))} onClick={() => setIsMenuOpen(false)}>
            {texts.nav.contact}
          </Link>

          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', paddingBottom: '0.35rem' }}>
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
            display: grid !important;
            place-items: center;
          }
        }
      `}</style>
    </nav>
  )
}

export default Navbar