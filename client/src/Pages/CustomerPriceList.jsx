
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CustomerPriceListForm() {
  const [formData, setFormData] = useState({
    _id: '', // for edit tracking
    categoryId: '',
    customerId: '',
    materialId: '',
    unit: '',
    bum: '',
    orderUnit: '',
    salesGroup: '',
    taxId: '',
    tandc:''
  });

  const [conversionValue, setConversionValue] = useState(1);
  const [categories, setCategories] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [taxes, setTaxes] = useState([]);
  const [allData, setAllData] = useState([]);

  useEffect(() => {
    fetchCategories();
    fetchCustomers();
    fetchMaterials();
    fetchTaxes();
    fetchAllPriceLists();
  }, []);

  const fetchCategories = async () => {
    const res = await axios.get('http://localhost:8080/api/customer-categories');
    setCategories(res.data);
  };

  const fetchCustomers = async () => {
    const res = await axios.get('http://localhost:8080/api/customers');
    setCustomers(res.data);
    console.log("cut", res.data);
  };

  const fetchMaterials = async () => {
    const res = await axios.get('http://localhost:8080/api/material');
    setMaterials(res.data);
  };

  const fetchTaxes = async () => {
    const res = await axios.get('http://localhost:8080/api/tax');
    setTaxes(res.data);
  };

  const fetchAllPriceLists = async () => {
    const res = await axios.get('http://localhost:8080/api/customer-price-lists');
    setAllData(res.data);
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;
    let updatedForm = { ...formData, [name]: value };

    if (name === 'materialId') {
      try {
        const res = await axios.get(`http://localhost:8080/api/material/${value}`);
        const conv = res.data.conversionValue || 1;
        setConversionValue(conv);
        const bum = parseFloat(formData.bum) || 0;
        updatedForm.orderUnit = (bum * conv).toFixed(2);
      } catch {
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (formData._id) {
        await axios.put(`http://localhost:8080/api/customer-price-lists/${formData._id}`, formData);
        alert('Updated successfully');
      } else {
        await axios.post(`http://localhost:8080/api/customer-price-lists`, formData);
        alert('Saved successfully');
      }

      setFormData({
        _id: '',
        categoryId: '',
        customerId: '',
        materialId: '',
        unit: '',
        bum: '',
        orderUnit: '',
        salesGroup: '',
        taxId: '',tandc:''
      });

      setConversionValue(1);
      fetchAllPriceLists(); // refresh table
    } catch (err) {
      alert('Error saving data');
      console.error('Submit error:', err);
    }
  };
const handleEdit = (item) => {
  console.log('Full item being edited:', item);
  
  // Helper function to safely extract ID
  const extractId = (field) => {
    if (!field) return ''; // Handle null, undefined, or empty values
    if (typeof field === 'object' && field._id) return field._id;
    if (typeof field === 'string') return field;
    return '';
  };
  
  // Extract IDs from nested objects or use the ID directly
  const categoryId = extractId(item.categoryId);
  const customerId = extractId(item.customerId);
  const materialId = extractId(item.materialId);
  const taxId = extractId(item.taxId);
  const tandc=extractId(item.tandc)

  // Debug logs to check what we're setting
  console.log('Extracted IDs:');
  console.log('- categoryId:', categoryId);
  console.log('- customerId:', customerId);
  console.log('- materialId:', materialId);
  console.log('- taxId:', taxId);

  // Check if the extracted IDs exist in the respective arrays
  console.log('Available categories:', categories.map(c => c._id));
  console.log('Available customers:', customers.map(c => c._id));
  console.log('Available materials:', materials.map(m => m._id));
  console.log('Available taxes:', taxes.map(t => t._id));

  const newFormData = {
    _id: item._id,
    categoryId: categoryId,
    customerId: customerId,
    materialId: materialId,
    unit: item.unit || '',
    bum: item.bum || '',
    orderUnit: item.orderUnit || '',
    salesGroup: item.salesGroup || '',
    taxId: taxId,
    tandc:tandc
  };

  console.log('Setting form data to:', newFormData);
  setFormData(newFormData);

  // Set conversion value if material exists
  if (materialId) {
    axios.get(`http://localhost:8080/api/material/${materialId}`)
      .then(res => {
        const conv = res.data.conversionValue || 1;
        setConversionValue(conv);
        console.log('Conversion value set to:', conv);
      })
      .catch((error) => {
        console.error('Error fetching material conversion:', error);
        setConversionValue(1);
      });
  }
};

  const labelStyle = { fontWeight: 'bold', marginTop: '10px', display: 'block' };
  const inputStyle = {
    width: '100%',
    padding: '8px',
    margin: '6px 0',
    borderRadius: '4px',
    border: '1px solid #ccc'
  };

  return (
        <div className="main-wrapper">
      <div className="page-wrapper"  >
        <div className="content">
    <div >
      <h2 style={{ textAlign: 'center' }}>{formData._id ? 'Edit' : 'Create'} Customer Price List</h2>
      <form onSubmit={handleSubmit}>
        <label style={labelStyle}>Category</label>
        <select name="categoryId" value={formData.categoryId} onChange={handleChange} style={inputStyle} required>
          <option value="">Select</option>
          {categories.map(cat => (
            <option key={cat._id} value={cat._id}>{cat.categoryName}</option>
          ))}
        </select>

        <label style={labelStyle}>Customer</label>
        <select name="customerId" value={formData.customerId} onChange={handleChange} style={inputStyle} required>
          <option value="">Select</option>
          {customers.map(c => (
            <option key={c._id} value={c._id}>{c.name1}</option>
          ))}
        </select>

        <label style={labelStyle}>Material</label>
        <select name="materialId" value={formData.materialId} onChange={handleChange} style={inputStyle} required>
          <option value="">Select</option>
          {materials.map(m => (
            <option key={m._id} value={m._id}>{m.description}</option>
          ))}
        </select>

        <label style={labelStyle}>Unit</label>
        <input name="unit" value={formData.unit} onChange={handleChange} style={inputStyle} required />

        <label style={labelStyle}>BUM</label>
        <input type="number" name="bum" value={formData.bum} onChange={handleChange} style={inputStyle} required />

        <label style={labelStyle}>Sales Group</label>
        <input name="salesGroup" value={formData.salesGroup} onChange={handleChange} style={inputStyle} required />

        <label style={labelStyle}>Order Unit</label>
        <input name="orderUnit" value={formData.orderUnit} readOnly style={{ ...inputStyle, backgroundColor: '#eee' }} />
  <label style={labelStyle}>T&C</label>
        <input type="text" name="tandc" value={formData.tandc} onChange={handleChange} style={inputStyle} required />

        <label style={labelStyle}>Tax</label>
        <select name="taxId" value={formData.taxId} onChange={handleChange} style={inputStyle}>
          <option value="">Select</option>
          {taxes.map(tax => (
            <option key={tax._id} value={tax._id}>
              {tax.taxName} (CGST: {tax.cgst}%, SGST: {tax.sgst}%, IGST: {tax.igst}%)
            </option>
          ))}
        </select>

        <button type="submit" style={{ backgroundColor: '#007bff', color: '#fff', padding: '10px 20px', marginTop: '15px', border: 'none', borderRadius: '5px' }}>
          {formData._id ? 'Update' : 'Save'}
        </button>
      </form>

      <hr />
      <h4>Customer Price List Table</h4>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#ddd' }}>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Customer</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Category</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Material</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Unit</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>BUM</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Order Unit</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Sales Group</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Tax</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {allData.map(row => (
            <tr key={row._id}>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{row.customerId?.name1}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{row.categoryId?.categoryName}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{row.materialId?.description}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{row.unit}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{row.bum}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{row.orderUnit}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{row.salesGroup}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{row.taxId?.taxName}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                <button onClick={() => handleEdit(row)} style={{ padding: '4px 8px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
    </div>
    </div>
  );
}

export default CustomerPriceListForm;
