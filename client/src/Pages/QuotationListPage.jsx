import React, { useEffect, useState } from 'react';
import axios from 'axios';

function QuotationListPage() {
  const [quotations, setQuotations] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/salesquotations')
      .then(res => setQuotations(res.data))
      .catch(err => {
        console.error('Failed to fetch quotations', err);
        alert('Error loading quotations');
      });
  }, []);

  const handlePrint = (quotation) => {
    const printWindow = window.open('', '_blank');
    const html = `
      <html>
        <head>
          <title>Print Quotation</title>
          <style>
            body { font-family: Arial; padding: 20px; }
            h2 { margin-bottom: 5px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #000; padding: 6px; text-align: left; }
          </style>
        </head>
        <body>
          <h2>Quotation: ${quotation.quotationNumber}</h2>
          <p><strong>Indent ID:</strong> ${quotation.indentId}</p>
          <p><strong>Customer Name:</strong> ${quotation.customerName}</p>
          <p><strong>Validity Date:</strong> ${quotation.validityDate}</p>
          <p><strong>Note:</strong> ${quotation.note}</p>
          <table>
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
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              ${
                quotation.items.map((item, idx) => {
                  const total = item.qty * parseFloat(item.price || 0);
                  return `
                    <tr>
                      <td>${idx + 1}</td>
                      <td>${item.materialId}</td>
                      <td>${item.description}</td>
                      <td>${item.qty}</td>
                      <td>${item.baseUnit}</td>
                      <td>${item.orderUnit}</td>
                      <td>${item.location}</td>
                      <td>${item.unit}</td>
                      <td>${item.price}</td>
                      <td>${total.toFixed(2)}</td>
                    </tr>
                  `;
                }).join('')
              }
              <tr>
                <td colspan="9" style="text-align:right;"><strong>Grand Total</strong></td>
                <td><strong>${
                  quotation.items.reduce((acc, item) => acc + (item.qty * parseFloat(item.price || 0)), 0).toFixed(2)
                }</strong></td>
              </tr>
            </tbody>
          </table>
        </body>
      </html>
    `;
    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.print();
  };

return (
  <div className="content">
    <h2>Saved Sales Quotations</h2>
    {quotations.length === 0 ? (
      <p>No quotations available.</p>
    ) : (
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Quotation No</th>
            <th>Indent ID</th>
            <th>Customer Name</th>
            <th>Validity Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {quotations.map((quotation, index) => {
            return (
              <tr key={index}>
                <td>{quotation.quotationNumber}</td>
                <td>{quotation.indentId}</td>
                <td>{quotation.customerName}</td>
                <td>{quotation.validityDate}</td>
                <td>
                  <button className='btn btn-sm btn-soft-primary' onClick={() => handlePrint(quotation)}>
                    Print Quotation
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    )}
  </div>
);

}

export default QuotationListPage;
{/* <table className='table table-bordered table-sm'>
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
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {quotation.items.map((item, idx) => {
                    const total = item.qty * parseFloat(item.price || 0);
                    return (
                      <tr key={idx}>
                        <td>{idx + 1}</td>
                        <td>{item.materialId}</td>
                        <td>{item.description}</td>
                        <td>{item.qty}</td>
                        <td>{item.baseUnit}</td>
                        <td>{item.orderUnit}</td>
                        <td>{item.location}</td>
                        <td>{item.unit}</td>
                        <td>{item.price}</td>
                        <td>{total.toFixed(2)}</td>
                      </tr>
                    );
                  })}
                  <tr>
                    <td colSpan="9" style={{ textAlign: 'right' }}><strong>Grand Total</strong></td>
                    <td><strong>{grandTotal.toFixed(2)}</strong></td>
                  </tr>
                </tbody>
              </table> */}