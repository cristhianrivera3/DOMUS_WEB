import { describe, expect, it } from 'vitest'
import {
  PCT_ENTRADA,
  TASA_EA_DEFAULT,
  ahorrosNecesarios,
  capitalDesdeCuota,
  cuotaMensualFrancesa,
  gastosDeCompra,
  presupuestoMaximo,
  tablaAmortizacion,
  tasaMensualDesdeEA,
} from './finanzas'

describe('tasaMensualDesdeEA', () => {
  it('convierte una tasa efectiva anual a mensual', () => {
    const mensual = tasaMensualDesdeEA(0.105)
    expect(mensual).toBeGreaterThan(0)
    expect(mensual).toBeLessThan(0.01)
    expect(Math.pow(1 + mensual, 12) - 1).toBeCloseTo(0.105, 10)
  })
})

describe('cuotaMensualFrancesa', () => {
  it('devuelve 0 si el capital es 0', () => {
    expect(cuotaMensualFrancesa(0, TASA_EA_DEFAULT, 20)).toBe(0)
  })

  it('calcula una cuota coherente con el capital', () => {
    const capital = 200_000_000
    const cuota = cuotaMensualFrancesa(capital, TASA_EA_DEFAULT, 20)
    const total = cuota * 20 * 12
    expect(cuota).toBeGreaterThan(0)
    expect(total).toBeGreaterThan(capital)
  })

  it('es inversa de capitalDesdeCuota', () => {
    const capital = 150_000_000
    const cuota = cuotaMensualFrancesa(capital, TASA_EA_DEFAULT, 15)
    const recuperado = capitalDesdeCuota(cuota, TASA_EA_DEFAULT, 15)
    expect(recuperado).toBeCloseTo(capital, 2)
  })
})

describe('gastosDeCompra', () => {
  it('suma aproximadamente 6.3% del precio', () => {
    const gastos = gastosDeCompra(1)
    expect(gastos.pctTotal).toBeCloseTo(0.063, 10)
    expect(gastos.total).toBeCloseTo(0.063, 10)
  })

  it('desglosa timbre, registro, jurídicos y avalúo', () => {
    const gastos = gastosDeCompra(100_000_000)
    expect(gastos.timbre).toBeCloseTo(3_500_000)
    expect(gastos.registro).toBeCloseTo(1_000_000)
    expect(gastos.juridicos).toBeCloseTo(1_500_000)
    expect(gastos.avaluo).toBeCloseTo(300_000)
  })
})

describe('ahorrosNecesarios', () => {
  it('incluye entrada del 20% más gastos', () => {
    const precio = 500_000_000
    const esperado = precio * PCT_ENTRADA + gastosDeCompra(precio).total
    expect(ahorrosNecesarios(precio)).toBeCloseTo(esperado)
  })
})

describe('presupuestoMaximo', () => {
  it('crece con el ingreso y con los ahorros', () => {
    const base = presupuestoMaximo(60_000_000, 4_000_000)
    expect(presupuestoMaximo(60_000_000, 8_000_000)).toBeGreaterThanOrEqual(base)
    expect(presupuestoMaximo(120_000_000, 4_000_000)).toBeGreaterThanOrEqual(base)
  })

  it('redondea a millones y nunca es negativo', () => {
    const maximo = presupuestoMaximo(60_000_000, 4_500_000)
    expect(maximo % 1_000_000).toBe(0)
    expect(maximo).toBeGreaterThan(0)
    expect(presupuestoMaximo(0, 0)).toBe(0)
  })
})

describe('tablaAmortizacion', () => {
  it('tiene una fila por mes y saldo final en cero', () => {
    const filas = tablaAmortizacion(100_000_000, TASA_EA_DEFAULT, 10)
    expect(filas).toHaveLength(10 * 12)
    expect(filas[filas.length - 1]?.saldo).toBeCloseTo(0, 2)
  })
})
