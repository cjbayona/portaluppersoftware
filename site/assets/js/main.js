(() => {
  'use strict';
  const cfg = window.SITE_CONFIG || {};
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];

  // ---------- Año del pie de página ----------
  $('#year').textContent = new Date().getFullYear();

  // ---------- Menú móvil ----------
  const menuBtn = $('#menu-btn');
  const menu = $('#mobile-menu');
  menuBtn.addEventListener('click', () => {
    const open = menu.classList.toggle('hidden') === false;
    menuBtn.setAttribute('aria-expanded', String(open));
  });
  $$('a', menu).forEach((a) => a.addEventListener('click', () => {
    menu.classList.add('hidden');
    menuBtn.setAttribute('aria-expanded', 'false');
  }));

  // ---------- Enlaces de WhatsApp ----------
  const waUrl = (text) =>
    `https://wa.me/${cfg.whatsappNumber}?text=${encodeURIComponent(text || cfg.whatsappMessage || '')}`;
  $$('[data-whatsapp]').forEach((a) => { a.href = waUrl(); });

  // ---------- Clientes ----------
  const clientes = [
    'Acolcex Freight Logistics S.A.S.',
    'Agencia de Aduanas Acolcex S.A.S. Nivel 2',
    'Agencia de Aduanas Servade S.A. Nivel 1',
    'Agencia de Aduanas SLS Customs S.A.S. Nivel 2',
    'Agentranscol Ltda.',
    'Air Cargo Pack S.A.S.',
    'American Colombia S.A.S.',
    'CIF Worldwide Logistics S.A.S.',
    'Colombia Cargo (antes GMV)',
    'Columbus International Freight For Ltda.',
    'Lean Logistics S.A.S.',
    'Malco Cargo S.A.',
    'Masterline Colombia S.A.S.',
    'MTS Ltda.',
    'Supply Logistics Solutions Ltda.',
    '24K (antes Traslados Internacionales Carga)',
  ];
  const initials = (name) => {
    const words = name.replace(/\(.*?\)/g, '').split(/\s+/)
      .filter((w) => w && !/^(de|s\.?a\.?s?\.?|ltda\.?|nivel|\d)$/i.test(w));
    if (/\d/.test(words[0] || '')) return words[0].slice(0, 3);
    return (words[0]?.[0] || '') + (words[1]?.[0] || '');
  };
  const list = $('#client-list');
  list.innerHTML = clientes.map((c) => `
    <li class="flex items-center gap-3 rounded-xl border border-brand-100 bg-white p-4 shadow-sm">
      <span class="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-brand-100 text-sm font-bold uppercase text-brand-700">${initials(c)}</span>
      <span class="text-sm font-medium leading-snug text-slate-700">${c}</span>
    </li>`).join('');

  // ---------- Pestañas de precios ----------
  const tabs = $$('.tab');
  const setTab = (name) => {
    tabs.forEach((t) => {
      const on = t.dataset.tab === name;
      t.setAttribute('aria-selected', String(on));
      t.classList.toggle('bg-white', on);
      t.classList.toggle('text-brand-700', on);
      t.classList.toggle('shadow-sm', on);
      t.classList.toggle('text-slate-500', !on);
    });
    $$('[data-panel]').forEach((p) => {
      const on = p.dataset.panel === name;
      p.classList.toggle('hidden', !on);
      p.classList.toggle('grid', on);
    });
  };
  tabs.forEach((t) => t.addEventListener('click', () => setTab(t.dataset.tab)));
  setTab('nomina');

  // ---------- Botones que preseleccionan el interés en el formulario ----------
  $$('[data-interes]').forEach((a) => a.addEventListener('click', () => {
    const sel = $('#interes');
    const opt = [...sel.options].find((o) => o.value === a.dataset.interes);
    if (opt) sel.value = opt.value;
  }));

  // ---------- Formulario de contacto ----------
  const form = $('#contact-form');
  const statusEl = $('#form-status');
  const btn = $('#submit-btn');
  const loadedAt = Date.now();

  const showStatus = (type, html) => {
    statusEl.className = 'mt-5 rounded-lg px-4 py-3 text-sm ' + (type === 'ok'
      ? 'border border-green-200 bg-green-50 text-green-800'
      : 'border border-red-200 bg-red-50 text-red-800');
    statusEl.innerHTML = html;
  };
  const setLoading = (on) => {
    btn.disabled = on;
    btn.classList.toggle('opacity-70', on);
    $('#spinner').classList.toggle('hidden', !on);
    $('#submit-label').textContent = on ? 'Enviando…' : 'Enviar mensaje';
  };
  const waFallback = (text) =>
    ` También puede <a class="font-semibold underline" target="_blank" rel="noopener" href="${waUrl(text)}">escribirnos por WhatsApp</a>.`;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    data.autorizacion = form.autorizacion.checked;

    // Validación en el navegador
    const errors = [];
    if (!data.nombre.trim()) errors.push('su nombre');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.correo.trim())) errors.push('un correo válido');
    if (data.mensaje.trim().length < 5) errors.push('un mensaje');
    if (!data.autorizacion) errors.push('la autorización de tratamiento de datos');
    $$('.field', form).forEach((f) => f.classList.remove('border-red-400'));
    if (errors.length) {
      ['nombre', 'correo', 'mensaje'].forEach((n) => {
        if (!form[n].checkValidity()) form[n].classList.add('border-red-400');
      });
      showStatus('error', `Por favor indique ${errors.join(', ')}.`);
      return;
    }

    const resumen = `Hola, soy ${data.nombre}${data.empresa ? ' de ' + data.empresa : ''}. Me interesa: ${data.interes}. ${data.mensaje}`;

    if (!cfg.contactEndpoint) {
      showStatus('error', 'El formulario aún no está configurado.' + waFallback(resumen));
      return;
    }

    data.elapsedMs = Date.now() - loadedAt;
    setLoading(true);
    try {
      const res = await fetch(cfg.contactEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok || !body.ok) throw new Error(body.error || `HTTP ${res.status}`);
      form.reset();
      showStatus('ok', '¡Gracias! Recibimos su mensaje y le responderemos pronto.');
    } catch (err) {
      console.error(err);
      showStatus('error', 'No pudimos enviar su mensaje en este momento.' + waFallback(resumen));
    } finally {
      setLoading(false);
    }
  });
})();
