import React, { useEffect, useState } from 'react'
import { BookOpen, Clock, DollarSign, Users, ChevronDown } from 'lucide-react'
import Navbar  from '../components/Navbar'
import Footer  from '../components/Footer'
import api     from '../services/api'

export default function Courses() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState(null)

  useEffect(() => {
    api.get('/public/courses')
       .then(r => setCourses(r.data.data || []))
       .finally(() => setLoading(false))
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      {/* Hero */}
      <div className="bg-gradient-to-br from-dark to-primary pt-24 pb-16 text-center text-white">
        <h1 className="text-4xl font-black mb-3">Our Courses</h1>
        <p className="text-gray-300 max-w-xl mx-auto">Comprehensive programs designed by experts for every student's goal</p>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-16">
        {loading ? (
          <div className="text-center py-16 text-gray-400">Loading courses...</div>
        ) : (
          <div className="space-y-4">
            {courses.map(c => (
              <div key={c.id} className="bg-white rounded-2xl shadow-md overflow-hidden">
                <button className="w-full text-left p-6 flex items-center justify-between"
                  onClick={() => setExpanded(expanded === c.id ? null : c.id)}>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-light rounded-xl flex items-center justify-center shadow">
                      <BookOpen className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-bold text-dark text-lg">{c.name}</h3>
                      <p className="text-sm text-gray-500">{c.instructor} • {c.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="hidden sm:block font-bold text-primary text-lg">₹{c.fees?.toLocaleString()}</span>
                    <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expanded===c.id ? 'rotate-180':''}`} />
                  </div>
                </button>

                {expanded === c.id && (
                  <div className="px-6 pb-6 border-t bg-gray-50">
                    <div className="pt-4 grid sm:grid-cols-2 gap-6">
                      <div>
                        <p className="text-sm font-semibold text-gray-700 mb-2">Description</p>
                        <p className="text-sm text-gray-600">{c.description}</p>
                      </div>
                      <div className="space-y-3">
                        {[
                          [Clock,       'Duration',    c.duration],
                          [BookOpen,    'Subjects',    c.subjects],
                          [Users,       'Eligibility', c.eligibility],
                          [Clock,       'Schedule',    c.schedule],
                          [DollarSign,  'Annual Fees', `₹${c.fees?.toLocaleString()}`],
                        ].map(([Icon, label, val]) => (
                          <div key={label} className="flex items-start gap-2 text-sm">
                            <Icon className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                            <span className="text-gray-500 min-w-24">{label}:</span>
                            <span className="font-medium text-gray-800">{val}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <button className="btn-primary mt-6 text-sm py-2">Enquire Now →</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}
