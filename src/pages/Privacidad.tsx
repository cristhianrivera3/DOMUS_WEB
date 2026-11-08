import { SITE } from '../config/site'
import { usePageMeta } from '../hooks/usePageMeta'
import './legal.css'

export default function Privacidad() {
  usePageMeta({
    title: 'Política de privacidad y tratamiento de datos',
    description:
      'Cómo DOMUS recolecta, usa y protege tus datos personales conforme a la Ley 1581 de 2012 de Colombia.',
    path: '/privacidad',
  })

  return (
    <section className="legal">
      <div className="container">
        <header className="legal__head">
          <span className="eyebrow">Legal</span>
          <h1>Política de privacidad y tratamiento de datos</h1>
          <p className="legal__updated">Última actualización: noviembre de 2026</p>
        </header>

        <div className="legal__body">
          <section>
            <h2>1. Responsable del tratamiento</h2>
            <p>
              DOMUS es el responsable del tratamiento de los datos personales recolectados a través
              de este sitio web. Para cualquier consulta puedes escribir a{' '}
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
            </p>
          </section>

          <section>
            <h2>2. Datos que recolectamos</h2>
            <ul>
              <li>Datos de contacto que nos entregas voluntariamente: nombre, teléfono y correo.</li>
              <li>Información de la consulta: motivo, zona, presupuesto y mensaje.</li>
              <li>Datos técnicos de navegación anónimos, si aceptas cookies analíticas.</li>
            </ul>
          </section>

          <section>
            <h2>3. Finalidad</h2>
            <p>
              Usamos tus datos para atender tu solicitud, contactarte por WhatsApp, correo o
              teléfono, enviarte información sobre inmuebles de tu interés y mejorar la experiencia
              del sitio. No vendemos ni compartimos tus datos con terceros ajenos a la prestación
              del servicio.
            </p>
          </section>

          <section>
            <h2>4. Autorización y base legal</h2>
            <p>
              Al enviar el formulario autorizas el tratamiento de tus datos conforme a la Ley 1581
              de 2012 y al Decreto 1377 de 2013. Puedes revocar esta autorización en cualquier
              momento.
            </p>
          </section>

          <section>
            <h2>5. Derechos del titular</h2>
            <p>Como titular de los datos tienes derecho a:</p>
            <ul>
              <li>Conocer, actualizar y rectificar tu información.</li>
              <li>Solicitar prueba de la autorización otorgada.</li>
              <li>Ser informado sobre el uso que se da a tus datos.</li>
              <li>Presentar quejas ante la Superintendencia de Industria y Comercio.</li>
              <li>Revocar la autorización y solicitar la supresión de tus datos.</li>
            </ul>
          </section>

          <section>
            <h2>6. Cómo ejercer tus derechos</h2>
            <p>
              Envía tu solicitud a <a href={`mailto:${SITE.email}`}>{SITE.email}</a> indicando tu
              nombre, el derecho que deseas ejercer y los datos involucrados. Responderemos en los
              plazos establecidos por la ley.
            </p>
          </section>

          <section>
            <h2>7. Cookies</h2>
            <p>
              Usamos cookies necesarias para el funcionamiento del sitio y, solo con tu
              consentimiento, cookies analíticas anónimas. Puedes aceptar o rechazar la analítica
              desde el aviso de cookies o borrando los datos de tu navegador.
            </p>
          </section>

          <section>
            <h2>8. Vigencia</h2>
            <p>
              Esta política rige desde su publicación y permanecerá vigente mientras DOMUS trate
              datos personales. Cualquier cambio sustancial será informado en este mismo sitio.
            </p>
          </section>
        </div>
      </div>
    </section>
  )
}
