import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../utils/api'
import useAuthStore from '../store/authStore'

export default function OrderHistoryPage() {
  const [orders,  setOrders]  = useState([])
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState('')
  const [expanded, setExpanded] = useState(null)
  const user = useAuthStore((s) => s.user)

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await api.get('/orders')
        setOrders(data)
      } catch (err) {
        setError('Could not load orders. Please try again.')
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [])

  return (
    <div className="bg-dark-900 min-h-screen">

      {/* Header */}
      <div className="py-20 border-b border-silver-900/40">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <div className="flex items-center gap-2 mb-6">
            <Link to="/" className="font-body text-xs text-silver-700 hover:text-silver-400 tracking-widest uppercase transition-colors">Home</Link>
            <span className="text-silver-800 text-xs">›</span>
            <span className="font-body text-xs text-gold-500 tracking-widest uppercase">My Orders</span>
          </div>
          <p className="section-subtitle mb-3">Account</p>
          <h1 className="section-title">Order <em>History</em></h1>
          {user && <p className="font-body text-sm text-silver-600 mt-3">{user.name} · {user.email}</p>}
          <div className="gold-divider mt-5" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 lg:px-12 py-12">

        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="flex flex-col items-center gap-4">
              <div className="w-8 h-8 border-2 border-maroon-700 border-t-transparent rounded-full animate-spin" />
              <p className="font-body text-sm text-silver-600 tracking-wider">Loading your orders...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="border border-maroon-700 bg-maroon-900/20 px-5 py-4 text-center">
            <p className="font-body text-sm text-maroon-400">{error}</p>
          </div>
        )}

        {!loading && !error && orders.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 gap-5 text-center">
            <svg className="w-14 h-14 text-silver-800" fill="none" stroke="currentColor" strokeWidth={0.8} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 00-9-9z" />
            </svg>
            <div>
              <p className="font-display text-3xl text-silver-600 mb-2">No orders yet</p>
              <p className="font-body text-sm text-silver-700">Your order history will appear here once you place an order.</p>
            </div>
            <Link to="/catalogue" className="btn-primary">Start Shopping</Link>
          </div>
        )}

        {!loading && orders.length > 0 && (
          <div className="space-y-4">
            <p className="font-body text-sm text-silver-600 tracking-wider mb-6">
              {orders.length} order{orders.length !== 1 ? 's' : ''} found
            </p>

            {orders.map((order) => (
              <div key={order._id} className="bg-dark-700 border border-silver-900 hover:border-maroon-700/50 transition-colors duration-300">

                {/* Order header row */}
                <button
                  onClick={() => setExpanded(expanded === order._id ? null : order._id)}
                  className="w-full flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 text-left"
                >
                  <div className="flex items-center gap-5">
                    {/* Thumbnail strip */}
                    <div className="flex -space-x-2">
                      {order.items?.slice(0, 3).map((item, i) => (
                        <div key={i} className="w-10 h-10 bg-dark-600 border border-silver-900 flex items-center justify-center"
                          style={{ zIndex: 3 - i }}>
                          <img src={item.image} alt={item.name} className="w-7 h-7 object-contain" />
                        </div>
                      ))}
                      {order.items?.length > 3 && (
                        <div className="w-10 h-10 bg-dark-600 border border-silver-800 flex items-center justify-center">
                          <span className="font-body text-[10px] text-silver-500">+{order.items.length - 3}</span>
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="font-accent text-xs tracking-[0.3em] text-gold-500">{order.orderId}</p>
                      <p className="font-body text-xs text-silver-600 mt-0.5">
                        {new Date(order.placedAt).toLocaleDateString('en-PK', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-right md:text-left">
                      <p className="font-body text-[10px] text-silver-700 tracking-widest uppercase">Total</p>
                      <p className="font-display text-lg text-silver-100">Rs {order.total?.toLocaleString()}</p>
                    </div>
                    <div className="px-3 py-1 border border-maroon-700/50 bg-maroon-900/20">
                      <span className="font-accent text-[9px] tracking-[0.25em] text-maroon-400 uppercase">Pending Payment</span>
                    </div>
                    <svg
                      className={`w-4 h-4 text-silver-600 transition-transform duration-300 shrink-0 ${expanded === order._id ? 'rotate-180' : ''}`}
                      fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </div>
                </button>

                {/* Expanded details */}
                {expanded === order._id && (
                  <div className="border-t border-silver-900 p-5 animate-fade-in space-y-5">

                    {/* Items */}
                    <div className="space-y-3">
                      {order.items?.map((item, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-dark-600 border border-silver-900 flex items-center justify-center shrink-0">
                            <img src={item.image} alt={item.name} className="w-9 h-9 object-contain" />
                          </div>
                          <div className="flex-1">
                            <p className="font-display text-sm text-silver-200">{item.name}</p>
                            <p className="font-body text-xs text-silver-600">{item.size} × {item.quantity}</p>
                          </div>
                          <p className="font-body text-sm text-silver-400">Rs {(item.price * item.quantity).toLocaleString()}</p>
                        </div>
                      ))}
                    </div>

                    {/* Details grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4 border-t border-silver-900">
                      {[
                        { label: 'Contact',  value: order.customerInfo?.email },
                        { label: 'Phone',    value: order.customerInfo?.phone },
                        { label: 'Shipping', value: order.customerInfo?.shippingAddress },
                      ].map(({ label, value }) => (
                        <div key={label}>
                          <p className="font-body text-[10px] text-silver-700 tracking-widest uppercase mb-1">{label}</p>
                          <p className="font-body text-xs text-silver-500 break-words">{value}</p>
                        </div>
                      ))}
                    </div>

                    {/* Total row */}
                    <div className="flex flex-wrap gap-x-6 gap-y-1 pt-3 border-t border-silver-900">
                      {[
                        { label: 'Subtotal', value: `Rs ${order.subtotal?.toLocaleString()}` },
                        { label: 'Shipping', value: order.shippingFee === 0 ? 'Free' : `Rs ${order.shippingFee?.toLocaleString()}` },
                        { label: 'Total',    value: `Rs ${order.total?.toLocaleString()} PKR`, highlight: true },
                      ].map(({ label, value, highlight }) => (
                        <div key={label} className="flex gap-2 items-baseline">
                          <span className="font-body text-[10px] text-silver-700 tracking-wider uppercase">{label}:</span>
                          <span className={`font-body text-sm ${highlight ? 'text-gold-500 font-medium' : 'text-silver-400'}`}>{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
