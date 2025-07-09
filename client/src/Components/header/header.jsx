// import React from 'react';
// // import './header.css';

// const Header = () => {
//     return (
//                 <div className="header">
//             <div className="main-header">

//                 {/* <!-- Logo --> */}
//                 <div className="header-left">
//                     <a href="index.html" className="logo">
// 						<img src="assets/img/logo.svg" alt="Logo"/>
// 					</a>
//                     <a href="index.html" className="dark-logo">
// 						<img src="assets/img/logo-white.svg" alt="Logo"/>
// 					</a>
//                 </div>

//                 {/* <!-- Sidebar Menu Toggle Button --> */}
//                 <a id="mobile_btn" className="mobile_btn" href="#sidebar">
// 					<span className="bar-icon">
// 						<span></span>
// 						<span></span>
// 						<span></span>
// 					</span>
// 				</a>

//                 <div className="header-user">
//                     <div className="nav user-menu nav-list">
//                         <div className="me-auto d-flex align-items-center" id="header-search"></div>

//                         <div className="d-flex align-items-center">
//                             <div className="notification_item me-2">
//                                 <a href="#" className="btn btn-menubar position-relative" id="notification_popup" data-bs-toggle="dropdown" data-bs-auto-close="outside">
// 									<i className="isax isax-notification-bing5"></i>
// 									<span className="position-absolute badge bg-success border border-white"></span>
// 								</a>
//                                 <div className="dropdown-menu p-0 dropdown-menu-end dropdown-menu-lg" style={{minHeight: "300px"}}>

//                                     <div className="p-2 border-bottom">
//                                         <div className="row align-items-center">
//                                             <div className="col">
//                                                 <h6 className="m-0 fs-16 fw-semibold"> Notifications</h6>
//                                             </div>
//                                             <div className="col-auto">
//                                                 <div className="dropdown">
//                                                     <a href="#" className="dropdown-toggle drop-arrow-none link-dark" data-bs-toggle="dropdown" data-bs-offset="0,15" aria-expanded="false">
// 														<i className="isax isax-setting-2 fs-16 text-body align-middle"></i>
// 													</a>
//                                                     <div className="dropdown-menu dropdown-menu-end">
//                                                         {/* <!-- item--> */}
//                                                         <a href="#" className="dropdown-item"><i className="ti ti-bell-check me-1"></i>Mark as Read</a>
//                                                         {/* <!-- item--> */}
//                                                         <a href="#" className="dropdown-item"><i className="ti ti-trash me-1"></i>Delete All</a>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>

//                                     {/* <!-- Notification Dropdown --> */}
//                                     <div className="notification-body position-relative z-2 rounded-0" data-simplebar>

//                                         {/* <!-- Item--> */}
//                                         <div className="dropdown-item notification-item py-2 text-wrap border-bottom" id="notification-1">
//                                             <div className="d-flex">
//                                                 <div className="me-2 position-relative flex-shrink-0">
//                                                     <img src="assets/img/profiles/avatar-05.jpg" className="avatar-md rounded-circle" alt="User Img"/>
//                                                 </div>
//                                                 <div className="flex-grow-1">
//                                                     <p className="mb-0 fw-semibold text-dark">John Smith</p>
//                                                     <p className="mb-1 text-wrap fs-14">
//                                                         A <span className="fw-semibold">new sale</span> has been recorded.
//                                                     </p>
//                                                     <div className="d-flex justify-content-between align-items-center">
//                                                         <span className="fs-12"><i className="isax isax-clock me-1"></i>4 min ago</span>
//                                                         <div className="notification-action d-flex align-items-center float-end gap-2">
//                                                             <a href="#" className="notification-read rounded-circle bg-info" data-bs-toggle="tooltip" title="" data-bs-original-title="Make as Read" aria-label="Make as Read"></a>
//                                                             <button className="btn rounded-circle text-danger p-0" data-dismissible="#notification-1">
// 																<i className="isax isax-close-circle fs-12"></i>
// 															</button>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>

//                                         {/* <!-- Item--> */}
//                                         <div className="dropdown-item notification-item py-2 text-wrap border-bottom" id="notification-2">
//                                             <div className="d-flex">
//                                                 <div className="flex-shrink-0">
//                                                     <div className="avatar-sm me-2">
//                                                         <span className="avatar-title bg-soft-info text-info fs-18 rounded-circle">
// 															  D
// 														 </span>
//                                                     </div>
//                                                 </div>
//                                                 <div className="flex-grow-1">
//                                                     <p className="mb-0 fw-semibold text-dark">Donoghue Susan</p>
//                                                     <p className="mb-0 text-wrap fs-14">
//                                                         Switched to a lower-tier package
//                                                     </p>
//                                                     <div className="d-flex justify-content-between align-items-center">
//                                                         <span className="fs-12"><i className="isax isax-clock me-1"></i>4 min ago</span>
//                                                         <div className="notification-action d-flex align-items-center float-end gap-2">
//                                                             <a href="#" className="notification-read rounded-circle bg-info" data-bs-toggle="tooltip" title="" data-bs-original-title="Make as Read" aria-label="Make as Read"></a>
//                                                             <button className="btn rounded-circle text-danger p-0" data-dismissible="#notification-2">
// 																<i className="isax isax-close-circle fs-12"></i>
// 															</button>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>

//                                         {/* <!-- Item--> */}
//                                         <div className="dropdown-item notification-item py-2 text-wrap border-bottom" id="notification-3">
//                                             <div className="d-flex">
//                                                 <div className="me-2 position-relative flex-shrink-0">
//                                                     <img src="assets/img/profiles/avatar-03.jpg" className="avatar-md rounded-circle" alt="User Img"/>
//                                                 </div>
//                                                 <div className="flex-grow-1">
//                                                     <p className="mb-0 fw-semibold text-dark">Robert Fox </p>
//                                                     <p className="mb-1 text-wrap fs-14">
//                                                         Completed payment for <span className="fw-semibold">#INV00025</span>
//                                                     </p>
//                                                     <div className="d-flex justify-content-between align-items-center">
//                                                         <span className="fs-12"><i className="isax isax-clock me-1"></i>4 min ago</span>
//                                                         <div className="notification-action d-flex align-items-center float-end gap-2">
//                                                             <a href="#" className="notification-read rounded-circle bg-info" data-bs-toggle="tooltip" title="" data-bs-original-title="Make as Read" aria-label="Make as Read"></a>
//                                                             <button className="btn rounded-circle text-danger p-0" data-dismissible="#notification-3">
// 																<i className="isax isax-close-circle fs-12"></i>
// 															</button>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>

//                                         {/* <!-- Item--> */}
//                                         <div className="dropdown-item notification-item py-2 text-wrap border-bottom" id="notification-4">
//                                             <div className="d-flex">
//                                                 <div className="flex-shrink-0">
//                                                     <div className="avatar-sm me-2">
//                                                         <span className="avatar-title bg-soft-warning text-warning fs-18 rounded-circle">
// 															<i className="isax isax-message"></i>
// 														</span>
//                                                     </div>
//                                                 </div>
//                                                 <div className="flex-grow-1">
//                                                     <p className="mb-0 text-wrap fs-14">You have received <span className="fw-semibold">20</span> new messages in the conversation</p>
//                                                     <div className="d-flex justify-content-between align-items-center">
//                                                         <span className="fs-12"><i className="isax isax-clock me-1"></i>3 min ago</span>
//                                                         <div className="notification-action d-flex align-items-center float-end gap-2">
//                                                             <a href="#" className="notification-read rounded-circle bg-info" data-bs-toggle="tooltip" title="" data-bs-original-title="Make as Read" aria-label="Make as Read"></a>
//                                                             <button className="btn rounded-circle text-danger p-0" data-dismissible="#notification-4">
// 																<i className="isax isax-close-circle fs-12"></i>
// 															</button>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>

//                                         {/* <!-- Item--> */}
//                                         <div className="dropdown-item notification-item py-2 text-wrap border-bottom" id="notification-5">
//                                             <div className="d-flex">
//                                                 <div className="me-2 position-relative flex-shrink-0">
//                                                     <img src="assets/img/profiles/avatar-17.jpg" className="avatar-md rounded-circle" alt="User Img"/>
//                                                 </div>
//                                                 <div className="flex-grow-1">
//                                                     <p className="mb-0 fw-semibold text-dark">Charlotte Brown</p>
//                                                     <p className="mb-1 text-wrap fs-14">
//                                                         New invoice generated <span className="fw-semibold"> #INV00028</span>
//                                                     </p>
//                                                     <div className="mb-1">
//                                                         <a className="badge bg-success p-2 py-1 me-1" href="#">Approve</a>
//                                                         <a className="badge bg-danger p-2 py-1" href="#">Deny</a>
//                                                     </div>
//                                                     <div className="d-flex justify-content-between align-items-center">
//                                                         <span className="fs-12"><i className="isax isax-clock me-1"></i>45 min ago</span>
//                                                         <div className="notification-action d-flex align-items-center float-end gap-2">
//                                                             <a href="#" className="notification-read rounded-circle bg-info" data-bs-toggle="tooltip" title="" data-bs-original-title="Make as Read" aria-label="Make as Read"></a>
//                                                             <button className="btn rounded-circle text-danger p-0" data-dismissible="#notification-5">
// 																<i className="isax isax-close-circle fs-12"></i>
// 															</button>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>

//                                     </div>

//                                     {/* <!-- View All--> */}
//                                     <div className="p-2 rounded-bottom border-top text-center">
//                                         <a href="notifications.html" className="text-center fw-medium fs-14 mb-0">
// 											View All
// 										</a>
//                                     </div>

//                                 </div>
//                             </div>

//                             {/* <!-- Light/Dark Mode Button --> */}
//                             <div className="me-2 theme-item">
//                                 <a href="#" id="dark-mode-toggle" className="theme-toggle btn btn-menubar">
//                                     <i className="isax isax-moon"></i>
//                                 </a>
//                                 <a href="#" id="light-mode-toggle" className="theme-toggle btn btn-menubar">
//                                     <i className="isax isax-sun-1"></i>
//                                 </a>
//                             </div>

//                             {/* <!-- User Dropdown --> */}
//                             <div className="dropdown profile-dropdown">
//                                 <a href="#" className="dropdown-toggle d-flex align-items-center" data-bs-toggle="dropdown" data-bs-auto-close="outside">
// 									<span className="avatar online">
// 										<img src="assets/img/profiles/avatar-01.jpg" alt="Img" className="img-fluid rounded-circle"/>
// 									</span>
// 								</a>
//                                 <div className="dropdown-menu p-2">
//                                     <div className="d-flex align-items-center bg-light rounded-1 p-2 mb-2">
//                                         <span className="avatar avatar-lg me-2">
// 											<img src="assets/img/profiles/avatar-01.jpg" alt="img" className="rounded-circle" />
// 										</span>
//                                         <div>
//                                             <h6 className="fs-14 fw-medium mb-1">Jafna Cremson</h6>
//                                             <p className="fs-13">Administrator</p>
//                                         </div>
//                                     </div>

//                                     {/* <!-- Item--> */}
//                                     <a className="dropdown-item d-flex align-items-center" href="account-settings.html">
// 										<i className="isax isax-profile-circle me-2"></i>Profile Settings
// 									</a>

//                                     {/* <!-- Item--> */}
//                                     <a className="dropdown-item d-flex align-items-center" href="inventory-report.html">
// 										<i className="isax isax-document-text me-2"></i>Reports
// 									</a>

//                                     {/* <!-- Item--> */}
//                                     <div className="form-check form-switch form-check-reverse d-flex align-items-center justify-content-between dropdown-item mb-0">
//                                         <label className="form-check-label" htmlFor="notify"><i className="isax isax-notification me-2"></i>Notifications</label>
//                                         <input className="form-check-input" type="checkbox" role="switch" id="notify"/>
//                                     </div>

//                                     <hr className="dropdown-divider my-2"/>

//                                     {/* <!-- Item--> */}
//                                     <a className="dropdown-item logout d-flex align-items-center" href="login.html">
// 										<i className="isax isax-logout me-2"></i>Sign Out
// 									</a>
//                                 </div>
//                             </div>

//                         </div>
//                     </div>
//                 </div>

//                 {/* <!-- Mobile Menu --> */}
//                 <div className="dropdown mobile-user-menu profile-dropdown">
//                     <a href="#" className="dropdown-toggle d-flex align-items-center" data-bs-toggle="dropdown" data-bs-auto-close="outside">
// 						<span className="avatar avatar-md online">
// 							<img src="assets/img/profiles/avatar-01.jpg" alt="Img" className="img-fluid rounded-circle"/>
// 						</span>
// 					</a>
//                     <div className="dropdown-menu p-2 mt-0">
//                         <a className="dropdown-item d-flex align-items-center" href="profile.html">
// 							<i className="isax isax-profile-circle me-2"></i>Profile Settings
// 						</a>
//                         <a className="dropdown-item d-flex align-items-center" href="reports.html">
// 							<i className="isax isax-document-text me-2"></i>Reports
// 						</a>
//                         <a className="dropdown-item d-flex align-items-center" href="account-settings.html">
// 							<i className="isax isax-setting me-2"></i>Settings
// 						</a>
//                         <a className="dropdown-item logout d-flex align-items-center" href="login.html">
// 							<i className="isax isax-logout me-2"></i>Signout
// 						</a>
//                     </div>
//                 </div>
//                 {/* <!-- /Mobile Menu --> */}

//             </div>
//         </div>
//     );
// };

//export default Header;
// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const Header = () => {
//     const navigate = useNavigate();

//     const handleLogout = () => {
//         // Clear user data from localStorage
//         localStorage.removeItem('user');
//         localStorage.removeItem('token'); // if you have token
        
//         // Navigate to login page
//         navigate('/login');
//     };

//     return (
//         <div className="header">
//             <div className="main-header">
//                 {/* Logo */}
//                 <div className="header-left">
//                     <a href="index.html" className="logo">
//                         <img src="assets/img/logo.svg" alt="Logo"/>
//                     </a>
//                     <a href="index.html" className="dark-logo">
//                         <img src="assets/img/logo-white.svg" alt="Logo"/>
//                     </a>
//                 </div>

//                 {/* Sidebar Menu Toggle Button */}
//                 <a id="mobile_btn" className="mobile_btn" href="#sidebar">
//                     <span className="bar-icon">
//                         <span></span>
//                         <span></span>
//                         <span></span>
//                     </span>
//                 </a>

//                 <div className="header-user">
//                     <div className="nav user-menu nav-list">
//                         <div className="me-auto d-flex align-items-center" id="header-search"></div>

//                         <div className="d-flex align-items-center">
//                             <div className="notification_item me-2">
//                                 <a href="#" className="btn btn-menubar position-relative" id="notification_popup" data-bs-toggle="dropdown" data-bs-auto-close="outside">
//                                     <i className="isax isax-notification-bing5"></i>
//                                     <span className="position-absolute badge bg-success border border-white"></span>
//                                 </a>
//                                 <div className="dropdown-menu p-0 dropdown-menu-end dropdown-menu-lg" style={{minHeight: "300px"}}>
//                                     <div className="p-2 border-bottom">
//                                         <div className="row align-items-center">
//                                             <div className="col">
//                                                 <h6 className="m-0 fs-16 fw-semibold"> Notifications</h6>
//                                             </div>
//                                             <div className="col-auto">
//                                                 <div className="dropdown">
//                                                     <a href="#" className="dropdown-toggle drop-arrow-none link-dark" data-bs-toggle="dropdown" data-bs-offset="0,15" aria-expanded="false">
//                                                         <i className="isax isax-setting-2 fs-16 text-body align-middle"></i>
//                                                     </a>
//                                                     <div className="dropdown-menu dropdown-menu-end">
//                                                         <a href="#" className="dropdown-item"><i className="ti ti-bell-check me-1"></i>Mark as Read</a>
//                                                         <a href="#" className="dropdown-item"><i className="ti ti-trash me-1"></i>Delete All</a>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>

//                                     {/* Notification Dropdown */}
//                                     <div className="notification-body position-relative z-2 rounded-0" data-simplebar>
//                                         {/* Notification items - keeping your existing code */}
//                                         <div className="dropdown-item notification-item py-2 text-wrap border-bottom" id="notification-1">
//                                             <div className="d-flex">
//                                                 <div className="me-2 position-relative flex-shrink-0">
//                                                     <img src="assets/img/profiles/avatar-05.jpg" className="avatar-md rounded-circle" alt="User Img"/>
//                                                 </div>
//                                                 <div className="flex-grow-1">
//                                                     <p className="mb-0 fw-semibold text-dark">John Smith</p>
//                                                     <p className="mb-1 text-wrap fs-14">
//                                                         A <span className="fw-semibold">new sale</span> has been recorded.
//                                                     </p>
//                                                     <div className="d-flex justify-content-between align-items-center">
//                                                         <span className="fs-12"><i className="isax isax-clock me-1"></i>4 min ago</span>
//                                                         <div className="notification-action d-flex align-items-center float-end gap-2">
//                                                             <a href="#" className="notification-read rounded-circle bg-info" data-bs-toggle="tooltip" title="" data-bs-original-title="Make as Read" aria-label="Make as Read"></a>
//                                                             <button className="btn rounded-circle text-danger p-0" data-dismissible="#notification-1">
//                                                                 <i className="isax isax-close-circle fs-12"></i>
//                                                             </button>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                         {/* Add other notification items here */}
//                                     </div>

//                                     {/* View All */}
//                                     <div className="p-2 rounded-bottom border-top text-center">
//                                         <a href="notifications.html" className="text-center fw-medium fs-14 mb-0">
//                                             View All
//                                         </a>
//                                     </div>
//                                 </div>
//                             </div>

//                             {/* Light/Dark Mode Button */}
//                             <div className="me-2 theme-item">
//                                 <a href="#" id="dark-mode-toggle" className="theme-toggle btn btn-menubar">
//                                     <i className="isax isax-moon"></i>
//                                 </a>
//                                 <a href="#" id="light-mode-toggle" className="theme-toggle btn btn-menubar">
//                                     <i className="isax isax-sun-1"></i>
//                                 </a>
//                             </div>

//                             {/* User Dropdown */}
//                             <div className="dropdown profile-dropdown">
//                                 <a href="#" className="dropdown-toggle d-flex align-items-center" data-bs-toggle="dropdown" data-bs-auto-close="outside">
//                                     <span className="avatar online">
//                                         <img src="assets/img/profiles/avatar-01.jpg" alt="Img" className="img-fluid rounded-circle"/>
//                                     </span>
//                                 </a>
//                                 <div className="dropdown-menu p-2">
//                                     <div className="d-flex align-items-center bg-light rounded-1 p-2 mb-2">
//                                         <span className="avatar avatar-lg me-2">
//                                             <img src="assets/img/profiles/avatar-01.jpg" alt="img" className="rounded-circle" />
//                                         </span>
//                                         <div>
//                                             <h6 className="fs-14 fw-medium mb-1">Jafna Cremson</h6>
//                                             <p className="fs-13">Administrator</p>
//                                         </div>
//                                     </div>

//                                     {/* Item */}
//                                     <a className="dropdown-item d-flex align-items-center" href="account-settings.html">
//                                         <i className="isax isax-profile-circle me-2"></i>Profile Settings
//                                     </a>

//                                     {/* Item */}
//                                     <a className="dropdown-item d-flex align-items-center" href="inventory-report.html">
//                                         <i className="isax isax-document-text me-2"></i>Reports
//                                     </a>

//                                     {/* Item */}
//                                     <div className="form-check form-switch form-check-reverse d-flex align-items-center justify-content-between dropdown-item mb-0">
//                                         <label className="form-check-label" htmlFor="notify"><i className="isax isax-notification me-2"></i>Notifications</label>
//                                         <input className="form-check-input" type="checkbox" role="switch" id="notify"/>
//                                     </div>

//                                     <hr className="dropdown-divider my-2"/>

//                                     {/* Logout Item - Updated to use onClick handler */}
//                                     <button 
//                                         className="dropdown-item logout d-flex align-items-center" 
//                                         onClick={handleLogout}
//                                         style={{ border: 'none', background: 'none', width: '100%', textAlign: 'left' }}
//                                     >
//                                         <i className="isax isax-logout me-2"></i>Sign Out
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Mobile Menu */}
//                 <div className="dropdown mobile-user-menu profile-dropdown">
//                     <a href="#" className="dropdown-toggle d-flex align-items-center" data-bs-toggle="dropdown" data-bs-auto-close="outside">
//                         <span className="avatar avatar-md online">
//                             <img src="assets/img/profiles/avatar-01.jpg" alt="Img" className="img-fluid rounded-circle"/>
//                         </span>
//                     </a>
//                     <div className="dropdown-menu p-2 mt-0">
//                         <a className="dropdown-item d-flex align-items-center" href="profile.html">
//                             <i className="isax isax-profile-circle me-2"></i>Profile Settings
//                         </a>
//                         <a className="dropdown-item d-flex align-items-center" href="reports.html">
//                             <i className="isax isax-document-text me-2"></i>Reports
//                         </a>
//                         <a className="dropdown-item d-flex align-items-center" href="account-settings.html">
//                             <i className="isax isax-setting me-2"></i>Settings
//                         </a>
//                         <button 
//                             className="dropdown-item logout d-flex align-items-center" 
//                             onClick={handleLogout}
//                             style={{ border: 'none', background: 'none', width: '100%', textAlign: 'left' }}
//                         >
//                             <i className="isax isax-logout me-2"></i>Signout
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Header;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    const [showNotifications, setShowNotifications] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [showMobileProfile, setShowMobileProfile] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);

    const handleLogout = () => {
        // Clear user data from memory (not localStorage due to artifact restrictions)
        // In a real app, you would clear localStorage here
        console.log('Logging out...');
        
        // Navigate to login page
        navigate('/login');
    };

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    // Inline styles
    const headerStyles = {
        backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff',
        color: isDarkMode ? '#ffffff' : '#333333',
        padding: '12px 20px',
        borderBottom: `1px solid ${isDarkMode ? '#333' : '#e0e0e0'}`,
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        transition: 'all 0.3s ease',
        height: '70px'
    };

    const mainHeaderStyles = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    };

    const logoStyles = {
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none',
        color: isDarkMode ? '#ffffff' : '#333333',
        fontSize: '24px',
        fontWeight: 'bold'
    };

    const headerUserStyles = {
        display: 'flex',
        alignItems: 'center',
        gap: '15px'
    };

    const btnStyles = {
        padding: '8px 12px',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        backgroundColor: isDarkMode ? '#333' : '#f5f5f5',
        color: isDarkMode ? '#ffffff' : '#333333',
        transition: 'background-color 0.2s ease',
        position: 'relative'
    };

    const dropdownStyles = {
        position: 'absolute',
        top: '100%',
        right: 0,
        backgroundColor: isDarkMode ? '#2a2a2a' : '#ffffff',
        border: `1px solid ${isDarkMode ? '#444' : '#e0e0e0'}`,
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        minWidth: '280px',
        zIndex: 1001,
        marginTop: '5px'
    };

    const dropdownItemStyles = {
        display: 'flex',
        alignItems: 'center',
        padding: '12px 16px',
        textDecoration: 'none',
        color: isDarkMode ? '#ffffff' : '#333333',
        borderBottom: `1px solid ${isDarkMode ? '#444' : '#f0f0f0'}`,
        cursor: 'pointer',
        transition: 'background-color 0.2s ease'
    };

    const avatarStyles = {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        objectFit: 'cover',
        border: '2px solid #28a745'
    };

    const badgeStyles = {
        position: 'absolute',
        top: '-5px',
        right: '-5px',
        backgroundColor: '#28a745',
        color: 'white',
        borderRadius: '50%',
        width: '12px',
        height: '12px',
        fontSize: '8px'
    };

    const mobileMenuStyles = {
        display: 'none',
        '@media (max-width: 768px)': {
            display: 'flex'
        }
    };

    return (
        <div style={headerStyles}>
            <div style={mainHeaderStyles}>
                {/* Logo */}
                <div>
                    <a href="/" style={logoStyles}>
                        <span style={{ marginRight: '10px' }}>🏢</span>
                        Jyothi ERP
                    </a>
                </div>

                {/* Mobile Menu Toggle */}
                <button 
                    style={{ ...btnStyles, display: 'none' }}
                    className="mobile-toggle"
                >
                    <span>☰</span>
                </button>

                {/* Header User Section */}
                <div style={headerUserStyles}>
                    {/* Notifications */}
                    <div style={{ position: 'relative' }}>
                        <button 
                            style={btnStyles}
                            onClick={() => setShowNotifications(!showNotifications)}
                            onMouseEnter={(e) => e.target.style.backgroundColor = isDarkMode ? '#444' : '#e0e0e0'}
                            onMouseLeave={(e) => e.target.style.backgroundColor = isDarkMode ? '#333' : '#f5f5f5'}
                        >
                            🔔
                            <span style={badgeStyles}></span>
                        </button>
                        
                        {showNotifications && (
                            <div style={dropdownStyles}>
                                <div style={{ padding: '16px', borderBottom: `1px solid ${isDarkMode ? '#444' : '#e0e0e0'}` }}>
                                    <h6 style={{ margin: 0, fontSize: '16px', fontWeight: '600' }}>Notifications</h6>
                                </div>
                                <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                                    <div style={dropdownItemStyles}>
                                        <div style={{ marginRight: '12px' }}>
                                            <div style={{ ...avatarStyles, width: '32px', height: '32px' }}>👤</div>
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <p style={{ margin: 0, fontWeight: '600' }}>John Smith</p>
                                            <p style={{ margin: '4px 0', fontSize: '14px', color: isDarkMode ? '#ccc' : '#666' }}>
                                                A new sale has been recorded.
                                            </p>
                                            <span style={{ fontSize: '12px', color: isDarkMode ? '#999' : '#888' }}>
                                                🕐 4 min ago
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div style={{ padding: '12px', textAlign: 'center', borderTop: `1px solid ${isDarkMode ? '#444' : '#e0e0e0'}` }}>
                                    <a href="/notifications" style={{ color: '#007bff', textDecoration: 'none' }}>
                                        View All
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Dark/Light Mode Toggle */}
                    <button 
                        style={btnStyles}
                        onClick={toggleDarkMode}
                        onMouseEnter={(e) => e.target.style.backgroundColor = isDarkMode ? '#444' : '#e0e0e0'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = isDarkMode ? '#333' : '#f5f5f5'}
                    >
                        {isDarkMode ? '☀️' : '🌙'}
                    </button>

                    {/* Profile Dropdown */}
                    <div style={{ position: 'relative' }}>
                        <button 
                            style={{ ...btnStyles, padding: '4px' }}
                            onClick={() => setShowProfile(!showProfile)}
                        >
                            <span style={{ fontSize: '32px' }}>👤</span>
                        </button>
                        
                        {showProfile && (
                            <div style={dropdownStyles}>
                                <div style={{ padding: '16px', backgroundColor: isDarkMode ? '#333' : '#f8f9fa', borderRadius: '6px', margin: '8px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <span style={{ fontSize: '48px', marginRight: '12px' }}>👤</span>
                                        <div>
                                            <h6 style={{ margin: 0, fontSize: '14px', fontWeight: '600' }}>Jafna Cremson</h6>
                                            <p style={{ margin: 0, fontSize: '13px', color: isDarkMode ? '#ccc' : '#666' }}>Administrator</p>
                                        </div>
                                    </div>
                                </div>

                                <a 
                                    href="/profile" 
                                    style={dropdownItemStyles}
                                    onMouseEnter={(e) => e.target.style.backgroundColor = isDarkMode ? '#444' : '#f0f0f0'}
                                    onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                                >
                                    <span style={{ marginRight: '12px' }}>👤</span>
                                    Profile Settings
                                </a>

                                <a 
                                    href="/reports" 
                                    style={dropdownItemStyles}
                                    onMouseEnter={(e) => e.target.style.backgroundColor = isDarkMode ? '#444' : '#f0f0f0'}
                                    onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                                >
                                    <span style={{ marginRight: '12px' }}>📊</span>
                                    Reports
                                </a>

                                <div style={{ ...dropdownItemStyles, justifyContent: 'space-between' }}>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <span style={{ marginRight: '12px' }}>🔔</span>
                                        Notifications
                                    </div>
                                    <input type="checkbox" />
                                </div>

                                <hr style={{ margin: '8px 0', border: `1px solid ${isDarkMode ? '#444' : '#e0e0e0'}` }} />

                                <button 
                                    style={{ ...dropdownItemStyles, border: 'none', backgroundColor: 'transparent', width: '100%', textAlign: 'left' }}
                                    onClick={handleLogout}
                                    onMouseEnter={(e) => e.target.style.backgroundColor = isDarkMode ? '#444' : '#f0f0f0'}
                                    onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                                >
                                    <span style={{ marginRight: '12px' }}>🚪</span>
                                    Sign Out
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Mobile Profile Menu */}
                <div style={{ position: 'relative', display: 'none' }} className="mobile-profile">
                    <button 
                        style={{ ...btnStyles, padding: '4px' }}
                        onClick={() => setShowMobileProfile(!showMobileProfile)}
                    >
                        <span style={{ fontSize: '32px' }}>👤</span>
                    </button>
                    
                    {showMobileProfile && (
                        <div style={dropdownStyles}>
                            <a href="/profile" style={dropdownItemStyles}>
                                <span style={{ marginRight: '12px' }}>👤</span>
                                Profile Settings
                            </a>
                            <a href="/reports" style={dropdownItemStyles}>
                                <span style={{ marginRight: '12px' }}>📊</span>
                                Reports
                            </a>
                            <a href="/settings" style={dropdownItemStyles}>
                                <span style={{ marginRight: '12px' }}>⚙️</span>
                                Settings
                            </a>
                            <button 
                                style={{ ...dropdownItemStyles, border: 'none', backgroundColor: 'transparent', width: '100%', textAlign: 'left' }}
                                onClick={handleLogout}
                            >
                                <span style={{ marginRight: '12px' }}>🚪</span>
                                Sign Out
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile responsive styles */}
            <style jsx>{`
                @media (max-width: 768px) {
                    .mobile-toggle {
                        display: block !important;
                    }
                    .mobile-profile {
                        display: block !important;
                    }
                }
            `}</style>
        </div>
    );
};

export default Header;