import { useState } from 'react'
import { motion } from 'framer-motion'
import { BedDouble, CheckCircle, AlertTriangle, UserCheck, Shield } from 'lucide-react'

interface Bed {
  id: string
  ward: string
  bedNumber: string
  status: 'Available' | 'Occupied' | 'Maintenance'
  patientName?: string
  assignedDoctor?: string
}

const initialBeds: Bed[] = [
  { id: 'B01', ward: 'ICU Ward A', bedNumber: 'Bed 101', status: 'Occupied', patientName: 'Aarav Sharma', assignedDoctor: 'Dr. Priya Mehta' },
  { id: 'B02', ward: 'ICU Ward A', bedNumber: 'Bed 102', status: 'Available' },
  { id: 'B03', ward: 'General Ward B', bedNumber: 'Bed 201', status: 'Available' },
  { id: 'B04', ward: 'General Ward B', bedNumber: 'Bed 202', status: 'Maintenance' },
  { id: 'B05', ward: 'Cardiology Ward C', bedNumber: 'Bed 301', status: 'Occupied', patientName: 'Diya Patel', assignedDoctor: 'Dr. Priya Mehta' },
  { id: 'B06', ward: 'Cardiology Ward C', bedNumber: 'Bed 302', status: 'Available' }
]

export default function BedManagement() {
  const [beds] = useState<Bed[]>(initialBeds)
  const [filter, setFilter] = useState<string>('All')

  const filteredBeds = beds.filter(b => filter === 'All' || b.status === filter)

  const occupied = beds.filter(b => b.status === 'Occupied').length
  const available = beds.filter(b => b.status === 'Available').length
  const maintenance = beds.filter(b => b.status === 'Maintenance').length

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Hospital Ward & Bed Management</h1>
          <p className="text-sm text-gray-500">Real-time bed occupancy tracking across hospital wards</p>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase">Available Beds</p>
            <p className="text-2xl font-black text-emerald-600 mt-1">{available}</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
            <CheckCircle size={24} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase">Occupied Beds</p>
            <p className="text-2xl font-black text-blue-600 mt-1">{occupied}</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
            <UserCheck size={24} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase">Under Maintenance</p>
            <p className="text-2xl font-black text-amber-600 mt-1">{maintenance}</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
            <AlertTriangle size={24} />
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2">
        {['All', 'Available', 'Occupied', 'Maintenance'].map(status => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              filter === status ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Bed Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredBeds.map(b => (
          <motion.div key={b.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-400 uppercase">{b.ward}</span>
              <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                b.status === 'Available' ? 'bg-emerald-100 text-emerald-700' :
                b.status === 'Occupied' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'
              }`}>
                {b.status}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
                <BedDouble size={20} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">{b.bedNumber}</h3>
                <p className="text-xs text-gray-500">ID: {b.id}</p>
              </div>
            </div>
            {b.status === 'Occupied' ? (
              <div className="pt-2 border-t border-gray-100 text-xs space-y-1">
                <p className="text-gray-600"><b>Patient:</b> {b.patientName}</p>
                <p className="text-gray-500"><b>Doctor:</b> {b.assignedDoctor}</p>
              </div>
            ) : (
              <div className="pt-2 border-t border-gray-100 text-xs text-gray-400 flex items-center gap-1">
                <Shield size={14} /> Ready for admission
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}
