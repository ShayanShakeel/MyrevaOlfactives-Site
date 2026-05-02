// ─────────────────────────────────────────────
//  Navbar — luxury maroon/silver theme
//  Subscribes to CartStore and AuthStore (Observer)
// ─────────────────────────────────────────────

import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import useCartStore from '../../store/cartStore'
import useWishlistStore from '../../store/wishlistStore'
import useAuthStore from '../../store/authStore'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const toggleCart = useCartStore((s) => s.toggleCart)
  const cartCount  = useCartStore((s) => s.items.reduce((sum, i) => sum + i.quantity, 0))
  const wishCount  = useWishlistStore((s) => s.items.length)
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const navLinkClass = ({ isActive }) =>
    `font-body text-xs tracking-[0.2em] uppercase transition-colors duration-200 ${
      isActive ? 'text-gold-500' : 'text-silver-400 hover:text-silver-100'
    }`

  return (
    <header className="sticky top-0 z-50 bg-dark-900/95 backdrop-blur-sm border-b border-silver-900">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex flex-col leading-none">
          <span className="font-accent text-lg tracking-[0.3em] text-silver-100 uppercase">
            Myreva
          </span>
          <span className="font-display text-[10px] tracking-[0.5em] text-gold-500 uppercase italic">
            Olfactives
          </span>
        </Link>

        {/* Desktop nav links */}
        <nav className="hidden md:flex items-center gap-10">
          <NavLink to="/"          className={navLinkClass}>Home</NavLink>
          <NavLink to="/catalogue" className={navLinkClass}>Shop</NavLink>
          <NavLink to="/wishlist"  className={navLinkClass}>Wishlist</NavLink>
          {user && <NavLink to="/orders" className={navLinkClass}>Orders</NavLink>}
        </nav>

        {/* Right icons */}
        <div className="flex items-center gap-5">

          {/* Wishlist icon */}
          <Link to="/wishlist" className="relative text-silver-400 hover:text-gold-500 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
            {wishCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-maroon-700 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-body">
                {wishCount}
              </span>
            )}
          </Link>

          {/* Cart icon */}
          <button onClick={toggleCart} className="relative text-silver-400 hover:text-gold-500 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-maroon-700 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-body">
                {cartCount}
              </span>
            )}
          </button>

          {/* Auth */}
          {user ? (
            <button onClick={handleLogout} className="btn-ghost text-xs">
              Logout
            </button>
          ) : (
            <Link to="/login" className="btn-ghost text-xs">
              Login
            </Link>
          )}

          {/* Mobile menu toggle */}
          <button
            className="md:hidden text-silver-400 hover:text-silver-100"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              }
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-silver-900 bg-dark-800 px-6 py-4 flex flex-col gap-4 animate-fade-in">
          <NavLink to="/"          className={navLinkClass} onClick={() => setMenuOpen(false)}>Home</NavLink>
          <NavLink to="/catalogue" className={navLinkClass} onClick={() => setMenuOpen(false)}>Shop</NavLink>
          <NavLink to="/wishlist"  className={navLinkClass} onClick={() => setMenuOpen(false)}>Wishlist</NavLink>
          {user && <NavLink to="/orders" className={navLinkClass} onClick={() => setMenuOpen(false)}>Orders</NavLink>}
          {!user && <NavLink to="/login" className={navLinkClass} onClick={() => setMenuOpen(false)}>Login</NavLink>}
        </div>
      )}
    </header>
  )
}
