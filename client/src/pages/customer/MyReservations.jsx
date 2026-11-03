
const reservations = [
  {
    id: 'RF-001',
    equipment: 'Professional Sound System',
    date: '2026-11-15',
    status: 'Approved',
  },
  {
    id: 'RF-002',
    equipment: 'LED Stage Lighting',
    date: '2026-11-20',
    status: 'Pending',
  },
  {
    id: 'RF-003',
    equipment: 'Projector and Screen',
    date: '2026-10-25',
    status: 'Completed',
  },
]

const statusStyles = {
  Approved: 'bg-emerald-50 text-emerald-700',
  Pending: 'bg-amber-50 text-amber-700',
  Completed: 'bg-slate-100 text-slate-700',
}

function MyReservations() {
  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-semibold text-indigo-600">
          CUSTOMER PORTAL
        </p>

        <h1 className="mt-2 text-3xl font-bold text-slate-900">
          My Reservations
        </h1>

        <p className="mt-2 text-slate-500">
          Review your equipment rental requests and their statuses.
        </p>
      </div>

      <p className="rounded-lg bg-indigo-50 px-4 py-3 text-sm text-indigo-700">
        Demo reservations — records shown below are sample data.
      </p>

      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="w-full min-w-[600px] text-left text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="px-6 py-4 font-semibold">Reservation ID</th>
              <th className="px-6 py-4 font-semibold">Equipment</th>
              <th className="px-6 py-4 font-semibold">Rental Date</th>
              <th className="px-6 py-4 font-semibold">Status</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {reservations.map((reservation) => (
              <tr key={reservation.id}>
                <td className="px-6 py-4 font-medium text-slate-900">
                  {reservation.id}
                </td>

                <td className="px-6 py-4 text-slate-600">
                  {reservation.equipment}
                </td>

                <td className="px-6 py-4 text-slate-600">
                  {reservation.date}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      statusStyles[reservation.status] ??
                      'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {reservation.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default MyReservations
