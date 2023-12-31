const jwt = require('jsonwebtoken');

function generateJWT(user) {
  return jwt.sign({ userId:user._id, userName: user.userName }, process.env.JWT_SECRET);
}

module.exports = { generateJWT };