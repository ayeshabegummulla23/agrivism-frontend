import { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import DashboardHeader from '../components/DashboardHeader'
import { FiCloud, FiDroplet, FiWind, FiSun, FiSunset, FiAlertTriangle, FiLoader } from 'react-icons/fi'
import { useLanguage } from '../i18n/useLanguage'
import { fetchWeather } from '../services/weather'

export default function Weather() {
  const { t } = useLanguage()
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchWeather().then((data) => {
      setWeather(data)
      setLoading(false)
    })
  }, [])

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <DashboardHeader title={t('weather.title')} />
          <main className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <FiLoader className="text-4xl text-primary animate-spin mx-auto mb-4" />
              <p className="text-gray-500">Loading weather data...</p>
            </div>
          </main>
        </div>
      </div>
    )
  }

  const { current, forecast, alerts, location } = weather

  const weatherDetails = [
    { icon: <FiSun />, label: t('weather.temperature'), value: `${current.temp}°C`, sub: `Feels like ${current.feelsLike}°C`, color: 'bg-orange-50 text-orange-600' },
    { icon: <FiDroplet />, label: t('weather.humidity'), value: `${current.humidity}%`, sub: current.humidity > 70 ? 'High' : current.humidity > 40 ? 'Moderate' : 'Low', color: 'bg-blue-50 text-blue-600' },
    { icon: <FiCloud />, label: t('weather.rainChance'), value: `${current.rainChance}%`, sub: current.rainChance > 50 ? 'High chance of rain' : 'Low chance of rain', color: 'bg-cyan-50 text-cyan-600' },
    { icon: <FiWind />, label: t('weather.windSpeed'), value: `${current.windSpeed} km/h`, sub: `Direction: ${current.windDir}`, color: 'bg-gray-100 text-gray-600' },
    { icon: <FiSun />, label: t('weather.sunrise'), value: weather.sun.rise, sub: '', color: 'bg-yellow-50 text-yellow-600' },
    { icon: <FiSunset />, label: t('weather.sunset'), value: weather.sun.set, sub: '', color: 'bg-purple-50 text-purple-600' },
  ]

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader title={t('weather.title')} />
        <main className="flex-1 p-6 overflow-y-auto">
          {/* Alerts */}
          {alerts.map((alert, i) => (
            <div key={i} className="bg-orange-50 border border-orange-200 rounded-2xl p-4 mb-6 flex items-center gap-3">
              <FiAlertTriangle className="text-orange-500 text-xl shrink-0" />
              <div>
                <p className="font-semibold text-orange-800 text-sm">{alert.title}</p>
                <p className="text-orange-700 text-sm">{alert.description}</p>
              </div>
            </div>
          ))}

          {/* Current Weather */}
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-8 text-white mb-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">{t('weather.currentWeather')} — {location}</p>
                <p className="text-5xl font-bold mt-2">{current.temp}°C</p>
                <p className="text-blue-100 mt-1 capitalize">{current.description}</p>
              </div>
              <span className="text-8xl">{current.icon}</span>
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
                  <p className="font-semibold text-gray-900 text-sm">{f.temp}°C</p>
                  <p className="text-xs text-blue-500 mt-1">{f.rain}% rain</p>
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
                    {w.sub && <p className="text-xs text-gray-400">{w.sub}</p>}
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
