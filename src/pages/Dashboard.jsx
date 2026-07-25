import Sidebar from '../components/Sidebar'
import DashboardHeader from '../components/DashboardHeader'

import WeatherCard from '../components/WeatherCard'
import WaterCard from '../components/WaterCard'
import MarketPriceCard from '../components/MarketPriceCard'
import AIAvatarCard from '../components/AIAvatarCard'
import NotificationCard from '../components/NotificationCard'
import StatsCard from '../components/StatsCard'
import { FiMap, FiTarget, FiCalendar, FiTrendingUp } from 'react-icons/fi'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const chartData = [
  { month: 'Jan', expenses: 12000, income: 18000 },
  { month: 'Feb', expenses: 15000, income: 22000 },
  { month: 'Mar', expenses: 18000, income: 25000 },
  { month: 'Apr', expenses: 14000, income: 20000 },
  { month: 'May', expenses: 20000, income: 30000 },
  { month: 'Jun', expenses: 16000, income: 28000 },
]

const recentActivities = [
  { id: 1, text: 'Farm "Green Valley" registered successfully', time: '2 hours ago' },
  { id: 2, text: 'Weather alert: Heavy rain expected tomorrow', time: '4 hours ago' },
  { id: 3, text: 'Market price updated for Rice (₹2,850/q)', time: '6 hours ago' },
  { id: 4, text: 'VALI detected early blight risk on Plot 3', time: '1 day ago' },
  { id: 5, text: 'Water usage report generated', time: '2 days ago' },
]

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader title="Dashboard" />
        <main className="flex-1 p-6 space-y-6 overflow-y-auto">
          {/* Stats Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatsCard label="Total Farms" value="3" icon={<FiMap />} trend={12} />
            <StatsCard label="Active Crops" value="5" icon={<FiTarget />} trend={8} />
            <StatsCard label="Days since planting" value="45" icon={<FiCalendar />} />
            <StatsCard label="Monthly Revenue" value="₹45,000" icon={<FiTrendingUp />} trend={15} />
          </div>

          {/* Weather + Water + Market */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <WeatherCard />
            <WaterCard />
            <AIAvatarCard />
          </div>

          {/* Charts + Notifications */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-4">Farm Overview</h3>
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
            <h3 className="font-semibold text-gray-900 mb-4">Today&apos;s Market Prices</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <MarketPriceCard crop="Rice (Paddy)" price={2850} change={3.2} market="Thanjavur Mandi" />
              <MarketPriceCard crop="Cotton" price={6800} change={-1.5} market="Coimbatore Mandi" />
              <MarketPriceCard crop="Tomato" price={1200} change={5.8} market="Erode Mandi" />
              <MarketPriceCard crop="Groundnut" price={5200} change={2.1} market="Tirupur Mandi" />
            </div>
          </div>

          {/* Recent Activities */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-4">Recent Activities</h3>
            <div className="space-y-3">
              {recentActivities.map((a) => (
                <div key={a.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                  <p className="text-sm text-gray-700">{a.text}</p>
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
