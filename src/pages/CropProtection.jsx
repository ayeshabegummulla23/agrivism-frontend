import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import DashboardHeader from '../components/DashboardHeader'
import { FiShield, FiCheckCircle, FiInfo, FiChevronDown, FiSun, FiDroplet, FiWind } from 'react-icons/fi'
import { useLanguage } from '../i18n/useLanguage'

const cropData = {
  Tomato: {
    conditions: { season: 'Jul - Oct', risk: 'Heavy Rain, Frost', stage: 'Flowering' },
    covers: [
      {
        name: 'Low Tunnel Grow Cover',
        type: 'Low Tunnel (Hoops)',
        material: 'UV-stabilized LDPE',
        thickness: '150 micron',
        uvProtection: '85%',
        size: '2m × 10m',
        lifespan: '2-3 seasons',
        price: '₹1,800 - ₹2,500',
        rating: 4.8,
        bestFor: 'Protects tomato plants from heavy rain splashing soil-borne diseases. Maintains warm microclimate for fruit setting.',
        protection: ['Heavy Rain', 'Hail', 'Wind', 'Pest Insects'],
        pros: ['Extends growing season by 3-4 weeks', 'Reduces fungal diseases by 60%', 'Easy to install with PVC hoops'],
        cons: ['Needs daily venting in hot weather', 'Takes storage space'],
      },
      {
        name: 'Floating Row Cover',
        material: 'Spunbond Polypropylene',
        thickness: '30 gsm',
        uvProtection: '90%',
        size: '3.5m × 100m roll',
        lifespan: '4-5 seasons',
        price: '₹2,200 - ₹3,000',
        rating: 4.7,
        bestFor: 'Lightweight fabric that "floats" over plants. Allows 90% light & rain through while blocking pests. Perfect for early-season tomato protection.',
        protection: ['Frost', 'Pest Insects', 'UV Scorch', 'Wind'],
        pros: ['Lightweight — no support needed', 'Breathable fabric', 'Reusable for many seasons'],
        cons: ['Light frost protection only (-2°C)', 'Tears if handled roughly'],
      },
      {
        name: 'Polycarbonate Mini Greenhouse',
        type: 'Rigid Panel',
        material: 'Twin-wall Polycarbonate',
        thickness: '4mm panels',
        uvProtection: '95%',
        size: '2m × 3m × 2m',
        lifespan: '8-10 years',
        price: '₹12,000 - ₹18,000',
        rating: 4.9,
        bestFor: 'Premium permanent protection for high-value tomato varieties. Withstands cyclones and heavy hail.',
        protection: ['All Weather', 'Hail', 'Cyclone', 'Pest', 'Frost (-8°C)'],
        pros: ['Maximum protection', 'Very long lifespan', 'Professional-grade'],
        cons: ['Expensive', 'Fixed structure — not movable'],
      },
    ],
    tips: [
      'Install covers before monsoon onset to prevent soil splash diseases',
      'Ventilate low tunnels daily when temperature exceeds 35°C',
      'Remove floating row covers when temps are consistently above 25°C',
      'Use UV-resistant covers to prevent yellowing in 6+ months',
    ],
  },
  Cotton: {
    conditions: { season: 'May - Nov', risk: 'Bollworm, Pink Bollworm', stage: 'Boll Development' },
    covers: [
      {
        name: 'Insect-Proof Mesh Cover',
        type: 'Fine Mesh Net',
        material: 'HDPE Mono-filament',
        thickness: '50 micron mesh',
        uvProtection: '80%',
        size: '4m × 100m roll',
        lifespan: '3-4 seasons',
        price: '₹3,500 - ₹5,000',
        rating: 4.8,
        bestFor: 'Specifically blocks bollworm moth entry. 40-mesh count prevents even tiny insects from reaching cotton bolls.',
        protection: ['Bollworm', 'Whitefly', 'Aphids', 'Thrips'],
        pros: ['Chemical-free pest control', 'Allows pollination', 'Long lasting'],
        cons: ['Expensive per meter', 'Needs support frame'],
      },
      {
        name: 'Heavy-Duty Shade Net',
        type: 'Woven Shade Cloth',
        material: 'HDPE with UV treatment',
        thickness: '200 gsm',
        uvProtection: '70% shade',
        size: '4m × 100m roll',
        lifespan: '4-5 seasons',
        price: '₹2,800 - ₹4,000',
        rating: 4.5,
        bestFor: 'Reduces heat stress during peak summer boll development. Prevents sun-scorch on open bolls.',
        protection: ['Heat Stress', 'Sun Scorch', 'Hail', 'Heavy Rain'],
        pros: ['Reduces temperature by 5-8°C', 'Protects open bolls from rain damage', 'Reusable'],
        cons: ['Reduces photosynthesis if left on too long', 'Needs removal during peak boll filling'],
      },
    ],
    tips: [
      'Install insect mesh when bollworm moth activity is detected',
      'Use shade net only during extreme heat — remove for normal growth',
      'Seal mesh edges to ground to prevent insect entry from below',
      'Combine with pheromone traps under the mesh for best results',
    ],
  },
  Turmeric: {
    conditions: { season: 'Jun - Feb', risk: 'Rhizome Rot, Drought', stage: 'Rhizome Development' },
    covers: [
      {
        name: 'Shade Net Canopy (50%)',
        type: 'Overhead Shade Structure',
        material: 'Knitted HDPE',
        thickness: '150 gsm',
        uvProtection: '50% shade',
        size: '6m × 100m roll',
        lifespan: '4-6 seasons',
        price: '₹4,500 - ₹6,500',
        rating: 4.7,
        bestFor: 'Turmeric needs 50-60% shade — mimics natural forest understory. Prevents leaf scorch and boosts rhizome size.',
        protection: ['Excessive Sun', 'Leaf Scorch', 'Drought Stress', 'Hail'],
        pros: ['Mimics natural habitat', 'Boosts rhizome yield by 25%', 'Multi-crop use'],
        cons: ['Needs poles/frame structure', 'Initial setup cost'],
      },
      {
        name: 'Rain Guard Poly Cover',
        type: 'Overhead Tarp',
        material: 'Reinforced PE',
        thickness: '200 micron',
        uvProtection: '75%',
        size: '5m × 10m',
        lifespan: '2 seasons',
        price: '₹1,200 - ₹1,800',
        rating: 4.3,
        bestFor: 'Protects turmeric from waterlogging during heavy monsoon. Prevents rhizome rot — the biggest killer of turmeric.',
        protection: ['Waterlogging', 'Rhizome Rot', 'Heavy Rain', 'Hail'],
        pros: ['Prevents rhizome rot effectively', 'Easy to install/remove', 'Affordable'],
        cons: ['Blocks rain — needs manual irrigation', 'Temporary solution'],
      },
    ],
    tips: [
      'Turmeric is a shade-loving plant — never expose to full sun',
      'Install shade net within 2 weeks of planting',
      'Remove rain cover during light rain — turmeric needs moisture',
      'Elevate rain covers at least 2m above plants for air circulation',
    ],
  },
  Groundnut: {
    conditions: { season: 'Jun - Sep', risk: 'Drought, Pod Rot', stage: 'Pod Formation' },
    covers: [
      {
        name: 'Lightweight Floating Cover',
        material: 'Spunbond Polyester',
        thickness: '17 gsm',
        uvProtection: '85%',
        size: '3m × 100m roll',
        lifespan: '3-4 seasons',
        price: '₹1,500 - ₹2,200',
        rating: 4.4,
        bestFor: 'Protects young groundnut from heavy rain damage during critical pegging stage. Very light — won\'t flatten plants.',
        protection: ['Heavy Rain', 'Frost', 'Pest Insects', 'Birds'],
        pros: ['Ultra-lightweight', 'Allows peg penetration', 'Reusable'],
        cons: ['Minimal hail protection', 'Needs anchoring in wind'],
      },
      {
        name: 'Monsoon Protection Tarp',
        type: 'Emergency Cover',
        material: 'Woven PP',
        thickness: '100 gsm',
        uvProtection: '60%',
        size: '5m × 8m',
        lifespan: '2 seasons',
        price: '₹800 - ₹1,200',
        rating: 4.1,
        bestFor: 'Emergency protection during unseasonal heavy rains. Prevents waterlogging and pod rot in mature groundnut.',
        protection: ['Heavy Rain', 'Waterlogging', 'Fungal Attack'],
        pros: ['Quick deploy', 'Affordable', 'Multi-use'],
        cons: ['Not for regular use', 'Blocks sunlight if left on'],
      },
    ],
    tips: [
      'Deploy floating cover only during critical 45-65 day pegging period',
      'Remove immediately after rain stops — groundnut needs sunlight',
      'Groundnut doesn\'t need shade covers — it loves full sun',
      'Use tarps only for emergency rain protection near harvest',
    ],
  },
  Coconut: {
    conditions: { season: 'Year-round', risk: 'Cyclone, Salt Spray', stage: 'All Stages' },
    covers: [
      {
        name: 'Windbreak Net Screen',
        type: 'Perimeter Screen',
        material: 'HDPE Knitted Net',
        thickness: '150 gsm',
        uvProtection: '70%',
        size: '4m × 100m roll',
        lifespan: '5-7 years',
        price: '₹5,500 - ₹8,000',
        rating: 4.8,
        bestFor: 'Essential for coastal coconut farms. Reduces wind speed by 50-60%, preventing frond damage and nut drop.',
        protection: ['Strong Wind', 'Cyclone', 'Salt Spray', 'Sand Blasting'],
        pros: ['Long lifespan', 'Significantly reduces crop loss', 'Also works as boundary marker'],
        cons: ['Needs strong pole support', 'Expensive initial setup'],
      },
      {
        name: 'Coconut Sapling Guard',
        type: 'Individual Tree Cover',
        material: 'UV-stabilized HDPE',
        thickness: '100 micron',
        uvProtection: '80%',
        size: '1.2m diameter × 1.5m height',
        lifespan: '3-4 years',
        price: '₹350 - ₹500 per unit',
        rating: 4.6,
        bestFor: 'Protects young coconut saplings from sun scorch, wind damage, and grazing animals during first 2 critical years.',
        protection: ['Sun Scorch', 'Wind', 'Grazing Animals', 'Frost'],
        pros: ['Protects vulnerable saplings', 'Easy to install', 'Affordable per tree'],
        cons: ['Only for young trees', 'Needs periodic cleaning inside'],
      },
    ],
    tips: [
      'Install windbreak nets on the windward side of the farm',
      'Maintain 50% porosity for optimal wind reduction',
      'Use sapling guards for first 2 years — then remove',
      'Replace UV-degraded nets every 5-6 years',
    ],
  },
}

const cropList = Object.keys(cropData)

export default function CropProtection() {
  const [selectedCrop, setSelectedCrop] = useState('Tomato')
  const [expanded, setExpanded] = useState(null)
  const { t } = useLanguage()
  const data = cropData[selectedCrop]

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader title={t('protection.title')} />
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-5xl mx-auto space-y-6">
            {/* Hero Banner */}
            <div className="bg-gradient-to-r from-blue-700 to-blue-500 rounded-2xl p-6 text-white">
              <div className="flex items-center gap-3 mb-2">
                <FiShield className="text-2xl" />
              <h2 className="text-xl font-bold">{t('protection.subtitle')}</h2>
            </div>
            <p className="text-sm text-blue-100">
              {t('protection.desc')}
              </p>
            </div>

            {/* Crop Selector */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
              <div className="flex items-center gap-3 mb-3">
                <FiInfo className="text-blue-600" />
                <span className="text-sm font-medium text-gray-700">Select your crop to see protection recommendations:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {cropList.map((crop) => (
                  <button
                    key={crop}
                    onClick={() => { setSelectedCrop(crop); setExpanded(null) }}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedCrop === crop
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {crop}
                  </button>
                ))}
              </div>
            </div>

            {/* Risk Assessment */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-500 rounded-2xl p-6 text-white">
              <h3 className="text-lg font-bold mb-4">Risk Assessment — {selectedCrop}</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white/20 rounded-xl p-4 text-center">
                  <FiSun className="text-xl mx-auto mb-2" />
                  <p className="text-lg font-bold">{data.conditions.season}</p>
                  <p className="text-xs text-blue-100">Growing Season</p>
                </div>
                <div className="bg-white/20 rounded-xl p-4 text-center">
                  <FiWind className="text-xl mx-auto mb-2" />
                  <p className="text-lg font-bold">{data.conditions.risk}</p>
                  <p className="text-xs text-blue-100">Key Risks</p>
                </div>
                <div className="bg-white/20 rounded-xl p-4 text-center">
                  <FiDroplet className="text-xl mx-auto mb-2" />
                  <p className="text-lg font-bold">{data.conditions.stage}</p>
                  <p className="text-xs text-blue-100">Current Stage</p>
                </div>
              </div>
            </div>

            {/* Grow Covers Section */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center text-sm">🛡️</span>
                Recommended Grow Covers & Protection
              </h3>
              <div className="space-y-4">
                {data.covers.map((cover, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
                  >
                    <div
                      className="p-6 cursor-pointer"
                      onClick={() => setExpanded(expanded === i ? null : i)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="font-bold text-gray-900 text-lg">{cover.name}</h4>
                            <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-xs rounded-full">
                              {cover.material}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500 mb-3">{cover.bestFor}</p>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {cover.protection.map((p, j) => (
                              <span key={j} className="px-2 py-1 bg-green-50 text-green-700 text-xs rounded-full flex items-center gap-1">
                                <FiCheckCircle className="text-xs" />
                                {p}
                              </span>
                            ))}
                          </div>
                          <div className="flex flex-wrap gap-3 text-xs text-gray-400">
                            <span>Size: {cover.size}</span>
                            <span>•</span>
                            <span>Thickness: {cover.thickness}</span>
                            <span>•</span>
                            <span>UV: {cover.uvProtection}</span>
                            <span>•</span>
                            <span>Lifespan: {cover.lifespan}</span>
                          </div>
                        </div>
                        <div className="text-right shrink-0 ml-4">
                          <p className="text-lg font-bold text-blue-600">{cover.price}</p>
                          <div className="flex items-center gap-1 mt-1">
                            <span className="text-yellow-500">★</span>
                            <span className="text-sm text-gray-600">{cover.rating}</span>
                          </div>
                        </div>
                      </div>

                      {expanded === i && (
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm font-medium text-green-700 mb-2">✅ Advantages</p>
                              <ul className="space-y-1">
                                {cover.pros.map((p, j) => (
                                  <li key={j} className="text-sm text-gray-600 flex items-start gap-2">
                                    <FiCheckCircle className="text-green-500 shrink-0 mt-0.5" />
                                    {p}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-red-700 mb-2">⚠️ Limitations</p>
                              <ul className="space-y-1">
                                {cover.cons.map((c, j) => (
                                  <li key={j} className="text-sm text-gray-600 flex items-start gap-2">
                                    <span className="text-red-400 shrink-0">•</span>
                                    {c}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="px-6 pb-4">
                      <button
                        onClick={() => setExpanded(expanded === i ? null : i)}
                        className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        {expanded === i ? 'Show less' : 'View details'}
                        <FiChevronDown className={`transition-transform ${expanded === i ? 'rotate-180' : ''}`} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Application Tips */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-lg">💡</span>
                Protection Tips for {selectedCrop}
              </h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {data.tips.map((tip, i) => (
                  <div key={i} className="flex items-start gap-2 p-3 bg-blue-50 rounded-xl">
                    <FiCheckCircle className="text-blue-600 shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">{tip}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Comparison Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 overflow-x-auto">
              <h3 className="font-semibold text-gray-900 mb-4">Quick Comparison</h3>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left py-3 px-2 text-gray-500 font-medium">Product</th>
                    <th className="text-left py-3 px-2 text-gray-500 font-medium">Material</th>
                    <th className="text-left py-3 px-2 text-gray-500 font-medium">UV Protection</th>
                    <th className="text-left py-3 px-2 text-gray-500 font-medium">Lifespan</th>
                    <th className="text-left py-3 px-2 text-gray-500 font-medium">Price</th>
                    <th className="text-left py-3 px-2 text-gray-500 font-medium">Rating</th>
                  </tr>
                </thead>
                <tbody>
                  {data.covers.map((cover, i) => (
                    <tr key={i} className="border-b border-gray-50 last:border-0">
                      <td className="py-3 px-2 font-medium text-gray-900">{cover.name}</td>
                      <td className="py-3 px-2 text-gray-600">{cover.material}</td>
                      <td className="py-3 px-2 text-gray-600">{cover.uvProtection}</td>
                      <td className="py-3 px-2 text-gray-600">{cover.lifespan}</td>
                      <td className="py-3 px-2 text-blue-600 font-medium">{cover.price}</td>
                      <td className="py-3 px-2">
                        <span className="flex items-center gap-1">
                          <span className="text-yellow-500">★</span>
                          {cover.rating}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
