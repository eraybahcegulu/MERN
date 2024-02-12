const express = require("express");
const router = express.Router();
const subRouter = express.Router();
const companyController = require("../controllers/companyController");
const { auth, requireAdmin } = require('../middlewares/authMiddleware');
const { validLength } = require("../middlewares/validatorMiddleware");
const logger = require("../middlewares/loggerMiddleware");

router.use("/api/company", subRouter);

subRouter.get("/get-all", auth, companyController.getAllCompanies);
subRouter.post("/add", auth, requireAdmin, validLength, companyController.addCompany, logger);
subRouter.delete("/delete/:id", auth, requireAdmin, companyController.deleteCompany, logger);
subRouter.put("/update/:id", auth, requireAdmin, validLength, companyController.updateCompany, logger);

module.exports = router;