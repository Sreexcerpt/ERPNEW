const SalesQuotation = require('../models/salesQuotationModel');
const SaleQuotationCategory = require('../models/saleQuotationCategoryModel');
const Customer = require('../models/Customer'); // Assuming you have a Customer model

async function generateQuotationNumber(categoryId) {
  const category = await SaleQuotationCategory.findById(categoryId);
  if (!category) throw new Error('Category not found');

  const prefix = category.prefix;
  const lastQuotation = await SalesQuotation.find({ categoryId })
    .sort({ quotationNumber: -1 })
    .limit(1);

  let nextNumber = category.rangeFrom;

  if (lastQuotation.length > 0) {
    const lastNumber = parseInt(lastQuotation[0].quotationNumber.replace(prefix, ''));
    nextNumber = lastNumber + 1;
  }

  if (nextNumber > category.rangeTo) {
    throw new Error('Quotation number exceeded category range.');
  }

  return prefix + nextNumber.toString().padStart(6, '0');
}

exports.createQuotation = async (req, res) => {
    try {
      const quotationNumber = await generateQuotationNumber(req.body.categoryId);
  
      // ✅ fetch customer data using ID from frontend
      const customer = await Customer.findById(req.body.customerId);
      if (!customer) {
        return res.status(404).json({ error: 'Customer not found' });
      }
  
      // ✅ use name1 + name2 and trim extra spaces
      const customerName = `${customer.name1} ${customer.name2}`.trim();
  
      // ✅ create quotation with customerName field included
      const newQuotation = new SalesQuotation({
        ...req.body,
        quotationNumber,
        customerName // this field exists in SalesQuotation schema
      });
  
      const saved = await newQuotation.save();
      res.status(201).json(saved);
    } catch (err) {
      console.error('Error creating quotation:', err);
      res.status(500).json({ error: err.message });
    }
  };

// Get all quotations
exports.getAllQuotations = async (req, res) => {
  try {
    const quotations = await SalesQuotation.find().populate('categoryId customerId');
    res.json(quotations);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch quotations' });
  }
};
