const DEFAULT_WIDTHS = [480, 800, 1200]

export function unsplashSrcSet(url: string, widths: number[] = DEFAULT_WIDTHS): string | undefined {
  if (!url.includes('images.unsplash.com')) return undefined

  return widths
    .map((width) => {
      const sized = /([?&])w=\d+/.test(url)
        ? url.replace(/([?&])w=\d+/, `$1w=${width}`)
        : `${url}${url.includes('?') ? '&' : '?'}w=${width}`
      return `${sized} ${width}w`
    })
    .join(', ')
}
