import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import DashboardHeader from '../components/DashboardHeader'
import { FiShield, FiCheckCircle, FiInfo, FiChevronDown, FiSun, FiDroplet } from 'react-icons/fi'
import { useLanguage } from '../i18n/useLanguage'

const cropData = {
  Tomato: {
    conditions: { soil: 'Red Loam', humidity: '65%', temperature: '28°C' },
    weedMats: [
      {
        name: 'Black PE Mulch Film',
        material: 'Polyethylene (PE)',
        thickness: '25-30 micron',
        size: '1.2m × 100m roll',
        color: 'Black',
        lifespan: '1-2 seasons',
        price: '₹850 - ₹1,200',
        rating: 4.8,
        bestFor: 'Blocks 99% sunlight, prevents weed germination between rows. Ideal for tomato raised beds.',
        pros: ['Excellent weed suppression', 'Retains soil moisture', 'Warms soil early'],
        cons: ['Not biodegradable', 'Needs removal after harvest'],
      },
      {
        name: 'Biodegradable Mulch Film',
        material: 'PLA + Starch Blend',
        thickness: '20-25 micron',
        size: '1.0m × 100m roll',
        color: 'Black/Brown',
        lifespan: '1 season (self-decomposes)',
        price: '₹1,500 - ₹2,200',
        rating: 4.5,
        bestFor: 'Eco-friendly option. Decomposes into soil after harvest — no removal needed. Great for organic tomato farming.',
        pros: ['Environmentally friendly', 'No removal labor', 'Adds organic matter to soil'],
        cons: ['Higher cost', 'Less durable in heavy rain'],
      },
      {
        name: 'Silver-Black Mulch Sheet',
        material: 'Co-extruded PE',
        thickness: '25 micron',
        size: '1.2m × 100m roll',
        color: 'Silver top / Black bottom',
        lifespan: '2 seasons',
        price: '₹1,100 - ₹1,600',
        rating: 4.7,
        bestFor: 'Silver top repels aphids and whiteflies — common tomato pests. Black bottom suppresses weeds.',
        pros: ['Pest repellent', 'Reflects light to lower leaves', 'Weed suppression'],
        cons: ['Slightly expensive', 'Can overheat in peak summer'],
      },
    ],
    tips: [
      'Lay mulch 2 weeks before transplanting to allow soil warming',
      'Cut X-shaped holes for each plant — 45cm spacing',
      'Secure edges with soil or U-pins to prevent wind lift',
      'Drip irrigation under mulch reduces water use by 40%',
    ],
  },
  Cotton: {
    conditions: { soil: 'Black Regur', humidity: '55%', temperature: '32°C' },
    weedMats: [
      {
        name: 'Woven HDPE Weed Mat',
        material: 'High-Density Polyethylene',
        thickness: '100-120 gsm',
        size: '1.0m × 100m roll',
        color: 'Black/Green',
        lifespan: '3-5 seasons',
        price: '₹2,200 - ₹3,500',
        rating: 4.9,
        bestFor: 'Heavy-duty mat for long cotton season (6 months). Reusable across multiple cycles. Withstands tractor traffic.',
        pros: ['Extremely durable', 'UV resistant', 'Reusable'],
        cons: ['Higher upfront cost', 'Requires manual weeding at holes'],
      },
      {
        name: 'Straw Mulch Layer',
        material: 'Dried Rice Straw',
        thickness: '8-10 cm layer',
        size: 'Per acre coverage',
        color: 'Golden Brown',
        lifespan: '1 season',
        price: '₹3,000 - ₹5,000 per acre',
        rating: 4.3,
        bestFor: 'Traditional organic method. Adds organic matter, suppresses weeds, and retains moisture in black cotton soil.',
        pros: ['Natural & organic', 'Improves soil structure', 'Cheap if locally available'],
        cons: ['Labor intensive to spread', 'May harbor rodents'],
      },
    ],
    tips: [
      'Apply pre-emergence herbicide 3 days before laying mat',
      'Use raised beds (15cm) for better drainage under mat',
      'Straw mulch works best with drip irrigation',
      'Remove HDPE mat before ploughing for next season',
    ],
  },
  Turmeric: {
    conditions: { soil: 'Red Laterite', humidity: '70%', temperature: '27°C' },
    weedMats: [
      {
        name: 'Organic Coir Mulch Mat',
        material: 'Coconut Coir Fiber',
        thickness: '15-20mm',
        size: '1.0m × 10m sheets',
        color: 'Natural Brown',
        lifespan: '2 seasons',
        price: '₹180 - ₹250 per sq.m',
        rating: 4.6,
        bestFor: 'Perfect for turmeric\'s long 8-9 month cycle. Natural material suits organic farming. Retains moisture in laterite soil.',
        pros: ['100% biodegradable', 'Excellent moisture retention', 'Natural look'],
        cons: ['Needs periodic replacement', 'Can retain too much moisture in monsoon'],
      },
      {
        name: 'Red Plastic Mulch',
        material: 'LDPE Film',
        thickness: '30 micron',
        size: '1.2m × 100m roll',
        color: 'Red top / Black bottom',
        lifespan: '1-2 seasons',
        price: '₹950 - ₹1,400',
        rating: 4.4,
        bestFor: 'Red light spectrum promotes root growth — ideal for turmeric rhizome development. Black bottom blocks weeds.',
        pros: ['Boosts root growth', 'Good weed suppression', 'Moderate cost'],
        cons: ['Not biodegradable', 'Can overheat in direct sun'],
      },
    ],
    tips: [
      'Turmeric needs deep mulching (10-15cm) for best rhizome growth',
      'Coir mat is ideal for rain-fed turmeric areas',
      'Lay mulch after first rain when soil is moist',
      'Add extra straw mulch on top during peak summer',
    ],
  },
  Groundnut: {
    conditions: { soil: 'Sandy Loam', humidity: '60%', temperature: '30°C' },
    weedMats: [
      {
        name: 'Biodegradable PE Mulch',
        material: 'Corn-starch based PE',
        thickness: '15-20 micron',
        size: '0.8m × 100m roll',
        color: 'Black',
        lifespan: '1 season',
        price: '₹700 - ₹1,000',
        rating: 4.2,
        bestFor: 'Groundnut has low canopy — weeds compete heavily. Biodegradable mulch suppresses weeds and decomposes before harvest.',
        pros: ['Weed-free for 60+ days', 'No removal needed', 'Affordable'],
        cons: ['Thin — can tear easily', 'Needs careful installation'],
      },
      {
        name: 'Hay/Straw Mulch Layer',
        material: 'Dried Grass/Hay',
        thickness: '5-7 cm layer',
        size: 'Per acre coverage',
        color: 'Light Brown',
        lifespan: '1 season',
        price: '₹2,500 - ₹4,000 per acre',
        rating: 4.0,
        bestFor: 'Traditional method for groundnut. Loose mulch allows pegs to penetrate soil easily for pod formation.',
        pros: ['Allows peg penetration', 'Natural soil enrichment', 'Cheap'],
        cons: ['Labor to spread', 'Can blow away in wind'],
      },
    ],
    tips: [
      'Avoid thick plastic mulch — groundnut pegs need to reach soil',
      'Hay mulch is best for pegging stage',
      'Apply mulch at 30 days after sowing (peak weed period)',
      'Light hoeing before mulching helps initial weed control',
    ],
  },
  Coconut: {
    conditions: { soil: 'Red Sandy', humidity: '75%', temperature: '29°C' },
    weedMats: [
      {
        name: 'Natural Coir Geotextile',
        material: 'Woven Coconut Coir',
        thickness: '3-5mm',
        size: '1.0m × 50m rolls',
        color: 'Natural Brown',
        lifespan: '3-4 years',
        price: '₹350 - ₹500 per sq.m',
        rating: 4.7,
        bestFor: 'Premium long-lasting option for coconut gardens. Perfect circular mats available for tree bases. Extremely durable.',
        pros: ['Very long lifespan', 'Natural material', 'Excellent weed barrier'],
        cons: ['Expensive upfront', 'Heavy to transport'],
      },
      {
        name: 'Rubberized Weed Mat',
        material: 'Recycled Rubber',
        thickness: '5-8mm',
        size: '1.2m × 1.2m sheets',
        color: 'Black',
        lifespan: '5-7 years',
        price: '₹400 - ₹600 per sheet',
        rating: 4.5,
        bestFor: 'Heavy-duty option for commercial coconut farms. Place around tree base — blocks all weeds. Extremely durable.',
        pros: ['Maximum durability', 'Zero maintenance', 'Reusable'],
        cons: ['Not biodegradable', 'Can trap moisture at base'],
      },
    ],
    tips: [
      'Place mats in 2m radius around each coconut tree',
      'Clear existing weeds before laying mat',
      'Coir geotextile also prevents soil erosion on slopes',
      'Leave 5cm gap from trunk to prevent collar rot',
    ],
  },
}

const cropList = Object.keys(cropData)

export default function WeedManagement() {
  const [selectedCrop, setSelectedCrop] = useState('Tomato')
  const [expanded, setExpanded] = useState(null)
  const { t } = useLanguage()
  const data = cropData[selectedCrop]

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader title={t('weed.title')} />
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-5xl mx-auto space-y-6">
            {/* Hero Banner */}
            <div className="bg-gradient-to-r from-gray-800 to-gray-600 rounded-2xl p-6 text-white">
              <div className="flex items-center gap-3 mb-2">
                <FiShield className="text-2xl" />
              <h2 className="text-xl font-bold">{t('weed.subtitle')}</h2>
            </div>
            <p className="text-sm text-gray-200">
              {t('weed.desc')}
              </p>
            </div>

            {/* Crop Selector */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
              <div className="flex items-center gap-3 mb-3">
                <FiInfo className="text-primary" />
                <span className="text-sm font-medium text-gray-700">Select your crop to get tailored recommendations:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {cropList.map((crop) => (
                  <button
                    key={crop}
                    onClick={() => { setSelectedCrop(crop); setExpanded(null) }}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedCrop === crop
                        ? 'bg-gray-800 text-white shadow-md'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {crop}
                  </button>
                ))}
              </div>
            </div>

            {/* Farm Conditions */}
            <div className="bg-gradient-to-r from-gray-700 to-gray-500 rounded-2xl p-6 text-white">
              <h3 className="text-lg font-bold mb-4">Farm Conditions for {selectedCrop}</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white/20 rounded-xl p-4 text-center">
                  <FiSun className="text-xl mx-auto mb-2" />
                  <p className="text-2xl font-bold">{data.conditions.temperature}</p>
                  <p className="text-xs text-gray-200">Temperature</p>
                </div>
                <div className="bg-white/20 rounded-xl p-4 text-center">
                  <FiDroplet className="text-xl mx-auto mb-2" />
                  <p className="text-2xl font-bold">{data.conditions.humidity}</p>
                  <p className="text-xs text-gray-200">Humidity</p>
                </div>
                <div className="bg-white/20 rounded-xl p-4 text-center">
                  <FiShield className="text-xl mx-auto mb-2" />
                  <p className="text-2xl font-bold">{data.conditions.soil}</p>
                  <p className="text-xs text-gray-200">Soil Type</p>
                </div>
              </div>
            </div>

            {/* Weed Mats Section */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-gray-800 text-white rounded-lg flex items-center justify-center text-sm">🌿</span>
                Recommended Weed Mats & Mulching Sheets
              </h3>
              <div className="space-y-4">
                {data.weedMats.map((mat, i) => (
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
                            <h4 className="font-bold text-gray-900 text-lg">{mat.name}</h4>
                            <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">
                              {mat.material}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500 mb-3">{mat.bestFor}</p>
                          <div className="flex flex-wrap gap-3 text-xs text-gray-400">
                            <span>Size: {mat.size}</span>
                            <span>•</span>
                            <span>Color: {mat.color}</span>
                            <span>•</span>
                            <span>Lifespan: {mat.lifespan}</span>
                            <span>•</span>
                            <span>Thickness: {mat.thickness}</span>
                          </div>
                        </div>
                        <div className="text-right shrink-0 ml-4">
                          <p className="text-lg font-bold text-primary">{mat.price}</p>
                          <div className="flex items-center gap-1 mt-1">
                            <span className="text-yellow-500">★</span>
                            <span className="text-sm text-gray-600">{mat.rating}</span>
                          </div>
                        </div>
                      </div>

                      {expanded === i && (
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm font-medium text-green-700 mb-2">✅ Advantages</p>
                              <ul className="space-y-1">
                                {mat.pros.map((p, j) => (
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
                                {mat.cons.map((c, j) => (
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
                        className="flex items-center gap-1 text-xs text-primary hover:text-primary-dark transition-colors"
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
                Application Tips for {selectedCrop}
              </h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {data.tips.map((tip, i) => (
                  <div key={i} className="flex items-start gap-2 p-3 bg-gray-50 rounded-xl">
                    <FiCheckCircle className="text-primary shrink-0 mt-0.5" />
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
                    <th className="text-left py-3 px-2 text-gray-500 font-medium">Lifespan</th>
                    <th className="text-left py-3 px-2 text-gray-500 font-medium">Price</th>
                    <th className="text-left py-3 px-2 text-gray-500 font-medium">Rating</th>
                  </tr>
                </thead>
                <tbody>
                  {data.weedMats.map((mat, i) => (
                    <tr key={i} className="border-b border-gray-50 last:border-0">
                      <td className="py-3 px-2 font-medium text-gray-900">{mat.name}</td>
                      <td className="py-3 px-2 text-gray-600">{mat.material}</td>
                      <td className="py-3 px-2 text-gray-600">{mat.lifespan}</td>
                      <td className="py-3 px-2 text-primary font-medium">{mat.price}</td>
                      <td className="py-3 px-2">
                        <span className="flex items-center gap-1">
                          <span className="text-yellow-500">★</span>
                          {mat.rating}
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
