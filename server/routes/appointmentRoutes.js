const express = require("express");

const router = express.Router();

const appointmentController = require("../controllers/appointmentController");

// ======================================
// APPOINTMENT ROUTES
// ======================================

// Add Appointment
router.post(
    "/appointments",
    appointmentController.addAppointment
);

// Get All Appointments
router.get(
    "/appointments",
    appointmentController.getAppointments
);

// Get Appointment By ID
router.get(
    "/appointments/:id",
    appointmentController.getAppointment
);

// Update Appointment
router.put(
    "/appointments/:id",
    appointmentController.updateAppointment
);

// Delete Appointment
router.delete(
    "/appointments/:id",
    appointmentController.deleteAppointment
);

module.exports = router;