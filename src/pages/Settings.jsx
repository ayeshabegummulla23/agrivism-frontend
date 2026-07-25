import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import DashboardHeader from '../components/DashboardHeader'
import { FiUser, FiBell, FiGlobe, FiMoon, FiChevronRight, FiLogOut } from 'react-icons/fi'

export default function Settings() {
  const [darkMode, setDarkMode] = useState(false)
  const [notifications, setNotifications] = useState(true)
  const [language, setLanguage] = useState('en')

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader title="Settings" />
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-2xl mx-auto space-y-6">
            {/* Profile Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <FiUser className="text-primary" /> Profile
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-xl">
                    RK
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Rajesh Kumar</p>
                    <p className="text-sm text-gray-500">rajesh@example.com</p>
                    <p className="text-sm text-gray-500">+91 98765 43210</p>
                  </div>
                </div>
                <button className="text-primary text-sm font-medium hover:underline">Edit Profile</button>
              </div>
            </div>

            {/* Notifications */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FiBell className="text-primary text-lg" />
                  <div>
                    <p className="font-medium text-gray-900">Notifications</p>
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

            {/* Language */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FiGlobe className="text-primary text-lg" />
                  <div>
                    <p className="font-medium text-gray-900">Language</p>
                    <p className="text-sm text-gray-500">Select your preferred language</p>
                  </div>
                </div>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="px-4 py-2 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/30 bg-white"
                >
                  <option value="en">English</option>
                  <option value="ta">Tamil</option>
                  <option value="hi">Hindi</option>
                  <option value="te">Telugu</option>
                  <option value="kn">Kannada</option>
                </select>
              </div>
            </div>

            {/* Dark Mode */}
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

            {/* Account */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
              <h3 className="font-semibold text-gray-900">Account</h3>
              {['Change Password', 'Privacy Settings', 'Delete Account'].map((item) => (
                <button key={item} className="w-full flex items-center justify-between py-3 border-b border-gray-50 last:border-0 hover:text-primary transition-colors">
                  <span className="text-sm text-gray-700">{item}</span>
                  <FiChevronRight className="text-gray-400" />
                </button>
              ))}
            </div>

            {/* Logout */}
            <button className="w-full bg-red-50 text-red-600 font-semibold py-3 rounded-xl hover:bg-red-100 transition-colors flex items-center justify-center gap-2">
              <FiLogOut /> Logout
            </button>
          </div>
        </main>
      </div>
    </div>
  )
}
