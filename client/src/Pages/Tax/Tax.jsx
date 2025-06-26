import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaxForm = () => {
  const [formData, setFormData] = useState({
    taxCode: '',
    taxName: '',
    cgst: '',
    sgst: '',
    igst: '',
  });

  const [errors, setErrors] = useState({});
  const [taxes, setTaxes] = useState([]);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchTaxes();
  }, []);

  const fetchTaxes = async () => {
    const res = await axios.get('http://localhost:8080/api/tax');
    setTaxes(res.data);
  };

  const validateField = (name, value) => {
    switch (name) {
      case 'taxCode':
        if (!value) return 'Required';
        if (value.length > 4) return 'Max 4 characters';
        break;
      case 'taxName':
        if (!value) return 'Required';
        if (value.length > 25) return 'Max 25 characters';
        break;
      case 'cgst':
      case 'sgst':
      case 'igst':
        if (!value) return 'Required';
        if (value.length > 2) return 'Max 2 digits';
        break;
      default:
        return '';
    }
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let cleaned = value;

    switch (name) {
      case 'taxCode':
        cleaned = value.replace(/[^A-Za-z0-9 ]/g, '').slice(0, 4);
        break;
      case 'taxName':
        cleaned = value.replace(/[^A-Za-z0-9 ]/g, '').slice(0, 25);
        break;
      case 'cgst':
      case 'sgst':
      case 'igst':
        cleaned = value.replace(/[^0-9]/g, '').slice(0, 2);
        break;
      default:
        break;
    }

    const error = validateField(name, cleaned);
    setFormData({ ...formData, [name]: cleaned });
    setErrors({ ...errors, [name]: error });
  };

  const isFormValid = () => {
    return Object.keys(formData).every((key) => !validateField(key, formData[key]));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    Object.entries(formData).forEach(([key, val]) => {
      const err = validateField(key, val);
      if (err) newErrors[key] = err;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      if (editId) {
        await axios.put(`http://localhost:8080/api/tax/${editId}`, formData);
        alert('Tax updated!');
      } else {
        await axios.post('http://localhost:8080/api/tax', formData);
        alert('Tax added!');
      }

      setFormData({ taxCode: '', taxName: '', cgst: '', sgst: '', igst: '' });
      setErrors({});
      setEditId(null);
      fetchTaxes();
    } catch (err) {
      console.error(err);
      alert('Failed to save');
    }
  };

  const handleEdit = (tax) => {
    setFormData({
      taxCode: tax.taxCode,
      taxName: tax.taxName,
      cgst: tax.cgst,
      sgst: tax.sgst,
      igst: tax.igst,
    });
    setEditId(tax._id);
  };

  return (
        <div className="main-wrapper">
      <div className="page-wrapper"  >
        <div className="content">
    <div className="container mt-4">
      <h4>{editId ? 'Edit' : 'Add'} Tax</h4>
      <form onSubmit={handleSubmit}>
        {['taxCode', 'taxName', 'cgst', 'sgst', 'igst'].map((field) => (
          <div className="mb-3" key={field}>
            <label className="form-label text-capitalize">{field}</label>
            <input
              type="text"
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className={`form-control ${errors[field] ? 'is-invalid' : ''}`}
            />
            {errors[field] && <div className="invalid-feedback">{errors[field]}</div>}
          </div>
        ))}
        <button className="btn btn-primary" type="submit" disabled={!isFormValid()}>
          {editId ? 'Update Tax' : 'Save Tax'}
        </button>
      </form>

      <hr />

      <h5>Saved Taxes</h5>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Code</th>
            <th>Name</th>
            <th>CGST</th>
            <th>SGST</th>
            <th>IGST</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {taxes.map((tax) => (
            <tr key={tax._id}>
              <td>{tax.taxCode}</td>
              <td>{tax.taxName}</td>
              <td>{tax.cgst}</td>
              <td>{tax.sgst}</td>
              <td>{tax.igst}</td>
              <td>
                <button className="btn btn-sm btn-warning" onClick={() => handleEdit(tax)}>
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div></div></div></div>
  );
};

export default TaxForm;
