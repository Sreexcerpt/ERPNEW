const mongoose = require('mongoose');

const materialSchema = new mongoose.Schema({
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'MaterialCategory', required: true },
  materialId: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  baseUnit: { type: String, required: true },
  orderUnit: { type: String, required: true },
  conversionValue: { type: Number }, // optional when base = order
  dimension: { type: String },
  mpn:String,
  materialgroup: String, // New field for Material Group
  location:String,
  isDeleted: { type: Boolean, default: false },
  isBlocked: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Material', materialSchema);
