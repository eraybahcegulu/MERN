const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    return jwt.sign(user, process.env.SECRET_KEY);
}

const verifyToken = (token) => {
    return jwt.verify(token, process.env.SECRET_KEY);
};

const generateEmailConfirmToken = (email) => {
    return jwt.sign({ email }, process.env.SECRET_KEY);
}

/*
const generateEmailConfirmToken = (email, expiresIn = '30s') => {
    return jwt.sign({ email }, process.env.SECRET_KEY, { expiresIn });
}
*/

module.exports = {
    generateToken,
    verifyToken,
    generateEmailConfirmToken
};