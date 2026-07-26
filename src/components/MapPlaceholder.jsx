import { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet'
import L from 'leaflet'
import { FiMapPin, FiCrosshair } from 'react-icons/fi'

const defaultPos = [12.2588, 78.5508]

const markerIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

function LocationMarker({ position, setPosition }) {
  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng])
    },
  })
  return position ? <Marker position={position} icon={markerIcon} /> : null
}

function RecenterMap({ position }) {
  const map = useMap()
  useEffect(() => {
    if (position) map.setView(position, 15)
  }, [position, map])
  return null
}

export default function MapPlaceholder({ height = 'h-64', onLocationSelect, initialPosition }) {
  const [position, setPosition] = useState(initialPosition || defaultPos)

  useEffect(() => {
    if (onLocationSelect) {
      onLocationSelect({ lat: position[0], lng: position[1] })
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
    <div className={`${height} rounded-2xl overflow-hidden border border-gray-200 relative`}>
      <MapContainer
        center={position}
        zoom={13}
        className="w-full h-full"
        style={{ background: '#e8f5e9' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org">OSM</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker position={position} setPosition={setPosition} />
        <RecenterMap position={position} />
      </MapContainer>
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
