
// controllers/quotationController.js
const Quotation = require('../models/Quotation');
const QuotationCategory = require('../models/QuotationCategory');

async function generateQTNRNumber(categoryId) {
    const category = await QuotationCategory.findById(categoryId);
    if (!category) throw new Error('Invalid RFQ Category');
  
    const count = await Quotation.countDocuments({ rfqCategoryId: categoryId });
    const nextNumber = category.rangeFrom + count;
    return `${category.prefix}${nextNumber.toString().padStart(6, '0')}`;
  }
  
  exports.createQuotation = async (req, res) => {
    try {
      const quotationNumber = await generateQTNRNumber(req.body.rfqCategoryId);
  
      const quotation = new Quotation({
        quotationNumber,
        ...req.body
      });
  
      await quotation.save();
      res.status(201).json({ message: 'Quotation created', quotation });
    } catch (error) {
      console.error('Error creating quotation:', error);
      res.status(500).json({ error: 'Failed to create quotation' });
    }
  };

exports.getAllQuotations = async (req, res) => {
  try {
    const quotations = await Quotation.find();
    res.json(quotations);
  } catch (error) {
    console.error('Error fetching quotations:', error);
    res.status(500).json({ error: 'Failed to fetch quotations' });
  }
};

// Get Quotation by ID
exports.getQuotationById = async (req, res) => {
    try {
      const quotation = await Quotation.findById(req.params.id).populate('rfqCategoryId', 'categoryName prefix');
      if (!quotation) return res.status(404).json({ message: 'Quotation not found' });
      res.json(quotation);
    } catch (error) {
      console.error('Error fetching quotation:', error);
      res.status(500).json({ message: 'Failed to fetch quotation' });
    }
  };
  
  // Update Quotation
  exports.updateQuotation = async (req, res) => {
    try {
      const updated = await Quotation.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updated) return res.status(404).json({ message: 'Quotation not found' });
      res.json(updated);
    } catch (error) {
      console.error('Error updating quotation:', error);
      res.status(500).json({ message: 'Failed to update quotation' });
    }
  };