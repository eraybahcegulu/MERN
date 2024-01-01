const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const auth = require('../middlewares/authMiddleware');

router.get("/api/product/get-all", productController.getAllProducts);
router.post("/api/product/add", auth, productController.addProduct);
router.delete("/api/product/delete/:id", auth, productController.deleteProduct);
router.put("/api/product/update/:id", auth, productController.updateProduct);

module.exports = router;
