import { useState, useEffect, useRef } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import products from '../data/products'
import useCartStore from '../store/cartStore'
import useWishlistStore from '../store/wishlistStore'
import {
  SORT_STRATEGIES,
  FILTER_STRATEGIES,
  CatalogueContext,
} from '../patterns/strategies/index'

// ─── Initialise the Strategy context ─────────────────────────────
const catalogueContext = new CatalogueContext(
  SORT_STRATEGIES.newest.strategy,
  FILTER_STRATEGIES.All.strategy
)

export default function CataloguePage() {
  const [searchParams] = useSearchParams()
  const urlCategory    = searchParams.get('category') || 'All'

  const [activeFilter, setActiveFilter] = useState(urlCategory)
  const [activeSort,   setActiveSort]   = useState('newest')
  const [displayed,    setDisplayed]    = useState(products)
  const [gridView,     setGridView]     = useState(true)
  const [sortOpen,     setSortOpen]     = useState(false)
  const sortRef = useRef(null)

  const addItem      = useCartStore((s) => s.addItem)
  const openCart     = useCartStore((s) => s.openCart)
  const toggleItem   = useWishlistStore((s) => s.toggleItem)
  const isWishlisted = useWishlistStore((s) => s.isWishlisted)

  // ── Apply strategies whenever filter or sort changes ─────────
  // This is the Strategy Pattern in action — swap strategy, re-run
  useEffect(() => {
    catalogueContext.setFilterStrategy(FILTER_STRATEGIES[activeFilter].strategy)
    catalogueContext.setSortStrategy(SORT_STRATEGIES[activeSort].strategy)
    setDisplayed(catalogueContext.applyStrategies(products))
  }, [activeFilter, activeSort])

  // Sync URL category param on mount
  useEffect(() => {
    if (urlCategory && FILTER_STRATEGIES[urlCategory]) {
      setActiveFilter(urlCategory)
    }
  }, [urlCategory])

  // Close sort dropdown on outside click
  useEffect(() => {
    const handler = (e) => { if (sortRef.current && !sortRef.current.contains(e.target)) setSortOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleAddToCart = (product, e) => {
    e.preventDefault()
    addItem(product, '55ml')
    openCart()
  }

  return (
    <div className="bg-dark-900 min-h-screen">

      {/* ── Page Header ───────────────────────────────────────── */}
      <div className="relative py-20 border-b border-silver-900/40 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-[0.025]"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }}
        />
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-5"
          style={{ background: 'linear-gradient(to left, #8B1A1A, transparent)' }} />

        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-6">
            <Link to="/" className="font-body text-xs text-silver-700 hover:text-silver-400 tracking-widest uppercase transition-colors">Home</Link>
            <span className="text-silver-800 text-xs">›</span>
            <span className="font-body text-xs text-gold-500 tracking-widest uppercase">Collection</span>
          </div>

          <div className="flex items-end justify-between flex-wrap gap-6">
            <div>
              <p className="font-accent text-[10px] tracking-[0.5em] text-gold-500 uppercase mb-3">
                Myreva Olfactives
              </p>
              <h1 className="font-display text-5xl md:text-6xl text-silver-100 leading-none">
                The <em>Collection</em>
              </h1>
              <div className="w-14 h-px bg-gold-500 mt-5" />
            </div>
            <p className="font-body text-silver-600 text-sm tracking-wider">
              {displayed.length} fragrance{displayed.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10">

        {/* ── Controls Bar ─────────────────────────────────────── */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10 pb-8 border-b border-silver-900/40">

          {/* Category Filter Pills — Strategy Pattern */}
          <div className="flex flex-wrap gap-2">
            {Object.keys(FILTER_STRATEGIES).map((key) => (
              <button
                key={key}
                onClick={() => setActiveFilter(key)}
                className={`font-accent text-[10px] tracking-[0.25em] uppercase px-5 py-2 border transition-all duration-300 ${
                  activeFilter === key
                    ? 'bg-maroon-700 border-maroon-600 text-silver-100'
                    : 'bg-transparent border-silver-800 text-silver-500 hover:border-silver-600 hover:text-silver-300'
                }`}
              >
                {FILTER_STRATEGIES[key].label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {/* Sort Dropdown — Strategy Pattern */}
            <div className="relative" ref={sortRef}>
              <button
                onClick={() => setSortOpen(!sortOpen)}
                className="flex items-center gap-3 border border-silver-800 hover:border-silver-600 px-4 py-2 transition-colors duration-200 group"
              >
                <span className="font-body text-xs text-silver-500 tracking-[0.15em] uppercase group-hover:text-silver-300 transition-colors">
                  {SORT_STRATEGIES[activeSort].label}
                </span>
                <svg
                  className={`w-3.5 h-3.5 text-silver-600 transition-transform duration-200 ${sortOpen ? 'rotate-180' : ''}`}
                  fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </button>

              {sortOpen && (
                <div className="absolute right-0 top-full mt-1 w-52 bg-dark-700 border border-silver-800 z-30 shadow-luxury animate-fade-in">
                  {Object.entries(SORT_STRATEGIES).map(([key, { label }]) => (
                    <button
                      key={key}
                      onClick={() => { setActiveSort(key); setSortOpen(false) }}
                      className={`w-full text-left px-4 py-3 font-body text-xs tracking-[0.15em] uppercase transition-colors duration-150 ${
                        activeSort === key
                          ? 'text-gold-500 bg-maroon-900/40'
                          : 'text-silver-500 hover:text-silver-200 hover:bg-dark-600'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Grid / List toggle */}
            <div className="flex border border-silver-800">
              <button
                onClick={() => setGridView(true)}
                className={`p-2 transition-colors duration-200 ${gridView ? 'bg-maroon-700 text-silver-100' : 'text-silver-600 hover:text-silver-300'}`}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <rect x="3" y="3" width="7" height="7" rx="0.5"/><rect x="14" y="3" width="7" height="7" rx="0.5"/>
                  <rect x="3" y="14" width="7" height="7" rx="0.5"/><rect x="14" y="14" width="7" height="7" rx="0.5"/>
                </svg>
              </button>
              <button
                onClick={() => setGridView(false)}
                className={`p-2 transition-colors duration-200 ${!gridView ? 'bg-maroon-700 text-silver-100' : 'text-silver-600 hover:text-silver-300'}`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* ── Product Grid ──────────────────────────────────────── */}
        {displayed.length === 0 ? (
          <div className="text-center py-32">
            <p className="font-display text-4xl text-silver-700 mb-4">No fragrances found</p>
            <p className="font-body text-silver-600 text-sm">Try a different filter.</p>
          </div>
        ) : gridView ? (

          /* GRID VIEW */
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-5">
            {displayed.map((product, idx) => (
              <ProductCard
                key={product.id}
                product={product}
                idx={idx}
                onAddToCart={handleAddToCart}
                onToggleWish={() => toggleItem(product)}
                wishlisted={isWishlisted(product.id)}
              />
            ))}
          </div>

        ) : (

          /* LIST VIEW */
          <div className="flex flex-col gap-3">
            {displayed.map((product) => (
              <ProductRow
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                onToggleWish={() => toggleItem(product)}
                wishlisted={isWishlisted(product.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

/* ════════════════════════════════════════
   PRODUCT CARD — Grid View
════════════════════════════════════════ */
function ProductCard({ product, idx, onAddToCart, onToggleWish, wishlisted }) {
  const delay = (idx % 8) * 0.06

  return (
    <div
      className="group relative card-luxury animate-slide-up"
      style={{ animationDelay: `${delay}s`, animationFillMode: 'both' }}
    >
      {/* Image container */}
      <Link to={`/product/${product.id}`} className="block relative overflow-hidden bg-dark-700 aspect-[3/4]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain p-6 transition-transform duration-700 group-hover:scale-105"
          style={{ filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.5))' }}
        />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900/90 via-dark-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Add to cart button — slides up on hover */}
        <div className="absolute bottom-4 left-4 right-4 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400">
          <button
            onClick={(e) => onAddToCart(product, e)}
            className="w-full btn-primary py-2 text-[10px]"
          >
            Add to Cart — 55ml
          </button>
        </div>

        {/* Wishlist icon */}
        <button
          onClick={(e) => { e.preventDefault(); onToggleWish() }}
          className={`absolute top-3 right-3 w-8 h-8 border flex items-center justify-center transition-all duration-200
            ${wishlisted
              ? 'border-gold-500 text-gold-500 bg-dark-800/90'
              : 'border-silver-800/50 text-silver-700 bg-dark-800/70 opacity-0 group-hover:opacity-100'
            }`}
        >
          <svg className="w-3.5 h-3.5" fill={wishlisted ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>
        </button>

        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span className={`category-badge-${product.category.toLowerCase()} text-[8px]`}>
            {product.category}
          </span>
        </div>
      </Link>

      {/* Card info */}
      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-display text-lg text-silver-100 leading-tight hover:text-gold-400 transition-colors duration-200">
            {product.name}
          </h3>
          <p className="font-body text-[10px] text-silver-700 tracking-wide italic mt-0.5">
            Inspired by {product.inspiration}
          </p>
        </Link>

        <div className="flex items-center justify-between mt-3 pt-3 border-t border-silver-900/50">
          <div>
            <p className="font-body text-sm text-gold-500 font-medium">
              Rs {product.price_55ml.toLocaleString()}
            </p>
            <p className="font-body text-[9px] text-silver-700 tracking-wider">
              3ml — Rs {product.price_3ml.toLocaleString()}
            </p>
          </div>
          <Link
            to={`/product/${product.id}`}
            className="font-body text-[9px] tracking-[0.2em] uppercase text-silver-600 hover:text-gold-500 transition-colors duration-200"
          >
            Details →
          </Link>
        </div>
      </div>
    </div>
  )
}

/* ════════════════════════════════════════
   PRODUCT ROW — List View
════════════════════════════════════════ */
function ProductRow({ product, onAddToCart, onToggleWish, wishlisted }) {
  return (
    <div className="group flex gap-5 bg-dark-700 border border-silver-900 hover:border-maroon-700 transition-all duration-400 p-4">

      {/* Image */}
      <Link to={`/product/${product.id}`} className="shrink-0 w-20 h-20 bg-dark-600 flex items-center justify-center overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain p-2 transition-transform duration-500 group-hover:scale-105"
          style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.4))' }}
        />
      </Link>

      {/* Info */}
      <div className="flex-1 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <span className={`category-badge-${product.category.toLowerCase()} text-[8px] mb-1 inline-block`}>
            {product.category}
          </span>
          <Link to={`/product/${product.id}`}>
            <h3 className="font-display text-xl text-silver-100 hover:text-gold-400 transition-colors">{product.name}</h3>
          </Link>
          <p className="font-body text-xs text-silver-600 italic mt-0.5">Inspired by {product.inspiration}</p>
          <p className="font-body text-xs text-silver-700 mt-1 leading-relaxed line-clamp-1">{product.description}</p>
        </div>

        {/* Pricing + actions */}
        <div className="flex items-center gap-5 shrink-0">
          <div className="text-right">
            <p className="font-display text-lg text-gold-500">Rs {product.price_55ml.toLocaleString()}</p>
            <p className="font-body text-[10px] text-silver-700 tracking-wider">3ml — Rs {product.price_3ml.toLocaleString()}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={(e) => onAddToCart(product, e)}
              className="btn-primary py-2 px-4 text-[10px] whitespace-nowrap"
            >
              Add to Cart
            </button>
            <button
              onClick={(e) => { e.preventDefault(); onToggleWish() }}
              className={`w-9 h-9 border flex items-center justify-center transition-colors duration-200 ${
                wishlisted ? 'border-gold-500 text-gold-500' : 'border-silver-800 text-silver-600 hover:border-gold-500 hover:text-gold-500'
              }`}
            >
              <svg className="w-4 h-4" fill={wishlisted ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
