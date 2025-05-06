const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  invoiceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Invoice' },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
  amount: Number,
  datePaid: Date
});

module.exports = mongoose.model('Payment', PaymentSchema);
