const db = require("../config/db");

// ======================================
// ADD ACTIVITY LOG
// ======================================

exports.addActivity = (activity, callback) => {

    const sql = `
        INSERT INTO activity_logs
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
            activity.user_id,
            activity.action,
            activity.description
        ],
        callback
    );
};


// ======================================
// GET ALL ACTIVITY LOGS
// ======================================

exports.getActivities = (callback) => {

    const sql = `
        SELECT
            id,
            user_id,
            action,
            description,
            created_at
        FROM activity_logs
        ORDER BY id DESC
    `;

    db.query(sql, callback);
};


// ======================================
// GET ACTIVITY BY ID
// ======================================

exports.getActivityById = (id, callback) => {

    const sql = `
        SELECT
            id,
            user_id,
            action,
            description,
            created_at
        FROM activity_logs
        WHERE id = ?
    `;

    db.query(
        sql,
        [id],
        callback
    );
};


// ======================================
// DELETE ACTIVITY LOG
// ======================================

exports.deleteActivity = (id, callback) => {

    const sql = `
        DELETE FROM activity_logs
        WHERE id = ?
    `;

    db.query(
        sql,
        [id],
        callback
    );
};