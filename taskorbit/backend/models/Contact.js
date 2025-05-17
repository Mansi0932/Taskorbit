const mongoose = require('mongoose');
const contactSchema = new mongoose.Schema({
  firstname: String,
  phone: String,
  notes: String,
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});
module.exports = mongoose.model('Contact', contactSchema);
