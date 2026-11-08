import { Link } from 'react-router-dom'
import ApartmentCard from '../components/ApartmentCard'
import Reveal from '../components/Reveal'
import { APARTAMENTOS } from '../data/apartamentos'
import { useComparador } from '../context/ComparadorContext'
import { useFavoritos } from '../context/FavoritosContext'
import { usePageMeta } from '../hooks/usePageMeta'
import './favoritos.css'

export default function Favoritos() {
  usePageMeta({
    title: 'Mis favoritos',
    description:
      'Tus apartamentos guardados en DOMUS. Retoma la búsqueda y compara tus unidades favoritas.',
    path: '/favoritos',
  })

  const { ids, limpiar } = useFavoritos()
  const { toggle, ids: comparadorIds } = useComparador()

  const items = ids
    .map((id) => APARTAMENTOS.find((a) => a.id === id))
    .filter((a): a is (typeof APARTAMENTOS)[number] => Boolean(a))

  return (
    <section className="page-favoritos">
      <div className="fav-hero grid-bg">
        <div className="container">
          <span className="eyebrow">Tus favoritos</span>
          <h1>
            Las unidades que <span className="grad-text">te gustaron</span>
          </h1>
          <p>
            Guardadas en este navegador para que vuelvas cuando quieras. Compáralas o agenda una
            visita cuando estés listo.
          </p>
        </div>
      </div>

      <div className="container">
        {items.length === 0 ? (
          <div className="vacio card">
            <div className="vacio__icon" aria-hidden="true">
              ♡
            </div>
            <h3>Aún no tienes favoritos</h3>
            <p>Toca el corazón en cualquier unidad para guardarla aquí.</p>
            <Link to="/apartamentos" className="btn btn--primary">
              Explorar apartamentos
            </Link>
          </div>
        ) : (
          <>
            <div className="fav-toolbar">
              <strong>
                {items.length} {items.length === 1 ? 'unidad guardada' : 'unidades guardadas'}
              </strong>
              <button type="button" className="btn btn--ghost btn--sm" onClick={limpiar}>
                Vaciar favoritos
              </button>
            </div>

            <div className="fav-grid">
              {items.map((a, i) => (
                <Reveal key={a.id} delay={Math.min(i * 60, 360)}>
                  <ApartmentCard
                    apartamento={a}
                    onComparar={toggle}
                    enComparador={comparadorIds.includes(a.id)}
                  />
                </Reveal>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  )
}
