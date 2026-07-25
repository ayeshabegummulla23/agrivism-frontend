import { useState } from 'react'
import { Link } from 'react-router-dom'
import { GiPlantRoots } from 'react-icons/gi'
import { FiEye, FiEyeOff } from 'react-icons/fi'

export default function Register() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-emerald-50 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-primary font-bold text-2xl">
            <GiPlantRoots className="text-3xl" />
            <span>AgriVISM</span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 mt-6">Create Account</h1>
          <p className="text-gray-500 mt-2 text-sm">Join thousands of smart farmers</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input
                  type="text"
                  placeholder="First name"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input
                  type="text"
                  placeholder="Last name"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
              <input
                type="tel"
                placeholder="+91 Enter mobile number"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                placeholder="Enter email address"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Village / City</label>
              <input
                type="text"
                placeholder="Enter your village or city"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create a password"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all pr-12"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            <label className="flex items-start gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 mt-0.5 text-primary border-gray-300 rounded focus:ring-primary" />
              <span className="text-sm text-gray-500">
                I agree to the <a href="#" className="text-primary hover:underline">Terms of Service</a> and{' '}
                <a href="#" className="text-primary hover:underline">Privacy Policy</a>
              </span>
            </label>

            <button
              type="submit"
              className="w-full py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-colors shadow-lg shadow-primary/25"
            >
              Create Account
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Already have an account?{' '}
              <Link to="/login" className="text-primary font-semibold hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
