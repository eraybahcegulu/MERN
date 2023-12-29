const mongoose = require("mongoose");

const CompanySchema = mongoose.Schema(
    {
        companyname: String,
        crn: String,
        country: String,
        website: String
    },
);

module.exports = mongoose.model('Company', CompanySchema);