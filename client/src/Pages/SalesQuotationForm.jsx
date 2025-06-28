// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Select from 'react-select';

// function SalesQuotationForm() {
//   const [salesRequests, setSalesRequests] = useState([]);
//   const [quotationCategories, setQuotationCategories] = useState([]);
//   const [customers, setCustomers] = useState([]);
//   const [selectedRequest, setSelectedRequest] = useState(null);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [selectedCustomer, setSelectedCustomer] = useState(null);
//   const [note, setNote] = useState('');
//   const [validityDate, setValidityDate] = useState('');
//   const [items, setItems] = useState([]);

//   // Fetch APIs
//   useEffect(() => {
//     axios.get('http://localhost:8080/api/salerequest/get')
//       .then(res => setSalesRequests(res.data))
//       .catch(console.error);

//     axios.get('http://localhost:8080/api/sale-quotation-categories')
//       .then(res => setQuotationCategories(res.data))
//       .catch(console.error);

//     axios.get('http://localhost:8080/api/customers') // replace with your actual API
//       .then(res => {
//         const options = res.data.map(c => ({
//           label: `${c.name}`,
//           value: c._id
//         }));
//         setCustomers(options);
//       })
//       .catch(console.error);
//   }, []);

//   // Handle selecting a sales request
//   const handleRequestChange = (option) => {
//     setSelectedRequest(option);
//     const requestData = salesRequests.find(req => req._id === option.value);
//     setItems(requestData.items.map(item => ({
//       ...item,
//       price: ''
//     })));
//   };

//   // Handle editing price
//   const handlePriceChange = (index, value) => {
//     const updated = [...items];
//     updated[index].price = value;
//     setItems(updated);
//   };

//   // Handle submit
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const data = {
//       indentId: selectedRequest?.label,
//       categoryId: selectedCategory?.value,
//       customerId: selectedCustomer?.value,
//       note,
//       validityDate,
//       items
//     };
//     console.log('Sales Quotation Data:', data);
//     // axios.post('/api/salesquotation', data).then(...);
//   };

//   return (
//     <div style={{ padding: '20px',marginLeft:"400px",marginTop:"50px" }}>
//       <h2>Sales Quotation Form</h2>

//       <form onSubmit={handleSubmit}>
//         <div >
//           <label>Sales Request:</label>
//           <Select
//             options={salesRequests.map(req => ({
//               label: req.indentId,
//               value: req._id
//             }))}
//             onChange={handleRequestChange}
//           />
//         </div>

//         <div >
//           <label>Quotation Category:</label>
//           <Select
//             options={quotationCategories.map(cat => ({
//               label: cat.categoryName,
//               value: cat._id
//             }))}
//             onChange={setSelectedCategory}
//           />
//         </div>

//         <div >
//           <label>Customer:</label>
//           <Select
//             options={customers}
//             onChange={setSelectedCustomer}
//           />
//         </div>

//         <div >
//           <label>Note:</label>
//           <textarea
//             rows="3"
//             value={note}
//             onChange={(e) => setNote(e.target.value)}
//             placeholder="Add additional notes"
//             style={{ width: '100%' }}
//           />
//         </div>

//         <div >
//           <label>Validity Date:</label>
//           <input
//             type="date"
//             value={validityDate}
//             onChange={(e) => setValidityDate(e.target.value)}
//           />
//         </div>

//         {items.length > 0 && (
//           <div>
//             <h4>Requested Items</h4>
//             <table border="1" cellPadding="6" style={{ width: '100%', marginBottom: '20px' }}>
//               <thead>
//                 <tr>
//                   <th>#</th>
//                   <th>Material ID</th>
//                   <th>Description</th>
//                   <th>Qty</th>
//                   <th>Base Unit</th>
//                   <th>Order Unit</th>
//                   <th>Location</th>
//                   <th>Price</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {items.map((item, index) => (
//                   <tr key={item._id}>
//                     <td>{index + 1}</td>
//                     <td>{item.materialId}</td>
//                     <td>{item.description}</td>
//                     <td>{item.qty}</td>
//                     <td>{item.baseUnit}</td>
//                     <td>{item.orderUnit}</td>
//                     <td>{item.location}</td>
//                     <td>
//                       <input
//                         type="text"
//                         value={item.price}
//                         onChange={(e) => handlePriceChange(index, e.target.value)}
//                         placeholder="Enter price"
//                       />
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}

//         <button type="submit">Submit Quotation</button>
//       </form>
//     </div>
//   );
// }

// export default SalesQuotationForm;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Select from 'react-select';

// function SalesQuotationForm() {
//   const [salesRequests, setSalesRequests] = useState([]);
//   const [quotationCategories, setQuotationCategories] = useState([]);
//   const [customers, setCustomers] = useState([]);
//   const [savedQuotations, setSavedQuotations] = useState([]);

//   const [selectedRequest, setSelectedRequest] = useState(null);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [selectedCustomer, setSelectedCustomer] = useState(null);
//   const [note, setNote] = useState('');
//   const [validityDate, setValidityDate] = useState('');
//   const [items, setItems] = useState([]);

//   // Fetch API data
//   useEffect(() => {
//     axios.get('http://localhost:8080/api/salerequest/get')
//       .then(res => setSalesRequests(res.data))
//       .catch(console.error);

//     axios.get('http://localhost:8080/api/sale-quotation-categories')
//       .then(res => setQuotationCategories(res.data))
//       .catch(console.error);

//     axios.get('http://localhost:8080/api/customers')
//       .then(res => {
//         const options = res.data.map(c => ({
//           label: `${c.name1} ${c.name2}`.trim(),
//           value: c._id
//         }));
//         setCustomers(options);
//       })
//       .catch(console.error);

//     fetchSavedQuotations();
//   }, []);

//   const fetchSavedQuotations = () => {
//     axios.get('http://localhost:8080/api/salesquotations')
//       .then(res => setSavedQuotations(res.data))
//       .catch(console.error);
//   };

//   const handleRequestChange = (option) => {
//     setSelectedRequest(option);
//     const request = salesRequests.find(req => req._id === option.value);
//     if (request) {
//       setItems(request.items.map(item => ({
//         ...item,
//         price: '',
//         unit:''
//       })));
//     }
//   };

//   const handlePriceChange = (index, value) => {
//     const updated = [...items];
//     updated[index].price = value;
//     setItems(updated);
//   };
//   const handleUnitChange = (index, value) => {
//     const updated = [...items];
//     updated[index].unit = value;
//     setItems(updated);
//   };
// const updateItemField = (index, field, value) => {
//   const updated = [...items];
//   updated[index][field] = value;
//   setItems(updated);
// };
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const data = {
//       indentId: selectedRequest?.label,
//       categoryId: selectedCategory?.value,
//       customerId: selectedCustomer?.value,
//       note,
//       validityDate,
//       items
//     };

//     axios.post('http://localhost:8080/api/salesquotations', data)
//       .then(res => {
//         alert('Quotation saved successfully!');
//         fetchSavedQuotations();
//         resetForm();
//       })
//       .catch(err => {
//         console.error(err);
//         alert('Error saving quotation');
//       });
//   };

//   const resetForm = () => {
//     setSelectedRequest(null);
//     setSelectedCategory(null);
//     setSelectedCustomer(null);
//     setNote('');
//     setValidityDate('');
//     setItems([]);
//   };

//   return (
//     <div style={{ padding: '20px' ,marginLeft:"400px",marginTop:"50px" }}>
//       <h2>Sales Quotation Form</h2>

//       <form onSubmit={handleSubmit}>
//         <div >
//           <label>Sales Request:</label>
//           <Select
//             value={selectedRequest}
//             options={salesRequests.map(req => ({
//               label: req.indentId,
//               value: req._id
//             }))}
//             onChange={handleRequestChange}
//           />
//         </div>

//         <div >
//           <label>Quotation Category:</label>
//           <Select
//             value={selectedCategory}
//             options={quotationCategories.map(cat => ({
//                 label: `${cat.categoryName} (${cat.prefix})`,
//               value: cat._id
//             }))}
//             onChange={setSelectedCategory}
//           />
//         </div>

//         <div >
//           <label>Customer:</label>
//           <Select
//             value={selectedCustomer}
//             options={customers}
//             onChange={setSelectedCustomer}
//           />
//         </div>

//         <div >
//           <label>Note:</label>
//           <textarea
//             rows="3"
//             value={note}
//             onChange={(e) => setNote(e.target.value)}
//             placeholder="Add additional notes"
//             style={{ width: '100%' }}
//           />
//         </div>

//         <div >
//           <label>Validity Date:</label>
//           <input
//             type="date"
//             value={validityDate}
//             onChange={(e) => setValidityDate(e.target.value)}
//           />
//         </div>
// {/* 
//         {items.length > 0 && (
//           <div>
//             <h4>Requested Items</h4>
//             <table border="1" cellPadding="6" style={{ width: '100%', marginBottom: '20px' }}>
//               <thead>
//                 <tr>
//                   <th>#</th>
//                   <th>Material ID</th>
//                   <th>Description</th>
//                   <th>Qty</th>
//                   <th>Base Unit</th>
//                   <th>Order Unit</th>
//                   <th>Location</th>
//                   <th>Unit</th>
//                   <th>Price</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {items.map((item, index) => (
//                   <tr key={item._id}>
//                     <td>{index + 1}</td>
//                     <td>{item.materialId}</td>
//                     <td>{item.description}</td>
//                     <td>{item.qty}</td>
//                     <td>{item.baseUnit}</td>
//                     <td>{item.orderUnit}</td>
//                     <td>{item.location}</td>
//                     <td>
//   <input
//     type="text"
//     value={item.unit || ''}
//     onChange={(e) => handleUnitChange(index, e.target.value)}
//     placeholder="Enter unit"
//   />
// </td>
//                     <td>
//                       <input
//                         type="text"
//                         value={item.price}
//                         onChange={(e) => handlePriceChange(index, e.target.value)}
//                         placeholder="Enter price"
//                       />
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )} */}
//         {items.length > 0 && (
//   <div>
//     <h4>Requested Items</h4>

//     {/* ✅ Show selected customer name */}
//     <p><strong>Customer Name:</strong> {selectedCustomer?.label || '-'}</p>

//     <div style={{ overflowX: 'auto', maxWidth: '100%' }}>
//   <table border="1" cellPadding="6" style={{ width: '100%', marginBottom: '20px', minWidth: '900px' }}>
//     <thead>
//       <tr>
//         <th>#</th>
//         <th>Material ID</th>
//         <th>Description</th>
//         <th>Qty</th>
//         <th>Base Unit</th>
//         <th>Order Unit</th>
//         <th>Location</th>
//         <th>Unit</th>
//         <th>Price</th>
//       </tr>
//     </thead>
//     <tbody>
//       {items.map((item, index) => (
//         <tr key={index}>
//           <td>{index + 1}</td>
//           <td>
//             <input
//               type="text"
//               value={item.materialId}
//               onChange={(e) => updateItemField(index, 'materialId', e.target.value)}
//             />
//           </td>
//           <td>
//             <input
//               type="text"
//               value={item.description}
//               onChange={(e) => updateItemField(index, 'description', e.target.value)}
//             />
//           </td>
//           <td>
//             <input
//               type="number"
//               value={item.qty}
//               onChange={(e) => updateItemField(index, 'qty', e.target.value)}
//             />
//           </td>
//           <td>
//             <input
//               type="text"
//               value={item.baseUnit}
//               onChange={(e) => updateItemField(index, 'baseUnit', e.target.value)}
//             />
//           </td>
//           <td>
//             <input
//               type="text"
//               value={item.orderUnit}
//               onChange={(e) => updateItemField(index, 'orderUnit', e.target.value)}
//             />
//           </td>
//           <td>
//             <input
//               type="text"
//               value={item.location}
//               onChange={(e) => updateItemField(index, 'location', e.target.value)}
//             />
//           </td>
//           <td>
//             <input
//               type="text"
//               value={item.unit || ''}
//               onChange={(e) => updateItemField(index, 'unit', e.target.value)}
//               placeholder="Enter unit"
//             />
//           </td>
//           <td>
//             <input
//               type="text"
//               value={item.price}
//               onChange={(e) => updateItemField(index, 'price', e.target.value)}
//               placeholder="Enter price"
//             />
//           </td>
//         </tr>
//       ))}
//     </tbody>
//   </table>
// </div>

//   </div>
// )}


//         <button type="submit">Submit Quotation</button>
//       </form>


//     </div>
//   );
// }

// export default SalesQuotationForm;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Select from 'react-select';

// function SalesQuotationForm() {
//   const [salesRequests, setSalesRequests] = useState([]);
//   const [quotationCategories, setQuotationCategories] = useState([]);
//   const [customers, setCustomers] = useState([]);
//   const [savedQuotations, setSavedQuotations] = useState([]);

//   const [selectedRequest, setSelectedRequest] = useState(null);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [selectedCustomer, setSelectedCustomer] = useState(null);
//   const [note, setNote] = useState('');
//   const [validityDate, setValidityDate] = useState('');
//   const [items, setItems] = useState([]);

//   useEffect(() => {
//     axios.get('http://localhost:8080/api/salerequest/get')
//       .then(res => setSalesRequests(res.data))
//       .catch(console.error);

//     axios.get('http://localhost:8080/api/sale-quotation-categories')
//       .then(res => setQuotationCategories(res.data))
//       .catch(console.error);

//     axios.get('http://localhost:8080/api/customers')
//       .then(res => {
//         const options = res.data.map(c => ({
//           label: `${c.name1} ${c.name2}`.trim(),
//           value: c._id
//         }));
//         setCustomers(options);
//       })
//       .catch(console.error);

//     fetchSavedQuotations();
//   }, []);

//   const fetchSavedQuotations = () => {
//     axios.get('http://localhost:8080/api/salesquotations')
//       .then(res => setSavedQuotations(res.data))
//       .catch(console.error);
//   };

//   const handleRequestChange = (option) => {
//     setSelectedRequest(option);
//     const request = salesRequests.find(req => req._id === option.value);
//     if (request) {
//       setItems(request.items.map(item => ({
//         ...item,
//         price: '',
//         unit: ''
//       })));
//     }
//   };

//   const updateItemField = (index, field, value) => {
//     const updated = [...items];
//     updated[index][field] = value;
//     setItems(updated);
//   };

//   const addEmptyItem = () => {
//     setItems(prev => [
//       ...prev,
//       {
//         materialId: '',
//         description: '',
//         qty: '',
//         baseUnit: '',
//         orderUnit: '',
//         location: '',
//         unit: '',
//         price: ''
//       }
//     ]);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const data = {
//       indentId: selectedRequest?.label,
//       categoryId: selectedCategory?.value,
//       customerId: selectedCustomer?.value,
//       note,
//       validityDate,
//       items
//     };

//     axios.post('http://localhost:8080/api/salesquotations', data)
//       .then(() => {
//         alert('Quotation saved successfully!');
//         fetchSavedQuotations();
//         resetForm();
//       })
//       .catch(err => {
//         console.error(err);
//         alert('Error saving quotation');
//       });
//   };

//   const resetForm = () => {
//     setSelectedRequest(null);
//     setSelectedCategory(null);
//     setSelectedCustomer(null);
//     setNote('');
//     setValidityDate('');
//     setItems([]);
//   };

//   return (
//     <div style={{ padding: '20px', marginLeft: "400px", marginTop: "50px" }}>
//       <h2>Sales Quotation Form</h2>

//       <form onSubmit={handleSubmit}>
//         <div >
//           <label>Sales Request:</label>
//           <Select
//             value={selectedRequest}
//             options={salesRequests.map(req => ({
//               label: req.indentId,
//               value: req._id
//             }))}
//             onChange={handleRequestChange}
//           />
//         </div>

//         <div >
//           <label>Quotation Category:</label>
//           <Select
//             value={selectedCategory}
//             options={quotationCategories.map(cat => ({
//               label: `${cat.categoryName} (${cat.prefix})`,
//               value: cat._id
//             }))}
//             onChange={setSelectedCategory}
//           />
//         </div>

//         <div >
//           <label>Customer:</label>
//           <Select
//             value={selectedCustomer}
//             options={customers}
//             onChange={setSelectedCustomer}
//           />
//         </div>

//         <div >
//           <label>Note:</label>
//           <textarea
//             rows="3"
//             value={note}
//             onChange={(e) => setNote(e.target.value)}
//             placeholder="Add additional notes"
//             style={{ width: '100%' }}
//           />
//         </div>

//         <div >
//           <label>Validity Date:</label>
//           <input
//             type="date"
//             value={validityDate}
//             onChange={(e) => setValidityDate(e.target.value)}
//           />
//         </div>

//         {/* ✅ Always show Add Quotation Item */}
//         <div >
//           <button type="button" onClick={addEmptyItem}>
//             + Add Quotation Item
//           </button>
//         </div>

//         {items.length > 0 && (
//           <div>
//             <h4>Requested Items</h4>
//             <p><strong>Customer Name:</strong> {selectedCustomer?.label || '-'}</p>

//             <div style={{ overflowX: 'auto', maxWidth: '100%' }}>
//               <table border="1" cellPadding="6" style={{ width: '100%', marginBottom: '20px', minWidth: '900px' }}>
//                 <thead>
//                   <tr>
//                     <th>#</th>
//                     <th>Material ID</th>
//                     <th>Description</th>
//                     <th>Qty</th>
//                     <th>Base Unit</th>
//                     <th>Order Unit</th>
//                     <th>Location</th>
//                     <th>Unit</th>
//                     <th>Price</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {items.map((item, index) => (
//                     <tr key={index}>
//                       <td>{index + 1}</td>
//                       <td>
//                         <input
//                           type="text"
//                           value={item.materialId}
//                           onChange={(e) => updateItemField(index, 'materialId', e.target.value)}
//                         />
//                       </td>
//                       <td>
//                         <input
//                           type="text"
//                           value={item.description}
//                           onChange={(e) => updateItemField(index, 'description', e.target.value)}
//                         />
//                       </td>
//                       <td>
//                         <input
//                           type="number"
//                           value={item.qty}
//                           onChange={(e) => updateItemField(index, 'qty', e.target.value)}
//                         />
//                       </td>
//                       <td>
//                         <input
//                           type="text"
//                           value={item.baseUnit}
//                           onChange={(e) => updateItemField(index, 'baseUnit', e.target.value)}
//                         />
//                       </td>
//                       <td>
//                         <input
//                           type="text"
//                           value={item.orderUnit}
//                           onChange={(e) => updateItemField(index, 'orderUnit', e.target.value)}
//                         />
//                       </td>
//                       <td>
//                         <input
//                           type="text"
//                           value={item.location}
//                           onChange={(e) => updateItemField(index, 'location', e.target.value)}
//                         />
//                       </td>
//                       <td>
//                         <input
//                           type="text"
//                           value={item.unit || ''}
//                           onChange={(e) => updateItemField(index, 'unit', e.target.value)}
//                           placeholder="Enter unit"
//                         />
//                       </td>
//                       <td>
//                         <input
//                           type="text"
//                           value={item.price}
//                           onChange={(e) => updateItemField(index, 'price', e.target.value)}
//                           placeholder="Enter price"
//                         />
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         )}

//         <button type="submit">Submit Quotation</button>
//       </form>
//     </div>
//   );
// }

// export default SalesQuotationForm;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Select from 'react-select';

// function SalesQuotationForm() {
//   const [salesRequests, setSalesRequests] = useState([]);
//   const [quotationCategories, setQuotationCategories] = useState([]);
//   const [customers, setCustomers] = useState([]);
//   const [savedQuotations, setSavedQuotations] = useState([]);

//   const [selectedRequest, setSelectedRequest] = useState(null);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [selectedCustomer, setSelectedCustomer] = useState(null);
//   const [note, setNote] = useState('');
//   const [validityDate, setValidityDate] = useState('');
//   const [items, setItems] = useState([]);

//   useEffect(() => {
//     axios.get('http://localhost:8080/api/salerequest/get')
//       .then(res => setSalesRequests(res.data))
//       .catch(console.error);

//     axios.get('http://localhost:8080/api/sale-quotation-categories')
//       .then(res => setQuotationCategories(res.data))
//       .catch(console.error);

//     axios.get('http://localhost:8080/api/customers')
//       .then(res => {
//         const options = res.data.map(c => ({
//           label: `${c.name1} ${c.name2}`.trim(),
//           value: c._id
//         }));
//         setCustomers(options);
//       })
//       .catch(console.error);

//     fetchSavedQuotations();
//   }, []);

//   const fetchSavedQuotations = () => {
//     axios.get('http://localhost:8080/api/salesquotations')
//       .then(res => setSavedQuotations(res.data))
//       .catch(console.error);
//   };

//   const handleRequestChange = (option) => {
//     setSelectedRequest(option);
//     const request = salesRequests.find(req => req._id === option.value);
//     if (request) {
//       setItems(request.items.map(item => ({
//         ...item,
//         customerName: selectedCustomer?.label || '', // Add customer name if selected
//         price: '',
//         unit: ''
//       })));
//     }
//   };

//   const handleCustomerChange = (option) => {
//     setSelectedCustomer(option);
//     // Auto-fill customerName into existing rows
//     setItems(prevItems =>
//       prevItems.map(item => ({
//         ...item,
//         customerName: option.label
//       }))
//     );
//   };

//   const updateItemField = (index, field, value) => {
//     const updated = [...items];
//     updated[index][field] = value;
//     setItems(updated);
//   };

//   const handlePrint = (quotation) => {
//     const printWindow = window.open('', '_blank');
//     const htmlContent = `
//       <html>
//         <head><title>Print Quotation</title></head>
//         <body>
//           <h2>Quotation Number: ${quotation.quotationNumber}</h2>
//           <p><strong>Indent ID:</strong> ${quotation.indentId}</p>
//           <p><strong>Customer:</strong> ${quotation.customerName}</p>
//           <p><strong>Note:</strong> ${quotation.note}</p>
//           <p><strong>Validity Date:</strong> ${quotation.validityDate}</p>
//           <h4>Items</h4>
//           <table border="1" cellspacing="0" cellpadding="6">
//             <thead>
//               <tr>
//                 <th>#</th>
//                 <th>Material ID</th>
//                 <th>Description</th>
//                 <th>Qty</th>
//                 <th>Base Unit</th>
//                 <th>Order Unit</th>
//                 <th>Location</th>
//                 <th>Unit</th>
//                 <th>Price</th>
//               </tr>
//             </thead>
//             <tbody>
//               ${quotation.items.map((item, i) => `
//                 <tr>
//                   <td>${i + 1}</td>
//                   <td>${item.materialId}</td>
//                   <td>${item.description}</td>
//                   <td>${item.qty}</td>
//                   <td>${item.baseUnit}</td>
//                   <td>${item.orderUnit}</td>
//                   <td>${item.location}</td>
//                   <td>${item.unit || ''}</td>
//                   <td>${item.price || ''}</td>
//                 </tr>
//               `).join('')}
//             </tbody>
//           </table>
//         </body>
//       </html>
//     `;
//     printWindow.document.write(htmlContent);
//     printWindow.document.close();
//     printWindow.print();
//   };

//   const addEmptyItem = () => {
//     setItems(prev => [
//       ...prev,
//       {
//         customerName: selectedCustomer?.label || '',
//         materialId: '',
//         description: '',
//         qty: '',
//         baseUnit: '',
//         orderUnit: '',
//         location: '',
//         unit: '',
//         price: ''
//       }
//     ]);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const data = {
//       indentId: selectedRequest?.label,
//       categoryId: selectedCategory?.value,
//       customerId: selectedCustomer?.value,
//       note,
//       validityDate,
//       items
//     };

//     axios.post('http://localhost:8080/api/salesquotations', data)
//       .then(() => {
//         alert('Quotation saved successfully!');
//         fetchSavedQuotations();
//         resetForm();
//       })
//       .catch(err => {
//         console.error(err);
//         alert('Error saving quotation');
//       });
//   };

//   const resetForm = () => {
//     setSelectedRequest(null);
//     setSelectedCategory(null);
//     setSelectedCustomer(null);
//     setNote('');
//     setValidityDate('');
//     setItems([]);
//   };

//   return (
//     <div style={{ padding: '20px', marginLeft: "400px", marginTop: "50px" }}>
//       <h2>Sales Quotation Form</h2>

//       <form onSubmit={handleSubmit}>
//         <div >
//           <label>Sales Request:</label>
//           <Select
//             value={selectedRequest}
//             options={salesRequests.map(req => ({
//               label: req.indentId,
//               value: req._id
//             }))}
//             onChange={handleRequestChange}
//           />
//         </div>

//         <div >
//           <label>Quotation Category:</label>
//           <Select
//             value={selectedCategory}
//             options={quotationCategories.map(cat => ({
//               label: `${cat.categoryName} (${cat.prefix})`,
//               value: cat._id
//             }))}
//             onChange={setSelectedCategory}
//           />
//         </div>

//         <div >
//           <label>Customer:</label>
//           <Select
//             value={selectedCustomer}
//             options={customers}
//             onChange={handleCustomerChange}
//           />
//         </div>

//         <div >
//           <label>Note:</label>
//           <textarea
//             rows="3"
//             value={note}
//             onChange={(e) => setNote(e.target.value)}
//             placeholder="Add additional notes"
//             style={{ width: '100%' }}
//           />
//         </div>

//         <div >
//           <label>Validity Date:</label>
//           <input
//             type="date"
//             value={validityDate}
//             onChange={(e) => setValidityDate(e.target.value)}
//           />
//         </div>

//         {/* ✅ Always show Add Quotation Item */}
//         <div >
//           <button type="button" onClick={addEmptyItem}>
//             + Add Quotation Item
//           </button>
//         </div>

//         {items.length > 0 && (
//           <div>
//             <h4>Requested Items</h4>

//             <div style={{ overflowX: 'auto', maxWidth: '100%' }}>
//               <table border="1" cellPadding="6" style={{ width: '100%', marginBottom: '20px', minWidth: '1000px' }}>
//                 <thead>
//                   <tr>
//                     <th>#</th>
//                     <th>Customer Name</th>
//                     <th>Material ID</th>
//                     <th>Description</th>
//                     <th>Qty</th>
//                     <th>Base Unit</th>
//                     <th>Order Unit</th>
//                     <th>Location</th>
//                     <th>Unit</th>
//                     <th>Price</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {items.map((item, index) => (
//                     <tr key={index}>
//                       <td>{index + 1}</td>
//                       <td>
//                         <input
//                           type="text"
//                           value={item.customerName || ''}
//                           onChange={(e) => updateItemField(index, 'customerName', e.target.value)}
//                           placeholder="Enter customer name"
//                         />
//                       </td>
//                       <td>
//                         <input
//                           type="text"
//                           value={item.materialId}
//                           onChange={(e) => updateItemField(index, 'materialId', e.target.value)}
//                         />
//                       </td>
//                       <td>
//                         <input
//                           type="text"
//                           value={item.description}
//                           onChange={(e) => updateItemField(index, 'description', e.target.value)}
//                         />
//                       </td>
//                       <td>
//                         <input
//                           type="number"
//                           value={item.qty}
//                           onChange={(e) => updateItemField(index, 'qty', e.target.value)}
//                         />
//                       </td>
//                       <td>
//                         <input
//                           type="text"
//                           value={item.baseUnit}
//                           onChange={(e) => updateItemField(index, 'baseUnit', e.target.value)}
//                         />
//                       </td>
//                       <td>
//                         <input
//                           type="text"
//                           value={item.orderUnit}
//                           onChange={(e) => updateItemField(index, 'orderUnit', e.target.value)}
//                         />
//                       </td>
//                       <td>
//                         <input
//                           type="text"
//                           value={item.location}
//                           onChange={(e) => updateItemField(index, 'location', e.target.value)}
//                         />
//                       </td>
//                       <td>
//                         <input
//                           type="text"
//                           value={item.unit || ''}
//                           onChange={(e) => updateItemField(index, 'unit', e.target.value)}
//                           placeholder="Enter unit"
//                         />
//                       </td>
//                       <td>
//                         <input
//                           type="text"
//                           value={item.price}
//                           onChange={(e) => updateItemField(index, 'price', e.target.value)}
//                           placeholder="Enter price"
//                         />
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         )}

//         <button type="submit">Submit Quotation</button>
//       </form>


//     </div>

//   );
// }

// export default SalesQuotationForm;

// ✅ TOP: import the required modules
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';

function SalesQuotationForm() {
  const [salesRequests, setSalesRequests] = useState([]);
  const [quotationCategories, setQuotationCategories] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [savedQuotations, setSavedQuotations] = useState([]);
  const [materials, setMaterials] = useState([]);

  const [selectedRequest, setSelectedRequest] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [note, setNote] = useState('');
  const [validityDate, setValidityDate] = useState('');
  const [items, setItems] = useState([]);
  const [materialSearch, setMaterialSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8080/api/salerequest/get')
      .then(res => setSalesRequests(res.data))
      .catch(console.error);

    axios.get('http://localhost:8080/api/sale-quotation-categories')
      .then(res => setQuotationCategories(res.data))
      .catch(console.error);

    axios.get('http://localhost:8080/api/customers')
      .then(res => {
        const options = res.data.map(c => ({
          label: `${c.name1} ${c.name2}`.trim(),
          value: c._id
        }));
        setCustomers(options);
      })
      .catch(console.error);

    axios.get('http://localhost:8080/api/material')
      .then(res => setMaterials(res.data))
      .catch(console.error);

    fetchSavedQuotations();
  }, []);

  const fetchSavedQuotations = () => {
    axios.get('http://localhost:8080/api/salesquotations')
      .then(res => setSavedQuotations(res.data))
      .catch(console.error);
  };

  const handleRequestChange = (option) => {
    setSelectedRequest(option);
    const request = salesRequests.find(req => req._id === option.value);
    if (request) {
      setItems(request.items.map(item => ({
        ...item,
        customerName: selectedCustomer?.label || '',
        price: '',
        unit: ''
      })));
    }
  };

  const handleCustomerChange = (option) => {
    setSelectedCustomer(option);
    setItems(prev => prev.map(item => ({
      ...item,
      customerName: option.label
    })));
  };

  const updateItemField = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
  };

  const addEmptyItem = () => {
    setItems(prev => [
      ...prev,
      {
        customerName: selectedCustomer?.label || '',
        materialId: '',
        description: '',
        qty: '',
        baseUnit: '',
        orderUnit: '',
        location: '',
        unit: '',
        price: ''
      }
    ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      indentId: selectedRequest?.label,
      categoryId: selectedCategory?.value,
      customerId: selectedCustomer?.value,
      note,
      validityDate,
      items
    };

    axios.post('http://localhost:8080/api/salesquotations', data)
      .then(() => {
        alert('Quotation saved successfully!');
        fetchSavedQuotations();
        resetForm();
      })
      .catch(err => {
        console.error(err);
        alert('Error saving quotation');
      });
  };

  const resetForm = () => {
    setSelectedRequest(null);
    setSelectedCategory(null);
    setSelectedCustomer(null);
    setNote('');
    setValidityDate('');
    setItems([]);
  };

  // ✅ Material Modal
  const MaterialModal = () => {
    const filtered = materials.filter(mat =>
      mat.materialId.toLowerCase().includes(materialSearch.toLowerCase()) ||
      mat.description.toLowerCase().includes(materialSearch.toLowerCase())
    );

    const selectMaterial = (material) => {
      const updated = [...items];
      updated[selectedItemIndex] = {
        ...updated[selectedItemIndex],
        materialId: material.materialId,
        description: material.description,
        baseUnit: material.baseUnit,
        unit: material.unit,
        price: material.price
      };
      setItems(updated);
      setShowModal(false);
    };

    return (
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ background: 'white', padding: 20, width: '80%', maxHeight: '80%', overflowY: 'scroll' }}>
          <h3>Select Material</h3>
          <input
            type="text"
            placeholder="Search by ID or Description"
            value={materialSearch}
            onChange={(e) => setMaterialSearch(e.target.value)}
            style={{ width: '100%', marginBottom: 10 }}
          />
          <table border="1" cellPadding="6" style={{ width: '100%' }}>
            <thead>
              <tr>
                <th>Material ID</th>
                <th>Description</th>
                <th>Base Unit</th>
                <th>Unit</th>
                <th>Price</th>
                <th>Select</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((mat, i) => (
                <tr key={i}>
                  <td>{mat.materialId}</td>
                  <td>{mat.description}</td>
                  <td>{mat.baseUnit}</td>
                  <td>{mat.unit}</td>
                  <td>{mat.price}</td>
                  <td><button type="button" onClick={() => selectMaterial(mat)}>Select</button></td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={() => setShowModal(false)} style={{ marginTop: 10 }}>Close</button>
        </div>
      </div>
    );
  };

  return (
    <div className='content'>
      <h2>Sales Quotation Form</h2>

      <form onSubmit={handleSubmit}>
        {/* --- select inputs --- */}
        <div className="row">
        <div className='col-xl-3 mb-2'>
          <label>Sales Request:</label>
          <Select
            value={selectedRequest}
            options={salesRequests.map(req => ({
              label: req.indentId,
              value: req._id
            }))}
            onChange={handleRequestChange}
          />
        </div>

        <div className='col-xl-3 mb-2' >
          <label>Quotation Category:</label>
          <Select
            value={selectedCategory}
            options={quotationCategories.map(cat => ({
              label: `${cat.categoryName} (${cat.prefix})`,
              value: cat._id
            }))}
            onChange={setSelectedCategory}
          />
        </div>

        <div className='col-xl-3 mb-2'>
          <label>Customer:</label>
          <Select
            value={selectedCustomer}
            options={customers}
            onChange={handleCustomerChange}
          />
        </div>
</div>
<div className="row">
        <div className='col-xl-3 mb-2'>
          <label>Note:</label>
          <textarea rows="3" className='form-control' value={note} onChange={(e) => setNote(e.target.value)} style={{ width: '100%' }} ></textarea>
        </div>

        <div className='col-xl-3 mb-2'>
          <label>Validity Date:</label>
          <input className='form-control' type="date" value={validityDate} onChange={(e) => setValidityDate(e.target.value)} />
        </div>
</div>
        {/* --- Add Item Button --- */}
        <div >
          <button type="button" className='btn btn-outline-info' onClick={addEmptyItem}>+ Add Quotation Item</button>
        </div>

        {items.length > 0 && (
          <div>
            <h4>Quotation Items</h4>
            <div style={{ overflowX: 'auto' }}>
              <table className='table table-bordered'>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Customer Name</th>
                    <th>Material ID</th>
                    <th>Description</th>
                    <th>Qty</th>
                    <th>Base Unit</th>
                    <th>Order Unit</th>
                    <th>Location</th>
                    <th>Unit</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td><input className='form-control' type="text" value={item.customerName || ''} readOnly /></td>
                      <td>
                        <input
                          value={item.materialId}
                          readOnly
                          className='form-control'
                          onClick={() => {
                            setSelectedItemIndex(index);
                            setShowModal(true);
                          }}
                          style={{ cursor: 'pointer', backgroundColor: '#f0f0f0' }}
                        />
                      </td>
                      <td><input className='form-control' value={item.description} onChange={(e) => updateItemField(index, 'description', e.target.value)} /></td>
                      <td><input className='form-control' type="number" value={item.qty} onChange={(e) => updateItemField(index, 'qty', e.target.value)} /></td>
                      <td><input className='form-control' value={item.baseUnit} onChange={(e) => updateItemField(index, 'baseUnit', e.target.value)} /></td>
                      <td><input className='form-control' value={item.orderUnit} onChange={(e) => updateItemField(index, 'orderUnit', e.target.value)} /></td>
                      <td><input className='form-control' value={item.location} onChange={(e) => updateItemField(index, 'location', e.target.value)} /></td>
                      <td><input className='form-control' value={item.unit} onChange={(e) => updateItemField(index, 'unit', e.target.value)} /></td>
                      <td><input className='form-control' value={item.price} onChange={(e) => updateItemField(index, 'price', e.target.value)} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <button type="submit" className='btn btn-success mt-2 mb-4'>Submit Quotation</button>
      </form>

      {showModal && <MaterialModal />}
    </div>
  );
}

export default SalesQuotationForm;




