
import { Link } from 'react-router-dom'

const features = [
  {
    number: '01',
    title: 'Equipment Management',
    description:
      'Organize rental equipment, track quantities, and maintain an accurate inventory.',
  },
  {
    number: '02',
    title: 'Reservation Management',
    description:
      'Submit rental requests, review reservation details, and monitor booking status.',
  },
  {
    number: '03',
    title: 'Rental Operations',
    description:
      'Support equipment checkout, returns, and day-to-day rental activities.',
  },
  {
    number: '04',
    title: 'Business Reporting',
    description:
      'Access rental activity summaries and useful operational information.',
  },
]

function LandingPage() {
  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="grid items-center gap-12 py-12 lg:grid-cols-2 lg:py-20">
        <div>
          <span className="inline-flex rounded-full border border-indigo-200 bg-indigo-50 px-4 py-2 text-xs font-semibold tracking-wide text-indigo-700">
            EQUIPMENT RENTAL MANAGEMENT
          </span>

          <h1 className="mt-7 text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Smarter Rentals.
            <span className="block text-indigo-600">
              Seamless Management.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
            RentFlow simplifies equipment reservations,
            inventory management, and rental operations
            through one centralized platform.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              to="/register"
              className="rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700"
            >
              Get Started
            </Link>

            <Link
              to="/login"
              className="rounded-lg border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Sign In
            </Link>
          </div>

          <p className="mt-6 text-sm text-slate-500">
            A centralized solution for equipment rental businesses.
          </p>
        </div>

        {/* Dashboard Preview */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/60">
          <div className="mb-5 flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                RentFlow
              </p>
              <h2 className="mt-1 text-xl font-bold text-slate-900">
                Dashboard Preview
              </h2>
            </div>

            <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
              Demo
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              ['Equipment', '128'],
              ['Reservations', '36'],
              ['Active Rentals', '18'],
              ['Pending Requests', '07'],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-xl border border-slate-100 bg-slate-50 p-4"
              >
                <p className="text-xs text-slate-500">{label}</p>
                <p className="mt-2 text-3xl font-bold text-slate-900">
                  {value}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-4 rounded-xl border border-slate-100 p-4">
            <h3 className="font-semibold text-slate-900">
              Recent Reservations
            </h3>

            <div className="mt-4 space-y-3">
              {[
                ['Event Sound System', 'Approved'],
                ['LED Lighting Package', 'Pending'],
                ['Projector and Screen', 'Approved'],
              ].map(([name, status]) => (
                <div
                  key={name}
                  className="flex items-center justify-between gap-3 border-b border-slate-100 pb-3 last:border-0 last:pb-0"
                >
                  <span className="text-sm text-slate-600">
                    {name}
                  </span>

                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                      status === 'Approved'
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-amber-50 text-amber-700'
                    }`}
                  >
                    {status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <p className="mt-4 text-center text-xs text-slate-400">
            Illustrative data — not connected to the database
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="pb-12">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600">
            Platform Features
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Everything you need to manage rentals
          </h2>

          <p className="mt-4 text-slate-600">
            A streamlined workflow for equipment,
            reservations, and business operations.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {features.map((feature) => (
            <article
              key={feature.number}
              className="rounded-xl border border-slate-200 bg-white p-7 transition hover:border-indigo-200 hover:shadow-md"
            >
              <span className="text-sm font-bold text-indigo-600">
                {feature.number}
              </span>

              <h3 className="mt-4 text-xl font-semibold text-slate-900">
                {feature.title}
              </h3>

              <p className="mt-3 leading-7 text-slate-600">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="rounded-2xl bg-slate-900 px-6 py-14 text-center text-white sm:px-12">
        <h2 className="text-3xl font-bold">
          Make rental management simpler.
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-slate-300">
          Manage equipment and rental requests through
          a structured, easy-to-use platform.
        </p>

        <Link
          to="/register"
          className="mt-8 inline-block rounded-lg bg-white px-7 py-3 font-semibold text-slate-900 transition hover:bg-slate-100"
        >
          Get Started
        </Link>
      </section>
    </div>
  )
}

export default LandingPage
