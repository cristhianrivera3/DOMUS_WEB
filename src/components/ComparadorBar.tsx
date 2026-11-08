import { Link, useLocation } from 'react-router-dom'
import { useComparador, MAX_COMPARADOR } from '../context/ComparadorContext'
import { APARTAMENTOS } from '../data/apartamentos'
import { formatMillones } from '../utils/format'
import { track } from '../utils/analytics'
import './comparador-bar.css'

export default function ComparadorBar() {
  const { ids, quitar, limpiar, lleno } = useComparador()
  const location = useLocation()

  if (ids.length === 0 || location.pathname === '/comparador') return null

  const items = ids
    .map((id) => APARTAMENTOS.find((a) => a.id === id))
    .filter((a): a is (typeof APARTAMENTOS)[number] => Boolean(a))

  return (
    <div className="cbar" role="region" aria-label="Barra del comparador">
      <div className="container cbar__inner">
        <span className="cbar__label">
          Comparador
          <strong>
            {items.length}/{MAX_COMPARADOR}
          </strong>
        </span>

        <ul className="cbar__chips">
          {items.map((a) => (
            <li key={a.id}>
              <span className="cbar__chip">
                <span className="cbar__chip-name">{a.titulo}</span>
                <span className="cbar__chip-price">{formatMillones(a.precio, 0)}</span>
                <button
                  type="button"
                  onClick={() => quitar(a.id)}
                  aria-label={`Quitar ${a.titulo} del comparador`}
                >
                  ×
                </button>
              </span>
            </li>
          ))}
        </ul>

        <div className="cbar__actions">
          <button type="button" className="cbar__vaciar" onClick={limpiar}>
            Vaciar
          </button>
          {items.length >= 2 ? (
            <Link
              to="/comparador"
              className="btn btn--primary btn--sm"
              onClick={() => track('comparador_ver', { unidades: items.length })}
            >
              Comparar ahora
            </Link>
          ) : (
            <button
              type="button"
              className="btn btn--ghost btn--sm"
              disabled
              title="Agrega al menos 2 unidades para comparar"
            >
              Comparar ahora
            </button>
          )}
        </div>

        {lleno && <span className="cbar__full">Máximo {MAX_COMPARADOR} unidades</span>}
      </div>
    </div>
  )
}
