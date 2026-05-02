// ─────────────────────────────────────────────
//  Payment Configuration
//  Replace dummy details with your real account info
// ─────────────────────────────────────────────

const paymentConfig = {
  accounts: [
    {
      bank: 'Meezan Bank',
      accountTitle: 'Myreva Olfactives',
      accountNumber: '0000-0000000-000',
      iban: 'PK00MEZN0000000000000000',
    },
    {
      bank: 'Easypaisa / JazzCash',
      accountTitle: 'Myreva Olfactives',
      accountNumber: '03XX-XXXXXXX',
      iban: null,
    },
  ],
  whatsapp: '+923293758981',
  whatsappMessage: (orderId, total) =>
    `Assalam o Alaikum! I have placed an order on Myreva Olfactives.\n\nOrder ID: ${orderId}\nTotal: Rs ${total} PKR\n\nI have transferred the payment. Please confirm my order. 🙏`,
  shipping: {
    standard: 200,       // flat shipping fee in PKR
    freeAbove: 5000,     // free shipping on orders above this amount
  },
}

export default paymentConfig
