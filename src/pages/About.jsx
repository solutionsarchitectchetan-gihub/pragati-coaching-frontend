import React from 'react'
import { Star, Heart, Target, TrendingUp } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const TEAM = [
  { name:'Dr. Amit Sharma', role:'IIT-JEE Physics Expert', exp:'18 yrs', emoji:'👨‍🏫' },
  { name:'Dr. Priya Singh',  role:'NEET Biology Specialist', exp:'14 yrs', emoji:'👩‍🔬' },
  { name:'Mr. Sunil Gupta',  role:'Mathematics Faculty',    exp:'16 yrs', emoji:'👨‍💼' },
  { name:'Mrs. Kavita Verma',role:'Board Exam Coach',       exp:'12 yrs', emoji:'👩‍💼' },
]

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="bg-gradient-to-br from-dark to-primary pt-24 pb-16 text-center text-white">
        <h1 className="text-4xl font-black mb-3">About Pragati</h1>
        <p className="text-gray-300 max-w-xl mx-auto">15+ years of shaping futures, one student at a time</p>
      </div>

      {/* Mission */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-black text-dark mb-4">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Founded in 2009, Pragati Coaching Center was born from a simple belief:
              <strong> every student deserves world-class guidance</strong>, regardless of background.
            </p>
            <p className="text-gray-600 leading-relaxed">
              With 2500+ successful alumni in IITs, AIIMS, and top colleges, we combine
              experienced faculty, smart technology, and personalised mentoring to help every
              student unlock their true potential.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              [Star,      'Excellence',   'Top-rated coaching across Rajasthan', 'from-amber-400 to-orange-500'],
              [Heart,     'Care',         'Personalised attention for every student', 'from-pink-400 to-rose-500'],
              [Target,    'Focus',        'Goal-oriented teaching methodology', 'from-purple-400 to-indigo-500'],
              [TrendingUp,'Results',      '92% students crack their target exam', 'from-cyan-400 to-teal-500'],
            ].map(([Icon, title, desc, color]) => (
              <div key={title} className="card text-center">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center mx-auto mb-3 shadow`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <p className="font-bold text-dark">{title}</p>
                <p className="text-xs text-gray-500 mt-1">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-white py-16">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-black text-dark text-center mb-10">Meet Our Faculty</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM.map(t => (
              <div key={t.name} className="card text-center group">
                <div className="text-5xl mb-4">{t.emoji}</div>
                <h3 className="font-bold text-dark">{t.name}</h3>
                <p className="text-sm text-primary font-medium mt-1">{t.role}</p>
                <p className="text-xs text-gray-400 mt-1">Experience: {t.exp}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
