import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import {
  FiHome, FiCloud, FiDroplet, FiTrendingUp, FiCamera,
  FiTool, FiTarget, FiMessageSquare, FiBarChart2, FiSettings,
  FiLogOut, FiChevronLeft, FiMenu, FiMap, FiUser, FiZap
} from 'react-icons/fi'
import { GiPlantRoots } from 'react-icons/gi'

const menuItems = [
  { icon: <FiHome />, label: 'Dashboard', path: '/dashboard' },
  { icon: <FiMap />, label: 'Land Registration', path: '/register-farm' },
  { icon: <FiUser />, label: 'Farm Profile', path: '/farm-profile' },
  { icon: <FiCloud />, label: 'Weather', path: '/weather' },
  { icon: <FiDroplet />, label: 'Water Management', path: '/water-management' },
  { icon: <FiTrendingUp />, label: 'Market Prices', path: '/market-prices' },
  { icon: <FiTool />, label: 'Problem Solver', path: '/problem-solver' },
  { icon: <FiCamera />, label: 'Disease Detection', path: '/disease-detection' },
  { icon: <FiTarget />, label: 'Crop Recommendation', path: '/crop-recommendation' },
  { icon: <FiZap />, label: 'Fertilizer Guide', path: '/fertilizer' },
  { icon: <FiMessageSquare />, label: 'VALI Assistant', path: '/ai-assistant' },
  { icon: <FiBarChart2 />, label: 'Analytics', path: '/analytics' },
  { icon: <FiSettings />, label: 'Settings', path: '/settings' },
]

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <>
      <aside
        className={`hidden lg:flex flex-col ${
          collapsed ? 'w-20' : 'w-64'
        } bg-white border-r border-gray-200 h-screen sticky top-0 transition-all duration-300`}
      >
        <div className="p-4 flex items-center justify-between">
          {!collapsed && (
            <Link to="/" className="flex items-center gap-2 text-primary font-bold text-lg">
              <GiPlantRoots className="text-xl" />
              <span>AgriVISM</span>
            </Link>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {collapsed ? <FiMenu /> : <FiChevronLeft />}
          </button>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-primary text-white shadow-md shadow-primary/25'
                    : 'text-gray-600 hover:bg-primary/10 hover:text-primary'
                } ${collapsed ? 'justify-center' : ''}`}
                title={collapsed ? item.label : undefined}
              >
                <span className="text-lg">{item.icon}</span>
                {!collapsed && <span>{item.label}</span>}
              </Link>
            )
          })}
        </nav>

        <div className="p-3 border-t border-gray-100">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all w-full"
            title={collapsed ? 'Logout' : undefined}
          >
            <FiLogOut className="text-lg" />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>
    </>
  )
}
