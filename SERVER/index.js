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

app.use('/api/indent', indentRoutes);


const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
