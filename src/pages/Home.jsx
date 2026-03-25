import PageLayout from '../components/layout/PageLayout'

function Home({ texts, setLanguage, language }) {
  return (
    <PageLayout
      texts={texts}
      setLanguage={setLanguage}
      language={language}
    >
      <h1>{texts.home.title}</h1>
      <p>{texts.home.subtitle}</p>
    </PageLayout>
  )
}

export default Home