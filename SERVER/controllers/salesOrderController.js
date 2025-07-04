const SalesOrder = require('../models/SalesOrder');
const SalesOrderCategory = require('../models/SalesOrderCategory');

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
      const { categoryId } = req.body;
      const soNumber = await generateSONumber(categoryId); // This will now work
      const salesOrder = new SalesOrder({ ...req.body, soNumber });
      const saved = await salesOrder.save();
      res.status(201).json(saved);
    } catch (error) {
      console.error('Error creating sales order:', error);
      res.status(500).json({ error: 'Failed to create sales order' });
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
