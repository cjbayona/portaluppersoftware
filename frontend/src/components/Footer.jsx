import { Link } from 'react-router-dom';
import logo from '../assets/LogoUpper.png';
import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__inner">

        {/* Columna 1 – Marca */}
        <div className="footer__col footer__col--brand">
          <Link to="/" className="footer__brand">
            <img src={logo} alt="Upper Software S.A.S." className="footer__logo" />
            <span className="footer__brand-name">Upper Software S.A.S.</span>
          </Link>
          <p className="footer__desc">
            Compañía colombiana con más de 10 años de experiencia desarrollando
            soluciones de software de calidad para empresas del país.
          </p>
        </div>

        {/* Columna 2 – Navegación */}
        <div className="footer__col">
          <h4 className="footer__heading">Navegación</h4>
          <ul className="footer__list">
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/que-hacemos">¿Qué Hacemos?</Link></li>
            <li><Link to="/productos">Productos</Link></li>
            <li><Link to="/clientes">Clientes</Link></li>
            <li><Link to="/contacto">Contacto</Link></li>
          </ul>
        </div>

        {/* Columna 3 – Productos */}
        <div className="footer__col">
          <h4 className="footer__heading">Productos</h4>
          <ul className="footer__list">
            <li><Link to="/productos">NominaSIC</Link></li>
            <li><Link to="/productos">MyCont</Link></li>
            <li><Link to="/productos">Fábrica de Software</Link></li>
          </ul>
        </div>

        {/* Columna 4 – Contacto */}
        <div className="footer__col">
          <h4 className="footer__heading">Contacto</h4>
          <ul className="footer__contact">
            <li>
              <span className="footer__contact-icon">📍</span>
              <span>Carrera 100 #140 A 89, Bogotá D.C.</span>
            </li>
            <li>
              <span className="footer__contact-icon">📞</span>
              <a href="tel:3203385405">320-3385405</a>
            </li>
            <li>
              <span className="footer__contact-icon">✉️</span>
              <a href="mailto:uppersoftware.colombia@gmail.com">
                uppersoftware.colombia@gmail.com
              </a>
            </li>
            <li>
              <span className="footer__contact-icon">🌐</span>
              <a href="https://www.uppersoftware.co" target="_blank" rel="noopener noreferrer">
                www.uppersoftware.co
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p>© {year} Upper Software S.A.S. Todos los derechos reservados.</p>
          <p>Bogotá, Colombia 🇨🇴</p>
        </div>
      </div>
    </footer>
  );
}
