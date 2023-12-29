const User = require("../models/user.js");
const express = require("express");
const router = express.Router();

router.post("/register", async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(200).json("Successfully registered ");
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;