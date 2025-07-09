import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    companies: []
  });
  const [allCompanies, setAllCompanies] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/companies').then(res => setAllCompanies(res.data));
  }, []);

  const addCompanyField = () => {
    setFormData({
      ...formData,
      companies: [...formData.companies, { companyId: '', role: '' }]
    });
  };

  const handleCompanyChange = (index, field, value) => {
    const updated = [...formData.companies];
    updated[index][field] = value;
    setFormData({ ...formData, companies: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:8080/api/users/create', formData);
    alert('User created!');
    setFormData({ username: '', email: '', password: '', companies: [] });
  };

  return (
    <form onSubmit={handleSubmit} className="border p-4 rounded mb-4">
      <h2 className="font-bold mb-2">Create User</h2>

      <input
        type="text"
        placeholder="Username"
        className="border p-2 w-full mb-2"
        value={formData.username}
        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
        required
      />

      <input
        type="email"
        placeholder="Email"
        className="border p-2 w-full mb-2"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
      />

      <input
        type="password"
        placeholder="Password"
        className="border p-2 w-full mb-2"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        required
      />

      <button
        type="button"
        onClick={addCompanyField}
        className="bg-gray-600 text-white px-3 py-1 rounded mb-2"
      >
        + Add Company Access
      </button>

      {formData.companies.map((comp, idx) => (
        <div key={idx} className="flex gap-2 mb-2">
          <select
            className="border p-2 flex-1"
            value={comp.companyId}
            onChange={e => handleCompanyChange(idx, 'companyId', e.target.value)}
            required
          >
            <option value="">Select Company</option>
            {allCompanies.map((c) => (
              <option key={c._id} value={c._id}>{c.name}</option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Role"
            className="border p-2 flex-1"
            value={comp.role}
            onChange={e => handleCompanyChange(idx, 'role', e.target.value)}
            required
          />
        </div>
      ))}

      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
        Create User
      </button>
    </form>
  );
};

export default Register;
