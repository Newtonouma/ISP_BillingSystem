const mongoose = require('mongoose');

const PlanSchema = new mongoose.Schema({
  name: { type: String, required: true },
  speedMbps: Number,
  quotaGb: Number,
  price: Number,
  overageFee: Number
});

module.exports = mongoose.model('Plan', PlanSchema);
