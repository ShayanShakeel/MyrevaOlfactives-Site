// ═══════════════════════════════════════════════════════════════
//  FACADE PATTERN — Order Placement
//  OrderFacade exposes one clean method: placeOrder()
//  Internally it coordinates multiple sub-systems.
//  The checkout page has zero knowledge of what happens inside.
// ═══════════════════════════════════════════════════════════════

import paymentConfig from '../../config/paymentConfig'
import api from '../../utils/api'

// ── Sub-system 1: CartValidator ──────────────────────────────────
class CartValidator {
  validate(cartItems) {
    if (!cartItems || cartItems.length === 0) {
      throw new Error('Your cart is empty. Please add items before checking out.')
    }
    return true
  }
}

// ── Sub-system 2: OrderIDGenerator ──────────────────────────────
class OrderIDGenerator {
  generate() {
    const chars     = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    const random    = Array.from({ length: 8 }, () =>
      chars[Math.floor(Math.random() * chars.length)]
    ).join('')
    return `MYR-${random}`
  }
}

// ── Sub-system 3: ShippingCalculator ────────────────────────────
class ShippingCalculator {
  calculate(subtotal) {
    if (subtotal >= paymentConfig.shipping.freeAbove) return 0
    return paymentConfig.shipping.standard
  }
}

// ── Sub-system 4: OrderSummaryBuilder ───────────────────────────
class OrderSummaryBuilder {
  build({ orderId, cartItems, customerInfo, shippingFee }) {
    const subtotal = cartItems.reduce(
      (sum, item) =>
        sum + (item.size === '55ml' ? item.price_55ml : item.price_3ml) * item.quantity,
      0
    )
    const total = subtotal + shippingFee

    return {
      orderId,
      items: cartItems.map((item) => ({
        id:       item.id,
        name:     item.name,
        image:    item.image,
        size:     item.size,
        quantity: item.quantity,
        price:    item.size === '55ml' ? item.price_55ml : item.price_3ml,
      })),
      subtotal,
      shippingFee,
      total,
      customerInfo,
      paymentAccounts: paymentConfig.accounts,
      placedAt: new Date().toISOString(),
    }
  }
}

// ── Sub-system 5: WhatsAppLinkBuilder ───────────────────────────
class WhatsAppLinkBuilder {
  build(orderId, total) {
    const message    = paymentConfig.whatsappMessage(orderId, total)
    const encoded    = encodeURIComponent(message)
    const number     = paymentConfig.whatsapp.replace(/\D/g, '')
    return `https://wa.me/${number}?text=${encoded}`
  }
}

// ── Sub-system 6: ApiService ─────────────────────────────────────
class ApiService {
  async saveOrder(orderData) {
    try {
      const { data } = await api.post('/orders', orderData)
      return data
    } catch (err) {
      // If backend is unreachable, gracefully fall back (order still shown locally)
      console.warn('Backend unavailable — order saved locally only.', err.message)
      return orderData
    }
  }
}

// ── FACADE ───────────────────────────────────────────────────────
class OrderFacade {
  constructor() {
    this.validator       = new CartValidator()
    this.idGenerator     = new OrderIDGenerator()
    this.shippingCalc    = new ShippingCalculator()
    this.summaryBuilder  = new OrderSummaryBuilder()
    this.whatsappBuilder = new WhatsAppLinkBuilder()
    this.apiService      = new ApiService()
  }

  async placeOrder(cartItems, customerInfo, clearCart) {
    // 1. Validate
    this.validator.validate(cartItems)

    // 2. Generate Order ID
    const orderId = this.idGenerator.generate()

    // 3. Calculate subtotal for shipping
    const subtotal = cartItems.reduce(
      (sum, item) =>
        sum + (item.size === '55ml' ? item.price_55ml : item.price_3ml) * item.quantity,
      0
    )
    const shippingFee = this.shippingCalc.calculate(subtotal)

    // 4. Build order summary object
    const orderData = this.summaryBuilder.build({
      orderId,
      cartItems,
      customerInfo,
      shippingFee,
    })

    // 5. Persist to backend
    await this.apiService.saveOrder(orderData)

    // 6. Build WhatsApp link
    const whatsappLink = this.whatsappBuilder.build(orderId, orderData.total)

    // 7. Clear cart
    if (clearCart) clearCart()

    // 8. Return the complete order object to the checkout page
    return { ...orderData, whatsappLink }
  }
}

export const orderFacade = new OrderFacade()
export default orderFacade
