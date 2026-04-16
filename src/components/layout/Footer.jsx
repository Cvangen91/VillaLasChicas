import villaLogoNoText from '../../../bilder/Villalogonulltekst.png'
import './Footer.css'

function Footer({ texts }) {
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

  return (
    <footer className="footer-root">
      <div className="footer-container">
        <div className="footer-brand">
          <img src={villaLogoNoText} alt="Villa Las Chicas logo" className="footer-logo" />
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
            <a href="#!" className="footer-link">{footerTexts.homeLink}</a>
            <a href="#!" className="footer-link">{footerTexts.aboutLink}</a>
            <a href="#!" className="footer-link">{footerTexts.contactLink}</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer