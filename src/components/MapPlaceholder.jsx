import { useState, useEffect, useRef } from 'react'
import { FiMapPin, FiCrosshair, FiLoader } from 'react-icons/fi'

const defaultPos = [12.2588, 78.5508]

function LeafletMap({ position, setPosition, height }) {
  const mapInstance = useRef(null)
  const markerRef = useRef(null)
  const initialized = useRef(false)

  useEffect(() => {
    let cancelled = false

    async function initMap() {
      try {
        const L = await import('leaflet')

        const container = document.getElementById('farm-map')
        if (!container || initialized.current) return
        initialized.current = true

        const map = L.map(container, {
          center: position,
          zoom: position !== defaultPos ? 15 : 11,
          zoomControl: true,
        })

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap contributors',
        }).addTo(map)

        const icon = L.divIcon({
          className: 'custom-marker',
          html: `<div style="width:28px;height:28px;background:#16a34a;border:3px solid white;border-radius:50%;box-shadow:0 2px 8px rgba(0,0,0,0.3);display:flex;align-items:center;justify-content:center;"><div style="width:8px;height:8px;background:white;border-radius:50%;"></div></div>`,
          iconSize: [28, 28],
          iconAnchor: [14, 14],
        })

        markerRef.current = L.marker(position, { icon }).addTo(map)

        map.on('click', (e) => {
          if (cancelled) return
          const newPos = [e.latlng.lat, e.latlng.lng]
          setPosition(newPos)
          markerRef.current.setLatLng(newPos)
          map.setView(newPos, 15)
        })

        mapInstance.current = map
      } catch {
        // Leaflet failed to load
      }
    }

    initMap()

    return () => {
      cancelled = true
      if (mapInstance.current) {
        mapInstance.current.remove()
        mapInstance.current = null
        initialized.current = false
      }
    }
  }, [])

  useEffect(() => {
    if (mapInstance.current && position) {
      mapInstance.current.setView(position, 15)
      if (markerRef.current) {
        markerRef.current.setLatLng(position)
      } else {
        const L = window.L
        if (L) {
          const icon = L.divIcon({
            className: 'custom-marker',
            html: `<div style="width:28px;height:28px;background:#16a34a;border:3px solid white;border-radius:50%;box-shadow:0 2px 8px rgba(0,0,0,0.3);display:flex;align-items:center;justify-content:center;"><div style="width:8px;height:8px;background:white;border-radius:50%;"></div></div>`,
            iconSize: [28, 28],
            iconAnchor: [14, 14],
          })
          markerRef.current = L.marker(position, { icon }).addTo(mapInstance.current)
        }
      }
    }
  }, [position])

  const handleMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setPosition([pos.coords.latitude, pos.coords.longitude]),
        () => alert('Unable to get your location')
      )
    }
  }

  return (
    <div className={`${height} rounded-2xl overflow-hidden border border-gray-200 relative`} style={{ minHeight: '300px' }}>
      <div id="farm-map" className="w-full h-full" style={{ background: '#e8f5e9' }} />
      <button
        type="button"
        onClick={handleMyLocation}
        className="absolute top-3 right-3 z-[1000] bg-white rounded-xl shadow-lg p-2 hover:bg-gray-50 transition-colors"
        title="Use my location"
      >
        <FiCrosshair className="text-primary text-lg" />
      </button>
      <div className="absolute bottom-3 left-3 z-[1000] bg-white rounded-xl shadow-lg px-3 py-2 flex items-center gap-2">
        <FiMapPin className="text-primary" />
        <span className="text-xs text-gray-600">
          {position[0].toFixed(4)}, {position[1].toFixed(4)}
        </span>
      </div>
    </div>
  )
}

export default function MapPlaceholder({ height = 'h-64', onLocationSelect, initialPosition, autoLocate }) {
  const [position, setPosition] = useState(initialPosition || defaultPos)

  useEffect(() => {
    if (autoLocate) {
      setPosition(autoLocate)
    }
  }, [autoLocate])

  useEffect(() => {
    if (onLocationSelect) {
      onLocationSelect({ lat: position[0], lng: position[1] })
    }
  }, [position])

  return <LeafletMap position={position} setPosition={setPosition} height={height} />
}
