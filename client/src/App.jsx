import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MaterialCategory from './Components/MaterialCategory/MaterialCategory'
import MaterialForm from './Components/Material/MaterialForm'
import CustomerForm from "./Pages/CustomerForm";
import CustomerCategoryForm from "./Pages/CustomerCategoryForm";
import VendorCategory from './Pages/VendorCategory';
import VendorForm from "./Pages/VendorForm";
import Sidebar from './Components/sidebar/sidebar'
function App() {
  return (
    <Router>
      <Sidebar/>
      <Routes>
        <Route path="/MaterialCategory" element={<MaterialCategory />} />
        <Route path="/material-form" element={<MaterialForm />} />
        <Route path="/customer-form" element={<CustomerForm />} />
        <Route path="/customer-category-form" element={<CustomerCategoryForm />} />
        <Route path="/vendor-category" element={<VendorCategory />} />
        <Route path="/vendor-form" element={<VendorForm />} />
      </Routes>
    </Router>
  )
}

export default App