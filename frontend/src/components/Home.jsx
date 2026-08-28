import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Home.css';

export default function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get('/api/quienes-somos').then((r) => setData(r.data)).catch(() => {});
  }, []);

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="hero">
        <div className="hero__overlay" />
        <div className="container hero__content">
          <span className="hero__badge">Más de 10 años de experiencia</span>
          <h1 className="hero__title">
            Soluciones de Software<br />
            <span className="hero__title--accent">para Colombia</span>
          </h1>
          <p className="hero__subtitle">
            Desarrollamos productos y servicios de software de calidad que permiten
            a nuestros clientes optimizar sus procesos y crecer con confianza.
          </p>
          <div className="hero__actions">
            <Link to="/productos" className="btn btn-accent">Ver productos</Link>
            <Link to="/contacto" className="btn btn-outline hero__btn-outline">Contáctenos</Link>
          </div>
        </div>
        <div className="hero__wave">
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none">
            <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#f9fafb" />
          </svg>
        </div>
      </section>

      {/* ── Quiénes Somos ────────────────────────────────────────────────── */}
      <section className="section section-alt" id="quienes-somos">
        <div className="container">
          <div className="quienes__grid">
            <div className="quienes__text">
              <div className="section-header">
                <h2 className="section-title">{data?.titulo ?? '¿Quiénes Somos?'}</h2>
                <div className="divider" />
                <p className="section-subtitle">{data?.contenido}</p>
              </div>
              <div className="quienes__stats">
                <div className="stat">
                  <span className="stat__number">+10</span>
                  <span className="stat__label">Años de experiencia</span>
                </div>
                <div className="stat">
                  <span className="stat__number">+20</span>
                  <span className="stat__label">Clientes satisfechos</span>
                </div>
                <div className="stat">
                  <span className="stat__number">100%</span>
                  <span className="stat__label">Normativa colombiana</span>
                </div>
              </div>
            </div>
            <div className="quienes__visual">
              <div className="quienes__icon-grid">
                <div className="icon-card"><span>🏢</span><p>Empresa colombiana</p></div>
                <div className="icon-card"><span>⚡</span><p>Alta calidad</p></div>
                <div className="icon-card"><span>🤝</span><p>Compromiso</p></div>
                <div className="icon-card"><span>🔄</span><p>Mejora continua</p></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA rápido ───────────────────────────────────────────────────── */}
      <section className="cta-strip">
        <div className="container cta-strip__inner">
          <div>
            <h3 className="cta-strip__title">¿Listo para optimizar sus procesos?</h3>
            <p className="cta-strip__sub">Conózcanos más y descubra cómo podemos ayudarle.</p>
          </div>
          <div className="cta-strip__actions">
            <Link to="/que-hacemos" className="btn btn-primary">¿Qué hacemos?</Link>
            <Link to="/clientes" className="btn btn-outline cta-strip__outline">Nuestros clientes</Link>
          </div>
        </div>
      </section>
    </>
  );
}
