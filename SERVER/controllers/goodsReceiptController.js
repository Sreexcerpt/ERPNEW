const GoodsReceipt = require('../models/GoodsReceipt');
const GoodsReceiptCategory =require('../models/GoodsReceiptCategory')// reused for receipt category

// POST /api/goodsreceipt
const createGoodsReceipt = async (req, res) => {
  try {
    const data = req.body;

    if (!data.category) {
      return res.status(400).json({ message: "Category is required" });
    }

    const category = await GoodsReceiptCategory.findOne({ categoryName: data.category });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    const receiptCount = await GoodsReceipt.countDocuments({ category: data.category });
    const nextNumber = category.rangeStart + receiptCount;

    if (category.rangeEnd && nextNumber > category.rangeEnd) {
      return res.status(400).json({ message: "Document number range exceeded for this category." });
    }

    const docnumber = `${category.prefix}-${nextNumber}`;

    const newReceipt = new GoodsReceipt({
      ...data,
      docnumber
    });

    await newReceipt.save();
    res.status(201).json({ message: "Goods receipt created", docnumber });
  } catch (err) {
    console.error("Error saving goods receipt:", err);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
};

// GET /api/goodsreceipt
const getAllGoodsReceipts = async (req, res) => {
  try {
    const receipts = await GoodsReceipt.find().sort({ createdAt: -1 });
    res.json(receipts);
  } catch (err) {
    console.error("Error fetching goods receipts:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateGoodsReceipt = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedReceipt = await GoodsReceipt.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedReceipt) {  
      return res.status(404).json({ message: "Goods receipt not found" });
    }
    res.json({ message: "Goods receipt updated successfully", updatedReceipt });
  } catch (err) {
    console.error("Error updating goods receipt:", err);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
};

module.exports = {
  createGoodsReceipt,
  getAllGoodsReceipts,
  updateGoodsReceipt
};
