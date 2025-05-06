import mongoose from 'mongoose';

const InvoiceSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
  amount: Number,
  dueDate: Date,
  status: { type: String, enum: ['pending', 'paid', 'overdue'], default: 'pending' }
});

const Invoice = mongoose.model('Invoice', InvoiceSchema);
export default Invoice;
