const bcrypt = require("bcrypt");
const db = require("../config/db");

// ======================================
// CHANGE PASSWORD
// ======================================

exports.changePassword = (req, res) => {

    const userId = req.user.id;

    const {
        currentPassword,
        newPassword
    } = req.body;


    // ======================================
    // VALIDATION
    // ======================================

    if (!currentPassword || !newPassword) {

        return res.status(400).json({
            success: false,
            message: "Current password and new password are required"
        });

    }


    if (newPassword.length < 6) {

        return res.status(400).json({
            success: false,
            message: "New password must be at least 6 characters"
        });

    }


    // ======================================
    // GET USER
    // ======================================

    const sql = `
        SELECT id, password
        FROM users
        WHERE id = ?
    `;

    db.query(sql, [userId], async (err, result) => {

        if (err) {

            console.error("Get User Error:", err);

            return res.status(500).json({
                success: false,
                message: "Database error"
            });

        }


        // User not found
        if (result.length === 0) {

            return res.status(404).json({
                success: false,
                message: "User not found"
            });

        }


        // ======================================
        // CHECK CURRENT PASSWORD
        // ======================================

        const user = result[0];

        const passwordMatch = await bcrypt.compare(
            currentPassword,
            user.password
        );


        if (!passwordMatch) {

            return res.status(401).json({
                success: false,
                message: "Current password is incorrect"
            });

        }


        // ======================================
        // HASH NEW PASSWORD
        // ======================================

        const hashedPassword = await bcrypt.hash(
            newPassword,
            10
        );


        // ======================================
        // UPDATE PASSWORD
        // ======================================

        const updateSql = `
            UPDATE users
            SET password = ?
            WHERE id = ?
        `;

        db.query(
            updateSql,
            [hashedPassword, userId],
            (updateErr, updateResult) => {

                if (updateErr) {

                    console.error(
                        "Update Password Error:",
                        updateErr
                    );

                    return res.status(500).json({
                        success: false,
                        message: "Failed to update password"
                    });

                }


                if (updateResult.affectedRows === 0) {

                    return res.status(404).json({
                        success: false,
                        message: "User not found"
                    });

                }


                // ======================================
                // SUCCESS
                // ======================================

                return res.status(200).json({
                    success: true,
                    message: "Password Changed Successfully"
                });

            }
        );

    });

};