import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';

function SalesQuotationForm() {
  const [salesRequests, setSalesRequests] = useState([]);
  const [quotationCategories, setQuotationCategories] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [savedQuotations, setSavedQuotations] = useState([]);

  const [selectedRequest, setSelectedRequest] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [note, setNote] = useState('');
  const [validityDate, setValidityDate] = useState('');
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/salerequest/get')
      .then(res => setSalesRequests(res.data))
      .catch(console.error);

    axios.get('http://localhost:8080/api/sale-quotation-categories')
      .then(res => setQuotationCategories(res.data))
      .catch(console.error);

    axios.get('http://localhost:8080/api/customers')
      .then(res => {
        const options = res.data.map(c => ({
          label: `${c.name1} ${c.name2}`.trim(),
          value: c._id
        }));
        setCustomers(options);
      })
      .catch(console.error);

    fetchSavedQuotations();
  }, []);

  const fetchSavedQuotations = () => {
    axios.get('http://localhost:8080/api/salesquotations')
      .then(res => setSavedQuotations(res.data))
      .catch(console.error);
  };

  const handleRequestChange = (option) => {
    setSelectedRequest(option);
    const request = salesRequests.find(req => req._id === option.value);
    if (request) {
      setItems(request.items.map(item => ({
        ...item,
        customerName: selectedCustomer?.label || '', // Add customer name if selected
        price: '',
        unit: ''
      })));
    }
  };

  const handleCustomerChange = (option) => {
    setSelectedCustomer(option);
    // Auto-fill customerName into existing rows
    setItems(prevItems =>
      prevItems.map(item => ({
        ...item,
        customerName: option.label
      }))
    );
  };

  const updateItemField = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
  };

  const handlePrint = (quotation) => {
    const printWindow = window.open('', '_blank');
    const htmlContent = `
      <html>
        <head><title>Print Quotation</title></head>
        <body>
          <h2>Quotation Number: ${quotation.quotationNumber}</h2>
          <p><strong>Indent ID:</strong> ${quotation.indentId}</p>
          <p><strong>Customer:</strong> ${quotation.customerName}</p>
          <p><strong>Note:</strong> ${quotation.note}</p>
          <p><strong>Validity Date:</strong> ${quotation.validityDate}</p>
          <h4>Items</h4>
          <table border="1" cellspacing="0" cellpadding="6">
            <thead>
              <tr>
                <th>#</th>
                <th>Material ID</th>
                <th>Description</th>
                <th>Qty</th>
                <th>Base Unit</th>
                <th>Order Unit</th>
                <th>Location</th>
                <th>Unit</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              ${quotation.items.map((item, i) => `
                <tr>
                  <td>${i + 1}</td>
                  <td>${item.materialId}</td>
                  <td>${item.description}</td>
                  <td>${item.qty}</td>
                  <td>${item.baseUnit}</td>
                  <td>${item.orderUnit}</td>
                  <td>${item.location}</td>
                  <td>${item.unit || ''}</td>
                  <td>${item.price || ''}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </body>
      </html>
    `;
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.print();
  };

  const addEmptyItem = () => {
    setItems(prev => [
      ...prev,
      {
        customerName: selectedCustomer?.label || '',
        materialId: '',
        description: '',
        qty: '',
        baseUnit: '',
        orderUnit: '',
        location: '',
        unit: '',
        price: ''
      }
    ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      indentId: selectedRequest?.label,
      categoryId: selectedCategory?.value,
      customerId: selectedCustomer?.value,
      note,
      validityDate,
      items
    };

    axios.post('http://localhost:8080/api/salesquotations', data)
      .then(() => {
        alert('Quotation saved successfully!');
        fetchSavedQuotations();
        resetForm();
      })
      .catch(err => {
        console.error(err);
        alert('Error saving quotation');
      });
  };

  const resetForm = () => {
    setSelectedRequest(null);
    setSelectedCategory(null);
    setSelectedCustomer(null);
    setNote('');
    setValidityDate('');
    setItems([]);
  };

  return (
    <div className='content'>
      <h2>Sales Quotation Form</h2>

      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className='col-xl-6'>
            <label>Sales Request:</label>
            <Select
              value={selectedRequest}
              options={salesRequests.map(req => ({
                label: req.indentId,
                value: req._id
              }))}
              onChange={handleRequestChange}
              className='form-control'
            />
          </div>

          <div className='col-xl-6'>
            <label>Quotation Category:</label>
            <Select
              value={selectedCategory}
              options={quotationCategories.map(cat => ({
                label: `${cat.categoryName} (${cat.prefix})`,
                value: cat._id
              }))}
              onChange={setSelectedCategory}
              className='form-control'
            />
          </div>
        </div>
        <div className="row">
          <div className='col-xl-6'>
            <label>Customer:</label>
            <Select
              value={selectedCustomer}
              options={customers}
              onChange={handleCustomerChange}
              className='form-control'
            />
          </div>

          <div className='col-xl-6'>
            <label>Note:</label><br />
            <textarea
              rows="3"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Add additional notes"
              className='form-control'
            />
          </div>

          <div className='col-xl-2'>
            <label>Validity Date:</label><br />
            <input
              type="date"
              value={validityDate}
              onChange={(e) => setValidityDate(e.target.value)}
              className='form-control'
            />
          </div>
        </div>

        {/* ✅ Always show Add Quotation Item */}
        <div className='col-xl-6 mt-2 mb-2'>
          <button type="button" className='btn btn-sm btn-outline-primary ' onClick={addEmptyItem}>
            + Add Quotation Item
          </button>
        </div>

        {items.length > 0 && (
          <div>
            <h4>Requested Items</h4>

            <div className='table-responsive'>
              <table className='table table-sm table-bordered'>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Customer Name</th>
                    <th>Material ID</th>
                    <th>Description</th>
                    <th>Qty</th>
                    <th>Base Unit</th>
                    <th>Order Unit</th>
                    <th>Location</th>
                    <th>Unit</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        <input
                          type="text"
                          value={item.customerName || ''}
                          onChange={(e) => updateItemField(index, 'customerName', e.target.value)}
                          placeholder="Enter customer name"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          value={item.materialId}
                          onChange={(e) => updateItemField(index, 'materialId', e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          value={item.description}
                          onChange={(e) => updateItemField(index, 'description', e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          value={item.qty}
                          onChange={(e) => updateItemField(index, 'qty', e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          value={item.baseUnit}
                          onChange={(e) => updateItemField(index, 'baseUnit', e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          value={item.orderUnit}
                          onChange={(e) => updateItemField(index, 'orderUnit', e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          value={item.location}
                          onChange={(e) => updateItemField(index, 'location', e.target.value)}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          value={item.unit || ''}
                          onChange={(e) => updateItemField(index, 'unit', e.target.value)}
                          placeholder="Enter unit"
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          value={item.price}
                          onChange={(e) => updateItemField(index, 'price', e.target.value)}
                          placeholder="Enter price"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <button type="submit" className='btn btn-outline-success btn-sm mt-3 mb-2'>Submit Quotation</button>
      </form>
    </div>

  );
}

export default SalesQuotationForm;



