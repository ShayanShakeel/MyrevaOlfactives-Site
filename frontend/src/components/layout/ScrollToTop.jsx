// ─────────────────────────────────────────────
//  ScrollToTop — fixes the "teleported to bottom"
//  bug by resetting scroll position on every
//  route change. Drop this inside <BrowserRouter>
//  in App.jsx and it works automatically.
// ─────────────────────────────────────────────

import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  return null
}
