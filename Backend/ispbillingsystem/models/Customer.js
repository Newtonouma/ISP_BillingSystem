import mongoose from 'mongoose';

const CustomerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: String,
  phone: String,
  email: String,
  status: { type: String, enum: ['active', 'suspended', 'terminated'], default: 'active' },
  planId: { type: mongoose.Schema.Types.ObjectId, ref: 'Plan' }
});

const Customer = mongoose.model('Customer', CustomerSchema);

export default Customer; // ✅ export default for ES Modules
