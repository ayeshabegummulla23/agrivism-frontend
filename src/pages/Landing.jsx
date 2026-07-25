import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'
import { GiPlantRoots } from 'react-icons/gi'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import FeatureCard from '../components/FeatureCard'
import Footer from '../components/Footer'

import {
  FiMap, FiFileText, FiNavigation2, FiCloud, FiDroplet,
  FiTrendingUp, FiTarget, FiTool, FiCamera, FiMessageSquare,
  FiGlobe, FiBarChart2, FiCheckCircle, FiUploadCloud,
  FiMapPin, FiSettings
} from 'react-icons/fi'

const features = [
  { icon: <FiMap />, title: 'Smart Land Registration', description: 'Register your farm land digitally with ROR 1B verification and AI-powered OCR extraction.' },
  { icon: <FiFileText />, title: 'ROR 1B Upload', description: 'Upload your ROR 1B document for automatic information extraction and verification.' },
  { icon: <FiNavigation2 />, title: 'Farm Map & Boundary', description: 'Visualize your farm boundaries on interactive maps with GPS-accurate plotting.' },
  { icon: <FiCloud />, title: 'Weather Forecast', description: 'Get hyper-local weather forecasts, alerts, and climate insights for your farm.' },
  { icon: <FiDroplet />, title: 'Smart Water Management', description: 'AI-optimized irrigation scheduling and water usage tracking for maximum efficiency.' },
  { icon: <FiTrendingUp />, title: 'Market Prices', description: 'Real-time mandi prices, trends, and best-selling market recommendations.' },
  { icon: <FiTarget />, title: 'Crop Recommendation', description: 'AI-powered crop suggestions based on soil, weather, and market conditions.' },
  { icon: <FiTool />, title: 'Problem Solver', description: 'Upload crop problem images and get instant AI diagnosis and treatment plans.' },
  { icon: <FiCamera />, title: 'Disease Detection', description: 'Advanced AI image analysis to detect crop diseases with confidence scores.' },
  { icon: <FiMessageSquare />, title: 'AI Farming Assistant', description: 'VALI - your Virtual Agriculture & Land Intelligence assistant, available 24/7.' },
  { icon: <FiGlobe />, title: 'Satellite Farm Monitoring', description: 'Satellite imagery analysis for crop health monitoring and growth tracking.' },
  { icon: <FiBarChart2 />, title: 'Farm Analytics', description: 'Comprehensive dashboards with expenses, yields, and performance analytics.' },
]

const steps = [
  { icon: <FiUploadCloud />, title: 'Upload Documents', description: 'Upload your ROR 1B and FMB sketch for AI-powered OCR extraction.' },
  { icon: <FiFileText />, title: 'Verify Information', description: 'Review and confirm the extracted land details automatically.' },
  { icon: <FiMapPin />, title: 'Locate on Map', description: 'Pin your farm location on an interactive map.' },
  { icon: <FiSettings />, title: 'Start Farming Smart', description: 'Access weather, market prices, AI assistant, and more.' },
]

const stats = [
  { value: '50,000+', label: 'Farmers Registered' },
  { value: '2,00,000', label: 'Acres Monitored' },
  { value: '10,00,000+', label: 'AI Predictions Made' },
  { value: '98%', label: 'Accuracy Rate' },
]

const testimonials = [
  { name: 'Rajesh Kumar', role: 'Rice Farmer, Thanjavur', text: 'AgriVISM transformed how I manage my farm. The weather alerts and water management tools saved my crop last monsoon.' },
  { name: 'Priya Devi', role: 'Cotton Farmer, Coimbatore', text: 'The market price feature helps me decide the best time to sell. I increased my profit by 20% this season.' },
  { name: 'Suresh Babu', role: 'Multi-crop Farmer, Erode', text: 'VALI is like having an agricultural expert in my pocket. The disease detection saved my tomato crop from blight.' },
]

const faqData = [
  { q: 'What is AgriVISM?', a: 'AgriVISM is an AI-powered agriculture platform that helps farmers with land management, weather forecasting, irrigation planning, market prices, and crop intelligence.' },
  { q: 'Is AgriVISM free to use?', a: 'Yes, AgriVISM offers a free tier with essential features. Premium features are available with affordable subscription plans.' },
  { q: 'How does disease detection work?', a: 'Simply upload a photo of your affected crop. Our AI model analyzes the image and provides a diagnosis with confidence scores and treatment recommendations.' },
  { q: 'Can I upload my land documents?', a: 'Yes, you can upload ROR 1B and FMB sketch documents. Our OCR technology extracts key information automatically.' },
  { q: 'What languages are supported?', a: 'AgriVISM supports English, Tamil, Hindi, and more regional languages. You can change the language in Settings.' },
]

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition-colors"
        onClick={() => setOpen(!open)}
      >
        <span className="font-medium text-gray-900">{q}</span>
        {open ? <FiChevronUp className="text-gray-500" /> : <FiChevronDown className="text-gray-500" />}
      </button>
      {open && (
        <div className="px-6 pb-4">
          <p className="text-gray-600 text-sm leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  )
}

export default function Landing() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                About <span className="text-primary">AgriVISM</span>
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                AgriVISM (Agricultural Virtual Intelligence & Smart Monitoring) is a comprehensive AI-powered platform built by VimSha AI to empower farmers with intelligent tools for modern agriculture.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                From land registration to crop disease detection, weather forecasting to market intelligence — AgriVISM is your complete digital farming companion.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {['AI-Powered Insights', 'Real-time Data', 'Easy to Use', '24/7 Support'].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <FiCheckCircle className="text-primary" />
                    <span className="text-sm font-medium text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gradient-to-br from-primary/10 to-accent/20 rounded-3xl p-12 flex items-center justify-center"
            >
              <GiPlantRoots className="text-[160px] text-primary/30" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Powerful <span className="text-primary">Features</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Everything you need to manage your farm intelligently, all in one platform.
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <FeatureCard {...f} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How It <span className="text-primary">Works</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Get started in four simple steps.
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary text-2xl mx-auto mb-4 relative">
                  {s.icon}
                  <span className="absolute -top-2 -right-2 w-7 h-7 bg-primary text-white rounded-full text-xs font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-sm text-gray-500">{s.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-20 bg-gradient-to-br from-primary to-emerald-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="text-center text-white"
              >
                <p className="text-4xl font-bold">{s.value}</p>
                <p className="text-green-100 mt-2">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What Farmers <span className="text-primary">Say</span>
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-gray-50 rounded-2xl p-6 border border-gray-100"
              >
                <p className="text-gray-600 text-sm leading-relaxed mb-4">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-sm">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{t.name}</p>
                    <p className="text-xs text-gray-500">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked <span className="text-primary">Questions</span>
            </h2>
          </motion.div>
          <div className="space-y-4">
            {faqData.map((f, i) => (
              <FAQItem key={i} {...f} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Get In <span className="text-primary">Touch</span>
            </h2>
            <p className="text-gray-600">Have questions? We'd love to hear from you.</p>
          </motion.div>
          <motion.form initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="bg-gray-50 rounded-2xl p-8 border border-gray-100 space-y-4"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <input type="text" placeholder="Your Name" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
              <input type="email" placeholder="Email Address" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
            </div>
            <input type="text" placeholder="Subject" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
            <textarea rows={4} placeholder="Your Message" className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none" />
            <button type="button" className="w-full py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-colors">
              Send Message
            </button>
          </motion.form>
        </div>
      </section>

      <Footer />
    </div>
  )
}
