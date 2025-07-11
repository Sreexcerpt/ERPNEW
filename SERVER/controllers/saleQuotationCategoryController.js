const SaleQuotationCategory = require('../models/saleQuotationCategoryModel');

// Create
exports.createCategory = async (req, res) => {
  try {
    const newCategory = new SaleQuotationCategory(req.body);
    const saved = await newCategory.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create category', details: err });
  }
};

// Get All
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await SaleQuotationCategory.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
};

// Update
exports.updateCategory = async (req, res) => {
  try {
    const updated = await SaleQuotationCategory.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update category', details: err });
  }
};
