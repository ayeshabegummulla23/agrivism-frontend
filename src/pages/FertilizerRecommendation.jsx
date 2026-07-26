import { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import DashboardHeader from '../components/DashboardHeader'
import { FiAlertTriangle, FiCheckCircle, FiCloud, FiDroplet, FiSun, FiThermometer, FiClock, FiShield, FiInfo, FiLoader } from 'react-icons/fi'
import { recommendFertilizer, getDashboardWeather } from '../services/api'

const stages = ['vegetative', 'flowering', 'fruiting', 'maturity']

export default function FertilizerRecommendation() {
  const [selectedCrop, setSelectedCrop] = useState('Rice')
  const [selectedStage, setSelectedStage] = useState('vegetative')
  const [fertData, setFertData] = useState(null)
  const [currentWeather, setCurrentWeather] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    getDashboardWeather().then((w) => { if (!cancelled) setCurrentWeather(w) }).catch(() => {})
    recommendFertilizer(selectedCrop.toLowerCase(), selectedStage).then((data) => {
      if (!cancelled) {
        setFertData(data)
        setIsLoading(false)
      }
    }).catch(() => {
      if (!cancelled) setIsLoading(false)
    })
    return () => { cancelled = true }
  }, [selectedCrop, selectedStage])

  const isRaining = (currentWeather?.rain_chance ?? 0) > 50
  const isWindy = (currentWeather?.wind_speed ?? 0) > 15

  const fertilizerPlan = fertData?.recommendations?.map((r) => ({
    name: r.name,
    nutrient: r.name,
    dosage: r.rate,
    timing: r.timing,
    crop: selectedCrop,
    icon: '🟢',
    color: 'bg-green-50 border-green-200',
  })) || []

  const organicOptions = fertData?.organic_alternatives?.map((o, i) => {
    const [name, dosage] = o.split(': ')
    const icons = ['🪱', '🌿', '🧪', '🌾']
    return { name, dosage, benefit: `${name} for sustainable farming`, icon: icons[i % icons.length] }
  }) || []

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader title="Fertilizer Recommendation" />
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-5xl mx-auto space-y-6">

            {/* Weather-Based Spray Alert */}
            <div className={`rounded-2xl p-6 border-2 ${
              isRaining
                ? 'bg-red-50 border-red-300'
                : 'bg-green-50 border-green-300'
            }`}>
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                  isRaining ? 'bg-red-100' : 'bg-green-100'
                }`}>
                  {isRaining
                    ? <FiAlertTriangle className="text-red-600 text-xl" />
                    : <FiCheckCircle className="text-green-600 text-xl" />
                  }
                </div>
                <div>
                  <h3 className={`font-bold text-lg ${
                    isRaining ? 'text-red-800' : 'text-green-800'
                  }`}>
                    {isRaining ? '⚠️ Do NOT Spray Today!' : '✅ Safe to Spray Today'}
                  </h3>
                  <p className={`text-sm mt-1 ${isRaining ? 'text-red-700' : 'text-green-700'}`}>
                    {isRaining
                      ? `Rain is expected (${currentWeather?.rain_chance}% chance). Spraying fertilizer or pesticides now will be washed away and waste chemicals. Wait for dry weather.`
                      : `Current conditions are suitable for spraying. Humidity is ${currentWeather?.humidity}%, wind is ${currentWeather?.wind_speed} km/h. Spray early morning or late evening for best absorption.`
                    }
                  </p>
                  <div className="flex flex-wrap gap-3 mt-3">
                    <span className={`inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full ${
                      isRaining ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                    }`}>
                      <FiCloud /> {currentWeather?.description}
                    </span>
                    <span className={`inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full ${
                      isRaining ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                    }`}>
                      <FiThermometer /> {currentWeather?.temp}°C
                    </span>
                    <span className={`inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full ${
                      isRaining ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                    }`}>
                      <FiDroplet /> {currentWeather?.humidity}% humidity
                    </span>
                    <span className={`inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full ${
                      isWindy ? 'bg-orange-100 text-orange-700' : (isRaining ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700')
                    }`}>
                      <FiSun /> Wind: {currentWeather?.wind_speed} km/h
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Crop & Stage Selector */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Select Crop & Growth Stage</h3>
              <div className="flex flex-wrap gap-3 mb-4">
                {['Rice', 'Cotton', 'Tomato', 'Groundnut', 'Coconut', 'Turmeric'].map((crop) => (
                  <button
                    key={crop}
                    onClick={() => setSelectedCrop(crop)}
                    className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      selectedCrop === crop
                        ? 'bg-primary text-white shadow-md shadow-primary/25'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {crop}
                  </button>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {stages.map((stage) => (
                  <button
                    key={stage}
                    onClick={() => setSelectedStage(stage)}
                    className={`px-4 py-2 rounded-lg text-xs font-medium capitalize transition-all ${
                      selectedStage === stage
                        ? 'bg-emerald-600 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {stage}
                  </button>
                ))}
              </div>
            </div>

            {/* Fertilizer Plan */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-semibold text-gray-900 mb-1">Recommended Fertilizer Plan</h3>
              <p className="text-sm text-gray-500 mb-4">For {selectedCrop} ({selectedStage} stage) based on soil type (Red Soil)</p>
              {isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <FiLoader className="text-2xl text-primary animate-spin" />
                </div>
              ) : (
                <div className="space-y-4">
                  {fertilizerPlan.map((f) => (
                    <div key={f.name} className={`rounded-xl border p-4 ${f.color}`}>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{f.icon}</span>
                          <div>
                            <p className="font-semibold text-gray-900">{f.name}</p>
                            <p className="text-sm text-gray-600">Nutrient: {f.nutrient}</p>
                          </div>
                        </div>
                        <span className="text-sm font-bold text-gray-900 bg-white px-3 py-1 rounded-lg shadow-sm">
                          {f.dosage}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-3 text-sm text-gray-600">
                        <FiClock className="text-gray-400 shrink-0" />
                        <span>{f.timing}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Spray Safety Guide */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <FiShield className="text-primary" /> Spray Safety Guide
              </h3>
              <div className="space-y-3">
                {[
                  { label: 'Fungicide (Mancozeb)', timing: isRaining ? 'Do NOT spray — rain expected' : 'Safe to spray today', safe: !isRaining },
                  { label: 'Insecticide (Chlorpyrifos)', timing: isWindy ? 'Avoid — wind too strong' : 'Safe to spray today', safe: !isWindy },
                ].map((g, i) => (
                  <div key={i} className={`flex items-center justify-between p-4 rounded-xl border ${
                    g.safe ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
                  }`}>
                    <div className="flex items-center gap-3">
                      {g.safe
                        ? <FiCheckCircle className="text-green-600 shrink-0" />
                        : <FiAlertTriangle className="text-red-600 shrink-0" />
                      }
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{g.label}</p>
                        <p className={`text-xs mt-0.5 ${g.safe ? 'text-green-600' : 'text-red-600'}`}>
                          {g.timing}
                        </p>
                      </div>
                    </div>
                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                      g.safe ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {g.safe ? 'SAFE' : 'DO NOT SPRAY'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Organic Options */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-semibold text-gray-900 mb-1 flex items-center gap-2">
                🌿 Organic Alternatives
              </h3>
              <p className="text-sm text-gray-500 mb-4">Eco-friendly fertilizer options for sustainable farming</p>
              {isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <FiLoader className="text-2xl text-primary animate-spin" />
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 gap-4">
                  {organicOptions.map((o) => (
                    <div key={o.name} className="bg-green-50/50 rounded-xl border border-green-100 p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">{o.icon}</span>
                        <p className="font-semibold text-gray-900">{o.name}</p>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{o.benefit}</p>
                      <p className="text-xs text-primary font-medium">Dosage: {o.dosage}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Tips */}
            <div className="bg-primary/5 rounded-2xl border border-primary/20 p-6">
              <h3 className="font-semibold text-primary mb-3 flex items-center gap-2">
                <FiInfo /> Important Tips
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  Never spray fertilizers or pesticides when rain is expected within 4-6 hours.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  Spray in early morning (5-7 AM) or late evening (4-6 PM) for best results.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  Avoid spraying when wind speed exceeds 15 km/h — chemical drift wastes product and harms nearby crops.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  Maintain a gap of at least 7 days between fertilizer application and pesticide spraying.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  Always wear protective gear (gloves, mask, goggles) when handling chemicals.
                </li>
              </ul>
            </div>

          </div>
        </main>
      </div>
    </div>
  )
}
