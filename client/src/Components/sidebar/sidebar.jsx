import { React, useState } from "react";
const Sidebar = () => {
  const [openSubmenus, setOpenSubmenus] = useState({
    dashboard: false,
    superAdmin: false,
    application: false,
    call: false,
    master: false,
    // Add more as needed
  });
  const handleToggle = (key) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };
  return (

    <div className="two-col-sidebar" id="two-col-sidebar">

      <div className="sidebar" id="sidebar-two">

        {/* <!-- Start Logo --> */}
        <div className="sidebar-logo">
          <a href="/" onMouseEnter={() => {
            document.body.classList.toggle('expand-menu');
          }}
            className="logo logo-normal">
            <img src="assets/img/logo.svg" alt="Logo" />
          </a>
          <a href="/"
            onMouseEnter={() => {
              document.body.classList.add('expand-menu');
            }}
            onMouseLeave={() => {
              document.body.classList.remove('expand-menu');
            }}
            className="logo-small">
            <img src="assets/img/logo-small.svg" alt="Logo" />
          </a>
          <a href="/" className="dark-logo">
            <img src="assets/img/logo-white.svg" alt="Logo" />
          </a>
          <a href="/" className="dark-small">
            <img src="assets/img/logo-small-white.svg" alt="Logo" />
          </a>

          {/* <!-- Sidebar Hover Menu Toggle Button --> */}
          <a
            id="toggle_btn"
            href="#"
            onClick={e => {
              e.preventDefault();
              document.body.classList.toggle('mini-sidebar');
            }}
          >
            <i className="isax isax-menu-1"></i>
          </a>
        </div>
        {/* <!-- End Logo --> */}

        {/* <!-- Search --> */}
        <div className="sidebar-search">
          <div className="input-icon-end position-relative">
            <input type="text" className="form-control" placeholder="Search" />
            <span className="input-icon-addon">
              <i className="isax isax-search-normal"></i>
            </span>
          </div>
        </div>
        {/* <!-- /Search --> */}

        {/* <!--- Sidenav Menu --> */}
        <div className="sidebar-inner simplebar-scrollable-y" data-simplebar>
          <div id="sidebar-menu" className="sidebar-menu">
            <ul>
              <li className="menu-title"><span>Master Data</span></li>
              <li>
                <ul>
                  <li className="submenu">
                    <a
                      href="#"
                      className={openSubmenus.master ? "active subdrop" : ""}
                      onClick={e => {
                        e.preventDefault();
                        handleToggle("master");
                      }} >
                      <i className="isax isax-element-45"></i><span>Master Data</span>
                      <span className="menu-arrow"></span>
                    </a>
                    <ul style={{ display: openSubmenus.master ? "block" : "none" }}>
                      <li><a href="/material-form" className="active">Material Master</a></li>
                      <li><a href="/customer-form">Customer Master</a></li>
                      <li><a href="/vendor-form">Vendor Master</a></li>
                      <li><a href="/customer-price-list">Customer Price List</a></li>
                      <li><a href="/vendor-price-list">Vendor Price List</a></li>
                      <li><a href="/tax-form">Tax List</a></li>
                      <li><a href="/LocationMaster">Location Master</a></li>
                    </ul>
                  </li>
                  <li className="submenu">
                    <a
                      href="#"
                      className={openSubmenus.category ? "active subdrop" : ""}
                      onClick={e => {
                        e.preventDefault();
                        handleToggle("category");
                      }} >
                      <i className="bi bi-database"></i><span>Category</span>
                      <span className="menu-arrow"></span>
                    </a>
                    <ul style={{ display: openSubmenus.category ? "block" : "none" }}>
                      <li><a href="/MaterialCategory">Material Category</a></li>
                      <li><a href="/customer-category-form">Customer Category</a></li>
                      <li><a href="/vendor-category">Vendor Category</a></li>
                      <li><a href="/Purchaserequestcat">Purchase Indent Category</a></li>
                      <li><a href="/SalesCategory">Sales Indent Category </a></li>
                      <li><a href="POCategory">PO Category</a></li>
                      <li><a href="/sale-quotation-category-form">Sales RFQ Category</a></li>
                      <li><a href="SalesOrderCategoryForm">Sales Order Category</a></li>
                      <li><a href="/GoodsReceiptCategory">Goods Receipt Category</a></li>
                      <li><a href="/GoodsIssueCategory">Goods Issue Category</a></li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li className="menu-title"><span>Purchase</span></li>
              <li>
                <ul>
                  <li className="submenu">
                    <a
                      href="#"
                      className={openSubmenus.purchase ? "active subdrop" : ""}
                      onClick={e => {
                        e.preventDefault();
                        handleToggle("purchase");
                      }} >
                      <i className="isax isax-element-45"></i><span>Purchase</span>
                      <span className="menu-arrow"></span>
                    </a> <ul style={{ display: openSubmenus.purchase ? "block" : "none" }}>
                      <li><a href="/IndentRequest">Purchase Indent</a></li>
                      <li><a href="/quotation-form">Purchase Quotation</a></li>
                      <li><a href="PurchaseOrderForm">Purchase Order</a></li>
                      <li><a href="/PurchaseIndentsummary">Purchase Indent List</a></li>
                      <li><a href="/quotation-list">Purchase Quotations List</a></li>
                      <li><a href="/POList">Purchase Order List</a></li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li className="menu-title"><span>Sales</span></li>
              <li>
                <ul>
                  <li className="submenu">
                    <a
                      href="#"
                      className={openSubmenus.sales ? "active subdrop" : ""}
                      onClick={e => {
                        e.preventDefault();
                        handleToggle("sales");
                      }} >
                      <i className="isax isax-element-45"></i><span>Sales</span>
                      <span className="menu-arrow"></span>
                    </a> <ul style={{ display: openSubmenus.sales ? "block" : "none" }}>

                      <li><a href="/Salesrequest">Sales Indent</a></li>
                      <li><a href="/sales-quotation-form">Sales Quotation Form</a></li>
                      <li><a href="/SalesOrderForm">Sales Order</a></li>
                      <li><a href="/SalesIndentsummary">Sales Indent List</a></li>
                      <li><a href="/quotation-list">Sales Quotations List</a></li>
                      <li><a href="/SalesOrderDisplay">Sales Order List</a></li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li className="menu-title"><span>Inventory</span></li>
              <li>
                <ul>
                  <li className="submenu">
                    <a
                      href="#"
                      className={openSubmenus.inventory ? "active subdrop" : ""}
                      onClick={e => {
                        e.preventDefault();
                        handleToggle("inventory");
                      }} >
                      <i className="isax isax-box"></i><span>Inventory</span>
                      <span className="menu-arrow"></span>
                    </a>
                    <ul style={{ display: openSubmenus.inventory ? "block" : "none" }}>
                      <li><a href="/GoodsReciept">Material Receipt</a></li>
                      <li><a href="/GoodsReceiptList">Material Receipt List</a></li>
                      <li><a href="/GoodsIssueFormUI">Material Issue</a></li>
                      <li><a href="/GoodsTransfer">Material Transfer</a></li>
                      <li><a href="/StockListERP">Stock List</a></li>
                    </ul>
                  </li>
                </ul>
              </li>
              {/* <li className="menu-title"><span>Accounts</span></li>
              <li>
                <ul>
                  <li className="submenu">
                    <a
                      href="#"
                      className={openSubmenus.accounts ? "active subdrop" : ""}
                      onClick={e => {
                        e.preventDefault();
                        handleToggle("accounts");
                      }} >
                      <i className="isax isax-box"></i><span>Accounts</span>
                      <span className="menu-arrow"></span>
                    </a>
                    <ul style={{ display: openSubmenus.accounts ? "block" : "none" }}>
                      <li><a href="/invoice">Invoice</a></li>
                      <li><a href="/CustomerBilling">Customer Billing</a></li>
                      <li><a href="/EWayBillForm">e-Way Bill</a></li>
                    </ul>
                  </li>
                </ul>
              </li> */}

              <li className="menu-title"><span>Invoice</span></li>
              <li>
                <ul>
                  <li className="submenu">
                    <a
                      href="#"
                      className={openSubmenus.invoice ? "active subdrop" : ""}
                      onClick={e => {
                        e.preventDefault();
                        handleToggle("invoice");
                      }} >
                      <i className="isax isax-box"></i><span>Invoice</span>
                      <span className="menu-arrow"></span>
                    </a>
                    <ul style={{ display: openSubmenus.invoice ? "block" : "none" }}>
                      <li><a href="/InvoiceCategory">Invoice Category</a></li>
                       <li><a href="/InvoiceForm">Invoice Form</a></li>
                         <li><a href="/InvoiceList">Invoice List</a></li>
                    
                     
                    </ul>
                  </li>
                </ul>
              </li>
              <li className="menu-title"><span>Billing</span></li>
              <li>
                <ul>
                  <li className="submenu">
                    <a
                      href="#"
                      className={openSubmenus.billing ? "active subdrop" : ""}
                      onClick={e => {
                        e.preventDefault();
                        handleToggle("billing");
                      }} >
                      <i className="isax isax-box"></i><span>Billing</span>
                      <span className="menu-arrow"></span>
                    </a>
                    <ul style={{ display: openSubmenus.invoice ? "block" : "none" }}>
                      <li><a href="/BillingCategory">Billing Category</a></li>
                        <li><a href="/BillingForm">Billing Form</a></li>
                     <li><a href="/BillingDisplay">Billing List</a></li>
                     
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>);
};
export default Sidebar;