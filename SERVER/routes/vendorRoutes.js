const express = require('express');
const router = express.Router();
const vendorController = require('../controllers/vendorController');

router.post('/', vendorController.createVendor);
router.get('/', vendorController.getVendors);
router.put('/:id', vendorController.updateVendor);
router.put('/status/:id', vendorController.updateVendorStatus);

module.exports = router;
