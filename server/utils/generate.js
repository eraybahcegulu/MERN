const jwt = require('jsonwebtoken');
const crypto = require('crypto');

function token(user) {
    return jwt.sign({ userId: user._id, userName: user.userName, email: user.email, userRole: user.userRole }, process.env.JWT_SECRET);
}

function emailConfirmToken() {
    const random = crypto.randomBytes(30).toString('hex');
    const date = Date.now().toString(32);
    return random + date;
}

module.exports = { token, emailConfirmToken };