const mongoose = require("mongoose");
const BaseModel = require("./baseModel");

const CompanySchema = mongoose.Schema(
    {
        companyName: {
            type: String,
            required: true,
        },

        crn: {
            type: String,
            required: true,
        },

        country: {
            type: String,
            required: true,
        },

        webSite: {
            type: String,
            required: true,
        },

        ...BaseModel
    },
);

module.exports = mongoose.model('Company', CompanySchema);