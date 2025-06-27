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
    name: '',
    email: ''
  });

  const [categories, setCategories] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [cnNo, setCnNo] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [errors, setErrors] = useState({});

  const regions = ['Karnataka', 'Kerala', 'Tamil Nadu', 'Andhra Pradesh', 'Telangana', 'West Bengal', 'Odisha', 'Bihar', 'Jharkhand', 'Madhya Pradesh', 'Chhattisgarh', 'Uttar Pradesh'];
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
      handleCloseModal();
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
      name: '',
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
      name: customer.name || '',
      email: customer.email || ''
    });
    setEditingId(customer._id);
    setCnNo(customer.cnNo);
    setErrors({});
  };
  const [showModal, setShowModal] = useState(false);
  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const [showdropdown, setShowdropdown] = useState(false);

  const handleOpendropdown = () => setShowdropdown(true);
  const handleClosedropdown = () => setShowdropdown(false);

  return (
    <div className="main-wrapper">
      <div >
        <div className="content">
          <div className="d-flex d-block align-items-center justify-content-between flex-wrap gap-3 mb-3">
            <div>
              <h6>Customer Master</h6>
            </div>
            <div className="d-flex my-xl-auto right-content align-items-center flex-wrap gap-2">
              <div className="dropdown">
                <a href="#" onClick={handleOpendropdown} className="btn btn-outline-white d-inline-flex align-items-center" data-bs-toggle="dropdown">
                  <i className="isax isax-export-1 me-1"></i>Export
                </a>
                <ul className={showdropdown ? `dropdown-menu show` : "dropdown-menu"}>
                  <li>
                    <a className="dropdown-item" href="#" onClick={handleClosedropdown}>Download as PDF</a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#" onClick={handleClosedropdown}>Download as Excel</a>
                  </li>
                </ul>
              </div>
              <div>
                <a onClick={() => { handleOpenModal() }} className="btn btn-primary d-flex align-items-center"><i className="isax isax-add-circle5 me-1"></i>New Customer</a>
              </div>
            </div>
          </div>
          <div>
            <div className='table-responsive'>
              <table className='table table-bordered' >
                <thead >
                  <tr>
                    <th>CNNo</th>
                    <th>Name 1</th>
                    {/* <th>Name 2</th> */}
                    <th>Category</th>
                    <th>Search</th>
                    <th>Address 1</th>
                    {/* <th>Address 2</th> */}
                    <th>City</th>
                    <th>Pincode</th>
                    <th>Region</th>
                    <th>Country</th>
                    <th>Contact No</th>
                    <th>Email</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.length === 0 ? (
                    <tr>
                      <td colSpan="14" >
                        No customers found
                      </td>
                    </tr>
                  ) : (
                    customers.map((c, index) => (
                      <tr key={c._id} >
                        <td>{c.cnNo}</td>
                        <td>{c.name1}</td>
                        {/* <td>{c.name2}</td> */}
                        <td>{c.categoryId?.categoryName || 'N/A'}</td>
                        <td>{c.search}</td>
                        <td>{c.address1}</td>
                        {/* <td>{c.address2}</td> */}
                        <td>{c.city}</td>
                        <td>{c.pincode}</td>
                        <td>{c.region}</td>
                        <td>{c.country}</td>
                        <td>{c.contactNo}</td>
                        <td>{c.email}</td>
                        <td>
                          <button
                            onClick={() => { handleEdit(c); handleOpenModal(); }}
                            className='btn btn-primary'
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
            {showModal && (
              <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" aria-labelledby="myLargeModalLabel" aria-modal="true" role="dialog">
                <div className="modal-dialog modal-lg">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h4 className="modal-title" id="myLargeModalLabel"> {editingId ? 'Edit Customer' : 'Add New Customer'}</h4>
                      <button type="button" className="btn-close" onClick={() => { handleCloseModal(), resetForm() }} aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                      <form onSubmit={handleSubmit}>
                        <div className='form-group row'>
                          <div className='col-xl-3 mb-2'>
                            <label >
                              Category
                            </label>
                            <select
                              name="categoryId"
                              value={formData.categoryId}
                              onChange={handleChange}
                              className='form-select'
                            >
                              <option value="">Select Category</option>
                              {categories.map(cat => (
                                <option key={cat._id} value={cat._id}>
                                  {cat.categoryName} ({cat.prefix})
                                </option>
                              ))}
                            </select>
                          </div>

                          <div className='col-xl-3 mb-2'>
                            <label >
                              Name 1
                            </label>
                            <input
                              type="text"
                              name="name1"
                              placeholder="Enter Name 1"
                              value={formData.name1}
                              onChange={handleChange}
                              className='form-control'
                            />
                          </div>

                          <div className='col-xl-3 mb-2'>
                            <label >Name 2</label>
                            <input
                              type="text"
                              name="name2"
                              placeholder="Enter Name 2 (Optional)"
                              value={formData.name2}
                              onChange={handleChange}
                              className='form-control'
                            />
                          </div>

                          <div className='col-xl-3 mb-2'>
                            <label >
                              Search Term
                            </label>
                            <input
                              type="text"
                              name="search"
                              placeholder="Enter Search Term"
                              value={formData.search}
                              onChange={handleChange}
                              className='form-control'
                            />

                          </div>

                          <div className='col-xl-3 mb-2'>
                            <label>
                              Address 1
                            </label>
                            <input
                              type="text"
                              name="address1"
                              placeholder="Enter Address 1"
                              value={formData.address1}
                              onChange={handleChange}
                              className='form-control'
                            />

                          </div>

                          <div className='col-xl-3 mb-2'>
                            <label >Address 2</label>
                            <input
                              type="text"
                              name="address2"
                              placeholder="Enter Address 2 (Optional)"
                              value={formData.address2}
                              onChange={handleChange}
                              className='form-control'
                            />
                          </div>

                          <div className='col-xl-3 mb-2'>
                            <label >City</label>
                            <input
                              type="text"
                              name="city"
                              placeholder="Enter City"
                              value={formData.city}
                              onChange={handleChange}
                              className='form-control'
                            />
                          </div>

                          <div className='col-xl-3 mb-2'>
                            <label >Pincode</label>
                            <input
                              type="text"
                              name="pincode"
                              placeholder="Enter 6-digit Pincode"
                              value={formData.pincode}
                              onChange={handleChange}
                              className='form-control'
                            />

                          </div>

                          <div className='col-xl-3 mb-2'>
                            <label >
                              Region
                            </label>
                            <select
                              name="region"
                              value={formData.region}
                              onChange={handleChange}
                              className='form-control'
                            >
                              <option value="">Select Region</option>
                              {regions.map(region => (
                                <option key={region} value={region}>{region}</option>
                              ))}
                            </select>

                          </div>

                          <div className='col-xl-3 mb-2'>
                            <label >
                              Country
                            </label>
                            <select
                              name="country"
                              value={formData.country}
                              onChange={handleChange}
                              className='form-control'
                            >
                              <option value="">Select Country</option>
                              {countries.map(c => (
                                <option key={c} value={c}>{c}</option>
                              ))}
                            </select>

                          </div>

                          <div className='col-xl-3 mb-2'>
                            <label >
                              Contact No
                            </label>
                            <input
                              type="text"
                              name="contactNo"
                              placeholder="Enter 10-digit Contact No"
                              value={formData.contactNo}
                              onChange={handleChange}
                              className='form-control'
                            />

                          </div>

                          <div className='col-xl-3 mb-2'>
                            <label >Email</label>
                            <input
                              type="email"
                              name="email"
                              placeholder="Enter Email (Optional)"
                              value={formData.email}
                              onChange={handleChange}
                              className='form-control'
                            />
                          </div>
                          <div className='col-xl-3 mb-2'>
                            <label >Name</label>
                            <input
                              type="name"
                              name="name"
                              placeholder="Enter name (Optional)"
                              value={formData.name}
                              onChange={handleChange}
                              className='form-control'
                            />

                          </div>
                        </div>
                        <div >
                          <button
                            type="submit"
                            className='btn btn-success'
                          >
                            {editingId ? 'Update Customer' : 'Save Customer'}
                          </button>

                          {editingId && (
                            <button
                              type="button"
                              onClick={resetForm}
                              className='btn btn-danger me-2 ms-2'
                            >
                              Cancel
                            </button>
                          )}
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div >
  );
}

export default CustomerForm;
