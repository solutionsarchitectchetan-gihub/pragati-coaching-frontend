import React, { useState } from 'react'
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react'
import toast   from 'react-hot-toast'
import Navbar  from '../components/Navbar'
import Footer  from '../components/Footer'

export default function Contact() {
  const [form, setForm] = useState({ name:'', email:'', phone:'', message:'', course:'' })
  const [sending, setSending] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSending(true)
    setTimeout(() => {
      toast.success('Enquiry sent! We will contact you soon.')
      setForm({ name:'', email:'', phone:'', message:'', course:'' })
      setSending(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="bg-gradient-to-br from-dark to-primary pt-24 pb-16 text-center text-white">
        <h1 className="text-4xl font-black mb-3">Contact Us</h1>
        <p className="text-gray-300">We'd love to hear from you — reach out anytime</p>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-12">
        {/* Info */}
        <div>
          <h2 className="text-2xl font-black text-dark mb-6">Get In Touch</h2>
          <div className="space-y-5">
            {[
              [MapPin, 'Address',  '123 Coaching Lane, Education Hub, Jaipur, Rajasthan 302001'],
              [Phone,  'Phone',    '+91 98765 43210 / +91 98765 43211'],
              [Mail,   'Email',    'info@pragaticoaching.com'],
              [Clock,  'Hours',    'Mon–Sat: 7:00 AM – 8:00 PM'],
            ].map(([Icon, label, val]) => (
              <div key={label} className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">{label}</p>
                  <p className="text-gray-700 mt-0.5">{val}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="card">
          <h2 className="text-xl font-bold text-dark mb-6">Send Enquiry</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Full Name *</label>
                <input className="input" placeholder="Your name" required
                  value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Phone *</label>
                <input className="input" placeholder="+91 xxxxx xxxxx" required
                  value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Email</label>
              <input className="input" type="email" placeholder="your@email.com"
                value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Course Interested In</label>
              <select className="input" value={form.course} onChange={e => setForm({...form, course: e.target.value})}>
                <option value="">Select a course</option>
                {['IIT-JEE Foundation','NEET Medical','Class 10 Board Excellence','Class 12 PCM','Foundation (Class 8-10)'].map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Message</label>
              <textarea className="input min-h-[100px] resize-none" placeholder="Tell us about your goals..."
                value={form.message} onChange={e => setForm({...form, message: e.target.value})} />
            </div>
            <button type="submit" disabled={sending}
              className="btn-primary w-full flex items-center justify-center gap-2">
              <Send className="w-4 h-4" />
              {sending ? 'Sending...' : 'Send Enquiry'}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  )
}
