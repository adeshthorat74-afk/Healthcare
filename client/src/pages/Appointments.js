import React, { useEffect, useState } from "react";

import {
    getAppointments,
    addAppointment,
    updateAppointment,
    deleteAppointment
} from "../services/api";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";


function Appointments() {

    // ======================================
    // STATE
    // ======================================

    const [appointments, setAppointments] = useState([]);

    const [editingId, setEditingId] = useState(null);

    const [search, setSearch] = useState("");

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [appointment, setAppointment] = useState({
        patient_id: "",
        doctor_id: "",
        appointment_date: "",
        appointment_time: "",
        status: "Pending"
    });


    // ======================================
    // LOAD APPOINTMENTS WHEN PAGE OPENS
    // ======================================

    useEffect(() => {

        loadAppointments();

    }, []);


    // ======================================
    // LOAD ALL APPOINTMENTS
    // ======================================

    const loadAppointments = async () => {

        try {

            setLoading(true);

            setError("");

            const response = await getAppointments();

            console.log(
                "Appointments API Response:",
                response.data
            );


            // ======================================
            // HANDLE BOTH RESPONSE FORMATS
            // ======================================

            if (Array.isArray(response.data)) {

                // Backend returns:
                // [ {...}, {...} ]

                setAppointments(response.data);

            }

            else if (
                response.data &&
                Array.isArray(response.data.data)
            ) {

                // Backend returns:
                // {
                //     success: true,
                //     data: [...]
                // }

                setAppointments(response.data.data);

            }

            else {

                console.warn(
                    "Invalid appointments response:",
                    response.data
                );

                setAppointments([]);

            }

        }

        catch (err) {

            console.error(
                "Error Loading Appointments:",
                err
            );

            setAppointments([]);

            setError(
                err.response?.data?.message ||
                "Failed to load appointments"
            );

        }

        finally {

            setLoading(false);

        }

    };


    // ======================================
    // HANDLE INPUT CHANGE
    // ======================================

    const handleChange = (e) => {

        const {
            name,
            value
        } = e.target;


        setAppointment({

            ...appointment,

            [name]: value

        });

    };


    // ======================================
    // RESET FORM
    // ======================================

    const resetForm = () => {

        setAppointment({

            patient_id: "",
            doctor_id: "",
            appointment_date: "",
            appointment_time: "",
            status: "Pending"

        });

        setEditingId(null);

    };


    // ======================================
    // ADD / UPDATE APPOINTMENT
    // ======================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setError("");


            // ==================================
            // ADD
            // ==================================

            if (editingId === null) {

                await addAppointment(appointment);

                alert(
                    "Appointment Added Successfully"
                );

            }


            // ==================================
            // UPDATE
            // ==================================

            else {

                await updateAppointment(
                    editingId,
                    appointment
                );

                alert(
                    "Appointment Updated Successfully"
                );

            }


            // ==================================
            // RESET
            // ==================================

            resetForm();


            // ==================================
            // RELOAD LIST
            // ==================================

            await loadAppointments();

        }

        catch (err) {

            console.error(
                "Appointment Operation Error:",
                err
            );

            alert(
                err.response?.data?.message ||
                "Operation Failed"
            );

        }

    };


    // ======================================
    // EDIT APPOINTMENT
    // ======================================

    const handleEdit = (item) => {

        setAppointment({

            patient_id:
                item.patient_id || "",

            doctor_id:
                item.doctor_id || "",


            appointment_date:
                item.appointment_date
                    ? String(
                        item.appointment_date
                    ).substring(0, 10)
                    : "",


            appointment_time:
                item.appointment_time
                    ? String(
                        item.appointment_time
                    ).substring(0, 5)
                    : "",


            status:
                item.status || "Pending"

        });


        setEditingId(item.id);


        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    };


    // ======================================
    // DELETE APPOINTMENT
    // ======================================

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this appointment?"
        );


        if (!confirmDelete) {

            return;

        }


        try {

            setError("");


            await deleteAppointment(id);


            alert(
                "Appointment Deleted Successfully"
            );


            await loadAppointments();

        }

        catch (err) {

            console.error(
                "Delete Appointment Error:",
                err
            );


            alert(
                err.response?.data?.message ||
                "Delete Failed"
            );

        }

    };


    // ======================================
    // SEARCH APPOINTMENTS
    // ======================================

    const filteredAppointments =

        Array.isArray(appointments)

            ?

            appointments.filter((item) => {

                const searchText =
                    search
                        .toLowerCase()
                        .trim();


                // Show everything
                // when search is empty

                if (!searchText) {

                    return true;

                }


                return (

                    String(item.id || "")
                        .toLowerCase()
                        .includes(searchText)


                    ||


                    String(
                        item.patient_id || ""
                    )
                        .toLowerCase()
                        .includes(searchText)


                    ||


                    String(
                        item.doctor_id || ""
                    )
                        .toLowerCase()
                        .includes(searchText)


                    ||


                    String(
                        item.status || ""
                    )
                        .toLowerCase()
                        .includes(searchText)


                    ||


                    String(
                        item.appointment_date || ""
                    )
                        .toLowerCase()
                        .includes(searchText)

                );

            })

            :

            [];


    // ======================================
    // PAGE
    // ======================================

    return (

        <>

            {/* ==================================
                SIDEBAR
            ================================== */}

            <Sidebar />


            {/* ==================================
                NAVBAR
            ================================== */}

            <Navbar />


            {/* ==================================
                MAIN CONTENT
            ================================== */}

            <div
                className="container-fluid"
                style={{
                    marginLeft: "240px",
                    padding: "30px",
                    width: "calc(100% - 240px)"
                }}
            >


                {/* ==================================
                    HEADER
                ================================== */}

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <div>

                        <h2 className="fw-bold">

                            <i className="bi bi-calendar-check me-2"></i>

                            Appointment Management

                        </h2>


                        <p className="text-muted">

                            Manage hospital appointments

                        </p>

                    </div>


                    <span className="badge bg-primary fs-6">

                        Total:
                        {" "}
                        {appointments.length}

                    </span>

                </div>


                {/* ==================================
                    ERROR MESSAGE
                ================================== */}

                {error && (

                    <div
                        className="alert alert-danger"
                        role="alert"
                    >

                        <i className="bi bi-exclamation-triangle me-2"></i>

                        {error}

                    </div>

                )}


                {/* ==================================
                    ADD / UPDATE FORM
                ================================== */}

                <div className="card shadow-sm mb-4">


                    {/* CARD HEADER */}

                    <div className="card-header bg-primary text-white">

                        <h5 className="mb-0">

                            {editingId === null

                                ?

                                "Add New Appointment"

                                :

                                "Update Appointment"

                            }

                        </h5>

                    </div>


                    {/* CARD BODY */}

                    <div className="card-body">


                        <form
                            onSubmit={handleSubmit}
                        >


                            <div className="row g-3">


                                {/* ==================================
                                    PATIENT ID
                                ================================== */}

                                <div className="col-md-6">

                                    <label className="form-label fw-bold">

                                        Patient ID

                                    </label>


                                    <input
                                        type="number"
                                        name="patient_id"
                                        className="form-control"
                                        placeholder="Enter Patient ID"
                                        value={
                                            appointment.patient_id
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        required
                                    />

                                </div>


                                {/* ==================================
                                    DOCTOR ID
                                ================================== */}

                                <div className="col-md-6">

                                    <label className="form-label fw-bold">

                                        Doctor ID

                                    </label>


                                    <input
                                        type="number"
                                        name="doctor_id"
                                        className="form-control"
                                        placeholder="Enter Doctor ID"
                                        value={
                                            appointment.doctor_id
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        required
                                    />

                                </div>


                                {/* ==================================
                                    APPOINTMENT DATE
                                ================================== */}

                                <div className="col-md-6">

                                    <label className="form-label fw-bold">

                                        Appointment Date

                                    </label>


                                    <input
                                        type="date"
                                        name="appointment_date"
                                        className="form-control"
                                        value={
                                            appointment.appointment_date
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        required
                                    />

                                </div>


                                {/* ==================================
                                    APPOINTMENT TIME
                                ================================== */}

                                <div className="col-md-6">

                                    <label className="form-label fw-bold">

                                        Appointment Time

                                    </label>


                                    <input
                                        type="time"
                                        name="appointment_time"
                                        className="form-control"
                                        value={
                                            appointment.appointment_time
                                        }
                                        onChange={
                                            handleChange
                                        }
                                        required
                                    />

                                </div>


                                {/* ==================================
                                    STATUS
                                ================================== */}

                                <div className="col-md-6">

                                    <label className="form-label fw-bold">

                                        Status

                                    </label>


                                    <select
                                        name="status"
                                        className="form-select"
                                        value={
                                            appointment.status
                                        }
                                        onChange={
                                            handleChange
                                        }
                                    >

                                        <option value="Pending">
                                            Pending
                                        </option>

                                        <option value="Completed">
                                            Completed
                                        </option>

                                        <option value="Cancelled">
                                            Cancelled
                                        </option>

                                    </select>

                                </div>


                                {/* ==================================
                                    BUTTONS
                                ================================== */}

                                <div className="col-md-6 d-flex align-items-end">


                                    <button
                                        type="submit"
                                        className="btn btn-primary me-2"
                                    >

                                        <i
                                            className={
                                                editingId === null
                                                    ? "bi bi-check-circle me-2"
                                                    : "bi bi-pencil-square me-2"
                                            }
                                        ></i>


                                        {editingId === null

                                            ?

                                            "Add Appointment"

                                            :

                                            "Update Appointment"

                                        }

                                    </button>


                                    {/* CANCEL BUTTON */}

                                    {editingId !== null && (

                                        <button
                                            type="button"
                                            className="btn btn-secondary"
                                            onClick={
                                                resetForm
                                            }
                                        >

                                            <i className="bi bi-x-circle me-2"></i>

                                            Cancel

                                        </button>

                                    )}

                                </div>


                            </div>


                        </form>

                    </div>

                </div>


                {/* ==================================
                    SEARCH
                ================================== */}

                <div className="card shadow-sm mb-4">

                    <div className="card-body">

                        <label className="form-label fw-bold">

                            <i className="bi bi-search me-2"></i>

                            Search Appointment

                        </label>


                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by ID, Patient ID, Doctor ID, Date or Status..."
                            value={search}
                            onChange={(e) =>
                                setSearch(
                                    e.target.value
                                )
                            }
                        />

                    </div>

                </div>


                {/* ==================================
                    APPOINTMENT TABLE
                ================================== */}

                <div className="card shadow-sm">


                    {/* TABLE HEADER */}

                    <div className="card-header">

                        <h5 className="mb-0">

                            Appointment List

                        </h5>

                    </div>


                    {/* TABLE BODY */}

                    <div className="card-body p-0">

                        <div className="table-responsive">


                            <table className="table table-bordered table-hover mb-0">


                                {/* ==================================
                                    TABLE HEAD
                                ================================== */}

                                <thead className="table-dark">

                                    <tr>

                                        <th>ID</th>

                                        <th>Patient ID</th>

                                        <th>Doctor ID</th>

                                        <th>Date</th>

                                        <th>Time</th>

                                        <th>Status</th>

                                        <th>Actions</th>

                                    </tr>

                                </thead>


                                {/* ==================================
                                    TABLE BODY
                                ================================== */}

                                <tbody>


                                    {/* LOADING */}

                                    {loading ? (

                                        <tr>

                                            <td
                                                colSpan="7"
                                                className="text-center py-4"
                                            >

                                                <div
                                                    className="spinner-border text-primary"
                                                ></div>


                                                <p className="mt-2 mb-0">

                                                    Loading appointments...

                                                </p>

                                            </td>

                                        </tr>

                                    )


                                    :


                                    /* NO DATA */

                                    filteredAppointments.length === 0 ? (

                                        <tr>

                                            <td
                                                colSpan="7"
                                                className="text-center text-muted py-4"
                                            >

                                                <i className="bi bi-calendar-x fs-3 d-block mb-2"></i>

                                                No appointments found.

                                            </td>

                                        </tr>

                                    )


                                    :


                                    /* SHOW APPOINTMENTS */

                                    (

                                        filteredAppointments.map(
                                            (item) => (

                                                <tr
                                                    key={item.id}
                                                >


                                                    {/* ID */}

                                                    <td>

                                                        {item.id}

                                                    </td>


                                                    {/* PATIENT */}

                                                    <td>

                                                        {item.patient_id}

                                                    </td>


                                                    {/* DOCTOR */}

                                                    <td>

                                                        {item.doctor_id}

                                                    </td>


                                                    {/* DATE */}

                                                    <td>

                                                        {item.appointment_date
                                                            ? String(
                                                                item.appointment_date
                                                            ).substring(
                                                                0,
                                                                10
                                                            )
                                                            : "-"
                                                        }

                                                    </td>


                                                    {/* TIME */}

                                                    <td>

                                                        {item.appointment_time
                                                            ? String(
                                                                item.appointment_time
                                                            ).substring(
                                                                0,
                                                                5
                                                            )
                                                            : "-"
                                                        }

                                                    </td>


                                                    {/* STATUS */}

                                                    <td>

                                                        <span
                                                            className={

                                                                item.status === "Completed"

                                                                    ?

                                                                    "badge bg-success"

                                                                    :

                                                                item.status === "Cancelled"

                                                                    ?

                                                                    "badge bg-danger"

                                                                    :

                                                                    "badge bg-warning text-dark"

                                                            }
                                                        >

                                                            {item.status || "Pending"}

                                                        </span>

                                                    </td>


                                                    {/* ACTIONS */}

                                                    <td>


                                                        {/* EDIT */}

                                                        <button
                                                            type="button"
                                                            className="btn btn-sm btn-warning me-2"
                                                            onClick={() =>
                                                                handleEdit(
                                                                    item
                                                                )
                                                            }
                                                        >

                                                            <i className="bi bi-pencil-square"></i>

                                                        </button>


                                                        {/* DELETE */}

                                                        <button
                                                            type="button"
                                                            className="btn btn-sm btn-danger"
                                                            onClick={() =>
                                                                handleDelete(
                                                                    item.id
                                                                )
                                                            }
                                                        >

                                                            <i className="bi bi-trash"></i>

                                                        </button>


                                                    </td>


                                                </tr>

                                            )
                                        )

                                    )}

                                </tbody>


                            </table>

                        </div>

                    </div>

                </div>


            </div>

        </>

    );

}


export default Appointments;