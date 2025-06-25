import React, { useEffect, useState } from 'react';
import axios from 'axios';

const baseUnits = ['Piece', 'Box', 'Kg', 'Ltr'];

const MaterialPage = () => {
  const [categories, setCategories] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [editingMaterial, setEditingMaterial] = useState(null);
  const [formData, setFormData] = useState({
    categoryId: '',
    description: '',
    baseUnit: '',
    orderUnit: '',
    conversionValue: '',
    dimension: ''
  });

  useEffect(() => {
    fetchCategories();
    fetchMaterials();
  }, []);

  const fetchCategories = async () => {
    const res = await axios.get('http://localhost:8080/api/category');
    setCategories(res.data);
  };

  const fetchMaterials = async () => {
    const res = await axios.get('http://localhost:8080/api/material');
    setMaterials(res.data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const startEdit = (material) => {
    setEditingMaterial(material);
    setFormData({
      categoryId: material.categoryId?._id || material.categoryId,
      description: material.description,
      baseUnit: material.baseUnit,
      orderUnit: material.orderUnit,
      conversionValue: material.conversionValue || '',
      dimension: material.dimension || ''
    });
  };

  const cancelEdit = () => {
    setEditingMaterial(null);
    setFormData({
      categoryId: '',
      description: '',
      baseUnit: '',
      orderUnit: '',
      conversionValue: '',
      dimension: ''
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingMaterial) {
        // Edit mode: update material
        await axios.put(`http://localhost:8080/api/material/${editingMaterial._id}`, formData);
        alert('Material updated!');
      } else {
        // Add mode: generate materialId
        const idRes = await axios.post('http://localhost:8080/api/material/generate-id', {
          categoryId: formData.categoryId
        });

        const materialId = idRes.data.materialId;

        await axios.post('http://localhost:8080/api/material', {
          ...formData,
          materialId
        });

        alert('Material added!');
      }

      fetchMaterials();
      cancelEdit();
    } catch (err) {
      console.error(err);
      alert('Operation failed!');
    }
  };

  return (
    <div className="container mt-4">
      <h3>{editingMaterial ? 'Edit Material' : 'Add New Material'}</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Category</label>
          <select name="categoryId" value={formData.categoryId} onChange={handleChange} className="form-control" required>
            <option value="">-- Select --</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.categoryName}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label>Description</label>
          <input name="description" value={formData.description} onChange={handleChange} className="form-control" required />
        </div>

        <div className="mb-3">
          <label>Base Unit</label>
          <select name="baseUnit" value={formData.baseUnit} onChange={handleChange} className="form-control" required>
            <option value="">-- Select --</option>
            {baseUnits.map((unit) => (
              <option key={unit} value={unit}>{unit}</option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label>Order Unit</label>
          <select name="orderUnit" value={formData.orderUnit} onChange={handleChange} className="form-control" required>
            <option value="">-- Select --</option>
            {baseUnits.map((unit) => (
              <option key={unit} value={unit}>{unit}</option>
            ))}
          </select>
        </div>

        {formData.baseUnit && formData.orderUnit && formData.baseUnit !== formData.orderUnit && (
          <div className="mb-3">
            <label>1 {formData.orderUnit} = how many {formData.baseUnit}?</label>
            <input name="conversionValue" value={formData.conversionValue} onChange={handleChange} className="form-control" required />
          </div>
        )}

        <div className="mb-3">
          <label>Dimension</label>
          <input name="dimension" value={formData.dimension} onChange={handleChange} className="form-control" />
        </div>

        <button type="submit" className="btn btn-primary">
          {editingMaterial ? 'Update Material' : 'Add Material'}
        </button>

        {editingMaterial && (
          <button type="button" onClick={cancelEdit} className="btn btn-secondary ms-2">
            Cancel
          </button>
        )}
      </form>

      <hr />

      <h4>Material List</h4>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Material ID</th>
            <th>Description</th>
            <th>Base</th>
            <th>Order</th>
            <th>Conversion</th>
            <th>Dimension</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {materials.map((mat) => (
            <tr key={mat._id}>
              <td>{mat.materialId}</td>
              <td>{mat.description}</td>
              <td>{mat.baseUnit}</td>
              <td>{mat.orderUnit}</td>
              <td>{mat.conversionValue || '-'}</td>
              <td>{mat.dimension || '-'}</td>
              <td>
                <button className="btn btn-sm btn-primary" onClick={() => startEdit(mat)}>
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MaterialPage;
