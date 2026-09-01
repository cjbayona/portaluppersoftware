import { useEffect, useState } from 'react';
import api from '../api';
import './Contacto.css';

export default function Contacto() {
  const [info, setInfo] = useState(null);
  const [form, setForm] = useState({ nombre: '', email: '', asunto: '', mensaje: '' });
  const [status, setStatus] = useState(null); // 'sending' | 'ok' | 'error'

  useEffect(() => {
    api.get('/api/contacto').then((r) => setInfo(r.data)).catch(() => {});
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      await api.post('/api/contacto/mensaje', form);
      setStatus('ok');
      setForm({ nombre: '', email: '', asunto: '', mensaje: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <>
      {/* ── Page header ─────────────────────────────────────────────────── */}
      <div className="page-header">
        <div className="container">
          <h1 className="page-header__title">{info?.titulo ?? 'Contáctenos'}</h1>
          <p className="page-header__sub">Estamos listos para atenderle.</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="contacto__layout">

            {/* ── Info de contacto ─────────────────────────────────────── */}
            <div className="contacto__info">
              <h2 className="contacto__info-title">Información de contacto</h2>
              <p className="contacto__info-sub">
                Comuníquese con nosotros por cualquiera de estos medios y con gusto le atenderemos.
              </p>

              <div className="contact-items">
                <div className="contact-item">
                  <div className="contact-item__icon">📍</div>
                  <div>
                    <span className="contact-item__label">Dirección</span>
                    <span className="contact-item__value">{info?.direccion}</span>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-item__icon">📞</div>
                  <div>
                    <span className="contact-item__label">Teléfono</span>
                    <a href={`tel:${info?.telefono}`} className="contact-item__value contact-item__link">
                      {info?.telefono}
                    </a>
                  </div>
                </div>

                {/* ── WhatsApp ──────────────────────────────────────────── */}
                <div className="contact-item">
                  <div className="contact-item__icon contact-item__icon--wa">
                    <svg viewBox="0 0 32 32" width="22" height="22" fill="currentColor" aria-hidden="true">
                      <path d="M16.003 2C8.28 2 2 8.28 2 16.003c0 2.478.651 4.845 1.89 6.916L2 30l7.272-1.858A13.94 13.94 0 0016.003 30C23.72 30 30 23.72 30 16.003 30 8.28 23.72 2 16.003 2zm0 25.5a11.44 11.44 0 01-5.845-1.604l-.42-.25-4.317 1.104 1.13-4.2-.274-.432A11.456 11.456 0 014.5 16.003C4.5 9.659 9.659 4.5 16.003 4.5S27.5 9.659 27.5 16.003 22.341 27.5 16.003 27.5zm6.27-8.564c-.344-.172-2.036-1.004-2.352-1.118-.316-.115-.547-.172-.777.172-.23.344-.892 1.118-1.093 1.348-.2.23-.402.258-.746.086-.344-.172-1.452-.535-2.766-1.707-1.022-.912-1.712-2.037-1.913-2.381-.2-.344-.021-.53.15-.701.155-.155.344-.402.516-.603.172-.2.23-.344.344-.574.115-.23.058-.431-.029-.603-.086-.172-.777-1.874-1.065-2.566-.28-.674-.565-.583-.777-.594l-.661-.011c-.23 0-.603.086-.919.431s-1.207 1.176-1.207 2.868 1.236 3.327 1.408 3.557c.172.23 2.433 3.715 5.894 5.21.824.356 1.467.569 1.968.728.827.263 1.58.226 2.175.137.663-.099 2.036-.832 2.323-1.635.287-.803.287-1.492.2-1.635-.086-.143-.316-.23-.66-.402z"/>
                    </svg>
                  </div>
                  <div>
                    <span className="contact-item__label">WhatsApp</span>
                    <a
                      href="https://wa.me/573203385405?text=Hola%2C%20me%20interesa%20información%20sobre%20sus%20servicios"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-item__value contact-item__link"
                    >
                      320-3385405
                    </a>
                    <a
                      href="https://wa.me/573203385405?text=Hola%2C%20me%20interesa%20información%20sobre%20sus%20servicios"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-whatsapp"
                      aria-label="Chatear por WhatsApp"
                    >
                      <svg viewBox="0 0 32 32" width="18" height="18" fill="currentColor" aria-hidden="true">
                        <path d="M16.003 2C8.28 2 2 8.28 2 16.003c0 2.478.651 4.845 1.89 6.916L2 30l7.272-1.858A13.94 13.94 0 0016.003 30C23.72 30 30 23.72 30 16.003 30 8.28 23.72 2 16.003 2zm0 25.5a11.44 11.44 0 01-5.845-1.604l-.42-.25-4.317 1.104 1.13-4.2-.274-.432A11.456 11.456 0 014.5 16.003C4.5 9.659 9.659 4.5 16.003 4.5S27.5 9.659 27.5 16.003 22.341 27.5 16.003 27.5zm6.27-8.564c-.344-.172-2.036-1.004-2.352-1.118-.316-.115-.547-.172-.777.172-.23.344-.892 1.118-1.093 1.348-.2.23-.402.258-.746.086-.344-.172-1.452-.535-2.766-1.707-1.022-.912-1.712-2.037-1.913-2.381-.2-.344-.021-.53.15-.701.155-.155.344-.402.516-.603.172-.2.23-.344.344-.574.115-.23.058-.431-.029-.603-.086-.172-.777-1.874-1.065-2.566-.28-.674-.565-.583-.777-.594l-.661-.011c-.23 0-.603.086-.919.431s-1.207 1.176-1.207 2.868 1.236 3.327 1.408 3.557c.172.23 2.433 3.715 5.894 5.21.824.356 1.467.569 1.968.728.827.263 1.58.226 2.175.137.663-.099 2.036-.832 2.323-1.635.287-.803.287-1.492.2-1.635-.086-.143-.316-.23-.66-.402z"/>
                      </svg>
                      Chatear por WhatsApp
                    </a>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-item__icon">✉️</div>
                  <div>
                    <span className="contact-item__label">Correo electrónico</span>
                    <a href={`mailto:${info?.correo}`} className="contact-item__value contact-item__link">
                      {info?.correo}
                    </a>
                  </div>
                </div>
                <div className="contact-item">
                  <div className="contact-item__icon">🌐</div>
                  <div>
                    <span className="contact-item__label">Sitio web</span>
                    <a
                      href={`https://${info?.portal}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-item__value contact-item__link"
                    >
                      {info?.portal}
                    </a>
                  </div>
                </div>
              </div>

              <div className="horario">
                <h4 className="horario__title">Horario de atención</h4>
                <p className="horario__row">Lunes a Viernes: 8:00 a.m. – 5:00 p.m.</p>
              </div>
            </div>

            {/* ── Formulario ───────────────────────────────────────────── */}
            <div className="card contacto__form-wrap">
              <h2 className="contacto__form-title">Envíenos un mensaje</h2>

              {status === 'ok' && (
                <div className="alert alert--ok">
                  ✅ Mensaje enviado correctamente. Nos pondremos en contacto pronto.
                </div>
              )}
              {status === 'error' && (
                <div className="alert alert--error">
                  ❌ Ocurrió un error. Por favor intente de nuevo o escríbanos directamente.
                </div>
              )}

              <form onSubmit={handleSubmit} className="form" noValidate>
                <div className="form__row">
                  <div className="form__group">
                    <label htmlFor="nombre" className="form__label">Nombre completo *</label>
                    <input
                      id="nombre"
                      name="nombre"
                      type="text"
                      className="form__input"
                      placeholder="Su nombre"
                      value={form.nombre}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form__group">
                    <label htmlFor="email" className="form__label">Correo electrónico *</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className="form__input"
                      placeholder="correo@empresa.com"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="form__group">
                  <label htmlFor="asunto" className="form__label">Asunto</label>
                  <input
                    id="asunto"
                    name="asunto"
                    type="text"
                    className="form__input"
                    placeholder="¿En qué le podemos ayudar?"
                    value={form.asunto}
                    onChange={handleChange}
                  />
                </div>
                <div className="form__group">
                  <label htmlFor="mensaje" className="form__label">Mensaje *</label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    className="form__textarea"
                    rows={5}
                    placeholder="Escriba su mensaje aquí..."
                    value={form.mensaje}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary btn--full"
                  disabled={status === 'sending'}
                >
                  {status === 'sending' ? 'Enviando...' : 'Enviar mensaje'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
