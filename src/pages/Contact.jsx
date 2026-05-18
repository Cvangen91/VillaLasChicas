import PageLayout from '../components/layout/PageLayout'
import './pages.css'
import './Contact.css'

function Contact({ texts, setLanguage, language }) {
  const contactEmail = 'kontakt@villalaschicas.no'
  const contactPhone = '+47 99 99 99 99'
  const validation = texts.contact.validation || {}
  const formLanguage = language === 'no' ? 'nb' : language

  const getValidationMessage = (field) => {
    if (field.validity.valueMissing) {
      return validation.required || 'Please fill out this field.'
    }

    if (field.validity.typeMismatch && field.type === 'email') {
      return validation.email || 'Please enter a valid email address.'
    }

    return ''
  }

  const handleInvalid = (event) => {
    const field = event.target
    if (typeof field.setCustomValidity !== 'function') return
    field.setCustomValidity(getValidationMessage(field))
  }

  const handleInput = (event) => {
    const field = event.target
    if (typeof field.setCustomValidity !== 'function') return
    field.setCustomValidity('')
  }

  return (
    <PageLayout
      texts={texts}
      setLanguage={setLanguage}
      language={language}
    >
      <div className="page-shell contact-shell">
        <section className="page-section page-section--bottom">
          <div className="page-wide">
            <div className="contact-top-grid">
              <div className="contact-intro contact-intro--inside">
                <h1 className="contact-intro-title">{texts.contact.title}</h1>
                <p>{texts.contact.text1}</p>
                <p>{texts.contact.text2}</p>
              </div>

              <div className="contact-top-vdivider" aria-hidden="true"></div>

              <aside className="contact-side-panel" aria-label="response information">
                <p className="contact-side-kicker">{texts.about.quickResponseTitle}</p>
                <h3>{texts.about.quickResponseHeadline}</h3>
                <p>{texts.about.quickResponseText}</p>
              </aside>
            </div>

            <div className="contact-divider contact-divider--page"></div>

            <div className="contact-head-row contact-head-row--page">
              <div className="contact-item contact-item--compact">
                <div className="contact-item-label">{texts.contact.sendMailLabel || 'Send mail'}</div>
                <a href={`mailto:${contactEmail}`} className="contact-item-value">{contactEmail}</a>
              </div>

              <div className="contact-item contact-item--compact contact-item--right">
                <div className="contact-item-label">{texts.contact.callUsLabel || 'Or call us'}</div>
                <a href={`tel:${contactPhone}`} className="contact-item-value">{contactPhone}</a>
              </div>
            </div>

            <div className="contact-form-box">
              <form
                className="contact-form"
                action={`https://formsubmit.co/${contactEmail}`}
                method="POST"
                lang={formLanguage}
              >
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_subject" value="Ny henvendelse fra Villa Las Chicas" />
                <input type="hidden" name="_template" value="table" />
                <input type="text" name="_honey" className="contact-hidden" tabIndex="-1" autoComplete="off" />

                <label className="contact-form-label" htmlFor="name">{texts.contact.nameLabel || 'Navn'}</label>
                <input id="name" name="name" className="contact-form-input" type="text" required onInvalid={handleInvalid} onInput={handleInput} />

                <label className="contact-form-label" htmlFor="email">{texts.contact.emailLabel || 'E-post'}</label>
                <input id="email" name="email" className="contact-form-input" type="email" required onInvalid={handleInvalid} onInput={handleInput} />

                <label className="contact-form-label" htmlFor="message">{texts.contact.messageLabel || 'Melding'}</label>
                <textarea id="message" name="message" className="contact-form-textarea" rows="5" required onInvalid={handleInvalid} onInput={handleInput} />

                <button type="submit" className="contact-form-button">{texts.contact.sendButton || 'Send melding'}</button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  )
}

export default Contact