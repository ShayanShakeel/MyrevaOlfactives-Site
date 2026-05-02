import { useLocation, Link, Navigate } from 'react-router-dom'

export default function OrderConfirmationPage() {
  const { state } = useLocation()
  const order     = state?.order

  if (!order) return <Navigate to="/" replace />

  const mapQuery = encodeURIComponent(order.customerInfo?.shippingAddress || 'Karachi, Pakistan')
  const mapSrc   = `https://maps.google.com/maps?q=${mapQuery}&output=embed&z=14`

  return (
    <div className="bg-dark-900 min-h-screen">

      {/* ── Success Banner ────────────────────────────────────── */}
      <div className="bg-maroon-gradient border-b border-maroon-700/50 py-12 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }}
        />
        <div className="relative z-10">
          {/* Success icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 border-2 border-gold-500/60 rounded-full mb-4 bg-dark-900/30">
            <svg className="w-8 h-8 text-gold-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          <p className="font-accent text-[10px] tracking-[0.5em] text-gold-400 uppercase mb-2">Order Placed Successfully</p>
          <h1 className="font-display text-4xl md:text-5xl text-silver-100">
            Thank you, {order.customerInfo?.name?.split(' ')[0]}!
          </h1>
          <p className="font-body text-silver-400 text-sm mt-3 tracking-wider">
            Confirmation #{order.orderId}
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 lg:px-12 py-12">
        <div className="grid lg:grid-cols-3 gap-8">

          {/* ── LEFT — Main confirmation ───────────────────── */}
          <div className="lg:col-span-2 space-y-6">

            {/* Map */}
            <div className="border border-silver-900 overflow-hidden">
              <div className="bg-dark-700 px-4 py-3 border-b border-silver-900 flex items-center gap-2">
                <svg className="w-3.5 h-3.5 text-gold-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"/>
                </svg>
                <span className="font-body text-xs text-silver-500 tracking-widest uppercase">Shipping Address</span>
                <span className="font-body text-xs text-silver-400 ml-2">{order.customerInfo?.shippingAddress}</span>
              </div>
              <iframe
                title="Shipping Location"
                src={mapSrc}
                className="w-full h-44 grayscale opacity-80 border-0"
                loading="lazy"
              />
            </div>

            {/* Payment instruction */}
            <div className="bg-dark-700 border border-maroon-700/50 p-6">
              <div className="flex items-start gap-3 mb-5">
                <div className="w-6 h-6 border border-gold-500/50 flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-3 h-3 text-gold-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                  </svg>
                </div>
                <div>
                  <p className="font-display text-xl text-silver-100 mb-1">Your order is confirmed</p>
                  <p className="font-body text-sm text-silver-500 leading-relaxed">
                    Transfer the funds and share a screenshot on our WhatsApp to confirm your order successfully.
                  </p>
                </div>
              </div>

              {/* Bank accounts */}
              <div className="space-y-4">
                {order.paymentAccounts?.map((acc, i) => (
                  <div key={i} className="border border-silver-800 p-4 bg-dark-800">
                    <p className="font-accent text-[9px] tracking-[0.3em] text-gold-500 uppercase mb-3">
                      Bank Account {String(i + 1).padStart(2, '0')}
                    </p>
                    <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                      {[
                        { label: 'Bank',           value: acc.bank },
                        { label: 'Account Title',  value: acc.accountTitle },
                        { label: 'Account Number', value: acc.accountNumber },
                        acc.iban && { label: 'IBAN', value: acc.iban },
                      ].filter(Boolean).map(({ label, value }) => (
                        <div key={label}>
                          <p className="font-body text-[10px] text-silver-700 tracking-wider uppercase">{label}</p>
                          <p className="font-body text-xs text-silver-300 mt-0.5 break-all">{value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* WhatsApp CTA */}
              <div className="mt-5 pt-5 border-t border-silver-800">
                <p className="font-body text-xs text-silver-600 mb-3">
                  Once paid, confirm your order on our WhatsApp:
                </p>
                <a
                  href={order.whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary inline-flex items-center gap-2 text-xs py-3 px-6"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.013.49 3.912 1.359 5.587L0 24l6.584-1.335A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.659-.489-5.192-1.346l-.373-.22-3.862.784.815-3.777-.242-.389A9.957 9.957 0 012 12C2 6.478 6.478 2 12 2s10 4.478 10 10-4.478 10-10 10z"/>
                  </svg>
                  Confirm on WhatsApp
                </a>
              </div>
            </div>

            {/* Order details */}
            <div className="bg-dark-700 border border-silver-900 p-6">
              <h3 className="font-display text-xl text-silver-100 mb-5">Order Details</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                {[
                  { label: 'Contact',        value: order.customerInfo?.email },
                  { label: 'Payment Method', value: 'Bank Deposit' },
                  { label: 'Shipping',       value: order.customerInfo?.shippingAddress },
                  { label: 'Billing',        value: order.customerInfo?.billingAddress },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <p className="font-body text-[10px] text-silver-700 tracking-widest uppercase mb-1">{label}</p>
                    <p className="font-body text-xs text-silver-400 leading-relaxed break-words">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3">
              <Link to="/catalogue" className="btn-primary flex-1 text-center py-3">
                Continue Shopping
              </Link>
              <Link to="/orders" className="btn-secondary flex-1 text-center py-3">
                View All Orders
              </Link>
            </div>
          </div>

          {/* ── RIGHT — Order summary ──────────────────────── */}
          <div className="space-y-4">

            {/* Items */}
            <div className="bg-dark-700 border border-silver-900 p-5">
              <h3 className="font-display text-lg text-silver-100 mb-4">Items Ordered</h3>
              <div className="space-y-4 mb-5 pb-5 border-b border-silver-900">
                {order.items?.map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="relative w-12 h-12 bg-dark-600 border border-silver-900 shrink-0 flex items-center justify-center">
                      <img src={item.image} alt={item.name} className="w-9 h-9 object-contain" />
                      <span className="absolute -top-2 -right-2 w-5 h-5 bg-maroon-700 text-white text-[9px] flex items-center justify-center font-body">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-display text-sm text-silver-200 truncate">{item.name}</p>
                      <p className="font-body text-[10px] text-silver-600">{item.size}</p>
                    </div>
                    <p className="font-body text-xs text-silver-400 shrink-0">
                      Rs {(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="font-body text-silver-600">Subtotal</span>
                  <span className="font-body text-silver-400">Rs {order.subtotal?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-body text-silver-600">Shipping</span>
                  <span className="font-body text-silver-400">
                    {order.shippingFee === 0 ? <span className="text-gold-500">Free</span> : `Rs ${order.shippingFee?.toLocaleString()}`}
                  </span>
                </div>
                <div className="flex justify-between pt-3 border-t border-silver-900">
                  <span className="font-accent text-[10px] tracking-[0.25em] text-silver-400 uppercase">Total</span>
                  <span className="font-display text-xl text-gold-500">Rs {order.total?.toLocaleString()}</span>
                </div>
                <p className="font-body text-[10px] text-silver-700 text-right">PKR</p>
              </div>
            </div>

            {/* Order ID card */}
            <div className="bg-dark-700 border border-gold-500/30 p-5 text-center">
              <p className="font-accent text-[9px] tracking-[0.4em] text-gold-500 uppercase mb-2">Order ID</p>
              <p className="font-display text-2xl text-silver-100 tracking-wider">{order.orderId}</p>
              <p className="font-body text-[10px] text-silver-700 mt-2">
                Keep this ID for your records
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
