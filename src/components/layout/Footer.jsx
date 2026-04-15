import villaLogoNoText from '../../../bilder/Villalogonulltekst.png'
import './Footer.css'

function Footer() {
  return (
    <footer className="footer-root">
      <div className="footer-container">
        <div className="footer-brand">
          <img src={villaLogoNoText} alt="Villa Las Chicas logo" className="footer-logo" />
          <p className="footer-copyright">© 2026 Villa Las Chicas</p>
        </div>

        <div className="footer-contact">
          <p className="footer-title">Kontakt</p>
          <p className="footer-line">E-post: kontakt@villalaschicas.no</p>
          <p className="footer-line">Telefon: +47 99 99 99 99</p>
          <p className="footer-line footer-line-soft">Fuengirola, Malaga</p>
        </div>

        <div className="footer-links-group">
          <p className="footer-title">Lenker</p>
          <div className="footer-links">
            <a href="#!" className="footer-link">Hjem (lenke)</a>
            <a href="#!" className="footer-link">Om villaen (lenke)</a>
            <a href="#!" className="footer-link">Facebook (lenke)</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer