const mongoose = require("mongoose");
const BaseModel = require("./baseModel");

const CompanySchema = mongoose.Schema(
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

        ...BaseModel
    },
);

module.exports = mongoose.model('Company', CompanySchema);