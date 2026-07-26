import { useState, useEffect, useRef, useCallback } from 'react'
import Sidebar from '../components/Sidebar'
import DashboardHeader from '../components/DashboardHeader'
import { FiMic, FiMicOff, FiPhone, FiPhoneOff, FiSettings, FiVolume2, FiVolumeX } from 'react-icons/fi'
import { GiPlantRoots } from 'react-icons/gi'
import { useLanguage } from '../i18n/useLanguage'
import { chat } from '../services/api'

const suggestedQuestions = [
  'How much water does my crop need today?',
  "What is today's weather?",
  'Why are my leaves turning yellow?',
  'Which crop should I grow this season?',
  "Show today's market prices.",
]

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

function useSpeechRecognition(onResult) {
  const recognitionRef = useRef(null)
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')

  const start = useCallback(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) return

    const recognition = new SpeechRecognition()
    recognition.continuous = false
    recognition.interimResults = true
    recognition.lang = 'en-IN'

    recognition.onresult = (event) => {
      let finalTranscript = ''
      let interimTranscript = ''
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript
        } else {
          interimTranscript += event.results[i][0].transcript
        }
      }
      setTranscript(interimTranscript || finalTranscript)
      if (finalTranscript) {
        onResult(finalTranscript)
      }
    }

    recognition.onend = () => {
      setIsListening(false)
    }

    recognition.onerror = () => {
      setIsListening(false)
    }

    recognitionRef.current = recognition
    recognition.start()
    setIsListening(true)
  }, [onResult])

  const stop = useCallback(() => {
    recognitionRef.current?.stop()
    setIsListening(false)
    setTranscript('')
  }, [])

  return { isListening, transcript, start, stop }
}

function useSpeechSynthesis() {
  const [isSpeaking, setIsSpeaking] = useState(false)

  const speak = useCallback((text, lang = 'en-IN') => {
    if (!window.speechSynthesis) return

    window.speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = lang
    utterance.rate = 1
    utterance.pitch = 1

    utterance.onstart = () => setIsSpeaking(true)
    utterance.onend = () => setIsSpeaking(false)
    utterance.onerror = () => setIsSpeaking(false)

    window.speechSynthesis.speak(utterance)
  }, [])

  const stop = useCallback(() => {
    window.speechSynthesis?.cancel()
    setIsSpeaking(false)
  }, [])

  return { isSpeaking, speak, stop }
}

const langMap = { en: 'en-IN', hi: 'hi-IN', te: 'te-IN', ta: 'ta-IN' }

export default function AIAssistant() {
  const { t, lang, changeLang, languages } = useLanguage()
  const [callActive, setCallActive] = useState(false)
  const [callState, setCallState] = useState('idle')
  const [subtitle, setSubtitle] = useState('')
  const [callDuration, setCallDuration] = useState(0)
  const [isSpeakerOn, setIsSpeakerOn] = useState(true)
  const [showSettings, setShowSettings] = useState(false)
  const [voiceTranscript, setVoiceTranscript] = useState('')
  const durationRef = useRef(null)
  const handleQuestionRef = useRef(null)
  const prevTranscriptRef = useRef('')

  const { isListening, transcript, start: startListening, stop: stopListening } = useSpeechRecognition((text) => {
    handleQuestionRef.current?.(text)
  })
  const { speak, stop: stopSpeaking } = useSpeechSynthesis()

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

  useEffect(() => {
    if (transcript && transcript !== prevTranscriptRef.current) {
      prevTranscriptRef.current = transcript
      setVoiceTranscript(transcript)
    }
  }, [transcript])

  const formatTime = (s) => {
    const m = Math.floor(s / 60)
    const sec = s % 60
    return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`
  }

  const startCall = () => {
    setCallActive(true)
    setCallDuration(0)
    setCallState('speaking')
    const greeting = "Hello! I'm VALI — your Virtual Agriculture & Land Intelligence assistant. I can help with weather, irrigation, crops, disease diagnosis, and farm management. How can I help you today?"
    setSubtitle(greeting)
    if (isSpeakerOn) {
      speak(greeting, langMap[lang] || 'en-IN')
    }
  }

  const endCall = () => {
    setCallActive(false)
    setCallDuration(0)
    setCallState('idle')
    setSubtitle(t('ai.callEnded'))
    stopListening()
    stopSpeaking()
  }

  const handleQuestion = (question) => {
    if (!callActive || callState === 'thinking') return

    setCallState('thinking')
    setSubtitle(`You asked: "${question}"`)
    stopListening()

    chat(question, lang).then((data) => {
      setCallState('speaking')
      setSubtitle(data.reply)
      if (isSpeakerOn) {
        speak(data.reply, langMap[lang] || 'en-IN')
      }
    }).catch(() => {
      setCallState('speaking')
      const fallback = "I'm having trouble connecting to the server. Please try again later."
      setSubtitle(fallback)
      if (isSpeakerOn) {
        speak(fallback, langMap[lang] || 'en-IN')
      }
    })
  }

  useEffect(() => {
    handleQuestionRef.current = handleQuestion
  })

  const toggleMic = () => {
    if (!callActive) return
    if (isListening) {
      stopListening()
      setCallState('speaking')
    } else {
      setCallState('listening')
      startListening()
    }
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
    if (isListening) return t('ai.listening')
    switch (callState) {
      case 'speaking': return t('ai.isSpeaking')
      case 'thinking': return t('ai.thinking')
      default: return callActive ? t('ai.connected') : t('ai.ready')
    }
  }

  const getStateLabelColor = () => {
    if (isListening) return 'text-blue-600'
    switch (callState) {
      case 'speaking': return 'text-green-600'
      case 'thinking': return 'text-amber-600'
      default: return 'text-gray-500'
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-900">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader title={t('ai.title')} />
        <main className="flex-1 flex flex-col items-center justify-center p-6 relative overflow-hidden">
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
              {callState === 'speaking' && (
                <>
                  <div className="absolute inset-0 rounded-full border-2 border-green-500/30 animate-ping" style={{ animationDuration: '2s' }} />
                  <div className="absolute -inset-4 rounded-full border border-green-500/20 animate-ping" style={{ animationDuration: '2.5s' }} />
                  <div className="absolute -inset-8 rounded-full border border-green-500/10 animate-ping" style={{ animationDuration: '3s' }} />
                </>
              )}

              {isListening && (
                <>
                  <div className="absolute inset-0 rounded-full bg-blue-500/20 animate-pulse" />
                  <div className="absolute -inset-4 rounded-full border border-blue-500/20 animate-ping" style={{ animationDuration: '1.5s' }} />
                </>
              )}

              {callState === 'thinking' && (
                <div className="absolute -inset-3 rounded-full border-2 border-amber-500 border-t-transparent animate-spin" />
              )}

              <div className={`w-40 h-40 md:w-52 md:h-52 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center transition-all duration-500 ${getAvatarClasses()} border-4 ${getRingColor()}`}>
                <GiPlantRoots className="text-white text-6xl md:text-7xl" />
              </div>

              {isListening && (
                <div className="absolute bottom-2 right-2 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center animate-bounce">
                  <FiMic className="text-white" />
                </div>
              )}
            </div>

            {/* VALI Name */}
            <h1 className="text-2xl font-bold text-white mb-1">VALI</h1>
            <p className="text-sm text-gray-400 mb-2">{t('ai.subtitle')}</p>
            <p className="text-xs text-gray-500 mb-6">{t('ai.poweredBy')}</p>

            {/* Voice Transcript (when listening) */}
            {isListening && voiceTranscript && (
              <div className="w-full bg-blue-900/30 backdrop-blur-sm rounded-2xl p-4 mb-4 border border-blue-500/30">
                <p className="text-xs text-blue-400 mb-1">🎤 Hearing:</p>
                <p className="text-sm text-blue-200">{voiceTranscript}</p>
              </div>
            )}

            {/* Subtitle Area */}
            <div className="w-full bg-gray-800/80 backdrop-blur-sm rounded-2xl p-5 mb-6 min-h-[80px] border border-gray-700/50">
              <p className="text-sm text-gray-200 leading-relaxed">
                {callActive ? (
                  <TypewriterText text={subtitle} speed={20} />
                ) : (
                  subtitle || t('ai.callEnded')
                )}
              </p>
            </div>

            {/* Call Controls */}
            <div className="flex items-center gap-4 mb-8">
              {/* Mic (voice input) */}
              <button
                onClick={toggleMic}
                disabled={!callActive}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                  isListening
                    ? 'bg-blue-500 text-white animate-pulse'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                } disabled:opacity-40 disabled:cursor-not-allowed`}
                title={isListening ? 'Stop listening' : 'Start voice input'}
              >
                {isListening ? <FiMicOff /> : <FiMic />}
              </button>

              {/* Start/End Call */}
              <button
                onClick={callActive ? endCall : startCall}
                className={`w-16 h-16 rounded-full flex items-center justify-center transition-all shadow-lg ${
                  callActive
                    ? 'bg-red-500 hover:bg-red-600 text-white'
                    : 'bg-green-500 hover:bg-green-600 text-white'
                }`}
              >
                {callActive ? <FiPhoneOff className="text-xl" /> : <FiPhone className="text-xl" />}
              </button>

              {/* Speaker (TTS toggle) */}
              <button
                onClick={() => {
                  setIsSpeakerOn(!isSpeakerOn)
                  if (isSpeakerOn) stopSpeaking()
                }}
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
              >
                <FiSettings />
              </button>
            </div>

            {/* Settings Panel */}
            {showSettings && (
              <div className="w-full bg-gray-800 rounded-2xl p-5 mb-6 border border-gray-700/50">
                <h3 className="text-sm font-medium text-gray-300 mb-3">{t('ai.settings')}</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">{t('ai.language')}</span>
                    <select
                      value={lang}
                      onChange={(e) => changeLang(e.target.value)}
                      className="bg-gray-700 text-white text-sm rounded-lg px-3 py-1.5 outline-none border border-gray-600"
                    >
                      {languages.map((l) => (
                        <option key={l.code} value={l.code}>{l.native} ({l.label})</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">{t('ai.voiceSpeed')}</span>
                    <span className="text-sm text-gray-300">Normal</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">{t('ai.autoTranslate')}</span>
                    <span className="text-sm text-green-400">On</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Voice Input</span>
                    <span className="text-xs text-gray-300">
                      {window.SpeechRecognition || window.webkitSpeechRecognition ? 'Supported' : 'Not supported in this browser'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Voice Output</span>
                    <span className="text-xs text-gray-300">
                      {window.speechSynthesis ? 'Supported' : 'Not supported in this browser'}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Questions */}
            {callActive && (
              <div className="w-full">
                <p className="text-xs text-gray-500 text-center mb-3">{t('ai.quickQuestions')}</p>
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
