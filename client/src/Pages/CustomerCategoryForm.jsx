import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CustomerCategoryForm() {
  const [formData, setFormData] = useState({
    categoryName: '',
    prefix: '',
    rangeFrom: '',
    rangeTo: ''
  });

  const [customerCategories, setCustomerCategories] = useState([]);

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
      const res = await axios.post('http://localhost:8080/api/customer-categories', formData);
      alert('Customer Category Added!');
      setCustomerCategories([...customerCategories, res.data]);
      setFormData({ categoryName: '', prefix: '', rangeFrom: '', rangeTo: '' });
    } catch (error) {
      console.error(error);
      alert('Error adding category');
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/customer-categories');
      setCustomerCategories(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

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
      backgroundColor: '#f9f9ff',
      borderRadius: '10px',
      boxShadow: '0 0 8px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ textAlign: 'center', color: '#333' }}>Add Customer Category</h2>

      <form onSubmit={handleSubmit}>
        <label style={labelStyle}>Category Name</label>
        <input
          type="text"
          name="categoryName"
          placeholder="e.g., Premium"
          value={formData.categoryName}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <label style={labelStyle}>Prefix</label>
        <input
          type="text"
          name="prefix"
          placeholder="e.g., PRM"
          value={formData.prefix}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <label style={labelStyle}>Range From</label>
        <input
          type="number"
          name="rangeFrom"
          placeholder="e.g., 1000"
          value={formData.rangeFrom}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <label style={labelStyle}>Range To</label>
        <input
          type="number"
          name="rangeTo"
          placeholder="e.g., 1999"
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
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          Add Category
        </button>
      </form>

      <hr style={{ margin: '2rem 0' }} />

      <h3 style={{ textAlign: 'center' }}>Customer Categories</h3>
      <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
        {customerCategories.map(cat => (
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
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CustomerCategoryForm;
