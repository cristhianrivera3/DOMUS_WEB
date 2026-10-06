export interface Localidad {
  id: string
  nombre: string
  lat: number
  lng: number
  precioM2: number
  arriendoM2: number
  interesBusqueda: number
  estratos: number[]
  resumen: string
}

export type TipoVivienda = 'Apartamento' | 'Studio' | 'Loft' | 'Penthouse'
export type EstadoVivienda = 'nuevo' | 'usado'

export interface Apartamento {
  id: string
  titulo: string
  localidadId: string
  barrio: string
  precio: number
  area: number
  habitaciones: number
  banos: number
  parqueaderos: number
  estrato: number
  estado: EstadoVivienda
  tipo: TipoVivienda
  administracion: number
  anio: number
  vis: boolean
  descripcion: string
  caracteristicas: string[]
  fotos: string[]
  lat: number
  lng: number
  arriendoEstimado: number
  valorizacionAnual: number
  antiguedadDias: number
}
