import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import DashboardHeader from '../components/DashboardHeader'
import UploadCard from '../components/UploadCard'
import MapPlaceholder from '../components/MapPlaceholder'
import { FiCheckCircle, FiLoader, FiFileText, FiImage, FiMapPin, FiInfo } from 'react-icons/fi'
import { registerFarm } from '../services/api'
import { uploadDocumentForOCR, detectLocation, extractFormFromOCR } from '../services/ocr'
import { geocodeLocation } from '../services/geocode'

export default function RegisterFarm() {
  const [rorFile, setRorFile] = useState(null)
  const [fmbFile, setFmbFile] = useState(null)
  const [ocrLoading, setOcrLoading] = useState(false)
  const [ocrStatus, setOcrStatus] = useState('')
  const [geoLoading, setGeoLoading] = useState(false)
  const [extractedData, setExtractedData] = useState(null)
  const [mapCoords, setMapCoords] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [registered, setRegistered] = useState(false)
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: '', crop: '', area: '', soil_type: '',
    village: '', district: '', state: '', water_source: '',
    survey_number: '', khata: '',
  })

  const update = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }))

  const autoLocate = async (village, district, state) => {
    if (!village && !district) return
    setGeoLoading(true)
    try {
      const result = await geocodeLocation(village, district, state)
      if (result) {
        setMapCoords([result.lat, result.lng])
      }
    } catch {
      // silent
    } finally {
      setGeoLoading(false)
    }
  }

  const handleRORUpload = async (file) => {
    setRorFile(file)
    setOcrLoading(true)
    setOcrStatus('Uploading to server for OCR...')
    setExtractedData(null)

    try {
      const ocrResult = await uploadDocumentForOCR(file)
      const fields = ocrResult.fields || {}
      const rawText = ocrResult.raw_text || ''

      if (!rawText && Object.keys(fields).length === 0) {
        setOcrStatus('No text found. Please ensure the image is clear and readable.')
        setExtractedData({ 'File': file.name, 'Status': 'No text detected' })
        return
      }

      const displayData = {}
      const orderedKeys = [
        ['Owner Name', fields.owner_name],
        ['Application No', fields.application_no],
        ['Date', fields.date],
        ['Survey Number', fields.survey_number],
        ['Khata Number', fields.khata],
        ['Village', fields.village],
        ['District', fields.district],
        ['State', fields.state],
        ['Area', fields.area],
        ['Soil Type', fields.soil_type],
        ['Water Source', fields.water_source],
      ]
      for (const [label, val] of orderedKeys) {
        if (val) displayData[label] = val
      }
      if (Object.keys(displayData).length === 0) {
        displayData['Status'] = 'Fields not detected'
      }
      setExtractedData(displayData)

      const autoFill = extractFormFromOCR(fields)
      setForm((prev) => ({ ...prev, ...autoFill }))

      const filledFields = Object.keys(autoFill).length
      setOcrStatus(`Extracted ${filledFields} fields from document!`)

      const village = autoFill.village || ''
      const district = autoFill.district || ''
      const state = autoFill.state || ''
      if (village || district) {
        setOcrStatus('Document extracted. Locating farm on map...')
        await autoLocate(village, district, state)
        setOcrStatus('Document read and farm located on map!')
      } else {
        setOcrStatus('Document read successfully. Enter location manually to locate on map.')
      }
    } catch (err) {
      setOcrStatus('OCR failed. Please re-upload a clearer image.')
      setExtractedData({ 'File': file.name, 'Status': 'OCR failed: ' + (err.message || 'unknown') })
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
      setRegistered(true)
    } catch (err) {
      setError(err.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  if (registered) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <DashboardHeader title="Smart Land Registration" />
          <main className="flex-1 flex items-center justify-center p-6">
            <div className="max-w-md text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiCheckCircle className="text-4xl text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Farm Registered!</h2>
              <p className="text-gray-500 text-sm mb-6">Your farm has been successfully registered with AgriVISM.</p>
              <button
                onClick={() => navigate('/farm-profile')}
                className="px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-colors"
              >
                View Farm Profile
              </button>
            </div>
          </main>
        </div>
      </div>
    )
  }

  const anyLoading = ocrLoading || geoLoading

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader title="Smart Land Registration" />
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="text-center">
              <h2 className="text-xl font-bold text-gray-900">Land Registration</h2>
              <p className="text-gray-500 text-sm mt-1">Upload your ROR 1B — everything will be extracted and auto-filled</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Upload Documents</h3>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <UploadCard title="Upload ROR 1B" subtitle="PDF, JPG, PNG (Max 10MB)" onUpload={handleRORUpload} />
                  {rorFile && (
                    <div className="mt-2 flex items-center gap-2 p-2 bg-green-50 rounded-xl">
                      <FiFileText className="text-green-600 shrink-0" />
                      <span className="text-sm text-green-700 truncate">{rorFile.name}</span>
                    </div>
                  )}
                </div>
                <div>
                  <UploadCard title="Upload Village/FMB Sketch" subtitle="PDF, JPG, PNG (Max 10MB)" onUpload={handleFMBUpload} />
                  {fmbFile && (
                    <div className="mt-2 flex items-center gap-2 p-2 bg-green-50 rounded-xl">
                      <FiImage className="text-green-600 shrink-0" />
                      <span className="text-sm text-green-700 truncate">{fmbFile.name}</span>
                    </div>
                  )}
                </div>
              </div>

              {ocrLoading && (
                <div className="mt-4 flex items-center gap-3 p-4 bg-blue-50 rounded-xl">
                  <FiLoader className="text-primary animate-spin text-xl shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Processing document...</p>
                    <p className="text-xs text-gray-500">{ocrStatus}</p>
                  </div>
                </div>
              )}

              {!ocrLoading && geoLoading && (
                <div className="mt-4 flex items-center gap-3 p-4 bg-green-50 rounded-xl">
                  <FiMapPin className="text-green-600 animate-pulse text-xl shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Locating farm on satellite map...</p>
                    <p className="text-xs text-gray-500">Finding coordinates for {form.village || form.district}</p>
                  </div>
                </div>
              )}

              {!anyLoading && ocrStatus && extractedData && (
                <div className="mt-4 flex items-center gap-3 p-4 bg-green-50 rounded-xl">
                  <FiCheckCircle className="text-green-600 text-xl shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{ocrStatus}</p>
                  </div>
                </div>
              )}

              {!rorFile && !ocrLoading && (
                <div className="mt-4 flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                  <FiInfo className="text-gray-400 text-xl shrink-0" />
                  <p className="text-sm text-gray-500">Upload your ROR 1B document — we'll auto-extract all details and locate your farm on the map.</p>
                </div>
              )}
            </div>

            {extractedData && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Extracted Details (auto-filled from ROR 1B)</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {Object.entries(extractedData).map(([key, value]) => (
                    <div key={key} className="bg-gray-50 rounded-xl p-3">
                      <p className="text-xs text-gray-500 uppercase tracking-wide">{key}</p>
                      <p className="text-sm font-semibold text-gray-900 mt-1">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {(mapCoords || rorFile) && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center gap-2 mb-3">
                  <FiMapPin className="text-primary" />
                  <h3 className="font-semibold text-gray-900">Farm Location</h3>
                  {geoLoading && <FiLoader className="animate-spin text-primary" />}
                  {mapCoords && !geoLoading && <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Auto-located</span>}
                </div>
                {mapCoords ? (
                  <MapPlaceholder height="h-80" autoLocate={mapCoords} onLocationSelect={(pos) => setMapCoords([pos.lat, pos.lng])} />
                ) : (
                  <div className="h-80 rounded-2xl bg-gray-100 flex items-center justify-center">
                    <p className="text-gray-400 text-sm">Upload ROR 1B to auto-locate farm</p>
                  </div>
                )}
              </div>
            )}

            {rorFile && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Farm Details</h3>

                {error && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">{error}</div>
                )}

                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Farm Name *</label>
                      <input value={form.name} onChange={update('name')} placeholder="e.g. Green Valley Farm" required className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Crop *</label>
                      <select value={form.crop} onChange={update('crop')} required className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary bg-white">
                        <option value="">Select crop</option>
                        <option>Rice</option>
                        <option>Cotton</option>
                        <option>Tomato</option>
                        <option>Groundnut</option>
                        <option>Coconut</option>
                        <option>Turmeric</option>
                        <option>Maize</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Area (Acres) *</label>
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

                  <div className="flex justify-end pt-2">
                    <button type="submit" disabled={loading || anyLoading} className="px-8 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-colors shadow-lg shadow-primary/25 disabled:opacity-50 flex items-center gap-2">
                      {loading ? <><FiLoader className="animate-spin" /> Registering...</> : 'Register Farm'}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
