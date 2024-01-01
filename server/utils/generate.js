const jwt = require('jsonwebtoken');
const crypto = require('crypto');

function token(user) {
    return jwt.sign({ userId: user._id, userName: user.userName, email: user.email, userRole: user.userRole }, process.env.JWT_SECRET);
}

function securityStamp() {
    return crypto.randomBytes(30).toString('base64');
}

module.exports = { token, securityStamp };