import React, { useEffect, useState } from 'react'
import { UserCog, CheckCircle, XCircle } from 'lucide-react'
import api from '../../services/api'

export default function Users() {
  const [users,   setUsers]   = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/admin/users').then(r => setUsers(r.data.data || [])).finally(() => setLoading(false))
  }, [])

  return (
    <div className="space-y-5 animate-fade-in">
      <div>
        <h2 className="text-xl font-black text-dark">Users</h2>
        <p className="text-sm text-gray-500">{users.length} system users</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
              <tr>
                {['User','Email','Role','Status','Joined'].map(h => (
                  <th key={h} className="px-4 py-3 text-left font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr><td colSpan={5} className="text-center py-10 text-gray-400">Loading...</td></tr>
              ) : users.map(u => (
                <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-light rounded-lg flex items-center justify-center text-white text-xs font-bold">
                        {u.fullName?.[0]}
                      </div>
                      <div>
                        <p className="font-semibold text-dark">{u.fullName}</p>
                        <p className="text-xs text-gray-400">@{u.username}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{u.email}</td>
                  <td className="px-4 py-3">
                    <span className="px-2.5 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                      {u.role?.name}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {u.active
                      ? <span className="flex items-center gap-1 text-green-600 text-xs"><CheckCircle className="w-3.5 h-3.5" /> Active</span>
                      : <span className="flex items-center gap-1 text-red-500  text-xs"><XCircle    className="w-3.5 h-3.5" /> Inactive</span>}
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-xs">
                    {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
