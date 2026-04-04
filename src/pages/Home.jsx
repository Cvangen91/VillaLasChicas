import { useState } from 'react'
import PageLayout from '../components/layout/PageLayout'
import './Home.css'

function Home({ texts, setLanguage, language }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const gallerySlides = [0, 1, 2, 3]

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
    document.getElementById('villa-highlights')?.scrollIntoView({ behavior: 'smooth' })
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % gallerySlides.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + gallerySlides.length) % gallerySlides.length)
  }

  return (
    <PageLayout
      texts={texts}
      setLanguage={setLanguage}
      language={language}
    >
      <div className="home-page">
        <section className="home-hero">
          <div className="home-hero-overlay" />

          <div className="home-hero-content">
            <img
              src="/villa-logo.svg"
              alt="Villa Las Chicas logo"
              className="home-hero-logo"
            />

            <h1 className="home-hero-title">{texts.home.heroTitle}</h1>

            <p className="home-hero-subtitle">{texts.home.heroSubtitle}</p>

            <div className="home-hero-tags">
              {(texts.home.heroTags ?? []).map((tag) => (
                <span key={tag} className="home-hero-tag">
                  {tag}
                </span>
              ))}
            </div>
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

        <button className="home-floating-book-btn" onClick={scrollToContent}>
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
                fill="#9FBFC7"
              />
            </svg>
          </div>
        </section>

        <section className="home-section home-gallery-section">
          <div className="home-gallery-wrap">
            <h2 className="home-section-title home-gallery-title">{texts.home.galleryTitle}</h2>

            <div className="home-gallery-frame">
              <div className="home-gallery-image" />

              <button
                className="home-gallery-nav home-gallery-nav--prev"
                onClick={prevImage}
                aria-label="Forrige bilde"
              >
                ‹
              </button>

              <button
                className="home-gallery-nav home-gallery-nav--next"
                onClick={nextImage}
                aria-label="Neste bilde"
              >
                ›
              </button>

              <div className="home-gallery-dots">
                {gallerySlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    aria-label={`Vis galleri ${index + 1}`}
                    className={`home-gallery-dot ${currentImageIndex === index ? 'is-active' : ''}`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="home-gallery-wave-bottom" aria-hidden="true">
            <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path
                d="M0,72 C160,18 320,118 520,82 C760,40 930,22 1200,68 L1200,120 L0,120 Z"
                fill="#FFF8F3"
              />
            </svg>
          </div>
        </section>

        <section className="home-section home-booking-section">
          <div className="home-booking-card">
            <p className="home-booking-eyebrow">Booking</p>
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