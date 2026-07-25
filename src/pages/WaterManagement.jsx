import Sidebar from '../components/Sidebar'
import DashboardHeader from '../components/DashboardHeader'
import { FiDroplet, FiClock, FiCloud, FiThermometer } from 'react-icons/fi'

const waterTips = [
  'Water early morning (5-7 AM) to reduce evaporation.',
  'Use drip irrigation for 40% water savings.',
  'Mulching helps retain soil moisture.',
  'Monitor soil moisture before irrigating.',
  'Avoid overwatering — it causes root rot.',
]

export default function WaterManagement() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader title="Water Management" />
        <main className="flex-1 p-6 overflow-y-auto">
          {/* Farm Info Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 bg-green-50 rounded-xl flex items-center justify-center text-green-600">
                  <FiDroplet />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Crop</p>
                  <p className="font-semibold text-gray-900">Rice (Paddy)</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                  <FiThermometer />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Area</p>
                  <p className="font-semibold text-gray-900">2.5 Acres</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 bg-orange-50 rounded-xl flex items-center justify-center text-orange-600">
                  <FiCloud />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Soil Type</p>
                  <p className="font-semibold text-gray-900">Red Soil</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 bg-cyan-50 rounded-xl flex items-center justify-center text-cyan-600">
                  <FiClock />
                </div>
                <div>
                  <p className="text-xs text-gray-500">Today&apos;s Weather</p>
                  <p className="font-semibold text-gray-900">28°C Cloudy</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Water Requirements */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Water Requirements</h3>
              <div className="space-y-4">
                <div className="bg-primary/5 rounded-xl p-4">
                  <p className="text-sm text-gray-500">Daily Water Requirement</p>
                  <p className="text-2xl font-bold text-primary mt-1">2,000 Liters</p>
                </div>
                <div className="bg-blue-50 rounded-xl p-4">
                  <p className="text-sm text-gray-500">Recommended Irrigation Time</p>
                  <p className="text-2xl font-bold text-blue-600 mt-1">5:30 AM – 7:00 AM</p>
                </div>
                <div className="bg-cyan-50 rounded-xl p-4">
                  <p className="text-sm text-gray-500">Current Soil Moisture</p>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex-1 bg-cyan-100 rounded-full h-3">
                      <div className="bg-cyan-500 rounded-full h-3" style={{ width: '55%' }} />
                    </div>
                    <span className="text-sm font-bold text-cyan-600">55%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Water Saving Tips */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Water Saving Tips</h3>
              <div className="space-y-3">
                {waterTips.map((tip, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                    <span className="w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <p className="text-sm text-gray-700">{tip}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
