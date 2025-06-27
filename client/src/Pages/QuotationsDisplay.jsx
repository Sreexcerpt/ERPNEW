import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';

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

  if (loading) {
    return (
      <div style={{ padding: '20px', marginLeft: '300px', textAlign: 'center' }}>
        <h2>Loading Quotations...</h2>
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
                    <td>{item.
                    
validityDate}</td>
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
    <div style={{ padding: '20px', marginLeft: '300px', marginBottom: '50px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>All Quotations ({quotations.length})</h2>
        <button onClick={fetchQuotations} style={{ padding: '8px 16px' }}>Refresh</button>
      </div>

      {quotations.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
          <h3>No quotations found</h3>
          <p>Create your first quotation to see it here.</p>
        </div>
      ) : (
        <div>
          {quotations.map((quotation, index) => (
            <div key={quotation._id || index} style={{ 
              border: '1px solid #ddd', 
              borderRadius: '8px', 
              padding: '20px', 
              marginBottom: '20px',
              backgroundColor: '#f9f9f9'
            }}>
              {/* Quotation Header with Action Buttons */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px', borderBottom: '2px solid #eee', paddingBottom: '10px' }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>
                    Quotation ID: {quotation.
quotationNumber}
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
                    <div><strong>Indent ID:</strong> {quotation.indentId}</div>
                    <div><strong>Category ID:</strong> {quotation.categoryId}</div>
                    <div><strong>RFQ Category:</strong> {quotation.rfqCategoryId}</div>
                    <div><strong>Vendor:</strong> {quotation.vendorName}</div>
                    <div><strong>Unit:</strong> {quotation.unit}</div>
                    <div><strong>Created:</strong> {new Date(quotation.createdAt).toLocaleDateString()}</div>
                  </div>
                  {quotation.note && (
                    <div style={{ marginTop: '10px' }}>
                      <strong>Note:</strong> {quotation.note}
                    </div>
                  )}
                </div>
                
                {/* Action Buttons */}
                <div style={{ display: 'flex', gap: '10px', marginLeft: '20px' }}>
                  <button 
                    onClick={() => handleEdit(quotation._id)}
                    style={{ 
                      padding: '8px 16px', 
                      backgroundColor: '#2196F3', 
                      color: 'white', 
                      border: 'none', 
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handlePrint(quotation)}
                    style={{ 
                      padding: '8px 16px', 
                      backgroundColor: '#FF9800', 
                      color: 'white', 
                      border: 'none', 
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    Print
                  </button>
                </div>
              </div>

              {/* Items Table */}
              <div>
                <h4 style={{ marginBottom: '10px' }}>Items ({quotation.items?.length || 0})</h4>
                {quotation.items && quotation.items.length > 0 ? (
                  <div style={{ overflowX: 'auto' }}>
                    <table border="1" cellPadding="8" style={{ width: '100%', borderCollapse: 'collapse' }}>
                      <thead style={{ backgroundColor: '#f5f5f5' }}>
                        <tr>
                          <th>#</th>
                          <th>Material ID</th>
                          <th>Description</th>
                          <th>Quantity</th>
                          <th>Base Unit</th>
                          <th>Order Unit</th>
                          <th>Location</th>
                          <th>MaterialGroup</th>
                  <th>
                  BuyerGroup</th>
                  <th>Unit</th>
                    <th>DeliveryDate</th>
                  <th>ValidityDate</th>
                          <th>Price</th>
                          <th>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {quotation.items.map((item, itemIndex) => (
                          <tr key={itemIndex}>
                            <td>{itemIndex + 1}</td>
                            <td>{item.materialId}</td>
                            <td>{item.description}</td>
                            <td>{item.qty}</td>
                            <td>{item.baseUnit}</td>
                            <td>{item.orderUnit}</td>
                            <td>{item.location}</td>
                            <td>{item.materialgroup}</td>
                    <td>{item.buyerGroup}</td>
                    <td>{item.unit}</td>
                    <td>{item.deliveryDate}</td>
                    <td>{item.validityDate}</td>
                            <td>{item.price ? `₹${parseFloat(item.price).toFixed(2)}` : '-'}</td>
                            <td>
                              {item.price && item.qty ? 
                                `₹${(parseFloat(item.price) * parseFloat(item.qty)).toFixed(2)}` : 
                                '-'
                              }
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot style={{ backgroundColor: '#f0f0f0', fontWeight: 'bold' }}>
                        <tr>
                          <td colSpan="9" style={{ textAlign: 'right' }}>Grand Total:</td>
                          <td>
                            ₹{quotation.items.reduce((total, item) => {
                              const itemTotal = item.price && item.qty ? 
                                parseFloat(item.price) * parseFloat(item.qty) : 0;
                              return total + itemTotal;
                            }, 0).toFixed(2)}
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                ) : (
                  <p style={{ color: '#666', fontStyle: 'italic' }}>No items found for this quotation.</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default QuotationsDisplay;