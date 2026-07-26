import { Component } from 'react'
import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import RegisterFarm from './pages/RegisterFarm'
import FarmProfile from './pages/FarmProfile'
import Weather from './pages/Weather'
import WaterManagement from './pages/WaterManagement'
import MarketPrices from './pages/MarketPrices'
import DiseaseDetection from './pages/DiseaseDetection'
import ProblemSolver from './pages/ProblemSolver'
import CropRecommendation from './pages/CropRecommendation'
import FertilizerRecommendation from './pages/FertilizerRecommendation'
import WeedManagement from './pages/WeedManagement'
import CropProtection from './pages/CropProtection'
import AIAssistant from './pages/AIAssistant'
import Analytics from './pages/Analytics'
import Settings from './pages/Settings'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
          <div className="max-w-md text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">⚠️</span>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Something went wrong</h2>
            <p className="text-gray-500 text-sm mb-4">{this.state.error?.message || 'An unexpected error occurred'}</p>
            <button
              onClick={() => { this.setState({ hasError: false, error: null }); window.location.reload() }}
              className="px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-colors"
            >
              Reload Page
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/register-farm" element={<RegisterFarm />} />
        <Route path="/farm-profile" element={<FarmProfile />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/water-management" element={<WaterManagement />} />
        <Route path="/market-prices" element={<MarketPrices />} />
        <Route path="/disease-detection" element={<DiseaseDetection />} />
        <Route path="/problem-solver" element={<ProblemSolver />} />
        <Route path="/crop-recommendation" element={<CropRecommendation />} />
        <Route path="/fertilizer" element={<FertilizerRecommendation />} />
        <Route path="/weed-management" element={<WeedManagement />} />
        <Route path="/crop-protection" element={<CropProtection />} />
        <Route path="/ai-assistant" element={<AIAssistant />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </ErrorBoundary>
  )
}

export default App
