import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider, useAuth } from './context/AuthContext'

// Public pages
import Home           from './pages/Home'
import Courses        from './pages/Courses'
import Infrastructure from './pages/Infrastructure'
import About          from './pages/About'
import Contact        from './pages/Contact'
import Login          from './pages/Login'

// Admin pages
import AdminLayout  from './pages/admin/AdminLayout'
import Dashboard    from './pages/admin/Dashboard'
import Students     from './pages/admin/Students'
import Roles        from './pages/admin/Roles'
import Users        from './pages/admin/Users'

function ProtectedRoute({ children }) {
  const { user } = useAuth()
  return user ? children : <Navigate to="/login" replace />
}

function AdminRoute({ children }) {
  const { user } = useAuth()
  if (!user)               return <Navigate to="/login"    replace />
  if (user.role !== 'ADMIN') return <Navigate to="/admin/dashboard" replace />
  return children
}

export default function App() {
  return (
    <AuthProvider>
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      <Routes>
        {/* Public */}
        <Route path="/"              element={<Home />} />
        <Route path="/courses"       element={<Courses />} />
        <Route path="/infrastructure" element={<Infrastructure />} />
        <Route path="/about"         element={<About />} />
        <Route path="/contact"       element={<Contact />} />
        <Route path="/login"         element={<Login />} />

        {/* Admin (protected) */}
        <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
          <Route index                element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard"     element={<Dashboard />} />
          <Route path="students"      element={<Students />} />
          <Route path="roles"         element={<AdminRoute><Roles /></AdminRoute>} />
          <Route path="users"         element={<AdminRoute><Users /></AdminRoute>} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  )
}
