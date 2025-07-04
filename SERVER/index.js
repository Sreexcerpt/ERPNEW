const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const categoryRoutes = require('./routes/MaterialcategoryRoutes');
const connectDB = require('./config/db');
const materialRoutes = require('./routes/Material');
const vendorCategoryRoutes = require('./routes/vendorCategoryRoutes');
const vendorRoutes = require('./routes/vendorRoutes');
const customerCategoryRoutes = require('./routes/customerCategoryRoutes');
const customerRoutes = require('./routes/customerRoutes');
const vendorPriceRoutes = require('./routes/vendorPriceListRoutes');
const taxRoutes = require('./routes/Tax');
const customerPriceRoutes = require('./routes/customerPriceListRoutes');
const purchaserequest=require('./routes/purchaserequest') // Ensure this is the correct path
const indentRoutes = require('./routes/indentRoutes');
const rfqCategoryRoutes = require('./routes/quotationCategoryRoutes');
const quotationRoutes = require('./routes/quotationRoutes');
const salecategoryRoutes = require('./routes/Salecategory');
const salesRequestRoutes = require('./routes/Salesrequest');  
const saleQuotationCategoryRoutes = require('./routes/saleQuotationCategoryRoutes'); 
const salesQuotationRoutes = require('./routes/salesQuotationRoutes');

const poCategoryRoutes = require('./routes/poCategoryRoutes');
const purchaseOrderRoutes = require('./routes/purchaseOrderRoutes');
const salesOrderCategoryRoutes = require('./routes/salesOrderCategoryRoutes');
const salesOrderRoutes = require('./routes/salesOrderRoutes');
const goodsIssueCategoryRoutes = require('./routes/goodsIssueCategoryRoutes');
const goodsIssueRoutes = require('./routes/goodsissue');
const goodsTransferCategoryRoutes = require('./routes/goodsTransferCategoryRoutes');
const goodsTransferRoutes = require('./routes/goodsTransferRoutes');
const goodsReceiptRoutes = require('./routes/goodsReceiptRoutes');
const goodsReceiptCategoryRoutes = require('./routes/goodsReceiptCategoryRoutes');


const app = express();
app.use(cors());

app.use(express.json());

connectDB();
app.use('/api/category', categoryRoutes);
app.use('/api/material', materialRoutes);
app.use('/api/vendor-categories', vendorCategoryRoutes);
app.use('/api/vendors', vendorRoutes);

app.use('/api/customer-categories', customerCategoryRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/tax', taxRoutes);

app.use('/api/vendor-price-lists', vendorPriceRoutes);

app.use('/api/customer-price-lists', customerPriceRoutes);
app.use('/api/purchasecategory',purchaserequest);
app.use('/api/rfq-categories', rfqCategoryRoutes);
app.use('/api/quotations', quotationRoutes);
app.use('/api/salecategory', salecategoryRoutes);
app.use('/api/salerequest', salesRequestRoutes);
app.use('/api/sale-quotation-categories', saleQuotationCategoryRoutes);
app.use('/api/salesquotations', salesQuotationRoutes);
app.use('/api/indent', indentRoutes);
app.use('/api/po-categories', poCategoryRoutes);

app.use('/api/purchase-orders', purchaseOrderRoutes);
app.use('/api/sales-order-categories', salesOrderCategoryRoutes);
app.use('/api', salesOrderRoutes);
app.use('/api/goodsissuecategory', goodsIssueCategoryRoutes);
app.use('/api/goodsissue', goodsIssueRoutes);
app.use('/api/goodsTransferCategory', goodsTransferCategoryRoutes);
app.use('/api/goodstransfer', goodsTransferRoutes);
app.use('/api', goodsReceiptRoutes);
app.use('/api/goodsreceiptcategory', goodsReceiptCategoryRoutes);


const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
