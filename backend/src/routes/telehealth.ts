import { Router } from 'express'
import { authenticateToken } from '../middleware/auth'

const router = Router()

interface TelehealthSession {
  id: string
  appointmentId: string
  doctorName: string
  patientName: string
  roomUrl: string
  status: 'Scheduled' | 'Active' | 'Completed'
  startTime: string
}

let sessionsList: TelehealthSession[] = [
  { id: 'TH01', appointmentId: 'A001', doctorName: 'Dr. Priya Mehta', patientName: 'Aarav Sharma', roomUrl: 'https://meet.medisync.ai/room-cardio-01', status: 'Scheduled', startTime: '10:00 AM' }
]

router.get('/', authenticateToken, (req, res) => {
  res.json(sessionsList)
})

router.post('/', authenticateToken, (req, res) => {
  const { appointmentId, doctorName, patientName } = req.body
  const newSession: TelehealthSession = {
    id: `TH0${sessionsList.length + 1}`,
    appointmentId,
    doctorName,
    patientName,
    roomUrl: `https://meet.medisync.ai/room-${Math.random().toString(36).substring(7)}`,
    status: 'Scheduled',
    startTime: 'Now'
  }
  sessionsList.push(newSession)
  res.status(201).json(newSession)
})

export default router
