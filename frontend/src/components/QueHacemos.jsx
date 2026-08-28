import { useEffect, useState } from 'react';
import axios from 'axios';
import './QueHacemos.css';

const pilares = [
  { icono: '🏗️', titulo: 'Desarrollo a la medida', desc: 'Construimos aplicaciones personalizadas según los requerimientos específicos de su negocio.' },
  { icono: '📦', titulo: 'Productos estándar', desc: 'Ofrecemos productos listos para usar que cumplen con toda la normativa colombiana vigente.' },
  { icono: '🔍', titulo: 'Mejores prácticas', desc: 'Incorporamos estándares de calidad en cada etapa del ciclo de vida del software.' },
  { icono: '🤝', titulo: 'Atención oportuna', desc: 'Garantizamos una respuesta debida y oportuna a todas las necesidades de nuestros clientes.' },
  { icono: '⚙️', titulo: 'Fábrica de software', desc: 'Servicios integrales para todo el ciclo de vida del producto: análisis, diseño, desarrollo y soporte.' },
  { icono: '📈', titulo: 'Mejora continua', desc: 'Acompañamos a nuestros clientes en la optimización permanente de sus procesos de negocio.' },
];

export default function QueHacemos() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get('/api/que-hacemos').then((r) => setData(r.data)).catch(() => {});
  }, []);

  return (
    <section className="section que-hacemos">
      <div className="container">
        {/* Encabezado */}
        <div className="section-header section-header--center">
          <h2 className="section-title">{data?.titulo ?? '¿Qué Hacemos?'}</h2>
          <div className="divider divider--center" />
          <p className="section-subtitle">{data?.contenido}</p>
        </div>

        {/* Pilares */}
        <div className="pilares__grid">
          {pilares.map((p) => (
            <div key={p.titulo} className="card pilar-card">
              <div className="pilar-card__icon">{p.icono}</div>
              <h3 className="pilar-card__title">{p.titulo}</h3>
              <p className="pilar-card__desc">{p.desc}</p>
            </div>
          ))}
        </div>

        {/* Proceso */}
        <div className="proceso">
          <h3 className="proceso__title">Nuestro proceso de trabajo</h3>
          <div className="proceso__steps">
            {[
              { n: '01', label: 'Análisis', desc: 'Entendemos sus necesidades y requerimientos.' },
              { n: '02', label: 'Diseño', desc: 'Diseñamos la solución más adecuada.' },
              { n: '03', label: 'Desarrollo', desc: 'Construimos con calidad y buenas prácticas.' },
              { n: '04', label: 'Entrega', desc: 'Desplegamos y capacitamos a su equipo.' },
              { n: '05', label: 'Soporte', desc: 'Acompañamiento continuo post-entrega.' },
            ].map((s, i) => (
              <div key={s.n} className="step">
                <div className="step__number">{s.n}</div>
                {i < 4 && <div className="step__line" />}
                <div className="step__label">{s.label}</div>
                <div className="step__desc">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
