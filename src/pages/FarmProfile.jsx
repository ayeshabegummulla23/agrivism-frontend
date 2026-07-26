import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import DashboardHeader from '../components/DashboardHeader'
import MapPlaceholder from '../components/MapPlaceholder'
import { GiPlantRoots } from 'react-icons/gi'
import { FiLoader, FiAlertTriangle, FiArrowRight } from 'react-icons/fi'
import { getFarmProfile } from '../services/api'

export default function FarmProfile() {
  const [farm, setFarm] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    getFarmProfile()
      .then((d) => { setFarm(d); setLoading(false) })
      .catch((err) => { setError(err.message || 'Failed to load farm profile'); setLoading(false) })
  }, [])

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <DashboardHeader title="Farm Profile" />
          <main className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <FiLoader className="text-4xl text-primary animate-spin mx-auto mb-4" />
              <p className="text-gray-500">Loading farm profile...</p>
            </div>
          </main>
        </div>
      </div>
    )
  }

  if (error || !farm || farm.registered === false) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <DashboardHeader title="Farm Profile" />
          <main className="flex-1 flex items-center justify-center p-6">
            <div className="max-w-md text-center">
              <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiAlertTriangle className="text-3xl text-orange-500" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">No Farm Registered</h2>
              <p className="text-gray-500 text-sm mb-6">
                {error || 'You haven\'t registered your farm yet. Register your farm to get personalized recommendations.'}
              </p>
              <button
                onClick={() => navigate('/register-farm')}
                className="px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-colors flex items-center gap-2 mx-auto"
              >
                Register Farm <FiArrowRight />
              </button>
            </div>
          </main>
        </div>
      </div>
    )
  }

  const w = farm.weather_summary || {}

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader title="Farm Profile" />
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="bg-gradient-to-r from-primary to-emerald-500 rounded-2xl p-8 text-white mb-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 opacity-10">
              <GiPlantRoots className="text-[200px]" />
            </div>
            <h2 className="text-2xl font-bold relative z-10">{farm.name}</h2>
            <p className="text-green-100 mt-1 relative z-10">Owner: {farm.owner}</p>
            <div className="flex flex-wrap gap-3 mt-4 relative z-10">
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm">{farm.area}</span>
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm">{farm.crop}</span>
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm">{farm.village}, {farm.district}</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Farm Details</h3>
              <div className="space-y-3">
                {Object.entries({
                  'Survey Number': farm.survey_number,
                  'Khata Number': farm.khata,
                  'Area': farm.area,
                  'Crop': farm.crop,
                  'Village': farm.village,
                  'District': farm.district,
                  'State': farm.state,
                  'Soil Type': farm.soil_type,
                  'Water Source': farm.water_source,
                  'Planting Date': farm.planted_date,
                  'Expected Harvest': farm.expected_harvest,
                }).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-2 border-b border-gray-50 last:border-0">
                    <span className="text-sm text-gray-500">{key}</span>
                    <span className="text-sm font-medium text-gray-900">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Weather Summary</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded-xl">
                    <p className="text-2xl font-bold text-blue-600">{w.temp || '-'}°C</p>
                    <p className="text-xs text-gray-500 mt-1">Temperature</p>
                  </div>
                  <div className="text-center p-3 bg-cyan-50 rounded-xl">
                    <p className="text-2xl font-bold text-cyan-600">{w.humidity || '-'}%</p>
                    <p className="text-xs text-gray-500 mt-1">Humidity</p>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-xl">
                    <p className="text-2xl font-bold text-green-600">{w.rain_chance || '-'}%</p>
                    <p className="text-xs text-gray-500 mt-1">Rain Chance</p>
                  </div>
                </div>
              </div>
              <MapPlaceholder height="h-64" />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
