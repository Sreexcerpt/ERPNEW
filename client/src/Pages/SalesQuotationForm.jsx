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
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Select from 'react-select';

// function SalesQuotationForm() {
//   const [salesRequests, setSalesRequests] = useState([]);
//   const [quotationCategories, setQuotationCategories] = useState([]);
//   const [customers, setCustomers] = useState([]);
//   const [savedQuotations, setSavedQuotations] = useState([]);
//   const [materials, setMaterials] = useState([]);

//   const [selectedRequest, setSelectedRequest] = useState(null);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [selectedCustomer, setSelectedCustomer] = useState(null);
//   const [note, setNote] = useState('');
//   const [validityDate, setValidityDate] = useState('');
//   const [items, setItems] = useState([]);
//   const [materialSearch, setMaterialSearch] = useState('');
//   const [showModal, setShowModal] = useState(false);
//   const [selectedItemIndex, setSelectedItemIndex] = useState(null);

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

//     axios.get('http://localhost:8080/api/material')
//       .then(res => setMaterials(res.data))
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
//         customerName: selectedCustomer?.label || '',
//         price: '',
//         unit: ''
//       })));
//     }
//   };

//   const handleCustomerChange = (option) => {
//     setSelectedCustomer(option);
//     setItems(prev => prev.map(item => ({
//       ...item,
//       customerName: option.label
//     })));
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

//   // ✅ Material Modal
//   const MaterialModal = () => {
//     const filtered = materials.filter(mat =>
//       mat.materialId.toLowerCase().includes(materialSearch.toLowerCase()) ||
//       mat.description.toLowerCase().includes(materialSearch.toLowerCase())
//     );

//     const selectMaterial = (material) => {
//       const updated = [...items];
//       updated[selectedItemIndex] = {
//         ...updated[selectedItemIndex],
//         materialId: material.materialId,
//         description: material.description,
//         baseUnit: material.baseUnit,
//         unit: material.unit,
//         price: material.price
//       };
//       setItems(updated);
//       setShowModal(false);
//     };

//     return (
//       <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//         <div style={{ background: 'white', padding: 20, width: '80%', maxHeight: '80%', overflowY: 'scroll' }}>
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
//               {filtered.map((mat, i) => (
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
//           <button onClick={() => setShowModal(false)} style={{ marginTop: 10 }}>Close</button>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className='content'>
//       <h2>Sales Quotation Form</h2>

//       <form onSubmit={handleSubmit}>
//         {/* --- select inputs --- */}
//         <div className="row">
//         <div className='col-xl-3 mb-2'>
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

//         <div className='col-xl-3 mb-2' >
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

//         <div className='col-xl-3 mb-2'>
//           <label>Customer:</label>
//           <Select
//             value={selectedCustomer}
//             options={customers}
//             onChange={handleCustomerChange}
//           />
//         </div>
// </div>
// <div className="row">
//         <div className='col-xl-3 mb-2'>
//           <label>Note:</label>
//           <textarea rows="3" className='form-control' value={note} onChange={(e) => setNote(e.target.value)} style={{ width: '100%' }} ></textarea>
//         </div>

//         <div className='col-xl-3 mb-2'>
//           <label>Validity Date:</label>
//           <input className='form-control' type="date" value={validityDate} onChange={(e) => setValidityDate(e.target.value)} />
//         </div>
// </div>
//         {/* --- Add Item Button --- */}
//         <div >
//           <button type="button" className='btn btn-outline-info' onClick={addEmptyItem}>+ Add Quotation Item</button>
//         </div>

//         {items.length > 0 && (
//           <div>
//             <h4>Quotation Items</h4>
//             <div style={{ overflowX: 'auto' }}>
//               <table className='table table-bordered'>
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
//                       <td><input className='form-control' type="text" value={item.customerName || ''} readOnly /></td>
//                       <td>
//                         <input
//                           value={item.materialId}
//                           readOnly
//                           className='form-control'
//                           onClick={() => {
//                             setSelectedItemIndex(index);
//                             setShowModal(true);
//                           }}
//                           style={{ cursor: 'pointer', backgroundColor: '#f0f0f0' }}
//                         />
//                       </td>
//                       <td><input className='form-control' value={item.description} onChange={(e) => updateItemField(index, 'description', e.target.value)} /></td>
//                       <td><input className='form-control' type="number" value={item.qty} onChange={(e) => updateItemField(index, 'qty', e.target.value)} /></td>
//                       <td><input className='form-control' value={item.baseUnit} onChange={(e) => updateItemField(index, 'baseUnit', e.target.value)} /></td>
//                       <td><input className='form-control' value={item.orderUnit} onChange={(e) => updateItemField(index, 'orderUnit', e.target.value)} /></td>
//                       <td><input className='form-control' value={item.location} onChange={(e) => updateItemField(index, 'location', e.target.value)} /></td>
//                       <td><input className='form-control' value={item.unit} onChange={(e) => updateItemField(index, 'unit', e.target.value)} /></td>
//                       <td><input className='form-control' value={item.price} onChange={(e) => updateItemField(index, 'price', e.target.value)} /></td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         )}

//         <button type="submit" className='btn btn-success mt-2 mb-4'>Submit Quotation</button>
//       </form>

//       {showModal && <MaterialModal />}
//     </div>
//   );
// }

// export default SalesQuotationForm;






import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SalesQuotationForm() {
  const [salesRequests, setSalesRequests] = useState([]);
  const [quotationCategories, setQuotationCategories] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [salesGroup, setSalesGroup] = useState('');


  const [savedQuotations, setSavedQuotations] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [note, setNote] = useState('');
  const [validityDate, setValidityDate] = useState('');
  const [items, setItems] = useState([]);

  const [materialSearch, setMaterialSearch] = useState('');
  const [customerSearch, setCustomerSearch] = useState('');
  const [requestSearch, setRequestSearch] = useState('');

  const [showMaterialModal, setShowMaterialModal] = useState(false);
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);

  useEffect(() => {
    // Fetch and filter sales requests (indents)
axios.get('http://localhost:8080/api/salerequest/get')
.then(res => {
  const activeRequests = res.data.filter(r => !r.isBlocked && !r.isDeleted);
  setSalesRequests(activeRequests);
})
.catch(console.error);
    axios.get('http://localhost:8080/api/sale-quotation-categories').then(res => setQuotationCategories(res.data)).catch(console.error);
   // Fetch and filter customers
axios.get('http://localhost:8080/api/customers')
.then(res => {
  const activeCustomers = res.data.filter(c => !c.isBlocked && !c.isDeleted);
  setCustomers(activeCustomers);
})
.catch(console.error);
    axios.get('http://localhost:8080/api/material').then(res => setMaterials(res.data)).catch(console.error);
    fetchSavedQuotations();
  }, []);

  const fetchSavedQuotations = () => {
    axios.get('http://localhost:8080/api/salesquotations')
      .then(res => setSavedQuotations(res.data))
      .catch(console.error);
  };

  const handleRequestSelect = (req) => {
    setSelectedRequest({ label: req.indentId, value: req._id  });
    setSalesGroup(req.salesGroup || '');
    setItems(req.items.map(item => ({
      ...item,
      customerName: selectedCustomer?.name1 || '',
      price: '',
      unit: ''
    })));
    setShowRequestModal(false);
  };

  const handleCustomerSelect = (customer) => {
    setSelectedCustomer({ label: `${customer.name1} ${customer.name2}`, value: customer._id });
    setItems(prev => prev.map(item => ({ ...item, customerName: customer.name1 })));
    setShowCustomerModal(false);
  };

  const handleMaterialSelect = (mat) => {
    const updated = [...items];
    updated[selectedItemIndex] = {
      ...updated[selectedItemIndex],
      materialId: mat.materialId,
      description: mat.description,
      baseUnit: mat.baseUnit,
      unit: mat.unit,
      price: mat.price
    };
    setItems(updated);
    setShowMaterialModal(false);
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
      salesGroup,
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

  const ModalWrapper = ({ children, onClose }) => (
    <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header bg-primary text-white">
            <h5 className="modal-title">Select</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">{children}</div>
        </div>
      </div>
    </div>
  );

 
  const MaterialModal = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [searchType, setSearchType] = useState('materialId');
  
   
  
    const handleSearchInputChange = (e) => {
      const value = e.target.value;
      setMaterialSearch(value);
  
      const filtered = materials.filter((mat) => {
        const target = searchType === 'materialId' ? mat.materialId : mat.description;
        return target?.toLowerCase().includes(value.toLowerCase());
      });
  
      setSearchResults(filtered);
    };
  
    const handleViewAll = () => {
      setSearchResults(materials);
      setMaterialSearch('');
    };
  
    const handleClearResults = () => {
      setSearchResults([]);
      setMaterialSearch('');
    };
  
    return (
      <ModalWrapper onClose={() => setShowMaterialModal(false)}>
        {/* Search Controls */}
        <div className="row mb-3">
          <div className="col-md-3">
            <label className="form-label">Search Type</label>
            <select
              className="form-select"
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
            >
              <option value="materialId">Material ID</option>
              <option value="description">Description</option>
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label">Search Query</label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="fas fa-search"></i>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder={
                  searchType === 'materialId'
                    ? 'Enter Material ID (e.g., MMNR-100001)'
                    : 'Search by Description...'
                }
                value={materialSearch}
                onChange={handleSearchInputChange}
              />
            </div>
          </div>
          <div className="col-md-3">
            <label className="form-label">&nbsp;</label>
            <div className="d-flex gap-2">
              <button className="btn btn-info" onClick={handleViewAll}>
                <i className="fas fa-list me-1"></i>View All
              </button>
              {searchResults.length > 0 && (
                <button className="btn btn-outline-secondary" onClick={handleClearResults}>
                  <i className="fas fa-times me-1"></i>Clear
                </button>
              )}
            </div>
          </div>
        </div>
  
        {/* Search Results Table */}
        <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
          {searchResults.length > 0 ? (
            <table className="table table-hover">
              <thead className="table-light sticky-top">
                <tr>
                  <th>Material ID</th>
                  <th>Description</th>
                  <th>Base Unit</th>
                  <th>Unit</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {searchResults.map((material, idx) => (
                  <tr key={idx}>
                    <td>
                      <span className="badge bg-secondary">{material.materialId}</span>
                    </td>
                    <td>{material.description}</td>
                    <td>{material.baseUnit}</td>
                    <td>{material.unit}</td>
                    <td>{material.price}</td>
                    <td>
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => handleMaterialSelect(material)}
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
                {materials.length === 0
                  ? 'No materials loaded from API'
                  : materialSearch
                    ? `No materials found matching "${materialSearch}"`
                    : 'Enter search term or click "View All"'}
              </p>
            </div>
          )}
        </div>
  
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setShowMaterialModal(false)}
          >
            <i className="fas fa-times me-1"></i>Close
          </button>
        </div>
      </ModalWrapper>
    );
  };
  
  

  const CustomerModal = () => {
    const [searchType, setSearchType] = useState('name1');
    const [searchResults, setSearchResults] = useState([]);
  

  
    const handleSearchInputChange = (e) => {
      const value = e.target.value;
      setCustomerSearch(value);
  
      const filtered = customers.filter((c) => {
        const target =
          searchType === 'name1'
            ? c.name1
            : searchType === 'city'
            ? c.city
            : searchType === 'region'
            ? c.region
            : `${c.name1} ${c.name2}`;
        return target?.toLowerCase().includes(value.toLowerCase());
      });
  
      setSearchResults(filtered);
    };
  
    const handleViewAll = () => {
      setSearchResults(customers);
      setCustomerSearch('');
    };
  
    const handleClearResults = () => {
      setSearchResults([]);
      setCustomerSearch('');
    };
  
    return (
      <ModalWrapper onClose={() => setShowCustomerModal(false)}>
        {/* Search Controls */}
        <div className="row mb-3">
          <div className="col-md-3">
            <label className="form-label">Search Type</label>
            <select
              className="form-select"
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
            >
              <option value="name1">Name</option>
              <option value="city">City</option>
              <option value="region">Region</option>
            </select>
          </div>
  
          <div className="col-md-6">
            <label className="form-label">Search Query</label>
            <div className="input-group">
              <span className="input-group-text"><i className="fas fa-search"></i></span>
              <input
                type="text"
                className="form-control"
                placeholder="Type to search..."
                value={customerSearch}
                onChange={handleSearchInputChange}
              />
            </div>
          </div>
  
          <div className="col-md-3 d-flex align-items-end gap-2">
            <button className="btn btn-info" onClick={handleViewAll}>
              <i className="fas fa-list me-1"></i>View All
            </button>
            {searchResults.length > 0 && (
              <button className="btn btn-outline-secondary" onClick={handleClearResults}>
                <i className="fas fa-times me-1"></i>Clear
              </button>
            )}
          </div>
        </div>
  
        {/* Results */}
        <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
          {searchResults.length > 0 ? (
            <table className="table table-hover">
              <thead className="table-light sticky-top">
                <tr>
                  <th>Name</th>
                  <th>City</th>
                  <th>Region</th>
                  <th>Contact</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {searchResults.map((c, idx) => (
                  <tr key={idx}>
                    <td>{c.name1} {c.name2}</td>
                    <td>{c.city}</td>
                    <td>{c.region}</td>
                    <td>{c.contactNo}</td>
                    <td>
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => handleCustomerSelect(c)}
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
                {customers.length === 0
                  ? 'No customers loaded'
                  : customerSearch
                  ? `No match found for "${customerSearch}"`
                  : 'Enter a search term or click "View All"'}
              </p>
            </div>
          )}
        </div>
  
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={() => setShowCustomerModal(false)}>
            <i className="fas fa-times me-1"></i>Close
          </button>
        </div>
      </ModalWrapper>
    );
  };
  

  const RequestModal = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [searchType, setSearchType] = useState('indentId');
    const [requestSearch, setRequestSearch] = useState('');
  
   
  
    const handleSearchInputChange = (e) => {
      const value = e.target.value;
      setRequestSearch(value);
  
      const filtered = salesRequests.filter((req) => {
        const target =
          searchType === 'indentId'
            ? req.indentId
            : searchType === 'categoryName'
            ? req.categoryName
            : req.location;
        return target?.toLowerCase().includes(value.toLowerCase());
      });
  
      setSearchResults(filtered);
    };
  
    const handleViewAll = () => {
      setSearchResults(salesRequests);
      setRequestSearch('');
    };
  
    const handleClearResults = () => {
      setSearchResults([]);
      setRequestSearch('');
    };
  
    return (
      <ModalWrapper onClose={() => setShowRequestModal(false)}>
        {/* Search Controls */}
        <div className="row mb-3">
          <div className="col-md-3">
            <label className="form-label">Search Type</label>
            <select
              className="form-select"
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
            >
              <option value="indentId">Indent ID</option>
              <option value="categoryName">Category</option>
              <option value="location">Location</option>
            </select>
          </div>
  
          <div className="col-md-6">
            <label className="form-label">Search Query</label>
            <div className="input-group">
              <span className="input-group-text"><i className="fas fa-search"></i></span>
              <input
                type="text"
                className="form-control"
                placeholder="Search..."
                value={requestSearch}
                onChange={handleSearchInputChange}
              />
            </div>
          </div>
  
          <div className="col-md-3 d-flex align-items-end gap-2">
            <button className="btn btn-info" onClick={handleViewAll}>
              <i className="fas fa-list me-1"></i>View All
            </button>
            {searchResults.length > 0 && (
              <button className="btn btn-outline-secondary" onClick={handleClearResults}>
                <i className="fas fa-times me-1"></i>Clear
              </button>
            )}
          </div>
        </div>
  
        {/* Search Results Table */}
        <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
          {searchResults.length > 0 ? (
            <table className="table table-hover">
              <thead className="table-light sticky-top">
                <tr>
                  <th>Indent ID</th>
                  <th>Category</th>
                  <th>Location</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {searchResults.map((r, idx) => (
                  <tr key={idx}>
                    <td>{r.indentId}</td>
                    <td>{r.categoryName}</td>
                    <td>{r.location}</td>
                    <td>
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => handleRequestSelect(r)}
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
                {salesRequests.length === 0
                  ? 'No sales requests found'
                  : requestSearch
                  ? `No match for "${requestSearch}"`
                  : 'Enter a search term or click "View All"'}
              </p>
            </div>
          )}
        </div>
  
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={() => setShowRequestModal(false)}>
            <i className="fas fa-times me-1"></i>Close
          </button>
        </div>
      </ModalWrapper>
    );
  };
  

  return (
    <div className="container">
      <h2 className="mb-4">Sales Quotation Form</h2>
      <form onSubmit={handleSubmit}>
      <div className="row mb-2">
 
      <div className="col-md-4">
  <label>Sales Request:</label>
  <div className="input-group">
    <input
      className="form-control"
      placeholder="Type or search Indent"
      value={selectedRequest?.label || ''}
      onChange={(e) => {
        const val = e.target.value;
        setSelectedRequest({ label: val, value: null }); // Reset value if manual entry
      }}
    />
    <button
      className="btn btn-outline-primary"
      type="button"
      onClick={() => setShowRequestModal(true)}
    >
      🔍
    </button>
  </div>
</div>

  {/* Customer Input + Search Button */}
  <div className="col-md-4">
  <label>Customer:</label>
  <div className="input-group">
    <input
      className="form-control"
      placeholder="Type or search Customer"
      value={selectedCustomer?.label || ''}
      onChange={(e) => {
        const val = e.target.value;
        setSelectedCustomer({ label: val, value: null }); // Manual typing
      }}
    />
    <button
      className="btn btn-outline-primary"
      type="button"
      onClick={() => setShowCustomerModal(true)}
    >
      🔍
    </button>
  </div>
</div>


  {/* Quotation Category remains same */}
  <div className="col-md-4">
    <label>Quotation Category:</label>
    <select
      className="form-select"
      value={selectedCategory?.value || ''}
      onChange={(e) => {
        const value = e.target.value;
        const found = quotationCategories.find(cat => cat._id === value);
        setSelectedCategory(found ? { label: found.categoryName, value: found._id } : null);
      }}
    >
      <option value="">Select</option>
      {quotationCategories.map(cat => (
        <option key={cat._id} value={cat._id}>
          {cat.categoryName} ({cat.prefix})
        </option>
      ))}
    </select>
  </div>
</div>


        {/* <div className="row mb-2">
          <div className="col-md-6">
            <label>Note:</label>
            <textarea className="form-control" rows="2" value={note} onChange={(e) => setNote(e.target.value)} />
          </div>
          <div className="col-md-3">
            <label>Validity Date:</label>
            <input type="date" className="form-control" value={validityDate} onChange={(e) => setValidityDate(e.target.value)} />
          </div>
        </div> */}
         <div className="row mb-2">
         
          <div className="col-md-3">
            <label>Validity Date:</label>
            <input type="date" className="form-control" value={validityDate} onChange={(e) => setValidityDate(e.target.value)} />
          </div>
          <div className="col-md-3">
  <label>Sales Group</label>
  <input
    type="text"
    className="form-control"
    value={salesGroup}
    onChange={(e) => setSalesGroup(e.target.value)}
    placeholder="Enter or edit Sales Group"
  />
</div>
 <div className="col-md-6">
            <label>Note:</label>
            <textarea className="form-control" rows="2" value={note} onChange={(e) => setNote(e.target.value)} />
          </div>
        </div>

        <button type="button" className="btn btn-outline-info my-2" onClick={addEmptyItem}>+ Add Quotation Item</button>

          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr><th>#</th><th>Material ID</th><th>Description</th><th>Qty</th><th>Base Unit</th><th>Order Unit</th><th>Location</th><th>Customer</th><th>Unit</th><th>Price</th></tr>
              </thead>
              <tbody>
                {items.map((item, idx) => (
                  <tr key={idx}>
                    <td>{idx + 1}</td>
                  
                    <td>
  <div className="input-group input-group-sm">
    <input
      className="form-control"
      placeholder="Type or search Material"
      value={item.materialId}
      onChange={(e) => updateItemField(idx, 'materialId', e.target.value)}
    />
    <button
      className="btn btn-outline-info"
      type="button"
      title="Search Material"
      onClick={() => {
        setSelectedItemIndex(idx);
        setShowMaterialModal(true);
      }}
    >
      <i className="fas fa-search"></i>
    </button>
  </div>
</td>

                    <td><input className="form-control" value={item.description} onChange={(e) => updateItemField(idx, 'description', e.target.value)} /></td>
                    <td><input className="form-control" type="number" value={item.qty} onChange={(e) => updateItemField(idx, 'qty', e.target.value)} /></td>
                    <td><input className="form-control" value={item.baseUnit} onChange={(e) => updateItemField(idx, 'baseUnit', e.target.value)} /></td>
                    <td><input className="form-control" value={item.orderUnit} onChange={(e) => updateItemField(idx, 'orderUnit', e.target.value)} /></td>
                    <td><input className="form-control" value={item.location} onChange={(e) => updateItemField(idx, 'location', e.target.value)} /></td>
                    <td><input className="form-control" value={item.customerName} onChange={(e) => updateItemField(idx,'customerName',e.target.value)}/></td>
                    <td><input className="form-control" value={item.unit} onChange={(e) => updateItemField(idx, 'unit', e.target.value)} /></td>
                    <td><input className="form-control" value={item.price} onChange={(e) => updateItemField(idx, 'price', e.target.value)} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        

        <button type="submit" className="btn btn-success mt-3">Submit Quotation</button>
      </form>

      {/* Modals */}
      {showMaterialModal && <MaterialModal />}
      {showCustomerModal && <CustomerModal />}
      {showRequestModal && <RequestModal />}
    </div>
  );
}

export default SalesQuotationForm;
