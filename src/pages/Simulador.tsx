import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import AnimatedNumber from '../components/AnimatedNumber'
import Reveal from '../components/Reveal'
import {
  PCT_ENTRADA,
  PCT_FINANCIACION,
  cuotaMensualFrancesa,
  gastosDeCompra,
  presupuestoMaximo,
  tablaAmortizacion,
} from '../utils/finanzas'
import { formatCOP, formatMillones, formatPct } from '../utils/format'
import './simulador.css'

function soloDigitos(valor: string): number {
  const limpio = valor.replace(/\D/g, '')
  return limpio ? Number(limpio) : 0
}

interface CampoProps {
  label: string
  valor: number
  onChange: (v: number) => void
  sufijo?: string
}

function Campo({ label, valor, onChange, sufijo }: CampoProps) {
  return (
    <label className="campo">
      <span className="campo__label">{label}</span>
      <div className="campo__input">
        <span className="campo__prefix">{sufijo ?? '$'}</span>
        <input
          type="text"
          inputMode="numeric"
          value={valor.toLocaleString('es-CO')}
          onChange={(e) => onChange(soloDigitos(e.target.value))}
        />
      </div>
    </label>
  )
}

const PLAZOS = [5, 10, 15, 20, 25, 30]

export default function Simulador() {
  const [tasa, setTasa] = useState(10.5)
  const [plazo, setPlazo] = useState(20)

  const [ahorros, setAhorros] = useState(60_000_000)
  const [ingreso, setIngreso] = useState(4_500_000)
  const [precio, setPrecio] = useState(650_000_000)

  const tasaEA = tasa / 100

  const maximo = useMemo(
    () => presupuestoMaximo(ahorros, ingreso, tasaEA, plazo),
    [ahorros, ingreso, tasaEA, plazo],
  )
  const cuotaMaxima = ingreso * 0.3

  const capital = precio * PCT_FINANCIACION
  const cuota = useMemo(
    () => cuotaMensualFrancesa(capital, tasaEA, plazo),
    [capital, tasaEA, plazo],
  )
  const gastos = gastosDeCompra(precio)
  const ahorrosNecesarios = precio * PCT_ENTRADA + gastos.total
  const totalPagado = cuota * plazo * 12
  const interesesTotales = totalPagado - capital
  const ingresoRequerido = cuota / 0.3

  const resumenAnual = useMemo(() => {
    const filas = tablaAmortizacion(capital, tasaEA, plazo)
    const anios: { anio: number; pagado: number; intereses: number; saldo: number }[] = []
    filas.forEach((f) => {
      const idx = Math.ceil(f.mes / 12) - 1
      if (!anios[idx]) anios[idx] = { anio: idx + 1, pagado: 0, intereses: 0, saldo: 0 }
      anios[idx].pagado += f.cuota
      anios[idx].intereses += f.intereses
      anios[idx].saldo = f.saldo
    })
    return anios
  }, [capital, tasaEA, plazo])

  return (
    <section className="page-simulador">
      <div className="sim-hero grid-bg">
        <div className="container">
          <span className="eyebrow">Simulador DOMUS</span>
          <h1>
            Dineros claros, <span className="grad-text">decisiones seguras</span>
          </h1>
          <p>
            Calcula tu presupuesto máximo y simula tu crédito con las mismas reglas de los bancos:
            sistema francés, gastos de compra incluidos y sin letra pequeña.
          </p>
        </div>
      </div>

      <div className="container sim-body">
        <div className="sim-condiciones card">
          <div className="sim-condiciones__title">
            <h3>Condiciones del crédito</h3>
            <span>Afectan ambos simuladores</span>
          </div>
          <div className="sim-condiciones__controls">
            <label className="campo campo--inline">
              <span className="campo__label">Tasa EA: {tasa.toFixed(1)}%</span>
              <input
                className="sim-slider"
                type="range"
                min={6}
                max={16}
                step={0.1}
                value={tasa}
                onChange={(e) => setTasa(Number(e.target.value))}
                aria-label="Tasa efectiva anual"
              />
            </label>
            <div className="sim-plazos" role="group" aria-label="Plazo en años">
              {PLAZOS.map((p) => (
                <button
                  key={p}
                  type="button"
                  className={p === plazo ? 'is-active' : ''}
                  onClick={() => setPlazo(p)}
                >
                  {p} años
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="sim-grid">
          <Reveal className="sim-panel">
            <div className="sim-panel__head">
              <span className="sim-panel__num">01</span>
              <div>
                <h2>¿Cuánto puedo comprar?</h2>
                <p>El buscador inverso completo, con tus condiciones reales.</p>
              </div>
            </div>

            <div className="sim-panel__campos">
              <Campo label="Tus ahorros" valor={ahorros} onChange={setAhorros} />
              <Campo label="Ingreso mensual" valor={ingreso} onChange={setIngreso} />
            </div>

            <div className="sim-resultado sim-resultado--highlight">
              <span className="sim-resultado__label">Presupuesto máximo estimado</span>
              <div className="sim-resultado__big">
                <AnimatedNumber value={maximo / 1_000_000} decimals={0} suffix="" prefix="$ " />
                <span className="sim-resultado__millones">millones</span>
              </div>
              <ul className="sim-resultado__list">
                <li>
                  <span>Cuota máxima (30% del ingreso)</span>
                  <strong>{formatCOP(cuotaMaxima)}</strong>
                </li>
                <li>
                  <span>Ahorros que necesitas para ese precio</span>
                  <strong>
                    {formatCOP(maximo * PCT_ENTRADA + gastosDeCompra(maximo).total)}
                  </strong>
                </li>
                <li>
                  <span>Crédito que te financian (80%)</span>
                  <strong>{formatCOP(maximo * PCT_FINANCIACION)}</strong>
                </li>
              </ul>
              <Link
                to={`/apartamentos?presupuesto=${maximo}`}
                className="btn btn--primary sim-resultado__cta"
              >
                Ver apartamentos en este rango →
              </Link>
            </div>
          </Reveal>

          <Reveal className="sim-panel" delay={120}>
            <div className="sim-panel__head">
              <span className="sim-panel__num">02</span>
              <div>
                <h2>Simula tu crédito</h2>
                <p>Elige un precio y mira la cuota real, intereses y gastos.</p>
              </div>
            </div>

            <div className="sim-panel__campos">
              <Campo label="Precio de la vivienda" valor={precio} onChange={setPrecio} />
            </div>

            <div className="sim-resultado sim-resultado--cuota">
              <span className="sim-resultado__label">Cuota mensual estimada</span>
              <div className="sim-resultado__big">
                <AnimatedNumber value={cuota} prefix="$ " decimals={0} />
              </div>
              <p className="sim-resultado__hint">
                Para que la cuota sea sostenible necesitas un ingreso desde{' '}
                <strong>{formatCOP(ingresoRequerido)}</strong> (cuota = 30% del ingreso).
              </p>
            </div>

            <div className="sim-miniGrid">
              <div className="sim-mini">
                <span>Ahorros necesarios</span>
                <strong>{formatCOP(ahorrosNecesarios)}</strong>
                <em>20% + gastos ({formatPct(gastos.pctTotal * 100, 1)})</em>
              </div>
              <div className="sim-mini">
                <span>Crédito solicitado</span>
                <strong>{formatCOP(capital)}</strong>
                <em>80% del precio</em>
              </div>
              <div className="sim-mini">
                <span>Intereses totales</span>
                <strong>{formatCOP(interesesTotales)}</strong>
                <em>en {plazo} años</em>
              </div>
              <div className="sim-mini">
                <span>Total pagado</span>
                <strong>{formatCOP(totalPagado)}</strong>
                <em>capital + intereses</em>
              </div>
            </div>

            <div className="sim-tabla-wrap">
              <h3>Resumen anual del crédito</h3>
              <div className="sim-tabla-scroll">
                <table className="sim-tabla">
                  <thead>
                    <tr>
                      <th>Año</th>
                      <th>Pagado</th>
                      <th>Intereses</th>
                      <th>Saldo final</th>
                    </tr>
                  </thead>
                  <tbody>
                    {resumenAnual.map((r) => (
                      <tr key={r.anio}>
                        <td>{r.anio}</td>
                        <td>{formatMillones(r.pagado, 0)}</td>
                        <td>{formatMillones(r.intereses, 0)}</td>
                        <td>{formatMillones(r.saldo, 0)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="sim-tabla-note">
                Valores en millones de pesos (COP). Sistema francés con capital {formatCOP(capital)}.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
