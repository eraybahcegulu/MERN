const User = require("../models/user");
const UserRoles = require("../models/enums/userRoles");

const { hashPassword, comparePassword } = require('../utils/bcrypt');
const { paymentPremium } = require('../utils/iyzipay')
const { generateUserToken, verifyToken, generateVerificationToken, generateResetPasswordToken, generateChangeEmailConfirmToken } = require('../utils/jwt');
const { sendMailEmailConfirm, sendMailChangeEmailConfirm, sendMailInvalidLoginAttempt, sendMailForgotPassword } = require('../utils/sendMail');
const { dateNow } = require('../utils/moment');

const responseHandler = require('../handlers/responseHandler')

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

        const emailConfirmToken = generateVerificationToken(req.body.email);

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

const registerVisitor = async (req, res) => {
    try {
        const existingUserNameControl = await User.findOne({ userName: req.body.userName });
        if (existingUserNameControl) {
            return responseHandler.badRequest(res, "This User Name is already registered");
        }

        const existingVisitor = await User.findOne({ _id: req.params.id });
        if (!existingVisitor) {
            return responseHandler.notFound(res, 'User not found.');
        }

        const hashedPassword = await hashPassword(req.body.password);

        existingVisitor.userName = req.body.userName;
        existingVisitor.password = hashedPassword;
        existingVisitor.userRole = UserRoles.STANDARD;
        await existingVisitor.save();

        const newTokenAfterRegisterVisitor = generateUserToken(existingVisitor);

        return responseHandler.ok(res, { message: 'Successfully registered. Standard membership activated', token: newTokenAfterRegisterVisitor });
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
            const isPasswordMatch = user.password && await comparePassword(password, user.password);

            if (!isPasswordMatch) {

                console.log(user)
                user.invalidLoginAttempt = Number(user.invalidLoginAttempt) + 1;
                await user.save();

                if (user.invalidLoginAttempt % 5 === 0) {
                    sendMailInvalidLoginAttempt({ email: user.email, invalidLoginAttempt: user.invalidLoginAttempt })
                }

                return responseHandler.badRequest(res, "Invalid User Name or Password")
            }


            if (isPasswordMatch) {

                if (!user.isEmailVerified) {
                    return responseHandler.badRequest(res, "Please confirm your email address to login. Check your email address")
                    //sendMailEmailConfirm({ userName: user.userName, email: user.email, token: user.token });
                }

                user.invalidLoginAttempt = 0;
                user.lastLoginAt = dateNow();
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

            user.lastLoginAt = dateNow();
            user.invalidLoginAttempt = 0;
            user.activityLevel = Number(user.activityLevel) + 1;

            res.redirect(`${process.env.CLIENT_URL}/api/auth/google/${user.googleUserToken}`);

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

        if (user.resetPasswordToken) {
            const decodedToken = verifyToken(req.headers.authorization.split(' ')[1]);
            if (decodedToken.resetPasswordToken) {
                const hashedPassword = await hashPassword(req.body.newPassword);
                user.password = hashedPassword;
                user.resetPasswordToken = null;
                await user.save();
                return responseHandler.ok(res, { message: 'Your password has been changed successfully' });
            }
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

        const changeEmailConfirmToken = generateChangeEmailConfirmToken(user.email, req.body.newEmail);

        user.verificationToken = changeEmailConfirmToken;
        await user.save();

        sendMailChangeEmailConfirm({ userName: user.userName, email: req.body.newEmail, changeEmailConfirmToken: user.verificationToken });
        //console.log(user);

        return responseHandler.ok(res, { message: `Check ${req.body.newEmail} for confirm the email change` });

    } catch (error) {
        console.error('Error', error);
        return responseHandler.serverError(res, 'Server error');
    }
};

const changeEmailConfirm = async (req, res) => {
    const { changeEmailConfirmToken } = req.params

    try {
        const user = await User.findOne({ verificationToken: changeEmailConfirmToken })
        if (!user) {
            return responseHandler.notFound(res, 'User not found. Try register');
        }

        try {
            const decodedToken = verifyToken(changeEmailConfirmToken);
            if (decodedToken.oldEmail === user.email) {

                user.verificationToken = null;
                user.email = decodedToken.newEmail;

                await user.save()
                //console.log(user)

                return responseHandler.ok(res, { message: "Your email address has been changed successfully" });
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

const getPremium = async (req, res) => {
    const { id } = req.params
    try {
        const user = await User.findOne({ _id: id })

        if (!user) {
            return responseHandler.notFound(res, 'User not found. Try register');
        }

        if (user.userRole === UserRoles.PREMIUM || user.userRole === UserRoles.ADMIN) {
            return responseHandler.badRequest(res, 'User already has premium membership')
        }

        await paymentPremium(
            {
                userId: user._id.toString(),
                email: user.email,
                createdAt: user.createdAt,
                lastLoginAt: user.lastLoginAt
            });

        user.userRole = UserRoles.PREMIUM;
        await user.save()

        const newTokenAfterGetPremium = generateUserToken(user);
        return responseHandler.ok(res, { message: 'Premium membership activated', token: newTokenAfterGetPremium });

    } catch (error) {
        console.error('Error', error);
        return responseHandler.serverError(res, 'Server error');
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        return responseHandler.ok(res, users);
    } catch (error) {
        console.error('Error', error);
        return responseHandler.serverError(res, 'Server error');
    }
};

const forgotPassword = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user || !user.password) {
            return responseHandler.notFound(res, 'Registered User not found. Try register');
        }

        user.verificationToken = generateVerificationToken(req.body.email);
        await user.save();

        sendMailForgotPassword({ userName: user.userName, email: user.email, resetPasswordToken: user.verificationToken })

        return responseHandler.ok(res, { message: `Password reset link sent to ${user.email}` });
    } catch (error) {
        console.error('Error', error);
        return responseHandler.serverError(res, 'Server error');
    }
};

const resetPassword = async (req, res) => {
    const { resetPasswordToken } = req.params
    try {
        const user = await User.findOne({ verificationToken: resetPasswordToken })
        if (!user) {
            return responseHandler.notFound(res, 'User not found. Try register');
        }

        try {
            const decodedToken = verifyToken(resetPasswordToken);
            if (decodedToken.email === user.email) {

                user.verificationToken = null;
                const resetPasswordToken = generateResetPasswordToken(user.email)
                user.resetPasswordToken = resetPasswordToken;
                await user.save();

                /*
                res.cookie(

                    'resetPasswordToken',

                    resetPasswordToken,

                    {
                        secure: true,
                        httpOnly: true,
                    }
                );
                */

                return responseHandler.ok(res, { userId: user._id, resetPasswordToken });
            }
        }
        catch (error) {
            return responseHandler.notFound(res, 'Verification failed. OTP is expired.');
        }

    } catch (error) {
        console.error('Error', error);
        return responseHandler.serverError(res, 'Server error');
    }
};

module.exports = {
    register,
    registerVisitor,
    emailConfirm,
    login,
    loginGoogle,
    userInfo,
    changePassword,
    changeEmail,
    changeEmailConfirm,
    getPremium,
    getAllUsers,
    forgotPassword,
    resetPassword
};
