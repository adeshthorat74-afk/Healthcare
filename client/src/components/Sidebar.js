
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
    const navigate = useNavigate();
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("role");
        navigate("/");
    };

    const menuItems = [
        { path: "/dashboard", label: "Dashboard", icon: "🏠" },
        { path: "/doctors", label: "Doctors", icon: "👨‍⚕️" },
        { path: "/patients", label: "Patients", icon: "🧑‍🤝‍🧑" },
        { path: "/appointments", label: "Appointments", icon: "📅" },
        { path: "/bills", label: "Bills", icon: "💰" },
        { path: "/activity", label: "Activity Logs", icon: "📋" },
        { path: "/profile", label: "Profile", icon: "👤" },
        { path: "/change-password", label: "Change Password", icon: "🔐" },
        { path: "/settings", label: "Settings", icon: "⚙️" }
    ];

    return (
        <>
            <button
                type="button"
                className="sidebar-mobile-toggle"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle navigation"
            >
                ☰
            </button>

            {mobileOpen && (
                <button
                    type="button"
                    className="sidebar-backdrop"
                    onClick={() => setMobileOpen(false)}
                    aria-label="Close navigation"
                />
            )}

            <aside
                className={`hospital-sidebar ${
                    mobileOpen ? "sidebar-open" : ""
                }`}
            >
                <div className="sidebar-brand">
                    <span className="sidebar-brand-icon">🏥</span>
                    <h2>Hospital</h2>
                </div>

                <p className="sidebar-section-title">MAIN MENU</p>

                <nav className="sidebar-menu">
                    {menuItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            end={item.path === "/dashboard"}
                            className={({ isActive }) =>
                                `sidebar-link ${isActive ? "active" : ""}`
                            }
                            onClick={() => setMobileOpen(false)}
                        >
                            <span className="sidebar-link-icon">
                                {item.icon}
                            </span>
                            <span>{item.label}</span>
                        </NavLink>
                    ))}
                </nav>

                <div className="sidebar-logout-container">
                    <button
                        type="button"
                        className="sidebar-logout"
                        onClick={handleLogout}
                    >
                        <span>🚪</span>
                        Logout
                    </button>
                </div>
            </aside>
        </>
    );
}

export default Sidebar;
