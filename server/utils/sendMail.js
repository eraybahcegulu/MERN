const nodemailer = require("nodemailer");

const responseHandler = require('../handlers/responseHandler')

const sendMailEmailConfirm = async (userData) => {

    const { userName, email, emailConfirmToken } = userData;

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.NODEMAILER_EMAIL,
            pass: process.env.NODEMAILER_PASSWORD,
        },
    });

    let mailOptions = {
        to: email,
        subject: 'Confirm Email',
        html:
            `
            <p> Hello, ${userName} </p>
            <a href="${process.env.CLIENT_URL}/api/user/emailConfirm/${emailConfirmToken}"> Confirm Mail </a>
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
    sendMailEmailConfirm
};