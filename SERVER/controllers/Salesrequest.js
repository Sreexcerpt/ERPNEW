// const IndentRequest = require('../models/IndentRequestModel');
// const PurchaseCategory = require('../models/purchaserequestmodel');

// exports.createIndent = async (req, res) => {
//   try {
//     const { categoryId, items } = req.body;

//     console.log('Received categoryId:', categoryId);
//     console.log('Received items:', items);
//     const category = await PurchaseCategory.findById(categoryId);
//     if (!category) return res.status(404).json({ message: 'Category not found' });

//     const prefix = category.prefix;

//     const latest = await IndentRequest.findOne({ indentId: { $regex: `^${prefix}-` } })
//       .sort({ createdAt: -1 });

//     let nextNumber = 1;
//     if (latest && latest.indentId) {
//       const lastId = latest.indentId.split('-')[1];
//       nextNumber = parseInt(lastId) + 1;
//     }

//     const indentId = `${prefix}-${String(nextNumber).padStart(4, '0')}`;

//     const newIndent = new IndentRequest({
//       indentId,
//       categoryId,
//       categoryName: category.name,
//       items
//     });

//     await newIndent.save();

//     res.status(201).json({ message: 'Indent created', indentId });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };
const SalesRequest = require('../models/Salesrequest');
const Salecategory = require('../models/SalesReuestcat');

exports.createIndent = async (req, res) => {
  try {
    const { categoryId, items, location, salesGroup, documentDate } = req.body;

    console.log('Received categoryId:', categoryId);
    console.log('Received items:', items);
    console.log('Received location:', location);
    console.log('Received buyerGroup:', salesGroup);

    const category = await Salecategory.findById(categoryId);
    if (!category) return res.status(404).json({ message: 'Category not found' });

    const prefix = category.prefix;
    const rangeStart = category.rangeStart;

    // Find latest indent for this specific category
    const latest = await SalesRequest.findOne({ categoryId })
      .sort({ createdAt: -1 });

    let nextNumber = rangeStart;
    if (latest && latest.indentId) {
      const lastNumber = parseInt(latest.indentId.replace(prefix, ''));
      nextNumber = lastNumber + 1;
    }

    const indentId = `${prefix}${nextNumber}`;

    const newIndent = new SalesRequest({
      indentId,
      categoryId,
      categoryName: category.categoryName,
      location,
      salesGroup,
      documentDate: documentDate || new Date(), // Use provided date or current date
      items,
    });

    await newIndent.save();

    res.status(201).json({ message: 'Indent created successfully', indentId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateIndentStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { isDeleted, isBlocked } = req.body;
        
        const updateData = {};
        if (typeof isDeleted === 'boolean') {
            updateData.isDeleted = isDeleted;
        }
        if (typeof isBlocked === 'boolean') {
            updateData.isBlocked = isBlocked;
        }
        
        const updated = await SalesRequest.findByIdAndUpdate(id, updateData, { new: true });
        
        if (!updated) {
            return res.status(404).json({ error: 'Indent not found' });
        }
        
        res.json({ message: 'Indent status updated', indent: updated });
    } catch (err) {
        console.error('Error updating indent status:', err);
        res.status(500).json({ error: 'Failed to update indent status' });
    }
};




// controllers/indentController.js
exports.getAllIndents = async (req, res) => {
  try {
    const allIndents = await SalesRequest.find().sort({ createdAt: -1 });
    res.status(200).json(allIndents);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch indents' });
  }
};
