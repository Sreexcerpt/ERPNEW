// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function CustomerForm() {
//   const [formData, setFormData] = useState({
//     categoryId: '',
//     name1: '',
//     name2: '',
//     search: '',
//     address1: '',
//     address2: '',
//     city: '',
//     pincode: '',
//     region: '',
//     country: '',
//     contactNo: '',
//     email: ''
//   });

//   const [categories, setCategories] = useState([]);
//   const [customers, setCustomers] = useState([]);
//   const [cnNo, setCnNo] = useState('');
//   const [editingId, setEditingId] = useState(null);

//   const regions = ['North', 'South', 'East', 'West', 'Central'];
//   const countries = ['India', 'USA', 'Germany', 'France', 'UK'];

//   useEffect(() => {
//     fetchCategories();
//     fetchCustomers();
//   }, []);

//   const fetchCategories = async () => {
//     const res = await axios.get('http://localhost:8080/api/customer-categories');
//     setCategories(res.data);
//   };

//   const fetchCustomers = async () => {
//     const res = await axios.get('http://localhost:8080/api/customers');
//     setCustomers(res.data);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       if (editingId) {
// //         await axios.put(`http://localhost:8080/api/customers/${editingId}`, formData);
// //         alert('Customer updated!');
// //       } else {
// //         const res = await axios.post('http://localhost:8080/api/customers', formData);
// //         setCnNo(res.data.cnNo);
// //         alert(`Customer saved! CNNo: ${res.data.cnNo}`);
// //       }

// //       fetchCustomers();
// //       setFormData({
// //         categoryId: '',
// //         name1: '',
// //         name2: '',
// //         search: '',
// //         address1: '',
// //         address2: '',
// //         city: '',
// //         pincode: '',
// //         region: '',
// //         country: '',
// //         contactNo: '',
// //         email: ''
// //       });
// //       setEditingId(null);
// //     } catch (error) {
// //       console.error(error);
// //       alert('Error saving customer');
// //     }
// //   };
// const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     const errors = [];
  
//     if (!formData.categoryId) errors.push("Category is required.");
//     if (!formData.name1.trim()) errors.push("Name 1 is required.");
//     if (!formData.search.trim()) errors.push("Search term is required.");
//     if (!formData.address1.trim()) errors.push("Address 1 is required.");
//     if (!formData.contactNo.trim()) {
//       errors.push("Contact No is required.");
//     } else if (!/^[0-9]{10}$/.test(formData.contactNo)) {
//       errors.push("Contact No must be 10 digits.");
//     }
//     if (!formData.region) errors.push("Region is required.");
//     if (!formData.country) errors.push("Country is required.");
  
//     if (errors.length > 0) {
//       alert(errors.join("\n"));
//       return;
//     }
  
//     try {
//       if (editingId) {
//         await axios.put(`http://localhost:8080/api/customers/${editingId}`, formData);
//         alert('Customer updated!');
//       } else {
//         const res = await axios.post('http://localhost:8080/api/customers', formData);
//         setCnNo(res.data.cnNo);
//         alert(`Customer saved! CNNo: ${res.data.cnNo}`);
//       }
  
//       fetchCustomers();
//       setFormData({
//         categoryId: '',
//         name1: '',
//         name2: '',
//         search: '',
//         address1: '',
//         address2: '',
//         city: '',
//         pincode: '',
//         region: '',
//         country: '',
//         contactNo: '',
//         email: ''
//       });
//       setEditingId(null);
//     } catch (error) {
//       console.error(error);
//       alert('Error saving customer');
//     }
//   };
  
//   const handleEdit = (customer) => {
//     setFormData({
//       categoryId: customer.categoryId?._id,
//       name1: customer.name1,
//       name2: customer.name2,
//       search: customer.search,
//       address1: customer.address1,
//       address2: customer.address2,
//       city: customer.city,
//       pincode: customer.pincode,
//       region: customer.region,
//       country: customer.country,
//       contactNo: customer.contactNo,
//       email: customer.email
//     });
//     setEditingId(customer._id);
//     setCnNo(customer.cnNo);
//   };

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

//   return (
//     <div style={{ maxWidth: '800px', margin: 'auto', padding: '1.5rem', background: '#f9f9f9', borderRadius: '10px' }}>
//       <h2 style={{ textAlign: 'center', color: '#333' }}>{editingId ? 'Edit Customer' : 'Add Customer'}</h2>

//       <form onSubmit={handleSubmit}>
//         <label style={labelStyle}>Category</label>
//         <select name="categoryId" value={formData.categoryId} onChange={handleChange} required style={inputStyle}>
//           <option value="">Select Category</option>
//           {categories.map(cat => (
//             <option key={cat._id} value={cat._id}>
//               {cat.categoryName} ({cat.prefix})
//             </option>
//           ))}
//         </select>

//         <label style={labelStyle}>Name 1</label>
//         <input type="text" name="name1" placeholder="Name 1" value={formData.name1} onChange={handleChange} required style={inputStyle} />

//         <label style={labelStyle}>Name 2</label>
//         <input type="text" name="name2" placeholder="Name 2" value={formData.name2} onChange={handleChange} style={inputStyle} />

//         <label style={labelStyle}>Search Term</label>
//         <input type="text" name="search" placeholder="Search Term" value={formData.search} onChange={handleChange} style={inputStyle} />

//         <label style={labelStyle}>Address 1</label>
//         <input type="text" name="address1" placeholder="Address 1" value={formData.address1} onChange={handleChange} style={inputStyle} />

//         <label style={labelStyle}>Address 2</label>
//         <input type="text" name="address2" placeholder="Address 2" value={formData.address2} onChange={handleChange} style={inputStyle} />

//         <label style={labelStyle}>City</label>
//         <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} style={inputStyle} />

//         <label style={labelStyle}>Pincode</label>
//         <input type="text" name="pincode" placeholder="Pincode" value={formData.pincode} onChange={handleChange} style={inputStyle} />

//         <label style={labelStyle}>Region</label>
//         <select name="region" value={formData.region} onChange={handleChange} style={inputStyle}>
//           <option value="">Select Region</option>
//           {regions.map(region => (
//             <option key={region} value={region}>{region}</option>
//           ))}
//         </select>

//         <label style={labelStyle}>Country</label>
//         <select name="country" value={formData.country} onChange={handleChange} style={inputStyle}>
//           <option value="">Select Country</option>
//           {countries.map(c => (
//             <option key={c} value={c}>{c}</option>
//           ))}
//         </select>

//         <label style={labelStyle}>Contact No</label>
//         <input type="text" name="contactNo" placeholder="Contact No" value={formData.contactNo} onChange={handleChange} style={inputStyle} />

//         <label style={labelStyle}>Email</label>
//         <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} style={inputStyle} />

//         <button type="submit" style={{
//           backgroundColor: '#4CAF50',
//           color: 'white',
//           padding: '10px 20px',
//           marginTop: '15px',
//           border: 'none',
//           borderRadius: '5px',
//           cursor: 'pointer'
//         }}>
//           {editingId ? 'Update' : 'Save'} Customer
//         </button>
//       </form>

//       {cnNo && <p style={{ marginTop: '10px', fontWeight: 'bold' }}>Generated CNNo: {cnNo}</p>}

//       <hr style={{ margin: '2rem 0' }} />

//       <h3 style={{ textAlign: 'center', color: '#444' }}>All Customers</h3>
//       <table border="1" width="100%" style={{ borderCollapse: 'collapse', textAlign: 'left' }}>
//         <thead style={{ backgroundColor: '#ddd' }}>
//           <tr>
//             <th style={{ padding: '8px' }}>CNNo</th>
//             <th style={{ padding: '8px' }}>Name1</th>
//             <th style={{ padding: '8px' }}>Category</th>
//             <th style={{ padding: '8px' }}>Contact</th>
//             <th style={{ padding: '8px' }}>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {customers.map(c => (
//             <tr key={c._id}>
//               <td style={{ padding: '8px' }}>{c.cnNo}</td>
//               <td style={{ padding: '8px' }}>{c.name1}</td>
//               <td style={{ padding: '8px' }}>{c.categoryId?.categoryName}</td>
//               <td style={{ padding: '8px' }}>{c.contactNo}</td>
//               <td style={{ padding: '8px' }}>
//                 <button onClick={() => handleEdit(c)} style={{ padding: '5px 10px', cursor: 'pointer' }}>Edit</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default CustomerForm;


import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CustomerForm() {
  const [formData, setFormData] = useState({
    categoryId: '',
    name1: '',
    name2: '',
    search: '',
    address1: '',
    address2: '',
    city: '',
    pincode: '',
    region: '',
    country: '',
    contactNo: '',
    email: ''
  });

  const [categories, setCategories] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [cnNo, setCnNo] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [errors, setErrors] = useState({});

  const regions = ['North', 'South', 'East', 'West', 'Central'];
  const countries = ['India', 'USA', 'Germany', 'France', 'UK'];

  // Define mandatory fields
  const mandatoryFields = ['categoryId', 'name1', 'search', 'address1', 'contactNo', 'region', 'country'];

  useEffect(() => {
    fetchCategories();
    fetchCustomers();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/customer-categories');
      setCategories(res.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchCustomers = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/customers');
      setCustomers(res.data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Check mandatory fields
    if (!formData.categoryId) newErrors.categoryId = "Category is required.";
    if (!formData.name1.trim()) newErrors.name1 = "Name 1 is required.";
    if (!formData.search.trim()) newErrors.search = "Search term is required.";
    if (!formData.address1.trim()) newErrors.address1 = "Address 1 is required.";
    if (!formData.region) newErrors.region = "Region is required.";
    if (!formData.country) newErrors.country = "Country is required.";

    // Contact number validation
    if (!formData.contactNo.trim()) {
      newErrors.contactNo = "Contact No is required.";
    } else if (!/^[0-9]{10}$/.test(formData.contactNo.trim())) {
      newErrors.contactNo = "Contact No must be exactly 10 digits.";
    }

    // Email validation (optional field but validate format if provided)
    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }

    // Pincode validation (optional field but validate format if provided)
    if (formData.pincode.trim() && !/^[0-9]{6}$/.test(formData.pincode.trim())) {
      newErrors.pincode = "Pincode must be exactly 6 digits.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      const errorMessages = Object.values(errors).filter(error => error);
      alert(errorMessages.join("\n"));
      return;
    }

    try {
      if (editingId) {
        await axios.put(`http://localhost:8080/api/customers/${editingId}`, formData);
        alert('Customer updated successfully!');
      } else {
        const res = await axios.post('http://localhost:8080/api/customers', formData);
        setCnNo(res.data.cnNo);
        alert(`Customer saved successfully! CNNo: ${res.data.cnNo}`);
      }

      fetchCustomers();
      resetForm();
    } catch (error) {
      console.error('Error saving customer:', error);
      alert('Error saving customer. Please try again.');
    }
  };

  const resetForm = () => {
    setFormData({
      categoryId: '',
      name1: '',
      name2: '',
      search: '',
      address1: '',
      address2: '',
      city: '',
      pincode: '',
      region: '',
      country: '',
      contactNo: '',
      email: ''
    });
    setEditingId(null);
    setErrors({});
    setCnNo('');
  };

  const handleEdit = (customer) => {
    setFormData({
      categoryId: customer.categoryId?._id || '',
      name1: customer.name1 || '',
      name2: customer.name2 || '',
      search: customer.search || '',
      address1: customer.address1 || '',
      address2: customer.address2 || '',
      city: customer.city || '',
      pincode: customer.pincode || '',
      region: customer.region || '',
      country: customer.country || '',
      contactNo: customer.contactNo || '',
      email: customer.email || ''
    });
    setEditingId(customer._id);
    setCnNo(customer.cnNo);
    setErrors({});
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    margin: '6px 0',
    borderRadius: '5px',
    border: '1px solid #ddd',
    boxSizing: 'border-box',
    fontSize: '14px'
  };

  const errorInputStyle = {
    ...inputStyle,
    border: '2px solid #ff4444'
  };

  const labelStyle = {
    fontWeight: 'bold',
    marginTop: '12px',
    marginBottom: '4px',
    display: 'block',
    color: '#333'
  };

  const mandatoryLabelStyle = {
    ...labelStyle,
    color: '#d63384'
  };

  const errorStyle = {
    color: '#ff4444',
    fontSize: '12px',
    marginTop: '2px',
    marginBottom: '8px'
  };

  return (
    <div style={{ 
      maxWidth: '900px', 
      margin: '20px auto', 
      padding: '2rem', 
      background: '#ffffff', 
      borderRadius: '12px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e9ecef'
    }}>
      <h2 style={{ 
        textAlign: 'center', 
        color: '#2c3e50', 
        marginBottom: '30px',
        fontSize: '28px'
      }}>
        {editingId ? 'Edit Customer' : 'Add New Customer'}
      </h2>

      <div style={{ 
        background: '#f8f9fa', 
        padding: '15px', 
        borderRadius: '8px', 
        marginBottom: '25px',
        border: '1px solid #dee2e6'
      }}>
        <p style={{ margin: '0', color: '#6c757d', fontSize: '14px' }}>
          <span style={{ color: '#d63384', fontWeight: 'bold' }}>*</span> indicates mandatory fields
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div>
            <label style={mandatoryFields.includes('categoryId') ? mandatoryLabelStyle : labelStyle}>
              Category {mandatoryFields.includes('categoryId') && <span style={{ color: '#d63384' }}>*</span>}
            </label>
            <select 
              name="categoryId" 
              value={formData.categoryId} 
              onChange={handleChange} 
              style={errors.categoryId ? errorInputStyle : inputStyle}
            >
              <option value="">Select Category</option>
              {categories.map(cat => (
                <option key={cat._id} value={cat._id}>
                  {cat.categoryName} ({cat.prefix})
                </option>
              ))}
            </select>
            {errors.categoryId && <div style={errorStyle}>{errors.categoryId}</div>}
          </div>

          <div>
            <label style={mandatoryFields.includes('name1') ? mandatoryLabelStyle : labelStyle}>
              Name 1 {mandatoryFields.includes('name1') && <span style={{ color: '#d63384' }}>*</span>}
            </label>
            <input 
              type="text" 
              name="name1" 
              placeholder="Enter Name 1" 
              value={formData.name1} 
              onChange={handleChange} 
              style={errors.name1 ? errorInputStyle : inputStyle} 
            />
            {errors.name1 && <div style={errorStyle}>{errors.name1}</div>}
          </div>

          <div>
            <label style={labelStyle}>Name 2</label>
            <input 
              type="text" 
              name="name2" 
              placeholder="Enter Name 2 (Optional)" 
              value={formData.name2} 
              onChange={handleChange} 
              style={inputStyle} 
            />
          </div>

          <div>
            <label style={mandatoryFields.includes('search') ? mandatoryLabelStyle : labelStyle}>
              Search Term {mandatoryFields.includes('search') && <span style={{ color: '#d63384' }}>*</span>}
            </label>
            <input 
              type="text" 
              name="search" 
              placeholder="Enter Search Term" 
              value={formData.search} 
              onChange={handleChange} 
              style={errors.search ? errorInputStyle : inputStyle} 
            />
            {errors.search && <div style={errorStyle}>{errors.search}</div>}
          </div>

          <div>
            <label style={mandatoryFields.includes('address1') ? mandatoryLabelStyle : labelStyle}>
              Address 1 {mandatoryFields.includes('address1') && <span style={{ color: '#d63384' }}>*</span>}
            </label>
            <input 
              type="text" 
              name="address1" 
              placeholder="Enter Address 1" 
              value={formData.address1} 
              onChange={handleChange} 
              style={errors.address1 ? errorInputStyle : inputStyle} 
            />
            {errors.address1 && <div style={errorStyle}>{errors.address1}</div>}
          </div>

          <div>
            <label style={labelStyle}>Address 2</label>
            <input 
              type="text" 
              name="address2" 
              placeholder="Enter Address 2 (Optional)" 
              value={formData.address2} 
              onChange={handleChange} 
              style={inputStyle} 
            />
          </div>

          <div>
            <label style={labelStyle}>City</label>
            <input 
              type="text" 
              name="city" 
              placeholder="Enter City" 
              value={formData.city} 
              onChange={handleChange} 
              style={inputStyle} 
            />
          </div>

          <div>
            <label style={labelStyle}>Pincode</label>
            <input 
              type="text" 
              name="pincode" 
              placeholder="Enter 6-digit Pincode" 
              value={formData.pincode} 
              onChange={handleChange} 
              style={errors.pincode ? errorInputStyle : inputStyle} 
            />
            {errors.pincode && <div style={errorStyle}>{errors.pincode}</div>}
          </div>

          <div>
            <label style={mandatoryFields.includes('region') ? mandatoryLabelStyle : labelStyle}>
              Region {mandatoryFields.includes('region') && <span style={{ color: '#d63384' }}>*</span>}
            </label>
            <select 
              name="region" 
              value={formData.region} 
              onChange={handleChange} 
              style={errors.region ? errorInputStyle : inputStyle}
            >
              <option value="">Select Region</option>
              {regions.map(region => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>
            {errors.region && <div style={errorStyle}>{errors.region}</div>}
          </div>

          <div>
            <label style={mandatoryFields.includes('country') ? mandatoryLabelStyle : labelStyle}>
              Country {mandatoryFields.includes('country') && <span style={{ color: '#d63384' }}>*</span>}
            </label>
            <select 
              name="country" 
              value={formData.country} 
              onChange={handleChange} 
              style={errors.country ? errorInputStyle : inputStyle}
            >
              <option value="">Select Country</option>
              {countries.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            {errors.country && <div style={errorStyle}>{errors.country}</div>}
          </div>

          <div>
            <label style={mandatoryFields.includes('contactNo') ? mandatoryLabelStyle : labelStyle}>
              Contact No {mandatoryFields.includes('contactNo') && <span style={{ color: '#d63384' }}>*</span>}
            </label>
            <input 
              type="text" 
              name="contactNo" 
              placeholder="Enter 10-digit Contact No" 
              value={formData.contactNo} 
              onChange={handleChange} 
              style={errors.contactNo ? errorInputStyle : inputStyle} 
            />
            {errors.contactNo && <div style={errorStyle}>{errors.contactNo}</div>}
          </div>

          <div>
            <label style={labelStyle}>Email</label>
            <input 
              type="email" 
              name="email" 
              placeholder="Enter Email (Optional)" 
              value={formData.email} 
              onChange={handleChange} 
              style={errors.email ? errorInputStyle : inputStyle} 
            />
            {errors.email && <div style={errorStyle}>{errors.email}</div>}
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <button 
            type="submit" 
            style={{
              backgroundColor: '#28a745',
              color: 'white',
              padding: '12px 30px',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 'bold',
              marginRight: '15px',
              transition: 'background-color 0.3s'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#218838'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#28a745'}
          >
            {editingId ? 'Update Customer' : 'Save Customer'}
          </button>

          {editingId && (
            <button 
              type="button" 
              onClick={resetForm}
              style={{
                backgroundColor: '#6c757d',
                color: 'white',
                padding: '12px 30px',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: 'bold',
                transition: 'background-color 0.3s'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#5a6268'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#6c757d'}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {cnNo && (
        <div style={{ 
          marginTop: '20px', 
          padding: '15px', 
          backgroundColor: '#d4edda', 
          border: '1px solid #c3e6cb',
          borderRadius: '6px',
          textAlign: 'center'
        }}>
          <p style={{ margin: '0', fontWeight: 'bold', color: '#155724' }}>
            Generated Customer Number: {cnNo}
          </p>
        </div>
      )}

      <hr style={{ margin: '3rem 0', border: '1px solid #dee2e6' }} />

      <h3 style={{ textAlign: 'center', color: '#495057', marginBottom: '25px' }}>Customer List</h3>
      
      <div style={{ overflowX: 'auto' }}>
        <table style={{ 
          width: '100%', 
          borderCollapse: 'collapse',
          backgroundColor: 'white',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          borderRadius: '8px',
          overflow: 'hidden'
        }}>
          <thead style={{ backgroundColor: '#f8f9fa' }}>
            <tr>
              <th style={{ padding: '15px 12px', textAlign: 'left', borderBottom: '2px solid #dee2e6', fontWeight: 'bold', color: '#495057' }}>CNNo</th>
              <th style={{ padding: '15px 12px', textAlign: 'left', borderBottom: '2px solid #dee2e6', fontWeight: 'bold', color: '#495057' }}>Name</th>
              <th style={{ padding: '15px 12px', textAlign: 'left', borderBottom: '2px solid #dee2e6', fontWeight: 'bold', color: '#495057' }}>Category</th>
              <th style={{ padding: '15px 12px', textAlign: 'left', borderBottom: '2px solid #dee2e6', fontWeight: 'bold', color: '#495057' }}>Contact</th>
              <th style={{ padding: '15px 12px', textAlign: 'center', borderBottom: '2px solid #dee2e6', fontWeight: 'bold', color: '#495057' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {customers.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ padding: '20px', textAlign: 'center', color: '#6c757d' }}>
                  No customers found
                </td>
              </tr>
            ) : (
              customers.map((c, index) => (
                <tr key={c._id} style={{ backgroundColor: index % 2 === 0 ? '#ffffff' : '#f8f9fa' }}>
                  <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6' }}>{c.cnNo}</td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6' }}>{c.name1}</td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6' }}>{c.categoryId?.categoryName || 'N/A'}</td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6' }}>{c.contactNo}</td>
                  <td style={{ padding: '12px', borderBottom: '1px solid #dee2e6', textAlign: 'center' }}>
                    <button 
                      onClick={() => handleEdit(c)} 
                      style={{ 
                        padding: '6px 12px', 
                        cursor: 'pointer',
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        fontSize: '14px'
                      }}
                      onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
                      onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CustomerForm;
