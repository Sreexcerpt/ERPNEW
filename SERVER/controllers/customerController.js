const Customer = require('../models/Customer');
const CustomerCategory = require('../models/CustomerCategory');

// Generate next CNNo based on category
async function generateCNNo(categoryId) {
  const category = await CustomerCategory.findById(categoryId);
  const count = await Customer.countDocuments({ categoryId });

  const nextNum = category.rangeFrom + count;
  return `${category.prefix}${nextNum.toString().padStart(3, '0')}`;
}

// Create Customer
exports.createCustomer = async (req, res) => {
  try {
    const cnNo = await generateCNNo(req.body.categoryId);

    const newCustomer = new Customer({
      ...req.body,
      cnNo
    });

    await newCustomer.save();
    res.status(201).json(newCustomer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all customers
exports.getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find().populate('categoryId');
    res.json(customers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Customer
exports.updateCustomer = async (req, res) => {
  try {
    const updated = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



exports.updateCustomerStatus = async (req, res) => {
  try {
    const updated = await Customer.findByIdAndUpdate(
      req.params.id,
      req.body, // e.g., { isDeleted: true }
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    res.json(updated);
  } catch (error) {
    console.error('Error updating customer status:', error);
    res.status(500).json({ error: error.message });
  }
};

