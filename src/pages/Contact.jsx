import PageLayout from '../components/layout/PageLayout'

function Contact({ texts, setLanguage, language }) {
  return (
    <PageLayout
      texts={texts}
      setLanguage={setLanguage}
      language={language}
    >
      <section style={{ backgroundColor: '#F2F2F2', padding: '4rem 1.5rem' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3rem)', marginBottom: '1.5rem' }}>
            {texts.contact.title}
          </h1>

          <div
            style={{
              backgroundColor: '#45858C',
              color: '#F2F2F2',
              padding: '2rem',
              borderRadius: '16px',
              boxShadow: '0 12px 28px rgba(0, 0, 0, 0.08)',
            }}
          >
            <p style={{ fontSize: '1.1rem', lineHeight: 1.8, marginTop: 0 }}>
              {texts.contact.text1}
            </p>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.8, marginBottom: 0 }}>
              {texts.contact.text2}
            </p>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}

export default Contact