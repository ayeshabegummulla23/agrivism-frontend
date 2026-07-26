import { useRef } from 'react'
import { FiUploadCloud } from 'react-icons/fi'

export default function UploadCard({ title, subtitle, onUpload }) {
  const inputRef = useRef(null)

  const handleClick = (e) => {
    e.stopPropagation()
    inputRef.current?.click()
  }

  const handleChange = (e) => {
    const file = e.target.files?.[0]
    if (file && onUpload) {
      onUpload(file)
    }
  }

  return (
    <div
      className="bg-white rounded-2xl border-2 border-dashed border-gray-300 hover:border-primary p-8 text-center transition-colors cursor-pointer group"
      onClick={handleClick}
    >
      <FiUploadCloud className="text-4xl text-gray-400 group-hover:text-primary mx-auto mb-3 transition-colors" />
      <p className="font-semibold text-gray-700">{title}</p>
      <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
      <button
        type="button"
        className="mt-4 px-6 py-2 bg-primary text-white text-sm font-medium rounded-xl hover:bg-primary-dark transition-colors"
        onClick={handleClick}
      >
        Choose File
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*,.pdf"
        className="hidden"
        onChange={handleChange}
      />
    </div>
  )
}
