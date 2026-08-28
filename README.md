# Portal Web – Upper Software S.A.S.

Portal corporativo desarrollado con **Node.js + Express** (backend) y **React + Vite** (frontend).

---

## Estructura del proyecto

```
portaluppersoftware/
├── backend/          → API REST con Express (puerto 3001)
│   └── src/index.js
├── frontend/         → SPA React + Vite (puerto 3000)
│   └── src/
│       ├── components/
│       └── assets/
└── empresa/          → Documentos fuente de contenido
```

---

## Requisitos

- Node.js 18 o superior
- npm 9 o superior

---

## Instalación

Instalar dependencias de ambos proyectos de una sola vez:

```bash
npm run install:all
```

O manualmente:

```bash
cd backend  && npm install
cd frontend && npm install
```

---

## Desarrollo

Abrir **dos terminales** y ejecutar:

**Terminal 1 – Backend:**
```bash
cd backend
npm run dev
```
La API quedará disponible en `http://localhost:3001`

**Terminal 2 – Frontend:**
```bash
cd frontend
npm run dev
```
El portal quedará disponible en `http://localhost:3000`

---

## Producción

```bash
cd frontend
npm run build
```
Los archivos estáticos se generan en `frontend/dist/`.

---

## Secciones del portal

| Ruta | Descripción |
|------|-------------|
| `/` | Inicio – Quiénes Somos |
| `/que-hacemos` | Qué Hacemos + Proceso de trabajo |
| `/productos` | Productos (NominaSIC, MyCont), Servicios y Precios |
| `/clientes` | Nuestros Clientes |
| `/contacto` | Información de contacto + Formulario |

---

## API Endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/quienes-somos` | Texto corporativo |
| GET | `/api/que-hacemos` | Descripción de servicios |
| GET | `/api/productos` | Productos y servicios |
| GET | `/api/precios` | Planes y precios |
| GET | `/api/clientes` | Lista de clientes |
| GET | `/api/contacto` | Datos de contacto |
| POST | `/api/contacto/mensaje` | Recibir mensaje del formulario |
