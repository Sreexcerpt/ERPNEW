// const mongoose = require('mongoose');

// const ItemSchema = new mongoose.Schema({
//   materialId: String,
//   description: String,
//   quantity: Number,
  
// baseUnit: String,
//   orderUnit: String,
//   unit: String,
//   price: Number,
  
// materialgroup:String,
// buyerGroup: String,
//   deliveryDate: String,
// });

// const PurchaseOrderSchema = new mongoose.Schema({
//   poNumber: String,
//   categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'POCategory' },
//   category: String,
//   date: String,
//   vendor: String,
//   deliveryLocation: String,
//   quotationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quotation' }, // ✅
//   quotationNumber: String, // ✅
//   items: [ItemSchema],
//   total: Number,
// });

// module.exports = mongoose.model('PurchaseOrder', PurchaseOrderSchema);
// const mongoose = require('mongoose');

// const ItemSchema = new mongoose.Schema({
//   materialId: String,
//   description: String,
//   quantity: Number,
//   baseUnit: String,
//   orderUnit: String,
//   unit: String,
//   price: Number,
//     priceUnit: String,               // ✅ NEW
//   materialgroup: String,
//   buyerGroup: String,
//   deliveryDate: String,
// });

// const PurchaseOrderSchema = new mongoose.Schema({
//   poNumber: String,
//   categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'POCategory' },
//   category: String,
//   date: String,
//   vendor: String,
//   deliveryLocation: String,
//   deliveryAddress: String,           // ✅ NEW
//   quotationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quotation' },
//   quotationNumber: String,
//   items: [ItemSchema],
//   total: Number,
//   taxName: String,                   // ✅ NEW
//   cgst: Number,                      // ✅ NEW
//   sgst: Number,                      // ✅ NEW
//   igst: Number,                      // ✅ NEW
//   taxDiscount: Number,              // ✅ NEW
//   finalTotal: Number,               // ✅ NEW
// });

// module.exports = mongoose.model('PurchaseOrder', PurchaseOrderSchema);
// Updated ItemSchema with note field
const mongoose = require('mongoose');
const ItemSchema = new mongoose.Schema({
  materialId: String,
  description: String,
  quantity: Number,
  baseUnit: String,
  orderUnit: String,
  unit: String,
  price: Number,
  priceUnit: String,
  materialgroup: String,
  buyerGroup: String,
  deliveryDate: String,
  note: { type: String, maxlength: 250 },  // ✅ NEW - Individual row note
});

// Updated PurchaseOrderSchema
const PurchaseOrderSchema = new mongoose.Schema({
  poNumber: String,
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'POCategory' },
  category: String,
  date: String,
  vendor: String,
  deliveryLocation: String,
  deliveryAddress: String,
  buyerGroup: String,                    // ✅ NEW - Moved to top level
  contactPerson: String,                 // ✅ NEW - Contact person field
  payTerms: { type: String, maxlength: 250 },  // ✅ NEW - Payment terms
  validityDate: String,                  // ✅ NEW - Validity date
  quotationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quotation' },
  quotationNumber: String,
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
},{ timestamps: true });
module.exports = mongoose.model('PurchaseOrder', PurchaseOrderSchema);