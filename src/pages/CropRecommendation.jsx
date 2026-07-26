import { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import DashboardHeader from '../components/DashboardHeader'
import { FiCheckCircle, FiSun, FiDroplet, FiWind, FiLoader } from 'react-icons/fi'
import { useLanguage } from '../i18n/useLanguage'
import { recommendCrop, getFarmParams } from '../services/api'

export default function CropRecommendation() {
  const { t } = useLanguage()
  const [rec, setRec] = useState(null)
  const [loading, setLoading] = useState(true)
  const [params, setParams] = useState(null)

  useEffect(() => {
    getFarmParams().then((p) => {
      setParams(p)
      return recommendCrop(p)
    }).then((data) => {
      setRec(data)
      setLoading(false)
    }).catch(() => {
      setLoading(false)
    })
  }, [])

  const soilConditions = [
    { icon: <FiSun />, label: t('common.temperature'), value: params ? `${params.temperature}°C` : '-', status: 'Optimal' },
    { icon: <FiDroplet />, label: t('crop.soilMoisture'), value: '55%', status: 'Good' },
    { icon: <FiWind />, label: t('common.humidity'), value: params ? `${params.humidity}%` : '-', status: 'Moderate' },
  ]

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <DashboardHeader title={t('crop.title')} />
          <main className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <FiLoader className="text-4xl text-primary animate-spin mx-auto mb-4" />
              <p className="text-gray-500">Analyzing your farm data...</p>
            </div>
          </main>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader title={t('crop.title')} />
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Current Conditions */}
            <div className="bg-gradient-to-r from-primary to-emerald-500 rounded-2xl p-6 text-white">
              <h3 className="text-lg font-bold mb-4">{t('crop.farmConditions')}</h3>
              <div className="grid grid-cols-3 gap-4">
                {soilConditions.map((c) => (
                  <div key={c.label} className="bg-white/20 rounded-xl p-4 text-center">
                    <div className="flex justify-center mb-2">{c.icon}</div>
                    <p className="text-2xl font-bold">{c.value}</p>
                    <p className="text-xs text-green-100">{c.label}</p>
                    <p className="text-xs text-green-200 mt-1">{c.status}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendation from Backend */}
            {rec && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-4xl">🌾</span>
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg">{rec.crop}</h4>
                      <p className="text-sm text-gray-500 mt-1">{rec.reason}</p>
                      <p className="text-xs text-gray-400 mt-2">{t('crop.season')}: {rec.season}</p>
                      <p className="text-xs text-gray-400 mt-1">Expected Yield: {rec.expected_yield}</p>
                      <p className="text-xs text-gray-400 mt-1">Investment: {rec.investment}</p>
                    </div>
                  </div>
                  <div className="text-right shrink-0 ml-4">
                    <div className="w-16 h-16 rounded-full border-4 border-primary flex items-center justify-center">
                      <span className="font-bold text-primary text-lg">{rec.score}%</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">{t('crop.matchScore')}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="bg-gray-100 rounded-full h-2">
                    <div className="bg-primary rounded-full h-2 transition-all" style={{ width: `${rec.score}%` }} />
                  </div>
                </div>
              </div>
            )}

            {/* Factors */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">{t('crop.factors')}</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {[t('common.soilType') + ` (${params?.soil_type || 'Unknown'})`, `Area (${params?.area_acres || '-'} Acres)`, t('crop.weatherConditions'), t('crop.marketDemand'), t('crop.growthPeriod'), t('crop.investmentRequired')].map((f) => (
                  <div key={f} className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl">
                    <FiCheckCircle className="text-primary shrink-0" />
                    <span className="text-sm text-gray-700">{f}</span>
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
