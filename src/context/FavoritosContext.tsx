import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

const STORAGE_KEY = 'domus:favoritos'
const MAX_FAVORITOS = 60

function leerGuardados(): string[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.filter((id): id is string => typeof id === 'string').slice(0, MAX_FAVORITOS)
  } catch {
    return []
  }
}

interface FavoritosContextValue {
  ids: string[]
  tiene: (id: string) => boolean
  toggle: (id: string) => void
  quitar: (id: string) => void
  limpiar: () => void
}

const FavoritosContext = createContext<FavoritosContextValue | null>(null)

export function FavoritosProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<string[]>(leerGuardados)

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids))
    } catch {
      // Almacenamiento no disponible: se ignora.
    }
  }, [ids])

  const toggle = useCallback((id: string) => {
    setIds((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id)
      if (prev.length >= MAX_FAVORITOS) return prev
      return [...prev, id]
    })
  }, [])

  const quitar = useCallback((id: string) => {
    setIds((prev) => prev.filter((x) => x !== id))
  }, [])

  const limpiar = useCallback(() => setIds([]), [])

  const value = useMemo(
    () => ({
      ids,
      tiene: (id: string) => ids.includes(id),
      toggle,
      quitar,
      limpiar,
    }),
    [ids, toggle, quitar, limpiar],
  )

  return <FavoritosContext.Provider value={value}>{children}</FavoritosContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useFavoritos(): FavoritosContextValue {
  const ctx = useContext(FavoritosContext)
  if (!ctx) throw new Error('useFavoritos debe usarse dentro de FavoritosProvider')
  return ctx
}
