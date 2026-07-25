import Sidebar from '../components/Sidebar'
import DashboardHeader from '../components/DashboardHeader'
import MapPlaceholder from '../components/MapPlaceholder'
import { GiPlantRoots } from 'react-icons/gi'

const farmData = {
  name: 'Green Valley Farm',
  owner: 'Rajesh Kumar S',
  surveyNumber: '12/2A',
  khataNumber: '458',
  area: '2.5 Acres',
  crop: 'Rice (Paddy)',
  village: 'Kaveripattinam',
  district: 'Krishnagiri',
  state: 'Tamil Nadu',
  soilType: 'Red Soil',
  waterSource: 'Borewell',
  plantedDate: '15 May 2026',
  expectedHarvest: '15 Sep 2026',
}

export default function FarmProfile() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader title="Farm Profile" />
        <main className="flex-1 p-6 overflow-y-auto">
          {/* Hero Banner */}
          <div className="bg-gradient-to-r from-primary to-emerald-500 rounded-2xl p-8 text-white mb-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 opacity-10">
              <GiPlantRoots className="text-[200px]" />
            </div>
            <h2 className="text-2xl font-bold relative z-10">{farmData.name}</h2>
            <p className="text-green-100 mt-1 relative z-10">Owner: {farmData.owner}</p>
            <div className="flex flex-wrap gap-3 mt-4 relative z-10">
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm">{farmData.area}</span>
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm">{farmData.crop}</span>
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm">{farmData.village}, {farmData.district}</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Farm Details */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Farm Details</h3>
              <div className="space-y-3">
                {Object.entries({
                  'Survey Number': farmData.surveyNumber,
                  'Khata Number': farmData.khataNumber,
                  'Area': farmData.area,
                  'Crop': farmData.crop,
                  'Village': farmData.village,
                  'District': farmData.district,
                  'State': farmData.state,
                  'Soil Type': farmData.soilType,
                  'Water Source': farmData.waterSource,
                  'Planting Date': farmData.plantedDate,
                  'Expected Harvest': farmData.expectedHarvest,
                }).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-2 border-b border-gray-50 last:border-0">
                    <span className="text-sm text-gray-500">{key}</span>
                    <span className="text-sm font-medium text-gray-900">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Weather Summary + Map */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Weather Summary</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-blue-50 rounded-xl">
                    <p className="text-2xl font-bold text-blue-600">28°C</p>
                    <p className="text-xs text-gray-500 mt-1">Temperature</p>
                  </div>
                  <div className="text-center p-3 bg-cyan-50 rounded-xl">
                    <p className="text-2xl font-bold text-cyan-600">65%</p>
                    <p className="text-xs text-gray-500 mt-1">Humidity</p>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-xl">
                    <p className="text-2xl font-bold text-green-600">40%</p>
                    <p className="text-xs text-gray-500 mt-1">Rain Chance</p>
                  </div>
                </div>
              </div>

              <MapPlaceholder height="h-64" />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
