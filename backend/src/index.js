require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// ── Transporte de correo (Gmail) ──────────────────────────────────────────────
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

// ── Quiénes Somos ────────────────────────────────────────────────────────────
app.get('/api/quienes-somos', (req, res) => {
  res.json({
    titulo: '¿Quiénes Somos?',
    contenido:
      'Upper Software S.A.S es una compañía colombiana con más de diez años de experiencia en el sector de informática. ' +
      'Somos una empresa responsable cuya oferta de valor es ofrecer servicios de software de calidad que permitan a nuestros ' +
      'clientes optimizar procesos y contribuir a la mejora continua de sus procesos.',
  });
});

// ── Qué Hacemos ──────────────────────────────────────────────────────────────
app.get('/api/que-hacemos', (req, res) => {
  res.json({
    titulo: '¿Qué Hacemos?',
    contenido:
      'Upper Software S.A.S se dedica a la elaboración de productos de software que cumplen con todas las especificaciones ' +
      'del mercado actual. En su construcción incorporamos las mejores prácticas para garantizar a nuestros clientes una debida ' +
      'y oportuna atención a sus necesidades de procesamiento de información, colaborando así en su mejora de procesos. ' +
      'Elaboramos productos estándar y también ofrecemos desarrollo de aplicaciones a la medida.',
  });
});

// ── Productos y Servicios ─────────────────────────────────────────────────────
app.get('/api/productos', (req, res) => {
  res.json({
    titulo: 'Nuestros Productos y Servicios',
    descripcion: 'Upper Software S.A.S tiene estos productos a su disposición que cumplen con toda la normativa colombiana.',
    productos: [
      {
        id: 1,
        nombre: 'NominaSIC',
        descripcion: 'Aplicación de Nómina que cumple con toda la normativa colombiana vigente.',
        icono: '💼',
        caracteristicas: [
          'Completamente integrada con la contabilidad',
          'Manejo de los diferentes contratos con los empleados',
          'Liquidación de devengos de nómina semanal, quincenal, mensual y a destajo',
          'Liquidación automática de descuentos de ley y aportes por empleado',
          'Control y liquidación de prestaciones sociales (cesantías, intereses, vacaciones y primas)',
          'Control de datos, historial de salarios, devengos y deducciones por empleado',
          'Registro y control de centros de costos por contrato',
          'Parametrización de conceptos de nómina con reglas de liquidación personalizadas',
          'Creación de entidades organizacionales y cargos con funciones definidas',
          'Contabilización automática: nómina, provisiones y pasivos con entidades de salud, pensión y parafiscales',
          'Control de pagos y novedades de pago',
          'Impresión de planilla, informes y desprendibles de pago con control de estado (borrador, confirmado, contabilizado, anulado)',
          'Envío automático del desprendible de pago al correo de cada empleado',
          'Liquidación automática de horas extras (diurnas, nocturnas, dominicales)',
          'Certificado tributario anual de ingresos y retenciones por empleado',
          'Control de antigüedad y libro de vacaciones por empleado',
          'Generación de Nómina Electrónica DIAN',
        ],
      },
      {
        id: 2,
        nombre: 'MyCont',
        descripcion: 'Aplicación Contable que cumple con toda la normativa colombiana vigente.',
        icono: '📊',
        caracteristicas: [
          'Cumplimiento a normas internacionales NIIF',
          'Generación de Auxiliares y Balances de Comprobación',
          'Generación de Estados Financieros',
          'Control de Activos Fijos y depreciaciones',
          'Control de Activos Diferidos',
          'Generación de Información Exógena DIAN',
          'Generación de Información Exógena Distrital',
        ],
      },
    ],
    servicios: [
      {
        id: 1,
        nombre: 'Fábrica de Software',
        descripcion:
          'Ponemos a su disposición la fábrica de software para sus necesidades de software a la medida y en general ' +
          'todos los servicios requeridos en el ciclo de vida del producto.',
        icono: '⚙️',
      },
    ],
  });
});

// ── Precios ───────────────────────────────────────────────────────────────────
app.get('/api/precios', (req, res) => {
  res.json({
    titulo: 'Precios',
    nota: 'Contáctenos para obtener una cotización personalizada adaptada a las necesidades de su empresa.',
    planes: [
      {
        id: 1,
        producto: 'NominaSIC',
        descripcion: 'Aplicación de Nómina',
        caracteristicas: [
          'Liquidación de nómina completa',
          'Prestaciones sociales',
          'Seguridad social',
          'Reportes DIAN',
          'Soporte técnico incluido',
        ],
        etiqueta: 'Solicitar cotización',
      },
      {
        id: 2,
        producto: 'MyCont',
        descripcion: 'Aplicación Contable',
        caracteristicas: [
          'Contabilidad general',
          'Cuentas por pagar y cobrar',
          'Estados financieros',
          'Informes DIAN',
          'Soporte técnico incluido',
        ],
        etiqueta: 'Solicitar cotización',
      },
    ],
  });
});

// ── Clientes ──────────────────────────────────────────────────────────────────
app.get('/api/clientes', (req, res) => {
  res.json({
    titulo: 'Nuestros Clientes',
    descripcion:
      'Upper Software S.A.S tiene en Colombia los siguientes clientes que a lo largo de estos últimos diez años pueden dar fe de nuestros servicios y su calidad.',
    clientes: [
      'AGENCIA DE ADUANAS SERVADE S.A. NIVEL 1',
      'AIR CARGO PACK S.A.S',
      'MASTERLINE COLOMBIA S.A.S.',
      'MTS LTDA.',
      'LEAN LOGISTICS S.A.S',
      'AGENCIA DE ADUANAS SLS CUSTOMS SAS NIVEL 2',
      'AGENTRANSCOL LTDA.',
      'AMERICAN COLOMBIA S.A.S.',
      'COLOMBIA CARGO (Antes GMV)',
      'COLUMBUS INTERNATIONAL FREIGHT FOR LTDA.',
      'MALCO CARGO S.A.',
      'SUPPLY LOGISTICS SOLUTIONS LTDA',
      '24K (Antes TRASLADOS INTERNACIONALES CARGA)',
      'CIF WORLDWIDE LOGISTICS SAS',
      'AGENCIA DE ADUANAS ACOLCEX S.A.S NIVEL 2',
      'ACOLCEX FREIGHT LOGISTICS SAS',
    ],
  });
});

// ── Contacto ──────────────────────────────────────────────────────────────────
app.get('/api/contacto', (req, res) => {
  res.json({
    titulo: 'Contáctenos',
    direccion: 'Carrera 100 #140 A 89, Bogotá D.C.',
    correo: 'uppersoftware.colombia@gmail.com',
    portal: 'www.uppersoftware.co',
    telefono: '320-3385405',
  });
});

// ── Recibir y enviar mensaje de contacto ──────────────────────────────────────
app.post('/api/contacto/mensaje', async (req, res) => {
  const { nombre, email, asunto, mensaje } = req.body;

  if (!nombre || !email || !mensaje) {
    return res.status(400).json({ error: 'Todos los campos son requeridos.' });
  }

  const asuntoFinal = asunto?.trim() || 'Sin asunto';
  const fechaHora = new Date().toLocaleString('es-CO', { timeZone: 'America/Bogota' });

  const htmlBody = `
    <!DOCTYPE html>
    <html lang="es">
    <head><meta charset="UTF-8"></head>
    <body style="font-family: Arial, sans-serif; color: #1f2937; max-width: 600px; margin: 0 auto;">
      <div style="background: linear-gradient(135deg, #133a66, #2060a0); padding: 32px 40px; border-radius: 8px 8px 0 0;">
        <h2 style="color: #ffffff; margin: 0; font-size: 1.3rem;">
          📬 Nuevo mensaje desde el portal
        </h2>
        <p style="color: rgba(255,255,255,0.75); margin: 6px 0 0; font-size: 0.9rem;">
          Upper Software S.A.S. — Portal Web
        </p>
      </div>
      <div style="background: #ffffff; border: 1px solid #e5e7eb; border-top: none; padding: 32px 40px; border-radius: 0 0 8px 8px;">
        <table style="width:100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; width: 130px; font-weight: 600; color: #374151; font-size: 0.9rem;">Nombre</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #1f2937; font-size: 0.9rem;">${nombre}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-weight: 600; color: #374151; font-size: 0.9rem;">Correo</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-size: 0.9rem;">
              <a href="mailto:${email}" style="color: #2060a0;">${email}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-weight: 600; color: #374151; font-size: 0.9rem;">Asunto</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #1f2937; font-size: 0.9rem;">${asuntoFinal}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-weight: 600; color: #374151; font-size: 0.9rem;">Fecha</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; font-size: 0.9rem;">${fechaHora}</td>
          </tr>
        </table>
        <div style="margin-top: 24px;">
          <p style="font-weight: 600; color: #374151; font-size: 0.9rem; margin-bottom: 8px;">Mensaje:</p>
          <div style="background: #f9fafb; border-left: 3px solid #2060a0; padding: 16px 20px; border-radius: 4px; font-size: 0.92rem; line-height: 1.7; color: #374151; white-space: pre-wrap;">${mensaje}</div>
        </div>
        <div style="margin-top: 28px; padding: 16px 20px; background: #eff6ff; border-radius: 6px; font-size: 0.85rem; color: #1e40af;">
          💡 Responda directamente a este correo para contestar a <strong>${nombre}</strong>.
        </div>
      </div>
      <p style="text-align: center; color: #9ca3af; font-size: 0.78rem; margin-top: 16px;">
        Upper Software S.A.S. · Bogotá, Colombia
      </p>
    </body>
    </html>
  `;

  try {
    await transporter.sendMail({
      from: `"Portal Upper Software" <${process.env.MAIL_USER}>`,
      to: process.env.MAIL_TO,
      replyTo: email,
      subject: `[Portal Web] ${asuntoFinal} — ${nombre}`,
      html: htmlBody,
    });

    console.log(`[${fechaHora}] Mensaje enviado de ${nombre} <${email}>`);
    res.json({ ok: true, mensaje: 'Mensaje recibido. Nos pondremos en contacto pronto.' });
  } catch (err) {
    console.error('Error enviando correo:', err.message);
    res.status(500).json({ error: 'No se pudo enviar el mensaje. Intente de nuevo más tarde.' });
  }
});

app.listen(PORT, () => {
  console.log(`Upper Software API corriendo en http://localhost:${PORT}`);
});
