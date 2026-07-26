import { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import DashboardHeader from '../components/DashboardHeader'
import UploadCard from '../components/UploadCard'
import { FiCheckCircle, FiShield, FiActivity, FiAlertTriangle, FiCloud, FiWind, FiDroplet, FiSun, FiClock, FiInfo, FiLoader, FiFileText } from 'react-icons/fi'
import { detectDisease, getDashboardWeather } from '../services/api'

export default function DiseaseDetection() {
  const [showResult, setShowResult] = useState(false)
  const [prediction, setPrediction] = useState(null)
  const [loading, setLoading] = useState(false)
  const [todayWeather, setTodayWeather] = useState(null)
  const [uploadedFile, setUploadedFile] = useState(null)

  useEffect(() => {
    getDashboardWeather().then(setTodayWeather).catch(() => {})
  }, [])

  const handleUpload = async (file) => {
    setUploadedFile(file)
    setLoading(true)
    try {
      const data = await detectDisease(file.name, 'unknown')
      setPrediction({
        disease: data.disease,
        confidence: Math.round(data.confidence * 100),
        severity: data.severity.charAt(0).toUpperCase() + data.severity.slice(1),
        treatment: [data.treatment],
        prevention: data.prevention,
      })
      setShowResult(true)
    } catch {
      setPrediction({
        disease: 'Unable to detect',
        confidence: 0,
        severity: 'Unknown',
        treatment: ['Please try uploading the image again.'],
        prevention: [],
      })
      setShowResult(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader title="Disease Detection" />
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Upload Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-semibold text-gray-900 mb-2">Upload Crop Image</h3>
              <p className="text-sm text-gray-500 mb-4">Take a clear, close-up photo of the affected area for best results</p>
              <UploadCard title="Upload Image" subtitle="JPG, PNG (Max 10MB)" onUpload={handleUpload} />
              {uploadedFile && (
                <div className="mt-3 flex items-center gap-2 p-2 bg-green-50 rounded-xl">
                  <FiFileText className="text-green-600" />
                  <span className="text-sm text-green-700 truncate">{uploadedFile.name}</span>
                </div>
              )}
              {loading && (
                <div className="flex items-center gap-2 mt-4 text-primary">
                  <FiLoader className="animate-spin" />
                  <span className="text-sm font-medium">Analyzing image...</span>
                </div>
              )}
            </div>

            {/* Preview */}
            {showResult && (
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Image Preview */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Preview</h3>
                  <div className="bg-gray-100 rounded-xl h-64 flex items-center justify-center">
                    <p className="text-gray-400 text-sm">Uploaded image preview</p>
                  </div>
                </div>

                {/* Prediction */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">AI Prediction</h3>
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4">
                    <p className="text-lg font-bold text-red-800">{prediction.disease}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-sm text-red-600">Confidence: {prediction.confidence}%</span>
                      <span className="text-sm text-red-600">Severity: {prediction.severity}</span>
                    </div>
                    <div className="mt-3">
                      <div className="bg-red-200 rounded-full h-2">
                        <div className="bg-red-600 rounded-full h-2" style={{ width: `${prediction.confidence}%` }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Treatment & Prevention */}
            {showResult && (
              <div className="grid lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <FiActivity className="text-primary" /> Treatment
                  </h3>
                  <ul className="space-y-3">
                    {prediction.treatment.map((t, i) => (
                      <li key={i} className="flex items-start gap-3 p-3 bg-green-50 rounded-xl">
                        <FiCheckCircle className="text-green-600 shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700">{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <FiShield className="text-primary" /> Prevention
                  </h3>
                  <ul className="space-y-3">
                    {prediction.prevention.map((p, i) => (
                      <li key={i} className="flex items-start gap-3 p-3 bg-blue-50 rounded-xl">
                        <FiShield className="text-blue-600 shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700">{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Weather-Based Treatment Alerts */}
            {showResult && (
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <FiAlertTriangle className="text-orange-500" /> Weather-Based Treatment Alerts
                </h3>

                {todayWeather && (
                  <>
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-5 text-white">
                      <p className="text-blue-100 text-sm mb-3">Current Weather Conditions</p>
                      <div className="flex flex-wrap gap-4">
                        <div className="flex items-center gap-2">
                          <FiCloud className="text-blue-200" />
                          <span className="text-sm">{todayWeather.description}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FiSun className="text-blue-200" />
                          <span className="text-sm">{todayWeather.temp}°C</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FiDroplet className="text-blue-200" />
                          <span className="text-sm">{todayWeather.humidity}% humidity</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FiWind className="text-blue-200" />
                          <span className="text-sm">Wind: {todayWeather.wind_speed} km/h</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FiCloud className="text-blue-200" />
                          <span className="text-sm">Rain: {todayWeather.rain_chance}%</span>
                        </div>
                      </div>
                    </div>

                    {/* Dynamic alerts based on real weather */}
                    {todayWeather.rain_chance > 50 && (
                      <div className="bg-red-50 rounded-2xl border border-red-200 p-5">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-red-100 text-red-600"><FiAlertTriangle /></div>
                          <h4 className="font-bold text-red-800">Do NOT Spray Fungicide Today</h4>
                        </div>
                        <p className="text-sm text-gray-700 pl-[52px]">Rain is expected ({todayWeather.rain_chance}% chance). Spraying now will waste chemicals. Wait for dry weather.</p>
                      </div>
                    )}
                    {todayWeather.humidity > 70 && (
                      <div className="bg-orange-50 rounded-2xl border border-orange-200 p-5">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-orange-100 text-orange-600"><FiAlertTriangle /></div>
                          <h4 className="font-bold text-orange-800">High Humidity Will Worsen Disease</h4>
                        </div>
                        <p className="text-sm text-gray-700 pl-[52px]">Current humidity is {todayWeather.humidity}%. Improve air circulation between plants.</p>
                      </div>
                    )}
                    {todayWeather.rain_chance <= 50 && (
                      <div className="bg-green-50 rounded-2xl border border-green-200 p-5">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-green-100 text-green-600"><FiCheckCircle /></div>
                          <h4 className="font-bold text-green-800">Conditions Look Good for Spraying</h4>
                        </div>
                        <p className="text-sm text-gray-700 pl-[52px]">Rain chance is low ({todayWeather.rain_chance}%). Safe to apply treatment in early morning.</p>
                      </div>
                    )}
                  </>
                )}

                {/* Spray Schedule */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <FiInfo className="text-primary" /> Suggested Spray Schedule
                  </h3>
                  <p className="text-sm text-gray-500 mb-3">Based on current weather conditions — spray on dry days only</p>
                  <div className="flex items-center gap-3 p-3 bg-primary/5 rounded-xl">
                    <FiClock className="text-primary shrink-0" />
                    <p className="text-sm text-gray-700">Apply recommended treatment on the next dry day, early morning (5-7 AM).</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
