import { useState, type FormEvent } from 'react'
import { SITE } from '../config/site'
import './contacto.css'

const MOTIVOS = [
  'Quiero comprar un apartamento',
  'Quiero vender o publicar mi propiedad',
  'Invertir: busco rentabilidad por arriendo',
  'Simular mi crédito',
  'Otro',
]

export default function Contacto() {
  const [nombre, setNombre] = useState('')
  const [telefono, setTelefono] = useState('')
  const [correo, setCorreo] = useState('')
  const [motivo, setMotivo] = useState(MOTIVOS[0])
  const [mensaje, setMensaje] = useState('')

  const enviar = (e: FormEvent) => {
    e.preventDefault()
    const texto = `Hola ${SITE.name}, soy ${nombre}.\nMotivo: ${motivo}.\n${mensaje ? `Detalle: ${mensaje}\n` : ''}¿Me ayudan?`
    window.open(
      `${SITE.whatsapp.split('?')[0]}?text=${encodeURIComponent(texto)}`,
      '_blank',
      'noopener',
    )
  }

  return (
    <section className="page-contacto">
      <div className="cont-hero grid-bg">
        <div className="container">
          <span className="eyebrow">Contacto</span>
          <h1>
            Hablemos de tu <span className="grad-text">próximo apartamento</span>
          </h1>
          <p className="cont-hero__sub">
            Un asesor real te responde por WhatsApp en menos de 15 minutos en horario hábil. Sin
            spam, sin compras de contactos, solo claridad.
          </p>
        </div>
      </div>

      <div className="container cont-body">
        <div className="cont-grid">
          <form className="cont-form card" onSubmit={enviar}>
            <div className="cont-form__head">
              <h2>Escríbenos</h2>
              <p>Llena el formulario y tu mensaje llega directo a nuestro equipo.</p>
            </div>

            <div className="cont-form__row">
              <label className="cont-campo">
                <span>Nombre</span>
                <input
                  type="text"
                  required
                  placeholder="Tu nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
              </label>
              <label className="cont-campo">
                <span>WhatsApp / Teléfono</span>
                <input
                  type="tel"
                  inputMode="tel"
                  placeholder="+57 3xx xxx xxxx"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                />
              </label>
            </div>

            <div className="cont-form__row">
              <label className="cont-campo">
                <span>Correo electrónico</span>
                <input
                  type="email"
                  placeholder="tucorreo@ejemplo.com"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                />
              </label>
              <label className="cont-campo">
                <span>¿En qué te ayudamos?</span>
                <select value={motivo} onChange={(e) => setMotivo(e.target.value)}>
                  {MOTIVOS.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <label className="cont-campo">
              <span>Mensaje</span>
              <textarea
                rows={4}
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
                placeholder="Cuéntanos qué buscas: zona, presupuesto, número de habitaciones..."
              />
            </label>

            <p className="cont-form__note">
              Al enviar se abre WhatsApp con tu mensaje ya escrito. Solo debes presionar enviar. 📲
            </p>

            <button type="submit" className="btn btn--primary cont-form__submit">
              Enviar consulta por WhatsApp →
            </button>
          </form>

          <aside className="cont-info">
            <div className="cont-info__block card">
              <h3>Datos de contacto</h3>
              <ul>
                <li>
                  <span>📞</span>
                  <div>
                    <strong>Línea directa</strong>
                    <a href={`tel:${SITE.phone.replace(/\s/g, '')}`}>{SITE.phone}</a>
                  </div>
                </li>
                <li>
                  <span>✉️</span>
                  <div>
                    <strong>Correo</strong>
                    <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
                  </div>
                </li>
                <li>
                  <span>📍</span>
                  <div>
                    <strong>Ubicación</strong>
                    <p>{SITE.city}</p>
                  </div>
                </li>
                <li>
                  <span>🕘</span>
                  <div>
                    <strong>Horario</strong>
                    <p>Lun a Sáb · 8am a 6pm</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="cont-info__block cont-info__promise card">
              <h3>Nuestro compromiso</h3>
              <ul>
                <li>✓ Primero tu presupuesto, después la vitrina</li>
                <li>✓ Sin avisos duplicados ni inventario fantasma</li>
                <li>✓ Costo real del crédito en cada ficha</li>
                <li>✓ Asesoría para vender o invertir sin presión</li>
              </ul>
            </div>

            <a
              className="cont-info__cta"
              href={`${SITE.whatsapp.split('?')[0]}?text=${encodeURIComponent(
                'Hola DOMUS, quiero agendar una asesoría gratuita.',
              )}`}
              target="_blank"
              rel="noreferrer"
            >
              <strong>¿Prefieres llamar o escribir ya?</strong>
              <span>Agenda una asesoría gratuita por WhatsApp</span>
            </a>
          </aside>
        </div>
      </div>
    </section>
  )
}