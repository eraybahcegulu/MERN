const jwt = require('jsonwebtoken');

const generateUserToken = (user) => {
    return jwt.sign
        (
            {
                userId: user._id,
                userName: user.userName,
                email: user.email,
                avatar: user.avatar,
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

const generateEmailVerificationToken = (email, userName) => {
    return jwt.sign
        (
            {
                email,
                userName
            },

            process.env.SECRET_KEY,

            {
                expiresIn: '1h'
            }
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

            process.env.SECRET_KEY,

            {
                expiresIn: '1h'
            }
        );
}

const generateForgotPasswordToken = (email) => {
    return jwt.sign
        (
            {
                email,
                forgotPasswordToken: true
            },

            process.env.SECRET_KEY,

            {
                expiresIn: '1h'
            }
        );
}

const generateResetPasswordToken = (email) => {
    return jwt.sign
        (
            {
                email,
                resetPasswordToken: true
            },

            process.env.SECRET_KEY,

            {
                expiresIn: '1h'
            }
            
        );
}

const generateGoogleUserToken = (user) => {
    return jwt.sign
        (
            {
                userId: user._id,
                userName: user.userName,
                email: user.email,
                avatar: user.avatar,
                userRole: user.userRole,
                isGoogleAuth: true
            },

            process.env.SECRET_KEY,

            {
                expiresIn: '30s'
            }
        );
}

module.exports = {
    generateUserToken,
    verifyToken,
    generateEmailVerificationToken,
    generateForgotPasswordToken,
    generateChangeEmailConfirmToken,
    generateGoogleUserToken,
    generateResetPasswordToken
};