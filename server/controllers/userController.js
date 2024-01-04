const User = require("../models/user");
const generate = require('../utils/generate');

const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');

const register = async (req, res) => {
    try {
        const existingUserNameControl = await User.findOne({ userName: req.body.userName });
        if (existingUserNameControl) {
            return res.status(400).json({ message: "This User Name is already registered" })
        }

        const existingEmailControl = await User.findOne({ email: req.body.email });
        if (existingEmailControl) {
            return res.status(400).json({ message: "This Email is already registered" })
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const newUser = new User({
            userName: req.body.userName,
            email: req.body.email,
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
    const { userNameEmail, password } = req.body;
    try {
        const user = await User.findOne({ $or: [{ userName: userNameEmail }, { email: userNameEmail }] });

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

        const userId = decodedToken.userId;
        const userName = decodedToken.userName;
        const email = decodedToken.email;
        const userRole = decodedToken.userRole;
        const securityStamp = user.securityStamp;

        return res.json({
            userId,
            userName,
            email,
            userRole,
            securityStamp,
            token
        });

    } catch (error) {
        console.error('Error', error);
        res.status(500).json({ status: 500, message: 'Server Error. Try login again', error: error.message });
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
