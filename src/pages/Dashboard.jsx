import { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import DashboardHeader from '../components/DashboardHeader'
import WeatherCard from '../components/WeatherCard'
import WaterCard from '../components/WaterCard'
import MarketPriceCard from '../components/MarketPriceCard'
import AIAvatarCard from '../components/AIAvatarCard'
import NotificationCard from '../components/NotificationCard'
import StatsCard from '../components/StatsCard'
import { FiMap, FiTarget, FiCalendar, FiTrendingUp, FiShield } from 'react-icons/fi'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../i18n/useLanguage'
import { getDashboardStats, getDashboardChart, getDashboardActivities, getMarketPrices } from '../services/api'

export default function Dashboard() {
  const navigate = useNavigate()
  const { t } = useLanguage()
  const [stats, setStats] = useState(null)
  const [chartData, setChartData] = useState([])
  const [activities, setActivities] = useState([])
  const [prices, setPrices] = useState([])

  useEffect(() => {
    getDashboardStats().then(setStats).catch(() => {})
    getDashboardChart().then((d) => setChartData(d.data || [])).catch(() => {})
    getDashboardActivities().then((d) => setActivities(d.activities || [])).catch(() => {})
    getMarketPrices().then((d) => setPrices((d.prices || []).slice(0, 4))).catch(() => {})
  }, [])

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader title={t('dashboard.title')} />
        <main className="flex-1 p-6 space-y-6 overflow-y-auto">
          {/* Stats Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatsCard label={t('dashboard.totalFarms')} value={stats?.total_farms ?? '-'} icon={<FiMap />} trend={stats?.farm_trend} />
            <StatsCard label={t('dashboard.activeCrops')} value={stats?.active_crops ?? '-'} icon={<FiTarget />} trend={stats?.crop_trend} />
            <StatsCard label={t('dashboard.daysSincePlanting')} value={stats?.days_since_planting ?? '-'} icon={<FiCalendar />} trend={stats?.days_trend} />
            <StatsCard label={t('dashboard.monthlyRevenue')} value={`₹${(stats?.monthly_revenue ?? 0).toLocaleString()}`} icon={<FiTrendingUp />} trend={stats?.revenue_trend} />
          </div>

          {/* Weather + Water + AI */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <WeatherCard />
            <WaterCard />
            <AIAvatarCard />
          </div>

          {/* Weed Management + Crop Protection */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div
              onClick={() => navigate('/weed-management')}
              className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-2xl p-6 shadow-sm border border-gray-600 text-white cursor-pointer hover:shadow-lg transition-all"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                  <FiShield className="text-xl" />
                </div>
                <div>
                  <p className="font-semibold">{t('dashboard.weedManagement')}</p>
                  <p className="text-xs text-gray-300">{t('dashboard.weedManagementDesc')}</p>
                </div>
              </div>
              <p className="text-sm text-gray-300">{t('dashboard.weedManagementText')}</p>
            </div>
            <div
              onClick={() => navigate('/crop-protection')}
              className="bg-gradient-to-br from-blue-700 to-blue-500 rounded-2xl p-6 shadow-sm border border-blue-400 text-white cursor-pointer hover:shadow-lg transition-all"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                  <FiShield className="text-xl" />
                </div>
                <div>
                  <p className="font-semibold">{t('dashboard.cropProtection')}</p>
                  <p className="text-xs text-blue-100">{t('dashboard.cropProtectionDesc')}</p>
                </div>
              </div>
              <p className="text-sm text-blue-100">{t('dashboard.cropProtectionText')}</p>
            </div>
          </div>

          {/* Charts + Notifications */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-4">{t('dashboard.farmOverview')}</h3>
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Area type="monotone" dataKey="income" stroke="#16a34a" fill="#16a34a" fillOpacity={0.15} strokeWidth={2} />
                  <Area type="monotone" dataKey="expenses" stroke="#ef4444" fill="#ef4444" fillOpacity={0.1} strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <NotificationCard />
          </div>

          {/* Market Prices */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">{t('dashboard.todaysMarketPrices')}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {prices.map((p) => (
                <MarketPriceCard key={p.crop} crop={p.crop} price={p.price} change={p.change} market={p.market} />
              ))}
            </div>
          </div>

          {/* Recent Activities */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-4">{t('dashboard.recentActivities')}</h3>
            <div className="space-y-3">
              {activities.map((a, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                  <p className="text-sm text-gray-700">{a.title}</p>
                  <span className="text-xs text-gray-400 whitespace-nowrap ml-4">{a.time}</span>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
