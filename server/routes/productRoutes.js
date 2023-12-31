const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.get("/api/product/get-all", productController.getAllProducts);
router.post("/api/product/add", productController.addProduct);
router.delete("/api/product/delete/:id", productController.deleteProduct);
router.put("/api/product/update/:id", productController.updateProduct);

module.exports = router;
