import { FiCheckCircle } from 'react-icons/fi'

export default function OCRPreviewCard({ data, title = 'Extracted Information' }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <div className="flex items-center gap-2 mb-4">
        <FiCheckCircle className="text-primary text-xl" />
        <h3 className="font-semibold text-gray-900">{title}</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {Object.entries(data).map(([key, value]) => (
          <div key={key} className="bg-gray-50 rounded-xl p-3">
            <p className="text-xs text-gray-500 uppercase tracking-wide">{key}</p>
            <p className="text-sm font-semibold text-gray-900 mt-1">{value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
