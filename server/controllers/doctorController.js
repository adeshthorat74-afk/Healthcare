const Doctor = require("../models/doctorModel");

// ======================================
// Add Doctor
// ======================================

exports.addDoctor = (req, res) => {

    Doctor.addDoctor(req.body, (err) => {

        if (err) {

            console.error("Add Doctor Error:", err);

            return res.status(500).json({
                success: false,
                message: "Unable to add doctor",
                error: err
            });

        }

        res.status(201).json({
            success: true,
            message: "Doctor Added Successfully"
        });

    });

};


// ======================================
// Get All Doctors / Search Doctors
// ======================================

exports.getDoctors = (req, res) => {

    const search = req.query.search || "";

    // If search is empty, get all doctors
    if (search.trim() === "") {

        Doctor.getDoctors((err, result) => {

            if (err) {

                console.error("Get Doctors Error:", err);

                return res.status(500).json({
                    success: false,
                    message: "Unable to fetch doctors",
                    error: err
                });

            }

            return res.status(200).json(result);

        });

        return;
    }


    // Search doctors
    Doctor.searchDoctors(search, (err, result) => {

        if (err) {

            console.error("Search Doctors Error:", err);

            return res.status(500).json({
                success: false,
                message: "Unable to search doctors",
                error: err
            });

        }

        res.status(200).json(result);

    });

};


// ======================================
// Get Doctor By ID
// ======================================

exports.getDoctor = (req, res) => {

    Doctor.getDoctorById(req.params.id, (err, result) => {

        if (err) {

            console.error("Get Doctor Error:", err);

            return res.status(500).json({
                success: false,
                message: "Unable to fetch doctor",
                error: err
            });

        }

        if (!result || result.length === 0) {

            return res.status(404).json({
                success: false,
                message: "Doctor Not Found"
            });

        }

        res.status(200).json(result);

    });

};


// ======================================
// Update Doctor
// ======================================

exports.updateDoctor = (req, res) => {

    Doctor.updateDoctor(
        req.params.id,
        req.body,
        (err) => {

            if (err) {

                console.error("Update Doctor Error:", err);

                return res.status(500).json({
                    success: false,
                    message: "Unable to update doctor",
                    error: err
                });

            }

            res.status(200).json({
                success: true,
                message: "Doctor Updated Successfully"
            });

        }
    );

};


// ======================================
// Delete Doctor
// ======================================

exports.deleteDoctor = (req, res) => {

    Doctor.deleteDoctor(
        req.params.id,
        (err) => {

            if (err) {

                console.error("Delete Doctor Error:", err);

                return res.status(500).json({
                    success: false,
                    message: "Unable to delete doctor",
                    error: err
                });

            }

            res.status(200).json({
                success: true,
                message: "Doctor Deleted Successfully"
            });

        }
    );

};