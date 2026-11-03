
const equipment = [
  {
    id: 1,
    name: 'Professional Sound System',
    category: 'Audio Equipment',
    description: 'Complete sound system for events and gatherings.',
    rate: 2500,
    available: true,
  },
  {
    id: 2,
    name: 'LED Stage Lighting',
    category: 'Lighting',
    description: 'Professional lighting setup for indoor and outdoor events.',
    rate: 1800,
    available: true,
  },
  {
    id: 3,
    name: 'Projector and Screen',
    category: 'Visual Equipment',
    description: 'Projection equipment for presentations and events.',
    rate: 1200,
    available: false,
  },
]

function EquipmentCatalog() {
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
          Explore equipment for your upcoming events.
        </p>
      </div>

      <p className="rounded-lg bg-indigo-50 px-4 py-3 text-sm text-indigo-700">
        Demo catalog — equipment details, prices, and availability
        are illustrative only.
      </p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {equipment.map((item) => (
          <article
            key={item.id}
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
                  {item.description}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <p className="font-bold text-slate-900">
                  {formatCurrency(item.rate)}
                  <span className="text-xs font-normal text-slate-500">
                    {' '}/day
                  </span>
                </p>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    item.available
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'bg-rose-50 text-rose-700'
                  }`}
                >
                  {item.available ? 'Available' : 'Unavailable'}
                </span>
              </div>

              <button
                type="button"
                disabled
                className="w-full cursor-not-allowed rounded-lg bg-slate-200 px-4 py-3 text-sm font-semibold text-slate-500"
              >
                Reserve (Coming Soon)
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

export default EquipmentCatalog
