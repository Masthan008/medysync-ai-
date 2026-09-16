import { Router } from 'express'
import { authenticateToken } from '../middleware/auth'

const router = Router()

interface Bed {
  id: string
  ward: string
  bedNumber: string
  status: 'Available' | 'Occupied' | 'Maintenance'
  patientName?: string
  assignedDoctor?: string
}

let bedsList: Bed[] = [
  { id: 'B01', ward: 'ICU Ward A', bedNumber: 'Bed 101', status: 'Occupied', patientName: 'Aarav Sharma', assignedDoctor: 'Dr. Priya Mehta' },
  { id: 'B02', ward: 'ICU Ward A', bedNumber: 'Bed 102', status: 'Available' },
  { id: 'B03', ward: 'General Ward B', bedNumber: 'Bed 201', status: 'Available' },
  { id: 'B04', ward: 'General Ward B', bedNumber: 'Bed 202', status: 'Maintenance' },
  { id: 'B05', ward: 'Cardiology Ward C', bedNumber: 'Bed 301', status: 'Occupied', patientName: 'Diya Patel', assignedDoctor: 'Dr. Priya Mehta' },
  { id: 'B06', ward: 'Cardiology Ward C', bedNumber: 'Bed 302', status: 'Available' }
]

router.get('/', authenticateToken, (req, res) => {
  res.json(bedsList)
})

router.put('/:id', authenticateToken, (req, res) => {
  const { id } = req.params
  const { status, patientName, assignedDoctor } = req.body
  const bedIndex = bedsList.findIndex(b => b.id === id)
  if (bedIndex !== -1) {
    bedsList[bedIndex] = { ...bedsList[bedIndex], status, patientName, assignedDoctor }
    res.json(bedsList[bedIndex])
  } else {
    res.status(404).json({ error: 'Bed not found' })
  }
})

export default router
