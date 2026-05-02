import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useCartStore from '../store/cartStore'
import orderFacade from '../patterns/facade/OrderFacade'
import paymentConfig from '../config/paymentConfig'

export default function CheckoutPage() {
  const navigate    = useNavigate()
  const items       = useCartStore((s) => s.items)
  const clearCart   = useCartStore((s) => s.clearCart)
  const subtotal    = items.reduce(
    (sum, i) => sum + (i.size === '55ml' ? i.price_55ml : i.price_3ml) * i.quantity, 0
  )
  const shippingFee = subtotal >= paymentConfig.shipping.freeAbove ? 0 : paymentConfig.shipping.standard
  const total       = subtotal + shippingFee

  const [form, setForm]   = useState({
    name: '', email: '', phone: '', shippingAddress: '', billingAddress: '', sameAddress: true,
  })
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState('')

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
      ...(name === 'sameAddress' && checked ? { billingAddress: prev.shippingAddress } : {}),
      ...(name === 'shippingAddress' && form.sameAddress ? { billingAddress: value } : {}),
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (items.length === 0) return setError('Your cart is empty.')
    setLoading(true)
    try {
      const customerInfo = {
        name:            form.name,
        email:           form.email,
        phone:           form.phone,
        shippingAddress: form.shippingAddress,
        billingAddress:  form.sameAddress ? form.shippingAddress : form.billingAddress,
      }
      // ← FACADE PATTERN: one method call, all complexity hidden
      const order = await orderFacade.placeOrder(items, customerInfo, clearCart)
      navigate('/order-confirmation', { state: { order } })
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-dark-900 flex flex-col items-center justify-center gap-6">
        <p className="font-display text-4xl text-silver-600">Your cart is empty</p>
        <Link to="/catalogue" className="btn-primary">Browse Collection</Link>
      </div>
    )
  }

  return (
    <div className="bg-dark-900 min-h-screen">

      {/* Header */}
      <div className="py-14 border-b border-silver-900/40">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-2 mb-5">
            <Link to="/" className="font-body text-xs text-silver-700 hover:text-silver-400 tracking-widest uppercase transition-colors">Home</Link>
            <span className="text-silver-800 text-xs">›</span>
            <Link to="/catalogue" className="font-body text-xs text-silver-700 hover:text-silver-400 tracking-widest uppercase transition-colors">Cart</Link>
            <span className="text-silver-800 text-xs">›</span>
            <span className="font-body text-xs text-gold-500 tracking-widest uppercase">Checkout</span>
          </div>
          <p className="section-subtitle mb-3">Almost there</p>
          <h1 className="section-title">Checkout</h1>
          <div className="gold-divider mt-5" />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 lg:px-12 py-12">
        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-5 gap-12">

            {/* Left — Form */}
            <div className="lg:col-span-3 space-y-8">

              {/* Contact Info */}
              <fieldset>
                <legend className="font-accent text-[10px] tracking-[0.4em] text-gold-500 uppercase mb-5 flex items-center gap-3">
                  <span>01</span>
                  <div className="h-px flex-1 bg-silver-900" />
                  <span>Contact Information</span>
                </legend>
                <div className="space-y-4">
                  <div>
                    <label className="font-accent text-[10px] tracking-[0.3em] text-silver-600 uppercase block mb-2">Full Name</label>
                    <input name="name" value={form.name} onChange={handleChange} placeholder="Your full name" required className="input-luxury" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="font-accent text-[10px] tracking-[0.3em] text-silver-600 uppercase block mb-2">Email</label>
                      <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="your@email.com" required className="input-luxury" />
                    </div>
                    <div>
                      <label className="font-accent text-[10px] tracking-[0.3em] text-silver-600 uppercase block mb-2">Phone</label>
                      <input name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="03XX-XXXXXXX" required className="input-luxury" />
                    </div>
                  </div>
                </div>
              </fieldset>

              {/* Shipping Address */}
              <fieldset>
                <legend className="font-accent text-[10px] tracking-[0.4em] text-gold-500 uppercase mb-5 flex items-center gap-3">
                  <span>02</span>
                  <div className="h-px flex-1 bg-silver-900" />
                  <span>Shipping Address</span>
                </legend>
                <textarea
                  name="shippingAddress"
                  value={form.shippingAddress}
                  onChange={handleChange}
                  placeholder="Street address, building, area, city, postal code"
                  required
                  rows={3}
                  className="input-luxury resize-none"
                />
              </fieldset>

              {/* Billing Address */}
              <fieldset>
                <legend className="font-accent text-[10px] tracking-[0.4em] text-gold-500 uppercase mb-5 flex items-center gap-3">
                  <span>03</span>
                  <div className="h-px flex-1 bg-silver-900" />
                  <span>Billing Address</span>
                </legend>
                <label className="flex items-center gap-3 cursor-pointer mb-4 group">
                  <div className={`w-4 h-4 border flex items-center justify-center transition-colors duration-200 ${form.sameAddress ? 'bg-maroon-700 border-maroon-600' : 'border-silver-700 group-hover:border-silver-500'}`}>
                    {form.sameAddress && (
                      <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    )}
                  </div>
                  <input type="checkbox" name="sameAddress" checked={form.sameAddress} onChange={handleChange} className="hidden" />
                  <span className="font-body text-sm text-silver-500 tracking-wide">Same as shipping address</span>
                </label>
                {!form.sameAddress && (
                  <textarea
                    name="billingAddress"
                    value={form.billingAddress}
                    onChange={handleChange}
                    placeholder="Billing address"
                    required
                    rows={3}
                    className="input-luxury resize-none"
                  />
                )}
              </fieldset>

              {/* Payment Method */}
              <fieldset>
                <legend className="font-accent text-[10px] tracking-[0.4em] text-gold-500 uppercase mb-5 flex items-center gap-3">
                  <span>04</span>
                  <div className="h-px flex-1 bg-silver-900" />
                  <span>Payment Method</span>
                </legend>
                <div className="border border-maroon-700/50 bg-maroon-900/10 p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-4 h-4 border-2 border-maroon-500 rounded-full flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-maroon-500 rounded-full" />
                    </div>
                    <span className="font-body text-sm text-silver-300 tracking-wide">Bank Deposit / Manual Transfer</span>
                  </div>
                  <p className="font-body text-xs text-silver-600 leading-relaxed">
                    Transfer the total amount after placing your order. Bank account details will be shown on the confirmation screen. Confirm payment via WhatsApp.
                  </p>
                </div>
              </fieldset>

              {error && (
                <div className="border border-maroon-700 bg-maroon-900/20 px-4 py-3">
                  <p className="font-body text-xs text-maroon-400">{error}</p>
                </div>
              )}
            </div>

            {/* Right — Order Summary */}
            <div className="lg:col-span-2">
              <div className="sticky top-24 bg-dark-700 border border-silver-900 p-6">
                <h2 className="font-display text-2xl text-silver-100 mb-6">Order Summary</h2>

                {/* Items */}
                <div className="space-y-4 mb-6 pb-6 border-b border-silver-900">
                  {items.map((item) => {
                    const price = item.size === '55ml' ? item.price_55ml : item.price_3ml
                    return (
                      <div key={item.key} className="flex gap-3">
                        <div className="relative w-14 h-14 bg-dark-600 border border-silver-900 shrink-0 flex items-center justify-center">
                          <img src={item.image} alt={item.name} className="w-10 h-10 object-contain"
                            style={{ filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.4))' }} />
                          <span className="absolute -top-2 -right-2 w-5 h-5 bg-maroon-700 text-white text-[9px] flex items-center justify-center font-body">
                            {item.quantity}
                          </span>
                        </div>
                        <div className="flex-1">
                          <p className="font-display text-sm text-silver-200">{item.name}</p>
                          <p className="font-body text-xs text-silver-600">{item.size}</p>
                        </div>
                        <p className="font-body text-sm text-silver-300">
                          Rs {(price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    )
                  })}
                </div>

                {/* Totals */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="font-body text-sm text-silver-500 tracking-wide">Subtotal</span>
                    <span className="font-body text-sm text-silver-300">Rs {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-body text-sm text-silver-500 tracking-wide">Shipping</span>
                    <span className="font-body text-sm text-silver-300">
                      {shippingFee === 0 ? <span className="text-gold-500">Free</span> : `Rs ${shippingFee.toLocaleString()}`}
                    </span>
                  </div>
                  {shippingFee > 0 && (
                    <p className="font-body text-[10px] text-silver-700">
                      Free shipping on orders over Rs {paymentConfig.shipping.freeAbove.toLocaleString()}
                    </p>
                  )}
                </div>

                <div className="border-t border-silver-900 pt-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="font-accent text-xs tracking-[0.3em] text-silver-400 uppercase">Total</span>
                    <span className="font-display text-2xl text-gold-500">Rs {total.toLocaleString()}</span>
                  </div>
                  <p className="font-body text-[10px] text-silver-700 mt-1 text-right">PKR</p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Placing Order...' : 'Place Order'}
                </button>

                <Link to="/catalogue" className="btn-ghost w-full text-center block mt-3 text-xs py-2">
                  ← Continue Shopping
                </Link>
              </div>
            </div>

          </div>
        </form>
      </div>
    </div>
  )
}
