const express = require('express');
const router = express.Router();
const {
  createGoodsTransfer,
  getAllGoodsTransfers,
  getGoodsTransferByDocNumber
} = require('../controllers/goodsTransferController');

router.post('/', createGoodsTransfer);
router.get('/', getAllGoodsTransfers);
router.get('/:docnumber', getGoodsTransferByDocNumber); // optional

module.exports = router;
