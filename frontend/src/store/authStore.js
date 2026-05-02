// ─────────────────────────────────────────────
//  Auth Store — JWT session management
// ─────────────────────────────────────────────

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useAuthStore = create(
  persist(
    (set) => ({
      user:  null,
      token: null,

      login: (user, token) => set({ user, token }),

      logout: () => set({ user: null, token: null }),

      isAuthenticated: () => {
        // will be read fresh from store
        return false // overridden by selector in components
      },
    }),
    {
      name: 'myreva-auth',
    }
  )
)

export default useAuthStore
