import { Link } from 'react-router-dom'
import useWishlistStore from '../store/wishlistStore'
import useCartStore from '../store/cartStore'

export default function WishlistPage() {
  const { items, removeItem } = useWishlistStore()
  const addItem   = useCartStore((s) => s.addItem)
  const openCart  = useCartStore((s) => s.openCart)

  const moveToCart = (product) => {
    addItem(product, '55ml')
    removeItem(product.id)
    openCart()
  }

  return (
    <div className="bg-dark-900 min-h-screen">

      {/* Header */}
      <div className="relative py-20 border-b border-silver-900/40 overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-5"
          style={{ background: 'linear-gradient(to left, #8B1A1A, transparent)' }} />
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <div className="flex items-center gap-2 mb-6">
            <Link to="/" className="font-body text-xs text-silver-700 hover:text-silver-400 tracking-widest uppercase transition-colors">Home</Link>
            <span className="text-silver-800 text-xs">›</span>
            <span className="font-body text-xs text-gold-500 tracking-widest uppercase">Wishlist</span>
          </div>
          <p className="section-subtitle mb-3">Saved for later</p>
          <h1 className="section-title">Your <em>Wishlist</em></h1>
          <div className="gold-divider mt-5" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 gap-6 text-center">
            <svg className="w-16 h-16 text-silver-800" fill="none" stroke="currentColor" strokeWidth={0.8} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
            <div>
              <p className="font-display text-4xl text-silver-600 mb-2">Nothing saved yet</p>
              <p className="font-body text-silver-700 text-sm">Browse the collection and save fragrances you love.</p>
            </div>
            <Link to="/catalogue" className="btn-primary">Browse Collection</Link>
          </div>
        ) : (
          <>
            <p className="font-body text-sm text-silver-600 tracking-wider mb-8">
              {items.length} item{items.length !== 1 ? 's' : ''} saved
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
              {items.map((product) => (
                <div key={product.id} className="group card-luxury animate-slide-up">
                  <Link to={`/product/${product.id}`} className="block relative overflow-hidden bg-dark-700 aspect-[3/4]">
                    <img src={product.image} alt={product.name}
                      className="w-full h-full object-contain p-6 transition-transform duration-700 group-hover:scale-105"
                      style={{ filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.5))' }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <span className={`absolute top-3 left-3 category-badge-${product.category.toLowerCase()} text-[8px]`}>
                      {product.category}
                    </span>
                    {/* Remove */}
                    <button
                      onClick={(e) => { e.preventDefault(); removeItem(product.id) }}
                      className="absolute top-3 right-3 w-8 h-8 border border-silver-800/50 bg-dark-800/80 text-silver-600 hover:border-maroon-500 hover:text-maroon-400 flex items-center justify-center transition-colors duration-200 opacity-0 group-hover:opacity-100"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </Link>
                  <div className="p-4">
                    <h3 className="font-display text-lg text-silver-100">{product.name}</h3>
                    <p className="font-body text-[10px] text-silver-700 italic mt-0.5">Inspired by {product.inspiration}</p>
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-silver-900/50">
                      <p className="font-body text-sm text-gold-500">Rs {product.price_55ml?.toLocaleString()}</p>
                      <button
                        onClick={() => moveToCart(product)}
                        className="font-body text-[9px] tracking-[0.15em] uppercase text-silver-500 hover:text-gold-500 border border-silver-800 hover:border-gold-500 px-3 py-1.5 transition-colors duration-200"
                      >
                        → Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
