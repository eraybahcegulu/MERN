const User = require("../models/user.js");
const express = require("express");
const router = express.Router();
const generateJWT = require('../utils/generateJWT')
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

router.post("/register", async (req, res) => {
    try {
        const existingUserControl = await User.findOne({ username: req.body.username });

        if (existingUserControl) {
            return res.status(400).json({ message: "This username is already registered" })
        }

        const newUser = new User(req.body);
        await newUser.save();
        return res.status(200).json({ message: "Successfully registered" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username, password });
        if (user) {

            const newSessionSecurityStamp = crypto.randomBytes(30).toString('base64');
            user.securityStamp = newSessionSecurityStamp;
            await user.save();
            
            const token = generateJWT.generateJWT(user);
            return res.status(200).json({ message: 'Login successful', token: token, securityStamp: newSessionSecurityStamp });
        }

        return res.status(400).json({ message: 'Invalid username or password' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

router.post("/userInfo", async (req, res) => {

    try {
        const token = req.body.headers.Authorization.split(' ')[1]
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decodedToken.userId);

        if(!user)
        {
            return res.status(404).json({ status: 404, message: 'User not found.' });
        }

        username = decodedToken.userName
        id = decodedToken.userId
        securitystamp = user.securityStamp

        return res.json({
            username,
            id,
            securitystamp
        });

    } catch (error) {
        console.error('Error getting user info', error);
        res.status(500).json({ status: 500, message: 'Error getting user info', error: error.message });
    }
});

module.exports = router;