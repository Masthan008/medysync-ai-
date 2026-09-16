import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import compression from 'compression'
import { connectWithRetry } from './config/db'
import { seedDatabase } from './db/seeder'

// Import routes
import authRoutes from './routes/auth'
import patientRoutes from './routes/patients'
import doctorRoutes from './routes/doctors'
import appointmentRoutes from './routes/appointments'
import prescriptionRoutes from './routes/prescriptions'
import invoiceRoutes from './routes/invoices'
import notificationRoutes from './routes/notifications'
import bedRoutes from './routes/beds'
import telehealthRoutes from './routes/telehealth'
import vitalsRoutes from './routes/vitals'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(compression())

app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: blob:; connect-src 'self' *; frame-ancestors 'none';"
  )
  res.setHeader('X-Frame-Options', 'DENY')
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin')
  res.setHeader('Permissions-Policy', 'geolocation=(), camera=(), microphone=(), payment=()')
  if (process.env.NODE_ENV === 'production') {
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains')
  }
  next()
})

app.use(cors())
app.use(express.json({ limit: '10mb' }))

// Mounting API Routes
app.use('/api/auth', authRoutes)
app.use('/api/patients', patientRoutes)
app.use('/api/doctors', doctorRoutes)
app.use('/api/appointments', appointmentRoutes)
app.use('/api/prescriptions', prescriptionRoutes)
app.use('/api/invoices', invoiceRoutes)
app.use('/api/notifications', notificationRoutes)
app.use('/api/beds', bedRoutes)
app.use('/api/telehealth', telehealthRoutes)
app.use('/api/vitals', vitalsRoutes)

const staticPath = path.join(__dirname, '../../dist')
app.use(express.static(staticPath))

app.get('*', (req, res) => {
  res.sendFile(path.join(staticPath, 'index.html'))
})

const bootstrap = async () => {
  try {
    await connectWithRetry()
    await seedDatabase()
    
    app.listen(PORT, () => {
      console.log(`MediSync AI Server running on port ${PORT}`)
    })
  } catch (err) {
    console.error('Server failed to bootstrap:', err)
    process.exit(1)
  }
}

bootstrap()
