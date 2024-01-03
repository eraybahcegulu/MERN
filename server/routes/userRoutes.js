const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const auth = require('../middlewares/authMiddleware');
const validator = require("../middlewares/validatorMiddleware");

router.post("/api/user/register", validator, userController.register);
router.post("/api/user/login", validator, userController.login);
router.post("/api/user/userInfo", userController.userInfo);
router.put("/api/user/changePassword/:id", auth, validator , userController.changePassword);

module.exports = router;
