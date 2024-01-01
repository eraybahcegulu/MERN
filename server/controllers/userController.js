const User = require("../models/user");
const generate = require('../utils/generate');

const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');

const register = async (req, res) => {
    try {
        const existingUserControl = await User.findOne({ userName: req.body.userName });

        if (existingUserControl) {
            return res.status(400).json({ message: "This User Name is already registered" })
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const newUser = new User({
            userName: req.body.userName,
            password: hashedPassword,
        });

        await newUser.save();
        return res.status(200).json({ message: "Successfully registered" });
    } catch (error) {
        console.error('Error', error);
        res.status(500).json({ status: 500, message: 'Error', error: error.message });
    }
};

const login = async (req, res) => {
    const { userName, password } = req.body;
    try {
        const user = await User.findOne({ userName });

        if (user) {
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (isPasswordValid) {
                const newSessionSecurityStamp = generate.securityStamp();
                user.securityStamp = newSessionSecurityStamp;
                await user.save();

                const token = generate.token(user);
                return res.status(200).json({ message: 'Login successful', token: token, securityStamp: newSessionSecurityStamp });
            }
        }
        return res.status(400).json({ message: 'Invalid User Name or Password' });
    } catch (error) {
        console.error('Error', error);
        res.status(500).json({ status: 500, message: 'Error', error: error.message });
    }
};

const userInfo = async (req, res) => {
    try {
        const token = req.body.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decodedToken.userId);
        if (!user) {
            return res.status(404).json({ status: 404, message: 'User not found. Try Again Login' });
        }

        const userName = decodedToken.userName;
        const id = decodedToken.userId;
        const userRole = decodedToken.userRole;
        const securitystamp = user.securityStamp;

        return res.json({
            userName,
            id,
            userRole,
            securitystamp,

        });

    } catch (error) {
        console.error('Error', error);
        res.status(500).json({ status: 500, message: 'Error', error: error.message });
    }
};

const changePassword = async (req, res) => {
    const id = req.params.id;
    try {
        
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ status: 404, message: 'User not found. Try Again Login' });
        }

        const isPasswordValid = await bcrypt.compare(req.body.currentPassword, user.password);

        if(!isPasswordValid)
        {
            return res.status(400).json({ message: 'Invalid Current Password' });
        }

        const hashedPassword = await bcrypt.hash(req.body.newPassword, 10);

        user.password = hashedPassword;
        await user.save();

        return res.status(200).json({ message: 'Your password has been changed successfully'});

    } catch (error) {
        console.error('Error', error);
        res.status(500).json({ status: 500, message: 'Error', error: error.message });
    }
};

module.exports = {
    register,
    login,
    userInfo,
    changePassword
};
