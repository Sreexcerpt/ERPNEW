// import React, { useState, useEffect } from "react";

// const materialList = [
//   {
//     _id: "686240650d603136544047a1",
//     materialId: "MMNR-100005",
//     description: "newww",
//     baseUnit: "Piece",
//     orderUnit: "Piece",
//     price: 1200
//   },
//   {
//     _id: "686240650d603136544047a2",
//     materialId: "MMNR-100006",
//     description: "washing machine",
//     baseUnit: "Piece",
//     orderUnit: "Piece",
//     price: 25000
//   }
// ];

// const categoryDescriptions = {
//   Transfer: "Internal stock transfer",
//   Delivery: "Customer delivery",
//   Cancel: "Cancelled dispatch"
// };

// function GoodsTransfer() {
//   const today = new Date().toISOString().split("T")[0];
//   const [formData, setFormData] = useState({ category: "", catdesc: "" });
//   const [savedTransfers, setSavedTransfers] = useState(() => {
//     const stored = localStorage.getItem("savedTransfers");
//     return stored ? JSON.parse(stored) : [];
//   });
//   const [items, setItems] = useState([
//     { materialId: "", description: "", baseUnit: "", price: "", quantity: "", deliveryDate: "", lotNo: "", text: "" }
//   ]);
//   const [searchRowIndex, setSearchRowIndex] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");

//   useEffect(() => {
//     localStorage.setItem("savedTransfers", JSON.stringify(savedTransfers));
//   }, [savedTransfers]);

//   const handleCategoryChange = (e) => {
//     const val = e.target.value;
//     setFormData({ category: val, catdesc: categoryDescriptions[val] || "" });
//   };

//   const handleItemChange = (i, field, val) => {
//     const updated = [...items];
//     updated[i][field] = val;
//     setItems(updated);
//   };

//   const handleAddRow = () => {
//     setItems([...items, { materialId: "", description: "", baseUnit: "", price: "", quantity: "", deliveryDate: "", lotNo: "", text: "" }]);
//   };

//   const handleMaterialSelect = (material) => {
//     const updated = [...items];
//     updated[searchRowIndex] = {
//       ...updated[searchRowIndex],
//       materialId: material.materialId,
//       description: material.description,
//       baseUnit: material.baseUnit,
//       price: material.price
//     };
//     setItems(updated);
//     setShowModal(false);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const doc = {
//       ...formData,
//       docNumber: document.getElementById("docNumber").value,
//       docDate: document.getElementById("docDate").value,
//       postDate: document.getElementById("postDate").value,
//       reference: document.getElementById("ref").value,
//       location: document.getElementById("location").value,
//       items,
//       date: today
//     };
//     setSavedTransfers([...savedTransfers, doc]);
//     setItems([items[0]]);
//     alert("Saved!");
//   };

//   const filteredMaterials = materialList.filter((m) =>
//     [m.materialId, m.description].join(" ").toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="container p-3">
//       <h6>Goods Transfer</h6>
//       <form onSubmit={handleSubmit}>
//         <div className="row mb-2">
//           <div className="col-md-3">
//             <label>Category</label>
//             <select className="form-select" value={formData.category} onChange={handleCategoryChange}>
//               <option value="">Select</option>
//               <option value="Transfer">Transfer</option>
//               <option value="Delivery">Delivery</option>
//               <option value="Cancel">Cancel</option>
//             </select>
//           </div>
//           <div className="col-md-3">
//             <label>Description</label>
//             <input className="form-control" value={formData.catdesc} readOnly />
//           </div>
//           <div className="col-md-3">
//             <label>Document No</label>
//             <input id="docNumber" className="form-control" required />
//           </div>
//           <div className="col-md-3">
//             <label>Document Date</label>
//             <input id="docDate" type="date" defaultValue={today} className="form-control" />
//           </div>
//           <div className="col-md-3">
//             <label>Posting Date</label>
//             <input id="postDate" type="date" defaultValue={today} className="form-control" />
//           </div>
//           <div className="col-md-3">
//             <label>REF</label>
//             <input id="ref" className="form-control" />
//           </div>
//           <div className="col-md-3">
//             <label>Location</label>
//             <input id="location" className="form-control" />
//           </div>
//         </div>

//         <table className="table table-bordered">
//           <thead>
//             <tr>
//               <th>#</th>
//               <th>Material ID</th>
//               <th>Description</th>
//               <th>Qty</th>
//               <th>UOM</th>
//               <th>Del Date</th>
//               <th>Lot No</th>
//               <th>Price</th>
//               <th>Text</th>
//             </tr>
//           </thead>
//           <tbody>
//             {items.map((item, i) => (
//               <tr key={i}>
//                 <td>{i + 1}</td>
//                 <td>
//                   <div className="input-group">
//                     <input className="form-control" value={item.materialId} readOnly />
//                     <button
//                       type="button"
//                       className="btn btn-outline-secondary"
//                       onClick={() => {
//                         setSearchRowIndex(i);
//                         setShowModal(true);
//                       }}
//                     >
//                       🔍
//                     </button>
//                   </div>
//                 </td>
//                 <td><input className="form-control" value={item.description} readOnly /></td>
//                 <td><input className="form-control" value={item.quantity} onChange={(e) => handleItemChange(i, "quantity", e.target.value)} /></td>
//                 <td><input className="form-control" value={item.baseUnit} readOnly /></td>
//                 <td><input className="form-control" type="date" value={item.deliveryDate} onChange={(e) => handleItemChange(i, "deliveryDate", e.target.value)} /></td>
//                 <td><input className="form-control" value={item.lotNo} onChange={(e) => handleItemChange(i, "lotNo", e.target.value)} /></td>
//                 <td><input className="form-control" value={item.price} readOnly /></td>
//                 <td><input className="form-control" value={item.text} onChange={(e) => handleItemChange(i, "text", e.target.value)} /></td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         <button type="button" className="btn btn-sm btn-secondary mb-2" onClick={handleAddRow}>+ Add Row</button>
//         <div className="text-end">
//           <button type="submit" className="btn btn-success">Save</button>
//         </div>
//       </form>

//       {/* Material Search Modal */}
//       {showModal && (
//         <div className="modal fade show" style={{ display: "block" }}>
//           <div className="modal-backdrop fade show"></div>
//           <div className="modal-dialog modal-lg">
//             <div className="modal-content">
//               <div className="modal-header bg-primary text-white">
//                 <h5 className="modal-title">Select Material</h5>
//                 <button className="btn-close btn-close-white" onClick={() => setShowModal(false)}></button>
//               </div>
//               <div className="modal-body">
//                 <input
//                   type="text"
//                   className="form-control mb-2"
//                   placeholder="Search Material ID or Description"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//                 <table className="table table-hover">
//                   <thead>
//                     <tr>
//                       <th>Material ID</th>
//                       <th>Description</th>
//                       <th>UOM</th>
//                       <th>Price</th>
//                       <th>Select</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {filteredMaterials.map((mat, idx) => (
//                       <tr key={idx}>
//                         <td>{mat.materialId}</td>
//                         <td>{mat.description}</td>
//                         <td>{mat.baseUnit}</td>
//                         <td>{mat.price}</td>
//                         <td>
//                           <button className="btn btn-sm btn-success" onClick={() => handleMaterialSelect(mat)}>
//                             Select
//                           </button>
//                         </td>
//                       </tr>
//                     ))}
//                     {filteredMaterials.length === 0 && (
//                       <tr>
//                         <td colSpan="5" className="text-center text-danger">No materials found.</td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default GoodsTransfer;


// import React, { useState, useEffect } from "react";

// // 🔧 Dummy Material List
// const materialList = [
//   {
//     materialId: "MAT1001",
//     description: "LED TV 42 Inch",
//     baseUnit: "pcs",
//     price: 25000
//   },
//   {
//     materialId: "MAT1002",
//     description: "Washing Machine",
//     baseUnit: "pcs",
//     price: 30000
//   }
// ];

// function GoodsTransfer() {
//   const today = new Date().toISOString().split("T")[0];

//   const [showModal, setShowModal] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [items, setItems] = useState([]);
//   const [savedTransfers, setSavedTransfers] = useState(() => {
//     const stored = localStorage.getItem("savedTransfers");
//     return stored ? JSON.parse(stored) : [];
//   });

//   useEffect(() => {
//     localStorage.setItem("savedTransfers", JSON.stringify(savedTransfers));
//   }, [savedTransfers]);

//   const handleAddItem = (material) => {
//     const newItem = {
//       ...material,
//       quantity: "",
//       deliveryDate: "",
//       lotNo: "",
//       text: ""
//     };
//     setItems([...items, newItem]);
//     setShowModal(false);
//   };

//   const handleItemChange = (index, field, value) => {
//     const updated = [...items];
//     updated[index][field] = value;
//     setItems(updated);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (items.length === 0) {
//       alert("Please add at least one material.");
//       return;
//     }

//     const doc = {
//       docNumber: document.getElementById("docNumber").value,
//       docDate: document.getElementById("docDate").value,
//       postDate: document.getElementById("postDate").value,
//       reference: document.getElementById("ref").value,
//       location: document.getElementById("location").value,
//       items,
//       date: today
//     };

//     setSavedTransfers((prev) => [...prev, doc]);
//     setItems([]);
//     alert("Goods Transfer saved!");
//   };

//   const filteredMaterials = materialList.filter((mat) =>
//     [mat.materialId, mat.description].join(" ").toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="content p-3">
//       <h6>Goods Transfer / Delivery</h6>

//       <form onSubmit={handleSubmit}>
//         <div className="card">
//           <div className="card-header p-2">
//             <div className="row mb-2">
//               <div className="col-xl-3">
//                 <label>Document Number</label>
//                 <input type="text" id="docNumber" className="form-control" required />
//               </div>
//               <div className="col-xl-3">
//                 <label>Document Date</label>
//                 <input type="date" id="docDate" defaultValue={today} className="form-control" required />
//               </div>
//               <div className="col-xl-3">
//                 <label>Posting Date</label>
//                 <input type="date" id="postDate" defaultValue={today} className="form-control" required />
//               </div>
//               <div className="col-xl-3">
//                 <label>DC/LLR/REF</label>
//                 <input type="text" id="ref" className="form-control" />
//               </div>
//               <div className="col-xl-3">
//                 <label>Location</label>
//                 <input type="text" id="location" className="form-control" />
//               </div>
//             </div>
//             <div className="text-end">
//               <button type="button" className="btn btn-primary" onClick={() => setShowModal(true)}>
//                 Add Material
//               </button>
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
//                 {items.map((item, idx) => (
//                   <tr key={idx}>
//                     <td>{idx + 1}</td>
//                     <td><input className="form-control" value={item.materialId} readOnly /></td>
//                     <td><input className="form-control" value={item.description} readOnly /></td>
//                     <td>
//                       <input
//                         className="form-control"
//                         type="number"
//                         value={item.quantity}
//                         onChange={(e) => handleItemChange(idx, "quantity", e.target.value)}
//                       />
//                     </td>
//                     <td><input className="form-control" value={item.baseUnit} readOnly /></td>
//                     <td>
//                       <input
//                         className="form-control"
//                         type="date"
//                         value={item.deliveryDate}
//                         onChange={(e) => handleItemChange(idx, "deliveryDate", e.target.value)}
//                       />
//                     </td>
//                     <td>
//                       <input
//                         className="form-control"
//                         type="text"
//                         value={item.lotNo}
//                         onChange={(e) => handleItemChange(idx, "lotNo", e.target.value)}
//                       />
//                     </td>
//                     <td><input className="form-control" type="number" value={item.price} readOnly /></td>
//                     <td>
//                       <input
//                         className="form-control"
//                         type="text"
//                         value={item.text}
//                         onChange={(e) => handleItemChange(idx, "text", e.target.value)}
//                       />
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

//       {/* Saved Transfers Table */}
//       {savedTransfers.length > 0 && (
//         <div className="card mt-4">
//           <div className="card-header bg-secondary text-white">Saved Goods Transfers</div>
//           <div className="card-body">
//             <table className="table table-bordered table-striped">
//               <thead>
//                 <tr>
//                   <th>S. No</th>
//                   <th>Document No</th>
//                   <th>Location</th>
//                   <th>Date</th>
//                   <th>Items</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {savedTransfers.map((doc, i) => (
//                   <tr key={i}>
//                     <td>{i + 1}</td>
//                     <td>{doc.docNumber}</td>
//                     <td>{doc.location}</td>
//                     <td>{doc.date}</td>
//                     <td>
//                       <ul className="mb-0 ps-3">
//                         {doc.items.map((item, idx) => (
//                           <li key={idx}>
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

//       {/* Material Search Modal */}
//       {showModal && (
//         <>
//           <div className="modal-backdrop fade show"></div>
//           <div className="modal fade show" style={{ display: "block" }}>
//             <div className="modal-dialog modal-lg">
//               <div className="modal-content">
//                 <div className="modal-header bg-primary text-white">
//                   <h5 className="modal-title">Select Material</h5>
//                   <button className="btn-close btn-close-white" onClick={() => setShowModal(false)}></button>
//                 </div>
//                 <div className="modal-body">
//                   <input
//                     type="text"
//                     className="form-control mb-2"
//                     placeholder="Search Material ID or Description"
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                   />
//                   <table className="table table-hover">
//                     <thead>
//                       <tr>
//                         <th>Material ID</th>
//                         <th>Description</th>
//                         <th>Unit</th>
//                         <th>Price</th>
//                         <th>Select</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {filteredMaterials.map((mat, idx) => (
//                         <tr key={idx}>
//                           <td>{mat.materialId}</td>
//                           <td>{mat.description}</td>
//                           <td>{mat.baseUnit}</td>
//                           <td>{mat.price}</td>
//                           <td>
//                             <button
//                               type="button"
//                               className="btn btn-sm btn-success"
//                               onClick={() => handleAddItem(mat)}
//                             >
//                               Select
//                             </button>
//                           </td>
//                         </tr>
//                       ))}
//                       {filteredMaterials.length === 0 && (
//                         <tr>
//                           <td colSpan="5" className="text-danger text-center">
//                             No materials found.
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

// export default GoodsTransfer;


// import React, { useState, useEffect } from "react";

// const materialList = [
//   {
//     _id: "686240650d603136544047a1",
//     materialId: "MMNR-100005",
//     description: "newww",
//     baseUnit: "Piece",
//     orderUnit: "Piece",
//     price: 1200,
//   },
//   {
//     _id: "686240650d603136544047a2",
//     materialId: "MMNR-100006",
//     description: "washing machine",
//     baseUnit: "Piece",
//     orderUnit: "Piece",
//     price: 25000,
//   },
// ];

// const categoryDescriptions = {
//   Transfer: "Internal stock transfer",
//   Dispaly: "Customer delivery",
//   Cancel: "Cancelled dispatch",
// };

// function GoodsTransfer() {
//   const today = new Date().toISOString().split("T")[0];
//   const [formData, setFormData] = useState({ category: "", catdesc: "" });
//   const [savedTransfers, setSavedTransfers] = useState(() => {
//     const stored = localStorage.getItem("savedTransfers");
//     return stored ? JSON.parse(stored) : [];
//   });
//   const [items, setItems] = useState([
//     {
//       materialId: "",
//       description: "",
//       baseUnit: "",
//       price: "",
//       quantity: "",
//       deliveryDate: "",
//       lotNo: "",
//       text: "",
//     },
//   ]);
//   const [searchRowIndex, setSearchRowIndex] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");

//   useEffect(() => {
//     localStorage.setItem("savedTransfers", JSON.stringify(savedTransfers));
//   }, [savedTransfers]);

//   const handleCategoryChange = (e) => {
//     const val = e.target.value;
//     setFormData({ category: val, catdesc: categoryDescriptions[val] || "" });
//   };

//   const handleItemChange = (i, field, val) => {
//     const updated = [...items];
//     updated[i][field] = val;
//     setItems(updated);
//   };

//   const handleAddRow = () => {
//     setItems([
//       ...items,
//       {
//         materialId: "",
//         description: "",
//         baseUnit: "",
//         price: "",
//         quantity: "",
//         deliveryDate: "",
//         lotNo: "",
//         text: "",
//       },
//     ]);
//   };

//   const handleMaterialSelect = (material) => {
//     const updated = [...items];
//     updated[searchRowIndex] = {
//       ...updated[searchRowIndex],
//       materialId: material.materialId,
//       description: material.description,
//       baseUnit: material.baseUnit,
//       price: material.price,
//     };
//     setItems(updated);
//     setShowModal(false);
//     setSearchTerm("");
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const doc = {
//       ...formData,
//       docNumber: document.getElementById("docNumber").value,
//       docDate: document.getElementById("docDate").value,
//       postDate: document.getElementById("postDate").value,
//       reference: document.getElementById("ref").value,
//       location: document.getElementById("location").value,
//       items,
//       date: today,
//     };
//     setSavedTransfers([...savedTransfers, doc]);
//     setItems([
//       {
//         materialId: "",
//         description: "",
//         baseUnit: "",
//         price: "",
//         quantity: "",
//         deliveryDate: "",
//         lotNo: "",
//         text: "",
//       },
//     ]);
//     alert("Saved!");
//   };

//   const filteredMaterials = materialList.filter((m) =>
//     [m.materialId, m.description].join(" ").toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="container p-3">
//       <h6>Goods Transfer</h6>
//       <form onSubmit={handleSubmit}>
//         {/* Header Fields */}
//         <div className="row mb-2">
//           <div className="col-md-3">
//             <label>Category</label>
//             <select className="form-select" value={formData.category} onChange={handleCategoryChange}>
//               <option value="">Select</option>
//               <option value="Transfer">Goods Transfer</option>
//               <option value="Delivery">Dispaly</option>
//               <option value="Cancel">Cancel</option>
//             </select>
//           </div>
//           <div className="col-md-3">
//             <label>Description</label>
//             <input className="form-control" value={formData.catdesc} readOnly />
//           </div>
//           <div className="col-md-3">
//             <label>Document No</label>
//             <input id="docNumber" className="form-control" required />
//           </div>
//           <div className="col-md-3">
//             <label>Document Date</label>
//             <input id="docDate" type="date" defaultValue={today} className="form-control" />
//           </div>
//           <div className="col-md-3">
//             <label>Posting Date</label>
//             <input id="postDate" type="date" defaultValue={today} className="form-control" />
//           </div>
//           <div className="col-md-3">
//             <label>REF</label>
//             <input id="ref" className="form-control" />
//           </div>
//           <div className="col-md-3">
//             <label>Location</label>
//             <input id="location" className="form-control" />
//           </div>
//         </div>

//         {/* Item Table */}
//         <table className="table table-bordered">
//           <thead>
//             <tr>
//               <th>#</th>
//               <th>Material ID</th>
//               <th>Description</th>
//               <th>Qty</th>
//               <th>UOM</th>
//               <th>Del Date</th>
//               <th>Lot No</th>
//               <th>Price</th>
//               <th>Text</th>
//             </tr>
//           </thead>
//           <tbody>
//             {items.map((item, i) => (
//               <tr key={i}>
//                 <td>{i + 1}</td>
//                 <td>
//                   <div className="input-group">
//                     <input className="form-control" value={item.materialId} readOnly />
//                     <button
//                       type="button"
//                       className="btn btn-outline-secondary"
//                       onClick={() => {
//                         setSearchRowIndex(i);
//                         setShowModal(true);
//                       }}
//                     >
//                       🔍
//                     </button>
//                   </div>
//                 </td>
//                 <td><input className="form-control" value={item.description} readOnly /></td>
//                 <td><input className="form-control" value={item.quantity} onChange={(e) => handleItemChange(i, "quantity", e.target.value)} /></td>
//                 <td><input className="form-control" value={item.baseUnit} readOnly /></td>
//                 <td><input className="form-control" type="date" value={item.deliveryDate} onChange={(e) => handleItemChange(i, "deliveryDate", e.target.value)} /></td>
//                 <td><input className="form-control" value={item.lotNo} onChange={(e) => handleItemChange(i, "lotNo", e.target.value)} /></td>
//                 <td><input className="form-control" value={item.price} readOnly /></td>
//                 <td><input className="form-control" value={item.text} onChange={(e) => handleItemChange(i, "text", e.target.value)} /></td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         <button type="button" className="btn btn-sm btn-secondary mb-2" onClick={handleAddRow}>+ Add Row</button>
//         <div className="text-end">
//           <button type="submit" className="btn btn-success">Save</button>
//         </div>
//       </form>

//       {/* Saved Transfers Display */}
//       {savedTransfers.length > 0 && (
//         <div className="mt-4 saved-transfer-card">
//           <h6>Saved Goods Transfers</h6>
//           <table className="table table-bordered table-sm">
//             <thead>
//               <tr>
//                 <th>Doc No</th>
//                 <th>Category</th>
//                 <th>Description</th>
//                 <th>Date</th>
//                 <th>Location</th>
//                 <th>Items</th>
//               </tr>
//             </thead>
//             <tbody>
//               {savedTransfers.map((t, i) => (
//                 <tr key={i}>
//                   <td>{t.docNumber}</td>
//                   <td>{t.category}</td>
//                   <td>{t.catdesc}</td>
//                   <td>{t.docDate}</td>
//                   <td>{t.location}</td>
//                   <td>
//                     <ul className="list-unstyled mb-0">
//                       {t.items.map((item, idx) => (
//                         <li key={idx}>{item.materialId} ({item.quantity} {item.baseUnit})</li>
//                       ))}
//                     </ul>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {/* Material Search Modal */}
//       {showModal && (
//         <div className="custom-modal-overlay">
//           <div className="custom-modal">
//             <div className="modal-header bg-dark text-white d-flex justify-content-between">
//               <h5 className="m-0">Search Material</h5>
//               <button className="btn-close btn-close-white" onClick={() => setShowModal(false)} />
//             </div>
//             <div className="modal-body p-3">
//               <input
//                 type="text"
//                 className="form-control mb-2"
//                 placeholder="Search Material ID or Description"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//               <table className="table table-hover table-sm">
//                 <thead>
//                   <tr>
//                     <th>Material ID</th>
//                     <th>Description</th>
//                     <th>UOM</th>
//                     <th>Price</th>
//                     <th>Select</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredMaterials.map((mat, idx) => (
//                     <tr key={idx}>
//                       <td>{mat.materialId}</td>
//                       <td>{mat.description}</td>
//                       <td>{mat.baseUnit}</td>
//                       <td>{mat.price}</td>
//                       <td>
//                         <button className="btn btn-sm btn-primary" onClick={() => handleMaterialSelect(mat)}>Select</button>
//                       </td>
//                     </tr>
//                   ))}
//                   {filteredMaterials.length === 0 && (
//                     <tr>
//                       <td colSpan="5" className="text-center text-danger">No materials found.</td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* CSS Section */}
//       <style>{`
//         .custom-modal-overlay {
//           position: fixed;
//           top: 0; left: 0;
//           width: 100vw; height: 100vh;
//           background: rgba(0, 0, 0, 0.5);
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           z-index: 1050;
//         }
//         .custom-modal {
//           background: #fff;
//           width: 70%;
//           max-height: 80vh;
//           overflow-y: auto;
//           border-radius: 10px;
//           box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
//           padding: 20px;
//           animation: slideIn 0.3s ease-in-out;
//         }
//         @keyframes slideIn {
//           from { transform: translateY(-20px); opacity: 0; }
//           to { transform: translateY(0); opacity: 1; }
//         }
//         .modal-header {
//           border-bottom: 1px solid #ccc;
//           padding-bottom: 10px;
//           margin-bottom: 15px;
//         }
//         .saved-transfer-card {
//           background: #f9f9f9;
//           border: 1px solid #ddd;
//           border-radius: 8px;
//           padding: 15px;
//           box-shadow: 0 2px 8px rgba(0,0,0,0.05);
//         }
//         .saved-transfer-card h6 {
//           margin-bottom: 10px;
//           font-weight: 600;
//           border-bottom: 1px solid #ccc;
//           padding-bottom: 5px;
//         }
//       `}</style>
//     </div>
//   );
// }

// export default GoodsTransfer;


import React, { useState, useEffect } from "react";

const materialList = [
  {
    _id: "686240650d603136544047a1",
    materialId: "MMNR-100005",
    description: "newww",
    baseUnit: "Piece",
    orderUnit: "Piece",
    price: 1200,
  },
  {
    _id: "686240650d603136544047a2",
    materialId: "MMNR-100006",
    description: "washing machine",
    baseUnit: "Piece",
    orderUnit: "Piece",
    price: 25000,
  },
];

const categoryDescriptions = {
  Transfer: "Internal stock transfer",
  Dispaly: "Customer delivery",
  Cancel: "Cancelled dispatch",
};

function GoodsTransfer() {
  const today = new Date().toISOString().split("T")[0];
  const [formData, setFormData] = useState({ category: "", catdesc: "" });
  const [savedTransfers, setSavedTransfers] = useState(() => {
    const stored = localStorage.getItem("savedTransfers");
    return stored ? JSON.parse(stored) : [];
  });
  const [items, setItems] = useState([
    {
      materialId: "",
      description: "",
      baseUnit: "",
      price: "",
      quantity: "",
      deliveryDate: "",
      lotNo: "",
      text: "",
    },
  ]);
  const [searchRowIndex, setSearchRowIndex] = useState(null);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [searchType, setSearchType] = useState("materialId");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    localStorage.setItem("savedTransfers", JSON.stringify(savedTransfers));
  }, [savedTransfers]);

  const handleCategoryChange = (e) => {
    const val = e.target.value;
    setFormData({ category: val, catdesc: categoryDescriptions[val] || "" });
  };

  const handleItemChange = (i, field, val) => {
    const updated = [...items];
    updated[i][field] = val;
    setItems(updated);
  };

  const handleAddRow = () => {
    setItems([
      ...items,
      {
        materialId: "",
        description: "",
        baseUnit: "",
        price: "",
        quantity: "",
        deliveryDate: "",
        lotNo: "",
        text: "",
      },
    ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const doc = {
      ...formData,
      docNumber: document.getElementById("docNumber").value,
      docDate: document.getElementById("docDate").value,
      postDate: document.getElementById("postDate").value,
      reference: document.getElementById("ref").value,
      location: document.getElementById("location").value,
      items,
      date: today,
    };
    setSavedTransfers([...savedTransfers, doc]);
    setItems([
      {
        materialId: "",
        description: "",
        baseUnit: "",
        price: "",
        quantity: "",
        deliveryDate: "",
        lotNo: "",
        text: "",
      },
    ]);
    alert("Saved!");
  };

  // Modal handlers
  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
    const filtered = materialList.filter((mat) =>
      mat[searchType]?.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setSearchResults(filtered);
  };

  const handleViewAll = () => {
    setSearchResults(materialList);
  };

  const handleClearResults = () => {
    setSearchQuery("");
    setSearchResults([]);
  };

  const closeSearchModal = () => {
    setShowSearchModal(false);
    setSearchQuery("");
    setSearchResults([]);
  };

  const selectMaterialFromSearch = (material) => {
    const updated = [...items];
    updated[searchRowIndex] = {
      ...updated[searchRowIndex],
      materialId: material.materialId,
      description: material.description,
      baseUnit: material.baseUnit,
      price: material.price,
    };
    setItems(updated);
    closeSearchModal();
  };

  return (
    <div className="container p-3">
      <h6>Goods Transfer</h6>
      <form onSubmit={handleSubmit}>
        {/* Header Fields */}
        <div className="row mb-2">
          <div className="col-md-3">
            <label>Category</label>
            <select className="form-select" value={formData.category} onChange={handleCategoryChange}>
              <option value="">Select</option>
              <option value="Transfer">Goods Transfer</option>
              <option value="Delivery">Dispaly</option>
              <option value="Cancel">Cancel</option>
            </select>
          </div>
          <div className="col-md-3">
            <label>Description</label>
            <input className="form-control" value={formData.catdesc} readOnly />
          </div>
          <div className="col-md-3">
            <label>Document No</label>
            <input id="docNumber" className="form-control" required />
          </div>
          <div className="col-md-3">
            <label>Document Date</label>
            <input id="docDate" type="date" defaultValue={today} className="form-control" />
          </div>
          <div className="col-md-3">
            <label>Posting Date</label>
            <input id="postDate" type="date" defaultValue={today} className="form-control" />
          </div>
          <div className="col-md-3">
            <label>REF</label>
            <input id="ref" className="form-control" />
          </div>
          <div className="col-md-3">
            <label>Location</label>
            <input id="location" className="form-control" />
          </div>
        </div>

        {/* Item Table */}
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>#</th>
              <th>Material ID</th>
              <th>Description</th>
              <th>Qty</th>
              <th>UOM</th>
              <th>Del Date</th>
              <th>Lot No</th>
              <th>Value</th>
              <th>Text</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>
                  <div className="input-group">
                    <input className="form-control" value={item.materialId} readOnly />
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => {
                        setSearchRowIndex(i);
                        setShowSearchModal(true);
                      }}
                    >
                      🔍
                    </button>
                  </div>
                </td>
                <td><input className="form-control" value={item.description} readOnly /></td>
                <td><input className="form-control" value={item.quantity} onChange={(e) => handleItemChange(i, "quantity", e.target.value)} /></td>
                <td><input className="form-control" value={item.baseUnit} readOnly /></td>
                <td><input className="form-control" type="date" value={item.deliveryDate} onChange={(e) => handleItemChange(i, "deliveryDate", e.target.value)} /></td>
                <td><input className="form-control" value={item.lotNo} onChange={(e) => handleItemChange(i, "lotNo", e.target.value)} /></td>
                <td><input className="form-control" value={item.price} readOnly /></td>
                <td><input className="form-control" value={item.text} onChange={(e) => handleItemChange(i, "text", e.target.value)} /></td>
              </tr>
            ))}
          </tbody>
        </table>
        <button type="button" className="btn btn-sm btn-secondary mb-2" onClick={handleAddRow}>+ Add Row</button>
        <div className="text-end">
          <button type="submit" className="btn btn-success">Save</button>
        </div>
      </form>

      {/* Saved Transfers Display */}
      {savedTransfers.length > 0 && (
        <div className="mt-4 saved-transfer-card">
          <h6>Saved Goods Transfers</h6>
          <table className="table table-bordered table-sm">
            <thead>
              <tr>
                <th>Doc No</th>
                <th>Category</th>
                <th>Description</th>
                <th>Date</th>
                <th>Location</th>
                <th>Items</th>
              </tr>
            </thead>
            <tbody>
              {savedTransfers.map((t, i) => (
                <tr key={i}>
                  <td>{t.docNumber}</td>
                  <td>{t.category}</td>
                  <td>{t.catdesc}</td>
                  <td>{t.docDate}</td>
                  <td>{t.location}</td>
                  <td>
                    <ul className="list-unstyled mb-0">
                      {t.items.map((item, idx) => (
                        <li key={idx}>{item.materialId} ({item.quantity} {item.baseUnit})</li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Material Search Modal */}
      {showSearchModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-xl">
            <div className="modal-content">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">
                  <i className="fas fa-search me-2"></i>Search Materials
                </h5>
                <button type="button" className="btn-close btn-close-white" onClick={closeSearchModal}></button>
              </div>
              <div className="modal-body">
                <div className="row mb-3">
                  <div className="col-md-3">
                    <label className="form-label">Search Type</label>
                    <select className="form-select" value={searchType} onChange={(e) => setSearchType(e.target.value)}>
                      <option value="materialId">Material ID</option>
                      <option value="description">Description</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Search Query</label>
                    <div className="input-group">
                      <span className="input-group-text"><i className="fas fa-search"></i></span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder={searchType === 'materialId' ? 'Enter Material ID...' : 'Search by Description...'}
                        value={searchQuery}
                        onChange={handleSearchInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-3 d-flex align-items-end">
                    <div className="d-flex gap-2">
                      <button className="btn btn-info" onClick={handleViewAll}><i className="fas fa-list me-1"></i>View All</button>
                      {searchResults.length > 0 && (
                        <button className="btn btn-outline-secondary" onClick={handleClearResults}>
                          <i className="fas fa-times me-1"></i>Clear
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                  {searchResults.length > 0 ? (
                    <table className="table table-hover">
                      <thead className="table-light sticky-top">
                        <tr>
                          <th>Material ID</th>
                          <th>Description</th>
                          <th>Base Unit</th>
                          <th>Price</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {searchResults.map((material, idx) => (
                          <tr key={idx}>
                            <td><span className="badge bg-dark">{material.materialId}</span></td>
                            <td>{material.description}</td>
                            <td>{material.baseUnit}</td>
                            <td>{material.price}</td>
                            <td>
                              <button className="btn btn-success btn-sm" onClick={() => selectMaterialFromSearch(material)}>
                                <i className="fas fa-check me-1"></i>Select
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <div className="text-center py-4 text-muted">
                      <i className="fas fa-search fa-2x mb-3"></i>
                      <p>{searchQuery ? `No materials found matching "${searchQuery}"` : 'Enter search term or click "View All"'}</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeSearchModal}>
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

export default GoodsTransfer;

