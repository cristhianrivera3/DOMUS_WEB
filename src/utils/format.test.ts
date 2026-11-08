import { describe, expect, it } from 'vitest'
import { formatArea, formatCOP, formatMillones, formatPct } from './format'

describe('format', () => {
  it('formatea pesos colombianos sin decimales', () => {
    expect(formatCOP(1_000_000)).toContain('1.000.000')
  })

  it('formatea millones con separador de miles', () => {
    expect(formatMillones(1_500_000_000, 0)).toContain('1.500')
    expect(formatMillones(1_500_000_000, 0)).toContain('M')
  })

  it('formatea porcentajes con coma decimal', () => {
    expect(formatPct(75.4, 1)).toBe('75,4%')
  })

  it('formatea áreas con unidad', () => {
    expect(formatArea(108)).toBe('108 m²')
  })
})
