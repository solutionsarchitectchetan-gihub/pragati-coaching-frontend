import React, { useEffect, useState } from 'react'
import { Users, TrendingUp, BookOpen, AlertCircle,
         UserCheck, UserX, GraduationCap } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid,
         Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts'
import api from '../../services/api'

const COLORS = ['#6C3EF4','#10B981','#F59E0B','#EF4444']

export default function Dashboard() {
  const [stats,   setStats]   = useState(null)
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      api.get('/admin/students/stats'),
      api.get('/public/courses'),
    ]).then(([s, c]) => {
      setStats(s.data.data)
      setCourses(c.data.data || [])
    }).finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="flex items-center justify-center h-48 text-gray-400">Loading dashboard...</div>

  const pieData = stats ? [
    { name:'Active',     value: stats.active     || 0 },
    { name:'Inactive',   value: stats.inactive   || 0 },
    { name:'Passed Out', value: stats.passedOut  || 0 },
  ] : []

  const barData = courses.slice(0,5).map(c => ({
    name: c.name?.split(' ')[0],
    fees: c.fees
  }))

  const STAT_CARDS = [
    { icon: Users,       label: 'Total Students',   value: stats?.total     || 0, color: 'from-purple-500 to-indigo-500', bg: 'bg-purple-50' },
    { icon: UserCheck,   label: 'Active Students',  value: stats?.active    || 0, color: 'from-emerald-500 to-teal-500', bg: 'bg-emerald-50' },
    { icon: UserX,       label: 'Inactive',         value: stats?.inactive  || 0, color: 'from-red-400 to-rose-500',     bg: 'bg-red-50'    },
    { icon: GraduationCap,label:'Passed Out',       value: stats?.passedOut || 0, color: 'from-amber-400 to-orange-500', bg: 'bg-amber-50'  },
  ]

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-xl font-black text-dark">Welcome back 👋</h2>
        <p className="text-sm text-gray-500">Here's what's happening at Pragati today</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STAT_CARDS.map(({ icon: Icon, label, value, color, bg }) => (
          <div key={label} className={`${bg} rounded-2xl p-5 border border-white shadow-sm`}>
            <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-3 shadow`}>
              <Icon className="w-5 h-5 text-white" />
            </div>
            <p className="text-2xl font-black text-dark">{value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Bar chart */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h3 className="font-bold text-dark mb-4">Course Fees Overview</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" tick={{ fontSize:12 }} />
              <YAxis tick={{ fontSize:12 }} />
              <Tooltip formatter={v => [`₹${v.toLocaleString()}`, 'Annual Fee']} />
              <Bar dataKey="fees" fill="#6C3EF4" radius={[6,6,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie chart */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h3 className="font-bold text-dark mb-4">Student Status Distribution</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" outerRadius={80}
                dataKey="value" label={({ name, percent }) => `${name} ${(percent*100).toFixed(0)}%`}
                labelLine={false}>
                {pieData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Quick info */}
      <div className="bg-gradient-to-r from-primary to-primary-dark rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-lg">Pragati Coaching Center</h3>
            <p className="text-white/70 text-sm">Admin Dashboard — Manage students, roles and more</p>
          </div>
          <div className="bg-white/20 rounded-xl p-4 text-center">
            <p className="text-2xl font-black">{courses.length}</p>
            <p className="text-xs text-white/70">Active Courses</p>
          </div>
        </div>
      </div>
    </div>
  )
}
