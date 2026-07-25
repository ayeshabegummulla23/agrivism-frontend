import Sidebar from '../components/Sidebar'
import DashboardHeader from '../components/DashboardHeader'
import { FiMapPin, FiTrendingUp, FiTrendingDown } from 'react-icons/fi'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const weeklyTrend = [
  { day: 'Mon', price: 2800 },
  { day: 'Tue', price: 2820 },
  { day: 'Wed', price: 2790 },
  { day: 'Thu', price: 2850 },
  { day: 'Fri', price: 2880 },
  { day: 'Sat', price: 2850 },
  { day: 'Sun', price: 2870 },
]

const marketPrices = [
  { crop: 'Rice (Paddy)', price: 2850, change: 3.2, unit: '₹/quintal' },
  { crop: 'Cotton', price: 6800, change: -1.5, unit: '₹/quintal' },
  { crop: 'Tomato', price: 1200, change: 5.8, unit: '₹/quintal' },
  { crop: 'Groundnut', price: 5200, change: 2.1, unit: '₹/quintal' },
  { crop: 'Coconut', price: 15, change: 0.5, unit: '₹/piece' },
  { crop: 'Banana', price: 2400, change: -0.8, unit: '₹/quintal' },
  { crop: 'Turmeric', price: 12500, change: 4.2, unit: '₹/quintal' },
  { crop: 'Chili', price: 18000, change: 1.8, unit: '₹/quintal' },
]

const nearbyMarkets = [
  { name: 'Thanjavur Mandi', distance: '12 km', crops: 'Rice, Tomato' },
  { name: 'Coimbatore Market', distance: '45 km', crops: 'Cotton, Turmeric' },
  { name: 'Erode Wholesale', distance: '32 km', crops: 'Banana, Coconut' },
  { name: 'Tirupur Mandi', distance: '28 km', crops: 'Groundnut, Chili' },
]

export default function MarketPrices() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader title="Market Prices" />
        <main className="flex-1 p-6 overflow-y-auto">
          {/* Best Selling Market */}
          <div className="bg-gradient-to-r from-primary to-emerald-500 rounded-2xl p-6 text-white mb-6">
            <p className="text-green-100 text-sm">Best Selling Market Today</p>
            <div className="flex items-center justify-between mt-2">
              <div>
                <h3 className="text-xl font-bold">Thanjavur Mandi</h3>
                <p className="text-green-100 text-sm mt-1">Best price for Rice at ₹2,850/quintal</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold">₹2,850</p>
                <p className="text-green-100 text-sm">+3.2% ↑</p>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 mb-6">
            {/* Price Chart */}
            <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-4">Weekly Price Trend (Rice)</h3>
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={weeklyTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} domain={['dataMin - 50', 'dataMax + 50']} />
                  <Tooltip />
                  <Line type="monotone" dataKey="price" stroke="#16a34a" strokeWidth={3} dot={{ r: 5, fill: '#16a34a' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Nearby Markets */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Nearby Markets</h3>
              <div className="space-y-3">
                {nearbyMarkets.map((m, i) => (
                  <div key={i} className="p-3 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-2">
                      <FiMapPin className="text-primary shrink-0" />
                      <p className="font-medium text-gray-900 text-sm">{m.name}</p>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{m.distance} • {m.crops}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Today's Prices Grid */}
          <h3 className="font-semibold text-gray-900 mb-4">Today&apos;s Prices</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {marketPrices.map((m) => {
              const isUp = m.change >= 0
              return (
                <div key={m.crop} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                  <p className="text-sm text-gray-500">{m.unit}</p>
                  <p className="font-semibold text-gray-900 mt-1">{m.crop}</p>
                  <div className="flex items-center justify-between mt-3">
                    <p className="text-xl font-bold text-gray-900">₹{m.price.toLocaleString()}</p>
                    <div className={`flex items-center gap-1 text-sm font-medium ${isUp ? 'text-green-600' : 'text-red-500'}`}>
                      {isUp ? <FiTrendingUp /> : <FiTrendingDown />}
                      <span>{isUp ? '+' : ''}{m.change}%</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </main>
      </div>
    </div>
  )
}
