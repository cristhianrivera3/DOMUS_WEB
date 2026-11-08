import { SITE } from '../config/site'
import { usePageMeta } from '../hooks/usePageMeta'
import './legal.css'

export default function Terminos() {
  usePageMeta({
    title: 'Términos y condiciones de uso',
    description:
      'Condiciones de uso del portal DOMUS: naturaleza de la información, propiedad intelectual y responsabilidad.',
    path: '/terminos',
  })

  return (
    <section className="legal">
      <div className="container">
        <header className="legal__head">
          <span className="eyebrow">Legal</span>
          <h1>Términos y condiciones de uso</h1>
          <p className="legal__updated">Última actualización: noviembre de 2026</p>
        </header>

        <div className="legal__body">
          <section>
            <h2>1. Objeto</h2>
            <p>
              Estos términos regulan el uso del sitio web de DOMUS, un portal informativo de
              apartamentos en Bogotá que integra herramientas de presupuesto, simulación de crédito
              y comparación de unidades.
            </p>
          </section>

          <section>
            <h2>2. Uso del sitio</h2>
            <p>
              Te comprometes a usar el sitio de forma lícita, sin afectar su funcionamiento, sin
              intentar acceder a áreas restringidas y sin reproducir su contenido con fines
              comerciales sin autorización.
            </p>
          </section>

          <section>
            <h2>3. Naturaleza de la información</h2>
            <p>
              Los precios, cuotas, gastos, rentabilidades y demás cifras son estimaciones
              informativas calculadas con parámetros de referencia. No constituyen una oferta
              comercial vinculante ni asesoría financiera. Las condiciones finales dependen del
              banco, la notaría y el vendedor.
            </p>
          </section>

          <section>
            <h2>4. Disponibilidad del catálogo</h2>
            <p>
              La disponibilidad de las unidades puede cambiar sin previo aviso. DOMUS procura
              mantener la información actualizada, pero no garantiza que todas las unidades sigan
              disponibles al momento de tu consulta.
            </p>
          </section>

          <section>
            <h2>5. Propiedad intelectual</h2>
            <p>
              La marca, el diseño, los textos y los elementos gráficos de DOMUS son de su propiedad
              o se usan con licencia. No puedes copiarlos, modificarlos ni distribuirlos sin
              autorización previa.
            </p>
          </section>

          <section>
            <h2>6. Enlaces a terceros</h2>
            <p>
              El sitio puede enlazar a servicios de terceros como WhatsApp, mapas o bancos. No somos
              responsables de sus políticas ni del contenido de esos servicios.
            </p>
          </section>

          <section>
            <h2>7. Limitación de responsabilidad</h2>
            <p>
              DOMUS no será responsable por decisiones tomadas con base en las estimaciones del
              sitio. Te recomendamos validar la información con un asesor y con la entidad
              financiera antes de cualquier compra.
            </p>
          </section>

          <section>
            <h2>8. Modificaciones</h2>
            <p>
              Podemos actualizar estos términos en cualquier momento. La versión vigente será la
              publicada en este sitio.
            </p>
          </section>

          <section>
            <h2>9. Ley aplicable y contacto</h2>
            <p>
              Estos términos se rigen por la legislación colombiana. Para cualquier consulta
              escríbenos a <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
            </p>
          </section>
        </div>
      </div>
    </section>
  )
}
