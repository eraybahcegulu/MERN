const User = require("../models/user");
const generate = require('../utils/generate');

const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');

const responseHandler = require('../handlers/responseHandler')

const { sendMailEmailConfirm } = require('../utils/sendMail')

const register = async (req, res) => {
    try {
        const existingUserNameControl = await User.findOne({ userName: req.body.userName });
        if (existingUserNameControl) {
            return responseHandler.badRequest(res, "This User Name is already registered");
        }

        const existingEmailControl = await User.findOne({ email: req.body.email });
        if (existingEmailControl) {
            return responseHandler.badRequest(res, "This Email is already registered");
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const emailConfirmToken = generate.emailConfirmToken();

        const newUser = new User({
            userName: req.body.userName,
            email: req.body.email,
            password: hashedPassword,
            emailConfirmToken: emailConfirmToken
        });

        sendMailEmailConfirm({ userName: newUser.userName, email: newUser.email, emailConfirmToken: newUser.emailConfirmToken });

        await newUser.save();

        return responseHandler.created(res, { message: "Successfully registered" });
    } catch (error) {
        console.error('Error', error);
        return responseHandler.serverError(res, 'Server error');
    }
};

const emailConfirm = async (req, res) => {
    const { emailConfirmToken } = req.params
    //console.log(emailConfirmToken)
    try {
        const user = await User.findOne({ emailConfirmToken })
        if (!user) {
            return responseHandler.notFound(res, 'User not found. Try register');
        }

        user.isEmailConfirmed = true;
        user.emailConfirmToken = "";

        await user.save()
        //console.log(user)

        return responseHandler.ok(res, { message: "Your email address has been confirmed successfully" });
    } catch (error) {
        console.error('Error', error);
        return responseHandler.serverError(res, 'Server error');
    }

}

const login = async (req, res) => {
    const { userNameEmail, password } = req.body;
    try {
        const user = await User.findOne({ $or: [{ userName: userNameEmail }, { email: userNameEmail }] });

        if (user) {
            if (!user.isEmailConfirmed) {
                return responseHandler.badRequest(res, "Please confirm your email address to login. Check your email adress")
                //sendMailEmailConfirm({ userName: user.userName, email: user.email, token: user.token });
            }
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (isPasswordValid) {
                user.lastLoginAt = new Date();
                await user.save();

                const token = generate.token(user);
                return responseHandler.ok(res, { message: 'Login successful', token: token });
            }
        }
        return responseHandler.badRequest(res, "Invalid User Name or Password")
    } catch (error) {
        console.error('Error', error);
        return responseHandler.serverError(res, 'Server error');
    }
};

const userInfo = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decodedToken.userId);
        if (!user) {
            return responseHandler.notFound(res, 'User not found. Try Again Login');
        }

        const userId = decodedToken.userId;
        const userName = decodedToken.userName;
        const email = decodedToken.email;
        const userRole = decodedToken.userRole;

        return responseHandler.ok(res, {
            userId,
            userName,
            email,
            userRole,
            token
        });

    } catch (error) {
        console.error('Error', error);
        return responseHandler.serverError(res, 'Try login again!!!');
    }
};

const changePassword = async (req, res) => {
    const id = req.params.id;
    try {

        const user = await User.findById(id);
        if (!user) {
            return responseHandler.notFound(res, 'User not found. Try Again Login');
        }

        const isPasswordValid = await bcrypt.compare(req.body.currentPassword, user.password);

        if (!isPasswordValid) {
            return responseHandler.badRequest(res, 'Invalid Current Password');
        }

        const hashedPassword = await bcrypt.hash(req.body.newPassword, 10);

        user.password = hashedPassword;
        await user.save();

        return responseHandler.ok(res, { message: 'Your password has been changed successfully' });

    } catch (error) {
        console.error('Error', error);
        return responseHandler.serverError(res, 'Server error');
    }
};

const changeEmail = async (req, res) => {
    const id = req.params.id;
    try {

        const user = await User.findById(id);
        if (!user) {
            return responseHandler.notFound(res, 'User not found. Try Again Login');
        }

        const existingEmail = await User.findOne({ email: req.body.newEmail })
        if (existingEmail) {
            return responseHandler.badRequest(res, `${req.body.newEmail} is already registered, try again`);
        }

        user.email = req.body.newEmail;
        await user.save();
        //console.log(user);

        const newTokenAfterEmailChange = generate.token(user);

        return responseHandler.ok(res, { message: 'Your email has been changed successfully', token: newTokenAfterEmailChange });

    } catch (error) {
        console.error('Error', error);
        return responseHandler.serverError(res, 'Server error');
    }
};

module.exports = {
    register,
    emailConfirm,
    login,
    userInfo,
    changePassword,
    changeEmail
};
