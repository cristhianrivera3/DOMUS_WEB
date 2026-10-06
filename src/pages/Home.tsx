import { Link } from 'react-router-dom'
import BuscadorInverso from '../components/BuscadorInverso'
import ApartmentCard from '../components/ApartmentCard'
import Reveal from '../components/Reveal'
import AnimatedNumber from '../components/AnimatedNumber'
import { useComparador } from '../context/ComparadorContext'
import { APARTAMENTOS } from '../data/apartamentos'
import { LOCALIDADES } from '../data/localidades'
import { CIFRAS_DOMUS, MERCADO } from '../data/mercado'
import { formatMillones, formatPct } from '../utils/format'
import { SITE } from '../config/site'
import './home.css'

const DESTACADOS = ['a-04', 'a-02', 'a-03', 'a-09']
  .map((id) => APARTAMENTOS.find((a) => a.id === id))
  .filter((a): a is NonNullable<typeof a> => Boolean(a))

const FEATURES = [
  {
    icon: 'M12 3v18M3 12h18',
    titulo: 'Buscador inverso',
    texto: 'Dinos cuánto tienes y cuánto ganas: te mostramos exactamente qué apartamentos puedes pagar en Bogotá.',
  },
  {
    icon: 'M4 6h16M4 12h10M4 18h7',
    titulo: 'Panel de Claridad™',
    texto: 'Cuota inicial, escrituración, crédito y administración visibles en cada ficha. Costo real total, sin letra pequeña.',
  },
  {
    icon: 'M4 19V5m0 14h16M8 15l3-4 3 2 4-6',
    titulo: 'Modo Inversor',
    texto: 'Rentabilidad estimada por arriendo en cada unidad. En Bogotá, 69% busca arriendo: medimos tus oportunidades.',
  },
  {
    icon: 'M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.3 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8z',
    titulo: 'Domus Score',
    texto: 'Una sola nota que combina asequibilidad, conectividad y valorización de la zona para decidir más rápido.',
  },
]

const TOP_LOCALIDADES = [...LOCALIDADES].sort((a, b) => b.precioM2 - a.precioM2).slice(0, 8)
const MAX_PRECIO_M2 = TOP_LOCALIDADES[0]?.precioM2 ?? 1

export default function Home() {
  const { toggle, ids } = useComparador()

  return (
    <>
      <section className="hero grid-bg">
        <div className="orb orb--blue hero__orb-1" aria-hidden="true" />
        <div className="orb orb--cyan hero__orb-2" aria-hidden="true" />

        <div className="container hero__inner">
          <Reveal>
            <span className="eyebrow">Portal inmobiliario con claridad total</span>
            <h1>
              Primero te decimos <span className="grad-text">cuánto puedes</span>, luego te
              enseñamos dónde.
            </h1>
            <p className="hero__sub">
              DOMUS integra tu presupuesto real, tu crédito y los gastos de la compra en un solo
              lugar. Sin sorpresas, sin avisos duplicados, sin letras pequeñas.
            </p>
          </Reveal>

          <Reveal delay={150}>
            <BuscadorInverso />
          </Reveal>

          <Reveal delay={300}>
            <div className="hero__trust">
              <span>{APARTAMENTOS.length} unidades verificadas</span>
              <span className="hero__trust-sep" aria-hidden="true" />
              <span>16 localidades de Bogotá</span>
              <span className="hero__trust-sep" aria-hidden="true" />
              <span>Sin comisiones ocultas</span>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section--tint cifras">
        <div className="container cifras__grid">
          {CIFRAS_DOMUS.map((c, i) => (
            <Reveal key={c.label} delay={i * 90}>
              <div className="cifra">
                <div className="cifra__valor">
                  <AnimatedNumber value={c.valor} decimals={'decimales' in c ? c.decimales : 0} />
                  <span>{c.sufijo}</span>
                </div>
                <p>{c.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section porque">
        <div className="container">
          <Reveal>
            <div className="section-head">
              <span className="eyebrow">Por qué DOMUS</span>
              <h2>Los portales te muestran pisos. Nosotros, la verdad completa.</h2>
              <p>
                Nadie en Colombia integra presupuesto, crédito, gastos y rentabilidad en la misma
              ficha. Nosotros empezamos por tu bolsillo.
              </p>
            </div>
          </Reveal>

          <div className="porque__grid">
            {FEATURES.map((f, i) => (
              <Reveal key={f.titulo} delay={i * 100}>
                <article className="feature card">
                  <span className="feature__icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d={f.icon} />
                    </svg>
                  </span>
                  <h3>{f.titulo}</h3>
                  <p>{f.texto}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tint destacados">
        <div className="container">
          <Reveal>
            <div className="section-head section-head--row">
              <div>
                <span className="eyebrow">Selección DOMUS</span>
                <h2>Unidades destacadas</h2>
              </div>
              <Link to="/apartamentos" className="btn btn--ghost">
                Ver las {APARTAMENTOS.length} unidades →
              </Link>
            </div>
          </Reveal>

          <div className="destacados__grid">
            {DESTACADOS.map((a, i) => (
              <Reveal key={a.id} delay={i * 90}>
                <ApartmentCard
                  apartamento={a}
                  onComparar={toggle}
                  enComparador={ids.includes(a.id)}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section data">
        <div className="container data__grid">
          <Reveal className="data__chart">
            <div className="section-head">
              <span className="eyebrow">Índice Domus</span>
              <h2>Precio por m² en Bogotá</h2>
              <p>
                Referencia de venta por localidad · fuente:{' '}
                <span className="data__fuente">{MERCADO.tomadoDe}</span>
              </p>
            </div>

            <div className="bars">
              {TOP_LOCALIDADES.map((l, i) => (
                <div key={l.id} className="bar">
                  <span className="bar__label">{l.nombre}</span>
                  <div className="bar__track">
                    <div
                      className="bar__fill"
                      style={{ width: `${(l.precioM2 / MAX_PRECIO_M2) * 100}%`, animationDelay: `${i * 90}ms` }}
                    />
                  </div>
                  <span className="bar__value">{formatMillones(l.precioM2)}/m²</span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={150} className="data__side">
            <div className="data-card card">
              <h3>El mercado en una ficha</h3>
              <ul className="data-card__list">
                <li>
                  <span>Precio promedio apartamento</span>
                  <strong>{formatMillones(MERCADO.precioPromedioApartamento, 0)}</strong>
                </li>
                <li>
                  <span>Precio promedio m²</span>
                  <strong>{formatMillones(MERCADO.precioPromedioM2)}</strong>
                </li>
                <li>
                  <span>Área promedio</span>
                  <strong>{MERCADO.areaPromedio} m²</strong>
                </li>
                <li>
                  <span>Búsquedas de arriendo</span>
                  <strong>{formatPct(MERCADO.busquedaArriendoPct, 0)}</strong>
                </li>
                <li>
                  <span>Crecimiento de desembolsos</span>
                  <strong className="data-card__up">+{formatPct(MERCADO.desembolsosVariacionPct, 1)}</strong>
                </li>
              </ul>
              <Link to="/simulador" className="btn btn--dark data-card__cta">
                Calcular mi presupuesto →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="cta-final">
        <div className="container cta-final__inner">
          <Reveal>
            <h2>¿Listo para saber cuánto puedes comprar de verdad?</h2>
            <p>
              Agenda una visita o escríbenos: te respondemos con números claros, no con promesas.
            </p>
            <div className="cta-final__actions">
              <a className="btn btn--whatsapp btn--lg" href={SITE.whatsapp} target="_blank" rel="noreferrer">
                Hablar por WhatsApp
              </a>
              <Link to="/simulador" className="btn btn--ghost btn--lg cta-final__ghost">
                Probar el simulador
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
