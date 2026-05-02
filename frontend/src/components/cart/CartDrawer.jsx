// ─────────────────────────────────────────────
//  CartDrawer — Observer Pattern subscriber
//  Subscribes to CartStore and re-renders on every change
// ─────────────────────────────────────────────

import { Link } from 'react-router-dom'
import useCartStore from '../../store/cartStore'

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity } = useCartStore()
  const subtotal = items.reduce(
    (sum, i) => sum + (i.size === '55ml' ? i.price_55ml : i.price_3ml) * i.quantity,
    0
  )

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/70 z-40 backdrop-blur-sm"
          onClick={closeCart}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md z-50 bg-dark-800 border-l border-silver-900
          flex flex-col transition-transform duration-400 ease-in-out
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-silver-900">
          <div>
            <p className="font-accent text-xs tracking-[0.3em] text-gold-500 uppercase">Your</p>
            <h2 className="font-display text-2xl text-silver-100">Cart</h2>
          </div>
          <button onClick={closeCart} className="text-silver-500 hover:text-silver-100 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-5">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <svg className="w-12 h-12 text-silver-800" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
              </svg>
              <p className="font-display text-xl text-silver-600">Your cart is empty</p>
              <button onClick={closeCart} className="btn-secondary text-xs">Browse Collection</button>
            </div>
          ) : (
            items.map((item) => {
              const price = item.size === '55ml' ? item.price_55ml : item.price_3ml
              return (
                <div key={item.key} className="flex gap-4 pb-5 border-b border-silver-900/50">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover border border-silver-900"
                  />
                  <div className="flex-1">
                    <p className="font-display text-base text-silver-100">{item.name}</p>
                    <p className="font-body text-xs text-silver-600 tracking-wider">{item.size}</p>
                    <p className="font-body text-sm text-gold-500 mt-1">Rs {price.toLocaleString()}</p>

                    {/* Quantity */}
                    <div className="flex items-center gap-3 mt-2">
                      <button
                        onClick={() => updateQuantity(item.key, item.quantity - 1)}
                        className="w-6 h-6 border border-silver-800 text-silver-400 hover:border-maroon-700 hover:text-maroon-400 flex items-center justify-center text-sm transition-colors"
                      >−</button>
                      <span className="font-body text-sm text-silver-200 w-4 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.key, item.quantity + 1)}
                        className="w-6 h-6 border border-silver-800 text-silver-400 hover:border-maroon-700 hover:text-maroon-400 flex items-center justify-center text-sm transition-colors"
                      >+</button>
                    </div>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeItem(item.key)}
                    className="text-silver-700 hover:text-maroon-400 transition-colors self-start"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                  </button>
                </div>
              )
            })
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-silver-900 space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-body text-sm text-silver-500 tracking-wider uppercase">Subtotal</span>
              <span className="font-display text-xl text-silver-100">Rs {subtotal.toLocaleString()}</span>
            </div>
            <p className="font-body text-xs text-silver-700">Shipping calculated at checkout</p>
            <Link
              to="/checkout"
              onClick={closeCart}
              className="btn-primary w-full text-center block"
            >
              Proceed to Checkout
            </Link>
          </div>
        )}
      </div>
    </>
  )
}
