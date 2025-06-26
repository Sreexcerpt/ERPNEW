const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  cnNo: String,
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'CustomerCategory' },
  name1: String,
  name2: String,
  search: String,
  address1: String,
  address2: String,
  city: String,
  pincode: String,
  region: String,
  country: String,
  contactNo: String,
  name: String,
  email: String
});

module.exports = mongoose.model('Customer', customerSchema);
