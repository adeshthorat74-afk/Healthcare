const db = require("../config/db");

// ======================================
// ADD APPOINTMENT
// ======================================

exports.addAppointment = (appointment, callback) => {

    const sql = `
        INSERT INTO appointments
        (
            patient_id,
            doctor_id,
            appointment_date,
            appointment_time,
            status
        )
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            appointment.patient_id,
            appointment.doctor_id,
            appointment.appointment_date,
            appointment.appointment_time,
            appointment.status || "Pending"
        ],
        callback
    );

};


// ======================================
// GET ALL APPOINTMENTS
// ======================================

exports.getAppointments = (callback) => {

    const sql = `
        SELECT
            id,
            patient_id,
            doctor_id,
            appointment_date,
            appointment_time,
            status
        FROM appointments
        ORDER BY appointment_date DESC, appointment_time DESC
    `;

    db.query(sql, callback);

};


// ======================================
// GET APPOINTMENT BY ID
// ======================================

exports.getAppointmentById = (id, callback) => {

    const sql = `
        SELECT
            id,
            patient_id,
            doctor_id,
            appointment_date,
            appointment_time,
            status
        FROM appointments
        WHERE id = ?
    `;

    db.query(
        sql,
        [id],
        callback
    );

};


// ======================================
// UPDATE APPOINTMENT
// ======================================

exports.updateAppointment = (id, appointment, callback) => {

    const sql = `
        UPDATE appointments
        SET
            patient_id = ?,
            doctor_id = ?,
            appointment_date = ?,
            appointment_time = ?,
            status = ?
        WHERE id = ?
    `;

    db.query(
        sql,
        [
            appointment.patient_id,
            appointment.doctor_id,
            appointment.appointment_date,
            appointment.appointment_time,
            appointment.status || "Pending",
            id
        ],
        callback
    );

};


// ======================================
// DELETE APPOINTMENT
// ======================================

exports.deleteAppointment = (id, callback) => {

    const sql = `
        DELETE FROM appointments
        WHERE id = ?
    `;

    db.query(
        sql,
        [id],
        callback
    );

};