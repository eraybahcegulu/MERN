const express = require("express");
const router = express.Router();
const companyController = require("../controllers/companyController");
const {auth, requireAdmin}  = require('../middlewares/authMiddleware');
const validator = require("../middlewares/validatorMiddleware");

router.get("/api/company/get-all", auth, requireAdmin, companyController.getAllCompanies);
router.post("/api/company/add", auth, requireAdmin, validator, companyController.addCompany);
router.delete("/api/company/delete/:id", auth, requireAdmin,  companyController.deleteCompany);
router.put("/api/company/update/:id", auth, requireAdmin, validator, companyController.updateCompany);

module.exports = router;