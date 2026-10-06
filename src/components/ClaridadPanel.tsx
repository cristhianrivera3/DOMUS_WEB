import type { CSSProperties } from 'react'
import type { Apartamento } from '../data/types'
import { getLocalidad } from '../data/localidades'
import { formatCOP, formatMillones } from '../utils/format'
import { PCT_ENTRADA, PCT_CUOTA_INGRESO, cuotaEstimada, gastosDeCompra } from '../utils/finanzas'
import { domusScore } from '../utils/score'
import { APARTAMENTOS } from '../data/apartamentos'
import { SITE } from '../config/site'
import { useComparador } from '../context/ComparadorContext'
import './claridad-panel.css'

export default function ClaridadPanel({ apartamento: a }: { apartamento: Apartamento }) {
  const { toggle, ids, lleno } = useComparador()
  const enComparador = ids.includes(a.id)
  const gastos = gastosDeCompra(a.precio)
  const entrada = a.precio * PCT_ENTRADA
  const ahorrosNecesarios = entrada + gastos.total
  const cuota = cuotaEstimada(a.precio)
  const totalMensual = cuota + a.administracion
  const ingresoNecesario = cuota / PCT_CUOTA_INGRESO
  const precioM2 = a.precio / a.area
  const score = domusScore(a, APARTAMENTOS)
  const loc = getLocalidad(a.localidadId)
  const rentabilidadAnual = (a.arriendoEstimado * 12) / a.precio

  const whatsappTexto = encodeURIComponent(
    `Hola DOMUS, me interesa el apartamento "${a.titulo}" (${formatCOP(a.precio)}) en ${loc.nombre}. ¿Podemos agendar una visita?`,
  )

  return (
    <aside className="claridad" aria-label="Panel de Claridad del apartamento">
      <div className="claridad__score border-flow">
        <div
          className="claridad__score-ring"
          style={{ '--pct': score.total } as CSSProperties}
        >
          <span>{score.total}</span>
        </div>
        <div className="claridad__score-info">
          <span className="claridad__score-label">Domus Score · {score.nivel}</span>
          <ul className="claridad__score-parts">
            {score.partes.map((p) => (
              <li key={p.nombre} title={p.detalle}>
                <span>{p.nombre}</span>
                <strong>{p.valor}</strong>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="claridad__block">
        <div className="claridad__title">
          <h3>💎 Panel de Claridad™</h3>
          <span>Costo real total</span>
        </div>

        <div className="claridad__precio">
          {formatCOP(a.precio)}
          <span>{formatMillones(precioM2)}/m²</span>
        </div>

        <ul className="claridad__rows">
          <li>
            <span>
              Cuota inicial <em>({Math.round(PCT_ENTRADA * 100)}%)</em>
            </span>
            <strong>{formatCOP(entrada)}</strong>
          </li>
          <li className="claridad__sub">
            <span>· Impuesto de timbre (est.)</span>
            <em>{formatCOP(gastos.timbre)}</em>
          </li>
          <li className="claridad__sub">
            <span>· Registro de instrumentos</span>
            <em>{formatCOP(gastos.registro)}</em>
          </li>
          <li className="claridad__sub">
            <span>· Gastos jurídicos y notaría</span>
            <em>{formatCOP(gastos.juridicos)}</em>
          </li>
          <li className="claridad__sub">
            <span>· Avalúo</span>
            <em>{formatCOP(gastos.avaluo)}</em>
          </li>
          <li className="claridad__highlight">
            <span>💰 Ahorros necesarios</span>
            <strong>{formatCOP(ahorrosNecesarios)}</strong>
          </li>
        </ul>
      </div>

      <div className="claridad__block claridad__block--blue">
        <div className="claridad__title">
          <h3>Tu crédito estimado</h3>
          <span>10,5% EA · 20 años</span>
        </div>

        <ul className="claridad__rows">
          <li>
            <span>Cuota mensual (financia 80%)</span>
            <strong>{formatCOP(cuota)}</strong>
          </li>
          <li>
            <span>Administración</span>
            <strong>{formatCOP(a.administracion)}</strong>
          </li>
          <li className="claridad__highlight">
            <span>🏠 Costo mensual total</span>
            <strong>{formatCOP(totalMensual)}</strong>
          </li>
          <li className="claridad__hint">
            Necesitas un ingreso mensual desde{' '}
            <strong>{formatCOP(ingresoNecesario)}</strong> para sostener la cuota (30% del ingreso).
          </li>
        </ul>
      </div>

      <div className="claridad__block claridad__inversor">
        <div className="claridad__title">
          <h3>📈 Modo Inversor</h3>
          <span>Dato de la zona</span>
        </div>
        <div className="claridad__inversor-grid">
          <div>
            <strong>{(rentabilidadAnual * 100).toFixed(1)}%</strong>
            <span>rentabilidad anual</span>
          </div>
          <div>
            <strong>{formatMillones(a.arriendoEstimado, 1)}</strong>
            <span>arriendo estimado/mes</span>
          </div>
          <div>
            <strong>{a.valorizacionAnual.toFixed(1)}%</strong>
            <span>valorización zona</span>
          </div>
        </div>
      </div>

      <div className="claridad__ctas">
        <a
          className="btn btn--whatsapp"
          href={`${SITE.whatsapp.split('?')[0]}?text=${whatsappTexto}`}
          target="_blank"
          rel="noreferrer"
        >
          Agendar visita por WhatsApp
        </a>
        <a className="btn btn--ghost" href={`mailto:${SITE.email}?subject=${encodeURIComponent(a.titulo)}`}>
          Solicitar información
        </a>
        <button
          type="button"
          className={`btn btn--ghost ${enComparador ? 'is-on' : ''}`}
          onClick={() => toggle(a.id)}
          disabled={lleno && !enComparador}
          title={lleno && !enComparador ? 'Máximo 3 unidades en el comparador' : undefined}
        >
          {enComparador ? '✓ En el comparador' : '⚖ Agregar al comparador'}
        </button>
      </div>

      <p className="claridad__disclaimer">
        Cifras estimadas con datos del catálogo y parámetros de crédito vigentes. Los gastos reales
        pueden variar según el banco y la notaría.
      </p>
    </aside>
  )
}
