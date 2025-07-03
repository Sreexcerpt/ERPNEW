const SalesOrder = require('../models/SalesOrder');
const SalesOrderCategory = require('../models/SalesOrderCategory');
const SalesQuotation = require('../models/salesQuotationModel');

// At the top or before createSalesOrder
const generateSONumber = async (categoryId) => {
    const category = await SalesOrderCategory.findById(categoryId);
    if (!category) throw new Error('Sales Order Category not found');
  
    const prefix = category.prefix;
    const rangeFrom = category.rangeFrom;
    const rangeTo = category.rangeTo;
  
    const lastSO = await SalesOrder.find({
      categoryId,
      soNumber: { $regex: `^${prefix}` }
    })
      .sort({ soNumber: -1 })
      .limit(1);
  
    let nextNumber = parseInt(rangeFrom);
  
    if (lastSO.length > 0) {
      const lastNumber = parseInt(lastSO[0].soNumber.replace(prefix, ''));
      nextNumber = lastNumber + 1;
    }
  
    if (nextNumber > parseInt(rangeTo)) {
      throw new Error('SO number exceeded category range.');
    }
  
    return prefix + nextNumber.toString().padStart(rangeFrom.length, '0');
  };
  
  

  
  exports.createSalesOrder = async (req, res) => {
    try {
      const {
        quotationNumber,
        categoryId,
        category,
        date,
customer,
        deliveryLocation,
        deliveryAddress,
         salesGroup,        // ✅ NEW
        contactPerson,     // ✅ NEW
        payTerms,         // ✅ NEW
        validityDate,     // ✅ NEW
        taxName,
        cgst,
        sgst,
        igst,
        cgstAmount,       // ✅ NEW
        sgstAmount,       // ✅ NEW
        igstAmount,       // ✅ NEW
        taxDiscount,
        finalTotal,
        items             // ✅ This now includes note field for each item
      } = req.body;
  console.log('Received data:', req.body);
      // Find quotation by quotationNumber
      const quotation = await SalesQuotation.findOne({ quotationNumber });
      if (!quotation) return res.status(404).json({ error: 'Quotation not found' });
  
      // Generate PO number
       const soNumber = await generateSONumber(categoryId); // This will now work
  
      // Extract vendor
      

      // Calculate total from items
      const total = items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
  
      // Save PO with new fields
      const newPO = new SalesOrder({
       soNumber,
        categoryId,
        category,
        date,
  
      customer,
        deliveryLocation: deliveryLocation || quotation.items[0]?.location || '',
        deliveryAddress,
       salesGroup,        // ✅ NEW
        contactPerson,     // ✅ NEW
        payTerms,         // ✅ NEW
        validityDate,     // ✅ NEW
        quotationId: quotation._id,
        quotationNumber,
        items,            // ✅ This now includes note for each item
        total,
        taxName,
        cgst,
        sgst,
        igst,
        cgstAmount,       // ✅ NEW
        sgstAmount,       // ✅ NEW
        igstAmount,       // ✅ NEW
        taxDiscount,
        finalTotal
      });
  console.log('New Sales Order:', newPO);
      const saved = await newPO.save();
      res.status(201).json(saved);
    } catch (err) {
      console.error('Error creating PO:', err);
      res.status(500).json({ error: err.message });
    }
  };
  

exports.getAllSalesOrders = async (req, res) => {
  try {
    const orders = await SalesOrder.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch sales orders' });
  }
};
