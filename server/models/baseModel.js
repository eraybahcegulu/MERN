const mongoose = require("mongoose");
const status = require('./enums/status');

const baseModel ={
    
    createdBy: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },

    lastUpdatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },

    lastDeletedBy: {
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
        enum: [status.ACTIVE, status.DELETED],
        default: status.ACTIVE,
    }
};

module.exports = baseModel;
