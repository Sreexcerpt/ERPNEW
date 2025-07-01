import React, { useState, useEffect } from "react";

// Dummy Purchase Orders
const purchaseOrders = [
  {
    poNumber: "PONR-500001",
    vendor: "Customer CVFCV",
    deliveryLocation: "Hyderabad",
    deliveryAddress: "Mahadevpura",
    items: [
      {
        materialId: "MMNR-100001",
        description: "Pen",
        quantity: 100,
        baseUnit: "Piece",
        orderUnit: "Box",
        price: 500,
        deliveryDate: "2025-07-01",
        lotNo: ""
      }
    ]
  },
  {
    poNumber: "PONR-500002",
    vendor: "Ramesh Enterprises",
    deliveryLocation: "Bangalore",
    deliveryAddress: "KR Puram",
    items: [
      {
        materialId: "MMNR-100002",
        description: "Cement",
        quantity: 50,
        baseUnit: "Bag",
        orderUnit: "Pallet",
        price: 350,
        deliveryDate: "2025-07-03",
        lotNo: ""
      }
    ]
  }
];

const categoryDescriptions = {
  GoodsReciept: "Material received from vendor",
  Display: "Display for demo",
  Cancel: "Cancelled order"
};

function GoodsReceipt() {
  const today = new Date().toISOString().split("T")[0];
  const [selectedPO, setSelectedPO] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("poNumber");
const [searchResults, setSearchResults] = useState([]);


  const [formData, setFormData] = useState({
    category: "",
    catdesc: "",
    docnumber: ""
  });

  const [savedReceipts, setSavedReceipts] = useState(() => {
    const stored = localStorage.getItem("savedReceipts");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("savedReceipts", JSON.stringify(savedReceipts));
  }, [savedReceipts]);

  const handleSelectPO = (po) => {
    setSelectedPO(po);
    setShowModal(false);
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    let docnumber = "";

    if (value === "Cancel") {
      docnumber = `CNL-${Date.now()}`;
    } else if (value === "Display") {
      docnumber = `DSP-${Date.now()}`;
    }

    setFormData((prev) => ({
      ...prev,
      category: value,
      catdesc: categoryDescriptions[value] || "",
      docnumber
    }));
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...selectedPO.items];
    updatedItems[index][field] = value;
    setSelectedPO({ ...selectedPO, items: updatedItems });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedPO) {
      alert("Please select a Purchase Order.");
      return;
    }

    const receipt = {
      ...formData,
      ...selectedPO,
      date: today
    };

    setSavedReceipts((prev) => [...prev, receipt]);
    alert("Goods Receipt saved!");
  };

  // const filteredPOs = purchaseOrders.filter((po) =>
  //   [po.poNumber, po.vendor, po.deliveryLocation]
  //     .join(" ")
  //     .toLowerCase()
  //     .includes(searchTerm.toLowerCase())
  // );
  const filteredPOs = (searchTerm
    ? purchaseOrders.filter((po) =>
        (po[searchType] || "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
    : searchResults.length > 0
      ? searchResults
      : []
  );
  
  return (
    <div className="content p-3">
      <h6 className="mb-3">Goods Receipt</h6>
      <form onSubmit={handleSubmit}>
        <div className="card">
          <div className="card-header p-2">
            <div className="row mb-2">
              <div className="col-xl-3">
                <label>Category</label>
                <select
                  name="category"
                  className="form-select"
                  value={formData.category}
                  onChange={handleCategoryChange}
                >
                  <option value="">Select</option>
                  <option value="GoodsReciept">Goods Receipt</option>
                  <option value="Display">Display</option>
                  <option value="Cancel">Cancel</option>
                </select>
              </div>
              <div className="col-xl-3">
                <label>Description</label>
                <input
                  type="text"
                  name="catdesc"
                  className="form-control"
                  value={formData.catdesc}
                  readOnly
                />
              </div>
              <div className="col-xl-3">
                <label>Purchase Order</label>
                <div className="input-group">
                  <input
                    type="text"
                    name="po"
                    value={selectedPO?.poNumber || ""}
                    className="form-control"
                    readOnly
                  />
                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={() => setShowModal(true)}
                  >
                    Search
                  </button>
                </div>
              </div>
              <div className="col-xl-3">
                <label>Document Number</label>
                <input
                  type="text"
                  name="docnumber"
                  className="form-control"
                  value={formData.docnumber}
                  readOnly
                />
              </div>
            </div>

            <div className="row mb-2">
              <div className="col-xl-2">
                <label>Document Date</label>
                <input
                  type="date"
                  name="docdate"
                  defaultValue={today}
                  className="form-control"
                />
              </div>
              <div className="col-xl-2">
                <label>Posting Date</label>
                <input
                  type="date"
                  name="posdate"
                  defaultValue={today}
                  className="form-control"
                />
              </div>
              <div className="col-xl-2">
                <label>DC/LLR/REF</label>
                <input type="text" name="ref" className="form-control" />
              </div>
              <div className="col-xl-2">
                <label>Vendor/Supplier</label>
                <input
                  type="text"
                  name="vendor"
                  value={selectedPO?.vendor || ""}
                  className="form-control"
                  readOnly
                />
              </div>
              <div className="col-xl-2">
                <label>Location</label>
                <input
                  type="text"
                  name="location"
                  value={selectedPO?.deliveryLocation || ""}
                  className="form-control"
                  readOnly
                />
              </div>
            </div>
          </div>

          <div className="card-body">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>S. No</th>
                  <th>Mat No</th>
                  <th>Mat Desc</th>
                  <th>QTY</th>
                  <th>UOM</th>
                  <th>Del Date</th>
                  <th>LOT No</th>
                  <th>Value</th>
                  <th>Text</th>
                </tr>
              </thead>
              <tbody>
                {selectedPO?.items?.map((item, idx) => (
                  <tr key={idx}>
                    <td>{idx + 1}</td>
                    <td>
                      <input type="text" className="form-control" value={item.materialId} readOnly />
                    </td>
                    <td>
                      <input type="text" className="form-control" value={item.description} readOnly />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="form-control"
                        value={item.quantity}
                        onChange={(e) => handleItemChange(idx, "quantity", e.target.value)}
                      />
                    </td>
                    <td>
                      <input type="text" className="form-control" value={item.baseUnit} readOnly />
                    </td>
                    <td>
                      <input
                        type="date"
                        className="form-control"
                        value={item.deliveryDate}
                        onChange={(e) => handleItemChange(idx, "deliveryDate", e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        value={item.lotNo || ""}
                        onChange={(e) => handleItemChange(idx, "lotNo", e.target.value)}
                      />
                    </td>
                    <td>
                      <input type="number" className="form-control" value={item.price} readOnly />
                    </td>
                    <td>
                      <input type="text" className="form-control" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="text-end mt-3">
          <button type="submit" className="btn btn-success">Save</button>
        </div>
      </form>

      {/* ✅ Saved Receipts Section */}
      {savedReceipts.length > 0 && (
        <div className="card mt-4">
          <div className="card-header bg-secondary text-white d-flex justify-content-between">
            <span>Saved Goods Receipts</span>
            {/* <button
              className="btn btn-sm btn-danger"
              onClick={() => {
                localStorage.removeItem("savedReceipts");
                setSavedReceipts([]);
              }}
            >
              Clear All
            </button> */}
          </div>
          <div className="card-body">
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>S. No</th>
                  <th>PO Number</th>
                  {/* <th>Document No</th> */}
                  <th>Vendor</th>
                  <th>Category</th>
                  <th>Description</th>
                  <th>Date</th>
                  <th>Items</th>
                </tr>
              </thead>
              <tbody>
                {savedReceipts.map((rec, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{rec.poNumber}</td>
                    {/* <td>{rec.docnumber || "-"}</td> */}
                    <td>{rec.vendor}</td>
                    <td>{rec.category}</td>
                    <td>{rec.catdesc}</td>
                    <td>{rec.date}</td>
                    <td>
                      <ul className="mb-0 ps-3">
                        {rec.items.map((item, i) => (
                          <li key={i}>
                            {item.description} - {item.quantity} {item.baseUnit}
                          </li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 🔍 Modal for Purchase Order Search */}
      {showModal && (
  <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
    <div className="modal-dialog modal-xl">
      <div className="modal-content">
        <div className="modal-header bg-primary text-white">
          <h5 className="modal-title">
            <i className="fas fa-search me-2"></i>Search Purchase Orders
          </h5>
          <button type="button" className="btn-close btn-close-white" onClick={() => setShowModal(false)}></button>
        </div>

        <div className="modal-body">
          {/* Search Filters */}
          <div className="row mb-3">
            <div className="col-md-3">
              <label className="form-label">Search Type</label>
              <select
                className="form-select"
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
              >
                <option value="poNumber">PO Number</option>
                <option value="vendor">Vendor</option>
                <option value="deliveryLocation">Location</option>
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
                  placeholder={`Search by ${searchType}...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="col-md-3 d-flex align-items-end gap-2">
              <button className="btn btn-info" onClick={() => setSearchResults(purchaseOrders)}>
                <i className="fas fa-list me-1"></i>View All
              </button>
              {searchTerm && (
                <button className="btn btn-outline-secondary" onClick={() => {
                  setSearchTerm("");
                  setSearchResults([]);
                }}>
                  <i className="fas fa-times me-1"></i>Clear
                </button>
              )}
            </div>
          </div>

          {/* Search Results */}
          <div style={{ maxHeight: "400px", overflowY: "auto" }}>
            {filteredPOs.length > 0 ? (
              <table className="table table-hover">
                <thead className="table-light sticky-top">
                  <tr>
                    <th>PO Number</th>
                    <th>Vendor</th>
                    <th>Delivery Location</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPOs.map((po, idx) => (
                    <tr key={idx}>
                      <td><span className="badge bg-primary">{po.poNumber}</span></td>
                      <td>{po.vendor}</td>
                      <td>{po.deliveryLocation}</td>
                      <td>
                        <button className="btn btn-success btn-sm" onClick={() => handleSelectPO(po)}>
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
                  {searchTerm
                    ? `No purchase orders found for "${searchTerm}"`
                    : 'Enter search term or click "View All"'}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
            <i className="fas fa-times me-1"></i>Close
          </button>
        </div>
      </div>
    </div>
  </div>
)}

    </div>
  );
}

export default GoodsReceipt;

