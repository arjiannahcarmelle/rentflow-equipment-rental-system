
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './components/layout/MainLayout'
import LandingPage from './pages/public/LandingPage'
import LoginPage from './pages/public/LoginPage'
import RegisterPage from './pages/public/RegisterPage'
import CustomerDashboard from './pages/customer/CustomerDashboard'
import StaffDashboard from './pages/staff/StaffDashboard'
import AdminDashboard from './pages/admin/AdminDashboard'
import EquipmentCatalog from './pages/customer/EquipmentCatalog'
import MyReservations from './pages/customer/MyReservations'

function Page({ title, description }) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900">
        {title}
      </h1>
      <p className="mt-3 text-slate-500">
        {description}
      </p>
    </section>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>

        <Route path="/" element={<LandingPage />} />

        <Route path="/login" element={<LoginPage />} />

        <Route path="/register" element={<RegisterPage />} />

        <Route path="/dashboard" element={<CustomerDashboard />} />

        <Route path="/staff" element={<StaffDashboard />} />

        <Route path="/admin" element={<AdminDashboard />} />

        <Route path="/equipment" element={<EquipmentCatalog />} />

        <Route path="/my-reservations" element={<MyReservations />} />

          <Route
            path="*"
            element={<Page title="404 — Page Not Found" description="The requested page does not exist." />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
