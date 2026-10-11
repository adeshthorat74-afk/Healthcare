const db = require("../config/db");

// ======================================
// Add Patient
// ======================================

exports.addPatient = (patient, callback) => {

    const sql = `
        INSERT INTO patients
        (
            name,
            age,
            gender,
            phone,
            email,
            address,
            disease,
            doctor_id
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
        patient.name,
        patient.age,
        patient.gender,
        patient.phone,
        patient.email,
        patient.address,
        patient.disease,
        patient.doctor_id
    ];

    db.query(sql, values, callback);
};


// ======================================
// Get All Patients
// ======================================

exports.getPatients = (callback) => {

    const sql = `
        SELECT *
        FROM patients
        ORDER BY id DESC
    `;

    db.query(sql, callback);
};


// ======================================
// Search Patients
// ======================================

exports.searchPatients = (search, callback) => {

    const sql = `
        SELECT *
        FROM patients
        WHERE
            name LIKE ?
            OR phone LIKE ?
            OR email LIKE ?
            OR gender LIKE ?
            OR address LIKE ?
            OR disease LIKE ?
        ORDER BY id DESC
    `;

    const searchValue = `%${search}%`;

    const values = [
        searchValue,
        searchValue,
        searchValue,
        searchValue,
        searchValue,
        searchValue
    ];

    db.query(sql, values, callback);
};


// ======================================
// Get Patient By ID
// ======================================

exports.getPatientById = (id, callback) => {

    const sql = `
        SELECT *
        FROM patients
        WHERE id = ?
    `;

    db.query(sql, [id], callback);
};


// ======================================
// Update Patient
// ======================================

exports.updatePatient = (id, patient, callback) => {

    const sql = `
        UPDATE patients
        SET
            name = ?,
            age = ?,
            gender = ?,
            phone = ?,
            email = ?,
            address = ?,
            disease = ?,
            doctor_id = ?
        WHERE id = ?
    `;

    const values = [
        patient.name,
        patient.age,
        patient.gender,
        patient.phone,
        patient.email,
        patient.address,
        patient.disease,
        patient.doctor_id,
        id
    ];

    db.query(sql, values, callback);
};


// ======================================
// Delete Patient
// ======================================

exports.deletePatient = (id, callback) => {

    const sql = `
        DELETE FROM patients
        WHERE id = ?
    `;

    db.query(sql, [id], callback);
};