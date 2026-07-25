import { useState, useEffect, useRef } from 'react'
import Sidebar from '../components/Sidebar'
import DashboardHeader from '../components/DashboardHeader'
import { FiMic, FiMicOff, FiPhone, FiPhoneOff, FiSettings, FiVolume2, FiVolumeX } from 'react-icons/fi'
import { GiPlantRoots } from 'react-icons/gi'

const suggestedQuestions = [
  'How much water does my crop need today?',
  "What is today's weather?",
  'Why are my leaves turning yellow?',
  'Which crop should I grow this season?',
  "Show today's market prices.",
]

const aiResponses = {
  water: "Based on your farm profile — Rice, 2.5 Acres, Red Soil — your crop needs approximately 2,000 liters of water today. I recommend irrigating between 5:30 AM and 7:00 AM for optimal absorption. With today's humidity at 65%, you can reduce watering by about 10%.",
  weather: "Today in Kaveripattinam: 28°C, Partly Cloudy. Humidity: 65%, Wind: 12 km/h SW. Rain chance: 40%. There's a weather alert for heavy rainfall on Wednesday. I recommend completing any pending field work before then.",
  yellow: "Yellow leaves can indicate several issues: Nitrogen deficiency, overwatering, root rot, or early blight. Since your crop is Rice in Red Soil, I'd recommend checking soil moisture levels first. If the lower leaves are yellowing, it's likely nitrogen deficiency. Apply urea at 46 kg per hectare.",
  crop: "Based on current market trends, soil analysis, and upcoming weather, I recommend: 1. Turmeric — High demand, ₹12,500 per quintal. 2. Cotton — Stable prices, ₹6,800 per quintal. 3. Tomato — Quick harvest cycle. Your Red Soil and Borewell setup are ideal for turmeric cultivation.",
  market: "Here are today's top prices near Kaveripattinam: Rice ₹2,850 per quintal at Thanjavur, up 3.2%. Tomato ₹1,200 per quintal at Erode, up 5.8%. Turmeric ₹12,500 per quintal at Salem, up 4.2%. Best selling market today: Thanjavur Mandi for Rice.",
}

function getAIResponse(message) {
  const lower = message.toLowerCase()
  if (lower.includes('water') || lower.includes('irrigat')) return aiResponses.water
  if (lower.includes('weather') || lower.includes('temperature')) return aiResponses.weather
  if (lower.includes('yellow') || lower.includes('leaves')) return aiResponses.yellow
  if (lower.includes('crop') || lower.includes('grow') || lower.includes('season')) return aiResponses.crop
  if (lower.includes('market') || lower.includes('price')) return aiResponses.market
  return "I understand your question. Let me analyze your farm data. In the meantime, check the Weather or Market Prices sections for real-time data. I'll have a detailed response ready shortly."
}

function TypewriterTextInner({ text, speed = 25, onComplete }) {
  const [displayed, setDisplayed] = useState('')

  useEffect(() => {
    let index = 0
    if (!text) return

    const interval = setInterval(() => {
      index += 1
      if (index <= text.length) {
        setDisplayed(text.slice(0, index))
      } else {
        clearInterval(interval)
        onComplete?.()
      }
    }, speed)

    return () => clearInterval(interval)
  }, [text, speed, onComplete])

  return <span>{displayed}<span className="animate-pulse">|</span></span>
}

function TypewriterText({ text, ...props }) {
  return <TypewriterTextInner key={text} text={text} {...props} />
}

export default function AIAssistant() {
  const [callActive, setCallActive] = useState(false)
  const [callState, setCallState] = useState('idle') // idle, listening, speaking, thinking
  const [subtitle, setSubtitle] = useState('Press the call button to start a conversation with VALI.')
  const [callDuration, setCallDuration] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const [isSpeakerOn, setIsSpeakerOn] = useState(true)
  const [showSettings, setShowSettings] = useState(false)
  const [language, setLanguage] = useState('English')
  const durationRef = useRef(null)

  useEffect(() => {
    if (callActive) {
      durationRef.current = setInterval(() => {
        setCallDuration((prev) => prev + 1)
      }, 1000)
    } else {
      clearInterval(durationRef.current)
    }
    return () => clearInterval(durationRef.current)
  }, [callActive])

  const formatTime = (s) => {
    const m = Math.floor(s / 60)
    const sec = s % 60
    return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`
  }

  const startCall = () => {
    setCallActive(true)
    setCallDuration(0)
    setCallState('speaking')
    setSubtitle("Hello! I'm VALI — your Virtual Agriculture & Land Intelligence assistant. I can help with weather, irrigation, crops, disease diagnosis, and farm management. How can I help you today?")
  }

  const endCall = () => {
    setCallActive(false)
    setCallDuration(0)
    setCallState('idle')
    setSubtitle('Call ended. Press the call button to start a new conversation.')
  }

  const handleQuestion = (question) => {
    if (!callActive || callState === 'thinking') return

    setCallState('thinking')
    setSubtitle(`You asked: "${question}"`)

    setTimeout(() => {
      setCallState('speaking')
      setSubtitle(getAIResponse(question))
    }, 1500)
  }

  const getAvatarClasses = () => {
    switch (callState) {
      case 'speaking':
        return 'shadow-[0_0_60px_rgba(22,163,74,0.4)]'
      case 'listening':
        return 'shadow-[0_0_60px_rgba(59,130,246,0.4)]'
      case 'thinking':
        return 'shadow-[0_0_60px_rgba(245,158,11,0.4)]'
      default:
        return 'shadow-[0_0_30px_rgba(0,0,0,0.1)]'
    }
  }

  const getRingColor = () => {
    switch (callState) {
      case 'speaking': return 'border-green-500'
      case 'listening': return 'border-blue-500'
      case 'thinking': return 'border-amber-500'
      default: return 'border-gray-300'
    }
  }

  const getStateLabel = () => {
    switch (callState) {
      case 'speaking': return 'VALI is speaking...'
      case 'listening': return 'Listening to you...'
      case 'thinking': return 'Thinking...'
      default: return callActive ? 'Connected' : 'Ready'
    }
  }

  const getStateLabelColor = () => {
    switch (callState) {
      case 'speaking': return 'text-green-600'
      case 'listening': return 'text-blue-600'
      case 'thinking': return 'text-amber-600'
      default: return 'text-gray-500'
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-900">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader title="VALI Video Call" />
        <main className="flex-1 flex flex-col items-center justify-center p-6 relative overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900" />

          <div className="relative z-10 flex flex-col items-center w-full max-w-2xl">
            {/* Call Status */}
            <div className="mb-6 text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                {callActive && (
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                )}
                <span className={`text-sm font-medium ${getStateLabelColor()}`}>
                  {getStateLabel()}
                </span>
              </div>
              {callActive && (
                <span className="text-xs text-gray-400">{formatTime(callDuration)}</span>
              )}
            </div>

            {/* Avatar */}
            <div className="relative mb-8">
              {/* Speaking rings */}
              {callState === 'speaking' && (
                <>
                  <div className="absolute inset-0 rounded-full border-2 border-green-500/30 animate-ping" style={{ animationDuration: '2s' }} />
                  <div className="absolute -inset-4 rounded-full border border-green-500/20 animate-ping" style={{ animationDuration: '2.5s' }} />
                  <div className="absolute -inset-8 rounded-full border border-green-500/10 animate-ping" style={{ animationDuration: '3s' }} />
                </>
              )}

              {/* Listening glow */}
              {callState === 'listening' && (
                <div className="absolute inset-0 rounded-full bg-blue-500/20 animate-pulse" />
              )}

              {/* Thinking spin */}
              {callState === 'thinking' && (
                <div className="absolute -inset-3 rounded-full border-2 border-amber-500 border-t-transparent animate-spin" />
              )}

              {/* Main avatar */}
              <div className={`w-40 h-40 md:w-52 md:h-52 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center transition-all duration-500 ${getAvatarClasses()} border-4 ${getRingColor()}`}>
                <GiPlantRoots className="text-white text-6xl md:text-7xl" />
              </div>

              {/* Mic indicator */}
              {callState === 'listening' && (
                <div className="absolute bottom-2 right-2 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center animate-bounce">
                  <FiMic className="text-white" />
                </div>
              )}
            </div>

            {/* VALI Name */}
            <h1 className="text-2xl font-bold text-white mb-1">VALI</h1>
            <p className="text-sm text-gray-400 mb-2">Virtual Agriculture & Land Intelligence</p>
            <p className="text-xs text-gray-500 mb-6">Powered by AgriVISM</p>

            {/* Subtitle Area */}
            <div className="w-full bg-gray-800/80 backdrop-blur-sm rounded-2xl p-5 mb-6 min-h-[80px] border border-gray-700/50">
              <p className="text-sm text-gray-200 leading-relaxed">
                {callActive ? (
                  <TypewriterText text={subtitle} speed={20} />
                ) : (
                  subtitle
                )}
              </p>
            </div>

            {/* Call Controls */}
            <div className="flex items-center gap-4 mb-8">
              {/* Mute */}
              <button
                onClick={() => setIsMuted(!isMuted)}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                  isMuted ? 'bg-red-500/20 text-red-400' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <FiMicOff /> : <FiMic />}
              </button>

              {/* Start/End Call */}
              <button
                onClick={callActive ? endCall : startCall}
                className={`w-16 h-16 rounded-full flex items-center justify-center transition-all shadow-lg ${
                  callActive
                    ? 'bg-red-500 hover:bg-red-600 text-white'
                    : 'bg-green-500 hover:bg-green-600 text-white'
                }`}
                title={callActive ? 'End Call' : 'Start Call'}
              >
                {callActive ? <FiPhoneOff className="text-xl" /> : <FiPhone className="text-xl" />}
              </button>

              {/* Speaker */}
              <button
                onClick={() => setIsSpeakerOn(!isSpeakerOn)}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                  !isSpeakerOn ? 'bg-red-500/20 text-red-400' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
                title={isSpeakerOn ? 'Speaker Off' : 'Speaker On'}
              >
                {isSpeakerOn ? <FiVolume2 /> : <FiVolumeX />}
              </button>

              {/* Settings */}
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="w-12 h-12 rounded-full bg-gray-700 text-gray-300 hover:bg-gray-600 flex items-center justify-center transition-all"
                title="Settings"
              >
                <FiSettings />
              </button>
            </div>

            {/* Settings Panel */}
            {showSettings && (
              <div className="w-full bg-gray-800 rounded-2xl p-5 mb-6 border border-gray-700/50">
                <h3 className="text-sm font-medium text-gray-300 mb-3">Call Settings</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Language</span>
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="bg-gray-700 text-white text-sm rounded-lg px-3 py-1.5 outline-none border border-gray-600"
                    >
                      <option>English</option>
                      <option>Hindi</option>
                      <option>Telugu</option>
                      <option>Tamil</option>
                      <option>Kannada</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Voice Speed</span>
                    <span className="text-sm text-gray-300">Normal</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Auto-translate</span>
                    <span className="text-sm text-green-400">On</span>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Questions */}
            {callActive && (
              <div className="w-full">
                <p className="text-xs text-gray-500 text-center mb-3">Quick Questions</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {suggestedQuestions.map((q, i) => (
                    <button
                      key={i}
                      onClick={() => handleQuestion(q)}
                      disabled={callState === 'thinking'}
                      className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-full text-xs text-gray-300 hover:border-green-500 hover:text-green-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
