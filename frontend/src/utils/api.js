// ─────────────────────────────────────────────
//  Axios instance — base URL + auth interceptor
// ─────────────────────────────────────────────

import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: { 'Content-Type': 'application/json' },
})

// Attach JWT token to every request automatically
api.interceptors.request.use((config) => {
  const auth = JSON.parse(localStorage.getItem('myreva-auth') || '{}')
  const token = auth?.state?.token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api
