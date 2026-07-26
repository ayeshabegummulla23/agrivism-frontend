import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import DashboardHeader from '../components/DashboardHeader'
import UploadCard from '../components/UploadCard'
import OCRPreviewCard from '../components/OCRPreviewCard'
import MapPlaceholder from '../components/MapPlaceholder'
import { FiCheckCircle, FiArrowRight, FiArrowLeft, FiLoader, FiFileText, FiImage, FiMapPin } from 'react-icons/fi'
import { registerFarm } from '../services/api'
import { extractTextFromImage, parseRORData, extractFormFromOCR } from '../services/ocr'
import { geocodeLocation } from '../services/geocode'

export default function RegisterFarm() {
  const [step, setStep] = useState(1)
  const [extractedData, setExtractedData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [ocrLoading, setOcrLoading] = useState(false)
  const [geoLoading, setGeoLoading] = useState(false)
  const [error, setError] = useState('')
  const [rorFile, setRorFile] = useState(null)
  const [fmbFile, setFmbFile] = useState(null)
  const [mapCoords, setMapCoords] = useState(null)
  const [geoAddress, setGeoAddress] = useState('')
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: '', crop: '', area: '', soil_type: '',
    village: '', district: '', state: '', water_source: '',
    survey_number: '', khata: '',
  })

  const update = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }))

  const autoLocateMap = async (village, district, state) => {
    if (!village && !district) return
    setGeoLoading(true)
    try {
      const result = await geocodeLocation(village, district, state)
      if (result) {
        setMapCoords([result.lat, result.lng])
        setGeoAddress(result.displayName)
      }
    } catch {
      // geocoding failed silently
    } finally {
      setGeoLoading(false)
    }
  }

  const handleRORUpload = async (file) => {
    setRorFile(file)
    setOcrLoading(true)
    setExtractedData(null)
    try {
      const text = await extractTextFromImage(file)
      const parsed = parseRORData(text)
      setExtractedData(parsed)
      const autoFill = extractFormFromOCR(parsed)
      setForm((prev) => ({ ...prev, ...autoFill }))

      const village = autoFill.village || ''
      const district = autoFill.district || ''
      const state = autoFill.state || ''
      if (village || district) {
        autoLocateMap(village, district, state)
      }
    } catch {
      setExtractedData({
        'File Name': file.name,
        'Status': 'OCR failed — please fill manually',
      })
    } finally {
      setOcrLoading(false)
    }
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
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                    step >= s ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {step > s ? <FiCheckCircle /> : s}
                </div>
                {s < 3 && (
                  <div className={`w-16 sm:w-24 h-1 ${step > s ? 'bg-primary' : 'bg-gray-200'}`} />
                )}
              </div>
            ))}
          </div>

          {/* Step 1: Upload Documents */}
          {step === 1 && (
            <div className="max-w-3xl mx-auto space-y-6">
              <h2 className="text-xl font-bold text-gray-900 text-center">Upload Documents</h2>
              <p className="text-gray-500 text-center text-sm">Upload your ROR 1B and Village/FMB Sketch — AI will extract details and locate your farm automatically</p>
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

              {ocrLoading && (
                <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl">
                  <FiLoader className="text-primary animate-spin text-xl" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Extracting text from ROR 1B...</p>
                    <p className="text-xs text-gray-500">OCR is processing your document</p>
                  </div>
                </div>
              )}

              {geoLoading && (
                <div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl">
                  <FiMapPin className="text-green-600 animate-pulse text-xl" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Locating your farm on satellite map...</p>
                    <p className="text-xs text-gray-500">Finding coordinates for {form.village || form.district || 'your location'}</p>
                  </div>
                </div>
              )}

              {!ocrLoading && !geoLoading && extractedData && mapCoords && (
                <div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl">
                  <FiCheckCircle className="text-green-600 text-xl" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Document extracted & farm located!</p>
                    <p className="text-xs text-gray-500">Review details in the next step</p>
                  </div>
                </div>
              )}

              <div className="flex justify-end">
                <button onClick={() => setStep(2)} className="px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-colors flex items-center gap-2">
                  Next <FiArrowRight />
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Review + Map */}
          {step === 2 && (
            <div className="max-w-4xl mx-auto space-y-6">
              <h2 className="text-xl font-bold text-gray-900 text-center">Review & Confirm</h2>
              <p className="text-gray-500 text-center text-sm">
                {extractedData ? 'Review extracted data and farm location' : 'Fill in details manually'}
              </p>

              {extractedData && <OCRPreviewCard data={extractedData} />}

              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <p className="text-sm text-gray-500 mb-4">
                  {extractedData ? 'Edit extracted fields or fill in missing details:' : 'Fill in details manually:'}
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Survey Number</label>
                    <input value={form.survey_number} onChange={update('survey_number')} placeholder="e.g. 12/2A" className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Khata Number</label>
                    <input value={form.khata} onChange={update('khata')} placeholder="e.g. 458" className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Village</label>
                    <input value={form.village} onChange={(e) => { update('village')(e); autoLocateMap(e.target.value, form.district, form.state) }} placeholder="e.g. Kaveripattinam" className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">District</label>
                    <input value={form.district} onChange={(e) => { update('district')(e); autoLocateMap(form.village, e.target.value, form.state) }} placeholder="e.g. Krishnagiri" className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                    <input value={form.state} onChange={(e) => { update('state')(e); autoLocateMap(form.village, form.district, e.target.value) }} placeholder="e.g. Tamil Nadu" className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Area</label>
                    <input value={form.area} onChange={update('area')} placeholder="e.g. 2.5 Acres" className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
                  </div>
                </div>
              </div>

              {/* Auto-located Map */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <div className="flex items-center gap-2 mb-3">
                  <FiMapPin className="text-primary" />
                  <h3 className="font-semibold text-gray-900">Farm Location</h3>
                  {geoLoading && <FiLoader className="animate-spin text-primary" />}
                  {mapCoords && !geoLoading && <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Auto-located</span>}
                </div>
                <p className="text-sm text-gray-500 mb-3">
                  {mapCoords
                    ? 'Farm automatically located from your document details. Click map to adjust if needed.'
                    : 'Upload ROR 1B to auto-locate your farm, or enter village/district above.'}
                </p>
                <MapPlaceholder height="h-80" onLocationSelect={(pos) => setMapCoords([pos.lat, pos.lng])} autoLocate={mapCoords} />
              </div>

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

          {/* Step 3: Farm Details + Register */}
          {step === 3 && (
            <div className="max-w-3xl mx-auto space-y-6">
              <h2 className="text-xl font-bold text-gray-900 text-center">Farm Details</h2>
              <p className="text-gray-500 text-center text-sm">Complete your farm registration</p>

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
                      <select value={form.crop} onChange={update('crop')} required className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary bg-white">
                        <option value="">Select crop</option>
                        <option>Rice</option>
                        <option>Cotton</option>
                        <option>Tomato</option>
                        <option>Groundnut</option>
                        <option>Coconut</option>
                        <option>Turmeric</option>
                        <option>Maize</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Area (Acres)</label>
                      <input value={form.area} onChange={update('area')} placeholder="e.g. 2.5" required className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Soil Type</label>
                      <select value={form.soil_type} onChange={update('soil_type')} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary bg-white">
                        <option value="">Select soil type</option>
                        <option>Red Soil</option>
                        <option>Black Soil</option>
                        <option>Clay Soil</option>
                        <option>Sandy Soil</option>
                        <option>Alluvial Soil</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Water Source</label>
                      <select value={form.water_source} onChange={update('water_source')} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary bg-white">
                        <option value="">Select water source</option>
                        <option>Borewell</option>
                        <option>Well</option>
                        <option>River</option>
                        <option>Canal</option>
                        <option>Rain-fed</option>
                      </select>
                    </div>
                  </div>

                  {mapCoords && (
                    <div className="bg-green-50 rounded-xl p-3 flex items-center gap-2">
                      <FiMapPin className="text-green-600" />
                      <span className="text-sm text-green-700">
                        Farm located at {mapCoords[0].toFixed(4)}, {mapCoords[1].toFixed(4)}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between pt-4">
                    <button type="button" onClick={() => setStep(2)} className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors flex items-center gap-2">
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
