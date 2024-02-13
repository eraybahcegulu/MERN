const jwt = require('jsonwebtoken');

const generateUserToken = (user) => {
    return jwt.sign
        (
            {
                userId: user._id,
                userName: user.userName,
                email: user.email,
                userRole: user.userRole
            },

            process.env.SECRET_KEY
        );
}

const verifyToken = (token) => {
    return jwt.verify
        (
            token,

            process.env.SECRET_KEY
        );
};

const generateEmailVerificationToken = (email) => {
    return jwt.sign
        (
            {
                email
            },

            process.env.SECRET_KEY
        );
}


const generateChangeEmailConfirmToken = (oldEmail, newEmail) => {
    return jwt.sign
        (
            {
                oldEmail,
                newEmail,
                ChangeEmailConfirmToken: true
            },

            process.env.SECRET_KEY
        );
}

const generateForgotPasswordToken = (email) => {
    return jwt.sign
        (
            {
                email,
                forgotPasswordToken: true
            },

            process.env.SECRET_KEY
        );
}

const generateResetPasswordToken = (email) => {
    return jwt.sign
        (
            {
                email,
                resetPasswordToken: true
            },

            process.env.SECRET_KEY

            /*
            {
                expiresIn: '30s'
            }
            */
        );
}

const generateGoogleUserToken = (user) => {
    return jwt.sign
        (
            {
                userId: user._id,
                userName: user.userName,
                email: user.email,
                userRole: user.userRole,
                isGoogleAuth: true
            },

            process.env.SECRET_KEY
        );
}


/*
const generateEmailConfirmToken = (email, expiresIn = '30s') => {
    return jwt.sign
    (
        { email }, 

        process.env.SECRET_KEY,

        { expiresIn }
    );
}
*/

module.exports = {
    generateUserToken,
    verifyToken,
    generateEmailVerificationToken,
    generateForgotPasswordToken,
    generateChangeEmailConfirmToken,
    generateGoogleUserToken,
    generateResetPasswordToken
};