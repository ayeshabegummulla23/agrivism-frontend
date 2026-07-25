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

function App() {
  return (
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
  )
}

export default App
