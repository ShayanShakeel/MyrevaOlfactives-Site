import mongoose from 'mongoose'

const orderItemSchema = new mongoose.Schema({
  id:       Number,
  name:     String,
  image:    String,
  size:     String,
  quantity: Number,
  price:    Number,
})

const orderSchema = new mongoose.Schema(
  {
    orderId:  { type: String, required: true, unique: true },
    user:     { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    items:    [orderItemSchema],
    subtotal:    Number,
    shippingFee: Number,
    total:       Number,
    customerInfo: {
      name:            String,
      email:           String,
      phone:           String,
      shippingAddress: String,
      billingAddress:  String,
    },
    placedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
)

export default mongoose.model('Order', orderSchema)
