
///old code
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Select from 'react-select';
// import { useNavigate } from 'react-router-dom';

// function QuotationForm() {
//   const [indents, setIndents] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [vendors, setVendors] = useState([]);
//   const [materials, setMaterials] = useState([]);
//   const navigate = useNavigate();

//   const [selectedIndent, setSelectedIndent] = useState(null);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [vendor, setVendor] = useState('');
//   const [vendorName, setVendorName] = useState('');
//   const [note, setNote] = useState('');
//   const [vnNo, setVnNo] = useState('');
//   const [items, setItems] = useState([]);
//   const [validityDate, setValidityDate] = useState('');
//   const [showModal, setShowModal] = useState(false);
//   const [materialSearch, setMaterialSearch] = useState('');
//   const [selectedItemIndex, setSelectedItemIndex] = useState(null);

//   useEffect(() => {
//     axios.get('http://localhost:8080/api/indent/get')
//       .then((res) => {
//         setIndents(res.data.map((indent) => ({
//           label: `${indent.indentId} (${indent.categoryName})`,
//           value: indent
//         })));
//       });

//     axios.get('http://localhost:8080/api/rfq-categories')
//       .then((res) => {
//         setCategories(res.data.map((cat) => ({
//           label: `${cat.categoryName} (${cat.prefix})`,
//           value: cat._id
//         })));
//       });

//     axios.get('http://localhost:8080/api/vendors')
//       .then((res) => {
//         setVendors(res.data.map((vendor) => ({
//           label: `${vendor.name1} ${vendor.name2}`,
//           value: vendor._id,
//           vnNo: vendor.vnNo || ''
//         })));
//       });

//     axios.get('http://localhost:8080/api/material')
//       .then((res) => setMaterials(res.data))
//       .catch((err) => console.error('Failed to fetch materials:', err));
//   }, []);

//   const handleIndentChange = (selectedOption) => {
//     setSelectedIndent(selectedOption.value);
//     const { buyerGroup, materialGroup, deliveryDate } = selectedOption.value;

//     const mappedItems = selectedOption.value.items.map((item) => ({
//       ...item,
//       unit: item.unit || '',
//       price: item.price || '',
//       buyerGroup: item.buyerGroup || buyerGroup || '',
//       materialGroup: item.materialGroup || materialGroup || '',
//       deliveryDate: item.deliveryDate || deliveryDate || ''
//     }));

//     setItems(mappedItems);
//   };

//   const handleItemChange = (index, field, value) => {
//     const updatedItems = [...items];
//     updatedItems[index][field] = value;
//     setItems(updatedItems);
//   };

//   const addItem = () => {
//     setItems([...items, {
//       materialId: '', description: '', qty: 0, baseUnit: '', orderUnit: '', location: '',
//       buyerGroup: '', unit: '', materialGroup: '', deliveryDate: new Date().toISOString().slice(0, 10), price: 0
//     }]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const payload = {
//       indentId: selectedIndent.indentId,
//       categoryId: selectedIndent.categoryId,
//       rfqCategoryId: selectedCategory?.value,
//       vendor,
//       vendorName,
//       validityDate,
//       vnNo,
//       note,
//       items
//     };

//     try {
//       const res = await axios.post('http://localhost:8080/api/quotations/create', payload);
//       alert('Quotation Created Successfully');
//       console.log(res.data);
//       navigate('/Quotationdisplay');
//     } catch (err) {
//       console.error(err);
//       alert('Failed to create quotation');
//     }
//   };

//   const MaterialModal = () => {
//     const filteredMaterials = materials.filter(mat =>
//       mat.materialId.toLowerCase().includes(materialSearch.toLowerCase()) ||
//       mat.description.toLowerCase().includes(materialSearch.toLowerCase())
//     );

//     const selectMaterial = (material) => {
//       const updatedItems = [...items];
//       updatedItems[selectedItemIndex] = {
//         ...updatedItems[selectedItemIndex],
//         materialId: material.materialId,
//         description: material.description,
//         baseUnit: material.baseUnit,
//         unit: material.unit,
//         price: material.price
//       };
//       setItems(updatedItems);
//       setShowModal(false);
//     };

//     return (
//       <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
//         <div style={{ background: 'white', padding: 20, maxHeight: '80%', overflowY: 'auto', width: '80%' }}>
//           <h5>Select Material</h5>
//           <input
//             type="text"
//             placeholder="Search by ID or Description"
//             value={materialSearch}
//             className='form-control'
//             onChange={(e) => setMaterialSearch(e.target.value)}
//             style={{ width: '100%', marginBottom: 10 }}
//           />
//           <table className='table table-striped'>
//             <thead>
//               <tr>
//                 <th>Material ID</th>
//                 <th>Description</th>
//                 <th>Base Unit</th>
//                 <th>Unit</th>
//                 <th>Price</th>
//                 <th>Select</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredMaterials.map((mat, i) => (
//                 <tr key={i}>
//                   <td>{mat.materialId}</td>
//                   <td>{mat.description}</td>
//                   <td>{mat.baseUnit}</td>
//                   <td>{mat.unit}</td>
//                   <td>{mat.price}</td>
//                   <td><button className='btn btn-sm btn-outline-info' type="button" onClick={() => selectMaterial(mat)}>Select</button></td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//           <button type="button" className='btn btn-sm btn-outline-danger' onClick={() => setShowModal(false)} style={{ marginTop: 10 }}>Close</button>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className='content'>
//       <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Create Quotation from Indent</h2>
//       <div className="row mb-2">
//         <div className='col-xl-4'>
//           <label>Select Indent:</label>
//           <Select options={indents} onChange={handleIndentChange} placeholder="Select an Indent" />
//         </div>

//         <div className='col-xl-4'>
//           <label>Select RFQ Category:</label>
//           <Select options={categories} onChange={setSelectedCategory} placeholder="Select Category" />
//         </div>

//         <div className='col-xl-4'>
//           <label>Vendor Name:</label>
//           <Select
//             options={vendors}
//             onChange={(selected) => {
//               setVendor(selected?.value);
//               setVendorName(selected?.label);
//               setVnNo(selected?.vnNo || '');
//             }}
//             placeholder="Select a Vendor"
//           />
//         </div>
//       </div>
//       {selectedIndent && (
//         <form onSubmit={handleSubmit}>
//           <div className='col-xl-4'>
//             <label>Validity Date:</label>
//             <input
//               type="date"
//               className='form-control'
//               value={validityDate}
//               onChange={(e) => setValidityDate(e.target.value)}
//               style={{ padding: '8px', width: '200px' }}
//             />
//           </div>

//           <div className='col-xl-4'>
//             <label>Note:</label>
//             <textarea
//               value={note}
//               onChange={(e) => setNote(e.target.value)}
//               rows={2}
//               className='form-control'
//               style={{ width: '100%', padding: '8px' }}
//               placeholder="Add any notes (optional)"
//             />
//           </div>

//           <div className='mb-4 mt-2'>
//             <button className='btn btn-soft-info' type="button" onClick={addItem}>+ Add Item</button>
//           </div>

//           <div style={{ maxHeight: '400px', overflowX: 'auto', overflowY: 'scroll', marginBottom: '20px' }}>
//             <table className='table table-bordered'>
//               <thead>
//                 <tr>
//                   <th>#</th>
//                   <th>Material ID</th>
//                   <th>Description</th>
//                   <th>Qty</th>
//                   <th>Base Unit</th>
//                   <th>Order Unit</th>
//                   <th>Location</th>
//                   <th>Buyer Group</th>
//                   <th>Unit</th>
//                   <th>Material Group</th>
//                   <th>Delivery Date</th>
//                   <th>Vendor Name</th>
//                   <th>Price</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {items.map((item, index) => (
//                   <tr key={index}>
//                     <td>{index + 1}</td>
//                     <td>
//                       <input
//                         value={item.materialId}
//                         readOnly
//                         onClick={() => {
//                           setSelectedItemIndex(index);
//                           setShowModal(true);
//                         }}
//                         className='form-control'
//                         style={{ cursor: 'pointer', backgroundColor: '#f0f0f0' }}
//                       />
//                     </td>
//                     <td><input className='form-control' value={item.description} onChange={(e) => handleItemChange(index, 'description', e.target.value)} /></td>
//                     <td><input className='form-control' type="number" value={item.qty} onChange={(e) => handleItemChange(index, 'qty', e.target.value)} /></td>
//                     <td><input className='form-control' value={item.baseUnit} onChange={(e) => handleItemChange(index, 'baseUnit', e.target.value)} /></td>
//                     <td><input className='form-control' value={item.orderUnit} onChange={(e) => handleItemChange(index, 'orderUnit', e.target.value)} /></td>
//                     <td><input className='form-control' value={item.location} onChange={(e) => handleItemChange(index, 'location', e.target.value)} /></td>
//                     <td><input className='form-control' value={item.buyerGroup} onChange={(e) => handleItemChange(index, 'buyerGroup', e.target.value)} /></td>
//                     <td><input className='form-control' value={item.unit} onChange={(e) => handleItemChange(index, 'unit', e.target.value)} /></td>
//                     <td><input className='form-control' value={item.materialGroup} onChange={(e) => handleItemChange(index, 'materialGroup', e.target.value)} /></td>
//                     <td>
//                       <input
//                         type="date"
//                         className='form-control'
//                         value={item.deliveryDate?.split('T')[0]}
//                         onChange={(e) => handleItemChange(index, 'deliveryDate', e.target.value)}
//                       />
//                     </td>
//                     <td>{vendorName}</td>
//                     <td><input className='form-control' type="number" value={item.price} onChange={(e) => handleItemChange(index, 'price', e.target.value)} /></td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           <button type="submit" className='btn btn-success mb-4 mt-2'>
//             Submit Quotation
//           </button>
//         </form>
//       )}

//       {showModal && <MaterialModal />}
//     </div>
//   );
// }

// export default QuotationForm;




////new code

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function QuotationForm() {
  const [indents, setIndents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [materials, setMaterials] = useState([]);
  const navigate = useNavigate();

  const [selectedIndent, setSelectedIndent] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [vendor, setVendor] = useState('');
  const [vendorName, setVendorName] = useState('');
  const [note, setNote] = useState('');
  const [vnNo, setVnNo] = useState('');
  const [items, setItems] = useState([]);
  const [validityDate, setValidityDate] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);

  const [showIndentModal, setShowIndentModal] = useState(false);
  const [showVendorModal, setShowVendorModal] = useState(false);
  const [indentSearch, setIndentSearch] = useState('');
  const [vendorSearch, setVendorSearch] = useState('');
  const [materialSearch, setMaterialSearch] = useState('');

  const [searchIndent, setSearchIndent] = useState('');
  const [modalIndentSearch, setModalIndentSearch] = useState('');
  // const [selectedIndent, setSelectedIndent] = useState(null);
  
  // const [vendorName, setVendorName] = useState('');
  const [modalVendorSearch, setModalVendorSearch] = useState('');
  const [selectedVendor, setSelectedVendor] = useState(null);
  
  
useEffect(() => {
  if (modalIndentSearch) {
    const filtered = indents.filter(indent =>
      indent.indentId.toLowerCase().includes(modalIndentSearch.toLowerCase())
    );
    setFilteredIndents(filtered);
  }
}, [modalIndentSearch]);


  useEffect(() => {
    axios.get('http://localhost:8080/api/indent/get').then((res) => {
      const activeIndents = res.data.filter(
        (indent) => !indent.isDeleted && !indent.isBlocked
      );
    
      setIndents(
        activeIndents.map((indent) => ({
          label: `${indent.indentId} (${indent.categoryName})`,
          value: indent,
        }))
      );
    });
    

    axios.get('http://localhost:8080/api/rfq-categories').then((res) => {
      setCategories(
        res.data.map((cat) => ({
          label: `${cat.categoryName} (${cat.prefix})`,
          value: cat._id,
        }))
      );
    });

    axios.get('http://localhost:8080/api/vendors').then((res) => {
      const activeVendors = res.data.filter(
        (vendor) => !vendor.isDeleted && !vendor.isBlocked
      );
    
      setVendors(
        activeVendors.map((vendor) => ({
          label: `${vendor.name1} ${vendor.name2 || ''}`,
          value: vendor._id,
          vnNo: vendor.vnNo || '',
        }))
      );
    });
    

    axios
    .get('http://localhost:8080/api/material')
    .then((res) => {
      console.log('Fetched materials:', res.data);
      const filteredMaterials = res.data.filter(
        (material) => !material.isDeleted && !material.isBlocked
      );
      setMaterials(filteredMaterials);
      console.log('Filtered materials:', filteredMaterials);
    })
    .catch((err) => console.error('Failed to fetch materials:', err));
}, []);
const handleIndentChange = (selectedOption) => {
  setSelectedIndent(selectedOption); // store the entire object { label, value }
  const { buyerGroup, materialGroup, deliveryDate } = selectedOption.value;

  const mappedItems = selectedOption.value.items.map((item) => ({
    ...item,
    unit: item.unit || '',
    price: item.price || '',
    buyerGroup: item.buyerGroup || buyerGroup || '',
    materialGroup: item.materialGroup || materialGroup || '',
    deliveryDate: item.deliveryDate || deliveryDate || '',
  }));
  setItems(mappedItems);
};


  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    setItems(updatedItems);
  };

  const addItem = () => {
    setItems([
      ...items,
      {
        materialId: '',
        description: '',
        qty: 0,
        baseUnit: '',
        orderUnit: '',
        location: '',
        buyerGroup: '',
        unit: '',
        materialGroup: '',
        deliveryDate: new Date().toISOString().slice(0, 10),
        price: 0,
      },
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      indentId: selectedIndent.indentId,
      categoryId: selectedIndent.categoryId,
      rfqCategoryId: selectedCategory?.value,
      vendor,
      vendorName,
      validityDate,
      vnNo,
      note,
      items,
    };

    try {
      const res = await axios.post('http://localhost:8080/api/quotations/create', payload);
      alert('Quotation Created Successfully');
      console.log(res.data);
      navigate('/quotations-display');
    } catch (err) {
      console.error(err);
      alert('Failed to create quotation');
    }
  };
  // When user selects from modal:



  const MaterialModal = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [searchType, setSearchType] = useState('materialId');
    
    const [materialSearch, setMaterialSearch] = useState(''); // ✅ Add this line
    const handleSearchInputChange = (e) => {
      const value = e.target.value;
      setMaterialSearch(value);
  
      const filtered = materials.filter((mat) => {
        const target = searchType === 'materialId' ? mat.materialId : mat.description;
        return target?.toLowerCase().includes(value.toLowerCase());
      });
  
      setSearchResults(filtered);
    };
  
    const handleViewAll = () => {
      setSearchResults(materials);
      setMaterialSearch('');
    };
  
    const handleClearResults = () => {
      setSearchResults([]);
      setMaterialSearch('');
    };
  
    const selectMaterialFromSearch = (material) => {
      const updatedItems = [...items];
      updatedItems[selectedItemIndex] = {
        ...updatedItems[selectedItemIndex],
        materialId: material.materialId,
        description: material.description,
        baseUnit: material.baseUnit,
        unit: material.unit,
        price: material.price,
      };
      setItems(updatedItems);
      setShowModal(false);
    };
  
    return (
      <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title">
                <i className="fas fa-search me-2"></i>Search Materials
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                onClick={() => setShowModal(false)}
              ></button>
            </div>
  
            <div className="modal-body">
              {/* Search Controls */}
              <div className="row mb-3">
                <div className="col-md-3">
                  <label className="form-label">Search Type</label>
                  <select
                    className="form-select"
                    value={searchType}
                    onChange={(e) => setSearchType(e.target.value)}
                  >
                    <option value="materialId">Material ID</option>
                    <option value="description">Description</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label">Search Query</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="fas fa-search"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder={
                        searchType === 'materialId'
                          ? 'Enter Material ID (e.g., MMNR-100001)'
                          : 'Search by Description...'
                      }
                      value={materialSearch}
                      onChange={handleSearchInputChange}
                    />
                  </div>
                </div>
                <div className="col-md-3">
                  <label className="form-label">&nbsp;</label>
                  <div className="d-flex gap-2">
                    <button className="btn btn-info" onClick={handleViewAll}>
                      <i className="fas fa-list me-1"></i>View All
                    </button>
                    {searchResults.length > 0 && (
                      <button className="btn btn-outline-secondary" onClick={handleClearResults}>
                        <i className="fas fa-times me-1"></i>Clear
                      </button>
                    )}
                  </div>
                </div>
              </div>
  
              {/* Search Results */}
              <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                {searchResults.length > 0 ? (
                  <table className="table table-hover">
                    <thead className="table-light sticky-top">
                      <tr>
                        <th>Material ID</th>
                        <th>Description</th>
                        <th>Base Unit</th>
                        <th>Unit</th>
                        <th>Price</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {searchResults.map((material, idx) => (
                        <tr key={idx}>
                          <td><span className="badge bg-secondary">{material.materialId}</span></td>
                          <td>{material.description}</td>
                          <td>{material.baseUnit}</td>
                          <td>{material.unit}</td>
                          <td>{material.price}</td>
                          <td>
                            <button
                              className="btn btn-success btn-sm"
                              onClick={() => selectMaterialFromSearch(material)}
                            >
                              <i className="fas fa-check me-1"></i>Select
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="text-center py-4">
                    <i className="fas fa-search fa-3x text-muted mb-3"></i>
                    <p className="text-muted">
                      {materials.length === 0
                        ? 'No materials loaded from API'
                        : materialSearch
                          ? `No materials found matching "${materialSearch}"`
                          : 'Enter search term or click "View All"'}
                    </p>
                  </div>
                )}
              </div>
            </div>
  
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setShowModal(false)}
              >
                <i className="fas fa-times me-1"></i>Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  
  

  const IndentModal = () => {
    const [indentSearchType, setIndentSearchType] = useState('indentId');
    const [searchResults, setSearchResults] = useState([]);
    const [indentSearch, setIndentSearch] = useState(''); // ✅ Add this
  
    const handleIndentSearch = (e) => {
      const val = e.target.value;
      setIndentSearch(val); // ✅ update state
      const filtered = indents.filter((ind) =>
        (indentSearchType === 'indentId'
          ? ind?.value?.indentId
          : ind?.value?.categoryName
        )
          ?.toLowerCase()
          .includes(val.toLowerCase())
      );
      setSearchResults(filtered);
    };
  
    const handleViewAllIndents = () => {
      setSearchResults(indents);
      setIndentSearch('');
    };
  
    const handleClearIndents = () => {
      setSearchResults([]);
      setIndentSearch('');
    };
  
   
    return (
      <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title">
                <i className="fas fa-search me-2"></i>Search Indents
              </h5>
              <button type="button" className="btn-close btn-close-white" onClick={() => setShowIndentModal(false)}></button>
            </div>
            <div className="modal-body">
              <div className="row mb-3">
                <div className="col-md-3">
                  <label className="form-label">Search Type</label>
                  <select className="form-select" value={indentSearchType} onChange={(e) => setIndentSearchType(e.target.value)}>
                    <option value="indentId">Indent ID</option>
                    <option value="categoryName">Category</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label">Search</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search by Indent ID or Category"
                    value={indentSearch}
                    onChange={handleIndentSearch}
                  />
                </div>
                <div className="col-md-3 d-flex gap-2 mt-4">
                  <button className="btn btn-info" onClick={handleViewAllIndents}>
                    <i className="fas fa-list me-1"></i>View All
                  </button>
                  {searchResults.length > 0 && (
                    <button className="btn btn-outline-secondary" onClick={handleClearIndents}>
                      <i className="fas fa-times me-1"></i>Clear
                    </button>
                  )}
                </div>
              </div>
  
              <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                {searchResults.length > 0 ? (
                  <table className="table table-hover">
                    <thead className="table-light sticky-top">
                      <tr>
                        <th>Indent ID</th>
                        <th>Category</th>
                        <th>Buyer Group</th>
                        <th>Location</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {searchResults.map((ind, idx) => (
                        <tr key={idx}>
                          <td><span className="badge bg-secondary">{ind.value.indentId}</span></td>
                          <td>{ind.value.categoryName}</td>
                          <td>{ind.value.buyerGroup}</td>
                          <td>{ind.value.location}</td>
                          <td>
                            <button
                              className="btn btn-success btn-sm"
                              onClick={() => {
                                handleIndentChange(ind);
                                setShowIndentModal(false);
                              }}
                            >
                              <i className="fas fa-check me-1"></i>Select
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="text-center py-4">
                    <i className="fas fa-search fa-3x text-muted mb-3"></i>
                    <p className="text-muted">No indents found. Try different search or click "View All".</p>
                  </div>
                )}
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowIndentModal(false)}>
                <i className="fas fa-times me-1"></i>Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  

  const VendorModal = () => {
    const [vendorSearchType, setVendorSearchType] = useState('name1');
    const [searchResults, setSearchResults] = useState([]);
    const [vendorSearch, setVendorSearch] = useState(''); // ✅ Add this line
  
    const handleVendorSearch = (e) => {
      const val = e.target.value;
      setVendorSearch(val);
      const filtered = vendors.filter((v) =>
        (vendorSearchType === 'vnNo' ? v.vnNo : v.label)
          ?.toLowerCase()
          .includes(val.toLowerCase())
      );
      setSearchResults(filtered);
    };
  
    const handleViewAllVendors = () => {
      setSearchResults(vendors);
      setVendorSearch('');
    };
  
    const handleClearVendors = () => {
      setSearchResults([]);
      setVendorSearch('');
    };
  
    return (
      <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title"><i className="fas fa-search me-2"></i>Search Vendors</h5>
              <button type="button" className="btn-close btn-close-white" onClick={() => setShowVendorModal(false)}></button>
            </div>
            <div className="modal-body">
              <div className="row mb-3">
                <div className="col-md-3">
                  <label className="form-label">Search Type</label>
                  <select className="form-select" value={vendorSearchType} onChange={(e) => setVendorSearchType(e.target.value)}>
                    <option value="name1">Vendor Name</option>
                    <option value="vnNo">Vendor No</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label">Search</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search by Name or VN No"
                    value={vendorSearch}
                    onChange={handleVendorSearch}
                  />
                </div>
                <div className="col-md-3 d-flex gap-2 mt-4">
                  <button className="btn btn-info" onClick={handleViewAllVendors}>
                    <i className="fas fa-list me-1"></i>View All
                  </button>
                  {searchResults.length > 0 && (
                    <button className="btn btn-outline-secondary" onClick={handleClearVendors}>
                      <i className="fas fa-times me-1"></i>Clear
                    </button>
                  )}
                </div>
              </div>
  
              <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                {searchResults.length > 0 ? (
                  <table className="table table-hover">
                    <thead className="table-light sticky-top">
                      <tr>
                        <th>Vendor Name</th>
                        <th>Vendor No</th>
                        <th>City</th>
                        <th>Region</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {searchResults.map((v, idx) => (
                        <tr key={idx}>
                          <td>{v.label}</td>
                          <td><span className="badge bg-secondary">{v.vnNo}</span></td>
                          <td>{v.city || '-'}</td>
                          <td>{v.region || '-'}</td>
                          <td>
                            <button
                              className="btn btn-success btn-sm"
                              onClick={() => {
                                setVendor(v.value);
                                setVendorName(v.label);
                                setVnNo(v.vnNo || '');
                                setShowVendorModal(false);
                              }}
                            >
                              <i className="fas fa-check me-1"></i>Select
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="text-center py-4">
                    <i className="fas fa-search fa-3x text-muted mb-3"></i>
                    <p className="text-muted">No vendors found. Try another search or click "View All".</p>
                  </div>
                )}
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setShowVendorModal(false)}>
                <i className="fas fa-times me-1"></i>Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  

  return (
    <div className="content">
      <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Quotation Form</h2>

      <div className="row mb-2">
  {/* Indent */}
  <div className="col-xl-4">
  <label>Select Indent:</label>
  <div className="input-group">
    <input
      className="form-control"
      placeholder="Type or search Indent"
      value={selectedIndent?.value?.indentId || ''}

      onChange={(e) => {
        const val = e.target.value;
        setSearchIndent(val);

        const matched = indents.find(
          (indent) => indent.indentId.toLowerCase() === val.toLowerCase()
        );
        setSelectedIndent(matched || null);
      }}
      readOnly
    />
    <button
      className="btn btn-outline-secondary"
      onClick={() => {
        setModalIndentSearch(searchIndent);
        setShowIndentModal(true);
      }}
    >
      🔍
    </button>
  </div>
</div>



  {/* Category */}
  <div className="col-xl-4">
    <label>Select RFQ Category:</label>
    <select
      className="form-control"
      value={selectedCategory?.value || ''}
      onChange={(e) =>
        setSelectedCategory(
          categories.find((c) => c.value === e.target.value) || null
        )
      }
    >
      <option value="">Select</option>
      {categories.map((cat, idx) => (
        <option key={idx} value={cat.value}>
          {cat.label}
        </option>
      ))}
    </select>
  </div>

  {/* Vendor */}
  <div className="col-xl-4">
    <label>Vendor Name:</label>
    <div className="input-group">
      <input
        className="form-control"
        placeholder="Type or search Vendor"
        value={vendorName}
        onChange={(e) => {
          const val = e.target.value;
          setVendorName(val);

          const matchedVendor = vendors.find(
            (v) => v.name.toLowerCase() === val.toLowerCase()
          );
          if (matchedVendor) {
            setSelectedVendor(matchedVendor);
          } else {
            setSelectedVendor(null);
          }
        }}
      />
      <button
        className="btn btn-outline-secondary"
        onClick={() => {
          setShowVendorModal(true);
          setModalVendorSearch(vendorName);
        }}
      >
        🔍
      </button>
    </div>
  </div>
</div>



 
        <form onSubmit={handleSubmit}>
          <div className="col-xl-4 mb-2">
            <label>Validity Date:</label>
            <input
              type="date"
              className="form-control"
              value={validityDate}
              onChange={(e) => setValidityDate(e.target.value)}
            />
          </div>

          <div className="col-xl-4 mb-2">
            <label>Note:</label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={2}
              className="form-control"
              placeholder="Add any notes (optional)"
            />
          </div>

          <div className="mb-3 mt-2">
            <button className="btn btn-soft-info" type="button" onClick={addItem}>
              + Add Item
            </button>
          </div>

          <div style={{ maxHeight: '400px', overflowY: 'scroll' }}>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Material ID</th>
                  <th>Description</th>
                  <th>Qty</th>
                  <th>Base Unit</th>
                  <th>Order Unit</th>
                  <th>Location</th>
                  <th>Buyer Group</th>
                  <th>Unit</th>
                  <th>Material Group</th>
                  <th>Delivery Date</th>
                  <th>Vendor</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <input
                        value={item.materialId}
                        readOnly
                        onClick={() => {
                          setSelectedItemIndex(index);
                          setShowModal(true);
                        }}
                        className="form-control"
                        style={{ cursor: 'pointer', backgroundColor: '#f0f0f0' }}
                      />
                    </td>
                    <td>
                      <input
                        className="form-control"
                        value={item.description}
                        onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        className="form-control"
                        type="number"
                        value={item.qty}
                        onChange={(e) => handleItemChange(index, 'qty', e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        className="form-control"
                        value={item.baseUnit}
                        onChange={(e) => handleItemChange(index, 'baseUnit', e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        className="form-control"
                        value={item.orderUnit}
                        onChange={(e) => handleItemChange(index, 'orderUnit', e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        className="form-control"
                        value={item.location}
                        onChange={(e) => handleItemChange(index, 'location', e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        className="form-control"
                        value={item.buyerGroup}
                        onChange={(e) => handleItemChange(index, 'buyerGroup', e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        className="form-control"
                        value={item.unit}
                        onChange={(e) => handleItemChange(index, 'unit', e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        className="form-control"
                        value={item.materialGroup}
                        onChange={(e) => handleItemChange(index, 'materialGroup', e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="date"
                        className="form-control"
                        value={item.deliveryDate?.split('T')[0]}
                        onChange={(e) =>
                          handleItemChange(index, 'deliveryDate', e.target.value)
                        }
                      />
                    </td>
                    <td>{vendorName}</td>
                    <td>
                      <input
                        className="form-control"
                        type="number"
                        value={item.price}
                        onChange={(e) => handleItemChange(index, 'price', e.target.value)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button type="submit" className="btn btn-success mt-3 mb-4">
            Submit Quotation
          </button>
        </form>
      

      {showModal && <MaterialModal />}
      {showIndentModal && <IndentModal />}
      {showVendorModal && <VendorModal />}
    </div>
  );
}

const modalStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 9999,
};

const modalContentStyle = {
  background: 'white',
  padding: 20,
  maxHeight: '80%',
  overflowY: 'auto',
  width: '80%',
};

export default QuotationForm;



