import React, { useState, useEffect } from "react";

function VendorPriceListForm() {
  const [formData, setFormData] = useState({
    categoryId: "",
    vendorId: "",
    materialId: "",
    unit: "",
    bum: "",
    orderUnit: "",
    buyer: "",
    taxId: "",
  });

  const [categories, setCategories] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [taxes, setTaxes] = useState([]);
  const [priceList, setPriceList] = useState([]);
  const [conversionValue, setConversionValue] = useState(1);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchCategories();
    fetchVendors();
    fetchMaterials();
    fetchTaxes();
    fetchPriceList();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/vendor-categories");
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  const fetchVendors = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/vendors");
      const data = await res.json();
      setVendors(data);
    } catch (err) {
      console.error("Error fetching vendors:", err);
    }
  };

  const fetchMaterials = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/material");
      const data = await res.json();
      setMaterials(data);
    } catch (err) {
      console.error("Error fetching materials:", err);
    }
  };

  const fetchTaxes = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/tax");
      const data = await res.json();
      setTaxes(data);
    } catch (err) {
      console.error("Error fetching taxes:", err);
    }
  };

  const fetchPriceList = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/vendor-price-lists");
      const data = await res.json();
      setPriceList(data);
    } catch (err) {
      console.error("Error fetching price list:", err);
    }
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;
    let updatedForm = { ...formData, [name]: value };

    if (name === "materialId") {
      try {
        const res = await fetch(`http://localhost:8080/api/material/${value}`);
        const mat = await res.json();
        const conv = mat.conversionValue || 1;
        setConversionValue(conv);

        const bum = parseFloat(formData.bum) || 0;
        updatedForm.orderUnit = (bum * conv).toFixed(2);
      } catch (err) {
        console.error("Error fetching material:", err);
        setConversionValue(1);
      }
    }

    if (name === "bum") {
      const bum = parseFloat(value);
      if (!isNaN(bum)) {
        updatedForm.orderUnit = (bum * conversionValue).toFixed(2);
      } else {
        updatedForm.orderUnit = "";
      }
    }

    setFormData(updatedForm);
  };

  const handleSubmit = async () => {
    const errors = [];
    if (!formData.unit.trim()) errors.push("Unit (Location) is required.");
    if (!formData.categoryId) errors.push("Category is required.");
    if (!formData.vendorId) errors.push("Vendor is required.");
    if (!formData.materialId) errors.push("Material is required.");
    if (!formData.bum) errors.push("BUM (Base Unit Multiplier) is required.");
    if (!formData.buyer.trim()) errors.push("Buyer is required.");

    if (errors.length > 0) {
      alert(errors.join("\n"));
      return;
    }

    try {
      if (editingId) {
        // Update existing record
        console.log("Updating with ID:", editingId);
        console.log("Form data:", formData);

        const res = await fetch(
          `http://localhost:8080/api/vendor-price-lists/${editingId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );

        console.log("Update response status:", res.status);

        if (res.ok) {
          alert("Vendor Price List Updated Successfully!");
          setEditingId(null);
        } else {
          const errorText = await res.text();
          console.error("Update failed:", errorText);
          throw new Error(`Update failed: ${res.status} - ${errorText}`);
        }
      } else {
        // Create new record
        const res = await fetch(
          "http://localhost:8080/api/vendor-price-lists",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );

        if (res.ok) {
          alert("Vendor Price List Saved Successfully!");
        } else {
          const errorText = await res.text();
          console.error("Save failed:", errorText);
          throw new Error(`Save failed: ${res.status} - ${errorText}`);
        }
      }

      resetForm();
      setShowForm(false);
      fetchPriceList(); // Refresh the list
     
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Failed to save Vendor Price List: " + error.message);
    }
  };

  const resetForm = () => {
    setFormData({
      categoryId: "",
      vendorId: "",
      materialId: "",
      unit: "",
      bum: "",
      orderUnit: "",
      buyer: "",
      taxId: "",
    });
    setConversionValue(1);
    setEditingId(null);
  };

  const handleEdit = async (id) => {
    try {
      console.log("Editing ID:", id);
      const res = await fetch(
        `http://localhost:8080/api/vendor-price-lists/${id}`
      );

      if (!res.ok) {
        throw new Error(`Failed to fetch: ${res.status} - ${res.statusText}`);
      }

      const data = await res.json();
     

      // Extract ID from ObjectId format or use as string
      const extractId = (idField) => {
        if (!idField) return "";
        if (typeof idField === "string") return idField;
        if (typeof idField === "object") {
          return idField.$oid || idField._id || idField.toString();
        }
        return idField.toString();
      };

      setFormData({
        categoryId: extractId(data.categoryId),
        vendorId: extractId(data.vendorId),
        materialId: extractId(data.materialId),
        unit: data.unit,
        bum: data.bum,
        orderUnit: data.orderUnit,
        buyer: data.buyer,
        taxId: extractId(data.taxId),
      });

      setEditingId(id);
      setShowForm(true);
      setShowModal(true);
    } catch (err) {
      console.error("Error fetching record for edit:", err);
      alert("Failed to load record for editing: " + err.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      try {
        const res = await fetch(
          `http://localhost:8080/api/vendor-price-lists/${id}`,
          {
            method: "DELETE",
          }
        );
        if (res.ok) {
          alert("Record deleted successfully!");
          fetchPriceList();
        } else {
          throw new Error("Delete failed");
        }
      } catch (err) {
        console.error("Error deleting record:", err);
        alert("Failed to delete record");
      }
    }
  };

  const handleCancel = () => {
    resetForm();
    setShowForm(false);
  };

  // Helper function to extract ID from ObjectId format
  const extractId = (idField) => {
    if (!idField) return null;
    if (typeof idField === "string") return idField;
    if (typeof idField === "object") {
      return idField.$oid || idField._id || idField.toString();
    }
    return idField.toString();
  };

  const getCategoryName = (categoryId) => {
    const id = extractId(categoryId);
    const category = categories.find((cat) => cat._id === id);
    return category ? category.categoryName : "Unknown";
  };

  const getVendorName = (vendorId) => {
    const id = extractId(vendorId);
    const vendor = vendors.find((v) => v._id === id);
    return vendor ? vendor.name1 : "Unknown";
  };

  const getMaterialName = (materialId) => {
    const id = extractId(materialId);
    const material = materials.find((m) => m._id === id);
    return material ? material.description : "Unknown";
  };

  const getTaxName = (taxId) => {
    if (!taxId) return "No Tax";
    const id = extractId(taxId);
    const tax = taxes.find((t) => t._id === id);
    return tax ? tax.taxName : "Unknown";
  };

  const [showModal, setShowModal] = useState(false);


   const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  const paginatedData = priceList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  const totalPages = Math.ceil(priceList.length / itemsPerPage);
  const handlePageClick = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  

  return (
    <>
      {/* <div className="content">
        <div>
          <h2>Vendor Price List Management</h2>

          {!showForm ? (
            <div>
              <button onClick={() => setShowForm(true)}>
                Add New Price List
              </button>

              <table>
                <thead>
                  <tr>
                    <th>Customer</th>
                    <th>Vendor</th>
                    <th>Material</th>
                    <th>Unit</th>
                    <th>BUM</th>
                    <th>Order Unit</th>
                    <th>Buyer</th>
                    <th>Tax</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {priceList.map((item) => (
                    <tr key={extractId(item._id)}>
                      <td>{getCategoryName(item.categoryId)}</td>
                      <td>{getVendorName(item.vendorId)}</td>
                      <td>{getMaterialName(item.materialId)}</td>
                      <td>{item.unit}</td>
                      <td>{item.bum}</td>
                      <td>{item.orderUnit}</td>
                      <td>{item.buyer}</td>
                      <td>{getTaxName(item.taxId)}</td>
                      <td>
                        <button onClick={() => handleEdit(extractId(item._id))}>
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div
              style={{
                background: "#f4f4f4",
                padding: "2rem",
                borderRadius: "10px",
              }}
            >
              <h3>{editingId ? "Edit Price List" : "Add New Price List"}</h3>

              <div onSubmit={handleSubmit}>
                <label>Unit (Location)</label>
                <input
                  type="text"
                  name="unit"
                  value={formData.unit}
                  onChange={handleChange}
                  required
                />
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
                      {cat.categoryName}
                    </option>
                  ))}
                </select>

                <label>Vendor</label>
                <select
                  name="vendorId"
                  value={formData.vendorId}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Vendor</option>
                  {vendors.map((v) => (
                    <option key={v._id} value={v._id}>
                      {v.name1}
                    </option>
                  ))}
                </select>

                <label>Material</label>
                <select
                  name="materialId"
                  value={formData.materialId}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Material</option>
                  {materials.map((m) => (
                    <option key={m._id} value={m._id}>
                      {m.description}
                    </option>
                  ))}
                </select>

                <label>Base Unit (BUM)</label>
                <input
                  type="number"
                  name="bum"
                  value={formData.bum}
                  onChange={handleChange}
                  required
                />

                <label>Buyer</label>
                <input
                  type="text"
                  name="buyer"
                  value={formData.buyer}
                  onChange={handleChange}
                  required
                />

                <label>Order Unit </label>
                <input
                  type="text"
                  name="orderUnit"
                  value={formData.orderUnit}
                  readOnly
                  style={{ ...inputStyle, backgroundColor: "#e9e9e9" }}
                />

                <label>Tax</label>
                <select
                  name="taxId"
                  value={formData.taxId}
                  onChange={handleChange}
                >
                  <option value="">Select Tax</option>
                  {taxes.map((tax) => (
                    <option key={tax._id} value={tax._id}>
                      {tax.taxName}
                    </option>
                  ))}
                </select>

                <div style={{ marginTop: "20px" }}>
                  <button type="button" onClick={handleSubmit}>
                    {editingId ? "Update" : "Save"}
                  </button>
                  <button type="button" onClick={handleCancel}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div> */}

      <div class="content content-two">
        <div class="d-flex d-block align-items-center justify-content-between flex-wrap gap-3 mb-3">
          <div>
            <h6>Vendor-Price-List</h6>
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
                    customerId: "",
                    materialId: "",
                    unit: "",
                    bum: "",
                    orderUnit: "",
                    salesGroup: "",
                    taxId: "",
                    tandc: "",
                  }));

                  setEditingId(null);
                }}
              >
                <i class="isax isax-add-circle5 me-1"></i>New Price List
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
            </div>
          </div>
        </div>

        <div className="table-responsive">
          <table className="table table-nowrap datatable">
            <thead>
              <tr>
                <th className="no-sort">
                  <div className="form-check form-check-md">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="select-all"
                    />
                  </div>
                </th>
                <th>Customer</th>
                <th>Vendor</th>
                <th>Material</th>
                <th>Unit</th>
                <th>BUM</th>
                <th>Order Unit</th>
                <th>Buyer</th>
                <th>Tax</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((item) => (
                <tr key={extractId(item._id)}>
                  <td>
                    <div className="form-check form-check-md">
                      <input className="form-check-input" type="checkbox" />
                    </div>
                  </td>
                  <td>
                    <div className="d-flex align-items-center">
                      <h6 className="fs-14 fw-medium mb-0">
                        <a href="javascript:void(0);">
                          {getCategoryName(item.categoryId)}
                        </a>
                      </h6>
                    </div>
                  </td>
                  <td>{getVendorName(item.vendorId)}</td>
                  <td>{getMaterialName(item.materialId)}</td>
                  <td className="text-dark">{item.unit}</td>
                  <td className="text-dark">{item.bum}</td>
                  <td className="text-dark">{item.orderUnit}</td>
                  <td className="text-dark">{item.buyer}</td>
                  <td className="text-dark">{getTaxName(item.taxId)}</td>
                  <td style={{ cursor: "pointer" }}>
                    <i
                      className="isax isax-edit me-2 text-primary"
                      onClick={() => handleEdit(extractId(item._id))}
                    ></i>
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
              className={`paginate_button page-item previous ${
                currentPage === 1 ? "disabled" : ""
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
                className={`paginate_button page-item ${
                  currentPage === i + 1 ? "active" : ""
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
              className={`paginate_button page-item next ${
                currentPage === totalPages ? "disabled" : ""
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
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">
                  {editingId ? "Edit Entry" : "Add New Entry"}
                </h4>
                <button
                  type="button"
                  className="btn-close custom-btn-close btn-close-modal"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => setShowModal(false)}
                >
                  <i className="fa-solid fa-x"></i>
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="row">
                    {/* Unit (Location) */}
                    <div className="col-md-6">
                      <label className="form-label">Unit (Location)</label>
                      <input
                        type="text"
                        name="unit"
                        className="form-control"
                        value={formData.unit}
                        onChange={handleChange}
                        required
                      />
                    </div>

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
                            {cat.categoryName}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Vendor */}
                    <div className="col-md-6">
                      <label className="form-label">Vendor</label>
                      <select
                        name="vendorId"
                        className="form-select"
                        value={formData.vendorId}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Vendor</option>
                        {vendors.map((v) => (
                          <option key={v._id} value={v._id}>
                            {v.name1}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Material */}
                    <div className="col-md-6">
                      <label className="form-label">Material</label>
                      <select
                        name="materialId"
                        className="form-select"
                        value={formData.materialId}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Material</option>
                        {materials.map((m) => (
                          <option key={m._id} value={m._id}>
                            {m.description}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Base Unit (BUM) */}
                    <div className="col-md-6">
                      <label className="form-label">Base Unit (BUM)</label>
                      <input
                        type="number"
                        name="bum"
                        className="form-control"
                        value={formData.bum}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    {/* Buyer */}
                    <div className="col-md-6">
                      <label className="form-label">Buyer</label>
                      <input
                        type="text"
                        name="buyer"
                        className="form-control"
                        value={formData.buyer}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    {/* Order Unit (read-only) */}
                    <div className="col-md-6">
                      <label className="form-label">Order Unit</label>
                      <input
                        type="text"
                        name="orderUnit"
                        className="form-control"
                        value={formData.orderUnit}
                        readOnly
                        style={{ backgroundColor: "#e9e9e9" }}
                      />
                    </div>

                    {/* Tax */}
                    <div className="col-md-6">
                      <label className="form-label">Tax</label>
                      <select
                        name="taxId"
                        className="form-select"
                        value={formData.taxId}
                        onChange={handleChange}
                      >
                        <option value="">Select Tax</option>
                        {taxes.map((tax) => (
                          <option key={tax._id} value={tax._id}>
                            {tax.taxName}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="modal-footer d-flex align-items-center justify-content-between gap-1">
                  <button
                    type="button"
                    className="btn btn-outline-white"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    {editingId ? "Update" : "Save"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default VendorPriceListForm;
