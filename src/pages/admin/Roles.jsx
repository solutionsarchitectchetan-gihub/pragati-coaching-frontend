import React, { useEffect, useState } from 'react'
import { Plus, Edit2, Trash2, Shield, X } from 'lucide-react'
import toast from 'react-hot-toast'
import api   from '../../services/api'

const ROLE_COLORS = ['from-purple-500 to-indigo-500','from-amber-500 to-orange-500','from-cyan-500 to-teal-500','from-pink-500 to-rose-500','from-green-500 to-emerald-500','from-blue-500 to-sky-500']

export default function Roles() {
  const [roles,   setRoles]   = useState([])
  const [modal,   setModal]   = useState(null)
  const [form,    setForm]    = useState({ name:'', description:'' })
  const [editing, setEditing] = useState(null)
  const [saving,  setSaving]  = useState(false)

  const load = () => api.get('/admin/roles').then(r => setRoles(r.data.data || []))
  useEffect(() => { load() }, [])

  const openAdd  = () => { setForm({ name:'', description:'' }); setEditing(null); setModal(true) }
  const openEdit = (r) => { setForm({ name:r.name, description:r.description||'' }); setEditing(r.id); setModal(true) }
  const close    = () => { setModal(false); setEditing(null); setForm({ name:'', description:'' }) }

  const handleSave = async (e) => {
    e.preventDefault(); setSaving(true)
    try {
      if (editing) {
        await api.put(`/admin/roles/${editing}`, form)
        toast.success('Role updated!')
      } else {
        await api.post('/admin/roles', form)
        toast.success('Role created!')
      }
      close(); load()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed')
    } finally { setSaving(false) }
  }

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete role "${name}"? This may affect users with this role.`)) return
    try {
      await api.delete(`/admin/roles/${id}`)
      toast.success('Role deleted')
      load()
    } catch { toast.error('Cannot delete — role may be in use') }
  }

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-dark">Roles</h2>
          <p className="text-sm text-gray-500">Manage access roles for the system</p>
        </div>
        <button onClick={openAdd} className="btn-primary flex items-center gap-2 text-sm py-2.5">
          <Plus className="w-4 h-4" /> New Role
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {roles.map((role, i) => (
          <div key={role.id} className="bg-white rounded-2xl shadow-sm p-5 border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${ROLE_COLORS[i % ROLE_COLORS.length]} flex items-center justify-center shadow-md`}>
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div className="flex gap-1">
                <button onClick={() => openEdit(role)} className="p-1.5 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors">
                  <Edit2 className="w-4 h-4" />
                </button>
                <button onClick={() => handleDelete(role.id, role.name)} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <h3 className="font-bold text-dark mt-4 text-lg">{role.name}</h3>
            <p className="text-sm text-gray-500 mt-1">{role.description || 'No description'}</p>
            <p className="text-xs text-gray-400 mt-3">
              Created: {role.createdAt ? new Date(role.createdAt).toLocaleDateString() : '—'}
            </p>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="font-black text-dark">{editing ? 'Edit Role' : 'Create New Role'}</h3>
              <button onClick={close} className="p-2 hover:bg-gray-100 rounded-xl"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Role Name *</label>
                <input className="input" placeholder="e.g. MANAGER, TEACHER, COORDINATOR" required
                  disabled={!!editing}
                  value={form.name} onChange={e => setForm(p=>({...p, name: e.target.value.toUpperCase()}))} />
                {!editing && <p className="text-xs text-gray-400 mt-1">Name will be stored in uppercase automatically</p>}
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Description</label>
                <textarea className="input min-h-[100px] resize-none"
                  placeholder="What can users with this role do?"
                  value={form.description} onChange={e => setForm(p=>({...p, description: e.target.value}))} />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="submit" disabled={saving} className="btn-primary flex-1">
                  {saving ? 'Saving...' : editing ? 'Update Role' : 'Create Role'}
                </button>
                <button type="button" onClick={close} className="btn-outline flex-1">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
