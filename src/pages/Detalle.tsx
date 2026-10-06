import { useParams } from 'react-router-dom'

export default function Detalle() {
  const { id } = useParams()
  return <section className="page-placeholder">Apartamento {id} — en construcción</section>
}
