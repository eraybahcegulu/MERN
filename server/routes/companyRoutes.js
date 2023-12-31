const express = require("express");
const router = express.Router();
const companyController = require("../controllers/companyController");

router.get("/api/company/get-all", companyController.getAllCompanies);
router.post("/api/company/add", companyController.addCompany);
router.delete("/api/company/delete/:id", companyController.deleteCompany);
router.put("/api/company/update/:id", companyController.updateCompany);

module.exports = router;
