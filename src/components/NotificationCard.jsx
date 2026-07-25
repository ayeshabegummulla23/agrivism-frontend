import { FiAlertTriangle, FiCheck, FiInfo } from 'react-icons/fi'

const mockNotifications = [
  { id: 1, type: 'alert', message: 'Heavy rainfall expected tomorrow', time: '2 hours ago' },
  { id: 2, type: 'success', message: 'Farm registration completed', time: '5 hours ago' },
  { id: 3, type: 'info', message: 'New market prices updated', time: '1 day ago' },
]

export default function NotificationCard() {
  const icons = {
    alert: <FiAlertTriangle className="text-orange-500" />,
    success: <FiCheck className="text-green-500" />,
    info: <FiInfo className="text-blue-500" />,
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h3 className="font-semibold text-gray-900 mb-4">Notifications</h3>
      <div className="space-y-3">
        {mockNotifications.map((n) => (
          <div key={n.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
            <div className="mt-0.5">{icons[n.type]}</div>
            <div className="flex-1">
              <p className="text-sm text-gray-700">{n.message}</p>
              <p className="text-xs text-gray-400 mt-1">{n.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
