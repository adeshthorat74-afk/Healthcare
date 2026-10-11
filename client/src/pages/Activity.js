import React, { useEffect, useState } from "react";

import {
    getActivities,
    deleteActivity
} from "../services/api";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Activity() {

    const [activities, setActivities] = useState([]);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    const [filter, setFilter] = useState("ALL");


    // ======================================
    // LOAD ACTIVITIES
    // ======================================

    useEffect(() => {

        loadActivities();

    }, []);


    const loadActivities = async () => {

        try {

            setLoading(true);

            const res = await getActivities();

            console.log(
                "Activity Response:",
                res.data
            );

            const data =
                res.data?.data ||
                res.data ||
                [];

            setActivities(
                Array.isArray(data)
                    ? data
                    : []
            );

        } catch (error) {

            console.error(
                "Activity Error:",
                error
            );

            alert(
                error.response?.data?.message ||
                "Unable to load activities"
            );

        } finally {

            setLoading(false);

        }

    };


    // ======================================
    // DELETE ACTIVITY
    // ======================================

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this activity?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            await deleteActivity(id);

            setActivities(
                activities.filter(
                    (activity) =>
                        activity.id !== id
                )
            );

        } catch (error) {

            console.error(
                "Delete Activity Error:",
                error
            );

            alert(
                error.response?.data?.message ||
                "Unable to delete activity"
            );

        }

    };


    // ======================================
    // ACTION BADGE
    // ======================================

    const getActionBadge = (action) => {

        if (!action) {
            return (
                <span className="badge bg-secondary">
                    UNKNOWN
                </span>
            );
        }

        if (action.includes("ADD")) {

            return (
                <span className="badge bg-success">
                    {action}
                </span>
            );

        }

        if (action.includes("UPDATE")) {

            return (
                <span className="badge bg-primary">
                    {action}
                </span>
            );

        }

        if (action.includes("DELETE")) {

            return (
                <span className="badge bg-danger">
                    {action}
                </span>
            );

        }

        if (
            action.includes("LOGIN") ||
            action.includes("PASSWORD")
        ) {

            return (
                <span className="badge bg-warning text-dark">
                    {action}
                </span>
            );

        }

        return (
            <span className="badge bg-secondary">
                {action}
            </span>
        );

    };


    // ======================================
    // FORMAT DATE
    // ======================================

    const formatDate = (date) => {

        if (!date) {
            return "-";
        }

        return new Date(date).toLocaleString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit"
            }
        );

    };


    // ======================================
    // FILTER ACTIVITIES
    // ======================================

    const filteredActivities =
        activities.filter((activity) => {

            const searchText =
                search.toLowerCase();

            const matchesSearch =
                activity.action
                    ?.toLowerCase()
                    .includes(searchText) ||

                activity.description
                    ?.toLowerCase()
                    .includes(searchText) ||

                activity.user_name
                    ?.toLowerCase()
                    .includes(searchText);


            const matchesFilter =
                filter === "ALL" ||
                activity.action === filter;


            return (
                matchesSearch &&
                matchesFilter
            );

        });


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
                    padding: "30px",
                    minHeight: "100vh",
                    backgroundColor: "#f5f7fb"
                }}
            >

                {/* ======================================
                    HEADER
                ====================================== */}

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <div>

                        <h2 className="fw-bold mb-1">
                            📋 Activity Log
                        </h2>

                        <p className="text-muted mb-0">
                            Track all important activities
                            performed in the hospital system.
                        </p>

                    </div>

                    <button
                        className="btn btn-primary"
                        onClick={loadActivities}
                    >
                        🔄 Refresh
                    </button>

                </div>


                {/* ======================================
                    SUMMARY
                ====================================== */}

                <div className="row mb-4">

                    <div className="col-md-4 mb-3">

                        <div className="card border-0 shadow-sm">

                            <div className="card-body">

                                <small className="text-muted">
                                    Total Activities
                                </small>

                                <h3 className="fw-bold mt-2">
                                    {activities.length}
                                </h3>

                            </div>

                        </div>

                    </div>


                    <div className="col-md-4 mb-3">

                        <div className="card border-0 shadow-sm">

                            <div className="card-body">

                                <small className="text-muted">
                                    Showing
                                </small>

                                <h3 className="fw-bold mt-2">
                                    {filteredActivities.length}
                                </h3>

                            </div>

                        </div>

                    </div>


                    <div className="col-md-4 mb-3">

                        <div className="card border-0 shadow-sm">

                            <div className="card-body">

                                <small className="text-muted">
                                    Latest Activity
                                </small>

                                <h6 className="fw-bold mt-2">

                                    {activities.length > 0
                                        ? activities[0].action
                                        : "No Activity"
                                    }

                                </h6>

                            </div>

                        </div>

                    </div>

                </div>


                {/* ======================================
                    SEARCH & FILTER
                ====================================== */}

                <div className="card border-0 shadow-sm mb-4">

                    <div className="card-body">

                        <div className="row">

                            <div className="col-md-8 mb-2">

                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="🔍 Search activity, user or description..."
                                    value={search}
                                    onChange={(e) =>
                                        setSearch(
                                            e.target.value
                                        )
                                    }
                                />

                            </div>


                            <div className="col-md-4 mb-2">

                                <select
                                    className="form-select"
                                    value={filter}
                                    onChange={(e) =>
                                        setFilter(
                                            e.target.value
                                        )
                                    }
                                >

                                    <option value="ALL">
                                        All Activities
                                    </option>

                                    <option value="ADD_DOCTOR">
                                        Add Doctor
                                    </option>

                                    <option value="UPDATE_DOCTOR">
                                        Update Doctor
                                    </option>

                                    <option value="DELETE_DOCTOR">
                                        Delete Doctor
                                    </option>

                                    <option value="ADD_PATIENT">
                                        Add Patient
                                    </option>

                                    <option value="UPDATE_PATIENT">
                                        Update Patient
                                    </option>

                                    <option value="DELETE_PATIENT">
                                        Delete Patient
                                    </option>

                                    <option value="ADD_APPOINTMENT">
                                        Add Appointment
                                    </option>

                                    <option value="UPDATE_APPOINTMENT">
                                        Update Appointment
                                    </option>

                                    <option value="DELETE_APPOINTMENT">
                                        Delete Appointment
                                    </option>

                                    <option value="ADD_BILL">
                                        Add Bill
                                    </option>

                                    <option value="UPDATE_BILL">
                                        Update Bill
                                    </option>

                                    <option value="DELETE_BILL">
                                        Delete Bill
                                    </option>

                                    <option value="UPDATE_PROFILE">
                                        Update Profile
                                    </option>

                                    <option value="CHANGE_PASSWORD">
                                        Change Password
                                    </option>

                                    <option value="UPDATE_SETTINGS">
                                        Update Settings
                                    </option>

                                </select>

                            </div>

                        </div>

                    </div>

                </div>


                {/* ======================================
                    ACTIVITY TABLE
                ====================================== */}

                <div className="card border-0 shadow-sm">

                    <div className="card-body p-0">

                        {loading ? (

                            <div className="text-center p-5">

                                <div
                                    className="spinner-border text-primary"
                                    role="status"
                                />

                                <p className="text-muted mt-3">
                                    Loading activities...
                                </p>

                            </div>

                        ) : filteredActivities.length === 0 ? (

                            <div className="text-center p-5">

                                <div
                                    style={{
                                        fontSize: "55px"
                                    }}
                                >
                                    📭
                                </div>

                                <h5 className="mt-3">
                                    No Activities Found
                                </h5>

                                <p className="text-muted">
                                    There are no activities
                                    matching your search.
                                </p>

                            </div>

                        ) : (

                            <div className="table-responsive">

                                <table className="table table-hover align-middle mb-0">

                                    <thead className="table-light">

                                        <tr>

                                            <th className="px-4">
                                                #
                                            </th>

                                            <th>
                                                User
                                            </th>

                                            <th>
                                                Action
                                            </th>

                                            <th>
                                                Description
                                            </th>

                                            <th>
                                                Date & Time
                                            </th>

                                            <th className="text-center">
                                                Action
                                            </th>

                                        </tr>

                                    </thead>


                                    <tbody>

                                        {filteredActivities.map(
                                            (activity, index) => (

                                                <tr
                                                    key={
                                                        activity.id
                                                    }
                                                >

                                                    <td className="px-4 fw-semibold">

                                                        {index + 1}

                                                    </td>


                                                    <td>

                                                        <div className="d-flex align-items-center">

                                                            <div
                                                                className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-2"
                                                                style={{
                                                                    width: "38px",
                                                                    height: "38px"
                                                                }}
                                                            >
                                                                👤
                                                            </div>

                                                            <div>

                                                                <div className="fw-semibold">

                                                                    {
                                                                        activity.user_name ||
                                                                        "System User"
                                                                    }

                                                                </div>

                                                                <small className="text-muted">

                                                                    User ID:{" "}

                                                                    {
                                                                        activity.user_id ||
                                                                        "-"
                                                                    }

                                                                </small>

                                                            </div>

                                                        </div>

                                                    </td>


                                                    <td>

                                                        {getActionBadge(
                                                            activity.action
                                                        )}

                                                    </td>


                                                    <td>

                                                        <span className="text-muted">

                                                            {
                                                                activity.description ||
                                                                "-"
                                                            }

                                                        </span>

                                                    </td>


                                                    <td>

                                                        <small>

                                                            {
                                                                formatDate(
                                                                    activity.created_at
                                                                )
                                                            }

                                                        </small>

                                                    </td>


                                                    <td className="text-center">

                                                        <button
                                                            className="btn btn-sm btn-outline-danger"
                                                            onClick={() =>
                                                                handleDelete(
                                                                    activity.id
                                                                )
                                                            }
                                                        >
                                                            🗑️
                                                        </button>

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

            </div>
        </>
    );
}

export default Activity;