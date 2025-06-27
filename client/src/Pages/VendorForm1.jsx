// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function VendorForm() {
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
//   const [vendors, setVendors] = useState([]);
//   const [vnNo, setVnNo] = useState('');
//   const [editingId, setEditingId] = useState(null);

//   useEffect(() => {
//     fetchCategories();
//     fetchVendors();
//   }, []);

//   const fetchCategories = async () => {
//     const res = await axios.get('http://localhost:8080/api/vendor-categories');
//     setCategories(res.data);
//   };

//   const fetchVendors = async () => {
//     const res = await axios.get('http://localhost:8080/api/vendors');
//     setVendors(res.data);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       if (editingId) {
//         const res = await axios.put(`http://localhost:8080/api/vendors/${editingId}`, formData);
//         alert('Vendor updated!');
//       } else {
//         const res = await axios.post('http://localhost:8080/api/vendors', formData);
//         setVnNo(res.data.vnNo);
//         alert(`Vendor saved! VNNo: ${res.data.vnNo}`);
//       }

//       fetchVendors();
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
//       alert('Error saving vendor');
//     }
//   };

//   const handleEdit = (vendor) => {
//     setFormData({
//       categoryId: vendor.categoryId?._id,
//       name1: vendor.name1,
//       name2: vendor.name2,
//       search: vendor.search,
//       address1: vendor.address1,
//       address2: vendor.address2,
//       city: vendor.city,
//       pincode: vendor.pincode,
//       region: vendor.region,
//       country: vendor.country,
//       contactNo: vendor.contactNo,
//       email: vendor.email
//     });
//     setEditingId(vendor._id);
//     setVnNo(vendor.vnNo);
//   };

//   return (
//     <div style={{ maxWidth: '800px', margin: 'auto', padding: '1rem' }}>
//       <h2>{editingId ? 'Edit Vendor' : 'Add Vendor'}</h2>

//       <form onSubmit={handleSubmit}>
//         <select name="categoryId" value={formData.categoryId} onChange={handleChange} required>
//           <option value="">Select Category</option>
//           {categories.map(cat => (
//             <option key={cat._id} value={cat._id}>
//               {cat.categoryName} ({cat.prefix})
//             </option>
//           ))}
//         </select><br />

//         <input type="text" name="name1" placeholder="Name 1" value={formData.name1} onChange={handleChange} required /><br />
//         <input type="text" name="name2" placeholder="Name 2" value={formData.name2} onChange={handleChange} /><br />
//         <input type="text" name="search" placeholder="Search Term" value={formData.search} onChange={handleChange} /><br />

//         <input type="text" name="address1" placeholder="Address 1" value={formData.address1} onChange={handleChange} /><br />
//         <input type="text" name="address2" placeholder="Address 2" value={formData.address2} onChange={handleChange} /><br />
//         <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} /><br />
//         <input type="text" name="pincode" placeholder="Pincode" value={formData.pincode} onChange={handleChange} /><br />
//         <input type="text" name="region" placeholder="Region" value={formData.region} onChange={handleChange} /><br />
//         <input type="text" name="country" placeholder="Country" value={formData.country} onChange={handleChange} /><br />
//         <input type="text" name="contactNo" placeholder="Contact No" value={formData.contactNo} onChange={handleChange} /><br />
//         <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} /><br />

//         <button type="submit">{editingId ? 'Update' : 'Save'} Vendor</button>
//       </form>

//       {vnNo && <p><strong>Generated VNNo:</strong> {vnNo}</p>}

//       <hr />

//       <h3>All Vendors</h3>
//       <table border="1" width="100%">
//         <thead>
//           <tr>
//             <th>VNNo</th>
//             <th>Name1</th>
//             <th>Category</th>
//             <th>Contact</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {vendors.map(v => (
//             <tr key={v._id}>
//               <td>{v.vnNo}</td>
//               <td>{v.name1}</td>
//               <td>{v.categoryId?.categoryName}</td>
//               <td>{v.contactNo}</td>
//               <td><button onClick={() => handleEdit(v)}>Edit</button></td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default VendorForm;
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function VendorForm() {
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
  const [vendors, setVendors] = useState([]);
  const [vnNo, setVnNo] = useState('');
  const [editingId, setEditingId] = useState(null);

  const regions = ['Karnataka', 'Kerala', 'Tamil Nadu', 'Andhra Pradesh', 'Telangana', 'Maharashtra', 'Gujarat', 'Rajasthan', 'Punjab', 'Haryana'];
  const countries = ['India', 'USA', 'Germany', 'France', 'UK'];

  useEffect(() => {
    fetchCategories();
    fetchVendors();
  }, []);

  const fetchCategories = async () => {
    const res = await axios.get('http://localhost:8080/api/vendor-categories');
    setCategories(res.data);
  };

  const fetchVendors = async () => {
    const res = await axios.get('http://localhost:8080/api/vendors');
    setVendors(res.data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await axios.put(`http://localhost:8080/api/vendors/${editingId}`, formData);
        alert('Vendor updated!');
      } else {
        const res = await axios.post('http://localhost:8080/api/vendors', formData);
        setVnNo(res.data.vnNo);
        alert(`Vendor saved! VNNo: ${res.data.vnNo}`);
      }

      fetchVendors();
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
        contactname: '',
        email: ''
      });
      setEditingId(null);
    } catch (error) {
      console.error(error);
      alert('Error saving vendor');
    }
  };

  const handleEdit = (vendor) => {
    setFormData({
      categoryId: vendor.categoryId?._id,
      name1: vendor.name1,
      name2: vendor.name2,
      search: vendor.search,
      address1: vendor.address1,
      address2: vendor.address2,
      city: vendor.city,
      pincode: vendor.pincode,
      region: vendor.region,
      country: vendor.country,
      contactNo: vendor.contactNo,
      contactname: vendor.contactname,
      email: vendor.email
    });
    setEditingId(vendor._id);
    setVnNo(vendor.vnNo);
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

  return (
    <div style={{ maxWidth: '800px', margin: 'auto', padding: '1.5rem', background: '#f9f9f9', borderRadius: '10px' }}>
      <h2 style={{ textAlign: 'center', color: '#333' }}>{editingId ? 'Edit Vendor' : 'Add Vendor'}</h2>

      <form onSubmit={handleSubmit}>
        <label style={labelStyle}>Category</label>
        <select name="categoryId" value={formData.categoryId} onChange={handleChange} required style={inputStyle}>
          <option value="">Select Category</option>
          {categories.map(cat => (
            <option key={cat._id} value={cat._id}>
              {cat.categoryName} ({cat.prefix})
            </option>
          ))}
        </select>

        <label style={labelStyle}>Name 1</label>
        <input type="text" name="name1" placeholder="Name 1" value={formData.name1} onChange={handleChange} required style={inputStyle} />

        <label style={labelStyle}>Name 2</label>
        <input type="text" name="name2" placeholder="Name 2" value={formData.name2} onChange={handleChange} style={inputStyle} />

        <label style={labelStyle}>Search Term</label>
        <input type="text" name="search" placeholder="Search Term" value={formData.search} onChange={handleChange} style={inputStyle} />

        <label style={labelStyle}>Address 1</label>
        <input type="text" name="address1" placeholder="Address 1" value={formData.address1} onChange={handleChange} style={inputStyle} />

        <label style={labelStyle}>Address 2</label>
        <input type="text" name="address2" placeholder="Address 2" value={formData.address2} onChange={handleChange} style={inputStyle} />

        <label style={labelStyle}>City</label>
        <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} style={inputStyle} />

        <label style={labelStyle}>Pincode</label>
        <input type="text" name="pincode" placeholder="Pincode" value={formData.pincode} onChange={handleChange} style={inputStyle} />

        <label style={labelStyle}>Region</label>
        <select name="region" value={formData.region} onChange={handleChange} style={inputStyle}>
          <option value="">Select Region</option>
          {regions.map(region => (
            <option key={region} value={region}>{region}</option>
          ))}
        </select>

        <label style={labelStyle}>Country</label>
        <select name="country" value={formData.country} onChange={handleChange} style={inputStyle}>
          <option value="">Select Country</option>
          {countries.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <label style={labelStyle}>Contact No</label>
        <input type="text" name="contactNo" placeholder="Contact No" value={formData.contactNo} onChange={handleChange} style={inputStyle} />
        <label style={labelStyle}>Contact Name</label>
        <input type="text" name="contactname" placeholder="Contact Name" value={formData.contactName} onChange={handleChange} style={inputStyle} />
        <label style={labelStyle}>Email</label>
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} style={inputStyle} />

        <button type="submit" style={{
          backgroundColor: '#4CAF50',
          color: 'white',
          padding: '10px 20px',
          marginTop: '15px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}>
          {editingId ? 'Update' : 'Save'} Vendor
        </button>
      </form>

      {vnNo && <p style={{ marginTop: '10px', fontWeight: 'bold' }}>Generated VNNo: {vnNo}</p>}

      <hr style={{ margin: '2rem 0' }} />

      <h3 style={{ textAlign: 'center', color: '#444' }}>All Vendors</h3>
      <table border="1" width="100%" style={{ borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead style={{ backgroundColor: '#ddd' }}>
          <tr>
            <th style={{ padding: '8px' }}>VNNo</th>
            <th style={{ padding: '8px' }}>Name1</th>
            <th style={{ padding: '8px' }}>Category</th>
            <th style={{ padding: '8px' }}>Contact</th>
            <th style={{ padding: '8px' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {vendors.map(v => (
            <tr key={v._id}>
              <td style={{ padding: '8px' }}>{v.vnNo}</td>
              <td style={{ padding: '8px' }}>{v.name1}</td>
              <td style={{ padding: '8px' }}>{v.categoryId?.categoryName}</td>
              <td style={{ padding: '8px' }}>{v.contactNo}</td>
              <td style={{ padding: '8px' }}>
                <button onClick={() => handleEdit(v)} style={{ padding: '5px 10px', cursor: 'pointer' }}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default VendorForm;
