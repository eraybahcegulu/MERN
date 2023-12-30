const Company = require("../models/company.js");
const express = require("express");
const router = express.Router();

router.get("/get-all", async (req, res) => {
    try {
        const companies = await Company.find();
        res.status(200).json(companies);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.post("/add", async (req, res) => {
    try {
        const newCompany = new Company(req.body);
        await newCompany.save();
        res.status(200).json("Company added successfully.");
    } catch (error) {
        res.status(500).json(error);
    }
});

router.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;
    try {
        await Company.findByIdAndDelete(id).exec();
        res.status(200).json("Company deleted successfully.");
    } catch (error) {
        res.status(500).json(error);
    }
});

router.put("/update/:id", async (req, res) => {
    const id = req.params.id;

    try {
        await Company.findByIdAndUpdate(id,  req.body );
        res.status(200).json("Company updated successfully.");
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;