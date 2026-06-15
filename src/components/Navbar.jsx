import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X, GraduationCap, LogOut, LayoutDashboard } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const [open,      setOpen]      = useState(false)
  const [scrolled,  setScrolled]  = useState(false)
  const { user, logout }          = useAuth()
  const location                  = useLocation()
  const navigate                  = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { to: '/',              label: 'Home' },
    { to: '/courses',       label: 'Courses' },
    { to: '/infrastructure',label: 'Infrastructure' },
    { to: '/about',         label: 'About Us' },
    { to: '/contact',       label: 'Contact' },
  ]

  const handleLogout = () => { logout(); navigate('/') }

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-white shadow-lg' : 'bg-white/90 backdrop-blur'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-gradient-to-br from-primary to-primary-light rounded-xl flex items-center justify-center shadow-md">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div className="leading-tight">
              <p className="text-sm font-bold text-dark">Pragati</p>
              <p className="text-xs text-gray-500 -mt-0.5">Coaching Center</p>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {links.map(l => (
              <Link key={l.to} to={l.to}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  location.pathname === l.to
                    ? 'bg-primary/10 text-primary'
                    : 'text-gray-600 hover:text-primary hover:bg-gray-50'}`}>
                {l.label}
              </Link>
            ))}
          </div>

          {/* Right */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <Link to="/admin/dashboard"
                  className="flex items-center gap-2 text-sm font-medium text-primary hover:underline">
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Link>
                <button onClick={handleLogout}
                  className="flex items-center gap-2 text-sm text-gray-500 hover:text-red-500 transition-colors">
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="btn-primary py-2 text-sm">Admin Login</Link>
            )}
          </div>

          {/* Mobile burger */}
          <button className="md:hidden p-2" onClick={() => setOpen(!open)}>
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t shadow-lg px-4 py-3 space-y-1">
          {links.map(l => (
            <Link key={l.to} to={l.to} onClick={() => setOpen(false)}
              className="block px-4 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-50">
              {l.label}
            </Link>
          ))}
          {user ? (
            <>
              <Link to="/admin/dashboard" onClick={() => setOpen(false)}
                className="block px-4 py-2 rounded-lg text-sm text-primary font-medium">
                Dashboard
              </Link>
              <button onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm text-red-500">
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" onClick={() => setOpen(false)}
              className="block px-4 py-2 text-sm text-primary font-semibold">
              Admin Login
            </Link>
          )}
        </div>
      )}
    </nav>
  )
}
