import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/navbar.css";

function Navbar() {

    const navigate = useNavigate();

    // Get Logged-in User
    const user = JSON.parse(localStorage.getItem("user"));

    // Current Date
    const today = new Date();
    const currentDate = today.toLocaleDateString();

    // Logout Function
    const handleLogout = () => {

        if (window.confirm("Are you sure you want to logout?")) {

            // Clear Local Storage
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            localStorage.removeItem("role");

            // Redirect to Login
            navigate("/");

        }

    };

    return (

        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm navbar-custom">

            <div className="container-fluid">

                <h4 className="mb-0 text-primary fw-bold">
                    🏥 Hospital Management System
                </h4>

                <div className="d-flex align-items-center">

                    {/* Current Date */}
                    <span className="me-4 fw-bold">
                        📅 {currentDate}
                    </span>

                    {/* Notification Button */}
                    <button
                        className="btn btn-outline-primary me-3"
                    >
                        🔔
                    </button>

                    {/* Logged-in User */}
                    <span className="me-3 fw-bold">
                        👤 {user?.name || "User"}
                    </span>

                    {/* User Role */}
                    <span className="badge bg-success me-3">
                        {user?.role || "User"}
                    </span>

                    {/* Logout */}
                    <button
                        className="btn btn-danger"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>

                </div>

            </div>

        </nav>

    );

}

export default Navbar;