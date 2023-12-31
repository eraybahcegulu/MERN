const Company = require("../models/company");
const Status = require("../models/enums/status");

const getAllCompanies = async (req, res) => {
    try {
        const companies = await Company.find({ status: Status.ACTIVE });
        res.status(200).json(companies);
    } catch (error) {
        console.error('Error', error);
        res.status(500).json({ status: 500, message: 'Error', error: error.message });
    }
};

const addCompany = async (req, res) => {
    try {
        const existingCompanyNameControl = await Company.findOne({ companyName: req.body.companyName, status: Status.ACTIVE });
        if (existingCompanyNameControl) {
            return res.status(400).json({ message: "Failed. This Company Name is already registered" });
        }

        const existingCompanyCRNControl = await Company.findOne({ crn: req.body.crn, status: Status.ACTIVE });
        if (existingCompanyCRNControl) {
            return res.status(400).json({ message: "Failed. This CRN is already registered" });
        }

        const existingCompanyWEBsiteControl = await Company.findOne({ webSite: req.body.webSite, status: Status.ACTIVE });
        if (existingCompanyWEBsiteControl) {
            return res.status(400).json({ message: "Failed. This WEB Site is already registered" });
        }

        const newCompany = new Company(req.body);
        await newCompany.save();
        res.status(200).json({ message: "Company added successfully." });
    } catch (error) {
        console.error('Error', error);
        res.status(500).json({ status: 500, message: 'Error', error: error.message });
    }
};

const deleteCompany = async (req, res) => {
    const id = req.params.id;
    try {
        const company = await Company.findById(id, { status: Status.ACTIVE });
        company.status = Status.DELETED;

        await company.save();
        res.status(200).json({ message: "Company deleted successfully." });
    } catch (error) {
        console.error('Error', error);
        res.status(500).json({ status: 500, message: 'Error', error: error.message });
    }
};

const updateCompany = async (req, res) => {
    const id = req.params.id;
    try {
        const existingCompanyNameControl = await Company.findOne({ companyName: req.body.companyName, _id: { $ne: id } });
        if (existingCompanyNameControl) {
            return res.status(400).json({ message: "Failed. This Company Name is already registered" });
        }

        const existingCompanyCRNControl = await Company.findOne({ crn: req.body.crn, _id: { $ne: id } });
        if (existingCompanyCRNControl) {
            return res.status(400).json({ message: "Failed. This CRN is already registered" });
        }

        const existingCompanyWEBSiteControl = await Company.findOne({ webSite: req.body.webSite, _id: { $ne: id } });
        if (existingCompanyWEBSiteControl) {
            return res.status(400).json({ message: "Failed. This WEB Site is already registered" });
        }

        await Company.findByIdAndUpdate(id, req.body);
        res.status(200).json({ message: "Company updated successfully." });
    } catch (error) {
        console.error('Error', error);
        res.status(500).json({ status: 500, message: 'Error', error: error.message });
    }
};

module.exports = {
    getAllCompanies,
    addCompany,
    deleteCompany,
    updateCompany
};
