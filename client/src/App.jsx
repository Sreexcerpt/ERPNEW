import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MaterialCategory from './Components/MaterialCategory/MaterialCategory'
import MaterialForm from './Components/Material/MaterialForm'
import CustomerForm from "./Pages/CustomerForm";
import CustomerCategoryForm from "./Pages/CustomerCategoryForm";
import VendorCategory from './Pages/VendorCategory';
import VendorForm from "./Pages/VendorForm";
import Sidebar from './Components/sidebar/sidebar'
import Header from './Components/header/header';
import CustomerPriceListForm from './Pages/CustomerPriceList';
import VendorPriceListForm from './Pages/VendorPriceListForm';
import TaxForm from "./Pages/Tax/Tax";
import RFQCategoryForm from "./Pages/RFQCategoryForm";
import QuotationForm from "./Pages/QuatationForm";
import QuotationsDisplay from "./Pages/QuotationsDisplay";

function App() {
  return (
    <Router>
      <Sidebar />
      <Header />
      <div className="page-wrapper">
        <Routes>
          <Route path="/MaterialCategory" element={<MaterialCategory />} />
          <Route path="/customer-category-form" element={<CustomerCategoryForm />} />
          <Route path="/vendor-category" element={<VendorCategory />} />
          <Route path="/material-form" element={<MaterialForm />} />
          <Route path="/customer-form" element={<CustomerForm />} />
          <Route path="/vendor-form" element={<VendorForm />} />
          <Route path="/customer-price-list" element={<CustomerPriceListForm />} />
          <Route path="/vendor-price-list" element={<VendorPriceListForm />} />
          <Route path="/tax-form" element={<TaxForm />} />
          <Route path="/rfq-category-form" element={<RFQCategoryForm />} />
          <Route path="/quotation-form" element={<QuotationForm />} />
          <Route path="/quotations-display" element={<QuotationsDisplay />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App