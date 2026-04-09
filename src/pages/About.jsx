import PageLayout from '../components/layout/PageLayout'
import './pages.css'
import './About.css'

function About({ texts, setLanguage, language }) {
  const highlights = texts.about.highlights ?? []
  const faqItems = texts.about.faqs ?? []
  const featureCards = [
    {
      title: texts.about.feature1Title,
      text: texts.about.feature1Text,
    },
    {
      title: texts.about.feature2Title,
      text: texts.about.feature2Text,
    },
    {
      title: texts.about.feature3Title,
      text: texts.about.feature3Text,
    },
  ]

  const infoCards = [
    {
      title: texts.about.locationTitle,
      text: texts.about.locationText,
    },
    {
      title: texts.about.servicesTitle,
      text: texts.about.servicesText,
    },
  ]

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
            <h1 className="page-title">{texts.about.title}</h1>
            <p className="page-intro">{texts.about.intro}</p>

            <div className="page-action-row">
              <a
                href="https://youtu.be/MT-3H6jAcFQ"
                target="_blank"
                rel="noreferrer"
                className="page-primary-link"
              >
                {texts.about.videoLabel}
              </a>
              <span className="page-pill">{texts.about.quickFact}</span>
            </div>
          </div>

          <div className="about-wave" aria-hidden="true">
            <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path
                d="M0,54 C170,104 330,10 520,44 C760,88 930,104 1200,56 L1200,120 L0,120 Z"
                fill="#F8FBFB"
              />
            </svg>
          </div>
        </section>

        <section className="page-section page-section--soft about-section about-section--features">
          <div className="page-wide">
            <div className="page-feature-grid">
              {featureCards.map((item) => (
                <article key={item.title} className="page-feature-card">
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="about-wave" aria-hidden="true">
            <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path
                d="M0,74 C160,24 320,116 515,86 C760,48 935,22 1200,66 L1200,120 L0,120 Z"
                fill="#F7F8F6"
              />
            </svg>
          </div>
        </section>

        <section className="page-section page-section--tight about-section about-section--story">
          <div className="page-wide page-story-grid">
            <div className="page-card">
              <div className="page-chip-list">
                {highlights.map((item) => (
                  <span key={item} className="page-chip">
                    {item}
                  </span>
                ))}
              </div>

              <p className="page-body-text">{texts.about.text1}</p>
              <p className="page-body-text">{texts.about.text2}</p>
              <p className="page-body-text">{texts.about.extraText}</p>
            </div>

            <div className="page-side-stack">
              {infoCards.map((item) => (
                <article key={item.title} className="page-info-card">
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="about-wave" aria-hidden="true">
            <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path
                d="M0,58 C180,110 350,14 560,42 C780,72 960,102 1200,60 L1200,120 L0,120 Z"
                fill="#FDF8F4"
              />
            </svg>
          </div>
        </section>

        <section className="page-section page-section--bottom about-section about-section--faq">
          <div className="page-wide">
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
            </div>

            <div className="page-note">
              <p>{texts.about.closing}</p>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  )
}

export default About