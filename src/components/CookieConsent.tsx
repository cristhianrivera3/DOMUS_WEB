import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './cookie-consent.css'

const STORAGE_KEY = 'domus:cookies'
const ANALYTICS_DOMAIN = import.meta.env.VITE_ANALYTICS_DOMAIN as string | undefined

type Decision = 'accepted' | 'rejected' | null

function leerDecision(): Decision {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY)
    return value === 'accepted' || value === 'rejected' ? value : null
  } catch {
    return null
  }
}

export default function CookieConsent() {
  const [decision, setDecision] = useState<Decision>(leerDecision)

  useEffect(() => {
    if (decision !== 'accepted' || !ANALYTICS_DOMAIN) return

    const script = document.createElement('script')
    script.defer = true
    script.src = 'https://plausible.io/js/script.js'
    script.dataset.domain = ANALYTICS_DOMAIN
    document.head.appendChild(script)

    return () => {
      script.remove()
    }
  }, [decision])

  const decidir = (nueva: Exclude<Decision, null>) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, nueva)
    } catch {
      // Almacenamiento no disponible: se ignora.
    }
    setDecision(nueva)
  }

  if (decision !== null) return null

  return (
    <div className="cookie" role="dialog" aria-label="Aviso de cookies" aria-live="polite">
      <p>
        Usamos cookies necesarias y, si lo aceptas, analítica anónima para mejorar DOMUS.{' '}
        <Link to="/privacidad">Más información</Link>.
      </p>
      <div className="cookie__actions">
        <button type="button" className="btn btn--ghost btn--sm" onClick={() => decidir('rejected')}>
          Solo necesarias
        </button>
        <button type="button" className="btn btn--primary btn--sm" onClick={() => decidir('accepted')}>
          Aceptar
        </button>
      </div>
    </div>
  )
}
