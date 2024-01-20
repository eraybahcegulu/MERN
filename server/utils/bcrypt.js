const bcrypt = require('bcrypt');

const salt = bcrypt.genSaltSync(10);

const hashPassword = (password) => {
    const hashedPassword = bcrypt.hash(password, salt);
    return hashedPassword;
};

const comparePassword = (password, hash) => {
    const isMatch = bcrypt.compare(password, hash);
    return isMatch;
};

module.exports = { hashPassword, comparePassword };