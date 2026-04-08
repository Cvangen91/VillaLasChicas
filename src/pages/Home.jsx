import PageLayout from '../components/layout/PageLayout'
import ImageGallery from '../components/sections/ImageGallery'
import './Home.css'

function Home({ texts, setLanguage, language }) {
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

        <ImageGallery texts={texts.home} />

        <section className="home-section home-booking-section">
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