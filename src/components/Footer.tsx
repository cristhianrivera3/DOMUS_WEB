import { Link } from 'react-router-dom'
import Logo from './Logo'
import { SITE } from '../config/site'
import './footer.css'

const NAV = [
  { to: '/', label: 'Inicio' },
  { to: '/apartamentos', label: 'Apartamentos' },
  { to: '/simulador', label: 'Simulador de crédito' },
  { to: '/comparador', label: 'Comparador' },
  { to: '/contacto', label: 'Contacto' },
]

const SERVICES = [
  'Buscador inverso por presupuesto',
  'Panel de Claridad™ en cada ficha',
  'Modo Inversor con rentabilidad',
  'Domus Score y Índice Domus',
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer__glow" aria-hidden="true" />
      <div className="container footer__grid">
        <div className="footer__brand">
          <Logo light />
          <p className="footer__tagline">{SITE.tagline}</p>
          <a
            className="btn btn--whatsapp btn--sm"
            href={SITE.whatsapp}
            target="_blank"
            rel="noreferrer"
          >
            Hablar por WhatsApp
          </a>
        </div>

        <nav className="footer__col" aria-label="Navegación">
          <h4>Navegar</h4>
          {NAV.map((item) => (
            <Link key={item.to} to={item.to} className="footer__link">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="footer__col">
          <h4>Qué nos hace distintos</h4>
          {SERVICES.map((item) => (
            <span key={item} className="footer__link footer__link--static">
              {item}
            </span>
          ))}
        </div>

        <div className="footer__col">
          <h4>Contacto</h4>
          <a className="footer__link" href={`tel:${SITE.phone.replace(/\s/g, '')}`}>
            {SITE.phone}
          </a>
          <a className="footer__link" href={`mailto:${SITE.email}`}>
            {SITE.email}
          </a>
          <span className="footer__link footer__link--static">{SITE.address}</span>
        </div>
      </div>

      <div className="container footer__bottom">
        <span>
          © {year} DOMUS · {SITE.city}
        </span>
        <span className="footer__stack">Hecho con React + TypeScript · Vite</span>
      </div>
    </footer>
  )
}
