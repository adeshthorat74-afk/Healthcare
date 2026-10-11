import React, { useEffect, useState } from "react";

import {
    getPatients,
    addPatient,
    updatePatient,
    deletePatient
} from "../services/api";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";


function Patients() {

    // ======================================
    // STATES
    // ======================================

    const [patients, setPatients] = useState([]);

    const [search, setSearch] = useState("");

    const [loading, setLoading] = useState(false);

    const [editingId, setEditingId] = useState(null);

    const [showForm, setShowForm] = useState(false);

    const [patient, setPatient] = useState({
        name: "",
        age: "",
        gender: "",
        phone: "",
        email: "",
        address: "",
        disease: "",
        doctor_id: ""
    });


    // ======================================
    // LOAD PATIENTS
    // ======================================

    useEffect(() => {

        loadPatients();

    }, []);


    const loadPatients = async (searchText = "") => {

        try {

            setLoading(true);

            const res = await getPatients(searchText);

            setPatients(res.data);

        } catch (error) {

            console.error("Load Patients Error:", error);

            alert(
                error.response?.data?.message ||
                "Unable to load patients"
            );

        } finally {

            setLoading(false);

        }

    };


    // ======================================
    // SEARCH
    // ======================================

    const handleSearch = (e) => {

        const value = e.target.value;

        setSearch(value);

        loadPatients(value);

    };


    // ======================================
    // CLEAR SEARCH
    // ======================================

    const clearSearch = () => {

        setSearch("");

        loadPatients("");

    };


    // ======================================
    // HANDLE INPUT
    // ======================================

    const handleChange = (e) => {

        setPatient({
            ...patient,
            [e.target.name]: e.target.value
        });

    };


    // ======================================
    // ADD / UPDATE PATIENT
    // ======================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            if (editingId === null) {

                await addPatient(patient);

                alert("Patient Added Successfully");

            } else {

                await updatePatient(editingId, patient);

                alert("Patient Updated Successfully");

            }

            resetForm();

            loadPatients(search);

        } catch (error) {

            console.error("Patient Operation Error:", error);

            alert(
                error.response?.data?.message ||
                "Operation Failed"
            );

        }

    };


    // ======================================
    // EDIT PATIENT
    // ======================================

    const handleEdit = (item) => {

        setPatient({
            name: item.name || "",
            age: item.age || "",
            gender: item.gender || "",
            phone: item.phone || "",
            email: item.email || "",
            address: item.address || "",
            disease: item.disease || "",
            doctor_id: item.doctor_id || ""
        });

        setEditingId(item.id);

        setShowForm(true);

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    };


    // ======================================
    // DELETE PATIENT
    // ======================================

    const handleDelete = async (id) => {

        if (!window.confirm("Are you sure you want to delete this patient?")) {
            return;
        }

        try {

            await deletePatient(id);

            alert("Patient Deleted Successfully");

            loadPatients(search);

        } catch (error) {

            console.error("Delete Patient Error:", error);

            alert(
                error.response?.data?.message ||
                "Delete Failed"
            );

        }

    };


    // ======================================
    // RESET FORM
    // ======================================

    const resetForm = () => {

        setPatient({
            name: "",
            age: "",
            gender: "",
            phone: "",
            email: "",
            address: "",
            disease: "",
            doctor_id: ""
        });

        setEditingId(null);

        setShowForm(false);

    };


    // ======================================
    // JSX
    // ======================================

    return (

        <>

            <Sidebar />

            <Navbar />


            <div
                className="container-fluid"
                style={{
                    marginLeft: "240px",
                    padding: "30px",
                    width: "calc(100% - 240px)"
                }}
            >

                {/* ======================================
                    PAGE HEADER
                ====================================== */}

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <h2>

                        <i className="bi bi-people-fill"></i>

                        {" "}

                        Patient Management

                    </h2>


                    <button
                        className="btn btn-primary"
                        onClick={() => {

                            resetForm();

                            setShowForm(true);

                        }}
                    >

                        <i className="bi bi-plus-circle"></i>

                        {" "}

                        Add Patient

                    </button>

                </div>


                {/* ======================================
                    SEARCH
                ====================================== */}

                <div className="card shadow-sm mb-4">

                    <div className="card-body">

                        <div className="row">

                            <div className="col-md-9">

                                <div className="input-group">

                                    <span className="input-group-text">

                                        <i className="bi bi-search"></i>

                                    </span>


                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Search by name, phone, email, disease, gender or address..."
                                        value={search}
                                        onChange={handleSearch}
                                    />

                                </div>

                            </div>


                            <div className="col-md-3">

                                <button
                                    className="btn btn-secondary w-100"
                                    onClick={clearSearch}
                                >

                                    <i className="bi bi-x-circle"></i>

                                    {" "}

                                    Clear Search

                                </button>

                            </div>

                        </div>

                    </div>

                </div>


                {/* ======================================
                    ADD / EDIT FORM
                ====================================== */}

                {showForm && (

                    <div className="card shadow mb-4">

                        <div className="card-header bg-primary text-white">

                            <h5 className="mb-0">

                                {editingId === null
                                    ? "Add New Patient"
                                    : "Update Patient"
                                }

                            </h5>

                        </div>


                        <div className="card-body">

                            <form onSubmit={handleSubmit}>

                                <div className="row">


                                    {/* Patient Name */}

                                    <div className="col-md-6 mb-3">

                                        <label className="form-label">
                                            Patient Name
                                        </label>

                                        <input
                                            type="text"
                                            name="name"
                                            className="form-control"
                                            placeholder="Enter patient name"
                                            value={patient.name}
                                            onChange={handleChange}
                                            required
                                        />

                                    </div>


                                    {/* Age */}

                                    <div className="col-md-3 mb-3">

                                        <label className="form-label">
                                            Age
                                        </label>

                                        <input
                                            type="number"
                                            name="age"
                                            className="form-control"
                                            placeholder="Age"
                                            min="0"
                                            value={patient.age}
                                            onChange={handleChange}
                                            required
                                        />

                                    </div>


                                    {/* Gender */}

                                    <div className="col-md-3 mb-3">

                                        <label className="form-label">
                                            Gender
                                        </label>

                                        <select
                                            name="gender"
                                            className="form-select"
                                            value={patient.gender}
                                            onChange={handleChange}
                                            required
                                        >

                                            <option value="">
                                                Select Gender
                                            </option>

                                            <option value="Male">
                                                Male
                                            </option>

                                            <option value="Female">
                                                Female
                                            </option>

                                            <option value="Other">
                                                Other
                                            </option>

                                        </select>

                                    </div>


                                    {/* Phone */}

                                    <div className="col-md-6 mb-3">

                                        <label className="form-label">
                                            Phone
                                        </label>

                                        <input
                                            type="text"
                                            name="phone"
                                            className="form-control"
                                            placeholder="Enter phone number"
                                            value={patient.phone}
                                            onChange={handleChange}
                                            required
                                        />

                                    </div>


                                    {/* Email */}

                                    <div className="col-md-6 mb-3">

                                        <label className="form-label">
                                            Email
                                        </label>

                                        <input
                                            type="email"
                                            name="email"
                                            className="form-control"
                                            placeholder="Enter email"
                                            value={patient.email}
                                            onChange={handleChange}
                                            required
                                        />

                                    </div>


                                    {/* Address */}

                                    <div className="col-md-6 mb-3">

                                        <label className="form-label">
                                            Address
                                        </label>

                                        <textarea
                                            name="address"
                                            className="form-control"
                                            rows="2"
                                            placeholder="Enter address"
                                            value={patient.address}
                                            onChange={handleChange}
                                            required
                                        ></textarea>

                                    </div>


                                    {/* Disease */}

                                    <div className="col-md-6 mb-3">

                                        <label className="form-label">
                                            Disease
                                        </label>

                                        <input
                                            type="text"
                                            name="disease"
                                            className="form-control"
                                            placeholder="Enter disease"
                                            value={patient.disease}
                                            onChange={handleChange}
                                            required
                                        />

                                    </div>


                                    {/* Doctor ID */}

                                    <div className="col-md-6 mb-3">

                                        <label className="form-label">
                                            Doctor ID
                                        </label>

                                        <input
                                            type="number"
                                            name="doctor_id"
                                            className="form-control"
                                            placeholder="Enter doctor ID"
                                            value={patient.doctor_id}
                                            onChange={handleChange}
                                            required
                                        />

                                    </div>

                                </div>


                                {/* Submit */}

                                <button
                                    type="submit"
                                    className="btn btn-success me-2"
                                >

                                    <i className="bi bi-check-circle"></i>

                                    {" "}

                                    {editingId === null
                                        ? "Add Patient"
                                        : "Update Patient"
                                    }

                                </button>


                                {/* Cancel */}

                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={resetForm}
                                >

                                    <i className="bi bi-x-circle"></i>

                                    {" "}

                                    Cancel

                                </button>

                            </form>

                        </div>

                    </div>

                )}


                {/* ======================================
                    PATIENT TABLE
                ====================================== */}

                <div className="card shadow">

                    <div className="card-header">

                        <h5 className="mb-0">

                            <i className="bi bi-list-ul"></i>

                            {" "}

                            Patient List

                        </h5>

                    </div>


                    <div className="card-body">


                        {/* Loading */}

                        {loading ? (

                            <div className="text-center p-4">

                                <div
                                    className="spinner-border text-primary"
                                    role="status"
                                >

                                    <span className="visually-hidden">
                                        Loading...
                                    </span>

                                </div>

                                <p className="mt-2">
                                    Loading patients...
                                </p>

                            </div>

                        ) : patients.length === 0 ? (

                            /* No Data */

                            <div className="alert alert-warning">

                                <i className="bi bi-info-circle"></i>

                                {" "}

                                {search
                                    ? "No patients found for your search."
                                    : "No patients available."
                                }

                            </div>

                        ) : (

                            /* Table */

                            <div className="table-responsive">

                                <table className="table table-bordered table-hover align-middle">

                                    <thead className="table-dark">

                                        <tr>

                                            <th>ID</th>

                                            <th>Name</th>

                                            <th>Age</th>

                                            <th>Gender</th>

                                            <th>Phone</th>

                                            <th>Email</th>

                                            <th>Address</th>

                                            <th>Disease</th>

                                            <th>Doctor ID</th>

                                            <th>Actions</th>

                                        </tr>

                                    </thead>


                                    <tbody>

                                        {patients.map((item) => (

                                            <tr key={item.id}>

                                                <td>
                                                    {item.id}
                                                </td>

                                                <td>
                                                    {item.name}
                                                </td>

                                                <td>
                                                    {item.age}
                                                </td>

                                                <td>

                                                    <span className="badge bg-info text-dark">

                                                        {item.gender}

                                                    </span>

                                                </td>

                                                <td>
                                                    {item.phone}
                                                </td>

                                                <td>
                                                    {item.email}
                                                </td>

                                                <td>
                                                    {item.address}
                                                </td>

                                                <td>
                                                    {item.disease}
                                                </td>

                                                <td>
                                                    {item.doctor_id}
                                                </td>


                                                <td>

                                                    <button
                                                        className="btn btn-sm btn-warning me-2"
                                                        onClick={() =>
                                                            handleEdit(item)
                                                        }
                                                    >

                                                        <i className="bi bi-pencil"></i>

                                                        {" "}

                                                        Edit

                                                    </button>


                                                    <button
                                                        className="btn btn-sm btn-danger"
                                                        onClick={() =>
                                                            handleDelete(item.id)
                                                        }
                                                    >

                                                        <i className="bi bi-trash"></i>

                                                        {" "}

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

export default Patients;