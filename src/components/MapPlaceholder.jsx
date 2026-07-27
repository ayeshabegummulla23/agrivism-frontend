import { useState, useEffect, useRef, useCallback } from 'react'
import { FiMapPin, FiCrosshair } from 'react-icons/fi'

const defaultPos = [12.2588, 78.5508]

function LeafletMap({ center, onPositionChange, height }) {
  const mapDivRef = useRef(null)
  const mapRef = useRef(null)
  const markerRef = useRef(null)
  const positionRef = useRef(center)
  const [mapError, setMapError] = useState(false)

  useEffect(() => {
    positionRef.current = center
  }, [center])

  useEffect(() => {
    let cancelled = false

    async function init() {
      if (cancelled) return

      if (mapRef.current) {
        try {
          const c = Array.isArray(center) ? center : defaultPos
          mapRef.current.setView(c, 15)
          if (markerRef.current) {
            markerRef.current.setLatLng(c)
          }
        } catch {}
        return
      }

      const container = mapDivRef.current
      if (!container) return

      try {
        const L = await import('leaflet')
        if (cancelled) return

        const c = Array.isArray(center) ? center : defaultPos

        const map = L.map(container, {
          center: c,
          zoom: 15,
          zoomControl: true,
        })

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap contributors',
          maxZoom: 19,
        }).addTo(map)

        const icon = L.divIcon({
          className: 'farm-marker',
          html: '<div style="width:28px;height:28px;background:#16a34a;border:3px solid white;border-radius:50%;box-shadow:0 2px 8px rgba(0,0,0,0.3);display:flex;align-items:center;justify-content:center;"><div style="width:8px;height:8px;background:white;border-radius:50%;"></div></div>',
          iconSize: [28, 28],
          iconAnchor: [14, 14],
        })

        const marker = L.marker(c, { icon }).addTo(map)

        map.on('click', (e) => {
          const pos = [e.latlng.lat, e.latlng.lng]
          marker.setLatLng(pos)
          positionRef.current = pos
          onPositionChange(pos)
        })

        setTimeout(() => {
          if (!cancelled) map.invalidateSize()
        }, 200)

        mapRef.current = map
        markerRef.current = marker
      } catch {
        if (!cancelled) setMapError(true)
      }
    }

    init()

    return () => {
      cancelled = true
      if (mapRef.current) {
        try { mapRef.current.remove() } catch {}
        mapRef.current = null
        markerRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    if (mapRef.current && center) {
      try {
        const c = Array.isArray(center) ? center : defaultPos
        mapRef.current.setView(c, 15)
        if (markerRef.current) {
          markerRef.current.setLatLng(c)
        }
      } catch {}
    }
  }, [center])

  const handleMyLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const newPos = [pos.coords.latitude, pos.coords.longitude]
          onPositionChange(newPos)
        },
        () => alert('Unable to get your location')
      )
    }
  }, [onPositionChange])

  if (mapError) {
    return (
      <div className={`${height} rounded-2xl overflow-hidden border border-gray-200 relative flex items-center justify-center`} style={{ minHeight: '300px', background: '#e8f5e9' }}>
        <div className="text-center p-6">
          <FiMapPin className="text-4xl text-primary mx-auto mb-3" />
          <p className="text-sm text-gray-600 mb-2">Map loaded at {Array.isArray(center) ? `${center[0].toFixed(4)}, ${center[1].toFixed(4)}` : 'default location'}</p>
          <p className="text-xs text-gray-400">OpenStreetMap tiles could not be loaded</p>
        </div>
      </div>
    )
  }

  const c = Array.isArray(center) ? center : defaultPos

  return (
    <div className={`${height} rounded-2xl overflow-hidden border border-gray-200 relative`} style={{ minHeight: '300px' }}>
      <div ref={mapDivRef} className="w-full h-full" style={{ background: '#e8f5e9', minHeight: '300px' }} />
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
          {c[0].toFixed(4)}, {c[1].toFixed(4)}
        </span>
      </div>
    </div>
  )
}

export default function MapPlaceholder({ height = 'h-64', onLocationSelect, autoLocate }) {
  const [position, setPosition] = useState(
    Array.isArray(autoLocate) ? autoLocate : defaultPos
  )

  useEffect(() => {
    if (Array.isArray(autoLocate) && autoLocate.length === 2) {
      setPosition(autoLocate)
    }
  }, [autoLocate])

  useEffect(() => {
    if (onLocationSelect && Array.isArray(position)) {
      onLocationSelect({ lat: position[0], lng: position[1] })
    }
  }, [position])

  const handlePosChange = useCallback((pos) => {
    setPosition(pos)
  }, [])

  return <LeafletMap center={position} onPositionChange={handlePosChange} height={height} />
}
