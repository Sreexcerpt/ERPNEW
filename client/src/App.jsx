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
import QuotationListPage from "./Pages/QuotationListPage"
import SaleQuotationCategoryForm from "./Pages/SaleQuotationCategoryForm"
import SalesQuotationForm from "./Pages/SalesQuotationForm";
import SalesCategory from "./Components/Sales/SalesCategory/SalesCategory";
import Salesrequest from "./Components/Sales/SalesRequest/Salesrequest";
import Purchaserequestcat from "./Components/PurchaseRequest/Purchaserequestactegory/Purchaserequestcat";
import IndentRequest from "./Components/PurchaseRequest/PurchaseRequestForm/PurchaseRequestForm";
import SalesIndentsummary from "./Components/Sales/salesIndentsummary";
import PurchaseIndentsummary from "./Components/PurchaseRequest/PurchaseRequestForm/PurchaseIndentSummary";
import POCategoryForm from './Pages/POCategoryForm';
import PurchaseOrderForm from './Pages/PurchaseOrderForm';
import SalesOrderCategoryForm from './Pages/SalesOrderCategoryForm';
import POList from './Pages/POList';
import SalesOrderForm from './Pages/SalesOrderForm';
import SalesOrderDisplay from './Pages/SalesOrderDisplay';
import GoodsIssueForm from './Pages/Inventory/GoodsIssueForm';
import GoodsReciept from './Pages/Inventory/GoodsReceipt';
import GoodsTransfer from './Pages/Inventory/GoodsTransfer';
import Invoice from './Pages/Accounts/invoice';
import CustomerBilling from './Pages/Accounts/Billing';
import EWayBillForm from './Pages/Accounts/EWayBill';
import StockListERP from './Pages/Inventory/Stocklist';
import DashboardERP from './Pages/dashboard';
import GoodsReceiptCategory from './Pages/Inventory/GoodsReceiptCategory';
import GoodsReceiptList from './Pages/Inventory/GoodsReceiptList';
import GoodsIssueCategory from './Pages/Inventory/GoodsIssueCategory';
import LocationMaster from './Pages/location/LocationMaster';
import InvoiceCategory from './Pages/Invoice/InvoiceCategory';
import BillingCategory from './Pages/Billing/BillingCategory';
import InvoiceForm from './Pages/Invoice/InvoiceForm';
import InvoiceList from './Pages/Invoice/InvoiceL';
import BillingForm from './Pages/Billing/BillingForm';
import BillingDisplay from './Pages/Billing/BillingDisplay';
function App() {
  return (
    <Router>
      <Sidebar />
      <Header />
      <div className="page-wrapper">
        <Routes>
          <Route path='/' element={<DashboardERP />} />
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
          <Route path="/quotation-list" element={<QuotationListPage />} />
          <Route path="/sale-quotation-category-form" element={<SaleQuotationCategoryForm />} />
          <Route path="/sales-quotation-form" element={<SalesQuotationForm />} />
          <Route path="/IndentRequest" element={<IndentRequest />} />
          <Route path="/Purchaserequestcat" element={<Purchaserequestcat />} />
          <Route path="/Salesrequest" element={<Salesrequest />} />
          <Route path="/SalesCategory" element={<SalesCategory />} />
          <Route path='/SalesIndentsummary' element={<SalesIndentsummary />} />
          <Route path='/PurchaseIndentsummary' element={<PurchaseIndentsummary />} />
          <Route path="/POCategory" element={<POCategoryForm />} />
          <Route path="/PurchaseOrderForm" element={<PurchaseOrderForm />} />
          <Route path="/SalesOrderCategoryForm" element={<SalesOrderCategoryForm />} />
          <Route path="/POList" element={<POList />} />
          <Route path="/SalesOrderDisplay" element={<SalesOrderDisplay />} />
          <Route path="/SalesOrderForm" element={<SalesOrderForm />} />
          <Route path="/GoodsIssueFormUI" element={<GoodsIssueForm />} />
          <Route path="/GoodsReciept" element={<GoodsReciept />} />
          <Route path="/GoodsTransfer" element={<GoodsTransfer />} />
          <Route path='/invoice' element={<Invoice />} />
          <Route path='/CustomerBilling' element={<CustomerBilling />} />
          <Route path='/EWayBillForm' element={<EWayBillForm />} />
          <Route path="/StockListERP" element={<StockListERP />} />
          <Route path="/GoodsReceiptCategory" element={<GoodsReceiptCategory />} />
          <Route path="/GoodsReceiptList" element={<GoodsReceiptList />} />
          <Route path="/GoodsIssueCategory" element={<GoodsIssueCategory />} />
          <Route path="/LocationMaster" element={<LocationMaster />} />
<Route path="/InvoiceCategory" element={<InvoiceCategory/>} />
           <Route path="/BillingCategory" element={<BillingCategory/>} />
            <Route path="/InvoiceForm" element={<InvoiceForm/>} />
              <Route path="/InvoiceList" element={<InvoiceList/>} />
                 <Route path="/BillingForm" element={<BillingForm/>} />
                  <Route path="/BillingDisplay" element={<BillingDisplay/>} />
        </Routes>
      </div>
    </Router>
  )
}

export default App