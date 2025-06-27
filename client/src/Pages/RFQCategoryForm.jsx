import React, { useState, useEffect } from 'react';
import axios from 'axios';

function RFQCategoryForm() {
  const [formData, setFormData] = useState({
    categoryName: '',
    prefix: '',
    rangeFrom: '',
    rangeTo: ''
  });

  const [categories, setCategories] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`http://localhost:8080/api/rfq-categories/${editingId}`, formData);
      } else {
        await axios.post('http://localhost:8080/api/rfq-categories', formData);
      }
      setFormData({ categoryName: '', prefix: '', rangeFrom: '', rangeTo: '' });
      setEditingId(null);
      fetchCategories();
    } catch (err) {
      console.error('Error submitting category:', err);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/rfq-categories');
      setCategories(res.data);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  const handleEdit = (cat) => {
    setFormData({
      categoryName: cat.categoryName,
      prefix: cat.prefix,
      rangeFrom: cat.rangeFrom,
      rangeTo: cat.rangeTo
    });
    setEditingId(cat._id);
  };

  const handleCancelEdit = () => {
    setFormData({ categoryName: '', prefix: '', rangeFrom: '', rangeTo: '' });
    setEditingId(null);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto', fontFamily: 'Arial' }}>
      <h2 style={{ marginBottom: '20px', color: '#333' }}>RFQ Category Setup</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: '30px', border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
        <div style={{ display: 'flex', gap: '20px', marginBottom: '15px' }}>
          <input
            name="categoryName"
            placeholder="Category Name"
            value={formData.categoryName}
            onChange={handleChange}
            required
            style={{ flex: 1, padding: '8px' }}
          />
          <input
            name="prefix"
            placeholder="Prefix"
            value={formData.prefix}
            onChange={handleChange}
            required
            style={{ flex: 1, padding: '8px' }}
          />
        </div>
        <div style={{ display: 'flex', gap: '20px', marginBottom: '15px' }}>
          <input
            name="rangeFrom"
            placeholder="Range From"
            value={formData.rangeFrom}
            onChange={handleChange}
            required
            type="number"
            style={{ flex: 1, padding: '8px' }}
          />
          <input
            name="rangeTo"
            placeholder="Range To"
            value={formData.rangeTo}
            onChange={handleChange}
            required
            type="number"
            style={{ flex: 1, padding: '8px' }}
          />
        </div>
        <div>
          <button type="submit" style={{ padding: '10px 16px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', marginRight: '10px' }}>
            {editingId ? 'Update Category' : 'Add Category'}
          </button>
          {editingId && (
            <button type="button" onClick={handleCancelEdit} style={{ padding: '10px 16px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px' }}>
              Cancel
            </button>
          )}
        </div>
      </form>

      <h3 style={{ marginBottom: '10px' }}>Existing Categories</h3>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead style={{ backgroundColor: '#f8f9fa' }}>
          <tr>
            <th style={thStyle}>#</th>
            <th style={thStyle}>Category Name</th>
            <th style={thStyle}>Prefix</th>
            <th style={thStyle}>Range From</th>
            <th style={thStyle}>Range To</th>
            <th style={thStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat, index) => (
            <tr key={cat._id} style={{ textAlign: 'center', borderBottom: '1px solid #ddd' }}>
              <td style={tdStyle}>{index + 1}</td>
              <td style={tdStyle}>{cat.categoryName}</td>
              <td style={tdStyle}>{cat.prefix}</td>
              <td style={tdStyle}>{cat.rangeFrom}</td>
              <td style={tdStyle}>{cat.rangeTo}</td>
              <td style={tdStyle}>
                <button onClick={() => handleEdit(cat)} style={{ padding: '6px 12px', backgroundColor: '#ffc107', border: 'none', borderRadius: '4px', color: '#333' }}>
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const thStyle = {
  padding: '10px',
  borderBottom: '2px solid #ccc',
  textAlign: 'center',
};

const tdStyle = {
  padding: '10px',
};

export default RFQCategoryForm;






