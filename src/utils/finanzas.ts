export const TASA_EA_DEFAULT = 0.105
export const PLAZO_DEFAULT = 20
export const PCT_CUOTA_INGRESO = 0.3
export const PCT_ENTRADA = 0.2
export const PCT_FINANCIACION = 0.8

export interface GastosCompra {
  timbre: number
  registro: number
  juridicos: number
  avaluo: number
  total: number
  pctTotal: number
}

export function tasaMensualDesdeEA(tasaEA: number): number {
  return Math.pow(1 + tasaEA, 1 / 12) - 1
}

export function cuotaMensualFrancesa(capital: number, tasaEA: number, anios: number): number {
  if (capital <= 0) return 0
  const i = tasaMensualDesdeEA(tasaEA)
  const n = anios * 12
  return (capital * i) / (1 - Math.pow(1 + i, -n))
}

export function capitalDesdeCuota(cuota: number, tasaEA: number, anios: number): number {
  if (cuota <= 0) return 0
  const i = tasaMensualDesdeEA(tasaEA)
  const n = anios * 12
  return (cuota * (1 - Math.pow(1 + i, -n))) / i
}

export function gastosDeCompra(precio: number): GastosCompra {
  const timbre = precio * 0.035
  const registro = precio * 0.01
  const juridicos = precio * 0.015
  const avaluo = precio * 0.003
  const total = timbre + registro + juridicos + avaluo
  return { timbre, registro, juridicos, avaluo, total, pctTotal: total / precio }
}

export function ahorrosNecesarios(precio: number): number {
  return precio * PCT_ENTRADA + gastosDeCompra(precio).total
}

export function presupuestoMaximo(
  ahorros: number,
  ingresoMensual: number,
  tasaEA: number = TASA_EA_DEFAULT,
  anios: number = PLAZO_DEFAULT,
): number {
  const cuotaMax = ingresoMensual * PCT_CUOTA_INGRESO
  const capitalCredito = capitalDesdeCuota(cuotaMax, tasaEA, anios)
  const precioPorCredito = capitalCredito / PCT_FINANCIACION
  const pctEntradaGastos = PCT_ENTRADA + 0.063
  const precioPorAhorros = ahorros / pctEntradaGastos
  return Math.max(0, Math.floor(Math.min(precioPorCredito, precioPorAhorros) / 1_000_000) * 1_000_000)
}

export function cuotaEstimada(
  precio: number,
  tasaEA: number = TASA_EA_DEFAULT,
  anios: number = PLAZO_DEFAULT,
): number {
  const capital = precio * PCT_FINANCIACION
  return cuotaMensualFrancesa(capital, tasaEA, anios)
}

export interface TablaAmortizacion {
  mes: number
  cuota: number
  intereses: number
  abonoCapital: number
  saldo: number
}

export function tablaAmortizacion(
  capital: number,
  tasaEA: number,
  anios: number,
): TablaAmortizacion[] {
  const i = tasaMensualDesdeEA(tasaEA)
  const n = anios * 12
  const cuota = cuotaMensualFrancesa(capital, tasaEA, anios)
  const filas: TablaAmortizacion[] = []
  let saldo = capital

  for (let mes = 1; mes <= n; mes++) {
    const intereses = saldo * i
    const abonoCapital = cuota - intereses
    saldo = Math.max(0, saldo - abonoCapital)
    filas.push({ mes, cuota, intereses, abonoCapital, saldo })
  }

  return filas
}
