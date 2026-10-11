const express = require("express");

const router = express.Router();

const verifyToken = require("../middleware/verifyToken");
const { changePassword } = require("../controllers/passwordController");

router.put(
    "/change-password",
    verifyToken,
    changePassword
);

module.exports = router;