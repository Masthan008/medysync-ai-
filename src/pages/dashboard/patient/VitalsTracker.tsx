import { useState } from 'react'
import { Activity, Heart, Thermometer, Droplet, Plus } from 'lucide-react'

interface VitalEntry {
  id: number
  bloodPressure: string
  heartRate: number
  temperature: number
  spo2: number
  recordedAt: string
}

const initialVitals: VitalEntry[] = [
  { id: 1, bloodPressure: '120/80', heartRate: 72, temperature: 98.6, spo2: 99, recordedAt: '2026-05-16 09:00' },
  { id: 2, bloodPressure: '122/81', heartRate: 74, temperature: 98.4, spo2: 98, recordedAt: '2026-05-15 18:30' },
]

export default function VitalsTracker() {
  const [vitals, setVitals] = useState<VitalEntry[]>(initialVitals)
  const [bp, setBp] = useState('')
  const [hr, setHr] = useState('')
  const [temp, setTemp] = useState('')
  const [spo2, setSpo2] = useState('')

  const handleAddVital = (e: React.FormEvent) => {
    e.preventDefault()
    if (!bp || !hr) return
    const newVital: VitalEntry = {
      id: vitals.length + 1,
      bloodPressure: bp,
      heartRate: Number(hr),
      temperature: Number(temp) || 98.6,
      spo2: Number(spo2) || 99,
      recordedAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
    }
    setVitals([newVital, ...vitals])
    setBp('')
    setHr('')
    setTemp('')
    setSpo2('')
  }

  const latest = vitals[0] || initialVitals[0]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-gray-900 tracking-tight">Patient Vitals & Biometrics</h1>
        <p className="text-sm text-gray-500">Track and monitor your daily vital signs</p>
      </div>

      {/* Latest Vitals Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase">Blood Pressure</p>
            <p className="text-2xl font-black text-blue-600 mt-1">{latest.bloodPressure}</p>
            <p className="text-[10px] text-gray-400">mmHg</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Activity size={20} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase">Heart Rate</p>
            <p className="text-2xl font-black text-rose-600 mt-1">{latest.heartRate}</p>
            <p className="text-[10px] text-gray-400">BPM</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
            <Heart size={20} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase">Body Temp</p>
            <p className="text-2xl font-black text-amber-600 mt-1">{latest.temperature}°F</p>
            <p className="text-[10px] text-gray-400">Fahrenheit</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Thermometer size={20} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase">Oxygen (SpO2)</p>
            <p className="text-2xl font-black text-teal-600 mt-1">{latest.spo2}%</p>
            <p className="text-[10px] text-gray-400">Blood Oxygen</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
            <Droplet size={20} />
          </div>
        </div>
      </div>

      {/* Add New Vital Reading */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
        <h3 className="font-bold text-gray-900 text-base">Log New Vital Reading</h3>
        <form onSubmit={handleAddVital} className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div>
            <label className="text-xs font-bold text-gray-500 mb-1 block">Blood Pressure</label>
            <input type="text" placeholder="120/80" value={bp} onChange={e => setBp(e.target.value)} className="form-input text-xs" />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-500 mb-1 block">Heart Rate (BPM)</label>
            <input type="number" placeholder="72" value={hr} onChange={e => setHr(e.target.value)} className="form-input text-xs" />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-500 mb-1 block">Temperature (°F)</label>
            <input type="number" step="0.1" placeholder="98.6" value={temp} onChange={e => setTemp(e.target.value)} className="form-input text-xs" />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-500 mb-1 block">SpO2 (%)</label>
            <input type="number" placeholder="99" value={spo2} onChange={e => setSpo2(e.target.value)} className="form-input text-xs" />
          </div>
          <div className="sm:col-span-4 flex justify-end">
            <button type="submit" className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 transition-all flex items-center gap-2">
              <Plus size={16} /> Record Reading
            </button>
          </div>
        </form>
      </div>

      {/* Vitals Log History */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <h3 className="font-bold text-gray-900 text-sm">Vitals Log History</h3>
        </div>
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-gray-500 font-bold border-b border-gray-100">
            <tr>
              <th className="p-3">Recorded Time</th>
              <th className="p-3">Blood Pressure</th>
              <th className="p-3">Heart Rate</th>
              <th className="p-3">Temperature</th>
              <th className="p-3">SpO2</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {vitals.map(v => (
              <tr key={v.id} className="hover:bg-slate-50">
                <td className="p-3 font-medium text-gray-900">{v.recordedAt}</td>
                <td className="p-3 text-blue-600 font-bold">{v.bloodPressure}</td>
                <td className="p-3 text-rose-600 font-bold">{v.heartRate} BPM</td>
                <td className="p-3 text-amber-600 font-bold">{v.temperature}°F</td>
                <td className="p-3 text-teal-600 font-bold">{v.spo2}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
