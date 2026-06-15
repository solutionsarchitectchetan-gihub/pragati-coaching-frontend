import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, Users, Trophy, Star, ArrowRight, CheckCircle,
         Monitor, Video, Mic, Wind } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import api    from '../services/api'

const STATS = [
  { icon: Users,  value: '2500+', label: 'Students Enrolled',  color: 'from-purple-500 to-indigo-500' },
  { icon: Trophy, value: '92%',   label: 'Success Rate',       color: 'from-amber-500  to-orange-500' },
  { icon: Star,   value: '15+',   label: 'Years of Excellence', color: 'from-pink-500   to-rose-500'   },
  { icon: BookOpen,value:'25+',   label: 'Expert Faculty',      color: 'from-cyan-500   to-teal-500'   },
]

const INFRA_ICONS = { monitor: Monitor, video: Video, mic: Mic, wind: Wind }

export default function Home() {
  const [courses, setCourses] = useState([])
  const [infra,   setInfra]   = useState([])

  useEffect(() => {
    api.get('/public/courses').then(r  => setCourses(r.data.data?.slice(0, 3) || []))
    api.get('/public/infrastructure').then(r => setInfra(r.data.data?.slice(0, 4) || []))
  }, [])

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-dark via-[#2d1b7e] to-primary overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-20  right-10  w-80 h-80 bg-primary-light/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-60 h-60 bg-accent/20       rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <span className="inline-flex items-center gap-2 bg-white/10 text-white text-sm font-medium px-4 py-1.5 rounded-full mb-6 backdrop-blur">
                <Star className="w-4 h-4 text-accent" fill="currentColor" /> Rajasthan's #1 Coaching Institute
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
                Shape Your
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-accent to-yellow-300">
                  Future Today
                </span>
              </h1>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                Welcome to <strong className="text-white">Pragati Coaching Center</strong> — where 15+ years of expert
                guidance meets modern teaching for IIT-JEE, NEET, and Board exams.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/courses"    className="btn-primary bg-accent hover:bg-accent-dark text-dark font-bold">
                  Explore Courses <ArrowRight className="w-4 h-4 inline ml-1" />
                </Link>
                <Link to="/contact" className="btn-outline border-white text-white hover:bg-white hover:text-dark">
                  Enroll Now
                </Link>
              </div>
              <div className="flex flex-wrap gap-6 mt-10">
                {['Free Demo Class','Expert Faculty','Results Guaranteed'].map(t => (
                  <div key={t} className="flex items-center gap-2 text-sm text-gray-300">
                    <CheckCircle className="w-4 h-4 text-green-400" /> {t}
                  </div>
                ))}
              </div>
            </div>

            {/* Floating card */}
            <div className="hidden lg:flex justify-center animate-float">
              <div className="relative">
                <div className="w-80 h-80 bg-gradient-to-br from-white/10 to-white/5 rounded-3xl backdrop-blur border border-white/20 shadow-2xl flex items-center justify-center">
                  <div className="text-center text-white p-8">
                    <GraduationCap className="w-16 h-16 mx-auto mb-4 text-accent" />
                    <p className="text-2xl font-bold">100% Dedication</p>
                    <p className="text-gray-300 mt-2">Every student matters</p>
                  </div>
                </div>
                {/* Floating badges */}
                <div className="absolute -top-4 -right-4 bg-accent text-dark text-xs font-bold px-3 py-2 rounded-xl shadow-lg">
                  🏆 Top Rated
                </div>
                <div className="absolute -bottom-4 -left-4 bg-green-500 text-white text-xs font-bold px-3 py-2 rounded-xl shadow-lg">
                  ✅ Trusted by 2500+
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {STATS.map(({ icon: Icon, value, label, color }) => (
              <div key={label} className="card text-center group cursor-default">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center mx-auto mb-4 shadow-md group-hover:scale-110 transition-transform`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <p className="text-3xl font-black text-dark">{value}</p>
                <p className="text-sm text-gray-500 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-primary font-semibold text-sm uppercase tracking-wide">What We Teach</span>
            <h2 className="text-3xl lg:text-4xl font-black text-dark mt-2">Our Featured Courses</h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">Expert-designed curricula to help you ace every exam</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {courses.map(c => (
              <div key={c.id} className="card group hover:-translate-y-1 transition-transform">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <BookOpen className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-bold text-dark text-lg mb-2">{c.name}</h3>
                <p className="text-sm text-gray-500 mb-4 line-clamp-2">{c.description}</p>
                <div className="flex justify-between text-xs text-gray-400 border-t pt-4 mt-auto">
                  <span>⏱ {c.duration}</span>
                  <span className="font-semibold text-primary">₹{c.fees?.toLocaleString()}/yr</span>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/courses" className="btn-outline">View All Courses →</Link>
          </div>
        </div>
      </section>

      {/* Infrastructure preview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-primary font-semibold text-sm uppercase tracking-wide">World-Class Facilities</span>
            <h2 className="text-3xl lg:text-4xl font-black text-dark mt-2">State-of-the-Art Infrastructure</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {infra.map(i => {
              const Icon = INFRA_ICONS[i.icon] || Monitor
              return (
                <div key={i.id} className="card text-center group">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-light rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-md">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-dark mb-2">{i.name}</h3>
                  <p className="text-xs text-gray-500 line-clamp-2">{i.desc}</p>
                </div>
              )
            })}
          </div>
          <div className="text-center mt-10">
            <Link to="/infrastructure" className="btn-outline">See Full Infrastructure →</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

function GraduationCap(props) {
  return <BookOpen {...props} />
}
