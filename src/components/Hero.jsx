import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { GiPlantRoots } from 'react-icons/gi'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-emerald-50 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <GiPlantRoots />
              <span>Powered by VimSha AI</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Smart Farming
              <span className="text-primary"> Starts Here</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              AI-powered agriculture platform helping farmers with land management, weather forecasting, irrigation planning, market prices, and crop intelligence.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/register"
                className="px-8 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-all shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30"
              >
                Get Started
              </Link>
              <a
                href="#about"
                className="px-8 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-primary hover:text-primary transition-all"
              >
                Learn More
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:block"
          >
            <div className="relative">
              <div className="w-full h-96 bg-gradient-to-br from-primary/20 to-accent/30 rounded-3xl flex items-center justify-center">
                <div className="text-center">
                  <GiPlantRoots className="text-[120px] text-primary/40 mx-auto" />
                  <p className="text-primary/60 font-medium mt-4">AI-Powered Agriculture</p>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl p-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm font-medium">VALI Online</span>
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-4">
                <span className="text-2xl">🌦</span>
                <p className="text-sm font-medium mt-1">28°C Sunny</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
