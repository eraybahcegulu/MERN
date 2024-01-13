const Company = require("../models/company");
const Product = require("../models/product")
const Status = require("../models/enums/status");

const getAllCompanies = async (req, res) => {
    try {
        const companies = await Company.aggregate([
            {
                $match: { status: Status.ACTIVE }
            },
            {
                $lookup: {
                    from: 'products',
                    let: { companyId: '$_id' },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ['$company', '$$companyId'] },
                                        { $eq: ['$status', Status.ACTIVE] }
                                    ]
                                }
                            }
                        }
                    ],
                    as: 'products'
                }
            },
            {
                $addFields: {
                    products: '$products'
                }
            }
        ]);

        res.status(200).json(companies);
    } catch (error) {
        console.error('Error', error);
        return res.status(500).json({ status: 500, message: 'Error', error: error.message });
    }
};


const addCompany = async (req, res, next) => {
    try {
        const existingCompanyNameControl = await Company.findOne({ companyName: req.body.companyName.trim(), status: Status.ACTIVE });
        if (existingCompanyNameControl) {
            return res.status(400).json({ message: "Failed. This Company Name is already registered" });
        }

        const existingCompanyCRNControl = await Company.findOne({ crn: req.body.crn.trim(), status: Status.ACTIVE });
        if (existingCompanyCRNControl) {
            return res.status(400).json({ message: "Failed. This CRN is already registered" });
        }

        const existingCompanyWEBsiteControl = await Company.findOne({ webSite: req.body.webSite.trim(), status: Status.ACTIVE });
        if (existingCompanyWEBsiteControl) {
            return res.status(400).json({ message: "Failed. This WEB Site is already registered" });
        }

        const newCompany = new Company(req.body);
        await newCompany.save();

        res.status(200).json({ message: "Company added successfully." });
        next();

    } catch (error) {
        console.error('Error', error);
        res.status(500).json({ status: 500, message: 'Error', error: error.message });
    }
};

const deleteCompany = async (req, res, next) => {
    const id = req.params.id;
    const userId = req.body.userId;

    try {
        const company = await Company.findById(id);
        const products = await Product.find({ company: id, status: Status.ACTIVE });

        if (products && products.length > 0) {

            company.status = Status.DELETED;
            company.lastDeleterId = userId;
            await company.save();

            products.forEach(async product => {
                product.status = Status.DELETED;
                product.lastDeleterId = userId;
                await product.save();
            });

            const isPlural = products.length > 1 ? 's' : '';
            res.status(200).json({ message: `${company.companyName} company had ${products.length} product${isPlural}. Company and product${isPlural} was deleted successfully` });

        } else {

            company.status = Status.DELETED;
            company.lastDeleterId = userId;
            await company.save();

            res.status(200).json({ message: `${company.companyName} company had no product. Company was deleted successfully` });
        }
        next();
    } catch (error) {
        console.error('Error', error);
        res.status(500).json({ status: 500, message: 'Error', error: error.message });
    }
};

const updateCompany = async (req, res, next) => {
    const id = req.params.id;
    try {
        const existingCompanyNameControl = await Company.findOne({ companyName: req.body.companyName.trim(), status: Status.ACTIVE, _id: { $ne: id } });
        if (existingCompanyNameControl) {
            return res.status(400).json({ message: "Failed. This Company Name is already registered" });
        }

        const existingCompanyCRNControl = await Company.findOne({ crn: req.body.crn.trim(), status: Status.ACTIVE, _id: { $ne: id } });
        if (existingCompanyCRNControl) {
            return res.status(400).json({ message: "Failed. This CRN is already registered" });
        }

        const existingCompanyWEBSiteControl = await Company.findOne({ webSite: req.body.webSite.trim(), status: Status.ACTIVE, _id: { $ne: id } });
        if (existingCompanyWEBSiteControl) {
            return res.status(400).json({ message: "Failed. This WEB Site is already registered" });
        }

        const existingCompany = await Company.findById(id);

        req.firstData = existingCompany;

        await Company.findByIdAndUpdate(id, req.body);
        res.status(200).json({ message: "Company updated successfully." });
        next();
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
