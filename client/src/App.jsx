// import React from 'react'
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import MaterialCategory from './Components/MaterialCategory/MaterialCategory'
// import MaterialForm from './Components/Material/MaterialForm'
// import CustomerForm from "./Pages/CustomerForm";
// import CustomerCategoryForm from "./Pages/CustomerCategoryForm";
// import VendorCategory from './Pages/VendorCategory';
// import VendorForm from "./Pages/VendorForm";
// import Sidebar from './Components/sidebar/sidebar'
// import Header from './Components/header/header';
// import CustomerPriceListForm from './Pages/CustomerPriceList';
// import VendorPriceListForm from './Pages/VendorPriceListForm';
// import TaxForm from "./Pages/Tax/Tax";
// import RFQCategoryForm from "./Pages/RFQCategoryForm";
// import QuotationForm from "./Pages/QuatationForm";
// import QuotationsDisplay from "./Pages/QuotationsDisplay";
// import QuotationListPage from "./Pages/QuotationListPage"
// import SaleQuotationCategoryForm from "./Pages/SaleQuotationCategoryForm"
// import SalesQuotationForm from "./Pages/SalesQuotationForm";
// import SalesCategory from "./Components/Sales/SalesCategory/SalesCategory";
// import Salesrequest from "./Components/Sales/SalesRequest/Salesrequest";
// import Purchaserequestcat from "./Components/PurchaseRequest/Purchaserequestactegory/Purchaserequestcat";
// import IndentRequest from "./Components/PurchaseRequest/PurchaseRequestForm/PurchaseRequestForm";
// import SalesIndentsummary from "./Components/Sales/salesIndentsummary";
// import PurchaseIndentsummary from "./Components/PurchaseRequest/PurchaseRequestForm/PurchaseIndentSummary";
// import POCategoryForm from './Pages/POCategoryForm';
// import PurchaseOrderForm from './Pages/PurchaseOrderForm';
// import SalesOrderCategoryForm from './Pages/SalesOrderCategoryForm';
// import POList from './Pages/POList';
// import SalesOrderForm from './Pages/SalesOrderForm';
// import SalesOrderDisplay from './Pages/SalesOrderDisplay';
// import GoodsIssueForm from './Pages/Inventory/GoodsIssueForm';
// import GoodsReciept from './Pages/Inventory/GoodsReceipt';
// import GoodsTransfer from './Pages/Inventory/GoodsTransfer';
// import Invoice from './Pages/Accounts/invoice';
// import CustomerBilling from './Pages/Accounts/Billing';
// import EWayBillForm from './Pages/Accounts/EWayBill';
// import StockListERP from './Pages/Inventory/Stocklist';
// import DashboardERP from './Pages/dashboard';
// import GoodsReceiptCategory from './Pages/Inventory/GoodsReceiptCategory';
// import GoodsReceiptList from './Pages/Inventory/GoodsReceiptList';
// import GoodsIssueCategory from './Pages/Inventory/GoodsIssueCategory';
// import LocationMaster from './Pages/location/LocationMaster';
// import InvoiceCategory from './Pages/Invoice/InvoiceCategory';
// import BillingCategory from './Pages/Billing/BillingCategory';
// import InvoiceForm from './Pages/Invoice/InvoiceForm';
// import InvoiceList from './Pages/Invoice/InvoiceL';
// import BillingForm from './Pages/Billing/BillingForm';
// import BillingDisplay from './Pages/Billing/BillingDisplay';
// import LoginForm from './Components/User/Login';
// import Register from './Components/User/Register';
// import CompanyForm from './Components/Company/Company';
// import LoginScreen from './Components/User/LoginScreen';
// import Dashboard from './Components/Dashboard/Dashboard';

// function App() {
//   const LoginScreenWrapper = () => {
//   const user = JSON.parse(localStorage.getItem('user'));
//   return <LoginScreen userId={user?._id} />;
//   }
//   return (
//     <Router>
//       <Sidebar />
//       <Header />
//       <div className="page-wrapper">
//         <Routes>
//           <Route path='/' element={<DashboardERP />} />
//           <Route path="/MaterialCategory" element={<MaterialCategory />} />
//           <Route path="/customer-category-form" element={<CustomerCategoryForm />} />
//           <Route path="/vendor-category" element={<VendorCategory />} />
//           <Route path="/material-form" element={<MaterialForm />} />
//           <Route path="/customer-form" element={<CustomerForm />} />
//           <Route path="/vendor-form" element={<VendorForm />} />
//           <Route path="/customer-price-list" element={<CustomerPriceListForm />} />
//           <Route path="/vendor-price-list" element={<VendorPriceListForm />} />
//           <Route path="/tax-form" element={<TaxForm />} />
//           <Route path="/rfq-category-form" element={<RFQCategoryForm />} />
//           <Route path="/quotation-form" element={<QuotationForm />} />
//           <Route path="/quotations-display" element={<QuotationsDisplay />} />
//           <Route path="/quotation-list" element={<QuotationListPage />} />
//           <Route path="/sale-quotation-category-form" element={<SaleQuotationCategoryForm />} />
//           <Route path="/sales-quotation-form" element={<SalesQuotationForm />} />
//           <Route path="/IndentRequest" element={<IndentRequest />} />
//           <Route path="/Purchaserequestcat" element={<Purchaserequestcat />} />
//           <Route path="/Salesrequest" element={<Salesrequest />} />
//           <Route path="/SalesCategory" element={<SalesCategory />} />
//           <Route path='/SalesIndentsummary' element={<SalesIndentsummary />} />
//           <Route path='/PurchaseIndentsummary' element={<PurchaseIndentsummary />} />
//           <Route path="/POCategory" element={<POCategoryForm />} />
//           <Route path="/PurchaseOrderForm" element={<PurchaseOrderForm />} />
//           <Route path="/SalesOrderCategoryForm" element={<SalesOrderCategoryForm />} />
//           <Route path="/POList" element={<POList />} />
//           <Route path="/SalesOrderDisplay" element={<SalesOrderDisplay />} />
//           <Route path="/SalesOrderForm" element={<SalesOrderForm />} />
//           <Route path="/GoodsIssueFormUI" element={<GoodsIssueForm />} />
//           <Route path="/GoodsReciept" element={<GoodsReciept />} />
//           <Route path="/GoodsTransfer" element={<GoodsTransfer />} />
//           <Route path='/invoice' element={<Invoice />} />
//           <Route path='/CustomerBilling' element={<CustomerBilling />} />
//           <Route path='/EWayBillForm' element={<EWayBillForm />} />
//           <Route path="/StockListERP" element={<StockListERP />} />
//           <Route path="/GoodsReceiptCategory" element={<GoodsReceiptCategory />} />
//           <Route path="/GoodsReceiptList" element={<GoodsReceiptList />} />
//           <Route path="/GoodsIssueCategory" element={<GoodsIssueCategory />} />
//           <Route path="/LocationMaster" element={<LocationMaster />} />
// <Route path="/InvoiceCategory" element={<InvoiceCategory/>} />
//            <Route path="/BillingCategory" element={<BillingCategory/>} />
//             <Route path="/InvoiceForm" element={<InvoiceForm/>} />
//               <Route path="/InvoiceList" element={<InvoiceList/>} />
//                  <Route path="/BillingForm" element={<BillingForm/>} />
//                   <Route path="/BillingDisplay" element={<BillingDisplay/>} />
//                   {/*user*/}
//                   <Route path="/login" element={<LoginForm />} />
//                   <Route path="/register" element={<Register />} /> 
//                   <Route path="/companyform" element={<CompanyForm />} />
//                   {/* <Route path="/loginscreen" element={<LoginScreen />} /> */}
//                   <Route path="/loginscreen" element={<LoginScreenWrapper />} />
//                    <Route path="/Dashboard" element={<Dashboard />} />




//         </Routes>
//       </div>
//     </Router>
//   )
// }

// export default App


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
import LoginForm from './Components/User/Login';
import Register from './Components/User/Register';
import CompanyForm from './Components/Company/Company';
import LoginScreen from './Components/User/LoginScreen';
import Dashboard from './Components/Dashboard/Dashboard';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';

function App() {
  const LoginScreenWrapper = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return <LoginScreen userId={user?._id} />;
  }

  const ProtectedLayout = ({ children }) => {
    return (
      <PrivateRoute>
        <Sidebar />
        <Header />
        <div className="page-wrapper">
          {children}
        </div>
      </PrivateRoute>
    );
  };

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<Register />} />
                
        <Route path="/loginscreen" element={
        
            <LoginScreenWrapper />
   
        } />
        {/* Protected Routes */}
        <Route path='/' element={
          <ProtectedLayout>
            <DashboardERP />
          </ProtectedLayout>
        } />
        
        <Route path="/MaterialCategory" element={
          <ProtectedLayout>
            <MaterialCategory />
          </ProtectedLayout>
        } />
        
        <Route path="/customer-category-form" element={
          <ProtectedLayout>
            <CustomerCategoryForm />
          </ProtectedLayout>
        } />
        
        <Route path="/vendor-category" element={
          <ProtectedLayout>
            <VendorCategory />
          </ProtectedLayout>
        } />
        
        <Route path="/material-form" element={
          <ProtectedLayout>
            <MaterialForm />
          </ProtectedLayout>
        } />
        
        <Route path="/customer-form" element={
          <ProtectedLayout>
            <CustomerForm />
          </ProtectedLayout>
        } />
        
        <Route path="/vendor-form" element={
          <ProtectedLayout>
            <VendorForm />
          </ProtectedLayout>
        } />
        
        <Route path="/customer-price-list" element={
          <ProtectedLayout>
            <CustomerPriceListForm />
          </ProtectedLayout>
        } />
        
        <Route path="/vendor-price-list" element={
          <ProtectedLayout>
            <VendorPriceListForm />
          </ProtectedLayout>
        } />
        
        <Route path="/tax-form" element={
          <ProtectedLayout>
            <TaxForm />
          </ProtectedLayout>
        } />
        
        <Route path="/rfq-category-form" element={
          <ProtectedLayout>
            <RFQCategoryForm />
          </ProtectedLayout>
        } />
        
        <Route path="/quotation-form" element={
          <ProtectedLayout>
            <QuotationForm />
          </ProtectedLayout>
        } />
        
        <Route path="/quotations-display" element={
          <ProtectedLayout>
            <QuotationsDisplay />
          </ProtectedLayout>
        } />
        
        <Route path="/quotation-list" element={
          <ProtectedLayout>
            <QuotationListPage />
          </ProtectedLayout>
        } />
        
        <Route path="/sale-quotation-category-form" element={
          <ProtectedLayout>
            <SaleQuotationCategoryForm />
          </ProtectedLayout>
        } />
        
        <Route path="/sales-quotation-form" element={
          <ProtectedLayout>
            <SalesQuotationForm />
          </ProtectedLayout>
        } />
        
        <Route path="/IndentRequest" element={
          <ProtectedLayout>
            <IndentRequest />
          </ProtectedLayout>
        } />
        
        <Route path="/Purchaserequestcat" element={
          <ProtectedLayout>
            <Purchaserequestcat />
          </ProtectedLayout>
        } />
        
        <Route path="/Salesrequest" element={
          <ProtectedLayout>
            <Salesrequest />
          </ProtectedLayout>
        } />
        
        <Route path="/SalesCategory" element={
          <ProtectedLayout>
            <SalesCategory />
          </ProtectedLayout>
        } />
        
        <Route path='/SalesIndentsummary' element={
          <ProtectedLayout>
            <SalesIndentsummary />
          </ProtectedLayout>
        } />
        
        <Route path='/PurchaseIndentsummary' element={
          <ProtectedLayout>
            <PurchaseIndentsummary />
          </ProtectedLayout>
        } />
        
        <Route path="/POCategory" element={
          <ProtectedLayout>
            <POCategoryForm />
          </ProtectedLayout>
        } />
        
        <Route path="/PurchaseOrderForm" element={
          <ProtectedLayout>
            <PurchaseOrderForm />
          </ProtectedLayout>
        } />
        
        <Route path="/SalesOrderCategoryForm" element={
          <ProtectedLayout>
            <SalesOrderCategoryForm />
          </ProtectedLayout>
        } />
        
        <Route path="/POList" element={
          <ProtectedLayout>
            <POList />
          </ProtectedLayout>
        } />
        
        <Route path="/SalesOrderDisplay" element={
          <ProtectedLayout>
            <SalesOrderDisplay />
          </ProtectedLayout>
        } />
        
        <Route path="/SalesOrderForm" element={
          <ProtectedLayout>
            <SalesOrderForm />
          </ProtectedLayout>
        } />
        
        <Route path="/GoodsIssueFormUI" element={
          <ProtectedLayout>
            <GoodsIssueForm />
          </ProtectedLayout>
        } />
        
        <Route path="/GoodsReciept" element={
          <ProtectedLayout>
            <GoodsReciept />
          </ProtectedLayout>
        } />
        
        <Route path="/GoodsTransfer" element={
          <ProtectedLayout>
            <GoodsTransfer />
          </ProtectedLayout>
        } />
        
        <Route path='/invoice' element={
          <ProtectedLayout>
            <Invoice />
          </ProtectedLayout>
        } />
        
        <Route path='/CustomerBilling' element={
          <ProtectedLayout>
            <CustomerBilling />
          </ProtectedLayout>
        } />
        
        <Route path='/EWayBillForm' element={
          <ProtectedLayout>
            <EWayBillForm />
          </ProtectedLayout>
        } />
        
        <Route path="/StockListERP" element={
          <ProtectedLayout>
            <StockListERP />
          </ProtectedLayout>
        } />
        
        <Route path="/GoodsReceiptCategory" element={
          <ProtectedLayout>
            <GoodsReceiptCategory />
          </ProtectedLayout>
        } />
        
        <Route path="/GoodsReceiptList" element={
          <ProtectedLayout>
            <GoodsReceiptList />
          </ProtectedLayout>
        } />
        
        <Route path="/GoodsIssueCategory" element={
          <ProtectedLayout>
            <GoodsIssueCategory />
          </ProtectedLayout>
        } />
        
        <Route path="/LocationMaster" element={
          <ProtectedLayout>
            <LocationMaster />
          </ProtectedLayout>
        } />
        
        <Route path="/InvoiceCategory" element={
          <ProtectedLayout>
            <InvoiceCategory />
          </ProtectedLayout>
        } />
        
        <Route path="/BillingCategory" element={
          <ProtectedLayout>
            <BillingCategory />
          </ProtectedLayout>
        } />
        
        <Route path="/InvoiceForm" element={
          <ProtectedLayout>
            <InvoiceForm />
          </ProtectedLayout>
        } />
        
        <Route path="/InvoiceList" element={
          <ProtectedLayout>
            <InvoiceList />
          </ProtectedLayout>
        } />
        
        <Route path="/BillingForm" element={
          <ProtectedLayout>
            <BillingForm />
          </ProtectedLayout>
        } />
        
        <Route path="/BillingDisplay" element={
          <ProtectedLayout>
            <BillingDisplay />
          </ProtectedLayout>
        } />
        
        <Route path="/companyform" element={
          <ProtectedLayout>
            <CompanyForm />
          </ProtectedLayout>
        } />

        
        <Route path="/Dashboard" element={
          <ProtectedLayout>
            <Dashboard />
          </ProtectedLayout>
        } />
      </Routes>
    </Router>
  )
}

export default App