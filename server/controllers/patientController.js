const Patient = require("../models/patientModel");

// ======================================
// Add Patient
// ======================================

exports.addPatient = (req, res) => {

    Patient.addPatient(req.body, (err) => {

        if (err) {

            console.error("Add Patient Error:", err);

            return res.status(500).json({
                success: false,
                message: "Unable to add patient",
                error: err
            });

        }

        res.status(201).json({
            success: true,
            message: "Patient Added Successfully"
        });

    });

};


// ======================================
// Get All Patients / Search Patients
// ======================================

exports.getPatients = (req, res) => {

    const search = req.query.search || "";

    // No search → get all patients
    if (search.trim() === "") {

        Patient.getPatients((err, result) => {

            if (err) {

                console.error("Get Patients Error:", err);

                return res.status(500).json({
                    success: false,
                    message: "Unable to fetch patients",
                    error: err
                });

            }

            return res.status(200).json(result);

        });

        return;
    }


    // Search patients
    Patient.searchPatients(search, (err, result) => {

        if (err) {

            console.error("Search Patients Error:", err);

            return res.status(500).json({
                success: false,
                message: "Unable to search patients",
                error: err
            });

        }

        res.status(200).json(result);

    });

};


// ======================================
// Get Patient By ID
// ======================================

exports.getPatient = (req, res) => {

    Patient.getPatientById(req.params.id, (err, result) => {

        if (err) {

            console.error("Get Patient Error:", err);

            return res.status(500).json({
                success: false,
                message: "Unable to fetch patient",
                error: err
            });

        }

        if (!result || result.length === 0) {

            return res.status(404).json({
                success: false,
                message: "Patient Not Found"
            });

        }

        res.status(200).json(result);

    });

};


// ======================================
// Update Patient
// ======================================

exports.updatePatient = (req, res) => {

    Patient.updatePatient(
        req.params.id,
        req.body,
        (err) => {

            if (err) {

                console.error("Update Patient Error:", err);

                return res.status(500).json({
                    success: false,
                    message: "Unable to update patient",
                    error: err
                });

            }

            res.status(200).json({
                success: true,
                message: "Patient Updated Successfully"
            });

        }
    );

};


// ======================================
// Delete Patient
// ======================================

exports.deletePatient = (req, res) => {

    Patient.deletePatient(
        req.params.id,
        (err) => {

            if (err) {

                console.error("Delete Patient Error:", err);

                return res.status(500).json({
                    success: false,
                    message: "Unable to delete patient",
                    error: err
                });

            }

            res.status(200).json({
                success: true,
                message: "Patient Deleted Successfully"
            });

        }
    );

};