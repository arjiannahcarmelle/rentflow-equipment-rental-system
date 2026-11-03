
import StatCard from '../../components/ui/StatCard'

function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-semibold text-indigo-600">
          ADMIN PORTAL
        </p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">
          Business Overview
        </h1>
        <p className="mt-2 text-slate-500">
          Monitor equipment inventory, reservations, and system activity.
        </p>
      </div>

      <p className="rounded-lg bg-indigo-50 px-4 py-3 text-sm text-indigo-700">
        Demo dashboard — sample data only.
      </p>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Equipment" value="128" description="Sample inventory count" />
        <StatCard label="Total Reservations" value="36" description="Sample reservation count" />
        <StatCard label="Active Rentals" value="18" description="Sample active rentals" />
        <StatCard label="Registered Users" value="24" description="Sample user count" />
      </div>

      <section className="rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-xl font-semibold text-slate-900">
          Management Modules
        </h2>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {[
            ['Equipment Management', 'Manage rental inventory and equipment details.'],
            ['Reservation Management', 'Review and monitor rental reservations.'],
            ['User Management', 'Manage customer and staff accounts.'],
            ['Reports & Analytics', 'Review rental activity and business performance.'],
          ].map(([title, description]) => (
            <div
              key={title}
              className="rounded-lg border border-slate-200 p-5"
            >
              <h3 className="font-semibold text-slate-900">
                {title}
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                {description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default AdminDashboard
