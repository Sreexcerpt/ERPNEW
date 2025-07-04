const express = require('express');
const router = express.Router();
const indentController = require('../controllers/Salesrequest');

router.post('/create', indentController.createIndent);
// routes/indentRoutes.js
router.get('/get', indentController.getAllIndents);


module.exports = router;
