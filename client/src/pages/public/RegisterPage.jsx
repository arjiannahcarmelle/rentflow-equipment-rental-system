
import { Link } from 'react-router-dom'
import { useState } from 'react'

function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }))

    setError('')
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    // Registration API integration will be added later.
  }

  return (
    <div className="mx-auto max-w-md py-10">
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Create your account
          </h1>

          <p className="mt-3 text-sm text-slate-500">
            Get started with RentFlow.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-medium text-slate-700">
              Full Name
            </label>

            <input
              id="name"
              type="text"
              name="name"
              autoComplete="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          <div>
            <label htmlFor="register-email" className="mb-2 block text-sm font-medium text-slate-700">
              Email Address
            </label>

            <input
              id="register-email"
              type="email"
              name="email"
              autoComplete="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          <div>
            <label htmlFor="register-password" className="mb-2 block text-sm font-medium text-slate-700">
              Password
            </label>

            <input
              id="register-password"
              type={showPassword ? 'text' : 'password'}
              name="password"
              autoComplete="new-password"
              required
              minLength={8}
              value={formData.password}
              onChange={handleChange}
              placeholder="Minimum 8 characters"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          <div>
            <label htmlFor="confirm-password" className="mb-2 block text-sm font-medium text-slate-700">
              Confirm Password
            </label>

            <input
              id="confirm-password"
              type={showPassword ? 'text' : 'password'}
              name="confirmPassword"
              autoComplete="new-password"
              required
              minLength={8}
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter your password"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          <label className="flex items-center gap-2 text-sm text-slate-600">
            <input
              type="checkbox"
              checked={showPassword}
              onChange={(event) => setShowPassword(event.target.checked)}
              className="accent-indigo-600"
            />
            Show passwords
          </label>

          {error && (
            <p role="alert" className="text-sm text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled
            className="w-full cursor-not-allowed rounded-lg bg-indigo-400 px-5 py-3 font-semibold text-white"
          >
            Create Account (Coming Soon)
          </button>
        </form>

        <p className="mt-7 text-center text-sm text-slate-500">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-700">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}

export default RegisterPage
