const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  phone: String,
  password: String,
  role: { type: String, enum: ['admin', 'agent'], default: 'agent' },
  contactCount: { type: Number, default: 0 },  // new field to track assigned contacts count
});

module.exports = mongoose.model('User', userSchema);
