const mongoose = require('mongoose');

const IndentItemSchema = new mongoose.Schema({
  materialId: String,
  description: String,
  baseUnit: String,
  orderUnit: String,
  qty: Number,
  deliveryDate: String,
  location: String,
  buyerGroup: String,
  materialgroup: String,
});

const IndentRequestSchema = new mongoose.Schema({
  indentId: String,
  categoryId: String,
  categoryName: String,
  items: [IndentItemSchema],
}, { timestamps: true });

module.exports = mongoose.model('IndentRequest', IndentRequestSchema);

