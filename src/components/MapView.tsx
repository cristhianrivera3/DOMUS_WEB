import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import type { Apartamento } from '../data/types'
import { getLocalidad } from '../data/localidades'
import { formatCOP, formatMillones } from '../utils/format'
import './map-view.css'

interface MapViewProps {
  items: Apartamento[]
  onSelect: (id: string) => void
}

export default function MapView({ items, onSelect }: MapViewProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<L.Map | null>(null)
  const layerRef = useRef<L.LayerGroup | null>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container || mapRef.current) return

    const map = L.map(container, {
      scrollWheelZoom: false,
      zoomControl: true,
    }).setView([4.65, -74.1], 11)

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap',
      maxZoom: 19,
    }).addTo(map)

    layerRef.current = L.layerGroup().addTo(map)
    mapRef.current = map

    const resize = () => map.invalidateSize()
    window.addEventListener('resize', resize)

    return () => {
      window.removeEventListener('resize', resize)
      map.remove()
      mapRef.current = null
      layerRef.current = null
    }
  }, [])

  useEffect(() => {
    const map = mapRef.current
    const layer = layerRef.current
    if (!map || !layer) return

    layer.clearLayers()

    const bounds = L.latLngBounds([])

    items.forEach((a) => {
      const loc = getLocalidad(a.localidadId)
      const icon = L.divIcon({
        className: 'map-price-wrap',
        html: `<div class="map-price">${formatMillones(a.precio, 0)}</div>`,
        iconSize: [86, 30],
        iconAnchor: [43, 15],
      })

      const marker = L.marker([a.lat, a.lng], { icon })
      marker.bindPopup(
        `<div class="map-popup">
          <span class="map-popup__loc">${loc.nombre} · ${a.barrio}</span>
          <strong class="map-popup__precio">${formatCOP(a.precio)}</strong>
          <span class="map-popup__specs">${a.area} m² · ${a.habitaciones} hab · ${a.banos} baños</span>
          <button type="button" class="map-popup__cta" data-id="${a.id}">Ver ficha →</button>
        </div>`,
      )
      marker.on('popupopen', (e) => {
        const el = (e.popup as L.Popup).getElement()?.querySelector('.map-popup__cta')
        el?.addEventListener('click', () => onSelect(a.id))
      })
      marker.addTo(layer)
      bounds.extend([a.lat, a.lng])
    })

    if (items.length > 0) {
      map.fitBounds(bounds.pad(0.25), { maxZoom: 14 })
    }
  }, [items, onSelect])

  return <div ref={containerRef} className="map-view" role="region" aria-label="Mapa de apartamentos" />
}
