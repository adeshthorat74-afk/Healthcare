const db = require("../config/db");
const bcrypt = require("bcrypt");

// ======================================
// GET LOGGED-IN USER PROFILE
// ======================================

const getProfile = async (req, res) => {

    try {

        const userId = req.user.id;

        const [user] = await db.promise().query(
            `
            SELECT id, name, email, role
            FROM users
            WHERE id = ?
            `,
            [userId]
        );

        if (user.length === 0) {

            return res.status(404).json({
                success: false,
                message: "User Not Found"
            });

        }

        res.status(200).json({
            success: true,
            data: user[0]
        });

    } catch (error) {

        console.error("Get Profile Error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to Get Profile",
            error: error.message
        });

    }

};


// ======================================
// UPDATE LOGGED-IN USER PROFILE
// ======================================

const updateProfile = async (req, res) => {

    try {

        const userId = req.user.id;

        const { name, email } = req.body;

        // Validate fields
        if (!name || !email) {

            return res.status(400).json({
                success: false,
                message: "Name and Email are required"
            });

        }

        // Check whether user exists
        const [user] = await db.promise().query(
            `
            SELECT id
            FROM users
            WHERE id = ?
            `,
            [userId]
        );

        if (user.length === 0) {

            return res.status(404).json({
                success: false,
                message: "User Not Found"
            });

        }

        // Check if email already belongs to another user
        const [existingEmail] = await db.promise().query(
            `
            SELECT id
            FROM users
            WHERE email = ?
            AND id != ?
            `,
            [email, userId]
        );

        if (existingEmail.length > 0) {

            return res.status(409).json({
                success: false,
                message: "Email is already registered"
            });

        }

        // Update profile
        await db.promise().query(
            `
            UPDATE users
            SET name = ?, email = ?
            WHERE id = ?
            `,
            [name, email, userId]
        );

        // Get updated profile
        const [updatedUser] = await db.promise().query(
            `
            SELECT id, name, email, role
            FROM users
            WHERE id = ?
            `,
            [userId]
        );

        res.status(200).json({
            success: true,
            message: "Profile Updated Successfully",
            data: updatedUser[0]
        });

    } catch (error) {

        console.error("Update Profile Error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to Update Profile",
            error: error.message
        });

    }

};


// ======================================
// CHANGE PASSWORD
// ======================================

const changePassword = async (req, res) => {

    try {

        const userId = req.user.id;

        const {
            currentPassword,
            newPassword
        } = req.body;

        // Validate fields
        if (!currentPassword || !newPassword) {

            return res.status(400).json({
                success: false,
                message:
                    "Current password and new password are required"
            });

        }

        // Minimum password length
        if (newPassword.length < 6) {

            return res.status(400).json({
                success: false,
                message:
                    "New password must be at least 6 characters"
            });

        }

        // Get user
        const [user] = await db.promise().query(
            `
            SELECT *
            FROM users
            WHERE id = ?
            `,
            [userId]
        );

        if (user.length === 0) {

            return res.status(404).json({
                success: false,
                message: "User Not Found"
            });

        }

        // Check current password
        const isMatch = await bcrypt.compare(
            currentPassword,
            user[0].password
        );

        if (!isMatch) {

            return res.status(400).json({
                success: false,
                message: "Current Password is Incorrect"
            });

        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(
            newPassword,
            10
        );

        // Update password
        await db.promise().query(
            `
            UPDATE users
            SET password = ?
            WHERE id = ?
            `,
            [hashedPassword, userId]
        );

        res.status(200).json({
            success: true,
            message: "Password Changed Successfully"
        });

    } catch (error) {

        console.error("Change Password Error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to Change Password",
            error: error.message
        });

    }

};


// ======================================
// EXPORT CONTROLLERS
// ======================================

module.exports = {
    getProfile,
    updateProfile,
    changePassword
};