import React, { useEffect, useState } from 'react';
import axios from 'axios';

function PurchaseOrderDisplay() {
  const [pos, setPos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/purchase-orders')
      .then(res => setPos(res.data))
      .catch(err => {
        console.error('Error fetching POs:', err);
        alert('Failed to fetch POs');
      });
  }, []);

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
      <h2>Purchase Order Display</h2>
      
      <table className='table table-sm table-bordered'>
        <thead>
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
          {pos.map((po) => (
            <tr key={po._id} >
              <td>{po.poNumber}</td>
              <td>{po.date}</td>
              <td>{po.vendor}</td>
              <td>{po.category}</td>
              <td>{po.quotationNumber}</td>
              <td>{po.deliveryLocation}</td>
              <td>{po.deliveryAddress}</td>
              <td>
                <button className='btn btn-primary' onClick={() => handlePrint(po)}>🖨️ Print</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}

export default PurchaseOrderDisplay;
