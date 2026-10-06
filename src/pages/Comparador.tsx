import { Link } from 'react-router-dom'
import { useComparador, MAX_COMPARADOR } from '../context/ComparadorContext'
import { APARTAMENTOS } from '../data/apartamentos'
import { getLocalidad } from '../data/localidades'
import { domusScore } from '../utils/score'
import { cuotaEstimada, ahorrosNecesarios } from '../utils/finanzas'
import { formatArea, formatCOP, formatMillones } from '../utils/format'
import type { Apartamento } from '../data/types'
import './comparador.css'

interface Fila {
  label: string
  get: (a: Apartamento) => number
  fmt: (v: number) => string
  mejor?: 'min' | 'max'
  pct?: boolean
}

const FILAS: Fila[] = [
  { label: 'Precio', get: (a) => a.precio, fmt: (v) => formatCOP(v), mejor: 'min' },
  {
    label: 'Precio por m²',
    get: (a) => a.precio / a.area,
    fmt: (v) => formatMillones(v),
    mejor: 'min',
  },
  { label: 'Área construida', get: (a) => a.area, fmt: (v) => formatArea(v), mejor: 'max' },
  { label: 'Habitaciones', get: (a) => a.habitaciones, fmt: (v) => String(v), mejor: 'max' },
  { label: 'Baños', get: (a) => a.banos, fmt: (v) => String(v), mejor: 'max' },
  { label: 'Parqueaderos', get: (a) => a.parqueaderos, fmt: (v) => String(v), mejor: 'max' },
  { label: 'Estrato', get: (a) => a.estrato, fmt: (v) => String(v) },
  {
    label: 'Administración/mes',
    get: (a) => a.administracion,
    fmt: (v) => formatCOP(v),
    mejor: 'min',
  },
  { label: 'Cuota crédito estimada', get: (a) => cuotaEstimada(a.precio), fmt: (v) => formatCOP(v), mejor: 'min' },
  { label: 'Ahorros necesarios (entrada + gastos)', get: (a) => ahorrosNecesarios(a.precio), fmt: (v) => formatCOP(v), mejor: 'min' },
  {
    label: 'Arriendo estimado/mes',
    get: (a) => a.arriendoEstimado,
    fmt: (v) => formatCOP(v),
    mejor: 'max',
  },
  {
    label: 'Rentabilidad anual',
    get: (a) => (a.arriendoEstimado * 12) / a.precio,
    fmt: (v) => `${(v * 100).toFixed(1)}%`,
    mejor: 'max',
  },
  {
    label: 'Valorización anual',
    get: (a) => a.valorizacionAnual,
    fmt: (v) => `${v.toFixed(1)}%`,
    mejor: 'max',
  },
  {
    label: 'Domus Score',
    get: (a) => domusScore(a, APARTAMENTOS).total,
    fmt: (v) => String(v),
    mejor: 'max',
  },
]

export default function Comparador() {
  const { ids, quitar, limpiar } = useComparador()

  const items = ids
    .map((id) => APARTAMENTOS.find((a) => a.id === id))
    .filter((a): a is Apartamento => Boolean(a))

  if (items.length === 0) {
    return (
      <section className="container comparador-empty">
        <div className="vacio card">
          <div className="vacio__icon" aria-hidden="true">
            ⚖️
          </div>
          <h3>Tu comparador está vacío</h3>
          <p>
            Agrega hasta {MAX_COMPARADOR} unidades desde la ficha, el listado o la portada para
            compararlas lado a lado.
          </p>
          <Link to="/apartamentos" className="btn btn--primary">
            Explorar apartamentos
          </Link>
        </div>
      </section>
    )
  }

  const soloUno = items.length === 1

  return (
    <section className="page-comparador">
      <div className="container">
        <div className="compara-hero">
          <span className="eyebrow">Comparador DOMUS</span>
          <h1>
            ¿Cuál te <span className="grad-text">conviene más</span>?
          </h1>
          <p>
            {items.length} de {MAX_COMPARADOR} unidades seleccionadas. Compara el precio, la cuota,
            los ahorros necesarios y la rentabilidad en un solo vistazo. La celda destacada es la
            mejor de cada fila.
          </p>

          <div className="compara-acciones">
            <Link to="/apartamentos" className="btn btn--ghost">
              + Agregar unidades
            </Link>
            <button type="button" className="btn btn--ghost" onClick={limpiar}>
              Vaciar comparador
            </button>
          </div>
        </div>

        {soloUno && (
          <div className="compara-aviso">
            Agrega al menos una unidad más para ver la celda destacada de cada indicador.
          </div>
        )}

        <div className="compta-scroll">
          <table className="compta">
            <thead>
              <tr className="compta__head">
                <th className="compta__col-label">Indicador</th>
                {items.map((a) => {
                  const loc = getLocalidad(a.localidadId)
                  return (
                    <th key={a.id} className="compta__col-item">
                      <Link to={`/apartamentos/${a.id}`} className="compta__thumb">
                        <img src={a.fotos[0]} alt={a.titulo} />
                      </Link>
                      <Link to={`/apartamentos/${a.id}`} className="compta__titulo">
                        {a.titulo}
                      </Link>
                      <span className="compta__loc">
                        {loc.nombre} · {a.barrio}
                      </span>
                      <span className="compta__precio">{formatCOP(a.precio)}</span>
                    </th>
                  )
                })}
              </tr>
            </thead>
            <tbody>
              {FILAS.map((fila) => {
                const valores = items.map(fila.get)
                const mejorValor =
                  fila.mejor === 'min'
                    ? Math.min(...valores)
                    : fila.mejor === 'max'
                      ? Math.max(...valores)
                      : null
                return (
                  <tr key={fila.label} className={fila.label === 'Domus Score' ? 'compta__row-score' : ''}>
                    <th className="compta__col-label">{fila.label}</th>
                    {valores.map((v, i) => {
                      const esMejor = mejorValor !== null && Math.abs(v - mejorValor) < 1e-6
                      return (
                        <td
                          key={items[i]!.id}
                          className={esMejor ? 'is-best' : ''}
                          title={esMejor ? 'Mejor de la fila' : undefined}
                        >
                          {fila.fmt(v)}
                        </td>
                      )
                    })}
                  </tr>
                )
              })}
              <tr className="compta__acciones">
                <th className="compta__col-label">Acciones</th>
                {items.map((a) => (
                  <td key={a.id}>
                    <div className="compta__acciones-cell">
                      <Link to={`/apartamentos/${a.id}`} className="btn btn--primary btn--sm">
                        Ver ficha completa
                      </Link>
                      <button type="button" className="compta__quitar" onClick={() => quitar(a.id)}>
                        Quitar del comparador
                      </button>
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        <p className="compta-note">
          Cuota y ahorros con 20% de entrada, gastos de compra (~6,3%), tasa 10,5% EA y 20 años.
          El Domus Score combina asequibilidad, rentabilidad y valorización.
        </p>
      </div>
    </section>
  )
}