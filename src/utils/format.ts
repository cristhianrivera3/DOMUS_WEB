const copFmt = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  maximumFractionDigits: 0,
})

export function formatCOP(valor: number): string {
  return copFmt.format(valor)
}

export function formatMillones(valor: number, decimales = 1): string {
  const millones = valor / 1_000_000
  return `${millones.toLocaleString('es-CO', {
    minimumFractionDigits: decimales,
    maximumFractionDigits: decimales,
  })} M`
}

export function formatPct(valor: number, decimales = 1): string {
  return `${valor.toLocaleString('es-CO', {
    minimumFractionDigits: decimales,
    maximumFractionDigits: decimales,
  })}%`
}

export function formatArea(area: number): string {
  return `${area.toLocaleString('es-CO')} m²`
}
