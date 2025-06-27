const mongoose = require('mongoose');

const QuotationItemSchema = new mongoose.Schema({
  materialId: String,
  description: String,
  qty: Number,
  baseUnit: String,
  orderUnit: String,
  location: String,
  unit: String,
  vendorId: String,  
  vendorName: String ,
  
materialgroup: String,

buyerGroup: String,
deliveryDate: Date,
  price: Number
});

const QuotationSchema = new mongoose.Schema({
    quotationNumber: { type: String, unique: true },
  indentId: String,
  categoryId: String,
  rfqCategoryId: String,
  vendor: String,
  vendorName: String,
  validityDate:Date,
  note: String,
  items: [QuotationItemSchema]
}, { timestamps: true });

module.exports = mongoose.model('Quotation', QuotationSchema);