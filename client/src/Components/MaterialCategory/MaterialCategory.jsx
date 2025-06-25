import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MaterialCategory = () => {
  const [formData, setFormData] = useState({
    categoryName: '',
    prefix: '',
    rangeStart: '',
    rangeEnd: ''
  });

  const [errors, setErrors] = useState({});
  const [categories, setCategories] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const alphaRegex = /^[A-Za-z ]{0,100}$/;
  const alphaNumericRegex = /^[A-Za-z0-9]{0,8}$/;
  const numberRegex = /^\d{0,6}$/;

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/category');
      setCategories(res.data);
    } catch (err) {
      console.error('Failed to fetch categories', err);
    }
  };

  const validateField = (name, value) => {
    switch (name) {
      case 'categoryName':
        if (!value) return 'Category name is required';
        if (!alphaRegex.test(value)) return 'Only alphabets (max 100 characters)';
        break;
      case 'prefix':
        if (!value) return 'Prefix is required';
        if (!alphaNumericRegex.test(value)) return 'Alphanumeric (max 8 characters)';
        break;
      case 'rangeStart':
      case 'rangeEnd':
        if (!value) return `${name} is required`;
        if (!numberRegex.test(value)) return 'Max 6 digits allowed';
        break;
      default:
        break;
    }
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let cleanedValue = value;
    let limitMsg = '';

    switch (name) {
      case 'categoryName':
        cleanedValue = value.replace(/[^A-Za-z ]/g, '');
        if (cleanedValue.length > 100) {
          cleanedValue = cleanedValue.slice(0, 100);
          limitMsg = 'Maximum 100 characters allowed';
        }
        break;
      case 'prefix':
        cleanedValue = value.replace(/[^A-Za-z0-9]/g, '');
        if (cleanedValue.length > 8) {
          cleanedValue = cleanedValue.slice(0, 8);
          limitMsg = 'Maximum 8 characters allowed';
        }
        break;
      case 'rangeStart':
      case 'rangeEnd':
        cleanedValue = value.replace(/[^0-9]/g, '');
        if (cleanedValue.length > 6) {
          cleanedValue = cleanedValue.slice(0, 6);
          limitMsg = 'Maximum 6 digits allowed';
        }
        break;
      default:
        break;
    }

    const validationError = validateField(name, cleanedValue);
    const errorMsg = limitMsg || validationError;

    setFormData((prev) => ({ ...prev, [name]: cleanedValue }));
    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  const isFormValid = () => {
    return (
      !validateField('categoryName', formData.categoryName) &&
      !validateField('prefix', formData.prefix) &&
      !validateField('rangeStart', formData.rangeStart) &&
      !validateField('rangeEnd', formData.rangeEnd)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      newErrors[key] = validateField(key, formData[key]);
    });
    setErrors(newErrors);

    if (Object.values(newErrors).some((err) => err)) return;

    try {
      if (editingId) {
        await axios.put(`http://localhost:8080/api/category/${editingId}`, formData);
        alert('Category updated successfully!');
      } else {
        await axios.post('http://localhost:8080/api/category', formData);
        alert('Category saved successfully!');
      }

      fetchCategories();
      setFormData({ categoryName: '', prefix: '', rangeStart: '', rangeEnd: '' });
      setEditingId(null);
    } catch (err) {
      console.error(err);
      alert('Failed to save category.');
    }
  };

  const handleEdit = (cat) => {
    setFormData({
      categoryName: cat.categoryName,
      prefix: cat.prefix,
      rangeStart: cat.rangeStart,
      rangeEnd: cat.rangeEnd
    });
    setEditingId(cat._id);
  };

  return (
    <div className="container mt-4">
      <h3>{editingId ? 'Edit' : 'Create'} Material Category</h3>
      <form onSubmit={handleSubmit}>
        {['categoryName', 'prefix', 'rangeStart', 'rangeEnd'].map((field) => (
          <div className="mb-3" key={field}>
            <label className="form-label">
              {field === 'categoryName'
                ? 'Category Name'
                : field === 'prefix'
                ? 'Prefix'
                : field === 'rangeStart'
                ? 'Range Start'
                : 'Range End'}
            </label>
            <input
              type={field.includes('range') ? 'number' : 'text'}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className={`form-control ${errors[field] ? 'is-invalid' : ''}`}
            />
            {errors[field] && <div className="invalid-feedback">{errors[field]}</div>}
          </div>
        ))}
        <button type="submit" className="btn btn-primary" disabled={!isFormValid()}>
          {editingId ? 'Update' : 'Save'}
        </button>
      </form>

      <hr />

      <h4>Material Categories</h4>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Prefix</th>
            <th>Start</th>
            <th>End</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat) => (
            <tr key={cat._id}>
              <td>{cat.categoryName}</td>
              <td>{cat.prefix}</td>
              <td>{cat.rangeStart}</td>
              <td>{cat.rangeEnd}</td>
              <td>
                <button className="btn btn-sm btn-warning" onClick={() => handleEdit(cat)}>
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MaterialCategory;
