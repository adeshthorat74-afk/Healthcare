const db = require("../config/db");

// ======================================
// GET HOSPITAL SETTINGS
// ======================================

const getSettings = async (req, res) => {

    try {

        const [settings] = await db.promise().query(
            `
            SELECT
                id,
                hospital_name,
                address,
                phone,
                email,
                website
            FROM hospital_settings
            LIMIT 1
            `
        );

        // Settings not found
        if (settings.length === 0) {

            return res.status(404).json({
                success: false,
                message: "Hospital settings not found"
            });

        }

        res.status(200).json({
            success: true,
            data: settings[0]
        });

    } catch (error) {

        console.error("Get Settings Error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to Get Hospital Settings",
            error: error.message
        });

    }

};


// ======================================
// UPDATE HOSPITAL SETTINGS
// ======================================

const updateSettings = async (req, res) => {

    try {

        const {
            hospital_name,
            address,
            phone,
            email,
            website
        } = req.body;


        // ======================================
        // VALIDATION
        // ======================================

        if (
            !hospital_name ||
            !address ||
            !phone ||
            !email
        ) {

            return res.status(400).json({
                success: false,
                message:
                    "Hospital name, address, phone and email are required"
            });

        }


        // ======================================
        // CHECK SETTINGS EXIST
        // ======================================

        const [existingSettings] =
            await db.promise().query(
                `
                SELECT id
                FROM hospital_settings
                LIMIT 1
                `
            );


        if (existingSettings.length === 0) {

            // Create settings if they don't exist
            const [result] =
                await db.promise().query(
                    `
                    INSERT INTO hospital_settings
                    (
                        hospital_name,
                        address,
                        phone,
                        email,
                        website
                    )
                    VALUES (?, ?, ?, ?, ?)
                    `,
                    [
                        hospital_name,
                        address,
                        phone,
                        email,
                        website || ""
                    ]
                );


            return res.status(201).json({
                success: true,
                message:
                    "Hospital Settings Created Successfully",
                id: result.insertId
            });

        }


        // ======================================
        // UPDATE EXISTING SETTINGS
        // ======================================

        const settingsId =
            existingSettings[0].id;

        await db.promise().query(
            `
            UPDATE hospital_settings
            SET
                hospital_name = ?,
                address = ?,
                phone = ?,
                email = ?,
                website = ?
            WHERE id = ?
            `,
            [
                hospital_name,
                address,
                phone,
                email,
                website || "",
                settingsId
            ]
        );


        // ======================================
        // GET UPDATED SETTINGS
        // ======================================

        const [updatedSettings] =
            await db.promise().query(
                `
                SELECT
                    id,
                    hospital_name,
                    address,
                    phone,
                    email,
                    website
                FROM hospital_settings
                WHERE id = ?
                `,
                [settingsId]
            );


        res.status(200).json({
            success: true,
            message:
                "Hospital Settings Updated Successfully",
            data: updatedSettings[0]
        });

    } catch (error) {

        console.error(
            "Update Settings Error:",
            error
        );

        res.status(500).json({
            success: false,
            message:
                "Failed to Update Hospital Settings",
            error: error.message
        });

    }

};


// ======================================
// EXPORT CONTROLLERS
// ======================================

module.exports = {
    getSettings,
    updateSettings
};