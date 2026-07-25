import { useNavigate } from 'react-router-dom'
import { FiPhone } from 'react-icons/fi'
import { GiPlantRoots } from 'react-icons/gi'

export default function AIAvatarCard() {
  const navigate = useNavigate()

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 shadow-sm border border-gray-700 text-white">
      <div className="flex items-center gap-4 mb-4">
        <div className="relative">
          <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(22,163,74,0.3)]">
            <GiPlantRoots className="text-white text-2xl" />
          </div>
          <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-gray-800" />
        </div>
        <div>
          <p className="font-semibold">VALI Video Call</p>
          <p className="text-xs text-gray-400">Talk face-to-face with AI</p>
          <p className="text-xs text-green-400 flex items-center gap-1 mt-0.5">
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full" /> Online
          </p>
        </div>
      </div>
      <button
        onClick={() => navigate('/ai-assistant')}
        className="w-full flex items-center justify-center gap-2 py-2.5 bg-green-600 hover:bg-green-500 rounded-xl text-sm font-medium transition-colors"
      >
        <FiPhone />
        Start Call
      </button>
    </div>
  )
}
