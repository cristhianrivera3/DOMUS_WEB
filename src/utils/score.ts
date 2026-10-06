import type { Apartamento } from '../data/types'

function clamp(v: number, min = 0, max = 100): number {
  return Math.min(max, Math.max(min, v))
}

function rango(v: number, desde: number, hasta: number, salidaMin: number, salidaMax: number): number {
  if (hasta === desde) return salidaMax
  const t = (v - desde) / (hasta - desde)
  return salidaMin + clamp(t) * (salidaMax - salidaMin)
}

export interface ScoreParte {
  nombre: string
  valor: number
  detalle: string
}

export interface ScoreResult {
  total: number
  nivel: string
  partes: ScoreParte[]
}

export function domusScore(a: Apartamento, catalogo: Apartamento[]): ScoreResult {
  const preciosM2 = catalogo.map((c) => c.precio / c.area)
  const minM2 = Math.min(...preciosM2)
  const maxM2 = Math.max(...preciosM2)
  const precioM2 = a.precio / a.area

  const asequibilidad = rango(precioM2, minM2, maxM2, 100, 35)

  const rentabilidadAnual = (a.arriendoEstimado * 12) / a.precio
  const rentabilidad = rango(rentabilidadAnual, 0.03, 0.065, 40, 100)

  const valorizacion = rango(a.valorizacionAnual, 5.5, 8.5, 40, 100)

  const total = Math.round(clamp((asequibilidad + rentabilidad + valorizacion) / 3))

  let nivel = 'Regular'
  if (total >= 85) nivel = 'Excelente'
  else if (total >= 72) nivel = 'Muy bueno'
  else if (total >= 60) nivel = 'Bueno'

  return {
    total,
    nivel,
    partes: [
      {
        nombre: 'Asequibilidad',
        valor: Math.round(asequibilidad),
        detalle: `Precio por m² dentro del catálogo`,
      },
      {
        nombre: 'Rentabilidad',
        valor: Math.round(rentabilidad),
        detalle: `${(rentabilidadAnual * 100).toFixed(1)}% anual estimado por arriendo`,
      },
      {
        nombre: 'Valorización',
        valor: Math.round(valorizacion),
        detalle: `${a.valorizacionAnual.toFixed(1)}% anual estimada de la zona`,
      },
    ],
  }
}
