import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import {
  FiHome, FiCloud, FiDroplet, FiTrendingUp, FiCamera,
  FiTool, FiTarget, FiBarChart2, FiSettings,
  FiLogOut, FiChevronLeft, FiMenu, FiMap, FiUser, FiZap,
  FiShield, FiPhone, FiGlobe
} from 'react-icons/fi'
import { GiPlantRoots } from 'react-icons/gi'
import { useLanguage } from '../i18n/useLanguage'

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const [showLang, setShowLang] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { lang, changeLang, t, languages } = useLanguage()

  const menuItems = [
    { icon: <FiHome />, label: t('nav.dashboard'), path: '/dashboard' },
    { icon: <FiMap />, label: t('nav.landRegistration'), path: '/register-farm' },
    { icon: <FiUser />, label: t('nav.farmProfile'), path: '/farm-profile' },
    { icon: <FiCloud />, label: t('nav.weather'), path: '/weather' },
    { icon: <FiDroplet />, label: t('nav.waterManagement'), path: '/water-management' },
    { icon: <FiTrendingUp />, label: t('nav.marketPrices'), path: '/market-prices' },
    { icon: <FiTool />, label: t('nav.problemSolver'), path: '/problem-solver' },
    { icon: <FiCamera />, label: t('nav.diseaseDetection'), path: '/disease-detection' },
    { icon: <FiTarget />, label: t('nav.cropRecommendation'), path: '/crop-recommendation' },
    { icon: <FiZap />, label: t('nav.fertilizerGuide'), path: '/fertilizer' },
    { icon: <FiShield />, label: t('nav.weedManagement'), path: '/weed-management' },
    { icon: <FiShield />, label: t('nav.cropProtection'), path: '/crop-protection' },
    { icon: <FiPhone />, label: t('nav.valiVideoCall'), path: '/ai-assistant' },
    { icon: <FiBarChart2 />, label: t('nav.analytics'), path: '/analytics' },
    { icon: <FiSettings />, label: t('nav.settings'), path: '/settings' },
  ]

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

        {/* Language Switcher */}
        {!collapsed && (
          <div className="px-3 py-2 border-t border-gray-100 relative">
            <button
              onClick={() => setShowLang(!showLang)}
              className="flex items-center gap-2 w-full px-3 py-2 rounded-xl text-sm text-gray-600 hover:bg-primary/10 hover:text-primary transition-all"
            >
              <FiGlobe className="text-lg" />
              <span>{languages.find((l) => l.code === lang)?.native}</span>
            </button>
            {showLang && (
              <div className="absolute bottom-full left-3 right-3 mb-1 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-50">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => { changeLang(l.code); setShowLang(false) }}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                      lang === l.code
                        ? 'bg-primary text-white'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <span className="font-medium">{l.native}</span>
                    <span className="text-xs text-gray-400 ml-2">{l.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="p-3 border-t border-gray-100">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all w-full"
            title={collapsed ? t('nav.logout') : undefined}
          >
            <FiLogOut className="text-lg" />
            {!collapsed && <span>{t('nav.logout')}</span>}
          </button>
        </div>
      </aside>
    </>
  )
}
