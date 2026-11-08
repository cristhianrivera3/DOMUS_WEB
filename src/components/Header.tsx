import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Logo from './Logo'
import { SITE } from '../config/site'
import { track } from '../utils/analytics'
import './header.css'

const NAV_LINKS = [
  { to: '/', label: 'Inicio', end: true },
  { to: '/apartamentos', label: 'Apartamentos' },
  { to: '/simulador', label: 'Simulador' },
  { to: '/comparador', label: 'Comparador' },
  { to: '/favoritos', label: 'Favoritos' },
  { to: '/contacto', label: 'Contacto' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open])

  return (
    <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
      <div className="container header__inner">
        <Link to="/" className="header__brand" onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        <nav
          id="menu-principal"
          className={`header__nav ${open ? 'is-open' : ''}`}
          aria-label="Principal"
        >
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) => `header__link ${isActive ? 'is-active' : ''}`}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
          <a
            className="btn btn--whatsapp btn--sm header__cta header__cta--mobile"
            href={SITE.whatsapp}
            target="_blank"
            rel="noreferrer"
            onClick={() => {
              setOpen(false)
              track('header_whatsapp')
            }}
          >
            Escríbenos
          </a>
        </nav>

        <div className="header__actions">
          <a
            className="btn btn--primary btn--sm header__cta"
            href={SITE.whatsapp}
            target="_blank"
            rel="noreferrer"
            onClick={() => track('header_whatsapp')}
          >
            Agenda tu visita
          </a>
          <button
            type="button"
            className={`burger ${open ? 'is-open' : ''}`}
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open}
            aria-controls="menu-principal"
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  )
}
