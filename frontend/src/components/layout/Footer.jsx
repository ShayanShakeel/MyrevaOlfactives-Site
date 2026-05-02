// ─────────────────────────────────────────────
//  Footer — luxury minimal
// ─────────────────────────────────────────────

import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-silver-900 bg-dark-800 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Brand */}
          <div>
            <div className="mb-4">
              <p className="font-accent text-base tracking-[0.3em] text-silver-100 uppercase">Myreva</p>
              <p className="font-display text-xs tracking-[0.5em] text-gold-500 uppercase italic">Olfactives</p>
            </div>
            <p className="font-body text-silver-600 text-sm leading-relaxed">
              Luxury fragrances inspired by the world's finest houses. 
              Crafted for those who know that scent is identity.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="font-accent text-xs tracking-[0.25em] text-gold-500 uppercase mb-4">Navigate</p>
            <div className="flex flex-col gap-2">
              {[
                { to: '/',          label: 'Home' },
                { to: '/catalogue', label: 'Shop All' },
                { to: '/wishlist',  label: 'Wishlist' },
                { to: '/orders',    label: 'My Orders' },
              ].map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className="font-body text-sm text-silver-600 hover:text-silver-200 transition-colors tracking-wide"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="font-accent text-xs tracking-[0.25em] text-gold-500 uppercase mb-4">Connect</p>
            <div className="flex flex-col gap-2">
              <a
                href="https://wa.me/923293758981"
                target="_blank"
                rel="noreferrer"
                className="font-body text-sm text-silver-600 hover:text-silver-200 transition-colors tracking-wide"
              >
                WhatsApp
              </a>
              <a
                href="https://instagram.com/myrevaolfactives"
                target="_blank"
                rel="noreferrer"
                className="font-body text-sm text-silver-600 hover:text-silver-200 transition-colors tracking-wide"
              >
                Instagram
              </a>
              <a
                href="https://facebook.com/myrevaolfactives"
                target="_blank"
                rel="noreferrer"
                className="font-body text-sm text-silver-600 hover:text-silver-200 transition-colors tracking-wide"
              >
                Facebook
              </a>
              <a
                href="mailto:myrevaolfactives@gmail.com"
                className="font-body text-sm text-silver-600 hover:text-silver-200 transition-colors tracking-wide"
              >
                Email
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-6 border-t border-silver-900 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-silver-700 tracking-wide">
            © {new Date().getFullYear()} Myreva Olfactives. All rights reserved.
          </p>
          <div className="w-16 h-px bg-gold-500 opacity-50" />
          <p className="font-body text-xs text-silver-700 tracking-wide">
            Karachi, Pakistan
          </p>
        </div>
      </div>
    </footer>
  )
}
