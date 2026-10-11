const express = require("express");

const router = express.Router();

const {
    getActivities,
    addActivity,
    deleteActivity
} = require("../controllers/activityController");


// ======================================
// ACTIVITY ROUTES
// ======================================

// GET all activities
router.get("/activity", getActivities);

// ADD activity
router.post("/activity", addActivity);

// DELETE activity
router.delete("/activity/:id", deleteActivity);


module.exports = router;