# DOMUS — Portal inmobiliario con claridad total

> **Primero te decimos cuánto puedes, luego te enseñamos dónde.**

Web de venta de apartamentos en **Bogotá DC** construida con **React + TypeScript + Vite**. DOMUS se diferencia de los portales tradicionales (Fincaraíz, Metrocuadrado, Ciencuadras) porque pone la **transparencia económica** en el centro de la experiencia.

## Diferenciadores (novedad en el nicho)

| Feature | Descripción |
|---|---|
| 🔍 **Buscador inverso** | "Dinos tus ahorros y tu ingreso → te decimos qué apartamentos puedes pagar" |
| 💎 **Panel de Claridad™** | En cada ficha: cuota inicial + escrituración + cuota de crédito + administración = costo real total |
| 📈 **Modo Inversor** | Rentabilidad estimada por arriendo (clave en Bogotá: 69% de las búsquedas son de arriendo) |
| 🏅 **Domus Score** | Métrica único de asequibilidad + ubicación + valorización |
| 📊 **Índice Domus** | Precio/m² vivo por localidad de Bogotá |
| ⚖️ **Comparador** | Hasta 3 apartamentos lado a lado con costo real total |
| ♥ **Favoritos** | Guarda unidades en el navegador y retómalas después |
| 🗺️ **Mapa vivo** | Leaflet + OpenStreetMap, sin API keys |
| ✅ **Catálogo verificado** | Sin avisos duplicados ni desactualizados |

## Stack

- **React 19 + TypeScript** (escalabilidad y tipos)
- **Vite 6** (dev server y build ultrarrápidos)
- **React Router 7** (SPA con rutas)
- **Leaflet** (mapa interactivo, cargado solo en páginas con mapa)
- **CSS propio** con design system azul + blanco y animaciones tecnológicas
- **Vitest + Testing Library** (tests unitarios y de contexto)
- **ESLint** (calidad de código)

## Rutas

```
/                 Home con buscador inverso y Domus Data
/apartamentos     Listado con filtros y mapa
/apartamentos/:id Ficha con Panel de Claridad™
/simulador        Simulador de crédito + presupuesto máximo
/comparador       Comparador de hasta 3 apartamentos
/favoritos        Unidades guardadas en el navegador
/contacto         Contacto y agendar visita
/privacidad       Política de privacidad
/terminos         Términos y condiciones
```

## Puesta en marcha

```bash
npm install
npm run dev        # desarrollo
npm run build      # build de producción
npm run preview    # sirve el build localmente
npm run lint       # calidad de código
npm run typecheck  # verificación de tipos
npm run test       # tests (Vitest)
npm run test:watch # tests en modo watch
```

Requiere **Node >= 20**.

## Variables de entorno

Copia `.env.example` a `.env` y completa solo lo que necesites. Todas son opcionales:

| Variable | Uso |
|---|---|
| `VITE_API_URL` | URL base de la API de catálogo. Si falta, se usan los datos estáticos. |
| `VITE_LEADS_URL` | Endpoint que recibe los leads del formulario de contacto. Si falta, solo se abre WhatsApp. |
| `VITE_ANALYTICS_DOMAIN` | Dominio de Plausible. Solo se carga tras aceptar cookies. |

## Datos

El catálogo vive en `src/data/` (apartamentos y localidades de Bogotá con coordenadas). `src/services/catalogo.ts` puede sustituirlo por una API real definiendo `VITE_API_URL`; mientras tanto la app funciona con los datos estáticos.

## Despliegue

El proyecto es una SPA. Ya incluye:

- `public/_redirects` para Netlify.
- `vercel.json` para Vercel.

Ambos redirigen cualquier ruta a `index.html` para que React Router maneje el enrutamiento. Para otros hosts, configura un fallback equivalente.

## SEO, legal y analítica

- Metadatos por ruta (`title`, description, canonical, Open Graph y JSON-LD) vía `src/hooks/usePageMeta.ts`.
- `public/robots.txt` y `public/sitemap.xml`.
- Banner de consentimiento de cookies; la analítica (Plausible) solo se carga si el usuario acepta.
- Páginas de privacidad y términos en `/privacidad` y `/terminos`.

## Tests y CI

Los tests cubren la lógica financiera, el Domus Score, formateo, imágenes y el contexto del comparador. El workflow `.github/workflows/ci.yml` ejecuta lint, typecheck, tests y build en cada push y pull request.

> Antes de publicar: reemplaza el dominio placeholder `https://domus.com.co` por el real en `src/config/site.ts`, `index.html`, `public/robots.txt` y `public/sitemap.xml`.
