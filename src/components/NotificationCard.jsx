import { useState, useEffect } from 'react'
import { FiAlertTriangle, FiCheck, FiInfo } from 'react-icons/fi'
import { getNotifications } from '../services/api'

export default function NotificationCard() {
  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    getNotifications().then((d) => setNotifications(d.notifications || [])).catch(() => {})
  }, [])

  const icons = {
    warning: <FiAlertTriangle className="text-orange-500" />,
    alert: <FiAlertTriangle className="text-orange-500" />,
    success: <FiCheck className="text-green-500" />,
    info: <FiInfo className="text-blue-500" />,
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h3 className="font-semibold text-gray-900 mb-4">Notifications</h3>
      <div className="space-y-3">
        {notifications.map((n, i) => (
          <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
            <div className="mt-0.5">{icons[n.type] || <FiInfo className="text-blue-500" />}</div>
            <div className="flex-1">
              <p className="text-sm text-gray-700">{n.title}</p>
              <p className="text-xs text-gray-400 mt-1">{n.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
