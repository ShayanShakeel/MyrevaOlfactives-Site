import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import products from '../data/products'
import useCartStore from '../store/cartStore'
import useWishlistStore from '../store/wishlistStore'

export default function ProductDetailPage() {
  const { id }    = useParams()
  const navigate  = useNavigate()
  const product   = products.find((p) => p.id === parseInt(id))

  const [selectedSize, setSelectedSize] = useState('55ml')
  const [qty,          setQty]          = useState(1)
  const [added,        setAdded]        = useState(false)
  const [activeTab,    setActiveTab]    = useState('description')

  const addItem      = useCartStore((s) => s.addItem)
  const openCart     = useCartStore((s) => s.openCart)
  const toggleItem   = useWishlistStore((s) => s.toggleItem)
  const isWishlisted = useWishlistStore((s) => s.isWishlisted)

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6">
        <p className="font-display text-4xl text-silver-600">Fragrance not found</p>
        <Link to="/catalogue" className="btn-primary">Back to Collection</Link>
      </div>
    )
  }

  const price         = selectedSize === '55ml' ? product.price_55ml : product.price_3ml
  const originalPrice = selectedSize === '55ml' ? product.originalPrice_55ml : null
  const onSale        = originalPrice && originalPrice > price
  const related       = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3)
  const wishlisted    = isWishlisted(product.id)

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) addItem(product, selectedSize)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
    openCart()
  }

  const handleBuyNow = () => {
    // Add to cart first, then navigate to checkout
    for (let i = 0; i < qty; i++) addItem(product, selectedSize)
    navigate('/checkout')
  }

  const savings = onSale ? originalPrice - price : 0

  return (
    <div className="bg-dark-900 min-h-screen">

      {/* ── Breadcrumb ─────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-8">
        <div className="flex items-center gap-2">
          <Link to="/"          className="font-body text-xs text-silver-700 hover:text-silver-400 tracking-widest uppercase transition-colors">Home</Link>
          <span className="text-silver-800 text-xs">›</span>
          <Link to="/catalogue" className="font-body text-xs text-silver-700 hover:text-silver-400 tracking-widest uppercase transition-colors">Collection</Link>
          <span className="text-silver-800 text-xs">›</span>
          <span className="font-body text-xs text-gold-500 tracking-widest uppercase">{product.name}</span>
        </div>
      </div>

      {/* ── Main Layout ────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* ── Left: Image ───────────────────────── */}
          <div className="relative">
            {/* Decorative offset frame */}
            <div className="absolute inset-4 border border-silver-900/25 pointer-events-none z-10 translate-x-2 translate-y-2" />

            {/* Maroon glow */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-80 h-80 rounded-full"
                style={{ background: 'radial-gradient(circle, rgba(139,26,26,0.18) 0%, transparent 70%)' }} />
            </div>

            <div className="relative bg-dark-700 border border-silver-900 aspect-square flex items-center justify-center overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-4/5 h-4/5 object-contain transition-transform duration-700 hover:scale-105"
                style={{ filter: 'drop-shadow(0 20px 60px rgba(139,26,26,0.3))' }}
              />

              {/* Sale badge */}
              {onSale && (
                <div className="absolute top-4 left-4 bg-maroon-700 border border-maroon-600 px-3 py-1.5">
                  <span className="font-accent text-[9px] tracking-[0.3em] text-silver-100 uppercase">
                    Save Rs {savings.toLocaleString()}
                  </span>
                </div>
              )}

              {/* Category badge */}
              <div className="absolute top-4 right-4">
                <span className={`category-badge-${product.category.toLowerCase()}`}>
                  {product.category}
                </span>
              </div>
            </div>

            {/* Corner decorations */}
            {[['top-0 left-0', 'border-t border-l'], ['top-0 right-0', 'border-t border-r'],
              ['bottom-0 left-0', 'border-b border-l'], ['bottom-0 right-0', 'border-b border-r']].map(([pos, cls]) => (
              <div key={pos} className={`absolute ${pos} w-8 h-8 ${cls} border-gold-500/25`} />
            ))}
          </div>

          {/* ── Right: Info ───────────────────────── */}
          <div className="lg:pt-2">

            {/* Wishlist row */}
            <div className="flex items-center justify-between mb-4">
              <span className={`category-badge-${product.category.toLowerCase()}`}>
                {product.category}
              </span>
              <button
                onClick={() => toggleItem(product)}
                className={`flex items-center gap-2 font-body text-xs tracking-[0.2em] uppercase transition-colors duration-200 ${
                  wishlisted ? 'text-gold-500' : 'text-silver-600 hover:text-gold-500'
                }`}
              >
                <svg className="w-4 h-4" fill={wishlisted ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
                {wishlisted ? 'Wishlisted' : 'Save'}
              </button>
            </div>

            {/* Name + inspiration */}
            <h1 className="font-display text-5xl md:text-6xl text-silver-100 leading-none mb-2">
              {product.name}
            </h1>
            <p className="font-body text-sm text-silver-600 italic tracking-wide mb-5">
              Inspired by {product.inspiration}
            </p>

            {/* Gold divider */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-px bg-gold-500" />
              <span className="text-gold-500/40 text-xs">✦</span>
              <div className="w-6 h-px bg-gold-500/30" />
            </div>

            {/* ── Size Selection with Pricing ──────── */}
            <div className="mb-6">
              <p className="font-accent text-[10px] tracking-[0.4em] text-silver-500 uppercase mb-3">Select Size</p>
              <div className="flex gap-3">

                {/* 55ml option */}
                <button
                  onClick={() => setSelectedSize('55ml')}
                  className={`flex-1 py-4 px-4 border transition-all duration-300 text-left ${
                    selectedSize === '55ml'
                      ? 'bg-maroon-900/40 border-maroon-600'
                      : 'border-silver-800 hover:border-silver-600'
                  }`}
                >
                  <span className="block font-accent text-[10px] tracking-[0.2em] uppercase mb-1.5 text-silver-400">55ml — Full Size</span>
                  <div className="flex items-baseline gap-2">
                    <span className={`font-display text-xl ${selectedSize === '55ml' ? 'text-gold-400' : 'text-silver-300'}`}>
                      Rs {product.price_55ml.toLocaleString()}
                    </span>
                    {product.originalPrice_55ml && (
                      <span className="font-body text-xs text-silver-700 line-through">
                        Rs {product.originalPrice_55ml.toLocaleString()}
                      </span>
                    )}
                  </div>
                  {onSale && selectedSize === '55ml' && (
                    <span className="block font-body text-[9px] text-maroon-400 tracking-wider mt-1">
                      You save Rs {savings.toLocaleString()}
                    </span>
                  )}
                </button>

                {/* 3ml option */}
                <button
                  onClick={() => setSelectedSize('3ml')}
                  className={`flex-1 py-4 px-4 border transition-all duration-300 text-left ${
                    selectedSize === '3ml'
                      ? 'bg-maroon-900/40 border-maroon-600'
                      : 'border-silver-800 hover:border-silver-600'
                  }`}
                >
                  <span className="block font-accent text-[10px] tracking-[0.2em] uppercase mb-1.5 text-silver-400">3ml — Tester</span>
                  <span className={`font-display text-xl ${selectedSize === '3ml' ? 'text-gold-400' : 'text-silver-300'}`}>
                    Rs {product.price_3ml.toLocaleString()}
                  </span>
                  <span className="block font-body text-[9px] text-silver-700 tracking-wider mt-1">
                    Try before full size
                  </span>
                </button>
              </div>
            </div>

            {/* ── Quantity & Total ─────────────────── */}
            <div className="mb-7">
              <p className="font-accent text-[10px] tracking-[0.4em] text-silver-500 uppercase mb-3">Quantity</p>
              <div className="flex items-center gap-5">
                <div className="flex items-center border border-silver-800">
                  <button onClick={() => setQty(Math.max(1, qty - 1))}
                    className="w-11 h-11 text-silver-400 hover:text-silver-100 hover:bg-dark-600 transition-colors flex items-center justify-center text-lg">−</button>
                  <span className="w-10 text-center font-body text-sm text-silver-200">{qty}</span>
                  <button onClick={() => setQty(qty + 1)}
                    className="w-11 h-11 text-silver-400 hover:text-silver-100 hover:bg-dark-600 transition-colors flex items-center justify-center text-lg">+</button>
                </div>
                <div>
                  <span className="font-display text-2xl text-gold-500">Rs {(price * qty).toLocaleString()}</span>
                  {qty > 1 && <span className="font-body text-xs text-silver-600 ml-2">({qty} × Rs {price.toLocaleString()})</span>}
                </div>
              </div>
            </div>

            {/* ── CTA Buttons ──────────────────────── */}
            <div className="flex gap-3 mb-5">
              <button
                onClick={handleAddToCart}
                className={`flex-1 py-4 font-body font-medium tracking-widest uppercase text-xs transition-all duration-400 border ${
                  added ? 'bg-transparent border-gold-500 text-gold-500' : 'btn-primary'
                }`}
              >
                {added ? '✓ Added to Cart' : 'Add to Cart'}
              </button>
              <button
                onClick={handleBuyNow}
                className="flex-1 py-4 btn-secondary text-xs"
              >
                Buy Now
              </button>
            </div>

            <p className="font-body text-xs text-silver-700 text-center tracking-wide mb-8">
              Pay via bank transfer after checkout · Confirm on WhatsApp
            </p>

            {/* ── Tabs: Description / Notes / Highlights ── */}
            <div className="border-t border-silver-900/50">
              <div className="flex border-b border-silver-900/50">
                {[
                  { key: 'description', label: 'Description' },
                  { key: 'notes',       label: 'Fragrance Notes' },
                  { key: 'highlights',  label: 'Why You\'ll Love It' },
                ].map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    className={`flex-1 py-3 font-accent text-[9px] tracking-[0.25em] uppercase transition-all duration-200 border-b-2 -mb-px ${
                      activeTab === key
                        ? 'border-gold-500 text-gold-500'
                        : 'border-transparent text-silver-600 hover:text-silver-400'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <div className="pt-6 pb-2 min-h-[140px]">

                {/* Description tab */}
                {activeTab === 'description' && (
                  <div className="animate-fade-in">
                    <p className="font-body text-silver-400 text-sm leading-relaxed font-light mb-4">
                      {product.description}
                    </p>
                    {product.tagline && (
                      <p className="font-display text-base text-silver-500 italic leading-relaxed">
                        "{product.tagline}"
                      </p>
                    )}
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mt-5">
                      {product.tags.map((tag) => (
                        <span key={tag}
                          className="font-body text-[9px] tracking-[0.2em] uppercase text-silver-700 border border-silver-800 px-3 py-1">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Notes tab */}
                {activeTab === 'notes' && (
                  <div className="animate-fade-in space-y-5">
                    {[
                      { emoji: '🍯', label: 'Top Notes',   value: product.notes?.top },
                      { emoji: '🌹', label: 'Heart Notes', value: product.notes?.heart },
                      { emoji: '🌑', label: 'Base Notes',  value: product.notes?.base },
                    ].filter((n) => n.value).map(({ emoji, label, value }) => (
                      <div key={label} className="flex gap-4">
                        <div className="w-8 h-8 border border-silver-800 flex items-center justify-center text-sm shrink-0 mt-0.5">
                          {emoji}
                        </div>
                        <div>
                          <p className="font-accent text-[9px] tracking-[0.3em] text-gold-500 uppercase mb-1">{label}</p>
                          <p className="font-body text-sm text-silver-400 leading-relaxed font-light">{value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Highlights tab */}
                {activeTab === 'highlights' && (
                  <div className="animate-fade-in space-y-3">
                    {product.highlights?.map((h, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <span className="text-gold-500 text-sm mt-0.5 shrink-0">💫</span>
                        <p className="font-body text-sm text-silver-400 leading-relaxed font-light">{h}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Trust strip */}
            <div className="border-t border-silver-900/50 mt-4 pt-5 grid grid-cols-3 gap-4 text-center">
              {[
                { icon: '◈', label: 'Authentic Inspired' },
                { icon: '◇', label: 'Secure Ordering' },
                { icon: '◉', label: 'Karachi Delivery' },
              ].map(({ icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-1.5">
                  <span className="text-gold-500/50 text-lg">{icon}</span>
                  <span className="font-body text-[9px] tracking-[0.15em] text-silver-700 uppercase">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Related Products ─────────────────────── */}
      {related.length > 0 && (
        <div className="border-t border-silver-900/30 mt-8 py-16 bg-dark-800">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="mb-10">
              <p className="section-subtitle mb-2">More like this</p>
              <h2 className="font-display text-3xl text-silver-100">You may also <em>like</em></h2>
              <div className="gold-divider mt-3" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {related.map((p) => (
                <Link to={`/product/${p.id}`} key={p.id} className="group card-luxury block"
                  onClick={() => { setSelectedSize('55ml'); setQty(1); setActiveTab('description') }}>
                  <div className="bg-dark-700 aspect-square overflow-hidden relative">
                    <img src={p.image} alt={p.name}
                      className="w-full h-full object-contain p-8 transition-transform duration-700 group-hover:scale-105"
                      style={{ filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.4))' }} />
                    {p.originalPrice_55ml && p.originalPrice_55ml > p.price_55ml && (
                      <div className="absolute top-3 left-3 bg-maroon-700/90 px-2 py-0.5">
                        <span className="font-accent text-[8px] tracking-widest text-silver-200 uppercase">Sale</span>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <span className={`category-badge-${p.category.toLowerCase()} text-[8px] mb-2 inline-block`}>{p.category}</span>
                    <h3 className="font-display text-xl text-silver-100 group-hover:text-gold-400 transition-colors">{p.name}</h3>
                    <p className="font-body text-xs text-silver-600 italic mt-0.5">Inspired by {p.inspiration}</p>
                    <div className="flex items-baseline gap-2 mt-2">
                      <p className="font-body text-sm text-gold-500">Rs {p.price_55ml.toLocaleString()}</p>
                      {p.originalPrice_55ml && p.originalPrice_55ml > p.price_55ml && (
                        <p className="font-body text-xs text-silver-700 line-through">Rs {p.originalPrice_55ml.toLocaleString()}</p>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
