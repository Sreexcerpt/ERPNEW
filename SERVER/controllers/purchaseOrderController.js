const PurchaseOrder = require('../models/PurchaseOrder');
const POCategory = require('../models/POCategory');
const Quotation = require('../models/Quotation');

// Generate PO number based on category prefix and range
async function generatePONumber(categoryId) {
  const category = await POCategory.findById(categoryId);
  if (!category) throw new Error('PO Category not found');

  const prefix = category.prefix;
  const lastPO = await PurchaseOrder.find({ categoryId })
    .sort({ poNumber: -1 })
    .limit(1);

  let nextNumber = category.rangeFrom;

  if (lastPO.length > 0) {
    const lastNumber = parseInt(lastPO[0].poNumber.replace(prefix + '-', ''));
    nextNumber = lastNumber + 1;
  }

  if (nextNumber > category.rangeTo) {
    throw new Error('PO number exceeded category range.');
  }

  return `${prefix}-${nextNumber.toString().padStart(6, '0')}`;
}

// // Create Purchase Order using quotationNumber
// exports.createPO = async (req, res) => {
//   try {
//     const { quotationNumber, categoryId, category, date, deliveryLocation } = req.body;

//     // ✅ Step 1: Find quotation by quotationNumber
//     const quotation = await Quotation.findOne({ quotationNumber });
//     if (!quotation) return res.status(404).json({ error: 'Quotation not found' });

//     // ✅ Step 2: Generate PO number
//     const poNumber = await generatePONumber(categoryId);

//     // ✅ Step 3: Extract data from quotation
//     const vendor = quotation.vendorName;
//     const items = quotation.items.map(item => ({
//       materialId: item.materialId,
//       description: item.description,
//       quantity: item.qty,
//       unit: item.unit ,
//       baseUnit: item.baseUnit,
//       orderUnit: item.orderUnit,
//       price: item.price,
//       buyerGroup: item.buyerGroup,
//       materialgroup: item.materialgroup,
//       deliveryDate: item.deliveryDate ? String(item.deliveryDate).slice(0, 10) : null,
//     }));

//     const total = items.reduce((sum, item) => sum + (item.quantity * item.price), 0);

//     // ✅ Step 4: Save PO
//     const newPO = new PurchaseOrder({
//       poNumber,
//       categoryId,
//       category,
//       date,
//       vendor,
//       deliveryLocation: deliveryLocation || quotation.items[0]?.location || '',
//       quotationId: quotation._id,
//       quotationNumber,
//       items,
//       total,
//     });

//     const saved = await newPO.save();
//     res.status(201).json(saved);
//   } catch (err) {
//     console.error('Error creating PO:', err);
//     res.status(500).json({ error: err.message });
//   }
// };
// Create Purchase Order using quotationNumber
exports.createPO = async (req, res) => {
    try {
      const {
        quotationNumber,
        categoryId,
        category,
        date,
        deliveryLocation,
        deliveryAddress,
        taxName,
        cgst,
        sgst,
        igst,
        taxDiscount,
        finalTotal
      } = req.body;
  
      // ✅ Step 1: Find quotation by quotationNumber
      const quotation = await Quotation.findOne({ quotationNumber });
      if (!quotation) return res.status(404).json({ error: 'Quotation not found' });
  
      // ✅ Step 2: Generate PO number
      const poNumber = await generatePONumber(categoryId);
  
      // ✅ Step 3: Extract data from quotation
      const vendor = quotation.vendorName;
      const items = quotation.items.map(item => ({
        materialId: item.materialId,
        description: item.description,
        quantity: item.qty,
        unit: item.unit,
        baseUnit: item.baseUnit,
        orderUnit: item.orderUnit,
        price: item.price,
        priceUnit: item.priceUnit, // ✅ new field
        buyerGroup: item.buyerGroup,
        materialgroup: item.materialgroup,
        deliveryDate: item.deliveryDate ? String(item.deliveryDate).slice(0, 10) : null,
      }));
  
      const total = items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
  
      // ✅ Step 4: Save PO with additional fields
      const newPO = new PurchaseOrder({
        poNumber,
        categoryId,
        category,
        date,
        vendor,
        deliveryLocation: deliveryLocation || quotation.items[0]?.location || '',
        deliveryAddress, // ✅ new field
        quotationId: quotation._id,
        quotationNumber,
        items,
        total,
        taxName,        // ✅ new field
        cgst,           // ✅ new field
        sgst,           // ✅ new field
        igst,           // ✅ new field
        taxDiscount,    // ✅ new field
        finalTotal      // ✅ new field
      });
  
      const saved = await newPO.save();
      res.status(201).json(saved);
    } catch (err) {
      console.error('Error creating PO:', err);
      res.status(500).json({ error: err.message });
    }
  };
  

// Get All Purchase Orders
exports.getAllPOs = async (req, res) => {
  try {
    const pos = await PurchaseOrder.find().populate('categoryId quotationId');
    res.status(200).json(pos);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch purchase orders' });
  }
};

// Optional: Get Single PO by ID
exports.getPOById = async (req, res) => {
  try {
    const po = await PurchaseOrder.findById(req.params.id).populate('categoryId quotationId');
    if (!po) return res.status(404).json({ message: 'PO not found' });
    res.json(po);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch PO' });
  }
};
