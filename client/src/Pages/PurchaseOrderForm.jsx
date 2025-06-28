// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function PurchaseOrderForm() {
//   const [categories, setCategories] = useState([]);
//   const [quotations, setQuotations] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [selectedQuotationNumber, setSelectedQuotationNumber] = useState('');
//   const [poNumber, setPoNumber] = useState('');
//   const [date] = useState(new Date().toISOString().substring(0, 10));
//   const [vendor, setVendor] = useState('');
//   const [deliveryLocation, setDeliveryLocation] = useState('');
//   const [items, setItems] = useState([]);
//   const [total, setTotal] = useState(0);

//   useEffect(() => {
//     axios.get('http://localhost:8080/api/po-categories').then(res => setCategories(res.data));
//     axios.get('http://localhost:8080/api/quotations/get').then(res => setQuotations(res.data));
//   }, []);

//   const handleQuotationChange = (quotationNumber) => {
//     setSelectedQuotationNumber(quotationNumber);

//     const quotation = quotations.find(q => q.quotationNumber === quotationNumber);
//     if (quotation) {
//       setVendor(quotation.vendorName);
//       setDeliveryLocation(quotation.items[0]?.location || '');

//       const mappedItems = quotation.items.map(item => ({
//         materialId: item.materialId,
//         description: item.description,
//         quantity: item.qty,
//         unit: item.unit || item.baseUnit,
//         price: item.price,
//         deliveryDate: item.deliveryDate?.slice(0, 10),
//       }));

//       setItems(mappedItems);

//       const totalAmount = mappedItems.reduce((sum, item) => sum + item.quantity * item.price, 0);
//       setTotal(totalAmount.toFixed(2));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!selectedCategory || !selectedQuotationNumber) {
//       return alert('Please select both category and quotation');
//     }

//     const selectedQuotation = quotations.find(q => q.quotationNumber === selectedQuotationNumber);

//     const data = {
//       poNumber, // Optional: or let backend generate it
//       quotationId: selectedQuotation?._id,
//       quotationNumber: selectedQuotationNumber,
//       categoryId: selectedCategory._id,
//       category: selectedCategory.categoryName,
//       date,
//       vendor,
//       deliveryLocation,
//       items,
//       total: parseFloat(total)
//     };

//     try {
//       const res = await axios.post('http://localhost:8080/api/purchase-orders', data);
//       alert('PO Created Successfully!');
//       console.log('Saved PO:', res.data);
//       setPoNumber(res.data.poNumber);
//       setItems(res.data.items);
//       setVendor(res.data.vendor);
//       setTotal(res.data.total);
//     } catch (err) {
//       console.error('Error:', err);
//       alert('Failed to create PO');
//     }
//   };


//   return (
//     <div style={{ padding: 20, marginLeft: "300px" }}>
//       <h2>Purchase Order Form</h2>
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
//           <label>PO Category:</label>
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

//         <div><label>PO Number:</label> <input value={poNumber} readOnly /></div>
//         <div><label>Date:</label> <input value={date} readOnly /></div>
//         <div><label>Vendor:</label> <input value={vendor} readOnly /></div>
//         <div>
//           <label>Delivery Location:</label>
//           <input value={deliveryLocation} onChange={(e) => setDeliveryLocation(e.target.value)} />
//         </div>

//         <h4>Items</h4>
//         <table border="1" cellPadding="6" style={{ width: '100%', marginBottom: '10px' }}>
//           <thead>
//             <tr>
//               <th>#</th><th>Material ID</th><th>Description</th><th>Qty</th><th>Unit</th><th>Price</th><th>Amount</th><th>Delivery Date</th>
//             </tr>
//           </thead>
//           <tbody>
//             {items.map((item, idx) => (
//               <tr key={idx}>
//                 <td>{idx + 1}</td>
//                 <td><input value={item.materialId} readOnly /></td>
//                 <td><input value={item.description} readOnly /></td>
//                 <td><input value={item.quantity} readOnly /></td>
//                 <td><input value={item.unit} readOnly /></td>
//                 <td><input value={item.price} readOnly /></td>
//                 <td>{(item.quantity * item.price).toFixed(2)}</td>
//                 <td><input value={item.deliveryDate} readOnly /></td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         <div style={{ marginTop: 10 }}>
//           <strong>Total: ₹{total}</strong>
//         </div>

//         <button type="submit" style={{ marginTop: 20 }}>Submit PO</button>
//       </form>
//     </div>
//   );
// }

// export default PurchaseOrderForm;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function PurchaseOrderForm() {
//   const [categories, setCategories] = useState([]);
//   const [quotations, setQuotations] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [selectedQuotationNumber, setSelectedQuotationNumber] = useState('');
//   const [poNumber, setPoNumber] = useState('');
//   const [date] = useState(new Date().toISOString().substring(0, 10));
//   const [vendor, setVendor] = useState('');
//   const [deliveryLocation, setDeliveryLocation] = useState('');
//   const [items, setItems] = useState([]);
//   const [total, setTotal] = useState(0);

//   useEffect(() => {
//     axios.get('http://localhost:8080/api/po-categories').then(res => setCategories(res.data));
//     axios.get('http://localhost:8080/api/quotations/get').then(res => setQuotations(res.data));
//   }, []);

//   const handleQuotationChange = (quotationNumber) => {
//     setSelectedQuotationNumber(quotationNumber);
//     const quotation = quotations.find(q => q.quotationNumber === quotationNumber);
//     if (quotation) {
//       setVendor(quotation.vendorName);
//       setDeliveryLocation(quotation.items[0]?.location || '');

//       const mappedItems = quotation.items.map(item => ({
//         materialId: item.materialId,
//         description: item.description,
//         quantity: item.qty,
//        baseUnit:item.baseUnit,
//        orderUnit: item.orderUnit,
//         price: item.price,

// buyerGroup: item.buyerGroup,
//         materialgroup: item.materialgroup,
//         deliveryDate: item.deliveryDate ? String(item.deliveryDate).slice(0, 10) : new Date().toISOString().slice(0, 10),
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
//     const totalAmount = updatedItems.reduce((sum, item) => sum + (item.quantity || 0) * (item.price || 0), 0);
//     setTotal(totalAmount.toFixed(2));
//   };

//   const addItem = () => {
//     setItems([
//       ...items,
//       {
//         materialId: '',
//         description: '',
//         quantity: 0,

// baseUnit: '',
//         price: 0,

// buyerGroup: '',
//         materialgroup: '',
//         deliveryDate: new Date().toISOString().slice(0, 10)
//       }
//     ]);
//   };

//   const deleteItem = (index) => {
//     const updatedItems = [...items];
//     updatedItems.splice(index, 1);
//     setItems(updatedItems);
//     recalculateTotal(updatedItems);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!selectedCategory || !selectedQuotationNumber) {
//       return alert('Please select both category and quotation');
//     }

//     const selectedQuotation = quotations.find(q => q.quotationNumber === selectedQuotationNumber);

//     const data = {
//       poNumber,
//       quotationId: selectedQuotation?._id,
//       quotationNumber: selectedQuotationNumber,
//       categoryId: selectedCategory._id,
//       category: selectedCategory.categoryName,
//       date,
//       vendor,
//       deliveryLocation,
//       items,
//       total: parseFloat(total)
//     };

//     try {
//       const res = await axios.post('http://localhost:8080/api/purchase-orders', data);
//       alert('PO Created Successfully!');
//       console.log('Saved PO:', res.data);
//       setPoNumber(res.data.poNumber);
//       setItems(res.data.items);
//       setVendor(res.data.vendor);
//       setTotal(res.data.total);
//     } catch (err) {
//       console.error('Error:', err);
//       alert('Failed to create PO');
//     }
//   };

//   return (
//     <div style={{ padding: 20, marginLeft: "300px" }}>
//       <h2>Purchase Order Form</h2>
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
//           <label>PO Category:</label>
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

//         <div><label>PO Number:</label> <input value={poNumber} readOnly /></div>
//         <div><label>Date:</label> <input value={date} readOnly /></div>
//         <div><label>Vendor:</label> <input value={vendor} readOnly /></div>
//         <div>
//           <label>Delivery Location:</label>
//           <input value={deliveryLocation} onChange={(e) => setDeliveryLocation(e.target.value)} />
//         </div>

//         <h4>Items</h4>
//         <div style={{ maxHeight: "300px", overflowY: "auto" }}>
//           <table border="1" cellPadding="6" style={{ width: '100%', marginBottom: '10px' }}>
//             <thead>
//               <tr>
//                 <th>#</th><th>Material ID</th><th>Description</th><th>Qty</th><th>bUO</th><th>uint</th> <th>orderUnit</th><th>
//                 buyerGroup</th><th>
//                 materialgroup</th><th>Price</th><th>Amount</th><th>Delivery Date</th><th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {items.map((item, idx) => (
//                 <tr key={idx}>
//                   <td>{idx + 1}</td>
//                   <td><input value={item.materialId} onChange={(e) => handleItemChange(idx, 'materialId', e.target.value)} /></td>
//                   <td><input value={item.description} onChange={(e) => handleItemChange(idx, 'description', e.target.value)} /></td>
//                   <td><input type="number" value={item.quantity} onChange={(e) => handleItemChange(idx, 'quantity', e.target.value)} /></td>
//                   <td><input value={item.baseUnit} onChange={(e) => handleItemChange(idx, 'baseUnit', e.target.value)} /></td>
//                   <td><input value={item.unit} onChange={(e) => handleItemChange(idx, 'unit', e.target.value)} /></td>

//                     <td><input value={item.orderUnit} onChange={(e) => handleItemChange(idx, 'orderUnit', e.target.value)} /></td>
//                     <td><input value={item.buyerGroup} onChange={(e) => handleItemChange(idx, 'buyerGroup', e.target.value)} /></td>
//                     <td><input value={item.materialgroup} onChange={(e) => handleItemChange(idx, 'materialgroup', e.target.value)} /></td>
//                   <td><input type="number" value={item.price} onChange={(e) => handleItemChange(idx, 'price', e.target.value)} /></td>
//                   <td>{(item.quantity * item.price).toFixed(2)}</td>
//                   <td><input type="date" value={item.deliveryDate} onChange={(e) => handleItemChange(idx, 'deliveryDate', e.target.value)} /></td>
//                   <td><button type="button" onClick={() => deleteItem(idx)}>Delete</button></td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         <button type="button" onClick={addItem} style={{ marginTop: 10 }}>
//           + Add Item
//         </button>

//         <div style={{ marginTop: 10 }}>
//           <strong>Total: ₹{total}</strong>
//         </div>

//         <button type="submit" style={{ marginTop: 20 }}>Submit PO</button>
//       </form>
//     </div>
//   );
// }

// export default PurchaseOrderForm;

///crt working code without searchbutton

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function PurchaseOrderForm() {
//   const [categories, setCategories] = useState([]);
//   const [quotations, setQuotations] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [selectedQuotationNumber, setSelectedQuotationNumber] = useState('');
//   const [poNumber, setPoNumber] = useState('');
//   const [date] = useState(new Date().toISOString().substring(0, 10));
//   const [vendor, setVendor] = useState('');
//   const [deliveryLocation, setDeliveryLocation] = useState('');
//   const [deliveryAddress, setDeliveryAddress] = useState('');
//   const [items, setItems] = useState([]);
//   const [total, setTotal] = useState(0);

//   // Tax States
//   const [taxes, setTaxes] = useState([]);
//   const [selectedTax, setSelectedTax] = useState(null);
//   const [cgst, setCgst] = useState(0);
//   const [sgst, setSgst] = useState(0);
//   const [igst, setIgst] = useState(0);
//   const [taxDiscount, setTaxDiscount] = useState(0);
//   const [finalTotal, setFinalTotal] = useState(0);

//   useEffect(() => {
//     axios.get('http://localhost:8080/api/po-categories').then(res => setCategories(res.data));
//     axios.get('http://localhost:8080/api/quotations/get').then(res => setQuotations(res.data));
//     axios.get('http://localhost:8080/api/tax').then(res => setTaxes(res.data));
//   }, []);

//   const handleQuotationChange = (quotationNumber) => {
//     setSelectedQuotationNumber(quotationNumber);
//     const quotation = quotations.find(q => q.quotationNumber === quotationNumber);
//     if (quotation) {
//       setVendor(quotation.vendorName);
//       setDeliveryLocation(quotation.items[0]?.location || '');

//       const mappedItems = quotation.items.map(item => ({
//         materialId: item.materialId,
//         description: item.description,
//         quantity: item.qty,
//         baseUnit: item.baseUnit,
//         unit: item.unit,
//         orderUnit: item.orderUnit,
//         price: item.price,
//         buyerGroup: item.buyerGroup,
//         materialgroup: item.materialgroup,
//         deliveryDate: item.deliveryDate ? String(item.deliveryDate).slice(0, 10) : new Date().toISOString().slice(0, 10),
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
//     setItems([
//       ...items,
//       {
//         materialId: '',
//         description: '',
//         quantity: 0,
//         baseUnit: '',
//         unit: '',
//         orderUnit: '',
//         price: 0,
//         buyerGroup: '',
//         materialgroup: '',
//         deliveryDate: new Date().toISOString().slice(0, 10),
//       }
//     ]);
//   };

//   const deleteItem = (index) => {
//     const updatedItems = [...items];
//     updatedItems.splice(index, 1);
//     setItems(updatedItems);
//     recalculateTotal(updatedItems);
//   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     if (!selectedCategory || !selectedQuotationNumber) {
// //       return alert('Please select both category and quotation');
// //     }

// //     const selectedQuotation = quotations.find(q => q.quotationNumber === selectedQuotationNumber);

// //     const data = {
// //       poNumber,
// //       quotationId: selectedQuotation?._id,
// //       quotationNumber: selectedQuotationNumber,
// //       categoryId: selectedCategory._id,
// //       category: selectedCategory.categoryName,
// //       date,
// //       vendor,
// //       deliveryLocation,
// //       deliveryAddress,
// //       items,
// //       total: parseFloat(total),
// //       taxName: selectedTax?.taxName || '',
// //       cgst: parseFloat(cgst),
// //       sgst: parseFloat(sgst),
// //       igst: parseFloat(igst),
// //       taxDiscount: parseFloat(taxDiscount),
// //       finalTotal: parseFloat(finalTotal),
// //     };

// //     try {
// //       const res = await axios.post('http://localhost:8080/api/purchase-orders', data);
// //       alert('PO Created Successfully!');
// //       console.log('Saved PO:', res.data);
// //       setPoNumber(res.data.poNumber);
// //       setItems(res.data.items);
// //       setVendor(res.data.vendor);
// //       setTotal(res.data.total);
// //     } catch (err) {
// //       console.error('Error:', err);
// //       alert('Failed to create PO');
// //     }
// //   };
// const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!selectedCategory || !selectedQuotationNumber) {
//       return alert('Please select both category and quotation');
//     }

//     const selectedQuotation = quotations.find(q => q.quotationNumber === selectedQuotationNumber);

//     const data = {
//       poNumber,
//       quotationId: selectedQuotation?._id, // ✅ send quotationId explicitly
//       quotationNumber: selectedQuotationNumber,
//       categoryId: selectedCategory._id,
//       category: selectedCategory.categoryName,
//       date,
//       vendor,                              // ✅ send vendor explicitly
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
//       const res = await axios.post('http://localhost:8080/api/purchase-orders', data);
//       alert('PO Created Successfully!');
//       console.log('Saved PO:', res.data);
//       setPoNumber(res.data.poNumber);
//       setItems(res.data.items);
//       setVendor(res.data.vendor);
//       setTotal(res.data.total);
//     } catch (err) {
//       console.error('Error:', err);
//       alert('Failed to create PO');
//     }
//   };

//   return (
//     <div style={{ padding: 20, marginLeft: "300px" }}>
//       <h2>Purchase Order Form</h2>
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
//           <label>PO Category:</label>
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

//         <div><label>PO Number:</label> <input value={poNumber} readOnly /></div>
//         <div><label>Date:</label> <input value={date} readOnly /></div>
//         <div><label>Vendor:</label> <input value={vendor} readOnly /></div>
//         <div><label>Delivery Location:</label> <input value={deliveryLocation} onChange={(e) => setDeliveryLocation(e.target.value)} /></div>

//         <h4>Items</h4>
//         <div style={{ maxHeight: "300px", overflowY: "auto" }}>
//           <table border="1" cellPadding="6" style={{ width: '100%', marginBottom: '10px' }}>
//             <thead>
//               <tr>
//                 <th>#</th><th>Material ID</th><th>Description</th><th>Qty</th><th>Base Unit</th><th>Unit</th><th>Order Unit</th><th>Buyer Group</th><th>Material Group</th><th>Price</th><th>Amount</th><th>Delivery Date</th><th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {items.map((item, idx) => (
//                 <tr key={idx}>
//                   <td>{idx + 1}</td>
//                   <td><input value={item.materialId} onChange={(e) => handleItemChange(idx, 'materialId', e.target.value)} /></td>
//                   <td><input value={item.description} onChange={(e) => handleItemChange(idx, 'description', e.target.value)} /></td>
//                   <td><input type="number" value={item.quantity} onChange={(e) => handleItemChange(idx, 'quantity', e.target.value)} /></td>
//                   <td><input value={item.baseUnit} onChange={(e) => handleItemChange(idx, 'baseUnit', e.target.value)} /></td>
//                   <td><input value={item.unit} onChange={(e) => handleItemChange(idx, 'unit', e.target.value)} /></td>
//                   <td><input value={item.orderUnit} onChange={(e) => handleItemChange(idx, 'orderUnit', e.target.value)} /></td>
//                   <td><input value={item.buyerGroup} onChange={(e) => handleItemChange(idx, 'buyerGroup', e.target.value)} /></td>
//                   <td><input value={item.materialgroup} onChange={(e) => handleItemChange(idx, 'materialgroup', e.target.value)} /></td>
//                   <td><input type="number" value={item.price} onChange={(e) => handleItemChange(idx, 'price', e.target.value)} /></td>
//                   <td>{(item.quantity * item.price).toFixed(2)}</td>
//                   <td><input type="date" value={item.deliveryDate} onChange={(e) => handleItemChange(idx, 'deliveryDate', e.target.value)} /></td>
//                   <td><button type="button" onClick={() => deleteItem(idx)}>Delete</button></td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         <button type="button" onClick={addItem} style={{ marginTop: 10 }}>+ Add Item</button>

//         {/* Delivery Address */}
//         <div style={{ marginTop: 20 }}>
//           <label>Delivery Address:</label>
//           <input value={deliveryAddress} onChange={(e) => setDeliveryAddress(e.target.value)} style={{ width: '100%' }} />
//         </div>

//         {/* Tax Section */}
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

//         <button type="submit" style={{ marginTop: 20 }}>Submit PO</button>
//       </form>
//     </div>
//   );
// }

// export default PurchaseOrderForm;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PurchaseOrderForm() {
  const [categories, setCategories] = useState([]);
  const [quotations, setQuotations] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedQuotationNumber, setSelectedQuotationNumber] = useState('');
  const [poNumber, setPoNumber] = useState('');
  const [date] = useState(new Date().toISOString().substring(0, 10));
  const [vendor, setVendor] = useState('');
  const [deliveryLocation, setDeliveryLocation] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);

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
    axios.get('http://localhost:8080/api/po-categories').then(res => setCategories(res.data));
    axios.get('http://localhost:8080/api/quotations/get').then(res => setQuotations(res.data));
    axios.get('http://localhost:8080/api/tax').then(res => setTaxes(res.data));
    axios.get('http://localhost:8080/api/material').then(res => setMaterials(res.data));
  }, []);

  const handleQuotationChange = (quotationNumber) => {
    setSelectedQuotationNumber(quotationNumber);
    const quotation = quotations.find(q => q.quotationNumber === quotationNumber);
    if (quotation) {
      setVendor(quotation.vendorName);
      setDeliveryLocation(quotation.items[0]?.location || '');

      const mappedItems = quotation.items.map(item => ({
        materialId: item.materialId,
        description: item.description,
        quantity: item.qty,
        baseUnit: item.baseUnit,
        unit: item.unit,
        orderUnit: item.orderUnit,
        price: item.price,
        priceUnit: item.priceUnit,
        buyerGroup: item.buyerGroup,
        materialgroup: item.materialgroup,
        deliveryDate: item.deliveryDate ? String(item.deliveryDate).slice(0, 10) : new Date().toISOString().slice(0, 10),
      }));

      setItems(mappedItems);
      recalculateTotal(mappedItems);
    }
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = (field === 'quantity' || field === 'price') ? parseFloat(value) || 0 : value;
    setItems(updatedItems);
    recalculateTotal(updatedItems);
  };


  const recalculateTotal = (updatedItems) => {
    const subtotal = updatedItems.reduce((sum, item) => sum + (item.quantity || 0) * (item.price || 0), 0);
    setTotal(subtotal.toFixed(2));

    const cgstVal = (subtotal * (parseFloat(cgst) || 0)) / 100;
    const sgstVal = (subtotal * (parseFloat(sgst) || 0)) / 100;
    const igstVal = (subtotal * (parseFloat(igst) || 0)) / 100;
    const discountVal = parseFloat(taxDiscount) || 0;

    const final = subtotal + cgstVal + sgstVal + igstVal - discountVal;
    setFinalTotal(final.toFixed(2));
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
        buyerGroup: '',
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCategory || !selectedQuotationNumber) {
      return alert('Please select both category and quotation');
    }

    const selectedQuotation = quotations.find(q => q.quotationNumber === selectedQuotationNumber);

    const data = {
      poNumber,
      quotationId: selectedQuotation?._id,
      quotationNumber: selectedQuotationNumber,
      categoryId: selectedCategory._id,
      category: selectedCategory.categoryName,
      date,
      vendor,
      deliveryLocation,
      deliveryAddress,
      items,
      total: parseFloat(total),
      taxName: selectedTax?.taxName || '',
      cgst: parseFloat(cgst),
      sgst: parseFloat(sgst),
      igst: parseFloat(igst),
      taxDiscount: parseFloat(taxDiscount),
      finalTotal: parseFloat(finalTotal),
    };

    try {
      const res = await axios.post('http://localhost:8080/api/purchase-orders', data);
      alert('PO Created Successfully!');
      console.log('Saved PO:', res.data);
      setPoNumber(res.data.poNumber);
      setItems(res.data.items);
      setVendor(res.data.vendor);
      setTotal(res.data.total);
    } catch (err) {
      console.error('Error:', err);
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
        buyerGroup: material.buyerGroup,
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
                <th>Buyer Group</th>
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
                  <td>{mat.buyerGroup}</td>
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

  return (
    <div className='content'>
      <h2>Purchase Order Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className='col-xl-3'>
            <label>Quotation Number:</label>
            <select className='form-select' onChange={(e) => handleQuotationChange(e.target.value)} required>
              <option value="">-- Select Quotation --</option>
              {quotations.map(q => (
                <option key={q._id} value={q.quotationNumber}>{q.quotationNumber}</option>
              ))}
            </select>
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
          <div className='col-xl-3'><label>Date:</label> <input className='form-control' value={date} readOnly /></div>
          <div className='col-xl-3'><label>Vendor:</label> <input className='form-control' value={vendor} readOnly /></div>
          <div className='col-xl-3'><label>Delivery Location:</label> <input className='form-control' value={deliveryLocation} onChange={(e) => setDeliveryLocation(e.target.value)} /></div>
        </div>
        <h4>Items</h4>
        <div className='table-responsive' style={{ width: '100%', tableLayout: 'fixed' }}>
          <table className='table table-sm table-bordered'>
            <thead>
              <tr>
                <th>#</th><th>Material ID</th><th>Description</th><th>Qty</th><th>Base Unit</th><th>Unit</th><th>Order Unit</th><th>Buyer Group</th><th>Material Group</th><th>Price</th><th>PriceUnit</th><th>Amount</th><th>Delivery Date</th><th>Action</th>
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
                  <td><input  className='form-control' value={item.unit} onChange={(e) => handleItemChange(idx, 'unit', e.target.value)} /></td>
                  <td><input  className='form-control' value={item.orderUnit} onChange={(e) => handleItemChange(idx, 'orderUnit', e.target.value)} /></td>
                  <td><input className='form-control' value={item.buyerGroup} onChange={(e) => handleItemChange(idx, 'buyerGroup', e.target.value)} /></td>
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
                  <td><button className='btn btn-soft-danger' type="button" onClick={() => deleteItem(idx)}>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button type="button" className='btn btn-sm btn-outline-info' onClick={addItem} style={{ marginTop: 10 }}>+ Add Item</button>

        <div className='col-xl-4 mt-3'>
          <label>Delivery Address:</label>
          <textarea className='form-control' value={deliveryAddress} onChange={(e) => setDeliveryAddress(e.target.value)} style={{ width: '100%' }} ></textarea>
        </div>

        <div className='col-xl-1 ms-auto'>
          <div>
            <label>Tax Name:</label>
            <select  className='form-select'onChange={(e) => {
              const tax = taxes.find(t => t.taxName === e.target.value);
              setSelectedTax(tax);
              setCgst(tax?.cgst || 0);
              setSgst(tax?.sgst || 0);
              setIgst(tax?.igst || 0);
              recalculateTotal(items);
            }}>
              <option value="">-- Select Tax --</option>
              {taxes.map(t => (
                <option key={t._id} value={t.taxName}>{t.taxName}</option>
              ))}
            </select>
          </div>
          <div><label>CGST (%):</label> <input type="number"  className='form-control' value={cgst} onChange={(e) => { setCgst(e.target.value); recalculateTotal(items); }} /></div>
          <div><label>SGST (%):</label> <input type="number"  className='form-control' value={sgst} onChange={(e) => { setSgst(e.target.value); recalculateTotal(items); }} /></div>
          <div><label>IGST (%):</label> <input type="number"  className='form-control' value={igst} onChange={(e) => { setIgst(e.target.value); recalculateTotal(items); }} /></div>
          <div><label>Tax Discount:</label> <input type="number"  className='form-control' value={taxDiscount} onChange={(e) => { setTaxDiscount(e.target.value); recalculateTotal(items); }} /></div>
        </div>

        <div className='mt-2'>
          <strong>Subtotal: ₹{total}</strong><br />
          <strong>Final Total (after taxes & discount): ₹{finalTotal}</strong>
        </div>

        <button type="submit" className='btn btn-success mb-4 mt-2'>Submit PO</button>
      </form>

      {showModal && <MaterialModal />}
    </div>
  );
}

export default PurchaseOrderForm;


