import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import DashboardHeader from '../components/DashboardHeader'
import UploadCard from '../components/UploadCard'
import OCRPreviewCard from '../components/OCRPreviewCard'
import MapPlaceholder from '../components/MapPlaceholder'
import { FiCheckCircle, FiArrowRight, FiArrowLeft, FiLoader, FiFileText, FiImage } from 'react-icons/fi'
import { registerFarm } from '../services/api'

export default function RegisterFarm() {
  const [step, setStep] = useState(1)
  const [extractedData, setExtractedData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [rorFile, setRorFile] = useState(null)
  const [fmbFile, setFmbFile] = useState(null)
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: '', crop: 'Rice', area: '', soil_type: 'Red Soil',
    village: '', district: '', state: '', water_source: 'Borewell',
    survey_number: '', khata: '',
  })

  const update = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }))

  const handleRORUpload = (file) => {
    setRorFile(file)
    setExtractedData({
      'File Name': file.name,
      'File Size': `${(file.size / 1024).toFixed(1)} KB`,
      'Status': 'Ready for review',
    })
  }

  const handleFMBUpload = (file) => {
    setFmbFile(file)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await registerFarm(form)
      navigate('/farm-profile')
    } catch (err) {
      setError(err.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader title="Smart Land Registration" />
        <main className="flex-1 p-6 overflow-y-auto">
          {/* Step Indicator */}
          <div className="flex items-center justify-center mb-8">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                    step >= s ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {step > s ? <FiCheckCircle /> : s}
                </div>
                {s < 4 && (
                  <div className={`w-16 sm:w-24 h-1 ${step > s ? 'bg-primary' : 'bg-gray-200'}`} />
                )}
              </div>
            ))}
          </div>

          {/* Step 1: Upload Documents */}
          {step === 1 && (
            <div className="max-w-3xl mx-auto space-y-6">
              <h2 className="text-xl font-bold text-gray-900 text-center">Upload Documents</h2>
              <p className="text-gray-500 text-center text-sm">Upload your ROR 1B and Village/FMB Sketch for AI-powered extraction</p>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <UploadCard title="Upload ROR 1B" subtitle="PDF, JPG, PNG (Max 10MB)" onUpload={handleRORUpload} />
                  {rorFile && (
                    <div className="mt-2 flex items-center gap-2 p-2 bg-green-50 rounded-xl">
                      <FiFileText className="text-green-600" />
                      <span className="text-sm text-green-700 truncate">{rorFile.name}</span>
                    </div>
                  )}
                </div>
                <div>
                  <UploadCard title="Upload Village/FMB Sketch" subtitle="PDF, JPG, PNG (Max 10MB)" onUpload={handleFMBUpload} />
                  {fmbFile && (
                    <div className="mt-2 flex items-center gap-2 p-2 bg-green-50 rounded-xl">
                      <FiImage className="text-green-600" />
                      <span className="text-sm text-green-700 truncate">{fmbFile.name}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex justify-end">
                <button onClick={() => setStep(2)} className="px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-colors flex items-center gap-2">
                  Next <FiArrowRight />
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Extracted / Manual Info */}
          {step === 2 && (
            <div className="max-w-3xl mx-auto space-y-6">
              <h2 className="text-xl font-bold text-gray-900 text-center">Document Information</h2>
              <p className="text-gray-500 text-center text-sm">Review extracted data or fill in manually</p>

              {extractedData ? (
                <OCRPreviewCard data={extractedData} />
              ) : (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                  <p className="text-sm text-gray-500 mb-4">No document uploaded yet. Fill in details manually:</p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Survey Number</label>
                      <input value={form.survey_number} onChange={update('survey_number')} placeholder="e.g. 12/2A" className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Khata Number</label>
                      <input value={form.khata} onChange={update('khata')} placeholder="e.g. 458" className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-between">
                <button onClick={() => setStep(1)} className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors flex items-center gap-2">
                  <FiArrowLeft /> Back
                </button>
                <button onClick={() => setStep(3)} className="px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-colors flex items-center gap-2">
                  Next <FiArrowRight />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Map */}
          {step === 3 && (
            <div className="max-w-4xl mx-auto space-y-6">
              <h2 className="text-xl font-bold text-gray-900 text-center">Confirm Farm Location</h2>
              <p className="text-gray-500 text-center text-sm">Pin your farm location on the map</p>
              <MapPlaceholder height="h-96" />
              <div className="flex justify-between">
                <button onClick={() => setStep(2)} className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors flex items-center gap-2">
                  <FiArrowLeft /> Back
                </button>
                <button onClick={() => setStep(4)} className="px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-colors flex items-center gap-2">
                  Next <FiArrowRight />
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Registration Form */}
          {step === 4 && (
            <div className="max-w-3xl mx-auto space-y-6">
              <h2 className="text-xl font-bold text-gray-900 text-center">Farm Registration</h2>
              <p className="text-gray-500 text-center text-sm">Complete your farm details</p>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">{error}</div>
              )}

              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Farm Name</label>
                      <input value={form.name} onChange={update('name')} placeholder="e.g. Green Valley Farm" required className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Crop</label>
                      <select value={form.crop} onChange={update('crop')} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary bg-white">
                        <option>Rice</option>
                        <option>Cotton</option>
                        <option>Tomato</option>
                        <option>Groundnut</option>
                        <option>Coconut</option>
                        <option>Turmeric</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Area (Acres)</label>
                      <input value={form.area} onChange={update('area')} placeholder="e.g. 2.5" required className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Soil Type</label>
                      <select value={form.soil_type} onChange={update('soil_type')} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary bg-white">
                        <option>Red Soil</option>
                        <option>Black Soil</option>
                        <option>Clay Soil</option>
                        <option>Sandy Soil</option>
                        <option>Alluvial Soil</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Village</label>
                      <input value={form.village} onChange={update('village')} placeholder="e.g. Kaveripattinam" required className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">District</label>
                      <input value={form.district} onChange={update('district')} placeholder="e.g. Krishnagiri" required className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                      <input value={form.state} onChange={update('state')} placeholder="e.g. Tamil Nadu" required className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Water Source</label>
                      <select value={form.water_source} onChange={update('water_source')} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary bg-white">
                        <option>Borewell</option>
                        <option>Well</option>
                        <option>River</option>
                        <option>Canal</option>
                        <option>Rain-fed</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Survey Number</label>
                      <input value={form.survey_number} onChange={update('survey_number')} placeholder="e.g. 12/2A" className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Khata Number</label>
                      <input value={form.khata} onChange={update('khata')} placeholder="e.g. 458" className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
                    </div>
                  </div>
                  <div className="flex justify-between pt-4">
                    <button type="button" onClick={() => setStep(3)} className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors flex items-center gap-2">
                      <FiArrowLeft /> Back
                    </button>
                    <button type="submit" disabled={loading} className="px-8 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-colors shadow-lg shadow-primary/25 disabled:opacity-50 flex items-center gap-2">
                      {loading ? <><FiLoader className="animate-spin" /> Registering...</> : 'Register Farm'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
