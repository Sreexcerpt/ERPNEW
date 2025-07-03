// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function SalesOrderForm() {
//   const [categories, setCategories] = useState([]);
//   const [quotations, setQuotations] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [selectedQuotationNumber, setSelectedQuotationNumber] = useState('');
//   const [soNumber, setSoNumber] = useState('');
//   const [date] = useState(new Date().toISOString().substring(0, 10));
//   const [customerName, setCustomerName] = useState('');
//   const [deliveryLocation, setDeliveryLocation] = useState('');
//   const [deliveryAddress, setDeliveryAddress] = useState('');
//   const [items, setItems] = useState([]);
//   const [total, setTotal] = useState(0);

//   const [taxes, setTaxes] = useState([]);
//   const [selectedTax, setSelectedTax] = useState(null);
//   const [cgst, setCgst] = useState(0);
//   const [sgst, setSgst] = useState(0);
//   const [igst, setIgst] = useState(0);
//   const [taxDiscount, setTaxDiscount] = useState(0);
//   const [finalTotal, setFinalTotal] = useState(0);

//   useEffect(() => {
//     axios.get('http://localhost:8080/api/sales-order-categories').then(res => setCategories(res.data));
//     axios.get('http://localhost:8080/api/salesquotations').then(res => setQuotations(res.data));
//     axios.get('http://localhost:8080/api/tax').then(res => setTaxes(res.data));
//   }, []);

//   const handleQuotationChange = (quotationNumber) => {
//     setSelectedQuotationNumber(quotationNumber);
//     const quotation = quotations.find(q => q.quotationNumber === quotationNumber);
//     if (quotation) {
//       setCustomerName(quotation.customerName);
//       setDeliveryLocation(quotation.items[0]?.location || '');

//       const mappedItems = quotation.items.map(item => ({
//         materialId: item.materialId,
//         description: item.description,
//         quantity: item.qty,
//         baseUnit: item.baseUnit,
//         unit: item.unit,
//         orderUnit: item.orderUnit,
//         price: parseFloat(item.price),
//         deliveryDate: new Date().toISOString().slice(0, 10)
//       }));

//       setItems(mappedItems);
//       recalculateTotal(mappedItems);
//     }
//   };

//   const handleItemChange = (index, field, value) => {
//     const updatedItems = [...items];
//     updatedItems[index][field] = (field === 'quantity' || field === 'price') ? parseFloat(value) || 0 : value;
//     setItems(updatedItems);
//     recalculateTotal(updatedItems);
//   };

//   const recalculateTotal = (updatedItems) => {
//     const subtotal = updatedItems.reduce((sum, item) => sum + (item.quantity || 0) * (item.price || 0), 0);
//     setTotal(subtotal.toFixed(2));

//     const cgstVal = (subtotal * (parseFloat(cgst) || 0)) / 100;
//     const sgstVal = (subtotal * (parseFloat(sgst) || 0)) / 100;
//     const igstVal = (subtotal * (parseFloat(igst) || 0)) / 100;
//     const discountVal = parseFloat(taxDiscount) || 0;

//     const final = subtotal + cgstVal + sgstVal + igstVal - discountVal;
//     setFinalTotal(final.toFixed(2));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!selectedCategory || !selectedQuotationNumber) {
//       return alert('Please select both category and quotation');
//     }

//     const selectedQuotation = quotations.find(q => q.quotationNumber === selectedQuotationNumber);

//     const data = {
//       soNumber,
//       quotationId: selectedQuotation._id,
//       quotationNumber: selectedQuotationNumber,
//       categoryId: selectedCategory._id,
//       category: selectedCategory.categoryName,
//       date,
//       customerName,
//       deliveryLocation,
//       deliveryAddress,
//       items,
//       total: parseFloat(total),
//       taxName: selectedTax?.taxName || '',
//       cgst: parseFloat(cgst),
//       sgst: parseFloat(sgst),
//       igst: parseFloat(igst),
//       taxDiscount: parseFloat(taxDiscount),
//       finalTotal: parseFloat(finalTotal)
//     };

//     try {
//       const res = await axios.post('http://localhost:8080/api/sales-orders', data);
//       alert('Sales Order Created Successfully!');
//       setSoNumber(res.data.soNumber);
//     } catch (err) {
//       console.error('Error:', err);
//       alert('Failed to create Sales Order');
//     }
//   };

//   return (
//     <div style={{ padding: 20, marginLeft: "300px" }}>
//       <h2>Sales Order Form</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Quotation Number:</label>
//           <select onChange={(e) => handleQuotationChange(e.target.value)} required>
//             <option value="">-- Select Quotation --</option>
//             {quotations.map(q => (
//               <option key={q._id} value={q.quotationNumber}>{q.quotationNumber}</option>
//             ))}
//           </select>
//         </div>

//         <div>
//           <label>Category:</label>
//           <select onChange={(e) => {
//             const cat = categories.find(c => c._id === e.target.value);
//             setSelectedCategory(cat);
//           }} required>
//             <option value="">-- Select Category --</option>
//             {categories.map(c => (
//               <option key={c._id} value={c._id}>{c.categoryName}</option>
//             ))}
//           </select>
//         </div>

//         <div><label>SO Number:</label> <input value={soNumber} readOnly /></div>
//         <div><label>Date:</label> <input value={date} readOnly /></div>
//         <div><label>Customer:</label> <input value={customerName} readOnly /></div>
//         <div><label>Delivery Location:</label> <input value={deliveryLocation} onChange={(e) => setDeliveryLocation(e.target.value)} /></div>

//         <h4>Items</h4>
//         <table border="1" cellPadding="6" style={{ width: '100%', marginBottom: '10px' }}>
//           <thead>
//             <tr>
//               <th>#</th><th>Material ID</th><th>Description</th><th>Qty</th><th>Base Unit</th><th>Unit</th><th>Order Unit</th><th>Price</th><th>Amount</th><th>Delivery Date</th>
//             </tr>
//           </thead>
//           <tbody>
//             {items.map((item, idx) => (
//               <tr key={idx}>
//                 <td>{idx + 1}</td>
//                 <td>{item.materialId}</td>
//                 <td>{item.description}</td>
//                 <td><input type="number" value={item.quantity} onChange={(e) => handleItemChange(idx, 'quantity', e.target.value)} /></td>
//                 <td>{item.baseUnit}</td>
//                 <td>{item.unit}</td>
//                 <td>{item.orderUnit}</td>
//                 <td><input type="number" value={item.price} onChange={(e) => handleItemChange(idx, 'price', e.target.value)} /></td>
//                 <td>{(item.quantity * item.price).toFixed(2)}</td>
//                 <td><input type="date" value={item.deliveryDate} onChange={(e) => handleItemChange(idx, 'deliveryDate', e.target.value)} /></td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         <div>
//           <label>Delivery Address:</label>
//           <input value={deliveryAddress} onChange={(e) => setDeliveryAddress(e.target.value)} style={{ width: '100%' }} />
//         </div>

//         <div style={{ marginTop: 20, display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
//           <div>
//             <label>Tax Name:</label>
//             <select onChange={(e) => {
//               const tax = taxes.find(t => t.taxName === e.target.value);
//               setSelectedTax(tax);
//               setCgst(tax?.cgst || 0);
//               setSgst(tax?.sgst || 0);
//               setIgst(tax?.igst || 0);
//               recalculateTotal(items);
//             }}>
//               <option value="">-- Select Tax --</option>
//               {taxes.map(t => (
//                 <option key={t._id} value={t.taxName}>{t.taxName}</option>
//               ))}
//             </select>
//           </div>
//           <div><label>CGST (%):</label> <input type="number" value={cgst} onChange={(e) => { setCgst(e.target.value); recalculateTotal(items); }} /></div>
//           <div><label>SGST (%):</label> <input type="number" value={sgst} onChange={(e) => { setSgst(e.target.value); recalculateTotal(items); }} /></div>
//           <div><label>IGST (%):</label> <input type="number" value={igst} onChange={(e) => { setIgst(e.target.value); recalculateTotal(items); }} /></div>
//           <div><label>Tax Discount:</label> <input type="number" value={taxDiscount} onChange={(e) => { setTaxDiscount(e.target.value); recalculateTotal(items); }} /></div>
//         </div>

//         <div style={{ marginTop: 10 }}>
//           <strong>Subtotal: ₹{total}</strong><br />
//           <strong>Final Total (after taxes & discount): ₹{finalTotal}</strong>
//         </div>

//         <button type="submit" style={{ marginTop: 20 }}>Submit Sales Order</button>
//       </form>
//     </div>
//   );
// }

// export default SalesOrderForm;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function SalesOrderForm() {
//   const [categories, setCategories] = useState([]);
//   const [quotations, setQuotations] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [selectedQuotationNumber, setSelectedQuotationNumber] = useState('');
//   const [soNumber, setSoNumber] = useState('');
//   const [date] = useState(new Date().toISOString().substring(0, 10));
//   const [customerName, setCustomerName] = useState('');
//   const [deliveryLocation, setDeliveryLocation] = useState('');
//   const [deliveryAddress, setDeliveryAddress] = useState('');
//   const [items, setItems] = useState([]);
//   const [total, setTotal] = useState(0);

//   const [taxes, setTaxes] = useState([]);
//   const [selectedTax, setSelectedTax] = useState(null);
//   const [cgst, setCgst] = useState(0);
//   const [sgst, setSgst] = useState(0);
//   const [igst, setIgst] = useState(0);
//   const [taxDiscount, setTaxDiscount] = useState(0);
//   const [finalTotal, setFinalTotal] = useState(0);

//   const [materials, setMaterials] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [materialSearch, setMaterialSearch] = useState('');
//   const [selectedItemIndex, setSelectedItemIndex] = useState(null);

//   useEffect(() => {
//     axios.get('http://localhost:8080/api/sales-order-categories').then(res => setCategories(res.data));
//     axios.get('http://localhost:8080/api/salesquotations').then(res => setQuotations(res.data));
//     axios.get('http://localhost:8080/api/tax').then(res => setTaxes(res.data));
//     axios.get('http://localhost:8080/api/material').then(res => setMaterials(res.data));
//   }, []);

//   const handleQuotationChange = (quotationNumber) => {
//     setSelectedQuotationNumber(quotationNumber);
//     const quotation = quotations.find(q => q.quotationNumber === quotationNumber);
//     if (quotation) {
//       setCustomerName(quotation.customerName);
//       setDeliveryLocation(quotation.items[0]?.location || '');

//       const mappedItems = quotation.items.map(item => ({
//         materialId: item.materialId,
//         description: item.description,
//         quantity: item.qty,
//         baseUnit: item.baseUnit,
//         unit: item.unit,
//         orderUnit: item.orderUnit,
//         price: parseFloat(item.price),
//         deliveryDate: new Date().toISOString().slice(0, 10),
//       }));

//       setItems(mappedItems);
//       recalculateTotal(mappedItems);
//     }
//   };

//   const handleItemChange = (index, field, value) => {
//     const updatedItems = [...items];
//     updatedItems[index][field] = (field === 'quantity' || field === 'price') ? parseFloat(value) || 0 : value;
//     setItems(updatedItems);
//     recalculateTotal(updatedItems);
//   };

//   const recalculateTotal = (updatedItems) => {
//     const subtotal = updatedItems.reduce((sum, item) => sum + (item.quantity || 0) * (item.price || 0), 0);
//     setTotal(subtotal.toFixed(2));

//     const cgstVal = (subtotal * (parseFloat(cgst) || 0)) / 100;
//     const sgstVal = (subtotal * (parseFloat(sgst) || 0)) / 100;
//     const igstVal = (subtotal * (parseFloat(igst) || 0)) / 100;
//     const discountVal = parseFloat(taxDiscount) || 0;

//     const final = subtotal + cgstVal + sgstVal + igstVal - discountVal;
//     setFinalTotal(final.toFixed(2));
//   };

//   const addItem = () => {
//     setItems([...items, {
//       materialId: '', description: '', quantity: 0, baseUnit: '', unit: '', orderUnit: '', price: 0, priceUnit: '', deliveryDate: new Date().toISOString().slice(0, 10),
//     }]);
//   };

//   const deleteItem = (index) => {
//     const updatedItems = [...items];
//     updatedItems.splice(index, 1);
//     setItems(updatedItems);
//     recalculateTotal(updatedItems);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!selectedCategory || !selectedQuotationNumber) return alert('Please select both category and quotation');

//     const selectedQuotation = quotations.find(q => q.quotationNumber === selectedQuotationNumber);

//     const data = {
//       soNumber,
//       quotationId: selectedQuotation?._id,
//       quotationNumber: selectedQuotationNumber,
//       categoryId: selectedCategory._id,
//       category: selectedCategory.categoryName,
//       date,
//       customerName,
//       deliveryLocation,
//       deliveryAddress,
//       items,
//       total: parseFloat(total),
//       taxName: selectedTax?.taxName || '',
//       cgst: parseFloat(cgst),
//       sgst: parseFloat(sgst),
//       igst: parseFloat(igst),
//       taxDiscount: parseFloat(taxDiscount),
//       finalTotal: parseFloat(finalTotal),
//     };

//     try {
//       const res = await axios.post('http://localhost:8080/api/sales-orders', data);
//       alert('Sales Order Created Successfully!');
//       setSoNumber(res.data.soNumber);
//     } catch (err) {
//       console.error('Error:', err);
//       alert('Failed to create Sales Order');
//     }
//   };

//   const MaterialModal = () => {
//     const filteredMaterials = materials.filter(mat =>
//       mat.materialId.toLowerCase().includes(materialSearch.toLowerCase()) ||
//       mat.description.toLowerCase().includes(materialSearch.toLowerCase())
//     );

//     const selectMaterial = (material) => {
//       const updatedItems = [...items];
//       updatedItems[selectedItemIndex] = {
//         ...updatedItems[selectedItemIndex],
//         materialId: material.materialId,
//         description: material.description,
//         baseUnit: material.baseUnit,
//         unit: material.unit,
//         price: material.price,
//       };
//       setItems(updatedItems);
//       recalculateTotal(updatedItems);
//       setShowModal(false);
//     };

//     return (
//       <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
//         <div style={{ background: 'white', padding: 20, maxHeight: '80%', overflowY: 'auto', width: '80%' }}>
//           <h3>Select Material</h3>
//           <input
//             type="text"
//             placeholder="Search by ID or Description"
//             value={materialSearch}
//             onChange={(e) => setMaterialSearch(e.target.value)}
//             style={{ width: '100%', marginBottom: 10 }}
//           />
//           <table border="1" cellPadding="6" style={{ width: '100%' }}>
//             <thead>
//               <tr>
//                 <th>Material ID</th>
//                 <th>Description</th>
//                 <th>Base Unit</th>
//                 <th>Unit</th>
//                 <th>Price</th>
//                 <th>Select</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredMaterials.map((mat, i) => (
//                 <tr key={i}>
//                   <td>{mat.materialId}</td>
//                   <td>{mat.description}</td>
//                   <td>{mat.baseUnit}</td>
//                   <td>{mat.unit}</td>
//                   <td>{mat.price}</td>
//                   <td><button type="button" onClick={() => selectMaterial(mat)}>Select</button></td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//           <button type="button" onClick={() => setShowModal(false)} style={{ marginTop: 10 }}>Close</button>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className='content'>
//       <h2>Sales Order Form</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="row">
//           <div className='col-xl-3'>
//             <label>Quotation Number:</label>
//             <select className='form-select' onChange={(e) => handleQuotationChange(e.target.value)} required>
//               <option value="">-- Select Quotation --</option>
//               {quotations.map(q => (
//                 <option key={q._id} value={q.quotationNumber}>{q.quotationNumber}</option>
//               ))}
//             </select>
//           </div>

//           <div className='col-xl-3'>
//             <label>Category:</label>
//             <select className='form-control' onChange={(e) => {
//               const cat = categories.find(c => c._id === e.target.value);
//               setSelectedCategory(cat);
//             }} required>
//               <option value="">-- Select Category --</option>
//               {categories.map(c => (
//                 <option key={c._id} value={c._id}>{c.categoryName}</option>
//               ))}
//             </select>
//           </div>

//           <div className='col-xl-3'><label>SO Number:</label> <input className='form-control' value={soNumber} readOnly /></div>
//           <div className='col-xl-3'><label>Date:</label> <input className='form-control' value={date} readOnly /></div>
//           <div className='col-xl-3'><label>Customer:</label> <input className='form-control' value={customerName} readOnly /></div>
//           <div className='col-xl-3'><label>Delivery Location:</label> <input className='form-control' value={deliveryLocation} onChange={(e) => setDeliveryLocation(e.target.value)} /></div>
//         </div>
//         <h4>Items</h4>
//         <div className='table-responsive'>
//           <table className='table table-sm table-bordered'>
//             <thead>
//               <tr>
//                 <th>#</th><th>Material ID</th><th>Description</th><th>Qty</th><th>Base Unit</th>
//                 <th>Unit</th><th>Order Unit</th><th>Price</th>  <th>Price Unit</th> {/* 👈 Add this */}<th>Amount</th>
//                 <th>Delivery Date</th><th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {items.map((item, idx) => (
//                 <tr key={idx}>
//                   <td>{idx + 1}</td>
//                   <td>
//                     <input
//                       value={item.materialId}
//                       readOnly
//                        className='form-control'
//                       onClick={() => {
//                         setSelectedItemIndex(idx);
//                         setShowModal(true);
//                       }}
//                       style={{ cursor: 'pointer', backgroundColor: '#f9f9f9' }}
//                     />
//                   </td>
//                   <td>
//                     <input  className='form-control' value={item.description} onChange={(e) => handleItemChange(idx, 'description', e.target.value)} />
//                   </td>
//                   <td>
//                     <input  className='form-control' type="number" value={item.quantity} onChange={(e) => handleItemChange(idx, 'quantity', e.target.value)} />
//                   </td>
//                   <td>
//                     <input  className='form-control' value={item.baseUnit} onChange={(e) => handleItemChange(idx, 'baseUnit', e.target.value)} />
//                   </td>
//                   <td>
//                     <input  className='form-control' value={item.unit} onChange={(e) => handleItemChange(idx, 'unit', e.target.value)} />
//                   </td>
//                   <td>
//                     <input className='form-control' value={item.orderUnit} onChange={(e) => handleItemChange(idx, 'orderUnit', e.target.value)} />
//                   </td>
//                   <td>
//                     <input  className='form-control' type="number" value={item.price} onChange={(e) => handleItemChange(idx, 'price', e.target.value)} />
//                   </td>
//                   <td>
//                     <select
//                       value={item.priceUnit}
//                       onChange={(e) => handleItemChange(idx, 'priceUnit', e.target.value)}
//                       required
//                        className='form-select'
//                     >
//                       <option value="">--Select--</option>
//                       <option value="INR">INR</option>
//                       <option value="USD">USD</option>
//                       <option value="OTHER">OTHER</option>
//                     </select>
//                   </td>
//                   <td>{(item.quantity * item.price).toFixed(2)}</td>
//                   <td>
//                     <input  className='form-control'  type="date" value={item.deliveryDate} onChange={(e) => handleItemChange(idx, 'deliveryDate', e.target.value)} />
//                   </td>
//                   <td><button className='btn btn-sm btn-outline-danger' type="button" onClick={() => deleteItem(idx)}>Delete</button></td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>


//         <button type="button" className='btn btn-outline-info mt-2' onClick={addItem}>+ Add Item</button>

//         <div className='col-xl-4 mt-2'>
//           <label>Delivery Address:</label>
//           <textarea value={deliveryAddress} onChange={(e) => setDeliveryAddress(e.target.value)} className='form-control' ></textarea>
//         </div>

//         <div className='col-xl-1 ms-auto'>
//           <div>
//             <label>Tax Name:</label>
//             <select className='form-select' onChange={(e) => {
//               const tax = taxes.find(t => t.taxName === e.target.value);
//               setSelectedTax(tax);
//               setCgst(tax?.cgst || 0);
//               setSgst(tax?.sgst || 0);
//               setIgst(tax?.igst || 0);
//               recalculateTotal(items);
//             }}>
//               <option value="">-- Select Tax --</option>
//               {taxes.map(t => (
//                 <option key={t._id} value={t.taxName}>{t.taxName}</option>
//               ))}
//             </select>
//           </div>
//           <div><label>CGST (%):</label> <input className='form-control' type="number" value={cgst} onChange={(e) => { setCgst(e.target.value); recalculateTotal(items); }} /></div>
//           <div><label>SGST (%):</label> <input className='form-control' type="number" value={sgst} onChange={(e) => { setSgst(e.target.value); recalculateTotal(items); }} /></div>
//           <div><label>IGST (%):</label> <input className='form-control' type="number" value={igst} onChange={(e) => { setIgst(e.target.value); recalculateTotal(items); }} /></div>
//           <div><label>Tax Discount:</label> <input className='form-control' type="number" value={taxDiscount} onChange={(e) => { setTaxDiscount(e.target.value); recalculateTotal(items); }} /></div>
//         </div>

//         <div className='mt-2 col-xl-2 ms-auto'>
//           <strong>Subtotal: ₹{total}</strong><br />
//           <strong>Final Total: ₹{finalTotal}</strong>
//         </div>
// <div className="col-xl-2 ms-auto">
//         <button type="submit" className='btn btn-success  mt-2 mb-4'>Submit Sales Order</button></div>
//       </form>
//       {showModal && <MaterialModal />}
//     </div>
//   );
// }

// export default SalesOrderForm;


import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SalesOrderForm() {
  const [categories, setCategories] = useState([]);
  const [quotations, setQuotations] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedQuotationNumber, setSelectedQuotationNumber] = useState('');
  const [poNumber, setPoNumber] = useState('');
const [date, setDate] = useState(new Date().toISOString().substring(0, 10));

  const [vendor, setVendor] = useState('');
  const [deliveryLocation, setDeliveryLocation] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [customers, setCustomers] = useState([]);
    const [customer, setCustomer] = useState([]);
const [salesGroups, setsalesGroups] = useState([]);

// Quotation Search States
const [showQuotationModal, setShowQuotationModal] = useState(false);
const [quotationSearchQuery, setQuotationSearchQuery] = useState('');
const [quotationSearchResults, setQuotationSearchResults] = useState([]);

// Vendor Search States  
const [showVendorModal, setShowVendorModal] = useState(false);
const [vendorSearchQuery, setVendorSearchQuery] = useState('');
const [vendorSearchResults, setVendorSearchResults] = useState([]);
  const [salesGroup, setsalesGroup] = useState('');
const [contactPerson, setContactPerson] = useState('');
const [payTerms, setPayTerms] = useState('');
const [validityDate, setValidityDate] = useState('');
const [cgstAmount, setCgstAmount] = useState(0);
const [sgstAmount, setSgstAmount] = useState(0);
const [igstAmount, setIgstAmount] = useState(0);


  // Tax States
  const [taxes, setTaxes] = useState([]);
  const [selectedTax, setSelectedTax] = useState(null);
  const [cgst, setCgst] = useState(0);
  const [sgst, setSgst] = useState(0);
  const [igst, setIgst] = useState(0);
  const [taxDiscount, setTaxDiscount] = useState(0);
  const [finalTotal, setFinalTotal] = useState(0);

  // Material Modal States
  const [materials, setMaterials] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [materialSearch, setMaterialSearch] = useState('');
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8080/api/sales-order-categories').then(res => setCategories(res.data));
   axios.get('http://localhost:8080/api/salesquotations').then(res => {
      setQuotations(res.data);
      
      // Extract unique buyer groups from all quotation items
      const allsalesGroups = [];
      res.data.forEach(quotation => {
        quotation.items.forEach(item => {
          if (item.salesGroup && !allsalesGroups.includes(item.salesGroup)) {
            allsalesGroups.push(item.salesGroup);
          }
        });
      });
      setsalesGroups(allsalesGroups);
    });

    
    axios.get('http://localhost:8080/api/tax').then(res => setTaxes(res.data));
    axios.get('http://localhost:8080/api/material').then(res => setMaterials(res.data));
    axios.get('http://localhost:8080/api/customers').then(res => setCustomers(res.data));
    setItems([
    ...Array(4).fill(null).map(() => ({
      materialId: '',
      description: '',
      quantity: 0,
      baseUnit: '',
      unit: '',
      orderUnit: '',
      price: 0,
      priceUnit: '',
      salesGroup: '',
      materialgroup: '',
      deliveryDate: new Date().toISOString().slice(0, 10),
      note: '',  // ✅ NEW - Individual note field
    }))
  ]);
  }, []);

  const handleQuotationSearch = (query) => {
  setQuotationSearchQuery(query);
  if (query.trim()) {
    const filtered = quotations.filter(q =>
      q.quotationNumber.toLowerCase().includes(query.toLowerCase())
    );
    setQuotationSearchResults(filtered);
  } else {
    setQuotationSearchResults([]);
  }
};

const handleViewAllQuotations = () => {
  setQuotationSearchResults(quotations);
};

const selectQuotationFromSearch = (quotation) => {
  setSelectedQuotationNumber(quotation.quotationNumber);
  handleQuotationChange(quotation.quotationNumber);
  setShowQuotationModal(false);
  setQuotationSearchQuery('');
  setQuotationSearchResults([]);
};

const closeQuotationModal = () => {
  setShowQuotationModal(false);
  setQuotationSearchQuery('');
  setQuotationSearchResults([]);
};

// Vendor Search Handlers
const handleVendorSearch = (query) => {
  setVendorSearchQuery(query);
  if (query.trim()) {
    const filtered = vendors.filter(v =>
      v.
customerName.toLowerCase().includes(query.toLowerCase()) ||
      v.vendorCode.toLowerCase().includes(query.toLowerCase())
    );
    setVendorSearchResults(filtered);
  } else {
    setVendorSearchResults([]);
  }
};

const handleViewAllVendors = () => {
  setVendorSearchResults(vendors);
};

const selectVendorFromSearch = (selectedVendor) => {
  setCustomer(selectedVendor.name1 || selectedVendor.
customerName);
  setShowVendorModal(false);
  setVendorSearchQuery('');
  setVendorSearchResults([]);
};

const closeVendorModal = () => {
  setShowVendorModal(false);
  setVendorSearchQuery('');
  setVendorSearchResults([]);
};

// Updated recalculateTotal function - REPLACE your existing one


// Also update your tax change handlers - ADD these functions
// Replace your existing tax change handlers with these immediate ones:

// Updated recalculateTotal function - accepts tax values directly
const recalculateTotal = (updatedItems, cgstVal, sgstVal, igstVal, discountVal) => {
  const subtotal = updatedItems.reduce((sum, item) => sum + (item.quantity || 0) * (item.price || 0), 0);
  setTotal(subtotal.toFixed(2));

  // Use passed values or current state values
  const finalCgst = cgstVal !== undefined ? cgstVal : cgst;
  const finalSgst = sgstVal !== undefined ? sgstVal : sgst;
  const finalIgst = igstVal !== undefined ? igstVal : igst;
  const finalDiscount = discountVal !== undefined ? discountVal : taxDiscount;

  // Calculate individual tax amounts
  const cgstAmount = (subtotal * (parseFloat(finalCgst) || 0)) / 100;
  const sgstAmount = (subtotal * (parseFloat(finalSgst) || 0)) / 100;
  const igstAmount = (subtotal * (parseFloat(finalIgst) || 0)) / 100;
  const discount = parseFloat(finalDiscount) || 0;

  // Set calculated tax amounts for display
  setCgstAmount(cgstAmount.toFixed(2));
  setSgstAmount(sgstAmount.toFixed(2));
  setIgstAmount(igstAmount.toFixed(2));

  // Calculate final total
  const final = subtotal + cgstAmount + sgstAmount + igstAmount - discount;
  setFinalTotal(final.toFixed(2));
};

// Immediate tax change handlers - NO setTimeout needed
const handleCgstChange = (value) => {
  setCgst(value);
  recalculateTotal(items, value, sgst, igst, taxDiscount);
};

const handleSgstChange = (value) => {
  setSgst(value);
  recalculateTotal(items, cgst, value, igst, taxDiscount);
};

const handleIgstChange = (value) => {
  setIgst(value);
  recalculateTotal(items, cgst, sgst, value, taxDiscount);
};

const handleTaxDiscountChange = (value) => {
  setTaxDiscount(value);
  recalculateTotal(items, cgst, sgst, igst, value);
};

// Also update your tax template selection handler for immediate calculation:
// In your tax template dropdown onChange:


// Update your item change handler to use the new recalculateTotal:
const handleItemChange = (index, field, value) => {
  const updatedItems = [...items];
  updatedItems[index][field] = (field === 'quantity' || field === 'price') ? parseFloat(value) || 0 : value;
  setItems(updatedItems);
  recalculateTotal(updatedItems, cgst, sgst, igst, taxDiscount);
};

  const handleQuotationChange = (quotationNumber) => {
    setSelectedQuotationNumber(quotationNumber);
    const quotation = quotations.find(q => q.quotationNumber === quotationNumber);
    if (quotation) {
      setCustomer(quotation.name1 || quotation.
customerName);
      setDeliveryLocation(quotation.items[0]?.location || '');
 const firstItemWithsalesGroup = quotation.items.find(item => item.salesGroup);
      if (firstItemWithsalesGroup) {
        setsalesGroup(firstItemWithsalesGroup.salesGroup);
      }

      const mappedItems = quotation.items.map(item => ({
        materialId: item.materialId,
        description: item.description,
        quantity: item.qty,
        baseUnit: item.baseUnit,
        unit: item.unit,
        orderUnit: item.orderUnit,
        price: item.price,
        priceUnit: item.priceUnit,

        materialgroup: item.materialgroup,
        deliveryDate: item.deliveryDate ? String(item.deliveryDate).slice(0, 10) : new Date().toISOString().slice(0, 10),
      }));

      setItems(mappedItems);
      recalculateTotal(mappedItems);
    }
  };






  const addItem = () => {
    setItems([
      ...items,
      {
        materialId: '',
        description: '',
        quantity: 0,
        baseUnit: '',
        unit: '',
        orderUnit: '',
        price: 0,
        priceUnit: '',
        salesGroup: '',
        materialgroup: '',
        deliveryDate: new Date().toISOString().slice(0, 10),
      }
    ]);
  };

  const deleteItem = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
    recalculateTotal(updatedItems);
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!selectedCategory || !selectedQuotationNumber) {
  //     return alert('Please select both category and quotation');
  //   }

  //   const selectedQuotation = quotations.find(q => q.quotationNumber === selectedQuotationNumber);

  //   const data = {
  //     poNumber,
  //     quotationId: selectedQuotation?._id,
  //     quotationNumber: selectedQuotationNumber,
  //     categoryId: selectedCategory._id,
  //     category: selectedCategory.categoryName,
  //     date,
  //     vendor,
  //     deliveryLocation,
  //     deliveryAddress,
  //     items,
  //     total: parseFloat(total),
  //     taxName: selectedTax?.taxName || '',
  //     cgst: parseFloat(cgst),
  //     sgst: parseFloat(sgst),
  //     igst: parseFloat(igst),
  //     taxDiscount: parseFloat(taxDiscount),
  //     finalTotal: parseFloat(finalTotal),
  //   };

  //   try {
  //     const res = await axios.post('http://localhost:8080/api/purchase-orders', data);
  //     alert('PO Created Successfully!');
  //     console.log('Saved PO:', res.data);
  //   setSelectedCategory(null);
  // setSelectedQuotationNumber('');
  // setDate(new Date().toISOString().substring(0, 10));
  // setVendor('');
  // setDeliveryLocation('');
  // setDeliveryAddress('');
  // setItems([]);
  // setTotal('');
  // setTaxName('');
  // setCgst('');
  // setSgst('');
  // setIgst('');
  // setTaxDiscount('');
  // setFinalTotal('');
  // setSelectedTax(null);

  //   } catch (err) {
  //     console.error('Error:', err);
  //     alert('Failed to create PO');
  //   }
  // };
const handleSubmit = async (e) => {
  e.preventDefault();

  if (!selectedCategory || !selectedQuotationNumber) {
    return alert('Please select both category and quotation');
  }

  const selectedQuotation = quotations.find(
    (q) => q.quotationNumber === selectedQuotationNumber
  );

  const data = {
    poNumber,
    quotationId: selectedQuotation?._id,
    quotationNumber: selectedQuotationNumber,
    categoryId: selectedCategory._id,
    category: selectedCategory.categoryName,
    date,
    customer,
    contactPerson,
    salesGroup,
    payTerms,
    validityDate,
    deliveryLocation,
    deliveryAddress,
    items,
    total: parseFloat(total) || 0,
    taxName: selectedTax?.taxName || '',
    cgst: parseFloat(cgst) || 0,
    sgst: parseFloat(sgst) || 0,
    igst: parseFloat(igst) || 0,
    taxDiscount: parseFloat(taxDiscount) || 0,
    finalTotal: parseFloat(finalTotal) || 0,
  };

  try {
    const res = await axios.post('http://localhost:8080/api/sales-orders', data);
    console.log('Saved PO:', res.data);

    // ✅ Reset all fields only after successful response
    setSelectedCategory(null);
    setSelectedQuotationNumber('');
    setDate(new Date().toISOString().substring(0, 10));
   
    setCustomer('')
    setDeliveryLocation('');
    setDeliveryAddress('');
    setItems([]);
    setTotal('');
   setSelectedTax(null); 

    setCgst('');
    setSgst('');
    setIgst('');
    setTaxDiscount('');
    setFinalTotal('');
    setSelectedTax(null);
   setPayTerms('');
setsalesGroup('');
setContactPerson('');
    // ✅ Show success message only after everything succeeds
    alert('PO Created Successfully!');
  } catch (err) {
    console.error('Error during PO creation:', err);
    alert('Failed to create PO');
  }
};

  const MaterialModal = () => {
    const filteredMaterials = materials.filter(mat =>
      mat.materialId.toLowerCase().includes(materialSearch.toLowerCase()) ||
      mat.description.toLowerCase().includes(materialSearch.toLowerCase())
    );

    const selectMaterial = (material) => {
      const updatedItems = [...items];
      updatedItems[selectedItemIndex] = {
        ...updatedItems[selectedItemIndex],
        materialId: material.materialId,
        description: material.description,
        baseUnit: material.baseUnit,
        unit: material.unit,
        price: material.price,
        salesGroup: material.salesGroup,
        materialgroup: material.materialgroup,
      };
      setItems(updatedItems);
      recalculateTotal(updatedItems);
      setShowModal(false);
    };

    return (
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex',
        alignItems: 'center', justifyContent: 'center', zIndex: 9999
      }}>
        <div style={{ background: 'white', padding: 20, maxHeight: '80%', overflowY: 'auto', width: '80%' }}>
          <h3>Select Material</h3>
          <input
            type="text"
            placeholder="Search by ID or Description"
            value={materialSearch}
            onChange={(e) => setMaterialSearch(e.target.value)}
            style={{ width: '100%', marginBottom: 10 }}
          />
          <table className='table table-bordered'>
            <thead>
              <tr>
                <th>Material ID</th>
                <th>Description</th>
                <th>Base Unit</th>
                <th>Unit</th>
                <th>Price</th>
                <th>Price Unit</th>
                <th>Sales Group</th>
                <th>Material Group</th>
                <th>Select</th>
              </tr>
            </thead>
            <tbody>
              {filteredMaterials.map((mat, i) => (
                <tr key={i}>
                  <td>{mat.materialId}</td>
                  <td>{mat.description}</td>
                  <td>{mat.baseUnit}</td>
                  <td>{mat.unit}</td>
                  <td>{mat.price}</td>
                  <td>{mat.priceUnit}</td>
                  <td>{mat.salesGroup}</td>
                  <td>{mat.materialgroup}</td>
                  <td><button type="button" className='btn btn-sm btn-soft-info' onClick={() => selectMaterial(mat)}>Select</button></td>
                </tr>
              ))}
            </tbody>
          </table>
          <button type="button" className='btn btn-sm btn-soft-danger' onClick={() => setShowModal(false)} style={{ marginTop: 10 }}>Close</button>
        </div>
      </div>
    );
  };

  const QuotationSearchModal = () => (
  <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
    <div className="modal-dialog modal-xl">
      <div className="modal-content">
        <div className="modal-header bg-primary text-white">
          <h5 className="modal-title">
            <i className="fas fa-search me-2"></i>Search Quotations
          </h5>
          <button
            type="button"
            className="btn-close btn-close-white"
            onClick={closeQuotationModal}
          ></button>
        </div>
        <div className="modal-body">
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Search Quotation Number</label>
              <div className="input-group">
                <span className="input-group-text">
                  <i className="fas fa-search"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter quotation number..."
                  value={quotationSearchQuery}
                  onChange={(e) => handleQuotationSearch(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-3">
              <label className="form-label">&nbsp;</label>
              <div className="d-flex gap-2">
                <button className="btn btn-info" onClick={handleViewAllQuotations}>
                  <i className="fas fa-list me-1"></i>View All
                </button>
              </div>
            </div>
          </div>

          <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
            {quotationSearchResults.length > 0 ? (
              <table className="table table-hover">
                <thead className="table-light sticky-top">
                  <tr>
                    <th>Quotation Number</th>
                    <th>Vendor Name</th>
                    <th>Date</th>
                    <th>Total</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {quotationSearchResults.map((quotation, idx) => (
                    <tr key={idx}>
                      <td><span className="badge bg-info">{quotation.quotationNumber}</span></td>
                      <td>{quotation.
customerName}</td>
                      <td>{quotation.date}</td>
                      <td>₹{quotation.total}</td>
                      <td>
                        <button
                          className="btn btn-success btn-sm"
                          onClick={() => selectQuotationFromSearch(quotation)}
                        >
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
                  {quotationSearchQuery
                    ? `No quotations found matching "${quotationSearchQuery}"`
                    : 'Enter search term or click "View All"'
                  }
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={closeQuotationModal}>
            <i className="fas fa-times me-1"></i>Close
          </button>
        </div>
      </div>
    </div>
  </div>
);



const VendorSearchModal = () => (
  <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
    <div className="modal-dialog modal-xl">
      <div className="modal-content">
        <div className="modal-header bg-primary text-white">
          <h5 className="modal-title">
            <i className="fas fa-search me-2"></i>Search Vendors
          </h5>
          <button
            type="button"
            className="btn-close btn-close-white"
            onClick={closeVendorModal}
          ></button>
        </div>
        <div className="modal-body">
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Search Vendor</label>
              <div className="input-group">
                <span className="input-group-text">
                  <i className="fas fa-search"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by vendor name or code..."
                  value={vendorSearchQuery}
                  onChange={(e) => handleVendorSearch(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-3">
              <label className="form-label">&nbsp;</label>
              <div className="d-flex gap-2">
                <button className="btn btn-info" onClick={handleViewAllVendors}>
                  <i className="fas fa-list me-1"></i>View All
                </button>
              </div>
            </div>
          </div>

          <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
            {vendorSearchResults.length > 0 ? (
              <table className="table table-hover">
                <thead className="table-light sticky-top">
                  <tr>
                    <th>Vendor Code</th>
                    <th>Vendor Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {vendorSearchResults.map((vendor, idx) => (
                    <tr key={idx}>
                      <td><span className="badge bg-info">{vendor.vnNo}</span></td>
                      <td>{vendor.name1}</td>
                      <td>{vendor.email}</td>
                      <td>{vendor.phone}</td>
                      <td>
                        <button
                          className="btn btn-success btn-sm"
                          onClick={() => selectVendorFromSearch(vendor)}
                        >
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
                  {vendorSearchQuery
                    ? `No vendors found matching "${vendorSearchQuery}"`
                    : 'Enter search term or click "View All"'
                  }
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={closeVendorModal}>
            <i className="fas fa-times me-1"></i>Close
          </button>
        </div>
      </div>
    </div>
  </div>
);
  return (
    <div className='content'>
      <h2>Sales Order Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="row">
         <div className='col-xl-3'>
  <label>Quotation Number:</label>
  <div className="input-group">
    <input
      type="text"
      className='form-control'
      placeholder="Enter quotation number"
      value={selectedQuotationNumber}
      onChange={(e) => {
        setSelectedQuotationNumber(e.target.value);
        if (e.target.value) {
          handleQuotationChange(e.target.value);
        }
      }}
      required
    />
    <button
      type="button"
      className="btn btn-outline-secondary"
      onClick={() => setShowQuotationModal(true)}
    >
      <i className="fas fa-search"></i>
    </button>
  </div>
</div>


          <div className='col-xl-3'>
            <label>PO Category:</label>
            <select className='form-select' onChange={(e) => {
              const cat = categories.find(c => c._id === e.target.value);
              setSelectedCategory(cat);
            }} required>
              <option value="">-- Select Category --</option>
              {categories.map(c => (
                <option key={c._id} value={c._id}>{c.categoryName}</option>
              ))}
            </select>
          </div>

          <div className='col-xl-3'> <label>PO Number:</label> <input className='form-control' value={poNumber} readOnly /></div>
         <div className='col-xl-3'>
  <label>PO Creating date:</label>
  <input
    type='date'
    className='form-control'
    value={date}
    onChange={(e) => setDate(e.target.value)}
  />
</div>

        <div className='col-xl-3'>
  <label>Customer:</label>
  <div className="input-group">
    <input
      className='form-control'
      value={customer}
      onChange={(e) => setCustomer(e.target.value)}
      placeholder="Enter customer name"
    />
    <button
      type="button"
      className="btn btn-outline-secondary"
      onClick={() => setShowVendorModal(true)}
    >
      <i className="fas fa-search"></i>
    </button>
  </div>
</div>

          <div className='col-xl-3'><label> Location:</label> <input className='form-control' value={deliveryLocation} onChange={(e) => setDeliveryLocation(e.target.value)} /></div>
          <div className='col-xl-3'>
  <label>Sales Group:</label>
  <input className='form-control' value={salesGroup} onChange={(e) => setsalesGroup(e.target.value)} />
</div>
<div className='col-xl-3'>
  <label>Contact Person:</label>
  <input className='form-control' value={contactPerson} onChange={(e) => setContactPerson(e.target.value)} />
</div>
<div className='col-xl-3'>
  <label>Payment Terms:</label>
  <textarea className='form-control' value={payTerms} onChange={(e) => setPayTerms(e.target.value)} maxLength="250" />
</div>
<div className='col-xl-3'>
  <label>Validity Date:</label>
  <input type="date" className='form-control' value={validityDate} onChange={(e) => setValidityDate(e.target.value)} />
</div>
        </div>
        <h4>Items</h4>
        <div className='table-responsive' style={{ width: '100%', tableLayout: 'fixed' }}>
          <table className='table table-sm table-bordered'>
            <thead>
              <tr>
                <th>#</th><th>Material ID</th><th>Description</th><th>Qty</th><th>Base Unit</th><th>Order Unit</th><th>Material Group</th><th>Price</th><th>PriceUnit</th><th>Amount</th><th>Delivery Date</th><th>Note</th><th>Action</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>
                    <input
                      value={item.materialId}
                      readOnly
                      className='form-control'
                      onClick={() => {
                        setSelectedItemIndex(idx);
                        setShowModal(true);
                      }}
                      style={{ cursor: 'pointer', backgroundColor: '#f9f9f9' }}
                    />
                  </td>
                  <td><input  className='form-control' value={item.description} onChange={(e) => handleItemChange(idx, 'description', e.target.value)} /></td>
                  <td><input  className='form-control' type="number" value={item.quantity} onChange={(e) => handleItemChange(idx, 'quantity', e.target.value)} /></td>
                  <td><input  className='form-control' value={item.baseUnit} onChange={(e) => handleItemChange(idx, 'baseUnit', e.target.value)} /></td>

                  <td><input  className='form-control' value={item.orderUnit} onChange={(e) => handleItemChange(idx, 'orderUnit', e.target.value)} /></td>
                 
                  <td><input  className='form-control' value={item.materialgroup} onChange={(e) => handleItemChange(idx, 'materialgroup', e.target.value)} /></td>
                  <td><input  className='form-control' type="number" value={item.price} onChange={(e) => handleItemChange(idx, 'price', e.target.value)} /></td>
                  <td>
                    <select
                      value={item.priceUnit}
                      onChange={(e) => handleItemChange(idx, 'priceUnit', e.target.value)}
                      required
                       className='form-select'
                    >
                      <option value="">-- Select --</option>
                      <option value="INR">INR</option>
                      <option value="USD">USD</option>
                      <option value="EXTRA">EXTRA</option>
                    </select>
                  </td>
                  <td>{(item.quantity * item.price).toFixed(2)}</td>
                  <td><input  className='form-control' type="date" value={item.deliveryDate} onChange={(e) => handleItemChange(idx, 'deliveryDate', e.target.value)} /></td>
                  <td>
  <textarea 
    className='form-control' 
    value={item.note} 
    onChange={(e) => handleItemChange(idx, 'note', e.target.value)} 
    maxLength="250"
    rows="2"
  />
</td>
                  <td><button className='btn btn-soft-danger' type="button" onClick={() => deleteItem(idx)}>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button type="button" className='btn btn-sm btn-outline-info' onClick={addItem} style={{ marginTop: 10 }}>+ Add Item</button>



<div className="row mt-4">
  {/* Delivery Address Section */}
  <div className='col-xl-6'>
    <div className="card">
      <div className="card-header bg-light">
        <h5 className="card-title mb-0">
          <i className="fas fa-shipping-fast me-2"></i>Delivery Information
        </h5>
      </div>
      <div className="card-body">
        <div className="mb-3">
          <label className="form-label">Delivery Address:</label>
          <textarea 
            className='form-control' 
            value={deliveryAddress} 
            onChange={(e) => setDeliveryAddress(e.target.value)}
            rows="4"
            placeholder="Enter complete delivery address..."
          />
        </div>
      </div>
    </div>
  </div>

  {/* Tax Calculation Section */}
  <div className='col-xl-6'>
    <div className="card">
      <div className="card-header bg-light">
        <h5 className="card-title mb-0">
          <i className="fas fa-calculator me-2"></i>Tax Calculation
        </h5>
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col-12 mb-3">
            <label className="form-label">Tax Template:</label>
            <select className='form-select' onChange={(e) => {
  const tax = taxes.find(t => t.taxName === e.target.value);
  setSelectedTax(tax);
  if (tax) {
    const newCgst = tax.cgst || 0;
    const newSgst = tax.sgst || 0;
    const newIgst = tax.igst || 0;
    
    setCgst(newCgst);
    setSgst(newSgst);
    setIgst(newIgst);
    
    // Immediate recalculation with new tax values
    recalculateTotal(items, newCgst, newSgst, newIgst, taxDiscount);
  }
}}>
              <option value="">-- Select Tax Template --</option>
              {taxes.map(t => (
                <option key={t._id} value={t.taxName}>{t.taxName}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">CGST (%):</label>
            <input 
              type="number" 
              className='form-control' 
              value={cgst} 
              onChange={(e) => handleCgstChange(e.target.value)}
              step="0.01"
            />
            <small className="text-muted">Amount: ₹{cgstAmount}</small>
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">SGST (%):</label>
            <input 
              type="number" 
              className='form-control' 
              value={sgst} 
              onChange={(e) => handleSgstChange(e.target.value)}
              step="0.01"
            />
            <small className="text-muted">Amount: ₹{sgstAmount}</small>
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">IGST (%):</label>
            <input 
              type="number" 
              className='form-control' 
              value={igst} 
              onChange={(e) => handleIgstChange(e.target.value)}
              step="0.01"
            />
            <small className="text-muted">Amount: ₹{igstAmount}</small>
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Tax Discount:</label>
            <input 
              type="number" 
              className='form-control' 
              value={taxDiscount} 
              onChange={(e) => handleTaxDiscountChange(e.target.value)}
              step="0.01"
            />
          </div>
        </div>

        {/* Total Summary */}
        <div className="border-top pt-3 mt-3">
          <div className="row">
            <div className="col-6">
              <div className="d-flex justify-content-between">
                <span>Subtotal:</span>
                <strong>₹{total}</strong>
              </div>
              <div className="d-flex justify-content-between text-muted small">
                <span>CGST:</span>
                <span>₹{cgstAmount}</span>
              </div>
              <div className="d-flex justify-content-between text-muted small">
                <span>SGST:</span>
                <span>₹{sgstAmount}</span>
              </div>
              <div className="d-flex justify-content-between text-muted small">
                <span>IGST:</span>
                <span>₹{igstAmount}</span>
              </div>
              <div className="d-flex justify-content-between text-muted small">
                <span>Discount:</span>
                <span>- ₹{taxDiscount}</span>
              </div>
              <hr className="my-2" />
              <div className="d-flex justify-content-between">
                <strong>Final Total:</strong>
                <strong className="text-success">₹{finalTotal}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
        {/* <div className='mt-2'>
          <strong>Subtotal: ₹{total}</strong><br />
          <strong>Final Total (after taxes & discount): ₹{finalTotal}</strong>
        </div> */}

        <button type="submit" className='btn btn-success mb-6 mt-2'>Submit PO</button>
      </form>

      {showModal && <MaterialModal />}
      {showQuotationModal && <QuotationSearchModal />}
{showVendorModal && <VendorSearchModal />}
    </div>
  );
}

export default SalesOrderForm;