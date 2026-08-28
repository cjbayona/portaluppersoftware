import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../assets/LogoUpper.png';

const links = [
  { to: '/',           label: 'Inicio' },
  { to: '/que-hacemos', label: '¿Qué Hacemos?' },
  { to: '/productos',  label: 'Productos' },
  { to: '/clientes',   label: 'Clientes' },
  { to: '/contacto',   label: 'Contacto' },
];

export default function Navbar() {
  const [open, setOpen]       = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu on route change
  const closeMenu = () => setOpen(false);

  return (
    <header className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
      <div className="container navbar__inner">

        {/* Logo */}
        <Link to="/" className="navbar__brand" onClick={closeMenu}>
          <img src={logo} alt="Upper Software S.A.S." className="navbar__logo" />
          <span className="navbar__brand-name">Upper Software</span>
        </Link>

        {/* Desktop nav */}
        <nav className="navbar__links" aria-label="Navegación principal">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                `navbar__link${isActive ? ' navbar__link--active' : ''}`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        {/* CTA */}
        <Link to="/contacto" className="btn btn-primary navbar__cta" onClick={closeMenu}>
          Contáctenos
        </Link>

        {/* Hamburger */}
        <button
          className={`navbar__hamburger${open ? ' is-open' : ''}`}
          onClick={() => setOpen(!open)}
          aria-label="Abrir menú"
          aria-expanded={open}
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile drawer */}
      <div className={`navbar__drawer${open ? ' navbar__drawer--open' : ''}`}>
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            end={l.to === '/'}
            className={({ isActive }) =>
              `navbar__drawer-link${isActive ? ' navbar__drawer-link--active' : ''}`
            }
            onClick={closeMenu}
          >
            {l.label}
          </NavLink>
        ))}
        <Link to="/contacto" className="btn btn-primary navbar__drawer-cta" onClick={closeMenu}>
          Contáctenos
        </Link>
      </div>
    </header>
  );
}
