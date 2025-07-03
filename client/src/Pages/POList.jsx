// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// function PurchaseOrderDisplay() {
//   const [pos, setPos] = useState([]);

//   useEffect(() => {
//     axios.get('http://localhost:8080/api/purchase-orders')
//       .then(res => setPos(res.data))
//       .catch(err => {
//         console.error('Error fetching POs:', err);
//         alert('Failed to fetch POs');
//       });
//   }, []);

//   const handlePrint = (po) => {
//     const itemRows = po.items.map((item, idx) => `
//       <tr>
//         <td>${idx + 1}</td>
//         <td>${item.materialId}</td>
//         <td>${item.description}</td>
//         <td>${item.quantity}</td>
//         <td>${item.baseUnit}</td>
//         <td>${item.unit}</td>
//         <td>${item.orderUnit}</td>
//         <td>${item.price}</td>
//         <td>${item.buyerGroup}</td>
//         <td>${item.materialgroup}</td>
//         <td>${item.deliveryDate}</td>
//       </tr>
//     `).join('');

//     const html = `
//       <html>
//       <head>
//         <title>Purchase Order - ${po.poNumber}</title>
//         <style>
//           body { font-family: Arial; padding: 20px; }
//           table { width: 100%; border-collapse: collapse; margin-top: 10px; }
//           th, td { border: 1px solid black; padding: 8px; text-align: left; }
//           th { background-color: #f0f0f0; }
//         </style>
//       </head>
//       <body>
//         <h2>Purchase Order Details</h2>
//         <p><strong>PO Number:</strong> ${po.poNumber}</p>
//         <p><strong>Date:</strong> ${po.date}</p>
//         <p><strong>Vendor:</strong> ${po.vendor}</p>
//         <p><strong>Category:</strong> ${po.category}</p>
//         <p><strong>Quotation Number:</strong> ${po.quotationNumber}</p>
//         <p><strong>Delivery Location:</strong> ${po.deliveryLocation}</p>
//         <p><strong>Delivery Address:</strong> ${po.deliveryAddress}</p>

//         <h3>Item Details</h3>
//         <table>
//           <thead>
//             <tr>
//               <th>#</th>
//               <th>Material ID</th>
//               <th>Description</th>
//               <th>Qty</th>
//               <th>Base Unit</th>
//               <th>Unit</th>
//               <th>Order Unit</th>
//               <th>Price</th>
//               <th>Buyer Group</th>
//               <th>Material Group</th>
//               <th>Delivery Date</th>
//             </tr>
//           </thead>
//           <tbody>
//             ${itemRows}
//           </tbody>
//         </table>

//         <h3>Tax Summary</h3>
//         <p><strong>Total:</strong> ₹${po.total}</p>
//         <p><strong>Tax Name:</strong> ${po.taxName}</p>
//         <p><strong>CGST:</strong> ${po.cgst}%</p>
//         <p><strong>SGST:</strong> ${po.sgst}%</p>
//         <p><strong>IGST:</strong> ${po.igst}%</p>
//         <p><strong>Tax Discount:</strong> ₹${po.taxDiscount}</p>
//         <p><strong>Final Total:</strong> ₹${po.finalTotal}</p>
//       </body>
//       </html>
//     `;
//     const win = window.open('', '', 'width=800,height=600');
//     win.document.write(html);
//     win.document.close();
//     win.print();
//   };

//   return (
//     <div className='content'>
//       <h2>Purchase Order Display</h2>
      
//       <table className='table table-sm table-bordered'>
//         <thead>
//           <tr>
//             <th>PO Number</th>
//             <th>Date</th>
//             <th>Vendor</th>
//             <th>Category</th>
//             <th>Quotation Number</th>
//             <th>Delivery Location</th>
//             <th>Delivery Address</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {pos.map((po) => (
//             <tr key={po._id} >
//               <td>{po.poNumber}</td>
//               <td>{po.date}</td>
//               <td>{po.vendor}</td>
//               <td>{po.category}</td>
//               <td>{po.quotationNumber}</td>
//               <td>{po.deliveryLocation}</td>
//               <td>{po.deliveryAddress}</td>
//               <td>
//                 <button className='btn btn-primary' onClick={() => handlePrint(po)}>🖨️ Print</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//     </div>
//   );
// }

// export default PurchaseOrderDisplay;
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function PurchaseOrderDisplay() {
  const [pos, setPos] = useState([]);
  const [filteredPos, setFilteredPos] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Search functionality
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [searchType, setSearchType] = useState('poNumber');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  
  useEffect(() => {
    fetchPurchaseOrders();
  }, []);

const fetchPurchaseOrders = () => {
  setLoading(true);
  axios.get('http://localhost:8080/api/purchase-orders')
    .then(res => {
      // Sort by createdAt (latest first)
      const sortedData = res.data.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      setPos(sortedData);
      setFilteredPos(sortedData);
      setLoading(false);
    })
    .catch(err => {
      console.error('Error fetching POs:', err);
      alert('Failed to fetch POs');
      setLoading(false);
    });
};


  // Search functionality
  const handleSearchInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.trim() === '') {
      setSearchResults([]);
      return;
    }

    const results = pos.filter(po => {
      switch (searchType) {
        case 'poNumber':
          return po.poNumber.toLowerCase().includes(query.toLowerCase());
        case 'vendor':
          return po.vendor.toLowerCase().includes(query.toLowerCase());
        case 'category':
          return po.category.toLowerCase().includes(query.toLowerCase());
        case 'quotationNumber':
          return po.quotationNumber.toLowerCase().includes(query.toLowerCase());
        default:
          return po.poNumber.toLowerCase().includes(query.toLowerCase());
      }
    });
    
    setSearchResults(results);
  };

  const handleViewAll = () => {
    setSearchResults(pos);
    setSearchQuery('');
  };

  const handleClearResults = () => {
    setSearchResults([]);
    setSearchQuery('');
  };

  const selectPOFromSearch = (selectedPO) => {
    setFilteredPos([selectedPO]);
    setCurrentPage(1);
    closeSearchModal();
  };

  const openSearchModal = () => {
    setShowSearchModal(true);
    setSearchResults([]);
    setSearchQuery('');
  };

  const closeSearchModal = () => {
    setShowSearchModal(false);
    setSearchResults([]);
    setSearchQuery('');
  };

  const resetFilter = () => {
    setFilteredPos(pos);
    setCurrentPage(1);
  };

  // Pagination calculations
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPos.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredPos.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handlePrint = (po) => {
    const itemRows = po.items.map((item, idx) => `
      <tr>
        <td>${idx + 1}</td>
        <td>${item.materialId}</td>
        <td>${item.description}</td>
        <td>${item.quantity}</td>
        <td>${item.baseUnit}</td>
        <td>${item.unit}</td>
        <td>${item.orderUnit}</td>
        <td>${item.price}</td>
        <td>${item.buyerGroup}</td>
        <td>${item.materialgroup}</td>
        <td>${item.deliveryDate}</td>
      </tr>
    `).join('');

    const html = `
      <html>
      <head>
        <title>Purchase Order - ${po.poNumber}</title>
        <style>
          body { font-family: Arial; padding: 20px; }
          table { width: 100%; border-collapse: collapse; margin-top: 10px; }
          th, td { border: 1px solid black; padding: 8px; text-align: left; }
          th { background-color: #f0f0f0; }
        </style>
      </head>
      <body>
        <h2>Purchase Order Details</h2>
        <p><strong>PO Number:</strong> ${po.poNumber}</p>
        <p><strong>Date:</strong> ${po.date}</p>
        <p><strong>Vendor:</strong> ${po.vendor}</p>
        <p><strong>Category:</strong> ${po.category}</p>
        <p><strong>Quotation Number:</strong> ${po.quotationNumber}</p>
        <p><strong>Delivery Location:</strong> ${po.deliveryLocation}</p>
        <p><strong>Delivery Address:</strong> ${po.deliveryAddress}</p>

        <h3>Item Details</h3>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Material ID</th>
              <th>Description</th>
              <th>Qty</th>
              <th>Base Unit</th>
              <th>Unit</th>
              <th>Order Unit</th>
              <th>Price</th>
              <th>Buyer Group</th>
              <th>Material Group</th>
              <th>Delivery Date</th>
            </tr>
          </thead>
          <tbody>
            ${itemRows}
          </tbody>
        </table>

        <h3>Tax Summary</h3>
        <p><strong>Total:</strong> ₹${po.total}</p>
        <p><strong>Tax Name:</strong> ${po.taxName}</p>
        <p><strong>CGST:</strong> ${po.cgst}%</p>
        <p><strong>SGST:</strong> ${po.sgst}%</p>
        <p><strong>IGST:</strong> ${po.igst}%</p>
        <p><strong>Tax Discount:</strong> ₹${po.taxDiscount}</p>
        <p><strong>Final Total:</strong> ₹${po.finalTotal}</p>
      </body>
      </html>
    `;
    const win = window.open('', '', 'width=800,height=600');
    win.document.write(html);
    win.document.close();
    win.print();
  };

  return (
    <div className='content'>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Purchase Order Display</h2>
        <div className="d-flex gap-2">
          <button className="btn btn-primary" onClick={openSearchModal}>
            <i className="fas fa-search me-2"></i>Search PO
          </button>
          {filteredPos.length !== pos.length && (
            <button className="btn btn-outline-secondary" onClick={resetFilter}>
              <i className="fas fa-refresh me-2"></i>Show All
            </button>
          )}
        </div>
      </div>

      {loading ? (
        <div className="text-center py-4">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          {/* Results Summary */}
          <div className="mb-3">
            <small className="text-muted">
              Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredPos.length)} of {filteredPos.length} purchase orders
              {filteredPos.length !== pos.length && (
                <span className="badge bg-info ms-2">Filtered Results</span>
              )}
            </small>
          </div>

          {/* Purchase Orders Table */}
          <div className="table-responsive">
            <table className='table table-sm table-bordered table-hover'>
              <thead className="table-light">
                <tr>
                  <th>PO Number</th>
                  <th>Date</th>
                  <th>Vendor</th>
                  <th>Category</th>
                  <th>Quotation Number</th>
                  <th>Delivery Location</th>
                  <th>Delivery Address</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.length > 0 ? (
                  currentItems.map((po) => (
                    <tr key={po._id}>
                      <td><span className="badge bg-primary">{po.poNumber}</span></td>
                      <td>{po.date}</td>
                      <td>{po.vendor}</td>
                      <td>{po.category}</td>
                      <td>{po.quotationNumber}</td>
                      <td>{po.deliveryLocation}</td>
                      <td>{po.deliveryAddress}</td>
                      <td>
                        <button className='btn btn-primary btn-sm' onClick={() => handlePrint(po)}>
                          <i className="fas fa-print me-1"></i>Print
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center py-4">
                      <i className="fas fa-inbox fa-2x text-muted mb-2"></i>
                      <p className="text-muted mb-0">No purchase orders found</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <nav aria-label="Purchase Orders pagination">
              <ul className="pagination justify-content-center">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                  <button 
                    className="page-link" 
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <i className="fas fa-chevron-left"></i>
                  </button>
                </li>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                  <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                    <button 
                      className="page-link" 
                      onClick={() => paginate(number)}
                    >
                      {number}
                    </button>
                  </li>
                ))}
                
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                  <button 
                    className="page-link" 
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    <i className="fas fa-chevron-right"></i>
                  </button>
                </li>
              </ul>
            </nav>
          )}
        </>
      )}

      {/* Search Modal */}
      {showSearchModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-xl">
            <div className="modal-content">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">
                  <i className="fas fa-search me-2"></i>Search Purchase Orders
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
                    <label className="form-label">Search By</label>
                    <select
                      className="form-select"
                      value={searchType}
                      onChange={(e) => setSearchType(e.target.value)}
                    >
                      <option value="poNumber">PO Number</option>
                      <option value="vendor">Vendor</option>
                      <option value="category">Category</option>
                      <option value="quotationNumber">Quotation Number</option>
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
                        placeholder={`Search by ${searchType === 'poNumber' ? 'PO Number' : searchType}...`}
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
                          <th>PO Number</th>
                          <th>Date</th>
                          <th>Vendor</th>
                          <th>Category</th>
                          <th>Quotation Number</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {searchResults.map((po, idx) => (
                          <tr key={idx}>
                            <td><span className="badge bg-primary">{po.poNumber}</span></td>
                            <td>{po.date}</td>
                            <td>{po.vendor}</td>
                            <td>{po.category}</td>
                            <td>{po.quotationNumber}</td>
                            <td>
                              <button
                                className="btn btn-success btn-sm"
                                onClick={() => selectPOFromSearch(po)}
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
                        {pos.length === 0
                          ? 'No purchase orders loaded from API'
                          : searchQuery
                            ? `No purchase orders found matching "${searchQuery}"`
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
  );
}

export default PurchaseOrderDisplay;