import { useState, useEffect } from 'react'
import { FiDroplet } from 'react-icons/fi'
import { getWaterStatus } from '../services/api'

export default function WaterCard() {
  const [w, setW] = useState(null)

  useEffect(() => {
    getWaterStatus().then(setW).catch(() => {})
  }, [])

  if (!w) {
    return (
      <div className="bg-gradient-to-br from-cyan-500 to-teal-500 rounded-2xl p-6 text-white shadow-lg animate-pulse h-40" />
    )
  }

  return (
    <div className="bg-gradient-to-br from-cyan-500 to-teal-500 rounded-2xl p-6 text-white shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-cyan-100 text-sm">Water Usage</p>
          <p className="text-3xl font-bold mt-1">{w.usage_percent}%</p>
          <p className="text-cyan-100 text-sm mt-1">of daily requirement</p>
        </div>
        <FiDroplet className="text-5xl text-cyan-200" />
      </div>
      <div className="mt-4">
        <div className="bg-white/20 rounded-full h-2">
          <div className="bg-white rounded-full h-2" style={{ width: `${w.usage_percent}%` }} />
        </div>
        <div className="flex justify-between text-xs text-cyan-100 mt-2">
          <span>Used: {w.used.toLocaleString()} L</span>
          <span>Remaining: {w.remaining.toLocaleString()} L</span>
        </div>
      </div>
    </div>
  )
}
