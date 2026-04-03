import Navbar from './Navbar'
import Footer from './Footer'

function PageLayout({ children, texts, setLanguage, language }) {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#F2F2F2',
      }}
    >
      <Navbar
        texts={texts}
        setLanguage={setLanguage}
        language={language}
      />

      <main style={{ flex: 1 }}>{children}</main>

      <Footer />
    </div>
  )
}

export default PageLayout