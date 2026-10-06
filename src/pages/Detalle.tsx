import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ClaridadPanel from '../components/ClaridadPanel'
import ApartmentCard from '../components/ApartmentCard'
import MapView from '../components/MapView'
import Reveal from '../components/Reveal'
import { APARTAMENTOS, getApartamento } from '../data/apartamentos'
import { getLocalidad } from '../data/localidades'
import { formatArea, formatCOP } from '../utils/format'
import './detalle.css'

export default function Detalle() {
  const { id } = useParams()
  const apartamento = id ? getApartamento(id) : undefined
  const [foto, setFoto] = useState(0)

  if (!apartamento) {
    return (
      <section className="container detalle-404">
        <div className="vacio card">
          <div className="vacio__icon" aria-hidden="true">
            🏠
          </div>
          <h3>No encontramos esta unidad</h3>
          <p>Puede que se haya vendido o que el enlace haya cambiado.</p>
          <Link to="/apartamentos" className="btn btn--primary">
            Ver apartamentos disponibles
          </Link>
        </div>
      </section>
    )
  }

  const a = apartamento
  const loc = getLocalidad(a.localidadId)
  const similares = APARTAMENTOS.filter(
    (c) => c.id !== a.id && (c.localidadId === a.localidadId || Math.abs(c.precio - a.precio) < a.precio * 0.25),
  ).slice(0, 3)

  const specs = [
    { label: 'Área construida', value: formatArea(a.area) },
    { label: 'Precio por m²', value: formatCOP(a.precio / a.area) },
    { label: 'Habitaciones', value: String(a.habitaciones) },
    { label: 'Baños', value: String(a.banos) },
    { label: 'Parqueaderos', value: String(a.parqueaderos) },
    { label: 'Estrato', value: String(a.estrato) },
    { label: 'Administración', value: `${formatCOP(a.administracion)}/mes` },
    { label: 'Año', value: String(a.anio) },
  ]

  return (
    <section className="detalle">
      <div className="container">
        <nav className="miga" aria-label="Migas de pan">
          <Link to="/">Inicio</Link>
          <span aria-hidden="true">/</span>
          <Link to="/apartamentos">Apartamentos</Link>
          <span aria-hidden="true">/</span>
          <span className="miga__actual">{a.titulo}</span>
        </nav>

        <div className="detalle__head">
          <div>
            <div className="detalle__badges">
              <span className="badge badge--loc">
                {loc.nombre} · {a.barrio}
              </span>
              {a.estado === 'nuevo' && <span className="badge badge--nuevo">Nuevo</span>}
              {a.vis && <span className="badge badge--vis">VIS</span>}
              <span className="badge badge--tipo">{a.tipo}</span>
            </div>
            <h1>{a.titulo}</h1>
            <p className="detalle__meta">
              Publicado hace {a.antiguedadDias} {a.antiguedadDias === 1 ? 'día' : 'días'} · Unidad
              verificada DOMUS
            </p>
          </div>
        </div>

        <div className="detalle__layout">
          <div className="detalle__main">
            <div className="galeria">
              <div className="galeria__main">
                <img src={a.fotos[foto]} alt={`${a.titulo} — foto ${foto + 1}`} />
                <span className="galeria__counter">
                  {foto + 1} / {a.fotos.length}
                </span>
              </div>
              <div className="galeria__thumbs">
                {a.fotos.map((f, i) => (
                  <button
                    key={f}
                    type="button"
                    className={`galeria__thumb ${i === foto ? 'is-active' : ''}`}
                    onClick={() => setFoto(i)}
                    aria-label={`Ver foto ${i + 1}`}
                  >
                    <img src={f} alt="" />
                  </button>
                ))}
              </div>
            </div>

            <div className="detalle__specs card">
              {specs.map((s) => (
                <div key={s.label} className="spec">
                  <span>{s.label}</span>
                  <strong>{s.value}</strong>
                </div>
              ))}
            </div>

            <div className="detalle__desc">
              <h2>Descripción</h2>
              <p>{a.descripcion}</p>
              <div className="caracteristicas">
                {a.caracteristicas.map((c) => (
                  <span key={c} className="caracteristica">
                    ✓ {c}
                  </span>
                ))}
              </div>
            </div>

            <div className="detalle__mapa">
              <h2>Ubicación</h2>
              <p className="detalle__mapa-sub">
                {loc.nombre} — {loc.resumen}
              </p>
              <MapView items={[a]} onSelect={() => undefined} />
            </div>

            {similares.length > 0 && (
              <div className="detalle__similares">
                <h2>Unidades similares</h2>
                <div className="detalle__similares-grid">
                  {similares.map((s, i) => (
                    <Reveal key={s.id} delay={i * 80}>
                      <ApartmentCard apartamento={s} />
                    </Reveal>
                  ))}
                </div>
              </div>
            )}
          </div>

          <ClaridadPanel apartamento={a} />
        </div>
      </div>
    </section>
  )
}
