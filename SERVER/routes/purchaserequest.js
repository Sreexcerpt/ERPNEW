const express = require('express');
const router = express.Router();
const { createCategory, getAllCategories, updateCategory} = require('../controllers/purchaserequestcontroller');


router.post('/', createCategory); // POST /api/category
router.get('/', getAllCategories);
router.put('/:id', updateCategory);

module.exports = router;
