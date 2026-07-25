import { FiDroplet } from 'react-icons/fi'

export default function WaterCard() {
  return (
    <div className="bg-gradient-to-br from-cyan-500 to-teal-500 rounded-2xl p-6 text-white shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-cyan-100 text-sm">Water Usage</p>
          <p className="text-3xl font-bold mt-1">72%</p>
          <p className="text-cyan-100 text-sm mt-1">of daily requirement</p>
        </div>
        <FiDroplet className="text-5xl text-cyan-200" />
      </div>
      <div className="mt-4">
        <div className="bg-white/20 rounded-full h-2">
          <div className="bg-white rounded-full h-2" style={{ width: '72%' }} />
        </div>
        <div className="flex justify-between text-xs text-cyan-100 mt-2">
          <span>Used: 1,440 L</span>
          <span>Remaining: 560 L</span>
        </div>
      </div>
    </div>
  )
}
