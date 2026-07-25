import { useState } from 'react'
import { Link } from 'react-router-dom'
import { GiPlantRoots } from 'react-icons/gi'
import { FiEye, FiEyeOff } from 'react-icons/fi'

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [remember, setRemember] = useState(false)

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-emerald-50 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-primary font-bold text-2xl">
            <GiPlantRoots className="text-3xl" />
            <span>AgriVISM</span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 mt-6">Welcome Back</h1>
          <p className="text-gray-500 mt-2 text-sm">Login to your account to continue</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number or Email</label>
              <input
                type="text"
                placeholder="Enter mobile number or email"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter password"
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

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                />
                <span className="text-sm text-gray-600">Remember Me</span>
              </label>
              <a href="#" className="text-sm text-primary hover:underline">Forgot Password?</a>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-colors shadow-lg shadow-primary/25"
            >
              Login
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Don&apos;t have an account?{' '}
              <Link to="/register" className="text-primary font-semibold hover:underline">
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
