const express = require('express');
const router = express.Router();
const {
  createGoodsIssue,
  getAllGoodsIssues,
  getGoodsIssueByDocNumber
} = require('../controllers/goodsIssueController');

router.post('/', createGoodsIssue);
router.get('/', getAllGoodsIssues);
// router.get('/:docnumber', getGoodsIssueByDocNumber);
module.exports = router;
