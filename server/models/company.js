const mongoose = require("mongoose");
const baseModel = require("./baseModel");

const companySchema = mongoose.Schema(
    {
        companyName: {
            type: String,
            required: true,
            trim: true,
        },

        crn: {
            type: String,
            required: true,
            trim: true,
        },

        country: {
            type: String,
            required: true,
            trim: true,
        },

        webSite: {
            type: String,
            required: true,
            trim: true,
        },

        ...baseModel
    },
);

module.exports = mongoose.model('Company', companySchema);