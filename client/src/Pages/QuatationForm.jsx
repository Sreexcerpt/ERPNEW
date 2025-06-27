import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';

function QuotationForm() {
  const [indents, setIndents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [vendors, setVendors] = useState([]);
  const navigate = useNavigate();

  const [selectedIndent, setSelectedIndent] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [vendor, setVendor] = useState('');
  const [vendorName, setVendorName] = useState('');
  const [note, setNote] = useState('');
  const [items, setItems] = useState([]);
  const [validityDate, setValidityDate] = useState('');

  // Fetch indents
  useEffect(() => {
    axios.get('http://localhost:8080/api/indent/get')
      .then((res) => {
        setIndents(
          res.data.map((indent) => ({
            label: `${indent.indentId} (${indent.categoryName})`,
            value: indent
          }))
        );
      });
  }, []);

  // Fetch RFQ Categories
  useEffect(() => {
    axios.get('http://localhost:8080/api/rfq-categories')
      .then((res) => {
        setCategories(
          res.data.map((cat) => ({
            label: `${cat.categoryName} (${cat.prefix})`,
            value: cat._id
          }))
        );
      });
  }, []);

  // Fetch Vendors
  useEffect(() => {
    axios.get('http://localhost:8080/api/vendors')
      .then((res) => {
        const options = res.data.map((vendor) => ({
          label: `${vendor.name1} ${vendor.name2}`,
          value: vendor._id
        }));
        setVendors(options);
      })
      .catch((err) => console.error('Failed to fetch vendors:', err));
  }, []);

//   const handleIndentChange = (selectedOption) => {
//     setSelectedIndent(selectedOption.value);
//     const mappedItems = selectedOption.value.items.map((item) => ({
//       ...item,
//       unit: '',
//       price: ''
//     }));
//     setItems(mappedItems);
//   };
const handleIndentChange = (selectedOption) => {
    setSelectedIndent(selectedOption.value);
    const { buyerGroup, materialGroup, deliveryDate } = selectedOption.value;
  
    const mappedItems = selectedOption.value.items.map((item) => ({
      ...item,
      unit: item.unit || '',
      price: item.price || '',
      buyerGroup: item.buyerGroup || buyerGroup || '',
      materialGroup: item.materialGroup || materialGroup || '',
      deliveryDate: item.deliveryDate || deliveryDate || ''
    }));
  
    setItems(mappedItems);
  };
  
  
  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    // updatedItems[index].vendorName = label || '';
    setItems(updatedItems);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      indentId: selectedIndent.indentId,
      categoryId: selectedIndent.categoryId,
      rfqCategoryId: selectedCategory?.value,
      vendor, 
      vendorName,
      validityDate,  // vendor ID
      note,
      items
    };

    try {
      const res = await axios.post('http://localhost:8080/api/quotations/create', payload);
      alert('Quotation Created Successfully');
      console.log(res.data);
      navigate('/Quotationdisplay');
    } catch (err) {
      console.error(err);
      alert('Failed to create quotation');
    }
  };

  return (
    
        <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto',marginLeft:'300px',marginBottom:'-300px' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Create Quotation from Indent</h2>
      
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', fontWeight: 'bold' }}>Select Indent:</label>
            <Select options={indents} onChange={handleIndentChange} placeholder="Select an Indent" />
          </div>
      
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', fontWeight: 'bold' }}>Select RFQ Category:</label>
            <Select options={categories} onChange={setSelectedCategory} placeholder="Select Category" />
          </div>
      
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', fontWeight: 'bold' }}>Vendor Name:</label>
            <Select
              options={vendors}
              onChange={(selected) => {
                setVendor(selected?.value);
                setVendorName(selected?.label);
              }}
              placeholder="Select a Vendor"
            />
          </div>
      
          {selectedIndent && (
            <form onSubmit={handleSubmit}>
              
      
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontWeight: 'bold' }}>Validity Date:</label>
                <input
                  type="date"
                  value={validityDate}
                  onChange={(e) => setValidityDate(e.target.value)}
                  style={{ padding: '8px', width: '200px' }}
                />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', fontWeight: 'bold' }}>Note:</label>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={2}
                  style={{ width: '100%', padding: '8px' }}
                  placeholder="Add any notes (optional)"
                />
              </div>
              <div style={{ maxHeight: '400px', overflowX: 'auto', overflowY: 'scroll', marginBottom: '20px' }}>
                <table border="1" cellPadding="6" style={{ width: '100%', minWidth: '1200px', borderCollapse: 'collapse' }}>
                  <thead style={{ backgroundColor: '#f9f9f9', position: 'sticky', top: 0 }}>
                    <tr>
                      <th>#</th>
                      <th>Material ID</th>
                      <th>Description</th>
                      <th>Qty</th>
                      <th>Base Unit</th>
                      <th>Order Unit</th>
                      <th>Location</th>
                      <th>Buyer Group</th>
                      <th>Unit (Enter)</th>
                      <th>Material Group</th>
                      <th>Delivery Date</th>
                      <th>Vendor Name</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td><input value={item.materialId} onChange={(e) => handleItemChange(index, 'materialId', e.target.value)} /></td>
                        <td><input value={item.description} onChange={(e) => handleItemChange(index, 'description', e.target.value)} /></td>
                        <td><input type="number" value={item.qty} onChange={(e) => handleItemChange(index, 'qty', e.target.value)} /></td>
                        <td><input value={item.baseUnit} onChange={(e) => handleItemChange(index, 'baseUnit', e.target.value)} /></td>
                        <td><input value={item.orderUnit} onChange={(e) => handleItemChange(index, 'orderUnit', e.target.value)} /></td>
                        <td><input value={item.location} onChange={(e) => handleItemChange(index, 'location', e.target.value)} /></td>
                        <td><input value={item.buyerGroup} onChange={(e) => handleItemChange(index, 'buyerGroup', e.target.value)} /></td>
                        <td><input value={item.unit} onChange={(e) => handleItemChange(index, 'unit', e.target.value)} /></td>
                        <td><input value={item.materialGroup} onChange={(e) => handleItemChange(index, 'materialGroup', e.target.value)} /></td>
                        <td>
                          <input
                            type="date"
                            value={item.deliveryDate?.split('T')[0]}
                            onChange={(e) => handleItemChange(index, 'deliveryDate', e.target.value)}
                          />
                        </td>
                        <td>{vendorName}</td>
                        <td><input type="number" value={item.price} onChange={(e) => handleItemChange(index, 'price', e.target.value)} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
      
              <button type="submit" style={{ padding: '10px 20px', fontWeight: 'bold', cursor: 'pointer' }}>
                Submit Quotation
              </button>
            </form>
          )}
        </div>
      );
      
}

export default QuotationForm;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Select from 'react-select';

// function QuotationFormWithIndent() {
//   const [indents, setIndents] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [quotationOptions, setQuotationOptions] = useState([]);

//   const [selectedQuotation, setSelectedQuotation] = useState(null);
//   const [selectedIndent, setSelectedIndent] = useState(null);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [vendor, setVendor] = useState('');
//   const [note, setNote] = useState('');
//   const [items, setItems] = useState([]);

//   // Fetch indents
//   useEffect(() => {
//     axios.get('http://localhost:8080/api/indent/get').then((res) => {
//       setIndents(
//         res.data.map((indent) => ({
//           label: `${indent.indentId} (${indent.categoryName})`,
//           value: indent
//         }))
//       );
//     });
//   }, []);

//   // Fetch RFQ categories
//   useEffect(() => {
//     axios.get('http://localhost:8080/api/rfq-categories').then((res) => {
//       setCategories(
//         res.data.map((cat) => ({
//           label: `${cat.categoryName} (${cat.prefix})`,
//           value: cat._id
//         }))
//       );
//     });
//   }, []);

//   // Fetch existing quotations
//   useEffect(() => {
//     axios.get('http://localhost:8080/api/quotations').then((res) => {
//       setQuotationOptions(
//         res.data.map((q) => ({
//           label: `${q.indentId} - ${q.vendor}`,
//           value: q._id
//         }))
//       );
//     });
//   }, []);

//   const handleQuotationSelect = async (option) => {
//     try {
//       const res = await axios.get(`http://localhost:8080/api/quotations/${option.value}`);
//       const data = res.data;

//       setSelectedQuotation(data._id);
//       setVendor(data.vendor);
//       setNote(data.note);

//       // Match category
//       const catMatch = categories.find((cat) => cat.value === data.rfqCategoryId);
//       if (catMatch) setSelectedCategory(catMatch);

//       // Match indent
//       const indentMatch = indents.find((i) => i.value.indentId === data.indentId);
//       if (indentMatch) {
//         setSelectedIndent(indentMatch.value);
//         const mappedItems = data.items.map((item) => ({
//           ...item,
//           unit: item.unit || '',
//           price: item.price || ''
//         }));
//         setItems(mappedItems);
//       }
//     } catch (err) {
//       console.error('Error loading quotation:', err);
//       alert('Failed to load quotation data');
//     }
//   };

//   const handleIndentChange = (selectedOption) => {
//     setSelectedIndent(selectedOption.value);
//     setItems(
//       selectedOption.value.items.map((item) => ({
//         ...item,
//         unit: '',
//         price: ''
//       }))
//     );
//   };

//   const handleItemChange = (index, field, value) => {
//     const updatedItems = [...items];
//     updatedItems[index][field] = value;
//     setItems(updatedItems);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const payload = {
//       indentId: selectedIndent.indentId,
//       categoryId: selectedIndent.categoryId,
//       rfqCategoryId: selectedCategory?.value,
//       vendor,
//       note,
//       items
//     };

//     try {
//       if (selectedQuotation) {
//         await axios.put(`http://localhost:8080/api/quotations/${selectedQuotation}`, payload);
//         alert('Quotation Updated Successfully');
//       } else {
//         await axios.post('http://localhost:8080/api/quotations/create', payload);
//         alert('Quotation Created Successfully');
//       }
//     } catch (err) {
//       console.error(err);
//       alert('Failed to submit quotation');
//     }
//   };

//   return (
//     <div style={{ padding: '20px', marginLeft: '300px', marginBottom: '-300px' }}>
//       <h2>{selectedQuotation ? 'Edit Quotation' : 'Create Quotation from Indent'}</h2>

//       <label>Select Existing Quotation (Optional to Edit):</label>
//       <Select
//         options={quotationOptions}
//         onChange={handleQuotationSelect}
//         placeholder="Choose Quotation to Edit"
//       />

//       <label style={{ marginTop: '15px' }}>Select Indent:</label>
//       <Select
//         options={indents}
//         onChange={handleIndentChange}
//         value={indents.find((i) => i.value.indentId === selectedIndent?.indentId)}
//         placeholder="Select an Indent"
//       />

//       <label style={{ marginTop: '15px' }}>Select RFQ Category:</label>
//       <Select
//         options={categories}
//         onChange={setSelectedCategory}
//         value={categories.find((c) => c.value === selectedCategory?.value)}
//         placeholder="Select Category"
//       />

//       {selectedIndent && (
//         <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
//           <label>Vendor Name:</label>
//           <input
//             value={vendor}
//             onChange={(e) => setVendor(e.target.value)}
//             required
//             style={{ width: '100%' }}
//           />

//           <label>Note:</label>
//           <textarea
//             value={note}
//             onChange={(e) => setNote(e.target.value)}
//             rows={2}
//             style={{ width: '100%' }}
//           />

//           <table border="1" cellPadding="6" style={{ width: '100%', marginTop: '20px' }}>
//             <thead>
//               <tr>
//                 <th>#</th>
//                 <th>Material ID</th>
//                 <th>Description</th>
//                 <th>Qty</th>
//                 <th>Base Unit</th>
//                 <th>Order Unit</th>
//                 <th>Location</th>
//                 <th>Unit (Enter)</th>
//                 <th>Price (Enter)</th>
//               </tr>
//             </thead>
//             <tbody>
//               {items.map((item, index) => (
//                 <tr key={index}>
//                   <td>{index + 1}</td>
//                   <td>{item.materialId}</td>
//                   <td>{item.description}</td>
//                   <td>{item.qty}</td>
//                   <td>{item.baseUnit}</td>
//                   <td>{item.orderUnit}</td>
//                   <td>{item.location}</td>
//                   <td>
//                     <input
//                       value={item.unit}
//                       onChange={(e) => handleItemChange(index, 'unit', e.target.value)}
//                     />
//                   </td>
//                   <td>
//                     <input
//                       type="number"
//                       value={item.price}
//                       onChange={(e) => handleItemChange(index, 'price', e.target.value)}
//                     />
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           <button type="submit" style={{ marginTop: '20px' }}>
//             {selectedQuotation ? 'Update Quotation' : 'Submit Quotation'}
//           </button>
//         </form>
//       )}
//     </div>
//   );
// }

// export default QuotationFormWithIndent;

