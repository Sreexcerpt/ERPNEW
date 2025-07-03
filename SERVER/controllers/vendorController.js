const Vendor = require('../models/Vendor');
const VendorCategory = require('../models/VendorCategory');

// Get next VNNo based on category
async function generateVNNo(categoryId) {
  const category = await VendorCategory.findById(categoryId);
  const count = await Vendor.countDocuments({ categoryId });

  const nextNum = category.rangeFrom + count;
  return `${category.prefix}${nextNum.toString().padStart(3, '0')}`;
}

// Add Vendor
exports.createVendor = async (req, res) => {
  try {
    const vnNo = await generateVNNo(req.body.categoryId);

    const newVendor = new Vendor({
      ...req.body,
      vnNo
    });

    await newVendor.save();
    res.status(201).json(newVendor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all vendors
exports.getVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find().populate('categoryId');
    res.json(vendors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update vendor
exports.updateVendor = async (req, res) => {
  try {
    const updated = await Vendor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update isDeleted or isBlocked
exports.updateVendorStatus = async (req, res) => {
  try {
    const updated = await Vendor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Vendor not found' });
    }

    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
