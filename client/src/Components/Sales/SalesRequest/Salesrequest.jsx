// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const baseUnits = ['Piece', 'Box', 'Kg', 'Ltr'];

// const Salesrequest = () => {
//   const [materials, setMaterials] = useState([]);
//   const [selectedMaterial, setSelectedMaterial] = useState(null);

//   const [categories, setCategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState('');
//   // Initialize selectedItems with 4 default manual rows
//   const [selectedItems, setSelectedItems] = useState([
//     {
//       materialId: '',
//       description: '',
//       baseUnit: '',
//       orderUnit: '',
//       location: '',
//       materialgroup: '',
//       qty: '',
//       deliveryDate: '',
//       salesGroup: '',
//       isManual: true,
//     },
//     {
//       materialId: '',
//       description: '',
//       baseUnit: '',
//       orderUnit: '',
//       location: '',
//       materialgroup: '',
//       qty: '',
//       deliveryDate: '',
//       salesGroup: '',
//       isManual: true,
//     },
//     {
//       materialId: '',
//       description: '',
//       baseUnit: '',
//       orderUnit: '',
//       location: '',
//       materialgroup: '',
//       qty: '',
//       deliveryDate: '',
//       salesGroup: '',
//       isManual: true,
//     },
//     {
//       materialId: '',
//       description: '',
//       baseUnit: '',
//       orderUnit: '',
//       location: '',
//       materialgroup: '',
//       qty: '',
//       deliveryDate: '',
//       salesGroup: '',
//       isManual: true,
//     }
//   ]);
//   // Modal states
//   const [showSearchModal, setShowSearchModal] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [searchResults, setSearchResults] = useState([]);
//   const [searchType, setSearchType] = useState('materialId');
//   const [currentEditIndex, setCurrentEditIndex] = useState(null);

//   // Pagination states
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(5);
//   const [savedIndentsCurrentPage, setSavedIndentsCurrentPage] = useState(1);
//   const [savedIndentsPerPage] = useState(3);

//   // Material ID prefix
//   const MATERIAL_PREFIX = 'MMNR-';

//   // Fetch materials
//   useEffect(() => {
//     axios.get('http://localhost:8080/api/material')
//       .then(res => {
//         console.log('Materials fetched:', res.data);
//         setMaterials(res.data);
//       })
//       .catch(err => console.error(err));
//   }, []);

//   // Fetch purchase categories
//   useEffect(() => {
//     axios.get('http://localhost:8080/api/salecategory')
//       .then(res => setCategories(res.data))
//       .catch(err => console.error(err));
//   }, []);

//   // Handle material selection
//   const handleMaterialSelect = (mat) => {
//     setSelectedMaterial(mat);
//     setSelectedItems(prev => [...prev, {
//       ...mat,
//       qty: 1,
//       deliveryDate: '',
//       salesGroup: '',
//       isManual: false,
//     }]);
//   };

//   const addManualRow = () => {
//     setSelectedItems(prev => [...prev, {
//       materialId: '',
//       description: '',
//       baseUnit: '',
//       orderUnit: '',
//       location: '',
//       materialgroup: '',
//       qty: '',
//       deliveryDate: '',
//       salesGroup: '',
//       isManual: true,
//     }]);
//   };

//   const removeItem = (index) => {
//     setSelectedItems(prev => prev.filter((_, i) => i !== index));
//     // Reset pagination if needed
//     const totalPages = Math.ceil((selectedItems.length - 1) / itemsPerPage);
//     if (currentPage > totalPages && totalPages > 0) {
//       setCurrentPage(totalPages);
//     }
//   };

//   const updateField = async (index, field, value) => {
//     const updated = [...selectedItems];
//     updated[index][field] = value;

//     if (field === 'materialId' && updated[index].isManual) {
//       try {
//         const res = await axios.get(`http://localhost:8080/api/material/byId/${value}`);
//         const mat = res.data;
//         if (mat) {
//           updated[index] = {
//             ...updated[index],
//             materialId: mat.materialId,
//             description: mat.description,
//             baseUnit: mat.baseUnit,
//             orderUnit: mat.orderUnit,
//             location: mat.location,
//             materialgroup: mat.materialgroup,
//             isManual: true,
//           };
//         }
//       } catch (err) {
//         console.error('Material ID not found:', value);
//       }
//     }

//     setSelectedItems(updated);
//   };

//   // Search functionality
//   const handleSearch = () => {
//     if (!searchQuery.trim()) {
//       setSearchResults([]);
//       return;
//     }

//     console.log('Searching with query:', searchQuery, 'Type:', searchType);
//     console.log('Available materials:', materials);

//     if (searchType === 'materialId') {
//       let searchTerm = searchQuery;

//       if (/^\d+$/.test(searchQuery)) {
//         searchTerm = MATERIAL_PREFIX + searchQuery;
//       }

//       const filtered = materials.filter(material => {
//         const materialId = material.materialId || '';
//         return materialId.toLowerCase().includes(searchTerm.toLowerCase());
//       });

//       console.log('Filtered results for materialId:', filtered);
//       setSearchResults(filtered);
//     } else {
//       const filtered = materials.filter(material => {
//         const description = material.description || '';
//         return description.toLowerCase().includes(searchQuery.toLowerCase());
//       });

//       console.log('Filtered results for description:', filtered);
//       setSearchResults(filtered);
//     }
//   };

//   // Auto-search when query changes
//   useEffect(() => {
//     const timeoutId = setTimeout(() => {
//       if (searchQuery.trim()) {
//         handleSearch();
//       } else {
//         setSearchResults([]);
//       }
//     }, 300);

//     return () => clearTimeout(timeoutId);
//   }, [searchQuery, searchType, materials]);

//   const handleSearchInputChange = (e) => {
//     const value = e.target.value;
//     setSearchQuery(value);
//   };

//   const handleViewAll = () => {
//     setSearchResults(materials);
//     setSearchQuery('');
//   };

//   const handleClearResults = () => {
//     setSearchResults([]);
//     setSearchQuery('');
//   };

//   const openSearchModal = (index) => {
//     setCurrentEditIndex(index);
//     setShowSearchModal(true);
//     setSearchQuery('');
//     setSearchResults([]);
//   };

//   const closeSearchModal = () => {
//     setShowSearchModal(false);
//     setCurrentEditIndex(null);
//     setSearchQuery('');
//     setSearchResults([]);
//   };

//   const selectMaterialFromSearch = (material) => {
//     if (currentEditIndex !== null) {
//       const updated = [...selectedItems];
//       updated[currentEditIndex] = {
//         ...updated[currentEditIndex],
//         materialId: material.materialId,
//         description: material.description,
//         baseUnit: material.baseUnit,
//         orderUnit: material.orderUnit,
//         location: material.location,
//         materialgroup: material.materialgroup,
//         isManual: true,
//       };
//       setSelectedItems(updated);
//     }
//     closeSearchModal();
//   };

//   const [savedIndents, setSavedIndents] = useState([]);
//   useEffect(() => {
//     axios.get('http://localhost:8080/api/salerequest/get')
//       .then(res => setSavedIndents(res.data))
//       .catch(err => console.error("Failed to fetch saved indents", err));
//   }, []);

//   const handlePrintSingle = (id) => {
//     const printContent = document.getElementById(`print-indent-${id}`).innerHTML;
//     const win = window.open('', '', 'width=900,height=700');
//     win.document.write("<html><head><title>Indent Print</title><style>");
//     win.document.write('table { border-collapse: collapse; width: 100%; }');
//     win.document.write('th, td { border: 1px solid #000; padding: 8px; text-align: left; }');
//     win.document.write('th { background-color: #f5f5f5; }');
//     win.document.write('</style></head><body>');
//     win.document.write(printContent);
//     win.document.write('</body></html>');
//     win.document.close();
//     win.print();
//   };

//   const handleSubmitIndent = async () => {
//     if (!selectedCategory) {
//       alert("Please select a purchase category");
//       return;
//     }

//     // Filter out empty/null rows before submitting
//     const validItems = selectedItems.filter(item => {
//       return item.materialId && item.materialId.trim() !== '' &&
//         item.description && item.description.trim() !== '' &&
//         item.qty && item.qty > 0;
//     });

//     if (validItems.length === 0) {
//       alert("Please add at least one valid item with Material ID, Description, and Quantity");
//       return;
//     }

//     const selectedCategoryObj = categories.find(cat =>
//       cat.name === selectedCategory || cat.categoryName === selectedCategory || cat._id === selectedCategory
//     );

//     try {
//       const payload = {
//         categoryId: selectedCategoryObj._id,
//         categoryName: selectedCategoryObj.name || selectedCategoryObj.categoryName,
//         items: validItems, // Use filtered items instead of selectedItems
//       };

//       const res = await axios.post('http://localhost:8080/api/salerequest/create', payload);
//       alert(`Indent saved successfully with ID: ${res.data.indentId}`);
//       setSelectedItems([]);
//       setCurrentPage(1);

//       // Refresh saved indents
//       axios.get('http://localhost:8080/api/salerequest/get')
//         .then(res => setSavedIndents(res.data))
//         .catch(err => console.error("Failed to fetch saved indents", err));
//     } catch (err) {
//       console.error(err);
//       alert("Failed to save indent");
//     }
//   };

//   // Pagination logic for selected items
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = selectedItems.slice(indexOfFirstItem, indexOfLastItem);
//   const totalPages = Math.ceil(selectedItems.length / itemsPerPage);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   // Pagination logic for saved indents
//   const indexOfLastSavedIndent = savedIndentsCurrentPage * savedIndentsPerPage;
//   const indexOfFirstSavedIndent = indexOfLastSavedIndent - savedIndentsPerPage;
//   const currentSavedIndents = savedIndents.slice(indexOfFirstSavedIndent, indexOfLastSavedIndent);
//   const totalSavedIndentsPages = Math.ceil(savedIndents.length / savedIndentsPerPage);

//   const paginateSavedIndents = (pageNumber) => setSavedIndentsCurrentPage(pageNumber);

//   // Pagination component
//   const PaginationComponent = ({ currentPage, totalPages, onPageChange, size = "normal" }) => {
//     if (totalPages <= 1) return null;

//     const pageNumbers = [];
//     const maxVisiblePages = 5;

//     let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
//     let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

//     if (endPage - startPage + 1 < maxVisiblePages) {
//       startPage = Math.max(1, endPage - maxVisiblePages + 1);
//     }

//     for (let i = startPage; i <= endPage; i++) {
//       pageNumbers.push(i);
//     }

//     const buttonClass = size === "small" ? "btn-sm" : "";

//     return (
//       <nav aria-label="Page navigation">
//         <ul className="pagination justify-content-center mb-0">
//           <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
//             <button
//               className={`page-link ${buttonClass}`}
//               onClick={() => onPageChange(currentPage - 1)}
//               disabled={currentPage === 1}
//             >
//               Previous
//             </button>
//           </li>

//           {startPage > 1 && (
//             <>
//               <li className="page-item">
//                 <button className={`page-link ${buttonClass}`} onClick={() => onPageChange(1)}>1</button>
//               </li>
//               {startPage > 2 && <li className="page-item disabled"><span className={`page-link ${buttonClass}`}>...</span></li>}
//             </>
//           )}

//           {pageNumbers.map(number => (
//             <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
//               <button
//                 className={`page-link ${buttonClass}`}
//                 onClick={() => onPageChange(number)}
//               >
//                 {number}
//               </button>
//             </li>
//           ))}

//           {endPage < totalPages && (
//             <>
//               {endPage < totalPages - 1 && <li className="page-item disabled"><span className={`page-link ${buttonClass}`}>...</span></li>}
//               <li className="page-item">
//                 <button className={`page-link ${buttonClass}`} onClick={() => onPageChange(totalPages)}>{totalPages}</button>
//               </li>
//             </>
//           )}

//           <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
//             <button
//               className={`page-link ${buttonClass}`}
//               onClick={() => onPageChange(currentPage + 1)}
//               disabled={currentPage === totalPages}
//             >
//               Next
//             </button>
//           </li>
//         </ul>
//       </nav>
//     );
//   };

//   return (
//     <div className="main-wrapper">

//       <div className="content">
//         {/* Header Section */}
//         <div className="row mb-4">
//           <div className="col-12">
//             <div className="card border-0 shadow-sm">
//               <div className="card-header  text-white">
//                 <h4 className="card-title mb-0">
//                   <i className="fas fa-clipboard-list me-2"></i>
//                   Indent Request - Material Selection
//                 </h4>
//               </div>
//               <div className="card-body">
//                 {/* Purchase Category Dropdown */}
//                 <div className="row">
//                   <div className="col-md-6">
//                     <label className="form-label fw-bold">Select Purchase Category <span className="text-danger">*</span></label>
//                     <select
//                       className="form-select form-select-lg"
//                       value={selectedCategory}
//                       onChange={(e) => setSelectedCategory(e.target.value)}
//                     >
//                       <option value="">-- Select Category --</option>
//                       {categories.map((cat, idx) => (
//                         <option key={idx} value={cat.name || cat.categoryName || cat._id}>
//                           {cat.name || cat.categoryName || `Category ${idx + 1}`}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                   <div className="col-md-6 d-flex align-items-end">
//                     <button onClick={addManualRow} className="btn btn-outline-primary me-2">
//                       <i className="fas fa-plus me-1"></i>Add Manual Entry
//                     </button>
//                     <button
//                       onClick={handleSubmitIndent}
//                       className="btn btn-success"
//                       disabled={!selectedCategory || selectedItems.length === 0}
//                     >
//                       <i className="fas fa-save me-1"></i>Save Indent
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Selected Materials Section */}
//         <div className="row mb-4">
//           <div className="col-12">
//             <div className="card border-0 shadow-sm">
//               <div className="card-header bg-light d-flex justify-content-between align-items-center">
//                 <h5 className="card-title mb-0">
//                   <i className="fas fa-list me-2"></i>
//                   Selected Materials ({selectedItems.length})
//                 </h5>
//                 {selectedItems.length > 0 && (
//                   <small className="text-muted">
//                     Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, selectedItems.length)} of {selectedItems.length}
//                   </small>
//                 )}
//               </div>
//               <div className="card-body p-0">
//                 {selectedItems.length > 0 ? (
//                   <>
//                     <div className="table-responsive" style={{ maxHeight: '400px', overflowY: 'auto' }}>
//                       <table className="table table-hover table-striped mb-0">
//                         <thead className=" sticky-top">
//                           <tr>
//                             <th style={{ width: '60px' }}>S.No</th>
//                             <th style={{ width: '150px' }}>Material No</th>
//                             <th style={{ width: '200px' }}>Description</th>
//                             <th style={{ width: '80px' }}>Qty</th>
//                             <th style={{ width: '100px' }}>Base Unit</th>
//                             <th style={{ width: '130px' }}>Delivery Date</th>
//                             <th style={{ width: '100px' }}>Order Unit</th>
//                             <th style={{ width: '120px' }}>Location</th>
//                             <th style={{ width: '120px' }}>Buyer Group</th>
//                             <th style={{ width: '130px' }}>Material Group</th>
//                             <th style={{ width: '80px' }}>Action</th>
//                           </tr>
//                         </thead>
//                         <tbody>
//                           {currentItems.map((item, idx) => {
//                             const actualIndex = indexOfFirstItem + idx;
//                             return (
//                               <tr key={actualIndex}>
//                                 <td className="text-center fw-bold">{actualIndex + 1}</td>
//                                 <td>
//                                   {item.isManual ? (
//                                     <div className="input-group input-group-sm">
//                                       <input
//                                         className="form-control"
//                                         value={item.materialId}
//                                         onChange={(e) => updateField(actualIndex, 'materialId', e.target.value)}
//                                         placeholder="Material ID"

//                                       />
//                                       <button
//                                         className="btn btn-outline-info"
//                                         onClick={() => openSearchModal(actualIndex)}
//                                         title="Search Material"
//                                       >
//                                         <i className="fas fa-search"></i>
//                                       </button>
//                                     </div>
//                                   ) : (
//                                     <span className="badge ">{item.materialId}</span>
//                                   )}
//                                 </td>
//                                 <td>
//                                   {item.isManual ? (
//                                     <input
//                                       className="form-control form-control-sm"
//                                       value={item.description}
//                                       onChange={(e) => updateField(actualIndex, 'description', e.target.value)}
//                                       placeholder="Description"
//                                       readOnly={item.materialId ? true : false}
//                                     />
//                                   ) : (
//                                     <span title={item.description}>{item.description}</span>
//                                   )}
//                                 </td>
//                                 <td>
//                                   <input
//                                     type="number"
//                                     className="form-control form-control-sm"
//                                     value={item.qty}
//                                     onChange={(e) => updateField(actualIndex, 'qty', e.target.value)}
//                                     min="1"
//                                   />
//                                 </td>
//                                 <td>
//                                   <select
//                                     value={item.baseUnit}
//                                     onChange={(e) => updateField(actualIndex, 'baseUnit', e.target.value)}
//                                     className="form-select form-select-sm"
//                                   >
//                                     <option value="">--Select--</option>
//                                     {baseUnits.map(unit => (
//                                       <option key={unit} value={unit}>{unit}</option>
//                                     ))}
//                                   </select>
//                                 </td>
//                                 <td>
//                                   <input
//                                     type="date"
//                                     className="form-control form-control-sm"
//                                     value={item.deliveryDate}
//                                     onChange={(e) => updateField(actualIndex, 'deliveryDate', e.target.value)}
//                                   />
//                                 </td>
//                                 <td>
//                                   <select
//                                     value={item.orderUnit}
//                                     onChange={(e) => updateField(actualIndex, 'orderUnit', e.target.value)}
//                                     className="form-select form-select-sm"
//                                   >
//                                     <option value="">--Select--</option>
//                                     {baseUnits.map(unit => (
//                                       <option key={unit} value={unit}>{unit}</option>
//                                     ))}
//                                   </select>
//                                 </td>
//                                 <td>
//                                   <input
//                                     className="form-control form-control-sm"
//                                     value={item.location}
//                                     onChange={(e) => updateField(actualIndex, 'location', e.target.value)}
//                                     placeholder="Location"
//                                   />
//                                 </td>
//                                 <td>
//                                   <input
//                                     className="form-control form-control-sm"
//                                     value={item.salesGroup}
//                                     onChange={(e) => updateField(actualIndex, 'salesGroup', e.target.value)}
//                                     placeholder="Buyer Group"
//                                   />
//                                 </td>
//                                 <td>
//                                   <span className="badge bg-secondary">{item.materialgroup || '-'}</span>
//                                 </td>
//                                 <td>
//                                   <button
//                                     className="btn btn-danger btn-sm"
//                                     onClick={() => removeItem(actualIndex)}
//                                     title="Delete Item"
//                                   >
//                                     <i className="fas fa-trash"></i>
//                                   </button>
//                                 </td>
//                               </tr>
//                             );
//                           })}
//                         </tbody>
//                       </table>
//                     </div>

//                     {/* Pagination for Selected Items */}
//                     <div className="card-footer bg-light">
//                       <PaginationComponent
//                         currentPage={currentPage}
//                         totalPages={totalPages}
//                         onPageChange={paginate}
//                         size="small"
//                       />
//                     </div>
//                   </>
//                 ) : (
//                   <div className="text-center py-5">
//                     <i className="fas fa-inbox fa-3x text-muted mb-3"></i>
//                     <p className="text-muted">No materials selected. Click "Add Manual Entry" to start.</p>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Material Search Modal */}
//         {showSearchModal && (
//           <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
//             <div className="modal-dialog modal-xl">
//               <div className="modal-content">
//                 <div className="modal-header bg-primary text-white">
//                   <h5 className="modal-title">
//                     <i className="fas fa-search me-2"></i>Search Materials
//                   </h5>
//                   <button
//                     type="button"
//                     className="btn-close btn-close-white"
//                     onClick={closeSearchModal}
//                   ></button>
//                 </div>
//                 <div className="modal-body">
//                   {/* Search Controls */}
//                   <div className="row mb-3">
//                     <div className="col-md-3">
//                       <label className="form-label">Search Type</label>
//                       <select
//                         className="form-select"
//                         value={searchType}
//                         onChange={(e) => setSearchType(e.target.value)}
//                       >
//                         <option value="materialId">Material ID</option>
//                         <option value="description">Description</option>
//                       </select>
//                     </div>
//                     <div className="col-md-6">
//                       <label className="form-label">Search Query</label>
//                       <div className="input-group">
//                         <span className="input-group-text">
//                           <i className="fas fa-search"></i>
//                         </span>
//                         <input
//                           type="text"
//                           className="form-control"
//                           placeholder={
//                             searchType === 'materialId'
//                               ? 'Enter Material ID (e.g., MMNR-100000 or 100000)'
//                               : 'Search by Description...'
//                           }
//                           value={searchQuery}
//                           onChange={handleSearchInputChange}
//                         />
//                       </div>
//                     </div>
//                     <div className="col-md-3">
//                       <label className="form-label">&nbsp;</label>
//                       <div className="d-flex gap-2">
//                         <button className="btn btn-info" onClick={handleViewAll}>
//                           <i className="fas fa-list me-1"></i>View All
//                         </button>
//                         {searchResults.length > 0 && (
//                           <button className="btn btn-outline-secondary" onClick={handleClearResults}>
//                             <i className="fas fa-times me-1"></i>Clear
//                           </button>
//                         )}
//                       </div>
//                     </div>
//                   </div>

//                   {/* Search Results */}
//                   <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
//                     {searchResults.length > 0 ? (
//                       <table className="table table-hover">
//                         <thead className="table-light sticky-top">
//                           <tr>
//                             <th>Material ID</th>
//                             <th>Description</th>
//                             <th>Base Unit</th>
//                             <th>Location</th>
//                             <th>Material Group</th>
//                             <th>Action</th>
//                           </tr>
//                         </thead>
//                         <tbody>
//                           {searchResults.map((material, idx) => (
//                             <tr key={idx}>
//                               <td><span className="badge ">{material.materialId}</span></td>
//                               <td>{material.description}</td>
//                               <td><span className="badge bg-secondary">{material.baseUnit}</span></td>
//                               <td>{material.location}</td>
//                               <td><span className="badge bg-info">{material.materialgroup}</span></td>
//                               <td>
//                                 <button
//                                   className="btn btn-success btn-sm"
//                                   onClick={() => selectMaterialFromSearch(material)}
//                                 >
//                                   <i className="fas fa-check me-1"></i>Select
//                                 </button>
//                               </td>
//                             </tr>
//                           ))}
//                         </tbody>
//                       </table>
//                     ) : (
//                       <div className="text-center py-4">
//                         <i className="fas fa-search fa-3x text-muted mb-3"></i>
//                         <p className="text-muted">
//                           {materials.length === 0
//                             ? 'No materials loaded from API'
//                             : searchQuery
//                               ? `No materials found matching "${searchQuery}"`
//                               : 'Enter search term or click "View All"'
//                           }
//                         </p>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//                 <div className="modal-footer">
//                   <button
//                     type="button"
//                     className="btn btn-secondary"
//                     onClick={closeSearchModal}
//                   >
//                     <i className="fas fa-times me-1"></i>Close
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Saved Indents Section */}
//         {/* <div className="row">
//               <div className="col-12">
//                 <div className="card border-0 shadow-sm">
//                   <div className="card-header  text-white d-flex justify-content-between align-items-center">
//                     <h5 className="card-title mb-0">
//                       <i className="fas fa-archive me-2"></i>
//                       All Saved Indents ({savedIndents.length})
//                     </h5>
//                     {savedIndents.length > 0 && (
//                       <small>
//                         Showing {indexOfFirstSavedIndent + 1}-{Math.min(indexOfLastSavedIndent, savedIndents.length)} of {savedIndents.length}
//                       </small>
//                     )}
//                   </div>
//                   <div className="card-body">
//                     {currentSavedIndents.length > 0 ? (
//                       <>
//                         {currentSavedIndents.map((indent, idx) => {
//                           const actualIndex = indexOfFirstSavedIndent + idx;
//                           return (
//                             <div key={indent._id} className="card mb-3 border">
//                               <div className="card-header bg-light d-flex justify-content-between align-items-center">
//                                 <h6 className="mb-0">
//                                   <span className="badge bg-primary me-2">#{actualIndex + 1}</span>
//                                   Indent ID: <strong>{indent.indentId}</strong>
//                                 </h6>
//                                 <button 
//                                   className="btn btn-outline-primary btn-sm" 
//                                   onClick={() => handlePrintSingle(indent._id)}
//                                 >
//                                   <i className="fas fa-print me-1"></i>Print
//                                 </button>
//                               </div>

//                               <div className="card-body">
//                                 <div id={`print-indent-${indent._id}`}>
//                                   <div className="mb-3">
//                                     <strong>Category:</strong> 
//                                     <span className="badge bg-info ms-2">{indent.categoryName}</span>
//                                   </div>
                                  
//                                   <div className="table-responsive">
//                                     <table className="table table-bordered table-sm">
//                                       <thead className="table-light">
//                                         <tr>
//                                           <th style={{ width: '50px' }}>S.No</th>
//                                           <th>Material ID</th>
//                                           <th>Description</th>
//                                           <th style={{ width: '70px' }}>Qty</th>
//                                           <th style={{ width: '90px' }}>Base Unit</th>
//                                           <th style={{ width: '90px' }}>Order Unit</th>
//                                           <th style={{ width: '120px' }}>Delivery Date</th>
//                                           <th>Location</th>
//                                           <th>Buyer Group</th>
//                                           <th>Material Group</th>
//                                         </tr>
//                                       </thead>
//                                       <tbody>
//                                         {indent.items.map((item, i) => (
//                                           <tr key={i}>
//                                             <td className="text-center">{i + 1}</td>
//                                             <td><span className="badge text-dark">{item.materialId}</span></td>
//                                             <td>{item.description}</td>
//                                             <td className="text-center"><strong>{item.qty}</strong></td>
//                                             <td><span className="badge bg-secondary">{item.baseUnit}</span></td>
//                                             <td><span className="badge bg-secondary">{item.orderUnit}</span></td>
//                                               <td><span className="badge bg-secondary">{item.orderUnit}</span></td>
//                                             <td>{item.deliveryDate}</td>
//                                             <td>{item.location}</td>
//                                             <td>{item.salesGroup}</td>
//                                             <td><span className="badge bg-info">{item.materialgroup || '-'}</span></td>
//                                           </tr>
//                                         ))}
//                                       </tbody>
//                                     </table>
//                                   </div>
//                                 </div>
//                               </div>
//                             </div>
//                           );
//                         })}
                        
                      
//                         <div className="d-flex justify-content-center mt-3">
//                           <PaginationComponent 
//                             currentPage={savedIndentsCurrentPage}
//                             totalPages={totalSavedIndentsPages}
//                             onPageChange={paginateSavedIndents}
//                           />
//                         </div>
//                       </>
//                     ) : (
//                       <div className="text-center py-5">
//                         <i className="fas fa-folder-open fa-3x text-muted mb-3"></i>
//                         <p className="text-muted">No saved indents found.</p>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div> */}

//       </div>
//     </div>

//   );
// };

// export default Salesrequest;

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const baseUnits = ['Piece', 'Box', 'Kg', 'Ltr'];

const Salesrequest = () => {
  const [materials, setMaterials] = useState([]);
  const [selectedMaterial, setSelectedMaterial] = useState(null);

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [commonLocation, setCommonLocation] = useState('');
const [commonsalesGroup, setCommonsalesGroup] = useState('');
const [documentDate, setDocumentDate] = useState(new Date().toISOString().split('T')[0]);


  // Initialize selectedItems with 4 default manual rows
  const [selectedItems, setSelectedItems] = useState([
    {
      materialId: '',
      description: '',
      baseUnit: '',
      orderUnit: '',
   
      materialgroup: '',
      qty: '',
      deliveryDate: '',
     
      isManual: true,
    },
    {
      materialId: '',
      description: '',
      baseUnit: '',
      orderUnit: '',
      location: '',
      materialgroup: '',
      qty: '',
      deliveryDate: '',
      salesGroup: '',
      isManual: true,
    },
    {
      materialId: '',
      description: '',
      baseUnit: '',
      orderUnit: '',
      location: '',
      materialgroup: '',
      qty: '',
      deliveryDate: '',
      salesGroup: '',
      isManual: true,
    },
    {
      materialId: '',
      description: '',
      baseUnit: '',
      orderUnit: '',
      location: '',
      materialgroup: '',
      qty: '',
      deliveryDate: '',
      salesGroup: '',
      isManual: true,
    }
  ]);
  // Modal states
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchType, setSearchType] = useState('materialId');
  const [currentEditIndex, setCurrentEditIndex] = useState(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [savedIndentsCurrentPage, setSavedIndentsCurrentPage] = useState(1);
  const [savedIndentsPerPage] = useState(3);

  // Material ID prefix
  const MATERIAL_PREFIX = 'MMNR-';

  // Fetch materials
  // useEffect(() => {
  //   axios.get('http://localhost:8080/api/material')
  //     .then(res => {
  //       console.log('Materials fetched:', res.data);
  //       setMaterials(res.data);
  //     })
  //     .catch(err => console.error(err));
  // }, []);
  useEffect(() => {
  axios.get('http://localhost:8080/api/material')
    .then(res => {
      const filteredMaterials = res.data.filter(
        (material) => !material.isDeleted && !material.isBlocked
      );
      console.log('Filtered materials:', filteredMaterials);
      setMaterials(filteredMaterials);
    })
    .catch(err => console.error(err));
}, []);


  // Fetch purchase categories
  useEffect(() => {
    axios.get('http://localhost:8080/api/salecategory')
      .then(res => setCategories(res.data))
      .catch(err => console.error(err));
  }, []);

  // Handle material selection
  const handleMaterialSelect = (mat) => {
    setSelectedMaterial(mat);
    setSelectedItems(prev => [...prev, {
      ...mat,
      qty: 1,
      deliveryDate: '',
      salesGroup: '',
      isManual: false,
    }]);
  };

  const addManualRow = () => {
    setSelectedItems(prev => [...prev, {
      materialId: '',
      description: '',
      baseUnit: '',
      orderUnit: '',
      location: '',
      materialgroup: '',
      qty: '',
      deliveryDate: '',
      salesGroup: '',
      isManual: true,
    }]);
  };

  const removeItem = (index) => {
    setSelectedItems(prev => prev.filter((_, i) => i !== index));
    // Reset pagination if needed
    const totalPages = Math.ceil((selectedItems.length - 1) / itemsPerPage);
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  };

  const updateField = async (index, field, value) => {
    const updated = [...selectedItems];
    updated[index][field] = value;

    if (field === 'materialId' && updated[index].isManual) {
      try {
        const res = await axios.get(`http://localhost:8080/api/material/byId/${value}`);
        const mat = res.data;
        if (mat) {
          updated[index] = {
            ...updated[index],
            materialId: mat.materialId,
            description: mat.description,
            baseUnit: mat.baseUnit,
            orderUnit: mat.orderUnit,
            location: mat.location,
            materialgroup: mat.materialgroup,
            isManual: true,
          };
        }
      } catch (err) {
        console.error('Material ID not found:', value);
      }
    }

    setSelectedItems(updated);
  };

  // Search functionality
  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    console.log('Searching with query:', searchQuery, 'Type:', searchType);
    console.log('Available materials:', materials);

    if (searchType === 'materialId') {
      let searchTerm = searchQuery;

      if (/^\d+$/.test(searchQuery)) {
        searchTerm = MATERIAL_PREFIX + searchQuery;
      }

      const filtered = materials.filter(material => {
        const materialId = material.materialId || '';
        return materialId.toLowerCase().includes(searchTerm.toLowerCase());
      });

      console.log('Filtered results for materialId:', filtered);
      setSearchResults(filtered);
    } else {
      const filtered = materials.filter(material => {
        const description = material.description || '';
        return description.toLowerCase().includes(searchQuery.toLowerCase());
      });

      console.log('Filtered results for description:', filtered);
      setSearchResults(filtered);
    }
  };

  // Auto-search when query changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery.trim()) {
        handleSearch();
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, searchType, materials]);

  const handleSearchInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
  };

  const handleViewAll = () => {
    setSearchResults(materials);
    setSearchQuery('');
  };

  const handleClearResults = () => {
    setSearchResults([]);
    setSearchQuery('');
  };

  const openSearchModal = (index) => {
    setCurrentEditIndex(index);
    setShowSearchModal(true);
    setSearchQuery('');
    setSearchResults([]);
  };

  const closeSearchModal = () => {
    setShowSearchModal(false);
    setCurrentEditIndex(null);
    setSearchQuery('');
    setSearchResults([]);
  };

  const selectMaterialFromSearch = (material) => {
    if (currentEditIndex !== null) {
      const updated = [...selectedItems];
      updated[currentEditIndex] = {
        ...updated[currentEditIndex],
        materialId: material.materialId,
        description: material.description,
        baseUnit: material.baseUnit,
        orderUnit: material.orderUnit,
        location: material.location,
        materialgroup: material.materialgroup,
        isManual: true,
      };
      setSelectedItems(updated);
    }
    closeSearchModal();
  };

  const [savedIndents, setSavedIndents] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:/api/salerequest/get')
      .then(res => setSavedIndents(res.data))
      .catch(err => console.error("Failed to fetch saved indents", err));
  }, []);

  const handlePrintSingle = (id) => {
    const printContent = document.getElementById(`print-indent-${id}`).innerHTML;
    const win = window.open('', '', 'width=900,height=700');
    win.document.write("<html><head><title>Indent Print</title><style>");
    win.document.write('table { border-collapse: collapse; width: 100%; }');
    win.document.write('th, td { border: 1px solid #000; padding: 8px; text-align: left; }');
    win.document.write('th { background-color: #f5f5f5; }');
    win.document.write('</style></head><body>');
    win.document.write(printContent);
    win.document.write('</body></html>');
    win.document.close();
    win.print();
  };

  //   const handleSubmitIndent = async () => {
  //     if (!selectedCategory) {
  //       alert("Please select a purchase category");
  //       return;
  //     }

  //     const selectedCategoryObj = categories.find(cat =>
  //       cat.name === selectedCategory || cat.categoryName === selectedCategory || cat._id === selectedCategory
  //     );

  //     try {
  //       const payload = {
  //         categoryId: selectedCategoryObj._id,
  //         categoryName: selectedCategoryObj.name || selectedCategoryObj.categoryName,
  //         items: selectedItems,
  //       };

  //       const res = await axios.post('http://localhost:8080/api/indent/create', payload);
  //       alert(`Indent saved successfully with ID: ${res.data.indentId}`);
  //       setSelectedItems([]);
  //       setCurrentPage(1);

  //       // Refresh saved indents
  //       axios.get('http://localhost:8080/api/indent/get')
  //         .then(res => setSavedIndents(res.data))
  //         .catch(err => console.error("Failed to fetch saved indents", err));
  //     } catch (err) {
  //       console.error(err);
  //       alert("Failed to save indent");
  //     }
  //   };

  // Pagination logic for selected items

const handleSubmitIndent = async () => {
  if (!selectedCategory) {
    alert("Please select a purchase category");
    return;
  }
  
  if (!commonLocation || !commonsalesGroup) {
    alert("Please fill in Location and Buyer Group");
    return;
  }

  // Filter out empty/null rows before submitting
  const validItems = selectedItems.filter(item => {
    return item.materialId && item.materialId.trim() !== '' &&
      item.description && item.description.trim() !== '' &&
      item.qty && item.qty > 0;
  });

  if (validItems.length === 0) {
    alert("Please add at least one valid item with Material ID, Description, and Quantity");
    return;
  }

  const selectedCategoryObj = categories.find(cat =>
    cat.name === selectedCategory || cat.categoryName === selectedCategory || cat._id === selectedCategory
  );

  try {
    const payload = {
      categoryId: selectedCategoryObj._id,
      categoryName: selectedCategoryObj.name || selectedCategoryObj.categoryName,
      location: commonLocation,
      salesGroup: commonsalesGroup,
      documentDate: documentDate,
      items: validItems,
    };

    const res = await axios.post('http://localhost:8080/api/salerequest/create', payload);
    alert(`Indent saved successfully with ID: ${res.data.indentId}`);
    
    // Reset form
    setSelectedItems([]);
    setCommonLocation('');
    setCommonsalesGroup('');
    setDocumentDate(new Date().toISOString().split('T')[0]);
    setCurrentPage(1);

    // Refresh saved indents
    axios.get('http://localhost:8080/api/salerequest/get')
      .then(res => setSavedIndents(res.data))
      .catch(err => console.error("Failed to fetch saved indents", err));
  } catch (err) {
    console.error(err);
    alert("Failed to save indent");
  }
};

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = selectedItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(selectedItems.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Pagination logic for saved indents
  const indexOfLastSavedIndent = savedIndentsCurrentPage * savedIndentsPerPage;
  const indexOfFirstSavedIndent = indexOfLastSavedIndent - savedIndentsPerPage;
  const currentSavedIndents = savedIndents.slice(indexOfFirstSavedIndent, indexOfLastSavedIndent);
  const totalSavedIndentsPages = Math.ceil(savedIndents.length / savedIndentsPerPage);

  const paginateSavedIndents = (pageNumber) => setSavedIndentsCurrentPage(pageNumber);

  // Pagination component
  const PaginationComponent = ({ currentPage, totalPages, onPageChange, size = "normal" }) => {
    if (totalPages <= 1) return null;

    const pageNumbers = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    const buttonClass = size === "small" ? "btn-sm" : "";

    return (
      <nav aria-label="Page navigation">
        <ul className="pagination justify-content-center mb-0">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button
              className={`page-link ${buttonClass}`}
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
          </li>

          {startPage > 1 && (
            <>
              <li className="page-item">
                <button className={`page-link ${buttonClass}`} onClick={() => onPageChange(1)}>1</button>
              </li>
              {startPage > 2 && <li className="page-item disabled"><span className={`page-link ${buttonClass}`}>...</span></li>}
            </>
          )}

          {pageNumbers.map(number => (
            <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
              <button
                className={`page-link ${buttonClass}`}
                onClick={() => onPageChange(number)}
              >
                {number}
              </button>
            </li>
          ))}

          {endPage < totalPages && (
            <>
              {endPage < totalPages - 1 && <li className="page-item disabled"><span className={`page-link ${buttonClass}`}>...</span></li>}
              <li className="page-item">
                <button className={`page-link ${buttonClass}`} onClick={() => onPageChange(totalPages)}>{totalPages}</button>
              </li>
            </>
          )}

          <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
            <button
              className={`page-link ${buttonClass}`}
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    );
  };

  return (
    <div className="main-wrapper">
      <div className="content">
        {/* Header Section */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="card border-0 shadow-sm">
              <div className="card-header  text-white">
                <h4 className="card-title mb-0">
                  <i className="fas fa-clipboard-list me-2"></i>
                  Indent Request - Material Selection
                </h4>
              </div>
              <div className="card-body">
                {/* Purchase Category Dropdown */}
                <div className="row">
                 
                  <div className="card-body">
  <div className="row">
    <div className="col-md-4">
      <label className="form-label fw-bold">Select Purchase Category <span className="text-danger">*</span></label>
      <select
        className="form-select form-select-lg"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="">-- Select Category --</option>
        {categories.map((cat, idx) => (
          <option key={idx} value={cat.name || cat.categoryName || cat._id}>
            {cat.name || cat.categoryName || `Category ${idx + 1}`}
          </option>
        ))}
      </select>
    </div>
    <div className="col-md-3">
      <label className="form-label fw-bold">Doc Date <span className="text-danger">*</span></label>
      <input
        type="date"
        className="form-control form-control-lg"
        value={documentDate}
        onChange={(e) => setDocumentDate(e.target.value)}
      />
    </div>
    <div className="col-md-3">
      <label className="form-label fw-bold">Location <span className="text-danger">*</span></label>
      <input
        type="text"
        className="form-control form-control-lg"
        value={commonLocation}
        onChange={(e) => setCommonLocation(e.target.value)}
        placeholder="Enter Location"
      />
    </div>
    <div className="col-md-2">
      <label className="form-label fw-bold">Sales Group <span className="text-danger">*</span></label>
      <input
        type="text"
        className="form-control form-control-lg"
        value={commonsalesGroup}
        onChange={(e) => setCommonsalesGroup(e.target.value)}
        placeholder="Buyer Group"
      />
    </div>
  </div>

</div>

                 
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Selected Materials Section */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="card border-0 shadow-sm">
              <div className="card-header bg-light d-flex justify-content-between align-items-center">
                <h5 className="card-title mb-0">
                  <i className="fas fa-list me-2"></i>
                  Selected Materials ({selectedItems.length})
                </h5>
                {selectedItems.length > 0 && (
                  <small className="text-muted">
                    Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, selectedItems.length)} of {selectedItems.length}
                  </small>
                )}
              </div>
              <div className="card-body p-0">
                {selectedItems.length > 0 ? (
                  <>
                    <div className="table-responsive" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                      <table className="table table-hover table-striped mb-0">
                        <thead className=" sticky-top">
                          <tr>
                            <th style={{ width: '60px' }}>S.No</th>
                            <th style={{ width: '150px' }}>Material No</th>
                            <th style={{ width: '200px' }}>Description</th>
                            <th style={{ width: '80px' }}>Qty</th>
                            <th style={{ width: '100px' }}>Base Unit</th>
                            <th style={{ width: '130px' }}>Delivery Date</th>
                            <th style={{ width: '100px' }}>Order Unit</th>
                           
                            
                            <th style={{ width: '130px' }}>Material Group</th>
                            <th style={{ width: '80px' }}>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentItems.map((item, idx) => {
                            const actualIndex = indexOfFirstItem + idx;
                            return (
                              <tr key={actualIndex}>
                                <td className="text-center fw-bold">{actualIndex + 1}</td>
                                <td>
                                  {item.isManual ? (
                                    <div className="input-group input-group-sm">
                                      <input
                                        className="form-control"
                                        value={item.materialId}
                                        onChange={(e) => updateField(actualIndex, 'materialId', e.target.value)}
                                        placeholder="Material ID"

                                      />
                                      <button
                                        className="btn btn-outline-info"
                                        onClick={() => openSearchModal(actualIndex)}
                                        title="Search Material"
                                      >
                                        <i className="fas fa-search"></i>
                                      </button>
                                    </div>
                                  ) : (
                                    <span className="badge ">{item.materialId}</span>
                                  )}
                                </td>
                                <td>
                                  {item.isManual ? (
                                    <input
                                      className="form-control form-control-sm"
                                      value={item.description}
                                      onChange={(e) => updateField(actualIndex, 'description', e.target.value)}
                                      placeholder="Description"
                                      readOnly={item.materialId ? true : false}
                                    />
                                  ) : (
                                    <span title={item.description}>{item.description}</span>
                                  )}
                                </td>
                                <td>
                                  <input
                                    type="number"
                                    className="form-control form-control-sm"
                                    value={item.qty}
                                    onChange={(e) => updateField(actualIndex, 'qty', e.target.value)}
                                    min="1"
                                  />
                                </td>
                                <td>
                                  <select
                                    value={item.baseUnit}
                                    onChange={(e) => updateField(actualIndex, 'baseUnit', e.target.value)}
                                    className="form-select form-select-sm"
                                  >
                                    <option value="">--Select--</option>
                                    {baseUnits.map(unit => (
                                      <option key={unit} value={unit}>{unit}</option>
                                    ))}
                                  </select>
                                </td>
                                <td>
                                  <input
                                    type="date"
                                    className="form-control form-control-sm"
                                    value={item.deliveryDate}
                                    onChange={(e) => updateField(actualIndex, 'deliveryDate', e.target.value)}
                                  />
                                </td>
                                <td>
                                  <select
                                    value={item.orderUnit}
                                    onChange={(e) => updateField(actualIndex, 'orderUnit', e.target.value)}
                                    className="form-select form-select-sm"
                                  >
                                    <option value="">--Select--</option>
                                    {baseUnits.map(unit => (
                                      <option key={unit} value={unit}>{unit}</option>
                                    ))}
                                  </select>
                                </td>
                                
                               
                                <td>
                                  <span className="badge bg-secondary">{item.materialgroup || '-'}</span>
                                </td>
                                <td>
                                  <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => removeItem(actualIndex)}
                                    title="Delete Item"
                                  >
                                    <i className="fas fa-trash"></i>
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>

                    {/* Pagination for Selected Items */}
                    <div className="card-footer bg-light">
                      <PaginationComponent
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={paginate}
                        size="small"
                      />
                    </div>
                  </>
                ) : (
                  <div className="text-center py-5">
                    <i className="fas fa-inbox fa-3x text-muted mb-3"></i>
                    <p className="text-muted">No materials selected. Click "Add Manual Entry" to start.</p>
                  </div>
                )}
              </div>
               <div className="col-md-6 d-flex align-items-end">
                    <button onClick={addManualRow} className="btn btn-outline-primary me-2">
                      <i className="fas fa-plus me-1"></i>Add Manual Entry
                    </button>
                    <button
                      onClick={handleSubmitIndent}
                      className="btn btn-success"
                      disabled={!selectedCategory || selectedItems.length === 0}
                    >
                      <i className="fas fa-save me-1"></i>Save Indent
                    </button>
                  </div>
            </div>
          </div>
        </div>

        {/* Material Search Modal */}
        {showSearchModal && (
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
                    onClick={closeSearchModal}
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
                              ? 'Enter Material ID (e.g., MMNR-100000 or 100000)'
                              : 'Search by Description...'
                          }
                          value={searchQuery}
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
                            <th>Location</th>
                            <th>Material Group</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {searchResults.map((material, idx) => (
                            <tr key={idx}>
                              <td><span className="badge ">{material.materialId}</span></td>
                              <td>{material.description}</td>
                              <td><span className="badge bg-secondary">{material.baseUnit}</span></td>
                              <td>{material.location}</td>
                              <td><span className="badge bg-info">{material.materialgroup}</span></td>
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
                            : searchQuery
                              ? `No materials found matching "${searchQuery}"`
                              : 'Enter search term or click "View All"'
                          }
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={closeSearchModal}
                  >
                    <i className="fas fa-times me-1"></i>Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Saved Indents Section */}


      </div>
    </div>
  );
};

export default Salesrequest;