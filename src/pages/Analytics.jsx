import Sidebar from '../components/Sidebar'
import DashboardHeader from '../components/DashboardHeader'
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts'

const monthlyExpenses = [
  { month: 'Jan', seeds: 2000, fertilizer: 3000, labor: 5000, irrigation: 2000 },
  { month: 'Feb', seeds: 1500, fertilizer: 4000, labor: 5000, irrigation: 2500 },
  { month: 'Mar', seeds: 1000, fertilizer: 3500, labor: 6000, irrigation: 3000 },
  { month: 'Apr', seeds: 2500, fertilizer: 3000, labor: 5500, irrigation: 2000 },
  { month: 'May', seeds: 3000, fertilizer: 4500, labor: 6000, irrigation: 3500 },
  { month: 'Jun', seeds: 2000, fertilizer: 4000, labor: 5000, irrigation: 3000 },
]

const waterUsage = [
  { month: 'Jan', usage: 1800 },
  { month: 'Feb', usage: 2000 },
  { month: 'Mar', usage: 2500 },
  { month: 'Apr', usage: 2200 },
  { month: 'May', usage: 2800 },
  { month: 'Jun', usage: 2400 },
]

const cropGrowth = [
  { week: 'W1', height: 5, health: 85 },
  { week: 'W2', height: 12, health: 88 },
  { week: 'W3', height: 22, health: 90 },
  { week: 'W4', height: 35, health: 87 },
  { week: 'W5', height: 48, health: 92 },
  { week: 'W6', height: 60, health: 91 },
]

const weatherTrends = [
  { day: 'Mon', temp: 28, rain: 0 },
  { day: 'Tue', temp: 27, rain: 5 },
  { day: 'Wed', temp: 25, rain: 20 },
  { day: 'Thu', temp: 26, rain: 10 },
  { day: 'Fri', temp: 29, rain: 0 },
  { day: 'Sat', temp: 30, rain: 0 },
  { day: 'Sun', temp: 28, rain: 2 },
]

const marketTrends = [
  { month: 'Jan', rice: 2600, cotton: 6500, tomato: 1000 },
  { month: 'Feb', rice: 2650, cotton: 6600, tomato: 1100 },
  { month: 'Mar', rice: 2700, cotton: 6700, tomato: 1050 },
  { month: 'Apr', rice: 2750, cotton: 6750, tomato: 1150 },
  { month: 'May', rice: 2800, cotton: 6800, tomato: 1200 },
  { month: 'Jun', rice: 2850, cotton: 6800, tomato: 1200 },
]

const pieData = [
  { name: 'Seeds', value: 12000 },
  { name: 'Fertilizer', value: 22000 },
  { name: 'Labor', value: 32500 },
  { name: 'Irrigation', value: 16000 },
]

const COLORS = ['#16a34a', '#22c55e', '#86efac', '#dcfce7']

export default function Analytics() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader title="Farm Analytics" />
        <main className="flex-1 p-6 overflow-y-auto space-y-6">
          {/* Monthly Expenses */}
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-4">Monthly Expenses</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyExpenses}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="seeds" fill="#16a34a" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="fertilizer" fill="#22c55e" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="labor" fill="#86efac" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="irrigation" fill="#dcfce7" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-4">Expense Distribution</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                    {pieData.map((_, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Water Usage */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-4">Water Usage (Liters)</h3>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={waterUsage}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Area type="monotone" dataKey="usage" stroke="#0ea5e9" fill="#0ea5e9" fillOpacity={0.15} strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Crop Growth */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-4">Crop Growth</h3>
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={cropGrowth}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="week" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="height" stroke="#16a34a" strokeWidth={2} name="Height (cm)" />
                  <Line type="monotone" dataKey="health" stroke="#22c55e" strokeWidth={2} strokeDasharray="5 5" name="Health %" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Weather Trends */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-4">Weather Trends</h3>
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={weatherTrends}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="temp" stroke="#f59e0b" strokeWidth={2} name="Temp °C" />
                  <Line type="monotone" dataKey="rain" stroke="#3b82f6" strokeWidth={2} strokeDasharray="5 5" name="Rain %" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Market Trends */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-4">Market Price Trends</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={marketTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line type="monotone" dataKey="rice" stroke="#16a34a" strokeWidth={2} name="Rice" />
                <Line type="monotone" dataKey="cotton" stroke="#3b82f6" strokeWidth={2} name="Cotton" />
                <Line type="monotone" dataKey="tomato" stroke="#ef4444" strokeWidth={2} name="Tomato" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </main>
      </div>
    </div>
  )
}
