import { useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import ApartmentCard from '../components/ApartmentCard'
import MapView from '../components/MapView'
import Reveal from '../components/Reveal'
import { APARTAMENTOS } from '../data/apartamentos'
import { LOCALIDADES } from '../data/localidades'
import { formatMillones } from '../utils/format'
import './apartamentos.css'

type Orden = 'recientes' | 'precio-asc' | 'precio-desc' | 'm2-asc' | 'rentabilidad'
type Vista = 'lista' | 'mapa'

const LOCALIDADES_EN_VENTA = LOCALIDADES.filter((l) =>
  APARTAMENTOS.some((a) => a.localidadId === l.id),
)

const ORDENES: { value: Orden; label: string }[] = [
  { value: 'recientes', label: 'Más recientes' },
  { value: 'precio-asc', label: 'Precio: menor a mayor' },
  { value: 'precio-desc', label: 'Precio: mayor a menor' },
  { value: 'm2-asc', label: 'Mejor precio por m²' },
  { value: 'rentabilidad', label: 'Mayor rentabilidad' },
]

const PRECIO_MIN = 200_000_000
const PRECIO_MAX = 2_000_000_000

export default function Apartamentos() {
  const [params] = useSearchParams()
  const navigate = useNavigate()

  const [presupuesto, setPresupuesto] = useState(() => {
    const p = Number(params.get('presupuesto'))
    return Number.isFinite(p) && p > 0 ? Math.min(p, PRECIO_MAX) : PRECIO_MAX
  })
  const [habMin, setHabMin] = useState(() => {
    const h = Number(params.get('hab'))
    return Number.isFinite(h) && h > 0 ? h : 0
  })
  const [localidad, setLocalidad] = useState('')
  const [estrato, setEstrato] = useState(0)
  const [tipo, setTipo] = useState('')
  const [soloVIS, setSoloVIS] = useState(false)
  const [orden, setOrden] = useState<Orden>('recientes')
  const [vista, setVista] = useState<Vista>('lista')

  const hayPresupuesto = presupuesto < PRECIO_MAX

  const resultados = useMemo(() => {
    const filtrados = APARTAMENTOS.filter((a) => {
      if (a.precio > presupuesto) return false
      if (habMin > 0 && a.habitaciones < habMin) return false
      if (localidad && a.localidadId !== localidad) return false
      if (estrato > 0 && a.estrato !== estrato) return false
      if (tipo && a.tipo !== tipo) return false
      if (soloVIS && !a.vis) return false
      return true
    })

    const porM2 = (a: (typeof APARTAMENTOS)[number]) => a.precio / a.area
    const rentabilidad = (a: (typeof APARTAMENTOS)[number]) => a.arriendoEstimado / a.precio

    switch (orden) {
      case 'precio-asc':
        return filtrados.sort((a, b) => a.precio - b.precio)
      case 'precio-desc':
        return filtrados.sort((a, b) => b.precio - a.precio)
      case 'm2-asc':
        return filtrados.sort((a, b) => porM2(a) - porM2(b))
      case 'rentabilidad':
        return filtrados.sort((a, b) => rentabilidad(b) - rentabilidad(a))
      default:
        return filtrados.sort((a, b) => a.antiguedadDias - b.antiguedadDias)
    }
  }, [presupuesto, habMin, localidad, estrato, tipo, soloVIS, orden])

  const limpiar = () => {
    setPresupuesto(PRECIO_MAX)
    setHabMin(0)
    setLocalidad('')
    setEstrato(0)
    setTipo('')
    setSoloVIS(false)
  }

  const hayFiltros =
    hayPresupuesto || habMin > 0 || localidad !== '' || estrato > 0 || tipo !== '' || soloVIS

  return (
    <section className="page-listado">
      <div className="listado-hero grid-bg">
        <div className="container">
          <span className="eyebrow">Apartamentos en Bogotá</span>
          <h1>
            Encuentra tu unidad con <span className="grad-text">claridad total</span>
          </h1>
          <p className="listado-hero__sub">
            {APARTAMENTOS.length} unidades verificadas. Sin avisos duplicados, con el costo real
            visible desde la primera ficha.
          </p>
        </div>
      </div>

      <div className="container listado__layout">
        <aside className="filtros card" aria-label="Filtros de búsqueda">
          <div className="filtros__head">
            <h3>Filtros</h3>
            {hayFiltros && (
              <button type="button" className="filtros__clear" onClick={limpiar}>
                Limpiar
              </button>
            )}
          </div>

          <div className="filtro">
            <div className="filtro__label">
              <span>Presupuesto máximo</span>
              <strong>{hayPresupuesto ? formatMillones(presupuesto, 0) : 'Sin límite'}</strong>
            </div>
            <input
              type="range"
              min={PRECIO_MIN}
              max={PRECIO_MAX}
              step={10_000_000}
              value={presupuesto}
              onChange={(e) => setPresupuesto(Number(e.target.value))}
              aria-label="Presupuesto máximo"
            />
          </div>

          <label className="filtro">
            <span className="filtro__title">Localidad</span>
            <select value={localidad} onChange={(e) => setLocalidad(e.target.value)}>
              <option value="">Todas las localidades</option>
              {LOCALIDADES_EN_VENTA.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.nombre}
                </option>
              ))}
            </select>
          </label>

          <div className="filtro filtro--row">
            <label>
              <span className="filtro__title">Habitaciones mín.</span>
              <select value={habMin} onChange={(e) => setHabMin(Number(e.target.value))}>
                <option value={0}>Cualquiera</option>
                <option value={1}>1+</option>
                <option value={2}>2+</option>
                <option value={3}>3+</option>
              </select>
            </label>
            <label>
              <span className="filtro__title">Estrato</span>
              <select value={estrato} onChange={(e) => setEstrato(Number(e.target.value))}>
                <option value={0}>Todos</option>
                {[2, 3, 4, 5, 6].map((e) => (
                  <option key={e} value={e}>
                    {e}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label className="filtro">
            <span className="filtro__title">Tipo</span>
            <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
              <option value="">Todos</option>
              <option value="Apartamento">Apartamento</option>
              <option value="Studio">Studio</option>
              <option value="Loft">Loft</option>
              <option value="Penthouse">Penthouse</option>
            </select>
          </label>

          <label className="filtro filtro--check">
            <input type="checkbox" checked={soloVIS} onChange={(e) => setSoloVIS(e.target.checked)} />
            <span>Solo vivienda VIS (interés social)</span>
          </label>

          <div className="filtros__note">
            El presupuesto del buscador inverso ya se aplicó aquí. Muévelo para ajustarlo.
          </div>
        </aside>

        <div className="listado__main">
          <div className="listado__toolbar">
            <div className="listado__count">
              <strong>{resultados.length}</strong>{' '}
              {resultados.length === 1 ? 'unidad encontrada' : 'unidades encontradas'}
              {hayPresupuesto && (
                <span className="chip-chip">≤ {formatMillones(presupuesto, 0)}</span>
              )}
            </div>

            <div className="listado__controls">
              <select
                className="listado__orden"
                value={orden}
                onChange={(e) => setOrden(e.target.value as Orden)}
                aria-label="Ordenar resultados"
              >
                {ORDENES.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>

              <div className="view-toggle" role="tablist" aria-label="Cambiar vista">
                <button
                  type="button"
                  role="tab"
                  aria-selected={vista === 'lista'}
                  className={vista === 'lista' ? 'is-active' : ''}
                  onClick={() => setVista('lista')}
                >
                  Lista
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={vista === 'mapa'}
                  className={vista === 'mapa' ? 'is-active' : ''}
                  onClick={() => setVista('mapa')}
                >
                  Mapa
                </button>
              </div>
            </div>
          </div>

          {resultados.length === 0 ? (
            <div className="vacio card">
              <div className="vacio__icon" aria-hidden="true">
                🔍
              </div>
              <h3>Ninguna unidad cumple esos filtros</h3>
              <p>Prueba ampliar el presupuesto o limpiar los filtros activos.</p>
              <button type="button" className="btn btn--primary" onClick={limpiar}>
                Limpiar filtros
              </button>
            </div>
          ) : vista === 'mapa' ? (
            <MapView
              items={resultados}
              onSelect={(id) => navigate(`/apartamentos/${id}`)}
            />
          ) : (
            <div className="listado__grid">
              {resultados.map((a, i) => (
                <Reveal key={a.id} delay={Math.min(i * 60, 360)}>
                  <ApartmentCard apartamento={a} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
