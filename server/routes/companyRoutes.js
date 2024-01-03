const express = require("express");
const router = express.Router();
const companyController = require("../controllers/companyController");
const auth = require('../middlewares/authMiddleware');

router.get("/api/company/get-all", auth, companyController.getAllCompanies);
router.post("/api/company/add", auth, companyController.addCompany);
router.delete("/api/company/delete/:id", auth, companyController.deleteCompany);
router.put("/api/company/update/:id", auth, companyController.updateCompany);

module.exports = router;