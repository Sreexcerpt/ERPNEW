// // import { NavLink } from 'react-router-dom';
// // import React, { useState } from 'react';

// // const menuItems = [
// //     {
// //         label: 'Master',
// //         key: 'master',
// //         subMenu: [
// //             {
// //                 label: 'Category',
// //                 key: 'category',
// //                 subMenu: [
// //                     { to: '/MaterialCategory', label: 'Material Category' },
// //                     { to: '/customer-category-form', label: 'Customer Category' },
// //                     { to: '/vendor-category', label: 'Vendor Category' },
// //                 ],
// //             },
// //             {
// //                 label: 'Forms',
// //                 key: 'forms',
// //                 subMenu: [
// //                     { to: '/material-form', label: 'Material Form' },
// //                     { to: '/customer-form', label: 'Customer Form' },
// //                     { to: '/vendor-form', label: 'Vendor Form' },
// //                 ],
// //             },
// //         ],
// //     },
// //     // Add more top-level menu items if needed
// // ];

// // const Sidebar = () => {
// //     const [openMenus, setOpenMenus] = useState({});

// //     const handleMenuClick = (key) => {
// //         setOpenMenus((prev) => ({
// //             ...prev,
// //             [key]: !prev[key],
// //         }));
// //     };

// //     // Recursive rendering for nested menus
// //     const renderMenu = (items, parentKey = '') => (
// //         <ul className="nav flex-column" >
// //             {items.map((item) => {
// //                 const itemKey = parentKey ? `${parentKey}-${item.key}` : item.key;
// //                 return (
// //                     <li className="nav-item" key={itemKey}>
// //                         {item.subMenu ? (
// //                             <>
// //                                 <span
// //                                     className="nav-link"
// //                                     style={{ cursor: 'pointer' }}
// //                                     onClick={() => handleMenuClick(itemKey)}
// //                                 >
// //                                     {item.label}
// //                                 </span>
// //                                 {openMenus[itemKey] && renderMenu(item.subMenu, itemKey)}
// //                             </>
// //                         ) : (
// //                             <NavLink to={item.to} className="nav-link">
// //                                 {item.label}
// //                             </NavLink>
// //                         )}
// //                     </li>
// //                 );
// //             })}
// //         </ul>
// //     );

// //     return <nav style={{ width: '10%',position:"fixed" }}>{renderMenu(menuItems)}</nav>;
// // };

// // export default Sidebar;


// "use client"

// import { useState } from "react"
// // import "bootstrap/dist/css/bootstrap.min.css"
// // import "./ERPSidebar.css"

// const ERPSidebar = () => {
//   const [openMenus, setOpenMenus] = useState({})
//   const [openSubMenus, setOpenSubMenus] = useState({})

//   const toggleMenu = (menuKey) => {
//     setOpenMenus((prev) => ({
//       ...prev,
//       [menuKey]: !prev[menuKey],
//     }))
//   }

//   const toggleSubMenu = (subMenuKey) => {
//     setOpenSubMenus((prev) => ({
//       ...prev,
//       [subMenuKey]: !prev[subMenuKey],
//     }))
//   }

//   const navigationData = [
//     {
//       id: "dashboard",
//       title: "Dashboard",
//       icon: "bi-house-door",
//       url: "/dashboard",
//     },
//     {
//       id: "sales",
//       title: "Sales",
//       icon: "bi-cart",
//       subItems: [
//         {
//           id: "orders",
//           title: "Orders",
//           url: "/sales/orders",
//           subItems: [
//             { title: "New Orders", url: "/sales/orders/new" },
//             { title: "Pending Orders", url: "/sales/orders/pending" },
//             { title: "Completed Orders", url: "/sales/orders/completed" },
//           ],
//         },
//         {
//           id: "customers",
//           title: "Customers",
//           url: "/sales/customers",
//           subItems: [
//             { title: "Customer List", url: "/sales/customers/list" },
//             { title: "Customer Groups", url: "/sales/customers/groups" },
//             { title: "Customer Reports", url: "/sales/customers/reports" },
//           ],
//         },
//         {
//           id: "quotations",
//           title: "Quotations",
//           url: "/sales/quotations",
//           subItems: [
//             { title: "Create Quote", url: "/sales/quotations/create" },
//             { title: "Quote Templates", url: "/sales/quotations/templates" },
//             { title: "Quote History", url: "/sales/quotations/history" },
//           ],
//         },
//       ],
//     },
//     {
//       id: "inventory",
//       title: "Inventory",
//       icon: "bi-box",
//       subItems: [
//         {
//           id: "products",
//           title: "Products",
//           url: "/inventory/products",
//           subItems: [
//             { title: "Product Catalog", url: "/inventory/products/catalog" },
//             { title: "Categories", url: "/inventory/products/categories" },
//             { title: "Variants", url: "/inventory/products/variants" },
//           ],
//         },
//         {
//           id: "stock",
//           title: "Stock Management",
//           url: "/inventory/stock",
//           subItems: [
//             { title: "Stock Levels", url: "/inventory/stock/levels" },
//             { title: "Stock Movements", url: "/inventory/stock/movements" },
//             { title: "Low Stock Alerts", url: "/inventory/stock/alerts" },
//           ],
//         },
//         {
//           id: "warehouses",
//           title: "Warehouses",
//           url: "/inventory/warehouses",
//           subItems: [
//             { title: "Warehouse List", url: "/inventory/warehouses/list" },
//             { title: "Locations", url: "/inventory/warehouses/locations" },
//             { title: "Transfers", url: "/inventory/warehouses/transfers" },
//           ],
//         },
//       ],
//     },
//     {
//       id: "finance",
//       title: "Finance",
//       icon: "bi-currency-dollar",
//       subItems: [
//         {
//           id: "accounting",
//           title: "Accounting",
//           url: "/finance/accounting",
//           subItems: [
//             { title: "Chart of Accounts", url: "/finance/accounting/chart" },
//             { title: "Journal Entries", url: "/finance/accounting/journal" },
//             { title: "Trial Balance", url: "/finance/accounting/trial-balance" },
//           ],
//         },
//         {
//           id: "invoicing",
//           title: "Invoicing",
//           url: "/finance/invoicing",
//           subItems: [
//             { title: "Create Invoice", url: "/finance/invoicing/create" },
//             { title: "Invoice Templates", url: "/finance/invoicing/templates" },
//             { title: "Payment Tracking", url: "/finance/invoicing/payments" },
//           ],
//         },
//         {
//           id: "reports",
//           title: "Reports",
//           url: "/finance/reports",
//           subItems: [
//             { title: "P&L Statement", url: "/finance/reports/pnl" },
//             { title: "Balance Sheet", url: "/finance/reports/balance" },
//             { title: "Cash Flow", url: "/finance/reports/cashflow" },
//           ],
//         },
//       ],
//     },
//     {
//       id: "hr",
//       title: "Human Resources",
//       icon: "bi-people",
//       subItems: [
//         {
//           id: "employees",
//           title: "Employees",
//           url: "/hr/employees",
//           subItems: [
//             { title: "Employee Directory", url: "/hr/employees/directory" },
//             { title: "Departments", url: "/hr/employees/departments" },
//             { title: "Positions", url: "/hr/employees/positions" },
//           ],
//         },
//         {
//           id: "payroll",
//           title: "Payroll",
//           url: "/hr/payroll",
//           subItems: [
//             { title: "Salary Processing", url: "/hr/payroll/processing" },
//             { title: "Pay Slips", url: "/hr/payroll/payslips" },
//             { title: "Tax Reports", url: "/hr/payroll/tax" },
//           ],
//         },
//         {
//           id: "leave",
//           title: "Leave Management",
//           url: "/hr/leave",
//           subItems: [
//             { title: "Leave Requests", url: "/hr/leave/requests" },
//             { title: "Leave Types", url: "/hr/leave/types" },
//             { title: "Leave Calendar", url: "/hr/leave/calendar" },
//           ],
//         },
//       ],
//     },
//     {
//       id: "reports",
//       title: "Reports & Analytics",
//       icon: "bi-bar-chart",
//       subItems: [
//         {
//           id: "sales-reports",
//           title: "Sales Reports",
//           url: "/reports/sales",
//           subItems: [
//             { title: "Sales Summary", url: "/reports/sales/summary" },
//             { title: "Product Performance", url: "/reports/sales/products" },
//             { title: "Customer Analysis", url: "/reports/sales/customers" },
//           ],
//         },
//         {
//           id: "financial-reports",
//           title: "Financial Reports",
//           url: "/reports/financial",
//           subItems: [
//             { title: "Revenue Reports", url: "/reports/financial/revenue" },
//             { title: "Expense Reports", url: "/reports/financial/expenses" },
//             { title: "Profit Analysis", url: "/reports/financial/profit" },
//           ],
//         },
//       ],
//     },
//     {
//       id: "settings",
//       title: "Settings",
//       icon: "bi-gear",
//       subItems: [
//         {
//           id: "company",
//           title: "Company Settings",
//           url: "/settings/company",
//           subItems: [
//             { title: "Company Profile", url: "/settings/company/profile" },
//             { title: "Branches", url: "/settings/company/branches" },
//             { title: "Tax Settings", url: "/settings/company/tax" },
//           ],
//         },
//         {
//           id: "users",
//           title: "User Management",
//           url: "/settings/users",
//           subItems: [
//             { title: "Users", url: "/settings/users/list" },
//             { title: "Roles & Permissions", url: "/settings/users/roles" },
//             { title: "Access Control", url: "/settings/users/access" },
//           ],
//         },
//       ],
//     },
//   ]

//   const renderSubSubMenu = (subItems, parentKey) => {
//     if (!subItems) return null

//     return (
//       <ul className="list-unstyled ps-4 sub-sub-menu">
//         {subItems.map((item, index) => (
//           <li key={index}>
//             <a href={item.url} className="nav-link text-light py-1 px-2 rounded sub-sub-item">
//               <small>{item.title}</small>
//             </a>
//           </li>
//         ))}
//       </ul>
//     )
//   }

//   const renderSubMenu = (subItems, parentKey) => {
//     if (!subItems) return null

//     return (
//       <div className={`collapse ${openMenus[parentKey] ? "show" : ""}`}>
//         <ul className="list-unstyled ps-3 sub-menu">
//           {subItems.map((subItem) => (
//             <li key={subItem.id}>
//               {subItem.subItems ? (
//                 <>
//                   <button
//                     className="btn btn-link nav-link text-light py-2 px-2 w-100 text-start sub-menu-item"
//                     onClick={() => toggleSubMenu(`${parentKey}-${subItem.id}`)}
//                   >
//                     {subItem.title}
//                     <i
//                       className={`bi bi-chevron-${openSubMenus[`${parentKey}-${subItem.id}`] ? "down" : "right"} float-end`}
//                     ></i>
//                   </button>
//                   <div className={`collapse ${openSubMenus[`${parentKey}-${subItem.id}`] ? "show" : ""}`}>
//                     {renderSubSubMenu(subItem.subItems, `${parentKey}-${subItem.id}`)}
//                   </div>
//                 </>
//               ) : (
//                 <a href={subItem.url} className="nav-link text-light py-2 px-2 rounded sub-menu-item">
//                   {subItem.title}
//                 </a>
//               )}
//             </li>
//           ))}
//         </ul>
//       </div>
//     )
//   }

//   return (
//     <div className="erp-sidebar bg-dark text-light">
//       {/* Header */}
//       <div className="sidebar-header p-3 border-bottom border-secondary">
//         <div className="d-flex align-items-center">
//           <i className="bi bi-building fs-4 me-2 text-primary"></i>
//           <div>
//             <h6 className="mb-0 fw-bold">ERP System</h6>
//             <small className="text-muted">Enterprise Resource Planning</small>
//           </div>
//         </div>
//       </div>

//       {/* Navigation */}
//       <div className="sidebar-content p-2">
//         <nav>
//           <ul className="list-unstyled">
//             {navigationData.map((item) => (
//               <li key={item.id} className="mb-1">
//                 {item.subItems ? (
//                   <>
//                     <button
//                       className="btn btn-link nav-link text-light py-2 px-3 w-100 text-start main-menu-item"
//                       onClick={() => toggleMenu(item.id)}
//                     >
//                       <i className={`${item.icon} me-2`}></i>
//                       {item.title}
//                       <i className={`bi bi-chevron-${openMenus[item.id] ? "down" : "right"} float-end`}></i>
//                     </button>
//                     {renderSubMenu(item.subItems, item.id)}
//                   </>
//                 ) : (
//                   <a href={item.url} className="nav-link text-light py-2 px-3 rounded main-menu-item">
//                     <i className={`${item.icon} me-2`}></i>
//                     {item.title}
//                   </a>
//                 )}
//               </li>
//             ))}
//           </ul>
//         </nav>
//       </div>
//     </div>
//   )
// }

// export default ERPSidebar

const Sidebar = () => {
  return(

<div class="two-col-sidebar" id="two-col-sidebar">
  <div class="twocol-mini">

    {/* <!-- Add --> */}
    <div class="dropdown">
      <a class="btn btn-primary bg-gradient btn-sm btn-icon rounded-circle d-flex align-items-center justify-content-center" data-bs-toggle="dropdown" href="#" role="button" data-bs-display="static" data-bs-reference="parent">
        <i class="isax isax-add"></i>
      </a>
      <ul class="dropdown-menu dropdown-menu-start">
        <li>
          <a href="add-invoice.html" class="dropdown-item d-flex align-items-center">
            <i class="isax isax-document-text-1 me-2"></i>Invoice
          </a>
        </li>
        <li>
          <a href="expenses.html" class="dropdown-item d-flex align-items-center">
            <i class="isax isax-money-send me-2"></i>Expense
          </a>
        </li>
        <li>
          <a href="add-credit-notes.html" class="dropdown-item d-flex align-items-center">
            <i class="isax isax-money-add me-2"></i>Credit Notes
          </a>
        </li>
        <li>
          <a href="add-debit-notes.html" class="dropdown-item d-flex align-items-center">
            <i class="isax isax-money-recive me-2"></i>Debit Notes
          </a>
        </li>
        <li>
          <a href="add-purchases-orders.html" class="dropdown-item d-flex align-items-center">
            <i class="isax isax-document me-2"></i>Purchase Order
          </a>
        </li>
        <li>
          <a href="add-quotation.html" class="dropdown-item d-flex align-items-center">
            <i class="isax isax-document-download me-2"></i>Quotation
          </a>
        </li>
        <li>
          <a href="add-delivery-challan.html" class="dropdown-item d-flex align-items-center">
            <i class="isax isax-document-forward me-2"></i>Delivery Challan
          </a>
        </li>
      </ul>
    </div>
    {/* <!-- /Add --> */}

    <ul class="menu-list">
      <li>
        <a href="account-settings.html" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-title="Settings"><i class="isax isax-setting-25"></i></a>
      </li>
      <li>
        <a href="#" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-title="Documentation"><i class="isax isax-document-normal4"></i></a>
      </li>
      <li>
        <a href="#" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-title="Changelog"><i class="isax isax-cloud-change5"></i></a>
      </li>
      <li>
        <a href="login.html"><i class="isax isax-login-15"></i></a>
      </li>
    </ul>
  </div>
  <div class="sidebar" id="sidebar-two">

    {/* <!-- Start Logo --> */}
    <div class="sidebar-logo">
      <a href="index.html" class="logo logo-normal">
        <img src="assets/img/logo.svg" alt="Logo" />
      </a>
      <a href="index.html" class="logo-small">
        <img src="assets/img/logo-small.svg" alt="Logo" />
      </a>
      <a href="index.html" class="dark-logo">
        <img src="assets/img/logo-white.svg" alt="Logo" />
      </a>
      <a href="index.html" class="dark-small">
        <img src="assets/img/logo-small-white.svg" alt="Logo" />
      </a>

      {/* <!-- Sidebar Hover Menu Toggle Button --> */}
      <a id="toggle_btn" href="#">
        <i class="isax isax-menu-1"></i>
      </a>
    </div>
    {/* <!-- End Logo --> */}

    {/* <!-- Search --> */}
    <div class="sidebar-search">
      <div class="input-icon-end position-relative">
        <input type="text" class="form-control" placeholder="Search" />
        <span class="input-icon-addon">
          <i class="isax isax-search-normal"></i>
        </span>
      </div>
    </div>
    {/* <!-- /Search --> */}

    {/* <!--- Sidenav Menu --> */}
    <div class="sidebar-inner" data-simplebar>
      <div id="sidebar-menu" class="sidebar-menu">
        <ul>
          <li class="menu-title"><span>Main</span></li>
          <li>
            <ul>
              <li class="submenu">
                <a href="#" class="active subdrop">
                  <i class="isax isax-element-45"></i><span>Dashboard</span>
                  <span class="menu-arrow"></span>
                </a>
                <ul>
                  <li><a href="index.html" class="active">Admin Dashboard</a></li>
                  <li><a href="admin-dashboard.html">Admin Dashboard 2</a></li>
                  <li><a href="customer-dashboard.html">Customer Dashboard</a></li>
                  <li><a href="super-admin-dashboard.html">Super Admin Dashboard</a></li>
                </ul>
              </li>
              <li class="submenu">
                <a href="#">
                  <i class="isax isax-shapes5"></i><span>Super Admin</span>
                  <span class="menu-arrow"></span>
                </a>
                <ul>
                  <li><a href="super-admin-dashboard.html">Dashboard</a></li>
                  <li><a href="companies.html">Companies</a></li>
                  <li><a href="subscriptions.html">Subscriptions</a></li>
                  <li><a href="packages.html">Packages</a></li>
                  <li><a href="domain.html">Domain</a></li>
                  <li><a href="purchase-transaction.html">Purchase Transaction</a></li>
                </ul>
              </li>
              <li>
                <a href="../sass-landing/index.html">
                  <i class="isax isax-note-215"></i><span>Frontend</span>
                </a>
              </li>
              <li class="submenu">
                <a href="#">
                  <i class="isax isax-category-25"></i><span>Applications</span>
                  <span class="menu-arrow"></span>
                </a>
                <ul>
                  <li><a href="chat.html">Chat</a></li>
                  <li class="submenu submenu-two">
                    <a href="call.html">Calls<span class="menu-arrow inside-submenu"></span></a>
                    <ul>
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
          </li>
          <li class="menu-title"><span>Inventory & Sales</span></li>
          <li>
            <ul>
              <li class="submenu">
                <a href="#">
                  <i class="isax isax-box5"></i><span>Product / Services</span>
                  <span class="menu-arrow"></span>
                </a>
                <ul>
                  <li><a href="products.html">Products</a></li>
                  <li><a href="category.html">Category</a></li>
                  <li><a href="units.html">Units</a></li>
                </ul>
              </li>
              <li>
                <a href="inventory.html">
                  <i class="isax isax-lifebuoy5"></i><span>Inventory</span>
                </a>
              </li>
              <li class="submenu">
                <a href="#">
                  <i class="isax isax-receipt-item5"></i><span>Invoices</span>
                  <span class="menu-arrow"></span>
                </a>
                <ul>
                  <li><a href="invoices.html">Invoices</a></li>
                  <li><a href="add-invoice.html">Create Invoice</a></li>
                  <li><a href="invoice-details.html">Invoice Details</a></li>
                  <li><a href="invoice-templates.html">Invoice Templates</a></li>
                  <li><a href="recurring-invoices.html">Recurring Invoices</a></li>
                </ul>
              </li>
              <li>
                <a href="credit-notes.html">
                  <i class="isax isax-note5"></i><span>Credit Notes</span>
                </a>
              </li>
              <li>
                <a href="quotations.html">
                  <i class="isax isax-strongbox5"></i><span>Quotations</span>
                </a>
              </li>
              <li>
                <a href="delivery-challans.html">
                  <i class="isax isax-bookmark-25"></i><span>Delivery Challans</span>
                </a>
              </li>
              <li class="submenu">
                <a href="#">
                  <i class="isax isax-profile-2user5"></i><span>Customers</span>
                  <span class="menu-arrow"></span>
                </a>
                <ul>
                  <li><a href="customers.html">Customers</a></li>
                  <li><a href="customer-details.html">Customer Details</a></li>
                </ul>
              </li>
            </ul>
          </li>
          <li class="menu-title"><span>Purchases</span></li>
          <li>
            <ul>
              <li>
                <a href="purchases.html">
                  <i class="isax isax-bag-tick-25"></i><span>Purchases</span>
                </a>
              </li>
              <li>
                <a href="purchase-orders.html">
                  <i class="isax isax-document-forward5"></i><span>Purchase Orders</span>
                </a>
              </li>
              <li>
                <a href="debit-notes.html">
                  <i class="isax isax-document-text5"></i><span>Debit Notes</span>
                </a>
              </li>
              <li>
                <a href="suppliers.html">
                  <i class="isax isax-security-user5"></i><span>Suppliers</span>
                </a>
              </li>
              <li>
                <a href="supplier-payments.html">
                  <i class="isax isax-coin-15"></i><span>Supplier Payments</span>
                </a>
              </li>
            </ul>
          </li>
          <li class="menu-title"><span>Finance & Accounts</span></li>
          <li>
            <ul>
              <li>
                <a href="expenses.html">
                  <i class="isax isax-money-send5"></i><span>Expenses</span>
                </a>
              </li>
              <li>
                <a href="incomes.html">
                  <i class="isax isax-money-recive5"></i><span>Incomes</span>
                </a>
              </li>
              <li>
                <a href="payments.html">
                  <i class="isax isax-money-tick5"></i><span>Payments</span>
                </a>
              </li>
              <li>
                <a href="transactions.html">
                  <i class="isax isax-moneys5"></i><span>Transactions</span>
                </a>
              </li>
              <li>
                <a href="bank-accounts.html">
                  <i class="isax isax-card-tick-15"></i><span>Bank Accounts</span>
                </a>
              </li>
              <li>
                <a href="money-transfer.html">
                  <i class="isax isax-convert-card5"></i><span>Money Transfer</span>
                </a>
              </li>
            </ul>
          </li>
          <li class="menu-title"><span>Manage</span></li>
          <li>
            <ul>
              <li class="submenu">
                <a href="#">
                  <i class="isax isax-profile-2user5"></i><span>Manage Users</span>
                  <span class="menu-arrow"></span>
                </a>
                <ul>
                  <li><a href="users.html">Users</a></li>
                  <li><a href="roles-permissions.html">Roles & Permissions</a></li>
                  <li><a href="delete-account-request.html">Delete Account Request</a></li>
                </ul>
              </li>
              <li class="submenu">
                <a href="#">
                  <i class="isax isax-star-15"></i><span>Membership</span>
                  <span class="menu-arrow"></span>
                </a>
                <ul>
                  <li><a href="membership-plans.html">Membership Plans</a></li>
                  <li><a href="membership-addons.html">Membership Addons</a></li>
                  <li><a href="subscribers.html">Subscribers</a></li>
                  <li><a href="membership-transactions.html">Transactions</a></li>
                </ul>
              </li>
              <li>
                <a href="contact-messages.html">
                  <i class="isax isax-messages-25"></i><span>Contact Messages</span>
                </a>
              </li>
              <li class="submenu">
                <a href="#">
                  <i class="isax isax-ticket-25"></i><span>Tickets</span>
                  <span class="menu-arrow"></span>
                </a>
                <ul>
                  <li><a href="tickets.html">Ticket Lists</a></li>
                  <li><a href="ticket-kanban.html">Ticket Kanban</a></li>
                  <li><a href="ticket-details.html">Ticket Details</a></li>
                </ul>
              </li>
            </ul>
          </li>
          <li class="menu-title"><span>Administration</span></li>
          <li>
            <ul>
              <li class="submenu">
                <a href="#">
                  <i class="isax isax-chart-35"></i><span>Reports</span>
                  <span class="menu-arrow"></span>
                </a>
                <ul>
                  <li class="submenu submenu-two">
                    <a href="#">Item Reports<span class="menu-arrow"></span></a>
                    <ul>
                      <li><a href="stock-summary.html">Stock Summary</a></li>
                      <li><a href="inventory-report.html">Inventory</a></li>
                      <li><a href="best-seller.html">Best Seller</a></li>
                      <li><a href="low-stock.html">Low Stock</a></li>
                      <li><a href="stock-history.html">Stock History</a></li>
                      <li><a href="sold-stock.html">Sold Stock</a></li>
                    </ul>
                  </li>
                  <li class="submenu submenu-two">
                    <a href="#">Transaction Reports<span class="menu-arrow"></span></a>
                    <ul>
                      <li><a href="sales-report.html">Sales</a></li>
                      <li><a href="sales-returns.html">Sales Return</a></li>
                      <li><a href="sales-orders.html">Sales Orders</a></li>
                      <li><a href="purchases-report.html">Purchases</a></li>
                      <li><a href="purchase-return-report.html">Purchase Return</a></li>
                      <li><a href="purchase-orders-report.html">Purchase Orders</a></li>
                      <li><a href="quotation-report.html">Quotation</a></li>
                    </ul>
                  </li>
                  <li class="submenu submenu-two">
                    <a href="#">Finance Reports<span class="menu-arrow"></span></a>
                    <ul>
                      <li><a href="payment-summary.html">Payment Summary</a></li>
                      <li><a href="tax-report.html">Taxes</a></li>
                    </ul>
                  </li>
                  <li class="submenu submenu-two">
                    <a href="#">Accounting Reports<span class="menu-arrow"></span></a>
                    <ul>
                      <li><a href="expense-report.html">Expenses</a></li>
                      <li><a href="income-report.html">Income</a></li>
                      <li><a href="profit-loss-report.html">Profit & Loss</a></li>
                      <li><a href="annual-report.html">Annual Report</a></li>
                      <li><a href="balance-sheet.html">Balance Sheet</a></li>
                      <li><a href="trial-balance.html">Trial Balance</a></li>
                      <li><a href="cash-flow.html">Cash Flow</a></li>
                      <li><a href="account-statement.html">Account Statement</a></li>
                    </ul>
                  </li>
                  <li class="submenu submenu-two">
                    <a href="#">User Reports<span class="menu-arrow"></span></a>
                    <ul>
                      <li>
                        <a href="customers-report.html">Customers</a>
                      </li>
                      <li>
                        <a href="customer-due-report.html">Customer Due Report</a>
                      </li>
                      <li>
                        <a href="supplier-report.html">Supplier</a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li class="submenu">
                <a href="#">
                  <i class="isax isax-setting-25"></i><span>Settings</span>
                  <span class="menu-arrow"></span>
                </a>
                <ul>
                  <li class="submenu submenu-two">
                    <a href="#">General Settings<span class="menu-arrow"></span></a>
                    <ul>
                      <li><a href="account-settings.html">Account Settings</a></li>
                      <li><a href="plans-billings.html">Plans & Billing</a></li>
                      <li><a href="notifications-settings.html">Notifications</a></li>
                      <li><a href="integrations-settings.html">Integrations</a></li>
                    </ul>
                  </li>
                  <li class="submenu submenu-two">
                    <a href="#">Website Settings<span class="menu-arrow"></span></a>
                    <ul>
                      <li><a href="company-settings.html">Company Settings</a></li>
                      <li><a href="localization-settings.html">Localization</a></li>
                      <li><a href="preference-settings.html">Preference</a></li>
                      <li><a href="seo-setup.html">SEO Setup</a></li>
                      <li><a href="language-settings.html">Language</a></li>
                      <li><a href="maintenance-mode.html">Maintenance Mode</a></li>
                      <li><a href="authentication-settings.html">Authentication</a></li>
                      <li><a href="ai-configuration.html">AI Configuration</a></li>
                      <li><a href="appearance-settings.html">Appearance</a></li>
                      <li><a href="plugin-manager.html">Plugin Manager</a></li>
                    </ul>
                  </li>
                  <li class="submenu submenu-two">
                    <a href="#">App Settings<span class="menu-arrow"></span></a>
                    <ul>
                      <li><a href="invoice-settings.html">Invoice Settings</a></li>
                      <li><a href="invoice-templates-settings.html">Invoice Templates</a></li>
                      <li><a href="esignatures.html">eSignatures</a></li>
                      <li><a href="barcode-settings.html">Barcode</a></li>
                      <li><a href="thermal-printer.html">Thermal Printer</a></li>
                      <li><a href="custom-fields.html">Custom Fields</a></li>
                      <li><a href="sass-settings.html">SaaS Settings</a></li>
                    </ul>
                  </li>
                  <li class="submenu submenu-two">
                    <a href="#">System Settings<span class="menu-arrow"></span></a>
                    <ul>
                      <li><a href="email-settings.html">Email Settings</a></li>
                      <li><a href="email-templates.html">Email Templates</a></li>
                      <li><a href="sms-gateways.html">SMS Gateways</a></li>
                      <li><a href="gdpr-cookies.html">GDPR Cookies</a></li>
                    </ul>
                  </li>
                  <li class="submenu submenu-two">
                    <a href="#">Finance Settings<span class="menu-arrow"></span></a>
                    <ul>
                      <li>
                        <a href="payment-methods.html">Payment Methods</a>
                      </li>
                      <li>
                        <a href="bank-accounts.html">Bank Accounts</a>
                      </li>
                      <li>
                        <a href="tax-rates.html">Tax Rates</a>
                      </li>
                      <li>
                        <a href="currencies.html">Currencies</a>
                      </li>
                    </ul>
                  </li>
                  <li class="submenu submenu-two">
                    <a href="#">Other Settings<span class="menu-arrow"></span></a>
                    <ul>
                      <li>
                        <a href="custom-css.html">Custom CSS</a>
                      </li>
                      <li>
                        <a href="custom-js.html">Custom JS</a>
                      </li>
                      <li>
                        <a href="clear-cache.html">Clear Cache</a>
                      </li>
                      <li>
                        <a href="sitemap.html">Sitemap</a>
                      </li>
                      <li>
                        <a href="storage.html">Storage</a>
                      </li>
                      <li>
                        <a href="cronjob.html">Cronjob</a>
                      </li>
                      <li>
                        <a href="system-backup.html">System Backup</a>
                      </li>
                      <li>
                        <a href="database-backup.html">Database Backup</a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li class="menu-title"><span>Layout</span></li>
          <li>
            <ul>
              <li>
                <a href="layout-default.html">
                  <i class="isax isax-row-horizontal5"></i><span>Default</span>
                </a>
              </li>
              <li>
                <a href="layout-single.html">
                  <i class="isax isax-grid-95"></i><span>Single</span>
                </a>
              </li>
              <li>
                <a href="layout-mini.html">
                  <i class="isax isax-grid-45"></i><span>Mini</span>
                </a>
              </li>
              <li>
                <a href="layout-transparent.html">
                  <i class="isax isax-grid-25"></i><span>Transparent</span>
                </a>
              </li>
              <li>
                <a href="layout-without-header.html">
                  <i class="isax isax-slider-vertical-15"></i><span>Without Header</span>
                </a>
              </li>
              <li>
                <a href="layout-rtl.html">
                  <i class="isax isax-sidebar-left5"></i><span>RTL</span>
                </a>
              </li>
              <li>
                <a href="layout-dark.html">
                  <i class="isax isax-moon5"></i><span>Dark</span>
                </a>
              </li>
            </ul>
          </li>
          <li class="menu-title"><span>Content</span></li>
          <li>
            <ul>
              <li>
                <a href="pages.html">
                  <i class="isax isax-document-15"></i><span>Pages</span>
                </a>
              </li>
              <li class="submenu">
                <a href="#">
                  <i class="isax isax-book5"></i><span>Blogs</span>
                  <span class="menu-arrow"></span>
                </a>
                <ul>
                  <li><a href="blogs.html">All Blogs</a></li>
                  <li><a href="blog-categories.html">Categories</a></li>
                  <li><a href="blog-tags.html">Blog Tags</a></li>
                  <li><a href="blog-comments.html">Comments</a></li>
                </ul>
              </li>
              <li class="submenu">
                <a href="#">
                  <i class="isax isax-map5"></i><span>Locations</span>
                  <span class="menu-arrow"></span>
                </a>
                <ul>
                  <li><a href="countries.html">Countries</a></li>
                  <li><a href="states.html">States</a></li>
                  <li><a href="cities.html">Cities</a></li>
                </ul>
              </li>
              <li>
                <a href="testimonials.html">
                  <i class="isax isax-messages-15"></i><span>Testimonials</span>
                </a>
              </li>
              <li>
                <a href="faq.html">
                  <i class="isax isax-message-question5"></i><span>FAQ’S</span>
                </a>
              </li>
            </ul>
          </li>
          <li class="menu-title"><span>Pages</span></li>
          <li>
            <ul>
              <li>
                <a href="profile.html">
                  <i class="isax isax-profile-tick5"></i><span>Profile</span>
                </a>
              </li>
              <li>
                <a href="starter.html">
                  <i class="isax isax-document-favorite5"></i><span>Starter Page</span>
                </a>
              </li>
              <li>
                <a href="gallery.html">
                  <i class="isax isax-image5"></i><span>Gallery</span>
                </a>
              </li>
              <li>
                <a href="pricing.html">
                  <i class="isax isax-money-45"></i><span>Pricing</span>
                </a>
              </li>
              <li>
                <a href="timeline.html">
                  <i class="isax isax-timer-pause5"></i><span>Timeline</span>
                </a>
              </li>
              <li>
                <a href="coming-soon.html">
                  <i class="isax isax-security-time5"></i><span>Coming Soon</span>
                </a>
              </li>
              <li>
                <a href="under-maintenance.html">
                  <i class="isax isax-paintbucket5"></i><span>Under Maintenance</span>
                </a>
              </li>
              <li>
                <a href="under-construction.html">
                  <i class="isax isax-forward-item5"></i><span>Under Construction</span>
                </a>
              </li>
              <li class="submenu">
                <a href="#">
                  <i class="isax isax-device-message5"></i><span>Error Pages</span><span class="menu-arrow"></span>
                </a>
                <ul>
                  <li><a href="error-404.html">Error 404</a></li>
                  <li><a href="error-500.html">Error 500</a></li>
                </ul>
              </li>
              <li>
                <a href="api-keys.html">
                  <i class="isax isax-key-square5"></i><span>API Keys</span>
                </a>
              </li>
              <li>
                <a href="privacy-policy.html">
                  <i class="isax isax-document-copy5"></i><span>Privacy Policy</span>
                </a>
              </li>
              <li>
                <a href="terms-condition.html">
                  <i class="isax isax-note-15"></i><span>Terms & Conditions</span>
                </a>
              </li>
            </ul>
          </li>
          <li class="menu-title"><span>Authentication</span></li>
          <li>
            <ul>
              <li>
                <a href="login.html">
                  <i class="isax isax-login-15"></i><span>Login</span>
                </a>
              </li>
              <li>
                <a href="register.html">
                  <i class="isax isax-lock-15"></i><span>Register</span>
                </a>
              </li>
              <li>
                <a href="forgot-password.html">
                  <i class="isax isax-password-check5"></i><span>Forgot Password</span>
                </a>
              </li>
              <li>
                <a href="reset-password.html">
                  <i class="isax isax-refresh-right-square5"></i><span>Reset Password</span>
                </a>
              </li>
              <li>
                <a href="email-verification.html">
                  <i class="isax isax-sms-tracking5"></i><span>Email Verification</span>
                </a>
              </li>
              <li>
                <a href="two-step-verification.html">
                  <i class="isax isax-security5"></i><span>2 Step Verification</span>
                </a>
              </li>
              <li>
                <a href="lock-screen.html">
                  <i class="isax isax-lock-circle5"></i><span>Lock Screen</span>
                </a>
              </li>
            </ul>
          </li>
          <li class="menu-title"><span>UI Interface</span></li>
          <li>
            <ul>
              <li class="submenu">
                <a href="#">
                  <i class="isax isax-designtools5"></i><span>Base UI</span><span class="menu-arrow"></span>
                </a>
                <ul>
                  <li><a href="ui-accordion.html">Accordion</a></li>
                  <li><a href="ui-alerts.html">Alerts</a></li>
                  <li><a href="ui-avatar.html">Avatar</a></li>
                  <li><a href="ui-badges.html">Badges</a></li>
                  <li><a href="ui-breadcrumb.html">Breadcrumb</a></li>
                  <li><a href="ui-buttons.html">Buttons</a></li>
                  <li><a href="ui-buttons-group.html">Button Group</a></li>
                  <li><a href="ui-cards.html">Card</a></li>
                  <li><a href="ui-carousel.html">Carousel</a></li>
                  <li><a href="ui-collapse.html">Collapse</a></li>
                  <li><a href="ui-dropdowns.html">Dropdowns</a></li>
                  <li><a href="ui-ratio.html">Ratio</a></li>
                  <li><a href="ui-grid.html">Grid</a></li>
                  <li><a href="ui-images.html">Images</a></li>
                  <li><a href="ui-links.html">Links</a></li>
                  <li><a href="ui-list-group.html">List Group</a></li>
                  <li><a href="ui-modals.html">Modals</a></li>
                  <li><a href="ui-offcanvas.html">Offcanvas</a></li>
                  <li><a href="ui-pagination.html">Pagination</a></li>
                  <li><a href="ui-placeholders.html">Placeholders</a></li>
                  <li><a href="ui-popovers.html">Popovers</a></li>
                  <li><a href="ui-progress.html">Progress</a></li>
                  <li><a href="ui-scrollspy.html">Scrollspy</a></li>
                  <li><a href="ui-spinner.html">Spinner</a></li>
                  <li><a href="ui-nav-tabs.html">Tabs</a></li>
                  <li><a href="ui-toasts.html">Toasts</a></li>
                  <li><a href="ui-tooltips.html">Tooltips</a></li>
                  <li><a href="ui-typography.html">Typography</a></li>
                  <li><a href="ui-utilities.html">Utilities</a></li>
                </ul>
              </li>
              <li class="submenu">
                <a href="#">
                  <i class="isax isax-pen-tool5"></i><span>Advanced UI</span><span class="menu-arrow"></span>
                </a>
                <ul>
                  <li><a href="extended-dragula.html">Dragula</a></li>
                  <li><a href="ui-clipboard.html">Clipboard</a></li>
                  <li><a href="ui-rangeslider.html">Range Slider</a></li>
                  <li><a href="ui-sweetalerts.html">Sweet Alerts</a></li>
                  <li><a href="ui-lightbox.html">Lightbox</a></li>
                  <li><a href="ui-rating.html">Rating</a></li>
                  <li><a href="ui-counter.html">Counter</a></li>
                  <li><a href="ui-scrollbar.html">Scrollbar</a></li>
                </ul>
              </li>
              <li class="submenu">
                <a href="#">
                  <i class="isax isax-password-check5"></i><span>Forms</span><span class="menu-arrow"></span>
                </a>
                <ul>
                  <li class="submenu submenu-two">
                    <a href="#">Form Elements<span class="menu-arrow inside-submenu"></span></a>
                    <ul>
                      <li><a href="form-basic-inputs.html">Basic Inputs</a></li>
                      <li><a href="form-checkbox-radios.html">Checkbox & Radios</a></li>
                      <li><a href="form-input-groups.html">Input Groups</a></li>
                      <li><a href="form-grid-gutters.html">Grid & Gutters</a></li>
                      <li><a href="form-mask.html">Input Masks</a></li>
                      <li><a href="form-fileupload.html">File Uploads</a></li>
                    </ul>
                  </li>
                  <li class="submenu submenu-two">
                    <a href="#">Layouts<span class="menu-arrow inside-submenu"></span></a>
                    <ul>
                      <li><a href="form-horizontal.html">Horizontal Form</a></li>
                      <li><a href="form-vertical.html">Vertical Form</a></li>
                      <li><a href="form-floating-labels.html">Floating Labels</a></li>
                    </ul>
                  </li>
                  <li><a href="form-validation.html">Form Validation</a></li>
                  <li><a href="form-select2.html">Select2</a></li>
                  <li><a href="form-wizard.html">Form Wizard</a></li>
                  <li><a href="form-pickers.html">Form Picker</a></li>
                </ul>
              </li>
              <li class="submenu">
                <a href="#">
                  <i class="isax isax-grid-75"></i><span>Tables</span><span class="menu-arrow"></span>
                </a>
                <ul>
                  <li><a href="tables-basic.html">Basic Tables </a></li>
                  <li><a href="data-tables.html">Data Table </a></li>
                </ul>
              </li>
              <li class="submenu">
                <a href="#">
                  <i class="isax isax-designtools5"></i>
                  <span>Charts</span><span class="menu-arrow"></span>
                </a>
                <ul>
                  <li><a href="chart-apex.html">Apex Charts</a></li>
                  <li><a href="chart-c3.html">Chart C3</a></li>
                  <li><a href="chart-js.html">Chart Js</a></li>
                  <li><a href="chart-morris.html">Morris Charts</a></li>
                  <li><a href="chart-flot.html">Flot Charts</a></li>
                  <li><a href="chart-peity.html">Peity Charts</a></li>
                </ul>
              </li>
              <li class="submenu">
                <a href="#">
                  <i class="isax isax-shapes-15"></i>
                  <span>Icons</span><span class="menu-arrow"></span>
                </a>
                <ul>
                  <li><a href="icon-fontawesome.html">Fontawesome Icons</a></li>
                  <li><a href="icon-tabler.html">Tabler Icons</a></li>
                  <li><a href="icon-bootstrap.html">Bootstrap Icons</a></li>
                  <li><a href="icon-remix.html">Remix Icons</a></li>
                  <li><a href="icon-feather.html">Feather Icons</a></li>
                  <li><a href="icon-ionic.html">Ionic Icons</a></li>
                  <li><a href="icon-material.html">Material Icons</a></li>
                  <li><a href="icon-pe7.html">Pe7 Icons</a></li>
                  <li><a href="icon-simpleline.html">Simpleline Icons</a></li>
                  <li><a href="icon-themify.html">Themify Icons</a></li>
                  <li><a href="icon-weather.html">Weather Icons</a></li>
                  <li><a href="icon-typicon.html">Typicon Icons</a></li>
                  <li><a href="icon-flag.html">Flag Icons</a></li>
                </ul>
              </li>
              <li class="submenu">
                <a href="#">
                  <i class="isax isax-map-15"></i>
                  <span>Maps</span>
                  <span class="menu-arrow"></span>
                </a>
                <ul>
                  <li>
                    <a href="maps-vector.html">Vector</a>
                  </li>
                  <li>
                    <a href="maps-leaflet.html">Leaflet</a>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li class="menu-title"><span>Help</span></li>
          <li>
            <ul>
              <li>
                <a href="#"><i class="isax isax-document-code-25"></i><span>Documentation</span></a>
              </li>
              <li>
                <a href="#"><i class="isax isax-programming-arrows5"></i><span>Changelog</span><span class="badge bg-primary ms-2 badge-sm text-white fs-12 fw-medium">v2.0.7</span></a>
              </li>
              <li class="submenu">
                <a href="#">
                  <i class="isax isax-layer5"></i><span>Multi Level</span>
                  <span class="menu-arrow"></span>
                </a>
                <ul>
                  <li><a href="#">Multilevel 1</a></li>
                  <li class="submenu submenu-two">
                    <a href="#">Multilevel 2<span
                      class="menu-arrow inside-submenu"></span></a>
                    <ul>
                      <li><a href="#">Multilevel 2.1</a></li>
                      <li class="submenu submenu-two submenu-three">
                        <a href="#">Multilevel 2.2<span
                          class="menu-arrow inside-submenu inside-submenu-two"></span></a>
                        <ul>
                          <li><a href="#">Multilevel 2.2.1</a></li>
                          <li><a href="#">Multilevel 2.2.2</a></li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                  <li><a href="#">Multilevel 3</a></li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
        <div class="sidebar-footer">
          <div class="trial-item bg-white text-center border">
            <div class="bg-light p-3 text-center">
              <img src="assets/img/icons/upgrade.svg" alt="img" />
            </div>
            <div class="p-2">
              <h6 class="fs-14 fw-semibold mb-1">Upgrade to More</h6>
              <p class="fs-13 mb-2">Subscribe to get more with Premium Features</p>
              <a href="plans-billings.html" class="btn btn-sm btn-primary w-100 d-flex align-items-center justify-content-center"><i class="isax isax-crown5 me-1"></i>Upgrade</a>
            </div>
            <a href="#" class="close-icon"><i class="fa-solid fa-x"></i></a>
          </div>
          <ul class="menu-list">
            <li>
              <a href="account-settings.html" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Settings"><i class="isax isax-setting-25"></i></a>
            </li>
            <li>
              <a href="#" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Documentation"><i class="isax isax-document-normal4"></i></a>
            </li>
            <li>
              <a href="#" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Changelog"><i class="isax isax-cloud-change5"></i></a>
            </li>
            <li>
              <a href="login.html" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Login"><i class="isax isax-login-15"></i></a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>);
};
export default Sidebar;