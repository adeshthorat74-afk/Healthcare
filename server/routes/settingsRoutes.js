const express = require("express");

const router = express.Router();

const {
    getSettings,
    updateSettings
} = require("../controllers/settingsController");

const verifyToken = require("../middleware/verifyToken");


// ======================================
// GET HOSPITAL SETTINGS
// GET /api/settings
// ======================================

router.get(
    "/settings",
    verifyToken,
    getSettings
);


// ======================================
// UPDATE HOSPITAL SETTINGS
// PUT /api/settings
// ======================================

router.put(
    "/settings",
    verifyToken,
    updateSettings
);


// ======================================
// EXPORT ROUTER
// ======================================

module.exports = router;