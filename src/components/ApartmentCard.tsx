import { Link } from 'react-router-dom'
import type { Apartamento } from '../data/types'
import { getLocalidad } from '../data/localidades'
import { formatCOP, formatMillones, formatArea } from '../utils/format'
import './apartment-card.css'

interface ApartmentCardProps {
  apartamento: Apartamento
  onComparar?: (id: string) => void
  enComparador?: boolean
}

export default function ApartmentCard({ apartamento: a, onComparar, enComparador }: ApartmentCardProps) {
  const loc = getLocalidad(a.localidadId)
  const precioM2 = a.precio / a.area

  return (
    <article className="apt-card card">
      <Link to={`/apartamentos/${a.id}`} className="apt-card__media">
        <img src={a.fotos[0]} alt={a.titulo} loading="lazy" />
        <div className="apt-card__badges">
          {a.estado === 'nuevo' && <span className="badge badge--nuevo">Nuevo</span>}
          {a.vis && <span className="badge badge--vis">VIS</span>}
          <span className="badge badge--tipo">{a.tipo}</span>
        </div>
      </Link>

      <div className="apt-card__body">
        <div className="apt-card__loc">
          <span className="apt-card__dot" aria-hidden="true" />
          {loc.nombre} · {a.barrio}
        </div>

        <Link to={`/apartamentos/${a.id}`}>
          <h3 className="apt-card__titulo">{a.titulo}</h3>
        </Link>

        <div className="apt-card__precio">
          {formatCOP(a.precio)}
          <span className="apt-card__precio-m2">{formatMillones(precioM2)}/m²</span>
        </div>

        <ul className="apt-card__specs">
          <li>
            <strong>{formatArea(a.area)}</strong> construidos
          </li>
          <li>
            <strong>{a.habitaciones}</strong> {a.habitaciones === 1 ? 'hab' : 'habs'}
          </li>
          <li>
            <strong>{a.banos}</strong> {a.banos === 1 ? 'baño' : 'baños'}
          </li>
          <li>
            <strong>{a.parqueaderos}</strong> {a.parqueaderos === 1 ? 'parq' : 'parq'}
          </li>
        </ul>

        <div className="apt-card__footer">
          <span className="apt-card__admin">
            Admin. {formatCOP(a.administracion)}/mes
          </span>
          <div className="apt-card__actions">
            {onComparar && (
              <button
                type="button"
                className={`apt-card__compare ${enComparador ? 'is-active' : ''}`}
                onClick={() => onComparar(a.id)}
                aria-label={enComparador ? 'Quitar del comparador' : 'Añadir al comparador'}
              >
                {enComparador ? '✓' : '+'}
              </button>
            )}
            <Link to={`/apartamentos/${a.id}`} className="btn btn--ghost btn--sm">
              Ver ficha
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}
