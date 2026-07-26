import { useState, useEffect } from 'react'
import { FiCloud, FiDroplet, FiWind, FiSun } from 'react-icons/fi'
import { getDashboardWeather } from '../services/api'

export default function WeatherCard() {
  const [w, setW] = useState(null)

  useEffect(() => {
    getDashboardWeather().then(setW).catch(() => {})
  }, [])

  if (!w) {
    return (
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg animate-pulse h-40" />
    )
  }

  return (
    <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-blue-100 text-sm">Today&apos;s Weather</p>
          <p className="text-3xl font-bold mt-1">{w.temp}°C</p>
          <p className="text-blue-100 text-sm mt-1">{w.description}</p>
        </div>
        <FiCloud className="text-5xl text-blue-200" />
      </div>
      <div className="grid grid-cols-3 gap-3 mt-4">
        <div className="flex items-center gap-1 text-sm">
          <FiDroplet className="text-blue-200" />
          <span>{w.humidity}%</span>
        </div>
        <div className="flex items-center gap-1 text-sm">
          <FiWind className="text-blue-200" />
          <span>{w.wind_speed} km/h</span>
        </div>
        <div className="flex items-center gap-1 text-sm">
          <FiSun className="text-blue-200" />
          <span>{w.sunrise}</span>
        </div>
      </div>
    </div>
  )
}
