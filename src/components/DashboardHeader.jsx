import { FiBell, FiSearch } from 'react-icons/fi'
import { Link } from 'react-router-dom'

export default function DashboardHeader({ title }) {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      <div>
        <h1 className="text-xl font-bold text-gray-900">{title}</h1>
      </div>
      <div className="flex items-center gap-4">
        <div className="hidden sm:flex items-center bg-gray-100 rounded-xl px-4 py-2 gap-2">
          <FiSearch className="text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none text-sm w-48"
          />
        </div>
        <Link to="/settings" className="relative p-2 hover:bg-gray-100 rounded-xl transition-colors">
          <FiBell className="text-gray-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </Link>
        <div className="w-9 h-9 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-sm">
          RK
        </div>
      </div>
    </header>
  )
}
