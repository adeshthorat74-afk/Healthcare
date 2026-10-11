import React, { useState } from "react";
import { changePassword } from "../services/api";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function ChangePassword() {

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        setMessage("");
        setError("");

        // Check new password and confirm password
        if (newPassword !== confirmPassword) {

            setError("New password and confirm password do not match");

            return;
        }

        // Basic password validation
        if (newPassword.length < 6) {

            setError("New password must contain at least 6 characters");

            return;
        }

        try {

            setLoading(true);

            const res = await changePassword({
                currentPassword,
                newPassword
            });

            setMessage(
                res.data.message || "Password changed successfully"
            );

            // Clear form
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");

        } catch (err) {

            console.error("Change Password Error:", err);

            setError(
                err.response?.data?.message ||
                "Unable to change password"
            );

        } finally {

            setLoading(false);

        }

    };

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

                {/* Page Header */}

                <div className="mb-4">

                    <h2
                        style={{
                            fontWeight: "700",
                            color: "#172B4D"
                        }}
                    >
                        🔐 Change Password
                    </h2>

                    <p className="text-muted">
                        Update your account password securely
                    </p>

                </div>


                <div className="row">

                    {/* Password Form */}

                    <div className="col-md-7">

                        <div className="card shadow border-0">

                            <div
                                className="card-header text-white"
                                style={{
                                    background:
                                        "linear-gradient(135deg, #0d6efd, #084298)"
                                }}
                            >

                                <h5 className="mb-0">
                                    🔑 Update Password
                                </h5>

                            </div>


                            <div className="card-body p-4">

                                {/* Success Message */}

                                {message && (

                                    <div className="alert alert-success">

                                        ✅ {message}

                                    </div>

                                )}


                                {/* Error Message */}

                                {error && (

                                    <div className="alert alert-danger">

                                        ❌ {error}

                                    </div>

                                )}


                                <form onSubmit={handleSubmit}>

                                    {/* Current Password */}

                                    <div className="mb-3">

                                        <label className="form-label fw-bold">

                                            Current Password

                                        </label>

                                        <input
                                            type="password"
                                            className="form-control"
                                            placeholder="Enter current password"
                                            value={currentPassword}
                                            onChange={(e) =>
                                                setCurrentPassword(e.target.value)
                                            }
                                            required
                                        />

                                    </div>


                                    {/* New Password */}

                                    <div className="mb-3">

                                        <label className="form-label fw-bold">

                                            New Password

                                        </label>

                                        <input
                                            type="password"
                                            className="form-control"
                                            placeholder="Enter new password"
                                            value={newPassword}
                                            onChange={(e) =>
                                                setNewPassword(e.target.value)
                                            }
                                            required
                                        />

                                    </div>


                                    {/* Confirm Password */}

                                    <div className="mb-4">

                                        <label className="form-label fw-bold">

                                            Confirm New Password

                                        </label>

                                        <input
                                            type="password"
                                            className="form-control"
                                            placeholder="Confirm new password"
                                            value={confirmPassword}
                                            onChange={(e) =>
                                                setConfirmPassword(e.target.value)
                                            }
                                            required
                                        />

                                    </div>


                                    {/* Button */}

                                    <button
                                        type="submit"
                                        className="btn btn-primary w-100"
                                        disabled={loading}
                                    >

                                        {loading
                                            ? "Changing Password..."
                                            : "🔐 Change Password"
                                        }

                                    </button>

                                </form>

                            </div>

                        </div>

                    </div>


                    {/* Security Information */}

                    <div className="col-md-5">

                        <div className="card shadow border-0">

                            <div className="card-body p-4">

                                <h5 className="fw-bold mb-4">

                                    🛡️ Password Security

                                </h5>

                                <div className="mb-3">

                                    <strong>✔ Use a strong password</strong>

                                    <p className="text-muted small">
                                        Use a password that is difficult
                                        for others to guess.
                                    </p>

                                </div>

                                <div className="mb-3">

                                    <strong>✔ Minimum 6 characters</strong>

                                    <p className="text-muted small">
                                        Your new password must contain
                                        at least 6 characters.
                                    </p>

                                </div>

                                <div className="mb-3">

                                    <strong>✔ Don't share your password</strong>

                                    <p className="text-muted small">
                                        Keep your hospital system account
                                        credentials private.
                                    </p>

                                </div>

                                <div
                                    className="alert alert-info mb-0"
                                >

                                    🔒 Your password is securely stored
                                    using hashing on the server.

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </>

    );

}

export default ChangePassword;