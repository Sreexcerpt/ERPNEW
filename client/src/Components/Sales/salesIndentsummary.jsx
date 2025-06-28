import React, { useEffect, useState } from 'react';
import axios from 'axios';
const SalesIndentsummary = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [savedIndentsCurrentPage, setSavedIndentsCurrentPage] = useState(1);
    const [savedIndentsPerPage] = useState(3);
    const [savedIndents, setSavedIndents] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:8080/api/salerequest/get')
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

                <div className="row">
                    <div className="col-12">
                        <div className="card border-0 shadow-sm">
                            <div className="card-header  text-white d-flex justify-content-between align-items-center">
                                <h5 className="card-title mb-0">
                                    <i className="fas fa-archive me-2"></i>
                                    All Saved Indents ({savedIndents.length})
                                </h5>
                                {savedIndents.length > 0 && (
                                    <small>
                                        Showing {indexOfFirstSavedIndent + 1}-{Math.min(indexOfLastSavedIndent, savedIndents.length)} of {savedIndents.length}
                                    </small>
                                )}
                            </div>
                            <div className="card-body">
                                {currentSavedIndents.length > 0 ? (
                                    <>
                                        {currentSavedIndents.map((indent, idx) => {
                                            const actualIndex = indexOfFirstSavedIndent + idx;
                                            return (
                                                <div key={indent._id} className="card mb-3 border">
                                                    <div className="card-header bg-light d-flex justify-content-between align-items-center">
                                                        <h6 className="mb-0">
                                                            <span className="badge bg-primary me-2">#{actualIndex + 1}</span>
                                                            Indent ID: <strong>{indent.indentId}</strong>
                                                        </h6>
                                                        <button
                                                            className="btn btn-outline-primary btn-sm"
                                                            onClick={() => handlePrintSingle(indent._id)}
                                                        >
                                                            <i className="fas fa-print me-1"></i>Print
                                                        </button>
                                                    </div>

                                                    <div className="card-body">
                                                        <div id={`print-indent-${indent._id}`}>
                                                            <div className="mb-3">
                                                                <strong>Category:</strong>
                                                                <span className="badge bg-info ms-2">{indent.categoryName}</span>
                                                            </div>

                                                            <div className="table-responsive">
                                                                <table className="table table-bordered table-sm">
                                                                    <thead className="table-light">
                                                                        <tr>
                                                                            <th style={{ width: '50px' }}>S.No</th>
                                                                            <th>Material ID</th>
                                                                            <th>Description</th>
                                                                            <th style={{ width: '70px' }}>Qty</th>
                                                                            <th style={{ width: '90px' }}>Base Unit</th>
                                                                            <th style={{ width: '90px' }}>Order Unit</th>
                                                                            <th style={{ width: '120px' }}>Delivery Date</th>
                                                                            <th>Location</th>
                                                                            <th>Buyer Group</th>
                                                                            <th>Material Group</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {indent.items.map((item, i) => (
                                                                            <tr key={i}>
                                                                                <td className="text-center">{i + 1}</td>
                                                                                <td><span className="badge text-dark">{item.materialId}</span></td>
                                                                                <td>{item.description}</td>
                                                                                <td className="text-center"><strong>{item.qty}</strong></td>
                                                                                <td><span className="badge bg-secondary">{item.baseUnit}</span></td>
                                                                                <td><span className="badge bg-secondary">{item.orderUnit}</span></td>
                                                                                <td><span className="badge bg-secondary">{item.orderUnit}</span></td>
                                                                                <td>{item.deliveryDate}</td>
                                                                                <td>{item.location}</td>
                                                                                <td>{item.salesGroup}</td>
                                                                                <td><span className="badge bg-info">{item.materialgroup || '-'}</span></td>
                                                                            </tr>
                                                                        ))}
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}

                                        {/* Pagination for Saved Indents */}
                                        <div className="d-flex justify-content-center mt-3">
                                            <PaginationComponent
                                                currentPage={savedIndentsCurrentPage}
                                                totalPages={totalSavedIndentsPages}
                                                onPageChange={paginateSavedIndents}
                                            />
                                        </div>
                                    </>
                                ) : (
                                    <div className="text-center py-5">
                                        <i className="fas fa-folder-open fa-3x text-muted mb-3"></i>
                                        <p className="text-muted">No saved indents found.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default SalesIndentsummary;