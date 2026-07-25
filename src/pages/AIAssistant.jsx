import { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import DashboardHeader from '../components/DashboardHeader'
import { FiMic, FiSend, FiCpu } from 'react-icons/fi'
import { GiPlantRoots } from 'react-icons/gi'

const suggestedQuestions = [
  'How much water does my crop need today?',
  "What is today's weather?",
  'Why are my leaves turning yellow?',
  'Which crop should I grow this season?',
  "Show today's market prices.",
]

const mockConversation = [
  {
    role: 'assistant',
    text: "Hello! I'm VALI, your Virtual Agriculture & Land Intelligence assistant. I can help you with weather forecasts, irrigation planning, crop recommendations, market prices, disease diagnosis, and farm management. How can I help you today?",
  },
]

const aiResponses = {
  water: "Based on your farm profile (Rice, 2.5 Acres, Red Soil), your crop needs approximately 2,000 liters of water today. I recommend irrigating between 5:30 AM and 7:00 AM for optimal absorption. With today's humidity at 65%, you can reduce watering by about 10%.",
  weather: "Today in Kaveripattinam: 28°C, Partly Cloudy. Humidity: 65%, Wind: 12 km/h SW. Rain chance: 40%. There's a weather alert for heavy rainfall on Wednesday. I recommend completing any pending field work before then.",
  yellow: "Yellow leaves can indicate several issues: Nitrogen deficiency, overwatering, root rot, or early blight. Since your crop is Rice in Red Soil, I'd recommend checking soil moisture levels first. If the lower leaves are yellowing, it's likely nitrogen deficiency. Apply urea at 46 kg/hectare.",
  crop: "Based on current market trends, soil analysis, and upcoming weather conditions, I recommend: 1. Turmeric - High demand, ₹12,500/q 2. Cotton - Stable prices, ₹6,800/q 3. Tomato - Quick harvest cycle. Your Red Soil and Borewell setup are ideal for turmeric cultivation.",
  market: "Here are today's top prices near Kaveripattinam: 🌾 Rice: ₹2,850/q (Thanjavur) ↑3.2% 🍅 Tomato: ₹1,200/q (Erode) ↑5.8% 🌿 Turmeric: ₹12,500/q (Salem) ↑4.2% Best selling market today: Thanjavur Mandi for Rice.",
}

function getAIResponse(message) {
  const lower = message.toLowerCase()
  if (lower.includes('water') || lower.includes('irrigat')) return aiResponses.water
  if (lower.includes('weather') || lower.includes('temperature')) return aiResponses.weather
  if (lower.includes('yellow') || lower.includes('leaves')) return aiResponses.yellow
  if (lower.includes('crop') || lower.includes('grow') || lower.includes('season')) return aiResponses.crop
  if (lower.includes('market') || lower.includes('price')) return aiResponses.market
  return "I understand your question. Let me analyze your farm data and get back to you. In the meantime, you can check the Weather or Market Prices sections for real-time data."
}

export default function AIAssistant() {
  const [messages, setMessages] = useState(mockConversation)
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    const container = document.getElementById('chat-container')
    if (container) container.scrollTop = container.scrollHeight
  }, [messages, isTyping])

  const sendMessage = (text) => {
    const msg = text || input
    if (!msg.trim()) return

    setMessages((prev) => [...prev, { role: 'user', text: msg }])
    setInput('')
    setIsTyping(true)

    setTimeout(() => {
      setMessages((prev) => [...prev, { role: 'assistant', text: getAIResponse(msg) }])
      setIsTyping(false)
    }, 1500)
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader title="VALI AI Assistant" />
        <main className="flex-1 p-6 flex flex-col">
          <div className="max-w-3xl mx-auto w-full flex-1 flex flex-col">
            {/* VALI Header */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-emerald-400 rounded-full flex items-center justify-center shrink-0">
                  <GiPlantRoots className="text-white text-3xl" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">VALI</h2>
                  <p className="text-sm text-gray-500">Virtual Agriculture & Land Intelligence</p>
                  <p className="text-xs text-green-500 flex items-center gap-1 mt-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" /> Online
                  </p>
                </div>
              </div>
            </div>

            {/* Chat Window */}
            <div id="chat-container" className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 overflow-y-auto mb-4 max-h-[50vh]">
              <div className="space-y-4">
                {messages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`flex items-start gap-2 max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                      {msg.role === 'assistant' && (
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                          <FiCpu className="text-primary text-sm" />
                        </div>
                      )}
                      <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                        msg.role === 'user'
                          ? 'bg-primary text-white rounded-br-md'
                          : 'bg-gray-100 text-gray-700 rounded-bl-md'
                      }`}>
                        {msg.text}
                      </div>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex items-start gap-2">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                      <FiCpu className="text-primary text-sm" />
                    </div>
                    <div className="px-4 py-3 rounded-2xl bg-gray-100 rounded-bl-md">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Suggested Questions */}
            <div className="flex flex-wrap gap-2 mb-4">
              {suggestedQuestions.map((q, i) => (
                <button
                  key={i}
                  onClick={() => sendMessage(q)}
                  className="px-4 py-2 bg-white border border-gray-200 rounded-full text-xs text-gray-600 hover:border-primary hover:text-primary transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-3 flex items-center gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Ask VALI anything..."
                className="flex-1 px-4 py-3 bg-gray-50 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/30"
              />
              <button className="p-3 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-colors">
                <FiMic />
              </button>
              <button
                onClick={() => sendMessage()}
                className="p-3 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors"
              >
                <FiSend />
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
