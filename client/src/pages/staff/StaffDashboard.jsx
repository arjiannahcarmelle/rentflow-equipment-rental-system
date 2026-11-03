
import StatCard from '../../components/ui/StatCard'

function StaffDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-semibold text-indigo-600">
          STAFF PORTAL
        </p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">
          Rental Operations
        </h1>
        <p className="mt-2 text-slate-500">
          Monitor reservations, equipment releases, and returns.
        </p>
      </div>

      <p className="rounded-lg bg-indigo-50 px-4 py-3 text-sm text-indigo-700">
        Demo dashboard — sample data only.
      </p>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard label="Pending Reservations" value="7" description="Awaiting staff review" />
        <StatCard label="Active Rentals" value="12" description="Equipment currently rented" />
        <StatCard label="Expected Returns" value="4" description="Sample upcoming returns" />
      </div>

      <section className="rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-xl font-semibold text-slate-900">
          Operational Tasks
        </h2>

        <div className="mt-5 space-y-3">
          {[
            'Review pending reservation requests',
            'Verify equipment availability',
            'Process equipment checkout',
            'Inspect returned equipment',
          ].map((task) => (
            <div
              key={task}
              className="rounded-lg border border-slate-100 bg-slate-50 px-4 py-3 text-sm text-slate-700"
            >
              {task}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default StaffDashboard
