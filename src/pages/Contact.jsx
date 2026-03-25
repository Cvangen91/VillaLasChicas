import PageLayout from '../components/layout/PageLayout'

function Contact({ texts, setLanguage, language }) {
  return (
    <PageLayout
      texts={texts}
      setLanguage={setLanguage}
      language={language}
    >
      <h1>{texts.contact.title}</h1>
      <p>{texts.contact.text}</p>
    </PageLayout>
  )
}

export default Contact