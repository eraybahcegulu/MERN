const express = require("express");
const router = express.Router();
const subRouter = express.Router();
const productController = require("../controllers/productController");
const { auth, requireAdmin } = require('../middlewares/authMiddleware');
const { validLength } = require("../middlewares/validatorMiddleware");
const logger = require("../middlewares/loggerMiddleware");

router.use("/api/product", subRouter);

subRouter.get("/get-all", auth, productController.getAllProducts);
subRouter.post("/add", auth, requireAdmin, validLength, productController.addProduct, logger);
subRouter.delete("/delete/:id", auth, requireAdmin, productController.deleteProduct, logger);
subRouter.put("/update/:id", auth, requireAdmin, validLength, productController.updateProduct, logger);

module.exports = router;
