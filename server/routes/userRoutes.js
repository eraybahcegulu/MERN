const express = require("express");
const router = express.Router();
const subRouter = express.Router();
const passportRouter = express.Router();
const userController = require("../controllers/userController");
const { auth, requireAdmin, requirePremium } = require('../middlewares/authMiddleware');
const { validLength, sanitize } = require("../middlewares/validatorMiddleware");
const passport = require("passport");

router.use("/api/user", subRouter);

subRouter.post("/register", sanitize, validLength, userController.register);
subRouter.put("/registerVisitor/:id", sanitize, validLength, userController.registerVisitor);
subRouter.get("/emailConfirm/:emailConfirmToken", userController.emailConfirm);
subRouter.post("/login", validLength, userController.login);
subRouter.get("/userInfo", userController.userInfo);
subRouter.put("/changePassword/:id", auth, sanitize, validLength, userController.changePassword);
subRouter.post("/changeEmail/:id", auth, sanitize, validLength, userController.changeEmail);
subRouter.get("/changeEmailConfirm/:changeEmailConfirmToken", userController.changeEmailConfirm);
subRouter.post("/getPremium/:id", userController.getPremium);
subRouter.get("/get-all", auth, requireAdmin, userController.getAllUsers);
subRouter.post("/forgotPassword", userController.forgotPassword);
subRouter.get("/resetPassword/:resetPasswordToken", userController.resetPassword);
subRouter.post("/changeAvatar/:id", auth, requirePremium, sanitize, validLength, userController.changeAvatar);

router.use("/auth", passportRouter);
passportRouter.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
passportRouter.get("/google/callback", passport.authenticate("google", { failureRedirect: process.env.CLIENT_URL }), userController.loginGoogle);
passportRouter.get("/discord", passport.authenticate("discord", { scope: ["identify", "email"] }));
passportRouter.get("/discord/callback", passport.authenticate("discord", { failureRedirect: process.env.CLIENT_URL }), userController.loginDiscord);

module.exports = router;