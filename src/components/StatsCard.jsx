export default function StatsCard({ label, value, icon, trend }) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{label}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {trend && (
            <p className={`text-xs font-medium mt-1 ${trend >= 0 ? 'text-green-600' : 'text-red-500'}`}>
              {trend >= 0 ? '+' : ''}{trend}% from last month
            </p>
          )}
        </div>
        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary text-xl">
          {icon}
        </div>
      </div>
    </div>
  )
}
