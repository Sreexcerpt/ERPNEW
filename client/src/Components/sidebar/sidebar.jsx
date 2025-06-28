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
              <li className="menu-title"><span>Master</span></li>
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
                      <i className="isax isax-element-45"></i><span>Master</span>
                      <span className="menu-arrow"></span>
                    </a>
                    <ul style={{ display: openSubmenus.master ? "block" : "none" }}>
                      <li><a href="/material-form" className="active">Material</a></li>
                      <li><a href="/customer-form">Customer</a></li>
                      <li><a href="/vendor-form">Vendor</a></li>
                      <li><a href="/customer-price-list">Customer Price List</a></li>
                      <li><a href="/vendor-price-list">Vendor Price List</a></li>
                      <li><a href="/tax-form">Tax</a></li>
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
                      <li>
                        <a href="/Purchaserequestcat">

                          <span>Indent Category</span>
                        </a>
                      </li>
                      <li>
                        <a href="/IndentRequest">

                          <span>Indent</span>
                        </a>
                      </li>
                      <li>
                        <a href="/PurchaseIndentsummary">

                          <span>Purchase Indent summary</span>
                        </a>
                      </li>
                      <li>
                        <a href="/rfq-category-form">

                          <span>RFQ Category</span>
                        </a>
                      </li>
                      <li>
                        <a href="/quotation-form">

                          <span>Quotation Form</span>
                        </a>
                      </li>
                      <li>
                        <a href="/quotation-list">

                          <span>Quotations Display</span>
                        </a>
                      </li>
                      <li><a href="POCategory"><span>POCategory</span></a></li>
                      <li><a href="PurchaseOrderForm"><span>PurchaseOrderForm</span></a></li>

                      <li><a href="/POList"><span>POList</span></a></li>

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
                      <li>
                        <a href="/SalesCategory">
                          <span>Indent Category</span>
                        </a>
                      </li>
                      <li>
                        <a href="/Salesrequest">
                          <span>Sales Request</span>
                        </a>
                      </li>
                      <li>
                        <a href="/sale-quotation-category-form">
                          <span>RFQ Category</span>
                        </a>
                      </li>
                      <li>
                        <a href="/sales-quotation-form">
                          <span>Quotation Form</span>
                        </a>
                      </li>
                      <li>
                        <a href="/quotation-list">
                          <span>Quotations Display</span>
                        </a>
                      </li>
                      <li><a href="/SalesOrderForm"><span>SalesOrderForm</span></a></li>
                      <li><a href="/SalesOrderDisplay"><span>SalesOrderDisplay</span></a></li>
                      <li><a href="SalesOrderCategoryForm"><span>SalesOrderCategoryForm</span></a></li>
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