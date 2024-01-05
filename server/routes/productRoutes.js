const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const { auth, requireAdmin } = require('../middlewares/authMiddleware');
const { validLength } = require("../middlewares/validatorMiddleware");
const logger = require("../middlewares/loggerMiddleware");

router.get("/api/product/get-all", auth, productController.getAllProducts);
router.post("/api/product/add", auth, requireAdmin, validLength, productController.addProduct, logger);
router.delete("/api/product/delete/:id", auth, requireAdmin, productController.deleteProduct, logger);
router.put("/api/product/update/:id", auth, requireAdmin, validLength, productController.updateProduct, logger);

module.exports = router;
