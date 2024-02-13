const nodemailer = require("nodemailer");
const responseHandler = require('../handlers/responseHandler')

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASSWORD,
    },
});

const mailTemplate = (user, bodyText, buttonText, actionLink) => {
    return `
        <div style="background-color: lightgrey; padding: 20px; border-radius: 10px; font-family: Arial, sans-serif; font-size: 16px; color: black; line-height: 1.6;">
            <p>Hello, <strong>${user}</strong></p>
            <p>${bodyText}</p>
            <a href="${actionLink}" style="display: inline-block; background-color: blue; color: white; text-decoration: none; padding: 10px 20px; border-radius: 5px;">${buttonText}</a>
        </div>
    `;
};

const sendMailEmailConfirm = async (userData) => {
    const { userName, email, emailConfirmToken } = userData;

    let mailOptions = {
        to: email,
        subject: 'Confirm Email',
        html: mailTemplate(
            userName,
            'Please click the link below to confirm your email address.',
            'Confirm Email',
            `${process.env.CLIENT_URL}/api/user/emailConfirm/${emailConfirmToken}`
        )
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Mail sent');
    } catch (err) {
        console.error('Error', err);
        return responseHandler.serverError(res, 'Server error');
    }
}

const sendMailChangeEmailConfirm = async (userData) => {
    const { userName, email, changeEmailConfirmToken } = userData;

    let mailOptions = {
        to: email,
        subject: 'Confirm Change Email',
        html: mailTemplate(
            userName,
            'Please click the link below to confirm the change of your email address.',
            'Confirm Change Email',
            `${process.env.CLIENT_URL}/api/user/changeEmailConfirm/${changeEmailConfirmToken}`
        )
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Mail sent');
    } catch (err) {
        console.error('Error', err);
        return responseHandler.serverError(res, 'Server error');
    }
}

const sendMailInvalidLoginAttempt = async (userData) => {
    const { invalidLoginAttempt, email, } = userData;

    let mailOptions = {
        to: email,
        subject: `${invalidLoginAttempt} invalid login attempts have been made using ${email} `,
        html: mailTemplate(
            email,
            `There have been ${invalidLoginAttempt} invalid login attempts using your email address.`,
            'Visit Website',
            `${process.env.CLIENT_URL}`
        )
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Mail sent');
    } catch (err) {
        console.error('Error', err);
        return responseHandler.serverError(res, 'Server error');
    }
}

const sendMailForgotPassword = async (userData) => {
    const { userName, email, resetPasswordToken } = userData;

    let mailOptions = {
        to: email,
        subject: `Forgot Password ${email}`,
        html: mailTemplate(
            userName,
            'You have requested to reset your password. If you did not request this, please ignore this email.<br>Please click the link below to reset your password.',
            'Reset Password',
            `${process.env.CLIENT_URL}/api/user/resetPassword/${resetPasswordToken}`
        )
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Mail sent');
    } catch (err) {
        console.error('Error', err);
        return responseHandler.serverError(res, 'Server error');
    }
}

module.exports = {
    sendMailEmailConfirm,
    sendMailChangeEmailConfirm,
    sendMailInvalidLoginAttempt,
    sendMailForgotPassword
};