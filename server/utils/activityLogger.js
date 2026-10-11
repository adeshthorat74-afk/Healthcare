const db = require("../config/db");

// ======================================
// AUTOMATIC ACTIVITY LOGGER
// ======================================

const logActivity = (
    userId,
    action,
    description
) => {

    const sql = `
        INSERT INTO activities
        (
            user_id,
            action,
            description
        )
        VALUES (?, ?, ?)
    `;

    db.query(
        sql,
        [
            userId || null,
            action,
            description || null
        ],
        (err) => {

            if (err) {

                console.error(
                    "Activity Log Error:",
                    err.message
                );

            }

        }
    );
};

module.exports = logActivity;