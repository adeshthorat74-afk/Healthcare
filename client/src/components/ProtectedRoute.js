import React from "react";
import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoute({ children }) {

    const token = localStorage.getItem("token");
    const location = useLocation();

    // No token → go to login page
    if (!token) {
        return (
            <Navigate
                to="/"
                replace
                state={{ from: location }}
            />
        );
    }

    // Token exists → allow access
    return children;
}

export default ProtectedRoute;