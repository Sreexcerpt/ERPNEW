import React, { useState, useEffect } from "react";
import axios from "axios";

function VendorForm() {
  const [formData, setFormData] = useState({
    categoryId: "",
    name1: "",
    name2: "",
    search: "",
    address1: "",
    address2: "",
    extraAddresses: [],
    city: "",
    pincode: "",
    region: "",
    country: "",
    contactNo: "",
    contactname: "",
    email: "",
  });

  const [categories, setCategories] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [vnNo, setVnNo] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [extraAddresses, setExtraAddresses] = useState([]);


  const regions = [
    "Karnataka",
    "Kerala",
    "Tamil Nadu",
    "Andhra Pradesh",
    "Telangana",
    "Maharashtra",
    "Gujarat",
    "Rajasthan",
    "Punjab",
    "Haryana",
  ];
  const countries = ["India", "USA", "Germany", "France", "UK"];

  useEffect(() => {
    fetchCategories();
    fetchVendors();
  }, []);

  const fetchCategories = async () => {
    const res = await axios.get("http://localhost:8080/api/vendor-categories");
    setCategories(res.data);
  };

  const fetchVendors = async () => {
    const res = await axios.get("http://localhost:8080/api/vendors");
    setVendors(res.data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await axios.put(
          `http://localhost:8080/api/vendors/${editingId}`,
          formData
        );
        alert("Vendor updated!");
      } else {
        const res = await axios.post(
          "http://localhost:8080/api/vendors",
          formData
        );
        setVnNo(res.data.vnNo);
        alert(`Vendor saved! VNNo: ${res.data.vnNo}`);
      }

      fetchVendors();
      setFormData({
        categoryId: "",
        name1: "",
        name2: "",
        search: "",
        address1: "",
        address2: "",
        extraAddresses: [],
        city: "",
        pincode: "",
        region: "",
        country: "",
        contactNo: "",
        contactname: "",
        email: "",
      });
      setEditingId(null);
    } catch (error) {
      console.error(error);
      alert("Error saving vendor");
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
      email: vendor.email,
    });
    setEditingId(vendor._id);
    setVnNo(vendor.vnNo);
    setShowModal(true);
  };

  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentVendors = vendors.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(vendors.length / itemsPerPage);

  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const [searchTerm, setSearchTerm] = useState("");

  const filteredVendors = vendors.filter((v) => {
    const vnNo = v.vnNo?.toLowerCase() || "";
    const name1 = v.name1?.toLowerCase() || "";
    const category = v.categoryId?.categoryName?.toLowerCase() || "";
    const keyword = searchTerm.toLowerCase();

    return (
      vnNo.includes(keyword) ||
      name1.includes(keyword) ||
      category.includes(keyword)
    );
  });

  const addExtraAddress = () => {
    setFormData(prev => ({
      ...prev,
      extraAddresses: [...prev.extraAddresses, '']
    }));
  };
  
  const handleExtraAddressChange = (index, value) => {
    const updated = [...formData.extraAddresses];
    updated[index] = value;
    setFormData(prev => ({
      ...prev,
      extraAddresses: updated
    }));
  };
  
  const removeExtraAddress = (index) => {
    const updated = [...formData.extraAddresses];
    updated.splice(index, 1);
    setFormData(prev => ({
      ...prev,
      extraAddresses: updated
    }));
  };
  const handleVendorStatusChange = async (vendorId, statusType, isChecked) => {
    try {
      const res = await axios.put(
        `http://localhost:8080/api/vendors/status/${vendorId}`,
        { [statusType]: isChecked }
      );
  
      // update local state
      setVendors((prev) =>
        prev.map((v) =>
          v._id === vendorId ? { ...v, [statusType]: isChecked } : v
        )
      );
  
      alert(`${statusType} updated successfully!`);
    } catch (err) {
      console.error(err);
      alert('Failed to update vendor status');
    }
  };
  
  return (
    <div class="content content-two">
      {/* <h2>{editingId ? "Edit Vendor" : "Add Vendor"}</h2>

      <form onSubmit={handleSubmit}>
        <label>Category</label>
        <select
          name="categoryId"
          value={formData.categoryId}
          onChange={handleChange}
          required
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.categoryName} ({cat.prefix})
            </option>
          ))}
        </select>

        <label>Name 1</label>
        <input
          type="text"
          name="name1"
          placeholder="Name 1"
          value={formData.name1}
          onChange={handleChange}
          required
        />

        <label>Name 2</label>
        <input
          type="text"
          name="name2"
          placeholder="Name 2"
          value={formData.name2}
          onChange={handleChange}
        />

        <label>Search Term</label>
        <input
          type="text"
          name="search"
          placeholder="Search Term"
          value={formData.search}
          onChange={handleChange}
        />

        <label>Address 1</label>
        <input
          type="text"
          name="address1"
          placeholder="Address 1"
          value={formData.address1}
          onChange={handleChange}
        />

        <label>Address 2</label>
        <input
          type="text"
          name="address2"
          placeholder="Address 2"
          value={formData.address2}
          onChange={handleChange}
        />

        <label>City</label>
        <input
          type="text"
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
        />

        <label>Pincode</label>
        <input
          type="text"
          name="pincode"
          placeholder="Pincode"
          value={formData.pincode}
          onChange={handleChange}
        />

        <label>Region</label>
        <select name="region" value={formData.region} onChange={handleChange}>
          <option value="">Select Region</option>
          {regions.map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>

        <label>Country</label>
        <select name="country" value={formData.country} onChange={handleChange}>
          <option value="">Select Country</option>
          {countries.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <label>Contact No</label>
        <input
          type="text"
          name="contactNo"
          placeholder="Contact No"
          value={formData.contactNo}
          onChange={handleChange}
        />
        <label>Contact Name</label>
        <input
          type="text"
          name="contactname"
          placeholder="Contact Name"
          value={formData.contactName}
          onChange={handleChange}
        />
        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />

        <button type="submit">{editingId ? "Update" : "Save"} Vendor</button>
      </form>

      {vnNo && <p>Generated VNNo: {vnNo}</p>}

      <hr />

      <h3>All Vendors</h3>
      <table border="1" width="100%">
        <thead>
          <tr>
            <th>VNNo</th>
            <th>Name1</th>
            <th>Category</th>
            <th>Contact</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {vendors.map((v) => (
            <tr key={v._id}>
              <td>{v.vnNo}</td>
              <td>{v.name1}</td>
              <td>{v.categoryId?.categoryName}</td>
              <td>{v.contactNo}</td>
              <td>
                <button onClick={() => handleEdit(v)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}

      <div class="d-flex d-block align-items-center justify-content-between flex-wrap gap-3 mb-3">
        <div>
          <h6>Vendor List</h6>
        </div>
        <div class="d-flex my-xl-auto right-content align-items-center flex-wrap gap-2">
          <div class="dropdown">
            <a
              href="javascript:void(0);"
              class="btn btn-outline-white d-inline-flex align-items-center"
              data-bs-toggle="dropdown"
            >
              <i class="isax isax-export-1 me-1"></i>Export
            </a>
            <ul class="dropdown-menu">
              <li>
                <a class="dropdown-item" href="javascript:void(0);">
                  Download as PDF
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="javascript:void(0);">
                  Download as Excel
                </a>
              </li>
            </ul>
          </div>
          <div>
            <a
              href="javascript:void(0);"
              class="btn btn-primary d-flex align-items-center"
              data-bs-toggle="modal"
              data-bs-target="#add_modal"
              onClick={() => {
                setShowModal(true);
                setFormData((prev) => ({
                  ...prev,
                  categoryId: "",
                  name1: "",
                  name2: "",
                  search: "",
                  address1: "",
                  address2: "",
                  city: "",
                  pincode: "",
                  region: "",
                  country: "",
                  contactNo: "",
                  contactname: "",
                  email: "",
                }));
                setEditingId(null);
              }}
            >
              <i class="isax isax-add-circle5 me-1"></i>New Vendor
            </a>
          </div>
        </div>
      </div>

      <div class="mb-3">
        <div class="d-flex align-items-center justify-content-between flex-wrap gap-3">
          <div class="d-flex align-items-center flex-wrap gap-2">
            <div class="table-search d-flex align-items-center mb-0">
              <input
                type="search"
                placeholder="Search"
                className="form-control"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div class="d-flex align-items-center flex-wrap gap-2">
            <div class="dropdown">
              <a
                href="javascript:void(0);"
                class="dropdown-toggle btn btn-outline-white d-inline-flex align-items-center"
                data-bs-toggle="dropdown"
              >
                <i class="isax isax-sort me-1"></i>Sort By :
                <span class="fw-normal ms-1">Latest</span>
              </a>
              <ul class="dropdown-menu dropdown-menu-end">
                <li>
                  <a href="javascript:void(0);" class="dropdown-item">
                    Latest
                  </a>
                </li>
                <li>
                  <a href="javascript:void(0);" class="dropdown-item">
                    Oldest
                  </a>
                </li>
              </ul>
            </div>
            <div class="dropdown">
              <a
                href="javascript:void(0);"
                class="dropdown-toggle btn btn-outline-white d-inline-flex align-items-center"
                data-bs-toggle="dropdown"
                data-bs-auto-close="outside"
              >
                <i class="isax isax-grid-3 me-1"></i>Column
              </a>
              <ul class="dropdown-menu dropdown-menu">
                <li>
                  <label class="dropdown-item d-flex align-items-center form-switch">
                    <i class="fa-solid fa-grip-vertical me-3 text-default"></i>
                    <input
                      class="form-check-input m-0 me-2"
                      type="checkbox"
                      checked
                    />
                    <span>Vendor</span>
                  </label>
                </li>
                <li>
                  <label class="dropdown-item d-flex align-items-center form-switch">
                    <i class="fa-solid fa-grip-vertical me-3 text-default"></i>
                    <input
                      class="form-check-input m-0 me-2"
                      type="checkbox"
                      checked
                    />
                    <span>Phone</span>
                  </label>
                </li>
                <li>
                  <label class="dropdown-item d-flex align-items-center form-switch">
                    <i class="fa-solid fa-grip-vertical me-3 text-default"></i>
                    <input class="form-check-input m-0 me-2" type="checkbox" />
                    <span>Created On</span>
                  </label>
                </li>
                <li>
                  <label class="dropdown-item d-flex align-items-center form-switch">
                    <i class="fa-solid fa-grip-vertical me-3 text-default"></i>
                    <input class="form-check-input m-0 me-2" type="checkbox" />
                    <span>Balance</span>
                  </label>
                </li>
                <li>
                  <label class="dropdown-item d-flex align-items-center form-switch">
                    <i class="fa-solid fa-grip-vertical me-3 text-default"></i>
                    <input class="form-check-input m-0 me-2" type="checkbox" />
                    <span>Status</span>
                  </label>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="align-items-center gap-2 flex-wrap filter-info mt-3">
          <h6 class="fs-13 fw-semibold">Filters</h6>
          <span class="tag bg-light border rounded-1 fs-12 text-dark badge">
            <span class="num-count d-inline-flex align-items-center justify-content-center bg-success fs-10 me-1">
              5
            </span>
            Suppliers Selected
            <span class="ms-1 tag-close">
              <i class="fa-solid fa-x fs-10"></i>
            </span>
          </span>
          <span class="tag bg-light border rounded-1 fs-12 text-dark badge">
            <span class="num-count d-inline-flex align-items-center justify-content-center bg-success fs-10 me-1">
              5
            </span>
            $10,000 - $25,500
            <span class="ms-1 tag-close">
              <i class="fa-solid fa-x fs-10"></i>
            </span>
          </span>
          <a
            href="#"
            class="link-danger fw-medium text-decoration-underline ms-md-1"
          >
            Clear All
          </a>
        </div>
      </div>

      <div class="table-responsive">
        <table class="table table-nowrap datatable">
        <thead>
  <tr>
    <th className="no-sort">
      <div className="form-check form-check-md">
        <input className="form-check-input" type="checkbox" id="select-all" />
      </div>
    </th>
    <th>VNNo</th>
    <th>Name1</th>
    <th>Category</th>
    <th>Contact</th>
    <th>City</th>
    <th>Delete Status</th>
    <th>Block Status</th>
    <th>Action</th>
  </tr>
</thead>

<tbody>
  {filteredVendors.map((v) => (
    <tr key={v._id}>
      <td>
        <div className="form-check form-check-md">
          <input className="form-check-input" type="checkbox" />
        </div>
      </td>

      <td>
        <div className="d-flex align-items-center">
          <div>
            <h6 className="fs-14 fw-medium mb-0">
              <a href="javascript:void(0);">{v.vnNo}</a>
            </h6>
          </div>
        </div>
      </td>

      <td>{v.name1}</td>
      <td>{v.categoryId?.categoryName}</td>
      <td className="text-dark">{v.contactNo}</td>
      <td className="text-dark">{v.city}</td>

      {/* ✅ Delete Status */}
      <td>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            checked={v.isDeleted || false}
            onChange={(e) =>
              handleVendorStatusChange(v._id, 'isDeleted', e.target.checked)
            }
          />
          <label className="form-check-label">
            {v.isDeleted ? 'Deleted' : 'Active'}
          </label>
        </div>
      </td>

      {/* ✅ Block Status */}
      <td>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            checked={v.isBlocked || false}
            onChange={(e) =>
              handleVendorStatusChange(v._id, 'isBlocked', e.target.checked)
            }
          />
          <label className="form-check-label">
            {v.isBlocked ? 'Blocked' : 'Unblocked'}
          </label>
        </div>
      </td>

      <td style={{ cursor: 'pointer' }} onClick={() => handleEdit(v)}>
        <i className="isax isax-edit me-2"></i>
      </td>
    </tr>
  ))}
</tbody>

        </table>

        <div
          className="dataTables_paginate paging_simple_numbers"
          id="DataTables_Table_0_paginate"
        >
          <ul className="pagination">
            <li
              className={`paginate_button page-item previous ${currentPage === 1 ? "disabled" : ""
                }`}
            >
              <a
                href="#"
                className="page-link"
                onClick={(e) => {
                  e.preventDefault();
                  handlePageClick(currentPage - 1);
                }}
              >
                <i className="isax isax-arrow-left"></i>
              </a>
            </li>

            {Array.from({ length: totalPages }, (_, i) => (
              <li
                key={i}
                className={`paginate_button page-item ${currentPage === i + 1 ? "active" : ""
                  }`}
              >
                <a
                  href="#"
                  className="page-link"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageClick(i + 1);
                  }}
                >
                  {i + 1}
                </a>
              </li>
            ))}

            <li
              className={`paginate_button page-item next ${currentPage === totalPages ? "disabled" : ""
                }`}
            >
              <a
                href="#"
                className="page-link"
                onClick={(e) => {
                  e.preventDefault();
                  handlePageClick(currentPage + 1);
                }}
              >
                <i className="isax isax-arrow-right-1"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div
        id="add_modal"
        className={`modal fade ${showModal ? "show" : ""}`}
        style={{ display: showModal ? "block" : "none" }}
        role="dialog"
        aria-hidden={!showModal}
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Add New Supplier</h4>
              <button
                type="button"
                class="btn-close custom-btn-close btn-close-modal"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setShowModal(false)}
              >
                <i class="fa-solid fa-x"></i>
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="row">
                  {/* Category */}
                  <div className="col-md-6">
                    <label className="form-label">Category</label>
                    <select
                      name="categoryId"
                      className="form-select"
                      value={formData.categoryId}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Category</option>
                      {categories.map((cat) => (
                        <option key={cat._id} value={cat._id}>
                          {cat.categoryName} ({cat.prefix})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Name 1 */}
                  <div className="col-md-6">
                    <label className="form-label">Name 1</label>
                    <input
                      type="text"
                      name="name1"
                      className="form-control"
                      value={formData.name1}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Name 2 */}
                  <div className="col-md-6">
                    <label className="form-label">Name 2</label>
                    <input
                      type="text"
                      name="name2"
                      className="form-control"
                      value={formData.name2}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Search */}
                  <div className="col-md-6">
                    <label className="form-label">Search Term</label>
                    <input
                      type="text"
                      name="search"
                      className="form-control"
                      value={formData.search}
                      onChange={handleChange}
                    />
                  </div>

                  <div className='col-xl-3 mb-2'>
  <label>Address 1</label>
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
  <label>Address 2</label>
  <input
    type="text"
    name="address2"
    placeholder="Enter Address 2"
    value={formData.address2}
    onChange={handleChange}
    className='form-control'
  />
</div>

{formData.extraAddresses.map((address, index) => (
  <div key={index} className="col-xl-3 mb-2 position-relative">
    <label>{`Address ${index + 3}`}</label>
    <input
      type="text"
      placeholder={`Enter Address ${index + 3}`}
      value={address}
      onChange={(e) => handleExtraAddressChange(index, e.target.value)}
      className="form-control"
    />
    <button
      type="button"
      className="btn btn-sm btn-danger position-absolute"
      style={{ top: '0', right: '0' }}
      onClick={() => removeExtraAddress(index)}
    >
      ❌
    </button>
  </div>
))}

<div className='col-xl-3 mb-2 d-flex align-items-end'>
  <button type="button" className="btn btn-outline-primary" onClick={addExtraAddress}>
    + Add Address
  </button>
</div>

                  {/* City */}
                  <div className="col-md-4">
                    <label className="form-label">City</label>
                    <input
                      type="text"
                      name="city"
                      className="form-control"
                      value={formData.city}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Pincode */}
                  <div className="col-md-4">
                    <label className="form-label">Pincode</label>
                    <input
                      type="text"
                      name="pincode"
                      className="form-control"
                      value={formData.pincode}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Region */}
                  <div className="col-md-4">
                    <label className="form-label">Region</label>
                    <select
                      name="region"
                      className="form-select"
                      value={formData.region}
                      onChange={handleChange}
                    >
                      <option value="">Select Region</option>
                      {regions.map((region) => (
                        <option key={region} value={region}>
                          {region}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Country */}
                  <div className="col-md-6">
                    <label className="form-label">Country</label>
                    <select
                      name="country"
                      className="form-select"
                      value={formData.country}
                      onChange={handleChange}
                    >
                      <option value="">Select Country</option>
                      {countries.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Contact No */}
                  <div className="col-md-6">
                    <label className="form-label">Contact No</label>
                    <input
                      type="text"
                      name="contactNo"
                      className="form-control"
                      value={formData.contactNo}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Contact Name */}
                  <div className="col-md-6">
                    <label className="form-label">Contact Person Name</label>
                    <input
                      type="text"
                      name="contactName"
                      className="form-control"
                      value={formData.contactName}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Email */}
                  <div className="col-md-6">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              {/* Footer Buttons */}
              <div className="modal-footer d-flex align-items-center justify-content-between gap-1">
                <button
                  type="button"
                  className="btn btn-outline-white"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VendorForm;
