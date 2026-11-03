
import { Link } from 'react-router-dom'

const statusStyles = {
  pending: 'bg-amber-50 text-amber-700',
  approved: 'bg-emerald-50 text-emerald-700',
  rejected: 'bg-rose-50 text-rose-700',
  cancelled: 'bg-slate-100 text-slate-600',
  checked_out: 'bg-blue-50 text-blue-700',
  returned: 'bg-slate-100 text-slate-700',
}

const formatStatus = (status) =>
  status
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

function ReservationTable({ reservations }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
      <table className="w-full min-w-[650px] text-left text-sm">
        <thead className="bg-slate-50 text-slate-600">
          <tr>
            <th className="px-6 py-4 font-semibold">Reservation ID</th>
            <th className="px-6 py-4 font-semibold">Equipment</th>
            <th className="px-6 py-4 font-semibold">Rental Dates</th>
            <th className="px-6 py-4 font-semibold">Total</th>
            <th className="px-6 py-4 font-semibold">Status</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100">
          {reservations.map((reservation) => (
            <tr key={reservation._id}>
              <td className="px-6 py-4 font-medium text-slate-900">
                {reservation._id.slice(-8).toUpperCase()}
              </td>

              <td className="px-6 py-4 text-slate-600">
                {reservation.items
                  .map((item) => item.equipment?.name ?? 'Equipment unavailable')
                  .join(', ')}
              </td>

              <td className="px-6 py-4 text-slate-600">
                {new Date(reservation.startDate).toLocaleDateString('en-PH')}
                {' — '}
                {new Date(reservation.endDate).toLocaleDateString('en-PH')}
              </td>

              <td className="px-6 py-4 text-slate-600">
                {new Intl.NumberFormat('en-PH', {
                  style: 'currency',
                  currency: 'PHP',
                }).format(reservation.totalAmount)}
              </td>

              <td className="px-6 py-4">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    statusStyles[reservation.status] ??
                    'bg-slate-100 text-slate-700'
                  }`}
                >
                  {formatStatus(reservation.status)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function MyReservations() {
  // Authentication and customer-specific retrieval are not yet implemented.
  // Do not fetch the unrestricted GET /api/reservations endpoint here.
  const reservations = []
  const loading = false
  const error = ''

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

      <div className="rounded-lg border border-indigo-100 bg-indigo-50 px-5 py-4">
        <p className="font-semibold text-indigo-800">
          Customer authentication required
        </p>
        <p className="mt-1 text-sm text-indigo-700">
          Your personal reservation history will become available
          after secure customer login and account-based retrieval
          are implemented.
        </p>
      </div>

      {loading && (
        <p role="status" className="text-slate-500">
          Loading reservations...
        </p>
      )}

      {error && (
        <p role="alert" className="text-red-600">
          Unable to load reservations: {error}
        </p>
      )}

      {!loading && !error && reservations.length > 0 && (
        <ReservationTable reservations={reservations} />
      )}

      {!loading && !error && reservations.length === 0 && (
        <div className="rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">
            Reservation history not available yet
          </h2>

          <p className="mt-3 text-sm text-slate-500">
            Browse our equipment catalog while customer account
            integration is being developed.
          </p>

          <Link
            to="/equipment"
            className="mt-5 inline-block rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            Browse Equipment
          </Link>
        </div>
      )}
    </div>
  )
}

export default MyReservations
