const express = require("express");

const router = express.Router();

const {
    addPatient,
    getPatients,
    getPatient,
    updatePatient,
    deletePatient
} = require("../controllers/patientController");

// Add Patient
router.post("/patients", addPatient);

// Get All Patients
router.get("/patients", getPatients);

// Get Patient By ID
router.get("/patients/:id", getPatient);

// Update Patient
router.put("/patients/:id", updatePatient);

// Delete Patient
router.delete("/patients/:id", deletePatient);

module.exports = router;