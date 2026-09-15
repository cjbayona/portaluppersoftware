# Portal UpperSoftware S.A.S

Sitio web corporativo estático: **HTML + Tailwind CSS + JavaScript**, sin frameworks ni servidores que mantener.

```
site/                      ← LO QUE SE PUBLICA
  index.html               ← todo el contenido del sitio
  assets/css/styles.css    ← Tailwind ya compilado (no editar a mano)
  assets/js/config.js      ← URL del formulario y número de WhatsApp
  assets/js/main.js        ← menú, pestañas de precios, clientes, formulario
  assets/img/              ← logo y favicon
src/input.css              ← fuente de Tailwind
tailwind.config.js         ← paleta de colores (azul suave)
aws/contact-form.yaml      ← plantilla de AWS para el formulario (Lambda + SES)
amplify.yml                ← le dice a AWS Amplify que publique la carpeta site/
```

## Arquitectura en AWS

```
Visitante ──► AWS Amplify Hosting (site/)            ← HTTPS + CDN + dominio
    │
    └── formulario ──► Lambda (URL pública) ──► Amazon SES ──► uppersoftware.colombia@gmail.com
WhatsApp: enlace directo wa.me (no requiere nada en AWS)
```

Costo esperado para un sitio corporativo: prácticamente $0 – pocos USD/mes (Amplify cobra por GB servido; Lambda y SES quedan dentro de capa gratuita o en centavos).

---

## Paso 1 — Verificar el correo en Amazon SES (5 min)

1. Consola AWS → elija la región **us-east-1 (N. Virginia)** (arriba a la derecha). Use la **misma región** en el paso 2.
2. **Amazon SES → Identities → Create identity → Email address** → `uppersoftware.colombia@gmail.com`.
3. Abra el correo que llega y haga clic en el enlace de verificación.

> **Sandbox:** las cuentas nuevas de SES solo pueden enviar a correos verificados. Como el formulario siempre le escribe a **usted** (el destinatario ya está verificado), **no necesita salir del sandbox**.

> **Recomendado para producción:** en vez de enviar *desde* una dirección @gmail.com (Gmail puede marcarlo como spam porque no pasa DMARC), verifique su dominio en SES (**Create identity → Domain → uppersoftware.com**, agregando los registros DKIM en su DNS) y use `no-reply@uppersoftware.com` como remitente en el paso 2.

## Paso 2 — Crear el backend del formulario (5 min)

1. **CloudFormation → Create stack → With new resources** → *Upload a template file* → `aws/contact-form.yaml`.
2. Nombre del stack: `uppersoftware-contacto`. Parámetros:
   - `RecipientEmail`: correo que recibe los mensajes.
   - `SenderEmail`: correo remitente verificado en SES.
   - `AllowedOrigins`: `https://www.uppersoftware.com,https://uppersoftware.com` **más** la URL de Amplify del paso 3 (puede actualizar el stack después con *Update → Use existing template*).
3. Marque *"I acknowledge that AWS CloudFormation might create IAM resources"* → **Submit**.
4. Al terminar, pestaña **Outputs** → copie `ContactFormUrl`.
5. Pegue esa URL en `site/assets/js/config.js`:
   ```js
   contactEndpoint: 'https://xxxxxxxx.lambda-url.us-east-1.on.aws/',
   ```

## Paso 3 — Publicar el sitio con AWS Amplify Hosting (5 min)

**Opción A (recomendada) — conectado a GitHub, se actualiza con cada `git push`:**

1. Suba estos archivos al repositorio `github.com/cjbayona/portaluppersoftware` (rama `master`).
2. **AWS Amplify → Create new app → GitHub** → autorice → repositorio `portaluppersoftware`, rama `master`.
3. Amplify detecta `amplify.yml` (publica la carpeta `site/`). **Save and deploy**.
4. Obtendrá una URL tipo `https://master.xxxxx.amplifyapp.com`. Agréguela a `AllowedOrigins` (paso 2) para probar el formulario.

**Opción B — sin Git:** comprima el **contenido** de la carpeta `site/` (no la carpeta) en un `.zip` → **Amplify → Create new app → Deploy without Git** → arrastre el zip.

## Paso 4 — Dominio propio

**Amplify → su app → Hosting → Custom domains → Add domain** → `uppersoftware.com`.
- Si el dominio está en Route 53, Amplify configura todo solo.
- Si está en otro proveedor, Amplify le da registros CNAME para crear allí. El certificado HTTPS es gratuito y automático.

## Paso 5 — Probar

1. Abra el sitio → *Contáctenos* → envíe un mensaje (espere al menos 3 s; los envíos instantáneos se descartan como spam).
2. Debe llegarle un correo con asunto `[Web] … - Nombre`. Al **responder**, la respuesta va directo al cliente (Reply-To).
3. Si no llega: revise spam, y **CloudWatch → Log groups → /aws/lambda/uppersoftware-contacto-ContactFunction…**.

---

## Mantenimiento

| Quiero… | Edite |
|---|---|
| Cambiar textos, precios o productos | `site/index.html` |
| Cambiar la lista de clientes | arreglo `clientes` en `site/assets/js/main.js` |
| Cambiar número o mensaje de WhatsApp | `site/assets/js/config.js` |
| Cambiar el correo que recibe mensajes | parámetro `RecipientEmail` del stack (Update stack) |

**Si agrega clases de Tailwind nuevas** (que no existían en el HTML), recompile el CSS antes de publicar:

```bash
npm install
npm run build      # o "npm run dev" mientras edita
npm run serve      # vista previa en http://localhost:5173
```

## Seguridad y anti-spam incluidos

- CORS: solo los dominios de `AllowedOrigins` pueden usar el formulario desde un navegador.
- Campo trampa oculto + tiempo mínimo de llenado (3 s).
- Validación y límite de longitud en navegador **y** en Lambda; el contenido se escapa antes de armar el correo.
- Casilla de autorización de tratamiento de datos (Ley 1581 de 2012).

Si algún día llega spam en volumen, el siguiente paso es poner la función detrás de **AWS WAF** o agregar **Cloudflare Turnstile / reCAPTCHA**.
