// models/CustomerCategory.js
const mongoose = require('mongoose');

const customerCategorySchema = new mongoose.Schema({
  categoryName: { type: String, required: true },
  prefix: { type: String, required: true },
  rangeFrom: { type: Number, required: true },
  rangeTo: { type: Number, required: true }
});

module.exports = mongoose.model('CustomerCategory', customerCategorySchema);
