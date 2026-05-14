import { useState, useEffect } from 'react'
import PageLayout from '../components/layout/PageLayout'
import './pages.css'
import './About.css'

function About({ texts, setLanguage, language }) {
  const [showAllAmenities, setShowAllAmenities] = useState(false)
  
  // Scroll to hash anchor on mount and when hash changes
  useEffect(() => {
    const scrollToElement = () => {
      const hash = window.location.hash.slice(1)
      if (hash) {
        const element = document.getElementById(hash)
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }, 100)
        }
      }
    }
    
    scrollToElement()
    window.addEventListener('hashchange', scrollToElement)
    return () => window.removeEventListener('hashchange', scrollToElement)
  }, [])
  
  const faqItems = [
    ...(texts.about.faqs ?? [])
  ]
  const amenities = texts.about.amenities ?? []
  const unavailableAmenities = texts.about.unavailableAmenities ?? []

  // Featured amenities (main ones to show first)
  const featuredAmenitiesKeys = ['pool', 'kitchen', 'wifi', 'airConditioning', 'outdoorDining', 'washingMachine']
  
  const allAmenities = amenities || []
  const featuredAmenities = allAmenities.filter(item => featuredAmenitiesKeys.includes(item.key))
  const remainingAmenities = allAmenities.filter(item => !featuredAmenitiesKeys.includes(item.key))

  const amenityIconByKey = {
    kitchen: '🍽',
    wifi: '📶',
    freeParking: '🚗',
    pool: '🏊',
    tv: '📺',
    washingMachine: '🧺',
    airConditioning: '❄️',
    indoorFireplace: '🔥',
    firepit: '🔥',
    outdoorDining: '🍴',
    bbq: '🍖',
    smokeAlarm: '🚨',
    coAlarm: '⚠️',
    fireExtinguisher: '🧯',
    firstAid: '⛑️',
    hostGreets: '🤝',
    outdoorShower: '🚿',
  }

  const getAmenityIcon = (key) => amenityIconByKey[key] ?? '•'

  return (
    <PageLayout
      texts={texts}
      setLanguage={setLanguage}
      language={language}
    >
      <div className="page-shell about-shell">
        <section className="page-section about-section about-section--intro">
          <div className="page-narrow page-center">
            <p className="page-eyebrow">{texts.about.eyebrow}</p>
            <h1 className="page-title highlight-title">{texts.about.title}</h1>
            <p className="page-intro highlight-info">{texts.about.intro}</p>
          </div>

          <div className="about-wave" aria-hidden="true">
            <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path
                d="M0,54 C170,104 330,10 520,44 C760,88 930,104 1200,56 L1200,120 L0,120 Z"
                fill="#FFFFFF"
              />
            </svg>
          </div>
        </section>

        <section className="page-section page-section--bottom about-section about-section--faq">
          <div className="page-wide">
            {/* Amenities section */}
            <div className="about-amenities-card">
              <h3 className="about-amenities-title">{texts.about.amenitiesTitle}</h3>

              {/* Featured amenities (always shown) */}
              <div className="about-amenities-main">
                <div className="about-featured-amenities">
                  <div className="about-amenities-grid">
                    {featuredAmenities.map((amenity) => (
                      <div key={amenity.key} className="about-amenity-item">
                        <span className="about-amenity-icon" aria-hidden="true">{getAmenityIcon(amenity.key)}</span>
                        <div>
                          <p className="about-amenity-label">{amenity.label}</p>
                          {amenity.detail ? <p className="about-amenity-detail">{amenity.detail}</p> : null}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Show all amenities button */}
              {remainingAmenities.length > 0 ? (
                <button 
                  type="button" 
                  className="about-amenities-button"
                  onClick={() => setShowAllAmenities(!showAllAmenities)}
                >
                  {showAllAmenities 
                    ? `${texts.about.amenitiesShowLess || 'Show less'}` 
                    : `${texts.about.amenitiesShowAll || 'Show all'} ${allAmenities.length} ${texts.about.amenitiesLabel || 'amenities'}`
                  }
                </button>
              ) : null}

              {/* Expanded amenities box */}
              {showAllAmenities && remainingAmenities.length > 0 ? (
                <div className="about-amenities-expanded">
                  <div className="about-amenities-grid">
                    {remainingAmenities.map((amenity) => (
                      <div key={amenity.key} className="about-amenity-item">
                        <span className="about-amenity-icon" aria-hidden="true">{getAmenityIcon(amenity.key)}</span>
                        <div>
                          <p className="about-amenity-label">{amenity.label}</p>
                          {amenity.detail ? <p className="about-amenity-detail">{amenity.detail}</p> : null}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              {/* Not included section */}
              {unavailableAmenities.length > 0 ? (
                <div className="about-unavailable-wrap">
                  <p className="about-unavailable-title">{texts.about.amenitiesUnavailableTitle}</p>
                  <ul className="about-unavailable-list">
                    {unavailableAmenities.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>

            {/* Google Maps section */}
            <div id="about-map" className="about-map-section">
              <h3 className="about-map-title">Location</h3>
              <div className="about-map-container">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3197.639321886206!2d-4.641227!3d36.737701!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd72e3e6f3e6f3e6f%3A0x1234567890!2sFuengirola%2C%20M%C3%A1laga!5e0!3m2!1sen!2ses!4v1234567890"
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="about-map-iframe"
                  title="Villa Las Chicas Location"
                ></iframe>
              </div>
            </div>

            {/* FAQ section */}
            <div className="page-faq-header">
              <p className="page-eyebrow">FAQ</p>
              <h2 className="page-faq-title">{texts.about.faqTitle}</h2>
              <p className="page-faq-intro">{texts.about.faqIntro}</p>
            </div>

            <div className="page-faq-list">
              {faqItems.map((item) => (
                <details key={item.q} className="page-faq-item">
                  <summary className="page-faq-summary">{item.q}</summary>
                  <p className="page-faq-answer">{item.a}</p>
                </details>
              ))}
              <div className="page-faq-item page-faq-item--open page-faq-item--static">
                <div className="page-faq-summary page-faq-summary--static">{texts.about.moreInfoTitle}</div>
                <p className="page-faq-answer page-faq-answer--first">{texts.about.text1}</p>
                  <p className="page-faq-answer">{texts.about.text2}</p>
                  <p className="page-faq-answer">{texts.about.extraText}</p>
                <p className="page-faq-answer page-faq-answer--video">{texts.about.videoInfoText}</p>
                <div className="about-video-action">
                  <a
                    href="https://youtu.be/MT-3H6jAcFQ"
                    target="_blank"
                    rel="noreferrer"
                    className="page-primary-link"
                  >
                    {texts.about.videoLabel}
                  </a>
                </div>
              </div>
            </div>

          </div>
        </section>
      </div>
    </PageLayout>
  )
}

export default About