const db = require("../config/db");

// ======================================
// ADD BILL
// ======================================

exports.addBill = (bill, callback) => {

    const sql = `
        INSERT INTO bills
        (
            patient_id,
            amount,
            payment_status,
            bill_date
        )
        VALUES (?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            bill.patient_id,
            bill.amount,
            bill.payment_status,
            bill.bill_date
        ],
        callback
    );

};


// ======================================
// GET ALL BILLS
// ======================================

exports.getBills = (callback) => {

    const sql = `
        SELECT *
        FROM bills
        ORDER BY id DESC
    `;

    db.query(sql, callback);

};


// ======================================
// GET BILL BY ID
// ======================================

exports.getBillById = (id, callback) => {

    const sql = `
        SELECT *
        FROM bills
        WHERE id = ?
    `;

    db.query(
        sql,
        [id],
        callback
    );

};


// ======================================
// UPDATE BILL
// ======================================

exports.updateBill = (id, bill, callback) => {

    const sql = `
        UPDATE bills
        SET
            patient_id = ?,
            amount = ?,
            payment_status = ?,
            bill_date = ?
        WHERE id = ?
    `;

    db.query(
        sql,
        [
            bill.patient_id,
            bill.amount,
            bill.payment_status,
            bill.bill_date,
            id
        ],
        callback
    );

};


// ======================================
// DELETE BILL
// ======================================

exports.deleteBill = (id, callback) => {

    const sql = `
        DELETE FROM bills
        WHERE id = ?
    `;

    db.query(
        sql,
        [id],
        callback
    );

};