const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const auth = require('../middlewares/authMiddleware');

router.post("/api/user/register", userController.register);
router.post("/api/user/login", userController.login);
router.post("/api/user/userInfo", userController.userInfo);
router.put("/api/user/changePassword/:id", auth , userController.changePassword);

module.exports = router;
