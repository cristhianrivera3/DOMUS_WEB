export const MERCADO = {
  precioPromedioM2: 7421952,
  precioPromedioApartamento: 802083980,
  areaPromedio: 108,
  demandaNacionalPct: 63,
  busquedaArriendoPct: 69,
  busquedaVentaPct: 31,
  desembolsosVariacionPct: 4.8,
  leasingVariacionPct: 10.6,
  busquedasApartamentoVentaPct: 75.4,
  tomadoDe: 'Camacol, Ciencuadras e INE (Q1 2026)',
} as const

export const CIFRAS_DOMUS = [
  { valor: 63, sufijo: '%', label: 'de la demanda inmobiliaria nacional está en Bogotá' },
  { valor: 75.4, sufijo: '%', decimales: 1, label: 'de las búsquedas de compra son apartamentos' },
  { valor: 4.8, sufijo: '%', decimales: 1, label: 'crecieron los desembolsos de vivienda en 2026' },
  { valor: 69, sufijo: '%', label: 'de los usuarios busca arriendo: por eso medimos rentabilidad' },
] as const
