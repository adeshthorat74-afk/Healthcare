import React, { useEffect, useState } from "react";
import {
    getProfile,
    updateProfile
} from "../services/api";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Profile() {

    const [profile, setProfile] = useState({
        id: "",
        name: "",
        email: "",
        role: ""
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [editing, setEditing] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    // ======================================
    // LOAD PROFILE
    // ======================================

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {

        try {

            setLoading(true);
            setError("");

            const res = await getProfile();

            console.log("Profile API Response:", res.data);

            // Handle different possible API response formats
            const data = res.data?.user || res.data?.profile || res.data;

            setProfile({
                id: data?.id || "",
                name: data?.name || "",
                email: data?.email || "",
                role: data?.role || ""
            });

        } catch (err) {

            console.error("Profile Error:", err);

            setError(
                err.response?.data?.message ||
                "Unable to load profile"
            );

        } finally {

            setLoading(false);

        }
    };

    // ======================================
    // HANDLE INPUT
    // ======================================

    const handleChange = (e) => {

        const { name, value } = e.target;

        setProfile((previous) => ({
            ...previous,
            [name]: value
        }));

    };

    // ======================================
    // UPDATE PROFILE
    // ======================================

    const handleUpdate = async (e) => {

        e.preventDefault();

        try {

            setSaving(true);
            setMessage("");
            setError("");

            const data = {
                name: profile.name,
                email: profile.email
            };

            const res = await updateProfile(data);

            console.log("Update Profile Response:", res.data);

            setMessage(
                res.data?.message ||
                "Profile updated successfully"
            );

            setEditing(false);

            // Reload profile from database
            await loadProfile();

        } catch (err) {

            console.error("Update Profile Error:", err);

            setError(
                err.response?.data?.message ||
                "Unable to update profile"
            );

        } finally {

            setSaving(false);

        }
    };

    // ======================================
    // LOADING
    // ======================================

    if (loading) {

        return (
            <>
                <Sidebar />
                <Navbar />

                <div
                    style={{
                        marginLeft: "240px",
                        padding: "40px"
                    }}
                >
                    <div className="text-center">

                        <div
                            className="spinner-border text-primary"
                            role="status"
                        />

                        <h5 className="mt-3">
                            Loading Profile...
                        </h5>

                    </div>
                </div>
            </>
        );
    }

    // ======================================
    // MAIN UI
    // ======================================

    return (
        <>
            <Sidebar />
            <Navbar />

            <div
                style={{
                    marginLeft: "240px",
                    padding: "40px",
                    minHeight: "100vh",
                    backgroundColor: "#f5f7fb"
                }}
            >

                {/* PAGE TITLE */}

                <div className="mb-4">

                    <h2
                        className="fw-bold"
                        style={{
                            color: "#1e293b"
                        }}
                    >
                        👤 My Profile
                    </h2>

                    <p className="text-muted">
                        View and manage your account information
                    </p>

                </div>

                {/* SUCCESS MESSAGE */}

                {message && (
                    <div
                        className="alert alert-success"
                        role="alert"
                    >
                        ✅ {message}
                    </div>
                )}

                {/* ERROR MESSAGE */}

                {error && (
                    <div
                        className="alert alert-danger"
                        role="alert"
                    >
                        ❌ {error}
                    </div>
                )}

                <div className="row">

                    {/* PROFILE CARD */}

                    <div className="col-lg-8">

                        <div
                            className="card shadow-sm border-0"
                            style={{
                                borderRadius: "12px"
                            }}
                        >

                            {/* HEADER */}

                            <div
                                className="card-header text-white"
                                style={{
                                    background:
                                        "linear-gradient(135deg, #0d6efd, #2563eb)",
                                    borderRadius:
                                        "12px 12px 0 0",
                                    padding: "20px"
                                }}
                            >

                                <h4 className="mb-0">
                                    👤 Profile Information
                                </h4>

                            </div>

                            {/* BODY */}

                            <div className="card-body p-4">

                                <form onSubmit={handleUpdate}>

                                    {/* ID */}

                                    <div className="mb-3">

                                        <label className="form-label fw-bold">
                                            User ID
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            value={profile.id}
                                            disabled
                                        />

                                    </div>

                                    {/* NAME */}

                                    <div className="mb-3">

                                        <label className="form-label fw-bold">
                                            Name
                                        </label>

                                        <input
                                            type="text"
                                            name="name"
                                            className="form-control"
                                            value={profile.name}
                                            onChange={handleChange}
                                            disabled={!editing}
                                            placeholder="Enter your name"
                                            required
                                        />

                                    </div>

                                    {/* EMAIL */}

                                    <div className="mb-3">

                                        <label className="form-label fw-bold">
                                            Email
                                        </label>

                                        <input
                                            type="email"
                                            name="email"
                                            className="form-control"
                                            value={profile.email}
                                            onChange={handleChange}
                                            disabled={!editing}
                                            placeholder="Enter your email"
                                            required
                                        />

                                    </div>

                                    {/* ROLE */}

                                    <div className="mb-4">

                                        <label className="form-label fw-bold">
                                            Role
                                        </label>

                                        <input
                                            type="text"
                                            className="form-control"
                                            value={profile.role}
                                            disabled
                                        />

                                    </div>

                                    {/* BUTTONS */}

                                    {!editing ? (

                                        <button
                                            type="button"
                                            className="btn btn-primary"
                                            onClick={() => {
                                                setEditing(true);
                                                setMessage("");
                                                setError("");
                                            }}
                                        >
                                            ✏️ Edit Profile
                                        </button>

                                    ) : (

                                        <div>

                                            <button
                                                type="submit"
                                                className="btn btn-success me-2"
                                                disabled={saving}
                                            >

                                                {saving
                                                    ? "Saving..."
                                                    : "💾 Save Changes"
                                                }

                                            </button>

                                            <button
                                                type="button"
                                                className="btn btn-secondary"
                                                onClick={() => {
                                                    setEditing(false);
                                                    loadProfile();
                                                }}
                                                disabled={saving}
                                            >
                                                Cancel
                                            </button>

                                        </div>

                                    )}

                                </form>

                            </div>

                        </div>

                    </div>

                    {/* ACCOUNT SUMMARY */}

                    <div className="col-lg-4 mt-4 mt-lg-0">

                        <div
                            className="card shadow-sm border-0"
                            style={{
                                borderRadius: "12px"
                            }}
                        >

                            <div className="card-body text-center p-4">

                                <div
                                    style={{
                                        width: "90px",
                                        height: "90px",
                                        borderRadius: "50%",
                                        backgroundColor: "#e7f0ff",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        margin: "0 auto 20px",
                                        fontSize: "42px"
                                    }}
                                >
                                    👤
                                </div>

                                <h4 className="fw-bold">
                                    {profile.name || "User"}
                                </h4>

                                <p className="text-muted mb-3">
                                    {profile.email}
                                </p>

                                <span className="badge bg-success px-3 py-2">
                                    {profile.role || "User"}
                                </span>

                                <hr />

                                <div className="text-start">

                                    <p className="mb-2">
                                        <strong>Account ID:</strong>
                                        <br />
                                        {profile.id || "N/A"}
                                    </p>

                                    <p className="mb-0">
                                        <strong>Account Status:</strong>
                                        <br />
                                        <span className="text-success">
                                            ● Active
                                        </span>
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </>
    );
}

export default Profile;