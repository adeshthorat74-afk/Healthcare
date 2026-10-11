import { BrowserRouter, Routes, Route } from "react-router-dom";

// ======================================
// PAGES
// ======================================

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Doctors from "./pages/Doctors";
import Patients from "./pages/Patients";
import Appointments from "./pages/Appointments";
import Bills from "./pages/Bills";
import Profile from "./pages/Profile";
import ChangePassword from "./pages/ChangePassword";
import Settings from "./pages/Settings";
import Activity from "./pages/Activity";

// ======================================
// PROTECTED ROUTES
// ======================================

import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoutes";

// ======================================
// CSS
// ======================================

import "./App.css";


function App() {

    return (

        <BrowserRouter>

            <Routes>

                {/* ======================================
                    LOGIN
                ====================================== */}

                <Route
                    path="/"
                    element={<Login />}
                />


                {/* ======================================
                    DASHBOARD
                ====================================== */}

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />


                {/* ======================================
                    DOCTORS
                ====================================== */}

                <Route
                    path="/doctors"
                    element={
                        <AdminRoute>
                            <Doctors />
                        </AdminRoute>
                    }
                />


                {/* ======================================
                    PATIENTS
                ====================================== */}

                <Route
                    path="/patients"
                    element={
                        <AdminRoute>
                            <Patients />
                        </AdminRoute>
                    }
                />


                {/* ======================================
                    APPOINTMENTS
                ====================================== */}

                <Route
                    path="/appointments"
                    element={
                        <AdminRoute>
                            <Appointments />
                        </AdminRoute>
                    }
                />


                {/* ======================================
                    BILLS
                ====================================== */}

                <Route
                    path="/bills"
                    element={
                        <AdminRoute>
                            <Bills />
                        </AdminRoute>
                    }
                />


                {/* ======================================
                    PROFILE
                ====================================== */}

                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    }
                />


                {/* ======================================
                    CHANGE PASSWORD
                ====================================== */}

                <Route
                    path="/change-password"
                    element={
                        <ProtectedRoute>
                            <ChangePassword />
                        </ProtectedRoute>
                    }
                />


                {/* ======================================
                    SETTINGS
                ====================================== */}

                <Route
                    path="/settings"
                    element={
                        <AdminRoute>
                            <Settings />
                        </AdminRoute>
                    }
                />


                {/* ======================================
                    ACTIVITY LOGS
                ====================================== */}

                <Route
                    path="/activity"
                    element={
                        <ProtectedRoute>
                            <Activity />
                        </ProtectedRoute>
                    }
                />


                {/* ======================================
                    INVALID ROUTE
                ====================================== */}

                <Route
                    path="*"
                    element={<Login />}
                />

            </Routes>

        </BrowserRouter>

    );

}

export default App;