const Material = require('../models/Material');
const MaterialCategory = require('../models/MaterialCategory');

// Generate Material ID
exports.generateMaterialId = async (req, res) => {
  try {
    const { categoryId } = req.body;
    const category = await MaterialCategory.findById(categoryId);
    if (!category) return res.status(404).json({ message: 'Category not found' });

    const materialCount = await Material.countDocuments({ categoryId });
    const nextNumber = category.rangeStart + materialCount;

    const materialId = `${category.prefix}-${nextNumber}`;
    res.json({ materialId });
  } catch (err) {
    res.status(500).json({ error: 'Error generating material ID' });
  }
};

// Save material
exports.createMaterial = async (req, res) => {
  try {
    const material = new Material(req.body);
    await material.save();
    res.status(201).json({ message: 'Material saved', material });
  } catch (err) {
    res.status(500).json({ error: 'Error saving material' });
  }
};

exports.getAllMaterials = async (req, res) => {
  try {
    const materials = await Material.find().populate('categoryId', 'categoryName prefix');
    res.json(materials);
  } catch (err) {
    console.error('Error fetching materials:', err);
    res.status(500).json({ error: 'Failed to fetch materials' });
  }
};

// Get material by ID
exports.getMaterialById = async (req, res) => {
  try {
    const material = await Material.findById(req.params.id).populate('categoryId', 'categoryName prefix');
    if (!material) {
      return res.status(404).json({ error: 'Material not found' });
    }
    res.json(material);
  } catch (err) {
    console.error('Error fetching material:', err);
    res.status(500).json({ error: 'Failed to fetch material' });
  }
};

// Update material
exports.updateMaterial = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Material.findByIdAndUpdate(id, req.body, { new: true });

    if (!updated) {
      return res.status(404).json({ error: 'Material not found' });
    }

    res.json({ message: 'Material updated', material: updated });
  } catch (err) {
    console.error('Error updating material:', err);
    res.status(500).json({ error: 'Failed to update material' });
  }
};
// Get material by materialId (not _id)
exports.getMaterialByMaterialId = async (req, res) => {
  try {
    console.log('Fetching material by materialId:', req.params.materialId);
    const material = await Material.findOne({ materialId: req.params.materialId })
 

    if (!material) {
      return res.status(404).json({ error: 'Material not found' });
    }

    res.json(material);
    console.log('Material fetched successfully:', material);
  } catch (err) {
    console.error('Error fetching material by materialId:', err);
    res.status(500).json({ error: 'Failed to fetch material by ID' });
  }
};
