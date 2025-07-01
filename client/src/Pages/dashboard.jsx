import React, { useState, useEffect, useRef } from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const ERPDashboard = () => {
  const [activeNav, setActiveNav] = useState('dashboard');
  const [pulseCards, setPulseCards] = useState(false);

  const salesData = [
    { month: 'Jan', sales: 850000 },
    { month: 'Feb', sales: 920000 },
    { month: 'Mar', sales: 780000 },
    { month: 'Apr', sales: 1100000 },
    { month: 'May', sales: 1300000 },
    { month: 'Jun', sales: 1245000 }
  ];

  const revenueData = [
    { name: 'Products', value: 65, color: '#667eea' },
    { name: 'Services', value: 25, color: '#f093fb' },
    { name: 'Subscriptions', value: 10, color: '#4facfe' }
  ];

  const recentOrders = [
    { id: '#ORD-001', customer: 'Rajesh Kumar', amount: '₹15,200', status: 'completed', date: '2025-06-30' },
    { id: '#ORD-002', customer: 'Priya Sharma', amount: '₹8,750', status: 'pending', date: '2025-06-29' },
    { id: '#ORD-003', customer: 'Amit Patel', amount: '₹22,300', status: 'completed', date: '2025-06-29' },
    { id: '#ORD-004', customer: 'Sunita Verma', amount: '₹5,900', status: 'cancelled', date: '2025-06-28' },
    { id: '#ORD-005', customer: 'Vikram Singh', amount: '₹18,400', status: 'pending', date: '2025-06-28' }
  ];

  const navItems = [
    { id: 'dashboard', icon: '📊', label: 'Dashboard' },
    { id: 'sales', icon: '🛒', label: 'Sales' },
    { id: 'inventory', icon: '📦', label: 'Inventory' },
    { id: 'customers', icon: '👥', label: 'Customers' },
    { id: 'finance', icon: '💰', label: 'Finance' },
    { id: 'reports', icon: '📈', label: 'Reports' },
    { id: 'settings', icon: '⚙️', label: 'Settings' }
  ];

  useEffect(() => {
    setTimeout(() => {
      setPulseCards(true);
      setTimeout(() => setPulseCards(false), 2000);
    }, 500);
  }, []);

  const StatCard = ({ title, value, change, type, children }) => (
    <div className={`stat-card ${type} ${pulseCards ? 'pulse' : ''}`}>
      <div className="stat-value">{value}</div>
      <div className="stat-label">{title}</div>
      <div className={`stat-change ${change.includes('+') ? 'positive' : 'negative'}`}>
        {change.includes('+') ? '↗' : '↘'} {change}
      </div>
    </div>
  );

  const StatusBadge = ({ status }) => (
    <span className={`status-badge status-${status}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );

  const formatYAxisTick = (value) => `₹${(value / 100000)}L`;

  return (
    <>
      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

       

        .dashboard-container {
          display: flex;
          min-height: 100vh;
        }

       
        .welcome-text {
          color: white;
          font-size: 2rem;
          font-weight: 300;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }

        .user-profile {
          display: flex;
          align-items: center;
          background: rgba(255, 255, 255, 0.2);
          padding: 0.5rem 1rem;
          border-radius: 50px;
          backdrop-filter: blur(10px);
        }

        .avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: linear-gradient(45deg, #ff6b6b, #ffd93d);
          margin-right: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .stat-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          padding: 2rem;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .stat-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: var(--accent-color);
        }

        .stat-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
        }

        .stat-card.revenue::before { --accent-color: linear-gradient(90deg, #667eea, #764ba2); }
        .stat-card.orders::before { --accent-color: linear-gradient(90deg, #f093fb, #f5576c); }
        .stat-card.customers::before { --accent-color: linear-gradient(90deg, #4facfe, #00f2fe); }
        .stat-card.products::before { --accent-color: linear-gradient(90deg, #43e97b, #38f9d7); }

        .stat-value {
          font-size: 2.5rem;
          font-weight: bold;
          color: #333;
          margin-bottom: 0.5rem;
        }

        .stat-label {
          color: #666;
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .stat-change {
          margin-top: 1rem;
          font-size: 0.85rem;
          display: flex;
          align-items: center;
        }

        .stat-change.positive { color: #10b981; }
        .stat-change.negative { color: #ef4444; }

        .charts-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 2rem;
          margin-bottom: 2rem;
        }

        .chart-container {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          padding: 2rem;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .chart-title {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 1.5rem;
          color: #333;
        }

        .table-container {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border-radius: 20px;
          padding: 2rem;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .table {
          width: 100%;
          border-collapse: collapse;
        }

        .table th,
        .table td {
          padding: 1rem;
          text-align: left;
          border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        }

        .table th {
          background: rgba(102, 126, 234, 0.1);
          font-weight: 600;
          color: #667eea;
        }

        .table tr:hover {
          background: rgba(102, 126, 234, 0.05);
        }

        .status-badge {
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 500;
        }

        .status-completed { background: #d1fae5; color: #065f46; }
        .status-pending { background: #fef3c7; color: #92400e; }
        .status-cancelled { background: #fee2e2; color: #991b1b; }

        .pulse {
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }

        @media (max-width: 768px) {
          .dashboard-container {
            flex-direction: column;
          }
          
          .sidebar {
            width: 100%;
            height: auto;
          }
          
          .charts-grid {
            grid-template-columns: 1fr;
          }
          
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>

      <div  className="content">
          

          <div className="stats-grid">
            <StatCard 
              title="Total Revenue" 
              value="₹12,45,000" 
              change="+12.5% from last month" 
              type="revenue" 
            />
            <StatCard 
              title="Orders" 
              value="1,234" 
              change="+8.2% from last month" 
              type="orders" 
            />
            <StatCard 
              title="Active Customers" 
              value="856" 
              change="+15.3% from last month" 
              type="customers" 
            />
            <StatCard 
              title="Products" 
              value="342" 
              change="-2.1% from last month" 
              type="products" 
            />
          </div>

          <div className="charts-grid">
            <div className="chart-container">
              <h3 className="chart-title">Sales Overview</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={salesData}>
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={formatYAxisTick} />
                  <Line 
                    type="monotone" 
                    dataKey="sales" 
                    stroke="#667eea" 
                    strokeWidth={3}
                    dot={{ fill: '#667eea', strokeWidth: 2, r: 6 }}
                    activeDot={{ r: 8, stroke: '#667eea', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div className="chart-container">
              <h3 className="chart-title">Revenue Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={revenueData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    dataKey="value"
                  >
                    {revenueData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div style={{textAlign: 'center', marginTop: '1rem'}}>
                {revenueData.map((item, index) => (
                  <div key={index} style={{display: 'inline-block', margin: '0 1rem', fontSize: '0.9rem'}}>
                    <span style={{color: item.color}}>●</span> {item.name}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="table-container">
            <h3 className="chart-title">Recent Orders</h3>
            <table className="table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order, index) => (
                  <tr key={index}>
                    <td>{order.id}</td>
                    <td>{order.customer}</td>
                    <td>{order.amount}</td>
                    <td><StatusBadge status={order.status} /></td>
                    <td>{order.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
       
      </div>
    </>
  );
};

export default ERPDashboard;