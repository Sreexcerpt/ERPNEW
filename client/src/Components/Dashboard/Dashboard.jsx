import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, LineChart, Line, ResponsiveContainer } from 'recharts';
import { Package, ShoppingCart, DollarSign, TrendingUp, AlertCircle, Calendar, Users, Archive } from 'lucide-react';

const Dashboard = () => {
  const [materials, setMaterials] = useState([]);
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [salesOrders, setSalesOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock API calls - Replace with your actual API endpoints
  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Replace these URLs with your actual API endpoints
      const [materialsRes, poRes, soRes] = await Promise.all([
        fetch('http://localhost:8080/api/material'),
        fetch('http://localhost:8080/api/purchase-orders'),
        fetch('http://localhost:8080/api/sales-orders')
      ]);

      if (!materialsRes.ok || !poRes.ok || !soRes.ok) {
        throw new Error('Failed to fetch data');
      }

      const materialsData = await materialsRes.json();
      const poData = await poRes.json();
      const soData = await soRes.json();

      setMaterials(materialsData);
      setPurchaseOrders(poData);
      setSalesOrders(soData);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError(err.message);
      
      // Mock data for demo purposes
      setMaterials([
        { _id: '1', materialId: 'MAT-001', description: 'Steel Rods', categoryId: { categoryName: 'Metal', prefix: 'MAT' }, baseUnit: 'kg', orderUnit: 'tons' },
        { _id: '2', materialId: 'ELC-002', description: 'LED Bulbs', categoryId: { categoryName: 'Electrical', prefix: 'ELC' }, baseUnit: 'pcs', orderUnit: 'box' },
        { _id: '3', materialId: 'CHM-003', description: 'Industrial Paint', categoryId: { categoryName: 'Chemical', prefix: 'CHM' }, baseUnit: 'ltr', orderUnit: 'drum' },
        { _id: '4', materialId: 'MAT-004', description: 'Aluminum Sheets', categoryId: { categoryName: 'Metal', prefix: 'MAT' }, baseUnit: 'kg', orderUnit: 'tons' },
        { _id: '5', materialId: 'ELC-005', description: 'Copper Wire', categoryId: { categoryName: 'Electrical', prefix: 'ELC' }, baseUnit: 'm', orderUnit: 'roll' }
      ]);

      setPurchaseOrders([
        { _id: '1', poNumber: 'PO-000001', vendor: 'Steel Corp Ltd', total: 150000, finalTotal: 177000, date: '2024-01-15', items: [{ quantity: 100, price: 1500 }] },
        { _id: '2', poNumber: 'PO-000002', vendor: 'Electric Solutions', total: 75000, finalTotal: 88500, date: '2024-01-20', items: [{ quantity: 50, price: 1500 }] },
        { _id: '3', poNumber: 'PO-000003', vendor: 'Chemical Industries', total: 200000, finalTotal: 236000, date: '2024-01-25', items: [{ quantity: 80, price: 2500 }] },
        { _id: '4', poNumber: 'PO-000004', vendor: 'Metal Works Inc', total: 120000, finalTotal: 141600, date: '2024-02-01', items: [{ quantity: 60, price: 2000 }] },
        { _id: '5', poNumber: 'PO-000005', vendor: 'Power Systems', total: 95000, finalTotal: 112100, date: '2024-02-05', items: [{ quantity: 40, price: 2375 }] }
      ]);

      setSalesOrders([
        { _id: '1', soNumber: 'SO-000001', customerName: 'ABC Manufacturing', total: 180000, date: '2024-01-16', items: [{ quantity: 120, price: 1500 }] },
        { _id: '2', soNumber: 'SO-000002', customerName: 'XYZ Industries', total: 95000, date: '2024-01-22', items: [{ quantity: 60, price: 1583 }] },
        { _id: '3', soNumber: 'SO-000003', customerName: 'Tech Solutions', total: 250000, date: '2024-01-28', items: [{ quantity: 100, price: 2500 }] },
        { _id: '4', soNumber: 'SO-000004', customerName: 'Global Corp', total: 145000, date: '2024-02-03', items: [{ quantity: 80, price: 1813 }] },
        { _id: '5', soNumber: 'SO-000005', customerName: 'Future Systems', total: 115000, date: '2024-02-08', items: [{ quantity: 50, price: 2300 }] }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Calculate analytics
  const totalMaterials = materials.length;
  const totalPurchaseValue = purchaseOrders.reduce((sum, po) => sum + (po.finalTotal || po.total), 0);
  const totalSalesValue = salesOrders.reduce((sum, so) => sum + so.total, 0);
  const totalOrders = purchaseOrders.length + salesOrders.length;

  // Material category distribution
  const materialCategories = materials.reduce((acc, material) => {
    const category = material.categoryId?.categoryName || 'Unknown';
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});

  const categoryChartData = Object.entries(materialCategories).map(([name, value]) => ({
    name,
    value,
    percentage: ((value / totalMaterials) * 100).toFixed(1)
  }));

  // Monthly trends
  const monthlyData = [
    { month: 'Jan', purchases: 640000, sales: 785000 },
    { month: 'Feb', purchases: 255000, sales: 255000 },
    { month: 'Mar', purchases: 0, sales: 0 },
    { month: 'Apr', purchases: 0, sales: 0 },
    { month: 'May', purchases: 0, sales: 0 },
    { month: 'Jun', purchases: 0, sales: 0 }
  ];

  // Top vendors and customers
  const vendorData = purchaseOrders.reduce((acc, po) => {
    const vendor = po.vendor || 'Unknown';
    acc[vendor] = (acc[vendor] || 0) + (po.finalTotal || po.total);
    return acc;
  }, {});

  const topVendors = Object.entries(vendorData)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5)
    .map(([vendor, amount]) => ({ vendor, amount }));

  const customerData = salesOrders.reduce((acc, so) => {
    const customer = so.customerName || 'Unknown';
    acc[customer] = (acc[customer] || 0) + so.total;
    return acc;
  }, {});

  const topCustomers = Object.entries(customerData)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5)
    .map(([customer, amount]) => ({ customer, amount }));

  const COLORS = ['#007bff', '#28a745', '#ffc107', '#dc3545', '#6f42c1', '#17a2b8'];

  if (loading) {
    return (
      <div className="min-vh-100 bg-light d-flex align-items-center justify-content-center">
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="text-muted">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Bootstrap CSS */}
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM"
        crossOrigin="anonymous"
      />
      
      <div className="min-vh-100 bg-light">
        <div className="container-fluid p-4">
          {/* Header */}
          <div className="row mb-4">
            <div className="col-12">
              <h1 className="display-4 fw-bold text-dark mb-2">ERP Dashboard</h1>
              <p className="text-muted fs-5">Materials, Purchase Orders & Sales Orders Analytics</p>
              {error && (
                <div className="alert alert-warning d-flex align-items-center mt-3" role="alert">
                  <AlertCircle className="me-2" size={20} />
                  <div>
                    <strong>Demo Mode:</strong> Using sample data. Check your API endpoints: {error}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Key Metrics */}
          <div className="row mb-4">
            <div className="col-lg-3 col-md-6 mb-3">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <p className="card-text text-muted small fw-medium mb-1">Total Materials</p>
                      <h3 className="card-title fw-bold text-dark mb-0">{totalMaterials}</h3>
                    </div>
                    <div className="bg-primary bg-opacity-10 p-3 rounded-circle">
                      <Package className="text-primary" size={24} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 mb-3">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <p className="card-text text-muted small fw-medium mb-1">Purchase Value</p>
                      <h3 className="card-title fw-bold text-dark mb-0">₹{(totalPurchaseValue / 100000).toFixed(1)}L</h3>
                    </div>
                    <div className="bg-success bg-opacity-10 p-3 rounded-circle">
                      <ShoppingCart className="text-success" size={24} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 mb-3">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <p className="card-text text-muted small fw-medium mb-1">Sales Value</p>
                      <h3 className="card-title fw-bold text-dark mb-0">₹{(totalSalesValue / 100000).toFixed(1)}L</h3>
                    </div>
                    <div className="bg-info bg-opacity-10 p-3 rounded-circle">
                      <DollarSign className="text-info" size={24} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 mb-3">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <p className="card-text text-muted small fw-medium mb-1">Total Orders</p>
                      <h3 className="card-title fw-bold text-dark mb-0">{totalOrders}</h3>
                    </div>
                    <div className="bg-warning bg-opacity-10 p-3 rounded-circle">
                      <TrendingUp className="text-warning" size={24} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Charts Row */}
          <div className="row mb-4">
            {/* Material Categories */}
            <div className="col-lg-6 mb-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-header bg-white border-0">
                  <h5 className="card-title fw-bold mb-0">Material Categories</h5>
                </div>
                <div className="card-body">
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={categoryChartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percentage }) => `${name} (${percentage}%)`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {categoryChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Monthly Trends */}
            <div className="col-lg-6 mb-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-header bg-white border-0">
                  <h5 className="card-title fw-bold mb-0">Monthly Trends</h5>
                </div>
                <div className="card-body">
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value) => `₹${(value / 100000).toFixed(1)}L`} />
                      <Legend />
                      <Line type="monotone" dataKey="purchases" stroke="#007bff" strokeWidth={2} name="Purchases" />
                      <Line type="monotone" dataKey="sales" stroke="#28a745" strokeWidth={2} name="Sales" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>

          {/* Top Vendors and Customers */}
          {/* <div className="row mb-4">
     
            <div className="col-lg-6 mb-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-header bg-white border-0">
                  <h5 className="card-title fw-bold mb-0">Top Vendors</h5>
                </div>
                <div className="card-body">
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={topVendors} layout="horizontal">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="vendor" type="category" width={100} />
                      <Tooltip formatter={(value) => `₹${(value / 100000).toFixed(1)}L`} />
                      <Bar dataKey="amount" fill="#007bff" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

          
            <div className="col-lg-6 mb-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-header bg-white border-0">
                  <h5 className="card-title fw-bold mb-0">Top Customers</h5>
                </div>
                <div className="card-body">
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={topCustomers} layout="horizontal">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="customer" type="category" width={100} />
                      <Tooltip formatter={(value) => `₹${(value / 100000).toFixed(1)}L`} />
                      <Bar dataKey="amount" fill="#28a745" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div> */}

          {/* Recent Activities */}
          <div className="row">
            {/* Recent Materials */}
            <div className="col-lg-4 mb-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-header bg-white border-0">
                  <h5 className="card-title fw-bold mb-0">Recent Materials</h5>
                </div>
                <div className="card-body">
                  <div className="d-flex flex-column gap-3">
                    {materials.slice(0, 5).map((material) => (
                      <div key={material._id} className="d-flex justify-content-between align-items-center p-3 bg-light rounded">
                        <div>
                          <h6 className="fw-bold mb-1">{material.materialId}</h6>
                          <p className="text-muted small mb-0">{material.description}</p>
                        </div>
                        <span className="badge bg-primary">
                          {material.categoryId?.categoryName || 'N/A'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Purchase Orders */}
            <div className="col-lg-4 mb-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-header bg-white border-0">
                  <h5 className="card-title fw-bold mb-0">Recent Purchase Orders</h5>
                </div>
                <div className="card-body">
                  <div className="d-flex flex-column gap-3">
                    {purchaseOrders.slice(0, 5).map((po) => (
                      <div key={po._id} className="d-flex justify-content-between align-items-center p-3 bg-light rounded">
                        <div>
                          <h6 className="fw-bold mb-1">{po.poNumber}</h6>
                          <p className="text-muted small mb-0">{po.vendor}</p>
                        </div>
                        <span className="badge bg-success">
                          ₹{((po.finalTotal || po.total) / 1000).toFixed(0)}K
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Sales Orders */}
            <div className="col-lg-4 mb-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-header bg-white border-0">
                  <h5 className="card-title fw-bold mb-0">Recent Sales Orders</h5>
                </div>
                <div className="card-body">
                  <div className="d-flex flex-column gap-3">
                    {salesOrders.slice(0, 5).map((so) => (
                      <div key={so._id} className="d-flex justify-content-between align-items-center p-3 bg-light rounded">
                        <div>
                          <h6 className="fw-bold mb-1">{so.soNumber}</h6>
                          <p className="text-muted small mb-0">{so.customerName}</p>
                        </div>
                        <span className="badge bg-info">
                          ₹{(so.total / 1000).toFixed(0)}K
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;