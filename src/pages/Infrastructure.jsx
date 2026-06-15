import React, { useEffect, useState } from 'react'
import { Monitor, Video, Mic, Wind, BookOpen, ClipboardList,
         Cpu, ShieldCheck, Wifi, Layers } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import api    from '../services/api'

const ICON_MAP = {
  monitor: Monitor, video: Video, mic: Mic, wind: Wind,
  'book-open': BookOpen, 'clipboard-list': ClipboardList,
  cpu: Cpu, 'shield-check': ShieldCheck, wifi: Wifi
}

const COLORS = [
  'from-purple-500 to-indigo-500','from-amber-500 to-orange-500',
  'from-pink-500 to-rose-500','from-cyan-500 to-teal-500',
  'from-green-500 to-emerald-500','from-blue-500 to-sky-500',
  'from-violet-500 to-purple-500','from-red-500 to-orange-500',
]

export default function Infrastructure() {
  const [infra,   setInfra]   = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/public/infrastructure')
       .then(r => setInfra(r.data.data || []))
       .finally(() => setLoading(false))
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero */}
      <div className="bg-gradient-to-br from-dark to-primary pt-24 pb-16 text-center text-white">
        <h1 className="text-4xl font-black mb-3">World-Class Infrastructure</h1>
        <p className="text-gray-300 max-w-xl mx-auto">
          Every facility designed to create the best learning environment for our students
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {loading ? (
          <div className="text-center py-16 text-gray-400">Loading...</div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {infra.map((item, i) => {
              const Icon  = ICON_MAP[item.icon] || Layers
              const color = COLORS[i % COLORS.length]
              return (
                <div key={item.id} className="card group hover:-translate-y-2 transition-all duration-300 cursor-default">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-dark text-lg mb-3">{item.name}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              )
            })}
          </div>
        )}

        {/* CTA Banner */}
        <div className="mt-16 bg-gradient-to-r from-primary to-primary-dark rounded-3xl p-8 sm:p-12 text-center text-white shadow-2xl">
          <h2 className="text-2xl sm:text-3xl font-black mb-3">Experience It Yourself</h2>
          <p className="text-gray-200 mb-6 max-w-lg mx-auto">
            Book a free campus tour and see our state-of-the-art facilities in person
          </p>
          <button className="bg-white text-primary font-bold px-8 py-3 rounded-xl hover:shadow-lg transition-all">
            Book Free Tour →
          </button>
        </div>
      </div>
      <Footer />
    </div>
  )
}
