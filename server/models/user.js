const mongoose = require("mongoose");
const userRoles = require('./enums/userRoles');
const { dateNow } = require("../utils/moment");

const userSchema = mongoose.Schema(
    {
        userName: {
            type: String,
            allowNull: true,
            trim: true,
        },

        email: {
            type: String,
            trim: true,
        },

        password: {
            type: String,
            allowNull: true,
            trim: true,
        },

        avatar: {
            type: String,
        },

        isEmailVerified: {
            type: Boolean,
            default: false
        },

        emailVerifiedAt: {
            type: String,
            allowNull: true,
        },

        userRole: {
            required: true,
            type: String,
            enum: [userRoles.ADMIN, userRoles.VISITOR, userRoles.STANDARD, userRoles.PREMIUM],
            default: userRoles.ADMIN
        },

        premiumStartDate: {
            type: String,
        },

        premiumCount:{
            type: String,
            default: '0'
        },

        lastLoginAt: {
            type: String,
        },

        createdAt: {
            type: String,
            default: dateNow()
        },

        emailConfirmToken: {
            type: String,
            allowNull: true,
        },

        changeEmailConfirmToken: {
            type: String,
            allowNull: true,
        },

        forgotPasswordToken: {
            type: String,
            allowNull: true,
        },

        resetPasswordToken: {
            type: String,
            allowNull: true,
        },

        googleUserToken: {
            type: String,
            allowNull: true,
        },

        discordUserToken: {
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

        invalidLoginAttempt: {
            type: String,
            default: '0'
        },
    },
);

module.exports = mongoose.model('User', userSchema);