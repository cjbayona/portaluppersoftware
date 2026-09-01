import { useEffect, useState } from 'react';
import api from '../api';
import './Clientes.css';

export default function Clientes() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get('/api/clientes').then((r) => setData(r.data)).catch(() => {});
  }, []);

  const clientes = data?.clientes ?? [];

  return (
    <>
      {/* ── Page header ─────────────────────────────────────────────────── */}
      <div className="page-header">
        <div className="container">
          <h1 className="page-header__title">{data?.titulo ?? 'Nuestros Clientes'}</h1>
          <p className="page-header__sub">Empresas que confían en nuestras soluciones.</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="section-header section-header--center">
            <p className="section-subtitle">{data?.descripcion}</p>
          </div>

          {/* Contador */}
          <div className="clientes__counter">
            <div className="counter-badge">
              <span className="counter-badge__num">{clientes.length}</span>
              <span className="counter-badge__label">Empresas nos respaldan</span>
            </div>
          </div>

          {/* Grid de clientes */}
          <div className="clientes__grid">
            {clientes.map((c, i) => (
              <div key={i} className="cliente-card">
                <div className="cliente-card__icon">🏢</div>
                <span className="cliente-card__name">{c}</span>
              </div>
            ))}
          </div>

          {/* Testimonio genérico */}
          <div className="testimonial">
            <div className="testimonial__quote">"</div>
            <p className="testimonial__text">
              Upper Software S.A.S ha sido un aliado estratégico para nuestros procesos.
              Su compromiso con la calidad y la atención oportuna nos da la tranquilidad
              de saber que contamos con un socio tecnológico confiable.
            </p>
            <p className="testimonial__author">— Un cliente satisfecho, Colombia</p>
          </div>
        </div>
      </section>
    </>
  );
}
