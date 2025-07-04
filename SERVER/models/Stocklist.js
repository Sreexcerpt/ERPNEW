const mongoose = require('mongoose');
const { Schema } = mongoose;

const StockItemSchema = new Schema({
  itemCode: { type: String, required: true, unique: true }, // Unique item identifier
  itemName: { type: String, required: true },
  itemGroup: { type: String, required: true }, // Category or group
  unitOfMeasure: { type: String, required: true }, // e.g., pcs, kg, liters

  warehouses: [
    {
      warehouseId: { type: Schema.Types.ObjectId, ref: 'Warehouse', required: true },
      location: { type: String }, // e.g., bin or rack location
      quantityAvailable: { type: Number, default: 0 },
      reorderLevel: { type: Number, default: 0 },
      maxStockLevel: { type: Number, default: 0 },
      reservedQuantity: { type: Number, default: 0 }, // For reserved stock
      batches: [
        {
          batchNumber: { type: String },
          quantity: { type: Number, default: 0 },
          expiryDate: { type: Date },
          manufactureDate: { type: Date }
        }
      ],
      serialNumbers: [
        {
          serialNo: { type: String },
          status: { type: String, enum: ['available', 'reserved', 'sold'], default: 'available' }
        }
      ]
    }
  ],

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Optional: Warehouse schema for reference
const WarehouseSchema = new Schema({
  name: { type: String, required: true },
  address: { type: String },
  contactInfo: { type: String }
});

module.exports = {
  StockItem: mongoose.model('StockItem', StockItemSchema),
  Warehouse: mongoose.model('Warehouse', WarehouseSchema)
};
