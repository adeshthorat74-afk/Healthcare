const Bill = require("../models/billModel");

// ======================================
// ADD BILL
// ======================================

exports.addBill = (req, res) => {

    const {
        patient_id,
        amount,
        payment_status,
        bill_date
    } = req.body;

    // Validate required fields
    if (
        !patient_id ||
        amount === undefined ||
        amount === "" ||
        !bill_date
    ) {
        return res.status(400).json({
            success: false,
            message: "Patient, Amount and Bill Date are required"
        });
    }

    Bill.addBill(
        {
            patient_id,
            amount,
            payment_status: payment_status || "Pending",
            bill_date
        },
        (err, result) => {

            if (err) {

                console.error("Add Bill Error:", err);

                return res.status(500).json({
                    success: false,
                    message: "Failed to Add Bill",
                    error: err.message
                });

            }

            res.status(201).json({
                success: true,
                message: "Bill Added Successfully",
                id: result.insertId
            });

        }
    );

};


// ======================================
// GET ALL BILLS
// ======================================

exports.getBills = (req, res) => {

    Bill.getBills((err, result) => {

        if (err) {

            console.error("Get Bills Error:", err);

            return res.status(500).json({
                success: false,
                message: "Failed to Get Bills",
                error: err.message
            });

        }

        res.status(200).json({
            success: true,
            data: result
        });

    });

};


// ======================================
// GET BILL BY ID
// ======================================

exports.getBill = (req, res) => {

    const id = req.params.id;

    Bill.getBillById(
        id,
        (err, result) => {

            if (err) {

                console.error("Get Bill Error:", err);

                return res.status(500).json({
                    success: false,
                    message: "Failed to Get Bill",
                    error: err.message
                });

            }

            // Bill not found
            if (!result || result.length === 0) {

                return res.status(404).json({
                    success: false,
                    message: "Bill Not Found"
                });

            }

            res.status(200).json({
                success: true,
                data: result[0]
            });

        }
    );

};


// ======================================
// UPDATE BILL
// ======================================

exports.updateBill = (req, res) => {

    const id = req.params.id;

    const {
        patient_id,
        amount,
        payment_status,
        bill_date
    } = req.body;

    // Validate required fields
    if (
        !patient_id ||
        amount === undefined ||
        amount === "" ||
        !bill_date
    ) {

        return res.status(400).json({
            success: false,
            message: "Patient, Amount and Bill Date are required"
        });

    }

    Bill.updateBill(
        id,
        {
            patient_id,
            amount,
            payment_status: payment_status || "Pending",
            bill_date
        },
        (err, result) => {

            if (err) {

                console.error("Update Bill Error:", err);

                return res.status(500).json({
                    success: false,
                    message: "Failed to Update Bill",
                    error: err.message
                });

            }

            // Bill not found
            if (result.affectedRows === 0) {

                return res.status(404).json({
                    success: false,
                    message: "Bill Not Found"
                });

            }

            res.status(200).json({
                success: true,
                message: "Bill Updated Successfully"
            });

        }
    );

};


// ======================================
// DELETE BILL
// ======================================

exports.deleteBill = (req, res) => {

    const id = req.params.id;

    Bill.deleteBill(
        id,
        (err, result) => {

            if (err) {

                console.error("Delete Bill Error:", err);

                return res.status(500).json({
                    success: false,
                    message: "Failed to Delete Bill",
                    error: err.message
                });

            }

            // Bill not found
            if (result.affectedRows === 0) {

                return res.status(404).json({
                    success: false,
                    message: "Bill Not Found"
                });

            }

            res.status(200).json({
                success: true,
                message: "Bill Deleted Successfully"
            });

        }
    );

};