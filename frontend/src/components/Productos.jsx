import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import './Productos.css';

export default function Productos() {
  const [productos, setProductos] = useState(null);
  const [precios, setPrecios] = useState(null);
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    api.get('/api/productos').then((r) => setProductos(r.data)).catch(() => {});
    api.get('/api/precios').then((r) => setPrecios(r.data)).catch(() => {});
  }, []);

  const toggleExpand = (id) =>
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <>
      {/* ── Page header ─────────────────────────────────────────────────── */}
      <div className="page-header">
        <div className="container">
          <h1 className="page-header__title">{productos?.titulo ?? 'Nuestros Productos y Servicios'}</h1>
          <p className="page-header__sub">
            {productos?.descripcion ?? 'Soluciones que cumplen con toda la normativa colombiana vigente.'}
          </p>
        </div>
      </div>

      {/* ── Productos ───────────────────────────────────────────────────── */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Productos</h2>
            <div className="divider" />
            <p className="section-subtitle">Software estándar listo para usar en su empresa.</p>
          </div>

          <div className="prod__grid">
            {productos?.productos?.map((p) => {
              const isOpen = !!expanded[p.id];
              const preview = p.caracteristicas?.slice(0, 4) ?? [];
              const rest    = p.caracteristicas?.slice(4)    ?? [];

              return (
                <div key={p.id} className="card prod-card">
                  {/* Cabecera */}
                  <div className="prod-card__header">
                    <div className="prod-card__icon">{p.icono}</div>
                    <div>
                      <h3 className="prod-card__name">{p.nombre}</h3>
                      <p className="prod-card__desc">{p.descripcion}</p>
                    </div>
                  </div>

                  {/* Características */}
                  {p.caracteristicas?.length > 0 && (
                    <div className="prod-card__features-wrap">
                      <p className="prod-card__features-title">Características:</p>
                      <ul className="prod-card__features">
                        {preview.map((c, i) => (
                          <li key={i}>
                            <span className="check">✓</span>
                            <span>{c}</span>
                          </li>
                        ))}
                        {isOpen && rest.map((c, i) => (
                          <li key={`r${i}`}>
                            <span className="check">✓</span>
                            <span>{c}</span>
                          </li>
                        ))}
                      </ul>
                      {rest.length > 0 && (
                        <button
                          className="prod-card__toggle"
                          onClick={() => toggleExpand(p.id)}
                          aria-expanded={isOpen}
                        >
                          {isOpen
                            ? '▲ Ver menos'
                            : `▼ Ver ${rest.length} características más`}
                        </button>
                      )}
                    </div>
                  )}

                  <Link to="/contacto" className="btn btn-primary prod-card__cta">
                    Solicitar información
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Servicios ───────────────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Servicios</h2>
            <div className="divider" />
            <p className="section-subtitle">Desarrollo a la medida para cada necesidad.</p>
          </div>
          <div className="serv__grid">
            {productos?.servicios?.map((s) => (
              <div key={s.id} className="card serv-card">
                <div className="serv-card__icon">{s.icono}</div>
                <div className="serv-card__body">
                  <h3 className="serv-card__name">{s.nombre}</h3>
                  <p className="serv-card__desc">{s.descripcion}</p>
                  <Link to="/contacto" className="btn btn-outline">Cotizar</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Precios ─────────────────────────────────────────────────────── */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header section-header--center">
            <h2 className="section-title">{precios?.titulo ?? 'Precios'}</h2>
            <div className="divider divider--center" />
            <p className="section-subtitle">{precios?.nota}</p>
          </div>
          <div className="precios__grid">
            {precios?.planes?.map((plan) => (
              <div key={plan.id} className="card precio-card">
                <div className="precio-card__header">
                  <h3 className="precio-card__nombre">{plan.producto}</h3>
                  <p className="precio-card__desc">{plan.descripcion}</p>
                </div>
                <ul className="precio-card__features">
                  {plan.caracteristicas.map((c) => (
                    <li key={c}>
                      <span className="check">✓</span> {c}
                    </li>
                  ))}
                </ul>
                <div className="precio-card__footer">
                  <Link to="/contacto" className="btn btn-primary btn--full">
                    {plan.etiqueta}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
