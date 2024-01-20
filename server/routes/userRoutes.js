const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { auth } = require('../middlewares/authMiddleware');
const { validLength, sanitize } = require("../middlewares/validatorMiddleware");
const passport = require("passport");

router.post("/api/user/register", sanitize, validLength, userController.register);
router.get("/api/user/emailConfirm/:emailConfirmToken", userController.emailConfirm);
router.post("/api/user/login", validLength, userController.login);
router.get("/api/user/userInfo", userController.userInfo);
router.put("/api/user/changePassword/:id", auth, sanitize, validLength, userController.changePassword);
router.put("/api/user/changeEmail/:id", auth, sanitize, validLength, userController.changeEmail);

router.get("/auth/google",passport.authenticate("google",{scope:["profile","email"]}));

router.get("/auth/google/callback", passport.authenticate("google", { failureRedirect: process.env.CLIENT_URL }), userController.loginGoogle);

module.exports = router;