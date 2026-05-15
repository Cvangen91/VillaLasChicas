import { Link, useLocation } from 'react-router-dom'
import villaLogoNoText from '../../../bilder/Villalogonulltekst.png'
import './Footer.css'

function Footer({ texts }) {
  const location = useLocation()
  const footerTexts = texts?.footer ?? {
    contactTitle: 'Kontakt',
    emailLabel: 'E-post',
    phoneLabel: 'Telefon',
    linksTitle: 'Lenker',
    homeLink: 'Hjem',
    aboutLink: 'Om villaen',
    contactLink: 'Kontakt',
    location: 'Fuengirola, Malaga',
  }
  const handleRouteLinkClick = (path) => (event) => {
    if (location.pathname === path) {
      event.preventDefault()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <footer className="footer-root">
      <div className="footer-container">
        <div className="footer-brand">
          <Link to="/" className="footer-logo-link" aria-label="Villa Las Chicas home" onClick={handleRouteLinkClick('/')}>
            <img src={villaLogoNoText} alt="Villa Las Chicas logo" className="footer-logo" />
          </Link>
          <p className="footer-copyright">© 2026 Villa Las Chicas</p>
        </div>

        <div className="footer-contact">
          <p className="footer-title">{footerTexts.contactTitle}</p>
          <p className="footer-line">{footerTexts.emailLabel}: kontakt@villalaschicas.no</p>
          <p className="footer-line">{footerTexts.phoneLabel}: +47 99 99 99 99</p>
          <p className="footer-line footer-line-soft">{footerTexts.location}</p>
        </div>

        <div className="footer-links-group">
          <p className="footer-title">{footerTexts.linksTitle}</p>
          <div className="footer-links">
            <Link to="/" className="footer-link" onClick={handleRouteLinkClick('/')}>{footerTexts.homeLink}</Link>
            <Link to="/about" className="footer-link" onClick={handleRouteLinkClick('/about')}>{footerTexts.aboutLink}</Link>
            <Link to="/contact" className="footer-link" onClick={handleRouteLinkClick('/contact')}>{footerTexts.contactLink}</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer