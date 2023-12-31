const mongoose = require("mongoose");
const UserRoles = require('./enums/userRoles');

const UserSchema = mongoose.Schema(
    {
        userName: {
            type: String,
            required: true,
        },

        password: String,

        securityStamp: {
            required: true,
            type: String,
            default: '-'
        },

        createdAt: {
            type: Date,
            default: Date.now
        },
        
        userRole: {
            required: true,
            type: String,
            enum: [UserRoles.ADMIN, UserRoles.VISITOR, UserRoles.STANDART, UserRoles.PREMIUM],
            default: UserRoles.ADMIN
        }
    },
);

module.exports = mongoose.model('User', UserSchema);