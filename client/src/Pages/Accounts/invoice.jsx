// import { React } from "react";

// function Invoice() {
//     const today = new Date().toISOString().split('T')[0];
//     return (
//         <>
//             <div className="content">
//                 <div>
//                     <h6>Invoice</h6>
//                 </div>
//                 <div className="card">
//                     <div className="card-header">
//                         <div className="row mb-2">
//                             <div className="col-xl-2"> <label htmlFor="category">
//                                 Category
//                             </label>
//                                 <select name="category" id=""
//                                     className="form-select"
//                                 >
//                                     <option value="">Select</option>
//                                     <option value="invoice">Invoice</option>
//                                     <option value="display">Display</option>
//                                     <option value="credit">Credit</option>
//                                     <option value="Cancel">Cancel</option>
//                                 </select>
//                             </div>
//                             <div className="col-xl-2">
//                                 <label htmlFor="catdesc">Description</label>
//                                 <input type="text" name="catdesc" className="form-control" id="" />
//                             </div>
//                             <div className="col-xl-2">
//                                 <label htmlFor="PO">Purchase Order</label>
//                                 <input type="search" name="po" id="" className="form-control" />
//                             </div>
//                             <div className="col-xl-2">
//                                 <label htmlFor="docnumber">Document Number</label>
//                                 <input type="text" name="docnumber" className="form-control" id="" />
//                             </div>
//                             <div className="col-xl-2">
//                                 <label htmlFor="location">Location</label>
//                                 <input type="text" name="location" className="form-control" id="" />
//                             </div>
//                         </div>
//                         <div className="row mb-2">
//                             <div className="col-xl-2">
//                                 <label htmlFor="docdate">Document Date</label>
//                                 <input type="date" name="docdate" id="" defaultValue={today} className="form-control" />
//                             </div>
//                             <div className="col-xl-2"> <label htmlFor="posdate">Posting Date</label>
//                                 <input type="date" name="posdate" id="" defaultValue={today} className="form-control" /></div>
//                             <div className="col-xl-2">
//                                 <label htmlFor="ref">INV REF</label>
//                                 <input type="text" name="ref" className="form-control" id="" />
//                             </div>
//                             <div className="col-xl-2">
//                                 <label htmlFor="vendor">Party</label>
//                                 <input type="text" name="vendor" className="form-control" id="" />
//                             </div>
//                             <div className="col-xl-2">
//                                 <label htmlFor="taxcode">Tax code</label>
//                                 <input type="text" name="taxcode" className="form-control" id="" />
//                             </div>
//                             <div className="col-xl-2">
//                                 <label htmlFor="paymentterms">Payment Terms</label>
//                                 <input type="text" name="paymentterms" className="form-control" id="" />
//                             </div>


//                         </div>
//                     </div>
//                     <div className="card-body">
//                         <table className="table table-bordered">
//                             <thead>
//                                 <tr>
//                                     <th>#</th>
//                                     <th style={{ color: "black" }}>Mat No</th>
//                                     <th style={{ color: "black" }}>Mat desc</th>
//                                     <th style={{ color: "black" }}>QTY</th>
//                                     <th style={{ color: "black" }}>UOM</th>
//                                     <th style={{ color: "black" }}>Price</th>
//                                     <th style={{ color: "black" }}>Unit</th>
//                                     <th style={{ color: "black" }}>Text</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 <tr>
//                                     <td>1</td>
//                                     <td><input type="text" name="matno" className="form-control " id="" /></td>
//                                     <td><input type="text" name="matdesc" className="form-control" id="" /></td>
//                                     <td><input type="number" name="matqty" className="form-control" id="" /></td>
//                                     <td><input type="number" name="uom" className="form-control" id="" /></td>
//                                     <td><input type="number" name="price" className="form-control" id="" /></td>
//                                     <td><input type="text" name="unit" className="form-control" id="" /></td>
//                                     <td><input type="text" name="text" className="form-control" id="" /></td>
//                                 </tr>
//                                 <tr>
//                                     <td>2</td>
//                                     <td><input type="text" name="matno" className="form-control " id="" /></td>
//                                     <td><input type="text" name="matdesc" className="form-control" id="" /></td>
//                                     <td><input type="number" name="matqty" className="form-control" id="" /></td>
//                                     <td><input type="number" name="uom" className="form-control" id="" /></td>
//                                     <td><input type="number" name="price" className="form-control" id="" /></td>
//                                     <td><input type="text" name="unit" className="form-control" id="" /></td>
//                                     <td><input type="text" name="text" className="form-control" id="" /></td>
//                                 </tr>
//                                 <tr>
//                                     <td>3</td>
//                                     <td><input type="text" name="matno" className="form-control " id="" /></td>
//                                     <td><input type="text" name="matdesc" className="form-control" id="" /></td>
//                                     <td><input type="number" name="matqty" className="form-control" id="" /></td>
//                                     <td><input type="number" name="uom" className="form-control" id="" /></td>
//                                     <td><input type="number" name="price" className="form-control" id="" /></td>
//                                     <td><input type="text" name="unit" className="form-control" id="" /></td>
//                                     <td><input type="text" name="text" className="form-control" id="" /></td>
//                                 </tr>
//                                 <tr>
//                                     <td>4</td>
//                                     <td><input type="text" name="matno" className="form-control " id="" /></td>
//                                     <td><input type="text" name="matdesc" className="form-control" id="" /></td>
//                                     <td><input type="number" name="matqty" className="form-control" id="" /></td>
//                                     <td><input type="number" name="uom" className="form-control" id="" /></td>
//                                     <td><input type="number" name="price" className="form-control" id="" /></td>
//                                     <td><input type="text" name="unit" className="form-control" id="" /></td>
//                                     <td><input type="text" name="text" className="form-control" id="" /></td>
//                                 </tr>
//                             </tbody>
//                         </table>
//                     </div>
//                     <div className="card-footer">
//                         <div className="row flex-column ">
//                             <div className="col-xl-1 ms-auto">
//                                 <label htmlFor="subtotal">Subtotal</label>
//                                 <input type="text" disabled className="form-control" />
//                             </div>
//                             <div className="col-xl-1 ms-auto">
//                                 <label htmlFor="cgst">CGST</label>
//                                 <input type="text" disabled className="form-control" />
//                             </div>
//                             <div className="col-xl-1 ms-auto" >
//                                 <label htmlFor="sgst">SGST</label>
//                                 <input type="text" disabled className="form-control" />
//                             </div>
//                             <div className="col-xl-1 ms-auto">
//                                 <label htmlFor="igst">IGST</label>
//                                 <input type="text" disabled className="form-control" />
//                             </div>
//                             <div className="col-xl-1 ms-auto">
//                                 <label htmlFor="discount">Discount</label>
//                                 <input type="text" className="form-control" />
//                             </div>
//                             <div className="col-xl-1 ms-auto">
//                                 <label htmlFor="total">Total</label>
//                                 <input type="text" disabled className="form-control" />
//                             </div>
//                         </div>
//                         <input type="submit" value="Submit" className="btn btn-success mt-2" />
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }
// export default Invoice;


import React, { useState, useEffect } from "react";

function Invoice() {
    const today = new Date().toISOString().split("T")[0];
    const [submittedInvoices, setSubmittedInvoices] = useState([]);
    const generateInvoiceNumber = (index) => {
        return `INV${(index + 1).toString().padStart(4, "0")}`;
    };
    const emptyItem = { matno: "", matdesc: "", matqty: 0, uom: "", price: 0, unit: "", text: "" };

    const addItemRow = () => {
        setItems((prev) => [...prev, { ...emptyItem }]);
    };

    const removeItemRow = (index) => {
        setItems((prev) => prev.filter((_, i) => i !== index));
    };

    const [formData, setFormData] = useState({
        category: "",
        catdesc: "",
        po: "",
        docnumber: "",
        location: "",
        docdate: today,
        posdate: today,
        ref: "",
        vendor: "",
        taxcode: "",
        paymentterms: "",
        discount: 0,
    });

    const [items, setItems] = useState([
        { matno: "", matdesc: "", matqty: 0, uom: "", price: 0, unit: "", text: "" },
        { matno: "", matdesc: "", matqty: 0, uom: "", price: 0, unit: "", text: "" },
        { matno: "", matdesc: "", matqty: 0, uom: "", price: 0, unit: "", text: "" },
        { matno: "", matdesc: "", matqty: 0, uom: "", price: 0, unit: "", text: "" },
    ]);

    const [totals, setTotals] = useState({
        subtotal: 0,
        cgst: 0,
        sgst: 0,
        igst: 0,
        total: 0,
    });

    const [showModal, setShowModal] = useState(false);

    const poList = [
        {
            poNumber: "PO1001",
            location: "Mumbai",
            vendor: "ABC Traders",
            items: [
                { matno: "100", matdesc: "Item A", matqty: 5, uom: "PCS", price: 100, unit: "Rs", text: "Delivery in 5 days" },
                { matno: "101", matdesc: "Item B", matqty: 2, uom: "BOX", price: 200, unit: "Rs", text: "Fragile" },
            ],
        },
        {
            poNumber: "PO1002",
            location: "Delhi",
            vendor: "XYZ Distributors",
            items: [
                { matno: "102", matdesc: "Item C", matqty: 10, uom: "PCS", price: 50, unit: "Rs", text: "Bulk" },
            ],
        },
    ];


    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (name === "category") {
            setFormData((prev) => ({
                ...prev,
                category: value,
                catdesc: value, // auto-fill description
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };


    const handleItemChange = (index, e) => {
        const { name, value } = e.target;
        const updatedItems = [...items];
        updatedItems[index][name] = name === "matqty" || name === "price" ? parseFloat(value || 0) : value;
        setItems(updatedItems);
    };
const handlePOSelect = (po) => {
  setFormData((prev) => ({
    ...prev,
    po: po.poNumber,
    location: po.location || "",
    vendor: po.vendor || "",
  }));

  // Fill as many rows as PO items
  const filledItems = [...po.items];
  setItems(filledItems);
  setShowModal(false);
};

    useEffect(() => {
        const storedInvoices = localStorage.getItem("invoices");
        if (storedInvoices) {
            const parsed = JSON.parse(storedInvoices);
            setSubmittedInvoices(parsed);

            // Set next invoice number based on length
            setFormData((prev) => ({
                ...prev,
                docnumber: generateInvoiceNumber(parsed.length),
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                docnumber: generateInvoiceNumber(0),
            }));
        }
    }, []);

    useEffect(() => {
        const subtotal = items.reduce((sum, item) => sum + (item.matqty * item.price), 0);
        const cgst = subtotal * 0.09;
        const sgst = subtotal * 0.09;
        const igst = 0;
        const discount = parseFloat(formData.discount) || 0;
        const total = subtotal + cgst + sgst + igst - discount;

        setTotals({ subtotal, cgst, sgst, igst, total });
    }, [items, formData.discount]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const invoiceNumber = generateInvoiceNumber(submittedInvoices.length);
        const invoiceData = {
            ...formData,
            docnumber: invoiceNumber,
            items,
            totals,
        };

        const updatedInvoices = [...submittedInvoices, invoiceData];
        setSubmittedInvoices(updatedInvoices);
        localStorage.setItem("invoices", JSON.stringify(updatedInvoices));

        // Reset form for next invoice
        setFormData((prev) => ({
            ...prev,
            docnumber: generateInvoiceNumber(updatedInvoices.length),
            po: "",
            category: "",
            catdesc: "",
            location: "",
            vendor: "",
            docdate: today,
            posdate: today,
            ref: "",
            taxcode: "",
            paymentterms: "",
            discount: 0,
        }));

        setItems([
            { matno: "", matdesc: "", matqty: 0, uom: "", price: 0, unit: "", text: "" },
            { matno: "", matdesc: "", matqty: 0, uom: "", price: 0, unit: "", text: "" },
            { matno: "", matdesc: "", matqty: 0, uom: "", price: 0, unit: "", text: "" },
            { matno: "", matdesc: "", matqty: 0, uom: "", price: 0, unit: "", text: "" },
        ]);
    };




    return (
        <div className="content">
            <form onSubmit={handleSubmit}>
                <h6>Invoice</h6>
                <div className="card">
                    <div className="card-header">
                        <div className="row mb-2">
                            <div className="col-xl-2">
                                <label>Category</label>
                                <select name="category" className="form-select" value={formData.category} onChange={handleInputChange}>
                                    <option value="">Select</option>
                                    <option value="invoice">Invoice</option>
                                    <option value="display">Display</option>
                                    <option value="credit">Credit</option>
                                    <option value="cancel">Cancel</option>
                                </select>
                            </div>
                            <div className="col-xl-2">
                                <label>Description</label>
                                <input type="text" name="catdesc" className="form-control" value={formData.catdesc} onChange={handleInputChange} />
                            </div>
                            <div className="col-xl-2">
                                <label>Purchase Order</label>
                                <div className="input-group">
                                    <input
                                        type="search"
                                        name="po"
                                        className="form-control"
                                        value={formData.po}
                                        onChange={handleInputChange}
                                    />
                                    <button
                                        type="button"
                                        className="btn btn-outline-primary"
                                        onClick={() => setShowModal(true)}
                                    >
                                        Search
                                    </button>
                                </div>
                            </div>
                            <div className="col-xl-2">
                                <label>Document Number</label>
                                <input type="text" name="docnumber" className="form-control" value={formData.docnumber} onChange={handleInputChange} />
                            </div>
                            <div className="col-xl-2">
                                <label>Location</label>
                                <input type="text" name="location" className="form-control" value={formData.location} onChange={handleInputChange} />
                            </div>
                        </div>

                        <div className="row mb-2">
                            <div className="col-xl-2">
                                <label>Document Date</label>
                                <input type="date" name="docdate" className="form-control" value={formData.docdate} onChange={handleInputChange} />
                            </div>
                            <div className="col-xl-2">
                                <label>Posting Date</label>
                                <input type="date" name="posdate" className="form-control" value={formData.posdate} onChange={handleInputChange} />
                            </div>
                            <div className="col-xl-2">
                                <label>INV REF</label>
                                <input type="text" name="ref" className="form-control" value={formData.ref} onChange={handleInputChange} />
                            </div>
                            <div className="col-xl-2">
                                <label>Party</label>
                                <input type="text" name="vendor" className="form-control" value={formData.vendor} onChange={handleInputChange} />
                            </div>
                            <div className="col-xl-2">
                                <label>Tax code</label>
                                <input type="text" name="taxcode" className="form-control" value={formData.taxcode} onChange={handleInputChange} />
                            </div>
                            <div className="col-xl-2">
                                <label>Payment Terms</label>
                                <input type="text" name="paymentterms" className="form-control" value={formData.paymentterms} onChange={handleInputChange} />
                            </div>
                        </div>
                    </div>

                    <div className="card-body">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Mat No</th>
                                    <th>Mat Desc</th>
                                    <th>QTY</th>
                                    <th>UOM</th>
                                    <th>Price</th>
                                    <th>Unit</th>
                                    <th>Text</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((item, i) => (
                                    <tr key={i}>
                                        <td>{i + 1}</td>
                                        {Object.entries(item).map(([key, value]) => (
                                            <td key={key}>
                                                <input
                                                    type={key === "matqty" || key === "price" ? "number" : "text"}
                                                    name={key}
                                                    value={value}
                                                    className="form-control"
                                                    onChange={(e) => handleItemChange(i, e)}
                                                />
                                            </td>
                                        ))}
                                        <td>
                                            <button
                                                type="button"
                                                className="btn btn-sm btn-danger"
                                                onClick={() => removeItemRow(i)}
                                            >
                                                ×
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colSpan="9" className="text-end">
                                        <button
                                            type="button"
                                            className="btn btn-sm btn-primary"
                                            onClick={addItemRow}
                                        >
                                            + Add Item
                                        </button>
                                    </td>
                                </tr>
                            </tfoot>

                        </table>
                    </div>

                    <div className="card-footer">
                        <div className="row flex-column">
                            <div className="col-xl-1 ms-auto">
                                <label>Subtotal</label>
                                <input type="text" value={totals.subtotal.toFixed(2)} disabled className="form-control" />
                            </div>
                            <div className="col-xl-1 ms-auto">
                                <label>CGST</label>
                                <input type="text" value={totals.cgst.toFixed(2)} disabled className="form-control" />
                            </div>
                            <div className="col-xl-1 ms-auto">
                                <label>SGST</label>
                                <input type="text" value={totals.sgst.toFixed(2)} disabled className="form-control" />
                            </div>
                            <div className="col-xl-1 ms-auto">
                                <label>IGST</label>
                                <input type="text" value={totals.igst.toFixed(2)} disabled className="form-control" />
                            </div>
                            <div className="col-xl-1 ms-auto">
                                <label>Discount</label>
                                <input type="number" name="discount" value={formData.discount} onChange={handleInputChange} className="form-control" />
                            </div>
                            <div className="col-xl-1 ms-auto">
                                <label>Total</label>
                                <input type="text" value={totals.total.toFixed(2)} disabled className="form-control" />
                            </div>
                        </div>
                        <input type="submit" value="Submit" className="btn btn-success mt-2" />
                    </div>
                </div>
            </form>

            {/* Modal */}
            {showModal && (
                <>
                    <div className="modal-backdrop fade show"></div>
                    <div className="modal fade show d-block" tabIndex="-1">

                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Select Purchase Order</h5>
                                    <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                                </div>
                                <div className="modal-body">
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th>PO Number</th>
                                                <th>Items Count</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {poList.map((po) => (
                                                <tr key={po.poNumber}>
                                                    <td>{po.poNumber}</td>
                                                    <td>{po.items.length}</td>
                                                    <td>
                                                        <button className="btn btn-sm btn-success" onClick={() => handlePOSelect(po)}>
                                                            Select
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                    </div>
                </>)}


            {submittedInvoices.length > 0 && (
                <div className="mt-5">
                    <h5>Submitted Invoices</h5>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Doc number</th>
                                <th>PO No</th>
                                <th>Party</th>
                                <th>Location</th>
                                <th>Category</th>
                                <th>Description</th>
                                <th>Subtotal</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {submittedInvoices.map((inv, index) => (
                                <tr key={index}>
                                    <td>{inv.docnumber}</td>
                                    <td>{inv.po}</td>
                                    <td>{inv.vendor}</td>
                                    <td>{inv.location}</td>
                                    <td>{inv.category}</td>
                                    <td>{inv.catdesc}</td>
                                    <td>{inv.totals.subtotal.toFixed(2)}</td>
                                    <td>{inv.totals.total.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <h6>Materials</h6>
                    {submittedInvoices.map((inv, index) => (
                        <div key={index} className="mb-4">
                            <strong>Invoice #{inv.docnumber}</strong>
                            <table className="table table-sm table-striped table-bordered mt-2">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Mat No</th>
                                        <th>Description</th>
                                        <th>Qty</th>
                                        <th>UOM</th>
                                        <th>Price</th>
                                        <th>Unit</th>
                                        <th>Text</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {inv.items.map((item, i) => (
                                        <tr key={i}>
                                            <td>{i + 1}</td>
                                            <td>{item.matno}</td>
                                            <td>{item.matdesc}</td>
                                            <td>{item.matqty}</td>
                                            <td>{item.uom}</td>
                                            <td>{item.price}</td>
                                            <td>{item.unit}</td>
                                            <td>{item.text}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ))}
                </div>
            )}

        </div>
    );
}

export default Invoice;
