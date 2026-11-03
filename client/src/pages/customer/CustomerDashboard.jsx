
import StatCard from '../../components/ui/StatCard'

function CustomerDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-semibold text-indigo-600">
          CUSTOMER PORTAL
        </p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">
          My Dashboard
        </h1>
        <p className="mt-2 text-slate-500">
          View your equipment rentals and reservation activity.
        </p>
      </div>

      <p className="rounded-lg bg-indigo-50 px-4 py-3 text-sm text-indigo-700">
        Demo dashboard — sample data only.
      </p>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard label="My Reservations" value="5" description="Sample total requests" />
        <StatCard label="Pending Requests" value="2" description="Awaiting approval" />
        <StatCard label="Active Rentals" value="1" description="Currently rented equipment" />
      </div>

      <section className="rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-xl font-semibold text-slate-900">
          Recent Reservations
        </h2>

        <div className="mt-5 space-y-4">
          {[
            ['Sound System Package', 'Approved'],
            ['LED Lighting Set', 'Pending'],
            ['Projector and Screen', 'Completed'],
          ].map(([equipment, status]) => (
            <div
              key={equipment}
              className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4 last:border-0"
            >
              <span className="text-sm font-medium text-slate-700">
                {equipment}
              </span>

              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                {status}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default CustomerDashboard
