const db = require("../config/db");

// ======================================
// Add Doctor
// ======================================

exports.addDoctor = (doctor, callback) => {

    const sql = `
        INSERT INTO doctors
        (name, specialization, phone, email)
        VALUES (?, ?, ?, ?)
    `;

    const values = [
        doctor.name,
        doctor.specialization,
        doctor.phone,
        doctor.email
    ];

    db.query(sql, values, callback);
};


// ======================================
// Get All Doctors
// ======================================

exports.getDoctors = (callback) => {

    const sql = `
        SELECT *
        FROM doctors
        ORDER BY id DESC
    `;

    db.query(sql, callback);
};


// ======================================
// Search Doctors
// ======================================

exports.searchDoctors = (search, callback) => {

    const sql = `
        SELECT *
        FROM doctors
        WHERE name LIKE ?
        OR specialization LIKE ?
        OR phone LIKE ?
        OR email LIKE ?
        ORDER BY id DESC
    `;

    const searchValue = `%${search}%`;

    const values = [
        searchValue,
        searchValue,
        searchValue,
        searchValue
    ];

    db.query(sql, values, callback);
};


// ======================================
// Get Doctor By ID
// ======================================

exports.getDoctorById = (id, callback) => {

    const sql = `
        SELECT *
        FROM doctors
        WHERE id = ?
    `;

    db.query(sql, [id], callback);
};


// ======================================
// Update Doctor
// ======================================

exports.updateDoctor = (id, doctor, callback) => {

    const sql = `
        UPDATE doctors
        SET
            name = ?,
            specialization = ?,
            phone = ?,
            email = ?
        WHERE id = ?
    `;

    const values = [
        doctor.name,
        doctor.specialization,
        doctor.phone,
        doctor.email,
        id
    ];

    db.query(sql, values, callback);
};


// ======================================
// Delete Doctor
// ======================================

exports.deleteDoctor = (id, callback) => {

    const sql = `
        DELETE FROM doctors
        WHERE id = ?
    `;

    db.query(sql, [id], callback);
};