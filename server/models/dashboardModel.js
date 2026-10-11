const db = require("../config/db");

exports.getDashboard = (callback) => {

    const sql = `
    SELECT
        (SELECT COUNT(*) FROM doctors) AS totalDoctors,

        (SELECT COUNT(*) FROM patients) AS totalPatients,

        (SELECT COUNT(*) FROM appointments) AS totalAppointments,

        (SELECT COUNT(*) FROM bills) AS totalBills,

        (SELECT COUNT(*) FROM reports) AS totalReports,

        (SELECT IFNULL(SUM(amount),0) FROM bills) AS totalRevenue
    `;

    db.query(sql, callback);

};