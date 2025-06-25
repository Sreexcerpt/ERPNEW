
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
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const regions = ['North', 'South', 'East', 'West', 'Central'];
  const countries = ['India', 'USA', 'Germany', 'France', 'UK'];

  // Mandatory fields as specified
  const mandatoryFields = ['categoryId', 'name1', 'search', 'address1', 'contactNo', 'region', 'country'];

  useEffect(() => {
    fetchCategories();
    fetchVendors();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8080/api/vendor-categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
      alert('Error fetching categories: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  const fetchVendors = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8080/api/vendors');
      setVendors(response.data);
    } catch (error) {
      console.error('Error fetching vendors:', error);
      alert('Error fetching vendors: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Check mandatory fields
    mandatoryFields.forEach(field => {
      if (!formData[field] || formData[field].toString().trim() === '') {
        newErrors[field] = `${getFieldLabel(field)} is required`;
      }
    });

    // Additional validations
    if (formData.email && formData.email.trim() !== '') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
    }

    if (formData.contactNo) {
      const contactRegex = /^\d{10}$/;
      if (!contactRegex.test(formData.contactNo.replace(/\s/g, ''))) {
        newErrors.contactNo = 'Contact number must be exactly 10 digits';
      }
    }

    if (formData.pincode && formData.pincode.trim() !== '') {
      const pincodeRegex = /^\d{6}$/;
      if (!pincodeRegex.test(formData.pincode)) {
        newErrors.pincode = 'Pincode must be exactly 6 digits';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const getFieldLabel = (fieldName) => {
    const labels = {
      categoryId: 'Category',
      name1: 'Name 1',
      name2: 'Name 2',
      search: 'Search Term',
      address1: 'Address 1',
      address2: 'Address 2',
      city: 'City',
      pincode: 'Pincode',
      region: 'Region',
      country: 'Country',
      contactNo: 'Contact No',
      email: 'Email'
    };
    return labels[fieldName] || fieldName;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      alert('Please fill all mandatory fields correctly');
      return;
    }

    try {
      setLoading(true);

      if (editingId) {
        // Update existing vendor
        const response = await axios.put(`http://localhost:8080/api/vendors/${editingId}`, formData);
        alert('Vendor updated successfully!');
        setVnNo(response.data.vnNo || vnNo);
      } else {
        // Create new vendor
        const response = await axios.post('http://localhost:8080/api/vendors', formData);
        setVnNo(response.data.vnNo);
        alert(`Vendor saved successfully! VNNo: ${response.data.vnNo}`);
      }

      // Refresh vendors list
      await fetchVendors();
      resetForm();

    } catch (error) {
      console.error('Error saving vendor:', error);
      alert('Error saving vendor: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
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
    setVnNo('');
  };

  const handleEdit = (vendor) => {
    setFormData({
      categoryId: vendor.categoryId?._id || '',
      name1: vendor.name1 || '',
      name2: vendor.name2 || '',
      search: vendor.search || '',
      address1: vendor.address1 || '',
      address2: vendor.address2 || '',
      city: vendor.city || '',
      pincode: vendor.pincode || '',
      region: vendor.region || '',
      country: vendor.country || '',
      contactNo: vendor.contactNo || '',
      email: vendor.email || ''
    });
    setEditingId(vendor._id);
    setVnNo(vendor.vnNo);
    setErrors({});
  };

  const handleDelete = async (vendorId) => {
    if (window.confirm('Are you sure you want to delete this vendor?')) {
      try {
        setLoading(true);
        await axios.delete(`http://localhost:8080/api/vendors/${vendorId}`);
        alert('Vendor deleted successfully!');
        await fetchVendors();
      } catch (error) {
        console.error('Error deleting vendor:', error);
        alert('Error deleting vendor: ' + (error.response?.data?.message || error.message));
      } finally {
        setLoading(false);
      }
    }
  };


  const renderField = (name, type = 'text', placeholder = '', options = null) => {
    const isMandatory = mandatoryFields.includes(name);
    const hasError = errors[name];

    return (
      <div key={name} >
        <label >
          {getFieldLabel(name)} {isMandatory && <span style={{ color: '#d32f2f' }}>*</span>}
        </label>

        {options ? (
          <select
            name={name}
            value={formData[name]}
            onChange={handleChange}

            disabled={loading}
          >
            <option value="">Select {getFieldLabel(name)}</option>
            {options.map(option => (
              <option key={option.value || option} value={option.value || option}>
                {option.label || option}
              </option>
            ))}
          </select>
        ) : (
          <input
            type={type}
            name={name}
            placeholder={placeholder}
            value={formData[name]}
            onChange={handleChange}

            disabled={loading}
          />
        )}

        {hasError && <span style={errorStyle}>{hasError}</span>}
      </div>
    );
  };

  return (
    <div className='me-10'>
      <h2>
        {editingId ? 'Edit Vendor' : 'Add New Vendor'}
      </h2>

      <form onSubmit={handleSubmit}>
        <div >
          <div>
            {renderField('categoryId', 'select', '', categories.map(cat => ({
              value: cat._id,
              label: `${cat.categoryName} (${cat.prefix})`
            })))}

            {renderField('name1', 'text', 'Enter vendor name')}
            {renderField('name2', 'text', 'Enter alternate name (optional)')}
            {renderField('search', 'text', 'Enter search keywords')}
            {renderField('address1', 'text', 'Enter primary address')}
            {renderField('address2', 'text', 'Enter additional address (optional)')}
          </div>

          <div>
            {renderField('city', 'text', 'Enter city (optional)')}
            {renderField('pincode', 'text', 'Enter 6-digit pincode (optional)')}
            {renderField('region', 'select', '', regions)}
            {renderField('country', 'select', '', countries)}
            {renderField('contactNo', 'text', 'Enter 10-digit contact number')}
            {renderField('email', 'email', 'Enter email address (optional)')}
          </div>
        </div>

        <div >
          <button
            type="submit"
            disabled={loading}
          >
            {loading ? '⏳ Processing...' : (editingId ? ' Update' : ' Save')} Vendor
          </button>

          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              disabled={loading}


            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>





      <h3 > All Vendors</h3>



      <div>
        <table >
          <thead >
            <tr>
              <th>VNNo</th>
              <th>Name</th>
              <th>Category</th>
              <th>Contact</th>
              <th>Region</th>
              <th>Country</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {vendors.length === 0 ? (
              <tr>
                <td colSpan="7" >
                  {loading ? '⏳ Loading vendors...' : '📭 No vendors found. Add your first vendor using the form above.'}
                </td>
              </tr>
            ) : (
              vendors.map((vendor, index) => (
                <tr key={vendor._id} >
                  <td>{vendor.vnNo}</td>
                  <td>{vendor.name1}</td>
                  <td>{vendor.categoryId?.categoryName || 'N/A'}</td>
                  <td>{vendor.contactNo}</td>
                  <td>{vendor.region || 'N/A'}</td>
                  <td>{vendor.country || 'N/A'}</td>
                  <td>
                    <button
                      onClick={() => handleEdit(vendor)}
                      disabled={loading}

                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(vendor._id)}
                      disabled={loading}

                    >
                      Delete
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

export default VendorForm;
