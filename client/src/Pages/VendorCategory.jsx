// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function VendorCategoryForm() {
//   const [formData, setFormData] = useState({
//     categoryName: '',
//     prefix: '',
//     rangeFrom: '',
//     rangeTo: ''
//   });

//   const [vendorCategories, setVendorCategories] = useState([]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post('http://localhost:8080/api/vendor-categories', formData);
//       alert('Vendor Category Added!');
//       setVendorCategories([...vendorCategories, res.data]);
//       setFormData({ categoryName: '', prefix: '', rangeFrom: '', rangeTo: '' });
//     } catch (error) {
//       console.error(error);
//       alert('Error adding category');
//     }
//   };

//   const fetchCategories = async () => {
//     try {
//       const res = await axios.get('http://localhost:8080/api/vendor-categories');
//       setVendorCategories(res.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   return (
//     <div style={{ maxWidth: '600px', margin: 'auto', padding: '1rem' }}>
//       <h2>Add Vendor Category</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           name="categoryName"
//           placeholder="Category Name"
//           value={formData.categoryName}
//           onChange={handleChange}
//           required
//         />
//         <br />
//         <input
//           type="text"
//           name="prefix"
//           placeholder="Prefix"
//           value={formData.prefix}
//           onChange={handleChange}
//           required
//         />
//         <br />
//         <input
//           type="number"
//           name="rangeFrom"
//           placeholder="Range From"
//           value={formData.rangeFrom}
//           onChange={handleChange}
//           required
//         />
//         <br />
//         <input
//           type="number"
//           name="rangeTo"
//           placeholder="Range To"
//           value={formData.rangeTo}
//           onChange={handleChange}
//           required
//         />
//         <br />
//         <button type="submit">Add Category</button>
//       </form>

//       <hr />

//       <h3>Vendor Categories</h3>
//       <ul>
//         {vendorCategories.map(cat => (
//           <li key={cat._id}>
//             <strong>{cat.categoryName}</strong> — Prefix: {cat.prefix}, Range: {cat.rangeFrom} to {cat.rangeTo}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default VendorCategoryForm;
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function VendorCategoryForm() {
//   const [formData, setFormData] = useState({
//     categoryName: '',
//     prefix: '',
//     rangeFrom: '',
//     rangeTo: ''
//   });

//   const [vendorCategories, setVendorCategories] = useState([]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post('http://localhost:8080/api/vendor-categories', formData);
//       alert('Vendor Category Added!');
//       setVendorCategories([...vendorCategories, res.data]);
//       setFormData({ categoryName: '', prefix: '', rangeFrom: '', rangeTo: '' });
//     } catch (error) {
//       console.error(error);
//       alert('Error adding category');
//     }
//   };

//   const fetchCategories = async () => {
//     try {
//       const res = await axios.get('http://localhost:8080/api/vendor-categories');
//       setVendorCategories(res.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const inputStyle = {
//     width: '100%',
//     padding: '10px',
//     margin: '8px 0',
//     border: '1px solid #ccc',
//     borderRadius: '5px',
//     boxSizing: 'border-box'
//   };

//   const labelStyle = {
//     fontWeight: 'bold',
//     display: 'block',
//     marginTop: '12px'
//   };

//   return (
//     <div style={{
//       maxWidth: '600px',
//       margin: 'auto',
//       padding: '2rem',
//       backgroundColor: '#f0f8ff',
//       borderRadius: '10px',
//       boxShadow: '0 0 8px rgba(0,0,0,0.1)'
//     }}>
//       <h2 style={{ textAlign: 'center', color: '#333' }}>Add Vendor Category</h2>

//       <form onSubmit={handleSubmit}>
//         <label style={labelStyle}>Category Name</label>
//         <input
//           type="text"
//           name="categoryName"
//           placeholder="e.g., Hardware"
//           value={formData.categoryName}
//           onChange={handleChange}
//           required
//           style={inputStyle}
//         />

//         <label style={labelStyle}>Prefix</label>
//         <input
//           type="text"
//           name="prefix"
//           placeholder="e.g., HW"
//           value={formData.prefix}
//           onChange={handleChange}
//           required
//           style={inputStyle}
//         />

//         <label style={labelStyle}>Range From</label>
//         <input
//           type="number"
//           name="rangeFrom"
//           placeholder="e.g., 100"
//           value={formData.rangeFrom}
//           onChange={handleChange}
//           required
//           style={inputStyle}
//         />

//         <label style={labelStyle}>Range To</label>
//         <input
//           type="number"
//           name="rangeTo"
//           placeholder="e.g., 999"
//           value={formData.rangeTo}
//           onChange={handleChange}
//           required
//           style={inputStyle}
//         />

//         <button
//           type="submit"
//           style={{
//             width: '100%',
//             padding: '12px',
//             marginTop: '20px',
//             backgroundColor: '#4CAF50',
//             color: 'white',
//             border: 'none',
//             borderRadius: '6px',
//             fontWeight: 'bold',
//             cursor: 'pointer'
//           }}
//         >
//           Add Category
//         </button>
//       </form>

//       <hr style={{ margin: '2rem 0' }} />

//       <h3 style={{ textAlign: 'center' }}>Vendor Categories</h3>
//       <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
//         {vendorCategories.map(cat => (
//           <li
//             key={cat._id}
//             style={{
//               backgroundColor: '#fff',
//               padding: '10px',
//               marginBottom: '10px',
//               border: '1px solid #ddd',
//               borderRadius: '5px'
//             }}
//           >
//             <strong>{cat.categoryName}</strong> &nbsp;
//             <span style={{ color: '#777' }}>
//               [Prefix: <strong>{cat.prefix}</strong> | Range: {cat.rangeFrom} - {cat.rangeTo}]
//             </span>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default VendorCategoryForm;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function VendorCategoryForm() {
  const [formData, setFormData] = useState({
    categoryName: '',
    prefix: '',
    rangeFrom: '',
    rangeTo: ''
  });

  const [vendorCategories, setVendorCategories] = useState([]);
  const [editingId, setEditingId] = useState(null); // 🆕 ID of the category being edited

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        // ✅ Update
        const res = await axios.put(`http://localhost:8080/api/vendor-categories/${editingId}`, formData);
        alert('Vendor Category Updated!');
        setVendorCategories(prev =>
          prev.map(cat => (cat._id === editingId ? res.data : cat))
        );
        setEditingId(null);
      } else {
        // ✅ Add
        const res = await axios.post('http://localhost:8080/api/vendor-categories', formData);
        alert('Vendor Category Added!');
        setVendorCategories([...vendorCategories, res.data]);
      }
      // ✅ Reset form
      setFormData({ categoryName: '', prefix: '', rangeFrom: '', rangeTo: '' });
    } catch (error) {
      console.error(error);
      alert('Error adding/updating category');
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/vendor-categories');
      setVendorCategories(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleEdit = (category) => {
    setFormData({
      categoryName: category.categoryName,
      prefix: category.prefix,
      rangeFrom: category.rangeFrom,
      rangeTo: category.rangeTo
    });
    setEditingId(category._id);
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    margin: '8px 0',
    border: '1px solid #ccc',
    borderRadius: '5px',
    boxSizing: 'border-box'
  };

  const labelStyle = {
    fontWeight: 'bold',
    display: 'block',
    marginTop: '12px'
  };

  return (
    <div style={{
      maxWidth: '600px',
      margin: 'auto',
      padding: '2rem',
      backgroundColor: '#f0f8ff',
      borderRadius: '10px',
      boxShadow: '0 0 8px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ textAlign: 'center', color: '#333' }}>
        {editingId ? 'Edit Vendor Category' : 'Add Vendor Category'}
      </h2>

      <form onSubmit={handleSubmit}>
        <label style={labelStyle}>Category Name</label>
        <input
          type="text"
          name="categoryName"
          placeholder="e.g., Hardware"
          value={formData.categoryName}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <label style={labelStyle}>Prefix</label>
        <input
          type="text"
          name="prefix"
          placeholder="e.g., HW"
          value={formData.prefix}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <label style={labelStyle}>Range From</label>
        <input
          type="number"
          name="rangeFrom"
          placeholder="e.g., 100"
          value={formData.rangeFrom}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <label style={labelStyle}>Range To</label>
        <input
          type="number"
          name="rangeTo"
          placeholder="e.g., 999"
          value={formData.rangeTo}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <button
          type="submit"
          style={{
            width: '100%',
            padding: '12px',
            marginTop: '20px',
            backgroundColor: editingId ? '#FFA500' : '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          {editingId ? 'Update Category' : 'Add Category'}
        </button>
      </form>

      <hr style={{ margin: '2rem 0' }} />

      <h3 style={{ textAlign: 'center' }}>Vendor Categories</h3>
      <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
        {vendorCategories.map(cat => (
          <li
            key={cat._id}
            style={{
              backgroundColor: '#fff',
              padding: '10px',
              marginBottom: '10px',
              border: '1px solid #ddd',
              borderRadius: '5px'
            }}
          >
            <strong>{cat.categoryName}</strong> &nbsp;
            <span style={{ color: '#777' }}>
              [Prefix: <strong>{cat.prefix}</strong> | Range: {cat.rangeFrom} - {cat.rangeTo}]
            </span>
            <button
              onClick={() => handleEdit(cat)}
              style={{
                float: 'right',
                backgroundColor: '#007bff',
                color: '#fff',
                border: 'none',
                padding: '5px 10px',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Edit
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default VendorCategoryForm;

