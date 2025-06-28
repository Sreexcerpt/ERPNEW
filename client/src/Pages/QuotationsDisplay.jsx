import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import Select from 'react-select';
const PAGE_SIZE = 10; // You can adjust this value
function QuotationsDisplay() {
  const [quotations, setQuotations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingQuotation, setEditingQuotation] = useState(null);
  const [vendors, setVendors] = useState([]);
  const [categories, setCategories] = useState([]);

  // Fetch all quotations
  useEffect(() => {
    fetchQuotations();
    fetchVendors();
    fetchCategories();
  }, []);

  const fetchQuotations = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8080/api/quotations/get');
      setQuotations(response.data);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch quotations:', err);
      setError('Failed to load quotations. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fetchVendors = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/vendors');
      const options = response.data.map((vendor) => ({
        label: `${vendor.name1} ${vendor.name2}`,
        value: vendor._id
      }));
      setVendors(options);
    } catch (err) {
      console.error('Failed to fetch vendors:', err);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/rfq-categories');
      setCategories(
        response.data.map((cat) => ({
          label: `${cat.categoryName} (${cat.prefix})`,
          value: cat._id
        }))
      );
    } catch (err) {
      console.error('Failed to fetch categories:', err);
    }
  };

  const handleEdit = async (quotationId) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/quotations/${quotationId}`);
      setEditingQuotation(response.data);
    } catch (err) {
      console.error('Failed to fetch quotation details:', err);
      alert('Failed to load quotation details');
    }
  };

  const handleSaveEdit = async () => {
    try {
      await axios.put(`http://localhost:8080/api/quotations/${editingQuotation._id}`, editingQuotation);
      alert('Quotation updated successfully!');
      setEditingQuotation(null);
      fetchQuotations(); // Refresh the list
    } catch (err) {
      console.error('Failed to update quotation:', err);
      alert('Failed to update quotation');
    }
  };

  const handleCancelEdit = () => {
    setEditingQuotation(null);
  };

  const handleEditChange = (field, value) => {
    setEditingQuotation(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleItemEditChange = (index, field, value) => {
    const updatedItems = [...editingQuotation.items];
    updatedItems[index][field] = value;
    setEditingQuotation(prev => ({
      ...prev,
      items: updatedItems
    }));
  };

  const handlePrint = (quotation) => {
    const printContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Quotation - ${quotation._id}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          .header { text-align: center; margin-bottom: 30px; }
          .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px; }
          .info-item { margin-bottom: 10px; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #f5f5f5; }
          .total-row { background-color: #f0f0f0; font-weight: bold; }
          .print-date { text-align: right; margin-top: 30px; font-size: 12px; }
          @media print {
            body { margin: 0; }
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>QUOTATION</h1>
          <h3>Quotation ID: ${quotation._id}</h3>
        </div>
        
        <div class="info-grid">
          <div>
            <div class="info-item"><strong>Indent ID:</strong> ${quotation.indentId}</div>
            <div class="info-item"><strong>Category ID:</strong> ${quotation.categoryId}</div>
            <div class="info-item"><strong>RFQ Category:</strong> ${quotation.rfqCategoryId}</div>
          </div>
          <div>
            <div class="info-item"><strong>Vendor:</strong> ${quotation.vendorName}</div>
            <div class="info-item"><strong>Date:</strong> ${new Date(quotation.createdAt).toLocaleDateString()}</div>
          </div>
        </div>
        
        ${quotation.note ? `<div class="info-item"><strong>Note:</strong> ${quotation.note}</div>` : ''}
        
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Material ID</th>
              <th>Description</th>
              <th>Quantity</th>
              <th>Unit</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            ${quotation.items.map((item, index) => `
              <tr>
                <td>${index + 1}</td>
                <td>${item.materialId}</td>
                <td>${item.description}</td>
                <td>${item.qty}</td>
                <td>${item.unit || item.baseUnit}</td>
                <td>₹${item.price ? parseFloat(item.price).toFixed(2) : '0.00'}</td>
                <td>₹${item.price && item.qty ? (parseFloat(item.price) * parseFloat(item.qty)).toFixed(2) : '0.00'}</td>
              </tr>
            `).join('')}
          </tbody>
          <tfoot>
            <tr class="total-row">
              <td colspan="6" style="text-align: right;"><strong>Grand Total:</strong></td>
              <td><strong>₹${quotation.items.reduce((total, item) => {
      const itemTotal = item.price && item.qty ? parseFloat(item.price) * parseFloat(item.qty) : 0;
      return total + itemTotal;
    }, 0).toFixed(2)}</strong></td>
            </tr>
          </tfoot>
        </table>
        
        <div class="print-date">
          Printed on: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}
        </div>
      </body>
      </html>
    `;

    const printWindow = window.open('', '_blank');
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Filter by search term
  const filteredQuotations = useMemo(() => {
    if (!searchTerm) return quotations;
    return quotations.filter((quotation) =>
      [
        quotation.quotationNumber,
        quotation.indentId,
        quotation.vendorName,
        quotation.vnNo,
        quotation.note,
      ]
        .join(' ')
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, quotations]);

  // Pagination
  const totalPages = Math.ceil(filteredQuotations.length / PAGE_SIZE);
  const paginatedQuotations = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredQuotations.slice(start, start + PAGE_SIZE);
  }, [filteredQuotations, currentPage]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  const goToPage = (n) => {
    if (n < 1 || n > totalPages) return;
    setCurrentPage(n);
  };
  if (loading) {
    return (
      <div class="d-flex justify-content-center">
        <div class="spinner-border" role="status"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '20px', marginLeft: '300px' }}>
        <h2>Quotations</h2>
        <div style={{ color: 'red', marginBottom: '20px' }}>{error}</div>
        <button onClick={fetchQuotations} style={{ padding: '10px 20px' }}>Retry</button>
      </div>
    );
  }

  // Edit Modal
  if (editingQuotation) {
    return (
      <div style={{ padding: '20px', marginLeft: '300px', marginBottom: '50px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2>Edit Quotation - {editingQuotation._id}</h2>
          <div>
            <button onClick={handleSaveEdit} style={{ padding: '8px 16px', marginRight: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px' }}>
              Save Changes
            </button>
            <button onClick={handleCancelEdit} style={{ padding: '8px 16px', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '4px' }}>
              Cancel
            </button>
          </div>
        </div>

        <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '20px', backgroundColor: '#f9f9f9' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '20px' }}>
            <div>
              <label><strong>RFQ Category:</strong></label>
              <Select
                options={categories}
                value={categories.find(cat => cat.value === editingQuotation.rfqCategoryId)}
                onChange={(selected) => handleEditChange('rfqCategoryId', selected?.value)}
                placeholder="Select Category"
              />
            </div>
            <div>
              <label><strong>Vendor:</strong></label>
              <Select
                options={vendors}
                value={vendors.find(v => v.value === editingQuotation.vendor)}
                onChange={(selected) => {
                  handleEditChange('vendor', selected?.value);
                  handleEditChange('vendorName', selected?.label);
                }}
                placeholder="Select Vendor"
              />
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label><strong>Note:</strong></label>
            <textarea
              value={editingQuotation.note || ''}
              onChange={(e) => handleEditChange('note', e.target.value)}
              rows={3}
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              placeholder="Add any notes (optional)"
            />
          </div>

          <h4>Items</h4>
          <div style={{ overflowX: 'auto' }}>
            <table border="1" cellPadding="8" style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead style={{ backgroundColor: '#f5f5f5' }}>
                <tr>
                  <th>#</th>
                  <th>Material ID</th>
                  <th>Description</th>
                  <th>Quantity</th>
                  <th>Base Unit</th>
                  <th>MaterialGroup</th>
                  <th>
                    BuyerGroup</th>
                  <th>DeliveryDate</th>
                  <th>ValidityDate</th>

                  <th>Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {editingQuotation.items.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.materialId}</td>
                    <td>{item.description}</td>
                    <td>{item.qty}</td>
                    <td>{item.baseUnit}</td>
                    <td>{item.materialgroup}</td>
                    <td>{item.buyerGroup}</td>
                    <td>{item.
                      deliveryDate}</td>
                    <td>{item.validityDate}</td>
                    <td>
                      <input
                        type="number"
                        value={item.price || ''}
                        onChange={(e) => handleItemEditChange(index, 'price', e.target.value)}
                        style={{ width: '100px', padding: '4px' }}
                        step="0.01"
                      />
                    </td>
                    <td>
                      ₹{item.price && item.qty ? (parseFloat(item.price) * parseFloat(item.qty)).toFixed(2) : '0.00'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='content'>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h6>All Quotations</h6>
        <div style={{ marginBottom: 10 }}>
          <input
            type="text"
            placeholder="Search quotations..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="form-control"
            style={{ width: 300, display: 'inline-block' }}
          />
        </div>
        <button onClick={fetchQuotations} className='btn btn-sm btn-soft-primary'>Refresh</button>
      </div>


      <div class="table-responsive">
        <table class="table table-nowrap datatable dataTable no-footer" id="DataTables_Table_0" aria-describedby="DataTables_Table_0_info" >
          <thead>
            <tr>
              <th>#</th>
              <th>Quotation ID</th>
              <th>Indent ID</th>
              {/* <th>Category ID</th>
                <th>RFQ Category</th> */}
              <th>Vendor</th>
              <th>Vendor NO</th>
              <th>Validity Date</th>
              <th>Created</th>
              <th>Note</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedQuotations.map((quotation, index) => (
              <tr key={quotation._id || index}>
                <td>{index + 1}</td>
                <td>{quotation.quotationNumber}</td>
                <td>{quotation.indentId}</td>
                {/* <td>{quotation.categoryId}</td>
                  <td>{quotation.rfqCategoryId}</td> */}
                <td>{quotation.vendorName}</td>
                <td>{quotation.vnNo || "-"}</td>
                <td>{quotation.validityDate}</td>
                <td>{new Date(quotation.createdAt).toLocaleDateString()}</td>
                <td>{quotation.note || '-'}</td>
                <td>
                  <button
                    onClick={() => handlePrint(quotation)}
                    className='btn btn-sm btn-warning'
                  >
                    Print
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="d-flex justify-content-center mt-2">
        <nav>
          <ul className="pagination pagination-sm mb-0">
            <li className={`page-item${currentPage === 1 ? ' disabled' : ''}`}>
              <button className="page-link" onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
          <i class="bi bi-chevron-double-left"></i>
              </button>
            </li>
            {/* Page Numbers */}
            {(() => {
              const pageButtons = [];
              const totalToShow = 7; // first 2, last 2, and 3 around current
              let startPages = [1, 2];
              let endPages = [totalPages - 1, totalPages].filter(n => n > 2);
              let middlePages = [];

              if (currentPage <= 4) {
                // Show first 5 pages
                startPages = [1, 2, 3, 4, 5].filter(n => n <= totalPages);
                endPages = [totalPages - 1, totalPages].filter(n => n > 5);
              } else if (currentPage >= totalPages - 3) {
                // Show last 5 pages
                startPages = [1, 2].filter(n => n < totalPages - 4);
                endPages = [totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages]
                  .filter(n => n > 2 && n <= totalPages);
              } else {
                // Middle window
                startPages = [1, 2];
                middlePages = [currentPage - 1, currentPage, currentPage + 1];
                endPages = [totalPages - 1, totalPages];
              }

              // Helper to render a set of page numbers
              const renderPages = (pages) =>
                pages.map((n) => (
                  <li key={n} className={`page-item${currentPage === n ? ' active' : ''}`}>
                    <button className="page-link" onClick={() => goToPage(n)}>
                      {n}
                    </button>
                  </li>
                ));

              // Render first pages
              pageButtons.push(...renderPages(startPages));

              // Ellipsis if needed before middle
              if (
                (middlePages.length > 0 && middlePages[0] > startPages[startPages.length - 1] + 1) ||
                (middlePages.length === 0 && endPages[0] > startPages[startPages.length - 1] + 1)
              ) {
                pageButtons.push(
                  <li key="start-ellipsis" className="page-item disabled">
                    <span className="page-link">…</span>
                  </li>
                );
              }

              // Render middle pages
              pageButtons.push(...renderPages(middlePages));

              // Ellipsis if needed before end
              if (
                endPages.length > 0 &&
                ((middlePages.length > 0 && endPages[0] > middlePages[middlePages.length - 1] + 1) ||
                  (middlePages.length === 0 && endPages[0] > startPages[startPages.length - 1] + 1))
              ) {
                pageButtons.push(
                  <li key="end-ellipsis" className="page-item disabled">
                    <span className="page-link">…</span>
                  </li>
                );
              }

              // Render end pages
              pageButtons.push(...renderPages(endPages));

              return pageButtons;
            })()}
            <li className={`page-item${currentPage === totalPages ? ' disabled' : ''}`}>
              <button className="page-link" onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
               <i class="bi bi-chevron-double-right"></i>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default QuotationsDisplay;