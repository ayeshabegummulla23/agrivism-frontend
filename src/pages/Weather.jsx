import Sidebar from '../components/Sidebar'
import DashboardHeader from '../components/DashboardHeader'
import { FiCloud, FiDroplet, FiWind, FiSun, FiSunset, FiAlertTriangle } from 'react-icons/fi'
import { useLanguage } from '../i18n/useLanguage'

const forecast = [
  { day: 'Mon', temp: '28°C', icon: '🌤' },
  { day: 'Tue', temp: '26°C', icon: '🌧' },
  { day: 'Wed', temp: '25°C', icon: '⛈' },
  { day: 'Thu', temp: '27°C', icon: '🌤' },
  { day: 'Fri', temp: '29°C', icon: '☀️' },
  { day: 'Sat', temp: '30°C', icon: '☀️' },
  { day: 'Sun', temp: '28°C', icon: '🌤' },
]

export default function Weather() {
  const { t } = useLanguage()

  const weatherDetails = [
    { icon: <FiSun />, label: t('weather.temperature'), value: '28°C', sub: 'Feels like 31°C', color: 'bg-orange-50 text-orange-600' },
    { icon: <FiDroplet />, label: t('weather.humidity'), value: '65%', sub: 'Moderate', color: 'bg-blue-50 text-blue-600' },
    { icon: <FiCloud />, label: t('weather.rainChance'), value: '40%', sub: 'Light showers expected', color: 'bg-cyan-50 text-cyan-600' },
    { icon: <FiWind />, label: t('weather.windSpeed'), value: '12 km/h', sub: 'Direction: SW', color: 'bg-gray-100 text-gray-600' },
    { icon: <FiSun />, label: t('weather.sunrise'), value: '6:15 AM', sub: 'Dawn at 5:50 AM', color: 'bg-yellow-50 text-yellow-600' },
    { icon: <FiSunset />, label: t('weather.sunset'), value: '6:45 PM', sub: 'Dusk at 7:10 PM', color: 'bg-purple-50 text-purple-600' },
  ]

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader title={t('weather.title')} />
        <main className="flex-1 p-6 overflow-y-auto">
          {/* Alert */}
          <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4 mb-6 flex items-center gap-3">
            <FiAlertTriangle className="text-orange-500 text-xl shrink-0" />
            <div>
              <p className="font-semibold text-orange-800 text-sm">{t('weather.alerts')}</p>
              <p className="text-orange-700 text-sm">Heavy rainfall expected on Wednesday. Plan irrigation accordingly.</p>
            </div>
          </div>

          {/* Current Weather */}
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-8 text-white mb-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">{t('weather.currentWeather')} — Kaveripattinam</p>
                <p className="text-5xl font-bold mt-2">28°C</p>
                <p className="text-blue-100 mt-1">Partly Cloudy</p>
              </div>
              <span className="text-8xl">🌤</span>
            </div>
          </div>

          {/* 7-Day Forecast */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
            <h3 className="font-semibold text-gray-900 mb-4">{t('weather.forecast')}</h3>
            <div className="grid grid-cols-7 gap-3">
              {forecast.map((f) => (
                <div key={f.day} className="text-center p-3 bg-gray-50 rounded-xl">
                  <p className="text-xs text-gray-500 font-medium">{f.day}</p>
                  <span className="text-3xl my-2 block">{f.icon}</span>
                  <p className="font-semibold text-gray-900 text-sm">{f.temp}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Weather Details Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {weatherDetails.map((w) => (
              <div key={w.label} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-lg ${w.color}`}>
                    {w.icon}
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{w.label}</p>
                    <p className="text-lg font-bold text-gray-900">{w.value}</p>
                    <p className="text-xs text-gray-400">{w.sub}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
