const Appointment = require("../models/appointmentModel");

// ======================================
// ADD APPOINTMENT
// ======================================

exports.addAppointment = (req, res) => {

    const {
        patient_id,
        doctor_id,
        appointment_date,
        appointment_time,
        status
    } = req.body;

    // Validate required fields
    if (
        !patient_id ||
        !doctor_id ||
        !appointment_date ||
        !appointment_time
    ) {
        return res.status(400).json({
            success: false,
            message: "Patient, Doctor, Date and Time are required"
        });
    }

    Appointment.addAppointment(
        {
            patient_id,
            doctor_id,
            appointment_date,
            appointment_time,
            status: status || "Pending"
        },
        (err, result) => {

            if (err) {

                console.error("Add Appointment Error:", err);

                return res.status(500).json({
                    success: false,
                    message: "Failed to Add Appointment",
                    error: err.message
                });

            }

            return res.status(201).json({
                success: true,
                message: "Appointment Added Successfully",
                id: result.insertId
            });

        }
    );

};


// ======================================
// GET ALL APPOINTMENTS
// ======================================

exports.getAppointments = (req, res) => {

    Appointment.getAppointments((err, result) => {

        if (err) {

            console.error("Get Appointments Error:", err);

            return res.status(500).json({
                success: false,
                message: "Failed to Get Appointments",
                error: err.message
            });

        }

        // IMPORTANT:
        // Return array directly because React expects res.data
        return res.status(200).json(result || []);

    });

};


// ======================================
// GET APPOINTMENT BY ID
// ======================================

exports.getAppointment = (req, res) => {

    const id = req.params.id;

    // Validate ID
    if (!id || isNaN(id)) {

        return res.status(400).json({
            success: false,
            message: "Invalid Appointment ID"
        });

    }

    Appointment.getAppointmentById(
        id,
        (err, result) => {

            if (err) {

                console.error("Get Appointment Error:", err);

                return res.status(500).json({
                    success: false,
                    message: "Failed to Get Appointment",
                    error: err.message
                });

            }

            // Appointment not found
            if (!result || result.length === 0) {

                return res.status(404).json({
                    success: false,
                    message: "Appointment Not Found"
                });

            }

            return res.status(200).json({
                success: true,
                data: result[0]
            });

        }
    );

};


// ======================================
// UPDATE APPOINTMENT
// ======================================

exports.updateAppointment = (req, res) => {

    const id = req.params.id;

    const {
        patient_id,
        doctor_id,
        appointment_date,
        appointment_time,
        status
    } = req.body;

    // Validate ID
    if (!id || isNaN(id)) {

        return res.status(400).json({
            success: false,
            message: "Invalid Appointment ID"
        });

    }

    // Validate required fields
    if (
        !patient_id ||
        !doctor_id ||
        !appointment_date ||
        !appointment_time
    ) {

        return res.status(400).json({
            success: false,
            message: "Patient, Doctor, Date and Time are required"
        });

    }

    Appointment.updateAppointment(
        id,
        {
            patient_id,
            doctor_id,
            appointment_date,
            appointment_time,
            status: status || "Pending"
        },
        (err, result) => {

            if (err) {

                console.error("Update Appointment Error:", err);

                return res.status(500).json({
                    success: false,
                    message: "Failed to Update Appointment",
                    error: err.message
                });

            }

            // Appointment not found
            if (!result || result.affectedRows === 0) {

                return res.status(404).json({
                    success: false,
                    message: "Appointment Not Found"
                });

            }

            return res.status(200).json({
                success: true,
                message: "Appointment Updated Successfully"
            });

        }
    );

};


// ======================================
// DELETE APPOINTMENT
// ======================================

exports.deleteAppointment = (req, res) => {

    const id = req.params.id;

    // Validate ID
    if (!id || isNaN(id)) {

        return res.status(400).json({
            success: false,
            message: "Invalid Appointment ID"
        });

    }

    Appointment.deleteAppointment(
        id,
        (err, result) => {

            if (err) {

                console.error("Delete Appointment Error:", err);

                return res.status(500).json({
                    success: false,
                    message: "Failed to Delete Appointment",
                    error: err.message
                });

            }

            // Appointment not found
            if (!result || result.affectedRows === 0) {

                return res.status(404).json({
                    success: false,
                    message: "Appointment Not Found"
                });

            }

            return res.status(200).json({
                success: true,
                message: "Appointment Deleted Successfully"
            });

        }
    );

};