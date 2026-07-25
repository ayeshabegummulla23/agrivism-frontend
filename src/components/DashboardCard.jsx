import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function DashboardCard({ icon, title, value, subtitle, link, color = 'primary' }) {
  const colorClasses = {
    primary: 'bg-primary/10 text-primary',
    blue: 'bg-blue-50 text-blue-600',
    orange: 'bg-orange-50 text-orange-600',
    purple: 'bg-purple-50 text-purple-600',
    red: 'bg-red-50 text-red-600',
    teal: 'bg-teal-50 text-teal-600',
  }

  const card = (
    <motion.div
      whileHover={{ y: -3 }}
      className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between mb-3">
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-lg ${colorClasses[color]}`}>
          {icon}
        </div>
      </div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className="text-sm font-medium text-gray-700 mt-1">{title}</p>
      {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
    </motion.div>
  )

  return link ? <Link to={link}>{card}</Link> : card
}
