const User = require("../models/user");

const { hashPassword, comparePassword } = require('../utils/bcrypt');

const { generateUserToken, verifyToken, generateEmailConfirmToken } = require('../utils/jwt');

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

        const hashedPassword = await hashPassword(req.body.password);

        const emailConfirmToken = generateEmailConfirmToken(req.body.email);

        const newUser = new User({
            userName: req.body.userName,
            email: req.body.email,
            password: hashedPassword,
            verificationToken: emailConfirmToken
        });

        sendMailEmailConfirm({ userName: newUser.userName, email: newUser.email, emailConfirmToken: newUser.verificationToken });

        await newUser.save();

        return responseHandler.created(res, { message: `Successfully registered. Email confirmation required, link sent to ${newUser.email}` });
    } catch (error) {
        console.error('Error', error);
        return responseHandler.serverError(res, 'Server error');
    }
};

const emailConfirm = async (req, res) => {
    const { emailConfirmToken } = req.params
    //console.log(emailConfirmToken)
    try {
        const user = await User.findOne({ verificationToken: emailConfirmToken })
        if (!user) {
            return responseHandler.notFound(res, 'User not found. Try register');
        }

        try {
            const decodedToken = verifyToken(emailConfirmToken);
            if (decodedToken.email === user.email) {
                user.isEmailVerified = true;
                user.verificationToken = null;

                await user.save()
                //console.log(user)

                return responseHandler.ok(res, { message: "Your email address has been confirmed successfully" });
            }
        }
        catch (error) {
            return responseHandler.notFound(res, 'Verification failed. OTP is expired.');
        }
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
            if (!user.password) {
                return responseHandler.badRequest(res, "Invalid User Name or Password")
            }

            const isPasswordMatch = await comparePassword(password, user.password);
            if (isPasswordMatch) {

                if (!user.isEmailVerified) {
                    return responseHandler.badRequest(res, "Please confirm your email address to login. Check your email address")
                    //sendMailEmailConfirm({ userName: user.userName, email: user.email, token: user.token });
                }

                user.lastLoginAt = new Date();

                user.activityLevel = Number(user.activityLevel) + 1;

                let isFirstLogin = false;
                if (user.isFirstLogin) {
                    isFirstLogin = true;
                    user.isFirstLogin = false;
                }

                await user.save();

                const token = generateUserToken(user);
                return responseHandler.ok(res, { message: 'Login successful', token: token, ...(isFirstLogin ? { isFirstLogin: true } : {}) });
            }
        }
        return responseHandler.badRequest(res, "Invalid User Name or Password")
    } catch (error) {
        console.error('Error', error);
        return responseHandler.serverError(res, 'Server error');
    }
};

const loginGoogle = async (req, res) => {
    try {
        const user = req.user;
        //console.log(user)

        if (user) {

            user.lastLoginAt = new Date();

            user.activityLevel = Number(user.activityLevel) + 1;

            res.redirect(`http://localhost:3000/api/auth/google/${user.googleUserToken}`);

            user.googleUserToken = null;

            await user.save();

        } else {
            console.error("User not found");
            return responseHandler.badRequest(res, "User not found");
        }
    } catch (error) {
        console.error('Error', error);
        return responseHandler.serverError(res, 'Server error');
    }
};

const userInfo = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = verifyToken(token);

        const user = await User.findById(decodedToken.userId);
        if (!user) {
            return responseHandler.notFound(res, 'User not found. Try Again Login');
        }

        const userId = decodedToken.userId;
        const userName = decodedToken.userName;
        const email = decodedToken.email;
        const userRole = decodedToken.userRole;
        const isGoogleAuth = decodedToken.isGoogleAuth;

        return responseHandler.ok(res, {
            userId,
            userName,
            email,
            userRole,
            token,
            isGoogleAuth
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

        const isPasswordMatch = await comparePassword(req.body.currentPassword, user.password);

        if (!isPasswordMatch) {
            return responseHandler.badRequest(res, 'Invalid Current Password');
        }

        const hashedPassword = await hashPassword(req.body.newPassword);

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

        const newTokenAfterEmailChange = generateUserToken(user);

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
    loginGoogle,
    userInfo,
    changePassword,
    changeEmail
};
