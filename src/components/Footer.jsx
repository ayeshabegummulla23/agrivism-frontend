import { GiPlantRoots } from 'react-icons/gi'
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <GiPlantRoots className="text-primary text-2xl" />
              <span className="text-xl font-bold">AgriVISM</span>
            </div>
            <p className="text-gray-400 text-sm">
              AI-powered agriculture platform helping farmers with land management, weather forecasting, irrigation planning, market prices, and crop intelligence.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link to="/dashboard" className="hover:text-primary transition-colors">Dashboard</Link></li>
              <li><Link to="/weather" className="hover:text-primary transition-colors">Weather</Link></li>
              <li><Link to="/market-prices" className="hover:text-primary transition-colors">Market Prices</Link></li>
              <li><Link to="/ai-assistant" className="hover:text-primary transition-colors">AI Assistant</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link to="/register-farm" className="hover:text-primary transition-colors">Land Registration</Link></li>
              <li><Link to="/disease-detection" className="hover:text-primary transition-colors">Disease Detection</Link></li>
              <li><Link to="/crop-recommendation" className="hover:text-primary transition-colors">Crop Recommendation</Link></li>
              <li><Link to="/water-management" className="hover:text-primary transition-colors">Water Management</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li className="flex items-center gap-2">
                <FiMail className="text-primary" />
                <span>support@agrivism.com</span>
              </li>
              <li className="flex items-center gap-2">
                <FiPhone className="text-primary" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-2">
                <FiMapPin className="text-primary" />
                <span>Chennai, India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; 2026 AgriVISM by VimSha AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
