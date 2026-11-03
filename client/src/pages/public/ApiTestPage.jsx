
import { useEffect, useState } from 'react'
import { equipmentAPI } from '../../services/api'

function ApiTestPage() {
  const [equipment, setEquipment] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchEquipment() {
      try {
        const data = await equipmentAPI.getAll()
        setEquipment(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchEquipment()
  }, [])

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-900">
        RentFlow API Connection Test
      </h1>

      {loading && (
        <p className="text-slate-500">
          Connecting to backend...
        </p>
      )}

      {error && (
        <p role="alert" className="text-red-600">
          Connection failed: {error}
        </p>
      )}

      {!loading && !error && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-6">
          <h2 className="text-xl font-semibold text-emerald-700">
            API Connection Successful!
          </h2>

          <p className="mt-2 text-slate-600">
            Equipment records retrieved: {equipment.length}
          </p>

          <pre className="mt-5 overflow-x-auto rounded-lg bg-white p-4 text-sm text-slate-700">
            {JSON.stringify(equipment, null, 2)}
          </pre>
        </div>
      )}
    </div>
  )
}

export default ApiTestPage
