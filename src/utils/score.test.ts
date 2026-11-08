import { describe, expect, it } from 'vitest'
import { APARTAMENTOS } from '../data/apartamentos'
import { domusScore } from './score'

describe('domusScore', () => {
  it('devuelve un puntaje entre 0 y 100 con sus tres componentes', () => {
    const score = domusScore(APARTAMENTOS[0]!, APARTAMENTOS)
    expect(score.total).toBeGreaterThanOrEqual(0)
    expect(score.total).toBeLessThanOrEqual(100)
    expect(score.partes).toHaveLength(3)
    expect(score.partes.map((p) => p.nombre)).toEqual([
      'Asequibilidad',
      'Rentabilidad',
      'Valorización',
    ])
  })

  it('asigna un nivel según el puntaje', () => {
    const niveles = new Set(APARTAMENTOS.map((a) => domusScore(a, APARTAMENTOS).nivel))
    niveles.forEach((nivel) => {
      expect(['Regular', 'Bueno', 'Muy bueno', 'Excelente']).toContain(nivel)
    })
  })

  it('penaliza el precio por m² más alto en asequibilidad', () => {
    const porM2 = [...APARTAMENTOS].sort((a, b) => a.precio / a.area - b.precio / b.area)
    const barato = domusScore(porM2[0]!, APARTAMENTOS)
    const caro = domusScore(porM2[porM2.length - 1]!, APARTAMENTOS)
    const asequibilidad = (s: typeof barato) =>
      s.partes.find((p) => p.nombre === 'Asequibilidad')?.valor ?? 0
    expect(asequibilidad(barato)).toBeGreaterThan(asequibilidad(caro))
  })
})
