const express = require("express");

const router = express.Router();

const {
    addBill,
    getBills,
    getBill,
    updateBill,
    deleteBill
} = require("../controllers/billController");

// ======================================
// BILL ROUTES
// ======================================

// Add Bill
router.post("/bills", addBill);

// Get All Bills
router.get("/bills", getBills);

// Get Bill By ID
router.get("/bills/:id", getBill);

// Update Bill
router.put("/bills/:id", updateBill);

// Delete Bill
router.delete("/bills/:id", deleteBill);

module.exports = router;