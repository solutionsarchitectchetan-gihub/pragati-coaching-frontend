import React, { useState } from 'react'
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Users, Shield, UserCog, LogOut,
         GraduationCap, Menu, X, ExternalLink, ChevronRight } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

const NAV = [
  { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard'  },
  { to: '/admin/students',  icon: Users,            label: 'Students'   },
  { to: '/admin/roles',     icon: Shield,           label: 'Roles',  adminOnly: true },
  { to: '/admin/users',     icon: UserCog,          label: 'Users',  adminOnly: true },
]

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user, logout, isAdmin }     = useAuth()
  const location                      = useLocation()
  const navigate                      = useNavigate()

  const handleLogout = () => { logout(); navigate('/login') }

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-white font-bold text-sm">Pragati Admin</p>
            <p className="text-white/60 text-xs">Coaching Center</p>
          </div>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {NAV.filter(n => !n.adminOnly || isAdmin()).map(({ to, icon: Icon, label }) => {
          const active = location.pathname === to
          return (
            <Link key={to} to={to} onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all
                ${active ? 'bg-white/20 text-white shadow' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}>
              <Icon className="w-4 h-4" />
              {label}
              {active && <ChevronRight className="w-3 h-3 ml-auto" />}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-white/10">
        <Link to="/" target="_blank"
          className="flex items-center gap-2 text-xs text-white/60 hover:text-white mb-3 px-2 transition-colors">
          <ExternalLink className="w-3.5 h-3.5" /> View Website
        </Link>
        <div className="flex items-center gap-3 px-2">
          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center text-white text-xs font-bold">
            {user?.fullName?.[0] || 'A'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-xs font-semibold truncate">{user?.fullName}</p>
            <p className="text-white/50 text-xs">{user?.role}</p>
          </div>
          <button onClick={handleLogout} title="Logout"
            className="text-white/50 hover:text-red-300 transition-colors">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-64 bg-gradient-to-b from-dark to-primary flex-col shadow-xl">
        <SidebarContent />
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="w-64 bg-gradient-to-b from-dark to-primary flex flex-col shadow-2xl">
            <SidebarContent />
          </div>
          <div className="flex-1 bg-black/50" onClick={() => setSidebarOpen(false)} />
        </div>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="bg-white shadow-sm px-4 sm:px-6 h-16 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <button className="lg:hidden p-2 hover:bg-gray-100 rounded-lg" onClick={() => setSidebarOpen(true)}>
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="font-bold text-dark text-sm sm:text-base">
                {NAV.find(n => n.to === location.pathname)?.label || 'Admin Panel'}
              </h1>
              <p className="text-xs text-gray-400 hidden sm:block">Pragati Coaching Center</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-semibold text-dark">{user?.fullName}</p>
              <p className="text-xs text-gray-400">{user?.role}</p>
            </div>
            <div className="w-9 h-9 bg-gradient-to-br from-primary to-primary-light rounded-xl flex items-center justify-center text-white text-sm font-bold">
              {user?.fullName?.[0] || 'A'}
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
