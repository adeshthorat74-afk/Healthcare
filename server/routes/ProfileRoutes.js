const express = require("express");

const router = express.Router();

const {
    getProfile,
    updateProfile,
    changePassword
} = require("../controllers/profileController");

const verifyToken = require("../middleware/verifyToken");


// ======================================
// GET PROFILE
// ======================================

router.get(
    "/profile",
    verifyToken,
    getProfile
);


// ======================================
// UPDATE PROFILE
// ======================================

router.put(
    "/profile",
    verifyToken,
    updateProfile
);


// ======================================
// CHANGE PASSWORD
// ======================================

router.put(
    "/change-password",
    verifyToken,
    changePassword
);


module.exports = router;