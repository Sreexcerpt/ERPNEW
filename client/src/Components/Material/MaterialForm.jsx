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
    dimension: '',
    mnp: "",
    location: ""
  });

  // Modal state
  const [showModal, setShowModal] = useState(false);

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
      dimension: material.dimension || '',
      mnp: material.mnp || '',
      location: material.location || ''
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
      dimension: '',
      mnp: "",
      location: ""
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingMaterial) {
        await axios.put(`http://localhost:8080/api/material/${editingMaterial._id}`, formData);
        alert('Material updated!');
      } else {
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
      handleCloseModal()
    } catch (err) {
      console.error(err);
      alert('Operation failed!');
    }
  };

  // Modal show/hide functions
  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const [showdropdown, setShowdropdown] = useState(false);

  const handleOpendropdown = () => setShowdropdown(true);
  const handleClosedropdown = () => setShowdropdown(false);
  return (
    <div className="main-wrapper">
      <div>
        <div className="content">
          <div className="d-flex d-block align-items-center justify-content-between flex-wrap gap-3 mb-3">
            <div>
              <h6>Material Master</h6>
            </div>
            <div className="d-flex my-xl-auto right-content align-items-center flex-wrap gap-2">
              <div className="dropdown">
                <a href="#" onClick={handleOpendropdown} className="btn btn-outline-white d-inline-flex align-items-center" data-bs-toggle="dropdown">
                  <i className="isax isax-export-1 me-1"></i>Export
                </a>
                <ul className={showdropdown ? `dropdown-menu show` : "dropdown-menu"}>
                  <li>
                    <a className="dropdown-item" href="#" onClick={handleClosedropdown}>Download as PDF</a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#" onClick={handleClosedropdown}>Download as Excel</a>
                  </li>
                </ul>
              </div>
              <div>
                <a onClick={() => { handleOpenModal(); cancelEdit() }} className="btn btn-primary d-flex align-items-center"><i className="isax isax-add-circle5 me-1"></i>New Material</a>
              </div>
            </div>
          </div>

          <div className='table-responsive'>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Material ID</th>
                  <th>Description</th>
                  <th>Base</th>
                  <th>Order</th>
                  <th>Conversion</th>
                  <th>Dimension</th>
                  <th>MNP</th>
                  <th>Location</th>
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
                    <td>{mat.mnp || '_'}</td>
                    <td>{mat.location || '_'}</td>
                    <td>
                      <button className="btn btn-sm btn-primary" onClick={() => { startEdit(mat); handleOpenModal(); }}>
                        Edit
                      </button>

                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Modal */}
          {showModal && (
            <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" aria-labelledby="myLargeModalLabel" aria-modal="true" role="dialog">
              <div className="modal-dialog modal-lg">
                <div className="modal-content">
                  <div className="modal-header">
                    <h4 className="modal-title" id="myLargeModalLabel"> {editingMaterial ? 'Edit Material' : 'Add New Material'}</h4>
                    <button type="button" className="btn-close" onClick={handleCloseModal} aria-label="Close"></button>
                  </div>
                  <div className="modal-body">

                    <form onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-xl-3">
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
                        </div>
                        <div className="col-xl-9">
                          <div className="mb-3">
                            <label>Description</label>
                            <input name="description" value={formData.description} onChange={handleChange} className="form-control" required />
                          </div>
                        </div>
                        <div className="col-xl-3">
                          <div className="mb-3">
                            <label>Base Unit</label>
                            <select name="baseUnit" value={formData.baseUnit} onChange={handleChange} className="form-control" required>
                              <option value="">-- Select --</option>
                              {baseUnits.map((unit) => (
                                <option key={unit} value={unit}>{unit}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="col-xl-3">
                          <div className="mb-3">
                            <label>Order Unit</label>
                            <select name="orderUnit" value={formData.orderUnit} onChange={handleChange} className="form-control" required>
                              <option value="">-- Select --</option>
                              {baseUnits.map((unit) => (
                                <option key={unit} value={unit}>{unit}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                        {formData.baseUnit && formData.orderUnit && formData.baseUnit !== formData.orderUnit && (
                          <div className="col-xl-3">
                            <div className="mb-3">
                              <label>1 {formData.orderUnit} = how many {formData.baseUnit}?</label>
                              <input name="conversionValue" value={formData.conversionValue} onChange={handleChange} className="form-control" required />
                            </div>
                          </div>
                        )}
                        <div className="col-xl-3">
                          <div className="mb-3">
                            <label>Dimension</label>
                            <input name="dimension" value={formData.dimension} onChange={handleChange} className="form-control" />
                          </div>
                        </div>
                        <div className="col-xl-3">
                          <div className='mb-3'>
                            <label >MNP</label>
                            <input name='mnp' value={formData.mnp} onChange={handleChange} className='form-control' />
                          </div>
                        </div>
                        <div className="col-xl-3">
                          <div className='mb-3'>
                            <label >Location</label>
                            <input name='location' value={formData.location} onChange={handleChange} className='form-control' />
                          </div>
                        </div>
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
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default MaterialPage;