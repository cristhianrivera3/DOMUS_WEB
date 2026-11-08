import { act, renderHook } from '@testing-library/react'
import type { ReactNode } from 'react'
import { beforeEach, describe, expect, it } from 'vitest'
import { ComparadorProvider, MAX_COMPARADOR, useComparador } from './ComparadorContext'

const wrapper = ({ children }: { children: ReactNode }) => (
  <ComparadorProvider>{children}</ComparadorProvider>
)

describe('ComparadorContext', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('agrega una unidad y la persiste en localStorage', () => {
    const { result } = renderHook(() => useComparador(), { wrapper })

    act(() => result.current.toggle('a-01'))

    expect(result.current.ids).toEqual(['a-01'])
    expect(JSON.parse(window.localStorage.getItem('domus:comparador') ?? '[]')).toEqual(['a-01'])
  })

  it('no supera el máximo de unidades', () => {
    const { result } = renderHook(() => useComparador(), { wrapper })

    act(() => {
      result.current.toggle('a-01')
      result.current.toggle('a-02')
      result.current.toggle('a-03')
      result.current.toggle('a-04')
    })

    expect(result.current.ids).toHaveLength(MAX_COMPARADOR)
    expect(result.current.lleno).toBe(true)
  })

  it('quita y vacía el comparador', () => {
    const { result } = renderHook(() => useComparador(), { wrapper })

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
    window.localStorage.setItem('domus:comparador', JSON.stringify(['a-05', 'a-06']))
    const { result } = renderHook(() => useComparador(), { wrapper })
    expect(result.current.ids).toEqual(['a-05', 'a-06'])
  })
})
