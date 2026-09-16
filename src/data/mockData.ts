// Essential default data for MediSync AI System

export const mockPatients = [
  { id: 'P001', name: 'Aarav Sharma', age: 34, gender: 'Male', phone: '+91 98765 43210', email: 'patient@medisync.ai', bloodGroup: 'O+', condition: 'Hypertension', status: 'Active', lastVisit: '2026-05-10', doctor: 'Dr. Priya Mehta', department: 'Cardiology', address: 'Mumbai, Maharashtra', allergies: 'Penicillin', insurance: 'Star Health', appointmentCount: 5, photo: null },
  { id: 'P002', name: 'Diya Patel', age: 28, gender: 'Female', phone: '+91 87654 32109', email: 'diya.patel@medisync.ai', bloodGroup: 'A+', condition: 'Diabetes Type 2', status: 'Active', lastVisit: '2026-05-12', doctor: 'Dr. Rajan Nair', department: 'Endocrinology', address: 'Ahmedabad, Gujarat', allergies: 'Sulfa drugs', insurance: 'HDFC ERGO', appointmentCount: 3, photo: null }
];

export const mockDoctors = [
  { id: 'D001', name: 'Dr. Priya Mehta', specialty: 'Cardiology', department: 'Cardiology', experience: '15 years', phone: '+91 99887 76655', email: 'doctor@medisync.ai', status: 'Available', patients: 142, rating: 4.9, consultationFee: 800, schedule: 'Mon-Fri 9AM-5PM', qualifications: 'MBBS, MD (Cardiology)', photo: null }
];

export const mockAppointments = [
  { id: 'A001', patientName: 'Aarav Sharma', patientId: 'P001', doctorName: 'Dr. Priya Mehta', doctorId: 'D001', date: '2026-05-16', time: '09:30', type: 'Follow-up', status: 'Confirmed', department: 'Cardiology', priority: 'Normal', notes: 'Routine checkup', fee: 800 }
];

export const mockInvoices = [
  { id: 'INV-2026-0001', patientName: 'Aarav Sharma', patientId: 'P001', date: '2026-05-10', dueDate: '2026-05-20', amount: 800, paid: 800, status: 'Paid', services: [{ name: 'Consultation', amount: 800 }] }
];

export const mockDepartments = [
  { id: 'DEP01', name: 'Cardiology', head: 'Dr. Priya Mehta', doctors: 1, patients: 1, icon: '❤️', color: 'red' },
  { id: 'DEP02', name: 'Endocrinology', head: 'Dr. Rajan Nair', doctors: 1, patients: 1, icon: '🔬', color: 'blue' }
];

export const mockRevenueData = [
  { month: 'Mar', revenue: 120000, expenses: 80000, patients: 150 },
  { month: 'Apr', revenue: 150000, expenses: 90000, patients: 180 },
  { month: 'May', revenue: 180000, expenses: 95000, patients: 210 }
];

export const mockAppointmentStats = [
  { day: 'Mon', appointments: 10, completed: 10 },
  { day: 'Tue', appointments: 12, completed: 11 },
  { day: 'Wed', appointments: 15, completed: 14 }
];

export const mockDepartmentRevenue = [
  { name: 'Cardiology', value: 60, color: '#EF4444' },
  { name: 'Endocrinology', value: 40, color: '#3B82F6' }
];

export const mockNotifications = [
  { id: 1, type: 'appointment', message: 'System initialized successfully', time: 'Just now', read: false, icon: 'system' }
];

export const mockPrescriptions = [
  { id: 'RX001', patientId: 'P001', patientName: 'Aarav Sharma', doctorName: 'Dr. Priya Mehta', date: '2026-05-10', medications: [{ name: 'Amlodipine', dosage: '5mg', frequency: 'Once daily', duration: '30 days' }], notes: 'Monitor blood pressure regularly.' }
];

export const adminStats = {
  totalPatients: 2,
  totalDoctors: 1,
  todayAppointments: 1,
  monthlyRevenue: 180000,
  pendingBills: 0,
  emergencyCases: 0,
  bedOccupancy: 45,
  avgWaitTime: 12,
};
