const express = require("express");
const router = express.Router();
const companyController = require("../controllers/companyController");
const {auth, requireAdmin}  = require('../middlewares/authMiddleware');
const {validLength} = require("../middlewares/validatorMiddleware");
const logger = require("../middlewares/loggerMiddleware");

router.get("/api/company/get-all", auth, companyController.getAllCompanies);
router.post("/api/company/add", auth, requireAdmin, validLength, companyController.addCompany, logger,);
router.delete("/api/company/delete/:id", auth, requireAdmin, companyController.deleteCompany, logger);
router.put("/api/company/update/:id", auth, requireAdmin, validLength, companyController.updateCompany, logger);

module.exports = router;