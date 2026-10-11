const db = require("../config/db");

const getDashboardStats = async (req, res) => {

    try {

        // Dashboard Counts
        const [doctorResult] = await db.promise().query(
            "SELECT COUNT(*) AS totalDoctors FROM doctors"
        );

        const [patientResult] = await db.promise().query(
            "SELECT COUNT(*) AS totalPatients FROM patients"
        );

        const [appointmentResult] = await db.promise().query(
            "SELECT COUNT(*) AS totalAppointments FROM appointments"
        );

        const [billResult] = await db.promise().query(
            "SELECT COUNT(*) AS totalBills FROM bills"
        );

        const [revenueResult] = await db.promise().query(
            "SELECT IFNULL(SUM(amount),0) AS totalRevenue FROM bills"
        );

        // Recent Doctors
        const [recentDoctors] = await db.promise().query(
            "SELECT * FROM doctors ORDER BY id DESC LIMIT 5"
        );

        // Recent Patients
        const [recentPatients] = await db.promise().query(
            "SELECT * FROM patients ORDER BY id DESC LIMIT 5"
        );

        // Recent Appointments
        const [recentAppointments] = await db.promise().query(
            "SELECT * FROM appointments ORDER BY id DESC LIMIT 5"
        );

        res.status(200).json({

            totalDoctors: doctorResult[0].totalDoctors,

            totalPatients: patientResult[0].totalPatients,

            totalAppointments: appointmentResult[0].totalAppointments,

            totalBills: billResult[0].totalBills,

            totalRevenue: revenueResult[0].totalRevenue,

            recentDoctors,

            recentPatients,

            recentAppointments

        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            success: false,
            message: "Dashboard Error"
        });

    }

};

module.exports = {
    getDashboardStats
};