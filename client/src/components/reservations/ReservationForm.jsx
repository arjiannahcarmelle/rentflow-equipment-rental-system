
import { useEffect, useState } from 'react'
import { equipmentAPI } from '../../services/api'

const formatCurrency = (amount) =>
  new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    maximumFractionDigits: 0,
  }).format(amount)

function ReservationForm() {
  const [equipment, setEquipment] = useState([])
  const [equipmentId, setEquipmentId] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    async function loadEquipment() {
      try {
        const data = await equipmentAPI.getAll()

        if (!Array.isArray(data)) {
          throw new Error('Unexpected equipment response format.')
        }

        if (active) {
          setEquipment(
            data.filter(
              (item) =>
                item.isActive &&
                item.condition === 'good' &&
                item.totalQuantity > 0
            )
          )
        }
      } catch (err) {
        if (active) setError(err.message)
      } finally {
        if (active) setLoading(false)
      }
    }

    loadEquipment()

    return () => {
      active = false
    }
  }, [])

  const selectedEquipment = equipment.find(
    (item) => item._id === equipmentId
  )

  const rentalDays =
    startDate && endDate && endDate >= startDate
      ? Math.round(
          (Date.parse(`${endDate}T00:00:00Z`) -
            Date.parse(`${startDate}T00:00:00Z`)) /
            86400000
        ) + 1
      : 0

  const estimatedTotal =
    selectedEquipment && rentalDays > 0
      ? selectedEquipment.dailyRate * quantity * rentalDays
      : 0

  return (
    <section className="mx-auto max-w-2xl space-y-6">
      <div>
        <p className="text-sm font-semibold text-indigo-600">
          RENTAL REQUEST
        </p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">
          Reserve Equipment
        </h1>
        <p className="mt-2 text-slate-500">
          Select your equipment and preferred rental dates.
        </p>
      </div>

      <form
        onSubmit={(event) => event.preventDefault()}
        className="space-y-5 rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        {loading && (
          <p role="status" className="text-slate-500">
            Loading equipment...
          </p>
        )}

        {error && (
          <p role="alert" className="text-red-600">
            Unable to load equipment: {error}
          </p>
        )}

        <div>
          <label
            htmlFor="equipment"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Equipment
          </label>
          <select
            id="equipment"
            value={equipmentId}
            onChange={(event) => setEquipmentId(event.target.value)}
            disabled={loading || Boolean(error)}
            className="w-full rounded-lg border border-slate-300 px-4 py-3"
          >
            <option value="">Select equipment</option>
            {equipment.map((item) => (
              <option key={item._id} value={item._id}>
                {item.name} — {formatCurrency(item.dailyRate)}/day
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="quantity"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Quantity
          </label>
          <input
            id="quantity"
            type="number"
            min="1"
            max={selectedEquipment?.totalQuantity ?? 1}
            value={quantity}
            onChange={(event) =>
              setQuantity(Number(event.target.value))
            }
            className="w-full rounded-lg border border-slate-300 px-4 py-3"
          />
          {selectedEquipment && (
            <p className="mt-1 text-xs text-slate-500">
              Total inventory: {selectedEquipment.totalQuantity}
            </p>
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="startDate"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Start Date
            </label>
            <input
              id="startDate"
              type="date"
              value={startDate}
              onChange={(event) => setStartDate(event.target.value)}
              className="w-full rounded-lg border border-slate-300 px-4 py-3"
            />
          </div>

          <div>
            <label
              htmlFor="endDate"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              End Date
            </label>
            <input
              id="endDate"
              type="date"
              min={startDate || undefined}
              value={endDate}
              onChange={(event) => setEndDate(event.target.value)}
              className="w-full rounded-lg border border-slate-300 px-4 py-3"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="notes"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            Additional Notes
          </label>
          <textarea
            id="notes"
            rows="3"
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            placeholder="Optional rental instructions..."
            className="w-full rounded-lg border border-slate-300 px-4 py-3"
          />
        </div>

        <div className="rounded-lg bg-indigo-50 p-4">
          <p className="text-sm text-slate-600">
            Estimated Rental Total
          </p>
          <p className="mt-1 text-2xl font-bold text-indigo-700">
            {formatCurrency(estimatedTotal)}
          </p>
          <p className="mt-1 text-xs text-slate-500">
            {rentalDays} rental day(s). Final amount is calculated
            by the server.
          </p>
        </div>

        <button
          type="submit"
          disabled
          className="w-full cursor-not-allowed rounded-lg bg-slate-300 px-4 py-3 font-semibold text-slate-600"
        >
          Submit Reservation (Coming Soon)
        </button>

        <p className="text-center text-xs text-slate-500">
          Reservation submission will be enabled after
          customer authentication is implemented.
        </p>
      </form>
    </section>
  )
}

export default ReservationForm
