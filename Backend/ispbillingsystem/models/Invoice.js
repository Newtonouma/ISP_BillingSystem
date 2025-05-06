const mongoose = require('mongoose');

const InvoiceSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
  amount: Number,
  dueDate: Date,
  status: { type: String, enum: ['pending', 'paid', 'overdue'], default: 'pending' }
});

module.exports = mongoose.model('Invoice', InvoiceSchema);
