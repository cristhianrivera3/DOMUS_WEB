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
| 🗺️ **Mapa vivo** | Leaflet + OpenStreetMap, sin API keys |
| ✅ **Catálogo verificado** | Sin avisos duplicados ni desactualizados |

## Stack

- **React 19 + TypeScript** (escalabilidad y tipos)
- **Vite 6** (dev server y build ultrarrápidos)
- **React Router 7** (SPA con rutas)
- **Leaflet** (mapa interactivo)
- **CSS propio** con design system azul + blanco y animaciones tecnológicas
- **ESLint** (calidad de código)

## Rutas

```
/                 Home con buscador inverso y Domus Data
/apartamentos     Listado con filtros y mapa
/apartamentos/:id Ficha con Panel de Claridad™
/simulador        Simulador de crédito + presupuesto máximo
/comparador       Comparador de hasta 3 apartamentos
/contacto         Contacto y agendar visita
```

## Puesta en marcha

```bash
npm install
npm run dev      # desarrollo
npm run build    # build de producción
npm run lint     # calidad de código
```

## Datos

El catálogo vive en `src/data/` (apartamentos y localidades de Bogotá con coordenadas). Está pensado para sustituirse fácilmente por una API real cuando DOMUS suba sus inventarios.
