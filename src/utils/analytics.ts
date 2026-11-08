type EventProps = Record<string, string | number | boolean>

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: EventProps }) => void
    gtag?: (...args: unknown[]) => void
  }
}

export function track(event: string, props?: EventProps) {
  if (typeof window === 'undefined') return

  window.plausible?.(event, props ? { props } : undefined)
  window.gtag?.('event', event, props ?? {})
}
