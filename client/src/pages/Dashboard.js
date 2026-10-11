import React, { useEffect, useState } from "react";

import {
    getDashboard,
    getActivities
} from "../services/api";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import DashboardChart from "../charts/DashboardChart";

import "../css/dashboard.css";

function Dashboard() {

    // ======================================
    // DASHBOARD STATE
    // ======================================

    const [dashboard, setDashboard] = useState({
        totalDoctors: 0,
        totalPatients: 0,
        totalAppointments: 0,
        totalBills: 0,
        totalRevenue: 0,

        recentDoctors: [],
        recentPatients: [],
        recentAppointments: []
    });


    // ======================================
    // ACTIVITY STATE
    // ======================================

    const [activities, setActivities] = useState([]);

    const [loading, setLoading] = useState(true);

    const [refreshing, setRefreshing] = useState(false);


    // ======================================
    // LOAD DATA
    // ======================================

    useEffect(() => {

        loadDashboard();
        loadActivities();

    }, []);


    // ======================================
    // LOAD DASHBOARD
    // ======================================

    const loadDashboard = async () => {

        try {

            const res = await getDashboard();

            const data = res.data || {};

            setDashboard({

                totalDoctors:
                    Number(data.totalDoctors) || 0,

                totalPatients:
                    Number(data.totalPatients) || 0,

                totalAppointments:
                    Number(data.totalAppointments) || 0,

                totalBills:
                    Number(data.totalBills) || 0,

                totalRevenue:
                    Number(data.totalRevenue) || 0,

                recentDoctors:
                    Array.isArray(data.recentDoctors)
                        ? data.recentDoctors
                        : [],

                recentPatients:
                    Array.isArray(data.recentPatients)
                        ? data.recentPatients
                        : [],

                recentAppointments:
                    Array.isArray(data.recentAppointments)
                        ? data.recentAppointments
                        : []

            });

        } catch (error) {

            console.error(
                "Dashboard Error:",
                error
            );

            alert(
                error.response?.data?.message ||
                "Unable to load dashboard"
            );

        } finally {

            setLoading(false);

        }

    };


    // ======================================
    // LOAD ACTIVITIES
    // ======================================

    const loadActivities = async () => {

        try {

            const res = await getActivities();

            const data =
                res.data?.data ||
                res.data ||
                [];

            if (Array.isArray(data)) {

                setActivities(
                    data.slice(0, 5)
                );

            } else {

                setActivities([]);

            }

        } catch (error) {

            console.error(
                "Activity Load Error:",
                error
            );

            setActivities([]);

        }

    };


    // ======================================
    // REFRESH DASHBOARD
    // ======================================

    const refreshDashboard = async () => {

        try {

            setRefreshing(true);

            await Promise.all([
                loadDashboard(),
                loadActivities()
            ]);

        } finally {

            setRefreshing(false);

        }

    };


    // ======================================
    // LOADING SCREEN
    // ======================================

    if (loading) {

        return (

            <>

                <Sidebar />

                <Navbar />

                <div
                    className="container-fluid"
                    style={{
                        marginLeft: "240px",
                        padding: "40px"
                    }}
                >

                    <div className="text-center mt-5">

                        <div
                            className="spinner-border text-primary"
                            role="status"
                        >
                        </div>

                        <h5 className="mt-3">
                            Loading Dashboard...
                        </h5>

                    </div>

                </div>

            </>

        );

    }


    return (

        <>

            <Sidebar />

            <Navbar />


            <div
                className="container-fluid"
                style={{
                    marginLeft: "240px",
                    padding: "30px"
                }}
            >


                {/* ======================================
                    HEADER
                ====================================== */}

                <div
                    className="d-flex justify-content-between align-items-center mb-4"
                >

                    <div>

                        <h2 className="page-title mb-1">

                            🏥 Hospital Dashboard

                        </h2>

                        <p className="text-muted mb-0">

                            Hospital Management System Overview

                        </p>

                    </div>


                    <button
                        className="btn btn-outline-primary"
                        onClick={refreshDashboard}
                        disabled={refreshing}
                    >

                        {refreshing ? (
                            <>
                                <span
                                    className="spinner-border spinner-border-sm me-2"
                                />
                                Refreshing...
                            </>
                        ) : (
                            <>
                                🔄 Refresh
                            </>
                        )}

                    </button>

                </div>



                {/* ======================================
                    DASHBOARD CARDS
                ====================================== */}

                <div className="row">


                    {/* Doctors */}

                    <div className="col-md-3 mb-3">

                        <div
                            className="card dashboard-card shadow text-center p-4 h-100"
                        >

                            <div className="fs-1">
                                👨‍⚕️
                            </div>

                            <h5>
                                Doctors
                            </h5>

                            <h2>
                                {dashboard.totalDoctors}
                            </h2>

                        </div>

                    </div>



                    {/* Patients */}

                    <div className="col-md-3 mb-3">

                        <div
                            className="card dashboard-card shadow text-center p-4 h-100"
                        >

                            <div className="fs-1">
                                🧑
                            </div>

                            <h5>
                                Patients
                            </h5>

                            <h2>
                                {dashboard.totalPatients}
                            </h2>

                        </div>

                    </div>



                    {/* Appointments */}

                    <div className="col-md-3 mb-3">

                        <div
                            className="card dashboard-card shadow text-center p-4 h-100"
                        >

                            <div className="fs-1">
                                📅
                            </div>

                            <h5>
                                Appointments
                            </h5>

                            <h2>
                                {dashboard.totalAppointments}
                            </h2>

                        </div>

                    </div>



                    {/* Revenue */}

                    <div className="col-md-3 mb-3">

                        <div
                            className="card dashboard-card shadow text-center p-4 h-100"
                        >

                            <div className="fs-1">
                                💰
                            </div>

                            <h5>
                                Revenue
                            </h5>

                            <h2>
                                ₹ {dashboard.totalRevenue}
                            </h2>

                        </div>

                    </div>

                </div>



                {/* ======================================
                    QUICK ACTIONS
                ====================================== */}

                <div className="row mt-4">


                    <div className="col-md-3 mb-3">

                        <div className="card border-primary shadow text-center p-3">

                            <h5>
                                👨‍⚕️ Doctors
                            </h5>

                            <a
                                href="/doctors"
                                className="btn btn-primary mt-2"
                            >
                                Manage Doctors
                            </a>

                        </div>

                    </div>



                    <div className="col-md-3 mb-3">

                        <div className="card border-success shadow text-center p-3">

                            <h5>
                                🧑 Patients
                            </h5>

                            <a
                                href="/patients"
                                className="btn btn-success mt-2"
                            >
                                Manage Patients
                            </a>

                        </div>

                    </div>



                    <div className="col-md-3 mb-3">

                        <div className="card border-warning shadow text-center p-3">

                            <h5>
                                📅 Appointments
                            </h5>

                            <a
                                href="/appointments"
                                className="btn btn-warning mt-2"
                            >
                                Manage Appointments
                            </a>

                        </div>

                    </div>



                    <div className="col-md-3 mb-3">

                        <div className="card border-danger shadow text-center p-3">

                            <h5>
                                💰 Bills
                            </h5>

                            <a
                                href="/bills"
                                className="btn btn-danger mt-2"
                            >
                                Manage Bills
                            </a>

                        </div>

                    </div>

                </div>



                {/* ======================================
                    DASHBOARD CHART
                ====================================== */}

                <div className="mt-5">

                    <DashboardChart
                        dashboard={dashboard}
                    />

                </div>



                {/* ======================================
                    HOSPITAL SUMMARY
                ====================================== */}

                <div className="card mt-5 shadow border-0">

                    <div className="card-header bg-dark text-white">

                        <h5 className="mb-0">
                            📊 Hospital Summary
                        </h5>

                    </div>


                    <div className="card-body">

                        <div className="row text-center">


                            <div className="col-md-3">

                                <h3>
                                    {dashboard.totalDoctors}
                                </h3>

                                <p className="text-muted">
                                    Total Doctors
                                </p>

                            </div>


                            <div className="col-md-3">

                                <h3>
                                    {dashboard.totalPatients}
                                </h3>

                                <p className="text-muted">
                                    Total Patients
                                </p>

                            </div>


                            <div className="col-md-3">

                                <h3>
                                    {dashboard.totalAppointments}
                                </h3>

                                <p className="text-muted">
                                    Total Appointments
                                </p>

                            </div>


                            <div className="col-md-3">

                                <h3>
                                    ₹ {dashboard.totalRevenue}
                                </h3>

                                <p className="text-muted">
                                    Total Revenue
                                </p>

                            </div>

                        </div>

                    </div>

                </div>



                {/* ======================================
                    RECENT DOCTORS
                ====================================== */}

                <div className="card mt-5 shadow border-0">

                    <div className="card-header bg-primary text-white">

                        <h5 className="mb-0">
                            👨‍⚕️ Recent Doctors
                        </h5>

                    </div>


                    <div className="card-body">

                        <div className="table-responsive">

                            <table className="table table-striped table-hover table-bordered">

                                <thead className="table-light">

                                    <tr>

                                        <th>ID</th>

                                        <th>Name</th>

                                        <th>Specialization</th>

                                        <th>Phone</th>

                                    </tr>

                                </thead>


                                <tbody>

                                    {dashboard.recentDoctors.length > 0 ? (

                                        dashboard.recentDoctors.map(
                                            (doctor) => (

                                                <tr
                                                    key={doctor.id}
                                                >

                                                    <td>
                                                        {doctor.id}
                                                    </td>

                                                    <td>
                                                        {doctor.name}
                                                    </td>

                                                    <td>
                                                        {doctor.specialization}
                                                    </td>

                                                    <td>
                                                        {doctor.phone}
                                                    </td>

                                                </tr>

                                            )
                                        )

                                    ) : (

                                        <tr>

                                            <td
                                                colSpan="4"
                                                className="text-center text-muted"
                                            >
                                                No Doctors Found
                                            </td>

                                        </tr>

                                    )}

                                </tbody>

                            </table>

                        </div>

                    </div>

                </div>



                {/* ======================================
                    RECENT PATIENTS
                ====================================== */}

                <div className="card mt-5 shadow border-0">

                    <div className="card-header bg-success text-white">

                        <h5 className="mb-0">
                            🧑 Recent Patients
                        </h5>

                    </div>


                    <div className="card-body">

                        <div className="table-responsive">

                            <table className="table table-striped table-hover table-bordered">

                                <thead className="table-light">

                                    <tr>

                                        <th>ID</th>

                                        <th>Name</th>

                                        <th>Phone</th>

                                        <th>Gender</th>

                                    </tr>

                                </thead>


                                <tbody>

                                    {dashboard.recentPatients.length > 0 ? (

                                        dashboard.recentPatients.map(
                                            (patient) => (

                                                <tr
                                                    key={patient.id}
                                                >

                                                    <td>
                                                        {patient.id}
                                                    </td>

                                                    <td>
                                                        {patient.name}
                                                    </td>

                                                    <td>
                                                        {patient.phone}
                                                    </td>

                                                    <td>
                                                        {patient.gender}
                                                    </td>

                                                </tr>

                                            )
                                        )

                                    ) : (

                                        <tr>

                                            <td
                                                colSpan="4"
                                                className="text-center text-muted"
                                            >
                                                No Patients Found
                                            </td>

                                        </tr>

                                    )}

                                </tbody>

                            </table>

                        </div>

                    </div>

                </div>



                {/* ======================================
                    RECENT APPOINTMENTS
                ====================================== */}

                <div className="card mt-5 shadow border-0">

                    <div className="card-header bg-warning text-dark">

                        <h5 className="mb-0">
                            📅 Recent Appointments
                        </h5>

                    </div>


                    <div className="card-body">

                        <div className="table-responsive">

                            <table className="table table-striped table-hover table-bordered">

                                <thead className="table-light">

                                    <tr>

                                        <th>ID</th>

                                        <th>Patient ID</th>

                                        <th>Doctor ID</th>

                                        <th>Date</th>

                                    </tr>

                                </thead>


                                <tbody>

                                    {dashboard.recentAppointments.length > 0 ? (

                                        dashboard.recentAppointments.map(
                                            (appointment) => (

                                                <tr
                                                    key={appointment.id}
                                                >

                                                    <td>
                                                        {appointment.id}
                                                    </td>

                                                    <td>
                                                        {appointment.patient_id}
                                                    </td>

                                                    <td>
                                                        {appointment.doctor_id}
                                                    </td>

                                                    <td>
                                                        {appointment.appointment_date}
                                                    </td>

                                                </tr>

                                            )
                                        )

                                    ) : (

                                        <tr>

                                            <td
                                                colSpan="4"
                                                className="text-center text-muted"
                                            >
                                                No Appointments Found
                                            </td>

                                        </tr>

                                    )}

                                </tbody>

                            </table>

                        </div>

                    </div>

                </div>



                {/* ======================================
                    RECENT ACTIVITY
                ====================================== */}

                <div className="card mt-5 shadow border-0">

                    <div className="card-header bg-dark text-white">

                        <div className="d-flex justify-content-between align-items-center">

                            <h5 className="mb-0">
                                📋 Recent Activity
                            </h5>

                            <a
                                href="/activity"
                                className="btn btn-sm btn-light"
                            >
                                View All
                            </a>

                        </div>

                    </div>


                    <div className="card-body p-0">

                        {activities.length === 0 ? (

                            <div className="text-center p-4">

                                <p className="text-muted mb-0">
                                    No recent activity found.
                                </p>

                            </div>

                        ) : (

                            <div className="table-responsive">

                                <table className="table table-hover mb-0">

                                    <thead className="table-light">

                                        <tr>

                                            <th>#</th>

                                            <th>Action</th>

                                            <th>Description</th>

                                            <th>Date & Time</th>

                                        </tr>

                                    </thead>


                                    <tbody>

                                        {activities.map(
                                            (activity, index) => (

                                                <tr
                                                    key={activity.id}
                                                >

                                                    <td>
                                                        {index + 1}
                                                    </td>


                                                    <td>

                                                        <span
                                                            className={
                                                                activity.action?.includes("DELETE")
                                                                    ? "badge bg-danger"
                                                                    : activity.action?.includes("UPDATE")
                                                                    ? "badge bg-warning text-dark"
                                                                    : activity.action?.includes("ADD")
                                                                    ? "badge bg-success"
                                                                    : "badge bg-primary"
                                                            }
                                                        >

                                                            {activity.action}

                                                        </span>

                                                    </td>


                                                    <td>

                                                        {activity.description ||
                                                            "-"}

                                                    </td>


                                                    <td>

                                                        <small className="text-muted">

                                                            {activity.created_at
                                                                ? new Date(
                                                                    activity.created_at
                                                                ).toLocaleString(
                                                                    "en-IN"
                                                                )
                                                                : "-"}

                                                        </small>

                                                    </td>

                                                </tr>

                                            )
                                        )}

                                    </tbody>

                                </table>

                            </div>

                        )}

                    </div>

                </div>


                {/* ======================================
                    FOOTER SPACE
                ====================================== */}

                <div className="py-4"></div>

            </div>

        </>

    );

}

export default Dashboard;