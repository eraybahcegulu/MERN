const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/api/user/register", userController.register);
router.post("/api/user/login", userController.login);
router.post("/api/user/userInfo", userController.userInfo);

module.exports = router;
