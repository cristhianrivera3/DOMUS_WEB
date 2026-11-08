import { describe, expect, it } from 'vitest'
import { unsplashSrcSet } from './image'

describe('unsplashSrcSet', () => {
  it('genera candidatos para imágenes de Unsplash', () => {
    const srcSet = unsplashSrcSet(
      'https://images.unsplash.com/photo-1?auto=format&w=1200&q=80',
    )
    expect(srcSet).toBeDefined()
    expect(srcSet).toMatch(/w=480[^\s]*\s480w/)
    expect(srcSet).toMatch(/w=800[^\s]*\s800w/)
    expect(srcSet).toMatch(/w=1200[^\s]*\s1200w/)
  })

  it('agrega el parámetro w si no existe', () => {
    const srcSet = unsplashSrcSet('https://images.unsplash.com/photo-1?auto=format')
    expect(srcSet).toMatch(/w=480[^\s]*\s480w/)
  })

  it('devuelve undefined para URLs externas', () => {
    expect(unsplashSrcSet('https://example.com/foto.jpg')).toBeUndefined()
  })
})
