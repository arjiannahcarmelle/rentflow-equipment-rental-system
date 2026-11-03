
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

if (!API_BASE_URL) {
  throw new Error(
    'VITE_API_BASE_URL is not configured. Check your frontend environment file.'
  )
}

async function apiRequest(endpoint, options = {}) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  })

  if (!response.ok) {
    throw new Error(
      `API request failed: ${response.status} ${response.statusText}`
    )
  }

  if (response.status === 204) {
    return null
  }

  return response.json()
}

export const equipmentAPI = {
  getAll: () => apiRequest('/api/equipment'),
}


export const reservationAPI = {
  // Development-only: retrieves all reservations.
  // Do not expose this in the customer portal without authentication.
  getAll: () => apiRequest('/api/reservations'),

  // Retrieve one reservation by its MongoDB ID.
  getById: (id) =>
    apiRequest(`/api/reservations/${encodeURIComponent(id)}`),

  // Create a reservation using the existing backend.
  create: (reservationData) =>
    apiRequest('/api/reservations', {
      method: 'POST',
      body: JSON.stringify(reservationData),
    }),
}

export default apiRequest
