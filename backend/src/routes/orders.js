import express from 'express'
import Order   from '../models/Order.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

// POST /api/orders — place a new order (public, no login required)
router.post('/', async (req, res) => {
  try {
    const orderData = req.body

    // Attach user if token provided
    const header = req.headers.authorization
    if (header?.startsWith('Bearer ')) {
      try {
        const jwt     = await import('jsonwebtoken')
        const decoded = jwt.default.verify(
          header.split(' ')[1],
          process.env.JWT_SECRET
        )
        orderData.user = decoded.id
      } catch { /* guest order — no user attached */ }
    }

    const order = await Order.create(orderData)
    res.status(201).json(order)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// GET /api/orders — all orders for logged-in user (protected)
router.get('/', protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.userId }).sort({ placedAt: -1 })
    res.json(orders)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// GET /api/orders/:id — single order by orderId string
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findOne({ orderId: req.params.id })
    if (!order) return res.status(404).json({ message: 'Order not found' })
    res.json(order)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

export default router
