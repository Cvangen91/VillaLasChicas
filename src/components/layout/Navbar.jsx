import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import villaLogo from '../../../pictures/villalogo.png'
import arrowDown from '../../../pictures/arrowdown.png'
import arrowUp from '../../../pictures/arrowup.png'
import norwayFlag from '../../../pictures/Norgeflagg.png'
import britishFlag from '../../../pictures/English.webp'
import spainFlag from '../../../pictures/spainflag.png'

function Navbar({ texts, setLanguage, language }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false)
  const [navRevealProgress, setNavRevealProgress] = useState(0)
  const [frozenRevealProgress, setFrozenRevealProgress] = useState(null)
  const navRef = useRef(null)
  const location = useLocation()

  useEffect(() => {
    setIsMenuOpen(false)
    setIsLangDropdownOpen(false)
    setFrozenRevealProgress(null)
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
      const revealStart = Math.max(heroTop + heroHeight - waveHeight - navHeight + 18, 0)
      const revealDistance = Math.max(waveHeight + 22, 92)
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
  const isMobileMenuExpanded = isMenuOpen
  const isMenuExpanded = isMenuOpen || isLangDropdownOpen
  const effectiveReveal = isLangDropdownOpen && frozenRevealProgress !== null
    ? frozenRevealProgress
    : navRevealProgress
  const visualReveal = !isHomePage ? 1 : effectiveReveal
  const visualEase = Math.pow(visualReveal, 1.35)
  const overlayStrength = isHomePage && !isMobileMenuExpanded ? 1 - visualEase : 0
  const mixChannel = (from, to, amount) => Math.round(from + (to - from) * amount)
  const blendColor = (from, to, amount) => {
    const clamped = Math.min(Math.max(amount, 0), 1)
    return `rgb(${mixChannel(from[0], to[0], clamped)}, ${mixChannel(from[1], to[1], clamped)}, ${mixChannel(from[2], to[2], clamped)})`
  }
  const navTextColor = isMobileMenuExpanded
    ? 'var(--color-navy-dark)'
    : blendColor([248, 251, 251], [31, 41, 51], visualEase)
  const activeLinkColor = blendColor([168, 214, 221], [69, 133, 140], Math.min(0.12 + visualEase * 0.88, 1))
  const menuButtonColor = blendColor([248, 251, 251], [138, 181, 191], Math.min(visualEase * 1.05, 1))
  const languageButtonOpacity = isMenuExpanded ? 1 : 0.7 + visualEase * 0.26
  const languageButtonBorderOpacity = isMenuExpanded ? 0 : overlayStrength * 0.24
  const logoBadgeOpacity = isHomePage ? overlayStrength * 0.18 : 0
  const hoverToneAmount = Math.min(Math.max(visualEase, 0), 1)
  const hoverSurfaceRgb = [
    mixChannel(255, 69, hoverToneAmount),
    mixChannel(255, 133, hoverToneAmount),
    mixChannel(255, 140, hoverToneAmount),
  ]
  const hoverRingRgb = [
    mixChannel(255, 55, hoverToneAmount),
    mixChannel(255, 114, hoverToneAmount),
    mixChannel(255, 121, hoverToneAmount),
  ]
  const desktopHoverSurface = isMobileMenuExpanded
    ? 'rgba(69, 133, 140, 0.14)'
    : `rgba(${hoverSurfaceRgb[0]}, ${hoverSurfaceRgb[1]}, ${hoverSurfaceRgb[2]}, ${0.08 + hoverToneAmount * 0.08})`
  const desktopHoverRing = isMobileMenuExpanded
    ? 'rgba(69, 133, 140, 0.34)'
    : `rgba(${hoverRingRgb[0]}, ${hoverRingRgb[1]}, ${hoverRingRgb[2]}, ${0.2 + hoverToneAmount * 0.14})`

  const getLinkStyle = (active) => ({
    color: active ? activeLinkColor : navTextColor,
    textDecoration: 'none',
    fontWeight: active ? '700' : '500',
    textShadow: `0 4px 18px rgba(0, 0, 0, ${overlayStrength * 0.28})`,
    borderRadius: '999px',
    padding: '0.34rem 0.78rem',
    backgroundColor: active
      ? 'rgba(69, 133, 140, 0.14)'
      : 'rgba(47, 54, 64, 0.06)',
    opacity: 1,
    transform: isHomePage ? `translateY(${(1 - visualEase) * 2}px)` : 'translateY(0)',
    transition: 'color 0.22s ease, background-color 0.22s ease, box-shadow 0.22s ease, transform 0.22s ease, opacity 0.22s ease',
  })

  const mobileLinkStyle = (active) => ({
    display: 'block',
    color: active ? '#2B7C84' : 'var(--color-navy-dark)',
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
    en: { label: 'English', flag: britishFlag },
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
  const handleRouteLinkClick = (path, onComplete) => (event) => {
    if (location.pathname === path) {
      event.preventDefault()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    onComplete?.()
  }

  return (
    <nav
      ref={navRef}
      style={{
        backgroundColor: isMobileMenuExpanded
          ? 'rgba(252, 253, 252, 0.98)'
          : `rgba(255, 255, 255, ${visualEase * 0.96})`,
        padding: '1rem 1.5rem',
        position: isHomePage ? 'fixed' : 'sticky',
        top: 0,
        left: 0,
        right: 0,
        width: '100%',
        zIndex: 1100,
        boxShadow: isMobileMenuExpanded
          ? '0 8px 24px rgba(0, 0, 0, 0.10)'
          : `0 2px 18px rgba(0, 0, 0, ${visualEase * 0.08})`,
        borderBottom: isMobileMenuExpanded
          ? '1px solid rgba(47, 54, 64, 0.08)'
          : `1px solid rgba(47, 54, 64, ${visualEase * 0.08})`,
        backdropFilter: isMobileMenuExpanded ? 'blur(10px)' : `blur(${visualEase * 10}px)`,
        '--nav-hover-bg': desktopHoverSurface,
        '--nav-hover-ring': desktopHoverRing,
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
          onClick={handleRouteLinkClick('/')}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.75rem',
            fontSize: '1.4rem',
            fontWeight: '700',
            color: 'var(--color-sky)',
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
          <Link to="/" className="nav-link" style={getLinkStyle(isActive('/'))} onClick={handleRouteLinkClick('/')}>
            {texts.nav.home}
          </Link>
          <Link to="/about" className="nav-link" style={getLinkStyle(isActive('/about'))} onClick={handleRouteLinkClick('/about')}>
            {texts.nav.about}
          </Link>
          <Link to="/contact" className="nav-link" style={getLinkStyle(isActive('/contact'))} onClick={handleRouteLinkClick('/contact')}>
            {texts.nav.contact}
          </Link>

          <div style={{ position: 'relative' }}>
            <button
              className="nav-lang-btn"
              onClick={() => {
                const nextIsOpen = !isLangDropdownOpen
                setIsLangDropdownOpen(nextIsOpen)
                setFrozenRevealProgress(nextIsOpen ? navRevealProgress : null)
              }}
              style={{
                backgroundColor: `rgba(69, 133, 140, ${languageButtonOpacity})`,
                color: 'var(--color-light)',
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
                transition: 'transform 0.2s ease, box-shadow 0.2s ease, filter 0.2s ease',
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
                  backgroundColor: 'var(--color-white)',
                  borderRadius: '8px',
                  minWidth: '110px',
                  overflow: 'hidden',
                  boxShadow: '0 12px 36px rgba(0, 0, 0, 0.22), 0 2px 8px rgba(0,0,0,0.10)',
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
                    backgroundColor: language === 'no' ? 'var(--color-teal)' : 'transparent',
                    color: language === 'no' ? 'var(--color-light)' : 'var(--color-navy-dark)',
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
                    backgroundColor: language === 'en' ? 'var(--color-teal)' : 'transparent',
                    color: language === 'en' ? 'var(--color-light)' : 'var(--color-navy-dark)',
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
                    backgroundColor: language === 'es' ? 'var(--color-teal)' : 'transparent',
                    color: language === 'es' ? 'var(--color-light)' : 'var(--color-navy-dark)',
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
          <Link to="/" style={mobileLinkStyle(isActive('/'))} onClick={handleRouteLinkClick('/', () => setIsMenuOpen(false))}>
            {texts.nav.home}
          </Link>
          <Link to="/about" style={mobileLinkStyle(isActive('/about'))} onClick={handleRouteLinkClick('/about', () => setIsMenuOpen(false))}>
            {texts.nav.about}
          </Link>
          <Link to="/contact" style={mobileLinkStyle(isActive('/contact'))} onClick={handleRouteLinkClick('/contact', () => setIsMenuOpen(false))}>
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
                backgroundColor: language === 'no' ? 'var(--color-teal)' : 'var(--color-sky-tint)',
                color: language === 'no' ? 'var(--color-light)' : 'var(--color-navy-dark)',
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
                backgroundColor: language === 'en' ? 'var(--color-teal)' : 'var(--color-sky-tint)',
                color: language === 'en' ? 'var(--color-light)' : 'var(--color-navy-dark)',
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
                backgroundColor: language === 'es' ? 'var(--color-teal)' : 'var(--color-sky-tint)',
                color: language === 'es' ? 'var(--color-light)' : 'var(--color-navy-dark)',
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
        .nav-link:hover,
        .nav-link:focus-visible {
          background: var(--nav-hover-bg);
          box-shadow: inset 0 0 0 1px var(--nav-hover-ring);
          transform: translateY(-1px) scale(1.01);
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          outline: none;
        }

        .nav-lang-btn:hover,
        .nav-lang-btn:focus-visible {
          transform: translateY(-1px) scale(1.01);
          box-shadow: 0 10px 22px rgba(0, 0, 0, 0.16);
          filter: saturate(1.04);
          outline: none;
        }

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