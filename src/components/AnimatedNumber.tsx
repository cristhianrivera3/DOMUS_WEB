import { useEffect, useRef, useState } from 'react'

interface AnimatedNumberProps {
  value: number
  duration?: number
  prefix?: string
  suffix?: string
  decimals?: number
}

export default function AnimatedNumber({
  value,
  duration = 1400,
  prefix = '',
  suffix = '',
  decimals = 0,
}: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const [display, setDisplay] = useState(0)
  const started = useRef(false)
  const fromRef = useRef(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let raf = 0

    const animate = () => {
      const from = fromRef.current
      const start = performance.now()
      const tick = (now: number) => {
        const progress = Math.min((now - start) / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 4)
        const current = from + (value - from) * eased
        fromRef.current = current
        setDisplay(current)
        if (progress < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }

    if (started.current) {
      animate()
      return () => cancelAnimationFrame(raf)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting || started.current) return
        started.current = true
        observer.disconnect()
        animate()
      },
      { threshold: 0.4 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [value, duration])

  const formatted = display.toLocaleString('es-CO', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })

  return (
    <span ref={ref} className="animated-number">
      {prefix}
      {formatted}
      {suffix}
    </span>
  )
}
