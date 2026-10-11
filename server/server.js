const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

// ======================================
// LOAD ENVIRONMENT VARIABLES
// ======================================

dotenv.config();
console.log("JWT_SECRET loaded:", !!process.env.JWT_SECRET);
console.log(
    "JWT_SECRET length:",
    process.env.JWT_SECRET
        ? process.env.JWT_SECRET.length
        : 0
);

const app = express();


// ======================================
// MIDDLEWARE
// ======================================

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));


// ======================================
// DATABASE CONNECTION
// ======================================

require("./config/db");


// ======================================
// IMPORT ROUTES
// ======================================

const authRoutes = require("./routes/authRoutes");

const doctorRoutes = require("./routes/doctorRoutes");

const patientRoutes = require("./routes/patientRoutes");

const appointmentRoutes = require("./routes/appointmentRoutes");

const billRoutes = require("./routes/billRoutes");

const dashboardRoutes = require("./routes/dashboardRoutes");

const profileRoutes = require("./routes/profileRoutes");

const settingsRoutes = require("./routes/settingsRoutes");

const activityRoutes = require("./routes/activityRoutes");

// Change Password Route
const passwordRoutes = require("./routes/passwordRoutes");


// ======================================
// API ROUTES
// ======================================

app.use("/api", authRoutes);

app.use("/api", doctorRoutes);

app.use("/api", patientRoutes);

app.use("/api", appointmentRoutes);

app.use("/api", billRoutes);

app.use("/api", dashboardRoutes);

app.use("/api", profileRoutes);

app.use("/api", settingsRoutes);

// Activity Log Routes
app.use("/api", activityRoutes);

// Change Password Routes
app.use("/api", passwordRoutes);


// ======================================
// HOME ROUTE
// ======================================

app.get("/", (req, res) => {

    res.status(200).json({
        success: true,
        message: "🏥 Hospital Management System API is Running Successfully!"
    });

});


// ======================================
// 404 ROUTE
// ======================================

app.use((req, res) => {

    res.status(404).json({
        success: false,
        message: "Route Not Found",
        path: req.originalUrl
    });

});


// ======================================
// GLOBAL ERROR HANDLER
// ======================================

app.use((err, req, res, next) => {

    console.error("======================================");
    console.error("SERVER ERROR");
    console.error("======================================");

    console.error(err.stack);

    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Internal Server Error"
    });

});


// ======================================
// START SERVER
// ======================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log("======================================");
    console.log("🏥 HOSPITAL MANAGEMENT SYSTEM");
    console.log("======================================");

    console.log(`🚀 Server running on http://localhost:${PORT}`);

    console.log(`📡 API running on http://localhost:${PORT}/api`);

    console.log("======================================");

});