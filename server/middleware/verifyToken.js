const jwt = require("jsonwebtoken");

// ======================================
// VERIFY TOKEN MIDDLEWARE
// ======================================

const verifyToken = (req, res, next) => {

    try {

        // Get Authorization header
        const authHeader = req.headers.authorization;

        // Check token
        if (!authHeader || !authHeader.startsWith("Bearer ")) {

            return res.status(401).json({
                success: false,
                message: "Access Denied. No token provided."
            });

        }

        // Extract token
        const token = authHeader.split(" ")[1];

        // Verify token
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // Store decoded user information
        req.user = decoded;

        // Continue
        next();

    } catch (error) {

        console.error("Token Verification Error:", error.message);

        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });

    }

};

module.exports = verifyToken;