import { useState } from 'react'
import { Link } from 'react-router-dom'
import PageLayout from '../components/layout/PageLayout'

function Home({ texts, setLanguage, language }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const galleryColors = ['#8AB5BF', '#D9AFA0', '#45858C', '#BFD8DF']

  const scrollToContent = () => {
    document.getElementById('villa-highlights')?.scrollIntoView({ behavior: 'smooth' })
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryColors.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryColors.length) % galleryColors.length)
  }

  return (
    <PageLayout
      texts={texts}
      setLanguage={setLanguage}
      language={language}
    >
      <div>
        <section
          style={{
            backgroundColor: '#8AB5BF',
            minHeight: 'calc(100vh - 88px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            padding: '2rem',
            position: 'relative',
          }}
        >
          <div style={{ maxWidth: '860px' }}>
            <p style={{ letterSpacing: '0.2rem', textTransform: 'uppercase', marginBottom: '1rem' }}>
              Costa del Sol
            </p>
            <h1
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 4.25rem)',
                margin: '0 0 1rem',
                color: '#2F3640',
              }}
            >
              {texts.home.heroTitle}
            </h1>
            <p
              style={{
                fontSize: 'clamp(1.1rem, 2vw, 1.35rem)',
                lineHeight: 1.7,
                margin: '0 auto 2rem',
                color: '#2F3640',
              }}
            >
              {texts.home.heroSubtitle}
            </p>

            <button
              onClick={scrollToContent}
              style={{
                backgroundColor: '#2F3640',
                color: '#F2F2F2',
                border: 'none',
                padding: '0.9rem 1.4rem',
                borderRadius: '999px',
              }}
            >
              {texts.home.bookNow}
            </button>
          </div>

          <div
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              lineHeight: 0,
            }}
          >
            <svg viewBox="0 0 1200 120" preserveAspectRatio="none" style={{ width: '100%', height: '80px' }}>
              <path
                d="M0,50 C150,100 350,0 600,50 C850,100 1050,0 1200,50 L1200,120 L0,120 Z"
                fill="#F2F2F2"
              />
            </svg>
          </div>
        </section>

        <button
          onClick={scrollToContent}
          style={{
            position: 'fixed',
            right: '1.5rem',
            bottom: '1.5rem',
            backgroundColor: '#2F3640',
            color: '#8AB5BF',
            border: 'none',
            padding: '1rem 1.4rem',
            borderRadius: '999px',
            boxShadow: '0 8px 20px rgba(0, 0, 0, 0.25)',
            cursor: 'pointer',
            zIndex: 1000,
            transition: 'all 0.25s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.08)'
            e.currentTarget.style.backgroundColor = '#45858C'
            e.currentTarget.style.color = '#F2F2F2'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)'
            e.currentTarget.style.backgroundColor = '#2F3640'
            e.currentTarget.style.color = '#8AB5BF'
          }}
        >
          {texts.home.bookNow}
        </button>

        <section id="villa-highlights" style={{ backgroundColor: '#F2F2F2', padding: '5rem 1.5rem' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center', fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '2.5rem' }}>
              {texts.home.featuresTitle}
            </h2>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '1.5rem',
              }}
            >
              {[
                {
                  title: texts.home.feature1Title,
                  text: texts.home.feature1Text,
                  backgroundColor: '#D9AFA0',
                  color: '#2F3640',
                },
                {
                  title: texts.home.feature2Title,
                  text: texts.home.feature2Text,
                  backgroundColor: '#45858C',
                  color: '#F2F2F2',
                },
                {
                  title: texts.home.feature3Title,
                  text: texts.home.feature3Text,
                  backgroundColor: '#8AB5BF',
                  color: '#2F3640',
                },
              ].map((item) => (
                <div
                  key={item.title}
                  style={{
                    backgroundColor: item.backgroundColor,
                    color: item.color,
                    borderRadius: '16px',
                    padding: '2rem',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.06)',
                  }}
                >
                  <h3 style={{ marginTop: 0, fontSize: '1.35rem' }}>{item.title}</h3>
                  <p style={{ marginBottom: 0, lineHeight: 1.7 }}>{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ backgroundColor: '#2F3640', padding: '5rem 1.5rem' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2
              style={{
                textAlign: 'center',
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                marginBottom: '2rem',
                color: '#8AB5BF',
              }}
            >
              {texts.home.galleryTitle}
            </h2>

            <div style={{ maxWidth: '760px', margin: '0 auto', position: 'relative' }}>
              <div
                style={{
                  height: '360px',
                  borderRadius: '18px',
                  backgroundColor: galleryColors[currentImageIndex],
                  transition: 'background-color 0.3s ease',
                  boxShadow: '0 18px 40px rgba(0, 0, 0, 0.2)',
                }}
              />

              <button
                onClick={prevImage}
                aria-label="Forrige bilde"
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '1rem',
                  transform: 'translateY(-50%)',
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  border: 'none',
                  backgroundColor: 'rgba(47, 54, 64, 0.85)',
                  color: '#8AB5BF',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#45858C'
                  e.currentTarget.style.color = '#F2F2F2'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(47, 54, 64, 0.85)'
                  e.currentTarget.style.color = '#8AB5BF'
                }}
              >
                ‹
              </button>

              <button
                onClick={nextImage}
                aria-label="Neste bilde"
                style={{
                  position: 'absolute',
                  top: '50%',
                  right: '1rem',
                  transform: 'translateY(-50%)',
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  border: 'none',
                  backgroundColor: 'rgba(47, 54, 64, 0.85)',
                  color: '#8AB5BF',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#45858C'
                  e.currentTarget.style.color = '#F2F2F2'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(47, 54, 64, 0.85)'
                  e.currentTarget.style.color = '#8AB5BF'
                }}
              >
                ›
              </button>

              <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', marginTop: '1.2rem' }}>
                {galleryColors.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    aria-label={`Vis galleri ${index + 1}`}
                    style={{
                      width: currentImageIndex === index ? '28px' : '10px',
                      height: '10px',
                      border: 'none',
                      borderRadius: '999px',
                      backgroundColor: currentImageIndex === index ? '#8AB5BF' : '#5f7680',
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section style={{ backgroundColor: '#8AB5BF', padding: '4rem 1.5rem' }}>
          <div style={{ maxWidth: '820px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginTop: 0 }}>
              {texts.home.ctaTitle}
            </h2>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              {texts.home.ctaText}
            </p>
            <Link
              to="/contact"
              style={{
                display: 'inline-block',
                backgroundColor: '#2F3640',
                color: '#F2F2F2',
                padding: '0.9rem 1.4rem',
                borderRadius: '999px',
              }}
            >
              {texts.home.contactButton}
            </Link>
          </div>
        </section>
      </div>
    </PageLayout>
  )
}

export default Home