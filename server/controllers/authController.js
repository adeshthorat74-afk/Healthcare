const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// ======================================
// REGISTER
// ======================================

exports.register = async (req, res) => {

    try {

        const { name, email, password, role } = req.body;

        if (!name || !email || !password) {

            return res.status(400).json({
                success: false,
                message: "Name, email and password are required"
            });

        }

        User.findUserByEmail(email, async (err, result) => {

            if (err) {

                console.error("Find User Error:", err);

                return res.status(500).json({
                    success: false,
                    message: "Database error"
                });

            }

            if (result.length > 0) {

                return res.status(400).json({
                    success: false,
                    message: "Email already exists"
                });

            }

            const hashedPassword = await bcrypt.hash(
                password,
                10
            );

            const newUser = {
                name: name,
                email: email,
                password: hashedPassword,
                role: role || "patient"
            };

            User.createUser(newUser, (err, result) => {

                if (err) {

                    console.error("Create User Error:", err);

                    return res.status(500).json({
                        success: false,
                        message: "Unable to register user"
                    });

                }

                return res.status(201).json({
                    success: true,
                    message: "User Registered Successfully",
                    id: result.insertId
                });

            });

        });

    } catch (error) {

        console.error("Register Error:", error);

        return res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

};


// ======================================
// LOGIN
// ======================================

exports.login = async (req, res) => {

    try {

        const { email, password } = req.body;

        if (!email || !password) {

            return res.status(400).json({
                success: false,
                message: "Email and Password are required"
            });

        }

        // Check JWT secret
        if (!process.env.JWT_SECRET) {

            console.error(
                "JWT_SECRET is missing in server .env"
            );

            return res.status(500).json({
                success: false,
                message: "JWT configuration error"
            });

        }

        User.findUserByEmail(email, async (err, result) => {

            if (err) {

                console.error("Find User Error:", err);

                return res.status(500).json({
                    success: false,
                    message: "Database error"
                });

            }

            if (result.length === 0) {

                return res.status(404).json({
                    success: false,
                    message: "User not found"
                });

            }

            const user = result[0];

            // Check password
            const isMatch = await bcrypt.compare(
                password,
                user.password
            );

            if (!isMatch) {

                return res.status(401).json({
                    success: false,
                    message: "Invalid Password"
                });

            }

            // ======================================
            // CREATE JWT TOKEN
            // ======================================

            const token = jwt.sign(
                {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: "1d"
                }
            );

            console.log("Login successful for:", user.email);

            return res.status(200).json({

                success: true,

                message: "Login Successful",

                token: token,

                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                }

            });

        });

    } catch (error) {

        console.error("Login Error:", error);

        return res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

};


// ======================================
// PROFILE
// ======================================

exports.profile = (req, res) => {

    return res.status(200).json({

        success: true,

        message: "Profile Loaded Successfully",

        user: {
            id: req.user.id,
            name: req.user.name,
            email: req.user.email,
            role: req.user.role
        }

    });

};