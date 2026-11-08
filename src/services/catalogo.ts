import { APARTAMENTOS } from '../data/apartamentos'
import { LOCALIDADES } from '../data/localidades'
import type { Apartamento, Localidad } from '../data/types'

export interface Catalogo {
  apartamentos: Apartamento[]
  localidades: Localidad[]
}

const API_URL = import.meta.env.VITE_API_URL as string | undefined

const catalogoLocal: Catalogo = {
  apartamentos: APARTAMENTOS,
  localidades: LOCALIDADES,
}

export function catalogoLocalSync(): Catalogo {
  return catalogoLocal
}

export async function fetchCatalogo(): Promise<Catalogo> {
  if (!API_URL) return catalogoLocal

  const res = await fetch(`${API_URL}/catalogo`)
  if (!res.ok) throw new Error(`No se pudo cargar el catálogo (${res.status})`)
  return (await res.json()) as Catalogo
}

export async function fetchApartamento(id: string): Promise<Apartamento | undefined> {
  if (!API_URL) return APARTAMENTOS.find((a) => a.id === id)

  const res = await fetch(`${API_URL}/apartamentos/${id}`)
  if (res.status === 404) return undefined
  if (!res.ok) throw new Error(`No se pudo cargar la unidad ${id} (${res.status})`)
  return (await res.json()) as Apartamento
}
