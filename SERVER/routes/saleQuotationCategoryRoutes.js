const express = require('express');
const router = express.Router();
const controller = require('../controllers/saleQuotationCategoryController');

router.post('/', controller.createCategory);
router.get('/', controller.getAllCategories);
router.put('/:id', controller.updateCategory);

module.exports = router;
