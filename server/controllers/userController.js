const User = require("../models/user.js");
const generateJWT = require('../utils/generateJWT.js');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const register = async (req, res) => {
    try {
        const existingUserControl = await User.findOne({ userName: req.body.userName });

        if (existingUserControl) {
            return res.status(400).json({ message: "This User Name is already registered" })
        }

        const newUser = new User(req.body);
        await newUser.save();
        return res.status(200).json({ message: "Successfully registered" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const login = async (req, res) => {
    const { userName, password } = req.body;
    try {
        const user = await User.findOne({ userName, password });
        if (user) {

            const newSessionSecurityStamp = crypto.randomBytes(30).toString('base64');
            user.securityStamp = newSessionSecurityStamp;
            await user.save();

            const token = generateJWT.generateJWT(user);
            return res.status(200).json({ message: 'Login successful', token: token, securityStamp: newSessionSecurityStamp });
        }
        return res.status(400).json({ message: 'Invalid User Name or Passowrod' });
    } catch (error) {
        console.error('Error', error);
        res.status(500).json({ status: 500, message: 'Error', error: error.message });
    }
};

const userInfo = async (req, res) => {
    try {
        const token = req.body.headers.Authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decodedToken.userId);
        if (!user) {
            return res.status(404).json({ status: 404, message: 'User not found. Try Again Login' });
        }

        const userName = decodedToken.userName;
        const id = decodedToken.userId;
        const securitystamp = user.securityStamp;

        return res.json({
            userName,
            id,
            securitystamp
        });

    } catch (error) {
        console.error('Error', error);
        res.status(500).json({ status: 500, message: 'Error', error: error.message });
    }
};

module.exports = {
    register,
    login,
    userInfo
};
