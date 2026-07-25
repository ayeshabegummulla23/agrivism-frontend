import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import DashboardHeader from '../components/DashboardHeader'
import UploadCard from '../components/UploadCard'
import { FiCheckCircle, FiShield, FiActivity, FiAlertTriangle, FiCloud, FiWind, FiDroplet, FiSun, FiClock, FiInfo } from 'react-icons/fi'

const mockPrediction = {
  disease: 'Late Blight',
  confidence: 92,
  severity: 'High',
  treatment: [
    'Apply Metalaxyl + Mancozeb immediately',
    'Remove and destroy infected plants',
    'Spray copper-based fungicide',
  ],
  prevention: [
    'Use certified disease-free seed',
    'Ensure proper drainage',
    'Apply fungicide preventively in humid conditions',
    'Rotate crops every season',
  ],
}

const todayWeather = {
  condition: 'Rainy',
  temp: 26,
  humidity: 80,
  rainChance: 75,
  windSpeed: 8,
}

const weatherAlerts = [
  {
    type: 'danger',
    title: 'Do NOT Spray Fungicide Today',
    message: `Rain is expected (${todayWeather.rainChance}% chance). Any fungicide sprayed today will be washed away within hours, wasting money and chemicals. Wait for at least 2 dry days before applying Metalaxyl + Mancozeb.`,
    action: 'Respray after rain stops — best time is early morning (5-7 AM) on a dry day.',
  },
  {
    type: 'warning',
    title: 'High Humidity Will Worsen Late Blight',
    message: `Current humidity is ${todayWeather.humidity}%. Late Blight thrives in high humidity. Improve air circulation between plants by thinning dense foliage.`,
    action: 'Remove infected leaves immediately and improve field drainage.',
  },
  {
    type: 'info',
    title: 'Best Spraying Window This Week',
    message: 'Wednesday and Thursday look dry with low humidity. Plan your fungicide spray for those days.',
    action: 'Apply Mancozeb 75% WP @ 2g/liter + Metalaxyl on Wednesday morning.',
  },
]

export default function DiseaseDetection() {
  const [showResult, setShowResult] = useState(false)

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader title="Disease Detection" />
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Upload Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-semibold text-gray-900 mb-2">Upload Crop Image</h3>
              <p className="text-sm text-gray-500 mb-4">Take a clear, close-up photo of the affected area for best results</p>
              <UploadCard title="Upload Image" subtitle="JPG, PNG (Max 10MB)" onUpload={() => setShowResult(true)} />
            </div>

            {/* Preview */}
            {showResult && (
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Image Preview */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Preview</h3>
                  <div className="bg-gray-100 rounded-xl h-64 flex items-center justify-center">
                    <p className="text-gray-400 text-sm">Uploaded image preview</p>
                  </div>
                </div>

                {/* Prediction */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">AI Prediction</h3>
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4">
                    <p className="text-lg font-bold text-red-800">{mockPrediction.disease}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-sm text-red-600">Confidence: {mockPrediction.confidence}%</span>
                      <span className="text-sm text-red-600">Severity: {mockPrediction.severity}</span>
                    </div>
                    <div className="mt-3">
                      <div className="bg-red-200 rounded-full h-2">
                        <div className="bg-red-600 rounded-full h-2" style={{ width: `${mockPrediction.confidence}%` }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Treatment & Prevention */}
            {showResult && (
              <div className="grid lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <FiActivity className="text-primary" /> Treatment
                  </h3>
                  <ul className="space-y-3">
                    {mockPrediction.treatment.map((t, i) => (
                      <li key={i} className="flex items-start gap-3 p-3 bg-green-50 rounded-xl">
                        <FiCheckCircle className="text-green-600 shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700">{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <FiShield className="text-primary" /> Prevention
                  </h3>
                  <ul className="space-y-3">
                    {mockPrediction.prevention.map((p, i) => (
                      <li key={i} className="flex items-start gap-3 p-3 bg-blue-50 rounded-xl">
                        <FiShield className="text-blue-600 shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700">{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Weather-Based Treatment Alerts */}
            {showResult && (
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <FiAlertTriangle className="text-orange-500" /> Weather-Based Treatment Alerts
                </h3>

                {/* Current Weather Bar */}
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-5 text-white">
                  <p className="text-blue-100 text-sm mb-3">Current Weather Conditions</p>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2">
                      <FiCloud className="text-blue-200" />
                      <span className="text-sm">{todayWeather.condition}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FiSun className="text-blue-200" />
                      <span className="text-sm">{todayWeather.temp}°C</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FiDroplet className="text-blue-200" />
                      <span className="text-sm">{todayWeather.humidity}% humidity</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FiWind className="text-blue-200" />
                      <span className="text-sm">Wind: {todayWeather.windSpeed} km/h</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FiCloud className="text-blue-200" />
                      <span className="text-sm">Rain: {todayWeather.rainChance}%</span>
                    </div>
                  </div>
                </div>

                {/* Alert Cards */}
                {weatherAlerts.map((alert, i) => {
                  const styles = {
                    danger: { bg: 'bg-red-50', border: 'border-red-200', icon: 'bg-red-100 text-red-600', title: 'text-red-800', badge: 'bg-red-100 text-red-700', badgeText: 'DO NOT SPRAY' },
                    warning: { bg: 'bg-orange-50', border: 'border-orange-200', icon: 'bg-orange-100 text-orange-600', title: 'text-orange-800', badge: 'bg-orange-100 text-orange-700', badgeText: 'CAUTION' },
                    info: { bg: 'bg-blue-50', border: 'border-blue-200', icon: 'bg-blue-100 text-blue-600', title: 'text-blue-800', badge: 'bg-blue-100 text-blue-700', badgeText: 'RECOMMENDED' },
                  }
                  const s = styles[alert.type]
                  return (
                    <div key={i} className={`${s.bg} rounded-2xl border ${s.border} p-5`}>
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.icon}`}>
                            <FiAlertTriangle />
                          </div>
                          <h4 className={`font-bold ${s.title}`}>{alert.title}</h4>
                        </div>
                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${s.badge}`}>{s.badgeText}</span>
                      </div>
                      <p className="text-sm text-gray-700 ml-13 pl-[52px]">{alert.message}</p>
                      <div className="flex items-start gap-2 mt-3 ml-13 pl-[52px] bg-white/60 rounded-xl p-3">
                        <FiClock className="text-primary shrink-0 mt-0.5" />
                        <p className="text-sm font-medium text-gray-800">{alert.action}</p>
                      </div>
                    </div>
                  )
                })}

                {/* Spray Schedule */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <FiInfo className="text-primary" /> Suggested Spray Schedule
                  </h3>
                  <div className="space-y-3">
                    {[
                      { day: 'Today (Mon)', action: 'Do NOT spray — rain expected', safe: false, icon: <FiCloud /> },
                      { day: 'Tomorrow (Tue)', action: 'Rain likely — avoid spraying', safe: false, icon: <FiCloud /> },
                      { day: 'Wednesday', action: 'Dry day — spray Mancozeb + Metalaxyl (5-7 AM)', safe: true, icon: <FiSun /> },
                      { day: 'Thursday', action: 'Dry day — backup spray day if needed', safe: true, icon: <FiSun /> },
                      { day: 'Friday', action: 'Monitor — recheck for disease spread', safe: null, icon: <FiActivity /> },
                    ].map((d, i) => (
                      <div key={i} className={`flex items-center justify-between p-3 rounded-xl border ${
                        d.safe === true ? 'bg-green-50 border-green-200' : d.safe === false ? 'bg-red-50 border-red-200' : 'bg-gray-50 border-gray-200'
                      }`}>
                        <div className="flex items-center gap-3">
                          <span className={`${
                            d.safe === true ? 'text-green-600' : d.safe === false ? 'text-red-600' : 'text-gray-500'
                          }`}>{d.icon}</span>
                          <div>
                            <p className="font-medium text-gray-900 text-sm">{d.day}</p>
                            <p className={`text-xs ${d.safe === true ? 'text-green-600' : d.safe === false ? 'text-red-600' : 'text-gray-500'}`}>
                              {d.action}
                            </p>
                          </div>
                        </div>
                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                          d.safe === true ? 'bg-green-100 text-green-700' : d.safe === false ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-600'
                        }`}>
                          {d.safe === true ? 'SAFE' : d.safe === false ? 'NO SPRAY' : 'MONITOR'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
