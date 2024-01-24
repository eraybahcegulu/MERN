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

const sendMailEmailConfirm = async (userData) => {

    const { userName, email, emailConfirmToken } = userData;

    let mailOptions = {
        to: email,
        subject: 'Confirm Email',
        html:
            `
            <p> Hello, ${userName} </p>
            <a href="${process.env.CLIENT_URL}/api/user/emailConfirm/${emailConfirmToken}"> Confirm Email </a>
            `
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
        html:
            `
            <p> Hello, ${userName} </p>
            <a href="${process.env.CLIENT_URL}/api/user/changeEmailConfirm/${changeEmailConfirmToken}"> Confirm Change Email </a>
            `
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
    sendMailChangeEmailConfirm
};