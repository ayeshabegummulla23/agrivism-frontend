import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FiMenu, FiX } from 'react-icons/fi'
import { GiPlantRoots } from 'react-icons/gi'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const isLanding = location.pathname === '/'

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Features', href: '/#features' },
    { label: 'About', href: '/#about' },
    { label: 'Contact', href: '/#contact' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 text-primary font-bold text-xl">
            <GiPlantRoots className="text-2xl" />
            <span>AgriVISM</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {isLanding && navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-gray-700 hover:text-primary transition-colors font-medium"
              >
                {link.label}
              </a>
            ))}
            <Link
              to="/login"
              className="px-4 py-2 text-primary font-medium hover:bg-primary/10 rounded-lg transition-colors"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition-colors"
            >
              Get Started
            </Link>
          </div>

          <button
            className="md:hidden text-gray-700"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden glass border-t border-white/20">
          <div className="px-4 py-4 space-y-3">
            {isLanding && navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block text-gray-700 hover:text-primary transition-colors font-medium py-2"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <Link
              to="/login"
              className="block text-primary font-medium py-2"
              onClick={() => setMobileOpen(false)}
            >
              Login
            </Link>
            <Link
              to="/register"
              className="block bg-primary text-white font-medium py-2 px-4 rounded-lg text-center"
              onClick={() => setMobileOpen(false)}
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
