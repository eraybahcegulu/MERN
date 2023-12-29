const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
    {
        username: String,
        password: String,
        securityStamp: {
            type: String,
            default: '-'
        },
    },
);

module.exports = mongoose.model('User', UserSchema);