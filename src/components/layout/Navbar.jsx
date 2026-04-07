import { Link } from 'react-router-dom'

function Navbar({ texts, setLanguage, language }) {
  return (
    <nav style={{ display: 'flex', gap: '20px', padding: '20px' }}>
      <Link to="/">{texts.nav.home}</Link>
      <Link to="/about">{texts.nav.about}</Link>
      <Link to="/contact">{texts.nav.contact}</Link>

      <button onClick={() => setLanguage(language === 'no' ? 'en' : 'no')}>
        {texts.nav.language}
      </button>
    </nav>
  )
}

export default Navbar