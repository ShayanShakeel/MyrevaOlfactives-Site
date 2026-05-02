// ═══════════════════════════════════════════════════════════════
//  OBSERVER PATTERN — Wishlist Store
//  Independent observable store for wishlist.
//  Heart icons on product cards subscribe to this store and
//  re-render automatically when items are added or removed.
// ═══════════════════════════════════════════════════════════════

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useWishlistStore = create(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        const exists = get().items.find((i) => i.id === product.id)
        if (!exists) {
          set({ items: [...get().items, product] })
        }
      },

      removeItem: (productId) =>
        set({ items: get().items.filter((i) => i.id !== productId) }),

      toggleItem: (product) => {
        const exists = get().items.find((i) => i.id === product.id)
        if (exists) {
          set({ items: get().items.filter((i) => i.id !== product.id) })
        } else {
          set({ items: [...get().items, product] })
        }
      },

      isWishlisted: (productId) =>
        get().items.some((i) => i.id === productId),

      clearWishlist: () => set({ items: [] }),

      get count() {
        return get().items.length
      },
    }),
    {
      name: 'myreva-wishlist',   // localStorage key
    }
  )
)

export default useWishlistStore
