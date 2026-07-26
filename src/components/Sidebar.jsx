import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import {
  FiHome, FiCloud, FiDroplet, FiTrendingUp, FiCamera,
  FiTool, FiTarget, FiBarChart2, FiSettings,
  FiLogOut, FiChevronLeft, FiMenu, FiMap, FiUser, FiZap,
  FiShield, FiPhone, FiGlobe, FiChevronDown
} from 'react-icons/fi'
import { GiPlantRoots } from 'react-icons/gi'
import { useLanguage } from '../i18n/useLanguage'
import { logout as apiLogout } from '../services/api'

const menuGroups = (t) => [
  { type: 'item', icon: <FiHome />, label: t('nav.dashboard'), path: '/dashboard' },
  {
    type: 'group',
    icon: <FiMap />,
    label: t('nav.groupFarm'),
    children: [
      { icon: <FiMap />, label: t('nav.landRegistration'), path: '/register-farm' },
      { icon: <FiUser />, label: t('nav.farmProfile'), path: '/farm-profile' },
    ],
  },
  {
    type: 'group',
    icon: <FiCloud />,
    label: t('nav.groupWeatherWater'),
    children: [
      { icon: <FiCloud />, label: t('nav.weather'), path: '/weather' },
      { icon: <FiDroplet />, label: t('nav.waterManagement'), path: '/water-management' },
    ],
  },
  {
    type: 'group',
    icon: <GiPlantRoots />,
    label: t('nav.groupCrop'),
    children: [
      { icon: <FiTarget />, label: t('nav.cropRecommendation'), path: '/crop-recommendation' },
      { icon: <FiCamera />, label: t('nav.diseaseDetection'), path: '/disease-detection' },
      { icon: <FiZap />, label: t('nav.fertilizerGuide'), path: '/fertilizer' },
      { icon: <FiShield />, label: t('nav.weedManagement'), path: '/weed-management' },
      { icon: <FiShield />, label: t('nav.cropProtection'), path: '/crop-protection' },
    ],
  },
  {
    type: 'group',
    icon: <FiTrendingUp />,
    label: t('nav.groupMarket'),
    children: [
      { icon: <FiTrendingUp />, label: t('nav.marketPrices'), path: '/market-prices' },
      { icon: <FiBarChart2 />, label: t('nav.analytics'), path: '/analytics' },
    ],
  },
  { type: 'item', icon: <FiPhone />, label: t('nav.valiVideoCall'), path: '/ai-assistant' },
  { type: 'item', icon: <FiTool />, label: t('nav.problemSolver'), path: '/problem-solver' },
  { type: 'item', icon: <FiSettings />, label: t('nav.settings'), path: '/settings' },
]

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const [showLang, setShowLang] = useState(false)
  const [manualExpanded, setManualExpanded] = useState(null)
  const location = useLocation()
  const navigate = useNavigate()
  const { lang, changeLang, t, languages } = useLanguage()

  const groups = menuGroups(t)

  const getActiveGroupIndex = () => {
    for (let i = 0; i < groups.length; i++) {
      const g = groups[i]
      if (g.type === 'group' && g.children.some((c) => location.pathname === c.path)) {
        return i
      }
    }
    return null
  }

  const expandedGroup = manualExpanded ?? getActiveGroupIndex()

  const toggleGroup = (index) => {
    setManualExpanded((prev) => (prev === index ? null : index))
  }

  const handleChildClick = () => {
    setManualExpanded(null)
  }

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

        <nav className="flex-1 px-3 py-2 space-y-0.5 overflow-y-auto">
          {groups.map((item, index) => {
            if (item.type === 'item') {
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
                  <span className="text-lg flex-shrink-0">{item.icon}</span>
                  {!collapsed && <span>{item.label}</span>}
                </Link>
              )
            }

            if (item.type === 'group') {
              const isExpanded = expandedGroup === index
              const isChildActive = item.children.some(
                (c) => location.pathname === c.path
              )

              if (collapsed) {
                return (
                  <div key={index} className="relative group">
                    <div
                      className={`flex items-center justify-center px-3 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                        isChildActive
                          ? 'bg-primary/10 text-primary'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                      onClick={() => toggleGroup(index)}
                    >
                      <span className="text-lg">{item.icon}</span>
                    </div>
                    <div className="absolute left-full top-0 ml-2 hidden group-hover:block z-50">
                      <div className="bg-white border border-gray-200 rounded-xl shadow-lg py-1 min-w-[180px]">
                        {item.children.map((child) => (
                          <Link
                            key={child.path}
                            to={child.path}
                            className={`flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors ${
                              location.pathname === child.path
                                ? 'bg-primary text-white'
                                : 'text-gray-600 hover:bg-gray-50'
                            }`}
                          >
                            <span className="text-sm">{child.icon}</span>
                            <span>{child.label}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              }

              return (
                <div key={index}>
                  <button
                    onClick={() => toggleGroup(index)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      isChildActive && !isExpanded
                        ? 'bg-primary/10 text-primary'
                        : isExpanded
                        ? 'text-primary'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <span className="text-lg flex-shrink-0">{item.icon}</span>
                    <span className="flex-1 text-left">{item.label}</span>
                    <FiChevronDown
                      className={`text-sm transition-transform duration-200 flex-shrink-0 ${
                        isExpanded ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-200 ${
                      isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="ml-4 pl-3 border-l-2 border-gray-100 space-y-0.5 py-1">
                      {item.children.map((child) => {
                        const isActive = location.pathname === child.path
                        return (
                          <Link
                            key={child.path}
                            to={child.path}
                            onClick={handleChildClick}
                            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all ${
                              isActive
                                ? 'bg-primary/10 text-primary font-medium'
                                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                            }`}
                          >
                            <span className="text-sm flex-shrink-0">{child.icon}</span>
                            <span>{child.label}</span>
                          </Link>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )
            }
            return null
          })}
        </nav>

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
            onClick={() => { apiLogout(); navigate('/login') }}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all w-full ${
              collapsed ? 'justify-center' : ''
            }`}
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
