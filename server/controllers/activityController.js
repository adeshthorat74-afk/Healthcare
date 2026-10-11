const db = require("../config/db");

// ======================================
// GET ALL ACTIVITIES
// ======================================

const getActivities = (req, res) => {
    const sql = `
        SELECT 
            id,
            user_id,
            action,
            description,
            created_at
        FROM activities
        ORDER BY created_at DESC
    `;

    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error fetching activities:", err);

            return res.status(500).json({
                success: false,
                message: "Failed to fetch activities",
                error: err.message
            });
        }

        res.status(200).json({
            success: true,
            activities: results
        });
    });
};


// ======================================
// ADD ACTIVITY
// ======================================

const addActivity = (req, res) => {

    const {
        user_id,
        action,
        description
    } = req.body;

    if (!action) {
        return res.status(400).json({
            success: false,
            message: "Action is required"
        });
    }

    const sql = `
        INSERT INTO activities
        (user_id, action, description)
        VALUES (?, ?, ?)
    `;

    db.query(
        sql,
        [
            user_id || null,
            action,
            description || null
        ],
        (err, result) => {

            if (err) {
                console.error("Error adding activity:", err);

                return res.status(500).json({
                    success: false,
                    message: "Failed to add activity",
                    error: err.message
                });
            }

            res.status(201).json({
                success: true,
                message: "Activity added successfully",
                activityId: result.insertId
            });
        }
    );
};


// ======================================
// DELETE ACTIVITY
// ======================================

const deleteActivity = (req, res) => {

    const { id } = req.params;

    const sql = "DELETE FROM activities WHERE id = ?";

    db.query(sql, [id], (err, result) => {

        if (err) {
            console.error("Error deleting activity:", err);

            return res.status(500).json({
                success: false,
                message: "Failed to delete activity",
                error: err.message
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Activity not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Activity deleted successfully"
        });
    });
};


module.exports = {
    getActivities,
    addActivity,
    deleteActivity
};