import { FiTrendingUp, FiTrendingDown } from 'react-icons/fi'

export default function MarketPriceCard({ crop, price, change, market }) {
  const isUp = change >= 0
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{market}</p>
          <p className="font-semibold text-gray-900 mt-1">{crop}</p>
        </div>
        <div className="text-right">
          <p className="font-bold text-gray-900">₹{price}/q</p>
          <div className={`flex items-center gap-1 text-sm font-medium ${isUp ? 'text-green-600' : 'text-red-500'}`}>
            {isUp ? <FiTrendingUp /> : <FiTrendingDown />}
            <span>{isUp ? '+' : ''}{change}%</span>
          </div>
        </div>
      </div>
    </div>
  )
}
