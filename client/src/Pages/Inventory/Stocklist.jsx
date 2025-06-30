import React, { useState } from "react";

const sampleStock = [
  { matno: "RM001", matdesc: "Steel Rod", category: "Raw Material", uom: "KG", quantity: 500, status: "In Stock" },
  { matno: "RM002", matdesc: "Aluminum Sheet", category: "Raw Material", uom: "PCS", quantity: 30, status: "Low Stock" },
  { matno: "CON001", matdesc: "Paint", category: "Consumable", uom: "LTR", quantity: 5, status: "Out of Stock" },
  { matno: "HW001", matdesc: "Bolts", category: "Hardware", uom: "PCS", quantity: 1000, status: "In Stock" },
];

function StockListERP() {
  const [stock, setStock] = useState(sampleStock);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const filtered = stock.filter((item) =>
    item.matdesc.toLowerCase().includes(search.toLowerCase()) &&
    (category === "" || item.category === category)
  );

  return (
    <div className="content">
      <h3 className="mb-3">ERP Stock Inventory</h3>

      {/* Filters */}
      <div className="row mb-4">
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="🔍 Search by Description or Material No"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <select
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="Raw Material">Raw Material</option>
            <option value="Consumable">Consumable</option>
            <option value="Hardware">Hardware</option>
          </select>
        </div>
      </div>

      {/* Stock Table */}
      <div className="table-responsive">
        <table className="table table-bordered table-hover table-sm align-middle">
          <thead className="table-primary text-center">
            <tr>
              <th>#</th>
              <th>Material No</th>
              <th>Description</th>
              <th>Category</th>
              <th>UOM</th>
              <th>Quantity</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center">No stock found.</td>
              </tr>
            ) : (
              filtered.map((item, i) => (
                <tr key={i}>
                  <td className="text-center">{i + 1}</td>
                  <td>{item.matno}</td>
                  <td>{item.matdesc}</td>
                  <td>{item.category}</td>
                  <td className="text-center">{item.uom}</td>
                  <td className="text-end">{item.quantity}</td>
                  <td className="text-center">
                    <span
                      className={`badge ${
                        item.status === "In Stock" ? "bg-success" :
                        item.status === "Low Stock" ? "bg-warning text-dark" :
                        "bg-danger"
                      }`}
                    >
                      {item.status}
                    </span>
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

export default StockListERP;
