const mongoose = require("mongoose");
const UserRoles = require('./enums/userRoles');

const UserSchema = mongoose.Schema(
    {
        googleId: {
            type: String,
            trim: true,
        },

        userName: {
            type: String,
            trim: true,
        },

        email: {
            type: String,
            trim: true,
        },

        password: {
            type: String,
            trim: true,
        },

        isEmailVerified: {
            type: Boolean,
            default: false
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

        verificationToken: {
            type: String,
            allowNull: true,
        },

        googleUserToken: {
            type: String,
            allowNull: true,
        },

        isFirstLogin: {
            type: Boolean,
            default: true
        },

        activityLevel: {
            type: String,
            default: '0'
        },
    },
);

module.exports = mongoose.model('User', UserSchema);