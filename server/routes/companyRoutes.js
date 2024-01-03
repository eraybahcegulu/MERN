const express = require("express");
const router = express.Router();
const companyController = require("../controllers/companyController");
const auth = require('../middlewares/authMiddleware');
const validator = require("../middlewares/validatorMiddleware");

router.get("/api/company/get-all", auth, companyController.getAllCompanies);
router.post("/api/company/add", auth, validator, companyController.addCompany);
router.delete("/api/company/delete/:id", auth, companyController.deleteCompany);
router.put("/api/company/update/:id", auth, validator, companyController.updateCompany);

module.exports = router;