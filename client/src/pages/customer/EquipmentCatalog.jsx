
import { useEffect, useState } from 'react'
import { equipmentAPI } from '../../services/api'

function EquipmentCatalog() {
  const [equipment, setEquipment] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    async function loadEquipment() {
      try {
        const data = await equipmentAPI.getAll()

        if (active) {
          if (!Array.isArray(data)) {
            throw new Error('Unexpected equipment response format.')
          }

          setEquipment(data.filter((item) => item.isActive))
        }
      } catch (err) {
        if (active) {
          setError(err.message)
        }
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    loadEquipment()

    return () => {
      active = false
    }
  }, [])

  const formatCurrency = (amount) =>
    new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      maximumFractionDigits: 0,
    }).format(amount)

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-semibold text-indigo-600">
          EQUIPMENT CATALOG
        </p>

        <h1 className="mt-2 text-3xl font-bold text-slate-900">
          Browse Equipment
        </h1>

        <p className="mt-2 text-slate-500">
          Explore rental equipment for your upcoming events.
        </p>
      </div>

      {loading && (
        <p role="status" className="rounded-lg bg-slate-100 p-5 text-slate-600">
          Loading equipment...
        </p>
      )}

      {error && (
        <p role="alert" className="rounded-lg bg-red-50 p-5 text-red-700">
          Unable to load equipment: {error}
        </p>
      )}

      {!loading && !error && equipment.length === 0 && (
        <p className="rounded-lg bg-slate-100 p-5 text-slate-600">
          No active equipment is currently listed.
        </p>
      )}

      {!loading && !error && equipment.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {equipment.map((item) => {
            const available = item.totalQuantity > 0

            return (
              <article
                key={item._id}
                className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
              >
                <div className="flex h-40 items-center justify-center bg-slate-100">
                  <span className="text-sm font-medium text-slate-400">
                    Equipment Image
                  </span>
                </div>

                <div className="space-y-4 p-6">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">
                      {item.category}
                    </p>

                    <h2 className="mt-2 text-lg font-bold text-slate-900">
                      {item.name}
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      {item.description || 'No description available.'}
                    </p>
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <p className="font-bold text-slate-900">
                      {formatCurrency(item.dailyRate)}
                      <span className="text-xs font-normal text-slate-500">
                        {' '}/day
                      </span>
                    </p>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        available
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-rose-50 text-rose-700'
                      }`}
                    >
                      {available ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>

                  <p className="text-sm text-slate-500">
                    Inventory quantity: {item.totalQuantity}
                  </p>

                  <button
                    type="button"
                    disabled
                    className="w-full cursor-not-allowed rounded-lg bg-slate-200 px-4 py-3 text-sm font-semibold text-slate-500"
                  >
                    Reserve (Coming Soon)
                  </button>
                </div>
              </article>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default EquipmentCatalog
