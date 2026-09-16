import { pool } from '../config/db'
import bcrypt from 'bcryptjs'

export const seedDatabase = async () => {
  const client = await pool.connect()
  try {
    const { rows } = await client.query('SELECT COUNT(*) FROM users')
    const count = parseInt(rows[0].count)
    if (count > 0) {
      console.log('Database already has data. Skipping seeder.')
      return
    }

    console.log('Database is empty. Initializing system setup records...')

    await client.query('BEGIN')

    // 1. Seed Departments
    const depts = [
      { id: 'DEP01', name: 'Cardiology', icon: '❤️', color: 'red' },
      { id: 'DEP02', name: 'Endocrinology', icon: '🔬', color: 'blue' },
      { id: 'DEP03', name: 'Orthopedics', icon: '🦴', color: 'orange' },
      { id: 'DEP04', name: 'Neurology', icon: '🧠', color: 'purple' }
    ]

    for (const d of depts) {
      await client.query(
        'INSERT INTO departments (id, name, icon, color) VALUES ($1, $2, $3, $4)',
        [d.id, d.name, d.icon, d.color]
      )
    }

    // 2. Seed Default Accounts
    const passwordHashes = {
      admin: bcrypt.hashSync('admin123', 10),
      doctor: bcrypt.hashSync('doctor123', 10),
      recept: bcrypt.hashSync('recept123', 10),
      patient: bcrypt.hashSync('patient123', 10),
      pharmacy: bcrypt.hashSync('pharmacy123', 10)
    }

    const users = [
      { id: 'U001', name: 'Dr. Admin Singh', email: 'admin@medisync.ai', password_hash: passwordHashes.admin, role: 'admin', phone: '+91 99999 88888' },
      { id: 'D001', name: 'Dr. Priya Mehta', email: 'doctor@medisync.ai', password_hash: passwordHashes.doctor, role: 'doctor', phone: '+91 99887 76655' },
      { id: 'U003', name: 'Anjali Sharma', email: 'receptionist@medisync.ai', password_hash: passwordHashes.recept, role: 'receptionist', phone: '+91 99112 23344' },
      { id: 'P001', name: 'Aarav Sharma', email: 'patient@medisync.ai', password_hash: passwordHashes.patient, role: 'patient', phone: '+91 98765 43210' },
      { id: 'U005', name: 'MediSync Pharmacy', email: 'pharmacy@medisync.ai', password_hash: passwordHashes.pharmacy, role: 'pharmacy', phone: '+91 99009 90099' }
    ]

    for (const u of users) {
      await client.query(
        'INSERT INTO users (id, name, email, password_hash, role, phone) VALUES ($1, $2, $3, $4, $5, $6)',
        [u.id, u.name, u.email, u.password_hash, u.role, u.phone]
      )
    }

    // 3. Seed Doctor profile
    await client.query(
      'INSERT INTO doctors (id, specialty, department_id, experience, consultation_fee, qualifications) VALUES ($1, $2, $3, $4, $5, $6)',
      ['D001', 'Cardiology', 'DEP01', '15 years', 800, 'MBBS, MD (Cardiology)']
    )

    await client.query("UPDATE departments SET head_doctor_id = 'D001' WHERE id = 'DEP01'")

    // 4. Seed Patient profile
    await client.query(
      'INSERT INTO patients (id, age, gender, blood_group, condition, address, allergies, insurance, status, doctor, department, last_visit, appointment_count) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)',
      ['P001', 34, 'Male', 'O+', 'Hypertension', 'Mumbai, Maharashtra', 'Penicillin', 'Star Health', 'Active', 'Dr. Priya Mehta', 'Cardiology', '2026-05-10', 1]
    )

    await client.query('COMMIT')
    console.log('Seeder completed. Clean production setup initialized.')
  } catch (err) {
    await client.query('ROLLBACK')
    console.error('Failed to seed database:', err)
  } finally {
    client.release()
  }
}
