import React, { useEffect, useState } from "react";

import {
    getBills,
    addBill,
    updateBill,
    deleteBill
} from "../services/api";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Bills() {

    const [bills, setBills] = useState([]);

    const [editingId, setEditingId] = useState(null);

    const [bill, setBill] = useState({
        patient_id: "",
        amount: "",
        payment_status: "Pending",
        bill_date: ""
    });

    const [loading, setLoading] = useState(false);

    // ======================================
    // LOAD BILLS
    // ======================================

    const loadBills = async () => {

        try {

            setLoading(true);

            const res = await getBills();

            console.log("Bills API Response:", res.data);

            // Handle:
            // { success: true, data: [...] }
            // OR
            // [...]
            if (Array.isArray(res.data)) {

                setBills(res.data);

            } else if (res.data && Array.isArray(res.data.data)) {

                setBills(res.data.data);

            } else {

                setBills([]);

            }

        } catch (error) {

            console.error("Failed to load bills:", error);

            setBills([]);

        } finally {

            setLoading(false);

        }

    };


    // ======================================
    // LOAD ON PAGE OPEN
    // ======================================

    useEffect(() => {

        loadBills();

    }, []);


    // ======================================
    // HANDLE INPUT
    // ======================================

    const handleChange = (e) => {

        setBill({
            ...bill,
            [e.target.name]: e.target.value
        });

    };


    // ======================================
    // RESET FORM
    // ======================================

    const resetForm = () => {

        setBill({
            patient_id: "",
            amount: "",
            payment_status: "Pending",
            bill_date: ""
        });

        setEditingId(null);

    };


    // ======================================
    // ADD / UPDATE BILL
    // ======================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            if (editingId === null) {

                await addBill(bill);

                alert("Bill Added Successfully");

            } else {

                await updateBill(editingId, bill);

                alert("Bill Updated Successfully");

            }

            resetForm();

            loadBills();

        } catch (error) {

            console.error("Bill operation error:", error);

            const message =
                error.response?.data?.message ||
                "Operation Failed";

            alert(message);

        }

    };


    // ======================================
    // EDIT BILL
    // ======================================

    const handleEdit = (item) => {

        setBill({
            patient_id: item.patient_id || "",
            amount: item.amount || "",
            payment_status: item.payment_status || "Pending",
            bill_date: item.bill_date
                ? String(item.bill_date).substring(0, 10)
                : ""
        });

        setEditingId(item.id);

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    };


    // ======================================
    // DELETE BILL
    // ======================================

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this bill?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            await deleteBill(id);

            alert("Bill Deleted Successfully");

            loadBills();

        } catch (error) {

            console.error("Delete bill error:", error);

            const message =
                error.response?.data?.message ||
                "Delete Failed";

            alert(message);

        }

    };


    // ======================================
    // FORMAT DATE
    // ======================================

    const formatDate = (date) => {

        if (!date) {
            return "-";
        }

        return String(date).substring(0, 10);

    };


    // ======================================
    // FORMAT AMOUNT
    // ======================================

    const formatAmount = (amount) => {

        if (amount === null || amount === undefined) {
            return "₹0";
        }

        return `₹${Number(amount).toFixed(2)}`;

    };


    // ======================================
    // PAGE
    // ======================================

    return (
        <>
            <Sidebar />

            <Navbar />

            <div
                style={{
                    marginLeft: "240px",
                    padding: "30px"
                }}
            >

                {/* ======================================
                    PAGE TITLE
                ====================================== */}

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <h2>
                        <i className="bi bi-receipt"></i>{" "}
                        Bill Management
                    </h2>

                    <span className="badge bg-primary fs-6">
                        Total Bills: {bills.length}
                    </span>

                </div>


                {/* ======================================
                    BILL FORM
                ====================================== */}

                <div className="card shadow-sm mb-4">

                    <div className="card-header">

                        <h5 className="mb-0">

                            {editingId === null
                                ? "Add New Bill"
                                : "Update Bill"}

                        </h5>

                    </div>

                    <div className="card-body">

                        <form onSubmit={handleSubmit}>

                            <div className="row g-3">

                                {/* Patient ID */}

                                <div className="col-md-3">

                                    <label className="form-label">
                                        Patient ID
                                    </label>

                                    <input
                                        type="number"
                                        className="form-control"
                                        name="patient_id"
                                        placeholder="Enter Patient ID"
                                        value={bill.patient_id}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>


                                {/* Amount */}

                                <div className="col-md-3">

                                    <label className="form-label">
                                        Amount
                                    </label>

                                    <input
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        className="form-control"
                                        name="amount"
                                        placeholder="Enter Amount"
                                        value={bill.amount}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>


                                {/* Payment Status */}

                                <div className="col-md-3">

                                    <label className="form-label">
                                        Payment Status
                                    </label>

                                    <select
                                        className="form-select"
                                        name="payment_status"
                                        value={bill.payment_status}
                                        onChange={handleChange}
                                        required
                                    >

                                        <option value="Pending">
                                            Pending
                                        </option>

                                        <option value="Paid">
                                            Paid
                                        </option>

                                        <option value="Cancelled">
                                            Cancelled
                                        </option>

                                    </select>

                                </div>


                                {/* Bill Date */}

                                <div className="col-md-3">

                                    <label className="form-label">
                                        Bill Date
                                    </label>

                                    <input
                                        type="date"
                                        className="form-control"
                                        name="bill_date"
                                        value={bill.bill_date}
                                        onChange={handleChange}
                                        required
                                    />

                                </div>

                            </div>


                            {/* Buttons */}

                            <div className="mt-4">

                                <button
                                    type="submit"
                                    className="btn btn-primary me-2"
                                >

                                    <i className="bi bi-save"></i>{" "}

                                    {editingId === null
                                        ? "Add Bill"
                                        : "Update Bill"}

                                </button>


                                {editingId !== null && (

                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={resetForm}
                                    >

                                        <i className="bi bi-x-circle"></i>{" "}
                                        Cancel

                                    </button>

                                )}

                            </div>

                        </form>

                    </div>

                </div>


                {/* ======================================
                    BILLS TABLE
                ====================================== */}

                <div className="card shadow-sm">

                    <div className="card-header">

                        <h5 className="mb-0">
                            All Bills
                        </h5>

                    </div>

                    <div className="card-body">

                        {loading ? (

                            <div className="text-center p-4">

                                <div
                                    className="spinner-border"
                                    role="status"
                                ></div>

                                <p className="mt-2">
                                    Loading bills...
                                </p>

                            </div>

                        ) : bills.length === 0 ? (

                            <div className="alert alert-info">
                                No bills found.
                            </div>

                        ) : (

                            <div className="table-responsive">

                                <table className="table table-bordered table-hover align-middle">

                                    <thead className="table-dark">

                                        <tr>

                                            <th>ID</th>

                                            <th>Patient ID</th>

                                            <th>Amount</th>

                                            <th>Payment Status</th>

                                            <th>Bill Date</th>

                                            <th>Actions</th>

                                        </tr>

                                    </thead>


                                    <tbody>

                                        {bills.map((item) => (

                                            <tr key={item.id}>

                                                <td>
                                                    {item.id}
                                                </td>

                                                <td>
                                                    {item.patient_id}
                                                </td>

                                                <td>
                                                    {formatAmount(item.amount)}
                                                </td>

                                                <td>

                                                    <span
                                                        className={
                                                            item.payment_status === "Paid"
                                                                ? "badge bg-success"
                                                                : item.payment_status === "Cancelled"
                                                                    ? "badge bg-danger"
                                                                    : "badge bg-warning text-dark"
                                                        }
                                                    >

                                                        {item.payment_status}

                                                    </span>

                                                </td>

                                                <td>
                                                    {formatDate(item.bill_date)}
                                                </td>

                                                <td>

                                                    <button
                                                        className="btn btn-sm btn-warning me-2"
                                                        onClick={() =>
                                                            handleEdit(item)
                                                        }
                                                    >

                                                        <i className="bi bi-pencil"></i>{" "}
                                                        Edit

                                                    </button>


                                                    <button
                                                        className="btn btn-sm btn-danger"
                                                        onClick={() =>
                                                            handleDelete(item.id)
                                                        }
                                                    >

                                                        <i className="bi bi-trash"></i>{" "}
                                                        Delete

                                                    </button>

                                                </td>

                                            </tr>

                                        ))}

                                    </tbody>

                                </table>

                            </div>

                        )}

                    </div>

                </div>

            </div>

        </>
    );

}

export default Bills;