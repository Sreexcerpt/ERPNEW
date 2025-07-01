import React, { useState, useEffect } from "react";
import axios from "axios";

function CustomerPriceListForm() {
  const [formData, setFormData] = useState({
    _id: "", // for edit tracking
    categoryId: "",
    customerId: "",
    materialId: "",
    unit: "",
    bum: "",
    orderUnit: "",
    salesGroup: "",
    taxId: "",
    tandc: "",
  });
  const [showSearchModal, setShowSearchModal] = useState(false);
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
    const res = await axios.get(
      "http://localhost:8080/api/customer-categories"
    );
    setCategories(res.data);
  };

  const fetchCustomers = async () => {
    const res = await axios.get("http://localhost:8080/api/customers");
    setCustomers(res.data);
    console.log("cut", res.data);
  };

  const fetchMaterials = async () => {
    const res = await axios.get("http://localhost:8080/api/material");
    setMaterials(res.data);
  };

  const fetchTaxes = async () => {
    const res = await axios.get("http://localhost:8080/api/tax");
    setTaxes(res.data);
  };

  const fetchAllPriceLists = async () => {
    const res = await axios.get(
      "http://localhost:8080/api/customer-price-lists"
    );
    setAllData(res.data);
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;
    let updatedForm = { ...formData, [name]: value };

    if (name === "materialId") {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/material/${value}`
        );
        const conv = res.data.conversionValue || 1;
        setConversionValue(conv);
        const bum = parseFloat(formData.bum) || 0;
        updatedForm.orderUnit = (bum * conv).toFixed(2);
      } catch {
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (formData._id) {
        await axios.put(
          `http://localhost:8080/api/customer-price-lists/${formData._id}`,
          formData
        );
        alert("Updated successfully");
      } else {
        await axios.post(
          `http://localhost:8080/api/customer-price-lists`,
          formData
        );
        alert("Saved successfully");
      }

      setFormData({
        _id: "",
        categoryId: "",
        customerId: "",
        materialId: "",
        unit: "",
        bum: "",
        orderUnit: "",
        salesGroup: "",
        taxId: "",
        tandc: "",
      });

      setConversionValue(1);
      fetchAllPriceLists(); // refresh table
    } catch (err) {
      alert("Error saving data");
      console.error("Submit error:", err);
    }
  };
  const handleEdit = (item) => {

    // Helper function to safely extract ID
    const extractId = (field) => {
      if (!field) return ""; // Handle null, undefined, or empty values
      if (typeof field === "object" && field._id) return field._id;
      if (typeof field === "string") return field;
      return "";
    };

    // Extract IDs from nested objects or use the ID directly
    const categoryId = extractId(item.categoryId);
    const customerId = extractId(item.customerId);
    const materialId = extractId(item.materialId);
    const taxId = extractId(item.taxId);
    const tandc = extractId(item.tandc);

    const newFormData = {
      _id: item._id,
      categoryId: categoryId,
      customerId: customerId,
      materialId: materialId,
      unit: item.unit || "",
      bum: item.bum || "",
      orderUnit: item.orderUnit || "",
      salesGroup: item.salesGroup || "",
      taxId: taxId,
      tandc: tandc,
    };

    setFormData(newFormData);
    setShowModal(true);

    // Set conversion value if material exists
    if (materialId) {
      axios
        .get(`http://localhost:8080/api/material/${materialId}`)
        .then((res) => {
          const conv = res.data.conversionValue || 1;
          setConversionValue(conv);
          console.log("Conversion value set to:", conv);
        })
        .catch((error) => {
          console.error("Error fetching material conversion:", error);
          setConversionValue(1);
        });
    }
  };

  const [showModal, setShowModal] = useState(false);


  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const paginatedData = allData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(allData.length / itemsPerPage);
  const handlePageClick = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = allData.filter((item) => {
    const customerName = item.customerId?.name1?.toLowerCase() || "";
    const categoryName = item.categoryId?.categoryName?.toLowerCase() || "";
    const materialDesc = item.materialId?.description?.toLowerCase() || "";

    return (
      customerName.includes(searchQuery.toLowerCase()) ||
      categoryName.includes(searchQuery.toLowerCase()) ||
      materialDesc.includes(searchQuery.toLowerCase())
    );
  });


  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const [showdropdown, setShowdropdown] = useState(false);

  const handleOpendropdown = () => setShowdropdown(true);
  const handleClosedropdown = () => setShowdropdown(false);

  const openSearchModal = (index) => {
    setCurrentEditIndex(index);
    setShowSearchModal(true);
    setSearchQuery('');
    setSearchResults([]);
  };

  const closeSearchModal = () => {
    setShowSearchModal(false);
    setCurrentEditIndex(null);
    setSearchQuery('');
    setSearchResults([]);
  };
  const selectMaterialFromSearch = (material) => {
    if (currentEditIndex !== null) {
      const updated = [...selectedItems];
      updated[currentEditIndex] = {
        ...updated[currentEditIndex],
        materialId: material.materialId,
        description: material.description,
        baseUnit: material.baseUnit,
        orderUnit: material.orderUnit,
        location: material.location,
        materialgroup: material.materialgroup,
        isManual: true,
      };
      setSelectedItems(updated);
    }
    closeSearchModal();
  };
  return (
    <>
      <div class="content content-two">
        <div class="d-flex d-block align-items-center justify-content-between flex-wrap gap-3 mb-3">
          <div>
            <h6>Customer-Price-List</h6>
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
              <div>
                <a onClick={() => { handleOpenModal(); }} className="btn btn-primary d-flex align-items-center"><i className="isax isax-add-circle5 me-1"></i>New Material</a>
              </div>
            </div>
          </div>
        </div>

        <div class="mb-3">
          <div class="d-flex align-items-center justify-content-between flex-wrap gap-3">
            <div class="d-flex align-items-center flex-wrap gap-2">
              <div class="table-search d-flex align-items-center mb-0">
                <input
                  type="search"
                  placeholder="Search Customer / Category / Material"
                  className="form-control"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
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
                <th>Customer</th>
                <th>Category</th>
                <th>Material</th>
                <th>Unit</th>
                <th>BUM</th>
                <th>Order Unit</th>
                <th>Sales Group</th>
                <th>Tax</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row) => (
                <tr key={row._id}>
                  <td>
                    <div className="d-flex align-items-center">
                      <div>
                        <h6 className="fs-14 fw-medium mb-0">
                          <a href="javascript:void(0);">
                            {row.customerId?.name1}
                          </a>
                        </h6>
                      </div>
                    </div>
                  </td>
                  <td>{row.categoryId?.categoryName}</td>
                  <td>{row.materialId?.description}</td>
                  <td className="text-dark">{row.unit}</td>
                  <td className="text-dark">{row.bum}</td>
                  <td className="text-dark">{row.orderUnit}</td>
                  <td className="text-dark">{row.salesGroup}</td>
                  <td className="text-dark">{row.taxId?.taxName}</td>
                  <td style={{ cursor: "pointer" }}>
                    <i
                      className="isax isax-edit me-2 text-primary"
                      onClick={() => handleEdit(row)}
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

        {showModal && (
          <>
            <div className="modal-backdrop fade show"></div>
            <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" aria-labelledby="myLargeModalLabel" aria-modal="true" role="dialog">
              <div className="modal-dialog modal-lg">
                <div className="modal-content">
                  <div className="modal-header">
                    <h4 className="modal-title" id="myLargeModalLabel">Customer Price</h4>
                    <button type="button" className="btn-close" onClick={() => {
                      handleCloseModal();
                      setFormData({
                        _id: "",
                        categoryId: "",
                        customerId: "",
                        materialId: "",
                        unit: "",
                        bum: "",
                        orderUnit: "",
                        salesGroup: "",
                        taxId: "",
                        tandc: "",
                      });
                    }} aria-label="Close"></button>
                  </div>
                  <div className="modal-body">


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
                              <option value="">Select</option>
                              {categories.map((cat) => (
                                <option key={cat._id} value={cat._id}>
                                  {cat.categoryName}
                                </option>
                              ))}
                            </select>
                          </div>

                          {/* Customer */}
                          <div className="col-md-6">
                            <label className="form-label">Customer</label>
                            <select
                              name="customerId"
                              className="form-select"
                              value={formData.customerId}
                              onChange={handleChange}
                              required
                            >
                              <option value="">Select</option>
                              {customers.map((c) => (
                                <option key={c._id} value={c._id}>
                                  {c.name1}
                                </option>
                              ))}
                            </select>
                          </div>

                          {/* Material */}

                          <div className="input-group input-group-sm">
                            <input
                              className="form-control"
                              // value={item.materialId}
                              onChange={(e) => updateField(actualIndex, 'materialId', e.target.value)}
                              placeholder="Material ID"

                            />
                            <button
                              className="btn btn-outline-info"
                              onClick={() => openSearchModal(actualIndex)}
                              title="Search Material"
                            >
                              <i className="fas fa-search"></i>
                            </button>
                          </div>

                          {/* Unit */}
                          <div className="col-md-6">
                            <label className="form-label">Unit</label>
                            <input
                              type="text"
                              name="unit"
                              className="form-control"
                              value={formData.unit}
                              onChange={handleChange}
                              required
                            />
                          </div>

                          {/* BUM */}
                          <div className="col-md-6">
                            <label className="form-label">BUM</label>
                            <input
                              type="number"
                              name="bum"
                              className="form-control"
                              value={formData.bum}
                              onChange={handleChange}
                              required
                            />
                          </div>

                          {/* Sales Group */}
                          <div className="col-md-6">
                            <label className="form-label">Sales Group</label>
                            <input
                              type="text"
                              name="salesGroup"
                              className="form-control"
                              value={formData.salesGroup}
                              onChange={handleChange}
                              required
                            />
                          </div>

                          {/* Order Unit */}
                          <div className="col-md-6">
                            <label className="form-label">Order Unit</label>
                            <input
                              type="text"
                              name="orderUnit"
                              className="form-control"
                              value={formData.orderUnit}
                              required
                            />
                          </div>

                          {/* T&C */}
                          <div className="col-md-6">
                            <label className="form-label">T&C</label>
                            <input
                              type="text"
                              name="tandc"
                              className="form-control"
                              value={formData.tandc}
                              onChange={handleChange}
                              required
                            />
                          </div>

                          {/* Tax */}
                          <div className="col-md-12">
                            <label className="form-label">Tax</label>
                            <select
                              name="taxId"
                              className="form-select"
                              value={formData.taxId}
                              onChange={handleChange}
                            >
                              <option value="">Select</option>
                              {taxes.map((tax) => (
                                <option key={tax._id} value={tax._id}>
                                  {tax.taxName} (CGST: {tax.cgst}%, SGST: {tax.sgst}%,
                                  IGST: {tax.igst}%)
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
                          {formData._id ? "Update" : "Save"}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        {showSearchModal && (
          <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-xl">
              <div className="modal-content">
                <div className="modal-header bg-primary text-white">
                  <h5 className="modal-title">
                    <i className="fas fa-search me-2"></i>Search Materials
                  </h5>
                  <button
                    type="button"
                    className="btn-close btn-close-white"
                    onClick={closeSearchModal}
                  ></button>
                </div>
                <div className="modal-body">
                  {/* Search Controls */}
                  <div className="row mb-3">
                    <div className="col-md-3">
                      <label className="form-label">Search Type</label>
                      <select
                        className="form-select"
                        value={searchType}
                        onChange={(e) => setSearchType(e.target.value)}
                      >
                        <option value="materialId">Material ID</option>
                        <option value="description">Description</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Search Query</label>
                      <div className="input-group">
                        <span className="input-group-text">
                          <i className="fas fa-search"></i>
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          placeholder={
                            searchType === 'materialId'
                              ? 'Enter Material ID (e.g., MMNR-100000 or 100000)'
                              : 'Search by Description...'
                          }
                          value={searchQuery}
                          onChange={handleSearchInputChange}
                        />
                      </div>
                    </div>
                    <div className="col-md-3">
                      <label className="form-label">&nbsp;</label>
                      <div className="d-flex gap-2">
                        <button className="btn btn-info" onClick={handleViewAll}>
                          <i className="fas fa-list me-1"></i>View All
                        </button>
                        {searchResults.length > 0 && (
                          <button className="btn btn-outline-secondary" onClick={handleClearResults}>
                            <i className="fas fa-times me-1"></i>Clear
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Search Results */}
                  <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                    {searchResults.length > 0 ? (
                      <table className="table table-hover">
                        <thead className="table-light sticky-top">
                          <tr>
                            <th>Material ID</th>
                            <th>Description</th>
                            <th>Base Unit</th>
                            <th>Location</th>
                            <th>Material Group</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {searchResults.map((material, idx) => (
                            <tr key={idx}>
                              <td><span className="badge ">{material.materialId}</span></td>
                              <td>{material.description}</td>
                              <td><span className="badge bg-secondary">{material.baseUnit}</span></td>
                              <td>{material.location}</td>
                              <td><span className="badge bg-info">{material.materialgroup}</span></td>
                              <td>
                                <button
                                  className="btn btn-success btn-sm"
                                  onClick={() => selectMaterialFromSearch(material)}
                                >
                                  <i className="fas fa-check me-1"></i>Select
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <div className="text-center py-4">
                        <i className="fas fa-search fa-3x text-muted mb-3"></i>
                        <p className="text-muted">
                          {materials.length === 0
                            ? 'No materials loaded from API'
                            : searchQuery
                              ? `No materials found matching "${searchQuery}"`
                              : 'Enter search term or click "View All"'
                          }
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={closeSearchModal}
                  >
                    <i className="fas fa-times me-1"></i>Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default CustomerPriceListForm;
