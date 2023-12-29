const User = require("../models/user.js");
const express = require("express");
const router = express.Router();

router.post("/register", async (req, res) => {
    try {
        const existingUserControl = await User.findOne({ username: req.body.username });

        if (existingUserControl) {
            return res.status(400).json({ message: "This username is already registered." })
        }

        const newUser = new User(req.body);
        await newUser.save();
        return res.status(200).json({ message: "Successfully registered " });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

module.exports = router;