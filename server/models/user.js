const mongoose = require("mongoose");
const UserRoles = require('./enums/userRoles');

const UserSchema = mongoose.Schema(
    {
        userName: {
            type: String,
            required: true,
        },

        email: {
            type: String,
            required: true,
        },

        password: {
            type: String,
            required: true,
        },

        securityStamp: {
            required: true,
            type: String,
            default: '-'
        },

        userRole: {
            required: true,
            type: String,
            enum: [UserRoles.ADMIN, UserRoles.VISITOR, UserRoles.STANDARD, UserRoles.PREMIUM],
            default: UserRoles.ADMIN
        },

        lastLoginAt: {
            type: Date,
        },

        createdAt: {
            type: Date,
            default: Date.now
        },
    },
);

module.exports = mongoose.model('User', UserSchema);