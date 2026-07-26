import { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import DashboardHeader from '../components/DashboardHeader'
import UploadCard from '../components/UploadCard'
import { FiAlertTriangle, FiCheckCircle, FiClock, FiFileText, FiCloud, FiWind, FiDroplet, FiSun, FiLoader } from 'react-icons/fi'
import { detectDisease, getDashboardWeather } from '../services/api'

const symptoms = [
  { id: 'yellow', label: 'Leaves Turning Yellow', icon: '🍂' },
  { id: 'drying', label: 'Leaves Drying', icon: '🌾' },
  { id: 'spots', label: 'Brown Spots', icon: '🟤' },
  { id: 'yield', label: 'Low Yield', icon: '📉' },
]

export default function ProblemSolver() {
  const [selectedSymptom, setSelectedSymptom] = useState(null)
  const [diagnosis, setDiagnosis] = useState(null)
  const [loading, setLoading] = useState(false)
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    getDashboardWeather().then(setWeather).catch(() => {})
  }, [])

  const handleDiagnose = async () => {
    setLoading(true)
    try {
      const data = await detectDisease('uploaded-image.jpg', selectedSymptom || 'unknown')
      setDiagnosis({
        problem: data.disease,
        severity: data.severity.charAt(0).toUpperCase() + data.severity.slice(1),
        confidence: Math.round(data.confidence * 100),
        causes: ['Based on AI analysis of uploaded image'],
        treatment: [data.treatment],
        prevention: data.prevention,
      })
    } catch {
      setDiagnosis({
        problem: 'Unable to diagnose',
        severity: 'Unknown',
        confidence: 0,
        causes: [],
        treatment: ['Please try uploading the image again.'],
        prevention: [],
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader title="Problem Solver" />
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Symptom Selection */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Select Symptom</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {symptoms.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSelectedSymptom(s.id)}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${
                      selectedSymptom === s.id
                        ? 'border-primary bg-primary/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <span className="text-3xl block mb-2">{s.icon}</span>
                    <p className="text-sm font-medium text-gray-900">{s.label}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Upload Image */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Upload Image</h3>
              <UploadCard title="Upload Crop Photo" subtitle="Take a clear photo of the affected area" />
            </div>

            <button
              onClick={handleDiagnose}
              disabled={loading}
              className="w-full py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? <><FiLoader className="animate-spin" /> Analyzing...</> : 'Get AI Diagnosis'}
            </button>

            {/* AI Diagnosis */}
            {diagnosis && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                    <FiAlertTriangle className="text-orange-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">{diagnosis.problem}</h3>
                    <p className="text-sm text-gray-500">Severity: {diagnosis.severity} • {diagnosis.confidence}% confidence</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <FiFileText className="text-primary" /> Possible Causes
                  </h4>
                  <ul className="space-y-2">
                    {diagnosis.causes.map((c, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                        <FiAlertTriangle className="text-orange-400 shrink-0" /> {c}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <FiCheckCircle className="text-primary" /> Treatment
                  </h4>
                  <ul className="space-y-2">
                    {diagnosis.treatment.map((t, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                        <FiCheckCircle className="text-green-500 shrink-0" /> {t}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <FiClock className="text-primary" /> Prevention
                  </h4>
                  <ul className="space-y-2">
                    {diagnosis.prevention.map((p, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                        <FiClock className="text-blue-500 shrink-0" /> {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Weather-Based Treatment Alerts */}
            {diagnosis && weather && (
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <FiAlertTriangle className="text-orange-500" /> Weather-Based Cure Alerts
                </h3>

                <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-5 text-white">
                  <p className="text-blue-100 text-sm mb-3">Today&apos;s Weather Conditions</p>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2"><FiCloud className="text-blue-200" /><span className="text-sm">{weather.description}</span></div>
                    <div className="flex items-center gap-2"><FiSun className="text-blue-200" /><span className="text-sm">{weather.temp}°C</span></div>
                    <div className="flex items-center gap-2"><FiDroplet className="text-blue-200" /><span className="text-sm">{weather.humidity}% humidity</span></div>
                    <div className="flex items-center gap-2"><FiWind className="text-blue-200" /><span className="text-sm">Wind: {weather.wind_speed} km/h</span></div>
                  </div>
                </div>

                {weather.rain_chance > 50 && (
                  <div className="bg-red-50 rounded-2xl border border-red-200 p-5">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-red-100 text-red-600"><FiAlertTriangle /></div>
                      <h4 className="font-bold text-red-800">Do NOT Spray Pesticide/Fungicide Today</h4>
                    </div>
                    <p className="text-sm text-gray-700 pl-[52px]">Rain expected with {weather.rain_chance}% chance. Any chemical sprayed today will wash off. Wait for dry weather.</p>
                  </div>
                )}

                {weather.humidity > 70 && (
                  <div className="bg-orange-50 rounded-2xl border border-orange-200 p-5">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-orange-100 text-orange-600"><FiAlertTriangle /></div>
                      <h4 className="font-bold text-orange-800">Excess Moisture May Worsen Condition</h4>
                    </div>
                    <p className="text-sm text-gray-700 pl-[52px]">Humidity is {weather.humidity}%. Improve drainage and air circulation.</p>
                  </div>
                )}

                {weather.rain_chance <= 50 && (
                  <div className="bg-green-50 rounded-2xl border border-green-200 p-5">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-green-100 text-green-600"><FiCheckCircle /></div>
                      <h4 className="font-bold text-green-800">Good Conditions for Treatment</h4>
                    </div>
                    <p className="text-sm text-gray-700 pl-[52px]">Weather is suitable. Apply treatment in early morning (5-7 AM).</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
