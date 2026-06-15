import React from 'react'
import { Link } from 'react-router-dom'
import { GraduationCap, Phone, Mail, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-dark text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-primary to-primary-light rounded-xl flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-white font-bold text-sm">Pragati</p>
                <p className="text-gray-400 text-xs -mt-0.5">Coaching Center</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Empowering students since 2009. 15+ years of excellence in academic coaching.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {[['/', 'Home'], ['/courses', 'Courses'], ['/infrastructure', 'Infrastructure'], ['/about', 'About Us'], ['/contact', 'Contact']].map(([to, label]) => (
                <li key={to}><Link to={to} className="hover:text-primary-light transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h4 className="text-white font-semibold mb-4">Our Courses</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              {['IIT-JEE Foundation','NEET Medical','Class 10 Board','Class 12 PCM','Foundation (8–10)'].map(c => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-primary-light mt-0.5 shrink-0" />
                <span>123 Coaching Lane, Education Hub, Jaipur, Rajasthan 302001</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary-light shrink-0" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary-light shrink-0" />
                <span>info@pragaticoaching.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500">
          <p>© 2024 Pragati Coaching Center. All rights reserved.</p>
          <p className="mt-2 sm:mt-0">Built with ❤️ for students</p>
        </div>
      </div>
    </footer>
  )
}
