import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import DashboardHeader from '../components/DashboardHeader'
import UploadCard from '../components/UploadCard'
import OCRPreviewCard from '../components/OCRPreviewCard'
import MapPlaceholder from '../components/MapPlaceholder'
import { FiCheckCircle, FiArrowRight, FiArrowLeft } from 'react-icons/fi'

const mockExtractedData = {
  'Owner Name': 'Rajesh Kumar S',
  'Survey Number': '12/2A',
  'Khata Number': '458',
  'Village': 'Kaveripattinam',
  'Area': '2.5 Acres',
  'District': 'Krishnagiri',
  'State': 'Tamil Nadu',
}

export default function RegisterFarm() {
  const [step, setStep] = useState(1)

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
                <UploadCard title="Upload ROR 1B" subtitle="PDF, JPG, PNG (Max 10MB)" />
                <UploadCard title="Upload Village/FMB Sketch" subtitle="PDF, JPG, PNG (Max 10MB)" />
              </div>
              <div className="flex justify-end">
                <button onClick={() => setStep(2)} className="px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-colors flex items-center gap-2">
                  Next <FiArrowRight />
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Extracted Information */}
          {step === 2 && (
            <div className="max-w-3xl mx-auto space-y-6">
              <h2 className="text-xl font-bold text-gray-900 text-center">Extracted Information</h2>
              <p className="text-gray-500 text-center text-sm">Review the AI-extracted data from your documents</p>
              <OCRPreviewCard data={mockExtractedData} />
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
              <div className="text-center">
                <button className="px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-colors">
                  Confirm Farm Location
                </button>
              </div>
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
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Farm Name</label>
                      <input type="text" placeholder="e.g. Green Valley Farm" className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Crop</label>
                      <select className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary bg-white">
                        <option>Rice</option>
                        <option>Cotton</option>
                        <option>Tomato</option>
                        <option>Groundnut</option>
                        <option>Coconut</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Area (Acres)</label>
                      <input type="text" placeholder="e.g. 2.5" className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Soil Type</label>
                      <select className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary bg-white">
                        <option>Red Soil</option>
                        <option>Black Soil</option>
                        <option>Clay Soil</option>
                        <option>Sandy Soil</option>
                        <option>Alluvial Soil</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Village</label>
                      <input type="text" placeholder="e.g. Kaveripattinam" className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">District</label>
                      <input type="text" placeholder="e.g. Krishnagiri" className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                      <input type="text" placeholder="e.g. Tamil Nadu" className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Water Source</label>
                      <select className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary bg-white">
                        <option>Borewell</option>
                        <option>Well</option>
                        <option>River</option>
                        <option>Canal</option>
                        <option>Rain-fed</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Survey Number</label>
                      <input type="text" placeholder="e.g. 12/2A" className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Khata Number</label>
                      <input type="text" placeholder="e.g. 458" className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
                    </div>
                  </div>
                  <div className="flex justify-between pt-4">
                    <button type="button" onClick={() => setStep(3)} className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors flex items-center gap-2">
                      <FiArrowLeft /> Back
                    </button>
                    <button type="submit" className="px-8 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-colors shadow-lg shadow-primary/25">
                      Register Farm
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
