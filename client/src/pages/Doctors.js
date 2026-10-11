import React, { useEffect, useState } from "react";

import {
    getDoctors,
    addDoctor,
    updateDoctor,
    deleteDoctor
} from "../services/api";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Doctors() {

    // ======================================
    // States
    // ======================================

    const [doctors, setDoctors] = useState([]);

    const [search, setSearch] = useState("");

    const [loading, setLoading] = useState(false);

    const [showForm, setShowForm] = useState(false);

    const [editId, setEditId] = useState(null);

    const [doctor, setDoctor] = useState({
        name: "",
        specialization: "",
        phone: "",
        email: ""
    });


    // ======================================
    // Load Doctors
    // ======================================

    useEffect(() => {

        loadDoctors();

    }, []);


    const loadDoctors = async (searchText = "") => {

        try {

            setLoading(true);

            const response = await getDoctors(searchText);

            setDoctors(response.data);

        } catch (error) {

            console.error("Load Doctors Error:", error);

            alert("Unable to load doctors");

        } finally {

            setLoading(false);

        }

    };


    // ======================================
    // Search
    // ======================================

    const handleSearch = (e) => {

        const value = e.target.value;

        setSearch(value);

        loadDoctors(value);

    };


    // ======================================
    // Clear Search
    // ======================================

    const clearSearch = () => {

        setSearch("");

        loadDoctors("");

    };


    // ======================================
    // Handle Input
    // ======================================

    const handleChange = (e) => {

        setDoctor({
            ...doctor,
            [e.target.name]: e.target.value
        });

    };


    // ======================================
    // Add / Update Doctor
    // ======================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            if (editId) {

                await updateDoctor(editId, doctor);

                alert("Doctor Updated Successfully");

            } else {

                await addDoctor(doctor);

                alert("Doctor Added Successfully");

            }

            resetForm();

            loadDoctors(search);

        } catch (error) {

            console.error("Save Doctor Error:", error);

            alert(
                error.response?.data?.message ||
                "Unable to save doctor"
            );

        }

    };


    // ======================================
    // Edit Doctor
    // ======================================

    const handleEdit = (item) => {

        setDoctor({
            name: item.name || "",
            specialization: item.specialization || "",
            phone: item.phone || "",
            email: item.email || ""
        });

        setEditId(item.id);

        setShowForm(true);

    };


    // ======================================
    // Delete Doctor
    // ======================================

    const handleDelete = async (id) => {

        if (!window.confirm(
            "Are you sure you want to delete this doctor?"
        )) {
            return;
        }

        try {

            await deleteDoctor(id);

            alert("Doctor Deleted Successfully");

            loadDoctors(search);

        } catch (error) {

            console.error("Delete Doctor Error:", error);

            alert(
                error.response?.data?.message ||
                "Unable to delete doctor"
            );

        }

    };


    // ======================================
    // Reset Form
    // ======================================

    const resetForm = () => {

        setDoctor({
            name: "",
            specialization: "",
            phone: "",
            email: ""
        });

        setEditId(null);

        setShowForm(false);

    };


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
                    Page Header
                ====================================== */}

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <h2>
                        <i className="bi bi-person-badge-fill"></i>
                        {" "}Doctors
                    </h2>

                    <button
                        className="btn btn-primary"
                        onClick={() => {

                            resetForm();

                            setShowForm(true);

                        }}
                    >
                        <i className="bi bi-plus-circle"></i>
                        {" "}Add Doctor
                    </button>

                </div>


                {/* ======================================
                    Search
                ====================================== */}

                <div className="card shadow-sm mb-4">

                    <div className="card-body">

                        <div className="row">

                            <div className="col-md-6">

                                <div className="input-group">

                                    <span className="input-group-text">
                                        <i className="bi bi-search"></i>
                                    </span>

                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Search by name, specialization, phone or email..."
                                        value={search}
                                        onChange={handleSearch}
                                    />

                                </div>

                            </div>


                            <div className="col-md-2">

                                <button
                                    className="btn btn-secondary w-100"
                                    onClick={clearSearch}
                                >
                                    <i className="bi bi-x-circle"></i>
                                    {" "}Clear
                                </button>

                            </div>

                        </div>

                    </div>

                </div>


                {/* ======================================
                    Add / Edit Form
                ====================================== */}

                {showForm && (

                    <div className="card shadow mb-4">

                        <div className="card-header bg-primary text-white">

                            <h5 className="mb-0">

                                {editId
                                    ? "Edit Doctor"
                                    : "Add Doctor"
                                }

                            </h5>

                        </div>


                        <div className="card-body">

                            <form onSubmit={handleSubmit}>

                                <div className="row">


                                    {/* Name */}

                                    <div className="col-md-6 mb-3">

                                        <label className="form-label">
                                            Doctor Name
                                        </label>

                                        <input
                                            type="text"
                                            name="name"
                                            className="form-control"
                                            value={doctor.name}
                                            onChange={handleChange}
                                            required
                                        />

                                    </div>


                                    {/* Specialization */}

                                    <div className="col-md-6 mb-3">

                                        <label className="form-label">
                                            Specialization
                                        </label>

                                        <input
                                            type="text"
                                            name="specialization"
                                            className="form-control"
                                            value={doctor.specialization}
                                            onChange={handleChange}
                                            required
                                        />

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
                                            value={doctor.phone}
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
                                            value={doctor.email}
                                            onChange={handleChange}
                                            required
                                        />

                                    </div>

                                </div>


                                <button
                                    type="submit"
                                    className="btn btn-success me-2"
                                >

                                    <i className="bi bi-check-circle"></i>

                                    {" "}

                                    {editId
                                        ? "Update Doctor"
                                        : "Add Doctor"
                                    }

                                </button>


                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={resetForm}
                                >
                                    Cancel
                                </button>

                            </form>

                        </div>

                    </div>

                )}


                {/* ======================================
                    Doctors Table
                ====================================== */}

                <div className="card shadow">

                    <div className="card-header">

                        <h5 className="mb-0">
                            Doctor List
                        </h5>

                    </div>


                    <div className="card-body">

                        {loading ? (

                            <div className="text-center p-4">

                                <div
                                    className="spinner-border text-primary"
                                    role="status"
                                ></div>

                                <p className="mt-2">
                                    Loading doctors...
                                </p>

                            </div>

                        ) : doctors.length === 0 ? (

                            <div className="alert alert-warning">

                                <i className="bi bi-info-circle"></i>

                                {" "}

                                {search
                                    ? "No doctors found for your search."
                                    : "No doctors available."
                                }

                            </div>

                        ) : (

                            <div className="table-responsive">

                                <table className="table table-bordered table-hover">

                                    <thead className="table-dark">

                                        <tr>

                                            <th>ID</th>

                                            <th>Name</th>

                                            <th>Specialization</th>

                                            <th>Phone</th>

                                            <th>Email</th>

                                            <th>Actions</th>

                                        </tr>

                                    </thead>


                                    <tbody>

                                        {doctors.map((item) => (

                                            <tr key={item.id}>

                                                <td>
                                                    {item.id}
                                                </td>

                                                <td>
                                                    {item.name}
                                                </td>

                                                <td>
                                                    {item.specialization}
                                                </td>

                                                <td>
                                                    {item.phone}
                                                </td>

                                                <td>
                                                    {item.email}
                                                </td>

                                                <td>

                                                    <button
                                                        className="btn btn-sm btn-warning me-2"
                                                        onClick={() =>
                                                            handleEdit(item)
                                                        }
                                                    >

                                                        <i className="bi bi-pencil"></i>
                                                        {" "}Edit

                                                    </button>


                                                    <button
                                                        className="btn btn-sm btn-danger"
                                                        onClick={() =>
                                                            handleDelete(item.id)
                                                        }
                                                    >

                                                        <i className="bi bi-trash"></i>
                                                        {" "}Delete

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

export default Doctors;