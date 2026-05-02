import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import products from '../data/products'
import useCartStore from '../store/cartStore'
import useWishlistStore from '../store/wishlistStore'

export default function ProductDetailPage() {
  const { id }       = useParams()
  const navigate     = useNavigate()
  const product      = products.find((p) => p.id === parseInt(id))

  const [selectedSize, setSelectedSize] = useState('55ml')
  const [qty,          setQty]          = useState(1)
  const [added,        setAdded]        = useState(false)

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
  const related       = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3)
  const wishlisted    = isWishlisted(product.id)

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) addItem(product, selectedSize)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
    openCart()
  }

  return (
    <div className="bg-dark-900 min-h-screen">

      {/* ── Breadcrumb ───────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-8">
        <div className="flex items-center gap-2">
          <Link to="/"          className="font-body text-xs text-silver-700 hover:text-silver-400 tracking-widest uppercase transition-colors">Home</Link>
          <span className="text-silver-800 text-xs">›</span>
          <Link to="/catalogue" className="font-body text-xs text-silver-700 hover:text-silver-400 tracking-widest uppercase transition-colors">Collection</Link>
          <span className="text-silver-800 text-xs">›</span>
          <span className="font-body text-xs text-gold-500 tracking-widest uppercase">{product.name}</span>
        </div>
      </div>

      {/* ── Main Content ─────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Left — Product Image */}
          <div className="relative">
            {/* Decorative frame */}
            <div className="absolute inset-4 border border-silver-900/30 pointer-events-none z-10" />
            <div className="absolute inset-0 border border-silver-900/10 pointer-events-none z-10" />

            {/* Maroon glow */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-72 h-72 rounded-full"
                style={{ background: 'radial-gradient(circle, rgba(139,26,26,0.2) 0%, transparent 70%)' }} />
            </div>

            <div className="bg-dark-700 border border-silver-900 aspect-square flex items-center justify-center overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-4/5 h-4/5 object-contain transition-transform duration-700 hover:scale-105"
                style={{ filter: 'drop-shadow(0 20px 60px rgba(139,26,26,0.3))' }}
              />
            </div>

            {/* Corner decorations */}
            {[['top-2 left-2', 'border-t border-l'], ['top-2 right-2', 'border-t border-r'],
              ['bottom-2 left-2', 'border-b border-l'], ['bottom-2 right-2', 'border-b border-r']].map(([pos, cls]) => (
              <div key={pos} className={`absolute ${pos} w-8 h-8 ${cls} border-gold-500/30`} />
            ))}
          </div>

          {/* Right — Product Info */}
          <div className="lg:pt-4">

            {/* Category + wishlist row */}
            <div className="flex items-center justify-between mb-5">
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
                {wishlisted ? 'Wishlisted' : 'Wishlist'}
              </button>
            </div>

            {/* Name */}
            <h1 className="font-display text-5xl md:text-6xl text-silver-100 leading-none mb-3">
              {product.name}
            </h1>
            <p className="font-body text-sm text-silver-600 italic tracking-wide mb-6">
              Inspired by {product.inspiration}
            </p>

            {/* Gold divider */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-px bg-gold-500" />
              <span className="text-gold-500/50 text-xs">✦</span>
              <div className="w-10 h-px bg-gold-500/30" />
            </div>

            {/* Description */}
            <p className="font-body text-silver-400 text-base leading-relaxed font-light mb-8">
              {product.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {product.tags.map((tag) => (
                <span key={tag}
                  className="font-body text-[10px] tracking-[0.2em] uppercase text-silver-600 border border-silver-800 px-3 py-1">
                  {tag}
                </span>
              ))}
            </div>

            {/* Size Selection */}
            <div className="mb-6">
              <p className="font-accent text-[10px] tracking-[0.4em] text-silver-500 uppercase mb-3">
                Select Size
              </p>
              <div className="flex gap-3">
                {['55ml', '3ml'].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`flex-1 py-4 border font-body text-sm tracking-wider transition-all duration-300 ${
                      selectedSize === size
                        ? 'bg-maroon-700 border-maroon-600 text-silver-100'
                        : 'border-silver-800 text-silver-500 hover:border-silver-600 hover:text-silver-300'
                    }`}
                  >
                    <span className="block font-medium">{size}</span>
                    <span className="block text-xs mt-0.5 opacity-70">
                      Rs {(size === '55ml' ? product.price_55ml : product.price_3ml).toLocaleString()}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-8">
              <p className="font-accent text-[10px] tracking-[0.4em] text-silver-500 uppercase mb-3">
                Quantity
              </p>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-silver-800">
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="w-11 h-11 text-silver-400 hover:text-silver-100 hover:bg-dark-600 transition-colors flex items-center justify-center text-lg"
                  >−</button>
                  <span className="w-10 text-center font-body text-sm text-silver-200">{qty}</span>
                  <button
                    onClick={() => setQty(qty + 1)}
                    className="w-11 h-11 text-silver-400 hover:text-silver-100 hover:bg-dark-600 transition-colors flex items-center justify-center text-lg"
                  >+</button>
                </div>
                <span className="font-display text-2xl text-gold-500">
                  Rs {(price * qty).toLocaleString()}
                </span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                className={`flex-1 py-4 font-body font-medium tracking-widest uppercase text-xs transition-all duration-400 border ${
                  added
                    ? 'bg-transparent border-gold-500 text-gold-500'
                    : 'btn-primary'
                }`}
              >
                {added ? '✓ Added to Cart' : 'Add to Cart'}
              </button>
              <Link to="/checkout" className="flex-1 py-4 btn-secondary text-center text-xs">
                Buy Now
              </Link>
            </div>

            {/* Info note */}
            <p className="font-body text-xs text-silver-700 mt-4 text-center tracking-wide">
              Pay via bank transfer after checkout. Confirm on WhatsApp.
            </p>

            {/* Divider */}
            <div className="border-t border-silver-900/50 mt-8 pt-6">
              <div className="grid grid-cols-3 gap-4 text-center">
                {[
                  { icon: '◈', label: 'Authentic Inspiration' },
                  { icon: '◇', label: 'Secure Ordering' },
                  { icon: '◉', label: 'Karachi Delivery' },
                ].map(({ icon, label }) => (
                  <div key={label} className="flex flex-col items-center gap-1.5">
                    <span className="text-gold-500/60 text-lg">{icon}</span>
                    <span className="font-body text-[10px] tracking-[0.15em] text-silver-700 uppercase">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Related Products ──────────────────────────────────── */}
      {related.length > 0 && (
        <div className="border-t border-silver-900/30 mt-12 py-16 bg-dark-800">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="mb-10">
              <p className="section-subtitle mb-2">More like this</p>
              <h2 className="font-display text-3xl text-silver-100">
                You may also <em>like</em>
              </h2>
              <div className="gold-divider mt-3" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {related.map((p) => (
                <Link
                  to={`/product/${p.id}`}
                  key={p.id}
                  className="group card-luxury block"
                  onClick={() => { setSelectedSize('55ml'); setQty(1) }}
                >
                  <div className="bg-dark-700 aspect-square overflow-hidden relative">
                    <img src={p.image} alt={p.name}
                      className="w-full h-full object-contain p-8 transition-transform duration-700 group-hover:scale-105"
                      style={{ filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.4))' }} />
                  </div>
                  <div className="p-4">
                    <span className={`category-badge-${p.category.toLowerCase()} text-[8px] mb-2 inline-block`}>{p.category}</span>
                    <h3 className="font-display text-xl text-silver-100 group-hover:text-gold-400 transition-colors">{p.name}</h3>
                    <p className="font-body text-sm text-gold-500 mt-2">Rs {p.price_55ml.toLocaleString()}</p>
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
