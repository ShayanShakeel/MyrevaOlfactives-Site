import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import CartDrawer from './components/cart/CartDrawer'

// Pages
import HomePage from './pages/HomePage'
import CataloguePage from './pages/CataloguePage'
import ProductDetailPage from './pages/ProductDetailPage'
import WishlistPage from './pages/WishlistPage'
import CheckoutPage from './pages/CheckoutPage'
import OrderConfirmationPage from './pages/OrderConfirmationPage'
import OrderHistoryPage from './pages/OrderHistoryPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ProtectedRoute from './components/auth/ProtectedRoute'

export default function App() {
  return (
    <BrowserRouter>
      {/* Cart drawer sits at root level — slides in from any page */}
      <CartDrawer />

      <div className="min-h-screen flex flex-col bg-dark-900">
        <Navbar />

        <main className="flex-1">
          <Routes>
            <Route path="/"                      element={<HomePage />} />
            <Route path="/catalogue"             element={<CataloguePage />} />
            <Route path="/product/:id"           element={<ProductDetailPage />} />
            <Route path="/wishlist"              element={<WishlistPage />} />
            <Route path="/checkout"              element={<CheckoutPage />} />
            <Route path="/order-confirmation"    element={<OrderConfirmationPage />} />
            <Route path="/login"                 element={<LoginPage />} />
            <Route path="/register"              element={<RegisterPage />} />

            {/* Protected: requires login */}
            <Route element={<ProtectedRoute />}>
              <Route path="/orders" element={<OrderHistoryPage />} />
            </Route>
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  )
}
