import PageLayout from '../components/layout/PageLayout'
import './pages.css'
import './Contact.css'

function Contact({ texts, setLanguage, language }) {
  return (
    <PageLayout
      texts={texts}
      setLanguage={setLanguage}
      language={language}
    >
      <div className="page-shell">
        <section className="page-section page-section--bottom">
          <div className="page-wide">
            <h1 className="page-title">{texts.contact.title}</h1>

            <div className="page-card contact-card">
              <p>{texts.contact.text1}</p>
              <p>{texts.contact.text2}</p>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  )
}

export default Contact