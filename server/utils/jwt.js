const jwt = require('jsonwebtoken');

function generateToken(user) {
    return jwt.sign(user, process.env.SECRET_KEY);
}

function verifyToken(token){
    return jwt.verify(token, process.env.SECRET_KEY);
};

function generateEmailConfirmToken(email) {
    return jwt.sign({ email }, process.env.SECRET_KEY);
}

/*
function generateEmailConfirmToken(email, expiresIn = '30s') {
    return jwt.sign({ email }, process.env.SECRET_KEY, { expiresIn });
}
*/

module.exports = {
    generateToken,
    verifyToken,
    generateEmailConfirmToken
};