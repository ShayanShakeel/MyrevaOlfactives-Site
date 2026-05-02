import express   from 'express'
import mongoose  from 'mongoose'
import cors      from 'cors'
import dotenv    from 'dotenv'

import authRoutes  from './routes/auth.js'
import orderRoutes from './routes/orders.js'

dotenv.config()

const app  = express()
const PORT = process.env.PORT || 5000

// ── Middleware ────────────────────────────────
app.use(cors({ origin: process.env.CLIENT_URL || '*' }))
app.use(express.json())

// ── Routes ────────────────────────────────────
app.use('/api/auth',   authRoutes)
app.use('/api/orders', orderRoutes)

// ── Health check ──────────────────────────────
app.get('/api/health', (_, res) => res.json({ status: 'ok', app: 'Myreva API' }))

// ── Connect to MongoDB + Start Server ─────────
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅  MongoDB connected')
    app.listen(PORT, () => console.log(`🚀  Server running on port ${PORT}`))
  })
  .catch((err) => {
    console.error('❌  MongoDB connection failed:', err.message)
    process.exit(1)
  })
