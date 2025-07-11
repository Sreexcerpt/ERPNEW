const express = require('express');
const router = express.Router();
const {
  createGoodsIssue,
  getAllGoodsIssues,
  updateGoodsIssue
} = require('../controllers/goodsIssueController');

router.post('/', createGoodsIssue);
router.get('/', getAllGoodsIssues);
router.patch('/:id', updateGoodsIssue);
module.exports = router;
