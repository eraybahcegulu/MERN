const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const auth = require('../middlewares/authMiddleware');
const validator = require("../middlewares/validatorMiddleware");

router.get("/api/product/get-all", auth, productController.getAllProducts);
router.post("/api/product/add", auth, validator, productController.addProduct);
router.delete("/api/product/delete/:id", auth, productController.deleteProduct);
router.put("/api/product/update/:id", auth, validator, productController.updateProduct);

module.exports = router;
