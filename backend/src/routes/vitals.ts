import { Router } from 'express'
import { authenticateToken } from '../middleware/auth'

const router = Router()

interface VitalEntry {
  id: number
  patientId: string
  bloodPressure: string
  heartRate: number
  temperature: number
  spo2: number
  recordedAt: string
}

let vitalsLog: VitalEntry[] = [
  { id: 1, patientId: 'P001', bloodPressure: '120/80', heartRate: 72, temperature: 98.6, spo2: 99, recordedAt: '2026-05-16 09:00' },
  { id: 2, patientId: 'P001', bloodPressure: '124/82', heartRate: 75, temperature: 98.4, spo2: 98, recordedAt: '2026-05-16 12:00' }
]

router.get('/:patientId', authenticateToken, (req, res) => {
  const { patientId } = req.params
  const patientVitals = vitalsLog.filter(v => v.patientId === patientId)
  res.json(patientVitals)
})

router.post('/', authenticateToken, (req, res) => {
  const { patientId, bloodPressure, heartRate, temperature, spo2 } = req.body
  const newVital: VitalEntry = {
    id: vitalsLog.length + 1,
    patientId,
    bloodPressure,
    heartRate: Number(heartRate),
    temperature: Number(temperature),
    spo2: Number(spo2),
    recordedAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
  }
  vitalsLog.push(newVital)
  res.status(201).json(newVital)
})

export default router
