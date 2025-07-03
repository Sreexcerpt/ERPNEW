const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
  materialId: String,
  description: String,
  quantity: Number,
  baseUnit: String,
  unit: String,
  orderUnit: String,
  price: Number,
  priceUnit: String,
  deliveryDate: String,
    note: { type: String, maxlength: 250 }, 
});

const SalesOrderSchema = new mongoose.Schema({
  soNumber: String,
  quotationId: { type: mongoose.Schema.Types.ObjectId, ref: 'SalesQuotation' },
  quotationNumber: String,
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'SalesOrderCategory' },
  category: String,
  date: String,
  customer: String,
  deliveryLocation: String,
  deliveryAddress: String,
  salesGroup: String,  


   contactPerson: String,                 // ✅ NEW - Contact person field
  payTerms: { type: String, maxlength: 250 },  // ✅ NEW - Payment terms
  validityDate: String, 
  items: [ItemSchema],
   total: Number,
  taxName: String,
  cgst: Number,
  cgstAmount: Number,                    // ✅ NEW - CGST calculated amount
  sgst: Number,
  sgstAmount: Number,                    // ✅ NEW - SGST calculated amount
  igst: Number,
  igstAmount: Number,                    // ✅ NEW - IGST calculated amount
  taxDiscount: Number,
  finalTotal: Number,
}, { timestamps: true });

module.exports = mongoose.model('SalesOrder', SalesOrderSchema);