import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import DashboardHeader from '../components/DashboardHeader'
import UploadCard from '../components/UploadCard'
import { FiAlertTriangle, FiCheckCircle, FiClock, FiFileText, FiCloud, FiWind, FiDroplet, FiSun, FiInfo } from 'react-icons/fi'

const symptoms = [
  { id: 'yellow', label: 'Leaves Turning Yellow', icon: '🍂' },
  { id: 'drying', label: 'Leaves Drying', icon: '🌾' },
  { id: 'spots', label: 'Brown Spots', icon: '🟤' },
  { id: 'yield', label: 'Low Yield', icon: '📉' },
]

const mockDiagnosis = {
  problem: 'Leaf Blight',
  severity: 'Moderate',
  confidence: 87,
  causes: ['Fungal infection (Alternaria)', 'Excess moisture', 'Poor drainage'],
  treatment: [
    'Apply Mancozeb 75% WP @ 2g/liter',
    'Remove affected leaves immediately',
    'Improve field drainage',
  ],
  prevention: [
    'Use resistant varieties',
    'Maintain proper plant spacing',
    'Avoid overhead irrigation',
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
    title: 'Do NOT Spray Pesticide/Fungicide Today',
    message: `Rain expected with ${todayWeather.rainChance}% chance. Any chemical sprayed today will wash off within hours, wasting your money and harming the soil. Wait for dry weather.`,
    action: 'Skip spraying today. Plan for Wednesday or Thursday when weather is expected to be dry.',
  },
  {
    type: 'warning',
    title: 'Excess Moisture is Making It Worse',
    message: `Your diagnosis shows "Excess moisture" as a cause. Today's humidity is ${todayWeather.humidity}% with rain expected. This moisture will accelerate Leaf Blight spread.`,
    action: 'Improve drainage NOW — clear blocked water channels and create furrow drains before rain hits.',
  },
  {
    type: 'info',
    title: 'Best Treatment Window',
    message: 'Weather forecast shows dry conditions from Wednesday. That is the ideal day to apply Mancozeb 75% WP.',
    action: 'Apply Mancozeb 75% WP @ 2g/liter on Wednesday morning (5-7 AM). Mix with water and spray evenly on affected and surrounding plants.',
  },
]

export default function ProblemSolver() {
  const [selectedSymptom, setSelectedSymptom] = useState(null)
  const [showDiagnosis, setShowDiagnosis] = useState(false)

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

            {/* Describe Problem */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Describe the Problem</h3>
              <textarea
                rows={4}
                placeholder="Describe what you observe on your crop..."
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none"
              />
            </div>

            <button
              onClick={() => setShowDiagnosis(true)}
              className="w-full py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-colors"
            >
              Get AI Diagnosis
            </button>

            {/* AI Diagnosis */}
            {showDiagnosis && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                    <FiAlertTriangle className="text-orange-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">{mockDiagnosis.problem}</h3>
                    <p className="text-sm text-gray-500">Severity: {mockDiagnosis.severity} • {mockDiagnosis.confidence}% confidence</p>
                  </div>
                </div>

                {/* Causes */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <FiFileText className="text-primary" /> Possible Causes
                  </h4>
                  <ul className="space-y-2">
                    {mockDiagnosis.causes.map((c, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                        <FiAlertTriangle className="text-orange-400 shrink-0" /> {c}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Treatment */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <FiCheckCircle className="text-primary" /> Treatment
                  </h4>
                  <ul className="space-y-2">
                    {mockDiagnosis.treatment.map((t, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                        <FiCheckCircle className="text-green-500 shrink-0" /> {t}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Prevention */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <FiClock className="text-primary" /> Prevention
                  </h4>
                  <ul className="space-y-2">
                    {mockDiagnosis.prevention.map((p, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                        <FiClock className="text-blue-500 shrink-0" /> {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Weather-Based Treatment Alerts */}
            {showDiagnosis && (
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <FiAlertTriangle className="text-orange-500" /> Weather-Based Cure Alerts
                </h3>

                {/* Current Weather */}
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-5 text-white">
                  <p className="text-blue-100 text-sm mb-3">Today&apos;s Weather Conditions</p>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2"><FiCloud className="text-blue-200" /><span className="text-sm">{todayWeather.condition}</span></div>
                    <div className="flex items-center gap-2"><FiSun className="text-blue-200" /><span className="text-sm">{todayWeather.temp}°C</span></div>
                    <div className="flex items-center gap-2"><FiDroplet className="text-blue-200" /><span className="text-sm">{todayWeather.humidity}% humidity</span></div>
                    <div className="flex items-center gap-2"><FiWind className="text-blue-200" /><span className="text-sm">Wind: {todayWeather.windSpeed} km/h</span></div>
                  </div>
                </div>

                {/* Alert Cards */}
                {weatherAlerts.map((alert, i) => {
                  const styles = {
                    danger: { bg: 'bg-red-50', border: 'border-red-200', iconBg: 'bg-red-100 text-red-600', title: 'text-red-800', badge: 'bg-red-100 text-red-700', badgeText: 'DO NOT SPRAY' },
                    warning: { bg: 'bg-orange-50', border: 'border-orange-200', iconBg: 'bg-orange-100 text-orange-600', title: 'text-orange-800', badge: 'bg-orange-100 text-orange-700', badgeText: 'ACTION NEEDED' },
                    info: { bg: 'bg-blue-50', border: 'border-blue-200', iconBg: 'bg-blue-100 text-blue-600', title: 'text-blue-800', badge: 'bg-blue-100 text-blue-700', badgeText: 'RECOMMENDED' },
                  }
                  const s = styles[alert.type]
                  return (
                    <div key={i} className={`${s.bg} rounded-2xl border ${s.border} p-5`}>
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.iconBg}`}><FiAlertTriangle /></div>
                          <h4 className={`font-bold ${s.title}`}>{alert.title}</h4>
                        </div>
                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${s.badge}`}>{s.badgeText}</span>
                      </div>
                      <p className="text-sm text-gray-700 pl-[52px]">{alert.message}</p>
                      <div className="flex items-start gap-2 mt-3 ml-[52px] bg-white/60 rounded-xl p-3">
                        <FiClock className="text-primary shrink-0 mt-0.5" />
                        <p className="text-sm font-medium text-gray-800">{alert.action}</p>
                      </div>
                    </div>
                  )
                })}

                {/* Weekly Spray Plan */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <FiInfo className="text-primary" /> Weekly Cure Plan for Leaf Blight
                  </h3>
                  <div className="space-y-3">
                    {[
                      { day: 'Today (Mon)', action: 'Do NOT spray — rain expected. Remove affected leaves & improve drainage.', safe: false, icon: <FiCloud /> },
                      { day: 'Tomorrow (Tue)', action: 'Rain likely — continue leaf removal, clear drainage channels.', safe: false, icon: <FiCloud /> },
                      { day: 'Wednesday', action: 'Dry day — spray Mancozeb 75% WP @ 2g/liter (5-7 AM).', safe: true, icon: <FiSun /> },
                      { day: 'Thursday', action: 'Backup spray day if Wednesday is missed.', safe: true, icon: <FiSun /> },
                      { day: 'Friday onwards', action: 'Monitor for new symptoms. Apply second spray if needed after 7 days.', safe: null, icon: <FiAlertTriangle /> },
                    ].map((d, i) => (
                      <div key={i} className={`flex items-center justify-between p-3 rounded-xl border ${
                        d.safe === true ? 'bg-green-50 border-green-200' : d.safe === false ? 'bg-red-50 border-red-200' : 'bg-gray-50 border-gray-200'
                      }`}>
                        <div className="flex items-center gap-3">
                          <span className={d.safe === true ? 'text-green-600' : d.safe === false ? 'text-red-600' : 'text-gray-500'}>{d.icon}</span>
                          <div>
                            <p className="font-medium text-gray-900 text-sm">{d.day}</p>
                            <p className={`text-xs ${d.safe === true ? 'text-green-600' : d.safe === false ? 'text-red-600' : 'text-gray-500'}`}>{d.action}</p>
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
