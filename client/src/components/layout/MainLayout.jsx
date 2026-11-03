
import { NavLink, Outlet } from 'react-router-dom'

const navigation = [
  { label: 'Home', path: '/' },
  { label: 'Equipment', path: '/equipment' },
  { label: 'My Dashboard', path: '/dashboard' },
  { label: 'My Reservations', path: '/my-reservations' },
  { label: 'Login', path: '/login' },
  { label: 'Register', path: '/register' },
]

function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <nav className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4">
          <NavLink
            to="/"
            className="text-2xl font-bold tracking-tight text-slate-900"
          >
            Rent<span className="text-indigo-600">Flow</span>
          </NavLink>

          <div className="flex items-center gap-5">
            {navigation.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-indigo-600'
                      : 'text-slate-600 hover:text-indigo-600'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </nav>
      </header>

      <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-10">
        <Outlet />
      </main>

      <footer className="border-t border-slate-200 bg-white py-5 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} RentFlow. Equipment Rental
        & Resource Management System.
      </footer>
    </div>
  )
}

export default MainLayout
