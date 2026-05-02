// ═══════════════════════════════════════════════════════════════
//  OBSERVER PATTERN — Cart Store
//  Zustand store acts as the Observable Subject.
//  Any component that calls useCartStore() becomes an Observer.
//  State changes automatically notify all subscribed components.
// ═══════════════════════════════════════════════════════════════

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,  // cart drawer open/close state

      // ── Observers are notified on every set() call ────────────

      addItem: (product, size) => {
        const items   = get().items
        const key     = `${product.id}-${size}`
        const exists  = items.find((i) => i.key === key)

        if (exists) {
          set({
            items: items.map((i) =>
              i.key === key ? { ...i, quantity: i.quantity + 1 } : i
            ),
          })
        } else {
          set({
            items: [
              ...items,
              {
                key,
                id:        product.id,
                name:      product.name,
                image:     product.image,
                price_55ml: product.price_55ml,
                price_3ml:  product.price_3ml,
                size,
                quantity:  1,
              },
            ],
          })
        }
      },

      removeItem: (key) =>
        set({ items: get().items.filter((i) => i.key !== key) }),

      updateQuantity: (key, quantity) => {
        if (quantity < 1) return
        set({
          items: get().items.map((i) =>
            i.key === key ? { ...i, quantity } : i
          ),
        })
      },

      clearCart: () => set({ items: [] }),

      openCart:  () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set({ isOpen: !get().isOpen }),

      // ── Derived values (computed from state) ──────────────────

      get itemCount() {
        return get().items.reduce((sum, i) => sum + i.quantity, 0)
      },

      get subtotal() {
        return get().items.reduce(
          (sum, i) =>
            sum + (i.size === '55ml' ? i.price_55ml : i.price_3ml) * i.quantity,
          0
        )
      },
    }),
    {
      name: 'myreva-cart',   // localStorage key
    }
  )
)

export default useCartStore
