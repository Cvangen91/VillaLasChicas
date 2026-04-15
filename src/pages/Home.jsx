import { useEffect, useRef, useState } from 'react'
import PageLayout from '../components/layout/PageLayout'
import ImageGallery from '../components/sections/ImageGallery'
import villaLogoMain from '../../bilder/Villalogomain.png'
import './Home.css'

function Home({ texts, setLanguage, language }) {
  const [isBookingVisible, setIsBookingVisible] = useState(false)
  const bookingSectionRef = useRef(null)

  const featureCards = [
    {
      title: texts.home.feature1Title,
      text: texts.home.feature1Text,
    },
    {
      title: texts.home.feature2Title,
      text: texts.home.feature2Text,
    },
    {
      title: texts.home.feature3Title,
      text: texts.home.feature3Text,
    },
  ]

  const scrollToContent = () => {
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' })
  }

  useEffect(() => {
    const section = bookingSectionRef.current
    if (!section) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsBookingVisible(entry.isIntersecting)
      },
      {
        threshold: 0.18,
      }
    )

    observer.observe(section)

    return () => observer.disconnect()
  }, [])

  return (
    <PageLayout
      texts={texts}
      setLanguage={setLanguage}
      language={language}
    >
      <div className="home-page">
        <section className="home-hero">
          <div className="home-hero-video-wrap" aria-hidden="true">
            <iframe
              className="home-hero-video"
              src="https://www.youtube.com/embed/AUY3gvKTbxc?autoplay=1&mute=1&controls=0&loop=1&playlist=AUY3gvKTbxc&playsinline=1&rel=0&modestbranding=1"
              title="Villa Las Chicas hero video"
              allow="autoplay; encrypted-media; picture-in-picture"
              referrerPolicy="strict-origin-when-cross-origin"
              tabIndex="-1"
            />
          </div>

          <div className="home-hero-overlay" />

          <div className="home-hero-content">
            <img
              src={villaLogoMain}
              alt="Villa Las Chicas logo"
              className="home-hero-logo"
            />

            <p className="home-hero-subtitle">{texts.home.heroSubtitle}</p>
          </div>

          <div className="home-hero-wave">
            <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path
                d="M0,50 C150,100 350,0 600,50 C850,100 1050,0 1200,50 L1200,120 L0,120 Z"
                fill="#FFFFFF"
              />
            </svg>
          </div>
        </section>

        <button
          className={`home-floating-book-btn ${isBookingVisible ? 'is-hidden' : ''}`}
          onClick={scrollToContent}
        >
          {texts.home.bookNow}
        </button>

        <section id="villa-highlights" className="home-section home-features-section">
          <div className="home-container">
            <h2 className="home-section-title">{texts.home.featuresTitle}</h2>

            <div className="home-features-grid">
              {featureCards.map((item) => (
                <div key={item.title} className="home-feature-card">
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="home-features-wave" aria-hidden="true">
            <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path
                d="M0,78 C160,118 300,18 470,42 C700,74 840,122 1200,58 L1200,120 L0,120 Z"
                fill="#F7F6F3"
              />
            </svg>
          </div>
        </section>

        <ImageGallery texts={texts.home} />

        <section ref={bookingSectionRef} className="home-section home-booking-section">
          <div className="home-booking-card">
            <p className="home-booking-eyebrow">{texts.home.bookingEyebrow}</p>
            <h2>{texts.home.bookingTitle}</h2>
            <p>{texts.home.bookingText}</p>

            <div className="home-booking-placeholder">{texts.home.bookingPlaceholder}</div>
          </div>
        </section>
      </div>
    </PageLayout>
  )
}

export default Home