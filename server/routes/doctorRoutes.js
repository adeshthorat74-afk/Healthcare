const express = require("express");

const router = express.Router();

const {
    addDoctor,
    getDoctors,
    getDoctor,
    updateDoctor,
    deleteDoctor
} = require("../controllers/doctorController");

// Add Doctor
router.post("/doctors", addDoctor);

// Get All Doctors
router.get("/doctors", getDoctors);

// Get Doctor By ID
router.get("/doctors/:id", getDoctor);

// Update Doctor
router.put("/doctors/:id", updateDoctor);

// Delete Doctor
router.delete("/doctors/:id", deleteDoctor);

module.exports = router;