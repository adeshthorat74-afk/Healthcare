const express = require("express");
const router = express.Router();

const {
    getDashboardStats
} = require("../controllers/dashboardController");

// Dashboard Route
router.get("/dashboard", getDashboardStats);

module.exports = router;