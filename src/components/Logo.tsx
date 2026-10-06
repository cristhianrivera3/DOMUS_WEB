interface LogoProps {
  size?: number
  light?: boolean
}

export default function Logo({ size = 38, light = false }: LogoProps) {
  const bg = light ? '#ffffff' : '#0B1F3A'
  const roof = light ? '#1D6FF2' : '#4A8DFF'

  return (
    <span className="logo" style={{ ['--logo-size' as string]: `${size}px` }}>
      <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
        <rect width="64" height="64" rx="16" fill={bg} />
        <path
          d="M32 13 L51 29 V51 H40 V38 H24 V51 H13 V29 Z"
          fill="none"
          stroke={roof}
          strokeWidth="4.5"
          strokeLinejoin="round"
        />
        <circle cx="32" cy="30" r="3.4" fill={roof} />
      </svg>
      <span className={`logo__word ${light ? 'logo__word--light' : ''}`}>
        DOM<span className="logo__accent">US</span>
      </span>
    </span>
  )
}
