import { act, renderHook } from '@testing-library/react'
import type { ReactNode } from 'react'
import { beforeEach, describe, expect, it } from 'vitest'
import { FavoritosProvider, useFavoritos } from './FavoritosContext'

const wrapper = ({ children }: { children: ReactNode }) => (
  <FavoritosProvider>{children}</FavoritosProvider>
)

describe('FavoritosContext', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('agrega una unidad y la persiste en localStorage', () => {
    const { result } = renderHook(() => useFavoritos(), { wrapper })

    act(() => result.current.toggle('a-01'))

    expect(result.current.ids).toEqual(['a-01'])
    expect(result.current.tiene('a-01')).toBe(true)
    expect(JSON.parse(window.localStorage.getItem('domus:favoritos') ?? '[]')).toEqual(['a-01'])
  })

  it('quita y vacía los favoritos', () => {
    const { result } = renderHook(() => useFavoritos(), { wrapper })

    act(() => {
      result.current.toggle('a-01')
      result.current.toggle('a-02')
    })
    act(() => result.current.quitar('a-01'))
    expect(result.current.ids).toEqual(['a-02'])

    act(() => result.current.limpiar())
    expect(result.current.ids).toEqual([])
  })

  it('restaura las unidades guardadas al iniciar', () => {
    window.localStorage.setItem('domus:favoritos', JSON.stringify(['a-05', 'a-06']))
    const { result } = renderHook(() => useFavoritos(), { wrapper })
    expect(result.current.ids).toEqual(['a-05', 'a-06'])
  })

  it('ignora datos corruptos en localStorage', () => {
    window.localStorage.setItem('domus:favoritos', '{no-es-json')
    const { result } = renderHook(() => useFavoritos(), { wrapper })
    expect(result.current.ids).toEqual([])
  })
})
