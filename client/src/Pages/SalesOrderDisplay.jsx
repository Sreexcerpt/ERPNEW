import React, { useEffect, useState } from 'react';
import axios from 'axios';

function SalesOrderDisplay() {
  const [salesOrders, setSalesOrders] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/sales-orders')
      .then(res => setSalesOrders(res.data))
      .catch(err => {
        console.error('Error fetching Sales Orders:', err);
        alert('Failed to fetch Sales Orders');
      });
  }, []);

  const handlePrint = (so) => {
    const itemRows = so.items.map((item, idx) => `
      <tr>
        <td>${idx + 1}</td>
        <td>${item.materialId}</td>
        <td>${item.description}</td>
        <td>${item.quantity}</td>
        <td>${item.baseUnit}</td>
        <td>${item.unit}</td>
        <td>${item.orderUnit}</td>
        <td>${item.price}</td>
        <td>${item.deliveryDate}</td>
      </tr>
    `).join('');

    const html = `
      <html>
      <head>
        <title>Sales Order - ${so.soNumber}</title>
        <style>
          body { font-family: Arial; padding: 20px; }
          table { width: 100%; border-collapse: collapse; margin-top: 10px; }
          th, td { border: 1px solid black; padding: 8px; text-align: left; }
          th { background-color: #f0f0f0; }
        </style>
      </head>
      <body>
        <h2>Sales Order Details</h2>
        <p><strong>SO Number:</strong> ${so.soNumber}</p>
        <p><strong>Date:</strong> ${so.date}</p>
        <p><strong>Customer:</strong> ${so.customerName}</p>
        <p><strong>Category:</strong> ${so.category}</p>
        <p><strong>Quotation Number:</strong> ${so.quotationNumber}</p>
        <p><strong>Delivery Location:</strong> ${so.deliveryLocation}</p>
        <p><strong>Delivery Address:</strong> ${so.deliveryAddress}</p>

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
              <th>Delivery Date</th>
            </tr>
          </thead>
          <tbody>
            ${itemRows}
          </tbody>
        </table>

        <h3>Tax Summary</h3>
        <p><strong>Total:</strong> ₹${so.total}</p>
        <p><strong>Tax Name:</strong> ${so.taxName}</p>
        <p><strong>CGST:</strong> ${so.cgst}%</p>
        <p><strong>SGST:</strong> ${so.sgst}%</p>
        <p><strong>IGST:</strong> ${so.igst}%</p>
        <p><strong>Tax Discount:</strong> ₹${so.taxDiscount}</p>
        <p><strong>Final Total:</strong> ₹${so.finalTotal}</p>
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
      <h6>Sales Order Display</h6>
      {/* {salesOrders.map((so) => (
        <div key={so._id} style={{ border: '1px solid gray', marginBottom: 30, padding: 15 }}>
          <h3>SO Number: {so.soNumber}</h3>
          <p><strong>Date:</strong> {so.date}</p>
          <p><strong>Customer:</strong> {so.customerName}</p>
          <p><strong>Category:</strong> {so.category}</p>
          <p><strong>Quotation Number:</strong> {so.quotationNumber}</p>
          <p><strong>Delivery Location:</strong> {so.deliveryLocation}</p>
          <p><strong>Delivery Address:</strong> {so.deliveryAddress}</p>
          <h4>Tax Summary</h4>
          <p><strong>Total:</strong> ₹{so.total}</p>
          <p><strong>Tax Name:</strong> {so.taxName}</p>
          <p><strong>CGST:</strong> {so.cgst}%</p>
          <p><strong>SGST:</strong> {so.sgst}%</p>
          <p><strong>IGST:</strong> {so.igst}%</p>
          <p><strong>Tax Discount:</strong> ₹{so.taxDiscount}</p>
          <p><strong>Final Total:</strong> ₹{so.finalTotal}</p>

          <button onClick={() => handlePrint(so)}>🖨️ Print</button>
        </div>
      ))} */}
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>SO Number</th>
            <th>Date</th>
            <th>Customer</th>
            <th>Category</th>
            <th>Quotation No</th>
            <th>Delivery Location</th>
            <th>Delivery Address</th>
            <th>Total</th>
            <th>Tax Name</th>
            <th>CGST (%)</th>
            <th>SGST (%)</th>
            <th>IGST (%)</th>
            <th>Tax Discount</th>
            <th>Final Total</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {salesOrders.map((so) => (
            <tr key={so._id}>
              <td>{so.soNumber}</td>
              <td>{so.date}</td>
              <td>{so.customerName}</td>
              <td>{so.category}</td>
              <td>{so.quotationNumber}</td>
              <td>{so.deliveryLocation}</td>
              <td>{so.deliveryAddress}</td>
              <td>₹{so.total}</td>
              <td>{so.taxName}</td>
              <td>{so.cgst}%</td>
              <td>{so.sgst}%</td>
              <td>{so.igst}%</td>
              <td>₹{so.taxDiscount}</td>
              <td>₹{so.finalTotal}</td>
              <td>
                <button className='btn btn-primary' onClick={() => handlePrint(so)}>🖨️ Print</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}

export default SalesOrderDisplay;
