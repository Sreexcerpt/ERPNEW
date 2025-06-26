import { React, useState } from "react";
const Sidebar = () => {
const [openSubmenus, setOpenSubmenus] = useState({
    dashboard: false,
    superAdmin: false,
    application:false,
    call:false,
    master:false,
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
      <div className="twocol-mini">

        {/* <!-- Add --> */}
        <div className="dropdown">
          <a className="btn btn-primary bg-gradient btn-sm btn-icon rounded-circle d-flex align-items-center justify-content-center" data-bs-toggle="dropdown" href="#" role="button" data-bs-display="static" data-bs-reference="parent">
            <i className="isax isax-add"></i>
          </a>
          <ul className="dropdown-menu dropdown-menu-start">
            <li>
              <a href="add-invoice.html" className="dropdown-item d-flex align-items-center">
                <i className="isax isax-document-text-1 me-2"></i>Invoice
              </a>
            </li>
            <li>
              <a href="expenses.html" className="dropdown-item d-flex align-items-center">
                <i className="isax isax-money-send me-2"></i>Expense
              </a>
            </li>
            <li>
              <a href="add-credit-notes.html" className="dropdown-item d-flex align-items-center">
                <i className="isax isax-money-add me-2"></i>Credit Notes
              </a>
            </li>
            <li>
              <a href="add-debit-notes.html" className="dropdown-item d-flex align-items-center">
                <i className="isax isax-money-recive me-2"></i>Debit Notes
              </a>
            </li>
            <li>
              <a href="add-purchases-orders.html" className="dropdown-item d-flex align-items-center">
                <i className="isax isax-document me-2"></i>Purchase Order
              </a>
            </li>
            <li>
              <a href="add-quotation.html" className="dropdown-item d-flex align-items-center">
                <i className="isax isax-document-download me-2"></i>Quotation
              </a>
            </li>
            <li>
              <a href="add-delivery-challan.html" className="dropdown-item d-flex align-items-center">
                <i className="isax isax-document-forward me-2"></i>Delivery Challan
              </a>
            </li>
          </ul>
        </div>
        {/* <!-- /Add --> */}

        <ul className="menu-list">
          <li>
            <a href="account-settings.html" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-title="Settings"><i className="isax isax-setting-25"></i></a>
          </li>
          <li>
            <a href="#" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-title="Documentation"><i className="isax isax-document-normal4"></i></a>
          </li>
          <li>
            <a href="#" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-title="Changelog"><i className="isax isax-cloud-change5"></i></a>
          </li>
          <li>
            <a href="login.html"><i className="isax isax-login-15"></i></a>
          </li>
        </ul>
      </div>
      <div className="sidebar" id="sidebar-two">

        {/* <!-- Start Logo --> */}
        <div className="sidebar-logo">
          <a href="/" className="logo logo-normal">
            <img src="assets/img/logo.svg" alt="Logo" />
          </a>
          <a href="/" className="logo-small">
            <img src="assets/img/logo-small.svg" alt="Logo" />
          </a>
          <a href="/" className="dark-logo">
            <img src="assets/img/logo-white.svg" alt="Logo" />
          </a>
          <a href="/" className="dark-small">
            <img src="assets/img/logo-small-white.svg" alt="Logo" />
          </a>

          {/* <!-- Sidebar Hover Menu Toggle Button --> */}
          <a id="toggle_btn" href="#">
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
        <div className="sidebar-inner" data-simplebar>
          <div id="sidebar-menu" className="sidebar-menu">
            <ul>
              {/* <li className="menu-title"><span>Main</span></li> */}
              {/* <li>
                <ul>
                  <li className="submenu">
                    <a 
                    href="#"
                      className={openSubmenus.dashboard ? "active subdrop" : ""}
                      onClick={e => {
                        e.preventDefault();
                        handleToggle("dashboard");
                      }}>
                      <i className="isax isax-element-45"></i><span>Dashboard</span>
                      <span className="menu-arrow"></span>
                    </a>
                    <ul style={{ display: openSubmenus.dashboard ? "block" : "none" }}>
                      <li><a href="/" className="active">Admin Dashboard</a></li>
                      <li><a href="admin-dashboard.html">Admin Dashboard 2</a></li>
                      <li><a href="customer-dashboard.html">Customer Dashboard</a></li>
                      <li><a href="super-admin-dashboard.html">Super Admin Dashboard</a></li>
                    </ul>
                  </li>
                  <li className="submenu">
                    <a href="#" className={openSubmenus.superAdmin ? "active subdrop" : ""}
                      onClick={e => {
                        e.preventDefault();
                        handleToggle("superAdmin");
                      }}>
                      <i className="isax isax-shapes5"></i><span>Super Admin</span>
                      <span className="menu-arrow"></span>
                    </a>
                    <ul style={{ display: openSubmenus.superAdmin ? "block" : "none" }}>
                      <li><a href="super-admin-dashboard.html">Dashboard</a></li>
                      <li><a href="companies.html">Companies</a></li>
                      <li><a href="subscriptions.html">Subscriptions</a></li>
                      <li><a href="packages.html">Packages</a></li>
                      <li><a href="domain.html">Domain</a></li>
                      <li><a href="purchase-transaction.html">Purchase Transaction</a></li>
                    </ul>
                  </li>
                  <li>
                    <a href="../sass-landing//">
                      <i className="isax isax-note-215"></i><span>Frontend</span>
                    </a>
                  </li>
                  <li className="submenu">
                    <a href="#" className={openSubmenus.application ? "active subdrop" : ""}
                      onClick={e => {
                        e.preventDefault();
                        handleToggle("application");
                      }} >
                      <i className="isax isax-category-25"></i><span>Applications</span>
                      <span className="menu-arrow"></span>
                    </a>
                    <ul style={{ display: openSubmenus.application ? "block" : "none" }}>
                      <li><a href="chat.html">Chat</a></li>
                      <li className="submenu submenu-two">
                        <a href="call.html" className={openSubmenus.call ? "active subdrop" : ""}
                      onClick={e => {
                        e.preventDefault();
                        handleToggle("call");
                      }} >Calls<span className="menu-arrow inside-submenu"></span></a>
                        <ul style={{ display: openSubmenus.call ? "block" : "none" }}>
                          <li><a href="voice-call.html">Voice Call</a></li>
                          <li><a href="video-call.html">Video Call</a></li>
                          <li><a href="outgoing-call.html">Outgoing Call</a></li>
                          <li><a href="incoming-call.html">Incoming Call</a></li>
                          <li><a href="call-history.html">Call History</a></li>
                        </ul>
                      </li>
                      <li><a href="calendar.html">Calendar</a></li>
                      <li><a href="email.html">Email</a></li>
                      <li><a href="todo.html">To Do</a></li>
                      <li><a href="notes.html">Notes</a></li>
                      <li><a href="social-feed.html">Social Feed</a></li>
                      <li><a href="file-manager.html">File Manager</a></li>
                      <li><a href="kanban-view.html">Kanban</a></li>
                      <li><a href="contacts.html">Contacts</a></li>
                      <li><a href="invoice.html">Invoices</a></li>
                      <li><a href="search-list.html">Search List</a></li>
                    </ul>
                  </li>
                </ul>
              </li> */}
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
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>);
};
export default Sidebar;