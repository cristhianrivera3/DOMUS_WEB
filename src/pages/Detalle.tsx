import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ClaridadPanel from '../components/ClaridadPanel'
import ApartmentCard from '../components/ApartmentCard'
import MapView from '../components/MapView'
import Reveal from '../components/Reveal'
import { APARTAMENTOS, getApartamento } from '../data/apartamentos'
import { getLocalidad } from '../data/localidades'
import { useComparador } from '../context/ComparadorContext'
import { SITE } from '../config/site'
import { formatArea, formatCOP } from '../utils/format'
import { unsplashSrcSet } from '../utils/image'
import { usePageMeta } from '../hooks/usePageMeta'
import './detalle.css'

export default function Detalle() {
  const { id } = useParams()
  const { toggle, ids } = useComparador()
  const apartamento = id ? getApartamento(id) : undefined
  const [foto, setFoto] = useState(0)
  const itemsMapa = useMemo(() => (apartamento ? [apartamento] : []), [apartamento])

  const locMeta = apartamento ? getLocalidad(apartamento.localidadId) : undefined

  usePageMeta(
    apartamento && locMeta
      ? {
          title: `${apartamento.titulo} — ${locMeta.nombre} en venta`,
          description: `${apartamento.titulo} en ${apartamento.barrio}, ${locMeta.nombre}. ${apartamento.area} m², ${apartamento.habitaciones} habitaciones. ${formatCOP(apartamento.precio)}. Panel de Claridad y Domus Score.`,
          path: `/apartamentos/${apartamento.id}`,
          image: apartamento.fotos[0],
          jsonLd: {
            '@context': 'https://schema.org',
            '@type': 'RealEstateListing',
            name: apartamento.titulo,
            description: apartamento.descripcion,
            url: `${SITE.url}/apartamentos/${apartamento.id}`,
            image: apartamento.fotos,
            offers: {
              '@type': 'Offer',
              price: apartamento.precio,
              priceCurrency: 'COP',
              availability: 'https://schema.org/InStock',
            },
            address: {
              '@type': 'PostalAddress',
              streetAddress: apartamento.barrio,
              addressLocality: 'Bogotá',
              addressRegion: 'Bogotá DC',
              addressCountry: 'CO',
            },
            geo: {
              '@type': 'GeoCoordinates',
              latitude: apartamento.lat,
              longitude: apartamento.lng,
            },
            floorSize: {
              '@type': 'QuantitativeValue',
              value: apartamento.area,
              unitCode: 'MTK',
            },
            numberOfRooms: apartamento.habitaciones,
            numberOfBathroomsTotal: apartamento.banos,
          },
        }
      : {
          title: 'Unidad no encontrada',
          description: 'La unidad que buscas no está disponible en el catálogo DOMUS.',
          path: `/apartamentos/${id ?? ''}`,
        },
  )

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
                <img
                  src={a.fotos[foto]}
                  srcSet={unsplashSrcSet(a.fotos[foto], [640, 960, 1400])}
                  sizes="(max-width: 1080px) 92vw, 800px"
                  width={1200}
                  height={675}
                  alt={`${a.titulo} — foto ${foto + 1}`}
                  loading={foto === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                />
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
                    <img
                      src={f}
                      srcSet={unsplashSrcSet(f, [160, 320])}
                      sizes="120px"
                      width={160}
                      height={100}
                      alt=""
                      loading="lazy"
                      decoding="async"
                    />
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
              <MapView items={itemsMapa} onSelect={() => undefined} />
            </div>

            {similares.length > 0 && (
              <div className="detalle__similares">
                <h2>Unidades similares</h2>
                <div className="detalle__similares-grid">
                  {similares.map((s, i) => (
                    <Reveal key={s.id} delay={i * 80}>
                      <ApartmentCard
                        apartamento={s}
                        onComparar={toggle}
                        enComparador={ids.includes(s.id)}
                      />
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
