import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { GraduationCap, Eye, EyeOff, Lock, User } from 'lucide-react'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const [form,    setForm]    = useState({ username: '', password: '' })
  const [showPw,  setShowPw]  = useState(false)
  const { login, loading }    = useAuth()
  const navigate              = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await login(form.username, form.password)
      toast.success('Welcome back!')
      navigate('/admin/dashboard')
    } catch {
      toast.error('Invalid username or password')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark via-[#2d1b7e] to-primary flex items-center justify-center px-4">
      {/* Decorative blobs */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-primary-light/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-20 w-60 h-60 bg-accent/20 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-3 group">
            <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary-light rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-105 transition-transform">
              <GraduationCap className="w-7 h-7 text-white" />
            </div>
            <div className="text-left">
              <p className="text-white font-black text-xl">Pragati</p>
              <p className="text-gray-300 text-sm -mt-1">Coaching Center</p>
            </div>
          </Link>
          <h2 className="text-2xl font-black text-white mt-6">Admin Login</h2>
          <p className="text-gray-400 text-sm mt-1">Sign in to manage the coaching center</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Username</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input className="input pl-10" placeholder="admin" required
                  value={form.username} onChange={e => setForm({...form, username: e.target.value})} />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input className="input pl-10 pr-10" type={showPw ? 'text' : 'password'}
                  placeholder="••••••••" required
                  value={form.password} onChange={e => setForm({...form, password: e.target.value})} />
                <button type="button" onClick={() => setShowPw(!showPw)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading}
              className="btn-primary w-full justify-center">
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Demo hint */}
          <div className="mt-6 p-4 bg-gray-50 rounded-xl text-xs text-gray-500 text-center space-y-1">
            <p className="font-semibold text-gray-600">Demo Credentials</p>
            <p>Username: <code className="bg-gray-200 px-1 rounded">admin</code>  Password: <code className="bg-gray-200 px-1 rounded">admin123</code></p>
          </div>
        </div>

        <p className="text-center mt-6 text-gray-400 text-sm">
          <Link to="/" className="text-primary-light hover:underline">← Back to website</Link>
        </p>
      </div>
    </div>
  )
}
