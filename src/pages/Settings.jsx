import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import DashboardHeader from '../components/DashboardHeader'
import { FiUser, FiBell, FiGlobe, FiMoon, FiChevronRight, FiLogOut, FiCheck } from 'react-icons/fi'
import { useLanguage } from '../i18n/useLanguage'
import { getCurrentUser, logout } from '../services/api'
import { useNavigate } from 'react-router-dom'

export default function Settings() {
  const [darkMode, setDarkMode] = useState(false)
  const [notifications, setNotifications] = useState(true)
  const [saved, setSaved] = useState(false)
  const { lang, changeLang, t, languages } = useLanguage()
  const navigate = useNavigate()
  const user = getCurrentUser()

  const initials = user ? `${user.first_name?.[0] || ''}${user.last_name?.[0] || ''}`.toUpperCase() : 'AG'
  const fullName = user ? `${user.first_name} ${user.last_name}` : 'Guest User'
  const email = user?.email || ''
  const phone = user?.mobile || ''

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader title={t('settings.title')} />
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <FiUser className="text-primary" /> {t('settings.profile')}
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-xl">
                    {initials}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{fullName}</p>
                    {email && <p className="text-sm text-gray-500">{email}</p>}
                    {phone && <p className="text-sm text-gray-500">{phone}</p>}
                  </div>
                </div>
                <button onClick={handleSave} className="flex items-center gap-1 text-primary text-sm font-medium hover:underline">
                  {saved ? <><FiCheck className="text-green-500" /> Saved!</> : t('common.save')}
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FiBell className="text-primary text-lg" />
                  <div>
                    <p className="font-medium text-gray-900">{t('settings.notifications')}</p>
                    <p className="text-sm text-gray-500">Receive weather alerts and price updates</p>
                  </div>
                </div>
                <button
                  onClick={() => setNotifications(!notifications)}
                  className={`w-12 h-6 rounded-full transition-colors relative ${notifications ? 'bg-primary' : 'bg-gray-300'}`}
                >
                  <span className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all shadow ${notifications ? 'left-6' : 'left-0.5'}`} />
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FiGlobe className="text-primary text-lg" />
                  <div>
                    <p className="font-medium text-gray-900">{t('settings.language')}</p>
                    <p className="text-sm text-gray-500">Select your preferred language</p>
                  </div>
                </div>
                <select
                  value={lang}
                  onChange={(e) => changeLang(e.target.value)}
                  className="px-4 py-2 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/30 bg-white"
                >
                  {languages.map((l) => (
                    <option key={l.code} value={l.code}>{l.native} ({l.label})</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FiMoon className="text-primary text-lg" />
                  <div>
                    <p className="font-medium text-gray-900">Dark Mode</p>
                    <p className="text-sm text-gray-500">Toggle dark theme</p>
                  </div>
                </div>
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className={`w-12 h-6 rounded-full transition-colors relative ${darkMode ? 'bg-primary' : 'bg-gray-300'}`}
                >
                  <span className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all shadow ${darkMode ? 'left-6' : 'left-0.5'}`} />
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
              <h3 className="font-semibold text-gray-900">{t('settings.account')}</h3>
              {[
                { label: 'Change Password', action: () => alert('Change Password feature coming soon!') },
                { label: 'Privacy Settings', action: () => alert('Privacy Settings feature coming soon!') },
              ].map((item) => (
                <button key={item.label} onClick={item.action} className="w-full flex items-center justify-between py-3 border-b border-gray-50 last:border-0 hover:text-primary transition-colors">
                  <span className="text-sm text-gray-700">{item.label}</span>
                  <FiChevronRight className="text-gray-400" />
                </button>
              ))}
            </div>

            <button
              onClick={handleLogout}
              className="w-full bg-red-50 text-red-600 font-semibold py-3 rounded-xl hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
            >
              <FiLogOut /> {t('nav.logout')}
            </button>
          </div>
        </main>
      </div>
    </div>
  )
}
