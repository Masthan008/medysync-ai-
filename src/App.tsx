import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { lazy, Suspense } from 'react'
import { useAuthStore } from './store/authStore'

// Public pages (lazy loaded)
const LandingPage = lazy(() => import('./pages/public/LandingPage'))
const LoginPage = lazy(() => import('./pages/public/LoginPage'))
const RegisterPage = lazy(() => import('./pages/public/RegisterPage'))
const NotFoundPage = lazy(() => import('./pages/public/NotFoundPage'))

// Dashboard layout
import DashboardLayout from './layouts/DashboardLayout'

// Admin pages
const AdminDashboard = lazy(() => import('./pages/dashboard/admin/AdminDashboard'))
const PatientsPage = lazy(() => import('./pages/dashboard/admin/PatientsPage'))
const DoctorsPage = lazy(() => import('./pages/dashboard/admin/DoctorsPage'))
const BillingPage = lazy(() => import('./pages/dashboard/admin/BillingPage'))
const AnalyticsPage = lazy(() => import('./pages/dashboard/admin/AnalyticsPage'))
const SettingsPage = lazy(() => import('./pages/dashboard/admin/SettingsPage'))
const BedManagement = lazy(() => import('./pages/dashboard/admin/BedManagement'))

// Doctor pages
const DoctorDashboard = lazy(() => import('./pages/dashboard/doctor/DoctorDashboard'))
const DoctorAppointments = lazy(() => import('./pages/dashboard/doctor/DoctorAppointments'))
const DoctorPatients = lazy(() => import('./pages/dashboard/doctor/DoctorPatients'))
const DoctorPrescriptions = lazy(() => import('./pages/dashboard/doctor/DoctorPrescriptions'))
const TelehealthConsult = lazy(() => import('./pages/dashboard/doctor/TelehealthConsult'))

// Receptionist pages
const ReceptionistDashboard = lazy(() => import('./pages/dashboard/receptionist/ReceptionistDashboard'))
const QueueManagement = lazy(() => import('./pages/dashboard/receptionist/QueueManagement'))
const AppointmentBooking = lazy(() => import('./pages/dashboard/receptionist/AppointmentBooking'))
const RegisterPatient = lazy(() => import('./pages/dashboard/receptionist/RegisterPatient'))

// Patient pages
const PatientDashboard = lazy(() => import('./pages/dashboard/patient/PatientDashboard'))
const PatientHistory = lazy(() => import('./pages/dashboard/patient/PatientHistory'))
const PatientBills = lazy(() => import('./pages/dashboard/patient/PatientBills'))
const VitalsTracker = lazy(() => import('./pages/dashboard/patient/VitalsTracker'))
const PharmacyDashboard = lazy(() => import('./pages/dashboard/pharmacy/PharmacyDashboard'))

// Shared pages
const AppointmentsPage = lazy(() => import('./pages/dashboard/shared/AppointmentsPage'))
const AIAssistant = lazy(() => import('./pages/dashboard/shared/AIAssistant'))
const EmergencyWallet = lazy(() => import('./pages/dashboard/shared/EmergencyWallet'))

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore()
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />
}

function RoleRoute({ children, allowedRoles }: { children: React.ReactNode; allowedRoles: string[] }) {
  const { isAuthenticated, user } = useAuthStore()
  if (!isAuthenticated) return <Navigate to="/login" replace />
  if (user && !allowedRoles.includes(user.role)) return <Navigate to="/dashboard" replace />
  return <>{children}</>
}

function DashboardRedirect() {
  const { user } = useAuthStore()
  const roleMap: Record<string, string> = {
    admin: '/dashboard/admin',
    doctor: '/dashboard/doctor',
    receptionist: '/dashboard/receptionist',
    patient: '/dashboard/patient',
    pharmacy: '/dashboard/pharmacy',
  }
  return <Navigate to={roleMap[user?.role || 'patient'] || '/login'} replace />
}

export default function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          style: { fontFamily: 'Inter, sans-serif', fontSize: '14px', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' },
          success: { iconTheme: { primary: '#10B981', secondary: '#fff' } },
          error: { iconTheme: { primary: '#EF4444', secondary: '#fff' } },
        }}
      />
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-screen bg-slate-50">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm font-semibold text-slate-500 font-sans">Loading MediSync AI...</p>
          </div>
        </div>
      }>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Dashboard Routes */}
          <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
            <Route index element={<DashboardRedirect />} />

            {/* Admin */}
            <Route path="admin" element={<RoleRoute allowedRoles={['admin']}><AdminDashboard /></RoleRoute>} />
            <Route path="admin/patients" element={<RoleRoute allowedRoles={['admin']}><PatientsPage /></RoleRoute>} />
            <Route path="admin/doctors" element={<RoleRoute allowedRoles={['admin']}><DoctorsPage /></RoleRoute>} />
            <Route path="admin/billing" element={<RoleRoute allowedRoles={['admin']}><BillingPage /></RoleRoute>} />
            <Route path="admin/analytics" element={<RoleRoute allowedRoles={['admin']}><AnalyticsPage /></RoleRoute>} />
            <Route path="admin/beds" element={<RoleRoute allowedRoles={['admin']}><BedManagement /></RoleRoute>} />
            <Route path="admin/settings" element={<RoleRoute allowedRoles={['admin']}><SettingsPage /></RoleRoute>} />

            {/* Doctor */}
            <Route path="doctor" element={<RoleRoute allowedRoles={['doctor']}><DoctorDashboard /></RoleRoute>} />
            <Route path="doctor/appointments" element={<RoleRoute allowedRoles={['doctor']}><DoctorAppointments /></RoleRoute>} />
            <Route path="doctor/patients" element={<RoleRoute allowedRoles={['doctor']}><DoctorPatients /></RoleRoute>} />
            <Route path="doctor/prescriptions" element={<RoleRoute allowedRoles={['doctor']}><DoctorPrescriptions /></RoleRoute>} />
            <Route path="doctor/telehealth" element={<RoleRoute allowedRoles={['doctor']}><TelehealthConsult /></RoleRoute>} />

            {/* Receptionist */}
            <Route path="receptionist" element={<RoleRoute allowedRoles={['receptionist']}><ReceptionistDashboard /></RoleRoute>} />
            <Route path="receptionist/queue" element={<RoleRoute allowedRoles={['receptionist']}><QueueManagement /></RoleRoute>} />
            <Route path="receptionist/book" element={<RoleRoute allowedRoles={['receptionist']}><AppointmentBooking /></RoleRoute>} />
            <Route path="receptionist/register-patient" element={<RoleRoute allowedRoles={['receptionist']}><RegisterPatient /></RoleRoute>} />

            {/* Patient */}
            <Route path="patient" element={<RoleRoute allowedRoles={['patient']}><PatientDashboard /></RoleRoute>} />
            <Route path="patient/history" element={<RoleRoute allowedRoles={['patient']}><PatientHistory /></RoleRoute>} />
            <Route path="patient/bills" element={<RoleRoute allowedRoles={['patient']}><PatientBills /></RoleRoute>} />
            <Route path="patient/vitals" element={<RoleRoute allowedRoles={['patient']}><VitalsTracker /></RoleRoute>} />

            {/* Pharmacy */}
            <Route path="pharmacy" element={<RoleRoute allowedRoles={['pharmacy']}><PharmacyDashboard /></RoleRoute>} />
            <Route path="pharmacy/prescriptions" element={<RoleRoute allowedRoles={['pharmacy']}><PharmacyDashboard /></RoleRoute>} />

            {/* Shared */}
            <Route path="appointments" element={<ProtectedRoute><AppointmentsPage /></ProtectedRoute>} />
            <Route path="ai-assistant" element={<ProtectedRoute><AIAssistant /></ProtectedRoute>} />
            <Route path="emergency-wallet" element={<ProtectedRoute><EmergencyWallet /></ProtectedRoute>} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
