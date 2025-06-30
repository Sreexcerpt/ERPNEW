// import React, { useState, useEffect } from 'react';

// function GoodsIssueForm() {
//   const [form, setForm] = useState({
//     date: '',
//     item: '',
//     quantity: '',
//     issuedTo: '',
//     category: '',
//     description: '',
//     remarks: ''
//   });

//   const [showModal, setShowModal] = useState(false);
//   const [goodsIssues, setGoodsIssues] = useState([]);

//   const handleOpenModal = () => setShowModal(true);
//   const handleCloseModal = () => {
//     setShowModal(false);
//     resetForm();
//   };

//   const resetForm = () => {
//     setForm({
//       date: '',
//       item: '',
//       quantity: '',
//       issuedTo: '',
//       category: '',
//       description: '',
//       remarks: ''
//     });
//   };

//   useEffect(() => {
//     if (form.category === 'display') {
//       setForm(prev => ({ ...prev, description: 'Display-' + generateRandomNumber() }));
//     } else if (form.category === 'cancel') {
//       setForm(prev => ({ ...prev, description: 'Cancel-' + generateRandomNumber() }));
//     } else if (form.category === 'goods-issue') {
//       setForm(prev => ({ ...prev, description: '' }));
//     }
//   }, [form.category]);

//   const generateRandomNumber = () => {
//     return Math.floor(100 + Math.random() * 900);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setGoodsIssues(prev => [...prev, form]);
//     handleCloseModal();
//     alert('Goods Issue Saved (dummy)');
//   };

//   return (
//     <div className="content">
//       <div className="d-flex d-block align-items-center justify-content-between flex-wrap gap-3 mb-3">
//         <div>
//           <h6>Goods Issue</h6>
//         </div>
//         <div>
//           <a onClick={handleOpenModal} className="btn btn-primary d-flex align-items-center">
//             <i className="isax isax-add-circle5 me-1"></i>Goods Issue
//           </a>
//         </div>
//       </div>

//       {showModal && (
//         <>
//           <div className="modal-backdrop fade show"></div>
//           <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" aria-modal="true" role="dialog">
//             <div className="modal-dialog modal-lg">
//               <div className="modal-content">
//                 <div className="modal-header">
//                   <h4 className="modal-title">Add Goods Issue</h4>
//                   <button type="button" className="btn-close" onClick={handleCloseModal} aria-label="Close"></button>
//                 </div>
//                 <div className="modal-body">
//                   <form onSubmit={handleSubmit}>
//                     <div className="row">
//                       <div className="col-md-4 mb-3">
//                         <label>Date</label>
//                         <input name="date" type="date" value={form.date} onChange={handleChange} className="form-control" required />
//                       </div>
//                       <div className="col-md-4 mb-3">
//                         <label>Item Name</label>
//                         <input name="item" type="text" value={form.item} onChange={handleChange} className="form-control" required />
//                       </div>
//                       <div className="col-md-4 mb-3">
//                         <label>Quantity</label>
//                         <input name="quantity" type="number" value={form.quantity} onChange={handleChange} className="form-control" required />
//                       </div>
//                       <div className="col-md-4 mb-3">
//                         <label>Issued To</label>
//                         <input name="issuedTo" type="text" value={form.issuedTo} onChange={handleChange} className="form-control" />
//                       </div>
//                       <div className="col-md-4 mb-3">
//                         <label>Category</label>
//                         <select name="category" value={form.category} onChange={handleChange} className="form-control" required>
//                           <option value="">-- Select Category --</option>
//                           <option value="goods-issue">Goods Issue</option>
//                           <option value="display">Display</option>
//                           <option value="cancel">Cancel</option>
//                         </select>
//                       </div>
//                       <div className="col-md-4 mb-3">
//                         <label>Description</label>
//                         <input
//                           name="description"
//                           type="text"
//                           value={form.description}
//                           onChange={handleChange}
//                           readOnly={form.category !== 'goods-issue'}
//                           className={`form-control ${form.category !== 'goods-issue' ? 'bg-light' : ''}`}
//                           required
//                         />
//                       </div>
//                       <div className="col-md-12 mb-3">
//                         <label>Remarks</label>
//                         <textarea name="remarks" value={form.remarks} onChange={handleChange} className="form-control" />
//                       </div>
//                     </div>
//                     <button type="submit" className="btn btn-success">Save</button>
//                   </form>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </>
//       )}

//       <div className="table-responsive">
//         <table className="table table-bordered mt-3">
//           <thead>
//             <tr>
//               <th>#</th>
//               <th>Date</th>
//               <th>Item</th>
//               <th>Qty</th>
//               <th>Issued To</th>
//               <th>Category</th>
//               <th>Description</th>
//               <th>Remarks</th>
//             </tr>
//           </thead>
//           <tbody>
//             {goodsIssues.length === 0 ? (
//               <tr>
//                 <td colSpan="8" className="text-center">No goods issued yet.</td>
//               </tr>
//             ) : (
//               goodsIssues.map((gi, index) => (
//                 <tr key={index}>
//                   <td>{index + 1}</td>
//                   <td>{gi.date}</td>
//                   <td>{gi.item}</td>
//                   <td>{gi.quantity}</td>
//                   <td>{gi.issuedTo}</td>
//                   <td>{gi.category}</td>
//                   <td>{gi.description}</td>
//                   <td>{gi.remarks}</td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default GoodsIssueForm;


// import React, { useState, useEffect } from 'react';

// function GoodsIssueForm() {
//   const [form, setForm] = useState({
//     date: '',
//     item: '',
//     quantity: '',
//     issuedTo: '',
//     category: '',
//     description: '',
//     remarks: ''
//   });

//   const [goodsIssues, setGoodsIssues] = useState([]);
//   const [showModal, setShowModal] = useState(false);

//   const resetForm = () => {
//     setForm({
//       date: '',
//       item: '',
//       quantity: '',
//       issuedTo: '',
//       category: '',
//       description: '',
//       remarks: ''
//     });
//   };

//   const handleOpenModal = () => setShowModal(true);
//   const handleCloseModal = () => {
//     setShowModal(false);
//     resetForm();
//   };

//   const generateRandomNumber = () => Math.floor(100 + Math.random() * 900);

//   useEffect(() => {
//     if (form.category === 'display') {
//       setForm(prev => ({ ...prev, description: 'Display-' + generateRandomNumber() }));
//     } else if (form.category === 'cancel') {
//       setForm(prev => ({ ...prev, description: 'Cancel-' + generateRandomNumber() }));
//     } else if (form.category === 'goods-issue') {
//       setForm(prev => ({ ...prev, description: '' }));
//     }
//   }, [form.category]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setGoodsIssues(prev => [...prev, form]);
//     handleCloseModal();
//     alert('Goods Issue Saved (dummy)');
//   };

//   return (
//     <div className="content">
//       <div className="d-flex align-items-center justify-content-between mb-4">
//         <h5 className="mb-0"><i className="fas fa-dolly me-2"></i>Goods Issue</h5>
//         <button className="btn btn-primary" onClick={handleOpenModal}>
//           <i className="fas fa-plus me-1"></i>Issue Goods
//         </button>
//       </div>

//       {/* Modal */}
//       {showModal && (
//         <>
//           <div className="modal-backdrop fade show"></div>
//           <div className="modal fade show" style={{ display: 'block' }}>
//             <div className="modal-dialog modal-lg">
//               <div className="modal-content">
//                 <div className="modal-header bg-primary text-white">
//                   <h5 className="modal-title"><i className="fas fa-boxes me-2"></i>Add Goods Issue</h5>
//                   <button type="button" className="btn-close btn-close-white" onClick={handleCloseModal}></button>
//                 </div>
//                 <div className="modal-body">
//                   <form onSubmit={handleSubmit}>
//                     <div className="row">
//                       <div className="col-md-4 mb-3">
//                         <label className="form-label fw-bold">Date</label>
//                         <input type="date" name="date" value={form.date} onChange={handleChange} className="form-control" required />
//                       </div>
//                       <div className="col-md-4 mb-3">
//                         <label className="form-label fw-bold">Item Name</label>
//                         <input type="text" name="item" value={form.item} onChange={handleChange} className="form-control" required />
//                       </div>
//                       <div className="col-md-4 mb-3">
//                         <label className="form-label fw-bold">Quantity</label>
//                         <input type="number" name="quantity" value={form.quantity} onChange={handleChange} className="form-control" required />
//                       </div>
//                       <div className="col-md-4 mb-3">
//                         <label className="form-label fw-bold">Issued To</label>
//                         <input type="text" name="issuedTo" value={form.issuedTo} onChange={handleChange} className="form-control" />
//                       </div>
//                       <div className="col-md-4 mb-3">
//                         <label className="form-label fw-bold">Category</label>
//                         <select name="category" value={form.category} onChange={handleChange} className="form-select" required>
//                           <option value="">-- Select Category --</option>
//                           <option value="goods-issue">Goods Issue</option>
//                           <option value="display">Display</option>
//                           <option value="cancel">Cancel</option>
//                         </select>
//                       </div>
//                       <div className="col-md-4 mb-3">
//                         <label className="form-label fw-bold">Description</label>
//                         <input
//                           name="description"
//                           type="text"
//                           value={form.description}
//                           onChange={handleChange}
//                           readOnly={form.category !== 'goods-issue'}
//                           className={`form-control ${form.category !== 'goods-issue' ? 'bg-light' : ''}`}
//                           required
//                         />
//                       </div>
//                       <div className="col-md-12 mb-3">
//                         <label className="form-label fw-bold">Remarks</label>
//                         <textarea name="remarks" value={form.remarks} onChange={handleChange} className="form-control" rows="2" />
//                       </div>
//                     </div>
//                     <div className="text-end">
//                       <button type="submit" className="btn btn-success">
//                         <i className="fas fa-save me-1"></i>Save
//                       </button>
//                     </div>
//                   </form>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </>
//       )}

//       {/* Table */}
//       <div className="card border-0 shadow-sm mt-3">
//         <div className="card-header bg-light">
//           <h6 className="mb-0"><i className="fas fa-clipboard-list me-2"></i>Issued Goods</h6>
//         </div>
//         <div className="card-body p-0">
//           <div className="table-responsive">
//             <table className="table table-bordered mb-0">
//               <thead className="table-light">
//                 <tr>
//                   <th>#</th>
//                   <th>Date</th>
//                   <th>Item</th>
//                   <th>Qty</th>
//                   <th>Issued To</th>
//                   <th>Category</th>
//                   <th>Description</th>
//                   <th>Remarks</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {goodsIssues.length === 0 ? (
//                   <tr>
//                     <td colSpan="8" className="text-center text-muted py-3">No goods issued yet.</td>
//                   </tr>
//                 ) : (
//                   goodsIssues.map((gi, index) => (
//                     <tr key={index}>
//                       <td>{index + 1}</td>
//                       <td>{gi.date}</td>
//                       <td>{gi.item}</td>
//                       <td>{gi.quantity}</td>
//                       <td>{gi.issuedTo}</td>
//                       <td>{gi.category}</td>
//                       <td>{gi.description}</td>
//                       <td>{gi.remarks}</td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default GoodsIssueForm;


// import React, { useState, useEffect } from "react";

// // Dummy Purchase Orders



// const categoryDescriptions = {
//   GoodsReciept: "Material received from vendor",
//   Display: "Display for demo",
//   Cancel: "Cancelled order"
// };

// function GoodsIssue() {
//   const today = new Date().toISOString().split("T")[0];
//   const [selectedPO, setSelectedPO] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");

//   const [formData, setFormData] = useState({
//     category: "",
//     catdesc: ""
//   });

//   // ✅ Get from localStorage initially
//   const [savedReceipts, setSavedReceipts] = useState(() => {
//     const stored = localStorage.getItem("savedReceipts");
//     return stored ? JSON.parse(stored) : [];
//   });

//   // ✅ Save to localStorage on change
//   useEffect(() => {
//     localStorage.setItem("savedReceipts", JSON.stringify(savedReceipts));
//   }, [savedReceipts]);

//   const handleSelectPO = (po) => {
//     setSelectedPO(po);
//     setShowModal(false);
//   };

//   const handleCategoryChange = (e) => {
//     const value = e.target.value;
//     setFormData({
//       ...formData,
//       category: value,
//       catdesc: categoryDescriptions[value] || ""
//     });
//   };

//   const handleItemChange = (index, field, value) => {
//     const updatedItems = [...selectedPO.items];
//     updatedItems[index][field] = value;
//     setSelectedPO({ ...selectedPO, items: updatedItems });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!selectedPO) {
//       alert("Please select a Purchase Order.");
//       return;
//     }

//     const receipt = {
//       ...formData,
//       ...selectedPO,
//       date: today
//     };

//     setSavedReceipts((prev) => [...prev, receipt]);
//     alert("Goods Receipt saved!");
//   };

//   const filteredPOs = salesOrders.filter((po) =>
//     [po.poNumber, po.vendor, po.deliveryLocation]
//       .join(" ")
//       .toLowerCase()
//       .includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="content p-3">
//       <div className="d-flex justify-content-between align-items-center mb-3">
//         <h6>Goods Receipt</h6>
//       </div>

//       <form onSubmit={handleSubmit}>
//         <div className="card">
//           <div className="card-header p-2">
//             <div className="row mb-2">
//               <div className="col-xl-3">
//                 <label>Category</label>
//                 <select
//                   name="category"
//                   className="form-select"
//                   value={formData.category}
//                   onChange={handleCategoryChange}
//                 >
//                   <option value="">Select</option>
//                   <option value="GoodsReciept">Goods Receipt</option>
//                   <option value="Display">Display</option>
//                   <option value="Cancel">Cancel</option>
//                 </select>
//               </div>
//               <div className="col-xl-3">
//                 <label>Description</label>
//                 <input
//                   type="text"
//                   name="catdesc"
//                   className="form-control"
//                   value={formData.catdesc}
//                   readOnly
//                 />
//               </div>
//               <div className="col-xl-3">
//                 <label>Purchase Order</label>
//                 <div className="input-group">
//                   <input
//                     type="text"
//                     name="po"
//                     value={selectedPO?.poNumber || ""}
//                     className="form-control"
//                     readOnly
//                   />
//                   <button
//                     type="button"
//                     className="btn btn-outline-primary"
//                     onClick={() => setShowModal(true)}
//                   >
//                     Search
//                   </button>
//                 </div>
//               </div>
//               <div className="col-xl-3">
//                 <label>Document Number</label>
//                 <input type="text" name="docnumber" className="form-control" />
//               </div>
//             </div>

//             <div className="row mb-2">
//               <div className="col-xl-2">
//                 <label>Document Date</label>
//                 <input
//                   type="date"
//                   name="docdate"
//                   defaultValue={today}
//                   className="form-control"
//                 />
//               </div>
//               <div className="col-xl-2">
//                 <label>Posting Date</label>
//                 <input
//                   type="date"
//                   name="posdate"
//                   defaultValue={today}
//                   className="form-control"
//                 />
//               </div>
//               <div className="col-xl-2">
//                 <label>DC/LLR/REF</label>
//                 <input type="text" name="ref" className="form-control" />
//               </div>
//               <div className="col-xl-2">
//                 <label>Vendor/Supplier</label>
//                 <input
//                   type="text"
//                   name="vendor"
//                   value={selectedPO?.vendor || ""}
//                   className="form-control"
//                   readOnly
//                 />
//               </div>
//               <div className="col-xl-2">
//                 <label>Location</label>
//                 <input
//                   type="text"
//                   name="location"
//                   value={selectedPO?.deliveryLocation || ""}
//                   className="form-control"
//                   readOnly
//                 />
//               </div>
//             </div>
//           </div>

//           <div className="card-body">
//             <table className="table table-bordered">
//               <thead>
//                 <tr>
//                   <th>S. No</th>
//                   <th>Mat No</th>
//                   <th>Mat Desc</th>
//                   <th>QTY</th>
//                   <th>UOM</th>
//                   <th>Del Date</th>
//                   <th>LOT No</th>
//                   <th>Value</th>
//                   <th>Text</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {selectedPO?.items?.map((item, idx) => (
//                   <tr key={idx}>
//                     <td>{idx + 1}</td>
//                     <td>
//                       <input type="text" className="form-control" value={item.materialId} readOnly />
//                     </td>
//                     <td>
//                       <input type="text" className="form-control" value={item.description} readOnly />
//                     </td>
//                     <td>
//                       <input
//                         type="number"
//                         className="form-control"
//                         value={item.quantity}
//                         onChange={(e) => handleItemChange(idx, "quantity", e.target.value)}
//                       />
//                     </td>
//                     <td>
//                       <input type="text" className="form-control" value={item.baseUnit} readOnly />
//                     </td>
//                     <td>
//                       <input
//                         type="date"
//                         className="form-control"
//                         value={item.deliveryDate}
//                         onChange={(e) => handleItemChange(idx, "deliveryDate", e.target.value)}
//                       />
//                     </td>
//                     <td>
//                       <input
//                         type="text"
//                         className="form-control"
//                         value={item.lotNo || ""}
//                         onChange={(e) => handleItemChange(idx, "lotNo", e.target.value)}
//                       />
//                     </td>
//                     <td>
//                       <input type="number" className="form-control" value={item.price} readOnly />
//                     </td>
//                     <td>
//                       <input type="text" className="form-control" />
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         <div className="text-end mt-3">
//           <button type="submit" className="btn btn-success">Save</button>
//         </div>
//       </form>

//       {/* Saved Receipts Table */}
//       {savedReceipts.length > 0 && (
//         <div className="card mt-4">
//           <div className="card-header bg-secondary text-white d-flex justify-content-between">
//             <span>Saved Goods Receipts</span>
//             {/* <button
//               className="btn btn-sm btn-danger"
//               onClick={() => {
//                 localStorage.removeItem("savedReceipts");
//                 setSavedReceipts([]);
//               }}
//             >
//               Clear All
//             </button> */}
//           </div>
//           <div className="card-body">
//             <table className="table table-bordered table-striped">
//               <thead>
//                 <tr>
//                   <th>S. No</th>
//                   <th>PO Number</th>
//                   <th>Vendor</th>
//                   <th>Category</th>
//                   <th>Description</th>
//                   <th>Date</th>
//                   <th>Items</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {savedReceipts.map((rec, index) => (
//                   <tr key={index}>
//                     <td>{index + 1}</td>
//                     <td>{rec.poNumber}</td>
//                     <td>{rec.vendor}</td>
//                     <td>{rec.category}</td>
//                     <td>{rec.catdesc}</td>
//                     <td>{rec.date}</td>
//                     <td>
//                       <ul className="mb-0 ps-3">
//                         {rec.items.map((item, i) => (
//                           <li key={i}>
//                             {item.description} - {item.quantity} {item.baseUnit}
//                           </li>
//                         ))}
//                       </ul>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}

//       {/* Modal */}
//       {showModal && (
//         <>
//           <div className="modal-backdrop fade show"></div>
//           <div className="modal fade show" style={{ display: "block" }}>
//             <div className="modal-dialog modal-lg">
//               <div className="modal-content">
//                 <div className="modal-header bg-primary text-white">
//                   <h5 className="modal-title">Select Purchase Order</h5>
//                   <button
//                     className="btn-close btn-close-white"
//                     onClick={() => setShowModal(false)}
//                   ></button>
//                 </div>
//                 <div className="modal-body">
//                   <input
//                     type="text"
//                     className="form-control mb-2"
//                     placeholder="Search by PO Number, Vendor, or Location"
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                   />
//                   <table className="table table-hover">
//                     <thead>
//                       <tr>
//                         <th>PO Number</th>
//                         <th>Vendor</th>
//                         <th>Location</th>
//                         <th>Select</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {filteredPOs.map((po, idx) => (
//                         <tr key={idx}>
//                           <td>{po.poNumber}</td>
//                           <td>{po.vendor}</td>
//                           <td>{po.deliveryLocation}</td>
//                           <td>
//                             <button
//                               type="button"
//                               className="btn btn-sm btn-success"
//                               onClick={() => handleSelectPO(po)}
//                             >
//                               Select
//                             </button>
//                           </td>
//                         </tr>
//                       ))}
//                       {filteredPOs.length === 0 && (
//                         <tr>
//                           <td colSpan="4" className="text-center text-danger">
//                             No matching purchase orders found.
//                           </td>
//                         </tr>
//                       )}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// export default GoodsIssue;

// import React, { useState, useEffect } from "react";

// // Dummy Sales Orders (Replace with API data as needed)
// const salesOrders = [
//   {
//     soNumber: "SO300001",
//     sales: "John Electronics",
//     deliveryLocation: "Bangalore Warehouse",
//     items: [
//       {
//         materialId: "MAT1001",
//         description: "LED TV",
//         quantity: 10,
//         baseUnit: "pcs",
//         deliveryDate: "",
//         lotNo: "",
//         price: 25000
//       }
//     ]
//   },
//   {
//     soNumber: "SO300002",
//     sales: "Ace Distributors",
//     deliveryLocation: "Chennai Hub",
//     items: [
//       {
//         materialId: "MAT1002",
//         description: "Refrigerator",
//         quantity: 5,
//         baseUnit: "pcs",
//         deliveryDate: "",
//         lotNo: "",
//         price: 30000
//       }
//     ]
//   }
// ];

// const categoryDescriptions = {
//   GoodsIssue: "Material issued to customer",
//   Demo: "Demo dispatch",
//   Cancel: "Cancelled dispatch"
// };

// function GoodsIssue() {
//   const today = new Date().toISOString().split("T")[0];
//   const [selectedSO, setSelectedSO] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");

//   const [formData, setFormData] = useState({
//     category: "",
//     catdesc: ""
//   });

//   const [savedIssues, setSavedIssues] = useState(() => {
//     const stored = localStorage.getItem("savedIssues");
//     return stored ? JSON.parse(stored) : [];
//   });

//   useEffect(() => {
//     localStorage.setItem("savedIssues", JSON.stringify(savedIssues));
//   }, [savedIssues]);

//   const handleSelectSO = (so) => {
//     setSelectedSO(so);
//     setShowModal(false);
//   };

//   const handleCategoryChange = (e) => {
//     const value = e.target.value;
//     setFormData({
//       ...formData,
//       category: value,
//       catdesc: categoryDescriptions[value] || ""
//     });
//   };

//   const handleItemChange = (index, field, value) => {
//     const updatedItems = [...selectedSO.items];
//     updatedItems[index][field] = value;
//     setSelectedSO({ ...selectedSO, items: updatedItems });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!selectedSO) {
//       alert("Please select a Sales Order.");
//       return;
//     }

//     const issue = {
//       ...formData,
//       ...selectedSO,
//       date: today
//     };

//     setSavedIssues((prev) => [...prev, issue]);
//     alert("Goods Issue saved!");
//   };

//   const filteredSOs = salesOrders.filter((so) =>
//     [so.soNumber, so.sales, so.deliveryLocation]
//       .join(" ")
//       .toLowerCase()
//       .includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="content p-3">
//       <h6>Goods Issue</h6>

//       <form onSubmit={handleSubmit}>
//         <div className="card">
//           <div className="card-header p-2">
//             <div className="row mb-2">
//               <div className="col-xl-3">
//                 <label>Category</label>
//                 <select
//                   name="category"
//                   className="form-select"
//                   value={formData.category}
//                   onChange={handleCategoryChange}
//                 >
//                   <option value="">Select</option>
//                   <option value="GoodsIssue">Goods Issue</option>
//                   <option value="Demo">Demo</option>
//                   <option value="Cancel">Cancel</option>
//                 </select>
//               </div>
//               <div className="col-xl-3">
//                 <label>Description</label>
//                 <input
//                   type="text"
//                   name="catdesc"
//                   className="form-control"
//                   value={formData.catdesc}
//                   readOnly
//                 />
//               </div>
//               <div className="col-xl-3">
//                 <label>Sales Order</label>
//                 <div className="input-group">
//                   <input
//                     type="text"
//                     name="so"
//                     value={selectedSO?.soNumber || ""}
//                     className="form-control"
//                     readOnly
//                   />
//                   <button
//                     type="button"
//                     className="btn btn-outline-primary"
//                     onClick={() => setShowModal(true)}
//                   >
//                     Search
//                   </button>
//                 </div>
//               </div>
//               <div className="col-xl-3">
//                 <label>Document Number</label>
//                 <input type="text" name="docnumber" className="form-control" />
//               </div>
//             </div>

//             <div className="row mb-2">
//               <div className="col-xl-2">
//                 <label>Document Date</label>
//                 <input
//                   type="date"
//                   name="docdate"
//                   defaultValue={today}
//                   className="form-control"
//                 />
//               </div>
//               <div className="col-xl-2">
//                 <label>Posting Date</label>
//                 <input
//                   type="date"
//                   name="posdate"
//                   defaultValue={today}
//                   className="form-control"
//                 />
//               </div>
//               <div className="col-xl-2">
//                 <label>DC/LLR/REF</label>
//                 <input type="text" name="ref" className="form-control" />
//               </div>
//               <div className="col-xl-2">
//                 <label>Sales</label>
//                 <input
//                   type="text"
//                   name="sales"
//                   value={selectedSO?.sales || ""}
//                   className="form-control"
//                   readOnly
//                 />
//               </div>
//               <div className="col-xl-2">
//                 <label>Location</label>
//                 <input
//                   type="text"
//                   name="location"
//                   value={selectedSO?.deliveryLocation || ""}
//                   className="form-control"
//                   readOnly
//                 />
//               </div>
//             </div>
//           </div>

//           <div className="card-body">
//             <table className="table table-bordered">
//               <thead>
//                 <tr>
//                   <th>S. No</th>
//                   <th>Mat No</th>
//                   <th>Mat Desc</th>
//                   <th>QTY</th>
//                   <th>UOM</th>
//                   <th>Del Date</th>
//                   <th>LOT No</th>
//                   <th>Value</th>
//                   <th>Text</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {selectedSO?.items?.map((item, idx) => (
//                   <tr key={idx}>
//                     <td>{idx + 1}</td>
//                     <td>
//                       <input type="text" className="form-control" value={item.materialId} readOnly />
//                     </td>
//                     <td>
//                       <input type="text" className="form-control" value={item.description} readOnly />
//                     </td>
//                     <td>
//                       <input
//                         type="number"
//                         className="form-control"
//                         value={item.quantity}
//                         onChange={(e) => handleItemChange(idx, "quantity", e.target.value)}
//                       />
//                     </td>
//                     <td>
//                       <input type="text" className="form-control" value={item.baseUnit} readOnly />
//                     </td>
//                     <td>
//                       <input
//                         type="date"
//                         className="form-control"
//                         value={item.deliveryDate}
//                         onChange={(e) => handleItemChange(idx, "deliveryDate", e.target.value)}
//                       />
//                     </td>
//                     <td>
//                       <input
//                         type="text"
//                         className="form-control"
//                         value={item.lotNo || ""}
//                         onChange={(e) => handleItemChange(idx, "lotNo", e.target.value)}
//                       />
//                     </td>
//                     <td>
//                       <input type="number" className="form-control" value={item.price} readOnly />
//                     </td>
//                     <td>
//                       <input type="text" className="form-control" />
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         <div className="text-end mt-3">
//           <button type="submit" className="btn btn-success">Save</button>
//         </div>
//       </form>

//       {/* Saved Issues Table */}
//       {savedIssues.length > 0 && (
//         <div className="card mt-4">
//           <div className="card-header bg-secondary text-white d-flex justify-content-between">
//             <span>Saved Goods Issues</span>
//           </div>
//           <div className="card-body">
//             <table className="table table-bordered table-striped">
//               <thead>
//                 <tr>
//                   <th>S. No</th>
//                   <th>SO Number</th>
//                   <th>Sales</th>
//                   <th>Category</th>
//                   <th>Description</th>
//                   <th>Date</th>
//                   <th>Items</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {savedIssues.map((issue, index) => (
//                   <tr key={index}>
//                     <td>{index + 1}</td>
//                     <td>{issue.soNumber}</td>
//                     <td>{issue.sales}</td>
//                     <td>{issue.category}</td>
//                     <td>{issue.catdesc}</td>
//                     <td>{issue.date}</td>
//                     <td>
//                       <ul className="mb-0 ps-3">
//                         {issue.items.map((item, i) => (
//                           <li key={i}>
//                             {item.description} - {item.quantity} {item.baseUnit}
//                           </li>
//                         ))}
//                       </ul>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}

//       {/* Modal */}
//       {showModal && (
//         <>
//           <div className="modal-backdrop fade show"></div>
//           <div className="modal fade show" style={{ display: "block" }}>
//             <div className="modal-dialog modal-lg">
//               <div className="modal-content">
//                 <div className="modal-header bg-primary text-white">
//                   <h5 className="modal-title">Select Sales Order</h5>
//                   <button
//                     className="btn-close btn-close-white"
//                     onClick={() => setShowModal(false)}
//                   ></button>
//                 </div>
//                 <div className="modal-body">
//                   <input
//                     type="text"
//                     className="form-control mb-2"
//                     placeholder="Search by SO Number, Sales, or Location"
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                   />
//                   <table className="table table-hover">
//                     <thead>
//                       <tr>
//                         <th>SO Number</th>
//                         <th>Sales</th>
//                         <th>Location</th>
//                         <th>Select</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {filteredSOs.map((so, idx) => (
//                         <tr key={idx}>
//                           <td>{so.soNumber}</td>
//                           <td>{so.sales}</td>
//                           <td>{so.deliveryLocation}</td>
//                           <td>
//                             <button
//                               type="button"
//                               className="btn btn-sm btn-success"
//                               onClick={() => handleSelectSO(so)}
//                             >
//                               Select
//                             </button>
//                           </td>
//                         </tr>
//                       ))}
//                       {filteredSOs.length === 0 && (
//                         <tr>
//                           <td colSpan="4" className="text-center text-danger">
//                             No matching sales orders found.
//                           </td>
//                         </tr>
//                       )}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// export default GoodsIssue;


// import React, { useState, useEffect } from "react";

// // Dummy Sales Orders
// const salesOrders = [
//   {
//     soNumber: "SO300001",
//     sales: "John Electronics",
//     deliveryLocation: "Bangalore Warehouse",
//     items: [
//       {
//         materialId: "MAT1001",
//         description: "LED TV",
//         quantity: 10,
//         baseUnit: "pcs",
//         deliveryDate: "",
//         lotNo: "",
//         price: 25000
//       }
//     ]
//   },
//   {
//     soNumber: "SO300002",
//     sales: "Ace Distributors",
//     deliveryLocation: "Chennai Hub",
//     items: [
//       {
//         materialId: "MAT1002",
//         description: "Refrigerator",
//         quantity: 5,
//         baseUnit: "pcs",
//         deliveryDate: "",
//         lotNo: "",
//         price: 30000
//       }
//     ]
//   }
// ];

// const categoryDescriptions = {
//   GoodsIssue: "Material issued to customer",
//   Demo: "Demo dispatch",
//   Cancel: "Cancelled dispatch"
// };

// function GoodsIssue() {
//   const today = new Date().toISOString().split("T")[0];
//   const [selectedSO, setSelectedSO] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");

//   const [formData, setFormData] = useState({
//     category: "",
//     catdesc: "",
//     docnumber: ""
//   });

//   const [savedIssues, setSavedIssues] = useState(() => {
//     const stored = localStorage.getItem("savedIssues");
//     return stored ? JSON.parse(stored) : [];
//   });

//   useEffect(() => {
//     localStorage.setItem("savedIssues", JSON.stringify(savedIssues));
//   }, [savedIssues]);

//   const handleSelectSO = (so) => {
//     setSelectedSO(so);
//     setShowModal(false);
//   };

//   const handleCategoryChange = (e) => {
//     const value = e.target.value;
//     let docnumber = "";

//     if (value === "Cancel") {
//       docnumber = `CNL-${Date.now()}`;
//     } else if (value === "Demo") {
//       docnumber = `DMP-${Date.now()}`;
//     }

//     setFormData((prev) => ({
//       ...prev,
//       category: value,
//       catdesc: categoryDescriptions[value] || "",
//       docnumber
//     }));
//   };

//   const handleItemChange = (index, field, value) => {
//     const updatedItems = [...selectedSO.items];
//     updatedItems[index][field] = value;
//     setSelectedSO({ ...selectedSO, items: updatedItems });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!selectedSO) {
//       alert("Please select a Sales Order.");
//       return;
//     }

//     const issue = {
//       ...formData,
//       ...selectedSO,
//       date: today
//     };

//     setSavedIssues((prev) => [...prev, issue]);
//     alert("Goods Issue saved!");
//   };

//   const filteredSOs = salesOrders.filter((so) =>
//     [so.soNumber, so.sales, so.deliveryLocation]
//       .join(" ")
//       .toLowerCase()
//       .includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="content p-3">
//       <h6>Goods Issue</h6>

//       <form onSubmit={handleSubmit}>
//         <div className="card">
//           <div className="card-header p-2">
//             <div className="row mb-2">
//               <div className="col-xl-3">
//                 <label>Category</label>
//                 <select
//                   name="category"
//                   className="form-select"
//                   value={formData.category}
//                   onChange={handleCategoryChange}
//                 >
//                   <option value="">Select</option>
//                   <option value="GoodsIssue">Goods Issue</option>
//                   <option value="Demo">Dispaly</option>
//                   <option value="Cancel">Cancel</option>
//                 </select>
//               </div>
//               <div className="col-xl-3">
//                 <label>Description</label>
//                 <input
//                   type="text"
//                   name="catdesc"
//                   className="form-control"
//                   value={formData.catdesc}
//                   readOnly
//                 />
//               </div>
//               <div className="col-xl-3">
//                 <label>Sales Order</label>
//                 <div className="input-group">
//                   <input
//                     type="text"
//                     name="so"
//                     value={selectedSO?.soNumber || ""}
//                     className="form-control"
//                     readOnly
//                   />
//                   <button
//                     type="button"
//                     className="btn btn-outline-primary"
//                     onClick={() => setShowModal(true)}
//                   >
//                     Search
//                   </button>
//                 </div>
//               </div>
//               <div className="col-xl-3">
//                 <label>Document Number</label>
//                 <input
//                   type="text"
//                   name="docnumber"
//                   className="form-control"
//                   value={formData.docnumber}
//                   readOnly
//                 />
//               </div>
//             </div>

//             <div className="row mb-2">
//               <div className="col-xl-2">
//                 <label>Document Date</label>
//                 <input type="date" name="docdate" defaultValue={today} className="form-control" />
//               </div>
//               <div className="col-xl-2">
//                 <label>Posting Date</label>
//                 <input type="date" name="posdate" defaultValue={today} className="form-control" />
//               </div>
//               <div className="col-xl-2">
//                 <label>DC/LLR/REF</label>
//                 <input type="text" name="ref" className="form-control" />
//               </div>
//               <div className="col-xl-2">
//                 <label>Sales</label>
//                 <input
//                   type="text"
//                   name="sales"
//                   value={selectedSO?.sales || ""}
//                   className="form-control"
//                   readOnly
//                 />
//               </div>
//               <div className="col-xl-2">
//                 <label>Location</label>
//                 <input
//                   type="text"
//                   name="location"
//                   value={selectedSO?.deliveryLocation || ""}
//                   className="form-control"
//                   readOnly
//                 />
//               </div>
//             </div>
//           </div>

//           <div className="card-body">
//             <table className="table table-bordered">
//               <thead>
//                 <tr>
//                   <th>S. No</th>
//                   <th>Mat No</th>
//                   <th>Mat Desc</th>
//                   <th>QTY</th>
//                   <th>UOM</th>
//                   <th>Del Date</th>
//                   <th>LOT No</th>
//                   <th>Value</th>
//                   <th>Text</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {selectedSO?.items?.map((item, idx) => (
//                   <tr key={idx}>
//                     <td>{idx + 1}</td>
//                     <td>
//                       <input type="text" className="form-control" value={item.materialId} readOnly />
//                     </td>
//                     <td>
//                       <input type="text" className="form-control" value={item.description} readOnly />
//                     </td>
//                     <td>
//                       <input
//                         type="number"
//                         className="form-control"
//                         value={item.quantity}
//                         onChange={(e) => handleItemChange(idx, "quantity", e.target.value)}
//                       />
//                     </td>
//                     <td>
//                       <input type="text" className="form-control" value={item.baseUnit} readOnly />
//                     </td>
//                     <td>
//                       <input
//                         type="date"
//                         className="form-control"
//                         value={item.deliveryDate}
//                         onChange={(e) => handleItemChange(idx, "deliveryDate", e.target.value)}
//                       />
//                     </td>
//                     <td>
//                       <input
//                         type="text"
//                         className="form-control"
//                         value={item.lotNo || ""}
//                         onChange={(e) => handleItemChange(idx, "lotNo", e.target.value)}
//                       />
//                     </td>
//                     <td>
//                       <input type="number" className="form-control" value={item.price} readOnly />
//                     </td>
//                     <td>
//                       <input type="text" className="form-control" />
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         <div className="text-end mt-3">
//           <button type="submit" className="btn btn-success">Save</button>
//         </div>
//       </form>

//       {savedIssues.length > 0 && (
//         <div className="card mt-4">
//           <div className="card-header bg-secondary text-white d-flex justify-content-between">
//             <span>Saved Goods Issues</span>
//           </div>
//           <div className="card-body">
//             <table className="table table-bordered table-striped">
//               <thead>
//                 <tr>
//                   <th>S. No</th>
//                   <th>SO Number</th>
//                   {/* <th>Document No</th> */}
//                   <th>Sales</th>
//                   <th>Category</th>
//                   <th>Description</th>
//                   <th>Date</th>
//                   <th>Items</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {savedIssues.map((issue, index) => (
//                   <tr key={index}>
//                     <td>{index + 1}</td>
//                     <td>{issue.soNumber}</td>
//                     {/* <td>{issue.docnumber || "-"}</td> */}
//                     <td>{issue.sales}</td>
//                     <td>{issue.category}</td>
//                     <td>{issue.catdesc}</td>
//                     <td>{issue.date}</td>
//                     <td>
//                       <ul className="mb-0 ps-3">
//                         {issue.items.map((item, i) => (
//                           <li key={i}>
//                             {item.description} - {item.quantity} {item.baseUnit}
//                           </li>
//                         ))}
//                       </ul>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}

//       {showModal && (
//         <>
//           <div className="modal-backdrop fade show"></div>
//           <div className="modal fade show" style={{ display: "block" }}>
//             <div className="modal-dialog modal-lg">
//               <div className="modal-content">
//                 <div className="modal-header bg-primary text-white">
//                   <h5 className="modal-title">Select Sales Order</h5>
//                   <button
//                     className="btn-close btn-close-white"
//                     onClick={() => setShowModal(false)}
//                   ></button>
//                 </div>
//                 <div className="modal-body">
//                   <input
//                     type="text"
//                     className="form-control mb-2"
//                     placeholder="Search by SO Number, Sales, or Location"
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                   />
//                   <table className="table table-hover">
//                     <thead>
//                       <tr>
//                         <th>SO Number</th>
//                         <th>Sales</th>
//                         <th>Location</th>
//                         <th>Select</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {filteredSOs.map((so, idx) => (
//                         <tr key={idx}>
//                           <td>{so.soNumber}</td>
//                           <td>{so.sales}</td>
//                           <td>{so.deliveryLocation}</td>
//                           <td>
//                             <button
//                               type="button"
//                               className="btn btn-sm btn-success"
//                               onClick={() => handleSelectSO(so)}
//                             >
//                               Select
//                             </button>
//                           </td>
//                         </tr>
//                       ))}
//                       {filteredSOs.length === 0 && (
//                         <tr>
//                           <td colSpan="4" className="text-center text-danger">
//                             No matching sales orders found.
//                           </td>
//                         </tr>
//                       )}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// export default GoodsIssue;

import React, { useState, useEffect } from "react";

// Dummy Sales Orders
const salesOrders = [
  {
    soNumber: "SO300001",
    sales: "John Electronics",
    deliveryLocation: "Bangalore Warehouse",
    items: [
      {
        materialId: "MAT1001",
        description: "LED TV",
        quantity: 10,
        baseUnit: "pcs",
        deliveryDate: "",
        lotNo: "",
        price: 25000
      }
    ]
  },
  {
    soNumber: "SO300002",
    sales: "Ace Distributors",
    deliveryLocation: "Chennai Hub",
    items: [
      {
        materialId: "MAT1002",
        description: "Refrigerator",
        quantity: 5,
        baseUnit: "pcs",
        deliveryDate: "",
        lotNo: "",
        price: 30000
      }
    ]
  },
  
];

const categoryDescriptions = {
  GoodsIssue: "Material issued to customer",
  Demo: "Demo dispatch",
  Cancel: "Cancelled dispatch"
};

function GoodsIssue() {
  const today = new Date().toISOString().split("T")[0];

  const [selectedSO, setSelectedSO] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    category: "",
    catdesc: "",
    docnumber: ""
  });

  const [searchQuery, setSearchQuery] = useState("");
  // const [searchType, setSearchType] = useState("soNumber");
  // const [searchQuery, setSearchQuery] = useState("");
const [searchType, setSearchType] = useState("soNumber");
const [viewAllClicked, setViewAllClicked] = useState(false);

  const [savedIssues, setSavedIssues] = useState(() => {
    const stored = localStorage.getItem("savedIssues");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("savedIssues", JSON.stringify(savedIssues));
  }, [savedIssues]);

  const handleSelectSO = (so) => {
    setSelectedSO(so);
    setShowModal(false);
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    let docnumber = "";

    if (value === "Cancel") docnumber = `CNL-${Date.now()}`;
    else if (value === "Demo") docnumber = `DMP-${Date.now()}`;

    setFormData((prev) => ({
      ...prev,
      category: value,
      catdesc: categoryDescriptions[value] || "",
      docnumber
    }));
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...selectedSO.items];
    updatedItems[index][field] = value;
    setSelectedSO({ ...selectedSO, items: updatedItems });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedSO) return alert("Please select a Sales Order.");

    const issue = {
      ...formData,
      ...selectedSO,
      date: today
    };

    setSavedIssues((prev) => [...prev, issue]);
    alert("Goods Issue saved!");
  };

  // const filteredSOs = salesOrders.filter((so) =>
  //   so[searchType].toLowerCase().includes(searchQuery.toLowerCase())
  // );
  const filteredSOs = salesOrders.filter((so) => {
    if (!viewAllClicked && !searchQuery) return false;
  
    const value = so[searchType]?.toLowerCase() || "";
    return value.includes(searchQuery.toLowerCase());
  });
  
  const handleViewAll = () => {
    setSearchQuery("");
    setViewAllClicked(true);
  };
  
  const handleClear = () => {
    setSearchQuery("");
    setViewAllClicked(false);
  };
  return (
    <div className="content p-3">
      <h6>Goods Issue</h6>

      <form onSubmit={handleSubmit}>
        <div className="card">
          <div className="card-header p-2">
            <div className="row mb-2">
              <div className="col-xl-3">
                <label>Category</label>
                <select
                  name="category"
                  className="form-select"
                  value={formData.category}
                  onChange={handleCategoryChange}
                >
                  <option value="">Select</option>
                  <option value="GoodsIssue">Goods Issue</option>
                  <option value="Demo">Display</option>
                  <option value="Cancel">Cancel</option>
                </select>
              </div>
              <div className="col-xl-3">
                <label>Description</label>
                <input
                  type="text"
                  name="catdesc"
                  className="form-control"
                  value={formData.catdesc}
                  readOnly
                />
              </div>
              <div className="col-xl-3">
                <label>Sales Order</label>
                <div className="input-group">
                  <input
                    type="text"
                    name="so"
                    value={selectedSO?.soNumber || ""}
                    className="form-control"
                    readOnly
                  />
                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={() => setShowModal(true)}
                  >
                    Search
                  </button>
                </div>
              </div>
              <div className="col-xl-3">
                <label>Document Number</label>
                <input
                  type="text"
                  name="docnumber"
                  className="form-control"
                  value={formData.docnumber}
                  readOnly
                />
              </div>
            </div>

            <div className="row mb-2">
              <div className="col-xl-2">
                <label>Document Date</label>
                <input type="date" defaultValue={today} className="form-control" />
              </div>
              <div className="col-xl-2">
                <label>Posting Date</label>
                <input type="date" defaultValue={today} className="form-control" />
              </div>
              <div className="col-xl-2">
                <label>DC/LLR/REF</label>
                <input type="text" className="form-control" />
              </div>
              <div className="col-xl-2">
                <label>Sales</label>
                <input
                  type="text"
                  value={selectedSO?.sales || ""}
                  className="form-control"
                  readOnly
                />
              </div>
              <div className="col-xl-2">
                <label>Location</label>
                <input
                  type="text"
                  value={selectedSO?.deliveryLocation || ""}
                  className="form-control"
                  readOnly
                />
              </div>
            </div>
          </div>

          <div className="card-body">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>S. No</th>
                  <th>Mat No</th>
                  <th>Mat Desc</th>
                  <th>QTY</th>
                  <th>UOM</th>
                  <th>Del Date</th>
                  <th>LOT No</th>
                  <th>Value</th>
                  <th>Text</th>
                </tr>
              </thead>
              <tbody>
                {selectedSO?.items?.map((item, idx) => (
                  <tr key={idx}>
                    <td>{idx + 1}</td>
                    <td><input type="text" className="form-control" value={item.materialId} readOnly /></td>
                    <td><input type="text" className="form-control" value={item.description} readOnly /></td>
                    <td>
                      <input
                        type="number"
                        className="form-control"
                        value={item.quantity}
                        onChange={(e) => handleItemChange(idx, "quantity", e.target.value)}
                      />
                    </td>
                    <td><input type="text" className="form-control" value={item.baseUnit} readOnly /></td>
                    <td>
                      <input
                        type="date"
                        className="form-control"
                        value={item.deliveryDate}
                        onChange={(e) => handleItemChange(idx, "deliveryDate", e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        value={item.lotNo || ""}
                        onChange={(e) => handleItemChange(idx, "lotNo", e.target.value)}
                      />
                    </td>
                    <td><input type="number" className="form-control" value={item.price} readOnly /></td>
                    <td><input type="text" className="form-control" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="text-end mt-3">
          <button type="submit" className="btn btn-success">Save</button>
        </div>
      </form>

      {/* Saved Issues */}
      {savedIssues.length > 0 && (
        <div className="card mt-4">
          <div className="card-header bg-secondary text-white">Saved Goods Issues</div>
          <div className="card-body">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>S. No</th>
                  <th>SO Number</th>
                  <th>Sales</th>
                  <th>Category</th>
                  <th>Description</th>
                  <th>Date</th>
                  <th>Items</th>
                </tr>
              </thead>
              <tbody>
                {savedIssues.map((issue, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{issue.soNumber}</td>
                    <td>{issue.sales}</td>
                    <td>{issue.category}</td>
                    <td>{issue.catdesc}</td>
                    <td>{issue.date}</td>
                    <td>
                      <ul className="mb-0 ps-3">
                        {issue.items.map((item, i) => (
                          <li key={i}>
                            {item.description} - {item.quantity} {item.baseUnit}
                          </li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Search Sales Order Modal */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-xl">
            <div className="modal-content">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">
                  <i className="fas fa-search me-2"></i>Search Sales Orders
                </h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                {/* Search Controls */}
                <div className="row mb-3">
                  <div className="col-md-3">
                    <label className="form-label">Search Type</label>
                    <select className="form-select" value={searchType} onChange={(e) => setSearchType(e.target.value)}>
                      <option value="soNumber">SO Number</option>
                      <option value="sales">Sales</option>
                      <option value="deliveryLocation">Location</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Search Query</label>
                    <div className="input-group">
                      <span className="input-group-text"><i className="fas fa-search"></i></span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder={`Search by ${searchType}`}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <label className="form-label">&nbsp;</label>
                    <div className="d-flex gap-2">
                    <button className="btn btn-info" onClick={handleViewAll}>
  <i className="fas fa-list me-1"></i>View All
</button>
{(searchQuery || viewAllClicked) && (
  <button className="btn btn-outline-secondary" onClick={handleClear}>
    <i className="fas fa-times me-1"></i>Clear
  </button>
)}

                    </div>
                  </div>
                </div>

                {/* Search Results */}
                <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                  {filteredSOs.length > 0 ? (
                    <table className="table table-hover">
                      <thead className="table-light sticky-top">
                        <tr>
                          <th>SO Number</th>
                          <th>Sales</th>
                          <th>Location</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredSOs.map((so, idx) => (
                          <tr key={idx}>
                            <td><span className="badge bg-primary">{so.soNumber}</span></td>
                            <td>{so.sales}</td>
                            <td>{so.deliveryLocation}</td>
                            <td>
                              <button className="btn btn-success btn-sm" onClick={() => handleSelectSO(so)}>
                                <i className="fas fa-check me-1"></i>Select
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <div className="text-center py-4">
                      <i className="fas fa-search fa-3x text-muted mb-3"></i>
                      <p className="text-muted">
                        {searchQuery
                          ? `No sales orders found for "${searchQuery}"`
                          : 'Enter search term or click "View All"'}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  <i className="fas fa-times me-1"></i>Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GoodsIssue;



