const mongoose = require('mongoose');

const billingCategorySchema = new mongoose.Schema({
  categoryName: { type: String, required: true },
  prefix: { type: String, required: true },
  rangeStart: { type: Number, required: true },
  rangeEnd: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('BillingCategory', billingCategorySchema);
