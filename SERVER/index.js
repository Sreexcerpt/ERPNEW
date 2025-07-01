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
const path = require('path');
const history = require('connect-history-api-fallback');
const poCategoryRoutes = require('./routes/poCategoryRoutes');
const purchaseOrderRoutes = require('./routes/purchaseOrderRoutes');
const salesOrderCategoryRoutes = require('./routes/salesOrderCategoryRoutes');
const salesOrderRoutes = require('./routes/salesOrderRoutes');

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

app.use(history());
app.use(express.static(path.join(__dirname, 'dist')));

// Route all other requests to serve 'index.html' for SPA routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(process.env.Port || 8080, () => {
  console.log('Server running on port 8080');
});