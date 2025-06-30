import React, { useState, useEffect } from "react";

function Billing() {
    const today = new Date().toISOString().split("T")[0];

    const generateBillingNumber = (index) => {
        return `BILL${(index + 1).toString().padStart(4, "0")}`;
    };

    const emptyItem = { matno: "", matdesc: "", matqty: 0, uom: "", price: 0, unit: "", text: "" };

    const [formData, setFormData] = useState({
        category: "",
        catdesc: "",
        so: "",
        docnumber: "",
        location: "",
        docdate: today,
        posdate: today,
        ref: "",
        customer: "",
        taxcode: "",
        paymentterms: "",
        discount: 0,
    });

    const [items, setItems] = useState([{ ...emptyItem }]);
    const [totals, setTotals] = useState({ subtotal: 0, cgst: 0, sgst: 0, igst: 0, total: 0 });
    const [submittedBills, setSubmittedBills] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const soList = [
        {
            soNumber: "SO2001",
            location: "Chennai",
            customer: "Jaya Agencies",
            items: [
                { matno: "500", matdesc: "Fan", matqty: 3, uom: "PCS", price: 600, unit: "Rs", text: "Install at site" },
                { matno: "501", matdesc: "Wire", matqty: 10, uom: "MTR", price: 50, unit: "Rs", text: "Copper wire" },
            ],
        },
        {
            soNumber: "SO2002",
            location: "Hyderabad",
            customer: "Lakshmi Stores",
            items: [
                { matno: "502", matdesc: "Switch Board", matqty: 4, uom: "PCS", price: 300, unit: "Rs", text: "Standard model" },
            ],
        },
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
            ...(name === "category" && { catdesc: value }),
        }));
    };

    const handleItemChange = (index, e) => {
        const { name, value } = e.target;
        const updatedItems = [...items];
        updatedItems[index][name] = ["matqty", "price"].includes(name) ? parseFloat(value || 0) : value;
        setItems(updatedItems);
    };

    const addItemRow = () => setItems((prev) => [...prev, { ...emptyItem }]);

    const removeItemRow = (index) => setItems((prev) => prev.filter((_, i) => i !== index));

    const handleSOSelect = (so) => {
        setFormData((prev) => ({
            ...prev,
            so: so.soNumber,
            location: so.location,
            customer: so.customer,
        }));
        setItems([...so.items]);
        setShowModal(false);
    };

    useEffect(() => {
        const stored = localStorage.getItem("bills");
        if (stored) {
            const parsed = JSON.parse(stored);
            setSubmittedBills(parsed);
            setFormData((prev) => ({ ...prev, docnumber: generateBillingNumber(parsed.length) }));
        } else {
            setFormData((prev) => ({ ...prev, docnumber: generateBillingNumber(0) }));
        }
    }, []);

    useEffect(() => {
        const subtotal = items.reduce((sum, item) => sum + item.matqty * item.price, 0);
        const cgst = subtotal * 0.09;
        const sgst = subtotal * 0.09;
        const igst = 0;
        const discount = parseFloat(formData.discount || 0);
        const total = subtotal + cgst + sgst + igst - discount;

        setTotals({ subtotal, cgst, sgst, igst, total });
    }, [items, formData.discount]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const billNumber = generateBillingNumber(submittedBills.length);
        const newBill = { ...formData, docnumber: billNumber, items, totals };

        const updated = [...submittedBills, newBill];
        setSubmittedBills(updated);
        localStorage.setItem("bills", JSON.stringify(updated));

        // reset form
        setFormData({
            category: "",
            catdesc: "",
            so: "",
            docnumber: generateBillingNumber(updated.length),
            location: "",
            docdate: today,
            posdate: today,
            ref: "",
            customer: "",
            taxcode: "",
            paymentterms: "",
            discount: 0,
        });
        setItems([{ ...emptyItem }]);
    };

    return (
        <div className="content">
            <form onSubmit={handleSubmit}>
                <h6>Billing</h6>
                <div className="card">
                    <div className="card-header">
                        <div className="row mb-2">
                            <div className="col-xl-2">
                                <label>Category</label>
                                <select name="category" className="form-select" value={formData.category} onChange={handleInputChange}>
                                    <option value="">Select</option>
                                    <option value="billing">Billing</option>
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
                                <label>Sales Order</label>
                                <div className="input-group">
                                    <input type="text" name="so" className="form-control" value={formData.so} onChange={handleInputChange} />
                                    <button type="button" className="btn btn-outline-primary" onClick={() => setShowModal(true)}>
                                        Search
                                    </button>
                                </div>
                            </div>
                            <div className="col-xl-2">
                                <label>Billing Number</label>
                                <input type="text" name="docnumber" className="form-control" value={formData.docnumber} readOnly />
                            </div>
                            <div className="col-xl-2">
                                <label>Location</label>
                                <input type="text" name="location" className="form-control" value={formData.location} onChange={handleInputChange} />
                            </div>
                        </div>

                        <div className="row mb-2">
                            <div className="col-xl-2">
                                <label>Billing Date</label>
                                <input type="date" name="docdate" className="form-control" value={formData.docdate} onChange={handleInputChange} />
                            </div>
                            <div className="col-xl-2">
                                <label>Posting Date</label>
                                <input type="date" name="posdate" className="form-control" value={formData.posdate} onChange={handleInputChange} />
                            </div>
                            <div className="col-xl-2">
                                <label>Ref No</label>
                                <input type="text" name="ref" className="form-control" value={formData.ref} onChange={handleInputChange} />
                            </div>
                            <div className="col-xl-2">
                                <label>Customer</label>
                                <input type="text" name="customer" className="form-control" value={formData.customer} onChange={handleInputChange} />
                            </div>
                            <div className="col-xl-2">
                                <label>Tax Code</label>
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
                                    <th>Desc</th>
                                    <th>Qty</th>
                                    <th>UOM</th>
                                    <th>Price</th>
                                    <th>Unit</th>
                                    <th>Text</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((item, i) => (
                                    <tr key={i}>
                                        <td>{i + 1}</td>
                                        {Object.entries(item).map(([key, val]) => (
                                            <td key={key}>
                                                <input
                                                    name={key}
                                                    value={val}
                                                    type={["matqty", "price"].includes(key) ? "number" : "text"}
                                                    onChange={(e) => handleItemChange(i, e)}
                                                    className="form-control"
                                                />
                                            </td>
                                        ))}
                                        <td>
                                            <button type="button" className="btn btn-sm btn-danger" onClick={() => removeItemRow(i)}>×</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colSpan="9" className="text-end">
                                        <button type="button" className="btn btn-sm btn-primary" onClick={addItemRow}>+ Add Item</button>
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>

                    <div className="card-footer">
                        <div className="row">
                            {["subtotal", "cgst", "sgst", "igst", "discount", "total"].map((field) => (
                                <div className="col-xl-2" key={field}>
                                    <label>{field.toUpperCase()}</label>
                                    <input
                                        type={field === "discount" ? "number" : "text"}
                                        name={field}
                                        value={field === "discount" ? formData.discount : totals[field].toFixed(2)}
                                        onChange={handleInputChange}
                                        disabled={field !== "discount"}
                                        className="form-control"
                                    />
                                </div>
                            ))}
                        </div>
                        <input type="submit" value="Submit" className="btn btn-success mt-3" />
                    </div>
                </div>
            </form>

            {/* Modal for SO */}
            {showModal && (
                <>
                    <div className="modal-backdrop fade show"></div>
                    <div className="modal show d-block" tabIndex="-1">
                        <div className="modal-dialog modal-lg">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5>Select Sales Order</h5>
                                    <button className="btn-close" onClick={() => setShowModal(false)}></button>
                                </div>
                                <div className="modal-body">
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th>SO Number</th>
                                                <th>Items</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {soList.map((so) => (
                                                <tr key={so.soNumber}>
                                                    <td>{so.soNumber}</td>
                                                    <td>{so.items.length}</td>
                                                    <td>
                                                        <button className="btn btn-sm btn-success" onClick={() => handleSOSelect(so)}>
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
                </>
            )}

            {submittedBills.length > 0 && (
                <div className="mt-5">
                    <h5>Submitted Bills</h5>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Billing No</th>
                                <th>SO</th>
                                <th>Customer</th>
                                <th>Location</th>
                                <th>Category</th>
                                <th>Description</th>
                                <th>Subtotal</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {submittedBills.map((b, i) => (
                                <tr key={i}>
                                    <td>{b.docnumber}</td>
                                    <td>{b.so}</td>
                                    <td>{b.customer}</td>
                                    <td>{b.location}</td>
                                    <td>{b.category}</td>
                                    <td>{b.catdesc}</td>
                                    <td>{b.totals.subtotal.toFixed(2)}</td>
                                    <td>{b.totals.total.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default Billing;
