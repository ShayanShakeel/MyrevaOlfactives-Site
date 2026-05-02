import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import products from '../data/products'
import useCartStore from '../store/cartStore'
import useWishlistStore from '../store/wishlistStore'

// ─── Intersection Observer hook for scroll reveals ───────────────
function useReveal() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.12 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return [ref, visible]
}

const featured = products.filter((p) => p.featured).slice(0, 5)
const categories = ['Homme', 'Femme', 'Unisex']
const categoryImages = {
  Homme:  products.find((p) => p.category === 'Homme')?.image,
  Femme:  products.find((p) => p.category === 'Femme')?.image,
  Unisex: products.find((p) => p.category === 'Unisex')?.image,
}
const marqueeItems = [
  'Luxury Fragrances', '✦', 'Crafted for Identity', '✦',
  'Karachi, Pakistan', '✦', "Inspired by the World's Finest", '✦',
  'Myreva Olfactives', '✦', 'Wear Your Signature', '✦',
]

export default function HomePage() {
  const addItem      = useCartStore((s) => s.addItem)
  const openCart     = useCartStore((s) => s.openCart)
  const toggleItem   = useWishlistStore((s) => s.toggleItem)
  const isWishlisted = useWishlistStore((s) => s.isWishlisted)

  const [heroRef,     heroVisible]     = useReveal()
  const [featuredRef, featuredVisible] = useReveal()
  const [catRef,      catVisible]      = useReveal()
  const [storyRef,    storyVisible]    = useReveal()
  const [ctaRef,      ctaVisible]      = useReveal()

  const handleAddToCart = (product) => {
    addItem(product, '55ml')
    openCart()
  }

  return (
    <div className="bg-dark-900 overflow-x-hidden">

      {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">

        {/* Grain texture */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }}
        />

        {/* Maroon radial glow */}
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(139,26,26,0.18) 0%, transparent 70%)' }}
        />

        {/* Vertical text decoration */}
        <div className="absolute left-5 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-3 select-none pointer-events-none">
          <div className="w-px h-20 bg-gradient-to-b from-transparent to-silver-800" />
          <span className="font-accent text-[9px] tracking-[0.4em] text-silver-800 uppercase"
            style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
            Est. MMXXIV
          </span>
          <div className="w-px h-20 bg-gradient-to-t from-transparent to-silver-800" />
        </div>

        {/* Giant decorative numeral */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden lg:block select-none pointer-events-none">
          <span className="font-display text-[9rem] font-light text-silver-900/20 leading-none">01</span>
        </div>

        <div className="max-w-7xl mx-auto px-10 lg:px-20 w-full grid lg:grid-cols-2 gap-16 items-center py-28">

          {/* Left — Text content */}
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-8"
              style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? 'none' : 'translateY(20px)', transition: 'opacity 0.7s ease, transform 0.7s ease' }}>
              <div className="w-8 h-px bg-gold-500" />
              <span className="font-accent text-[10px] tracking-[0.4em] text-gold-500 uppercase">New Collection · 2025</span>
            </div>

            <h1 className="font-display leading-none mb-6">
              {['Wear', 'Your', 'Signature.'].map((word, i) => (
                <span key={word} className="block"
                  style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? 'none' : 'translateY(40px)', transition: `opacity 0.8s ease ${0.1 + i * 0.13}s, transform 0.8s ease ${0.1 + i * 0.13}s` }}>
                  {i === 1
                    ? <em className="not-italic text-gradient-gold" style={{ fontSize: 'clamp(3.5rem,8vw,6.5rem)' }}>{word}</em>
                    : <span className="text-silver-100" style={{ fontSize: 'clamp(3.5rem,8vw,6.5rem)' }}>{word}</span>
                  }
                </span>
              ))}
            </h1>

            <div className="flex items-center gap-3 mb-8"
              style={{ opacity: heroVisible ? 1 : 0, transition: 'opacity 0.8s ease 0.5s' }}>
              <div className="h-px w-12 bg-maroon-700" />
              <span className="text-silver-800 text-xs">✦</span>
              <div className="h-px w-12 bg-maroon-700" />
            </div>

            <p className="font-body text-silver-500 text-base leading-relaxed max-w-md mb-10 font-light"
              style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? 'none' : 'translateY(20px)', transition: 'opacity 0.8s ease 0.55s, transform 0.8s ease 0.55s' }}>
              Luxury fragrances inspired by the world's finest houses — crafted
              for those who believe a scent is not worn, it is lived.
            </p>

            <div className="flex flex-wrap gap-4"
              style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? 'none' : 'translateY(20px)', transition: 'opacity 0.8s ease 0.65s, transform 0.8s ease 0.65s' }}>
              <Link to="/catalogue" className="btn-primary group relative overflow-hidden">
                <span className="relative z-10">Explore Collection</span>
              </Link>
              <Link to="/catalogue" className="btn-secondary">Shop Homme</Link>
            </div>

            <div className="flex gap-10 mt-14 pt-10 border-t border-silver-900/50"
              style={{ opacity: heroVisible ? 1 : 0, transition: 'opacity 0.8s ease 0.75s' }}>
              {[{ num: '10+', label: 'Fragrances' }, { num: '2', label: 'Size Variants' }, { num: '100%', label: 'Luxury' }].map(({ num, label }) => (
                <div key={label}>
                  <p className="font-display text-3xl text-silver-100">{num}</p>
                  <p className="font-body text-[10px] tracking-[0.2em] text-silver-600 uppercase mt-1">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — floating product images */}
          <div className="relative hidden lg:block"
            style={{ opacity: heroVisible ? 1 : 0, transform: heroVisible ? 'none' : 'translateX(40px)', transition: 'opacity 1s ease 0.3s, transform 1s ease 0.3s' }}>

            {/* Maroon glow behind */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full -z-10 pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(139,26,26,0.35) 0%, transparent 70%)' }} />

            {/* Main product */}
            <div className="relative ml-10">
              <div className="absolute inset-0 border border-silver-800/25 translate-x-4 translate-y-4" />
              <img src={featured[0]?.image} alt={featured[0]?.name}
                className="w-full max-w-xs mx-auto object-contain"
                style={{ filter: 'drop-shadow(0 20px 60px rgba(139,26,26,0.45))' }} />
              <div className="absolute -bottom-5 -left-10 bg-dark-700 border border-silver-800 px-5 py-3 shadow-luxury">
                <p className="font-display text-lg text-silver-100">{featured[0]?.name}</p>
                <p className="font-body text-xs text-gold-500 tracking-wider">From Rs {featured[0]?.price_3ml?.toLocaleString()}</p>
              </div>
            </div>

            {/* Floating secondary */}
            <div className="absolute -top-10 -right-2 w-28 border border-silver-800/40"
              style={{ animation: 'float 4s ease-in-out infinite' }}>
              <img src={featured[1]?.image} alt={featured[1]?.name} className="w-full object-contain p-2"
                style={{ filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.6))' }} />
            </div>

            {/* Floating tertiary */}
            <div className="absolute -bottom-14 right-4 w-20 border border-silver-800/40"
              style={{ animation: 'float 5s ease-in-out infinite 1.2s' }}>
              <img src={featured[2]?.image} alt={featured[2]?.name} className="w-full object-contain p-2"
                style={{ filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.6))' }} />
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
          <span className="font-body text-[9px] tracking-[0.4em] text-silver-500 uppercase">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-silver-500 to-transparent" style={{ animation: 'pulse 2s ease-in-out infinite' }} />
        </div>
      </section>


      {/* ══════════════════════════════════════
          MARQUEE STRIP
      ══════════════════════════════════════ */}
      <div className="bg-maroon-800 border-y border-maroon-700 py-3 overflow-hidden relative">
        <div className="flex gap-12 whitespace-nowrap" style={{ animation: 'marquee 28s linear infinite' }}>
          {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="font-accent text-[11px] tracking-[0.3em] text-silver-200 uppercase shrink-0">{item}</span>
          ))}
        </div>
      </div>


      {/* ══════════════════════════════════════
          FEATURED COLLECTION
      ══════════════════════════════════════ */}
      <section ref={featuredRef} className="max-w-7xl mx-auto px-6 lg:px-12 py-28">

        <div className="mb-16"
          style={{ opacity: featuredVisible ? 1 : 0, transform: featuredVisible ? 'none' : 'translateY(30px)', transition: 'opacity 0.8s ease, transform 0.8s ease' }}>
          <p className="section-subtitle mb-3">Handpicked for you</p>
          <div className="flex items-end justify-between flex-wrap gap-4">
            <h2 className="section-title">Featured <em>Collection</em></h2>
            <Link to="/catalogue" className="btn-ghost flex items-center gap-2 group">
              View All
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
          <div className="gold-divider mt-4" />
        </div>

        {/* Asymmetric grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">

          {/* Hero card — large left */}
          {featured[0] && (
            <div className="lg:col-span-5 group relative card-luxury cursor-pointer"
              style={{ opacity: featuredVisible ? 1 : 0, transform: featuredVisible ? 'none' : 'translateY(40px)', transition: 'opacity 0.8s ease 0.1s, transform 0.8s ease 0.1s' }}>
              <div className="relative overflow-hidden bg-dark-700 aspect-[3/4]">
                <img src={featured[0].image} alt={featured[0].name}
                  className="w-full h-full object-contain p-8 transition-transform duration-700 group-hover:scale-105"
                  style={{ filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.5))' }} />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-6 left-6 right-6 flex gap-3 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400">
                  <button onClick={() => handleAddToCart(featured[0])} className="flex-1 btn-primary text-center py-2 text-xs">
                    Add to Cart
                  </button>
                  <button
                    onClick={() => toggleItem(featured[0])}
                    className={`w-10 h-10 border flex items-center justify-center transition-colors duration-200 ${isWishlisted(featured[0].id) ? 'border-gold-500 text-gold-500' : 'border-silver-700 text-silver-400 hover:border-gold-500 hover:text-gold-500'}`}>
                    <svg className="w-4 h-4" fill={isWishlisted(featured[0].id) ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                    </svg>
                  </button>
                </div>
                <div className="absolute top-4 left-4 bg-maroon-800 border border-maroon-600 px-3 py-1">
                  <span className="font-accent text-[9px] tracking-[0.3em] text-gold-400 uppercase">Featured</span>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <span className={`category-badge-${featured[0].category.toLowerCase()} inline-block mb-2`}>{featured[0].category}</span>
                    <h3 className="font-display text-2xl text-silver-100">{featured[0].name}</h3>
                    <p className="font-body text-xs text-silver-600 mt-1 tracking-wide italic">Inspired by {featured[0].inspiration}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-display text-xl text-gold-500">Rs {featured[0].price_55ml.toLocaleString()}</p>
                    <p className="font-body text-[10px] text-silver-700 tracking-wider">55ml</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Right — 2x2 grid */}
          <div className="lg:col-span-7 grid grid-cols-2 gap-4">
            {featured.slice(1, 5).map((product, idx) => (
              <Link to={`/product/${product.id}`} key={product.id}
                className="group relative card-luxury block"
                style={{ opacity: featuredVisible ? 1 : 0, transform: featuredVisible ? 'none' : 'translateY(40px)', transition: `opacity 0.8s ease ${0.2 + idx * 0.1}s, transform 0.8s ease ${0.2 + idx * 0.1}s` }}>
                <div className="relative overflow-hidden bg-dark-700 aspect-square">
                  <img src={product.image} alt={product.name}
                    className="w-full h-full object-contain p-6 transition-transform duration-700 group-hover:scale-110"
                    style={{ filter: 'drop-shadow(0 6px 20px rgba(0,0,0,0.4))' }} />
                  <button
                    onClick={(e) => { e.preventDefault(); toggleItem(product) }}
                    className={`absolute top-3 right-3 w-8 h-8 border flex items-center justify-center transition-all duration-200 ${isWishlisted(product.id) ? 'border-gold-500 text-gold-500 bg-dark-800/80' : 'border-silver-800/60 text-silver-700 opacity-0 group-hover:opacity-100 bg-dark-800/80'}`}>
                    <svg className="w-3.5 h-3.5" fill={isWishlisted(product.id) ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                    </svg>
                  </button>
                </div>
                <div className="p-4">
                  <span className={`category-badge-${product.category.toLowerCase()} text-[8px] tracking-[0.15em] mb-1.5 inline-block`}>{product.category}</span>
                  <h3 className="font-display text-lg text-silver-100 leading-tight">{product.name}</h3>
                  <div className="flex items-center justify-between mt-2">
                    <p className="font-body text-sm text-gold-500">Rs {product.price_55ml.toLocaleString()}</p>
                    <button
                      onClick={(e) => { e.preventDefault(); handleAddToCart(product) }}
                      className="font-body text-[9px] tracking-[0.2em] uppercase text-silver-600 hover:text-gold-500 border border-silver-800 hover:border-gold-500 px-2 py-1 transition-colors duration-200">
                      + Cart
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════
          CATEGORIES
      ══════════════════════════════════════ */}
      <section ref={catRef} className="py-20 bg-dark-800 border-y border-silver-900/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">

          <div className="text-center mb-14"
            style={{ opacity: catVisible ? 1 : 0, transform: catVisible ? 'none' : 'translateY(30px)', transition: 'opacity 0.8s ease, transform 0.8s ease' }}>
            <p className="section-subtitle mb-3">Discover</p>
            <h2 className="section-title">Shop by <em>Category</em></h2>
            <div className="gold-divider mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {categories.map((cat, i) => (
              <Link to={`/catalogue?category=${cat}`} key={cat} className="group relative overflow-hidden block"
                style={{ opacity: catVisible ? 1 : 0, transform: catVisible ? 'none' : 'translateY(50px)', transition: `opacity 0.8s ease ${i * 0.15}s, transform 0.8s ease ${i * 0.15}s` }}>
                <div className="relative aspect-[3/4] bg-dark-700 border border-silver-900 group-hover:border-maroon-700 transition-colors duration-500 overflow-hidden">
                  <img src={categoryImages[cat]} alt={cat}
                    className="absolute inset-0 w-full h-full object-contain p-8 transition-transform duration-700 group-hover:scale-105 opacity-70 group-hover:opacity-90"
                    style={{ filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.8))' }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/20 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-t from-maroon-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  {/* Corner decorations */}
                  {[['top-4 left-4', 'border-t border-l'], ['top-4 right-4', 'border-t border-r'], ['bottom-16 left-4', 'border-b border-l'], ['bottom-16 right-4', 'border-b border-r']].map(([pos, cls]) => (
                    <div key={pos} className={`absolute ${pos} w-5 h-5 ${cls} border-silver-700/50 group-hover:border-gold-500/70 transition-colors duration-500`} />
                  ))}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
                    <p className="font-accent text-[10px] tracking-[0.5em] text-gold-500 uppercase mb-1">
                      {cat === 'Homme' ? 'For Him' : cat === 'Femme' ? 'For Her' : 'For All'}
                    </p>
                    <h3 className="font-display text-4xl text-silver-100">{cat}</h3>
                    <div className="flex items-center justify-center gap-3 mt-3">
                      <div className="h-px w-8 bg-gold-500/50 group-hover:w-12 transition-all duration-500" />
                      <span className="font-body text-[10px] tracking-[0.3em] text-silver-500 uppercase group-hover:text-silver-300 transition-colors duration-300">Explore</span>
                      <div className="h-px w-8 bg-gold-500/50 group-hover:w-12 transition-all duration-500" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════
          BRAND STORY
      ══════════════════════════════════════ */}
      <section ref={storyRef} className="py-32 relative overflow-hidden">
        <div className="absolute -right-16 top-1/2 -translate-y-1/2 font-display text-[18rem] font-light text-silver-900/[0.04] leading-none select-none pointer-events-none">M</div>
        <div className="max-w-4xl mx-auto px-8 text-center relative z-10"
          style={{ opacity: storyVisible ? 1 : 0, transition: 'opacity 1s ease' }}>
          <div className="flex items-center justify-center gap-4 mb-10">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold-500" />
            <span className="text-gold-500 text-xl">✦</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold-500" />
          </div>
          <p className="font-accent text-[10px] tracking-[0.5em] text-gold-500 uppercase mb-6">Our Philosophy</p>
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl text-silver-100 leading-tight mb-8"
            style={{ opacity: storyVisible ? 1 : 0, transform: storyVisible ? 'none' : 'translateY(30px)', transition: 'opacity 0.9s ease 0.2s, transform 0.9s ease 0.2s' }}>
            Scent is not worn.<br /><em className="text-gradient-silver">It is lived.</em>
          </h2>
          <p className="font-body text-silver-500 text-lg leading-relaxed max-w-2xl mx-auto mb-4 font-light"
            style={{ opacity: storyVisible ? 1 : 0, transform: storyVisible ? 'none' : 'translateY(20px)', transition: 'opacity 0.9s ease 0.35s, transform 0.9s ease 0.35s' }}>
            At Myreva Olfactives, we believe every fragrance tells a story — of confidence,
            of memory, of who you are when no one is watching. Our collection draws from the
            world's most revered perfume houses, reinterpreted for those who refuse to blend in.
          </p>
          <p className="font-body text-silver-600 text-base leading-relaxed max-w-xl mx-auto mb-12 font-light"
            style={{ opacity: storyVisible ? 1 : 0, transform: storyVisible ? 'none' : 'translateY(20px)', transition: 'opacity 0.9s ease 0.45s, transform 0.9s ease 0.45s' }}>
            Crafted with precision, offered at a fraction of the price — because luxury should never be a privilege.
          </p>
          <div style={{ opacity: storyVisible ? 1 : 0, transition: 'opacity 0.9s ease 0.55s' }}>
            <Link to="/catalogue" className="btn-primary inline-block">Discover the Collection</Link>
          </div>
          <div className="flex items-center justify-center gap-4 mt-12">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-silver-800" />
            <span className="text-silver-800 text-xs">✦</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-silver-800" />
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════
          INFO STRIP
      ══════════════════════════════════════ */}
      <div className="border-y border-silver-900/30 bg-dark-800">
        <div className="max-w-7xl mx-auto px-8 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: '◈', title: '55ml Bottles', desc: 'Full-size luxury. Your everyday signature, your statement piece.' },
            { icon: '◇', title: '3ml Testers',  desc: 'Try before you commit. Explore any fragrance at a fraction of the cost.' },
            { icon: '◉', title: 'Manual Payment', desc: 'Bank transfer. Simple, secure. Confirm on WhatsApp after paying.' },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="flex gap-5 items-start group">
              <span className="text-gold-500 text-2xl mt-0.5 group-hover:scale-110 transition-transform duration-300 inline-block">{icon}</span>
              <div>
                <p className="font-accent text-sm tracking-widest text-silver-200 uppercase mb-1">{title}</p>
                <p className="font-body text-sm text-silver-600 leading-relaxed font-light">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>


      {/* ══════════════════════════════════════
          FINAL CTA
      ══════════════════════════════════════ */}
      <section ref={ctaRef} className="py-28 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{ background: 'linear-gradient(135deg, #4A0E0E 0%, #8B1A1A 50%, #6B1414 100%)' }} />
        <div className="absolute inset-0 opacity-[0.02]"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-8 text-center"
          style={{ opacity: ctaVisible ? 1 : 0, transform: ctaVisible ? 'none' : 'translateY(30px)', transition: 'opacity 0.9s ease, transform 0.9s ease' }}>
          <p className="section-subtitle mb-4">Get in Touch</p>
          <h2 className="section-title mb-6">Questions? We're on <em>WhatsApp.</em></h2>
          <div className="gold-divider mx-auto mb-8" />
          <p className="font-body text-silver-500 text-base mb-10 max-w-lg mx-auto font-light leading-relaxed">
            Not sure which fragrance suits you? Message us and we'll help you find
            your perfect scent — personally.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="https://wa.me/923293758981" target="_blank" rel="noreferrer"
              className="btn-primary flex items-center gap-3">
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.013.49 3.912 1.359 5.587L0 24l6.584-1.335A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.659-.489-5.192-1.346l-.373-.22-3.862.784.815-3.777-.242-.389A9.957 9.957 0 012 12C2 6.478 6.478 2 12 2s10 4.478 10 10-4.478 10-10 10z"/>
              </svg>
              Message on WhatsApp
            </a>
            <Link to="/catalogue" className="btn-secondary">Browse Collection</Link>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-33.33%); } }
        @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
      `}</style>
    </div>
  )
}
