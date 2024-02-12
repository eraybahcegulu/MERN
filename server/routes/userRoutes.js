const express = require("express");
const router = express.Router();
const subRouter = express.Router();
const userController = require("../controllers/userController");
const { auth, requireAdmin } = require('../middlewares/authMiddleware');
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

router.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get("/auth/google/callback", passport.authenticate("google", { failureRedirect: process.env.CLIENT_URL }), userController.loginGoogle);

module.exports = router;