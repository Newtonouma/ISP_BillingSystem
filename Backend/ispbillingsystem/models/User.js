const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  phone: String,
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['admin', 'billing', 'support'], default: 'support' }
});

module.exports = mongoose.model('User', UserSchema);
