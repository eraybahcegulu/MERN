const mongoose = require("mongoose");
const Status = require('./enums/status');

const BaseModel = {

    creatorId: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },

    lastUpdaterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },

    lastDeleterId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    status: {
        required: true,
        type: Number,
        enum: [Status.ACTIVE, Status.DELETED],
        default: Status.ACTIVE,
    }

};

module.exports = BaseModel;
