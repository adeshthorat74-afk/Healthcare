import React, { useEffect, useState } from "react";
import { getSettings, updateSettings } from "../services/api";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Settings() {

    const [settings, setSettings] = useState({
        hospital_name: "",
        address: "",
        phone: "",
        email: "",
        website: ""
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        loadSettings();
    }, []);

    const loadSettings = async () => {

        try {

            setLoading(true);
            setError("");

            const res = await getSettings();

            setSettings({
                hospital_name: res.data.hospital_name || "",
                address: res.data.address || "",
                phone: res.data.phone || "",
                email: res.data.email || "",
                website: res.data.website || ""
            });

        } catch (err) {

            console.error("Settings Error:", err);

            setError(
                err.response?.data?.message ||
                "Unable to load hospital settings"
            );

        } finally {

            setLoading(false);

        }
    };

    const handleChange = (e) => {

        const { name, value } = e.target;

        setSettings((prev) => ({
            ...prev,
            [name]: value
        }));

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            setSaving(true);
            setMessage("");
            setError("");

            const res = await updateSettings(settings);

            setMessage(
                res.data.message ||
                "Hospital Settings Updated Successfully"
            );

        } catch (err) {

            console.error("Update Settings Error:", err);

            setError(
                err.response?.data?.message ||
                "Unable to update hospital settings"
            );

        } finally {

            setSaving(false);

        }
    };

    return (
        <>
            <Sidebar />
            <Navbar />

            <div
                style={{
                    marginLeft: "240px",
                    padding: "35px",
                    minHeight: "100vh",
                    backgroundColor: "#f5f7fb"
                }}
            >

                {/* Page Header */}

                <div style={{ marginBottom: "30px" }}>

                    <h2
                        style={{
                            fontWeight: "700",
                            color: "#172b4d",
                            marginBottom: "8px"
                        }}
                    >
                        ⚙️ Hospital Settings
                    </h2>

                    <p style={{ color: "#6c757d" }}>
                        Manage hospital information and contact details
                    </p>

                </div>

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

                {loading ? (

                    <div className="card shadow-sm">
                        <div className="card-body text-center p-5">
                            <h5>Loading Settings...</h5>
                        </div>
                    </div>

                ) : (

                    <div className="row">

                        {/* Settings Form */}

                        <div className="col-lg-8">

                            <div className="card shadow-sm border-0">

                                <div
                                    className="card-header text-white"
                                    style={{
                                        background:
                                            "linear-gradient(135deg,#0d6efd,#2563eb)",
                                        padding: "20px"
                                    }}
                                >

                                    <h5 className="mb-0">
                                        🏥 Hospital Information
                                    </h5>

                                </div>

                                <div className="card-body p-4">

                                    <form onSubmit={handleSubmit}>

                                        <div className="mb-3">

                                            <label className="form-label fw-bold">
                                                Hospital Name
                                            </label>

                                            <input
                                                type="text"
                                                name="hospital_name"
                                                value={settings.hospital_name}
                                                onChange={handleChange}
                                                className="form-control"
                                                placeholder="Enter hospital name"
                                                required
                                            />

                                        </div>

                                        <div className="mb-3">

                                            <label className="form-label fw-bold">
                                                Address
                                            </label>

                                            <textarea
                                                name="address"
                                                value={settings.address}
                                                onChange={handleChange}
                                                className="form-control"
                                                rows="3"
                                                placeholder="Enter hospital address"
                                                required
                                            />

                                        </div>

                                        <div className="row">

                                            <div className="col-md-6 mb-3">

                                                <label className="form-label fw-bold">
                                                    Phone
                                                </label>

                                                <input
                                                    type="text"
                                                    name="phone"
                                                    value={settings.phone}
                                                    onChange={handleChange}
                                                    className="form-control"
                                                    placeholder="Enter phone number"
                                                />

                                            </div>

                                            <div className="col-md-6 mb-3">

                                                <label className="form-label fw-bold">
                                                    Email
                                                </label>

                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={settings.email}
                                                    onChange={handleChange}
                                                    className="form-control"
                                                    placeholder="Enter hospital email"
                                                />

                                            </div>

                                        </div>

                                        <div className="mb-4">

                                            <label className="form-label fw-bold">
                                                Website
                                            </label>

                                            <input
                                                type="text"
                                                name="website"
                                                value={settings.website}
                                                onChange={handleChange}
                                                className="form-control"
                                                placeholder="https://example.com"
                                            />

                                        </div>

                                        <button
                                            type="submit"
                                            className="btn btn-primary px-4"
                                            disabled={saving}
                                        >

                                            {saving
                                                ? "Saving..."
                                                : "💾 Save Settings"
                                            }

                                        </button>

                                    </form>

                                </div>

                            </div>

                        </div>

                        {/* Preview */}

                        <div className="col-lg-4 mt-4 mt-lg-0">

                            <div className="card shadow-sm border-0">

                                <div className="card-body text-center p-4">

                                    <div
                                        style={{
                                            fontSize: "55px",
                                            marginBottom: "15px"
                                        }}
                                    >
                                        🏥
                                    </div>

                                    <h4 className="fw-bold">
                                        {settings.hospital_name ||
                                            "Hospital Name"}
                                    </h4>

                                    <hr />

                                    <p className="text-muted">
                                        📍{" "}
                                        {settings.address ||
                                            "Hospital Address"}
                                    </p>

                                    <p>
                                        📞{" "}
                                        {settings.phone ||
                                            "Phone Number"}
                                    </p>

                                    <p>
                                        📧{" "}
                                        {settings.email ||
                                            "Email Address"}
                                    </p>

                                    <p>
                                        🌐{" "}
                                        {settings.website ||
                                            "Website"}
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                )}

            </div>
        </>
    );
}

export default Settings;