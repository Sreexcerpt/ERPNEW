import React, { useState, useEffect } from 'react';

function VendorPriceListForm() {
  const [formData, setFormData] = useState({
    categoryId: '',
    vendorId: '',
    materialId: '',
    unit: '',
    bum: '',
    orderUnit: '',
    buyer: '',
    taxId: ''
  });

  const [categories, setCategories] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [taxes, setTaxes] = useState([]);
  const [priceList, setPriceList] = useState([]);
  const [conversionValue, setConversionValue] = useState(1);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchCategories();
    fetchVendors();
    fetchMaterials();
    fetchTaxes();
    fetchPriceList();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/vendor-categories');
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  const fetchVendors = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/vendors');
      const data = await res.json();
      setVendors(data);
    } catch (err) {
      console.error('Error fetching vendors:', err);
    }
  };

  const fetchMaterials = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/material');
      const data = await res.json();
      setMaterials(data);
    } catch (err) {
      console.error('Error fetching materials:', err);
    }
  };

  const fetchTaxes = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/tax');
      const data = await res.json();
      setTaxes(data);
    } catch (err) {
      console.error('Error fetching taxes:', err);
    }
  };

  const fetchPriceList = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/vendor-price-lists');
      const data = await res.json();
      setPriceList(data);
    } catch (err) {
      console.error('Error fetching price list:', err);
    }
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;
    let updatedForm = { ...formData, [name]: value };

    if (name === 'materialId') {
      try {
        const res = await fetch(`http://localhost:8080/api/material/${value}`);
        const mat = await res.json();
        const conv = mat.conversionValue || 1;
        setConversionValue(conv);

        const bum = parseFloat(formData.bum) || 0;
        updatedForm.orderUnit = (bum * conv).toFixed(2);
      } catch (err) {
        console.error('Error fetching material:', err);
        setConversionValue(1);
      }
    }

    if (name === 'bum') {
      const bum = parseFloat(value);
      if (!isNaN(bum)) {
        updatedForm.orderUnit = (bum * conversionValue).toFixed(2);
      } else {
        updatedForm.orderUnit = '';
      }
    }

    setFormData(updatedForm);
  };

  const handleSubmit = async () => {
    const errors = [];
    if (!formData.unit.trim()) errors.push("Unit (Location) is required.");
    if (!formData.categoryId) errors.push("Category is required.");
    if (!formData.vendorId) errors.push("Vendor is required.");
    if (!formData.materialId) errors.push("Material is required.");
    if (!formData.bum) errors.push("BUM (Base Unit Multiplier) is required.");
    if (!formData.buyer.trim()) errors.push("Buyer is required.");

    if (errors.length > 0) {
      alert(errors.join("\n"));
      return;
    }

    try {
      if (editingId) {
        // Update existing record
        console.log('Updating with ID:', editingId);
        console.log('Form data:', formData);
        
        const res = await fetch(`http://localhost:8080/api/vendor-price-lists/${editingId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        
        console.log('Update response status:', res.status);
        
        if (res.ok) {
          alert("Vendor Price List Updated Successfully!");
          setEditingId(null);
        } else {
          const errorText = await res.text();
          console.error('Update failed:', errorText);
          throw new Error(`Update failed: ${res.status} - ${errorText}`);
        }
      } else {
        // Create new record
        const res = await fetch('http://localhost:8080/api/vendor-price-lists', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        
        if (res.ok) {
          alert("Vendor Price List Saved Successfully!");
        } else {
          const errorText = await res.text();
          console.error('Save failed:', errorText);
          throw new Error(`Save failed: ${res.status} - ${errorText}`);
        }
      }
      
      resetForm();
      setShowForm(false);
      fetchPriceList(); // Refresh the list
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Failed to save Vendor Price List: " + error.message);
    }
  };

  const resetForm = () => {
    setFormData({
      categoryId: '',
      vendorId: '',
      materialId: '',
      unit: '',
      bum: '',
      orderUnit: '',
      buyer: '',
      taxId: ''
    });
    setConversionValue(1);
    setEditingId(null);
  };

  const handleEdit = async (id) => {
    try {
      console.log('Editing ID:', id);
      const res = await fetch(`http://localhost:8080/api/vendor-price-lists/${id}`);
      
      if (!res.ok) {
        throw new Error(`Failed to fetch: ${res.status} - ${res.statusText}`);
      }
      
      const data = await res.json();
      console.log('Fetched data for edit:', data);
      
      // Extract ID from ObjectId format or use as string
      const extractId = (idField) => {
        if (!idField) return '';
        if (typeof idField === 'string') return idField;
        if (typeof idField === 'object') {
          return idField.$oid || idField._id || idField.toString();
        }
        return idField.toString();
      };
      
      setFormData({
        categoryId: extractId(data.categoryId),
        vendorId: extractId(data.vendorId),
        materialId: extractId(data.materialId),
        unit: data.unit,
        bum: data.bum,
        orderUnit: data.orderUnit,
        buyer: data.buyer,
        taxId: extractId(data.taxId)
      });
      
      setEditingId(id);
      setShowForm(true);
    } catch (err) {
      console.error('Error fetching record for edit:', err);
      alert('Failed to load record for editing: ' + err.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      try {
        const res = await fetch(`http://localhost:8080/api/vendor-price-lists/${id}`, {
          method: 'DELETE',
        });
        if (res.ok) {
          alert('Record deleted successfully!');
          fetchPriceList();
        } else {
          throw new Error('Delete failed');
        }
      } catch (err) {
        console.error('Error deleting record:', err);
        alert('Failed to delete record');
      }
    }
  };

  const handleCancel = () => {
    resetForm();
    setShowForm(false);
  };

  // Helper function to extract ID from ObjectId format
  const extractId = (idField) => {
    if (!idField) return null;
    if (typeof idField === 'string') return idField;
    if (typeof idField === 'object') {
      return idField.$oid || idField._id || idField.toString();
    }
    return idField.toString();
  };

  const getCategoryName = (categoryId) => {
    const id = extractId(categoryId);
    const category = categories.find(cat => cat._id === id);
    return category ? category.categoryName : 'Unknown';
  };

  const getVendorName = (vendorId) => {
    const id = extractId(vendorId);
    const vendor = vendors.find(v => v._id === id);
    return vendor ? vendor.name1 : 'Unknown';
  };

  const getMaterialName = (materialId) => {
    const id = extractId(materialId);
    const material = materials.find(m => m._id === id);
    return material ? material.description : 'Unknown';
  };

  const getTaxName = (taxId) => {
    if (!taxId) return 'No Tax';
    const id = extractId(taxId);
    const tax = taxes.find(t => t._id === id);
    return tax ? tax.taxName : 'Unknown';
  };

  const inputStyle = {
    width: '100%',
    padding: '8px',
    margin: '6px 0',
    borderRadius: '4px',
    border: '1px solid #ccc',
    boxSizing: 'border-box'
  };

  const labelStyle = {
    fontWeight: 'bold',
    marginTop: '10px',
    display: 'block'
  };

  const buttonStyle = {
    padding: '8px 16px',
    margin: '5px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px'
  };

  const thStyle = {
    backgroundColor: '#f2f2f2',
    padding: '12px',
    textAlign: 'left',
    borderBottom: '2px solid #ddd',
    fontWeight: 'bold'
  };

  const tdStyle = {
    padding: '10px',
    borderBottom: '1px solid #ddd'
  };

  return (
        <div className="main-wrapper">
      <div className="page-wrapper"  >
        <div className="content">
    <div >
      <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Vendor Price List Management</h2>

      {!showForm ? (
        <div>
          <button 
            onClick={() => setShowForm(true)} 
            style={{
              ...buttonStyle,
              backgroundColor: '#4CAF50',
              color: 'white',
              marginBottom: '20px'
            }}
          >
            Add New Price List
          </button>

          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Customer</th>
                <th style={thStyle}>Vendor</th>
                <th style={thStyle}>Material</th>
                <th style={thStyle}>Unit</th>
                <th style={thStyle}>BUM</th>
                <th style={thStyle}>Order Unit</th>
                <th style={thStyle}>Buyer</th>
                <th style={thStyle}>Tax</th>
                <th style={thStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {priceList.map(item => (
                <tr key={extractId(item._id)}>
                  <td style={tdStyle}>{getCategoryName(item.categoryId)}</td>
                  <td style={tdStyle}>{getVendorName(item.vendorId)}</td>
                  <td style={tdStyle}>{getMaterialName(item.materialId)}</td>
                  <td style={tdStyle}>{item.unit}</td>
                  <td style={tdStyle}>{item.bum}</td>
                  <td style={tdStyle}>{item.orderUnit}</td>
                  <td style={tdStyle}>{item.buyer}</td>
                  <td style={tdStyle}>{getTaxName(item.taxId)}</td>
                  <td style={tdStyle}>
                    <button 
                      onClick={() => handleEdit(extractId(item._id))}
                      style={{
                        ...buttonStyle,
                        backgroundColor: '#2196F3',
                        color: 'white'
                      }}
                    >
                      Edit
                    </button>
                    {/* <button 
                      onClick={() => handleDelete(extractId(item._id))}
                      style={{
                        ...buttonStyle,
                        backgroundColor: '#f44336',
                        color: 'white'
                      }}
                    >
                      Delete
                    </button> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div style={{ background: '#f4f4f4', padding: '2rem', borderRadius: '10px' }}>
          <h3>{editingId ? 'Edit Price List' : 'Add New Price List'}</h3>
          
          <div onSubmit={handleSubmit}>
          <label style={labelStyle}>Unit (Location)</label>
          <input type="text" name="unit" value={formData.unit} onChange={handleChange} style={inputStyle} required />
            <label style={labelStyle}>Category</label>
            <select name="categoryId" value={formData.categoryId} onChange={handleChange} required style={inputStyle}>
              <option value="">Select Category</option>
              {categories.map(cat => (
                <option key={cat._id} value={cat._id}>{cat.categoryName}</option>
              ))}
            </select>

            <label style={labelStyle}>Vendor</label>
            <select name="vendorId" value={formData.vendorId} onChange={handleChange} required style={inputStyle}>
              <option value="">Select Vendor</option>
              {vendors.map(v => (
                <option key={v._id} value={v._id}>{v.name1}</option>
              ))}
            </select>

            <label style={labelStyle}>Material</label>
            <select name="materialId" value={formData.materialId} onChange={handleChange} required style={inputStyle}>
              <option value="">Select Material</option>
              {materials.map(m => (
                <option key={m._id} value={m._id}>{m.description}</option>
              ))}
            </select>

           

            <label style={labelStyle}>Base Unit (BUM)</label>
            <input type="number" name="bum" value={formData.bum} onChange={handleChange} style={inputStyle} required />

            <label style={labelStyle}>Buyer</label>
            <input type="text" name="buyer" value={formData.buyer} onChange={handleChange} style={inputStyle} required />

            <label style={labelStyle}>Order Unit </label>
            <input
              type="text"
              name="orderUnit"
              value={formData.orderUnit}
              readOnly
              style={{ ...inputStyle, backgroundColor: '#e9e9e9' }}
            />

            <label style={labelStyle}>Tax</label>
            <select name="taxId" value={formData.taxId} onChange={handleChange} style={inputStyle}>
              <option value="">Select Tax</option>
              {taxes.map(tax => (
                <option key={tax._id} value={tax._id}>
                  {tax.taxName}
                </option>
              ))}
            </select>

            <div style={{ marginTop: '20px' }}>
              <button 
                type="button"
                onClick={handleSubmit}
                style={{
                  ...buttonStyle,
                  backgroundColor: '#4CAF50',
                  color: 'white'
                }}
              >
                {editingId ? 'Update' : 'Save'}
              </button>
              <button 
                type="button" 
                onClick={handleCancel}
                style={{
                  ...buttonStyle,
                  backgroundColor: '#f44336',
                  color: 'white'
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div></div></div></div>
  );
}

export default VendorPriceListForm;



// import React, { useState, useEffect } from 'react';

// // Mock data for demonstration since we don't have axios
// const mockCategories = [
//   { _id: '1', categoryName: 'Electronics' },
//   { _id: '2', categoryName: 'Furniture' },
//   { _id: '3', categoryName: 'Office Supplies' }
// ];

// const mockVendors = [
//   { _id: '1', name1: 'Tech Corp' },
//   { _id: '2', name1: 'Office Plus' },
//   { _id: '3', name1: 'Supply Co' }
// ];

// const mockMaterials = [
//   { _id: '1', description: 'Laptop', conversionValue: 1.2 },
//   { _id: '2', description: 'Desk Chair', conversionValue: 2.0 },
//   { _id: '3', description: 'Paper Ream', conversionValue: 0.5 }
// ];

// function VendorPriceListForm() {
//   const [formData, setFormData] = useState({
//     categoryId: '',
//     vendorId: '',
//     materialId: '',
//     unit: '',
//     bum: '',
//     orderUnit: ''
//   });

//   const [categories, setCategories] = useState([]);
//   const [vendors, setVendors] = useState([]);
//   const [materials, setMaterials] = useState([]);
//   const [vendorPrices, setVendorPrices] = useState([]);
//   const [conversionValue, setConversionValue] = useState(1);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editId, setEditId] = useState(null);

//   useEffect(() => {
//     fetchCategories();
//     fetchVendors();
//     fetchMaterials();
//     fetchVendorPriceLists();
//   }, []);

//   const fetchCategories = async () => {
//     // Simulate API call
//     setTimeout(() => {
//       setCategories(mockCategories);
//     }, 100);
//   };

//   const fetchVendors = async () => {
//     // Simulate API call
//     setTimeout(() => {
//       setVendors(mockVendors);
//     }, 100);
//   };

//   const fetchMaterials = async () => {
//     // Simulate API call
//     setTimeout(() => {
//       setMaterials(mockMaterials);
//     }, 100);
//   };

//   const fetchVendorPriceLists = async () => {
//     // Simulate API call
//     setTimeout(() => {
//       setVendorPrices([
//         {
//           _id: '1',
//           categoryId: '1',
//           vendorId: '1',
//           materialId: '1',
//           unit: 'Warehouse A',
//           bum: '10',
//           orderUnit: '12.00'
//         }
//       ]);
//     }, 100);
//   };

//   const handleChange = async (e) => {
//     const { name, value } = e.target;
//     let updatedForm = { ...formData, [name]: value };

//     if (name === 'materialId') {
//       try {
//         // Find material from mock data
//         const mat = materials.find(m => m._id === value);
//         const conv = mat?.conversionValue || 1;
//         setConversionValue(conv);

//         const bum = parseFloat(formData.bum) || 0;
//         updatedForm.orderUnit = (bum * conv).toFixed(2);
//       } catch (err) {
//         console.error('Error fetching material:', err);
//         setConversionValue(1);
//       }
//     }

//     if (name === 'bum') {
//       const bum = parseFloat(value);
//       if (!isNaN(bum)) {
//         updatedForm.orderUnit = (bum * conversionValue).toFixed(2);
//       } else {
//         updatedForm.orderUnit = '';
//       }
//     }

//     setFormData(updatedForm);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const errors = [];
//     if (!formData.unit.trim()) errors.push("Unit (Location) is required.");
//     if (!formData.categoryId) errors.push("Category is required.");
//     if (!formData.vendorId) errors.push("Vendor is required.");
//     if (!formData.materialId) errors.push("Material is required.");
//     if (!formData.bum) errors.push("BUM (Base Unit Multiplier) is required.");

//     if (errors.length > 0) {
//       alert(errors.join("\n"));
//       return;
//     }

//     try {
//       if (isEditing) {
//         // Simulate update
//         setVendorPrices(prev => prev.map(item => 
//           item._id === editId ? { ...formData, _id: editId } : item
//         ));
//         alert("Vendor Price List Updated Successfully!");
//       } else {
//         // Simulate create
//         const newItem = { ...formData, _id: Date.now().toString() };
//         setVendorPrices(prev => [...prev, newItem]);
//         alert("Vendor Price List Saved Successfully!");
//       }

//       setFormData({
//         categoryId: '',
//         vendorId: '',
//         materialId: '',
//         unit: '',
//         bum: '',
//         orderUnit: ''
//       });
//       setConversionValue(1);
//       setIsEditing(false);
//       setEditId(null);
//     } catch (error) {
//       console.error("Error saving data:", error);
//       alert("Failed to save Vendor Price List.");
//     }
//   };

//   const handleEdit = (price) => {
//     setFormData({
//       categoryId: price.categoryId || '',
//       vendorId: price.vendorId || '',
//       materialId: price.materialId || '',
//       unit: price.unit || '',
//       bum: price.bum || '',
//       orderUnit: price.orderUnit || ''
//     });
//     setIsEditing(true);
//     setEditId(price._id);
//   };

//   // Loading check
//   if (!categories.length || !vendors.length || !materials.length) {
//     return <div style={{ textAlign: 'center', marginTop: '50px' }}>Loading data...</div>;
//   }

//   const inputStyle = {
//     width: '100%',
//     padding: '8px',
//     margin: '6px 0',
//     borderRadius: '4px',
//     border: '1px solid #ccc',
//     boxSizing: 'border-box'
//   };

//   const labelStyle = {
//     fontWeight: 'bold',
//     marginTop: '10px',
//     display: 'block'
//   };

//   const tdStyle = { border: '1px solid #ccc', padding: '8px' };
//   const editBtnStyle = {
//     padding: '5px 10px',
//     backgroundColor: '#007BFF',
//     color: 'white',
//     border: 'none',
//     borderRadius: '4px',
//     cursor: 'pointer'
//   };

//   return (
//     <div style={{ maxWidth: '900px', margin: 'auto', padding: '2rem', background: '#f4f4f4', borderRadius: '10px' }}>
//       <h2 style={{ textAlign: 'center' }}>{isEditing ? 'Edit Vendor Price List' : 'Vendor Price List'}</h2>

//       <div onSubmit={handleSubmit}>
//         <label style={labelStyle}>Category</label>
//         <select name="categoryId" value={formData.categoryId} onChange={handleChange} required style={inputStyle}>
//           <option value="">Select Category</option>
//           {categories.map(cat => (
//             <option key={cat._id} value={cat._id}>{cat.categoryName}</option>
//           ))}
//         </select>

//         <label style={labelStyle}>Vendor</label>
//         <select name="vendorId" value={formData.vendorId} onChange={handleChange} required style={inputStyle}>
//           <option value="">Select Vendor</option>
//           {vendors.map(v => (
//             <option key={v._id} value={v._id}>{v.name1}</option>
//           ))}
//         </select>

//         <label style={labelStyle}>Material</label>
//         <select name="materialId" value={formData.materialId} onChange={handleChange} required style={inputStyle}>
//           <option value="">Select Material</option>
//           {materials.map(m => (
//             <option key={m._id} value={m._id}>{m.description}</option>
//           ))}
//         </select>

//         <label style={labelStyle}>Unit (Location)</label>
//         <input type="text" name="unit" value={formData.unit} onChange={handleChange} style={inputStyle} required />

//         <label style={labelStyle}>Base Unit Multiplier (BUM)</label>
//         <input type="number" name="bum" value={formData.bum} onChange={handleChange} style={inputStyle} required />

//         <label style={labelStyle}>Order Unit (Auto-calculated)</label>
//         <input
//           type="text"
//           name="orderUnit"
//           value={formData.orderUnit}
//           readOnly
//           style={{ ...inputStyle, backgroundColor: '#e9e9e9' }}
//         />

//         <button 
//           type="button" 
//           onClick={handleSubmit}
//           style={{
//             backgroundColor: '#4CAF50',
//             color: 'white',
//             padding: '10px 20px',
//             marginTop: '15px',
//             border: 'none',
//             borderRadius: '5px',
//             cursor: 'pointer'
//           }}
//         >
//           {isEditing ? 'Update' : 'Save'}
//         </button>
//       </div>

//       <h3 style={{ marginTop: '2rem' }}>Vendor Price List Records</h3>
//       <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
//         <thead>
//           <tr style={{ background: '#ddd' }}>
//             <th style={tdStyle}>Category</th>
//             <th style={tdStyle}>Vendor</th>
//             <th style={tdStyle}>Material</th>
//             <th style={tdStyle}>Unit</th>
//             <th style={tdStyle}>BUM</th>
//             <th style={tdStyle}>Order Unit</th>
//             <th style={tdStyle}>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {vendorPrices.map((item) => {
//             // Safe data retrieval with fallbacks
//             const category = categories.find(c => c._id === item.categoryId)?.categoryName || 'Unknown Category';
//             const vendor = vendors.find(v => v._id === item.vendorId)?.name1 || 'Unknown Vendor';
//             const material = materials.find(m => m._id === item.materialId)?.description || 'Unknown Material';

//             return (
//               <tr key={item._id}>
//                 <td style={tdStyle}>{category}</td>
//                 <td style={tdStyle}>{vendor}</td>
//                 <td style={tdStyle}>{material}</td>
//                 <td style={tdStyle}>{item.unit || ''}</td>
//                 <td style={tdStyle}>{item.bum || ''}</td>
//                 <td style={tdStyle}>{item.orderUnit || ''}</td>
//                 <td style={tdStyle}>
//                   <button onClick={() => handleEdit(item)} style={editBtnStyle}>Edit</button>
//                 </td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default VendorPriceListForm;
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function VendorPriceListForm() {
//   const [formData, setFormData] = useState({
//     categoryId: '',
//     vendorId: '',
//     materialId: '',
//     unit: '',
//     bum: '',
//     orderUnit: ''
//   });

//   const [categories, setCategories] = useState([]);
//   const [vendors, setVendors] = useState([]);
//   const [materials, setMaterials] = useState([]);
//   const [vendorPrices, setVendorPrices] = useState([]);
//   const [conversionValue, setConversionValue] = useState(1);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editId, setEditId] = useState(null);

//   useEffect(() => {
//     fetchCategories();
//     fetchVendors();
//     fetchMaterials();
//     fetchVendorPriceLists();
//   }, []);

//   const fetchCategories = async () => {
//     const res = await axios.get('http://localhost:8080/api/customer-categories');
//     setCategories(res.data);
//   };

//   const fetchVendors = async () => {
//     const res = await axios.get('http://localhost:8080/api/vendors');
//     setVendors(res.data);
//   };

//   const fetchMaterials = async () => {
//     const res = await axios.get('http://localhost:8080/api/material');
//     setMaterials(res.data);
//   };

//   const fetchVendorPriceLists = async () => {
//     const res = await axios.get('http://localhost:8080/api/vendor-price-lists');
//     setVendorPrices(res.data);
//   };

//   const handleChange = async (e) => {
//     const { name, value } = e.target;
//     let updatedForm = { ...formData, [name]: value };

//     if (name === 'materialId') {
//       try {
//         const res = await axios.get(`http://localhost:8080/api/material/${value}`);
//         const mat = res.data;
//         const conv = mat?.conversionValue || 1;
//         setConversionValue(conv);

//         const bum = parseFloat(formData.bum) || 0;
//         updatedForm.orderUnit = (bum * conv).toFixed(2);
//       } catch (err) {
//         console.error('Error fetching material:', err);
//         setConversionValue(1);
//       }
//     }

//     if (name === 'bum') {
//       const bum = parseFloat(value);
//       if (!isNaN(bum)) {
//         updatedForm.orderUnit = (bum * conversionValue).toFixed(2);
//       } else {
//         updatedForm.orderUnit = '';
//       }
//     }

//     setFormData(updatedForm);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const errors = [];
//     if (!formData.unit.trim()) errors.push("Unit (Location) is required.");
//     if (!formData.categoryId) errors.push("Category is required.");
//     if (!formData.vendorId) errors.push("Vendor is required.");
//     if (!formData.materialId) errors.push("Material is required.");
//     if (!formData.bum) errors.push("BUM (Base Unit Multiplier) is required.");

//     if (errors.length > 0) {
//       alert(errors.join("\n"));
//       return;
//     }

//     try {
//       if (isEditing) {
//         await axios.put(`http://localhost:8080/api/vendor-price-lists/${editId}`, formData);
//         alert("Vendor Price List Updated Successfully!");
//       } else {
//         await axios.post('http://localhost:8080/api/vendor-price-lists', formData);
//         alert("Vendor Price List Saved Successfully!");
//       }

//       fetchVendorPriceLists();
//       setFormData({
//         categoryId: '',
//         vendorId: '',
//         materialId: '',
//         unit: '',
//         bum: '',
//         orderUnit: ''
//       });
//       setConversionValue(1);
//       setIsEditing(false);
//       setEditId(null);
//     } catch (error) {
//       console.error("Error saving data:", error);
//       alert("Failed to save Vendor Price List.");
//     }
//   };

//   const handleEdit = (price) => {
//     setFormData({
//       categoryId: price.categoryId || '',
//       vendorId: price.vendorId || '',
//       materialId: price.materialId || '',
//       unit: price.unit || '',
//       bum: price.bum || '',
//       orderUnit: price.orderUnit || ''
//     });
//     setIsEditing(true);
//     setEditId(price._id);
//   };

//   // Loading check
//   if (!categories.length || !vendors.length || !materials.length) {
//     return <div style={{ textAlign: 'center', marginTop: '50px' }}>Loading data...</div>;
//   }

//   const inputStyle = {
//     width: '100%',
//     padding: '8px',
//     margin: '6px 0',
//     borderRadius: '4px',
//     border: '1px solid #ccc',
//     boxSizing: 'border-box'
//   };

//   const labelStyle = {
//     fontWeight: 'bold',
//     marginTop: '10px',
//     display: 'block'
//   };

//   const tdStyle = { border: '1px solid #ccc', padding: '8px' };
//   const editBtnStyle = {
//     padding: '5px 10px',
//     backgroundColor: '#007BFF',
//     color: 'white',
//     border: 'none',
//     borderRadius: '4px',
//     cursor: 'pointer'
//   };

//   return (
//     <div style={{ maxWidth: '900px', margin: 'auto', padding: '2rem', background: '#f4f4f4', borderRadius: '10px' }}>
//       <h2 style={{ textAlign: 'center' }}>{isEditing ? 'Edit Vendor Price List' : 'Vendor Price List'}</h2>

//       <form onSubmit={handleSubmit}>
//         <label style={labelStyle}>Category</label>
//         <select name="categoryId" value={formData.categoryId} onChange={handleChange} required style={inputStyle}>
//           <option value="">Select Category</option>
//           {categories.map(cat => (
//             <option key={cat._id} value={cat._id}>{cat.categoryName}</option>
//           ))}
//         </select>

//         <label style={labelStyle}>Vendor</label>
//         <select name="vendorId" value={formData.vendorId} onChange={handleChange} required style={inputStyle}>
//           <option value="">Select Vendor</option>
//           {vendors.map(v => (
//             <option key={v._id} value={v._id}>{v.name1}</option>
//           ))}
//         </select>

//         <label style={labelStyle}>Material</label>
//         <select name="materialId" value={formData.materialId} onChange={handleChange} required style={inputStyle}>
//           <option value="">Select Material</option>
//           {materials.map(m => (
//             <option key={m._id} value={m._id}>{m.description}</option>
//           ))}
//         </select>

//         <label style={labelStyle}>Unit (Location)</label>
//         <input type="text" name="unit" value={formData.unit} onChange={handleChange} style={inputStyle} required />

//         <label style={labelStyle}>Base Unit Multiplier (BUM)</label>
//         <input type="number" name="bum" value={formData.bum} onChange={handleChange} style={inputStyle} required />

//         <label style={labelStyle}>Order Unit (Auto-calculated)</label>
//         <input
//           type="text"
//           name="orderUnit"
//           value={formData.orderUnit}
//           readOnly
//           style={{ ...inputStyle, backgroundColor: '#e9e9e9' }}
//         />

//         <button type="submit" style={{
//           backgroundColor: '#4CAF50',
//           color: 'white',
//           padding: '10px 20px',
//           marginTop: '15px',
//           border: 'none',
//           borderRadius: '5px',
//           cursor: 'pointer'
//         }}>
//           {isEditing ? 'Update' : 'Save'}
//         </button>
//       </form>

//       <h3 style={{ marginTop: '2rem' }}>Vendor Price List Records</h3>
//       <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
//         <thead>
//           <tr style={{ background: '#ddd' }}>
//             <th style={tdStyle}>Category</th>
//             <th style={tdStyle}>Vendor</th>
//             <th style={tdStyle}>Material</th>
//             <th style={tdStyle}>Unit</th>
//             <th style={tdStyle}>BUM</th>
//             <th style={tdStyle}>Order Unit</th>
//             <th style={tdStyle}>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {vendorPrices.map((item) => {
//             const category = categories.find(c => c._id === item.categoryId)?.categoryName || 'Unknown';
//             const vendor = vendors.find(v => v._id === item.vendorId)?.name1 || 'Unknown';
//             const material = materials.find(m => m._id === item.materialId)?.description || 'Unknown';

//             return (
//               <tr key={item._id}>
//                 <td style={tdStyle}>{category}</td>
//                 <td style={tdStyle}>{vendor}</td>
//                 <td style={tdStyle}>{material}</td>
//                 <td style={tdStyle}>{item.unit}</td>
//                 <td style={tdStyle}>{item.bum}</td>
//                 <td style={tdStyle}>{item.orderUnit}</td>
//                 <td style={tdStyle}>
//                   <button onClick={() => handleEdit(item)} style={editBtnStyle}>Edit</button>
//                 </td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default VendorPriceListForm;
