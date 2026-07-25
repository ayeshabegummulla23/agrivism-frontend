import { FiMapPin } from 'react-icons/fi'

export default function MapPlaceholder({ height = 'h-64' }) {
  return (
    <div className={`bg-gradient-to-br from-green-100 to-emerald-50 ${height} rounded-2xl flex items-center justify-center border border-gray-200 relative overflow-hidden`}>
      <div className="absolute inset-0 opacity-20">
        <svg viewBox="0 0 400 300" className="w-full h-full">
          <path d="M0,200 Q100,150 200,180 T400,160 V300 H0 Z" fill="#16a34a" opacity="0.3" />
          <path d="M0,220 Q150,170 250,200 T400,180 V300 H0 Z" fill="#22c55e" opacity="0.3" />
        </svg>
      </div>
      <div className="text-center z-10">
        <FiMapPin className="text-4xl text-primary/40 mx-auto mb-2" />
        <p className="text-gray-500 font-medium">Interactive Map</p>
        <p className="text-sm text-gray-400">Leaflet map will render here</p>
      </div>
    </div>
  )
}
