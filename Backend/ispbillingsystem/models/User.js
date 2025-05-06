import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  phone: String,
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['admin', 'billing', 'support'], default: 'support' }
});

const User = mongoose.model('User', UserSchema);

export default User;
