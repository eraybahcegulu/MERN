const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { auth } = require('../middlewares/authMiddleware');
const { validLength, sanitize } = require("../middlewares/validatorMiddleware");

router.post("/api/user/register", sanitize, validLength, userController.register);
router.post("/api/user/login", validLength, userController.login);
router.get("/api/user/userInfo", userController.userInfo);
router.put("/api/user/changePassword/:id", auth, sanitize, validLength, userController.changePassword);
router.put("/api/user/changeEmail/:id", auth, sanitize, validLength, userController.changeEmail);

module.exports = router;
