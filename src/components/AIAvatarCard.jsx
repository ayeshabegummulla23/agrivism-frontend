import { FiMic, FiSend } from 'react-icons/fi'
import { GiPlantRoots } from 'react-icons/gi'

export default function AIAvatarCard() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 bg-gradient-to-br from-primary to-emerald-400 rounded-full flex items-center justify-center">
          <GiPlantRoots className="text-white text-xl" />
        </div>
        <div>
          <p className="font-semibold text-gray-900">VALI Assistant</p>
          <p className="text-xs text-green-500 flex items-center gap-1">
            <span className="w-2 h-2 bg-green-500 rounded-full" /> Online
          </p>
        </div>
      </div>
      <div className="bg-primary/5 rounded-xl p-4 mb-4">
        <p className="text-sm text-gray-700">
          Hello! I'm VALI. How can I help you today? Ask me about weather, irrigation, crops, or market prices.
        </p>
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Ask VALI anything..."
          className="flex-1 px-4 py-2 bg-gray-100 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/30"
          readOnly
        />
        <button className="p-2 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors">
          <FiSend />
        </button>
        <button className="p-2 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-colors">
          <FiMic />
        </button>
      </div>
    </div>
  )
}
