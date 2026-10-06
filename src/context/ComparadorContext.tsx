import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'

export const MAX_COMPARADOR = 3

interface ComparadorContextValue {
  ids: string[]
  toggle: (id: string) => void
  quitar: (id: string) => void
  limpiar: () => void
  lleno: boolean
}

const ComparadorContext = createContext<ComparadorContextValue | null>(null)

export function ComparadorProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<string[]>([])

  const toggle = useCallback((id: string) => {
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
