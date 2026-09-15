// ============================================================
//  CONFIGURACIÓN DEL SITIO — lo único que debe editar para desplegar
// ============================================================
window.SITE_CONFIG = {
  // URL de la función Lambda que envía el correo (salida "ContactFormUrl"
  // de la plantilla aws/contact-form.yaml). Mientras esté vacía, el
  // formulario mostrará un aviso y ofrecerá WhatsApp como alternativa.
  contactEndpoint: '',

  // Número de WhatsApp en formato internacional, SOLO dígitos (57 = Colombia).
  whatsappNumber: '573203385405',

  // Mensaje que aparece pre-escrito al abrir WhatsApp.
  whatsappMessage: 'Hola UpperSoftware, quisiera recibir información sobre sus productos.',
};
