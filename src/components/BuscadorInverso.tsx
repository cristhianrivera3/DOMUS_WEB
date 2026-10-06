import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { formatMillones } from '../utils/format'
import { presupuestoMaximo } from '../utils/finanzas'
import './buscador-inverso.css'

const HAB_OPTS = [
  { value: 'cualquiera', label: 'Cualquiera' },
  { value: '1', label: '1 hab' },
  { value: '2', label: '2 hab' },
  { value: '3', label: '3+ hab' },
]

function soloDigitos(valor: string): number {
  const limpio = valor.replace(/\D/g, '')
  return limpio ? Number(limpio) : 0
}

export default function BuscadorInverso() {
  const navigate = useNavigate()
  const [ahorros, setAhorros] = useState(60_000_000)
  const [ingreso, setIngreso] = useState(4_500_000)
  const [hab, setHab] = useState('cualquiera')

  const maximo = useMemo(() => presupuestoMaximo(ahorros, ingreso), [ahorros, ingreso])
  const valido = ahorros > 0 && ingreso > 0 && maximo > 0

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!valido) return
    const params = new URLSearchParams({ presupuesto: String(maximo), hab })
    navigate(`/apartamentos?${params.toString()}`)
  }

  return (
    <form className="buscador border-flow" onSubmit={onSubmit} aria-label="Buscador inverso por presupuesto">
      <div className="buscador__head">
        <span className="buscador__chip">Buscador inverso</span>
        <span className="buscador__live">
          Tu presupuesto: <strong>{formatMillones(maximo, 0)}</strong>
        </span>
      </div>

      <div className="buscador__fields">
        <label className="field">
          <span className="field__label">Tus ahorros</span>
          <div className="field__input">
            <span className="field__prefix">$</span>
            <input
              type="text"
              inputMode="numeric"
              value={ahorros.toLocaleString('es-CO')}
              onChange={(e) => setAhorros(soloDigitos(e.target.value))}
              aria-label="Ahorros en pesos colombianos"
            />
          </div>
        </label>

        <label className="field">
          <span className="field__label">Ingreso mensual</span>
          <div className="field__input">
            <span className="field__prefix">$</span>
            <input
              type="text"
              inputMode="numeric"
              value={ingreso.toLocaleString('es-CO')}
              onChange={(e) => setIngreso(soloDigitos(e.target.value))}
              aria-label="Ingreso mensual en pesos colombianos"
            />
          </div>
        </label>

        <label className="field">
          <span className="field__label">Habitaciones</span>
          <div className="field__input">
            <select value={hab} onChange={(e) => setHab(e.target.value)} aria-label="Habitaciones">
              {HAB_OPTS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
        </label>

        <button className="btn btn--primary buscador__submit" type="submit" disabled={!valido}>
          Ver qué puedo comprar
        </button>
      </div>

      <p className="buscador__note">
        Estimado con tasa 10,5% EA, plazo 20 años, cuota máx. 30% de tus ingresos y gastos de compra
        incluidos.
      </p>
    </form>
  )
}
