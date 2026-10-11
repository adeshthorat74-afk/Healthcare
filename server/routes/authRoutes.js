const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");
const authorizeRole = require("../middleware/roleMiddleware");

const {
    register,
    login,
    profile
} = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);

router.get("/profile", verifyToken, profile);

router.get(
    "/admin",
    verifyToken,
    authorizeRole("admin"),
    (req, res) => {
        res.json({
            message: "Welcome Admin"
        });
    }
);

module.exports = router;