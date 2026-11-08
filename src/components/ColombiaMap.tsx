const CIUDADES = [
  { nombre: 'Bogotá', x: 40.6, y: 46.4, delay: 0 },
  { nombre: 'Medellín', x: 28.3, y: 37.2, delay: 0.7 },
  { nombre: 'Cali', x: 20.4, y: 53.9, delay: 1.4 },
  { nombre: 'Barranquilla', x: 34.8, y: 13, delay: 2.1 },
  { nombre: 'Cartagena', x: 29, y: 14.5, delay: 2.8 },
  { nombre: 'Bucaramanga', x: 48.5, y: 31.9, delay: 3.5 },
]

export default function ColombiaMap({ className }: { className?: string }) {
  return (
    <div className={className} aria-hidden="true">
      <span className="hero__map-dots" />
      {CIUDADES.map((c) => (
        <span
          key={c.nombre}
          className="hero__map-ping"
          style={{
            left: `${c.x}%`,
            top: `${c.y}%`,
            animationDelay: `${c.delay}s`,
          }}
        />
      ))}
    </div>
  )
}
