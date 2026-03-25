import Navbar from './Navbar'
import Footer from './Footer'

function PageLayout({ children, texts, setLanguage, language }) {
  return (
    <>
      <Navbar
        texts={texts}
        setLanguage={setLanguage}
        language={language}
      />

      <main>{children}</main>

      <Footer />
    </>
  )
}

export default PageLayout