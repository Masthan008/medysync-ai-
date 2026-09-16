import { useState, useEffect } from 'react'
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, Users, Calendar, CreditCard,
  BarChart3, Settings, LogOut, Bell, Search, Menu, X,
  Stethoscope, Bot, QrCode, ClipboardList,
  Activity, ChevronRight, Pill, ListChecks, UserPlus,
  BedDouble, Video, Heart
} from 'lucide-react'
import { useAuthStore } from '../store/authStore'
import { useDataStore } from '../store/dataStore'
import toast from 'react-hot-toast'

const navByRole = {
  admin: [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard/admin' },
    { label: 'Patients', icon: Users, path: '/dashboard/admin/patients' },
    { label: 'Doctors', icon: Stethoscope, path: '/dashboard/admin/doctors' },
    { label: 'Bed Management', icon: BedDouble, path: '/dashboard/admin/beds' },
    { label: 'Appointments', icon: Calendar, path: '/dashboard/appointments' },
    { label: 'Billing', icon: CreditCard, path: '/dashboard/admin/billing' },
    { label: 'Analytics', icon: BarChart3, path: '/dashboard/admin/analytics' },
    { label: 'Settings', icon: Settings, path: '/dashboard/admin/settings' },
  ],
  doctor: [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard/doctor' },
    { label: 'Appointments', icon: Calendar, path: '/dashboard/doctor/appointments' },
    { label: 'Telehealth Consult', icon: Video, path: '/dashboard/doctor/telehealth' },
    { label: 'My Patients', icon: Users, path: '/dashboard/doctor/patients' },
    { label: 'Prescriptions', icon: Pill, path: '/dashboard/doctor/prescriptions' },
  ],
  receptionist: [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard/receptionist' },
    { label: 'Register Patient', icon: UserPlus, path: '/dashboard/receptionist/register-patient' },
    { label: 'Queue', icon: ListChecks, path: '/dashboard/receptionist/queue' },
    { label: 'Book Appointment', icon: Calendar, path: '/dashboard/receptionist/book' },
    { label: 'Appointments', icon: ClipboardList, path: '/dashboard/appointments' },
  ],
  patient: [
    { label: 'My Dashboard', icon: LayoutDashboard, path: '/dashboard/patient' },
    { label: 'Medical History', icon: Activity, path: '/dashboard/patient/history' },
    { label: 'Vitals Tracker', icon: Heart, path: '/dashboard/patient/vitals' },
    { label: 'My Bills', icon: CreditCard, path: '/dashboard/patient/bills' },
    { label: 'Appointments', icon: Calendar, path: '/dashboard/appointments' },
  ],
  pharmacy: [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard/pharmacy' },
    { label: 'Prescriptions', icon: Pill, path: '/dashboard/pharmacy/prescriptions' },
  ],
}

const sharedNav = [
  { label: 'AI Assistant', icon: Bot, path: '/dashboard/ai-assistant' },
  { label: 'Emergency Wallet', icon: QrCode, path: '/dashboard/emergency-wallet' },
]

const roleColors: Record<string, string> = {
  admin: 'from-blue-600 to-cyan-500',
  doctor: 'from-emerald-600 to-teal-500',
  receptionist: 'from-violet-600 to-purple-500',
  patient: 'from-rose-600 to-pink-500',
  pharmacy: 'from-amber-600 to-yellow-500',
}

const roleBadgeColor: Record<string, string> = {
  admin: 'bg-blue-500/20 text-blue-300',
  doctor: 'bg-emerald-500/20 text-emerald-300',
  receptionist: 'bg-violet-500/20 text-violet-300',
  patient: 'bg-rose-500/20 text-rose-300',
  pharmacy: 'bg-amber-500/20 text-amber-300',
}

export default function DashboardLayout() {
  const { user, logout, checkAuth } = useAuthStore()
  const { notifications, fetchData, markNotificationsRead } = useDataStore()
  const navigate = useNavigate()
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 1024)
  const [notifOpen, setNotifOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const navLinks = navByRole[user?.role || 'patient']
  const unreadCount = notifications.filter(n => !n.read).length

  useEffect(() => {
    checkAuth().then(() => {
      fetchData()
    })
  }, [])

  const handleLogout = () => {
    logout()
    toast.success('Logged out successfully')
    navigate('/login')
  }

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden relative">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed lg:relative w-64 flex-shrink-0 flex flex-col h-full shadow-sidebar z-30"
            style={{ background: 'linear-gradient(180deg, #03045E 0%, #023E8A 60%, #0077B6 100%)' }}
          >
            {/* Logo */}
            <div className="flex items-center gap-3 px-6 py-5 border-b border-white/10">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-400 flex items-center justify-center">
                <Stethoscope size={18} className="text-white" />
              </div>
              <div>
                <h1 className="text-white font-bold text-lg leading-none">MediSync</h1>
                <span className="text-cyan-300 text-xs font-medium">AI Platform</span>
              </div>
            </div>

            {/* User profile */}
            <div className="px-4 py-4 border-b border-white/10">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${roleColors[user?.role || 'patient']} flex items-center justify-center text-white font-bold text-sm shadow-md flex-shrink-0`}>
                  {user?.name?.charAt(0) || 'U'}
                </div>
                <div className="min-w-0">
                  <p className="text-white font-medium text-sm truncate">{user?.name}</p>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${roleBadgeColor[user?.role || 'patient']} capitalize`}>
                    {user?.role}
                  </span>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 py-4 overflow-y-auto custom-scroll space-y-1">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest px-3 pb-2">Main Menu</p>
              {navLinks.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => { if (window.innerWidth < 1024) setSidebarOpen(false); }}
                  end={item.path.endsWith('/dashboard/admin') || item.path.endsWith('/dashboard/doctor') || item.path.endsWith('/dashboard/receptionist') || item.path.endsWith('/dashboard/patient') || item.path.endsWith('/dashboard/pharmacy')}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                      isActive
                        ? 'bg-white/15 text-white border border-white/20'
                        : 'text-slate-300 hover:text-white hover:bg-white/10'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <item.icon size={18} className={isActive ? 'text-cyan-300' : 'text-slate-400 group-hover:text-white'} />
                      <span>{item.label}</span>
                      {isActive && <ChevronRight size={14} className="ml-auto text-cyan-300" />}
                    </>
                  )}
                </NavLink>
              ))}

              <div className="pt-4">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest px-3 pb-2">AI Features</p>
                {sharedNav.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => { if (window.innerWidth < 1024) setSidebarOpen(false); }}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                        isActive
                          ? 'bg-white/15 text-white border border-white/20'
                          : 'text-slate-300 hover:text-white hover:bg-white/10'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <item.icon size={18} className={isActive ? 'text-cyan-300' : 'text-slate-400 group-hover:text-white'} />
                        <span>{item.label}</span>
                        {isActive && <ChevronRight size={14} className="ml-auto text-cyan-300" />}
                      </>
                    )}
                  </NavLink>
                ))}
              </div>
            </nav>

            {/* Logout */}
            <div className="p-3 border-t border-white/10">
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-red-500/20 transition-all duration-200 w-full"
              >
                <LogOut size={18} />
                <span>Sign Out</span>
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center gap-4 z-10 shadow-sm">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-xl hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* Search */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search patients, doctors, appointments..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500 transition-all"
              />
            </div>
          </div>

          <div className="ml-auto flex items-center gap-3">
            {/* Notification bell */}
            <div className="relative">
              <button
                onClick={() => setNotifOpen(!notifOpen)}
                className="relative p-2.5 rounded-xl hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors"
              >
                <Bell size={20} />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              <AnimatePresence>
                {notifOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 overflow-hidden"
                  >
                    <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                      <h3 className="font-semibold text-gray-900">Notifications</h3>
                      <span onClick={() => markNotificationsRead()} className="text-xs text-blue-600 font-medium cursor-pointer hover:underline">Mark all read</span>
                    </div>
                    <div className="max-h-72 overflow-y-auto">
                      {notifications.map(n => (
                        <div key={n.id} className={`px-4 py-3 border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer ${!n.read ? 'bg-blue-50/50' : ''}`}>
                          <div className="flex items-start gap-3">
                            <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${!n.read ? 'bg-blue-500' : 'bg-gray-300'}`} />
                            <div>
                              <p className="text-sm text-gray-700">{n.message}</p>
                              <p className="text-xs text-gray-400 mt-0.5">{n.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                      {notifications.length === 0 && (
                        <p className="text-xs text-gray-400 text-center py-4">No notifications found.</p>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Avatar */}
            <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${roleColors[user?.role || 'patient']} flex items-center justify-center text-white font-bold text-sm cursor-pointer shadow-md`}>
              {user?.name?.charAt(0) || 'U'}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6 bg-slate-50">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  )
}
