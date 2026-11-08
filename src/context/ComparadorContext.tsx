import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { track } from '../utils/analytics'

export const MAX_COMPARADOR = 3
const STORAGE_KEY = 'domus:comparador'

function leerIdsGuardados(): string[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.filter((id): id is string => typeof id === 'string').slice(0, MAX_COMPARADOR)
  } catch {
    return []
  }
}

interface ComparadorContextValue {
  ids: string[]
  toggle: (id: string) => void
  quitar: (id: string) => void
  limpiar: () => void
  lleno: boolean
}

const ComparadorContext = createContext<ComparadorContextValue | null>(null)

export function ComparadorProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<string[]>(leerIdsGuardados)

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids))
    } catch {
      // Almacenamiento no disponible (modo privado, cuota llena): se ignora.
    }
  }, [ids])

  const toggle = useCallback((id: string) => {
    track('comparador_toggle', { id })
    setIds((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id)
      if (prev.length >= MAX_COMPARADOR) return prev
      return [...prev, id]
    })
  }, [])

  const quitar = useCallback((id: string) => {
    setIds((prev) => prev.filter((x) => x !== id))
  }, [])

  const limpiar = useCallback(() => setIds([]), [])

  const value = useMemo(
    () => ({ ids, toggle, quitar, limpiar, lleno: ids.length >= MAX_COMPARADOR }),
    [ids, toggle, quitar, limpiar],
  )

  return <ComparadorContext.Provider value={value}>{children}</ComparadorContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useComparador(): ComparadorContextValue {
  const ctx = useContext(ComparadorContext)
  if (!ctx) throw new Error('useComparador debe usarse dentro de ComparadorProvider')
  return ctx
}
