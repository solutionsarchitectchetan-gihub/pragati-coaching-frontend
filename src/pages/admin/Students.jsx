import React, { useEffect, useState, useCallback } from 'react'
import { Plus, Search, Edit2, Trash2, X, ChevronLeft, ChevronRight, Eye } from 'lucide-react'
import toast from 'react-hot-toast'
import api   from '../../services/api'

const STATUS_OPTIONS = ['ACTIVE','INACTIVE','PASSED_OUT','DROPPED']
const COURSES        = ['IIT-JEE Foundation','NEET Medical','Class 10 Board Excellence','Class 12 PCM','Foundation (Class 8-10)']
const EMPTY_FORM     = { fullName:'', email:'', phone:'', course:'', batch:'', standard:'', address:'', status:'ACTIVE', feesPaid:0, totalFees:0, parentName:'', parentPhone:'', joinDate: new Date().toISOString().split('T')[0] }

export default function Students() {
  const [data,    setData]    = useState({ content:[], totalElements:0, totalPages:0 })
  const [page,    setPage]    = useState(0)
  const [search,  setSearch]  = useState('')
  const [loading, setLoading] = useState(false)
  const [modal,   setModal]   = useState(null)   // null | 'add' | 'edit' | 'view'
  const [form,    setForm]    = useState(EMPTY_FORM)
  const [editing, setEditing] = useState(null)
  const [saving,  setSaving]  = useState(false)

  const load = useCallback(() => {
    setLoading(true)
    const q = search ? `&search=${encodeURIComponent(search)}` : ''
    api.get(`/admin/students?page=${page}&size=10&sort=createdAt${q}`)
       .then(r => setData(r.data.data || {}))
       .finally(() => setLoading(false))
  }, [page, search])

  useEffect(() => { load() }, [load])

  // Debounce search
  useEffect(() => { setPage(0) }, [search])

  const openAdd  = () => { setForm(EMPTY_FORM); setEditing(null); setModal('add') }
  const openEdit = (s) => {
    setForm({ ...s, feesPaid: s.feesPaid||0, totalFees: s.totalFees||0,
              joinDate: s.joinDate || new Date().toISOString().split('T')[0] })
    setEditing(s.id); setModal('edit')
  }
  const openView = (s) => { setForm(s); setModal('view') }
  const closeModal = () => { setModal(null); setEditing(null); setForm(EMPTY_FORM) }

  const handleSave = async (e) => {
    e.preventDefault(); setSaving(true)
    try {
      if (editing) {
        await api.put(`/admin/students/${editing}`, form)
        toast.success('Student updated!')
      } else {
        await api.post('/admin/students', form)
        toast.success('Student added!')
      }
      closeModal(); load()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save')
    } finally { setSaving(false) }
  }

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete student "${name}"?`)) return
    try {
      await api.delete(`/admin/students/${id}`)
      toast.success('Student deleted')
      load()
    } catch { toast.error('Delete failed') }
  }

  const statusBadge = s => {
    const cls = { ACTIVE:'badge-active', INACTIVE:'badge-inactive', PASSED_OUT:'badge-passed', DROPPED:'badge-dropped' }
    return <span className={cls[s] || 'badge-active'}>{s?.replace('_',' ')}</span>
  }

  const f = (key) => (e) => setForm(p => ({ ...p, [key]: e.target.value }))

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-black text-dark">Students</h2>
          <p className="text-sm text-gray-500">{data.totalElements || 0} total students</p>
        </div>
        <button onClick={openAdd} className="btn-primary flex items-center gap-2 text-sm py-2.5">
          <Plus className="w-4 h-4" /> Add Student
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input className="input pl-10" placeholder="Search by name, email, roll, course..."
          value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
              <tr>
                {['Roll No','Name','Course','Batch','Phone','Fees','Status','Actions'].map(h => (
                  <th key={h} className="px-4 py-3 text-left font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr><td colSpan={8} className="text-center py-10 text-gray-400">Loading...</td></tr>
              ) : data.content?.length === 0 ? (
                <tr><td colSpan={8} className="text-center py-10 text-gray-400">No students found</td></tr>
              ) : data.content?.map(s => (
                <tr key={s.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-mono text-xs text-gray-500">{s.rollNumber}</td>
                  <td className="px-4 py-3">
                    <p className="font-semibold text-dark">{s.fullName}</p>
                    <p className="text-xs text-gray-400">{s.email}</p>
                  </td>
                  <td className="px-4 py-3 text-gray-600 max-w-[120px] truncate">{s.course}</td>
                  <td className="px-4 py-3 text-gray-600">{s.batch || '—'}</td>
                  <td className="px-4 py-3 text-gray-600">{s.phone}</td>
                  <td className="px-4 py-3">
                    <p className="text-xs text-green-600 font-semibold">₹{s.feesPaid?.toLocaleString()}</p>
                    <p className="text-xs text-gray-400">of ₹{s.totalFees?.toLocaleString()}</p>
                  </td>
                  <td className="px-4 py-3">{statusBadge(s.status)}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button onClick={() => openView(s)}   title="View" className="p-1.5 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"><Eye   className="w-4 h-4" /></button>
                      <button onClick={() => openEdit(s)}   title="Edit" className="p-1.5 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"><Edit2 className="w-4 h-4" /></button>
                      <button onClick={() => handleDelete(s.id, s.fullName)} title="Delete" className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {data.totalPages > 1 && (
          <div className="px-4 py-3 border-t flex items-center justify-between text-sm text-gray-500">
            <span>Page {page+1} of {data.totalPages}</span>
            <div className="flex gap-2">
              <button disabled={page===0} onClick={() => setPage(p=>p-1)}
                className="p-1.5 rounded-lg hover:bg-gray-100 disabled:opacity-40">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button disabled={page+1>=data.totalPages} onClick={() => setPage(p=>p+1)}
                className="p-1.5 rounded-lg hover:bg-gray-100 disabled:opacity-40">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal — Add / Edit / View */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b sticky top-0 bg-white rounded-t-3xl">
              <h3 className="font-black text-dark text-lg">
                {modal==='add' ? 'Add New Student' : modal==='edit' ? 'Edit Student' : 'Student Details'}
              </h3>
              <button onClick={closeModal} className="p-2 hover:bg-gray-100 rounded-xl"><X className="w-5 h-5" /></button>
            </div>

            <form onSubmit={modal==='view' ? (e=>e.preventDefault()) : handleSave} className="p-6 space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  ['fullName','Full Name','text',true],
                  ['email','Email','email',true],
                  ['phone','Phone','text',true],
                  ['parentName','Parent Name','text',false],
                  ['parentPhone','Parent Phone','text',false],
                ].map(([key, label, type, req]) => (
                  <div key={key}>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">{label}{req&&' *'}</label>
                    <input className="input" type={type} required={req && modal!=='view'}
                      disabled={modal==='view'} value={form[key]||''} onChange={f(key)} />
                  </div>
                ))}

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Course *</label>
                  <select className="input" required disabled={modal==='view'}
                    value={form.course||''} onChange={f('course')}>
                    <option value="">Select</option>
                    {COURSES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                {[['batch','Batch'],['standard','Standard / Class'],['joinDate','Join Date']].map(([key,label]) => (
                  <div key={key}>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">{label}</label>
                    <input className="input" type={key==='joinDate'?'date':'text'}
                      disabled={modal==='view'} value={form[key]||''} onChange={f(key)} />
                  </div>
                ))}

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Status</label>
                  <select className="input" disabled={modal==='view'}
                    value={form.status||'ACTIVE'} onChange={f('status')}>
                    {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s.replace('_',' ')}</option>)}
                  </select>
                </div>

                {[['feesPaid','Fees Paid (₹)'],['totalFees','Total Fees (₹)']].map(([key,label]) => (
                  <div key={key}>
                    <label className="block text-xs font-semibold text-gray-600 mb-1">{label}</label>
                    <input className="input" type="number" min="0"
                      disabled={modal==='view'} value={form[key]||0} onChange={f(key)} />
                  </div>
                ))}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Address</label>
                <textarea className="input min-h-[80px] resize-none" disabled={modal==='view'}
                  value={form.address||''} onChange={f('address')} />
              </div>

              {modal !== 'view' && (
                <div className="flex gap-3 pt-2">
                  <button type="submit" disabled={saving} className="btn-primary flex-1">
                    {saving ? 'Saving...' : modal==='add' ? 'Add Student' : 'Save Changes'}
                  </button>
                  <button type="button" onClick={closeModal} className="btn-outline flex-1">Cancel</button>
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
