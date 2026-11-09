<div align="center">

# 🏠 DOMUS

### El portal inmobiliario de Bogotá que empieza por tu bolsillo

**Primero te decimos cuánto puedes, luego te enseñamos dónde.**

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)
[![Express](https://img.shields.io/badge/Express-5-000000?logo=express&logoColor=white)](https://expressjs.com)
[![Node](https://img.shields.io/badge/Node-%3E%3D20-339933?logo=node.js&logoColor=white)](https://nodejs.org)
[![CI](https://img.shields.io/badge/CI-lint%20%7C%20types%20%7C%20tests%20%7C%20build-2ea44f)](.github/workflows/ci.yml)

Web de venta de apartamentos en **Bogotá DC** que muestra el **costo real total** de cada unidad: cuota inicial, escrituración, crédito y administración en una sola ficha, sin letras pequeñas.

[✨ Ver funcionalidades](#-por-qué-los-clientes-eligen-domus) · [✅ Avances](#-avances--estado-actual) · [🧭 Lo que falta](#-lo-que-falta--roadmap) · [🚀 Empezar](#-puesta-en-marcha)

</div>

---

## ✨ ¿Qué es DOMUS?

La mayoría de portales (Fincaraíz, Metrocuadrado, Ciencuadras) te muestran fotos y un precio. **DOMUS integra tu presupuesto, tu crédito y todos los gastos de la compra** desde el primer clic. Así el comprador deja de adivinar cuánto necesita y el equipo comercial recibe **leads mejor calificados**.

> Un portal bonito atrae visitas. Un portal transparente cierra negocios. DOMUS es lo segundo.

## 💎 ¿Por qué los clientes eligen DOMUS?

| Función | Qué resuelve |
|---|---|
| 🔍 **Buscador inverso** | "Dinos tus ahorros y tu ingreso → te decimos qué apartamentos puedes pagar". |
| 💎 **Panel de Claridad™** | Cuota inicial + escrituración + cuota de crédito + administración = **costo real total**. |
| 📈 **Modo Inversor** | Rentabilidad estimada por arriendo (en Bogotá, 69% de las búsquedas son de arriendo). |
| 🏅 **Domus Score** | Una nota única que combina asequibilidad + conectividad + valorización. |
| 📊 **Índice Domus** | Precio por m² vivo en 16 localidades de Bogotá. |
| ⚖️ **Comparador** | Hasta 3 apartamentos lado a lado con su costo real total. |
| ♥ **Favoritos** | Guarda unidades en el navegador y retómalas después. |
| 🗺️ **Mapa vivo** | Leaflet + OpenStreetMap, sin API keys. |
| ✅ **Catálogo verificado** | Sin avisos duplicados ni desactualizados. |
| 🤝 **Contacto directo** | Formulario y leads que caen a WhatsApp cuando no hay backend. |

---

## ✅ Avances — estado actual

El producto ya está **funcional de punta a punta** (web pública + API + CRM). Esto es lo que está construido y probado:

### 🛒 Experiencia del comprador
- [x] Home con buscador inverso, cifras de mercado e Índice Domus
- [x] Listado con filtros (precio, área, habitaciones, estrato, localidad) y mapa interactivo
- [x] Ficha de apartamento con **Panel de Claridad™**, Domus Score y Modo Inversor
- [x] Simulador de crédito y cálculo de presupuesto máximo
- [x] Comparador de hasta 3 unidades con costo real total
- [x] Favoritos persistidos en el navegador
- [x] Página de contacto / agendamiento de visita
- [x] Páginas legales de privacidad y términos
- [x] Página 404 y manejo de errores con ErrorBoundary
- [x] Rutas con carga diferida (code splitting) y animaciones de entrada
- [x] Diseño responsive con design system azul/blanco

### 📊 Datos e inteligencia de mercado
- [x] Catálogo semilla: **18 apartamentos** y **16 localidades** de Bogotá con coordenadas
- [x] Índice de precio/m² por localidad y cifras del mercado
- [x] Cálculo de cuota, escrituración e inversión (`src/utils/finanzas.ts`, `score.ts`)

### 🗂️ CRM interno (`/admin`)
- [x] Login con JWT + bcrypt
- [x] Resumen de visitas y leads de los últimos 14 días
- [x] Leads por estado, unidades más vistas y últimos contactos
- [x] CRUD de apartamentos: crear, editar, publicar/ocultar y eliminar
- [x] Subida de fotos (multer) o URLs externas
- [x] Bandeja de leads con filtros, notas internas y contacto por WhatsApp/correo

### 🔌 Backend y API (Express 5)
- [x] `GET /api/catalogo`, `GET /api/apartamentos/:id`
- [x] `POST /api/leads` y `POST /api/events` (analítica propia)
- [x] Rutas `/api/admin/*` protegidas con JWT
- [x] Persistencia en `server/data/db.json` (se crea desde `server/seed.json`)
- [x] Sirve el build estático de la SPA en producción
- [x] Fallback automático al catálogo estático si la API no responde

### 🚀 Calidad, SEO y despliegue
- [x] Metadatos por ruta (title, description, canonical, Open Graph y JSON-LD)
- [x] `robots.txt`, `sitemap.xml` y `/admin` con `noindex`
- [x] Banner de consentimiento de cookies + analítica condicionada
- [x] PWA: manifest, `theme-color` e iconos
- [x] Tests unitarios y de contexto con Vitest + Testing Library
- [x] CI en GitHub Actions: lint, typecheck, tests y build
- [x] Configuración lista para Vercel (`vercel.json`) y hosting Node

---

## 🧭 Lo que falta — roadmap

Ordenado por impacto. Es la lista honesta de pendientes para pasar de un producto sólido a un negocio en producción.

### 🔴 Prioridad alta (para salir en vivo)
- [ ] **Backend en producción**: desplegar Express en Render/Railway/Fly.io/VPS con disco persistente (`DATA_DIR` y `UPLOADS_DIR`). Vercel por sí solo no ejecuta Express.
- [ ] **Dominio real**: reemplazar `https://domus.com.co` en `src/config/site.ts`, `index.html`, `public/robots.txt` y `public/sitemap.xml`.
- [ ] **Datos de contacto reales**: teléfono, WhatsApp y correo en `src/config/site.ts`.
- [ ] **Catálogo real**: reemplazar apartamentos de ejemplo y sus fotos por inventario propio.
- [ ] **Base de datos**: migrar de `db.json` a PostgreSQL/Supabase (hoy un archivo JSON no escala ni soporta concurrencia).
- [ ] **Analítica real**: definir `VITE_ANALYTICS_DOMAIN` (Plausible) y verificar el flujo de eventos.

### 🟠 Prioridad media (operación y ventas)
- [ ] **Notificaciones de leads**: aviso por correo/WhatsApp/Telegram al recibir un contacto.
- [ ] **Roles y multiusuario** en el CRM (hoy un solo administrador).
- [ ] **Recuperación de contraseña** y expiración de sesión configurable.
- [ ] **Reservas y pagos en línea** (separar unidad / anticipo).
- [ ] **Integración con portales externos** (Fincaraíz, Metrocuadrado) y sincronización de inventario.
- [ ] **Documentos y firma digital** (promesas, certificados, reglamentos).
- [ ] **Exportación de leads** (Excel/CSV) y reportes comerciales.

### 🟡 Prioridad baja (pulido)
- [ ] **Tests E2E** con Playwright para los flujos críticos (búsqueda → ficha → lead).
- [ ] **Service Worker** para offline real de la PWA.
- [ ] **Imágenes optimizadas/CDN** y `srcset` para rendimiento.
- [ ] **i18n** (español/inglés) para compradores extranjeros.
- [ ] **Comparador y favoritos** sincronizados con la cuenta del usuario.
- [ ] **Accesibilidad**: auditoría WCAG completa.

> 💡 El roadmap se actualiza según prioridades del negocio. ¿Falta algo? Abre un issue.

---

## 🧱 Stack

- **React 19 + TypeScript** — UI tipada y escalable
- **Vite 6** — dev server y build ultrarrápidos
- **React Router 7** — SPA con rutas y carga diferida
- **Leaflet + OpenStreetMap** — mapa interactivo, sin API keys
- **Express 5 + JWT + bcrypt** — API pública y CRM interno
- **Multer** — subida de fotos
- **CSS propio** — design system azul + blanco con animaciones tecnológicas
- **Vitest + Testing Library** — tests unitarios y de contexto
- **ESLint** — calidad de código

## 🗺️ Rutas

```
/                    Home con buscador inverso y Domus Data
/apartamentos        Listado con filtros y mapa
/apartamentos/:id    Ficha con Panel de Claridad™
/simulador           Simulador de crédito + presupuesto máximo
/comparador          Comparador de hasta 3 apartamentos
/favoritos           Unidades guardadas en el navegador
/contacto            Contacto y agendar visita
/privacidad          Política de privacidad
/terminos            Términos y condiciones
/admin/login         Acceso al CRM
/admin               Resumen: visitas, leads y unidades
/admin/apartamentos  CRUD del catálogo + fotos
/admin/leads         Bandeja de leads y seguimiento
```

## 🚀 Puesta en marcha

```bash
npm install
cp .env.example .env   # crea el archivo privado (gitignored)
npm run dev            # API (3001) + web (5173) a la vez
npm run seed           # regenera server/seed.json desde src/data
npm run build          # build de producción
npm start              # API + build estático en http://localhost:3001
npm run preview        # solo sirve el build (sin API)
npm run lint           # calidad de código
npm run typecheck      # verificación de tipos
npm run test           # tests (Vitest)
npm run test:watch     # tests en modo watch
```

Requiere **Node >= 20**.

`npm run dev` levanta:

- **Web**: `http://localhost:5173` (Vite, con proxy `/api` y `/uploads` al backend).
- **API**: `http://localhost:3001` (Express con `--watch`).

En la primera ejecución la API crea `server/data/db.json` a partir de `server/seed.json` (18 apartamentos y 16 localidades). Los leads y eventos nuevos se guardan ahí.

## 🔐 CRM interno

Panel privado para que el equipo de DOMUS gestione la web sin tocar código:

- **Resumen**: visitas y leads de los últimos 14 días, leads por estado, unidades más vistas y últimos contactos.
- **Apartamentos**: crear, editar, publicar/ocultar y eliminar unidades; subir fotos o pegar URLs; ajustar precio, área, ubicación, características y datos de inversión.
- **Leads**: bandeja con filtros por estado, notas internas, contacto directo por WhatsApp/correo y eliminación.

Las credenciales y el secreto de sesión viven en `.env` (privado y fuera de Git). Para generarlos:

```bash
node -e "console.log('JWT_SECRET=' + require('crypto').randomBytes(48).toString('base64url'))"
node -e "console.log('ADMIN_PASSWORD=' + require('crypto').randomBytes(18).toString('base64url'))"
```

Copia esos valores en `.env` junto a `ADMIN_EMAIL`. El CRM se sirve bajo `/admin` y está bloqueado en `robots.txt`.

La API pública expone `GET /api/catalogo`, `GET /api/apartamentos/:id`, `POST /api/leads` y `POST /api/events`. Las rutas `/api/admin/*` requieren token JWT.

## ⚙️ Variables de entorno

Copia `.env.example` a `.env` y completa lo que necesites. `JWT_SECRET` y `ADMIN_PASSWORD` son obligatorios: la API no arranca sin ellos. `.env` está en `.gitignore` y nunca debe subirse al repositorio.

**Web**

| Variable | Uso |
|---|---|
| `VITE_API_URL` | URL base del backend si está en otro dominio (sin `/api`). Vacío = mismo origen/proxy. |
| `VITE_LEADS_URL` | Endpoint de leads alternativo. Si falta, usa `/api/leads`. |
| `VITE_ANALYTICS_DOMAIN` | Dominio de Plausible. Solo se carga tras aceptar cookies. |

**API / CRM**

| Variable | Uso |
|---|---|
| `PORT` | Puerto del backend (por defecto `3001`). |
| `JWT_SECRET` | Obligatorio. Secreto para firmar sesiones (mínimo 32 caracteres en producción). |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | Obligatorios. Credenciales del CRM (contraseña de mínimo 12 caracteres en producción). |
| `DATA_DIR` | Carpeta de `db.json` (por defecto `server/data`). |
| `UPLOADS_DIR` | Carpeta de fotos subidas (por defecto `server/uploads`). |

## 🗂️ Datos

- `src/data/` contiene el catálogo semilla (apartamentos y localidades de Bogotá con coordenadas).
- La API persiste todo en `server/data/db.json` (leads, eventos y catálogo editable).
- Las fotos subidas se guardan en `server/uploads` y se sirven en `/uploads/...`.
- `server/seed.json` se genera con `npm run seed`. El frontend usa `/api/catalogo` y cae a los datos estáticos si la API no responde.

## ☁️ Despliegue

El backend Express sirve la API y, si existe `dist/`, también la SPA:

```bash
npm run build
npm start
```

Opciones de hosting con Node: **Render, Railway, Fly.io, VPS con PM2/Nginx o Docker**. Define `JWT_SECRET`, `ADMIN_PASSWORD` y un disco persistente para `DATA_DIR` y `UPLOADS_DIR`.

Si prefieres separar frontend y backend:

- **Frontend estático**: Vercel/Netlify (incluye `public/_redirects` y `vercel.json`). Define `VITE_API_URL` con el dominio del backend.
- **Backend**: cualquier host Node con disco persistente.

> ⚠️ Vercel/Netlify por sí solos **no ejecutan Express**, así que el CRM y la persistencia necesitan un servidor Node aparte.

### Vercel por ahora (solo web pública)

Para mostrar la web a clientes, Vercel alcanza:

1. Importa el repo en Vercel. Framework: **Vite**. Build: `npm run build`. Output: `dist`.
2. No definas `VITE_API_URL` todavía: la web usa el catálogo estático y los leads caen a WhatsApp.
3. `vercel.json` ya resuelve las rutas de React (`/apartamentos`, `/apartamentos/...`, etc.).

Qué **no** funciona en Vercel sin backend: `/admin`, guardado de leads/eventos y subida de fotos. Cuando tengas el backend Node, define `VITE_API_URL=https://api.tu-dominio.com` en Vercel y vuelve a desplegar.

## 📈 SEO, legal y analítica

- Metadatos por ruta (`title`, description, canonical, Open Graph y JSON-LD) vía `src/hooks/usePageMeta.ts`.
- `public/robots.txt` y `public/sitemap.xml`.
- Banner de consentimiento de cookies; Plausible y los eventos internos (`/api/events`) solo se envían si el usuario acepta.
- Páginas de privacidad y términos en `/privacidad` y `/terminos`.
- `/admin` bloqueado con `noindex,nofollow` y `Disallow` en `robots.txt`.

## 🧪 Tests y CI

Los tests cubren la lógica financiera, el Domus Score, formateo, imágenes y los contextos de comparador y favoritos. El workflow `.github/workflows/ci.yml` ejecuta **lint, typecheck, tests y build** en cada push y pull request a `main`/`master`.

> Antes de publicar: reemplaza el dominio placeholder `https://domus.com.co` por el real en `src/config/site.ts`, `index.html`, `public/robots.txt` y `public/sitemap.xml`.

---

<div align="center">

## 🤝 ¿Quieres trabajar con DOMUS?

Si buscas comprar con números claros, o si eres una inmobiliaria que quiere un portal propio con esta experiencia, hablemos.

[![WhatsApp](https://img.shields.io/badge/WhatsApp-Escr%C3%ADbenos-25D366?logo=whatsapp&logoColor=white)](https://wa.me/573000000000)
[![Repo](https://img.shields.io/badge/GitHub-DOMUS__WEB-181717?logo=github&logoColor=white)](https://github.com/cristhianrivera3/DOMUS_WEB)

**Hecho con claridad para Bogotá 🇨🇴**

</div>
